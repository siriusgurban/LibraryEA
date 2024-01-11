"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, set, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDirwNo81HrpO5kQ-FMOAjdplyLuzANUJk",
    authDomain: "libraryea-b8bff.firebaseapp.com",
    databaseURL: "https://libraryea-b8bff-default-rtdb.firebaseio.com",
    projectId: "libraryea-b8bff",
    storageBucket: "libraryea-b8bff.appspot.com",
    messagingSenderId: "595197184506",
    appId: "1:595197184506:web:d9c4a414ca33eccb313c43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// ---------------------------------Join Us Starts--------------------------------------------------

const inpFullname = document.querySelector("#inpFullname");
const inpEmail = document.querySelector("#inpEmail");
const joinUsBtn = document.querySelector("#joinUsBtn");
const successAlert = document.querySelector("#successAlert");



joinUsBtn.addEventListener("submit", (e) => {
    e.preventDefault();



    let joinUsUsObj = {
        fullname: inpFullname.value,
        email: inpEmail.value,
    }

    writeUserData(joinUsUsObj);    //adding jointUsObj to joinUs called
    console.log("Joined");

    inpFullname.value = "";
    inpEmail.value = "";

    successAlert.innerHTML = `<div class="alert alert-success col-11 row m-auto mb-3" role="alert">
                                    You successfully joined!
                                </div>`

    setTimeout(() => {
        successAlert.innerHTML = "";
    }, 2000)



})

function writeUserData(joinUsUsObj) {

    const reference = ref(db, "joinUses/");//adding jointUsObj to joinUs

    push(reference,
        joinUsUsObj
    );
}

// ---------------------------------Join Us Ends--------------------------------------------------