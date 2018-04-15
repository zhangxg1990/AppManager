/**
 * Created by feilen on 2017/2/22.
 */
/**
 *  后台通讯类
 * Created by Administrator on 2017/2/9.
 */
(function () {
    if(window.gsInit){
        return window.gsInit;
    }

    if(window.gsRinit){
        return window.gsRinit;
    }
    if(window.gsLinit){
        return window.gsLinit;
    }
    if(window.gsFinit){
        return window.gsFinit;
    }

    if(window.gsDinit){
        return window.gsDinit;
    }

    function gsRinit(nodeData,divName) {

          // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;  // for conciseness in defining templates
        var myDiagram =
            $(go.Diagram, divName, // must be the ID or reference to div
                {
                    initialContentAlignment: go.Spot.Center,
                    maxSelectionCount: 1, // users can select only one part at a time
                    validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
                    "clickCreatingTool.archetypeNodeData": {}, // allow double-click in background to create a new node
                    "clickCreatingTool.insertPart": function(loc) {  // customize the data for the new node
                        this.archetypeNodeData = {
                            key: getNextKey(), // assign the key based on the number of nodes
                            name: "(new person)",
                            title: ""
                        };
                        return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
                    },
                    layout:
                        $(go.TreeLayout,
                            {
                                treeStyle: go.TreeLayout.StyleLastParents,
                                // properties for most of the tree:
                                angle: 90,
                                layerSpacing: 80,
                                // properties for the "last parents":
                                alternateAngle: 0,
                                alternateAlignment: go.TreeLayout.AlignmentStart,
                                alternateNodeIndent: 20,
                                alternateNodeIndentPastParent: 1,
                                alternateNodeSpacing: 20,
                                alternateLayerSpacing: 40,
                                alternateLayerSpacingParentOverlap: 1,
                                alternatePortSpot: new go.Spot(0, 0.999, 20, 0),
                                alternateChildPortSpot: go.Spot.Left
                            }),
                    "undoManager.isEnabled": true // enable undo & redo
                });
        var tooltiptemplate =
            $(go.Adornment, "Auto",
                $(go.Shape, "Rectangle",
                    { fill: "whitesmoke", stroke: "black" }),
                $(go.TextBlock,
                    { font: "bold 8pt Helvetica, bold Arial, sans-serif",
                        wrap: go.TextBlock.WrapFit,
                        margin: 5 },
                    new go.Binding("text", "", tooltipTextConverter))
            );
        // when the document is modified, add a "*" to the title and enable the "Save" button
        myDiagram.addDiagramListener("Modified", function(e) {
            var button = document.getElementById("SaveButton");
            if (button) button.disabled = !myDiagram.isModified;
            var idx = document.title.indexOf("*");
            if (myDiagram.isModified) {
                if (idx < 0) document.title += "*";
            } else {
                if (idx >= 0) document.title = document.title.substr(0, idx);
            }
        });

        // manage boss info manually when a node or link is deleted from the diagram
        myDiagram.addDiagramListener("SelectionDeleting", function(e) {
            var part = e.subject.first(); // e.subject is the myDiagram.selection collection,
                                          // so we'll get the first since we know we only have one selection
            myDiagram.startTransaction("clear boss");
            if (part instanceof go.Node) {
                var it = part.findTreeChildrenNodes(); // find all child nodes
                while(it.next()) { // now iterate through them and clear out the boss information
                    var child = it.value;
                    var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
                    if (bossText === null) return;
                    bossText.text = undefined;
                }
            } else if (part instanceof go.Link) {
                var child = part.toNode;
                var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
                if (bossText === null) return;
                bossText.text = undefined;
            }
            myDiagram.commitTransaction("clear boss");
        });

        var levelColors = ["#AC193D/#BF1E4B", "#2672EC/#2E8DEF", "#8C0095/#A700AE", "#5133AB/#643EBF",
            "#008299/#00A0B1", "#D24726/#DC572E", "#008A00/#00A600", "#094AB2/#0A5BC4"];

        // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
        myDiagram.layout.commitNodes = function() {
            go.TreeLayout.prototype.commitNodes.call(myDiagram.layout);  // do the standard behavior
            // then go through all of the vertexes and set their corresponding node's Shape.fill
            // to a brush dependent on the TreeVertex.level value
            myDiagram.layout.network.vertexes.each(function(v) {
                if (v.node) {
                    var level = v.level % (levelColors.length);
                    var colors = levelColors[level].split("/");
                    var shape = v.node.findObject("SHAPE");

                    if (shape) shape.fill = $(go.Brush, "Linear", { 0: colors[0], 1: colors[1], start: go.Spot.Left, end: go.Spot.Right });
                }
            });
        };

        // This function is used to find a suitable ID when modifying/creating nodes.
        // We used the counter combined with findNodeDataForKey to ensure uniqueness.
        function getNextKey() {
            var key = nodeIdCounter;
            while (myDiagram.model.findNodeDataForKey(key.toString()) !== null) {
                key = nodeIdCounter -= 1;
            }
            return key.toString();
        }

        // when a node is double-clicked, add a child to it
        function nodeDoubleClick(e, obj) {
            var clicked = obj.part;
            if (clicked !== null) {
                var thisemp = clicked.data;
                myDiagram.startTransaction("add employee");
                var nextkey = getNextKey();
                var newemp = { key: nextkey, name: "(new person)", title: "", parent: thisemp.key };
                myDiagram.model.addNodeData(newemp);
                myDiagram.commitTransaction("add employee");
            }
        }

        // this is used to determine feedback during drags
        function mayWorkFor(node1, node2) {
            if (!(node1 instanceof go.Node)) return false;  // must be a Node
            if (node1 === node2) return false;  // cannot work for yourself
            if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
            return true;
        }

        // This function provides a common style for most of the TextBlocks.
        // Some of these values may be overridden in a particular TextBlock.
        function textStyle() {
            return { font: "9pt  Segoe UI,sans-serif", stroke: "white" };
        }

        // This converter is used by the Picture.
        /*function findHeadShot(status) {
            //if (key < 0 || key > 16) return "images/HSnopic.png"; // There are only 16 images on the server
            if(status=="on")
                return "assets/icon/computer.png";
            else
                return "assets/icon/device.png";
        }*/

        // define the Node template
        myDiagram.nodeTemplate =
            $(go.Node, "Auto",
                { doubleClick: nodeClick },
                /*{ doubleClick: nodeDoubleClick },*/
                { isShadowed: false, toolTip: tooltiptemplate},
                { // handle dragging a Node onto a Node to (maybe) change the reporting relationship
                    mouseDragEnter: function (e, node, prev) {
                        var diagram = node.diagram;
                        var selnode = diagram.selection.first();
                        if (!mayWorkFor(selnode, node)) return;
                        var shape = node.findObject("SHAPE");
                        if (shape) {
                            shape._prevFill = shape.fill;  // remember the original brush
                            shape.fill = "darkred";
                        }
                    },
                    mouseDragLeave: function (e, node, next) {
                        var shape = node.findObject("SHAPE");
                        if (shape && shape._prevFill) {
                            shape.fill = shape._prevFill;  // restore the original brush
                        }
                    },
                    mouseDrop: function (e, node) {
                        var diagram = node.diagram;
                        var selnode = diagram.selection.first();  // assume just one Node in selection
                        if (mayWorkFor(selnode, node)) {
                            // find any existing link into the selected node
                            var link = selnode.findTreeParentLink();
                            if (link !== null) {  // reconnect any existing link
                                link.fromNode = node;
                            } else {  // else create a new link
                                diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
                            }
                        }
                    }
                },
                // for sorting, have the Node.text be the data.name
                new go.Binding("text", "name"),
                // bind the Part.layerName to control the Node's layer depending on whether it isSelected
                new go.Binding("layerName", "isSelected", function(sel) { return sel ? "Foreground" : ""; }).ofObject(),
                // define the node's outer shape
                $(go.Shape,
                    {
                        stroke: null,

                    },
                    new go.Binding("fill", "", attrFill)),

               /* $(go.Shape, { fill: "#1F4963", stroke: null }),*/
                $(go.Panel, "Horizontal",
                    $(go.Picture,
                        {
                            name: 'Picture',
                            desiredSize: new go.Size(24, 24)
                           /* margin: new go.Margin(6, 8, 6, 10),*/
                        },
                        new go.Binding("source", "", findHeadShot)),
                    $(go.TextBlock,
                        { font: "bold 13px Helvetica, bold Arial, sans-serif",
                            stroke: "white", margin: 3 },
                        new go.Binding("text", "name"))
                    // define the panel where the text will appear
                   /* $(go.Panel, "Table",
                        {
                            maxSize: new go.Size(80, 80),
                            margin: new go.Margin(6, 10, 0, 3),
                            defaultAlignment: go.Spot.Left
                        },
                        $(go.RowColumnDefinition, { column: 6, width: 4 })*/
                     /*   $(go.TextBlock, textStyle(),  // the name
                            {
                                row: 0, column: 0, columnSpan: 5,
                                font: "11pt Segoe UI,sans-serif",
                                editable: true, isMultiline: false,
                                minSize: new go.Size(10, 16)
                            },
                            new go.Binding("text", "name").makeTwoWay())*/
                       /* $(go.TextBlock, "Title: ", textStyle(),
                            { row: 1, column: 0 }),*/
                      /*  $(go.TextBlock, textStyle(),
                            {
                                row: 1, column: 1, columnSpan: 4,
                                editable: true, isMultiline: false,
                                minSize: new go.Size(10, 14),
                                margin: new go.Margin(0, 0, 0, 3)
                            },
                            new go.Binding("text", "title").makeTwoWay()),*/
                     /*   $(go.TextBlock, textStyle(),
                            { row: 2, column: 0 },
                            new go.Binding("text", "key", function(v) {return "ID: " + v;})),*/
                       /* $(go.TextBlock, textStyle(),
                            { name: "boss", row: 2, column: 3, }, // we include a name so we can access this TextBlock when deleting Nodes/Links
                            new go.Binding("text", "parent", function(v) {return "Boss: " + v;})),*/
                        /*$(go.TextBlock, textStyle(),  // the comments
                            {
                                row: 3, column: 0, columnSpan: 5,
                                font: "italic 9pt sans-serif",
                                wrap: go.TextBlock.WrapFit,
                                editable: true,  // by default newlines are allowed
                                minSize: new go.Size(10, 14)
                            },
                            new go.Binding("text", "comments").makeTwoWay())*/
                   /* ) */ // end Table Panel
                ) // end Horizontal Panel
            );  // end Node

        // the context menu allows users to make a position vacant,
        // remove a role and reassign the subtree, or remove a department
        /*myDiagram.nodeTemplate.contextMenu =*/
            /*$(go.Adornment, "Vertical",*/
       /*         $("ContextMenuButton",
                    $(go.TextBlock, "Vacate Position"),
                    {
                        click: function(e, obj) {
                            var node = obj.part.adornedPart;
                            if (node !== null) {
                                var thisemp = node.data;
                                myDiagram.startTransaction("vacate");
                                // update the key, name, and comments
                                myDiagram.model.setKeyForNodeData(thisemp, getNextKey());
                                myDiagram.model.setDataProperty(thisemp, "name", "(Vacant)");
                                myDiagram.model.setDataProperty(thisemp, "comments", "");
                                myDiagram.commitTransaction("vacate");
                            }
                        }
                    }
                ),*/
              /*  $("ContextMenuButton",
                    $(go.TextBlock, "Remove Role"),
                    {
                        click: function(e, obj) {
                            // reparent the subtree to this node's boss, then remove the node
                            var node = obj.part.adornedPart;
                            if (node !== null) {
                                myDiagram.startTransaction("reparent remove");
                                var chl = node.findTreeChildrenNodes();
                                // iterate through the children and set their parent key to our selected node's parent key
                                while(chl.next()) {
                                    var emp = chl.value;
                                    myDiagram.model.setParentKeyForNodeData(emp.data, node.findTreeParentNode().data.key);
                                }
                                // and now remove the selected node itself
                                myDiagram.model.removeNodeData(node.data);
                                myDiagram.commitTransaction("reparent remove");
                            }
                        }
                    }
                ),*/
                /*$("ContextMenuButton",
                    $(go.TextBlock, "Remove Department"),
                    {
                        click: function(e, obj) {
                            // remove the whole subtree, including the node itself
                            var node = obj.part.adornedPart;
                            if (node !== null) {
                                myDiagram.startTransaction("remove dept");
                                myDiagram.removeParts(node.findTreeParts());
                                myDiagram.commitTransaction("remove dept");
                            }
                        }
                    }
                )*/
           /* );*/

        // define the Link template
        myDiagram.linkTemplate =
            $(go.Link, go.Link.Orthogonal,
                { corner: 5, relinkableFrom: true, relinkableTo: true },
                $(go.Shape, { strokeWidth: 4, stroke: "#00a4a4" }));  // the link shape

        // read in the JSON-format data from the "mySavedModel" element
       //load();
        myDiagram.model = new go.TreeModel(nodeData);

        // support editing the properties of the selected person in HTML
        if (window.Inspector) myInspector = new Inspector('myInspector', myDiagram,
            {
                properties: {
                    'key': { readOnly: true },
                    'comments': {}
                }
            });
    }

    function gsInit(nodeData,divName) {
        /*if (window.goSamples) goSamples();*/  // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;  // for conciseness in defining templates

        var myDiagram =
            $(go.Diagram, divName,  // must be the ID or reference to div
                {
                    "toolManager.hoverDelay": 100,  // 100 milliseconds instead of the default 850
                    allowCopy: false,
                    maxScale: 1,
                    contentAlignment: go.Spot.Center,
                    layout:  // create a TreeLayout for the family tree
                        $(go.TreeLayout,
                            { angle: 90, nodeSpacing: 5, layerSpacing: 30, layerStyle: go.TreeLayout.LayerUniform })
                });

        var bluegrad = '#90CAF9';
        var pinkgrad = '#F48FB1';

        // Set up a Part as a legend, and place it directly on the diagram
        myDiagram.add(
            $(go.Part, "Table",
                { position: new go.Point(0, 0), selectable: false }
               /* $(go.TextBlock, "Key",
                    { row: 0, font: "700 14px Droid Serif, sans-serif" })*/  // end row 0

               /* $(go.Panel, "Horizontal",
                    { row: 1, alignment: go.Spot.Left },
                    $(go.Shape, "Rectangle",
                        { desiredSize: new go.Size(30, 30), fill: bluegrad, margin: 5 }),
                    $(go.TextBlock, "Males",
                        { font: "700 13px Droid Serif, sans-serif" })
                ), */ // end row 1
               /* $(go.Panel, "Horizontal",
                    { row: 2, alignment: go.Spot.Left },
                    $(go.Shape, "Rectangle",
                        { desiredSize: new go.Size(30, 30), fill: pinkgrad, margin: 5 }),
                    $(go.TextBlock, "Females",
                        { font: "700 13px Droid Serif, sans-serif" })
                ) */ // end row 2
            ));

        // get tooltip text from the object's data
        function tooltipTextConverter(person) {
            var str = "";
            str += "Born: " + person.birthYear;
            if (person.deathYear !== undefined) str += "\nDied: " + person.deathYear;
            if (person.reign !== undefined) str += "\nReign: " + person.reign;
            return str;
        }

        // define tooltips for nodes
        var tooltiptemplate =
            $(go.Adornment, "Auto",
                $(go.Shape, "Rectangle",
                    { fill: "whitesmoke", stroke: "black" }),
                $(go.TextBlock,
                    { font: "bold 8pt Helvetica, bold Arial, sans-serif",
                        wrap: go.TextBlock.WrapFit,
                        margin: 5 },
                    new go.Binding("text", "", tooltipTextConverter))
            );

        // define Converters to be used for Bindings
       /* function genderBrushConverter(gender) {
            if (gender === "M") return bluegrad;
            if (gender === "F") return pinkgrad;
            return "orange";
        }*/
        function findHeadShot(item) {
            if(item.device_type=="2")
                return "assets/img/architecture.png";
            else
            {
                if(item.status=="on")
                    return "assets/img/computer_live.png";
                else
                    return "assets/img/computer_dead.png";
            }

        }

        // replace the default Node template in the nodeTemplateMap
        myDiagram.nodeTemplate =
            $(go.Node, "Vertical",
                { isShadowed: false, toolTip: tooltiptemplate},
                // define the node's outer shape
                $(go.Picture,
                    {
                        name: 'Picture',
                        desiredSize: new go.Size(48, 48),
                        //margin: new go.Margin(6, 8, 6, 10),
                    },
                    new go.Binding("source","", findHeadShot)),
                /* $(go.Shape, "RoundedRectangle",
                 { fill: graygrad, stroke: "#D8D8D8" },
                 new go.Binding("fill", "color")),*/
                // define the node's text
                /*  $(go.TextBlock,
                 { font: "700 14px Droid Serif, sans-serif",
                 textAlign: "end",
                 margin: 8, maxSize: new go.Size(100, NaN) },
                 new go.Binding("text", "name"))*/
                $(go.TextBlock,
                    { margin: 5, font: "bold 10px Helvetica, bold Arial, sans-serif" },
                    new go.Binding("text", "name"))
            );

        // define the Link template
        myDiagram.linkTemplate =
            $(go.Link,  // the whole link panel
                { routing: go.Link.Orthogonal, corner: 5, selectable: false },
                $(go.Shape, { strokeWidth: 1, stroke: '#FF0000' }));  // the gray link shape

        // here's the family data
        var nodeDataArray = nodeData;
           /* [
            { key: 0, name: "George V", gender: "M", birthYear: "1865", deathYear: "1936", reign: "1910-1936" },
            { key: 1, parent: 0, name: "Edward VIII", gender: "M", birthYear: "1894", deathYear: "1972", reign: "1936" },
            { key: 2, parent: 0, name: "George VI", gender: "M", birthYear: "1895", deathYear: "1952", reign: "1936-1952" },
            { key: 7, parent: 2, name: "Elizabeth II", gender: "F", birthYear: "1926", reign: "1952-" },
            { key: 16, parent: 7, name: "Charles, Prince of Wales", gender: "M", birthYear: "1948" },
            { key: 38, parent: 16, name: "Prince William", gender: "M", birthYear: "1982" },
            { key: 39, parent: 16, name: "Prince Harry of Wales", gender: "M", birthYear: "1984" },
            { key: 17, parent: 7, name: "Anne, Princess Royal", gender: "F", birthYear: "1950" },
            { key: 40, parent: 17, name: "Peter Phillips", gender: "M", birthYear: "1977" },
            { key: 82, parent: 40, name: "Savannah Phillips", gender: "F", birthYear: "2010" },
            { key: 41, parent: 17, name: "Zara Phillips", gender: "F", birthYear: "1981" },
            { key: 18, parent: 7, name: "Prince Andrew", gender: "M", birthYear: "1960" },
            { key: 42, parent: 18, name: "Princess Beatrice of York", gender: "F", birthYear: "1988" },
            { key: 43, parent: 18, name: "Princess Eugenie of York", gender: "F", birthYear: "1990" },
            { key: 19, parent: 7, name: "Prince Edward", gender: "M", birthYear: "1964" },
            { key: 44, parent: 19, name: "Lady Louise Windsor", gender: "F", birthYear: "2003" },
            { key: 45, parent: 19, name: "James, Viscount Severn", gender: "M", birthYear: "2007" },
            { key: 8, parent: 2, name: "Princess Margaret", gender: "F", birthYear: "1930", deathYear: "2002" },
            { key: 20, parent: 8, name: "David Armstrong-Jones", gender: "M", birthYear: "1961" },
            { key: 21, parent: 8, name: "Lady Sarah Chatto", gender: "F", birthYear: "1964" },
            { key: 46, parent: 21, name: "Samuel Chatto", gender: "M", birthYear: "1996" },
            { key: 47, parent: 21, name: "Arthur Chatto", gender: "M", birthYear: "1999" },
            { key: 3, parent: 0, name: "Mary, Princess Royal", gender: "F", birthYear: "1897", deathYear: "1965" },
            { key: 9, parent: 3, name: "George Lascelles", gender: "M", birthYear: "1923", deathYear: "2011" },
            { key: 22, parent: 9, name: "David Lascelles", gender: "M", birthYear: "1950" },
            { key: 48, parent: 22, name: "Emily Shard", gender: "F", birthYear: "1975" },
            { key: 49, parent: 22, name: "Benjamin Lascelles", gender: "M", birthYear: "1978" },
            { key: 50, parent: 22, name: "Alexander Lascelles", gender: "M", birthYear: "1980" },
            { key: 51, parent: 22, name: "Edward Lascelles", gender: "M", birthYear: "1982" },
            { key: 23, parent: 9, name: "James Lascelles", gender: "M", birthYear: "1953" },
            { key: 52, parent: 23, name: "Sophie Lascelles", gender: "F", birthYear: "1973" },
            { key: 53, parent: 23, name: "Rowan Lascelles", gender: "M", birthYear: "1977" },
            { key: 54, parent: 23, name: "Tanit Lascelles", gender: "F", birthYear: "1981" },
            { key: 55, parent: 23, name: "Tewa Lascelles", gender: "M", birthYear: "1985" },
            { key: 24, parent: 9, name: "Jeremy Lascelles", gender: "M", birthYear: "1955" },
            { key: 56, parent: 24, name: "Thomas Lascelles", gender: "M", birthYear: "1982" },
            { key: 57, parent: 24, name: "Ellen Lascelles", gender: "F", birthYear: "1984" },
            { key: 58, parent: 24, name: "Amy Lascelles", gender: "F", birthYear: "1986" },
            { key: 59, parent: 24, name: "Tallulah Lascelles", gender: "F", birthYear: "2005" },
            { key: 25, parent: 9, name: "Mark Lascelles", gender: "M", birthYear: "1964" },
            { key: 60, parent: 25, name: "Charlotte Lascelles", gender: "F", birthYear: "1996" },
            { key: 61, parent: 25, name: "Imogen Lascelles", gender: "F", birthYear: "1998" },
            { key: 62, parent: 25, name: "Miranda Lascelles", gender: "F", birthYear: "2000" },
            { key: 10, parent: 3, name: "Gerald Lascelles", gender: "M", birthYear: "1924", deathYear: "1998" },
            { key: 26, parent: 10, name: "Henry Lascelles", gender: "M", birthYear: "1953" },
            { key: 63, parent: 26, name: "Maximilian Lascelles", gender: "M", birthYear: "1991" },
            { key: 27, parent: 10, name: "Martin David Lascelles", gender: "M", birthYear: "1962" },
            { key: 64, parent: 27, name: "Alexander Lascelles", gender: "M", birthYear: "2002" },
            { key: 4, parent: 0, name: "Prince Henry", gender: "M", birthYear: "1900", deathYear: "1974" },
            { key: 11, parent: 4, name: "Prince William of Gloucester", gender: "M", birthYear: "1941", deathYear: "1972" },
            { key: 12, parent: 4, name: "Prince Richard", gender: "M", birthYear: "1944" },
            { key: 28, parent: 12, name: "Alexander Windsor", gender: "M", birthYear: "1974" },
            { key: 65, parent: 28, name: "Xan Windsor", gender: "M", birthYear: "2007" },
            { key: 66, parent: 28, name: "Lady Cosima Windsor", gender: "F", birthYear: "2010" },
            { key: 29, parent: 12, name: "Lady Davina Lewis", gender: "F", birthYear: "1977" },
            { key: 67, parent: 29, name: "Senna Lewis", gender: "F", birthYear: "2010" },
            { key: 30, parent: 12, name: "Lady Rose Gilman", gender: "F", birthYear: "1980" },
            { key: 68, parent: 30, name: "Lyla Gilman", gender: "F", birthYear: "2010" },
            { key: 5, parent: 0, name: "Prince George", gender: "M", birthYear: "1902", deathYear: "1942" },
            { key: 13, parent: 5, name: "Prince Edward", gender: "M", birthYear: "1935" },
            { key: 31, parent: 13, name: "George Windsor", gender: "M", birthYear: "1962" },
            { key: 69, parent: 31, name: "Edward Windsor", gender: "M", birthYear: "1988" },
            { key: 70, parent: 31, name: "Lady Marina-Charlotte Windsor", gender: "F", birthYear: "1992" },
            { key: 71, parent: 31, name: "Lady Amelia Windsor", gender: "F", birthYear: "1995" },
            { key: 32, parent: 13, name: "Lady Helen Taylor", gender: "F", birthYear: "1964" },
            { key: 72, parent: 32, name: "Columbus Taylor", gender: "M", birthYear: "1994" },
            { key: 73, parent: 32, name: "Cassius Taylor", gender: "M", birthYear: "1996" },
            { key: 74, parent: 32, name: "Eloise Taylor", gender: "F", birthYear: "2003" },
            { key: 75, parent: 32, name: "Estella Taylor", gender: "F", birthYear: "2004" },
            { key: 33, parent: 13, name: "Lord Nicholas Windsor", gender: "M", birthYear: "1970" },
            { key: 76, parent: 33, name: "Albert Windsor", gender: "M", birthYear: "2007" },
            { key: 77, parent: 33, name: "Leopold Windsor", gender: "M", birthYear: "2009" },
            { key: 14, parent: 5, name: "Princess Alexandra", gender: "F", birthYear: "1936" },
            { key: 34, parent: 14, name: "James Ogilvy", gender: "M", birthYear: "1964" },
            { key: 78, parent: 34, name: "Flora Ogilvy", gender: "F", birthYear: "1994" },
            { key: 79, parent: 34, name: "Alexander Ogilvy", gender: "M", birthYear: "1996" },
            { key: 35, parent: 14, name: "Marina Ogilvy", gender: "F", birthYear: "1966" },
            { key: 80, parent: 35, name: "Zenouska Mowatt", gender: "F", birthYear: "1990" },
            { key: 81, parent: 35, name: "Christian Mowatt", gender: "M", birthYear: "1993" },
            { key: 15, parent: 5, name: "Prince Michael of Kent", gender: "M", birthYear: "1942" },
            { key: 36, parent: 15, name: "Lord Frederick Windsor", gender: "M", birthYear: "1979" },
            { key: 37, parent: 15, name: "Lady Gabriella Windsor", gender: "F", birthYear: "1981" },
            { key: 6, parent: 0, name: "Prince John", gender: "M", birthYear: "1905", deathYear: "1919" }
        ];*/

        // create the model for the family tree
        myDiagram.model = new go.TreeModel(nodeDataArray);

        /*document.getElementById('zoomToFit').addEventListener('click', function() {
            myDiagram.zoomToFit();
        });*/

       /* document.getElementById('centerRoot').addEventListener('click', function() {
            myDiagram.scale = 1;
            myDiagram.scrollToRect(myDiagram.findNodeForKey(0).actualBounds);
        });*/
    }
    var rootstr2="Root";
    function gsLinit(nodeData,divName,rootstr) {
        /*if (window.goSamples) goSamples();  */// init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;  // for conciseness in defining templates in this function
        rootstr2=rootstr;
        var myDiagram =
            $(go.Diagram, divName,  // must be the ID or reference to div
                { initialContentAlignment: go.Spot.Center });

        // define all of the gradient brushes
        /*var graygrad = $(go.Brush, "Linear", { 0: "#F5F5F5", 1: "#F1F1F1" });
        var bluegrad = $(go.Brush, "Linear", { 0: "#CDDAF0", 1: "#91ADDD" });
        var yellowgrad = $(go.Brush, "Linear", { 0: "#FEC901", 1: "#FEA200" });
        var lavgrad = $(go.Brush, "Linear", { 0: "#EF9EFA", 1: "#A570AD" });*/
        // get tooltip text from the object's data
        function tooltipTextConverter(item) {
            var str = "";
            str += "检测器ID: " + item.key;

            return str;
        }
        // define the Node template for non-terminal nodes
        var tooltiptemplate =
            $(go.Adornment, "Auto",
                $(go.Shape, "Rectangle",
                    { fill: "whitesmoke", stroke: "black" }),
                $(go.TextBlock,
                    { font: "bold 8pt Helvetica, bold Arial, sans-serif",
                        wrap: go.TextBlock.WrapFit,
                        margin: 5 },
                    new go.Binding("text", "", tooltipTextConverter))
            );
        myDiagram.nodeTemplate =
            $(go.Node, "Vertical",
                { isShadowed: false, toolTip: tooltiptemplate},
                // define the node's outer shape
                $(go.Picture,
                    {
                        name: 'Picture',
                        desiredSize: new go.Size(48, 48),
                        //margin: new go.Margin(6, 8, 6, 10),
                    },
                    new go.Binding("source", "", findHeadShot)),
               /* $(go.Shape, "RoundedRectangle",
                    { fill: graygrad, stroke: "#D8D8D8" },
                    new go.Binding("fill", "color")),*/
                // define the node's text
              /*  $(go.TextBlock,
                    { font: "700 14px Droid Serif, sans-serif",
                        textAlign: "end",
                        margin: 8, maxSize: new go.Size(100, NaN) },
                    new go.Binding("text", "name"))*/
               $(go.TextBlock,
                    { margin: 5, font: "bold 11px Helvetica, bold Arial, sans-serif" },
                    new go.Binding("text", "name"))
            );

        // define the Link template
        myDiagram.linkTemplate =
            $(go.Link,  // the whole link panel
                { selectable: false },
                $(go.Shape, { strokeWidth: 1, stroke: '#0ce3ac' }));
               /* $(go.Shape)); */ // the link shape

        // create the model for the double tree
        myDiagram.model = new go.TreeModel(nodeData);
       /* myDiagram.model = new go.TreeModel([
            // these node data are indented but not nested according to the depth in the tree
            { key: "Root" },
            { key: "Left1", parent: "Root"},
            { key: "leaf1", parent: "Left1" },
            { key: "leaf2", parent: "Left1" },
            { key: "Left2", parent: "Left1"},
            { key: "leaf3", parent: "Left2" },
            { key: "leaf4", parent: "Left2" },
            { key: "Right1", parent: "Root"},
            { key: "Right2", parent: "Right1"},
            { key: "leaf5", parent: "Right2" },
            { key: "leaf6", parent: "Right2" },
            { key: "leaf7", parent: "Right2" },
            { key: "leaf8", parent: "Right1" },
            { key: "leaf9", parent: "Right1" }
        ]);
*/
        doubleTreeLayout(myDiagram);
    }


    function doubleTreeLayout(diagram) {
        // Within this function override the definition of '$' from jQuery:
        var $ = go.GraphObject.make;  // for conciseness in defining templates
        diagram.startTransaction("Double Tree Layout");

        // split the nodes and links into two Sets, depending on direction
        var leftParts = new go.Set(go.Part);
        var rightParts = new go.Set(go.Part);
        separatePartsByLayout(diagram, leftParts, rightParts);
        // but the ROOT node will be in both collections

        // create and perform two TreeLayouts, one in each direction,
        // without moving the ROOT node, on the different subsets of nodes and links
        var layout1 =
            $(go.TreeLayout,
                { angle: 180,
                    arrangement: go.TreeLayout.ArrangementFixedRoots,
                    setsPortSpot: false });

        var layout2 =
            $(go.TreeLayout,
                { angle: 0,
                    arrangement: go.TreeLayout.ArrangementFixedRoots,
                    setsPortSpot: false });

        layout1.doLayout(leftParts);
        layout2.doLayout(rightParts);

        diagram.commitTransaction("Double Tree Layout");
    }

    function separatePartsByLayout(diagram, leftParts, rightParts) {
        var root = diagram.findNodeForKey(rootstr2);
        if (root === null) return;
        // the ROOT node is shared by both subtrees!
        leftParts.add(root);
        rightParts.add(root);
        // look at all of the immediate children of the ROOT node
        root.findTreeChildrenNodes().each(function(child) {
            // in what direction is this child growing?
            var dir = child.data.dir;
            var coll = (dir === "left") ? leftParts : rightParts;
            // add the whole subtree starting with this child node
            coll.addAll(child.findTreeParts());
            // and also add the link from the ROOT node to this child node
            coll.add(child.findTreeParentLink());
        });
    }
    //var myDiagram=null;
    function gsFinit(nodeData,linkData,divName) {
       /* if (window.goSamples) goSamples(); */ // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;  // for conciseness in defining templates
       /* if(myDiagram!=null)
        {
            myDiagram.clear();
            myDiagram=null;
        }*/
        //$(divName).empty();
         var myDiagram =
            $(go.Diagram, divName,  // must name or refer to the DIV HTML element
                {
                    initialAutoScale: go.Diagram.Uniform,  // an initial automatic zoom-to-fit
                    contentAlignment: go.Spot.Center,  // align document to the center of the viewport
                    layout:
                        $(ContinuousForceDirectedLayout,  // automatically spread nodes apart while dragging
                            { defaultSpringLength: 30, defaultElectricalCharge: 100 }),
                    // do an extra layout at the end of a move
                    "SelectionMoved": function(e) { e.diagram.layout.invalidateLayout(); }
                });

        // dragging a node invalidates the Diagram.layout, causing a layout during the drag
        myDiagram.toolManager.draggingTool.doMouseMove = function() {
            go.DraggingTool.prototype.doMouseMove.call(this);
            if (this.isActive) { this.diagram.layout.invalidateLayout(); }
        }
        var tooltiptemplate =
            $(go.Adornment, "Auto",
                $(go.Shape, "Rectangle",
                    { fill: "whitesmoke", stroke: "black" }),
                $(go.TextBlock,
                    { font: "bold 8pt Helvetica, bold Arial, sans-serif",
                        wrap: go.TextBlock.WrapFit,
                        margin: 5 },
                    new go.Binding("text", "", tooltipTextConverter))
            );
        // define each Node's appearance
        myDiagram.nodeTemplate =
            $(go.Node, "Vertical",
                { doubleClick: nodeClick },
                { isShadowed: false, toolTip: tooltiptemplate},
                // define the node's outer shape
                $(go.Picture,
                    {
                        name: 'Picture',
                        desiredSize: new go.Size(48, 48),
                        //margin: new go.Margin(6, 8, 6, 10),
                    },
                    new go.Binding("source","", findHeadShot)),

/*                $(go.Shape, "Circle",
                    { fill: "CornflowerBlue", stroke: "black", spot1: new go.Spot(0, 0, 5, 5), spot2: new go.Spot(1, 1, -5, -5) }),*/
                $(go.TextBlock,
                    { font: "bold 14pt helvetica, bold arial, sans-serif", textAlign: "center", maxSize: new go.Size(100, NaN) },
                    new go.Binding("text", "text"))
            );
        // the rest of this app is the same as samples/conceptMap.html

        // replace the default Link template in the linkTemplateMap
        myDiagram.linkTemplate =
            $(go.Link,  // the whole link panel
                $(go.Shape,  // the link shape
                    { stroke: "black" }),
                $(go.Shape,  // the arrowhead
                    { toArrow: "standard", stroke: null }),
                $(go.Panel, "Auto",
                    $(go.Shape,  // the label background, which becomes transparent around the edges
                        { fill: $(go.Brush, "Radial", { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }),
                            stroke: null }),
                    $(go.TextBlock,  // the label text
                        { textAlign: "center",
                            font: "10pt helvetica, arial, sans-serif",
                            stroke: "#555555",
                            margin: 4 },
                        new go.Binding("text", "text"))
                )
            );

        // create the model for the concept map
        var nodeDataArray =nodeData;
       /* var nodeDataArray = [
            { key: 1, text: "Concept Maps" },
            { key: 2, text: "Organized Knowledge" },
            { key: 3, text: "Context Dependent" },
            { key: 4, text: "Concepts" },
            { key: 5, text: "Propositions" },
            { key: 6, text: "Associated Feelings or Affect" },
            { key: 7, text: "Perceived Regularities" },
            { key: 8, text: "Labeled" },
            { key: 9, text: "Hierarchically Structured" },
            { key: 10, text: "Effective Teaching" },
            { key: 11, text: "Crosslinks" },
            { key: 12, text: "Effective Learning" },
            { key: 13, text: "Events (Happenings)" },
            { key: 14, text: "Objects (Things)" },
            { key: 15, text: "Symbols" },
            { key: 16, text: "Words" },
            { key: 17, text: "Creativity" },
            { key: 18, text: "Interrelationships" },
            { key: 19, text: "Infants" },
            { key: 20, text: "Different Map Segments" }
        ];*/
        var linkDataArray=linkData;
        /*var linkDataArray = [
            { from: 1, to: 2, text: "represent" },
            { from: 2, to: 3, text: "is" },
            { from: 2, to: 4, text: "is" },
            { from: 2, to: 5, text: "is" },
            { from: 2, to: 6, text: "includes" },
            { from: 2, to: 10, text: "necessary\nfor" },
            { from: 2, to: 12, text: "necessary\nfor" },
            { from: 4, to: 5, text: "combine\nto form" },
            { from: 4, to: 6, text: "include" },
            { from: 4, to: 7, text: "are" },
            { from: 4, to: 8, text: "are" },
            { from: 4, to: 9, text: "are" },
            { from: 5, to: 9, text: "are" },
            { from: 5, to: 11, text: "may be" },
            { from: 7, to: 13, text: "in" },
            { from: 7, to: 14, text: "in" },
            { from: 7, to: 19, text: "begin\nwith" },
            { from: 8, to: 15, text: "with" },
            { from: 8, to: 16, text: "with" },
            { from: 9, to: 17, text: "aids" },
            { from: 11, to: 18, text: "show" },
            { from: 12, to: 19, text: "begins\nwith" },
            { from: 17, to: 18, text: "needed\nto see" },
            { from: 18, to: 20, text: "between" }
        ];*/
        myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    }

    function ContinuousForceDirectedLayout() {
        go.ForceDirectedLayout.call(this);
        this._isObserving = false;
    }
    go.Diagram.inherit(ContinuousForceDirectedLayout, go.ForceDirectedLayout);

    /** @override */
    ContinuousForceDirectedLayout.prototype.isFixed = function(v) {
        return v.node.isSelected;
    }

    // optimization: reuse the ForceDirectedNetwork rather than re-create it each time
    /** @override */
    ContinuousForceDirectedLayout.prototype.doLayout = function(coll) {
        if (!this._isObserving) {
            this._isObserving = true;
            // cacheing the network means we need to recreate it if nodes or links have been added or removed or relinked,
            // so we need to track structural model changes to discard the saved network.
            var lay = this;
            this.diagram.addModelChangedListener(function (e) {
                // modelChanges include a few cases that we don't actually care about, such as
                // "nodeCategory" or "linkToPortId", but we'll go ahead and recreate the network anyway
                if (e.modelChange !== "") lay.network = null;
            });
        }
        var net = this.network;
        if (net === null) {  // the first time, just create the network as normal
            this.network = net = this.makeNetwork(coll);
        } else {  // but on reuse we need to update the LayoutVertex.bounds for selected nodes
            this.diagram.nodes.each(function (n) {
                var v = net.findVertex(n);
                if (v !== null) v.bounds = n.actualBounds;
            });
        }
        // now perform the normal layout
        go.ForceDirectedLayout.prototype.doLayout.call(this, coll);
        // doLayout normally discards the LayoutNetwork by setting Layout.network to null;
        // here we remember it for next time
        this.network = net;
    }
    function nodeClick(e, obj) {
        var clicked = obj.part;
        if (clicked !== null) {
            var thisemp = clicked.data;
            trx.disLocalEvent({type:"nodeClick",resultData:thisemp});
           // this.$broadcast('itemClick',thisemp);
          /*  var ed = new disEvents.EventDispatcher();
            ed.EventDispatcher.dispatchEvent("test", {event: "as you link"});*/
        }
    }

    function attrFill(item) {
        //"#2672EC/#2E8DEF", "#8C0095/#A700AE",
        if(item.device_type=="2")
            return "#AC193D";
        else
        {
            if(item.status=="on")
                return "#2672EC";
            else
                return "#6f6262";
        }
    }
    function findHeadShot(item) {
        if(item.device_type=="2")
            return "assets/img/architecture.png";
        else
        {
            if(item.status=="on")
                return "assets/img/computer_live.png";
            else
                return "assets/img/computer_dead.png";
        }

    }
    function tooltipTextConverter(item) {
        /*var str = "";
        str += "检测器ID: " + item.key;

        return str;*/

        if(item.device_type=="2")
            return "管理中心："+item.glzxCount+"\n检测器:"+item.jcqCount+"\n活跃检测器:"+item.liveDetextors+"\n故障检测器:"+item.deadDetextors;
        else
        {
            if(item.status=="on")
                return "策略：20条\n"+"告警：18条";
            else
                return "设备不可用";
        }
    }


    function gsDinit(nodeData,divName) {
        //if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;  // for conciseness in defining templates

        myDiagram =
            $(go.Diagram, divName,
                {
                    initialAutoScale: go.Diagram.UniformToFill,
                    // define the layout for the diagram
                    layout: $(go.TreeLayout, { nodeSpacing: 5, layerSpacing: 30 })
                });

        // Define a simple node template consisting of text followed by an expand/collapse button
        myDiagram.nodeTemplate =
            $(go.Node, "Horizontal",
                { doubleClick: nodeClick },
                { selectionChanged: nodeSelectionChanged },  // this event handler is defined below
                $(go.Panel, "Auto",
                    $(go.Shape, { fill: "#1F4963", stroke: null }),
                    $(go.Panel, "Horizontal",
                        $(go.Picture,
                        {
                            name: 'Picture',
                            desiredSize: new go.Size(24, 24),
                            //margin: new go.Margin(6, 8, 6, 10),
                        },
                        new go.Binding("source", "", findHeadShot)),
                        $(go.TextBlock,
                        { font: "bold 13px Helvetica, bold Arial, sans-serif",
                            stroke: "white", margin: 3 },
                        new go.Binding("text", "name"))
                    )
                ),
                $("TreeExpanderButton")
            );

        // Define a trivial link template with no arrowhead.
        myDiagram.linkTemplate =
            $(go.Link,
                { selectable: false },
                $(go.Shape));  // the link shape


        var nodeDataArray = nodeData;

        // Walk the DOM, starting at document
        function traverseDom(node, parentName) {
            // skip everything but HTML Elements
            if (!(node instanceof Element)) return;
            // Ignore the menu on the left of the page
            if (node.id === "menu") return;
            // add this node to the nodeDataArray
            var name = getName(node);
            var data = { key: name, name: name };
            nodeDataArray.push(data);
            // add a link to its parent
            if (parentName !== null) {
                data.parent = parentName;
            }
            // find all children
            var l = node.childNodes.length;
            for (var i = 0; i < l; i++) {
                traverseDom(node.childNodes[i], name);
            }
        }

        // Give every node a unique name
        function getName(node) {
            var n = node.nodeName;
            if (node.id) n = n + " (" + node.id + ")";
            var namenum = n;
            var i = 1;
            while (names[namenum] !== undefined) {
                namenum = n + i;
                i++;
            }
            names[namenum] = node;
            return namenum;
        }

        // build up the tree
        //traverseDom(document.activeElement, null);

        // create the model for the DOM tree
        myDiagram.model =
            $(go.TreeModel, {
                isReadOnly: true,  // don't allow the user to delete or copy nodes
                nodeDataArray: nodeDataArray
            });
    }

    // When a Node is selected, highlight the corresponding HTML element.
    function nodeSelectionChanged(node) {
        if (node.isSelected) {
            names[node.data.name].style.backgroundColor = "lightblue";
        } else {
            names[node.data.name].style.backgroundColor = "";
        }
    }

    window.gsInit = gsInit;
    window.gsRinit = gsRinit;
    window.gsLinit=gsLinit;
    window.gsFinit=gsFinit;
    window.gsDinit=gsDinit;
})();