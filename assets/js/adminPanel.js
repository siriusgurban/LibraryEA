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


let main_card = document.querySelector("#main-card");
let input1 = document.querySelector("#input1");
let searchBtn = document.querySelector("#searchBtn");

let submitBtn = document.querySelector("#submitBtn");
let inp1 = document.querySelector("#inp1");
let inp2 = document.querySelector("#inp2");
let inp3 = document.querySelector("#inp3");
let inp4 = document.querySelector("#inp4");
let dropInpMenu = document.querySelector("#dropInpMenu");


console.log(input1.value, "input");
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    fetch(`https://www.googleapis.com/books/v1/volumes/?q={${input1.value}}`)
        .then(data => { return data.json() })
        .then(data => {
            console.log(data);
            // <img src="${el.volumeInfo.imageLinks.thumbnail}" class="card-img-top" alt="..." style="height: 360px">
            main_card.innerHTML = data.items.map(el => {   //mapping datas to page
                return `<div class="card my-4 " style="width: 18rem; cursor: pointer">

                            <div class="card-body">
                                <h4 class="card-title fw-3">${el.volumeInfo.authors}</h4>
                                <h5 class="card-title">${el.volumeInfo.title}</h5>
                                <h5 class="card-title">${el.volumeInfo.categories}</h5>
                                <button class="btn btn-primary addBtn" data-id="${el.id}" data-year="${el.volumeInfo?.publishedDate}" data-desc="${el.volumeInfo.description}" data-image="${el.volumeInfo.imageLinks?.thumbnail}" data-title="${el.volumeInfo.title}" data-authors="${el.volumeInfo.authors}" data-categories="${el.volumeInfo.categories}">Add</button>
                            </div>

                        </div>`
            }).join("");

            let addBtn = document.querySelectorAll(".addBtn");
            addBtn.forEach(btn => {
                btn.addEventListener("click", () => {       //add to form function
                    addToForm(btn.dataset.id, btn.dataset.authors, btn.dataset.title, btn.dataset.categories, btn.dataset.image, btn.dataset.desc, btn.dataset.year);
                    renderBooksCategories();
                })
            })

            function addToForm(id , authors, title, categories, image, desc, year) {       //add to form function called
                inp1.value = authors;
                inp2.value = title;
                inp3.value = categories;
                inp4.value = id;
                inp4.dataset.img = image;
                inp4.dataset.desc = desc;
                inp4.dataset.year = year;
            }
        })
})

submitBtn.addEventListener("click", (e) => {//add function called
    e.preventDefault();

    let bookObj;
    let date = Date.now();
    if (dropInpMenu.hasAttribute("disabled")) {
        bookObj = { authors: inp1.value, title: inp2.value, categories: inp3.value, date: date, image: inp4.dataset.img, desc: inp4.dataset.desc, id: inp4.value, year: inp4.dataset.year, comments: null }  //writing book with datas to firebase as Object
    } else {
        bookObj = { authors: inp1.value, title: inp2.value, categories: dropInpMenu.value, date: date, image: inp4.dataset.img, desc: inp4.dataset.desc, id: inp4.value, year: inp4.dataset.year, comments: null }
    }

    console.log(bookObj, "bookObj");
    writeUserData(inp4.value, bookObj)
    console.log("added");
    // inp.value = "";
    // renderTodos()
    renderBooksCategories();
})


function writeUserData(bookId, book) {
    const reference = ref(db, "books/" + bookId);//add function
    set(reference, {
        book: book,
    })
}


function renderBooksCategories() {
    const books = ref(db, "books/");

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

    })
}


let btnCheck = document.querySelectorAll(".btn-check");

btnCheck.forEach(btn => {   // changing between avto add and manual add (disabling and enabling)
    btn.addEventListener("click", () => {
        if (dropInpMenu.hasAttribute("disabled")) {
            dropInpMenu.removeAttribute("disabled");
            inp3.setAttribute("disabled", true);
        } else {
            dropInpMenu.setAttribute("disabled", true);
            inp3.removeAttribute("disabled");
        }
    })
})

function checkForDuplicates(arr) {    //function checks For Duplicates in categories
    return [...new Set(arr)];
}

renderBooksCategories()



//? -------------------------------------------- Books list Start-------------------------------------

//? Show books as table on AdminPanel where you can delete books

let booktbody = document.querySelector("#booktbody");

function renderBooksonTable() {
    const books = ref(db, "books/");

    onValue(books, (snapshot) => {
        const data = snapshot.val();
        let arr = Object?.entries(data);
        console.log(arr.map(el => el[1]), "Table");      // arr.map(el => el[1])   bu yasilisda firebase-i gurulusuna gore, 
                                                        // her 1-ci index-deki elemeti gotururem, hansi ki onlar objectdir(datadir)
                                                        booktbody.innerHTML = arr.map(el => el[1]).map((el, index) => {
            return `<tr>
            <th scope="row">${index + 1}</th>
            <td>${el.book?.title}</td>
            <td>${el.book?.authors}</td>
            <td><div class="descHover" style="overflow:hidden; width: 300px; height:50px;">${el.book?.desc}</div></td>
            <td>${el.book?.categories}</td>
            <td><button class="btn btn-danger delBtn" data-id="${el.book?.id}">Del</button></td>
            </tr>`
        }).join("");

        let descHover = document.querySelectorAll(".descHover");

        descHover.forEach((btn) => {                      //shows function that shows full description and then hide description
            btn.addEventListener("mouseover", (e) => {
                btn.style.overflow = "visible";
                btn.style.height = "auto";
            })
            btn.addEventListener("mouseleave", () => {
                btn.style.overflow = "hidden";
                btn.style.height = "50px";
            })
        })


        let delBtn = document.querySelectorAll(".delBtn");

        delBtn.forEach(btn => {
            btn.addEventListener("click", () => { 
                console.log(btn.dataset.id, "btn.dataset.id");          //delete function called
                deleteBook(btn.dataset.id);
            })
        })

        function deleteBook(bookId) {                                   //delete function
            let rmv = ref(db, "books/" + bookId);

            remove(rmv).then(() => console.log("Successfully deleted"));
        }

    })
}

renderBooksonTable();

//? -------------------------------------------- Books list End-------------------------------------

//? -------------------------------------------- Join Us Start-------------------------------------

let joinUstbody = document.querySelector("#joinUstbody");

function renderJoinUsesonTable() {

    const contacUses = ref(db, "joinUses/");
    onValue(contacUses, (snapshot) => {

        const data = snapshot.val();
        let arr = Object?.entries(data);
        console.log(arr, "arr");
             // arr.map(el => el[1])   bu yasilisda firebase-i gurulusuna gore, 
                                                        // her 1-ci index-deki elemeti gotururem, hansi ki onlar objectdir(datadir)
  joinUstbody.innerHTML = arr.map(el => el[1]).map((el, index) => {
            return `<tr>
            <th scope="row">${index + 1}</th>
            <td>${el.fullname}</td>
            <td>${el.email}</td>
            </tr>`
        }).join("");

    })
}

renderJoinUsesonTable();

//? -------------------------------------------- Join Us End-------------------------------------


//? -------------------------------------------- Contact Us Start-------------------------------------

let contactUstbody = document.querySelector("#contactUstbody");

function renderContacUsesonTable() {

    const contacUses = ref(db, "contactUses/");
    onValue(contacUses, (snapshot) => {

        const data = snapshot.val();
        let arr = Object?.entries(data);
        console.log(arr, "arr");
             // arr.map(el => el[1])   bu yasilisda firebase-i gurulusuna gore, 
                                                        // her 1-ci index-deki elemeti gotururem, hansi ki onlar objectdir(datadir)
      contactUstbody.innerHTML = arr.map(el => el[1]).map((el, index) => {
            return `<tr>
            <th scope="row">${index + 1}</th>
            <td>${el.fullname}</td>
            <td>${el.address}</td>
            <td>${el.email}</td>
            <td>${el.phone}</td>
            </tr>`
        }).join("");

    })
}

renderContacUsesonTable();

//? -------------------------------------------- Contact Us End-------------------------------------


