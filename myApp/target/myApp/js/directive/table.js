/**
 * 表格组件 tsTable
 * Created by Administrator on 2017/3/21.
 */
(function () {
    angular.module("monitorApp")
        .directive("tsTable",tsTableFn);
    // tsTableFn.$inject = [];
    function tsTableFn(){
        var dir = {
            restrict:"E",
            replace:true,
            scope:{
                tableData:"=",      //表数据列表 array
                colsList:"=",       //列数据，表头列表
                // rowsList:"=",       //行数据
                pageSize:"=",       //每页多少条
                groupSize:"=",      //分页每一组显示几个
                rowsSelect:"&",     //选择行
                colsSelect:"&",      //选择列
                pageChange:"&"      //分页，选择某一页
            },
            template:"<div>"+
            "<table class='table' style='border:1px solid #000000;'>" +
                "<thead>" +
                    "<tr class='ts-table-head'>" +
                        "<td class='ts-table-td'>" +
                            "<input type='checkbox' title='全选' ng-model='isSelectAll' ng-click='checkChange(0,\"isSelectAll\");'>" +
                        "</td>" +
                        "<td class='ts-table-td' ng-repeat='head in colsList' ng-click='colSelectClick(head);'>{{head.name}}</td>" +
                    "</tr>" +
                "</thead>" +
                "<tbody>" +
                    "<tr ng-class='{\"ts-table-tr-odd\":row.isOdd,\"ts-table-tr-even\":row.isEven,\"ts-table-tr-select\":row.isSelect,\"ts-table-tr\":row.isHover}' " +
                        "ng-repeat='row in rowsList' ng-click='trClick(row);'>" +

                        "<td class='ts-table-td'>" +
                            "<input type='checkbox' title='选择' ng-model='row.isSelect' ng-click='checkChange(1,row);'>" +
                        "</td>" +
                        "<td class='ts-table-td'>{{row.id}}</td>" +
                        "<td class='ts-table-td' ng-class='{\"ts-table-td-select\":col.isSelect}' ng-repeat='col in row.data'>{{col.value}}</td>" +
                    "</tr>" +
                "</tbody>" +
                "<tfoot><div class='ts-table-paging'><ts-paging page-total='pageTotal' page-size='pageSize' group-size='groupSize' page-change='pageChangeFn(value);'></ts-paging></div></tfoot>" +
            "</table>"+
            "</div>",
            controller:function ($scope) {

                $scope.dataList = [];
                $scope.rowsList = [];
                $scope.isSingleCheck = false;       //单选
                $scope.isSelectAll = false;         //全选
                var isSelectedAll = false;      //是否单选

                $scope.isColsSelect = false;    //是否选择了列
                var selectRowsList = [];        //选择的行
                var selectColsList = [];        //选择的列
                
                //分页
                // $scope.pageSize = 1;
                // $scope.pageTotal = 1;
                // $scope.groupSize = 5;

                //checkbox选择事件
                $scope.checkChange = function (type,item) {
                    // 全选
                    if(type == 0){
                        if(isSelectedAll){
                            isSelectedAll = false;
                            for(var i=0;i<$scope.rowsList.length;i++){
                                var it = $scope.rowsList[i];
                                it.isSelect = false;
                                it.isHover = true;
                            }
                            selectRowsList = [];
                        }else{
                            isSelectedAll = true;
                            selectRowsList = [];
                            for(var j=0;j<$scope.rowsList.length;j++){
                                var itm = $scope.rowsList[j];
                                itm.isSelect = true;
                                itm.isHover = false;
                                selectRowsList.push(itm);
                            }
                        }
                        $scope.isSelectAll = isSelectedAll;
                        $scope.isSingleCheck = false;
                    } else{      //单选
                        $scope.isSelectAll = isSelectedAll = false;
                        if(item.isSelect == true){
                            item.isHover = false;
                            selectRowsList.push(item.primaryData);
                        }else{
                            item.isHover = true;
                            for(var k=0;k<selectRowsList.length;k++){
                                var tempIt = selectRowsList[k];
                                if(item.id == tempIt.id){
                                    selectRowsList.splice(k,1);
                                }
                            }
                        }
                        $scope.isSingleCheck = true;
                    }
                    //发送数据
                    $scope.rowsSelect({value:selectRowsList});
                };
                //行选择事件
                $scope.trClick = function(tr){
                    //点击的是单行的checkbox的话不处理 行的点击事件
                    if($scope.isSingleCheck){
                        // console.log("tr : " + tr);
                        selectRowsList = [];
                        if(tr.isSelect == true){
                            tr.isHover = false;
                            selectRowsList.push(tr);
                        }else{
                            tr.isHover = true;
                        }
                        $scope.isSingleCheck = false;
                        return;
                    }
                    //重置背景颜色
                    for(var i=0;i<$scope.rowsList.length;i++){
                        var it = $scope.rowsList[i];
                        //判断奇偶行,恢复初始背景颜色
                        if(i%2 > 0){
                            it.isOdd = false;
                            it.isEven = true;
                        }else{
                            it.isOdd = true;
                            it.isEven = false;
                        }
                        it.isSelect = false;
                        it.isHover = true;
                    }
                    tr.isOdd = false;
                    tr.isEven = false;
                    tr.isSelect = true;
                    tr.isHover = false;

                    selectRowsList.push(tr.primaryData);
                    $scope.rowsSelect({value:selectRowsList});
                };
                //列选择事件
                $scope.colSelectClick = function(cols){

                    cols.isSelect = !cols.isSelect;

                    var code = cols.cols;
                    // var temp = [];
                    for(var i=0;i<$scope.rowsList.length;i++){
                        var row = $scope.rowsList[i];
                        for(var j=0;j<row.data.length;j++){
                            var col = row.data[j];
                            if(col.cols == code){
                                col.isSelect =cols.isSelect;//true;
                                if(cols.isSelect){
                                    selectColsList.push(col);
                                }else{
                                    for(var k=0;k<selectColsList.length;k++){
                                        var tem = selectColsList[k];
                                        if(tem.cols == col.cols && !tem.isSelect){
                                            selectColsList.splice(k,1);
                                        }
                                    }
                                }
                            }
                            // else{
                            //     // col.isSelect = false;
                            //     for(var k=0;k<selectColsList.length;k++){
                            //         var tem = selectColsList[k];
                            //         if(tem.cols == col.cols && !tem.isSelect){
                            //             selectColsList.splice(k,1);
                            //         }
                            //     }
                            // }
                        }
                    }
                    $scope.colsSelect({value:selectColsList});
                };

                $scope.sortClick = function (key,type) {
                    if(type == "asc"){      //升序排列
                        $scope.rowsList = $scope.rowsList.sort(compareAsc(key));
                    }else if(type == "desc"){   //降序排列
                        $scope.rowsList = $scope.rowsList.sort(compareDesc(key));
                    }
                };
                //升序排列
                function compareAsc(property){
                    return function(a,b){
                        var value1 = a[property];
                        var value2 = b[property];
                        return value1 - value2;
                    }
                }
                // 降序排列
                function compareDesc(property){
                    return function(a,b){
                        var value1 = a[property];
                        var value2 = b[property];
                        return value2 - value1;
                    }
                }
                //分页事件
                $scope.pageChangeFn = function (page) {
                    console.log("page : " + page);
                    $scope.pageChange({value:page});

                    var start = (page - 1) * $scope.pageSize;
                    var end = page * $scope.pageSize;
                    $scope.rowsList = $scope.dataList.slice(start,end);
                };
            }
            ,
            link:function (scope) {     //,element,attrs
                scope.$watch("tableData",function () {      //nVal, oVal
                    scope.dataList = [];
                    for(var i=0;i<scope.tableData.length;i++){
                        var item = scope.tableData[i];
                        var row = {};
                        row.id = i + 1;
                        if(i%2 == 0){
                            row.isOdd = true;
                            row.isEven = false;
                        }else{
                            row.isOdd = false;
                            row.isEven = true;
                        }
                        row.isSelect = false;
                        row.isHover = true;
                        row.data = [];
                        row.primaryData = item;
                        
                        for(var att in item){
                            var obj = {};
                            obj.key = att;
                            obj.value = item[att];
                            obj.isSelect = false;
                            obj.cols = row.data.length + 1;
                            row.data.push(obj);
                        }
                        scope.dataList.push(row);
                    }
                    //分页
                    scope.pageTotal = Math.ceil(scope.dataList.length/scope.pageSize);
                    scope.rowsList = scope.dataList.slice(0,parseInt(scope.pageSize));
                })
            }
        };
        return dir;
    }
})();

