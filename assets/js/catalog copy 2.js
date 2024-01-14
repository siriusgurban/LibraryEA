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

const categoriesList = document.querySelector("#categoriesList");
let swiperWrapper = document.querySelector(".carousel-inner");

const allBooks = document.querySelector("#allBooks");

allBooks.addEventListener("click", renderAllBooks)

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



        categoriesList.innerHTML = checkForDuplicates(arrForCheking).map((el, index) => {      //maping categories to Catalog page
            console.log(el);
            return `
                        <div class="categoriesClass " data-catalog="${el}">${el}</div>
                    `;
        }).join("");

        let categoriesClass = document.querySelectorAll(".categoriesClass");

        console.log(swiperWrapper);

        categoriesClass.forEach(btn => {

            btn.addEventListener("click", () => {
                console.log(btn.textContent, "cliked");

                let arrForFilterCategories = arr.map(el => el[1]).filter(el => {        //on click category that mapping that types of books
                    if (el.book.categories == btn.textContent) {
                        return el;
                    }

                })

                swiperWrapper.innerHTML = arrForFilterCategories.map((el, index) => {      //maping categories to All Books Section at Catalog page
                    console.log(index, "index");
                    return `<div class="cards-wrapper d-flex justify-content-center">
                    <div class="carousel-item ${index == 0 ? "active" : ""} shadow rounded me-5" style="width: 200px;">
                    <div class="card p-3 rounded" style="width: 200px; height: 400px; cursor: pointer">
                    <img src="${el.book.image == "undefined" ? `../icon/logo_red.svg` : el.book.image}" class="card-img-top" alt="..." width="130" height="180">
    
                            <div class="card-body d-flex flex-column justify-content-between align-items-between gap-2">
    
                                <h4 class="card-title fw-bold overflow-hidden" style="height: 30px">${el.book.authors}</h4>
                                <h5 class="card-title fst-italic overflow-hidden" style="height: 16px">${el.book.title}</h5>
                                <h5 class="card-title overflow-hidden" style="height: 16px">${el.book.categories}</h5>
                                <button class="btn btn-warning zoom text-white fw-bold readMoreBtn" data-id="${el.book.id}">Read More</button>

                            </div>
    
                        </div>
                    </div>
                    </div>`;
                }).join("");

                let readMoreBtn = document.querySelectorAll(".readMoreBtn");

                readMoreBtn.forEach(btn => {
                    btn.addEventListener("click", () => { renderDetailPage(btn.dataset.id) })
                })
            })
        })
    })
}

renderCatalog();

function checkForDuplicates(arr) {    //function checks For Duplicates in categories
    return [...new Set(arr)];
}

function renderDetailPage(id) {       //this function directs to new page by id
    console.log("cliked");
    window.location.href = `../pages/readMoreBook.html#id=${id}`;
}

//--------------------------------------------All Books-Mapping-Starts--------------------------------------------------------------------------

function renderAllBooks() {
    const books = ref(db, "books/");

    onValue(books, (snapshot) => {
        const data = snapshot.val();

        let arr = Object.entries(data);
        console.log(arr);


        function sliderWrap(index) {
            if ((index < 6 && index % 5 == 0) || index == 0) {
                let wrap1 = '<div class="carousel-item active shadow-lg rounded d-flex justify-content-center" style=""><div class="cards-wrapper d-flex  gap-3">'

                return wrap1;
            } else if (index > 6 && index % 5 == 0) {
                let wrap2 = '<div class="carousel-item shadow-lg rounded d-flex justify-content-center" style=""><div class="cards-wrapper d-flex  gap-3">'

                return wrap2;
            }

        }

        function sliderWrap2(index) {
            if ((index != 0 && index % 5 == 0)){
                return "</div></div>";
            }
            
        }

        swiperWrapper.innerHTML =
            arr.map(el => el[1]).map((el, index) => {      //maping categories to All Books Section at Catalog page
                console.log(el);
                console.log(index, "index");

                return `
                <div class="carousel-item ${index<5 ? "active" : ""} shadow-lg rounded ">
                <div class="cards-wrapper d-flex justify-content-center gap-3">
                    <div class="card p-3 rounded" style="width: 200px; height: 400px; cursor: pointer">
                    <img src="${el.book.image == "undefined" ? `../icon/logo_red.svg` : el.book.image}" class="card-img-top" alt="..." width="130" height="180">
    
                            <div class="card-body d-flex flex-column justify-content-between align-items-between gap-2">
    
                                <h4 class="card-title fw-bold overflow-hidden" style="height: 30px">${el.book.authors}</h4>
                                <h5 class="card-title fst-italic overflow-hidden" style="height: 16px">${el.book.title}</h5>
                                <h5 class="card-title overflow-hidden" style="height: 16px">${el.book.categories}</h5>
                                <button class="btn btn-warning zoom text-white fw-bold readMoreBtn" data-id="${el.book.id}">Read More</button>

                            </div>
                            </div>
                        </div>
                        </div>
                    `;
            }).join("");

        let readMoreBtn = document.querySelectorAll(".readMoreBtn");

        readMoreBtn.forEach(btn => {
            btn.addEventListener("click", () => { renderDetailPage(btn.dataset.id) })
        })
    })
}


renderAllBooks();




//--------------------------------------------All Books-Mapping-Ends--------------------------------------------------------------------------


function mappedBooks(arr) {


}