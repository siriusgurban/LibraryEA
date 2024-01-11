"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, set, push, onValue, remove, child, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
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

let currentId = window.location.hash.split("=")[1];
console.log(currentId);

const commentsHtml = document.querySelector("#commentsHtml");

function renderBook() {
    const books = ref(db, "books/");

    onValue(books, (snapshot) => {
        const data = snapshot.val();

        let arr = Object.entries(data);

        const bookSection = document.querySelector("#bookSection");
        for (const el of arr) {
            if (el[0] == currentId) {
                bookSection.innerHTML = `<div class="d-flex gap-5 justify-content-between p-5">

                                            <div class="w-50 d-flex flex-column gap-2">
                                                <div class="bg-primary text-white text-center w-25 py-1 fw-bold rounded">${el[1].book.year}</div>
                                                <div class="fs-2 fw-bolder">${el[1].book.title}</div>
                                                <div class="fw-bold">Added at ${new Date(el[1].book.date).toLocaleDateString()}</div>
                                                <div class="fs-2 fst-italic">${el[1].book.authors}</div>
                                                <div class="lh-lg" >${el[1].book.desc}</div>
                                                <form class="d-flex my-4" action="">
                                                    <input  type="text" id="commentinput" class="form-control shadow p-2" placeholder="Type comment...">
                                                    <button type="submit" id="commentBtn" class="btn btn-warning zoom text-white">Comment</button>
                                                </form>
                                                
                                            </div>

                                            <div class="w-25">
                                                <img class="w-100 border border-warning shadow-lg" src="${el[1].book.image=="undefined" ? `../icon/logo_red.svg` : el[1].book.image}" alt="Image" srcset="">
                                            </div>

                                        </div>
                               
                        `;

                let commentinput = document.querySelector("#commentinput");
                let commentBtn = document.querySelector("#commentBtn");

                commentBtn.addEventListener("click", (e) => {
                    e.preventDefault();

                    const reference = ref(db, "books/" + currentId + "/" + "comments/");//adding comments for each book

                    push(reference, {
                        comment: commentinput.value,
                        date: Date.now()
                    })

                    renderBookComments();
                })
            }

        }



    })
};

renderBook();



function renderBookComments() {
    const books = ref(db, "books/");

    onValue(books, (snapshot) => {
        const data = snapshot.val();

        let arr = Object.entries(data);

        for (const el of arr) {
            if (el[1].book.id == currentId) {

                commentsHtml.innerHTML = (Object?.entries(el[1]?.comments)).reverse().map(elem => {
                    return `<div class="d-flex gap-1 flex-column">
                                <div><span>**** **** ${new Date(el[1]?.book.date).toLocaleDateString()}</span></div>
                                <p>${elem[1]?.comment}</p>
                            </div>`;
                }).join("")

            }
        }

    })

}

renderBookComments();