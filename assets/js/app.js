// JavaScript Document
'use strict';

/*
    In this step we move the two global variables we created to hold the application
    name and application tag line in to an object. Through doing this we are beginning
    to capture site details inside one holder that we will be able to access any where
    in our code.

    The way we will access the information is through something we refer to as dot-notation.
    Dot-notation is very similar to using forward slashes in our file systems on our computers.
*/
var appData = {
    title: "inside out - js",
    tagLine: "continuously falling forward into the light..."
};

window.addEventListener('load', initializeApplication);

function initializeApplication() {

    // We update the global variable applicationTitle to the object appData.title value.
    document.title = appData.title;

    /*
        We move the statments to add the styles backgroundColor, textAlign and fontSize
        into the styles document as a css rule-set.
        https://www.w3schools.com/css/css_syntax.asp
    */

    var elWrapper = document.createElement('div');
    elWrapper.id = 'applicationWrapper';
    document.body.appendChild(elWrapper);

    var elHeader = document.createElement('header');
    elWrapper.appendChild(elHeader);

    var elHeaderTitle = document.createElement('h1');
    /*
        We moved the statment from the bottom of our function here to try to keep all
        relative statments together.
    */
    elHeaderTitle.className = 'animated bounceInDown';

    // We update the global variable applicationTitle to the object appData.title value.
    elHeaderTitle.innerHTML = appData.title;
    elHeader.appendChild(elHeaderTitle);

    var elHeaderTagLine = document.createElement('h2');

    // We update the global variable applicationTagLine to the object appData.tagLine value.
    elHeaderTagLine.textContent = appData.tagLine;
    elHeaderTagLine.style.fontSize = '.4em';
    /*
        We moved the statment from the bottom of our function here to try to keep all
        relative statments together.
    */
    elHeaderTagLine.className = 'animated bounceInLeft';
    elHeader.appendChild(elHeaderTagLine);

    var elMain = document.createElement('main');
    /*
        We moved the statment from the bottom of our function here to try to keep all
        relative statments together.
    */
    elMain.className = 'animated zoomIn';

    // We update our text content to read "Welcome to inside out"
    elMain.innerHTML = '<p>Welcome to inside out</p>';
    elWrapper.appendChild(elMain);

    var elFooter = document.createElement('footer');
    /*
        We moved the statment from the bottom of our function here to try to keep all
        relative statments together.
    */
    elFooter.className = 'animated bounceInRight';
    elFooter.innerHTML = '<h4>get excited about learning JavaScript...</h4>';
    elWrapper.appendChild(elFooter);
    
    /*
        We add a progress bar for placement and to access later as our application evolves. 
        It will be important as our application grows to let others know that something is 
        happening while they are waiting for the application to completely load and become 
        accessible.
    */
    elMain.innerHTML += '<div style="width: 40%; margin: auto; padding:10px; margin-bottom: 20px;"><div class="progress" style="height: 20px;"><div id="loaderProgressBar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div></div></div>';
    
    /*
        We added some code to transition us from our splash screen to our application
        user interface by using what is known as a timing event.

        Window setTimeout() Method which calls a function or evaluates an
        expression after a specified number of milliseconds. This allows us to call
        functionality or place periods of time between events.
        https://www.w3schools.com/jsref/met_win_settimeout.asp
    */
    //setTimeout(applicationUserInterface, 8000);
    
    displayPB();
    
}

/*
    We create a new function to create the header, side menu, main content area and footer
    of our application. For this step we use the innerHTML property to directly manipulate
    the DOM and inject our HTML without using the JavaScript methods to create the elements.

    By using bootstrap css we are able to create a user experience without spending much time
    in our css. To do this without bootstrap could take hours of development time.
*/
function applicationUserInterface() {

    /*
        In this statement we are adding the top navigation bar to our application. Although we
        will not do much at this time with the search and login button we will revisit this
        code later to add functionality that will provide the user with interactivity.
        Sometimes it is nice to place items you plan on completing at a later time to allow
        for visual reference.
    */
    document.body.innerHTML = '<nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0"> <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">inside out</a> <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"> <ul class="navbar-nav px-3"> <li class="nav-item text-nowrap"> <a class="nav-link" href="#">Sign In</a></li></ul> </nav>';

    /*
        In this statement we are adding the side navigation menu to our application. This will be
        our primary point of interactivity that the user will access different views in the main
        element through. Like the top navigation features will lay out some links and revisit this
        code later to add functionality that will provide the user with interactivity.

        The thing to pay attention to here is how we are calling the functions sideMenu() and formLogin(). As you will soon see the two functions are doing nothing more than returning HTML code, the same code we would include here; just like the nav, menu and footer. In doing this we are positioning ourselves to later add interactivity, and more importantly, the opportunity to reuse the functionality from anywhere in our application. Both the side menu and login form are pieces of logic that we will defiantly want to access other times than just now.
    */
    document.body.innerHTML += '<div class="container-fluid"> <div class="row"> <nav class="col-md-2 d-none d-md-block bg-light sidebar"> <div class="sidebar-sticky">' + sideMenu() + '</div></nav> <main id="main" role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">' + formLogin() + '</main> </div></div>';

    /*
        In this statement we are adding the footer to our application. We will be using this area to
        let the user know when there is activity happening with the application - background processes,
        updates and interactive actions that may require information the user that something is happening.
        Additionally we will use this are for additional branding and potentially to introduce some minor
        functionalities in the application. Like the top navigation and features will lay out some links
        and revisit this side menu we will revisit this code later to add functionality that will provide
        the user with interactivity.
    */
    document.body.innerHTML += '<nav class="navbar fixed-bottom navbar-dark bg-dark text-center"><a class="navbar-brand" href="#">inside out</a></nav>';

    /*
        In this statement we are attaching an event listener to the login form. Basically, we are asking
        the browser to watch the login form for when a user submits it (clicks the submit button). We are
        also telling the browser what we would like it to do when it is submitted by telling it to invoke
        the validateLogin() function when the event takes place and at that point our attention, and the
        browser's, moves to the validateLogin().
    */
    document.getElementById("loginFrm").addEventListener("submit", validateLogin);
    /*
        I place this time event method here for development purposes. You will find as you evolve as a
        developer that you are looking for ways to automate processes in functionality so you do not avoid
        using them. Functional testing, the act of completing end-to-end functionality (such as logging in)
        repeatedly is  paramount to writing quality code. In different phases of development I will prepopulate
        the login form with credentials and submit the form automatically to eliminate the need to type the
        credentials in and clicking the submit button. Not only will this save time, but it will also allow
        for focus on other things, such as web tools, to watch for error that potentially can leek in to our
        code during development.

        Every now and then I will uncomment this and let it complete the login for me every time the applications
        refreshes for now.
    */
    //setTimeout(validateLogin, 10);
}


/*
    We create a new function here to add the process of checking the email address and password when someone 
    submits the login form. To begin we just aim at getting the information from the form when it is submitted 
    and validating it for nothing more than if there is anything there or not. If either value is null or empty 
    we just return false to the browser, which in turn drops the whole process and stops executing the code. 
    If there is something there we execute a code block that creates enough content in our main element 
    (the primary display section of our application) to requier scrolling. We do this so that we are always testing 
    how our application handles and displays  information when that content exceeds the available viewport.
*/

function validateLogin() {
    
    /* 
        We create a variable named email and tell the browser to grab the value of what is inside the input 
        HTML element with the id email.
    */
    var email = document.getElementById("email").value;
    
    /* 
        We create a variable named password and tell the browser to grab the value of what is inside the 
        input HTML element with the id pwd.
    */
    var password = document.getElementById("pwd").value;
    
    // We take a look at the value for email and password to see if there is anything there...
    if (email !== '' && password !== '') {
        //if both variables are not blank do the following:
        
        /* 
            Write a title to the main application window and replace all HTML currently in it (the login form). 
            By using the innerHTML property combined with a single equals sign = we are telling the browser 
            to completely replace everything.
        */
        document.getElementById('main').innerHTML = '<h1>We are in now</h1>';
        
        /*
            As mentioned earlier, we want to populate our main application with enough content to exercise the 
            functionality and usability of the application as we develop it. One way of doing this is to write 
            a loop that will fill the area with content without having to junk up your coding area with a bunch 
            of Lorem Ipsum.
        */
        for (var i = 0; i < 30; i++) {
            
            /* 
                One thing to note here: when we use the innHTML property here we use += to append the content to 
                the element rather than replace the content.
            */
            document.getElementById('main').innerHTML += '<h3>The Counter: ' + i + '</h3>';
            document.getElementById('main').innerHTML += '<p>We love the number: ' + i + '! The number ' + i + ' makes me feel like I am on the side of a mountain in the #' + i + ' place on earth.</>';
        }
        
    } else {
        
        //if one of the variables is blank we'll just through and alert dialog for now.
        alert('bad');
        
    }
    
    // by simply returning false to the browser we are telling it to stop what it is doing
    return false;
}

/*
    As mentioned earlier we created this function to return html content for the side menu of our application. Initially 
    we just return static HTML, but moving forward we will slowly make this function dynamically populate the menu based 
    on conditions. Ultimately we will end up with a very important code block that will manage a user’s access to the 
    resources we make available through the application.
*/
function sideMenu() {
    return '<ul class="nav flex-column"> <li class="nav-item"> <a class="nav-link active" href="#"> <span data-feather="home"></span> Dashboard <span class="sr-only">(current)</span> </a> </li><li class="nav-item"> <a class="nav-link" href="#"> <span data-feather="file"></span> Orders </a> </li><li class="nav-item"> <a class="nav-link" href="#"> <span data-feather="shopping-cart"></span> Products </a> </li><li class="nav-item"> <a class="nav-link" href="#"> <span data-feather="users"></span> Customers </a> </li><li class="nav-item"> <a class="nav-link" href="#"> <span data-feather="bar-chart-2"></span> Reports </a> </li><li class="nav-item"> <a class="nav-link" href="#"> <span data-feather="layers"></span> Integrations </a> </li></ul><h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"> <span>Saved reports</span> <a class="d-flex align-items-center text-muted" href="#"> <span data-feather="plus-circle"></span> </a> </h6> <ul class="nav flex-column mb-2"> <li class="nav-item"> <a class="nav-link" href="#"> <span data-feather="file-text"></span> Current month </a> </li><li class="nav-item"> <a class="nav-link" href="#"> <span data-feather="file-text"></span> Last quarter </a> </li><li class="nav-item"> <a class="nav-link" href="#"> <span data-feather="file-text"></span> Social engagement </a> </li><li class="nav-item"> <a class="nav-link" href="#"> <span data-feather="file-text"></span> Year-end sale </a> </li></ul>';
}

/*
    As mentioned earlier we created this function to return html content for the login form to our application. Initially 
    we just return static HTML, but moving forward we will slowly make this function dynamically populate the menu based 
    on conditions. Ultimately we will end up with a very important code block that will manage a user’s access to the 
    resources we make available through the application.
*/
function formLogin() {
    return '<form id="loginFrm" name="loginFrm" action="#"> <div class="form-group"> <label for="email">Email address:</label> <input type="email" class="form-control" id="email" value="me@there.com"> </div><div class="form-group"> <label for="pwd">Password:</label> <input type="password" class="form-control" id="pwd" value="dfdf"> </div><div class="form-check"> <label class="form-check-label"><input class="form-check-input" type="checkbox"> Remember me </label> </div><button id="loginBtn" type="submit" class="btn btn-primary">Submit</button></form>';
}

var timerCount = 0;

function displayPB(){
    
    if(timerCount < 100) {
        var x = (timerCount < 15)?'':(timerCount < 30)?timerCount+'%':(timerCount < 60)?'Loading '+timerCount+'%':'Loading Application '+timerCount+'%';
        document.getElementById("loaderProgressBar").innerHTML = x;
        document.getElementById('loaderProgressBar').setAttribute('aria-valuenow', timerCount);
        document.getElementById('loaderProgressBar').style.width = timerCount+'%    ';
        timerCount++;
        setTimeout(displayPB, 200);
    }else{
        timerCount = 0;
        applicationUserInterface();
        return false;
    }

}
