/**
 * Created by Administrator on 2017/2/9.
 */
(function () {
    angular.module("app")
        .controller("managePopCtrl",managePopCtrlFn);
    managePopCtrlFn.$inject = ["$scope","$uibModalInstance","popData","mainFactory"];
    function managePopCtrlFn($scope,$uibModalInstance,popData,mainFactory){
        
        $scope.title = popData.title;
        $scope.item = utils.cloneObject(popData.data);

        $scope.okClick = function(){
            
            if(!$scope.item.name || $scope.item.name == "" || $scope.item.name == " "){
                return;
            }
            
            var obj = {};
            obj.name = $scope.item.name;
            obj.note = $scope.item.note;
            obj.phone = $scope.item.phone;
            obj.original = $scope.item.original;
            obj.url = $scope.item.url;
            if(popData.state == "add"){
                mainFactory.addExpandSystem(obj).then(addExpandSysResult,resultFault);
            }else if(popData.state == "edit"){
                obj.id = $scope.item.id;
                mainFactory.editExpandSystem(obj).then(editExpandSysResult,resultFault);
            }
            $uibModalInstance.close();
        };

        $scope.cancelClick = function () {
            $uibModalInstance.close();
        };

        function addExpandSysResult(result){
            popData.flush(result);
        }
        function editExpandSysResult(result){
            popData.flush(result);
        }
        function resultFault(fault){
            console.log("resultFault : " + fault);
        }
        
    }
})();
