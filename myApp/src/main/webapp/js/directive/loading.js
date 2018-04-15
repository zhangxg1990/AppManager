/**
 * Created by Administrator on 2017/4/21.
 */
/**
 * Created by Administrator on 2017/4/21.
 */
(function () {
    angular.module("monitorApp")
    //加载进度
        .directive('loading', ['$compile', function ($compile) {
            return {
                restric: "E",
                scope: {loadingFlag: "="},
                template: '<div class="la-main-mask" ><div class="la-ball-spin la-2x" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>',
                compile: function ($element, attr) {
                    return function loadingHandler(scope, element) {
                        scope.$watch("loadingFlag", function updateLoading(newValue) {
                            if (newValue)
                                $(element).css("display", "block");
                            else
                                $(element).css("display", "none");
                        });
                    };
                }
            };
        }])
})();
