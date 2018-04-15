/**
 * Created by Administrator on 2017/1/18.
 */
(function(){
    'use strict';
    angular.module("app")
        .controller("alertCtrl",alertCtrlFun);
    alertCtrlFun.$inject = ["$scope","$rootScope","$uibModal","mainFactory"];//,"$http"
    function alertCtrlFun($scope,$rootScope,$uibModal,mainFactory){ //,$http
        
        window.sessionStorage.currentState = "alert";
        window.sessionStorage.currentStateIndex = 3;

        $scope.title = "告警处置";     //页面标题：告警处置、处置历史记录
        $scope.isResourceFile = false;  //资源文件告警处置
        $scope.isDealHistory = false;   //是否显示告警处置记录
        $scope.isMoreSearch = false;    //展开更多查询条件

        //table树Data
        $scope.treeSelected = null;     //当前选择的管理中心或设备
        $scope.expandNodes = [];
        $scope.treeData = [];
        $scope.alertTypeList = [];

        $scope.currentAlertType = "exploitAttack";//null;// "trojanAttack"; //当前选择的告警类型，默认显示 漏洞攻击
        $scope.dealHistoryList = [];    //告警处置记录，历史记录
        $scope.dealHistoryListCopy = [];    //告警处置记录，历史记录copy

        $scope.isDataCheckListOK = false;
        $scope.dataCheckListO = null;

        $scope.tableHeadList = [];      //告警信息列表 表头
        $scope.tableDataList = [];      //告警信息列表

        $scope.alertDealTitle = "漏洞利用窃密攻击告警";//"木马攻击窃密告警日志";
        $scope.alertDealType = "exploitAttack";//"trojan_attack";

        $rootScope.isLoading = false;
        $scope.isNoData = false;     //无数据
        $scope.isNoDataHis = false; //历史记录无数据

        $scope.disposalStatus = -1;  //处置状态btn-group：-1 全部，0 未处置，1已处置

        //分页
        $scope.isPaging = false;
        $scope.currentPage = 1;
        $scope.pageTotal = 1;
        $scope.pageSize = 20;
        $scope.groupSize = 5;
        $scope.listTotal = 0;   //总数

        //处置记录分页
        $scope.isPagingHis = false;
        $scope.currentPageHis = 1;
        $scope.pageTotalHis = 1;
        $scope.pageSizeHis = 20;
        $scope.groupSizeHis = 5;
        $scope.listTotalHis = 0;   //总数

        $scope.propertyShow = null;

        //处置状态
        $scope.dealStatusList = [
            {name:"全部",value:"-1",css:""},
            {name:"已处置",value:"1",css:"by_but_more"},
            {name:"未处置",value:"0",css:"by_but_more"}
        ];
        
        /**
         *  查询条件：
         *  告警级别 alertLevel
         * **/
        $scope.alertLevel = {
            name:"告警级别",
            children:[
                {name:"全部",type:-1},
                {name:"无风险级",type:0},
                {name:"一般级",type:1},
                {name:"关注级",type:2},
                {name:"严重级",type:3},
                {name:"紧急级",type:4}
            ]
        };

        $scope.propList = null;

        //告警级别:alertLevel
        var vm = $scope.vm = {alertLevel:$scope.alertLevel.children[0],alertBornTime:null};

        var dateSearchUI = $('#dateSearch');            //日期查询 div id
        var dateSearchUI_span = $('#dateSearch span');  //日期span
        var periodSearchUI = $("#periodSearch");        //阶段查询div id

        //初始化查询条件
        initSearch();
        //获取告警数据参数对照表
        // getDataParams();
        getLevelTree();
        //获取告警类型：告警分类
        getTypeList();

        function initSearch(){
            //查询条件
            $scope.alertTime = null;    //告警时间
            $scope.alertStartTime = null;   //时间段：开始时间
            $scope.alertEndTime = null;     //时间段：结束时间
            $scope.sourceIP = null;         //源IP
            $scope.sourcePort = null;       //源端口
            $scope.sourceMac = null;        //源Mac
            $scope.targetIP = null;         //目的IP
            $scope.targetPort = null;       //目的端口
            $scope.targetMac = null;        //目的MAC
            //获取查询时间
            // currentDate();

            $scope.vm.alertBornTime = "";
            $scope.periodSearch = "";
            dateSearchUI_span.html("");
            periodSearchUI.val("");
            $scope.vm.alertLevel = $scope.alertLevel.children[0];
        }

        $scope.resetSearchClick = function(){
            initSearch();
            getAlertList();
        };

        /**
         * 告警时间查询
         * 1，具体日期查询 2，时间段查询
         * **/
        $scope.isSearching = false;     //是否是搜索到的结果
        //时间段查询，阶段查询 的默认值
        $scope.periodSearch = "";//"2017-4-1 00:00:00 - 2017-5-22 00:00:00";
        $scope.dateTypeArr = [
            {name:"告警产生时间查询",type:"period"},
            {name:"告警采集日期查询",type:"date"}
        ];
        $scope.dateType = $scope.dateTypeArr[0];

        /**
         * 具体日期查询；告警采集日期
         * **/
        // dateSearchUI_span.html( moment().format('YYYY-MM-DD')); //MMMM D, YYYY   HH:mm:ss
        dateSearchUI.daterangepicker({ singleDatePicker: true ,
            // timePicker: true,
            // timePicker12Hour:false,
            // timePickerIncrement: 1,
            format: 'YYYY-MM-DD'  // HH:mm:ss // a A
        }, function(start, end, label) {

            var dateTemp = end.toISODateString();   //toISODateString
            dateSearchUI_span.html(dateTemp);
            $scope.vm.alertBornTime = dateTemp;

            $scope.alertTime = dateTemp;
            // getAlertList();
        });

        /**
         * 阶段查询
         * **/
        periodSearchUI.val($scope.periodSearch);    //默认日期
        periodSearchUI.daterangepicker({
            timePicker: true,
            timePicker12Hour:false,
            timePickerIncrement: 1,
            format: 'YYYY-MM-DD HH:mm:ss'   //:ss A
        }, function(start, end, label) {
            // console.log(start.toISOString(), end.toISOString(), label);
            // var startDate = start.toISODateTimeString();
            // var endDate = end.toISODateTimeString();
            // console.log("start : " + startDate + " ------ " + "end : " + endDate);

            $scope.alertStartTime = start.toISODateTimeString();  //时间段：开始时间
            $scope.alertEndTime = end.toISODateTimeString();
        });

        /**
         * 查询时间类型切换；事件
         * **/
        $scope.dateTypeChange = function(){
            if($scope.dateType.type == "period"){
                // currentDate();
            }
        };
        /**
         * 获取当前日期
         * **/
        function currentDate(){
            var time1 = new Date();
            var dat = time1.getFullYear() + "-" + time1.getMonth() + "-" + time1.getDay();
            console.log("dat :" + dat);
            console.log("time1 : " + time1);

            var curYear = time1.getFullYear();      //年
            var curMonth = time1.getMonth() + 1;    //月
            var curDate =  time1.getDate();         //日
            // var curDay = time1.getDay();

            var currTime = time1.getFullYear() + "-" + curMonth + "-" + curDate + " " + checkLess10(time1.getHours()) + ":" + checkLess10(time1.getMinutes()) + ":" + checkLess10(time1.getSeconds());

            var preTime = null;
            //上一月1号
            var preMonth = curMonth - 1;
            if(preMonth > 1){   //上一月的1号
                preTime = curYear + "-" + preMonth + "-01" + " 00:00:00";
            }else{      //上一年的12月1号
                var preYear = curYear - 1;
                preTime = preYear + "-12-01 00:00:00";
            }

            $scope.vm.alertBornTime = curYear + "-" + curMonth + "-" + curDate;
            $scope.alertStartTime = preTime;
            $scope.alertEndTime = currTime;

            $scope.periodSearch = preTime + " - " + currTime;
            periodSearchUI.val($scope.periodSearch);

        }

        /**
         * 小时、分钟、秒小于 10 前面 + 0
         * 例如：“01”，“09”。。。
         * **/
        function checkLess10(hour){
            var str = hour;
            if(hour < 10){
                str = "0" + hour;
            }
            return str;
        }



        /**
         * 条件查询
         * 告警类型 alertType、告警时间 alertTime；
         * 告警时间段：开始时间 alertStartTime、结束时间 alertEndTime
         * 源IP sourceIP、源端口 sourcePort、源MAC sourceMac
         * 目的IP targetIP、目的端口 targetPort、目的MAC targetMac
         * **/
        $scope.searchAlertClick = function(){

            $scope.isSearching = true;

            var alertType = $scope.currentAlertType ? $scope.currentAlertType : null;
            var deviceId = $scope.treeSelected.device_id;
            var risk = 0;
            if($scope.vm.alertLevel){
                risk = $scope.vm.alertLevel.type ? $scope.vm.alertLevel.type : 0;
            }

            var bornTime = $scope.vm.alertBornTime ? $scope.vm.alertBornTime : "";
            var disposalStatus = $scope.disposalStatus;

            //告警查询：开始时间、结束时间、源IP、源端口、源mac、目的IP、目的端口、目的mac
            var startTime = $scope.alertStartTime ? $scope.alertStartTime : "";
            var endTime = $scope.alertEndTime ? $scope.alertEndTime : "";
            var sourceIP = $scope.sourceIP ? $scope.sourceIP: "";
            var sourcePort = $scope.sourcePort ? $scope.sourcePort : "";
            var sourceMac = $scope.sourceMac ? $scope.sourceMac : "";
            var targetIP = $scope.targetIP ? $scope.targetIP : "";
            var targetPort = $scope.targetPort ? $scope.targetPort : "";
            var targetMac = $scope.targetMac ? $scope.targetMac : "";

            if($scope.dateType.type == "period"){
                bornTime = "";
            }else if($scope.dateType.type == "date"){
                startTime = "";
                endTime = "";
            }

            var data = {
                alertType:alertType,
                pageNo:$scope.currentPage,
                pageSize:$scope.pageSize,
                alert:{
                    // "cap_date": bornTime,     //告警采集时间
                    "device_id": deviceId ,     //检测中心id
                    "risk": risk,           //告警级别
                    "searchTime": bornTime,      //告警产生时间
                    "disposalBehavior":disposalStatus  ,   //处置状态
                    // "time":alertTime,
                    "start_time":startTime,     //时间段查询：开始时间
                    "end_time":endTime,         //时间段查询：结束时间
                    "sip":sourceIP,         //源ip
                    "sport":sourcePort,     //源端口
                    "smac":sourceMac,       //源mac
                    "dip":targetIP,         //目的ip
                    "dport":targetPort,     //目的端口
                    "dmac":targetMac        //目的mac
                }
            };
            $scope.isPaging = false;
            $scope.tableHeadList = [];      //告警信息列表 表头
            $scope.tableDataList = [];      //告警信息列表
            // $scope.vm.alertLevel = null;    //清空查询条件：告警级别
            // $scope.vm.alertBornTime = null;     //清空查询条件：告警产生时间
            //判断是检测器还是管理中心
            if($scope.treeSelected.device_type == "1"){
                //检测器
                $rootScope.isLoading = true;
                mainFactory.alertDetectorList(data).then(alertListResult,resultFault);
            }else if($scope.treeSelected.device_type == "2"){
                //管理中心
                $rootScope.isLoading = true;
                mainFactory.alertMagCenterList(data).then(alertListResult,resultFault);
            }
        };

        /**
         * 获取告警数据参数对照表
         */
        // function getDataParams(){
        //     $http.get("assets/json/alertProperty.json").success(function (data,status) {
        //         $scope.isDataCheckListOK = true;
        //         $scope.dataCheckListO = data;
        //
        //         //获取左侧树：分级树
        //         getLevelTree();
        //     })
        // }

        /**
         *  获取分级树、左侧树，包括：本级和下级
         */
        function getLevelTree(){
            mainFactory.deviceCenterTree().then(levelTreeResult,resultFault);
        }
        function levelTreeResult(result){

            var root = result;
            root.name = root.organs;
            root.children = result.jcqs;//result.chirGlzxs;
            setArrayItemChild(root);
            $scope.treeData = [root];
            $scope.expandNodes = [root];
            $scope.treeSelected = root;

            //查询告警：默认查询 木马攻击
            getAlertList();
        }
        //处理分级树节点的数据
        function setArrayItemChild(item){
            angular.forEach(item.children,function(it){
                it.name = it.organs ? it.organs : "空值，测试数据为空";
                it.children = it.chirGlzxs;
                if(it.children && it.children.length > 0){
                    setArrayItemChild(it);
                }
            });
        }
        //--------------------------  加载 告警数据 ----------------------
        /**
         * 告警分类
         * **/
        function getTypeList(){
            // $rootScope.isLoading = true;
            mainFactory.alertTypesList().then(typeListsResult,resultFault);
        }
        function typeListsResult(result){
            $rootScope.isLoading = false;
            $scope.alertTypeList = result.dtoAlertTypes;
            resetTypeCss($scope.alertTypeList[0].dtoAlertTypes[0]);
        }

        /**
         * 设置分类按钮css
         * **/
        function resetTypeCss(typeObj){
            for(var i=0;i<$scope.alertTypeList.length;i++){
                var item = $scope.alertTypeList[i];
                for(var j=0;j<item.dtoAlertTypes.length;j++){
                    var sub = item.dtoAlertTypes[j];
                    if(typeObj.id == sub.id){
                        sub.css = "type_item_css";
                    }else{
                        sub.css = "";
                    }
                }
            }
        }
        //设置审核状态按钮css
        function resetDealStatusUI(val){
            for(var i=0;i<$scope.dealStatusList.length;i++){
                var tm = $scope.dealStatusList[i];
                if(tm.value == val.value){
                    tm.css = "";
                    $scope.disposalStatus = parseInt(val.value);
                }else{
                    tm.css = "by_but_more";
                }
            }
        }

        function resultFault(fault){
            $rootScope.isLoading = false;
            console.log("fault : " + fault);
        }
        //告警列表
        function getAlertList(){

            var alertType = $scope.currentAlertType ? $scope.currentAlertType : null;
            var deviceId = $scope.treeSelected.device_id;
            var risk = 0;
            if($scope.vm.alertLevel){
                risk = $scope.vm.alertLevel.type ? $scope.vm.alertLevel.type : 0;
            }
            var disposalStatus = $scope.disposalStatus;
            var data = {
                alertType:alertType,
                pageNo:$scope.currentPage,
                pageSize:$scope.pageSize,
                alert:{
                    // "cap_date": "",     //告警采集时间
                    "device_id": deviceId ,     //检测中心id
                    "risk": risk,           //告警级别
                    "disposalBehavior":disposalStatus     //处置状态
                }
            };
            $scope.isPaging = false;
            $scope.tableHeadList = [];      //告警信息列表 表头
            $scope.tableDataList = [];      //告警信息列表
            // $scope.vm.alertLevel = null;    //清空查询条件：告警级别
            // $scope.vm.alertBornTime = null;     //清空查询条件：告警产生时间
            //判断是检测器还是管理中心
            if($scope.treeSelected.device_type == "1"){
                //检测器
                $rootScope.isLoading = true;
                mainFactory.alertDetectorList(data).then(alertListResult,resultFault);
            }else if($scope.treeSelected.device_type == "2"){
                //管理中心
                $rootScope.isLoading = true;
                mainFactory.alertMagCenterList(data).then(alertListResult,resultFault);
            }
        }
        function alertListResult(result){

            if(!result){
                $rootScope.isLoading = false;
                return;
            }

            $scope.pageTotal = result.pages;
            $scope.listTotal = result.total;

            if($scope.pageTotal > 1){
                $scope.isPaging = true;
            }

            if(!result.list || result.list.length < 1){
                // console.log($scope.currentAlertType + " ----------- 数据为空！！！");
                $rootScope.isLoading = false;
                $scope.isNoData = true;
                return;
            }
            $scope.isNoData = false;
            // 下面对数据进行格式化
            var arr = [];
            var nameArr = [];
            angular.forEach(result.list,function (item) {
                var temp = getPropertyAndValue(item);
                var obj = {id:item.alert_id,deviceId:item.device_id,alertType:item.res_type,css:"test-css-blue",children:temp.valueArr};
                // if(!item["disposalStatus"]){
                //     obj.css = "test-css-orange";
                // }
                arr.push(obj);
                if(nameArr.length < 1){
                    nameArr = temp.nameArr;
                }
            });
            //下面要做一下表头的中文名字匹配
            var searchType = $scope.currentAlertType;
            if(!searchType){
                searchType = "publicHead";
            }
            // var temp = $scope.dataCheckListO[searchType].property;

            var alertHeadVo = utils.vo.alertHeadVo();
            var temp = alertHeadVo[searchType].property;

            angular.forEach(nameArr,function (item) {
                var prop = item.name;
                if(temp[prop]){
                    item.cnName = temp[prop]
                }
            });
            $scope.tableHeadList = nameArr;
            $scope.tableDataList = arr;

            $rootScope.isLoading = false;
        }
        //获取object的属性和对应的值
        function getPropertyAndValue(obj){
            var temp = {
                nameArr:[],
                valueArr:[]
            };
            for(var att in obj){
                //有几个参数不用显示   || att == "" || att == ""
                if(att == "searchTime" || att == "res_id" || att == "disposalBehavior"
                    || att == "organs"  || att == "id" || att == "alert_id" || att == "disposalStatus"
                    || att == "res_type" || att == "rule_id" || att == "alert_person"
                    || att == "cap_date" || att == "start_time" || att == "end_time"){
                    continue;
                }
                var nameObj = {name:att,cnName:att};
                var valueObj = {name:att,value:obj[att]};
                //时间戳格式化
                if(att == "time"){
                    var tempTime = new Date(obj[att]);
                    valueObj.value = utils.strToTime2(tempTime);
                }

                //木马攻击
                if($scope.currentAlertType == "trojanAttack"){
                    //木马类型格式化：1（特种木马）、2（普通木马）、3（远控）、4（其他）
                    if(att == "trojan_type"){
                        var typeIndex = obj[att];
                        if(typeIndex == 1){
                            valueObj.value = "特种木马";
                        }else if(typeIndex == 2){
                            valueObj.value = "普通木马";
                        }else if(typeIndex == 3){
                            valueObj.value = "远控";
                        }else if(typeIndex == 4){
                            valueObj.value = "其他";
                        }
                    }

                    //木马攻击------》攻击流行程度
                    if(att == "prevalence"){
                        var pop = obj[att];
                        if(pop == "1" || pop == 1){
                            valueObj.value = "高";
                        }else if(pop == "2" || pop == 2){
                            valueObj.value = "中";
                        }else if(pop == "3" || pop == 3){
                            valueObj.value = "低";
                        }
                    }
                }
                //涉密信息告警
                if($scope.currentAlertType == "email" || $scope.currentAlertType == "fileTranfer" ||
                    $scope.currentAlertType == "http" || $scope.currentAlertType == "im" ||
                    $scope.currentAlertType == "netdisk" || $scope.currentAlertType == "otherSecurity" ){
                    //涉密信息告警--------》告警类型
                    if(att == "alert_type"){
                        var alertTy = obj[att];
                        if(alertTy == "1" || alertTy == 1){
                            valueObj.value = "电子密标文件告警";
                        }else if(alertTy == "2" || alertTy == 2){
                            valueObj.value = "标密文件告警";
                        }else if(alertTy == "3" || alertTy == 3){
                            valueObj.value = "关键词告警";
                        }else if(alertTy == "4" || alertTy == 4){
                            valueObj.value = "加密文件告警";
                        }else if(alertTy == "5" || alertTy == 5){
                            valueObj.value = "多层压缩文件告警";
                        }else if(alertTy == "6" || alertTy == 6){
                            valueObj.value = "图文文件告警";
                        }else if(alertTy == "7" || alertTy == 7){
                            valueObj.value = "含图文的文档告警";
                        }else if(alertTy == "8" || alertTy == 8){
                            valueObj.value = "版式文件告警";
                        }
                    }
                    //涉密信息告警-------->数据传输方向\文件传输方向
                    if(att == "xm_dir" || att == "trans_dir"){
                        var dType = obj[att];
                        if(dType == "1" || dType == 1){
                            valueObj.value = "发送";
                        }else if(dType == "2" || dType == 2){
                            valueObj.value = "接收";
                        }else if(dType == "3" || dType == 3){
                            valueObj.value = "未知";
                        }
                    }
                }

                //未知攻击
                if($scope.currentAlertType == "abnormalAttack"){
                    if(att == "alert_type"){
                        var cType = obj[att];
                        if(cType == 1 || cType == "1"){
                            valueObj.value = "可疑心跳保活行为"
                        }else if(cType == 2 || cType == "2"){
                            valueObj.value = "远程控制行为"
                        }else if(cType == 3 || cType == "3"){
                            valueObj.value = "异常私有协议"
                        }else if(cType == 4 || cType == "4"){
                            valueObj.value = "异常通用代理行为"
                        }
                    }
                }

                //告警级别格式化：无风险级（0）、一般级（1）、关注级（2）、严重级（3）、紧急级（4）
                if(att == "risk"){
                    var level = obj[att];
                    if(level == 0 || level == "0"){
                        valueObj.value = "无风险级";
                    }else if(level == 1 || level == "1"){
                        valueObj.value = "一般级";
                    }else if(level == 2 || level == "2"){
                        valueObj.value = "关注级";
                    }else if(level == 3 || level == "3"){
                        valueObj.value = "严重级";
                    }else if(level == 4 || level == "4"){
                        valueObj.value = "紧急级";
                    }
                }



                // //审核状态，格式化：false 未处置 ，true 已处置
                // if(att == "disposalStatus"){
                //     var status = obj[att];
                //     if(status == true){
                //         valueObj.value = "已处置";
                //     }else{
                //         valueObj.value = "未处置";
                //     }
                // }
                //检测器id放在前面显示
                if(att == "device_id"){
                    temp.nameArr.unshift(nameObj);
                    temp.valueArr.unshift(valueObj);
                }else{
                    temp.nameArr.push(nameObj);
                    temp.valueArr.push(valueObj);
                }

            }
            return temp;
        }
        /**
         * 返回；
         * 从处置记录table list返回告警信息list
         */
        $scope.backToAlertListClick = function(){
            $scope.isDealHistory = false;
            $scope.title = "告警处置";
        };
        /**
         * 查看 处置记录
         */
        $scope.dealHistoryClick = function (item) {

            $scope.isDealHistory = true;
            $scope.title = "处置历史记录";

            var obj = {id:item.id};
            mainFactory.alertDealHistory(obj).then(alertDealHistoryResult,resultFault);
        };
        function alertDealHistoryResult(result){

            if(result && result.length > 0){
                angular.forEach(result,function (item) {
                    if(item["disposalTime"]){
                        item["disposalTime"] = utils.strToTime2(item["disposalTime"]);
                    }
                })
            }
            $scope.isNoDataHis = result.length < 1;
            $scope.dealHistoryListCopy = result;

            //是否显示分页
            $scope.isPagingHis = false;
            if(result.length > $scope.pageSizeHis){
                $scope.isPagingHis = true;
                $scope.listTotalHis = $scope.dealHistoryListCopy.length;
                $scope.pageTotalHis = Math.ceil($scope.dealHistoryListCopy.length/$scope.pageSizeHis);
                var start = 0;
                var end = $scope.pageSizeHis;
                $scope.dealHistoryList = $scope.dealHistoryListCopy.slice(start,end);
            }else{
                $scope.dealHistoryList = $scope.dealHistoryListCopy;
            }
        }
        /**
         * 根据类型查看告警
         * **/
        $scope.searchAlertByType = function(item){

            $scope.currentPage = 1;
            $scope.isDealHistory = false;
            $scope.isSearching = false;
            initSearch();

            $scope.currentAlertType = item.name;
            $scope.alertDealTitle = item.alias;
            $scope.vm.alertBornTime = null;
            $scope.vm.alertLevel = $scope.alertLevel.children[0];
            // dateSearchUI_span.html( moment().format('YYYY-MM-DD'));

            //重置UI
            resetTypeCss(item);
            resetDealStatusUI($scope.dealStatusList[0]);

            //查询告警信息
            getAlertList()
        };
        /**
         * 告警处置
         * **/
        $scope.dealAlertClick = function (item) {
            console.log("处置告警 。。。 : " + item);
            var data = {
                name:"告警处置",
                type:$scope.currentAlertType,
                data:item,
                flush:function (result) {
                    //处置成功以后，刷新数据
                    angular.forEach($scope.tableDataList,function (temp,index) {
                        if(temp.id == result.alertId){
                            //如果告警数据在未处置列表，则处置成功以后从未处置列表移除这条告警
                            if($scope.disposalStatus == 0){

                                // $scope.tableDataList.splice(index,1);
                                //移除以后要重新计算分页
                                getAlertList();

                            }else{
                                //修改处置状态为：已处置
                                angular.forEach(temp.children,function(sub){
                                    if(sub.name == "disposalStatus"){
                                        sub.value = "已处置";//true;
                                    }
                                })
                            }
                        }
                    });
                    if($scope.tableDataList.length < 1){
                        $scope.isNoData = true;
                    }
                }
            };
            utils.popWin($uibModal,"tpl/alert/dealAlertPop.html","dealAlertCtrl",data);
        };
        /**
         * 检测器分级树，选择树节点
         */
        $scope.treeNodeClick = function (item) {
            // console.log("tree node click ..." + item);
            $scope.currentPage = 1;
            $scope.isDealHistory = false;
            $scope.treeSelected = item;
            $scope.vm.alertBornTime = null;
            $scope.vm.alertLevel = $scope.alertLevel.children[0];
            // dateSearchUI_span.html( moment().format('YYYY-MM-DD'));
            $scope.isSearching = false;
            initSearch();
            getAlertList();
        };
        /**
         * 分类查看：
         * 全部 1 ---已处置 2---未处置 3
         * **/
        $scope.handleAll = function(val){
            resetDealStatusUI(val);
            getAlertList();
        };
        /**
         * 分页
         * **/
        $scope.pageChangeFn = function(page){

            $scope.currentPage = page;
            if($scope.isSearching){
                $scope.searchAlertClick();
            }else{
                getAlertList();
            }
        };
        /**
         * 历史记录分页
         */
        $scope.pageChangeFnHis = function(page){
            // console.log("page : " + page);
            var start = (page - 1) * $scope.pageSizeHis;
            var end = page * $scope.pageSizeHis;
            $scope.dealHistoryList = $scope.dealHistoryListCopy.slice(start,end);
        };
        /**
         * 下载告警文件
         */
        $scope.downloadAlertFile = function(data){
            var id = data.deviceId + "_" +  data.id;
            var str = window.config.monitorServerUrl + "resources/alert/downFile/" + id;
            window.open(str,"_blank");
        };
    }
})();