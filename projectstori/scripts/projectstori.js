import { populateFormSummary } from './populateSummary.mjs';

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("form-summary")) {
        populateFormSummary();
    }

    // toggle the hamburger menu
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('open');
            console.log("Menu toggled:", nav.classList.contains("open"));
        });

        // close the menu by clicking away from it
        document.addEventListener('click', (event) => {
            const isClickInNav = nav.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInNav && !isClickOnHamburger) {
                nav.classList.remove('open');
            }
        });
        nav.addEventListener('click', (event) => {
            event.stopPropagation(); // prevent click bubbling 
        });
    } else {
        console.error("Hamburger menu not found. Where is it?");
    }

    // listen for form submission
    const form = document.querySelector(".feedback-form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = {};
            const formElements = form.elements;

            for (let element of formElements) {
                if (element.name && element.value) {
                    formData[element.name] = element.value;
                }
            }

            // add timestamp
            formData.timestamp = new Date().toLocaleString();

            // store in localStorage
            localStorage.setItem("feedbackData", JSON.stringify(formData));

            // redirect to thankyou.html
            window.location.href = "thankyou.html";
        });
    }
});



// Simulate Jake's journal 
let entries = [];

// grab Data from the JSON File - Journal Entries
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("entries-container");
    if (container) {
        const url = "jake-journal-entries.json";
        entries = await fetchJournalEntries(url); // already declared above
        displayJournalEntries(entries, container);
    }
});

async function fetchJournalEntries(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching JSON:", error);
        return [];
    }
}

function displayJournalEntries(entries, container) {
    entries.forEach(entry => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.innerHTML = `
            <img src="${entry.preview}" alt="${entry.title}" width="300" height="200" loading="lazy">
            <h3>${entry.title}</h3>
            <p>${entry.hashtags.map(tag => `${tag}`).join(" ")}</p>
            <p>${entry.excerpt}</p>
            <button class="simulate-button" data-title="${entry.title}">Generate Content</button>
        `;
        container.appendChild(gridItem);
    });
}


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
                modalDialogue.innerHTML = `<p>You've chosen to keep this post private.</p> <p>If you would like to share this post on social media, please go back and change its privacy settings.</p>`;
                modalButtons.innerHTML = `<button class="close-modal-btn">Close</button>`;
            } else {
                // fake AI dialogue for public posts
                modalDialogue.innerHTML = `
                    <p>This journal entry would make a great social media post.</p> 
                    <p>Would you like me to generate a script?</p>
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
                        <div id="modal-actions">
                            <button class="record-btn close-modal-btn">Record Your Voiceover</button>
                        </div>
                        <p>Or close this screen and use your editor to tweak the script!</p>
                    `;

                    // Clear modalButtons (optional)
                    modalButtons.innerHTML = ``;
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

// also close modal by clicking outside the modal-content
if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
} else {
    console.warn("No modal found on this page. Skipping modal logic.");
}



// FOOTER: Year & Last Modified Date
function updateFooter() {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = lastModified;
}
updateFooter();