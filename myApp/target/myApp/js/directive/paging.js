/**
 * Created by Administrator on 2017/3/9.
 */
(function () {
    angular.module("monitorApp")
        .directive("tsPaging",function () {
            // pageList:"=",       //数据列表list
            var dirs = {
                restrict:"EA",
                replace:true,
                scope:{
                    currentPage:"=",    //当前页
                    pageTotal:"=",     //总页数
                    pageSize:"=" ,       //每页显示个数
                    pageChange:"&",     //分页改变，调用外部方法
                    groupSize:"=",       //每组显示多少页码,
                    listTotal:"="       //总条数
                },
                template:       //class="active"
                    '<nav>'+
                        '<ul class="pagination pagination-sm pagination-centered" style="margin:0px;">'+
                            '<li><a ng-click="prePageClick();">上一页</a></li>'+
                            '<li ng-show="isPreMore"><a ng-click="preGroupMoreClick();">...</a></li>'+
                            '<li id="page.name" ng-repeat="page in pageShowList">' +
                                '<a ng-click="pageClick(page);" href="">{{page.name}}</a>' +
                            '</li>'+
                            '<li ng-show="isNextMore"><a ng-click="nextGroupMoreClick();">...</a></li>'+
                            '<li><a ng-click="nextPageClick();">下一页</a></li>'+
                            '<li class="disabled">' +
                                '<a>每页显示：{{pageSize}}条 共：{{listTotal}}条 当前：第{{currentPage}}页  共：{{pageTotal}}页 ' +
                    //height: 29px;   style="padding: 1px;vertical-align: middle;"
                    // '每页显示：<select class="input-sm" style="width: 60px;height: 24px;padding: 1px;margin: 0px;">' +
                                    //     '<option>10</option>'+
                                    //     '<option>20</option>'+
                                    //     '<option>30</option>'+
                                    //     '<option>50</option>'+
                                    //     '<option>100</option>'+
                                    //     '<option>200</option>'+
                                    //     '<option>300</option>'+
                                    //     '<option>500</option>'+
                                    //     '<option>1000</option>'+
                                    // '</select> 条' +
                                '</a>' +
                            '</li>'+
                        '</ul>'+
                    '</nav>',
                controller:function ($scope) {

                    // $scope.currentPage = 1;         //当前页
                    $scope.currentGroup = 1;        //当前组
                    $scope.groupNo = 1;
                    // $scope.listTotal = $scope.pageList.length;      //数据列表的长度
                    // $scope.pageTotal = 1;               //总页数
                    $scope.isPreMore = false;       //是否显示上一组按钮
                    $scope.isNextMore = false;      //是否显示下一组按钮

                    $scope.pageNoList = [];         //页码总列表
                    $scope.pageShowList = [];       //当前显示的页码列表

                    console.log("pageTotal : " +　$scope.pageTotal);

                    //分页个数
                    // $scope.pageTotal = Math.ceil($scope.listTotal/$scope.pageSize);
                    //计算页码
                    for(var i=0;i<$scope.pageTotal;i++){
                        var item = {};
                        item.name = i + 1;
                        item.value = i + 1;
                        $scope.pageNoList.push(item);
                    }
                    //显示的页码列表
                    $scope.pageShowList = $scope.pageNoList.slice(0,parseInt($scope.groupSize));

                    //分组个数
                    $scope.groupNo = Math.ceil($scope.pageTotal/$scope.groupSize);
                    if($scope.groupNo > 1){
                        $scope.isNextMore = true;
                    }
                    // 点击某一页
                    $scope.pageClick = function (page) {
                        $scope.currentPage = page.name;
                        $scope.pageChange({value: $scope.currentPage});

                        //修改背景颜色
                        // $("#"+page.name).attr("class","active");
                    };
                    // 上一组
                    $scope.preGroupMoreClick = function () {

                        if($scope.currentGroup>1){
                            $scope.currentGroup--;
                            if($scope.currentGroup <= 1){
                                $scope.isPreMore = false;
                            }
                        }
                        var start = ($scope.currentGroup - 1)*$scope.groupSize;
                        var end = $scope.currentGroup*$scope.groupSize;
                        $scope.pageShowList = $scope.pageNoList.slice(start,end);
                        $scope.isNextMore = true;
                        $scope.currentPage = end;

                        $scope.pageChange({value: $scope.currentPage});
                    };
                    // 下一组
                    $scope.nextGroupMoreClick = function () {

                        if($scope.currentGroup<$scope.groupNo){
                            $scope.currentGroup++;
                            if($scope.currentGroup >= $scope.groupNo){
                                $scope.isNextMore = false;
                            }
                        }
                        var start = ($scope.currentGroup - 1)*$scope.groupSize;
                        var end = $scope.currentGroup*$scope.groupSize;
                        $scope.pageShowList = $scope.pageNoList.slice(start,end);
                        $scope.isPreMore = true;
                        $scope.currentPage = start+1;

                        $scope.pageChange({value: $scope.currentPage});
                    };
                    // 上一页
                    $scope.prePageClick = function(){

                        if($scope.currentPage > 1){
                            $scope.currentPage--;
                        }
                        var currGroupMin = ($scope.currentGroup-1)*$scope.groupSize + 1;
                        if($scope.currentPage < currGroupMin){
                            $scope.preGroupMoreClick();
                        }else{
                            $scope.pageChange({value: $scope.currentPage});
                        }
                    };
                    // 下一页
                    $scope.nextPageClick = function () {

                        if($scope.currentPage < $scope.pageTotal){
                            $scope.currentPage++;
                        }
                        var currGroupMax = $scope.currentGroup*$scope.groupSize;
                        if($scope.currentPage > currGroupMax){
                            $scope.nextGroupMoreClick();
                        }else{
                            $scope.pageChange({value: $scope.currentPage});
                        }
                    };
                },
                link:function (scope) {//,element,att
                   scope.$watch("pageTotal",function () {
                       scope.pageNoList = [];
                       if(scope.pageTotal > 0){
                           //计算页码
                           for(var i=0;i<scope.pageTotal;i++){
                               var item = {};
                               item.name = i + 1;
                               item.value = i + 1;
                               scope.pageNoList.push(item);
                           }
                           //显示的页码列表
                           scope.pageShowList = scope.pageNoList.slice(0,parseInt(scope.groupSize));

                           //分组个数
                           scope.groupNo = Math.ceil(scope.pageTotal/scope.groupSize);
                           scope.isNextMore = scope.groupNo > 1;
                       }
                   })
                }
            };
            return dirs;
        })
})();