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
                bookSection.innerHTML = `<div class="w-50">
                                <div>${el[1].book.year}</div>
                                <div class="fs-1 fw-bolder">${el[1].book.title}</div>
                                <div>${el[1].book.date}</div>
                                <div class="fs-2">${el[1].book.authors}</div>
                                <div>${el[1].book.desc}</div>
                                <form class="d-flex" action="">
                                    <input  type="text">
                                    <button type="submit">Comment</button>
                                </form>
                                <div id="commentsHtml"></div>
                            </div>
                            <div class="w-25">
                                <img class="w-100" src="${el[1].book.image}" alt="Image" srcset="">
                        </div>`;

                let input = document.querySelector("input");
                let button = document.querySelector("button");

                button.addEventListener("click", (e) => {
                    e.preventDefault();

                    const reference = ref(db, "books/" + currentId + "/" + "comments/");//adding comments for each book

                    push(reference, {
                        comment: input.value,
                        date: Date.now()
                    })

                })
            }
            renderBookComments();
        }



    })
};

renderBook();



function renderBookComments() {
    const books = ref(db, "books/");

    onValue(books, (snapshot) => {
        const data = snapshot.val();

        let arr = Object.entries(data);

    
            // console.log(commentsHtml, "commentsHtml");
        // commentsHtml.innerHTML
        // let comHt
        commentsHtml.innerHTML = arr.filter(el => {
            if (el[1].book.id == currentId) {
                let dt = (Object.entries(el[1].comments))[0][1].date;
                let cmt = (Object.entries(el[1].comments))[0][1].comment;

                console.log(typeof (Object.entries(el[1].comments))[0][1].comment);
                console.log(typeof (Object.entries(el[1].comments))[0][1].date);
                return `<div>
                            <div><span>${dt}</span></div>
                            <p>${cmt}</p>
                        </div>`
            }
        }).join("");

       

        // console.log(comHt, "comHtfgdxg");
    })

}

