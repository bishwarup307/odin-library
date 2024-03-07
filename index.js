const addBookBtn = document.querySelector("#add-new-book");
const modal = document.querySelector("#modal");
const ribbonSvg = document.querySelector("#book_genre");
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

const searchInput = document.querySelector("#search-input");
const performSearch = document.querySelector("#search-submit");

// let bookList;

const getLibrary = function () {
    let library;
    const bookList = JSON.parse(localStorage.getItem("library"));

    if (bookList) {
        library = bookList.map(
            (bookPlainObject) =>
                new Book(
                    bookPlainObject.title,
                    bookPlainObject.author,
                    bookPlainObject.description,
                    bookPlainObject.pages,
                    bookPlainObject.genre,
                    bookPlainObject.cover,
                    bookPlainObject.rating,
                    bookPlainObject.favorite,
                    bookPlainObject.isRead
                )
        );
    } else library = [];
    return library;
};

const setLibrary = function (bookList, updateDisplay = true) {
    localStorage.setItem("library", JSON.stringify(bookList));
    if (updateDisplay) displayBooks();
};

const getRandomRating = function (min) {
    min = Math.ceil(min);
    let rating = Math.min(Math.random() * (5 - min + 1) + min, 5);
    rating = Math.round(rating * 10) / 10;
    return rating;
};

const capitalize = function (str) {
    return str.at(0).toUpperCase() + str.substring(1).toLowerCase();
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
    "Novel",
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

const HEART_OUTLINE =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon icon-favorite"><title>heart-outline</title><path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" /></svg>';

const HEART_FILLED =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon icon-favorite icon-favorite-checked"><title>heart</title><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>';

const BOOK_READING =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon icon-read"><title>book-open-page-variant</title><path d="M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z" /></svg>';

const BOOK_FINISHED =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.19 122.88" class="icon icon-read"><path d="M17.16 0h82.72a3.32 3.32 0 013.31 3.31v92.32c-.15 2.58-3.48 2.64-7.08 2.48H15.94c-4.98 0-9.05 4.07-9.05 9.05s4.07 9.05 9.05 9.05h80.17v-9.63h7.08v12.24c0 2.23-1.82 4.05-4.05 4.05H16.29C7.33 122.88 0 115.55 0 106.59V17.16C0 7.72 7.72 0 17.16 0zm3.19 13.4h2.86c1.46 0 2.66.97 2.66 2.15v67.47c0 1.18-1.2 2.15-2.66 2.15h-2.86c-1.46 0-2.66-.97-2.66-2.15V15.55c.01-1.19 1.2-2.15 2.66-2.15z" fill-rule="evenodd" clip-rule="evenodd"/></svg>';

const RIBBON =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 847 1058.75" class="ribbon"><path d="M62 318c0,0 -41,6 -41,34 0,29 0,177 0,177 0,0 5,-36 41,-36l763 0 -77 -91 77 -84 -763 0z"/></svg>';

// borrowed from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
String.prototype.hashCode = function () {
    var hash = 0,
        i,
        chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

const removeChildren = function (parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
};

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
        const dateTime = this.dateTimeAdded || JSON.parse(this.dateTimeAdded);
        console.log(dateTime);
        return (
            (dateTime.getDate() < 10 ? "0" : "") +
            dateTime.getDate() +
            "/" +
            (dateTime.getMonth() + 1 < 10 ? "0" : "") +
            (dateTime.getMonth() + 1) +
            "/" +
            dateTime.getFullYear()
        );
    }

    get hash() {
        return this.title.toLowerCase().hashCode();
    }

    get searchDescription() {
        return (
            this.title.toLowerCase() +
            " " +
            this.author.toLowerCase() +
            " " +
            this.genre.toLowerCase()
        );
    }
}

const displayBook = function (book) {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("box");
    bookContainer.classList.add("flex-col");
    bookContainer.classList.add("gap1");
    // bookContainer.classList.add("relative");

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("book-cover");
    imageDiv.classList.add("relative");
    if (book.isRead) imageDiv.classList.add("completed");
    imageDiv.id = book.hash;

    const coverImage = document.createElement("img");
    coverImage.src = book.cover;
    imageDiv.appendChild(coverImage);

    const iconDiv = document.createElement("div");
    iconDiv.classList.add("action-icons");
    iconDiv.classList.add("flex");
    iconDiv.classList.add("absolute");

    const readIcon = document.createElement("div");
    readIcon.classList.add("action-icon");
    readIcon.dataset.action = "read";
    readIcon.innerHTML = book.isRead ? BOOK_FINISHED : BOOK_READING;
    iconDiv.appendChild(readIcon);

    const favoriteIcon = document.createElement("div");
    favoriteIcon.classList.add("action-icon");
    favoriteIcon.dataset.action = "favorite";
    favoriteIcon.innerHTML = book.favorite ? HEART_FILLED : HEART_OUTLINE;
    iconDiv.appendChild(favoriteIcon);

    const removeIcon = document.createElement("div");
    removeIcon.classList.add("action-icon");
    removeIcon.dataset.action = "remove";
    removeIcon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon icon-remove"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>';
    iconDiv.appendChild(removeIcon);

    imageDiv.appendChild(iconDiv);
    bookContainer.appendChild(imageDiv);

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("flex-col");
    bookInfo.classList.add("book-info");
    bookInfo.classList.add("relative");

    const title = document.createElement("div");
    title.classList.add("book-title");
    title.textContent = book.title;
    bookInfo.appendChild(title);

    const author = document.createElement("a");
    author.classList.add("book-author");
    author.classList.add("relative");
    author.textContent = book.author;
    bookInfo.appendChild(author);

    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating-star");
    const rating = book.rating || 0;
    ratingDiv.style.setProperty("--rating", rating);
    ratingDiv.textContent = `(${rating})`;
    bookInfo.appendChild(ratingDiv);

    const otherInfo = document.createElement("div");
    otherInfo.classList.add("flex");
    otherInfo.classList.add("other-info");

    const pageInfo = document.createElement("p");
    pageInfo.classList.add("page-info");
    pageInfo.textContent = `${book.pages} pages`;
    otherInfo.appendChild(pageInfo);

    const dateInfo = document.createElement("p");
    dateInfo.textContent = `Added on ${book.dateAdded}`;
    otherInfo.appendChild(dateInfo);
    bookInfo.appendChild(otherInfo);

    const bookGenre = document.createElement("div");
    bookGenre.classList.add("book-genre");
    bookGenre.classList.add("absolute");

    const ribbonSvg = document.createElement("div");
    ribbonSvg.innerHTML = RIBBON;
    bookGenre.appendChild(ribbonSvg);
    const genreName = document.createElement("p");
    genreName.classList.add("absolute");
    genreName.textContent = book.genre.toUpperCase();
    bookGenre.appendChild(genreName);

    bookInfo.appendChild(bookGenre);
    bookContainer.appendChild(bookInfo);

    displayGrid.appendChild(bookContainer);
};

const displayBooks = function (searchText) {
    removeChildren(displayGrid);

    let bookList = getLibrary();

    if (searchText) {
        let regexp = new RegExp(searchText.toLowerCase(), "g");
        bookList = bookList.filter((book) =>
            book.searchDescription.match(regexp)
        );
    }

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
    ribbonSvg.appendChild(options);

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
                ribbonSvg.value,
                imageUrl,
                getRandomRating(3)
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

const actionIcons = document.querySelectorAll(".icon");

displayGrid.addEventListener("click", (event) => {
    target = event.target;
    if (target.closest(".action-icon")) {
        let bookId = target.closest(".book-cover").id;
        let actionType = target.closest(".action-icon").dataset.action;
        console.log(`${bookId} - ${actionType}`);

        let bookList = getLibrary();
        const bookIndex = bookList.findIndex(
            (book) => book.hash === Number(bookId)
        );

        if (bookIndex !== -1) {
            switch (actionType) {
                case "read":
                    bookList[bookIndex].isRead = !bookList[bookIndex].isRead;
                    break;

                case "favorite":
                    bookList[bookIndex].favorite =
                        !bookList[bookIndex].favorite;
                    break;

                case "remove":
                    const confirmation = confirm(
                        `Are you sure you want to delete ${bookList[bookIndex].title} from your library?`
                    );
                    if (confirmation) bookList.splice(bookIndex, 1);
                    break;
            }
        }

        setLibrary(bookList);
    }
});

performSearch.addEventListener("click", () => {
    const searchText = searchInput.value;
    displayBooks(searchText);
    // console.log(searchText);
});

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") performSearch.click();
});

const listedBooks = [
    {
        title: "Bad Blood",
        author: "John Carreyrou",
        description: "",
        pages: 290,
        genre: "Science & Technology",
        cover: "./assets/images/bad blood.webp",
        rating: 4.1,
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen, Anna Quindlen",
        description: "",
        pages: 187,
        genre: "Novel",
        cover: "./assets/images/pride-and-prejudice.jpeg",
        rating: 4.3,
    },
    {
        title: "Gone Girl",
        author: "Gillian Flynn",
        description: "",
        pages: 220,
        genre: "Thriller",
        cover: "./assets/images/Gone Girl book cover.webp",
        rating: 4.5,
    },
    {
        title: "A Brief History Of Time",
        author: "Stephen Hawking",
        description: "",
        pages: 310,
        genre: "Science Fiction",
        cover: "./assets/images/A Brief History of Time.webp",
        rating: 4.8,
    },
    {
        title: "White Noise",
        author: "Don DeLillo",
        description: "",
        pages: 267,
        genre: "Fiction",
        cover: "./assets/images/White Noise.webp",
        rating: 3.7,
    },
    {
        title: "The 5AM Club",
        author: "Robin Sharma",
        description: "",
        pages: 244,
        genre: "Self-help",
        cover: "./assets/images/5AM club.avif",
        rating: 4.2,
    },
    {
        title: "Can't Hurt Me",
        author: "David Goggins",
        description: "",
        pages: 287,
        genre: "Self-help",
        cover: "./assets/images/cant hurt me.avif",
        rating: 4.7,
    },
    {
        title: "Nineteen Eighty Four",
        author: "George Orwell",
        description: "",
        pages: 230,
        genre: "Science Fiction",
        cover: "./assets/images/1984.jpeg",
        rating: 4.3,
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description: "",
        pages: 198,
        genre: "Novel",
        cover: "./assets/images/To kill a mockingbird.jpeg",
        rating: 4.3,
    },
    {
        title: "The Fault in Our Stars",
        author: "John Green",
        description: "",
        pages: 313,
        genre: "Young Adult",
        cover: "./assets/images/The fault in our stars.jpeg",
        rating: 4.1,
    },
];

const myBooks = listedBooks.map(
    (book) =>
        new Book(
            book.title,
            book.author,
            book.description,
            book.pages,
            book.genre,
            book.cover,
            book.rating
        )
);
console.log(myBooks);
if (getLibrary().length === 0) setLibrary(myBooks);

displayBooks();
