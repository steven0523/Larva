var issueid = getIssueID()
console.log('issueid = ' + issueid);

var issueApp = angular.module('detail', []);
var issue={};

issueApp.controller('DetailCtrl', ['$scope', '$http',function($scope, $http) {
	
	$scope.ignore = function() {
		setIsIssue(false,$scope,$http, function( obj){
			window.location.href= './';
		});
	};
    console.log('come to routeProvider : ' + issueid);
	
	$http.get('./larvaAPIs/getIssueDetails/'+issueid).success(function (response) {
		issue = response;
		$scope.issueInfo = issue.description;
		var cell = new Cell(issue.description);
		var canvas = document.getElementById("canvas");
		cell.draw(canvas);
		
		//console.log(issue.isIssue)
		if(typeof(issue.isIssue)=="undefined" ){
			$scope.canIgnore = true;
		}else{
			$scope.canIgnore = false;
		}
    });
}]);


var loadLogs = function ($scope,$http){
	$http.get('./logs/'+issueid).then(function successCallback(response) {
		var logs = response.data;
		if(logs.length==0){
			$scope.canGetLog = true;
		}else{
			$scope.canGetLog = false;
		}
		
		$scope.logs = logs;
			
	}, function errorCallback(response) {
		console.log(response);
	
	});
}

var postedCount = 0;
var addLog = function (log,totalLogs, $scope, $http){
	$http.post('./logs/', log).then(function successCallback(response) {
		console.log("post ok:"+response);
		console.log("post ok:"+postedCount);
		postedCount++;
		if(postedCount==totalLogs-1){
			console.log("all saved");
			loadLogs($scope,$http);
		}

	}, function errorCallback(response) {
		console.log("post fail:"+response);

	});	
}

var setIsIssue = function (isIssue , $scope, $http, callback){
	var issueClone = {_id:issue._id};
	issueClone.isIssue = isIssue;
	$http.put('./issues/'+issue._id+'/'+isIssue, issueClone).then(function successCallback(response) {
		console.log("put ok:");
		callback(isIssue);
	}, function errorCallback(response) {
		console.log("put fail:");
		callback(response);
	});	
}



issueApp.controller('logCtrl', function($scope,$http) {
	$scope.logarea = false;

	loadLogs($scope,$http);
	
	
	$scope.analyze = function() {
		var domain = issue.domainName;
		var DC = issue.dataCenter;
		var OTAP = issue.environment;
		var path =  './nsrealm/'+domain+'/'+OTAP+'/'+DC;
		console.log(path);
		
		$http.get(path).then(function successCallback(response) {
			var logs = response.data;
			//add logs according to the query from NSrealsm.
			postedCount = 0;
			for(var i=0;i<logs.length;i++){
				var log = logs[i];
				log.issueid = issueid;
				log.uploaded = false;
				//15 mintues range of log 
				log.startTime = issue.checkTime- 15*60*1000;
				log.endTime = issue.checkTime;
				addLog(log,logs.length,$scope,$http);
			}

		}, function errorCallback(response) {
			
		});
	};

});
