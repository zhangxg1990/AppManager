/**
 * Created by Administrator on 2017/1/23.
 */
(function () {
    angular.module("app")
        .controller("manageCtrl",manageCtrlFun);
    manageCtrlFun.$inject = ["$scope","$uibModal","mainFactory"];

    function manageCtrlFun($scope,$uibModal,mainFactory){

        window.sessionStorage.currentState = "manage";
        window.sessionStorage.currentStateIndex = 6;

        $scope.isPaging = false;
        $scope.expandSysList = [];
        $scope.expandSysListCopy = [];

        //分页
        $scope.pageTotal = 1;
        $scope.pageSize = 20;
        $scope.groupSize = 5;
        
        expandSystemList();
        function expandSystemList(){
            var data = {
                pageNo:1,
                pageSize:20
            };
            mainFactory.expandSystemList(data).then(expandSysListResult,resultFault);
        }
        function expandSysListResult(result){
            
            $scope.expandSysListCopy = result.content;

            if(!$scope.expandSysListCopy || !angular.isArray($scope.expandSysListCopy)){
                return;
            }

            if($scope.expandSysListCopy.length > $scope.pageSize){
                $scope.isPaging = true;
                $scope.pageTotal = Math.ceil($scope.expandSysListCopy.length/$scope.pageSize);
                var start = 0;
                var end = $scope.pageSize;
                $scope.expandSysList = $scope.expandSysListCopy.slice(start,end);
            }else {
                $scope.expandSysList = $scope.expandSysListCopy;
            }
        }

        $scope.registerClick = function(){
            var vo = utils.vo.expandSystemVo();
            var data = {
                title:"添加系统",
                state:"add",
                data:vo,
                flush:function (it) {
                    $scope.expandSysList.push(it);
                }
            };
            utils.popWin($uibModal,"tpl/manage/managePop.html","managePopCtrl",data);
        };
        $scope.manageClick = function (item) {
            // var vo = utils.vo.expandSystemVo();
            var data = {
                title:"编辑系统",
                state:"edit",
                data:item,
                flush:function (it) {
                    for(var i=0;i<$scope.expandSysList.length;i++){
                        var temp = $scope.expandSysList[i];
                        if(temp.id == it.id){
                            $scope.expandSysList[i] = it;
                            return;
                        }
                    }
                }
            };
            utils.popWin($uibModal,"tpl/manage/managePop.html","managePopCtrl",data);
        };
        $scope.logoutClick = function(item){
            var str = "确定删除系统：" + item.name + "？";
            var obj = {
                title:"删除",
                message:str,
                do:function () {
                    //注销系统的代码。。。
                    mainFactory.deleteExpandSystem(item).then(deleteExpSysResult,resultFault);
                }
            };
            utils.popWin($uibModal,"tpl/common/alertPop.html","alertPopCtrl",obj);
        };

        function deleteExpSysResult(result){
            // console.log("deleteExpSysResult : " + result);
            $scope.expandSysList = deleteArrayItemById($scope.expandSysList,result.id);

        }
        function resultFault(fault){
            console.log("fault : " + fault);
        }

        function deleteArrayItemById(arr,id){
            if(!arr || arr.length < 1 || !id || id =="" || id == " ")
            {
                return;
            }
           for(var i=0;i<arr.length;i++){
               var temp = arr[i];
               if(temp.id == id){
                   arr.splice(i,1);
                   return arr;
               }
           }
        }
        //分页
        $scope.pageChangeFn = function(page){
            console.log("page : " + page);
            var start = (page-1)*$scope.pageSize;
            var end = page*$scope.pageSize;
            $scope.expandSysList = $scope.expandSysListCopy.slice(start,end);
        }
    }
})();