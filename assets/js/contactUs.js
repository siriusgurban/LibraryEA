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


const inpFullname = document.querySelector("#inpFullname");
const inpEmail = document.querySelector("#inpEmail");
const inpAddress = document.querySelector("#inpAddress");
const inpPhone = document.querySelector("#inpPhone");
const inpNote = document.querySelector("#inpNote");
const button = document.querySelector("button");


button.addEventListener("click", (e) => {
    e.preventDefault();

    let contactUsObj = {
        fullname: inpFullname.value,
        email: inpEmail.value,
        address: inpAddress.value,
        phone: inpPhone.value,
        note: inpNote.value,
    }

    writeUserData(contactUsObj);    //adding contactUsObj to contactUs called

})

function writeUserData(contactUsObj) {

    const reference = ref(db, "contactUses/");//adding contactUsObj to contactUs

    push(reference,  
        contactUsObj
     );
}


