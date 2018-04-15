/**
 * Created by Administrator on 2017/2/17.
 */
/**
 * Created by Administrator on 2017/2/10.
 */
(function () {
    "use strict";
    angular.module("app")
        .controller("roleManageCtrl",roleManageCtrlFn);
    roleManageCtrlFn.$inject = ["$scope","$rootScope","$uibModal","mainFactory"];
    function roleManageCtrlFn($scope,$rootScope,$uibModal,mainFactory){
        
        $scope.roleList = [];
        $scope.roleListCopy = [];
        $scope.searchList = [];
        $scope.selected = null;     //选择编辑、删除的项

        $scope.authorityList = utils.authorityList();
        $scope.searchRoleStr = "";          //搜索框，搜索内容
        $scope.isSearch = false;
        $scope.isPaging = false;

        //分页
        $scope.pageTotal = 1;
        $scope.pageSize = 20;
        $scope.groupSize = 5;

        $scope.$on("event.roleManage",function(evt){
            console.log("evt :" + evt);
            showRoleList();
        });

        if($rootScope.isRoleManagePage){
            showRoleList();
        }

        
        function showRoleList(){
            $scope.roleList = [];
            $scope.roleListCopy = [];
            $scope.isPaging = false;
            $scope.isSearch = false;
            mainFactory.getRoleList().then(showRoleListResult,resultFault);
        }
        function showRoleListResult(result){

            if(!result || !angular.isArray(result)){
                return;
            }
            angular.forEach(result,function (item) {
                var role = utils.vo.roleShowVo();
                role.id = item.id;
                role.name = item.name;
                role.alias = item.alias;
                role.resourceType = item.resourceType;
                role.note = item.note;
                role.dtoAuthorities = item.dtoAuthorities;//getNameByArr(item.dtoAuthorities);
                role.authorityNames = utils.getNamesInArray(item.dtoAuthorities).toString();
                role.createdTime = utils.strToTime2(item.createdTime);
                role.lastModifiedTime = utils.strToTime2(item.lastModifiedTime);
                // $scope.roleList.push(role);
                $scope.roleListCopy.push(role);
            });

            $scope.pageTotal = Math.ceil($scope.roleListCopy.length/$scope.pageSize);
            if($scope.pageTotal > 1){
                $scope.isPaging = true;
            }
            var start = 0;
            var end = $scope.pageSize;
            $scope.roleList = $scope.roleListCopy.slice(start,end);
        }
        $scope.searchRoleClick = function () {

            $scope.roleList = [];
            var key = $scope.searchRoleStr.trim();
            var tempArr = [];
            if(key == ""){
                $scope.isSearch = false;
                tempArr = $scope.roleListCopy;
            }else{
                $scope.isSearch = true;
                $scope.searchList = utils.getDataInArrayByName($scope.roleListCopy,$scope.searchRoleStr);
                tempArr = $scope.searchList;
            }
            //分页
            $scope.pageTotal = Math.ceil(tempArr.length/$scope.pageSize);
            $scope.isPaging = false;
            if($scope.pageTotal > 1){
                $scope.isPaging = true;
                var start = 0;
                var end = $scope.pageSize;
                $scope.roleList = tempArr.slice(start,end);
            }else{
                $scope.roleList = tempArr;
            }
        };
        $scope.addRoleClick = function(){
            var role = utils.vo.roleShowVo();
            var data = {
                title:"添加角色",
                state:"add_role",
                data:role,
                authorityList:$scope.authorityList,
                flush:function (item) {
                    // item.authorityNames = utils.getNamesInArray(item.authorities).toString();

                    //需要根据权限的id，来从权限配置文件中得到权限的名称
                    item.authorityNames = getNamesFromConfig($scope.authorityList,item.dtoAuthorities);
                    item.lastModifiedTime = utils.strToTime2(item.lastModifiedTime);
                    $scope.roleList.push(item);
                    $scope.roleListCopy.push(item);
                }
            };
            utils.popWin($uibModal,"tpl/userMag/rolePop.html","rolePopCtrl",data);
        };

        function getNamesFromConfig(configArr,idArr){

            if(!idArr || idArr.length == 0){
                return "";
            }
            var temp = [];
            angular.forEach(idArr,function (item) {
                var id = item.id;
                angular.forEach(configArr,function(conf){
                    if(id == conf.id){
                        temp.push(conf.name);
                    }
                })
            });
            return temp.toString();
        }

        $scope.editRoleClick = function(item){
            $scope.selected = item;
            var data = {
                title:"编辑角色",
                state:"edit_role",
                data:item,
                authorityList:$scope.authorityList,
                flush:function (role) {
                    role.authorityNames = utils.getNamesInArray(role.dtoAuthorities).toString();
                    role.lastModifiedTime = utils.strToTime2(role.lastModifiedTime);
                    utils.replaceArrayItemById($scope.roleList,role);
                }
            };
            utils.popWin($uibModal,"tpl/userMag/rolePop.html","rolePopCtrl",data);
        };
        $scope.deleteRoleClick = function (item) {
            var str = "确定删除角色 " + item.name + " 吗?";
            var data = {
                title:"删除角色",
                state:"delete_role",
                message:str,
                data:item,
                do:function(){
                    deleteRole(item);
                }
            };
            utils.popWin($uibModal,"tpl/common/alertPop.html","alertPopCtrl",data);
        };
        function deleteRole(item){
            $scope.selected = item;
            mainFactory.deleteRole(item).then(deleteRoleResult,resultFault);
        }
        function deleteRoleResult(result){

            if($scope.selected.id == result.id){
                console.log("删除成功 ！");
                var tmp = utils.deleteItemById($scope.roleList,result.id);
                $scope.roleList = tmp;
                $scope.roleListCopy = tmp;
                $scope.selected = null;
            }
        }
        function resultFault(fault){
            console.log("resultFault : " + fault);
        }

        //分页
        $scope.pageChangeFn = function(page){
            var start = (page-1)*$scope.pageSize;
            var end = page*$scope.pageSize;
            if($scope.isSearch){
                $scope.roleList = $scope.searchList.slice(start,end);
            }else{
                $scope.roleList = $scope.roleListCopy.slice(start,end);
            }
        }
    }
})();