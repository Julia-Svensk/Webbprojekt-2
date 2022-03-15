// Alla html taggar
const card = document.querySelector('.card');
const cardContainer = document.querySelector('.card-container');
const yesButton = document.querySelector('.option.true');
const noButton = document.querySelector('.option.false');

const catImg = document.querySelector('.cat-img');
const catName = document.querySelector('.cat-name');
const catLabel = document.querySelector('.cat-label');
const catNr = document.querySelector('.cat-nr');
const restart = document.querySelector('.restart');

// Variabler för bästa katt
let startTime;
let bestTime = 0;
let catAmount = 0;
let bestCat;
let bestCatName;
let namn;

// Hämtar kattbild-funktion
function getCat() {
  
    // Visar den vinnande katten
    if (catAmount == 3) {
        catImg.src = bestCat;
        catName.innerText = 'Din match är ' + bestCatName + '!';

        yesButton.classList.add('hidden');
        noButton.classList.add('hidden');
        catLabel.classList.add('hidden');
        restart.classList.add('shown');

        setTimeout(function () {
            card.classList.remove('up');
            confetti.start();
        }, 1800);
        return;
    }
    
    // Steg: 1.1 - Hämta en kattbild med fetch
    // Tips! Bara gifs: https://api.thecatapi.com/v1/images/search?mime_types=gif
    fetch('https://api.thecatapi.com/v1/images/search')
        .then((res) => res.json())
        .then((data) => {
            // Dessa undre två rader är de enda som behövs för Steg 1.1
            // Glöm inte Steg 1.2 - kalla funktionen! (Steg 2 finns i styles.css)
            var imageUrl = data[0].url;
            catImg.src = imageUrl;
            
            // Steg 11: Starta tidtagaruret!
            startTime = Date.now();
            
            // Steg 3: Vänta 1.4s och ta bort klassen up för att få ned kortet igen
            setTimeout(function () {
                card.classList.remove('up');
            }, 1400);
        });
    
    // EXTRA 1: Ge katterna ett namn!
    fetch('https://namey.muffinlabs.com/name.json')
        .then((res) => res.json())
        .then((data) => {
            namn = data[0];
            catName.innerText = namn;
        });
}

// Steg 1.2
getCat();

// Steg 9: skapa ett nytt kattkort
function newCard() {
    setTimeout(function () {
        card.classList = 'card up';
        getCat();
    }, 800);
}

/////////////////////////
// EVENT LISTENERS
////////////////////////

// Steg 4: Lägg till/ta bort klasser när man har musen över knapparna
// (Steg 5 finns i styles.css)
yesButton.addEventListener('mouseover', function () {
    card.classList.add('right');
});

yesButton.addEventListener('mouseleave', function () {
    card.classList.remove('right');
});

noButton.addEventListener('mouseover', function () {
    card.classList.add('left');
});

noButton.addEventListener('mouseleave', function () {
    card.classList.remove('left');
});

// Steg 6: Lägg till klass vid knapptryck
// (Steg 7 finns i style.css)
noButton.addEventListener('click', function () {
    // Steg 6.1
    card.classList.add('out-left');
    
    // Steg 8 - Generera ett nytt kort (OBS! Se även yesButton steg 8)
    newCard();
});

yesButton.addEventListener('click', function () {
    // Steg 6.2
    card.classList.add('out-right');
    
    // Steg 12: Se hur lång tid det tog att klicka ja
    let timeTaken = Date.now() - startTime;
    if (timeTaken > bestTime) {
        bestTime = timeTaken;
        bestCat = catImg.src;
        bestCatName = namn;
    }
  
    // Steg 13: Håll koll på antalet godkända katter och uppdatera texten
    catAmount += 1;
    catNr.innerText = 3 - catAmount;
  
    // Steg 8 - Generera ett nytt kort
    newCard();
});


