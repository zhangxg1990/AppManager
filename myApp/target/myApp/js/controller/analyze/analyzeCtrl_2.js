/**
 * Created by Administrator on 2017/5/4.
 */
(function () {
    angular.module("app")
        .controller("analyzeCtrl_2",analyzeCtrl_2Fn);
    analyzeCtrl_2Fn.$inject = ["$scope","$log","$stateParams"];
    function analyzeCtrl_2Fn($scope,$log,$stateParams){

        $log.debug("$stateParams.index : " + $stateParams.index);
        $log.debug("analyzeChartUrl : " + window.config.analyzeChartUrl);
        $scope.analyzeChartPath = window.config.analyzeChartUrl;


        window.sessionStorage.currentState = "analyze";
        
        var index = $stateParams.index;

        $scope.isChartA = true;
        $scope.isChartB = false;
        $scope.isChartC = false;
        if(index == 2){
            $scope.isChartA = false;
            $scope.isChartB = true;
        }else if(index == 3){
            $scope.isChartA = false;
            $scope.isChartC = true;
        }
    }
})();
