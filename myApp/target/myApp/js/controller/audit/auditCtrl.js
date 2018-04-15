/**
 * Created by Administrator on 2017/1/22.
 */
(function () {
    angular.module("app")
        .controller("auditCtrl",auditCtrlFun);
    auditCtrlFun.$inject = ["$scope","mainFactory"];
    function auditCtrlFun($scope,mainFactory){
        
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

        $scope.isHasMore = false;   //是否包含更多数据，用来判断是否可以滚动加载数据
        $scope.scrollId = "";       //滚动ID
        $scope.isScrollEvent = false;       //是否是执行的滚动加载数据事件
        $scope.isNoData = true;     //当前无数据

        $scope.searchStr = "";  //查询条件String
        $scope.tableHeadList = [];

        $scope.isLoading = false;

        //分页
        $scope.isPaging = true;
        $scope.currentPage = 1;
        $scope.pageTotal = 1;
        $scope.pageSize = 20;
        $scope.groupSize = 5;

        $scope.actionTypeList = [
            {name:"WEB应用行为",type:"WEB"},
            {name:"SSL访问行为",type:"SSL"},
            {name:"电子邮件行为",type:"MAIL"},
            {name:"文件传输行为",type:"FILE"},
            {name:"DNS域名请求行为",type:"DNS"}
        ];
        //通联关系审计 table表头   {name:"id"},
        $scope.netConnTableHead = [
            {name:"源IP地址"},{name:"源端口号"},
            {name:"源MAC地址"},{name:"目的IP"},{name:"目的端口号"},{name:"目的MAC地址"},
            {name:"传输层协议"}, {name:"应用协议"},{name:"TCP流标记"},{name:"流入数据字节"},
            {name:"流出数据字节"}, {name:"流入包个数"},{name:"流出包个数"},
            {name:"采集到第一个报文的时间"}, {name:"采集到最后一个报文的时间"},{name:"审计日期"}
        ];
        //WEB应用行为审计 table表头  {name:"id"},
        $scope.webTableHead = [
            {name:"源IP地址"},{name:"源端口号"},{name:"源MAC地址"},
            {name:"目的IP"},{name:"目的端口号"},{name:"目的MAC地址"},{name:"传输层协议"},
            {name:"应用协议"},{name:"访问域"},{name:"访问url"},{name:"请求方法"},{name:"返回码"},
            {name:"请求user-agent"},{name:"请求的cookie信息"},{name:"服务端的server信息"},
            {name:"应用页"},{name:"事件产生时间"},{name:"事件产生日期"}
        ];
        //SSL访问行为 table表头  {name:"id"},
        $scope.sslTableHead = [
            {name:"源IP地址"},{name:"源端口号"},{name:"源MAC地址"},
            {name:"目的IP"},{name:"目的端口号"},{name:"目的MAC地址"},{name:"传输层协议"},
            {name:"应用协议"},{name:"服务器证书指纹SHA1"},{name:"服务器证书颁发者国家信息"},
            {name:"服务器证书颁发者组织信息"},{name:"服务器证书颁发者通用名信息"},
            {name:"服务器证书颁发者域名信息"},{name:"服务器证书使用者组织信息"},
            {name:"服务器证书使用者通用名信息"},{name:"事件产生时间"},{name:"事件产生日期"}
        ];
        //电子邮件行为审计 table表头   {name:"id"},
        $scope.emailTableHead = [
            {name:"源IP地址"},{name:"源端口号"},{name:"源MAC地址"},
            {name:"目的IP"},{name:"目的端口号"},{name:"目的MAC地址"},{name:"传输层协议"},
            {name:"应用协议"},{name:"发送方"},{name:"接收方"},{name:"抄送"},{name:"密送"},
            {name:"主题"},{name:"附件名列表"},{name:"webmail邮件提供商"},{name:"认证的邮件发送者"},
            {name:"认证的邮件接收者"},{name:"认证的IP信息"},{name:"事件产生时间"},{name:"事件产生日期"}
        ];
        //文件传输行为审计 table表头  {name:"id"},
        $scope.ftpTableHead = [
            {name:"源IP地址"},{name:"源端口号"},{name:"源MAC地址"},
            {name:"目的IP"},{name:"目的端口号"},{name:"目的MAC地址"},{name:"传输层协议"},
            {name:"应用协议"},{name:"传输文件名"},{name:"传输文件大小"},{name:"事件产生时间"},
            {name:"事件产生日期"}
        ];
        //DNS域名请求行为  {name:"id"},
        $scope.dnsTableHead = [
            {name:"源IP地址"},{name:"源端口号"},{name:"源MAC地址"},
            {name:"目的IP"},{name:"目的端口号"},{name:"目的MAC地址"},{name:"传输层协议"},
            {name:"应用协议"},{name:"请求域名"},{name:"域名请求返回的IP列表"},{name:"事件产生时间"},
            {name:"事件产生日期"}
        ];

        //获取 管理中心树形列表
        getDeviceCenterTree();

        //通联关系审计
        $scope.netConnClick = function(){

            $scope.title = "通联关系审计";
            $scope.isNetConn = true;
            $scope.auditType = "CONN";
            $scope.dataList = [];
            getAuditList(null);
        };
        //应用行为审计
        $scope.appActionClick = function(){
            $scope.title = "应用行为审计-->WEB应用行为";
            $scope.dataList = [];  //清空列表
            $scope.actionTypeChange({type:"WEB"});
        };
        //应用行为审计 子类型切换
        $scope.actionTypeChange = function (item) {

            $scope.auditType = item.type;
            if(item.type == "WEB"){
                $scope.title = "应用行为审计-->WEB应用行为";
            }else if(item.type == "SSL"){
                $scope.title = "应用行为审计-->SSL访问行为";
            }else if(item.type == "MAIL"){
                $scope.title = "应用行为审计-->电子邮件行为";
            }else if(item.type == "FILE"){
                $scope.title = "应用行为审计-->文件传输行为";
            }else if(item.type == "DNS"){
                $scope.title = "应用行为审计-->DNS域名请求行为";
            }
            $scope.dataList = [];  //清空列表
            getAuditList(null);
        };
        //点击树节点
        $scope.treeNodeClick = function (node) {
            $scope.treeSelected = node;
            $scope.dataList = [];  //清空列表
            $scope.isNoData = true;
            getAuditList(null);
        };
       //获取管理中心数据 树形列表
        function getDeviceCenterTree(){
            // $scope.isLoading = true;
            mainFactory.deviceCenterTree().then(deviceCenterTreeResult,resultFault);
        }
        function deviceCenterTreeResult(result){
            var root = result;
            root.name = root.organs;
            root.children = result.chirGlzxs;
            setArrayItemChild(root);
            $scope.treeData = [root];
            $scope.expandNodes = [root];
            $scope.treeSelected = root;

            $scope.dataList = [];
            getAuditList(null);
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

        //分页事件
        $scope.pageChangeFn = function(page){
            // console.log("page : " + page);
            $scope.currentPage = page;
            getAuditList();
        };

        //获取数据列表
        function getAuditList(scrollID){
            var id = $scope.treeSelected.device_id;  //selectedNode.id;//
            var data = {
                id:id,
                type:$scope.auditType,      //"CONN"
                scrollId:scrollID
            };
            // $scope.isLoading = true;
            mainFactory.netAuditList(data).then(auditListResult,resultFault);
        }
        function auditListResult(result){

            // $scope.isLoading = false;

            if(!result || !result.data || !angular.isArray(result.data)){
                return;
            }
            $scope.isHasMore = result.hasMore;
            $scope.scrollId = result.scrollId;
            var netConnList = result.data;
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
            //重复点击树节点的情况下，会重复添加数据
            if($scope.isScrollEvent){
                $scope.isScrollEvent = false;
                $scope.dataList = $scope.dataList.concat(tempList);
            }else{
                $scope.dataList = tempList;
            }
            $scope.dataListShow = $scope.dataList;
            $scope.dataCount = $scope.dataListShow.length;
            $scope.isNoData = $scope.dataCount > 0;

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
            console.log("resultFault : " + fault);
        }

        function voInitByType(item,type){
            var arr = [];
            var vo;
            if(type == "CONN"){
                vo = utils.vo.netConnAuditVo();
                vo.tcpFlag = item.tcp_flag;vo.inBytes = item.in_bytes;
                vo.outBytes = item.out_bytes;vo.inPkts = item.in_pkts;
                vo.outPkts = item.out_pkts;vo.startTime = item.time;
                vo.endTime = item.end_time;vo.startDate = item.start_date;
                arr = [
                    {value:vo.tcpFlag},{value:vo.inBytes},{value:vo.outBytes},
                    {value:vo.inPkts},{value:vo.outPkts},{value:vo.startTime},
                    {value:vo.endTime},{value:vo.startDate}
                ];
            }else if(type == "WEB"){
                vo = utils.vo.webActionVo();
                vo.domain = item.domain;vo.url = item.url;vo.method = item.method;
                vo.returnCode = item.ret_code;vo.userAgent = item.user_agent;
                vo.cookie = item.cookie;vo.server = item.server;vo.refer = item.refer;
                vo.produceTime = item.time;vo.produceDate = item.cap_date;
                arr = [
                    {value:vo.domain},{value:vo.url},{value:vo.method},{value:vo.returnCode},
                    {value:vo.userAgent},{value:vo.cookie},{value:vo.server},{value:vo.refer},
                    {value:vo.produceTime},{value:vo.produceDate}
                ];
            }else if(type == "SSL"){
                vo = utils.vo.sslActionVo();
                vo.finger = item.finger;vo.country = item.country;vo.organize = item.organize;
                vo.cname = item.cname;vo.sni = item.sni;vo.uorganize = item.uorganize;
                vo.ucname = item.ucname;vo.produceTime = item.time;vo.produceDate = item.cap_date;
                arr = [
                    {value:vo.finger},{value:vo.country},{value:vo.organize},{value:vo.cname},
                    {value:vo.sni},{value:vo.uorganize},{value:vo.ucname},{value:vo.produceTime},
                    {value:vo.produceDate}
                ]
            }else if(type == "MAIL"){
                vo = utils.vo.emailActionVo();
                vo.sender = item.sender;vo.receiver = item.recver;vo.copyTo = item.cc;
                vo.secritCopyTo = item.bcc;vo.subject = item.subject;
                vo.attachment = item.attachment;vo.domain = item.domain;
                vo.mailFrom = item.mail_form;
                vo.rcptTo = item.rcpt_to;vo.ehlo = item.ehlo;
                vo.produceTime = item.time;vo.produceDate = item.cap_date;
                arr = [
                    {value:vo.sender},{value:vo.receiver},{value:vo.copyTo},
                    {value:vo.secritCopyTo},{value:vo.subject},{value:vo.attachment},
                    {value:vo.domain},{value:vo.mailFrom},{value:vo.rcptTo},{value:vo.ehlo},
                    {value:vo.produceTime},{value:vo.produceDate}
                ]
            }else if(type == "FILE"){
                vo = utils.vo.ftpActionVo();
                vo.fileName = item.filename;vo.fileSize = item.filesize;
                vo.produceTime = item.time;vo.produceDate = item.cap_date;
                arr = [
                    {value:vo.fileName},{value:vo.fileSize},
                    {value:vo.produceTime},{value:vo.produceDate}
                ]
            }else if(type == "DNS"){
                vo = utils.vo.dnsActionVo();
                vo.request = item.request;vo.reponse = item.reponse;
                vo.produceTime = item.time;vo.produceDate = item.cap_date;
                arr = [
                    {value:vo.request},{value:vo.reponse},{value:vo.produceTime},{value:vo.produceDate}
                ]
            }
            vo.id = item.id;vo.sip = item.sip;vo.sport = item.sport;
            vo.smac = item.smac;vo.dip = item.dip;vo.dport = item.dport;
            vo.dmac = item.dmac;vo.protocol = item.protocol;vo.app = item.app;

            arr.unshift({value:vo.id},{value:vo.sip},{value:vo.sport},{value:vo.smac},
                {value:vo.dip},{value:vo.dport},{value:vo.dmac},{value:vo.protocol},
                {value:vo.app});
            return arr;
        }
        //加载更多数据；滚动下载
        $scope.loadMore = function () {
            if($scope.isHasMore){
                $scope.isHasMore = false;
                $scope.isScrollEvent = true;
                getAuditList($scope.scrollId);
            }
        };
        //查询；根据id查询
        $scope.searchClick = function () {
           
            var key = $scope.searchStr.trim();
            if(key == ""){
                $scope.dataListShow = $scope.dataList;
            }else{
                $scope.dataListShow = [];
                var tempArr = [];
                for(var i=0;i<$scope.dataList.length;i++){
                    var itm = $scope.dataList[i];
                    if(itm.primaryData.id.indexOf(key) > -1){
                        tempArr.push(itm);
                    }
                }
                $scope.dataListShow = tempArr;
            }
            $scope.tableData = {
                title:$scope.tableHeadList,
                row:$scope.dataListShow
            };
            $scope.dataCount = $scope.dataListShow.length;
        };
    }
})();