const form = document.querySelector('.formContainer');
const category = document.querySelector('#category');
const fabricType = document.querySelector('#fabric-type');
const size = document.querySelector('#size');
const style = document.querySelector('#Style');
const goal = document.querySelector('#goal');
const picture = document.querySelector('#picture');
const errorMsg = document.querySelector('.errorMsg');

form.addEventListener('submit', (event) => {
    if (!category.value || !fabricType.value || !size.value || !style.value || !goal.value || !picture.value) {
        event.preventDefault();
        errorMsg.textContent = 'Please fill out all required fields';
    } else {
        errorMsg.textContent = '';
        alert('Item successfully added ');
    }
});

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

const clothList = [];

function addCloth(event) {
    event.preventDefault();
    const category = document.getElementById("category").value;
    const color = document.getElementById("color-picker").value;
    const fabricType = document.getElementById("fabric-type").value;
    const size = document.getElementById("size").value;
    const style = document.getElementById("Style").value;
    const goal = document.getElementById("goal").value;
    const picture = document.getElementById("picture").value;
    const serialNumber = "C" + (clothList.length + 1);
    const status = "Available";
    const cloth = new Cloth(
        serialNumber,
        category,
        color,
        fabricType,
        size,
        style,
        goal,
        picture,
        status
    );
    clothList.push(cloth);
    document.getElementById("category").value = "";
    document.getElementById("color-picker").value = "";
    document.getElementById("fabric-type").value = "";
    document.getElementById("size").value = "";
    document.getElementById("Style").value = "";
    document.getElementById("goal").value = "";
    document.getElementById("picture").value = "";
    console.log(clothList);
    console.log("Item successfully added");
}

document.getElementsByClassName("formContainer")[0].addEventListener("submit", addCloth);

fetch('toolbar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('toolbar-container').innerHTML = html;
    });






