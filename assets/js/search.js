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

const searchBtn = document.querySelector("#searchBtn");
const inp = document.querySelector("#inp");
const swiperWrapper = document.querySelector(".swiper-wrapper");

// function findAndRenderBooks() {


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const books = ref(db, "books/");

    onValue(books, (snapshot) => {
        const data = snapshot.val();


        let arr = Object.entries(data);
        console.log(arr);

        let arrBook = (arr.map(el => el[1]));
        console.log(arrBook);

        let filteredArr = [];
        for (const el of arrBook) {
            if (el?.book.title.includes(inp.value)) {
                filteredArr.push( `<div class="swiper-slide">
                    <div class="card mb-3" style="max-width: 960px; padding: 20px">
                        <div class="row g-0">
                        <div class="col-md-6">
                            <img src="${el?.book.image}" class="card-img-bottom" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body">
                            <h5 class="card-title fs-3 fw-bold mt-3">${el?.book.title}</h5>
                            <p class="card-text fs-3 mt-3">${el?.book.authors}</p>
                            <p class="card-text fs-4 mt-3 overflow-y-auto" style="height: 300px">${el?.book.desc}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                `)
            }

        }
        swiperWrapper.innerHTML = filteredArr.join("");
    })


})
// }

// findAndRenderBooks();
