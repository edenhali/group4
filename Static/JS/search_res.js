const searchDataUl = document.querySelector('.searchData');

class Cloth {
    constructor(serialNumber, category, color, fabricType, size, style, goal, picture, status) {
        this.serialNumber = serialNumber;
        this.category = category;
        this.color = color;
        this.fabricType = fabricType;
        this.size = size;
        this.style = style;
        this.goal = goal;
        this.picture = picture;
        this.status = status;
    }
}

const cloth1 = new Cloth(1, 'dress', 'blue', 'Silk', 'S', 'formal', 'rent', '../../photosFolder/dress1.jpeg', 'active');
const cloth2 = new Cloth(2, 'dress', 'blue', 'cotton', 'XS', 'romantic', 'taking', '../../photosFolder/dress2.jpeg', 'active');
const cloth3 = new Cloth(3, 'formal suit', 'black', 'Polyester', 'XS', 'romantic', 'taking', "../../photosFolder/suit1.jpeg", 'active');

searchDataUl.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.classList.contains('detailsButton')){
    const button = e.target.id;
    const clickedCloth = [cloth1, cloth2, cloth3].find(cloth => cloth.serialNumber === Number(button));
    localStorage.setItem('clickedCloth', JSON.stringify(clickedCloth));
    window.location.href = 'closet_details.html';}
});

fetch('toolbar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('toolbar-container').innerHTML = html;
    });