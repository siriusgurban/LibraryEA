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
const note100 = document.querySelector("#note100");
const contactUsForm = document.querySelector("#contactUsForm");
const successAlertContactUs = document.querySelector("#successAlertContactUs");


contactUsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let contactUsObj = {
        fullname: inpFullname.value,
        email: inpEmail.value,
        address: inpAddress.value,
        phone: inpPhone.value,
        note: inpNote.value,
    }

    writeUserData(contactUsObj);    //adding contactUsObj to contactUs called

    successAlertContactUs.innerHTML = `   <div class="alert alert-success col-3 row m-auto mb-3 p-4" role="alert">
    You successfully contacted!
</div>`

    setTimeout(() => {
        successAlertContactUs.innerHTML = "";
    }, 2000)

    inpFullname.value = "";
    inpEmail.value = "";
    inpAddress.value = "";
    inpPhone.value = "";
    inpNote.value = "";


})

function writeUserData(contactUsObj) {

    const reference = ref(db, "contactUses/");//adding contactUsObj to contactUs

    push(reference,
        contactUsObj
    );
}


inpNote.addEventListener("input", () => {             //on input at note area it stops you when you reached maxlength(100 simvols)
    note100.textContent = inpNote.value.length;
})


