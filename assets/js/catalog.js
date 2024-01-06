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

const categories1 = document.querySelector("#categories");
let swiperWrapper = document.querySelector(".swiper-wrapper");

function renderCatalog() {
    const books = ref(db, "books/");

    onValue(books, (snapshot) => {
        const data = snapshot.val();


        let arr = Object.entries(data);
        console.log(arr);

    

        let arrForCheking = arr.map((el) => {       //filtered and uniqued 1
            return el[1].book?.categories;
        }).filter(el => {
            if (el == !undefined) {
                return el;
            } else {
                return el;
            }
        })



        categories1.innerHTML = checkForDuplicates(arrForCheking).map((el, index) => {      //maping categories to home page
            console.log(el);
            return `
                        <p class="categoriesClass" data-catalog="${el}">${el}</p>
                    `;
        }).join("");

        let categoriesClass = document.querySelectorAll(".categoriesClass");

        console.log(swiperWrapper);

        categoriesClass.forEach(btn => {
            btn.addEventListener("click", () => {

                let arrForFilterCategories = arr.map(el => el[1]).filter(el => {
                    if (el.book.categories == btn.textContent) {
                        return el;
                    }

                })

                console.log(arrForFilterCategories, "arrForFilterCategories");


                swiperWrapper.innerHTML = arrForFilterCategories.map((el, index) => {      //maping categories to All Books Section at Catalog page
                    console.log(el);
                    return `<div class="swiper-slide">
                    <div class="card " style="width: 18rem; cursor: pointer">
                    <img src="${el.book.image}" class="card-img-top" alt="...">

                            <div class="card-body">

                                <h4 class="card-title fw-3">${el.book.authors}</h4>
                                <h5 class="card-title">${el.book.title}</h5>
                                <h5 class="card-title">${el.book.categories}</h5>
                                <button class="btn btn-primary readMoreBtn" data-id="${el.book.id}">Read More</button>
                            </div>

                        </div>
                    </div>`;
                }).join("");

                let readMoreBtn = document.querySelectorAll(".readMoreBtn");

                readMoreBtn.forEach(btn=>{
                    btn.addEventListener("click", ()=>{renderDetailPage(btn.dataset.id)})
                })
            })
        })
    })
}

renderCatalog();

function checkForDuplicates(arr) {    //function checks For Duplicates in categories
    return [...new Set(arr)];
}

function renderDetailPage(id) {
    console.log("cliked");
    window.location.href = `../pages/readMoreBook.html#id=${id}`;
  }