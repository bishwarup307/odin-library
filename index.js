const addBookBtn = document.querySelector("#add-new-book");
const modal = document.querySelector("#modal");
const bookGenre = document.querySelector("#book_genre");

const GENRES = [
    "Fantasy",
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
        rating,
        favorite = false,
        isRead = false
    ) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.pages = pages;
        this.genre = genre;
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

addBookBtn.addEventListener("click", () => {
    const options = document.createDocumentFragment();

    GENRES.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre.toLowerCase();
        option.textContent = genre;
        options.appendChild(option);
    });
    bookGenre.appendChild(options);

    modal.showModal();
});
