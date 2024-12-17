// toggle the hamburger
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
});

// close the menu by clicking away from it
document.addEventListener('click', (event) => {
    const isClickInNav = nav.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInNav && !isClickOnHamburger) {
        nav.classList.remove('open');
    }
});


// Grab Data from the JSON File - Journal Entries
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("entries-container"); // make sure we target the id on features.html
    if (container) {
        console.log("Entries container found!");
        fetch("jake-journal-entries.json")
            .then((response) => response.json())
            .then((entries) => {
                // Let's loop through entries 
                entries.forEach((entry) => {
                    const gridItem = document.createElement("div");
                    gridItem.classList.add("grid-item");
                    // Add content to the grid
                    gridItem.innerHTML = `
                        <img src="${entry.preview}" alt="${entry.title}">
                        <h3>${entry.title}</h3>
                        <p>${entry.hashtags.map((tag) => `${tag}`).join(" ")}</p>
                        <p>${entry.excerpt}</p>
                        <button class="simulate-button" data-title="${entry.title}">
                            Simulate Post
                        </button>
                    `;
                    container.appendChild(gridItem);
                });
            })
            .catch((error) => console.error("Error fetching JSON:", error));
    } else {
        console.log("Entries container not found on this page.");
    }  
});



// FOOTER: Year & Last Modified Date
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = lastModified;