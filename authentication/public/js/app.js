$(document).ready(function () {
    var i;
    var userId;

    var signedin = false;
    
    var email = localStorage.getItem("email");
    var pass = localStorage.getItem("password")

    $("#login").on("click", function (event) {
        event.preventDefault();

        // get email value
        var email = $("#email").val().trim()

        // check login state
        if ($(this).data("state") === "login") {
            $.ajax({
                url: "/api/user/",
                type: "PUT",
                data: { email: email }
            }).then(function (data) {
                if (data.length > 0) {
                    signIn();
                } else {
                    signUp();
                }
            }).catch(function (err) {
                console.log(err);
            })
        } else if ($(this).data("state") === "password") {
            // get password value
            var pw = $("#password").val();

            // compare with database
            $.ajax({
                url: "/api/user/",
                type: "PUT",
                data: {
                    email: email,
                    password: pw
                }
            }).then(function (data) {
                // if password matches...
                if (data) {
                    // store user data in browser storage for auto signin
                    if($("#remember:checked").length > 0) {
                        localStorage.setItem("email", data[0].email)
                        localStorage.setItem("password", data[0].password)
                    }
                    // change signedin state
                    signedin = true;
                    // run signedIn function
                    signedIn(data[0]);
                } else {
                    // let user know the password is wrong
                    $("#password").attr("placeholder", "Wrong Password!")
                    $("#password").val("")
                    $("#password").focus();
                }
            }).catch(function (err) {
                // error handling
                console.log(err)
            });

        } else if ($(this).data("state") === "signup") {
            // get password values
            var pw = $("#password").val();
            var pwConfirm = $("#pwConfirm").val();
            var type = $("input[name=p-type]:checked").val();

            // validate passwords
            if (pw === pwConfirm && pw) {
                $.ajax({
                    url: "/api/user",
                    type: "POST",
                    data: {
                        email: email,
                        password: pw,
                        accountType: type
                    }
                }).then(function (data) {
                    // run signedIn function
                    signedIn(data);
                }).catch(function (err) {
                    // error handling
                    console.log(err);
                });
            } else {
                // if the password isn't confirmed, let the user know
                $("#pwConfirm").attr("placeholder", "Password doesn't match")
                $("#pwConfirm").val("")
                $("#pwConfirm").focus();
            }
        }
    })
});