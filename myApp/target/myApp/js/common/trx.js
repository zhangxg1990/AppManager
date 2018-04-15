'use strict';
(function(){
    //1
    if( window.TRX && window.trx)
        return window.trx ;

    var trx = {
        name:"trx",
        scribe_job: "/topic/job",//任务创建
        scribe_step: "/topic/step",//执行步聚信道
        scribe_tracker:"/topic/tracker",//算子执行情况
        scribe_stop:"/topic/stop",//任务完成通道
        scribe_error:"/topic/error",//任务错误
        /*派发全局事件*/
        disLocalEvent:function ( event ){
            $(trx.EventDispter).trigger(event) ;
        },
        /*监听全局事件*/
        addLocalListener:function ( type , handler ){
            $(trx.EventDispter).bind(type, handler) ;
        }
    };
    function popBootWin( iumodal ,url ,controller,data ){
        iumodal.open({
            animation: true,
            templateUrl:url,
            controller: controller,
            resolve: {
                popData:function(){
                    return data;
                }
            }
        })
    }
    /*
     *  显示右键菜单
     *  @event:鼠标事件
     *  @data:菜单列表 [{label:"",type:""}]
     *  @itemhandler:菜单点击回调
     *  @exdata:回调扩展参数
     * */
    var _singleMenu;
    function showRightMenu(event, data, itemhandler, exdata) {
        if(event.stopPropagation)
            event.stopPropagation();
        if(event.preventDefault)
            event.preventDefault();
        event.returnValue = false;
        event.cancelBubble = true;
        $("body").bind("contextmenu", function () {
            return false;
        });
        if (_singleMenu == null)
            _singleMenu = rightMenu();
        _singleMenu.init(data, itemhandler, exdata);
        _singleMenu.show(event.pageX, event.pageY);
    }
    /*右键菜单对象*/
    function rightMenu(data, itemhandler, exdata) {
        var _this = {content: null, items: null, source: data, itemfunc: itemhandler, exdata: exdata};

        //菜单初始化
        _this.init = function (data, itemhandler, exdata) {
            //清空所有子 和临时变量
            _this.destroy();

            if (!data)
                return;

            var _lis = [],
                _liitem;

            _this.source = data;
            _this.itemfunc = itemhandler;
            _this.exdata = exdata;

            //新建容器
            if (!_this.content) {
                _this.content = $('<ul class="dropdown-menu" style="font-size: 14px;" id="mmmm" ></ul>');
            }

            //生成菜单
            data.forEach(function (item, index) {
                if (item.hasOwnProperty("type") && item.type === "line")
                    _liitem = $('<li class="divider" style="margin:0"></li>');
                else  if(!item.hasOwnProperty("visible") || item.visible===true) {
                    if(item.hasOwnProperty("enabled") || item.enabled ===false)
                    {
                        _liitem = $('<li style="pointer-events: none;padding:0"> </li>');
                        var _lb = $('<a tabindex="-1" style="">' + item.label + '</a>');
                        _liitem.append(_lb) ;
                        _lb.css("opacity",0.5) ;//用jquery的不然要写一堆
                    }
                    else
                        _liitem = $('<li style="padding:0"> <a tabindex="-1">' + item.label + '</a></li>');
                    _liitem.on("mousedown",function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        if (_this.itemfunc)
                            _this.itemfunc(item, index, exdata);
                        _this.hidden();
                    });
                }
                _lis.push(_liitem);
                _this.content.append(_liitem);
            });
            _this.items = _lis;
        };

        //隐藏菜单
        _this.hidden = function () {
            if (!_this.content)
                return;
            _this.content.css({
                display: "none"
            });
            _this.content.remove();
            $(window).off("click", windowOutClick);
        };

        //显示菜单
        _this.show = function (px, py) {
            if (!_this.content)
                return;
            var _cheight = $(window).height(),
                _cwidth = $(window).width();
            $('body').append(_this.content);
            var _hh = _this.content.height(),
                _ww = _this.content.width(),
                _left = px,
                _top = py;

            //如果向下高出 上移动点
            if ((py + 20 + _hh) > _cheight)
                _top = _cheight - _hh - 20;
            if ((px + 15 + _ww) > _cwidth)
                _left = px - 15 - _ww;

            _this.content.css({
                display: "inline-block",
                top: _top,
                left: _left
            }).fadeIn(200);

            //
            $(window).on("click", windowOutClick);
        };

        //外部点击隐藏
        function windowOutClick(e) {
            console.log("windowOutClick : " + e);
            _this.hidden();
            return false;
        }

        //销毁
        _this.destroy = function () {
            if (_this.content) {
                _this.items.forEach(function (item, index) {
                    console.log("index : " + index);
                    item.unbind("click");
                    item.remove();
                });
                $(_this.content).empty();
            }
            _this.source = null;
            _this.itemfunc = null;
            _this.exdata = null;
            _this.items = null;
        };
        _this.init(data, itemhandler, exdata);
        return _this;
    }

    /**
     * msgData：弹框内容是文字或包含界面
     * data:弹框时所用到的数据
     * callBack: 弹框关闭时调用的函数
     * **/
    function alertHandler(msgData,title,btnData,data,callBack){
        if(!btnData)
            btnData = {ok:"确定"};
        var baseInfo = {msgType:msgData.msgType,message:msgData.message,title:title,btnData:btnData};
        trx.disLocalEvent({type:trx.POPUP_VIEW_EVENT,baseInfo:baseInfo,dataBy:data,closeFunc:callBack});
    }

    //后台REST数据请求
    function _requestHander(){
        var _this = {};
        //trx.request.excuteSend($q,$http,"post",url,null,data);
        _this.excuteSend = function(angularPromise,nagularHttp,requestMothed,partPath,urlParam,postData,successCall,errorCall){
            var deferred = angularPromise.defer();
            // var promise = deferred.promise;
            // promise.then(function(data) {
            //     if(successCall)
            //         successCall(data);
            // }, function(data) {
            //     if(errorCall)
            //         errorCall(data);
            // });
            // console.log("successCall : " + successCall);
            // console.log("errorCall : " + errorCall);

            if(urlParam != null){
                urlParam.callback = "JSON_CALLBACK";
            }

            var url = window.config.monitorServerUrl + partPath;
            var exp = (url.indexOf("?") > 0)?"&":"?";
            for (var i in urlParam){
                url += (exp + i + "=" + urlParam[i]);
                exp = (url.indexOf("?") > 0)?"&":"?";
            }
            url += (exp + "trx_random="+new Date().getTime());
            // url += "?callback=JSON_CALLBACK";
            var params = {};
            var method = "";
            if(requestMothed.toLowerCase() == "get") {
                method = "GET";
            }else if(requestMothed.toLowerCase() == "post") {
                method = "POST";
                if(postData)
                    params = JSON.stringify(postData);
            }else if(requestMothed.toLowerCase() == "put"){
                method = "PUT";
                if(postData)
                    params = JSON.stringify(postData);
            }else if(requestMothed.toLowerCase() == "delete"){
                method = "DELETE";
            }
            var header = {ContentType: "application/json;charset=UTF-8",dataType:"jsonp"};
            // nagularHttp.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
            // nagularHttp.defaults.headers.common['Access-Control-Allow-Methods'] = "POST,GET,PUT,DELETE";
            // nagularHttp.defaults.headers.common['Access-Control-Allow-Headers'] = "Authorization,Lang";
            nagularHttp({method: method, url: url,data:params,headers:header}).
            success(function(data, status, headers, config) {
                deferred.resolve(data);
                // console.log("status : " + status);
                // console.log("headers : " + headers);
                // console.log("config : " + config);

                //cjj-2017.4.1 超时返回登录
                if(data.code == 401 && data.message.indexOf("无权限访问该资源") > -1){
                    var temp = {
                        title:"登录超时",
                        data:{msg:"登录超时！"}
                    };
                    // trx.disLocalEvent("login_out_time");
                    trx.disLocalEvent({type:trx.LOGIN_OUT_TIME,data:temp});
                    console.log("登录超时");
                    // utils.popWin($uibModal,"tpl/common/timeOut.html","timeOutCtrl",temp);
                }

            }).
            error(function(data, status, headers, config) {
                //deferred.reject(data);
                // if(data!=null){
                //     showSysMessage(data.message,"error",10000);
                // }else{
                //     showSysMessage("数据请求错误(code/34).","error",10000);
                // }

                var msg = {message:""};
                if(status == "404"){
                    msg = data.message;
                }else if(status == "401"){
                    msg = data.message;
                }else if(status == "500"){
                    msg = data;
                }
                //系统提示框
                trx.disLocalEvent({type:trx.SYS_ALERT_EVENT,sysPrompt:msg});

                console.log("status : " + status);
                console.log("headers : " + headers);
                console.log("config : " + config);
            });

            return deferred.promise;
        };
        return _this;
    }
    //CSVToArray
    function CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                (strMatchedDelimiter != strDelimiter)
            ){

                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );

            }


            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                var strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                );

            } else {

                // We found a non-quoted value.
                var strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }

        // Return the parsed data.
        return( arrData );
    }
    function showSysMessage(val){
        console.log(val);
    }
    //后台socket数据交互
    function _socketRequestHandler(){
        var sockertPoster = {};
        sockertPoster.showResponse = function(message) {
            var response = $("#run_response");
            // response.append(message);
            var d = new Date();
            response.append("[" + d.getTime() + "]").append(message);
            response.append("</br></br>");
        };
        sockertPoster.createGetConnect = function(connectedCall,resultCall,userId){
            sockertPoster.connectedCall = connectedCall;
            sockertPoster.resultCall = resultCall;
            sockertPoster.userId = userId;
            console.log("useId: " + sockertPoster.userId );
            if(!sockertPoster.stomp){
                try{
                    var urlpath  = window.config.processDebugSocketPath;
                    var socket = new SockJS(urlpath + "resources/endpointJob");
                    var stomp = Stomp.over(socket);
                    sockertPoster.showResponse("创建连接 [" + "/user/" + sockertPoster.userId + "] :" + urlpath);
                    stomp.connect({"userId":sockertPoster.userId}, function(frame) {
                        console.log("useId3: " + sockertPoster.userId );
                        sockertPoster.showResponse("连接成功 [" + "/user/" + sockertPoster.userId + "]");
                        sockertPoster.stomp = stomp;
                        var responsedo = function(scribe,respnose,isError){
                            if(isError){
                                return;
                            }
                            if(resultCall != null) {
                                resultCall(scribe,respnose);
                            }
                        };
                        sockertPoster.showResponse("开始订阅 [" + "/user/" + sockertPoster.userId + trx.scribe_job + "]");
                        sockertPoster.stomp.subscribe("/user/" + sockertPoster.userId + trx.scribe_job, function(respnose){
                            sockertPoster.showResponse("订阅消息 [" + "/user/" + sockertPoster.userId + trx.scribe_job + "]: " + respnose.body);
                            responsedo(trx.scribe_job,respnose);
                        },function(error){
                            sockertPoster.showResponse("订阅错误 [" + "/user/" + sockertPoster.userId + trx.scribe_job + "]:" + error);
                            responsedo(trx.scribe_job,error,true);
                        });

                        sockertPoster.showResponse("开始订阅 [" + "/user/" + sockertPoster.userId + trx.scribe_step + "]");
                        sockertPoster.stomp.subscribe("/user/" + sockertPoster.userId + trx.scribe_step, function(respnose){
                            responsedo(trx.scribe_step,respnose);
                            sockertPoster.showResponse("订阅消息 [" + "/user/" + sockertPoster.userId + trx.scribe_step + "]: " + respnose.body);
                        },function(error){
                            sockertPoster.showResponse("订阅错误 [" + "/user/" + sockertPoster.userId + trx.scribe_step + "]");
                            responsedo(trx.scribe_step,error,true);
                        });
                        sockertPoster.showResponse("开始订阅 [" + "/user/" + sockertPoster.userId + trx.scribe_tracker + "]");
                        sockertPoster.stomp.subscribe("/user/" + sockertPoster.userId + trx.scribe_tracker, function(respnose){
                            sockertPoster.showResponse("订阅消息 [" + "/user/" + sockertPoster.userId + trx.scribe_tracker + "]: " + respnose.body);
                            responsedo(trx.scribe_tracker,respnose);
                        },function(error){
                            responsedo(trx.scribe_tracker,error,true);
                        });
                        sockertPoster.showResponse("开始订阅 [" + "/user/" + sockertPoster.userId + trx.scribe_stop + "]");
                        sockertPoster.stomp.subscribe("/user/" + sockertPoster.userId + trx.scribe_stop, function(respnose){
                            responsedo(trx.scribe_error,respnose);
                            sockertPoster.showResponse("订阅消息 [" + "/user/" + sockertPoster.userId + trx.scribe_stop + "]: " + respnose.body);
                        },function(error){
                            responsedo(trx.scribe_tracker,error,true);
                        });
                        sockertPoster.showResponse("开始订阅 [" + "/user/" + sockertPoster.userId + trx.scribe_error + "]");
                        sockertPoster.stomp.subscribe("/user/" + sockertPoster.userId + trx.scribe_error, function(respnose){
                            //responsedo(trx.scribe_error,respnose);
                            sockertPoster.showResponse("订阅消息 [" + "/user/" + sockertPoster.userId + trx.scribe_error + "]: " + respnose.body);
                            alert(trx.scribe_error);
                        },function(error){
                            console.log("error : " + error);
                            alert(trx.scribe_error + "2");
                        });

                        if(connectedCall) {
                            setTimeout(connectedCall,1000);
                            // connectedCall = null;
                        }
                    },function(err){
                        // var obj = {er:err};
                        showSysMessage("测试环境错误","error");
                        sockertPoster.showResponse("测试环境错误 [" + "/user/" + sockertPoster.userId + "]: " + err);
                    });

                }catch (error){
                    showSysMessage("未创建测试环境","error");
                }
            }
        };
        sockertPoster.disconnect = function(){
            if(sockertPoster.stomp){
                sockertPoster.stomp.disconnect();
                sockertPoster.stomp = null;
                sockertPoster.showResponse("断开连接 [" + "/user/" + sockertPoster.userId + "]");
                sockertPoster.userId = "";
                delete  sockertPoster.stomp;
            }
        };

        sockertPoster.sendMsg = function(dctive,msgObj){
            if (sockertPoster.stomp != null) {
                sockertPoster.stomp.send(dctive,{},JSON.stringify(msgObj));
                sockertPoster.showResponse("发送指令(" + dctive + ") [" + "/user/" + sockertPoster.userId + "] :" + msgObj.toString());
            }
        };

        return sockertPoster;
    }
    trx.showRightMenu = showRightMenu;//右键菜单
    trx.alert = alertHandler ;
    trx.request = _requestHander();
    trx.popBootWin = popBootWin ;
    trx.socket = _socketRequestHandler();
    trx.CSVToArray = CSVToArray ;
    trx.flowAreaSize = {w:3000,h:3000};
    trx.EventDispter = {} ;
    trx.POPUP_VIEW_EVENT = "popupViewEvt";
    trx.LOGIN_OUT_TIME = "login_out_time";      //登录超时事件
    trx.SYS_ALERT_EVENT = "sys_alert_event";    //系统告警事件，用来控制显示系统告警提示框
    window.TRX = window.trx = trx;
    return trx;
})();