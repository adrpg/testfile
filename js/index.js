 // Check if user is logged in
 const isLoggedIn = localStorage.getItem("isLoggedIn");

 // Sign In button click handler
 document.getElementById("signInBtn").addEventListener("click", function () {
     if (!isLoggedIn || isLoggedIn !== "true") {
         window.open('signIn.html', '_blank'); // Open sign-in page in new tab
     }
 });

 // Menu button click handler
 document.getElementById("menuLink").addEventListener("click", function (event) {
     if (!isLoggedIn || isLoggedIn !== "true") {
         event.preventDefault();
         window.open('signIn.html', '_blank'); // Redirect to sign-in page if not logged in
     } else {
         window.location.href = 'menu.html'; // If logged in, allow access to menu
     }
 });

 // Sign Up button click handler
 document.getElementById("signUpBtn").addEventListener("click", function () {
     window.open('signUUp.html', '_blank'); // Open sign-up page in new tab
 });