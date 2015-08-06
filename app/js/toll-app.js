var tollCandidatesApp = angular.module('candidatesApp', ['ngRoute', 'candidateControllers']);

tollCandidatesApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/candidates', {
		templateUrl: 'templates/candidates/list.html',
		controller: 'candidateListCtrl'
	}).
	when('/candidates/:jobId', {
		templateUrl: 'templates/candidates/detail.html',
		controller: 'candidateDetailCtrl'
	}).
	otherwise('/candidates', {
		redirectTo: '/candidates'
	});
}])
.factory('candidateListService', ['$http', '$q', function($http, $q){
	var self = this;
	self.candidateList = [];
	
	// var getCandidate = function(id){
	// 	var candidates = $filter('$filter')(candidateList, {jobId : id});
	// 	return candidates && candidates.length ? candidates[0] : null;
	// }
	
	var getCandidates = function(){
		var deferred = $q.defer();
		if (self.candidateList == null || self.candidateList.length == 0)
			$http.get('candidates.json').then(function(data){
				self.candidateList = data;
				deferred.resolve(self.candidateList);
			});
		else{
			deferred.resolve(self.candidateList);
		}
		return deferred.promise;	
	}
	return{
		getCandidates: getCandidates
		//getCandidate: getCandidate
	}
}]);