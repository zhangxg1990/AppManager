/**
 * 角色管理 弹框controller
 * Created by Administrator on 2017/2/13.
 */
(function () {
    angular.module("app")
        .controller("rolePopCtrl",rolePopCtrlFn);
    rolePopCtrlFn.$inject = ["$scope","popData","$uibModal","$uibModalInstance","mainFactory"];
    function rolePopCtrlFn($scope,popData,$uibModal,$uibModalInstance,mainFactory){
        
        $scope.title = popData.title;
        $scope.role = utils.cloneObject(popData.data);
        $scope.authorityList = popData.authorityList;

        //表单验证：角色名称不能为空 
        $scope.isRoleNameNull = false;

        //重置权限
        angular.forEach($scope.authorityList,function(item){
           item.checked = false;
        });

        // var tempAuthorityList =
        if(popData.state == "edit_role"){
            for(var i=0;i<$scope.role.dtoAuthorities.length;i++){
                var auth = $scope.role.dtoAuthorities[i];
                for(var j=0;j<$scope.authorityList.length;j++){
                    var sub = $scope.authorityList[j];
                    if(auth.id == sub.id){
                        sub.checked = true;
                    }
                }
            }
        }

        
        $scope.okClick = function () {

            var role = {};
            role.name =  $scope.role.name;
            role.dtoAuthorities = getAuthorityIdList($scope.authorityList);
            role.note = $scope.role.note;

            //验证“角色名”是否为空
            if(!role.name || role.name == "" || role.name == " "){
                return;
            }

            // 验证“权限列表”是否为空
            if(role.dtoAuthorities.length < 1){
                return;
            }

            if(popData.state == "add_role"){
                mainFactory.addRole(role).then(addRoleResult,resultFault);
            }else if(popData.state == "edit_role"){
                role.id = $scope.role.id;
                mainFactory.editRole(role).then(editRoleResult,resultFault);
            }
            $uibModalInstance.close();
        };
        $scope.cancelClick = function () {
            $uibModalInstance.close();
        };
        function getAuthorityIdList(arr){
            var temp = [];
            angular.forEach(arr,function(item){
                if(item.checked){
                    // var authorityVo = utils.vo.authorityVo();
                    // authorityVo.id = item.id;
                    // authorityVo.name = item.name;
                    // authorityVo.alias = item.alias;
                    // authorityVo.uri = item.uri;
                    // authorityVo.httpMethod = item.httpMethod;
                    // temp.push(authorityVo);

                    temp.push({id:item.id});
                }
            });
            return temp;
        }
        function addRoleResult(result){
            console.log("addRoleResult : " + result);
            // popData.flush(result);
            var item = result;
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
        function editRoleResult(result){
            console.log("editRoleResult : " + result);
            popData.flush(result);
        }
        function resultFault(fault){
            console.log("resultFault : " + fault);
        }
        
        // //表单验证
        // function validateForm(role){
        //     var bool = true;
        //     $scope.isRoleNameNull = false;
        //     if(!role.name || role.name == "" || role.name == " "){
        //         // $scope.isRoleNameNull = true;
        //         bool = false;
        //         $scope.role.name = "";
        //     }
        //     return bool;
        // }
    }
})();
