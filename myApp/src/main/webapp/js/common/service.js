/**
 *  后台通讯类
 * Created by Administrator on 2017/2/9.
 */
(function () {
    if(window.server){
        return window.server;
    }
    function service() {
        var _service = {};

        

        //发送POST请求
        _service.sendPostRequest = function () {

        };
        //发送GET请求
        _service.sendGetRequest = function () {

        };

        return _service;
    }
    window.server = service();
})();