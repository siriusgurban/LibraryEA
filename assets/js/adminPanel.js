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


const inp = document.querySelector("#inp");
const result = document.querySelector("#result");
let main_card = document.querySelector("#main-card");
let input1 = document.querySelector("#input1");
let btnClear = document.querySelector("#btnClear");
let card = document.querySelector("card");

let dropInp = document.querySelector(".dropInp");
let submitBtn = document.querySelector("#submitBtn");
let inp1 = document.querySelector("#inp1");
let inp2 = document.querySelector("#inp2");
let inp3 = document.querySelector("#inp3");
let inp4 = document.querySelector("#inp4");
let categoryInpSelected = document.querySelector("#categoryInpSelected");

console.log(input1.value, "input");
btnClear.addEventListener("click", (e) => {
    e.preventDefault();

    fetch(`https://www.googleapis.com/books/v1/volumes/?q={${input1.value}}`)
        .then(data => {
            return data.json();
        }
        )
        .then(data => {
            console.log(data);
            // <img src="${el.volumeInfo.imageLinks.thumbnail}" class="card-img-top" alt="..." style="height: 360px">
            main_card.innerHTML = data.items.map(el => {   //mapping datas to page
                return `<div class="card my-4 " style="width: 18rem; cursor: pointer">

                            <div class="card-body">
                                <h4 class="card-title">${el.volumeInfo.authors}</h4>
                                <h5 class="card-title">${el.volumeInfo.title}</h5>
                                <h5 class="card-title">${el.volumeInfo.categories}</h5>
                                <button class="btn btn-primary addBtn" data-id="${el.id}" data-title="${el.volumeInfo.title}" data-authors="${el.volumeInfo.authors}" data-categories="${el.volumeInfo.categories}">Add</button>
                            </div>

                        </div>`
            }).join("");

            let addBtn = document.querySelectorAll(".addBtn");
            addBtn.forEach(btn => {
                btn.addEventListener("click", () => {//add to form function
                    addToForm(btn.dataset.id, btn.dataset.authors, btn.dataset.title, btn.dataset.categories);
                    renderBooksCategories();
                })
            })

            function addToForm(id = new Date.now(), authors, title, categories) {//add to form function called
                inp1.value = authors;
                inp2.value = title;
                inp3.value = categories;
                inp4.value = id;
            }

        })
})

submitBtn.addEventListener("click", (e) => {//add function called
    e.preventDefault();
    let bookObj;
    if(dropInpMenu.hasAttribute("disabled")){
        bookObj = { authors: inp1.value, title: inp2.value, categories: inp3.value }
    }
    // else{
    //     bookObj = { authors: inp1.value, title: inp2.value, categories: dropInp.value }
    // }
    console.log(bookObj,"bookObj");
    writeUserData(inp4.value, bookObj)
    console.log("added");
    // inp.value = "";
    // renderTodos()
    renderBooksCategories();
})


function writeUserData(bookId, book) {
    const reference = ref(db, 'List/' + "books/" + bookId);//add function
    set(reference, {
        book: book,
    })
}

let dropInpMenu = document.querySelector("#dropInpMenu");

function renderBooksCategories() {
    const books = ref(db, 'List/' + "books/");

    onValue(books, (snapshot) => {
        const data = snapshot.val();
        let arr = Object?.entries(data);
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

        dropInpMenu.innerHTML = checkForDuplicates(arrForCheking).map((el, index) => {    //adding categories option and uniqing them
            return ` <option class="dropInp" value="${el}" data-id="${index}" data-val="${el}">${el}</option>`
        }).join("");

        // let dropInp = document.querySelectorAll(".dropInp");

        // console.log(dropInp, "dropInp");

        // dropInp.forEach(btn => {
        //     btn.addEventListener("click", () => {
        //         dropInp.textContent = btn.dataset.val;
        //     })
        // })

        // console.log(dropInp, "dropInp");

    })



}

function checkForDuplicates(arr) {    //checks For Duplicates in categories
    return [...new Set(arr)];
}

let btnCheck = document.querySelectorAll(".btn-check");

btnCheck.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log("cliked");
        if (dropInpMenu.hasAttribute("disabled")) {
            dropInpMenu.removeAttribute("disabled");
            inp3.setAttribute("disabled", true);
        } else {
            dropInpMenu.setAttribute("disabled", true);
            inp3.removeAttribute("disabled");
        }
    })
})

renderBooksCategories()

