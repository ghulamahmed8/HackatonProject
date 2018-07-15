$(document).ready(function () {
    $(".sign-in-button").click(function () {
        $("#sign-up").css("display", "none")
        $("#sign-in").css("display", "block")
    });

    $(".sign-up-button").click(function () {
        $("#sign-in").css("display", "none")
        $("#sign-up").css("display", "block")
    });
    


});




window.onload = function () {
    var userEmail = document.getElementById('exampleInputEmail1');
    var userPass = document.getElementById('exampleInputPassword1');
    var signUp = document.getElementById('signup-btn');
    var signIn = document.getElementById('login-btn');

    var userEmailL = document.getElementById('exampleInputEmail');
    var userPassL = document.getElementById('exampleInputPassword');

    signUp.addEventListener('click', e => {
        const email = userEmail.value;
        const pass = userPass.value;
        e.preventDefault();
        const auth = firebase.auth();

        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(function () {
                alert("Account created Successfully");
            })

            .catch(function (error) {
                console.log(error);
            });

    });



    signIn.addEventListener('click', e => {
        e.preventDefault();
        const emailL = userEmailL.value;
        const passL = userPassL.value;
        const auth = firebase.auth();


        firebase.auth().signInWithEmailAndPassword(emailL, passL)
            .then(function () {
                window.open('home.html', '_self');
                alert("LOGGED IN SUCCESSFULLY");
            })

            .catch(function (error) {
                console.log(error);
            });

    });

}

