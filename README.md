# koVideo

###Project Setup
make sure you have node and npm. Then run the following commands:
```npm install
npm start```

###Interactions on the page
* You can enter the time by just typing the seconds. (i.e. 6) --> is 6 secs
* You can update the clips in playlist panel

###Project Thoughts
* I first did research on working with media fragments and the video api.  
* I chose to use AngularJs for my javascript framework. 
* I created a directive in angular so that the element can be reusable in different places.
* I'm using foundations 6 to handle my responsive styles and also creating custom styles with SASS and compiling with gulp.
* I finished all of the requirements besides the filtering by tag names. You can add tag names but not filter at the moment. I'd just add a filter on the ng-repeat and filter by a tag search.
* I created my own custom timeline for the video so that I could add things like the marks and text saying which one it is.
* The data does presist but only through local storage. I'm not saving to a database or anything like that.
* I didn't validate the inputs on the form. I'd normally do that but I just wanted to get the project functional.

###Other Thoughts
* The marker for the timeline isn't responsive at the moment I will have to make a better solution to hand responsive changes.
* Very fun project really pushed my knowledge of the video API.
