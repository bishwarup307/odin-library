const addBookBtn = document.querySelector("#add-new-book");
const modal = document.querySelector("#modal");
const bookGenre = document.querySelector("#book_genre");
const addToLibraryBtn = document.querySelector("#btn-add-to-library");

const newBookForm = document.querySelector("#new-book-form");
const bookTitle = document.querySelector("#book_title");
const bookAuthor = document.querySelector("#book_author");
const bookNumPages = document.querySelector("#book_pages");
const bookDescription = document.querySelector("#book_description");
const bookCover = document.querySelector("#book_cover");

const bookTitleValidation = document.querySelector("#book_title+.validate");
const bookAuthorValidation = document.querySelector("#book_author+.validate");
const bookNumPagesValidation = document.querySelector("#book_pages+.validate");

const displayGrid = document.querySelector(".content-wrapper");

// let bookList;

const getLibrary = function () {
    return JSON.parse(localStorage.getItem("library") || "[]");
};

const GENRES = [
    "Fantasy",
    "Fiction",
    "Science Fiction",
    "Dystopian",
    "Action & Adventure",
    "Mystery",
    "Horror",
    "Thriller & Suspense",
    "Historical Fiction",
    "Romance",
    "Women’s Fiction",
    "LGBTQ+",
    "Contemporary Fiction",
    "Literary Fiction",
    "Magical Realism",
    "Graphic Novel",
    "Short Story",
    "Young Adult",
    "New Adult",
    "Children’s",
    "Memoir & Autobiography",
    "Biography",
    "Food & Drink",
    "Art & Photography",
    "Self-help",
    "History",
    "Travel",
    "True Crime",
    "Humor",
    "Essays",
    "Guide / How-to",
    "Religion & Spirituality",
    "Humanities & Social Sciences",
    "Parenting & Families",
    "Science & Technology",
    "Children’s",
];

class Book {
    constructor(
        title,
        author,
        description,
        pages,
        genre,
        cover,
        rating,
        favorite = false,
        isRead = false
    ) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.pages = pages;
        this.genre = genre;
        this.cover = cover;
        this.rating = rating;
        this.isRead = isRead;
        this.favorite = favorite;
        this.dateTimeAdded = new Date();
    }

    get descString() {
        return this.title + this.author + this.genre;
    }

    get dateAdded() {
        return (
            (this.dateTimeAdded.getDate() < 10 ? "0" : "") +
            this.dateTimeAdded.getDate() +
            "/" +
            (this.dateTimeAdded.getMonth() + 1 < 10 ? "0" : "") +
            (this.dateTimeAdded.getMonth() + 1) +
            "/" +
            this.dateTimeAdded.getFullYear()
        );
    }
}

const displayBook = function (book) {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("box");
    bookContainer.classList.add("flex-col");
    bookContainer.classList.add("gap1");

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("book-cover");
    imageDiv.classList.add("relative");
    const coverImage = document.createElement("img");
    coverImage.src = book.cover;
    imageDiv.appendChild(coverImage);

    const iconDiv = document.createElement("div");
    iconDiv.classList.add("action-icons");
    iconDiv.classList.add("flex");
    iconDiv.classList.add("absolute");

    const readIcon = document.createElement("div");
    readIcon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon icon-read"><title>eye-off</title><path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" /></svg>';
    iconDiv.appendChild(readIcon);

    const favoriteIcon = document.createElement("div");
    favoriteIcon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon icon-favorite"><title>heart-outline</title><path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" /></svg>';
    iconDiv.appendChild(favoriteIcon);

    const removeIcon = document.createElement("div");
    removeIcon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon icon-remove"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>';
    iconDiv.appendChild(removeIcon);

    imageDiv.appendChild(iconDiv);
    bookContainer.appendChild(imageDiv);

    const title = document.createElement("div");
    title.classList.add("book-title");
    title.textContent = book.title;
    bookContainer.appendChild(title);

    const author = document.createElement("div");
    author.classList.add("book-author");
    author.textContent = book.author;
    bookContainer.appendChild(author);

    displayGrid.appendChild(bookContainer);
};

const displayBooks = function () {
    let bookList = getLibrary();

    bookList.forEach((book) => {
        displayBook(book);
    });
};

addBookBtn.addEventListener("click", () => {
    const options = document.createDocumentFragment();

    GENRES.sort().forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre.toLowerCase();
        option.textContent = genre;
        options.appendChild(option);
    });
    bookGenre.appendChild(options);

    modal.showModal();
});

const validateForm = function () {
    if (!bookTitle.value) {
        bookTitleValidation.textContent = "Please enter a book title";
        bookTitle.focus();
        return false;
    } else bookTitleValidation.textContent = "";

    if (!bookAuthor.value) {
        bookAuthorValidation.textContent = "Please enter the book author(s)";
        bookAuthor.focus();
        return false;
    } else bookAuthorValidation.textContent = "";

    if (!bookNumPages.value || bookNumPages.value <= 0) {
        bookNumPagesValidation.textContent = "Please enter a valid number";
        bookNumPages.focus();
        return false;
    } else bookNumPagesValidation.textContent = "";

    return true;
};

addToLibraryBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (validateForm()) {
        let imageUrl;

        if (bookCover.files && bookCover.files[0]) {
            console.log("this goes first.");
            const fileReader = new FileReader();
            fileReader.readAsDataURL(bookCover.files[0]);
            fileReader.addEventListener("load", () => {
                imageUrl = fileReader.result;
                console.log(imageUrl);
            });
        }

        setTimeout(() => {
            const newBook = new Book(
                bookTitle.value,
                bookAuthor.value,
                bookDescription.value,
                bookNumPages.value,
                bookGenre.value,
                imageUrl
            );

            console.log(imageUrl);
            console.log(newBook);
            let bookList = getLibrary();
            bookList.push(newBook);
            localStorage.setItem("library", JSON.stringify(bookList));
            displayBook(newBook);
            modal.close();
            newBookForm.reset();
        }, 300);
    }
});

displayBooks();
