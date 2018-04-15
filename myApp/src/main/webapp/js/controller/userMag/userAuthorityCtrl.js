/**
 * Created by Administrator on 2017/2/10.
 */
(function () {
    "use strict";
    angular.module("app")
        .controller("userAuthorityCtrl",userManageCtrlFn);
    userManageCtrlFn.$inject = ["$scope","$rootScope","$uibModal","mainFactory"];  //
    function userManageCtrlFn($scope,$rootScope,$uibModal,mainFactory){        //,userFactory
        
        $scope.searchUserStr = "";          //搜索框，搜索内容
        $scope.userList = [];
        $scope.userListCopy = [];
        $scope.searchList = [];

        $scope.isSearch = false;    //是否是搜索状态
        $scope.isPaging = false;    //是否显示分页
        $scope.selected = null;     //选择编辑、删除的项
        
        //分页
        $scope.currentPage = 1;
        $scope.pageTotal = 1;
        $scope.pageSize = 20;
        $scope.groupSize = 5;

        if($rootScope.isUserManagePage){
            showUserList();
        }

        $scope.$on("event.userAuthority",function () {
            showUserList();
        });
        //--------------------用户管理：用户列表、用户查询、新增、编辑、删除、角色授权
        function showUserList(){
            $scope.userList = [];
            $scope.userListCopy = [];
            mainFactory.getUserList().then(showUserListResult,resultFault);
        }
        function showUserListResult(result){
            
            if(!result || !angular.isArray(result)){
                return;
            }
            angular.forEach(result,function (item) {
                var user = utils.vo.userVo();
                user.id = item.id;
                user.name = item.name;
                user.alias = item.alias;
                user.resourceType = item.resourceType;
                user.note = item.note;
                user.authorities = item.authorities;//getNameByArr(item.authorities);
                user.authorityNames = utils.getNamesInArray(item.authorities).toString();
                user.dtoRoles = item.dtoRoles;//getNameByArr(item.dtoRoles);
                user.rolesNames = utils.getNamesInArray(item.dtoRoles).toString();
                user.createdTime = utils.strToTime2(item.createdTime);
                user.createdTimeCopy = item.createdTime;
                user.lastModifiedTime = utils.strToTime2(item.lastModifiedTime);
                // $scope.userList.push(user);
                $scope.userListCopy.push(user);
            });

            $scope.pageTotal = Math.ceil($scope.userListCopy.length/$scope.pageSize);
            $scope.isPaging = false;
            if($scope.pageTotal > 1){
                $scope.isPaging = true;
                var start = 0;
                var end = $scope.pageSize;
                $scope.userList = $scope.userListCopy.slice(start,end);
            }else{
                $scope.userList = $scope.userListCopy;
            }
        }
        $scope.searchUserClick = function () {
            var key = $scope.searchUserStr.trim();
            $scope.userList = [];
            $scope.isSearch = true;
            var temp = [];
            if(key == ""){
                $scope.isSearch = false;
                temp = $scope.userListCopy;
            }else{
                $scope.searchList = utils.getDataInArrayByName($scope.userListCopy,key);
                temp = $scope.searchList;
            }
            var start = 0;
            var end = $scope.pageSize;
            $scope.userList = temp.slice(start,end);
            $scope.pageTotal = Math.ceil(temp.length/$scope.pageSize);
            $scope.isPaging = $scope.pageTotal > 1;
        };
        $scope.addUserClick = function () {
            var user = utils.vo.userVo();
            var data = {
                title:"添加用户",
                state:"add_user",
                data:user,
                flush:function (item) {
                    item.rolesNames = utils.getNamesInArray(item.dtoRoles).toString();
                    item.authorityNames = utils.getNamesInArray(item.authorities).toString();
                    item.createdTime = utils.strToTime2(item.createdTime);
                    item.lastModifiedTime = utils.strToTime2(item.lastModifiedTime);
                    // $scope.userList.push(item);
                    $scope.userListCopy.push(item);

                    //重新计算分页
                    $scope.pageTotal = Math.ceil($scope.userListCopy.length/$scope.pageSize);
                    $scope.isPaging = false;
                    if($scope.pageTotal > 1){
                        $scope.isPaging = true;
                        var start = 0;
                        var end = $scope.pageSize;
                        $scope.userList = $scope.userListCopy.slice(start,end);
                    }else{
                        $scope.userList = $scope.userListCopy;
                    }
                }
            };
            utils.popWin($uibModal,"tpl/userMag/userPop.html","userPopCtrl",data);
        };
        $scope.editUserClick = function(item){
            var data = {
                title:"编辑用户",
                state:"edit_user",
                data:item,
                flush:function (user) {
                    // showUserList();
                    user.rolesNames = utils.getNamesInArray(user.dtoRoles).toString();
                    user.createdTime = item.createdTime;//utils.strToTime(item.createdTime);
                    user.lastModifiedTime = item.lastModifiedTime;//utils.strToTime(item.lastModifiedTime);
                    utils.replaceArrayItemById($scope.userList,user);
                }
            };
            utils.popWin($uibModal,"tpl/userMag/userPop.html","userPopCtrl",data);
        };
        $scope.deleteUserClick = function (item) {
            var str = "确定删除用户 " + item.name + " 吗？";
            var data = {
                title:"删除用户",
                message:str,
                do:function () {
                    deleteUser(item);
                }
            };
            utils.popWin($uibModal,"tpl/common/alertPop.html","alertPopCtrl",data);
        };
        //用户授权
        $scope.authorizeRoleClick = function (item) {
            var data = {
                title:"角色授权",
                state:"role_authorize",
                data:item,
                flush:function (user) {
                    // showUserList();
                    user.rolesNames = utils.getNamesInArray(user.dtoRoles).toString();
                    user.createdTime = utils.strToTime(item.createdTime);
                    user.lastModifiedTime = utils.strToTime(item.lastModifiedTime);
                    utils.replaceArrayItemById($scope.userList,user);
                }
            };
            utils.popWin($uibModal,"tpl/userMag/authorizeRolePop.html","userPopCtrl",data,"sm");
        };
        //删除用户
        function deleteUser(item){
            $scope.selected = item;
            mainFactory.deleteUser(item).then(deleteUserResult,resultFault);
        }
        function deleteUserResult(result){
            if($scope.selected.id == result.id){
                var tmp = utils.deleteItemById($scope.userList,result.id);
                $scope.userList = tmp;
                $scope.userListCopy = tmp;
                $scope.selected = null;
            }
        }
        function resultFault(fault){
            console.log("resultFault : " + fault);
        }
        //分页
        $scope.pageChangeFn = function(page){
            var start = (page - 1)*$scope.pageSize;
            var end = page*$scope.pageSize;
            if($scope.isSearch){
                $scope.userList = $scope.searchList.slice(start,end);
            }else{
                $scope.userList = $scope.userListCopy.slice(start,end);
            }
        }
    }
})();