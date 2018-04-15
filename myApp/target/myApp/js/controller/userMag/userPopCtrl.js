/**
 * 用户管理 弹框 ： 新增、编辑
 * Created by Administrator on 2017/2/13.
 */
(function () {
    angular.module("app")
        .controller("userPopCtrl",userPopCtrlFn);
    userPopCtrlFn.$inject = ["$scope","popData","$uibModal","$uibModalInstance","mainFactory"];
    function userPopCtrlFn($scope,popData,$uibModal,$uibModalInstance,mainFactory){
        
        $scope.title = popData.title;
        $scope.rolesList = [];
        $scope.rolesListCopy = [];

        $scope.userVo = utils.cloneObject(popData.data);//popData.data;

        //角色授权中搜索角色的关键字
        $scope.searchRoleStr = "";
        //选中的角色
        var vm = $scope.vm = {role:null};
        $scope.isUpdateKey = false;     //是否修改密码
        $scope.isAddUser = false;

        if(popData.state == "add_user"){
            $scope.isAddUser = true;
            $scope.isUpdateKey = true;
        }
        // //获取角色列表
        showRoleList();
        function showRoleList(){
            $scope.rolesList = [];
            $scope.rolesListCopy = [];
            mainFactory.getRoleList().then(showRoleListResult,ResultFault);
        }
        function showRoleListResult(result){
            angular.forEach(result,function (item) {
                var role = utils.vo.roleShowVo();
                role.id = item.id;
                role.name = item.name;
                role.alias = item.alias;
                role.resourceType = item.resourceType;
                role.note = item.note;
                role.dtoAuthorities = item.dtoAuthorities;//getNameByArr(item.dtoAuthorities);
                role.authorityNames = utils.getNamesInArray(item.dtoAuthorities).toString();
                role.createdTime = item.createdTime;
                role.lastModifiedTime = item.lastModifiedTime;
                $scope.rolesList.push(role);
                $scope.rolesListCopy.push(role);
            });
            $scope.vm.role = $scope.rolesList[0];

            if(popData.state == "add_user"){
                $scope.vm.role = $scope.rolesList[0];
            }else if(popData.state == "edit_user"){
                // console.log(popData);

                var curRole = popData.data.dtoRoles[0];
                for(var k=0;k<$scope.rolesList.length;k++){
                    var tmRole = $scope.rolesList[k];
                    if(tmRole.id == curRole.id){
                        $scope.vm.role = tmRole;
                    }
                }

            }

        }
        $scope.searchRoleClick = function () {
            $scope.rolesList = [];
            var temp = [];
            if(!$scope.searchRoleStr || $scope.searchRoleStr == "" || $scope.searchRoleStr == " "){
                temp = $scope.rolesListCopy;
            }else{
                angular.forEach($scope.rolesListCopy,function (item) {
                    if(item.name.indexOf($scope.searchRoleStr) > -1){
                        temp.push(item);
                    }
                });
            }
            $scope.rolesList = temp;
        };
        //是否修改密码；；；修改密码按钮点击事件
        $scope.updateKeyClick = function () {
            $scope.isUpdateKey = !$scope.isUpdateKey;
        };
        $scope.okClick = function (user) {
            console.log($scope.userVo);
            if(popData.state == "add_user"){
                if(!validateForm(user)){
                    return;
                }
                $scope.userVo.dtoRoles = [{id:vm.role.id}];
                // $scope.userObj.lastModifiedTime = new Date();
                // getRolesList();
                mainFactory.addUser(user).then(addUserResult,ResultFault);
            }else if(popData.state == "edit_user"){
                if(!validateForm(user)){
                    return;
                }
                user.dtoRoles = [{id:vm.role.id}];
                // $scope.userObj.lastModifiedTime = new Date();
                mainFactory.editUser(user,$scope.isUpdateKey).then(editUserResult,ResultFault);
            }else if(popData.state == "role_authorize"){
                if(!$scope.vm.role){
                    return;
                }
                user.dtoRoles = [{id:vm.role.id}];
                // $scope.userObj.lastModifiedTime = new Date();
                mainFactory.authorizeRole(user).then(authorizeRoleResult,ResultFault);
            }
            $uibModalInstance.close();
        };
        $scope.cancelClick = function(){
            $uibModalInstance.close();
        };
        function addUserResult(result){
            var item = result;
            item.dtoRoles = [vm.role];

            if(item.note.indexOf("error") > -1){
                var obj = {
                    title:"提示",
                    message:"添加用户失败：" + item.note,
                    do:function(){

                    }
                };
                utils.popWin($uibModal,"tpl/common/alertPop.html","alertPopCtrl",obj);
            }else{
                popData.flush(item);
            }


        }
        function editUserResult(result){
            var item = result;
            item.dtoRoles = [vm.role];
            popData.flush(item);
        }
        function ResultFault(fault){
            console.log("ResultFault : " + fault);
        }

        function authorizeRoleResult(result){
            var item = result;
            item.dtoRoles = [vm.role];
            popData.flush(item);
        }
        //验证表单是否为空
        function validateForm(user){
            var bool = true;
            //用户名
            if(!user.name || user.name == "" || user.name == " "){
                bool = false;
            }
            //修改密码
            if($scope.isUpdateKey){
                if(!user.password || user.password == "" || user.password == " "){
                    bool = false;
                }
            }
            //用户权限
            if(!vm.role){
                bool = false;

                var obj = {
                    title:"提示",
                    message:"添加用户失败，请选择角色，如果角色为空，请先创建角色！",
                    do:function(){

                    }
                };
                utils.popWin($uibModal,"tpl/common/alertPop.html","alertPopCtrl",obj);

            }

            return bool;
        }
    }
})();
