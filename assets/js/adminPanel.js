"use strict";

const inp = document.querySelector("#inp");
const result = document.querySelector("#result");
let main_card = document.querySelector("#main-card");
let input1 = document.querySelector("#input1");
let btnClear = document.querySelector("#btnClear");
let card = document.querySelector("card");

let myProBook = fetch(`https://www.googleapis.com/books/v1/volumes/?q={salam}`)
    .then(data => {
        console.log(data.url)
        return data.json();
    }
    )
    .then(data => {
        console.log(data);
        console.log(data.items[0].volumeInfo.title);
        console.log(data.items[0].volumeInfo.authors.join(""));
        console.log(data.items[0].volumeInfo.description);
        console.log(data.items[0].volumeInfo.imageLinks.thumbnail);
        console.log(data.items[0].kind);

        console.log(data.items[1].volumeInfo.title);
        console.log(data.items[1].volumeInfo.authors.join(""));
        console.log(data.items[1].volumeInfo.description);
        console.log(data.items[1].kind);





        main_card.innerHTML = data.items.map(el => {   //mapping datas to page
            return `<div class="card my-4 " style="width: 18rem; cursor: pointer">
    <img src="${el.volumeInfo.imageLinks.thumbnail}" class="card-img-top" alt="..." style="height: 360px">
    <div class="card-body">
        <h4 class="card-title">${el.volumeInfo.authors}</h4>
        <h5 class="card-title">${el.volumeInfo.title}</h5>
    </div>
</div>`
        }).join("");

    //     input1.addEventListener("input", () => {    //find method 
    //         console.log(input1.value);

    //         let indexTitle = data.items.filter((el, index) => {
    //             let elLower = el.Title.toLowerCase();
    //             let inpLower = input1.value.toLowerCase();
    //             console.log(elLower);
    //             console.log(inpLower);
    //             if (elLower.includes(inpLower)) {
    //                 return el;
    //             }

    //         })

    //         main_card.innerHTML = indexTitle.map(el => {
    //             return `<div class="card my-4 " style="width: 18rem; cursor: pointer">
    //     <img src="${el.Poster}" class="card-img-top" alt="..." style="height: 360px">
    //     <div class="card-body">
    //         <h5 class="card-title">${el.Title}</h5>
    //         <p class="card-text">${el.Year}</p>
    //     </div>
    // </div>`
    //         }).join("");
    //     })
    })