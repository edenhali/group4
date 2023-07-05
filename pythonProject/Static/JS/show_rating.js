const clickedCloth = JSON.parse(localStorage.getItem('clickedCloth'));
const imgElement = document.querySelector('img');
const requestItemBtn = document.getElementById('requestItemBtn');
const backBtn = document.getElementById('backBtn');
const formContainer = document.querySelector('.formContainer');

function Cloth(id, type, color, fabric, size, style, occasion, image, status) {
    this.id = id;
    this.type = type;
    this.color = color;
    this.fabric = fabric;
    this.size = size;
    this.style = style;
    this.occasion = occasion;
    this.image = image;
    this.status = status;
    this.cleanliness = 0;
    this.quality = 0;
    this.reliability = 0;
    this.averageRate = 0;
}


const cloth1 = new Cloth('1', 'dress', 'blue', 'Silk', 'S', 'formal', 'rent', '../photosFolder/dress1.jpeg', 'active');
cloth1.cleanliness = 4;
cloth1.quality = 3;
cloth1.reliability = 5;
cloth1.averageRate = (cloth1.cleanliness + cloth1.quality + cloth1.reliability) / 3;

const cloth2 = new Cloth('2', 'dress', 'blue', 'cotton', 'XS', 'romantic', 'taking', '../photosFolder/dress2.jpeg', 'active');
cloth2.cleanliness = 3;
cloth2.quality = 4;
cloth2.reliability = 2;
cloth2.averageRate = (cloth2.cleanliness + cloth2.quality + cloth2.reliability) / 3;

const cloth3 = new Cloth('3', 'formal suit', 'black', 'Polyester', 'XS', 'romantic', 'taking', '../photosFolder/suit1.jpeg', 'active');
cloth3.cleanliness = 5;
cloth3.quality = 5;
cloth3.reliability = 4;
cloth3.averageRate = (cloth3.cleanliness + cloth3.quality + cloth3.reliability) / 3;


function generateStars(rating) {
    const starIcon = '\u2605'; // Filled star Unicode character
    const emptyStarIcon = '\u2606'; // Empty star Unicode character
    const fullStars = starIcon.repeat(rating);
    const emptyStars = emptyStarIcon.repeat(5 - rating);
    return fullStars + emptyStars;
}

function populateClothInfo(cloth) {
    const cleanlinessRating = document.getElementById('cleanlinessRating');
    const qualityRating = document.getElementById('qualityRating');
    const reliabilityRating = document.getElementById('reliabilityRating');
    const averageRating = document.getElementById('averageRating');
    cleanlinessRating.textContent = `Cleanliness: ${generateStars(cloth.cleanliness)}`;
    qualityRating.textContent = `Quality: ${generateStars(cloth.quality)}`;
    reliabilityRating.textContent = `Reliability: ${generateStars(cloth.reliability)}`;
    averageRating.textContent = `Average Rate: ${generateStars(Math.round(cloth.averageRate))}`;
}

const clothes = [cloth1, cloth2, cloth3];
const randomIndex = Math.floor(Math.random() * clothes.length);
const randomCloth = clothes[randomIndex];

populateClothInfo(randomCloth);

imgElement.src = clickedCloth.picture;

formContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.submitter === requestItemBtn) {
        window.location.href = 'request_item.pug';
        localStorage.setItem('clickedCloth', JSON.stringify(clickedCloth));
    }
    if (e.submitter === backBtn) {
        window.location.href = 'closet_userCloset.pug';
    }
});


