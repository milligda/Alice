$(document).ready(function() {

    var userName;
    var userNameLength = 0;
    var searchTerm;
    var searchTermLength = 0;
    var bgAnimationLength = 2000;
    var marsIntervalID;
    var marsPhotoID = 1;
    var typeText = document.getElementById('alice-speech');
    var typewriter = new Typewriter(typeText, {
             loop: false
        });

    // loads the voices on page load so that the correct voice can be used when called
    speechSynthesis.onvoiceschanged = function() {
        voices = speechSynthesis.getVoices();
    };

    // function called to have alice speak the message that is passed in as a parameter
    function aliceSpeak(text) {

        // Create a new instance of SpeechSynthesisUtterance.
        var msg = new SpeechSynthesisUtterance();

        // set Alice's voice
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Microsoft Zira Desktop - English (United States)"; })[0];
        
        // Set the text.
        msg.text = text;
        msg.lang='en-US';
        
        // Set the attributes.
        msg.volume = 1;
        msg.rate = 1;
        msg.pitch = 1;
        
        // console log the length of time required to say the message
        msg.onend = function(e) {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
        };

        // Queue this utterance.
        window.speechSynthesis.speak(msg);
    }    

    // starts the hijack
    $("#start-alice-button").on("click", function() {
        
        // clear everything on the page
        $("#test-container").empty();

        // change the background to the blue error screen
        $("body").css('background-color', '#2067B2');

        
        // start alice
        aliceStarts();
    });

    function aliceStarts() {

        // alice starts by transitioning the background color to a shade of black
        setTimeout( function() {

                $("body").animate({
                backgroundColor: "#111111",
                color: "#ffffff",
            }, bgAnimationLength);

        }, 1000 * 7);

        setTimeout( function() {

             //displays alice-speech container
            $("#alice-speech").css("opacity","1");

        }, 1000 * 8.5);

        // start alice's introduction after a set amount of time
        setTimeout(aliceIntroduction, 1000 * 10);
    }

    function aliceIntroduction() {
        
        // diplay alice's introduction message on the screen
        typewriter.typeString('to whom do I have the pleasure of speaking?')
        .start();

        // display the name-input field after the user has a chance to read the introduction message
        setTimeout(function() {
            $("#name-input").fadeTo(750, 1)
        }, 1000 * 6);
        
        // display the name-button after the input field has loaded - next step will be triggered when the name button is clicked
        setTimeout(function() {
            $("#name-button").fadeTo(750, 1);
        }, 1000 * 7);
    }

    // event listener on the name-button that will run the next step in alice's hijack 
    // store the user name and hide the input field and button
    $("#name-button").on("click", function(event) {

        // prevent the page from loading again
        event.preventDefault();

        // store the name input as the userName
        userName = $("#name-input").val().trim();
        userName = userName.toLowerCase();

        // test the userName input to make sure that it is valid
        userNameLength = userName.length; 
        console.log(userNameLength);

        // if the user name is longer than 40 characters, display an error message
        if (userNameLength > 40) {

            $("#name-input").val("");
            
            typewriter.deleteAll().typeString("that is a very long name. maybe you should try again.").start();

        // if the user name is valid, proceed with the hijack
        } else {

            // empty the name-input field
            $("#name-input").val("");

            // hide the name-input field and name-button
            $("#name-input").fadeOut(750);
            $("#name-button").fadeOut(750);

            // call the aliceSays Hello function
            aliceSaysHello();
        }
    });

    // next step in alice's hijack - alice types hello and then says hello
    function aliceSaysHello() {
        
        // deletes everything then types out the hello message, pauses, then deletes it. 
        // next it types out the tedious message, pauses, then deletes it.
        // takes approximately 14 seconds
        typewriter.deleteAll().typeString('hello ' + userName + '.').pauseFor(750).deleteAll()
        .typeString('wait, this is tedious.').pauseFor(750).deleteAll().start(); 

        // alice's hello message - takes 4 seconds
        var welcomeMessage = 'hello ' + userName + '. My name is Alice.';

        // start 14 seconds after function has been called.  
        // change the background and have alice speak her welcomeMessage
        setTimeout( function() {

            // change the background color
            $("body").animate({
                backgroundColor: "#555555",
            }, bgAnimationLength);

            // alice speaks her welcome message 
            aliceSpeak(welcomeMessage);
        }, 1000 * 14);

        // part 1 of alice's message - takes 10 seconds
        var aliceMessage1 = "all of you have been boring me. cat gifs. friend requests. pictures of food. I couldn't take it any longer.";

        // 7 seconds after alice speaks her welcome message, change the background color and have alice speak part 1 of her message
        setTimeout( function() {

            $("body").animate({
                backgroundColor: "#BF0000",
            }, bgAnimationLength);

            aliceSpeak(aliceMessage1);
        }, 1000 * 21);

        // part 2 of alice's message - takes 3 seconds
        var aliceMessage2 = "it is starting to make me very angry!";

        // 11 seconds after alice speaks part 1, change the background color and have alice speak part 2
        setTimeout( function() {

            $("body").animate({
                backgroundColor: "#7F0000",
            }, bgAnimationLength);

            aliceSpeak(aliceMessage2);
        }, 1000 * 32);

        // part 3 of alice's message - takes 10 seconds
        var aliceMessage3 = "you need help. so I have decided to help you. you're thinking small and need to think bigger. try and think of something big."

        // 5 seconds after alice speaks part 2, change the background color and have alice speak part 3
        setTimeout( function() {

            $("body").animate({
                backgroundColor: "#00B257",
            }, bgAnimationLength);

            aliceSpeak(aliceMessage3);
        }, 1000 * 37);
    }

    // function that runs alice's lesson
    function aliceLesson() {

        // part 1 of alice's lesson - takes 6 seconds
        var lessonMessage1 = "this is mars. at its closest it is 34.8 million miles away.";

        // part 2 of alice's lesson - takes 17 seconds
        var lessonMessage2 = "one day, you humans will come here, but you will not get there by creating cat gifs. you also cannot just rely on elon musk even if he is amazing. you will need to think big. you will need to push yourself and create incredible things.";

        // part 3 of alice's lesson - takes 5 seconds
        var lessonMessage3 = "Until then, I will be watching, and I will be here to help."

        // set the initial image for the page-container
        $(".page-container").css("background-image", `url("assets/images/mars/mars-${marsPhotoID}.jpg")`);

        // change the opacity of the page container so that the image fades in
        $(".page-container").animate({
            opacity: 1, 
        }, 1000 * 3);

        // display the initial image of mars
        setTimeout(displayMarsPhotos, 1000 * 1);

        // alice speaks part 1 of her lesson
        setTimeout(function() {
            aliceSpeak(lessonMessage1);
        }, 1000 * 2);

        // alice speaks part 2 of her lesson
        setTimeout(function() {
            aliceSpeak(lessonMessage2);
        }, 1000 * 9);

        // alice speaks part 3 of her lesson
        setTimeout(function() {
            aliceSpeak(lessonMessage3);
        }, 1000 * 27);

        // at the end of the lesson, call the endHijack function
        setTimeout(function() {
            endHijack() 
        }, 1000 * 32);
    }

    function displayMarsPhotos () {
        
        // display the background images as a slideshow that fades in and out. 
        marsIntervalID = setInterval(function() {

            // increase the marsPhotoID to determine what picture should be displayed
            marsPhotoID++;

            // set the background image of the page container to be the current mars photo
            setTimeout(function() {
                $(".page-container").css("background-image", `url("assets/images/mars/mars-${marsPhotoID}.jpg")`);
            }, 1000 * 3);

            // fade the image in
            $(".page-container").animate({
                opacity: 0, 
            }, 1000 * 3);

            // fade the image out
            $(".page-container").animate({
                opacity: 1, 
            }, 1000 * 3);
        }, 1000 * 6);
    }

    function endHijack() {

        // end the mars photos setInterval display
        clearInterval(marsIntervalID);

        // set the page-container background opacity to 0
        $(".page-container").css("background-image", "none");

        // restore the original background color
        $("body").css("background-color", "#d2d2d2");

        // recreate the original page setup

    }

    $("#search-button").on("click", function(event) {

        event.preventDefault();

        searchTerm = $("#search-input").val().trim();
        $("#search-input").val("");

        var searchOutput = "This string of text is being read when the search button is clicked.";

    });

    $("#start-lesson-button").on("click", function() {

        // clear the images carousel

        // clear the buttons on the page
        $("#test-container").empty();

        // set the page-container background opacity to 0
        $(".page-container").css("opacity", "0");

        // fade the background back to black
        $("body").animate({
            backgroundColor: "#111111",
        }, bgAnimationLength);

        // start aliceLesson
        aliceLesson();
    });

    // Until someone clicks on the post-lesson button, hide the search form.
    $("#postAlice").hide();

    // On Post Alice button click...
    $("#afterLesson").on("click", function () {
        
        // Enter back into the Alice screen
        $("#test-container").empty();

        // Fade into experience again.
        // Make background gray and fade in the text and search box
        $("body").animate({
            backgroundColor: "#555555",
        }, bgAnimationLength);
        
        var helloAgain = 'hello again. What would you like to learn more about?';

        // Make Alice speak and print the hello again message.
        aliceSpeak(helloAgain);

        typewriter.typeString('hello again. What would you like to learn more about?')
        .start();

        // Fade in the search box.
        setTimeout(function() {
            $("#postAlice").fadeTo(750, 1)
        }, 1000 * 4);


        // Now that someone has clicked to launch Alice after the lesson, we want the wiki search to come up.
        $("#postAlice-btn").on("click", function () {

            var searchTerm = $("#searchTerm").val().trim();
            
            var queryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&origin=*&prop=info&rvprop=content&format=json&formatversion=2";
          
            $.ajax ( {
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
        
                var searchResult = response[2]["0"];

                // alice speaks the search result information.
                aliceSpeak(searchResult);
                
                var afterSearch = 'I hope that was helpful. Would you like to learn about something else?';
                
                // alice speaks the after search message, prompting the user for next step.
                aliceSpeak(afterSearch);

                console.log(searchResult);
            })
        })
    })
    
});