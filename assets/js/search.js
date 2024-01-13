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
let filteredBookArr = [];


function renderFoundBooks() {
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();


        const books = ref(db, "books/");

        onValue(books, (snapshot) => {
            const data = snapshot.val();


            let arr = Object.entries(data);
            console.log(arr);

            let arrBook = (arr.map(el => el[1]));
            console.log(arrBook);


            if (inp.value == "") {
                console.log("Empty input");
                warningAlert.innerHTML = `<div class="alert alert-warning col-12 row m-auto mb-4 py-4" role="alert">
                                                Fill the input!
                                        </div>`

                setTimeout(() => {
                    warningAlert.innerHTML = "";
                }, 2000)

            } else {
                for (const el of arrBook) {
                    // let elLower = el?.book.title.toLowerCase();
                    // let inpLower = inp.value.toLowerCase();
                    if (el?.book.title.includes(inp.value)) {
                        console.log("Found");
                        filteredBookArr.push(`<div class="swiper-slide">
                    <div class="card mb-3" style="max-width: 960px; max-height: 560px;  padding: 50px 30px;">
                        <div class="row g-3 p-3">
                        <div class="col-md-6">
                            <img src="${el.book.image == "undefined" ? `../icon/logo_red.svg` : el.book.image}" class="card-img-bottom" class="img-fluid rounded-start" width="350" height="450" alt="...">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body d-flex flex-column gap-4">
                            <h5 class="card-title fs-3 fw-bold mt-3">${el?.book.title}</h5>
                            <p class="card-text fs-3 mt-3">${el?.book.authors}</p>
                            <p class="card-text fs-5 mt-3 overflow-y-auto" style="height: 200px">${el?.book.desc}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                `)
                        inp.value = "";
                        swiperWrapper.innerHTML = filteredBookArr.join("");
                        


                    }
                    else {
                        console.log("error");
                        swiperWrapper.innerHTML = `
                <div class="swiper-slide">
                <div class="card mb-3" style="max-width: 960px; padding: 60px 30px;">
                    <div class="row g-0">
                        <div class="col-md-6">
                            <img src="../images/hand-drawn-flat-design-stack-books_23-2149334862.avif"
                                class="card-img-bottom" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-6 ">
                            <div class="card-body d-flex flex-column gap-4">
                                <h5 class="card-title fs-3 fw-bold text-danger">Could not</h5>
                                <p class="card-text fs-3 text-danger">Find Your Book </p>
                                <p class="card-text fs-4 overflow-y-auto" style="height: 300px">Try to Read Lorem ipsum dolor sit amet consectetur,
                                 adipisicing elit. Atque quis deleniti distinctio sequi accusantium labore blanditiis doloremque ex ipsam est,
                                  ad ducimus animi, voluptates harum aut consequuntur obcaecati ab vero.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`

                    }


                }


            }

            inp.value = "";
        })

        console.log(filteredBookArr, "filteredBookArr filled");
        filteredBookArr = [];

    })
}

renderFoundBooks();



