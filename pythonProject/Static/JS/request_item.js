const startDate = document.querySelector("#startDate");
const endDate = document.querySelector("#endDate");
const submitBtn = document.querySelector("#submitBtn");
const today = new Date().toISOString().split('T')[0];


startDate.addEventListener("change", () => {
    endDate.min = startDate.value;
    endDate.disabled = false;
});

endDate.addEventListener("change", () => {
    startDate.max = endDate.value;
});

startDate.setAttribute('min', today);
endDate.setAttribute('min', today);


startDate.addEventListener("change", () => {
    endDate.min = startDate.value;
    endDate.disabled = false;
});



