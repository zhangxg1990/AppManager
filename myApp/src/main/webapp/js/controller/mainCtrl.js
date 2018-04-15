/**
 * Created by Administrator on 2017/1/17.
 */
(function () {
    "use strict";
    angular.module("monitorApp")
        .controller("mainCtrl",mainCtrlFun);
    mainCtrlFun.$inject = ["$scope","$rootScope","$state","$uibModal","mainFactory","$log"];
    function mainCtrlFun($scope,$rootScope,$state,$uibModal,mainFactory,$log) {

        //后台方法列表;;;;发布时删除。。。。。。。。。。
        // $scope.fnListUrl = trx.config.serverUrl + "resources/swagger-ui.html";
        $scope.fnListUrl = window.config.monitorServerUrl + "resources/swagger-ui.html";

        $scope.isMain = false;      //显示 主内容 页面 ；；导航栏+内容
        $scope.isUserManage = false;    // 显示 用户管理 页面
        $scope.isLogin = true;     // 显示 登录 页面
        $scope.isLoginOutTimePop = false;   //是否已经打开了登录超时告警提示窗口
        
        $scope.currentUser = "管理员"; //当前用户 1 超级权限
        $scope.loginTime = "";//登录时间

        //权限配置，显示拥有权限的功能模块;
        // 超级管理员：1 策略管理：100 告警处置：200 网络审计：300 检测器管理：400 用户管理：500
        $scope.policyOK = true;     //策略展示 100
        $scope.alertOK = true;      //告警处置 200
        $scope.auditOK = true;      //网络审计 300
        $scope.detectorOK = true;     //检测器管理 400
        $rootScope.userOK = true;   //用户管理 500
        $rootScope.roleOk = true;   //角色管理 600

        $scope.savePassword = false;

        $rootScope.isLoading = false;

        $scope.userName = "";   //显示在页面的登录用户名

        $scope.user = {
            username:"",//"admin",
            password:"",//"admin",
            saveUserCHK:false//false      //保存用户名、密码
        };

        //登录成功以后创建一个session；SessionStorage
        var session = window.sessionStorage;

        // if(!session.isLogin){
        //     return;
        // }

        //刷新页面，判断是否登录
        if(session.isLogin == "true"){
            $log.debug("已经登录了。。。。。");

            $scope.user.username = session.username;
            $scope.user.password = session.password;
            $scope.saveUserCHK = session.saveUserCHK;

            $scope.userName = session.username;

            //设置权限
            $scope.policyOK = checkIsOk(session.isPolicyOk);        //=="true"
            $scope.alertOK = checkIsOk(session.isAlertOk);
            $scope.auditOK = checkIsOk(session.isAuditOk);
            $scope.detectorOK = checkIsOk(session.isDetectorOk);
            $rootScope.userOK = checkIsOk(session.isUserOk);
            $rootScope.roleOk = checkIsOk(session.isRoleOk);

            //打开当前刷新时所在的页面
            $scope.isLogin = false;
            $scope.isMain = true;
            var temIndex = parseInt(window.sessionStorage.currentStateIndex);
            changeMenuUI(temIndex);

            if(window.sessionStorage.currentState == "analyze"){
                $state.go(window.sessionStorage.currentState,{index:window.sessionStorage.analyzeIndex});
            }else{
                $state.go(window.sessionStorage.currentState);
            }
        }else{
            session.isLogin = false;
            $log.debug("没有登录。。。。。。。");

            if(window.localStorage.user && window.localStorage.pass && window.localStorage.saveUserCHK){
                $scope.user.username = window.localStorage.user;
                $scope.user.password = window.localStorage.pass;

                $scope.userName = window.localStorage.user;

                var isSave = false;
                if(window.localStorage.saveUserCHK == "true" || window.localStorage.saveUserCHK == true){
                    isSave = true;
                }
                $scope.user.saveUserCHK = isSave;
            }
        }

        $log.debug("$scope.user : " + $scope.user);

        /**
         * index: 0 登录、1 设备管理、2 策略管理 3 告警处置、
         * 4 网络审计、5 数据分析、6、外部应用管理、7、用户管理
         * 8 检测器管理、
         * **/
        $scope.menuClick = function(index){
            changeMenuUI(index);
            switch (index){
                case 0:
                    $state.go("login");
                    break;
                case 1:
                    $state.go("device");
                    break;
                case 2:
                    $state.go("policy");
                    break;
                case 3:
                    $state.go("alert");
                    break;
                case 4:
                    $state.go("audit");
                    break;
                case 5:
                    $state.go("analyze");
                    break;
                case 6:
                    $state.go("manage");
                    break;
                case 7:
                    $state.go("userManage");
                    break;
                case 8:
                    $state.go("deviceRegister");
                    break;
                case 9:         //数据分析
                    break;
            }
        };

        function stateChangeById(id){

            if(id == "1"){
                $state.go("policy");
                changeMenuUI(2);
            }

            if(id == "100"){    //策略管理
                $state.go("policy");
                changeMenuUI(2);
                // $(".nav2").addClass("nav_bg");
                // $(".nav1,.nav3,.nav4,.nav6,.nav8").removeClass("nav_bg");
                // changeMenuUI(i);
            }else if(id == "200"){  //告警处置
                changeMenuUI(3);
                $state.go("alert");
            }else if(id == "300"){  //网络审计
                $state.go("audit");
                changeMenuUI(4);
            }else if(id == "400"){  //检测器管理
                $state.go("deviceRegister");
                changeMenuUI(8);
            }else if(id == "500"){  //用户管理
                $state.go("userManage");
            }else if(id == "600"){  //角色管理
                $state.go("userManage");
            }

        }

        function checkIsOk(bool){
            var bo = false;
            if(bool == true ||bool == "true"){
                bo = true;
            }
            return bo;
        }

        //修改菜单栏按钮的样式css，背景颜色
        function changeMenuUI(index){
            for(var i=1;i<10;i++) {
                var navClass = ".nav" + i;
                if (index == i) {
                    $(navClass).addClass("nav_bg");
                } else {
                    $(navClass).removeClass("nav_bg");
                }
            }
        }

        //-------------------------系统提示框：显示、关闭  start --------
        $scope.isSysAlert = false;
        $scope.showSysAlert = function(){
           var to =  setTimeout(function(){
                $scope.isSysAlert = !$scope.isSysAlert ;
                clearTimeout(to);
            },500);
        };
        $scope.closeSysAlert = function () {
            var to =  setTimeout(function(){
                $scope.isSysAlert = false;
                clearTimeout(to);
            },500);
        };
        //---------------------------------------end 系统提示框----------

        //登录系统
        $scope.loginClick = function(){
            mainFactory.login($scope.user).then(loginResultFn,loginFaultFn);
            // $scope.isLogin = false;
            // $state.go("device");
        };
        function loginResultFn(result){
            if(result.name == $scope.user.username){


                $scope.userName = result.name;

                $scope.isLogin = false;
                $scope.isMain = true;     
                $scope.isUserManage = false;

                var date = new Date();//.Format("yyyy-MM-dd hh:mm:ss");
                utils.user.name = result.name;
                utils.user.loginTime = date.toLocaleString();

                //登录成功以后，获取权限列表；；admin用户自动获取所有权限
                var authorityList = result.authorities;
                setUserAuthority(authorityList);
                
                $scope.currentUser = utils.user.name;
                $scope.loginTime = utils.user.loginTime;

                //登录成功，把登录状态保存在session中
                session.isLogin = true;
                session.username = $scope.user.username;
                session.password = $scope.user.password;
                session.saveUserCHK = $scope.user.saveUserCHK;

                // var str = authorityList[0].url;
                // console.log(str);
                // var index = str.indexOf("/") + 1;
                // var st = str.slice(index,str.length);

                var cur = authorityList[0];
                if(!cur){
                    cur = {id:9};
                }

                stateChangeById(cur.id);
                // $state.go("policy");
                // $(".nav2").addClass("nav_bg");
                // $(".nav1,.nav3,.nav4,.nav6,.nav8").removeClass("nav_bg");
                
                var nowDate = new Date();
                $log.debug("登录成功 ！ 用户名：" + $scope.user.username + " 登录时间：" + nowDate);

                //保存密码
                if($scope.user.saveUserCHK){
                    window.localStorage.setItem("user",$scope.user.username);
                    window.localStorage.setItem("pass",$scope.user.password);
                    window.localStorage.setItem("saveUserCHK",$scope.user.saveUserCHK);

                    var isSave = false;
                    if(window.localStorage.saveUserCHK == "true" || window.localStorage.saveUserCHK == true){
                        isSave = true;
                    }
                    $scope.user.saveUserCHK = isSave;
                }else{
                    window.localStorage.clear();
                    $scope.user.username = "";
                    $scope.user.password = "";
                    $scope.user.saveUserCHK = false;
                }
            }
        }
        function loginFaultFn(fault){
            session.isLogin = false;
            $log.debug("fault : " + fault);
        }
        
        //退出登录
        $scope.loginOutClick = function () {
            var data = {
                title:"退出系统",
                message:"确定退出系统吗？",
                do:function () {
                    mainFactory.logout($scope.user).then(logoutResultFn,logoutFaultFn);
                    // $scope.isLogin = true;
                    // $state.go("login");
                }
            };
            utils.popWin($uibModal,"tpl/common/alertPop.html","alertPopCtrl",data);
        };
        function logoutResultFn(result) {
            if(result.code == 200){
                $scope.isLogin = true;
                session.isLogin = false;

                if($scope.user.saveUserCHK){
                    window.localStorage.setItem("user",$scope.user.username);
                    window.localStorage.setItem("pass",$scope.user.password);
                    window.localStorage.setItem("saveUserCHK",$scope.user.saveUserCHK);
                }else{
                    window.localStorage.removeItem("user");
                    window.localStorage.removeItem("pass");
                    window.localStorage.removeItem("saveUserCHK");
                }
            }
        }
        function logoutFaultFn(fault) {
            // session.isLogin = false;
            // console.log("logout --- fault : " + fault);
            $log.debug("logout --- fault : " + fault);
        }

        //用户管理
        // $scope.userManageClick = function () {
        //
        //     $scope.$broadcast("event.userAuthority");
        //    
        //     // $state.go("userManage");
        //     $scope.isLogin = false;
        //     $scope.isMain = false;
        //     $scope.isUserManage = true;
        // };

        //数据分析menuClick
        $scope.dataAnalyzeClick = function(index){


            window.sessionStorage.analyzeIndex = index;

            $state.go("analyze",{index:index});
            
            // if(index == 1){
            //     //告警信息分析
            //     $state.go("analyze_alert");
            // }else if(index == 2){
            //     //处置信息分析
            //     $state.go("analyze_deal");
            // }else if(index == 3){
            //     //设置状态分析
            //     $state.go("analyze_device_status");
            // }
        };

        //cjj-2017.5.2 说明：设备注册没有设置权限
        function getAuthority(bool){
            $scope.policyOK = bool;
            $scope.alertOK = bool;
            $scope.auditOK = bool;
            $scope.detectorOK = bool;
            $rootScope.userOK = bool;
            $rootScope.roleOk = bool;

            // utils.user.authority.device = bool;
            utils.user.authority.policy = bool;
            utils.user.authority.alert = bool;
            utils.user.authority.audit = bool;
            utils.user.authority.detector = bool;
            utils.user.authority.analyze = bool;
            // utils.user.authority.expandSys = bool;
            utils.user.authority.role = bool;
            utils.user.authority.user = bool;

            session.isPolicyOk = bool;
            session.isAlertOk = bool;
            session.isAuditOk = bool;
            session.isDetectorOk = bool;
            session.isUserOk = bool;
            session.isRoleOk = bool;
        }

        //设置用户权限：
        // 1：超级管理员 100：策略管理 200：告警处置 300：网络审计 400：检测器管理 500：用户管理
        function setUserAuthority(list){
            getAuthority(false);
            angular.forEach(list,function (item) {
                if(item.id == "1"){
                    getAuthority(true);
                }
                else if(item.id == "100"){
                    $scope.policyOK = true;
                    utils.user.authority.policy = true;
                    session.isPolicyOk = true;
                }else if(item.id == "200"){
                    $scope.alertOK = true;
                    utils.user.authority.alert = true;
                    session.isAlertOk = true;
                } else if(item.id == "300"){
                    $scope.auditOK = true;
                    utils.user.authority.audit = true;
                    session.isAuditOk = true;
                }else if(item.id == "400"){
                    $scope.detectorOK = true;
                    utils.user.authority.detector = true;
                    session.isDetectorOk = true;
                }else if(item.id == "500"){
                    $rootScope.userOK = true;
                    utils.user.authority.user = true;
                    session.isUserOk = true;
                }else if(item.id == "600"){
                    $rootScope.roleOk = true;
                    utils.user.authority.role = true;
                    session.isRoleOk = true;
                }
            });
        }

        //登录超时
        trx.addLocalListener(trx.LOGIN_OUT_TIME,function () {
            // console.log("登录超时。。。。。。。。。。。");

            //避免弹出多个登录超时告警提示窗口
            if(!$scope.isLoginOutTimePop){
                $scope.isLoginOutTimePop = true;
            }else{
                return;
            }

            var data = {
                name:"登录超时",
                message:"登录超时，请重新登录!",
                flush:function(){
                    $scope.isLogin = true;      //返回登录页
                    $scope.isLoginOutTimePop = false;
                    $state.go("login");
                }
            };
            utils.popWin($uibModal,"tpl/common/timeOut.html","timeOutCtrl",data);
        });

        // $scope.sysAlertMessage = "系统提示！！！";
        //系统告警提示
        trx.addLocalListener(trx.SYS_ALERT_EVENT,function(evt){
           
            // $scope.sysAlertMessage = evt.sysPrompt.message;
            // $scope.isSysAlert = true;

            // var to = setTimeout(function(){
            //     $scope.sysAlertMessage = "系统提示！！！";
            //     $scope.isSysAlert = false;
            //     clearTimeout(to);
            // },50);

            $rootScope.isLoading = false;

            var data = {
                title:"提示",
                message:evt.sysPrompt.message,
                do:function(){

                }
            };
            utils.popWin($uibModal,"tpl/common/alertPop.html","alertPopCtrl",data);
        });

        // //页面刷新，不退出登录
        // window.onbeforeunload = function (event) {
        //     console.log("刷新页面。。。。。。。。。" + event);
        //     // alert("刷新页面！！！！！");
        // };
    }
})();