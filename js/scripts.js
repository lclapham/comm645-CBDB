document.addEventListener("deviceready", onDeviceReady(), false);
function onDeviceReady(e) {
    console.log("Device Ready");

    ////////////////// Setup Variables
    const $elBtnLogIn = $("#loginBtn");
    console.log($elBtnLogIn)


    /////////////////// Setup Listing Events
    // User Login Form Event
    $('#myLoginForm').submit(function (e) {
        mainLogin(e);
    });

    // User Signup FORM Listner
    $('#mySignUpForm').submit(function (e) {
        fnSignUp(e);
    });

    // User Logout Listner
    $('#uLogoutBtn').click(function () {
        uLogout();
    })

    //////////////////////// Functions mainLogin, Signup, Logout
    function mainLogin(e) {
        console.log(e);
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
    function fnSignUp(e) {
        e.preventDefault();
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
        } 
    }
};



// Simple return to last page -->
function goBack() {
    window.history.back();
}


// // Git rid of this later. Simple redirect for login page testing
// function tempLogin() {
//     document.location.href = "#pgHome";
// }


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
