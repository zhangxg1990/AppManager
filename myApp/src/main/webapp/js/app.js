
//地址配置
(function(){

    'use strict';
    /*angular.module('loginApp',["ui.bootstrap", "ui.bootstrap.tpls", "ui.router"]);*/
    /*angular.module('loginApp',["ui.bootstrap", "ui.bootstrap.tpls", "ui.router"]);*/
    angular.module('app',["ui.bootstrap", "ui.bootstrap.tpls", "ui.router","treeControl"]);
    angular.module('monitorApp', ['ui.router','app']);
    // angular.module("appDirective",["ui.bootstrap", "ui.bootstrap.tpls"]);

    // if(window.config)
    //     return window.config;
    // window.config = {
    //     name:"config",
    //     // monitorServerUrl:"http://192.167.1.71:8081/magicjc/"//
    //     monitorServerUrl:"http://172.21.250.25:8186/magicjc/"//"${maven.serverUrl}"
    // };
    // return window.config;
})();
