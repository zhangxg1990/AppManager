/**
 * Created by Administrator on 2017/5/2.
 */
(function () {
    angular.module("app")
        .controller("deviceRegisterCtrl",deviceRegisterCtrlFn);
    deviceRegisterCtrlFn.$inject = ["$scope","$rootScope","$uibModal","mainFactory","$log"];
    function deviceRegisterCtrlFn($scope,$rootScope,$uibModal,mainFactory,$log){

        window.sessionStorage.currentState = "deviceRegister";
        window.sessionStorage.currentStateIndex = 8;
        
        $scope.title = "设备注册";
        
        $scope.deviceList = [];
        $scope.deviceListShow = [];
        $scope.isSearch = false;
        $scope.searchStr = "";
        $scope.searchList = [];

        //分页
        $scope.isPaging = false;
        $scope.pageTotal = 0;
        $scope.pageSize = 20;
        $scope.groupSize = 5;
        $scope.currentPage = 1;

        $rootScope.isLoading = false;

        getDeviceList();

        function getDeviceList(){
            var obj = {
                page:1,
                pageSize:$scope.pageSize
            };
            $rootScope.isLoading = true;
            mainFactory.detectorList(obj).then(detectorListResult,resultFault);
        }
        function detectorListResult(result){
            $log.debug("result : " + result);
            $rootScope.isLoading = false;
            // $scope.deviceList = result.content;
            $scope.deviceList = [];
            angular.forEach(result.content,function (item) {
               item.createdTime = utils.strToTime2(item.createdTime);
                $scope.deviceList.push(item);
            });

            checkIsPaging();
        }
        function resultFault(fault){
            $rootScope.isLoading = false;
            $log.debug("fault : " + fault);
        }
        //分页事件
        $scope.pageChangeFn = function (page) {
            $log.debug("page : " + page);
            var start = (page - 1) * $scope.pageSize;
            var end = page * $scope.pageSize;
            if($scope.isSearch){
                $scope.deviceListShow = $scope.searchList.slice(start,end);
            }else{
                $scope.deviceListShow = $scope.deviceList.slice(start,end);
            }
        };
        //搜索
        $scope.searchClick = function () {
            $log.debug("searchStr : " + $scope.searchStr);
            if(!$scope.searchStr || $scope.searchStr == ""){
                $scope.isSearch = false;
                $scope.searchList = $scope.deviceList;
            }else{
                $scope.isSearch = true;
                $scope.searchList = [];
                angular.forEach($scope.deviceList,function (item) {
                    if(item.deviceId.indexOf($scope.searchStr) > -1){
                        $scope.searchList.push(item);
                    }
                });
            }
            checkIsPaging();
        };
        //查看是否分页
        function checkIsPaging(){
            if($scope.isSearch){
                $scope.isPaging = false;
                setPaging($scope.searchList);
            }else{
                setPaging($scope.deviceList);
            }
        }
        //设置分页
        function setPaging(list){
            var start = 0;
            var end = 0;
            if(list.length > $scope.pageSize){
                end = $scope.pageSize;
                $scope.isPaging = true;
            }else{
                end = $scope.deviceList.length;
                $scope.isPaging = false;
            }
            $scope.currentPage = 1;
            $scope.pageTotal = Math.ceil(list.length / $scope.pageSize);
            $scope.deviceListShow = list.slice(start,end);
        }
        //添加设备
        $scope.addDeviceClick = function () {
            var obj = {
                title:"新增设备",
                state:"add",
                data:{
                    deviceId:"",    //检测器名称
                    memTotal:"",    //内存总量
                    cpuInfo:"",     //CPU信息
                    diskInfo:"",    //磁盘信息
                    softVersion:"",     //产品软件版本号
                    interfaceInfo:"",       //接口信息
                    organs:"",              //部署单位
                    address:"",    //管理中心部署位置信息,
                    createdTime:""      //创建时间
                },
                flush:function (data) {
                    $scope.deviceList.push(data);
                    checkIsPaging();
                }
            };
            utils.popWin($uibModal,"tpl/device/devicePop.html","devicePopCtrl",obj);
        };
        //编辑设备
        $scope.editDeviceClick = function(item){
            var obj = {
                title:"编辑设备",
                state:"edit",
                data:item,
                flush:function (data) {
                    for(var i=0;i<$scope.deviceList.length;i++){
                        var item = $scope.deviceList[i];
                        if(data.id == item.id){
                            item.deviceId = data.deviceId;//检测器编号
                            item.memTotal = data.memTotal;    //内存总量
                            item.cpuInfo = data.cpuInfo;     //CPU信息
                            item.diskInfo = data.diskInfo;    //磁盘信息
                            item.softVersion = data.softVersion;     //产品软件版本号
                            item.interfaceInfo = data.interfaceInfo;       //接口信息
                            item.organs = data.organs;              //部署单位
                            item.address = data.address;    //管理中心部署位置信息
                            item.createdTime = utils.strToTime2(data.createdTime);    //创建时间
                        }
                    }
                    if($scope.isSearch){
                        for(var j=0;j<$scope.searchList.length;j++){
                            var itm = $scope.searchList[j];
                            if(data.id == item.id){
                                itm.deviceId = data.deviceId;//检测器编号
                                itm.memTotal = data.memTotal;    //内存总量
                                itm.cpuInfo = data.cpuInfo;     //CPU信息
                                itm.diskInfo = data.diskInfo;    //磁盘信息
                                itm.softVersion = data.softVersion;     //产品软件版本号
                                itm.interfaceInfo = data.interfaceInfo;       //接口信息
                                item.organs = data.organs;              //部署单位
                                itm.address = data.address;    //管理中心部署位置信息
                                item.createdTime = utils.strToTime2(data.createdTime);     //创建时间
                            }
                        }
                    }
                }
            };
            utils.popWin($uibModal,"tpl/device/devicePop.html","devicePopCtrl",obj);
        };
        //删除设备
        $scope.deleteDeviceClick = function(item){
            var str = '确定删除 " ' + item.deviceId + ' "吗?';
            var obj = {
                title:"删除设备",
                message:str,
                do:function () {
                    deleteDevice(item);
                }
            };
            utils.popWin($uibModal,"tpl/common/alertPop.html","alertPopCtrl",obj);
        };
        function deleteDevice(item){
            mainFactory.detectorDelete(item).then(detectorDeleteResult,resultFault);
        }
        function detectorDeleteResult(result){
            $log.debug("result : " + result);

            for(var i=0;i<$scope.deviceList.length;i++){
                var item = $scope.deviceList[i];
                if(result.id == item.id){
                    $scope.deviceList.splice(i,1);
                }
            }
            if($scope.isSearch){
                for(var j=0;j<$scope.searchList.length;j++){
                    var itm = $scope.searchList[j];
                    if(result.id == itm.id){
                        $scope.searchList.splice(j,1);
                    }
                }
            }
            checkIsPaging();
        }
    }
})();
