"use strict";

//Redirecting to login
if(!localStorage.getItem("userToken")) {
    window.location.href = "login.html";
}