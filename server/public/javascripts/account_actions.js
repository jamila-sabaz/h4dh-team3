
function login() {
    var e = document.getElementById("email_l").value;
    var pw = document.getElementById("password_l").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        //user login
        if (this.readyState == 4 && this.status == 200 && this.response == 0) {
            window.location.href = '/index.html';
        // manager login
        } else if (this.readyState == 4 && this.status == 200 && this.response == 1) {
            window.location.href = '/index.html';
        } else if (this.readyState == 4 && this.status == 401) {
            alert('Login failed, email and password does not match.');
        } else if (this.readyState == 4 && this.status == 400) {
            alert('Login failed, email not found.');
        }
    };
    xhttp.open("POST", "/log-in", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ email: e, password: pw}));
}


function logout() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href = '/signup.html';
        }
    };
    xhttp.open("POST", "/log-out", true);
    xhttp.send();
}

function signup_u() {
    var e = document.getElementById("email_s").value;
    var pw = document.getElementById("password_s").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('You have successfully signed up!');
            window.location.href = '/index.html';
        } else if (this.readyState == 4 && this.status == 400) {
            alert('Please enter a valid email or password');
        } else if (this.readyState == 4 && this.status == 401) {
            alert('This email is taken. Please choose another one.');
        }
    };
    xhttp.open("POST", "/sign-up-user", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ password: pw, email: e}));
}

function signup_m() {
    var pw = document.getElementById("password_s").value;
    var e = document.getElementById("email_s").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('You have successfully signed up!');
            window.location.href = '/manager.html';
        } else if (this.readyState == 4 && this.status == 402) {
            alert('This username is taken. Please choose another one.');
        } else if (this.readyState == 4 && this.status == 400) {
            alert('Please enter a valid username or password');
        } else if (this.readyState == 4 && this.status == 401) {
            alert('This email is taken. Please choose another one.');
        }
    };
    xhttp.open("POST", "/sign-up-manag", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ password: pw, email: e}));
}

// function google_login(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

//     var id_token = googleUser.getAuthResponse().id_token;

//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', '/google-login');

//     xhr.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             if (this.response == 1) {
//                 window.location.href = '/user.html';
//             } else {
//                 window.location.href = '/manager.html';
//             }

//         } else if (this.readyState == 4 && this.status == 401) {
//             alert('Log-in failed. Please try again.');
//         } else if (this.status == 400) {
//             alert('Log-in failed. We could not find your account, please sign up first.');
//         }
//     };

//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify({'idtoken': id_token}));
// }

// function log_out_g() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         delete req.session.user;
//         delete req.session.userdata;
//         delete req.session.manager;
//         console.log('User signed out.');
//     });

// }

// function not_log_in_u() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 401) {
//             window.location.href = '/';
//             alert("You have not logged in.");
//         } else if (this.readyState == 4 && this.status == 400) {
//             window.location.href = '/';
//             alert("You are not authorized to view the current page.");
//         }
//     };
//     xhttp.open("GET", "/user", true);
//     xhttp.send();
// }

// function not_log_in_m() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 401) {
//             window.location.href = '/';
//             alert("You have not logged in.");
//         } else if (this.readyState == 4 && this.status == 400) {
//             window.location.href = '/';
//             alert("You are not authorized to view the current page.");
//         }
//     };
//     xhttp.open("GET", "/manager", true);
//     xhttp.send();
// }

// function load_info_u() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             let tasks = JSON.parse(this.response);
//             console.log(tasks);

//             let username = tasks[0].userName;
//             let email = tasks[0].email;
//             let no_avail_s = tasks[0].no_avail_from;
//             let no_avail_e = tasks[0].no_avail_to;
//             let tt = "";

//             for (var i = 0; i < tasks.length-1; i++) {
//                 tt = tt + tasks[i].type_name + ', ';
//             }
//             tt = tt + tasks[tasks.length-1].type_name;

//             document.getElementById('un').innerText = username;
//             document.getElementById('username_a').innerText = username;
//             document.getElementById('email_a').innerText = email;
//             if (no_avail_s !== null) {
//                 console.log(no_avail_s);
//                 document.getElementById('na-s').innerText = no_avail_s;
//                 document.getElementById('na-e').innerText = no_avail_e;
//             }
//             document.getElementById('task_types').innerText = tt;
//         }
//     };

//     xhttp.open("GET", "/load_info_u", true);
//     xhttp.send();
// }

// function load_info_m() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             let tasks = JSON.parse(this.response);
//             console.log(tasks);
//             let username = tasks[0].userName;
//             let email = tasks[0].email;
//             document.getElementById('username').innerText = username;
//             document.getElementById('username_a').innerText = username;
//             document.getElementById('email_a').innerText = email;
//         }
//     };
//     xhttp.open("GET", "/load_info_m", true);
//     xhttp.send();
// }

// function change_name() {
//     var xhttp = new XMLHttpRequest();
//     let name = document.getElementById("full_name_n").value;
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 201) {
//             alert("Your username has been changed!");
//             window.location.href = '/manager.html';
//         } else if (this.readyState == 4 && this.status == 500) {
//             alert("Your username cannot be changed. Please try with a different name?");
//         } else if (this.readyState == 4 && this.status == 200) {
//             alert("Your username has been changed!");
//             window.location.href = '/user.html';
//         }
//     };
//     xhttp.open("POST", "/change-name", true);
//     xhttp.setRequestHeader('Content-Type', 'application/json');
//     xhttp.send(JSON.stringify({'name': name}));
// }

// function change_email() {
//     var xhttp = new XMLHttpRequest();
//     let email = document.getElementById("email_n").value;
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 201) {
//             alert("Your email has been changed!");
//             window.location.href = '/manager.html';
//         } else if (this.readyState == 4 && this.status == 500) {
//             alert("Your email cannot be changed. Maybe try with a different name?");
//         } else if (this.readyState == 4 && this.status == 200) {
//             alert("Your email has been changed!");
//             window.location.href = '/user.html';
//         }
//     };
//     xhttp.open("POST", "/change-email", true);
//     xhttp.setRequestHeader('Content-Type', 'application/json');
//     xhttp.send(JSON.stringify({'email': email}));
// }