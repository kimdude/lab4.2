"use strict";
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logOut");

if(registerForm) {
    registerForm.addEventListener("submit", register);
}

if(loginForm) {
    loginForm.addEventListener("submit", login);
}

if(logoutBtn) {
    showUser();
    logoutBtn.addEventListener("click", logout);
}


//Validating register-inputs and registering
async function register(e) {
    e.preventDefault();

    const userInput = document.getElementById("newUser").value;
    const passwordInput = document.getElementById("newPassword").value;
    const emailInput = document.getElementById("newEmail").value;
    const fNameInput = document.getElementById("newFname").value;
    const sNameInput = document.getElementById("newSname").value;
    const displayError = document.getElementById("errorSpan");
    const message = document.getElementById("message");

    //Skapar felmeddelanden
    const errorArr = [];

    if(emailInput === "") {
         errorArr.push("Ange epost.");
    } 

    if(userInput === "" || passwordInput === "") {
        errorArr.push("Ange användarnamn och lösenord.");
    } 

    if(userInput.length < 5) {
        errorArr.push("Användarnamnet måste vara minst 5 tecken.");
    }

    if(passwordInput.length < 8) {
        errorArr.push("Lösenordet måste vara minst 8 tecken.");
    }

    if(errorArr.length > 0) {
        const ulEl = document.createElement("ul");
        displayError.appendChild(ulEl);

        errorArr.forEach((err) => {
            const liEl = document.createElement("li");
            const nodeEl = document.createTextNode(err);
            liEl.appendChild(nodeEl);
            ulEl.appendChild(liEl);
    })

    } else {

        //Lägger till användare
        let newUser = {
            username: userInput,
            password: passwordInput,
            email: emailInput,
            firstname: fNameInput,
            surname: sNameInput
        }

        try {
            const result = await fetch("https://dt207g-moment4-1-4grw.onrender.com/api/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if(result.ok) {

                message.innerHTML = "<strong>Ditt konto har skapats! <a href='login.html'>Logga in!</a></strong>"

            } else {
                throw error;
            }

        } catch(error) {
            displayError.innerHTML = "<strong>Ange ett annat användarnamn.</strong>"
        }
    }

}

//Validating login-inputs and requesting login
async function login(e) {
    e.preventDefault();

    const userInput = document.getElementById("userName").value;
    const passwordInput = document.getElementById("password").value;
    const displayError = document.getElementById("errorMessage");

    if(userInput === "" || passwordInput === "") {
        displayError.innerHTML = "<strong>Ange användarnamn och lösenord</strong>";
    } else {

        //Logging in user
        let user = {
            username: userInput,
            password: passwordInput
        }

        try {
            const result = await fetch("https://dt207g-moment4-1-4grw.onrender.com/api/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if(result.ok) {
                const data = await result.json();

                //Saving token and sending to admin page
                localStorage.setItem("userToken", data.response.token);
                window.location.href = "index.html";

                showUser();

            } else {
                throw error;
            }

        } catch(error) {
            displayError.innerHTML = "<strong>Felaktigt användarnamn eller lösenord</strong>";
        }
    }

}

//Listing user info
async function showUser() {
    const currentToken = localStorage.getItem("userToken");
    const displayError = document.getElementById("errorMessage");

    //Fetching user info
    try {
        const result = await fetch("https://dt207g-moment4-1-4grw.onrender.com/api/protected", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + currentToken
            },
        });

        if(result.ok) {
            const data = await result.json();
            const firstname = data.loggedUser.firstname;
            /* const sanitizedFname = firstname.replace(/<[^>]+>/ig, ''); */

            if(firstname !== null) {
                const header = document.getElementById("welcome");
                const thisUser = document.getElementById("yourUsername");
                const thisEmail = document.getElementById("yourEmail");
                const thisFname = document.getElementById("yourFname");
                const thisSname = document.getElementById("yourLname");

                header.innerHTML = "Välkommen " + firstname + "!";
                thisUser.innerHTML = data.loggedUser.username;
                thisEmail.innerHTML = data.loggedUser.email;
                thisFname.innerHTML = firstname;
                thisSname.innerHTML = data.loggedUser.surname;
            }

        } else {
            throw error;
        }

    } catch(error) {
        window.location.href = "login.html";
        displayError.innerHTML = "<strong>Du måste logga in på nytt.</strong>";
    }
}

//Log out user
function logout() {
    localStorage.removeItem("userToken");

    window.location.href = "login.html"; 
}