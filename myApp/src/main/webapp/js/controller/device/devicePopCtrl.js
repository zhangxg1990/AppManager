/**
 * 新增、编辑 设备
 * Created by Administrator on 2017/5/3.
 */
(function () {
    angular.module("app")
        .controller("devicePopCtrl",devicePopCtrlFn);
    devicePopCtrlFn.$inject = ["$scope","popData","$uibModal","$uibModalInstance","mainFactory"];
    function devicePopCtrlFn($scope,popData,$uibModal,$uibModalInstance,mainFactory){
        $scope.title = popData.title;
        $scope.detector = utils.cloneObject(popData.data);

        $scope.optionList = [
            {name:"是",value:true},
            {name:"否",value:false}
        ];
        $scope.optionObj = $scope.optionList[0];

        $scope.okClick = function(){

            if(!checkFormInput($scope.detector.deviceId)) return;
            // if(!checkFormInput($scope.detector.memTotal)) return;
            // if(!checkFormInput($scope.detector.cpuInfo)) return;
            // if(!checkFormInput($scope.detector.diskInfo)) return;
            // if(!checkFormInput($scope.detector.softVersion)) return;
            // if(!checkFormInput($scope.detector.interfaceInfo)) return;
            if(!checkFormInput($scope.detector.organs)) return;
            if(!checkFormInput($scope.detector.address)) return;

            if(popData.state == "add"){
                mainFactory.detectorAdd($scope.detector).then(addResult,resultFault);
            }else if(popData.state == "edit"){
                var temp = {
                    id:$scope.detector.id,
                    deviceId:$scope.detector.deviceId,    //检测器名称
                    memTotal:$scope.detector.memTotal,    //内存总量
                    cpuInfo:$scope.detector.cpuInfo,     //CPU信息
                    diskInfo:$scope.detector.diskInfo,    //磁盘信息
                    softVersion:$scope.detector.softVersion,     //产品软件版本号
                    interfaceInfo:$scope.detector.interfaceInfo,       //接口信息
                    organs:$scope.detector.organs,              //部署单位
                    address:$scope.detector.address    //管理中心部署位置信息
                };
                mainFactory.detectorEdit(temp).then(editResult,resultFault);
            }
            $uibModalInstance.close();
        };
        $scope.cancelClick = function(){
            $uibModalInstance.close();
        };
        function checkFormInput(value){
            var bool = true;
            if(!value || value == ""){
                bool = false;
            }
            return bool;
        }
        function addResult(result){

            if(result.note && result.note.indexOf("检测器编号重复") > -1){
                var obj = {
                    title:"提示",
                    message:"检测器编号不能重复，请重新添加!",
                    do:function () {

                    }
                };
                utils.popWin($uibModal,"tpl/common/alertPop.html","alertPopCtrl",obj);
                return;
            }

            var item = {
                id:result.id,
                deviceId:result.deviceId,    //检测器名称
                memTotal:result.memTotal,    //内存总量
                cpuInfo:result.cpuInfo,     //CPU信息
                diskInfo:result.diskInfo,    //磁盘信息
                softVersion:result.softVersion,     //产品软件版本号
                interfaceInfo:result.interfaceInfo,       //接口信息
                organs:result.organs,              //部署单位
                address:result.address ,   //管理中心部署位置信息
                createdTime:utils.strToTime2(result.createdTime)
            };
            popData.flush(item);
        }
        function editResult(result){
            if(result.note && result.note.indexOf("检测器编号重复") > -1){
                var obj = {
                    title:"提示",
                    message:"检测器编号不能重复，请重新修改!",
                    do:function () {

                    }
                };
                utils.popWin($uibModal,"tpl/common/alertPop.html","alertPopCtrl",obj);
                return;
            }
            popData.flush(result);
        }
        function resultFault(fault){
            console.log("fault : " + fault);
        }
    }
})();
