app.controller('HomeController', function($scope, $http) {

    var localStorageObj = window.localStorage.getItem("clips");

    $scope.loading = false;
    $scope.editStart = "";
    $scope.editEnd = "";
    $scope.newClip = "";
    $scope.form = {
        name: "",
        src: "",
        start: "",
        end: "",
        tags: ""
    };

    $scope.uuid = function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };
    if(localStorageObj !== null){
        $scope.clips = JSON.parse(localStorageObj);
    }else{
        $scope.clips = [
            {name: "original clip", uid: $scope.uuid(), src: "http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4"}
        ];
    }
    $scope.currentClip = $scope.clips[0];
    $scope.formReset = function () {
        $scope.form = {
            name: "",
            src: "",
            start: "",
            end: "",
            tags: ""
        };
    };
    $scope.editclip = function (idx) {
        var srcString = $scope.clips[idx].src.split("#t=")[0];
        $scope.clips[idx].src = srcString+"#t="+$scope.clips[idx].start+","+$scope.clips[idx].end;
        $scope.selectClip(idx);
    };
    $scope.deleteClip = function (idx) {
        var clipLength = $scope.clips.length;
        $scope.clips.splice(idx, 1);
        window.localStorage.setItem("clips", JSON.stringify($scope.clips));
        if (idx !== (clipLength -1) && idx !== 0) { $scope.selectClip(idx); }
        if (idx === (clipLength-1)) { $scope.selectClip(idx-1); }
    };
    $scope.addClip = function (obj) {
        var srcString = $scope.currentClip.src.split("#t=")[0];
        obj.uid = $scope.uuid();
        obj.src = srcString+"#t="+obj.start+","+obj.end;
        $scope.clips.push(obj);
        $scope.formReset();
        window.localStorage.setItem("clips", JSON.stringify($scope.clips));
    };
    $scope.selectClip = function (idx) {
        $scope.currentClip = $scope.clips[idx];
    };

    $(document).foundation();
});
