"use strict";

const inp = document.querySelector("#inp");
const result = document.querySelector("#result");
let main_card = document.querySelector("#main-card");
let input1 = document.querySelector("#input1");
let btnClear = document.querySelector("#btnClear");
let card = document.querySelector("card");

console.log(input1.value, "input");
btnClear.addEventListener("click", (e) => {
    e.preventDefault();

    fetch(`https://www.googleapis.com/books/v1/volumes/?q={${input1.value}}`)
        .then(data => {
            console.log(data.url)
            return data.json();
        }
        )
        .then(data => {
            console.log(data);
            console.log(data.items[0].id);
            // console.log(data.items[0].volumeInfo.title);
            // console.log(data.items[0].volumeInfo.authors.join(""));
            // console.log(data.items[0].volumeInfo.description);
            // console.log(data.items[0].volumeInfo.imageLinks.thumbnail);
            // console.log(data.items[0].volumeInfo.categories.join(""));
            // console.log(data.items[0].kind);

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
            let inp1 = document.querySelector("#inp1");
            let inp2 = document.querySelector("#inp2");
            let inp3 = document.querySelector("#inp3");

            addBtn.forEach(btn => {
                btn.addEventListener("click", () => {//add function
                    addToForm(btn.dataset.id, btn.dataset.authors, btn.dataset.title, btn.dataset.categories);
                })
            })

            function addToForm(id, authors, title, categories) {//add function called
                inp1.value = authors;
                inp2.value = title;
                inp3.value = categories;
            }

        })

})

let submitBtn = document.querySelector("#submitBtn");
let inp1 = document.querySelector("#inp1");
let inp2 = document.querySelector("#inp2");
let inp3 = document.querySelector("#inp3");


submitBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    console.log(inp1.value, inp2.value, inp3.value);
})

