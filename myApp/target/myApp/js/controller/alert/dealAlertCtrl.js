/**
 * 告警处置controller
 * Created by Administrator on 2017/2/9.
 */
(function () {
    angular.module("app")
        .controller("dealAlertCtrl",dealAlertCtrlFn);
    dealAlertCtrlFn.$inject = ["$scope","$uibModal","$uibModalInstance","mainFactory","popData"];
    function dealAlertCtrlFn($scope,$uibModal,$uibModalInstance,mainFactory,popData) {

        var alertType = popData.data.alertType.toLowerCase();
        var alertId = popData.data.id;
        var vm = $scope.vm = {alertType:null,filePriority:null};
        //告警判定
        $scope.typeList = null;
        //是否是资源文件告警处置
        $scope.isSourceFile = false;
        $scope.filePriorityList = null;

        //攻击窃密
        var attackTypeList = [
            {name:"疑似攻击窃密"},
            {name:"攻击窃密"},
            {name:"非攻击窃密"}
        ];
        //传输文件窃密
        var smTypeList = [
            {name:"疑似传输泄密"},
            {name:"传输泄密"},
            {name:"非传输泄密"}
        ];
        //目标审计
        var auditTypeList = [
            {name:"目标疑似泄密"},
            {name:"目标泄密"},
            {name:"目标未泄密"}
        ];
        //资源文件 --------- 这个暂时不做，放到后面做
        var sourceFileTypeList = [
            {name:"疑似涉密文件"},
            {name:"涉密文件"},
            {name:"非涉密文件"}
        ];
        $scope.filePriorityList = [
            {name:"高"},{name:"中"},{name:"低"}
        ];

        if(alertType == "trojanattack" || alertType == "exploitattack"||
            alertType == "malwareattack"|| alertType == "otherattack"){
            //攻击窃密
            $scope.typeList = attackTypeList;
        }else if(alertType == "abnormalattack"){
            //未知攻击
            $scope.typeList = attackTypeList;
        }else if(alertType == "accout" || alertType == "domain"||
            alertType == "ip"|| alertType == "url"|| alertType == ""){
            //目标审计
            $scope.typeList = auditTypeList;
        }else if(alertType == "email" ||alertType == "filetranfer" ||
            alertType == "http" ||alertType == "im" || 
            alertType == "netdisk" || alertType == "othersecurity"){
            //涉密信息，传输
            $scope.typeList = smTypeList;
        }else if(alertType == "资源文件"){      //注意：这里暂时不做
            $scope.isSourceFile = true;
            $scope.typeList = sourceFileTypeList;
        }

        $scope.vm.alertType = $scope.typeList[0];
        $scope.vm.filePriority = $scope.filePriorityList[0];

        $scope.item = {
            alertId:alertId,                //告警id
            alertType:alertType,               //告警类型
            alertJudge:vm.alertType.name,   //告警判断
            alertOpinion:"",                //处置意见
            alertTime:""                 //告警时间
        };
        if($scope.isSourceFile){
            $scope.item.filePriority = vm.filePriority.name;
        }
        $scope.okClick = function(){

            // console.log("alertType : " + vm.alertType );
            // console.log("filePriority : " + vm.filePriority);
            //表单验证
            // if(!checkFormValid($scope.item.alertId)) return;
            // if(!checkFormValid($scope.item.alertJudge)) return;
            if(!checkFormValid($scope.item.alertOpinion)) return;
            $scope.item.alertTime = new Date();
            $scope.item.alertJudge = vm.alertType.name;

            mainFactory.alertDeal($scope.item).then(dealResult,dealFault);
            $uibModalInstance.close();
        };
        $scope.cancelClick = function(){
            $uibModalInstance.close();
        };
        function dealResult(result){
            console.log("dealResult : " + result);
            if(result.alertId == $scope.item.alertId){
                // console.log("处理成功！");
                popData.flush(result);
                var data = {
                    title:"告警处置",
                    message:"告警处置成功 ！",
                    isCancelBtn:false,
                    do:function () {
                        popData.flush(result);
                        // console.log("刷新 告警数据列表 ！！！")
                    }
                };
                utils.popWin($uibModal,"tpl/common/alertPop.html","alertPopCtrl",data);
            }
        }
        function dealFault(fault){
            console.log("dealFault : " + fault);
        }

        function checkFormValid(str){
            var bool = true;
            if(!str || str == "" || str == " "){
                bool = false;
            }
            return bool;
        }
    }
})();
