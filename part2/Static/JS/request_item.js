const startDate = document.querySelector("#startDate");
const endDate = document.querySelector("#endDate");
const submitBtn = document.querySelector("#submitBtn");
const today = new Date().toISOString().split('T')[0];
const clickedCloth = JSON.parse(localStorage.getItem('clickedCloth'));
const imgElement = document.querySelector('img');

startDate.addEventListener("change", () => {
    endDate.min = startDate.value;
    endDate.disabled = false;
});

endDate.addEventListener("change", () => {
    startDate.max = endDate.value;
});

startDate.setAttribute('min', today);
endDate.setAttribute('min', today);

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (startDate.value && endDate.value) {
        alert("The request has been accepted.");
        window.location.href = 'closet_userCloset.html';
    } else {
        alert("Please select both start and end dates.");
    }
});

startDate.addEventListener("change", () => {
    endDate.min = startDate.value;
    endDate.disabled = false;
});


imgElement.src = clickedCloth.picture;

fetch('toolbar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('toolbar-container').innerHTML = html;
    });