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


                let arrForFilterCategories = arr.map(el => el[1]).filter(el => {        //on click category that mapping that types of books
                    if (el.book.categories == btn.textContent) {
                        return el;
                    }

                })

                console.log(arrForFilterCategories.length, "arrForFilterCategories LENGTH");


                let numberSildePreview;
                let forceToAxisActive;

                if (arrForFilterCategories.length == 1) { numberSildePreview = 1; forceToAxisActive = false}
                else if (arrForFilterCategories.length == 2) { numberSildePreview = 2; }
                else if (arrForFilterCategories.length == 3) { numberSildePreview = 3 }
                else if (arrForFilterCategories.length == 4) { numberSildePreview = 4 }
                else if (arrForFilterCategories.length > 4) { numberSildePreview = 5 }



                const swiperObj = new Swiper('.swiper', {
                    // Optional parameters
                    // direction: 'horizontal',
                    // loop: true,
                    slidesPerView: numberSildePreview,
                    // spaceBetween: 50,


                    grid: {
                        rows: 1,
                    },

                    breakpoints: {

                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                        1300: {
                            slidesPerView: 5,
                        },
                    },

                    mousewheel: {
                        forceToAxis: true,
                    },

                    // Navigation arrows
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },

                    // enabled: false,
                    threshold: numberSildePreview


                });



                swiperWrapper.innerHTML = arrForFilterCategories.map((el, index) => {      //maping categories to All Books Section at Catalog page
                    console.log(numberSildePreview, "numberSildePreview"),
                        console.log(el);
                    return `<div class="swiper-slide shadow rounded me-5" style="width: 200px;">
                    <div class="card p-3 rounded" style="width: 200px; height: 400px; cursor: pointer">
                    <img src="${el.book.image == "undefined" ? `../icon/logo_red.svg` : el.book.image}" class="card-img-top" alt="..." width="130" height="180">
    
                            <div class="card-body d-flex flex-column justify-content-between align-items-between gap-2">
    
                                <h4 class="card-title fw-bold overflow-hidden" style="height: 30px">${el.book.authors}</h4>
                                <h5 class="card-title fst-italic overflow-hidden" style="height: 16px">${el.book.title}</h5>
                                <h5 class="card-title overflow-hidden" style="height: 16px">${el.book.categories}</h5>
                                <button class="btn btn-warning zoom text-white fw-bold readMoreBtn" data-id="${el.book.id}">Read More</button>

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

function renderDetailPage(id) {
    console.log("cliked");
    window.location.href = `../pages/readMoreBook.html#id=${id}`;
}

//--------------------------------------------All Books-Mapping---------------------------------------------------------------------------

function renderAllBooks() {
    const books = ref(db, "books/");
    // let defaultImg = ;

    onValue(books, (snapshot) => {
        const data = snapshot.val();

        let arr = Object.entries(data);
        console.log(arr);

        const swiperObj = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            // loop: true,
            slidesPerView: 5,
            grid: {
                rows: 1,
            },

            breakpoints: {

                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
                1300: {
                    slidesPerView: 5,
                },
            },

            mousewheel: {
                forceToAxis: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },


        });

        swiperWrapper.innerHTML =
            arr.map(el => el[1]).map((el, index) => {      //maping categories to All Books Section at Catalog page
                console.log(el);
                return `<div class="swiper-slide shadow-lg rounded " style="">
                    <div class="card p-3 rounded" style="width: 200px; height: 400px; cursor: pointer">
                    <img src="${el.book.image == "undefined" ? `../icon/logo_red.svg` : el.book.image}" class="card-img-top" alt="..." width="130" height="180">
    
                            <div class="card-body d-flex flex-column justify-content-between align-items-between gap-2">
    
                                <h4 class="card-title fw-bold overflow-hidden" style="height: 30px">${el.book.authors}</h4>
                                <h5 class="card-title fst-italic overflow-hidden" style="height: 16px">${el.book.title}</h5>
                                <h5 class="card-title overflow-hidden" style="height: 16px">${el.book.categories}</h5>
                                <button class="btn btn-warning zoom text-white fw-bold readMoreBtn" data-id="${el.book.id}">Read More</button>

                            </div>
    
                        </div>
                    </div>`;
            }).join("");;

        let readMoreBtn = document.querySelectorAll(".readMoreBtn");

        readMoreBtn.forEach(btn => {
            btn.addEventListener("click", () => { renderDetailPage(btn.dataset.id) })
        })
    })
}


renderAllBooks();

//--------------------------------------------All Books-Mapping---------------------------------------------------------------------------


function mappedBooks(arr) {


}