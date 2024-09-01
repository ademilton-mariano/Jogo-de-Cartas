const deckElement = document.getElementById('deck');
const shuffleButton = document.getElementById('shuffle');

const images = [
    "Memes/acholote.jpg",
    "Memes/acholote.jpg",
    "Memes/akemi.jpg",
    "Memes/akemi.jpg",
    "Memes/arraia.jpg",
    "Memes/arraia.jpg",
    "Memes/kemi.jpg",
    "Memes/kemi.jpg",
    "Memes/luci.jpg",
    "Memes/luci.jpg",
    "Memes/lucifer.jpg",
    "Memes/lucifer.jpg",
    "Memes/mel.jpg",
    "Memes/mel.jpg",
    "Memes/melCachorra.jpg",
    "Memes/melCachorra.jpg",
    "Memes/pacoca.jpg",
    "Memes/pacoca.jpg",
    "Memes/programador.jpg",
    "Memes/programador.jpg",
    "Memes/tartaruga.jpg",
    "Memes/tartaruga.jpg",
    "Memes/tubarao.jpg",
    "Memes/tubarao.jpg",
];

let shuffledImages = [...images];
let flippedCards = [];
let lockBoard = false;

function createDeck() {
    deckElement.innerHTML = '';
    shuffledImages.forEach(() => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        cardElement.appendChild(cardInner);
        cardElement.addEventListener('click', () => flipCard(cardElement));
        deckElement.appendChild(cardElement);
    });
}

function flipCard(cardElement) {
    if (lockBoard) return;  // Evita que mais cartas sejam viradas enquanto as outras estão sendo verificadas

    const cardIndex = Array.from(deckElement.children).indexOf(cardElement);
    const cardInner = cardElement.querySelector('.card-inner');

    if (cardElement.classList.contains('flipped')) return;  // Impede de virar a mesma carta novamente

    cardInner.style.backgroundImage = `url(${shuffledImages[cardIndex]})`;
    cardElement.classList.add('flipped');
    
    flippedCards.push(cardElement);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    lockBoard = true;
    const [firstCard, secondCard] = flippedCards;
    const firstImage = firstCard.querySelector('.card-inner').style.backgroundImage;
    const secondImage = secondCard.querySelector('.card-inner').style.backgroundImage;

    if (firstImage === secondImage) {
        resetFlippedCards();  // As cartas combinam, manter viradas
    } else {
        setTimeout(() => {
            unflipCards();  // As cartas não combinam, desvirar
        }, 1000);  // Tempo de espera para mostrar as cartas antes de desvirá-las
    }
}

function unflipCards() {
    flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.querySelector('.card-inner').style.backgroundImage = '';
    });
    resetFlippedCards();
}

function resetFlippedCards() {
    flippedCards = [];
    lockBoard = false;
}

function shuffleImages() {
    for (let i = shuffledImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
    }
    resetDeck();
}

function resetDeck() {
    deckElement.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped');
        card.querySelector('.card-inner').style.backgroundImage = '';
    });
    resetFlippedCards();
}

shuffleButton.addEventListener('click', shuffleImages);

createDeck();
