/**
 * 提示框 controller
 * Created by Administrator on 2017/2/10.
 */
(function () {
    angular.module("app")
        .controller("alertPopCtrl",alertPopCtrlFn);
    alertPopCtrlFn.$inject = ["$scope","$uibModalInstance","popData"];
    function alertPopCtrlFn($scope,$uibModalInstance,popData) {
        $scope.title = "提示";
        $scope.message = "描述信息";

        $scope.isCancelBtn = true;  //是否显示“取消”按钮

        if(popData){
            $scope.title = popData.title;
            $scope.message = popData.message;

            if(popData.hasOwnProperty("isCancelBtn")){
                $scope.isCancelBtn = popData.isCancelBtn;
            }
        }
        
        $scope.okClick = function () {
            $uibModalInstance.close();
            if(popData){
                popData.do();
            }
        };
        $scope.cancelClick = function(){
            $uibModalInstance.close();
        };
    }
})();
