// get nickname of the player

let nicknames = [];
let startPopup = document.querySelector(".popup-game__start");
let popupContainer = document.querySelector(".popup-container");
let startPopupInput = document.querySelector(".input__field");
let okBtn = document.querySelector(".ok__btn");
let cancelBtn = document.querySelector(".cancel__btn");

function addPerson(){
    if(startPopupInput.value != ""){
        nicknames.push(startPopupInput.value); 
        setTimeout(() => {
            startPopup.style.transform = "translateY(-800px)";
        }, 400)
        setTimeout(() => {
            popupContainer.style.display = "none";
        }, 550)
        console.log(nicknames)
    }else{
        alert("Enter nickname!!");
    }
}   

function clearInput(){
    startPopupInput.value = "";
}


okBtn.addEventListener("click", addPerson)
cancelBtn.addEventListener("click", clearInput)

/*************************************** */ 

// get results start

let resultsBtn = document.querySelector(".results__btn");
let resultsContainer = document.querySelector(".popup-results__container");
let resultPopup = document.querySelector(".popup-results");
let closeBtn = document.querySelector(".close");
let results = document.querySelector(".results-container");
let newPlayer = document.querySelector(".new__player");

function createNewPlayer(){
    document.location.reload();
}

function openResultsTable(){
    resultPopup.style.transform = "translateY(0)";
}

function closeResultsTable(){
    resultPopup.style.transform = "translateY(-1000px)";
}

resultsBtn.addEventListener("click", openResultsTable)
closeBtn.addEventListener("click", closeResultsTable)
newPlayer.addEventListener("click", createNewPlayer)

// get results end

const cards = document.querySelectorAll(".game-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let countSteps = 0, count = 0;

function flipCard() {
    if(lockBoard){
        return;
    }

    if(this === firstCard){
        return;
    }
    this.classList.add("flip");

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
    }else{
        hasFlippedCard = false;
        secondCard = this;
        if(firstCard.dataset.name === secondCard.dataset.name){
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard);
            count++;
            countSteps++;
            setTimeout(() => {
                if(count == 6){

                    resultPopup.style.transform = "translateY(0)";
                    let result = document.createElement("div");
                    result.className = 'result';
                    result.textContent = `${nicknames[nicknames.length - 1]} : ${countSteps} steps`;
                    results.appendChild(result);

                    closeBtn.addEventListener("click", function(){

                        cards.forEach(card => {
                            card.classList.remove("flip");
                            let randomPos = Math.floor(Math.random() * 12)
                            card.style.order = randomPos;
                            count = 0;
                            countSteps = 0;
                        })
                        cards.forEach(card => card.addEventListener("click", flipCard));
                    });

                    
                    if(document.getElementById("no-result")){
                        document.getElementById("no-result").remove();
                    }
                }
            }, 500)
        }else{
            lockBoard = true;

            setTimeout(() => {
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
                lockBoard = false;
            }, 1200)

            countSteps++;
        }
    }
}


(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos;
    })
})()

cards.forEach(card => card.addEventListener("click", flipCard))


