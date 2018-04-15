/**
 * Created by Administrator on 2017/4/27.
 */
(function () {
    angular.module("app")
        .controller("auditCtrl_2",auditCtrlFun);
    auditCtrlFun.$inject = ["$scope","$rootScope","mainFactory","$log"];
    function auditCtrlFun($scope,$rootScope,mainFactory,$log){

        window.sessionStorage.currentState = "audit";
        window.sessionStorage.currentStateIndex = 4;
        
        $scope.title = "通联关系审计";

        /**
         * 审计类型 auditType
         * 通联关系审计：CONN、WEB应用行为审计：WEB、SSL访问行为审计：SSL
         * 电子邮件行为审计：MAIL、文件传输行为审计：FILE、DNS域名请求行为审计：DNS
         **/
        $scope.auditType = "CONN";

        $scope.treeData = [];
        $scope.treeSelected = null;
        $scope.expandNodes = [];

        $scope.dataList = [];     //显示的数据总数，实际数据，备份
        $scope.dataCount = 0;   //当前显示的数据总数
        $scope.dataListShow = [];   //显示的数据总数，显示的数据，条件查询时由实际数据中截取

        $scope.searchStr = "";  //查询条件String
        $scope.tableHeadList = [];

        $rootScope.isLoading = false;
        $scope.isNoData = false;     //当前无数据

        //分页
        $scope.isPaging = false;
        $scope.currentPage = 1;
        $scope.pageTotal = 1;
        $scope.pageSize = 20;
        $scope.groupSize = 5;
        $scope.listTotal = 0;       //总条数

        $scope.vm = {time:null};

        $scope.actionTypeList = [
            {name:"WEB应用行为",type:"WEB"},
            {name:"SSL访问行为",type:"SSL"},
            {name:"电子邮件行为",type:"MAIL"},
            {name:"文件传输行为",type:"FILE"},
            {name:"DNS域名请求行为",type:"DNS"}
        ];
        //审计类型；默认选择第一项，css 为 default_type_item；css动态添加、删除
        $scope.auditTypeList = [
            {name:"通联关系审计",children:[{name:"通联关系审计",type:"CONN",css:"type_item_css_default"}]},
            {name:"应用行为审计",children:[
                {name:"WEB应用行为",type:"WEB",css:""},
                {name:"SSL访问行为",type:"SSL",css:""},
                {name:"电子邮件行为",type:"MAIL",css:""},
                {name:"文件传输行为",type:"FILE",css:""},
                {name:"DNS域名请求行为",type:"DNS",css:""}
            ]}
        ];
        //通联关系审计 table表头  {name:"id"},
        $scope.netConnTableHead = [
            {name:"设备编号"},{name:"源IP地址"},{name:"源端口号"},
            {name:"源MAC地址"},{name:"目的IP"},{name:"目的端口号"},{name:"目的MAC地址"},
            {name:"传输层协议"}, {name:"应用协议"},{name:"TCP流标记"},{name:"流入数据字节"},
            {name:"流出数据字节"}, {name:"流入包个数"},{name:"流出包个数"},
            {name:"事件开始时间"}, {name:"事件结束时间"},{name:"事件产生时间"}
            // ,{name:"审计采集日期"}
        ];
        //WEB应用行为审计 table表头  {name:"id"},
        $scope.webTableHead = [
            {name:"设备编号"},{name:"源IP地址"},{name:"源端口号"},{name:"源MAC地址"},
            {name:"目的IP"},{name:"目的端口号"},{name:"目的MAC地址"},{name:"传输层协议"},
            {name:"应用协议"},{name:"访问域"},{name:"访问url"},{name:"请求方法"},{name:"返回码"},
            {name:"请求user-agent"},{name:"请求的cookie信息"},{name:"服务端的server信息"},
            {name:"应用页"},{name:"事件产生时间"}//,{name:"事件产生日期"}
        ];
        //SSL访问行为 table表头  {name:"id"},
        $scope.sslTableHead = [
            {name:"设备编号"},{name:"源IP地址"},{name:"源端口号"},{name:"源MAC地址"},
            {name:"目的IP"},{name:"目的端口号"},{name:"目的MAC地址"},{name:"传输层协议"},
            {name:"应用协议"},{name:"服务器证书指纹SHA1"},{name:"服务器证书颁发者国家信息"},
            {name:"服务器证书颁发者组织信息"},{name:"服务器证书颁发者通用名信息"},
            {name:"服务器证书颁发者域名信息"},{name:"服务器证书使用者组织信息"},
            {name:"服务器证书使用者通用名信息"},{name:"事件产生时间"}//,{name:"事件产生日期"}
        ];
        //电子邮件行为审计 table表头  {name:"id"},
        $scope.emailTableHead = [
            {name:"设备编号"},{name:"源IP地址"},{name:"源端口号"},{name:"源MAC地址"},
            {name:"目的IP"},{name:"目的端口号"},{name:"目的MAC地址"},{name:"传输层协议"},
            {name:"应用协议"},{name:"发送方"},{name:"接收方"},{name:"抄送"},{name:"密送"},
            {name:"主题"},{name:"附件名列表"},{name:"webmail邮件提供商"},{name:"认证的邮件发送者"},
            {name:"认证的邮件接收者"},{name:"认证的IP信息"},{name:"事件产生时间"}//,{name:"事件产生日期"}
        ];
        //文件传输行为审计 table表头  {name:"id"},
        $scope.ftpTableHead = [
            {name:"设备编号"},{name:"源IP地址"},{name:"源端口号"},{name:"源MAC地址"},
            {name:"目的IP"},{name:"目的端口号"},{name:"目的MAC地址"},{name:"传输层协议"},
            {name:"应用协议"},{name:"传输文件名"},{name:"传输文件大小"},{name:"事件产生时间"}//,
            // {name:"事件产生日期"}
        ];
        //DNS域名请求行为  {name:"id"},
        $scope.dnsTableHead = [
            {name:"设备编号"},{name:"源IP地址"},{name:"源端口号"},{name:"源MAC地址"},
            {name:"目的IP"},{name:"目的端口号"},{name:"目的MAC地址"},{name:"传输层协议"},
            {name:"应用协议"},{name:"请求域名"},{name:"域名请求返回的IP列表"},{name:"事件产生时间"}//,
            // {name:"事件产生日期"}
        ];

        var dateSearchUI = $('#dateSearch');            //日期查询 div id
        var dateSearchUI_span = $('#dateSearch span');  //日期span
        var periodSearchUI = $("#periodSearch");        //阶段查询div id

        //协议
        $scope.protocolList = [
            {name:"全部",type:"0"},
            {name:"TCP",type:"1"},
            {name:"UDP",type:"2"}
        ];
        $scope.protocolItem = $scope.protocolList[0];

        //初始化查询条件
        initSearch();
        //获取 管理中心树形列表
        getDeviceCenterTree();

        /**
         * 初始化查询条件
         * **/
        function initSearch(){
            //查询条件
            // $scope.auditTime = null;    //审计时间
            $scope.auditStartTime = null;   //时间段：开始时间
            $scope.auditEndTime = null;     //时间段：结束时间
            $scope.sourceIP = null;         //源IP
            $scope.sourcePort = null;       //源端口
            $scope.sourceMac = null;        //源Mac
            $scope.targetIP = null;         //目的IP
            $scope.targetPort = null;       //目的端口
            $scope.targetMac = null;        //目的MAC
            //获取查询时间
            // currentDate();
            $scope.vm.time = "";
            $scope.periodSearch = "";
            dateSearchUI_span.html("");
            periodSearchUI.val("");
            $scope.protocolItem = $scope.protocolList[0];
        }

        //重置查询条件
        $scope.resetSearchClick = function(){
            initSearch();
            getAuditList();
        };

        /**
         * 告警时间查询
         * 1，具体日期查询 2，时间段查询
         * **/
        $scope.isSearching = false;     //是否是搜索到的结果
        //时间段查询，阶段查询 的默认值
        $scope.periodSearch = "";//"2017-4-1 00:00:00 - 2017-5-22 00:00:00";
        $scope.dateTypeArr = [
            {name:"事件产生时间查询",type:"period"}
            // {name:"事件采集日期查询",type:"date"},

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
            $log.debug("label :"　+ label);

            var dateTemp = end.toISODateString();   //toISODateString
            dateSearchUI_span.html(dateTemp);
            $scope.vm.time = dateTemp;
            // $scope.auditTime = dateTemp;
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

            $scope.auditStartTime = start.toISODateTimeString();   //时间段：开始时间
            $scope.auditEndTime = end.toISODateTimeString();
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

            var curYear = time1.getFullYear();      //年
            var curMonth = time1.getMonth() + 1;    //月
            var curDate =  time1.getDate();         //日

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

            $scope.vm.time = curYear + "-" + curMonth + "-" + curDate;
            $scope.auditStartTime = preTime;
            $scope.auditEndTime = currTime;

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
         * 告警时间 auditTime、网络协议auditProtocol
         * 告警时间段：开始时间 auditStartTime、结束时间 auditEndTime
         * 源IP sourceIP、源端口 sourcePort、源MAC sourceMac
         * 目的IP targetIP、目的端口 targetPort、目的MAC targetMac
         * **/
        $scope.searchAuditClick = function(){

            var id = $scope.treeSelected.device_id;  //selectedNode.id;//
            var sourceIP = $scope.sourceIP ? $scope.sourceIP : "";
            var sourcePort = $scope.sourcePort ? $scope.sourcePort : "";
            var sourceMac = $scope.sourceMac ? $scope.sourceMac : "";
            var targetIP = $scope.targetIP ? $scope.targetIP : "";
            var targetPort = $scope.targetPort ? $scope.targetPort : "";
            var targetMac = $scope.targetMac ? $scope.targetMac : "";

            var timeStr = "";
            var startTime = "";
            var endTime = "";
            if($scope.dateType.type == "date"){
                timeStr = $scope.vm.time;
            }else if($scope.dateType.type == "period"){
                startTime = $scope.auditStartTime ? $scope.auditStartTime : "";
                endTime = $scope.auditEndTime ? $scope.auditEndTime : "";
            }

            var protocol = "";
            if($scope.protocolItem.type != "0"){
                protocol = $scope.protocolItem.name.toLowerCase();
            }

            var data = {
                id:id,
                type:$scope.auditType,      //"CONN"
                page:$scope.currentPage,
                pageSize:$scope.pageSize,
                protocol:{
                    cap_date:timeStr,//$scope.vm.time,
                    sip:sourceIP,
                    sport:sourcePort,
                    smac:sourceMac,
                    dip:targetIP,
                    dport:targetPort,
                    dmac:targetMac,
                    start_time:startTime,
                    end_time:endTime,
                    // time:timeStr,
                    protocol:protocol
                }
            };
            $scope.isSearching = true;
            $scope.isNoData = false;
            $scope.isPaging = false;
            $rootScope.isLoading = true;
            mainFactory.netAuditList_2(data).then(auditListResult,resultFault);

        };
        /**
         * 分类查看
         */
        $scope.searchTypeClick = function (item) {

            //重置css选中状态
            angular.forEach($scope.auditTypeList,function(typeObj){
                angular.forEach(typeObj.children,function(childObj){
                    if(childObj.type == item.type){
                        childObj.css = "type_item_css";
                        // childObj.css = "type_item_css_default";//
                    }else{
                        childObj.css = "";
                    }
                })
            });
            $scope.auditType = item.type;
            if(item.type == "CONN"){
                $scope.title = "通联关系审计";
            }else if(item.type == "WEB"){
                $scope.title = "应用行为审计/WEB应用行为审计"; //应用行为审计/
            }else if(item.type == "SSL"){
                $scope.title = "应用行为审计/SSL访问行为审计";   //应用行为审计/
            }else if(item.type == "MAIL"){
                $scope.title = "应用行为审计/电子邮件行为审计";    //应用行为审计/
            }else if(item.type == "FILE"){
                $scope.title = "应用行为审计/文件传输行为审计";    //应用行为审计/
            }else if(item.type == "DNS"){
                $scope.title = "应用行为审计/DNS域名请求行为审计"; //应用行为审计/
            }
            $scope.dataList = [];  //清空列表
            $scope.vm.time = null;
            $scope.isSearching = false;
            initSearch();
            getAuditList();
        };

        /**
         *  设备、检测器审计信息查看
         */
        $scope.treeNodeClick = function (node) {
            $scope.treeSelected = node;
            $scope.dataList = [];  //清空列表
            $scope.vm.time = null;
            $scope.isSearching = false;
            initSearch();
            getAuditList();
        };
        /**
         * 获取管理中心数据 树形列表
         */
        function getDeviceCenterTree(){
            // $rootScope.isLoading = true;
            mainFactory.deviceCenterTree().then(deviceCenterTreeResult,resultFault);
        }
        function deviceCenterTreeResult(result){
            var root = result;
            root.name = root.organs;
            root.children = result.jcqs;//result.chirGlzxs;
            setArrayItemChild(root);
            $scope.treeData = [root];
            $scope.expandNodes = [root];
            $scope.treeSelected = root;

            $scope.dataList = [];
            getAuditList();
        }

        /**
         * 处理分级树节点的数据
         */
        function setArrayItemChild(item){
            angular.forEach(item.children,function(it){
                it.name = it.organs ? it.organs : "空值，测试数据为空";
                it.children = it.chirGlzxs;
                if(it.children && it.children.length > 0){
                    setArrayItemChild(it);
                }
            });
        }
        function initTreeNode(item){
            for(var i=0;i<item.chirGlzxs.length;i++){
                var it = item.chirGlzxs[i];
                it.name = it.address;
                it.children = [];
                if(it.chirGlzxs.length > 0){
                    initTreeNode(it);
                }
                item.children.push(it);
            }
            return item;
        }

        /**
         * 分页事件
         */
        $scope.pageChangeFn = function(page){

            $scope.currentPage = page;
            if($scope.isSearching){
                $scope.searchAuditClick();
            }else{
                getAuditList();
            }
        };

        //获取数据列表
        function getAuditList(){

            var id = $scope.treeSelected.device_id;  //selectedNode.id;//
            var data = {
                id:id,
                type:$scope.auditType,      //"CONN"
                page:$scope.currentPage,
                pageSize:$scope.pageSize
                // cap_date:$scope.vm.time
            };
            $scope.isNoData = false;
            $scope.isPaging = false;
            $rootScope.isLoading = true;
            mainFactory.netAuditList_2(data).then(auditListResult,resultFault);
        }
        function auditListResult(result){

            $rootScope.isLoading = false;
            if(!result || !result.list || !angular.isArray(result.list)){
                return;
            }
            $scope.pageTotal = result.pages;
            $scope.listTotal = result.total;
            if($scope.pageTotal > 1){
                $scope.isPaging = true;
            }
            var netConnList = result.list;
            var tempList = [];
            if(netConnList.length > 0){
                angular.forEach(netConnList,function(item){
                    var vo = voInitByType(item,$scope.auditType);
                    var obj = {};
                    obj.primaryData = item;
                    obj.data = vo;
                    tempList.push(obj);
                });
            }
            $scope.dataList = tempList;
            $scope.dataListShow = $scope.dataList;
            $scope.dataCount = $scope.dataListShow.length;
            $scope.isNoData = $scope.dataCount < 1;

            // SSL访问行为审计：SSL
            // * 电子邮件行为审计：MAIL、文件传输行为审计：FILE、DNS域名请求行为审计：DNS
            if($scope.auditType == "CONN"){
                $scope.tableHeadList = $scope.netConnTableHead;
            }else if($scope.auditType == "WEB"){
                $scope.tableHeadList = $scope.webTableHead;
            }else if($scope.auditType == "SSL"){
                $scope.tableHeadList = $scope.sslTableHead;
            }else if($scope.auditType == "MAIL"){
                $scope.tableHeadList = $scope.emailTableHead;
            }else if($scope.auditType == "FILE"){
                $scope.tableHeadList = $scope.ftpTableHead;
            }else if($scope.auditType == "DNS"){
                $scope.tableHeadList = $scope.dnsTableHead;
            }
            $scope.tableData = {
                title:$scope.tableHeadList,
                row:$scope.dataListShow
            };
        }
        function resultFault(fault){
            $rootScope.isLoading = false;
            $log.debug("resultFault : " + fault);
        }

        function voInitByType(item,type){
            var arr = [];
            var vo;
            if(type == "CONN"){
                vo = utils.vo.netConnAuditVo();
                vo.tcpFlag = item.tcp_flag ? item.tcp_flag : "";
                vo.inBytes = item.in_bytes ? item.in_bytes : "";
                vo.outBytes = item.out_bytes ? item.out_bytes : "";
                vo.inPkts = item.in_pkts ? item.in_pkts : "";
                vo.outPkts = item.out_pkts ? item.out_pkts : "";
                vo.startTime = item.start_time ? item.start_time : "";
                vo.endTime = item.end_time ? item.end_time : "";
                vo.produceTime = item.cap_time ? item.cap_time : "";
                // vo.capDate = item.cap_date ? item.cap_date : "";
                arr = [
                    {value:vo.tcpFlag},
                    {value:vo.inBytes},
                    {value:vo.outBytes},
                    {value:vo.inPkts},
                    {value:vo.outPkts},
                    {value:vo.startTime},
                    {value:vo.endTime},
                    {value:vo.produceTime}//,
                    // {value:vo.capDate}
                ];
            }else if(type == "WEB"){
                vo = utils.vo.webActionVo();
                vo.domain = item.domain ? item.domain : "";
                vo.url = item.url ? item.url : "";
                vo.method = item.method ? item.method : "";
                vo.returnCode = item.ret_code ? item.ret_code : "";
                vo.userAgent = item.user_agent ? item.user_agent : "";
                vo.cookie = item.cookie ? item.cookie : "";
                vo.server = item.server ? item.server : "";
                vo.refer = item.refer ? item.refer : "";
                vo.produceTime = item.cap_time ? item.cap_time : "";//item.start_time ? item.start_time : "";
                // vo.capDate = item.cap_date ? item.cap_date : "";
                arr = [
                    {value:vo.domain},{value:vo.url},{value:vo.method},{value:vo.returnCode},
                    {value:vo.userAgent},{value:vo.cookie},{value:vo.server},{value:vo.refer},
                    {value:vo.produceTime}
                    // ,{value:vo.capDate}
                ];
            }else if(type == "SSL"){
                vo = utils.vo.sslActionVo();
                vo.finger = item.finger ? item.finger : "";
                vo.country = item.country ? item.country : "";
                vo.organize = item.organize ? item.organize : "";
                vo.cname = item.cname ? item.cname : "";
                vo.sni = item.sni ? item.sni : "";
                vo.uorganize = item.uorganize ? item.uorganize : "";
                vo.ucname = item.ucname ? item.ucname : "";
                vo.produceTime = item.cap_time ? item.cap_time : "";//item.time ? item.time : "";
                // vo.capDate = item.cap_date ? item.cap_date : "";
                arr = [
                    {value:vo.finger},{value:vo.country},{value:vo.organize},{value:vo.cname},
                    {value:vo.sni},{value:vo.uorganize},{value:vo.ucname},{value:vo.produceTime}//,
                    // {value:vo.capDate}
                ]
            }else if(type == "MAIL"){
                vo = utils.vo.emailActionVo();
                vo.sender = item.sender ? item.sender : "";
                vo.receiver = item.recver ? item.recver : "";
                vo.copyTo = item.cc ? item.cc : "";
                vo.secritCopyTo = item.bcc ? item.bcc : "";
                vo.subject = item.subject ? item.subject : "";
                vo.attachment = item.attachment ? item.attachment : "";
                vo.domain = item.domain ? item.domain : "";
                vo.mailFrom = item.mail_form ? item.mail_form : "";
                vo.rcptTo = item.rcpt_to ? item.rcpt_to : "";
                vo.ehlo = item.ehlo ? item.ehlo : "";
                vo.produceTime = item.cap_time ? item.cap_time : "";//item.time ? item.time : "";
                // vo.capDate = item.cap_date ? item.cap_date : "";
                arr = [
                    {value:vo.sender},{value:vo.receiver},{value:vo.copyTo},
                    {value:vo.secritCopyTo},{value:vo.subject},{value:vo.attachment},
                    {value:vo.domain},{value:vo.mailFrom},{value:vo.rcptTo},{value:vo.ehlo},
                    {value:vo.produceTime}
                    // ,{value:vo.capDate}
                ]
            }else if(type == "FILE"){
                vo = utils.vo.ftpActionVo();
                vo.fileName = item.filename ? item.filename : "";
                vo.fileSize = item.filesize ? item.filesize : "";
                vo.produceTime = item.cap_time ? item.cap_time : "";//item.time ? item.time : "";
                // vo.capDate = item.cap_date ? item.cap_date : "";
                arr = [
                    {value:vo.fileName},{value:vo.fileSize},
                    {value:vo.produceTime}
                    // ,{value:vo.capDate}
                ]
            }else if(type == "DNS"){
                vo = utils.vo.dnsActionVo();
                vo.request = item.request ? item.request : "";
                vo.reponse = item.reponse ? item.reponse : "";
                vo.produceTime = item.cap_time ? item.cap_time : "";//item.time ? item.time : "";
                // vo.capDate = item.cap_date ? item.cap_date : "";
                arr = [
                    {value:vo.request},{value:vo.reponse},
                    {value:vo.produceTime}
                    // ,{value:vo.capDate}
                ]
            }
            // vo.id = item.id ? item.id : "";
            vo.deviceId = item.device_id ? item.device_id : "";
            vo.sip = item.sip ? item.sip : "";
            vo.sport = item.sport ? item.sport : "";
            vo.smac = item.smac ? item.smac : "";
            vo.dip = item.dip ? item.dip : "";
            vo.dport = item.dport ? item.dport : "";
            vo.dmac = item.dmac ? item.dmac : "";
            vo.protocol = item.protocol ? item.protocol : "";
            vo.app = item.app ? item.app : "";

            //{value:vo.id},
            arr.unshift({value:vo.deviceId},{value:vo.sip},{value:vo.sport},{value:vo.smac},
                {value:vo.dip},{value:vo.dport},{value:vo.dmac},{value:vo.protocol},
                {value:vo.app});
            return arr;
        }
    }
})();
