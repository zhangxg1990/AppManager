/**
 * Created by Administrator on 2017/2/7.
 */
(function () {
    if(window.utils){
        return window.utils;
    }

    /**
     *  name:名称；；cnName：中文名；；
     *  paging：分页组件的处理逻辑
     *  popWin：弹出窗口组件
     *  vo：数据模型对象，每一个属性对应一个数据模型，比如，用户vo：userVo；；vo.userVo
     *  charts：图表，包括---饼图、柱状图、折线图
     * **/
    var _utils = {
        name:"utils",
        cnName:"工具类",
        user:currentUser(),
        paging:paging(),
        popWin:popWin,
        vo:{},
        charts:{
            pieChartOption:pieChartOption(),
            columnChartOption:columnChartOption(),
            lineChartOption:lineChartOption()
        },
        authorityList:getAuthorityList,
        cloneObject:cloneObject,
        deleteItemById:deleteItemById,
        getNamesInArray:getNamesInArray,
        getDataInArrayByName:getDataInArrayByName,
        replaceArrayItemById:replaceArrayItemById,
        strToTime:strToTime,
        strToTime2:strToTime2
    };

    //权限树，权限配置数据
    function getAuthorityList(){
        var authorityList = [
            {id:"100",name:"策略管理"},
            {id:"200",name:"告警处置"},
            {id:"300",name:"网络审计"},
            {id:"400",name:"检测器管理"},
            {id:"500",name:"用户管理"}//,
            // {id:"600",name:"角色管理"}
        ];
        return authorityList;
    }
    
    
    /**
     * 登录用户的信息
     * 用户名 name、登录时间、loginTime、用户权限列表 authorities
     * **/
    function currentUser(){
        var _this = this;
        this.name = "";
        this.loginTime = "";
        // this.authorities = [];
        this.authority = {  //--------------用户权限------------
            policy:false,    //策略管理
            alert:false,     //告警处置
            audit:false,     //网络审计
            analyze:false,   //数据分析
            detector:false,     //检测器
            user:false,      //用户管理
            role:false       //角色管理
        };
        return _this;
    }

    /**
     *  复制对象的属性
     * **/
    function cloneObject(object){
        var obj = {};
        for(var property in object){
            // console.log("属性： " + property + " 值： " + object[property]);
            obj[property] = object[property];
        }
        return obj;
    }
    
    /**
     *  根据id替换掉数组中的元素
     * **/
    function replaceArrayItemById(arr,item){
        for(var i=0;i<arr.length;i++){
            var temp = arr[i];
            if(temp.id == item.id){
                arr[i] = item;
                return arr;
            }
        }
        return arr;
    }
    
    /**
     *  根据id删除数组中的元素
     * **/
    function deleteItemById(arr,id){
        var temp = [];
        for(var i=0;i<arr.length;i++){
            var item = arr[i];
            if(item.id == id){
                continue;
            }
            temp.push(item);
        }
        return temp;
    }
    /**
     *  获取数组中元素的名字name的集合
     *  返回值Array
     * **/
    function getNamesInArray(arr){
        // var str = "";
        // angular.forEach(arr,function (item) {
        //     console.log(item.name);
        //     str = str + "," + item.name;
        // });
        // return str.slice(1,str.length);
        if(!arr || arr.length == 0){
            return [];
        }
        var temp = [];
        angular.forEach(arr,function (item) {
            temp.push(item.name);
        });
        return temp;
    }
    /**
     *  获取数组中名字包含关键字key的所有元素
     *  返回值Array
     * **/
    function getDataInArrayByName(arr,name){
        var temp = [];
        if(!name || name == "" || name == " "){
            return arr;
        }
        angular.forEach(arr,function (item) {
            if(item.name.indexOf(name) != -1){
                temp.push(item);
            }
        });
        return temp;
    }

    /**
     * 时间戳转为时间
     */
    function strToTime(str){
        var dat = new Date();
        dat.setTime(str);
        var temp = dat.toLocaleDateString() + " " + dat.toLocaleTimeString();
        return temp;
    }
    /**
     * 时间戳转为时间:yyyy-MM-dd hh:mm:ss
     */
    function strToTime2(str){
        var dat = new Date();
        dat.setTime(str);
        var ymd = dat.toLocaleDateString();
        var hh = dat.getHours();
        var mm = dat.getMinutes();
        var ss = dat.getSeconds();

        // var temp =  + " " + dat.getHours() + ":" + dat.getMinutes() + ":" + dat.getSeconds();
        // var temp = dat.toLocaleDateString() + " " + dat.toLocaleTimeString();
        return ymd + " " + checkValue10(hh) + ":" + checkValue10(mm) + ":" + checkValue10(ss);
    }
    /**
     * 比较时分秒是否小于10
     **/
    function checkValue10(value){
        if(value < 10){
            return "0"+value;
        }else{
            return value;
        }
    }
    
    //------------------------------- 弹出窗口 弹出模态窗口 start -------- 
    function popWin(uibModal,url,controller,data,size){
        uibModal.open({
            animation:true,
            templateUrl:url,
            controller:controller,
            size:size,
            backdrop:"static",              //禁止点击空白处关闭弹框
            keyboard:"false",               //禁止按键盘esc键关闭弹框
            resolve:{
                popData:function(){
                    return data;
                }
            }
        })
    }
    //-----------------------------弹出窗口 弹出模态窗口 end -----------

    //--------------------------------- 分页功能 start --------------
    function paging(){
        var _this = {};
        // _this.pageCount = 10;   //总页数
        _this.pageSize = 20;    //每页显示条数
        _this.currentPage = 1;      //当前页
        _this.dataList = [];        //总数据
        // _this.currentShowList = []; //当前页显示的数据list，当前页显示的数据列表
        _this.prePage = 1;      //上一页
        _this.nextPage = 0;     //下一页
        
        
        //总页数
        _this.pageCount = function(){
            return Math.ceil(_this.dataList.length/_this.pageSize);
        };
        //当前页 列表显示的数据
        _this.currentShowList = function () {
            var start = _this.currentPage - 1;
            var end = _this.currentPage;
            return _this.dataList.slice(start,end);
        };
        //获取上一页的页码
        _this.getPrePage = function () {
            _this.currentPage--;
            if(_this.currentPage<1){
                _this.currentPage = 1;
            }
            return _this.currentPage;
        };
        //获取下一页的页码
        _this.getNextPage = function(){
            _this.currentPage++;
            if(_this.currentPage > _this.pageCount){
                _this.currentPage = _this.pageCount;
            }
            return _this.currentPage;
        };
        //跳转到某一页
        _this.goToPage = function(index){
            if(!_this.dataList || _this.dataList.length == 0){
                console.log("paging : dataList 源数据为空 ！");
                return;
            }
            var start = index - 1;
            var end = index;
            _this.currentPage = index;
            _this.currentShowList = _this.dataList.slice(start,end);
            return _this.currentShowList;
        };
        //返回上一页
        _this.backToPrePage = function(){
            if(!_this.dataList || _this.dataList.length == 0){
                console.log("paging : dataList 源数据为空 ！");
                return;
            }
            if(_this.currentPage <= 1){
                return;
            }
            var pageIndex = _this.currentPage - 1;
            _this.goToPage(pageIndex);
        };
        //转到下一页
        _this.goNextPage = function(){
            if(!_this.dataList || _this.dataList.length == 0){
                console.log("paging : dataList 源数据为空 ！");
                return;
            }
            if(_this.currentPage == _this.pageCount){
                return;
            }
            var pageIndex = _this.currentPage + 1;
            _this.goToPage(pageIndex);
        };
        return _this;
    }
//------------------------------------ 分页功能 end ----------------------------------------

//------------------------ 图表组件 start --------------------
    //------------饼图-------
    /**
     * 饼图数据
     * 封装echart饼图需要的option
     * 必填项：标题 title 图例 lengend 数据 dataList
     * **/
    function pieChartOption(){

        var _this = {};
        _this.title = "某站点用户访问来源";
        _this.subTitle = "纯属虚构";
        _this.areaTitle = "访问来源";
        _this.lengend = ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'];
        _this.dataList = [
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
        ];
        
        _this.getTempOption = function(){
            var obj = {
                title : {
                    text: _this.title,
                    subtext: _this.subTitle,
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:_this.lengend
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
                        name:_this.areaTitle,
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:_this.dataList
                    }
                ]
            };
            return obj;
        };

        return _this;
    }
    //-------------柱状图------
    /**
     * 柱状图的数据
     *
     * **/
    function columnChartOption(){
        var _this = {};
        _this.title = "柱状图";
        _this.lengend = ['销量'];
        _this.areaTitle = "销量";
        _this.xAxias = ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"];
        _this.dataList = [5, 20, 40, 10, 10, 20];
        _this.getTempOption = function(){
            var option = {
                title:{
                    text:_this.title,
                    x:'center'
                },
                tooltip: {
                    show: true
                },
                legend: {
                    x: 'left',
                    data:_this.lengend
                },
                xAxis : [
                    {
                        type : 'category',
                        data : _this.xAxias
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        "name":_this.areaTitle,
                        "type":"bar",
                        "barWidth":15,
                        "data":_this.dataList
                    }
                ]
            };
            return option;
        };
        return _this;
    }
    //------------折线图------
    /**
     * 折线图的数据
     * 
     * **/
    function lineChartOption(){
        var _this = {};
        _this.title = "对数轴示例";
        _this.areaTitel = "3的指数";
        _this.lengend = ["3的指数"];
        _this.xAxias = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
        _this.yAxias = "y";
        _this.dataList = [1, 3, 9, 27, 81, 247, 741, 2223, 6669];
        _this.getTempOption = function(){
            var option = {
                title: {
                    text: _this.title,
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}"
                },
                legend: {
                    x: 'left',
                    data: _this.lengend
                },
                xAxis: [
                    {
                        type: "category",
                        name: "x",
                        splitLine: {show: false},
                        data: _this.xAxias
                    }
                ],
                yAxis: [
                    {
                        type: "log",
                        name: _this.yAxias
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
                        data: _this.dataList

                    }
                ]
            };
            return option;
        };
        return _this;
    }
//------------------------- end 图表组件-----------------------

    window.utils = _utils;
})();