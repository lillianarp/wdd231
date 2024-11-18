
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = lastModified;


// Business members data (JSON)
document.addEventListener('DOMContentLoaded', () => {
    const url = 'data/members.json';
    const cardsContainer = document.getElementById('cards-container');
    const gridButton = document.getElementById('toggle-grid'); 
    const listButton = document.getElementById('toggle-list');
    let membersData = [];
    
    async function getMemberData() {
            const response = await fetch(url);
            const data = await response.json();
            // console.table(data.members);
            membersData = data.members;
            displayMembers(membersData, 'grid');
        }   

    const displayMembers = (members, layout = 'grid') => {
        cardsContainer.innerHTML = '';

        members.forEach((member) => {
            if (layout === 'grid') {
                let card = document.createElement('div');
                card.classList.add('member-card');
                let businessName = document.createElement('h3');
                let address = document.createElement('p');
                let phone = document.createElement('p');
                let url = document.createElement('a');
                let level = document.createElement('p');
                    let membershipLevel;
                        if (member.level === 1) {
                            membershipLevel = "Gold";
                        } else if (member.level === 2) {
                            membershipLevel = "Silver";
                        } else if (member.level === 3) {
                            membershipLevel = "Bronze";
                        } else {
                            membershipLevel = "Unknown"; 
                        }
                let image = document.createElement('img');
                image.setAttribute('src', member.image);
                image.setAttribute('alt', `Logo of ${member.name}`);
                image.setAttribute('loading', 'lazy');
                image.setAttribute('width', '100');
                image.setAttribute('height', '100');
                businessName.textContent = member.name;
                address.textContent = `Address: ${member.address}`;
                phone.textContent = `Phone: ${member.phone}`;
                url.setAttribute('href', member.url); 
                url.textContent = "Visit Website"; 
                url.setAttribute('target', '_blank');
                level.textContent = `Membership Level: ${membershipLevel}`;
                level.classList.add('membership-level'); 

                card.appendChild(image);
                card.appendChild(businessName);
                card.appendChild(address);
                card.appendChild(phone);
                card.appendChild(url);
                card.appendChild(level);
                
                cardsContainer.appendChild(card);
                

            } else if (layout === 'list') {
                let listItem = document.createElement('div');
                listItem.classList.add('list-item');
                let membershipLevel;
                    if (member.level === 1) {
                        membershipLevel = "Gold";
                    } else if (member.level === 2) {
                        membershipLevel = "Silver";
                    } else if (member.level === 3) {
                        membershipLevel = "Bronze";
                    } else {
                        membershipLevel = "Unknown"; 
                    }
                listItem.textContent = `${member.name} - ${member.address} - ${member.phone} - Membership Level: ${membershipLevel} | `;
                
                let link = document.createElement('a');
                link.setAttribute('href', member.url);
                link.textContent = " Visit Website";
                link.setAttribute('target', '_blank');
                listItem.appendChild(link);

                cardsContainer.appendChild(listItem);
            } 
            
        });
    };

    // toggle the views
    gridButton.addEventListener('click', () => {
        cardsContainer.classList.remove('toggle-list');
        cardsContainer.classList.add('toggle-grid');
        displayMembers(membersData, 'grid'); 

    });

    listButton.addEventListener('click', () => {
        cardsContainer.classList.remove('toggle-grid');
        cardsContainer.classList.add('toggle-list');
        displayMembers(membersData, 'list');
    });

    getMemberData();

});

// toggle the hamburger
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
})

