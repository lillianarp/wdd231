
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = lastModified;


// Business members data (JSON)
document.addEventListener('DOMContentLoaded', () => {
    const url = 'data/members.json';
    const memberCards = document.getElementById('member-cards');
    
    async function getMemberData() {
            const response = await fetch(url);
            const data = await response.json();
            // console.table(data.members);
            displayMembers(data.members);
        }   

    getMemberData();

    const displayMembers = (members) => {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';

        members.forEach((member) => {
            let card = document.createElement('div');
            card.classList.add('member-card');
            let businessName = document.createElement('h3');
            let address = document.createElement('p');
            let phone = document.createElement('p');
            let url = document.createElement('a');
            let image = document.createElement('img');

            
            image.setAttribute('src', member.image);
            image.setAttribute('alt', `Logo of ${member.name}`);
            image.setAttribute('loading', 'lazy');
            businessName.textContent = member.name;
            address.textContent = `Address: ${member.address}`;
            phone.textContent = `Phone: ${member.phone}`;
            url.setAttribute('href', member.url); 
            url.textContent = "Visit Website"; 
            url.setAttribute('target', '_blank'); 

            card.appendChild(image);
            card.appendChild(businessName);
            card.appendChild(address);
            card.appendChild(phone);
            card.appendChild(url);
            
            cardsContainer.appendChild(card);

        });
    }

    getMemberData();

});
