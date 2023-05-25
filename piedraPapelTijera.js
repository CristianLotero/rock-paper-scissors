
let lImg = new Image();
lImg.src = "1xLado/eventos/holdOn.gif";
document.querySelector("#divLeft").appendChild(lImg);

let rImg = new Image();
rImg.src = "1xLado/eventos/holdOn.gif";
document.querySelector("#divRight").appendChild(rImg);

let rockButton = document.querySelector("#menu1");
let paperButton = document.querySelector("#menu2");
let scissorButton = document.querySelector("#menu3");

rockButton.addEventListener("click", ()=>{prossesGame.parseChoices(0, prossesGame.ComputerRandomChoice())});
paperButton.addEventListener("click", ()=>{prossesGame.parseChoices(1, prossesGame.ComputerRandomChoice())});
scissorButton.addEventListener("click", ()=>{prossesGame.parseChoices(2, prossesGame.ComputerRandomChoice())});

let leftBanner = document.querySelector("#leftBanner");
let rightBanner = document.querySelector("#rightBanner");
let myName = document.querySelector(".myName");
let compName = document.querySelector(".compName");


let bannerInFinalValue = 0;
let bannerOutFinalValue = -100;
let bannerFinalValue = bannerOutFinalValue ;
let bannerIn = true;
let namesInFinalValue = 0;
let namesOutFinalValue = -100;
let delayTime = 5;
let bannerDeployTime = 1500;
let rocksPapersScissorsTotalImg = 14
let loseWinDrawTotalImg = 8;
let loseImg = "";
let winImg = "";
let drawImg = "";
let error404 = "xv/draw1.jpg";
let meScore = 0;
let drawScore = 0;
let computerScore = 0;

const rocks = [];
const papers = [];
const scissors = [];
const loses = [];
const wins = [];
const draws = [];

function imgPush(id,src) {
    this.id = id;
    this.src = src;
};

//lwd = lose Win Draw
let lwdPush = function() {
    for (i=0 ; i < loseWinDrawTotalImg + 1; i++) {
        let lose = new imgPush("x" + i , "xv/x" + i + ".jpg");
        let win = new imgPush("v" + i , "xv/v" + i + ".jpg");
        let draw = new imgPush("draw" + i , "xv/draw" + i + ".jpg");
        loses.push(lose);
        wins.push(win);
        draws.push(draw);
    }
}();

//rps = rock paper scissors
let rpsPush = function() {
    for (i=0; i < (rocksPapersScissorsTotalImg + 1); i++){
        let rock = new imgPush ("piedra"+ i , "1xLado/piedra" + i + ".gif");
        let paper = new imgPush ("papel"+ i , "1xLado/papel" + i + ".gif");
        let scissor = new imgPush ("tijera"+ i , "1xLado/tijera" + i + ".gif");
        rocks.push(rock);
        papers.push(paper);
        scissors.push(scissor);
    }
}();

(()=> {
    let loseWinPairIndex = Math.floor( Math.random() * loseWinDrawTotalImg);
    let drawIndex = Math.floor (Math.random() * loseWinDrawTotalImg);
    loseImg = "xv/x" + loseWinPairIndex + ".jpg" ;
    winImg = "xv/v" + loseWinPairIndex + ".jpg";
    drawImg = "xv/draw" + drawIndex + ".jpg";
})();

function makeItRandom() {  
    randomImgIndex = Math.floor(Math.random() * rocksPapersScissorsTotalImg);
    return randomImgIndex;
};

function disableButtons() {
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorButton.disabled = true;
    let totalDelay = ((bannerDeployTime * 2) - (bannerDeployTime * 0.4));
    setTimeout(() =>{ 
        rockButton.disabled = false;
        paperButton.disabled = false;
        scissorButton.disabled = false;
    },totalDelay);
};

function namesDeploy() {
    for(let i=100 ; i > 0 ; i--) {
    let myInterval = setTimeout(()=> {
            console.log("dale que se puede: " + i);
            myName.style["top"] = i + "%";
            compName.style["top"] = i + "%";
        },200);
    }
}
namesDeploy();


let prossesGame = {
    ComputerRandomChoice: function (){
        let compChoice = Math.floor( Math.random() * 3);
        return compChoice;
    },
    imagesDisplay: function(myChoice, compChoice){
            let myImgIndex = makeItRandom();
            let compImgIndex = makeItRandom();
            let randLeftImgSrc = myChoice == 2 ? scissors[myImgIndex].src 
            : (myChoice) ? papers[myImgIndex].src
            : rocks[myImgIndex].src ;
            lImg.src = randLeftImgSrc ;
            let randRightImgSrc = compChoice === 2 ? scissors[compImgIndex].src 
            : (compChoice) ? papers[compImgIndex].src
            : rocks[compImgIndex].src ;
            rImg.src = randRightImgSrc ;
    },
    parseChoices: function(myChoice, computerChoice){
        this.imagesDisplay(myChoice, computerChoice);
        let outcome = myChoice === computerChoice ? this.resultBanners(drawImg, drawImg, "b")
        : (myChoice === 0 && computerChoice === 1) || (myChoice === 1 && computerChoice === 2) || (myChoice === 2 && computerChoice === 0) ? this.resultBanners(loseImg, winImg, "c")
        : (myChoice === 0 && computerChoice === 2) || (myChoice === 1 && computerChoice === 0) || (myChoice === 2 && computerChoice === 1) ? this.resultBanners(winImg, loseImg, "a") : this.resultBanners(error404, error404);
    },
    resultBanners: function(myResult, compResult, refreshScore){
        this.bannerDeploy(bannerFinalValue);
        disableButtons();
        setTimeout(()=>{this.bannerDeploy(bannerFinalValue)}, bannerDeployTime);
        document.querySelector("#bannerImgL").setAttribute("src", myResult);
        document.querySelector("#bannerImgR").setAttribute("src", compResult);
        this.scoreCounter(refreshScore);
    },
    scoreCounter: function(refreshScore){
        let refresh = refreshScore === "a" ? (document.querySelector("#me").innerHTML = (meScore += 1)) 
        : refreshScore === "b" ? (document.querySelector("#draw").innerHTML = (drawScore += 1))
        : (document.querySelector("#computer").innerHTML = (computerScore += 1));
    },
    bannerDeploy : function (x) {
        let myInterval = setInterval(()=> {
            console.log("Valor de x :" + x);
            if (bannerIn) {
                x += 1;
            } else {
                x -= 1;
            }
            leftBanner.style["left"] = x + "%";
            rightBanner.style["right"] = x + "%";
            if (x===bannerInFinalValue || x===bannerOutFinalValue ) {
                clearInterval(myInterval);
                bannerIn = !bannerIn;
                console.log("el valor de bannerIn es :" + bannerIn)
                bannerFinalValue = x;
            };
        },delayTime);
    }
};

// closures- lexical enviroments
// function makeSuperAdder (x) {
//     return function (y) {
//         return function (z) {
//             return x + y * z;
//         }
//     }
// }

// console.log(makeSuperAdder(7)(12)(35));
// const add12 = makeSuperAdder(12);
// const add15 = add12(3);

// console.log(add15(17));