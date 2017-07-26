var myApp = angular.module('myApp', []);


myApp.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        // body窗口的滚动加载--需要Jquery
        $(window).scroll(function () {
            //滚动条距离顶部的距离
            var scrollTop = $(window).scrollTop();
            //滚动条的高度
            var scrollHeight = $(document).height();
            //窗口的高度
            var windowHeight = $(window).height();
            if (scrollTop + windowHeight >= scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});



myApp.controller('AppCtrl', ['$scope', '$http', '$location',function($scope, $http,$location) {

    $scope.currentPage = 0;
    // 总页数
    $scope.totalPages = 100;
    // 防止重复加载
    $scope.busy = false;
    $scope.num = 20;
    // 存放数据
    $scope.issues = [];
    // 请求数据方法
    $scope.loadMore = function() {
        console.log('come to loadMore');
        if ($scope.currentPage < $scope.totalPages) {
            $scope.currentPage++;
            if ($scope.busy) {
                return false;
            }
            $scope.busy = true;
            // 请求后台服务器
            $http.get('./larvaAPIs/getIssues/' + ($scope.currentPage-1)*$scope.num + '/' + $scope.num)
                .success(function(data) {
                    console.log('data = ' + JSON.stringify(data));
                    $scope.busy = false;
                    $scope.issues = $scope.issues.concat(data);
                    $scope.issue = "";



                });
        }
    };
    // 默认第一次加载数据
    $scope.loadMore();






   $scope.jumpToUrl = function(path, issueId) {
       var id = issueId;
       console.log('path = ' + path);

       // $location.path(path);

       document.location.href = path+"?ID="+id;
       var curUrl = $location.absUrl(); //用来显示url全路径
       console.log('curUrl = ' + curUrl);
    };


/*function MyCtrl($scope, $location) {
        $scope.jumpToUrl = function(path) {
            // $location.path(path);
            // var curUrl = $location.absUrl(); //用来显示url全路径
            // console.log('curUrl = ' + curUrl);
            $location.href = "#/detail";
        };

    }*/

/*$scope.addContact = function () {
    console.log($scope.contact);
    $http.post('/contactlist', $scope.contact).success(function (response) {
        console.log(response);
        refresn();
        $.smkAlert({ text: "success insert", type:'success', position:'bottom-right'});
    });
};

$scope.remove =  function(id) {
    $.smkConfirm({
        text:'want delete?',
        accept:'yes',
        cancel:'no'
    },function(res) {
        if(res) {
            console.log(id);
            $http.delete('/logs/' + id).success(function (response) {
                refresn();
            });
        }
    });
};

$scope.edit = function (id) {
    console.log(id);
    $http.get('/logs/' + id).success(function (response) {
        $scope.log = response;
    });
};

$scope.update = function () {
    console.log($scope.contact._id);
    $http.put('/contactlist/'+ $scope.contact._id, $scope.contact).success(function (response) {
       refresn();
        $.smkAlert({ text: "success Update", type:'warning', position:'bottom-right'});
    });
};*/

$scope.deselect = function () {
    $scope.contact = "";
};


}]);


/*myApp.config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/detail', {
 templateUrl: '/detail.html',
 controller: 'DetailCtrl'
 });
 }]);*/ 
