/**
 * 值班状态controller
 * Created by Administrator on 2017/2/18.
 */
(function(){
    "use strict";
    angular.module("app")
        .controller("onDutyCtrl",onDutyCtrlFn);
    onDutyCtrlFn.$inject = ["$scope"];
    function onDutyCtrlFn($scope){

        $scope.onDutyList = [];
        // $scope.isPaging = true;

        $scope.$on("event.onDutyState",function (data) {
            
            console.log("showOnDutyState :: -------------" );
            $scope.onDutyList = [
                {name:"admin",role:"管理员",telephone:"010-66666666",loginTime:"2017-01-01 10:00;00",css:"test-css-success"},
                {name:"user",role:"普通用户",telephone:"010-66666666",loginTime:"2017-01-01 10:00;00",css:"test-css-orange"},
                {name:"abc",role:"普通用户",telephone:"010-87654321",loginTime:"2017-01-01 10:00;00",css:"test-css-success"},
                {name:"abc",role:"普通用户",telephone:"010-87654321",loginTime:"2017-01-01 10:00;00",css:"test-css-success"},
                {name:"123",role:"普通用户",telephone:"010-66666666",loginTime:"2017-01-01 10:00;00",css:"test-css-success"},
                {name:"bob",role:"普通用户",telephone:"010-12345678",loginTime:"2017-01-01 10:00;00",css:"test-css-orange"},
                {name:"abc",role:"普通用户",telephone:"010-87654321",loginTime:"2017-01-01 10:00;00",css:"test-css-success"},
                {name:"ccc",role:"普通用户",telephone:"010-12345678",loginTime:"2017-01-01 10:00;00",css:"test-css-orange"},
                {name:"abc",role:"普通用户",telephone:"010-87654321",loginTime:"2017-01-01 10:00;00",css:"test-css-success"},
                {name:"abc",role:"普通用户",telephone:"010-87654321",loginTime:"2017-01-01 10:00;00",css:"test-css-orange"},
                {name:"abc",role:"普通用户",telephone:"010-87654321",loginTime:"2017-01-01 10:00;00",css:"test-css-success"},
                {name:"abc",role:"普通用户",telephone:"010-87654321",loginTime:"2017-01-01 10:00;00",css:"test-css-orange"},
                {name:"abc",role:"普通用户",telephone:"010-87654321",loginTime:"2017-01-01 10:00;00",css:"test-css-success"}
            ];
        });

        $scope.pageList = [
            {name:"1"},{name:"2"},{name:"3"},{name:"4"},{name:"5"},{name:"6"},{name:"7"}
        ];

        $scope.pageChangeFn = function (page) {
            console.log("page : " + page);
        };

        $scope.rowClick = function (row) {
            row.addClass("tr-user-manage");
        };
    }
})();