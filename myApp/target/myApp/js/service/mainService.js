/**
 * 主controller的后台通讯类，包括：登录，退出登录
 * Created by Administrator on 2017/2/10.
 */
(function () {
    "use strict";
    angular.module("app")
        .factory("mainFactory",mainFactoryFn);
    mainFactoryFn.$inject = ["$q","$http"];
    function mainFactoryFn($q,$http){
        var factory = {
            /**
             * 登录
             * **/
            //登录
            login:function(data){
                var username = data.username;
                var password = data.password;
                var url = "resources/user/login?username=" + username + "&password=" + password;
                return trx.request.excuteSend($q,$http,"post",url,null,data);
            },
            //退出登录
            logout:function (data) {
                var username = data.username;
                var password = data.password;
                var url = "resources/user/logout?username=" + username + "&password=" + password;
                return trx.request.excuteSend($q,$http,"post",url,null,data);
            },
            /**
             * 用户管理
             * **/
            //用户列表
            getUserList:function(){
                return trx.request.excuteSend($q, $http, "get", "resources/user/users");
            },
            //添加用户
            addUser:function (data) {
                return trx.request.excuteSend($q,$http,"post","resources/user",null,data);
            },
            //编辑用户
            editUser:function (data,bool) {
                var url = "resources/user/" + data.id;
                var temp = {};
                temp.id = data.id;
                temp.name =data.name;
                // temp.password
                temp.dtoRoles = data.dtoRoles;

                if(bool){
                    temp.password = data.password;
                }

                return trx.request.excuteSend($q,$http,"post",url,null,temp);
            },
            //删除用户
            deleteUser:function (data) {
                var url = "resources/user/" + data.id;
                return trx.request.excuteSend($q,$http,"delete",url);
            },
            //授权角色
            authorizeRole:function (data) {
                var url = "resources/user/" + data.id;
                var temp = {};
                temp.id = data.id;
                temp.name =data.name;
                temp.dtoRoles = data.dtoRoles;
                return trx.request.excuteSend($q,$http,"post",url,null,temp);
            },
            //角色列表
            getRoleList:function(){
                return trx.request.excuteSend($q,$http,"get","resources/role/roles");
            },
            //添加角色
            addRole:function(data){
                return trx.request.excuteSend($q,$http,"post","resources/role",null,data);
            },
            //编辑角色
            editRole:function(data){
                var url = "resources/role/" + data.id;
                return trx.request.excuteSend($q,$http,"put",url,null,data);
            },
            //删除角色
            deleteRole:function(data){
                var url = "resources/role/" + data.id;
                return trx.request.excuteSend($q,$http,"delete",url);
            },
            /**
             *  设备检测
             * **/
            //拓扑图数据
            topoList:function(){
               var url = "resources/device/getDevicesByTp";
                return trx.request.excuteSend($q,$http,"get",url);
            },
            //设备列表
            deviceList:function(data){
                var url = "resources/device/listDevices?page=" + data.page + "&pageSize=" + 
                    data.pageSize;
                return trx.request.excuteSend($q,$http,"get",url);
            },
            //检测器和管理中心总量
            deviceTotal:function(){
                var url = "resources/device/deviceTotal";
                return trx.request.excuteSend($q,$http,"get",url);
            },
            //检测器列表
            detectorList:function(data){
                var url = "resources/detector/detectors?pageNo=" + data.page + "&pageSize=" +
                    data.pageSize;
                return trx.request.excuteSend($q,$http,"get",url);
            },
            //新增检测器
            detectorAdd:function(data){
                var url = "resources/detector";
                return trx.request.excuteSend($q,$http,"post",url,null,data);
            },
            //编辑检测器
            detectorEdit:function(data){
                var url = "resources/detector/" + data.id;
                return trx.request.excuteSend($q,$http,"post",url,null,data);
            },
            //删除检测器
            detectorDelete:function(data){
                var url = "resources/detector/" + data.id;
                return trx.request.excuteSend($q,$http,"delete",url);
            },
            /**
             * 策略展示
             * **/
            policyTypeList:function(){
                var url = "resources/policy/types";
                return trx.request.excuteSend($q,$http,"get",url);
            },

            policyDetectorList:function(data){
                var type = data.type;
                var pageNo = data.pageNum;
                var pageSize = data.pageSize;
                var detectorId=data.centerId;

                var url = "resources/policy/list/detector/"+detectorId+"?pageNo=" + pageNo + 
                    "&pageSize=" + pageSize+"&centerId="+detectorId;
                if(type!="")
                    url = url + "&type="+type;
                return trx.request.excuteSend($q,$http,"get",url);
            },
            policyDataList:function(data){
                var type = data.type;
                var pageNum = data.pageNum;
                var pageSize = data.pageSize;
                var centerId=data.centerId;

                var url = "resources/policy/levelList?pageNo=" + pageNum + "&pageSize=" + pageSize+
                    "&centerId="+centerId;
                if(type!="")
                    url = url + "&type="+type;
                return trx.request.excuteSend($q,$http,"get",url);
            },
            /**
             * 网络审计
             * **/
            netAuditList:function (data) {
                var id = data.id;
                var netType =  data.type;
                var scrollId = data.scrollId;

                var url = "resources/netprotocol/list"+ "?netType="+ netType + "&centerDeviceId=" + id;
                if(scrollId){
                    url = url + "&scrollId=" + scrollId;
                }
                return trx.request.excuteSend($q,$http,"get",url);
            },
            /**
             * 网络审计列表，数据存在数据库里，不是调用的其他地方的数据
             * **/
            netAuditList_2:function(data){
                
                var url = "resources/netprotocol/listByNetProtocol?centerDeviceId=" + data.id +
                    "&netType=" + data.type + "&page=" + data.page + "&pageSize=" + data.pageSize;
                // var obj = {
                //     cap_date:data.capDate
                // };
                var obj = data.protocol;
                return trx.request.excuteSend($q,$http,"post",url,null,obj);
            },

            //管理中心 树型结构
            deviceCenterTree:function(){
                var url = "resources/device/centerTree";
                return trx.request.excuteSend($q,$http,"get",url);
            },
            /**
             * 扩展应用系统管理
             *
             * **/
            //扩展应用系统列表
            expandSystemList:function (data) {
                var url = "resources/app/apps?pageNo=" + data.pageNo + "&pageSize=" + data.pageSize;
                return trx.request.excuteSend($q,$http,"get",url);
            },
            //添加扩展应用系统
            addExpandSystem:function(data){
                var url = "resources/app";
                return trx.request.excuteSend($q,$http,"post",url,null,data);
            },
            //编辑扩展应用系统
            editExpandSystem:function(data){
                var url = "resources/app/" + data.id;
                return trx.request.excuteSend($q,$http,"post",url,null,data);
            },
            //删除扩展应用系统
            deleteExpandSystem:function(data){
                var url = "resources/app/" + data.id;
                return trx.request.excuteSend($q,$http,"delete",url);
            },

            /**
             * 告警处置
             * **/
            //告警 左侧树 上下级分类树
            alertTypesList:function(){
                var url = "resources/alert/types";
                return trx.request.excuteSend($q,$http,"get",url);
            },
            //管理中心告警列表，包括本级和下级的所有检测器、管理中心的告警数据
            alertMagCenterList:function(data){
                var alertType = data.alertType;
                var pageNo = data.pageNo;
                var pageSize = data.pageSize;
                var alert = data.alert;
                
                var url = "resources/alert/listCenterAlert?" +
                    "page=" + pageNo + "&pageSize=" + pageSize;
                
                if(alertType){
                    url = url + "&alertType=" + alertType;
                }
                if(alert){
                    return trx.request.excuteSend($q,$http,"post",url,null,alert);
                }
                return trx.request.excuteSend($q,$http,"post",url);
            },
            //检测器告警列表，检测器的告警数据
            alertDetectorList:function(data){
                var alertType = data.alertType;
                var pageNo = data.pageNo;
                var pageSize = data.pageSize;
                var alert = data.alert;
               
                var url = "resources/alert/listDetectorAlert?" +
                    "page=" + pageNo + "&pageSize=" + pageSize;

                if(alertType){
                    url = url + "&alertType=" + alertType;
                }
                
                if(alert){
                    return trx.request.excuteSend($q,$http,"post",url,null,alert);
                }
                return trx.request.excuteSend($q,$http,"post",url);
            },
            //告警处置
            alertDeal:function (data) {
                var item = {
                    alertId:data.alertId,
                    alertDecision:data.alertJudge,
                    alertType:data.alertType.toUpperCase(),       //"TROJANATTACK",//
                    disposalOpinion:data.alertOpinion,
                    disposalPerson:data.alertMan,
                    disposalTime:data.alertTime,
                    level:0,
                    policyId:""
                };
                var url = "resources/alert/addAlertDisposalInfo";
                return trx.request.excuteSend($q,$http,"post",url,null,item);
            },
            //处置记录
            alertDealHistory:function(data){
                var alertId = data.id;
                var url = "resources/alert/disposalInfo/" + alertId;
                return trx.request.excuteSend($q,$http,"get",url);
            }
        };
        return factory;
    }
})();
