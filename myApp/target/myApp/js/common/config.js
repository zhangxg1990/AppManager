/**
 * Created by Administrator on 2017/4/10.
 */
(function () {
    //服务器配置信息
    if(window.config)
        return window.config;
    window.config = {
        name:"config",
        // monitorServerUrl:"http://192.167.1.71:8080/"//zxg/
        monitorServerUrl:"",//"${maven.serverUrl}"
        // analyzeChartUrl:"tpl/monitor.html",
        analyzeChartUrl:"http://172.21.250.25:8081/dobogo/index-browse.html?" +
        "release=0wsSrPo8Q1GATWVUEWE0Bg&type=rel%26dimensions%3D%5Bdate%3A-_-%3A%23%23YESTERDAY_DATE()%23%23%2C-_-%2Calert%3A-_-%3Aalert%2C-_-%2Cin_bytes%3A-_-%3Ain_bytes%2C-_-%2Cout_bytes%3A-_-%3Aout_bytes%5D"
    };
    return window.config;
})();