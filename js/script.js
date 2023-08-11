const data = [{
        name: "John Doe",
        age: 25,
        location: "New York"
    },

    {
        name: "John Doe",
        age: 25,
        location: "New York"
    },


    {
        name: "John Doe",
        age: 25,
        location: "New York"
    },


    {
        name: "John Doe",
        age: 25,
        location: "New York"
    },

    {
        name: "John Doe",
        age: 25,
        location: "New York"
    },

    {
        name: "John Doe",
        age: 25,
        location: "New York"
    },

    {
        name: "John Doe",
        age: 25,
        location: "New York"
    },

    {
        name: "John Doe",
        age: 25,
        location: "New York"
    }, {
        name: "John Doe",
        age: 25,
        location: "New York"
    },

    {
        name: "John Doe",
        age: 25,
        location: "New York"
    },

];

const searchInput = document.getElementById("search-input");
const entriesPerPageSelect = document.getElementById("entries-per-page");
const tableBody = document.querySelector("#custom-table tbody");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");
const pageNumbersContainer = document.getElementById("page-numbers");

let itemsPerPage = parseInt(entriesPerPageSelect.value, 10);
let currentPage = 1;
let totalPages = Math.ceil(data.length / itemsPerPage);
let filteredData = data;

function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToRender = filteredData.slice(startIndex, endIndex);

    tableBody.innerHTML = "";

    itemsToRender.forEach(item => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        const ageCell = document.createElement("td");
        ageCell.textContent = item.age;

        const locationCell = document.createElement("td");
        locationCell.textContent = item.location;

        row.appendChild(nameCell);
        row.appendChild(ageCell);
        row.appendChild(locationCell);

        tableBody.appendChild(row);
    });
}

function updatePaginationButtons() {
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
}

function renderPageNumbers() {
    pageNumbersContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement("span");
        pageNumber.textContent = i;
        pageNumber.classList.add("page-number");
        pageNumber.addEventListener("click", () => {
            currentPage = i;
            renderTable();
            updatePaginationButtons();
            renderPageNumbers();
        });
        pageNumbersContainer.appendChild(pageNumber);
    }
}

// Search input event listener
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchText) ||
        item.location.toLowerCase().includes(searchText)
    );

    // Reset page number when performing a search
    currentPage = 1;
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    renderTable();
    updatePaginationButtons();
    renderPageNumbers();
});

// Entries per page change event listener
entriesPerPageSelect.addEventListener("change", () => {
    itemsPerPage = parseInt(entriesPerPageSelect.value, 10);
    currentPage = 1; // Reset page number when changing entries per page
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    renderTable();
    updatePaginationButtons();
    renderPageNumbers();
});

// Pagination event listeners
prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
        updatePaginationButtons();
        renderPageNumbers();
    }
});

nextPageButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
        updatePaginationButtons();
        renderPageNumbers();
    }
});

// Initial rendering
renderTable();
updatePaginationButtons();
renderPageNumbers();