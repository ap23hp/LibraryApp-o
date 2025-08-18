const myLibrary = [];
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

function Book(title, author, pages, read, id) {
  // the constructor...
  this.title = title; //this.title, this.author, this.pages, this.read → properties of each book.
  //function inside each book object that returns a nicely formatted string.
  this.author = author;
  this.pages = pages;
  this.read = true;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(...arg) {
  // take params, create a book then store it in the array
  let book = new Book(...arg);
  myLibrary.push(book);
  console.log(book.id, "id");
  return myLibrary;
}
function createCard(title, author, pages, read) {
    const cardDiv = document.createElement("div");
cardDiv.classList.add("card");
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

  cardDiv.appendChild(p1);
  cardDiv.appendChild(p2);
  cardDiv.appendChild(p3);
  cardDiv.appendChild(p4);
  cardDiv.appendChild(deletBookbtn);

  deletBookbtn.addEventListener("click", function () {
   myLibrary.filter(function(ele){
return ele.id
   })
  });
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
    console.log("Form submitted:", {
      title: inputTitle.value,
      author: inputAuthor.value,
      pages: inputPages.value,
      isRead: inputCheckBox.checked,
    });
    createCard(
      inputTitle.value,
      inputAuthor.value,
      inputPages.value,
      inputCheckBox.checked
    );
  });
}

addBookToLibrary(
  "Journey to the Unknown",
  "Aria Moon",
  210,
  false,
  crypto.randomUUID()
);

addBookToLibrary(
  "Whispers of the Forest",
  "Eldon Grey",
  145,
  true,
  crypto.randomUUID()
);

addBookToLibrary(
  "Shadows of Tomorrow",
  "Luna Ray",
  398,
  false,
  crypto.randomUUID()
);

addBookToLibrary(
  "Echoes of Eternity",
  "Kai Storm",
  520,
  true,
  crypto.randomUUID()
);

addBookToLibrary(
  "Fragments of Reality",
  "Mira Solis",
  276,
  true,
  crypto.randomUUID()
);

addBookToLibrary(
  "The Silent Horizon",
  "Orion Vale",
  189,
  false,
  crypto.randomUUID()
);

addBookToLibrary(
  "Winds of Destiny",
  "Selene Dusk",
  334,
  true,
  crypto.randomUUID()
);

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
  createFormDialog();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

const displayBook = function () {
  console.log("display on page");
  for (let book of myLibrary) {
    createCard(book.title, book.author, book.pages, book.read);
  }
  return cards
};

displayBook();
