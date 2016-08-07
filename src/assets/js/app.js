var app = angular.module('app', ["ui.router"]);

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider.
    state('home', {
        url: "/",
        controller: "HomeController",
        templateUrl: "views/home.html"
    })
}]);

app.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);