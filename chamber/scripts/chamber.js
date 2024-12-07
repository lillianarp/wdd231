
// SITE NAV: toggle the hamburger
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
})

// Call weather info from Open Weather API

// We want the temperature - temperature.value &degF
// Or we could do - temperature.unit (and set 'metric' in the url)
// Partly Cloudy - clouds.value cloudiness
// High degree - temperature.max
// Low degree - temperature.min
// Humidity - humidity.value humidity.unit %
// Sunrise time - city.sun.rise 
// Sunset time - city.sun.set
// And we need this all at the coordinates for Timbuktu - 16.76669822228727, -3.003859808910824

// select HTML elements in the DOM
const weatherIcon = document.getElementById('weather-icon');
const currentTemp = document.getElementById('current-temp');
const weatherDesc = document.getElementById('weather-desc');
const maxTemp = document.getElementById('max-temp');
const minTemp = document.getElementById('min-temp');
const humidity = document.getElementById('humidity');
const sunRise = document.getElementById('sunrise-time');
const sunSet = document.getElementById('sunset-time');

// required variables
const myAppId = "9097c8722945438bff5d4b9377c57a6c"
const timbuktuLat = "16.76"
const timbuktuLong = "3.00"

const weatherURL = `//api.openweathermap.org/data/2.5/weather?lat=${timbuktuLat}&lon=${timbuktuLong}&appid=${myAppId}&units=metric`

// time to fetch the current weather 
async function apiFetch() {
    try {
      const response = await fetch(weatherURL);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        displayResults(data); 
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  

// display all this on index.html
function displayResults(data) {
    console.log('hello!')
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherIcon.setAttribute('SRC', iconsrc)
    weatherIcon.setAttribute('alt', data.weather[0].description)
    currentTemp.innerHTML = `${data.main.temp}&deg;C`
    
    // deal with the lower case description
    function toTitleCase(str) {
        return str
            .split(' ') 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' '); 
    }
    const titleCaseDescription = toTitleCase(data.weather[0].description);
    weatherDesc.innerHTML = titleCaseDescription
    maxTemp.innerHTML = `High: ${data.main.temp_max}&deg;` 
    minTemp.innerHTML = `Low: ${data.main.temp_min}&deg;` 
    minTemp.innerHTML = `Humidity: ${data.main.humidity}%`

    // deal with the timestamp conversion
    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset * 1000);
    const sunriseFormatted = sunriseTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const sunsetFormatted = sunsetTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    sunRise.innerHTML = `Sunrise: ${sunriseFormatted}` 
    sunSet.innerHTML = `Sunrise: ${sunsetFormatted}` 
}

apiFetch();


// LOAD Business members data (from JSON file)
document.addEventListener('DOMContentLoaded', () => {
    const url = 'data/members.json';
    const cardsContainer = document.getElementById('cards-container');
    const gridButton = document.getElementById('toggle-grid'); 
    const listButton = document.getElementById('toggle-list');
    const spotlightContainer = document.querySelector('.spotlight-cards');
    let membersData = [];
    
    async function getMemberData() {
            const response = await fetch(url);
            const data = await response.json();
            membersData = data.members;

            // to display members in directory.html
            if (cardsContainer) {
                displayMembers(membersData, 'grid');
            }
            
            // to display business cards in index.html
            if (spotlightContainer) {
                displaySpotlightMembers(membersData);
            }
        }   

    // instructions for directory.html member card grid    
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

    // instructions for index.html spotlight cards grid  
    const displaySpotlightMembers = (members) => {
        spotlightContainer.innterHTML = ''; // clear the space 

        // filter for gold and silver level members
        const filteredMembers = members.filter(member => member.level === 1 || member.level === 2);

        // randomly select 2 or 3 members 
        const randomMembers = getRandomSubset(filteredMembers, 3); 

        // populate spotlight cards
        randomMembers.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('scard');

            card.innerHTML = `
                <div class="scard-title">
                    <h4>${member.name}</h4>
                    <p class="tagline">Business Tag Line</p>
                </div> 
                <div class="scard-content">
                    <div>
                        <img src="${member.image}" alt="Logo for ${member.name}" loading="lazy" width="100" height="100"> 
                    </div>
                    <div>
                        <p><strong>ADDRESS:</strong> ${member.address}</p>
                        <p><strong>PHONE:</strong> ${member.phone}</p>
                        <p><strong>URL:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
                    </div>
                </div>
            `;

            spotlightContainer.appendChild(card);
        });
    };

    // helper function to get a random subset
    function getRandomSubset(array, num) {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }


    // toggle the grid/list views in directory.html
    if (gridButton && listButton) {
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
    }

    getMemberData();

});

// FOOTER: Year & Last Modified Date
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = lastModified;
