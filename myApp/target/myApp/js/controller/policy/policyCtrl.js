/**
 * Created by Administrator on 2017/1/17.
 */
(function () {
    "use strict";
    angular.module("app")
        .controller("policyCtrl",policyCtrlFun);
    policyCtrlFun.$inject = ["mainFactory","$scope"];
    function policyCtrlFun(mainFactory,$scope){

        window.sessionStorage.currentState = "policy";
        window.sessionStorage.currentStateIndex = 2;

        $scope.typeList = [];       //策略分类list
        $scope.policyList = [];     //策略列表list

        // var currentTypeObj = null;   //当前类型object

        $scope.title = "";
        $scope.isPaging = true;
        $scope.isNoData = false;        //当前无数据

        //分页
        $scope.currentPage = 1; //当前为第1页
        $scope.pageTotal = 1;  //每页多少条数据
        $scope.pageSize = 20;    //一共多少页
        $scope.groupSize = 5;   //页码分组，一组多少页码

        $scope.isLoading = false;

        $scope.treeData = [];//$rootScope.myTreeData;
        $scope.expandNodes = [];
        $scope.treeSelected = [];

        //默认情况下 树选择的节点是根节点
        if($scope.treeData){
            $scope.treeSelected = $scope.treeData;
        }

        //左侧树
        getDeviceCenterTree();
        //获取管理中心数据 树形列表
        function getDeviceCenterTree(){
            // $scope.isLoading = true;
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


        // getTypeList();

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
            $scope.policyTypeClick("",node.key);
        };
        //查询策略信息列表
        $scope.policyTypeClick = function (item,centerId){

            $scope.title = item.alias;
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

            $scope.isLoading = true;

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

            $scope.isLoading = false;
            $scope.policyList = result.result;
            if(!$scope.policyList ||  $scope.policyList.length == 0)
            {
                console.log("当前无数据 ！");
                $scope.isNoData = true;
                $scope.isPaging = false;
                return;
            }
            $scope.isNoData = false;
            for(var i=0;i<$scope.policyList.length;i++){
                var policy = $scope.policyList[i];
                var policyExternalInfo=policy.policyExternalInfo;
                var ruleStr="";
                var rules=[];
                if(policyExternalInfo!=null)
                for(var j=0;j<policyExternalInfo.ruleIds.length;j++){
                    if(policyExternalInfo.ruleIds[j]==1)
                    {
                        ruleStr=ruleStr+j+",策略";
                        var k=j+1;
                        var obj={rule:k+"级"};
                        rules.push(obj);
                    }
                }
                $scope.policyList[i].ruleStr=rules;
            }

            //分页
            var page = result.page;
            $scope.pageTotal = page.totalPage;
            if($scope.pageTotal > 1){
                $scope.isPaging = true;
            }
        }

        //分页事件
        $scope.pageChangeFn = function (page) {
            console.log("page : " + page);
            $scope.currentPage = page;

            $scope.policyTypeClick("",$scope.treeSelected.key);
        }
    }
})();