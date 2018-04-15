/**
 * 访问超时 timeOutCtrl
 * Created by Administrator on 2017/3/23.
 */
(function () {
    angular.module("app")
        .controller("timeOutCtrl",timeOutCtrlFn);
    timeOutCtrlFn.$inject = ["$scope","$uibModalInstance","popData"];//,"$state"
    function timeOutCtrlFn($scope,$uibModalInstance,popData) {      //$state,
        $scope.okClick = function () {
            $uibModalInstance.close();
            popData.flush();
        }
    }
    
})();
