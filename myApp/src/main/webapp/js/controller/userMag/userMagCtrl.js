/**
 * Created by Administrator on 2017/2/22.
 */
(function () {
    angular.module("app")
        .controller("userMagCtrl",userMagCtrlFn);
    userMagCtrlFn.$inject = ["$scope","$rootScope"];
    function userMagCtrlFn($scope,$rootScope){

        window.sessionStorage.currentState = "userManage";
        window.sessionStorage.currentStateIndex = 7;

        console.log("$rootScope.userOk : " + $rootScope.userOK + "--- $rootScope.roleOk : " + $rootScope.roleOk);

        $scope.isUserAuthority = false;  //用户授权
        $scope.isRoleManage = false;    //角色管理
        $scope.isOnDutyState = false;   //值班状态

        $rootScope.isUserManagePage = false;
        $rootScope.isRoleManagePage = false;
        $rootScope.isOnDutyStatePage = false;

        if($rootScope.userOK){
            $scope.title="用户授权";
            $rootScope.isUserManagePage = true;
        }

        // if($rootScope.userOK){
        //     // $scope.title="用户授权";
        //     $scope.isUserAuthority = true;
        //     // $rootScope.isUserManagePage = true;
        //     if(!$rootScope.roleOk){
        //         $scope.title="用户授权";
        //         $scope.isRoleManage = false;
        //         $rootScope.isRoleManagePage = false;
        //         $rootScope.isUserManagePage = true;
        //     }
        // }
        // if($rootScope.roleOk){
        //
        //     if(!$rootScope.userOK){
        //         // $scope.title="角色管理";
        //         // $scope.isRoleManage = true;
        //         // $rootScope.isRoleManagePage = true;
        //         $scope.isUserManage = false;
        //         $scope.isUserManagePage = false;
        //     }
        //     $scope.title="角色管理";
        //     $scope.isRoleManage = true;
        //     $rootScope.isRoleManagePage = true;
        // }

        // index : 1 用户授权、2 角色管理 、3 值班状态 、4 返回主页面
        $scope.menuBtnClick = function (index) {
            $rootScope.isUserManagePage = false;
            $rootScope.isRoleManagePage = false;
            $rootScope.isOnDutyStatePage = false;
            if(index == 1){
                $scope.isUserAuthority = true;
                $scope.$broadcast("event.userAuthority");
                $scope.title="用户授权";

                $rootScope.isUserManagePage = true;
                $rootScope.isRoleManagePage = false;
                $rootScope.isOnDutyStatePage = false;
                
            }else if(index == 2){
                $scope.isRoleManage = true;
                $scope.$broadcast("event.roleManage");
                $scope.title="角色管理";

                $rootScope.isRoleManagePage = true;
                $rootScope.isUserManagePage = false;
                $rootScope.isOnDutyStatePage = false;
                
            }else if(index == 3){
                $scope.isOnDutyState = true;
                $scope.$broadcast("event.onDutyState");
                $scope.title="值班状态";

                $rootScope.isUserManagePage = false;
                $rootScope.isRoleManagePage = false;
                $rootScope.isOnDutyStatePage = true;
            }
            // else{
            //     $scope.isUserAuthority= true;
            //     //返回主页面
            //     // $scope.$emit("event.backToMain");
            // }
        }
    }
})();