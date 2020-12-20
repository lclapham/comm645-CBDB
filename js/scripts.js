document.addEventListener("deviceready", onDeviceReady(), false);
function onDeviceReady(event) {

    console.log("Device Ready");

    ////////////////// Setup Variables
    const $elBtnLogIn = $("#loginBtn");
    console.log($elBtnLogIn);

    // Save form DB
    let myDB = new PouchDB("myComics");

    // Save form Variables
    const $elmSaveComic = $('#cbSaveFrm');

    /////////////////// Setup Listing Events
    // User Login Form Event
    $('#myLoginForm').submit(function (event) {
        mainLogin(event);
    });

    // User Signup FORM Listner
    $('#mySignUpForm').submit(function (event) {
        fnSignUp(event);
    });

    // User Logout Listner
    $('#uLogoutBtn').click(function () {
        uLogout();
    })

    // CB Save Form Listner
    $elmSaveComic.submit(function (event) {
        event.preventDefault(event);
        //Use these variables to check if user filled out form.
        let $cbTitleVal = $('#cbTitle').val(),
            $cbVolVal = $('#cbVol').val(),
            $cbYearVal = $('#cbYear').val(),
            $cbPublisherVal = $('#cbPublisher').val(),
            $cbNotesVal = $("#cbNotes").val();

        if ($cbTitleVal == "") {
            window.alert("You must fill in Title to proceed");
        } else if ($cbVolVal || $cbYearVal || $cbPublisherVal || $cbNotesVal === "") {
            let confimrationChk = window.confirm("You are missing key fields are you sure you want to save?")
            if (confimrationChk < 1) {
            } else {
                fnSaveComic(event);
            }
        } else {
            fnSaveComic(event);
        }
    });

    //////////////////////// Functions mainLogin, Signup, Logout
    function mainLogin(event) {
        console.log(event);
        e.preventDefault();
        console.log("mainLogin(event) is running");

        let $elUserEmail = $("#inLoginEmail"),
            $elUserLoginPw = $("#inUserPwLogin"),
            $tmpValUserLoginEmail = $elUserEmail.val().toUpperCase(),
            $tmpValUserLoginPW = $elUserLoginPw.val();

        // Check to see if user has signed up
        if (localStorage.getItem('dataKey') == null) {
            window.alert("Please Sign Up");

        } else {
            let retrievedData = localStorage.getItem('dataKey');
            let normalizedData = JSON.parse(retrievedData);

            if ($tmpValUserLoginEmail === normalizedData['uEmail'] & ($tmpValUserLoginPW === normalizedData['uPassword'])) {
                console.log("you should be at the home screen")
                $(":mobile-pagecontainer").pagecontainer("change", "#pgHome");
            } else {
                window.alert('Login is incorrect');
            }
        }
    };

    // Need to add a validation so the user must fill in all fields    
    function fnSignUp(event) {
        event.preventDefault(event);
        let dataStore = {
            fName: $('#fName').val(),
            lName: $('#lName').val(),
            uEmail: $('#uEmail').val().toUpperCase(),
            uName: $('#uName').val(),
            uPassword: $('#uPassword').val()  // need to create a hash function and a check to make sure both pw's are the same.

        }
        // set local Storage with user signup details
        localStorage.setItem('dataKey', JSON.stringify(dataStore));

        $(":mobile-pagecontainer").pagecontainer("change", "#pgUserLogin");
    };

    // Super Simple Logout
    function uLogout() {
        let result = window.confirm("Are you sure you want to logout?");
        if (result = true) {
            $(":mobile-pagecontainer").pagecontainer("change", "#pgWelcome");

            // Reset the forms
            $('#myLoginForm')[0].reset();
            $('#mySignUpForm')[0].reset();
        }
    }

    // Comic book Save form database prep function
    function fnPrepComic() {
        console.log("fnPrepComic() is running");

        let $cbTitleVal = $('#cbTitle').val(),
            $cbVolVal = $('#cbVol').val(),
            $cbYearVal = $('#cbYear').val(),
            $cbPublisherVal = $('#cbPublisher').val(),
            $cbNotesVal = $("#cbNotes").val();

        let tmpComic = {
            "_id": $cbTitleVal.replace(/\W/g, "") + $cbYearVal + $cbVolVal,
            "title": $cbTitleVal,
            "number": $cbVolVal,
            "year": $cbYearVal,
            "publisher": $cbPublisherVal,
            "notes": $cbNotesVal
        };

        return tmpComic;
    }

    // Comic book Save function to store configured data
    function fnSaveComic(event) {
        event.preventDefault(event);
        console.log('fnSaveComic(event) is running');
        let aComic = fnPrepComic();
        console.log(aComic);

        // Function to put the comic book configured data into PouchDB
        myDB.put(aComic, function (failure, success) {
            if (failure) {
                console.log("Error: " + failure.message);
                window.alert("Comic book already Saved");
            } else {
                window.alert("One Comic Saved!")
                console.log("comic Saved!" + success.ok);
                $elmSaveComic[0].reset();
            }
        });

    };
};




// Simple return to last page -->
function goBack() {
    window.history.back();
}

// Just Playing with these.
// const myCar = {
//     color: "red",
//     topSpeed: 300,
//     model: "mustang",
//     company: "ford",
//     price: "50000",
//     turnOn: function () { console.log("started") },
//     drive: function () { console.log("You are driving") },
//     works() { console.log("This works") }
// };

// var test1 = ["one", "two", "three"]
// var keyStore = [];
// addEventListener("keypress", (e) => {
//     console.log(e.key);
//     keyStore.push(e.key);
//     keyStore.forEach(element => {
//         console.log(element);

//     });
// });
