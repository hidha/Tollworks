var candidateControllers = angular.module('candidateControllers', [])

candidateControllers.controller('candidateListCtrl', ['$scope', '$http', 'candidateListService', function ($scope, $http, candidateListService) {
    candidateListService.getCandidates().then(function(response){
        $scope.candidates = response.data;
    });
}]);

candidateControllers.controller('candidateDetailCtrl', ['$scope', '$routeParams', '$filter', 'candidateListService',
    function($scope, $routeParams, $filter, candidateListService){
        candidateListService.getCandidates().then(function(response){
            var candidates = $filter('filter')(response.data, {jobId : $routeParams.jobId});
            $scope.candidate = candidates && candidates.length ? candidates[0] : null;
            
            var d = $scope.candidate.availableAfter.split("/");
            $scope.availableFrom = new Date(Number(d[2]), Number(d[1]) - 1, Number(d[0]));
            $scope.readyToSave = false;
            $scope.submitForm = function(){
                $scope.submitted = true;
                if($scope.detailForm.$valid){
                    $scope.readyToSave = true;
                }
            }
        });
}]);