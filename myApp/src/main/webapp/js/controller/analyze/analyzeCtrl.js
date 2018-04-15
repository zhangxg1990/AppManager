/**
 * Created by Administrator on 2017/1/22.
 */
(function () {
    angular.module("app")
        .controller("analyzeCtrl",analyzeCtrlFun);
    analyzeCtrlFun.$inject = ["$scope"];
    function analyzeCtrlFun($scope){
        $scope.title = "告警数据分析";

        $scope.isAlertData = true;      //告警数据分析
        $scope.isDealMsg = false;       //处置信息分析
        $scope.isDeviceStatus = false;      //设备状态分析

        //------------告警数据分析 图表容器 box 图表chart
        var alertDetectorBox = document.getElementById("id_alertDetector");
        var alertNetAppTypeBox = document.getElementById("id_alertNetAppType");
        var alertFileTypeBox = document.getElementById("id_alertFileType");
        var alertTimeBox = document.getElementById("id_alertTime");
        var alertCheckMethodBox = document.getElementById("id_alertCheckMethod");

        var alertDetectorChart = echarts.init(alertDetectorBox);
        var alertNetAppTypeChart = echarts.init(alertNetAppTypeBox);
        var alertFileTypeChart = echarts.init(alertFileTypeBox);
        var alertTimeChart = echarts.init(alertTimeBox);
        var alertCheckMethodChart = echarts.init(alertCheckMethodBox);

        //------------处置信息分析 图表容器 box 图表chart
        var dealDetectorBox = document.getElementById("id_dealDetector");
        var dealNetAppTypeBox = document.getElementById("id_dealNetAppType");
        var dealFileTypeBox = document.getElementById("id_dealFileType");
        var dealTimeBox = document.getElementById("id_dealTime");
        var dealCheckMethodBox = document.getElementById("id_dealCheckMethod");
        var dealCheckStateBox = document.getElementById("id_dealCheckState");

        var dealDetectorChart = echarts.init(dealDetectorBox);
        var dealNetAppTypeChart = echarts.init(dealNetAppTypeBox);
        var dealFileTypeChart = echarts.init(dealFileTypeBox);
        var dealTimeChart = echarts.init(dealTimeBox);
        var dealCheckMethodChart = echarts.init(dealCheckMethodBox);
        var dealCheckStateChart = echarts.init(dealCheckStateBox);

        //-------------设备状态分析   图表容器 box 图表chart
        // var deviceTypeBox = document.getElementById(id_deviceType);
        // var deployPositionBox = document.getElementById(id_deployPosition);
        // var netFlowRateBox = document.getElementById(id_netFlowRate);
        // var hardwareParamBox = document.getElementById(id_hardwareParam);
        // var faultRateBox = document.getElementById(id_faultRate);

        var deviceTypeChart = echarts.init(document.getElementById("id_deviceType"));
        var deployPositionChart = echarts.init(document.getElementById("id_deployPosition"));
        var netFlowRateChart = echarts.init(document.getElementById("id_netFlowRate"));
        var hardwareParamChart = echarts.init(document.getElementById("id_hardwareParam"));
        var faultRateChart = echarts.init(document.getElementById("id_faultRate"));

        setAlertData();


        $scope.displayViewChange = function (index) {
            $scope.isAlertData = false;
            $scope.isDealMsg = false;
            $scope.isDeviceStatus = false;
            if(index == 1){
                $scope.title = "告警数据分析";
                $scope.isAlertData = true;
                setAlertData();
            }else if(index == 2){
                $scope.title = "处置信息分析";
                $scope.isDealMsg = true;
                setDealMsgData();
            }else if(index == 3){
                $scope.title = "设备状态统计";
                $scope.isDeviceStatus = true;
                setDeviceStateData();
            }
        };

        function setAlertData(){
            var option = {
                title : {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ]
                    }
                ]
            };

            alertDetectorChart.clear();
            alertNetAppTypeChart.clear();
            alertFileTypeChart.clear();
            alertTimeChart.clear();
            alertCheckMethodChart.clear();

            alertDetectorChart.setOption(option);
            alertNetAppTypeChart.setOption(option);
            alertFileTypeChart.setOption(option);
            alertTimeChart.setOption(option);
            alertCheckMethodChart.setOption(option);
        }

        function setDealMsgData(){
            var option2 = {
                tooltip: {
                    show: true
                },
                legend: {
                    data:['销量']
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        "name":"销量",
                        "type":"bar",
                        "data":[5, 20, 40, 10, 10, 20]
                    }
                ]
            };

            dealDetectorChart.clear();
            dealNetAppTypeChart.clear();
            dealFileTypeChart.clear();
            dealTimeChart.clear();
            dealCheckMethodChart.clear();
            dealCheckStateChart.clear();

            dealDetectorChart.setOption(option2);
            dealNetAppTypeChart.setOption(option2);
            dealFileTypeChart.setOption(option2);
            dealTimeChart.setOption(option2);
            dealCheckMethodChart.setOption(option2);
            dealCheckStateChart.setOption(option2);
        }

        function setDeviceStateData(){
            var option3 = {
                title: {
                    text: "对数轴示例",
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}"
                },
                legend: {
                    x: 'left',
                    data: ["3的指数"]
                },
                xAxis: [
                    {
                        type: "category",
                        name: "x",
                        splitLine: {show: false},
                        data: ["一", "二", "三", "四", "五", "六", "七", "八", "九"]
                    }
                ],
                yAxis: [
                    {
                        type: "log",
                        name: "y"
                    }
                ],
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                series: [
                    {
                        name: "3的指数",
                        type: "line",
                        data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]

                    }
                ]
            };
            deviceTypeChart.clear();
            deployPositionChart.clear();
            netFlowRateChart.clear();
            hardwareParamChart.clear();
            faultRateChart.clear();

            deviceTypeChart.setOption(option3);
            deployPositionChart.setOption(option3);
            netFlowRateChart.setOption(option3);
            hardwareParamChart.setOption(option3);
            faultRateChart.setOption(option3);
        }

        
    }
})();