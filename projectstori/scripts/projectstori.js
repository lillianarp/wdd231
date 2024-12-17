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

let entries = [];

// Grab Data from the JSON File - Journal Entries
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("entries-container"); // make sure we target the id on features.html
    if (container) {
        console.log("Entries container found!");
        fetch("jake-journal-entries.json")
            .then((response) => response.json())
            .then((data) => {
                entries = data;
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
                            Generate Content
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

// fun with modals 
console.log(entries);

const modal = document.getElementById("modal");
const modalDialogue = document.getElementById("modal-dialogue");
const modalButtons = document.getElementById("modal-buttons");

// even listener for the 'Generate Content' click
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("simulate-button")) {
        const title = event.target.getAttribute("data-title");
        const entry = entries.find(e => e.title === title);

        if (entry) {
            modal.showModal();

            if (entry.private) {
                modalDialogue.innerHTML = `<p>You've chosen to keep this post private.</p>`;
                modalButtons.innerHTML = `<button class="close-modal-btn">Close</button>`;
            } else {
                // fake AI dialogue for public posts
                modalDialogue.innerHTML = `
                    <p>This journal entry would make a great social media post. Would you like me to generate a script?</p>
                `;
                modalButtons.innerHTML = `
                    <button id="wing-it-btn">No thank you, I'll wing it.</button>
                    <button id="generate-btn">Yes, please!</button>
                `;

                // button listeners for user response
                document.getElementById("wing-it-btn").addEventListener("click", () => {
                    modalDialogue.innerHTML = `<p>Great! Click below to start recording your voiceover.</p>`;
                    modalButtons.innerHTML = `<button class="record-btn close-modal-btn">Record Your Voiceover</button>`;
                });

                document.getElementById("generate-btn").addEventListener("click", () => {
                    modalDialogue.innerHTML = `
                        <p>Here's a quick 15-second script:</p>
                        <p>"${entry['content-script']}"</p>
                        <p>Close this screen and use your editor to tweak the script!</p>
                    `;
                    modalButtons.innerHTML = `<button class="close-modal-btn">Close</button>`;
                });
            }
        }
    }

    // listen to close the modal
    if (
        event.target.classList.contains("close-modal") ||
        event.target.classList.contains("close-modal-btn")
    ) {
        modal.close();
    }
});


// FOOTER: Year & Last Modified Date
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = lastModified;