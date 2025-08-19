let myLibrary = [];
const addButton = document.querySelector(".add-btn");

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const cards = document.querySelector(".cards");

let formcreate = document.createElement("form");
const inputTitle = document.createElement("input");
inputTitle.type = "text";
inputTitle.name = "title";
inputTitle.placeholder = "Book Title";

const inputAuthor = document.createElement("input");
inputAuthor.type = "text";
inputAuthor.name = "author";
inputAuthor.placeholder = "Author";

const inputPages = document.createElement("input");
inputPages.type = "number";
inputPages.name = "pages";
inputPages.placeholder = "Pages";
const checkDiv = document.createElement("div");
checkDiv.classList.add("check-box");
const inputCheckBox = document.createElement("input");
const labelCheckbox = document.createElement("label");

inputCheckBox.type = "checkbox";
inputCheckBox.name = "haveread";
labelCheckbox.setAttribute("for", "haveread");
labelCheckbox.textContent = "Check if you have read it";

// Submit button
const submitBtn = document.createElement("button");
submitBtn.type = "submit";
submitBtn.textContent = "Add Book";
// submitBtn.setAttribute("disabled", true );
// const inputs=[inputTitle,inputAuthor,inputPages,inputCheckBox]
// function checkInput(){
//     inputs.forEach((ele)=>{
// if(!ele.value && !ele.checked ){
//     submitBtn.setAttribute("disabled", true );
// }else{
//     submitBtn.setAttribute("disabled", false );
// }
//     })
// }



function Book(title, author, pages, read,id) {
  // the constructor...
  this.title = title; //this.title, this.author, this.pages, this.read → properties of each book.
  //function inside each book object that returns a nicely formatted string.
  this.author = author;
  this.pages = pages;
  this.read = read;
 this.id = id || crypto.randomUUID(); // ✅ id reuse if provided
}

Book.prototype.toggleReadStatus=function(){
  this.read = !this.read

}

function addBookToLibrary(...arg) {
  // take params, create a book then store it in the array
  let book = new Book(...arg);
  myLibrary.push(book);
  console.log(book.id, "id");
  return myLibrary;
}
function createCard(title, author, pages, read, id) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.setAttribute("data-id", id);
  cards.appendChild(cardDiv);

  let p1 = document.createElement("p");
  p1.textContent = `Book Title :  ` + title;

  let p2 = document.createElement("p");
  p2.textContent = ` Book Author:  ` + author;

  let p3 = document.createElement("p");
  p3.textContent = `Book Pages:   ` + pages;

  let p4 = document.createElement("p");

  p4.textContent = `You have read this Book :    ` + read;
  const deletBookbtn = document.createElement("button");
  deletBookbtn.classList.add("btn-del");
  deletBookbtn.textContent = "Delete";

  const readResetBtn=document.createElement("button")
  readResetBtn.classList.add("read-reset")
  readResetBtn.textContent="Toggle Read"
  cardDiv.appendChild(p1);
  cardDiv.appendChild(p2);
  cardDiv.appendChild(p3);
  cardDiv.appendChild(p4);
  cardDiv.appendChild(deletBookbtn);
  cardDiv.appendChild(readResetBtn)

  deletBookbtn.addEventListener("click", function () {
    let bookId = cardDiv.getAttribute("data-id");

    // Remove from array
    myLibrary = myLibrary.filter((book) => book.id !== bookId);

    // Remove from DOM
    cardDiv.remove();
  });

  readResetBtn.addEventListener("click",function(){
      let bookIdd = cardDiv.getAttribute("data-id");
 // 1. find the book by id
  let book = myLibrary.find(b => b.id === bookIdd);
  // 2. toggle the read status
  if (book) {
    book.toggleReadStatus();
     // 3. update DOM text also
  
  p4.textContent =  `You have read this Book :    ` +book.read 
  }

  })
}
function createFormDialog() {
  dialog.appendChild(formcreate);

  formcreate.appendChild(inputTitle);
  formcreate.appendChild(inputAuthor);
  formcreate.appendChild(inputPages);

  formcreate.appendChild(checkDiv);
  checkDiv.appendChild(inputCheckBox);
  checkDiv.appendChild(labelCheckbox);
  formcreate.appendChild(submitBtn);

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

  
  // create book and push to array
  let newBook = new Book(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    inputCheckBox.checked
  );
  myLibrary.push(newBook);

  // use the same id when creating card
  createCard(
    newBook.title,
    newBook.author,
    newBook.pages,
    newBook.read,
    newBook.id
  );

  formcreate.reset(); // clear form after adding
  });
}

addBookToLibrary(
  "Journey to the Unknown",
  "Aria Moon",
  210,
  false

);

addBookToLibrary(
  "Whispers of the Forest",
  "Eldon Grey",
  145,
  true
);

addBookToLibrary(
  "Shadows of Tomorrow",
  "Luna Ray",
  398,
  false

);

addBookToLibrary(
  "Echoes of Eternity",
  "Kai Storm",
  520,
  true

);

addBookToLibrary(
  "Fragments of Reality",
  "Mira Solis",
  276,
  true

);

addBookToLibrary(
  "The Silent Horizon",
  "Orion Vale",
  189,
  false
);

addBookToLibrary(
  "Winds of Destiny",
  "Selene Dusk",
  334,
  true,
  crypto.randomUUID()
);

// "Show the dialog" button opens the dialog modally
  createFormDialog();
showButton.addEventListener("click", () => {
  dialog.showModal();

});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

const displayBook = function () {
  console.log("display on page");
  for (let book of myLibrary) {
    createCard(book.title, book.author, book.pages, book.read,book.id);
  }
  return cards;
};

displayBook();
