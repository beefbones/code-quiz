const highScore = document.querySelector("#highScore");
const clear = document.querySelector("#clear");
const goBack = document.querySelector("#goBack");

clear.addEventListener("click", () => {
localStorage.clear();
location.reload();
});

const allScores = JSON.parse(localStorage.getItem("allScores"));

if (allScores) {
allScores.forEach(score => {
const li = document.createElement("li");
li.textContent = ${score.initials} ${score.score};
highScore.appendChild(li);
});
}

goBack.addEventListener("click", () => {
window.location.replace("./index.html");
});