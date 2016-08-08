app.directive('videoDirective', function () {
    return {
        restrict: 'E',
        scope: {
            clip: "=",
            loading: '=',
            cliplist: "=",
            setclip: "&",
            src: '=src'         },
        templateUrl: "./directives/templates/videoplayer.html",
        link: function ($scope, elem, attrs) {
            var video = elem.find('video')[0];
            video.controls = false;

            var playpause =  elem.find('#playpause');
            var mute =  elem.find('#mute');
            var progress =  elem.find('#progress');
            var progressBar =  elem.find('#progress-bar');
            var fullscreen =  elem.find('#fs');
            var time = elem.find('#time');

            var updatePlayer = function () {
                $scope.cliplist.forEach (
                    function (x, idx) {
                        var hasNoMarker = elem.find('#'+x.uid).length === 0;
                        if (idx !== 0 && hasNoMarker) {
                            var marker = document.createElement('span');
                            var markerContent = document.createElement("span");
                            marker.className = "marker";
                            markerContent.className = "markerContent";
                            markerContent.innerHTML = x.name;
                            marker.style.left = Math.floor((Number($scope.cliplist[idx].start) / video.duration) * 100) + '%';
                            marker.id = $scope.cliplist[idx].uid;
                            marker.onclick = function () {
                                $scope.setclip({idx: idx});
                                $scope.$apply();
                                video.play();
                            };
                            marker.appendChild(markerContent);
                            elem.find('.progress')[0].appendChild(marker);
                        }
                    }
                )
            };

            elem.one(' keypress', function(e){
                $scope.$apply(function () {
                    var index;
                    $scope.cliplist.filter(function (x, idx) { if ( x.uid === $scope.clip.uid) { index = idx; } });
                    if (index !== 0 && e.keyCode === 37){$scope.setclip({idx: index-1});}
                    if (index !== ($scope.cliplist.length -1) && e.keyCode === 39) { $scope.setclip({idx: index+1}); }
                    if (e.keyCode === 32 && (video.paused || video.ended)) {console.log('play'); video.play()}
                    else { video.pause(); }
                });
            });
            video.ontimeupdate =function () {
                if (!progress[0].getAttribute('max')) progress[0].setAttribute('max', video.duration);
                progress[0].value = video.currentTime;
                time.html(Math.floor(video.currentTime).toString());
                progressBar[0].style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
            };
            video.onloadedmetadata = function () {
                time.html(video.duration.toString());
                progress[0].setAttribute('max', video.duration);

            };
            video.onpause = function (e) {
                if ($scope.clip.end === Math.floor(video.currentTime).toString()) {
                    var nextVideo;
                    for (var i=0; i < $scope.cliplist.length; i++) {
                        if ($scope.clip.uid === $scope.cliplist[i].uid) {
                            nextVideo = i+1;
                        }
                    }
                    $scope.loading = true;
                    $scope.$apply();
                    setTimeout(function () {
                        if(nextVideo) {
                            $scope.loading = false;
                            $scope.setclip({idx: nextVideo});
                            $scope.$apply();
                        }
                    }, 3000)
                }
            };
            playpause.bind('click', function () {
                if (video.paused || video.ended) video.play();
                else video.pause();
            });
            mute.bind('click', function () {
                if (!video.muted) video.muted = true;
                else video.muted = false;
            });
            progress.bind('click', function (e) {
                var progElem = progress[0];
                var pos = (e.pageX  - (progElem.offsetLeft + progElem.offsetParent.offsetLeft )) / progElem.offsetWidth;
                video.currentTime = pos * video.duration;
            });
            $scope.$watch('cliplist.length', function (a, b) {
                console.log($scope.cliplist);
                if($scope.clip.uid === $scope.cliplist[0].uid && $scope.cliplist.length > 1) {
                    updatePlayer();
                }
            });
            $scope.$watch('clip', function (newValue, oldValue) {
               console.log(newValue, oldValue);

                if (newValue) {
                    if (newValue.uid === $scope.cliplist[0].uid && $scope.cliplist.length > 1) {
                        elem.find('.marker').each(function(x){
                            this.style.display = 'block';
                        });
                    }
                    if (newValue.uid && elem.find('#'+newValue.uid).length > 0) {
                        var marker = elem.find('#'+newValue.uid)[0];
                        marker.style.left = Math.floor((Number(newValue.start) / video.duration) * 100) + '%';
                    }
                    if(newValue.uid !== $scope.cliplist[0].uid) {
                        elem.find('.marker').each(function(x){
                            this.style.display = 'none';
                        });
                    }
                }
            });
            $scope.$watch('src', function(newValue, oldValue) {
                if (newValue) {
                    video.load();

                    elem.find('video')[0].onended = function(e) { console.log(e);}
                }
            });
        }
    }
});