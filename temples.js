console.log("JavaScript file is linked and running.");

// Copyright and Last Modified dates

const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear; 

const lastModified = document.lastModified; 
document.getElementById("modifiedDate").textContent = lastModified;

// Responsive Menu

const mainnav = document.querySelector('nav'); 
const hambutton = document.querySelector('#menuburger');
const headerTitle = document.querySelector('header h1');


// Add a click event listener to the hamburger
hambutton.addEventListener('click', () => {

    mainnav.classList.toggle('show'); 
    hambutton.classList.toggle('show'); 
    console.log('Menu toggled'); // Debugging to check if the click event works

    // Hide or show the header title based on menu state
    // if (mainnav.classList.contains('show')) {
    //     headerTitle.style.display = 'none'; // Hide the title when menu is shown
    // } else {
    //     headerTitle.style.display = 'block'; // Show title when menu is hidden
    // }

});

// Connect Menu Links to PageTitle

const menuLinks = document.querySelectorAll('.navigation a');
const pageTitle = document.querySelector('h2'); 

menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent page reload
        
        // Remove 'active' class from all links
        menuLinks.forEach(link => link.classList.remove('active'));

        // Add 'active' class to the clicked link
        event.target.classList.add('active');

        // Update the page title to the clicked link's data-title
        const newTitle = event.target.getAttribute('data-title');
        pageTitle.textContent = `${newTitle}`;
    });
});