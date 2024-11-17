
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = lastModified;

// Business members data (JSON)

document.addEventListener('DOMContentLoaded', () => {
    const memberCards = document.getElementById('member-cards');

    fetch('data/members.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(member => {
                const card = document.createElement('div')
                card.classList.add('card');

                card.innerHTML = `
                    <img src="${member.image}" alt="${member.name} Logo">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.url}" target="_blank">Website</a>
                    <p>Membership Level: ${member.level}</p>
                `;

                memberCards.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching members:', error);
        });
    });
