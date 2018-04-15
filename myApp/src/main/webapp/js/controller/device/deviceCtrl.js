/**
 * Created by Administrator on 2017/1/17.
 */

    angular.module("app")
        .controller("deviceCtrl",function($scope,mainFactory,$rootScope){
    // deviceCtrlFun.$inject = ["$scope","mainFactory","$rootScope"];
    // function deviceCtrlFun($scope,mainFactory,$rootScope){

        window.sessionStorage.currentState = "device";
        window.sessionStorage.currentStateIndex = 1;

        $scope.deviceList = [];     //设备列表

        //所有树形结构数据
        $rootScope.myTreeData={};

        $scope.manageCenterNo = 0;  //管理中心总数
        $scope.totalDeviceNo = 0;  //检测器总数

        $scope.selectItem={};
        //获取设备
        deviceTotalCount();       
        trx.addLocalListener("nodeClick",function (e)
        {
           $scope.selectItem = e.resultData;


            console.log($scope.selectItem.name);
            if(e.resultData.device_type==2)
            {
                //管理中心

            }else
            {
                //检测器

            }
            var gCount=e.resultData.glzxCount;
            var jCount=e.resultData.jcqCount;

            e.stopPropagation();
            e.preventDefault();
            $scope.$apply();
          
        });

        var rootstr="";
        $scope.setNetWork=function(val){
            var newDiv=document.createElement("div");
            newDiv.setAttribute("id","id_topo_box");
            newDiv.className="newDivClass";
            var oDiv=document.getElementById("id_topo_box2");
            $('#id_topo_box2').empty();
            oDiv.appendChild(newDiv);

            if(val==0)
                gsFinit(nodes,edges,"id_topo_box");
            else if(val==1)
                gsInit(nodes,"id_topo_box");
            else if(val==2)
                gsRinit(nodes,"id_topo_box");
            else if(val==3)
                gsLinit(nodes,"id_topo_box",rootstr);
            else if(val==4)
                gsDinit(nodes,"id_topo_box");
        };


        //获取检测器总量  统计报表
        function deviceTotalCount(){
            mainFactory.deviceTotal().then(deviceTotalResult,resultFault);
        }

        //管理中心totalMagCenter有两个父节点 所以要+2，即：totalMagCenter = totalMagCenter + 2；
        function deviceTotalResult(result){
            var totalArr = result.total;
            $scope.manageCenterNo = totalArr[1].count + 2; //管理中心总数
            $scope.totalDeviceNo = totalArr[2].count;  //检测器总数
        }

        var nodes = null;
        var edges = null;
        // var network = null;
        initNetwork();


        // var EDGE_LENGTH_MAIN = 150;

        // Called when the Visualization API is loaded.
        //递归
        function setNodeDatas(result,treeNode)
        {
            angular.forEach(result, function (item) {

                if(item.parent_id!=null){
                    nodes.push({jcqCount:item.jcqs.length,glzxCount:item.chirGlzxs.length,deadDetextors:item.inactiveDetectors,liveDetextors:item.activeDetectors,key: item.device_id,text:item.organs,name: item.organs,device_type:item.device_type,status:item.status,parent:item.parent_id,gender:'M'});
                }else{
                    nodes.push({jcqCount:item.jcqs.length,glzxCount:item.chirGlzxs.length,deadDetextors:item.inactiveDetectors,liveDetextors:item.activeDetectors,key: item.device_id,text:item.organs,name: item.organs,device_type:item.device_type,status:item.status,gender:'M',dir:"left"});
                }
                var keyNode={key: item.device_id,text:item.organs,name: item.organs,device_type:item.device_type,status:item.status,parent:item.parent_id};
                keyNode.children=[];
                treeNode.children.push(keyNode);
                /*nodes.push({key: item.device_id,text:item.organs,name: item.organs,device_type:item.device_type,status:item.status,gender:'M',dir:"left"});*/

                edges.push({from: item.parent_id, to: item.device_id,text:item.organs})
                    //nodes.push({id: item.device_id, label: item.organs,title:'', image: 'assets/icon/computer.png', shape: 'image'});
                    //edges.push({from: item.parent_id, to: item.device_id, length: EDGE_LENGTH_MAIN});
                    if(item.chirGlzxs!=null && item.chirGlzxs.length>0)
                    {
                        setNodeDatas(item.chirGlzxs,keyNode);
                    }
                    if(item.jcqs!=null && item.jcqs.length>0)
                    {
                        setNodeDatas(item.jcqs,keyNode);
                    }
            });
        }
        function resultFault(fault){
            console.log("fault : " + fault);
        }
        function initNetwork() {
            // Create a data table with nodes.
            nodes = [];

            // Create a data table with links.
            edges = [];
            //nodes.push({id: "p", label: '互联网检测中心',title:'互联网检测中心<br>互联网检测中心<br>互联网检测中心<br>互联网检测中心', image: 'assets/icon/computer.png', shape: 'image'});

            mainFactory.topoList().then(function(result){
                //设置树形数据
                //setMyTreeData(result);
                //nodes.push({id: result.device_id, label: result.organs,title:'', image: 'assets/icon/computer.png', shape: 'image'});
                nodes.push({jcqCount:result.jcqs.length,glzxCount:result.chirGlzxs.length,deadDetextors:result.inactiveDetectors,liveDetextors:result.activeDetectors,key: result.device_id,text:result.organs,name: result.organs,device_type:result.device_type,status:result.status,gender:'M',dir:"left"});

                var treeNode={key: result.device_id,text:result.organs,name: result.organs,device_type:result.device_type,status:result.status,dir:"left"};
                treeNode.children=[];
                rootstr=result.chirGlzxs[0].device_id;

                setNodeDatas(result.chirGlzxs,treeNode);
                $rootScope.myTreeData=treeNode;
                var newDiv=document.createElement("div");
                newDiv.setAttribute("id","id_topo_box");
                newDiv.className="newDivClass";
                var oDiv=document.getElementById("id_topo_box2");
                oDiv.appendChild(newDiv);

                gsFinit(nodes,edges,"id_topo_box");
                $scope.deviceList = nodes;

            },resultFault);

        }

        //--------------------------- 点击左右滑动
        var count = 0;
        $('.tpl-skiner-toggle').on('click', function() {
            count++;
            if(count%2!=0){
                $(".tpl-skiner").animate({left:'-280'},200);
                $('.tpl-skiner-toggle span').attr("class","glyphicon glyphicon-arrow-right by_tu");
            }else{
                $(".tpl-skiner").animate({left:'0'},200);
                $('.tpl-skiner-toggle span').attr("class","glyphicon glyphicon-arrow-left by_tu");
            }
        });

    }
);