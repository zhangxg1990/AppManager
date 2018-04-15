/**
 * Created by Administrator on 2017/1/17.
 */
(function () {
    "use strict";
    angular.module("app")
        .controller("policyCtrl_2",policyCtrlFun);
    policyCtrlFun.$inject = ["mainFactory","$scope","$rootScope"];
    function policyCtrlFun(mainFactory,$scope,$rootScope){

        window.sessionStorage.currentState = "policy";
        window.sessionStorage.currentStateIndex = 2;

        $scope.typeList = [];       //策略分类list
        $scope.policyList = [];     //策略列表list

        $scope.dataList = [];       //数据

        $scope.currentType = null;   //当前类型object

        $scope.title = "";
        $scope.isPaging = false;
        $scope.isNoData = false;        //当前无数据

        $scope.tableHeadList = [];
        $scope.tableDataList = [];
        $rootScope.isLoading = false;

        //分页
        $scope.currentPage = 1; //当前为第1页
        $scope.pageTotal = 1;  //每页多少条数据
        $scope.pageSize = 20;    //一共多少页
        $scope.groupSize = 5;   //页码分组，一组多少页码
        $scope.listTotal = 0;   //总页数

        $scope.treeData = [];//$rootScope.myTreeData;
        $scope.expandNodes = [];
        $scope.treeSelected = [];

        //默认情况下 树选择的节点是根节点
        if($scope.treeData){
            $scope.treeSelected = $scope.treeData;
        }

        //---------动态配置表头，每个类型要展示的数据不同
        //-----公共属性
        $scope.commomHeadList = [
            {name:"device_id",alias:"检测器ID"},
            {name:"level_class",alias:"设备层级"},
            {name:"policy_id",alias:"策略ID"},
            {name:"policy_type",alias:"策略类型"},
            {name:"policy_version",alias:"策略版本号"}
        ];
        //--------------------攻击窃密检测策略
        //----木马攻击窃密检测策略
        $scope.trojanVo = {
            name:"trojan",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"trojan_id",alias:"木马分类编号"},
                {name:"store_pcap",alias:"报文是否留存"},
                {name:"os",alias:"攻击适用的操作系统"},
                {name:"trojan_name",alias:"木马名称"},
                {name:"trojan_type",alias:"木马类型"},
                {name:"descr",alias:"规则描述"},
                {name:"rule",alias:"规则内容"}
            ],
            data:[]
        };
        //------漏洞利用窃密检测策略
        $scope.attackVo = {
            name:"attack",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"store_pcap",alias:"报文是否留存"},
                {name:"rule",alias:"规则内容"},
                {name:"attack_type",alias:"攻击类型"},
                {name:"application",alias:"攻击适用的应用程序"},
                {name:"os",alias:"攻击适用的操作系统"}
            ],
            data:[]
        };
        //------恶意程序窃密检测策略
        $scope.malwareVo = {
            name:"malware",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"md5",alias:"恶意程序文件的md5"},
                {name:"signature",alias:"恶意程序包含的十六进制字符串"},
                {name:"sip",alias:"源地址"},
                {name:"content",alias:"正文或标题"},
                {name:"filename",alias:"文件名"},
                {name:"malware_type",alias:"恶意程序种类"},
                {name:"malware_name",alias:"恶意程序名称"}
            ],
            data:[]
        };
        //-------其他攻击窃密检测策略
        $scope.otherVo = {
            name:"other",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"}
            ],
            data:[]
        };
        //-------未知攻击窃密检测策略
        $scope.abnormalVo = {
            name:"abnormal",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"}
            ],
            data:[]
        };
        //-------------------------传输泄密检测策略
        //-------密标文件检测策略
        $scope.fingerFileVo = {
            name:"finger_file",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"}
            ],
            data:[]
        };
        //------标密检测策略
        $scope.sensitiveFileVo = {
            name:"sensitive_file",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"}
            ],
            data:[]
        };
        //-------关键字检测策略
        $scope.keywordFileVo = {
            name:"keyword_file",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"rule_type",alias:"规则类型"},
                {name:"min_match_count",alias:"最少命中次数"},
                {name:"rule_context",alias:"规则内容"}
            ],
            data:[]
        };
        //----------加密文件检测策略
        $scope.encryptionFileVo = {
            name:"encryption_file",
            list:[
                // {name:"id",alias:"类型ID"},
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"fileSize",alias:"文件大小",children:[
                    {name:"minsize",alias:"最小值(KB)"},
                    {name:"maxsize",alias:"最大值(KB)"}
                ]}
            ],
            data:[]
        };
        //----------多层压缩检测策略
        $scope.compressFileVo = {
            name:"compress_file",
            list:[
                // {name:"id",alias:"类型ID"},
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"depth",alias:"压缩深度"},
                {name:"filesize",alias:"文件大小",children:[
                    {name:"backsize",alias:"需要回传压缩文件大小(MB)"},
                    {name:"dropsize",alias:"需要丢弃压缩文件大小(MB)"}
                ]}
            ],
            data:[]
        };
        //----------图片文件筛选策略
        $scope.pictureFilterVo = {
            name:"picture_filter",
            list:[
                // {name:"id",alias:"类型ID"},
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"filesize",alias:"图片大小",children:[
                    {name:"minsize",alias:"最小值(KB)"},
                    {name:"maxsize",alias:"最大值(KB)"}
                ]},
                {name:"resolution",alias:"图片分辨率",children:[
                    {name:"x",alias:"x",children:[
                        {name:"minsize",alias:"最小值(KB)"},
                        {name:"maxsize",alias:"最大值(KB)"}
                    ]},
                    {name:"y",alias:"y",children:[
                        {name:"minsize",alias:"最小值(KB)"},
                        {name:"maxsize",alias:"最大值(KB)"}
                    ]}
                ]}
            ],
            data:[]
        };
        //-----------版式文件检测策略
        $scope.styleFileVo = {
            name:"style_file",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"}
            ],
            data:[]
        };
        //-----------------------------目标审计策略
        //---------IP审计检测策略
        $scope.ipListenVo = {
            name:"ip_listen",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"sip",alias:"源IP地址"},
                {name:"sport",alias:"源端口范围"},
                {name:"dip",alias:"目的IP地址"},
                {name:"dport",alias:"目的端口范围"},
                {name:"protocol",alias:"通信协议"}
            ],
            data:[]
        };
        //-------域名审计检测策略
        $scope.domainListenVo = {
            name:"domain_listen",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"dns",alias:"域名信息"},
                {name:"rule_type",alias:"规则类型"},
                {name:"match_type",alias:"匹配类型"}
            ],
            data:[]
        };
        //-------URL审计检测策略
        $scope.urlListenVo = {
            name:"url_listen",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"dns",alias:"域名信息"},
                {name:"rule_type",alias:"规则类型"},
                {name:"match_type",alias:"匹配类型"}
            ],
            data:[]
        };
        //--------账号审计检测策略
        $scope.accountListenVo = {
            name:"account_listen",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"account_type",alias:"账号应用类型"},
                {name:"account",alias:"账号信息"},
                {name:"rule_type",alias:"规则类型"},
                {name:"match_type",alias:"匹配类型"}
            ],
            data:[]
        };
        //-----------------------网络审计策略
        //-------通联关系上报策略
        $scope.netLogVo = {
            name:"net_log",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"interval",alias:"上传的时间间隔(分钟)"},
                {name:"num",alias:"日志条数"}
            ],
            data:[]
        };
        //---------应用行为上报策略
        $scope.appBehaviorVo = {
            name:"app_behavior",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"interval",alias:"上传的时间间隔(分钟)"},
                {name:"num",alias:"缓存事件数"}
            ],
            data:[]
        };
        //---------应用行为WEB过滤策略
        $scope.webFilterVo = {
            name:"web_filter",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"url",alias:"URL信息"},
                {name:"rule_type",alias:"规则类型"},
                {name:"match_type",alias:"匹配类型"}
            ],
            data:[]
        };
        //----------应用行为DNS过滤策略
        $scope.dnsFilterVo = {
            name:"dns_filter",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"dns",alias:"域名信息"},
                {name:"rule_type",alias:"规则类型"},
                {name:"match_type",alias:"匹配类型"}
            ],
            data:[]
        };
        //------------IP白名单过滤策略
        $scope.ipWhitelist = {
            name:"ip_whitelist",
            list:[
                {name:"rule_id",alias:"规则ID"},
                {name:"risk",alias:"告警级别"},
                {name:"ip",alias:"IP地址"},
                {name:"port",alias:"端口"}
            ],
            data:[]
        };

        $scope.dataList = [
            $scope.trojanVo,$scope.attackVo,$scope.malwareVo,$scope.otherVo,$scope.abnormalVo,
            $scope.fingerFileVo,$scope.sensitiveFileVo,$scope.keywordFileVo,$scope.encryptionFileVo,
                $scope.compressFileVo,$scope.pictureFilterVo,$scope.styleFileVo,
            $scope.ipListenVo,$scope.domainListenVo,$scope.urlListenVo,$scope.accountListenVo,
            $scope.netLogVo,$scope.appBehaviorVo,$scope.webFilterVo,$scope.dnsFilterVo,$scope.ipWhitelist
        ];

        //左侧树
        getDeviceCenterTree();
        //获取管理中心数据 树形列表
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

            //查询策略分类
            getTypeList();
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

        function getTypeList(){
            mainFactory.policyTypeList().then(typeListResult,resultFault);
        }
        function typeListResult(result)
        {
            $scope.typeList = result.dtoPolicyTypes;

            if($scope.typeList && angular.isArray($scope.typeList)){

                var group = $scope.typeList[0];
                var item = group.dtoPolicyTypes[0];

                resetTypeUI(item);

                $scope.policyTypeClick(item,result.id);//"level0");
            }

        }
        //重置策略类型按钮css
        function resetTypeUI(typeObj){
            for(var i=0;i<$scope.typeList.length;i++){
                var itm = $scope.typeList[i];
                for(var j=0;j<itm.dtoPolicyTypes.length;j++){
                    var tm = itm.dtoPolicyTypes[j];
                    if(tm.id == typeObj.id){
                        tm.css = "type_item_css";
                    }else{
                        tm.css = "";
                    }
                }
            }
        }

        function resultFault(fault){
            $rootScope.isLoading = false;
            console.log("fault : " + fault);
        }
        $scope.searchItemClick = function (item) {

            // if(!$scope.treeSelected || !$scope.treeSelected.key){
            //     return;
            // }

            resetTypeUI(item);

            $scope.policyTypeClick(item,$scope.treeSelected.device_id);
        };
        $scope.treeNodeClick = function (node) {
            $scope.treeSelected = node;
            $scope.policyTypeClick({name:$scope.currentType},node.key);
        };
        //查询策略信息列表
        $scope.policyTypeClick = function (item,centerId){

            $scope.title = item.alias;

            $scope.currentType = item.name;
            //动态表头
            for(var i=0;i<$scope.dataList.length;i++){
                var vo = $scope.dataList[i];
                if($scope.currentType == vo.name){
                    $scope.tableHeadList = vo.list;
                    break;
                }
            }

            var types="";
            if(item==""){
                types="";
            }else{
                types=item.name;
            }
            var data = {
                type:types,
                pageNum:$scope.currentPage,
                pageSize:$scope.pageSize,
                centerId:centerId
            };

            $scope.isPaging = false;
            $rootScope.isLoading = true;
            if($scope.treeSelected!=null)
            {
                if($scope.treeSelected.device_type==1)
                {
                    mainFactory.policyDetectorList(data).then(policyListResult,resultFault);
                }else
                    mainFactory.policyDataList(data).then(policyListResult,resultFault);
            }else{
                mainFactory.policyDataList(data).then(policyListResult,resultFault);
            }
        };

        function policyListResult(result){

            $scope.policyList = result.result;
            if(!$scope.policyList ||  $scope.policyList.length == 0)
            {
                console.log("当前无数据 ！");
                $scope.isNoData = true;
                $scope.isPaging = false;
                $rootScope.isLoading = false;
                return;
            }
            $scope.isNoData = false;
            // for(var i=0;i<$scope.policyList.length;i++){
            //     var policy = $scope.policyList[i];
            //     var policyExternalInfo=policy.policyExternalInfo;
            //     var ruleStr="";
            //     var rules=[];
            //     if(policyExternalInfo!=null)
            //         for(var j=0;j<policyExternalInfo.ruleIds.length;j++){
            //             if(policyExternalInfo.ruleIds[j]==1)
            //             {
            //                 ruleStr=ruleStr+j+",策略";
            //                 var k=j+1;
            //                 var obj={rule:k+"级"};
            //                 rules.push(obj);
            //             }
            //         }
            //     $scope.policyList[i].ruleStr=rules;
            // }

            // console.log("$scope.tableHeadList : " + $scope.tableHeadList);
            var tempDataList = result.result;
            $scope.tableDataList = [];
            for(var k=0;k<tempDataList.length;k++){
                // var normalOjb = tempDataList[k].policyInfo;
                // var externalObj = tempDataList[k].policyExternalInfo;
                var tempObj = tempDataList[k].policyContent;
                var objList  = [];
                //赋值itme
                for(var j=0;j<$scope.tableHeadList.length;j++){
                    var head = $scope.tableHeadList[j];
                    var prop = head.name;
                    var obj = {};
                    obj.name = prop;

                    var tempValue = "";
                    if(tempObj){
                        tempValue = tempObj[prop] ;//? tempObj[prop] : "";
                        // if(tempObj[prop] == 0 || tempObj[prop] == "0"){
                        //     tempValue = 0;
                        // }
                        obj.value = tempValue;

                        //报文是否留存
                        if(prop == "store_pcap"){
                            // var tm = tempObj[prop] ? tempObj[prop] : "";
                            if(tempValue == 1 || tempValue == "1"){
                                obj.value = "是";
                            }else if(tempValue == 0 || tempValue == "0"){
                                obj.value = "否";
                            }
                        }
                        //木马类型
                        if(prop == "trojan_type"){
                            // var tem = tempObj[prop] ? tempObj[prop] : "";
                            if(tempValue == "1" || tempValue == 1){
                                obj.value = "特种木马";
                            }else if(tempValue == "2" || tempValue == 2){
                                obj.value = "普通木马";
                            }else if(tempValue == "3" || tempValue == 3){
                                obj.value = "远控";
                            }else if(tempValue == "4" || tempValue == 4){
                                obj.value = "其他";
                            }
                        }
                        //告警级别
                        if(prop == "risk"){
                            // var ttm = tempObj[prop] ? tempObj[prop] : "";
                            if(tempValue == "0" || tempValue == 0){
                                obj.value = "无风险级";
                            }else if(tempValue == "1" || tempValue == 1){
                                obj.value = "一般级";
                            }else if(tempValue == "2" || tempValue == 2){
                                obj.value = "关注级";
                            }else if(tempValue == "3" || tempValue == 3){
                                obj.value = "严重级";
                            }else if(tempValue == "4" || tempValue == 4){
                                obj.value = "紧急级";
                            }
                        }
                    }




                    // //攻击流行程度
                    // if(prop == "prevalence"){
                    //     var tmm = tempObj[prop] ? tempObj[prop] : "";
                    //     if(tmm == "1" || tmm == 1){
                    //         obj.value = "高";
                    //     }else if(tmm == "2" || tmm == 2){
                    //         obj.value = "中";
                    //     }else if(tmm == "3" || tmm == 3){
                    //         obj.value = "低";
                    //     }
                    // }
                    // obj.value = tempValue;

                    objList.push(obj);
                }
                // $scope.tableDataList.push(objList); //{list:objList}
                $scope.tableDataList.push({list:objList});
            }
            //分页
            var page = result.page;
            $scope.listTotal = page.total;
            $scope.pageTotal = page.totalPage;
            if($scope.pageTotal > 1){
                $scope.isPaging = true;
            }
            $rootScope.isLoading = false;
        }

        //分页事件
        $scope.pageChangeFn = function (page) {
            // console.log("page : " + page);
            $scope.currentPage = page;
            $scope.policyTypeClick({name:$scope.currentType},$scope.treeSelected.key);
        }
    }
})();