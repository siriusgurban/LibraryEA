"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, set, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
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

const catalog = document.querySelector("#catalog");

function renderTodos() {
    const books = ref(db, "books/");

    onValue(books, (snapshot) => {
        const data = snapshot.val();


        let arr = Object.entries(data);
        console.log(arr);


        let arrForCheking = arr.map((el) => {       //filtered and uniqued categories
            return el[1].book?.categories;
        }).filter(el => {
            if (el == !undefined) {
                return el;
            } else {
                return el;
            }
        })

        catalog.innerHTML = checkForDuplicates(arrForCheking).map((el, index) => {      //maping categories to home page
            console.log(el);
            return `<div class="card bg-secondary" style="width: 18rem; padding: 20px 50px;">
                        <h5 class="card-title text-center">${el}</h5>
                    </div>`;
        }).join("");
    })
}

renderTodos();

function checkForDuplicates(arr) {    //function checks For Duplicates in categories
    return [...new Set(arr)];
}