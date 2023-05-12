let startButton = document.querySelector(".start");
startButton.addEventListener("click" , goToRockPaperScissors);

function goToRockPaperScissors() {
    window.open("rockPaperScissors.html", "_self");
}