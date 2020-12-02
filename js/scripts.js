window.addEventListener('DOMContentLoaded', function (event){
    console.log("Hello World");
});


// Simple return to last page -->
function goBack() {
    window.history.back();
}


// Git rid of this later. Simple redirect for login page testing
function tempLogin() {
    document.location.href="#pgHome"; 
}


const myCar = {
    color:"red",
    topSpeed:300,
    model:"mustang",
    company:"ford",
    price:"50000",
    turnOn: function() {console.log("started")},
    drive: function() {console.log("You are driving")},
    works(){console.log("This works")}
};

var test1 = ["one", "two", "three"]
var keyStore = [];
addEventListener("keypress", (e) => {
    console.log(e.key);
    keyStore.push(e.key);
    keyStore.forEach(element => {
        console.log(element);
        
    });
});
