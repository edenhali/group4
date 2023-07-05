const clickedCloth = JSON.parse(localStorage.getItem('clickedCloth'));
const imgElement = document.querySelector('img');

imgElement.src = clickedCloth.picture;

document.querySelector('ul').innerHTML = `
  <li><b>Category: </b> ${clickedCloth.category}</li>
  <li><b>Color: </b> ${clickedCloth.color}</li>
  <li><b>Fabric Type: </b> ${clickedCloth.fabricType}</li>
  <li><b>Size: </b> ${clickedCloth.size}</li>
  <li><b>Style: </b> ${clickedCloth.style}</li>
  <li><b>Goal: </b> ${clickedCloth.goal}</li>
`;

detailsContainerForm = document.querySelector('.detailsContainer');
submitRequestBtm = document.querySelector('#submitRequest');
showRatingBtm = document.querySelector('#showRating');

detailsContainerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.submitter === submitRequestBtm) {
        window.location.href = 'request_item.html';
    }
    if (e.submitter === showRatingBtm) {
        localStorage.setItem('clickedCloth', JSON.stringify(clickedCloth));
        window.location.href = 'show_rating.html';
    }
});

fetch('toolbar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('toolbar-container').innerHTML = html;
    });

