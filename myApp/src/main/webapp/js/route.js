'use strict';
angular.module('monitorApp')
    .config(['$stateProvider', '$urlRouterProvider','$logProvider',
        function ($stateProvider, $urlRouterProvider,$logProvider) {

            //开启或关闭debug模式
            $logProvider.debugEnabled(true);        // true / false

            //,"$qProvider"    ,$qProvider

            //关闭掉 报错：：Possibly unhandled rejection: {}
            // $qProvider.errorOnUnhandledRejections(false);

            // $urlRouterProvider.otherwise('device');
            $stateProvider
                .state("login",{    //登录
                    url:"/login",
                    templateUrl:"tpl/login.html"
                })
                .state("device",{       //设备检测
                    url:"/deviceCheck",
                    templateUrl:"tpl/device/device.html"
                })
                .state("policy",{       //策略展示
                    url:"/policyShow",
                    templateUrl:"tpl/policy/policy.html"
                })
                .state("alert",{        //告警处置
                    url:"/alertDeal",
                    templateUrl:"tpl/alert/alert.html"
                })
                .state("audit",{        //网络审计
                    url:"/netAudit",
                    templateUrl:"tpl/audit/audit.html"
                })
                .state("analyze",{      //数据分析
                    url:"/dataAnalyze",
                    templateUrl:"tpl/analyze/analyze_2.html",
                    params:{index:-1}
                    // templateUrl:"tpl/analyze/analyze.html"
                })
                .state("deviceRegister",{
                    url:"/deviceRegister",
                    templateUrl:"tpl/device/deviceRegister.html"
                })
                .state("manage",{       //外部应用管理
                    url:"/manage",
                    templateUrl:"tpl/manage/manage.html"
                })
                .state("userManage",{       //用户管理
                    url:"/userManage",
                    templateUrl:"tpl/userManage.html"
                });
                // .state("analyze_alert",{    //告警数据分析
                //     url:"/analyzeAlert",
                //     templateUrl:"tpl/analyze/analyzeAlert.html"
                // })
                // .state("analyze_deal",{     //处置信息分析
                //     url:"/analyzeDeal",
                //     templateUrl:"tpl/analyze/analyzeDeal.html"
                // })
                // .state("analyze_device_status",{    //设备状态统计
                //     url:"/analyzeDeviceStatus",
                //     templateUrl:"tpl/analyze/analyzeDeviceStatus.html"
                // });
            //docReady();
        }]);
function docResady() {
    $('.datatable').dataTable({
        "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'i><'col-md-12 center-block'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"
        }
    });
    $('.btn-close').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().parent().fadeOut();
    });
    $('.btn-minimize').click(function (e) {
        e.preventDefault();
        var $target = $(this).parent().parent().next('.box-content');
        if ($target.is(':visible')) $('i', $(this)).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        else                       $('i', $(this)).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        $target.slideToggle();
    });
    $('.btn-setting').click(function (e) {
        e.preventDefault();
        $('#myModal').modal('show');
    });
}