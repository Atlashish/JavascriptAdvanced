import '../css/styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../img/bookCartoon.png';
import _ from 'lodash';

// Selecting necessary elements from the DOM
const loader = document.querySelector(".loader");
const booksGrid = document.getElementById("booksGrid");
const falseBackgroundBooksGrid = document.getElementById("falseBackgroundMain");
const backgroundMain = document.getElementById("backgroundMain");
const resultsContainer = document.getElementById("results");

const bookDescriptionText = document.getElementById("bookDescriptionText");
const bookDescriptionModal = document.getElementById("bookDescriptionModal");
const closeModal = document.getElementById("closeModal");

const srcButton = document.getElementById("search-button");
const textbox = document.querySelector(".google-textbox");

const limit = 20; // Setting a limit for the number of books to display

// Function to search books based on a particular genre
function searchBooksByGenre(genre) {
    const apiUrl = `https://openlibrary.org/subjects/${genre}.json?limit=${limit}&details=true`;

    // Fetching data based on the genre
    fetch(apiUrl)
        .then((response) => {
            
            if (response.ok) {       
                // Displaying book grid and hiding unnecessary elements
                displayBookGrid();
                return response.json();
            } else {
                throw new Error("Error in the request.");
            }
        })
        .then((data) => {
            const works = _.get(data, 'works', []);

            if (works && works.length > 0) {
                resultsContainer.innerHTML = `<h2>Results for category '${genre}':</h2>`;

                // Looping through the retrieved book data
                works.forEach((work, index) => {
                    const title = _.get(work, 'title', '');
                const coverId = _.get(work, 'cover_id', '');
                const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
                const author = _.get(work, 'authors[0].name', '');
                const bookPlace = document.getElementById(`book${index + 1}`);
                bookPlace.style.background = "#d24f0d";
                bookPlace.classList.remove("transparent");

                    // Creating elements to display book details
                    const bookImage = document.createElement("img");
                    bookImage.classList.add("booksDesign");
                    bookImage.src = coverUrl;
                    bookImage.alt = title;

                    const bookTitle = document.createElement("h6");
                    bookTitle.textContent = `${title}`;
                    bookTitle.classList.add("titleBooksDesign");

                    const bookAuthor = document.createElement("p");
                    bookAuthor.textContent = `${author}`;
                    bookAuthor.classList.add("authorBooksDesign");

                    // Appending book details to the book grid
                    bookPlace.appendChild(bookTitle);
                    bookPlace.appendChild(bookImage);
                    bookPlace.appendChild(bookAuthor);

                    // Adding event listener to show book description on click
                    bookImage.addEventListener("click", () => {
                        getBookDescription(_.get(work, 'key', ''));
                    })
                });
            } else {
                // Displaying a message for no results and resetting UI elements
                failedResults(genre);    
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

// Function to display the book grid
function displayBookGrid(){
    loader.style.display = "none";
    booksGrid.style.display = "block";
    falseBackgroundBooksGrid.style.display = "none";
    backgroundMain.removeAttribute("background-color");
    backgroundMain.style.background = "linear-gradient(180deg, #A7D397 0%, #216807 100%)";
}

// Function to display a message for no results and resetting UI elements
function failedResults(genre){
    resultsContainer.innerHTML = `<h2>No results for '${genre}':</h2>`;
    falseBackgroundBooksGrid.style.display = "block";
    backgroundMain.style.background = null;
    backgroundMain.style.backgroundColor = "#A7D397";
}



// Function to get the description of a specific book
function getBookDescription(bookKey) {
    const apiUrl = `https://openlibrary.org${bookKey}.json`;

    // Show the loader before starting the request
    showLoader2(); 

    // Fetching book details based on the key
    fetch(apiUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error in the request.");
            }
        })
        .then((data) => {
            // Extracting book description and displaying it in the modal
            const descriptionBook = data.description;
            let description = "";
            if (typeof descriptionBook === 'object') {
                description = descriptionBook.value || "No description available";
            } else if (typeof descriptionBook === 'string') {
                description = descriptionBook;
            } else {
                description = "No description available";
            }
            bookDescriptionText.innerHTML = `<h3>Description</h3> ${description}`;
            bookDescriptionModal.style.display = "block";
            hideLoader2();
        })
}

// Event listener to close the book description modal
closeModal.addEventListener("click", () => {
    bookDescriptionModal.style.display = "none";
});


// Function to show the loader and disable user interaction
function showLoader2() {
    const loader = document.getElementById('loader2');
    loader.style.display = 'block';
    disableUserInteraction(true);
  }
  
  // Function to hide the loader and re-enable user interaction
  function hideLoader2() {
    const loader = document.getElementById('loader2');
    loader.style.display = 'none';
    disableUserInteraction(false);
  }
  
  // Function to disable/enable user interaction with the page
  function disableUserInteraction(disable) {
    const body = document.querySelector('body');
    body.style.pointerEvents = disable ? 'none' : 'auto';
  }




// Event listener to perform a book search based on the genre
srcButton.addEventListener("click", () => {
        for (let i = 1; i <= limit; i++) {
            const bookPlace = document.getElementById(`book${i}`);
            bookPlace.textContent = null;
            bookPlace.style.background = null;
            bookPlace.classList.add("transparent");
        }   
        if (search.value !== "") {
            toggleBooks();
    } else {
        textbox.style.border = "2px solid red";
    }
});


function toggleBooks(){
    loader.style.display = "block";
            textbox.style.border = null;
            backgroundMain.style.background = null;
            backgroundMain.style.backgroundColor = "#A7D397";
            falseBackgroundBooksGrid.style.display = "block";
            booksGrid.style.display = "none";
            resultsContainer.innerHTML = "";
            const genre = search.value.toLowerCase();
            search.value = "";
            searchBooksByGenre(genre);
}



