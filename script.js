const titleWrapper = document.getElementById("title-wrapper");
const startBtn = document.getElementById("start-btn");
const gameWrapper = document.getElementById("game-wrapper");
const themeWrapper = document.getElementById("theme-wrapper");

const cards = document.querySelectorAll(".card");

let matchedPairs = 0;
let cardOne, cardTwo;
let disableDeck = false;

const iconsArr = [
	{
		name: "basic",
		icons: ["star", "heart", "cloud", "diamond", "circle", "square", "crown", "bolt"]
	},
	{
		name: "weather",
		icons: ["cloud", "snowflake", "sun", "wind", "tornado", "rainbow", "cloud-rain", "cloud-sun-rain"]
	},
	{
		name: "animals",
		icons: ["dog", "cat", "fish", "horse", "otter", "frog", "crow", "spider"]
	},
	{
		name: "food",
		icons: ["lemon", "pizza-slice", "ice-cream", "hotdog", "egg", "drumstick-bite", "burger", "bacon"]
	},
	{
		name: "faces",
		icons: ["face-smile", "face-tired", "face-surprise", "face-sad-cry", "face-angry", "face-grin-tongue-wink", "face-grin-hearts", "face-grin-tears"]
	},
	{
		name: "sports",
		icons: ["bicycle", "dumbbell", "volleyball", "table-tennis-paddle-ball", "person-swimming", "basketball", "futbol", "baseball-bat-ball"]
	}
];

const flipCard = (e) => {
	let clickedCard = e.target;
	if(clickedCard !== cardOne && !disableDeck) {
		clickedCard.classList.add("flip");
		if(!cardOne){
			cardOne = clickedCard;
			return;
		}
		cardTwo = clickedCard;
		disableDeck = true;

		// console.log(cardOne, cardTwo);

		let cardOneIcon = cardOne.querySelector(".back-view").querySelector("i").className;
		let cardTwoIcon = cardTwo.querySelector(".back-view").querySelector("i").className;
		matchCards(cardOneIcon, cardTwoIcon);
	}
}

const matchCards = (i1, i2) => {
	if(i1 === i2) {
		matchedPairs++;
		if(matchedPairs == 8) {
			setTimeout(() => {
				shuffleCards();
			}, 1000);
			return;
		}
		cardOne.removeEventListener("click", flipCard);
		cardTwo.removeEventListener("click", flipCard);
		cardOne = cardTwo = "";
		disableDeck = false;
		return;
	}

	setTimeout(() => {
		cardOne.classList.add("shake");
		cardTwo.classList.add("shake");		
	}, 300);
	setTimeout(() => {
		cardOne.classList.remove("shake", "flip");
		cardTwo.classList.remove("shake", "flip");
		cardOne = cardTwo = "";	
		disableDeck = false;
	}, 900);
}

const shuffleCards = () => {
	disableDeck = false;
	matchedPairs = 0;
	cardOne = cardTwo = "";
	let arr = [0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7];
	arr.sort(() => Math.random() > 0.5 ? 1 : -1);
	const randomIconGenre = Math.floor(Math.random() * iconsArr.length);
	console.log(randomIconGenre);
	const icons = iconsArr[randomIconGenre].icons;
	cards.forEach((card, index) => {
		card.classList.remove("flip");
		let iTag = card.querySelector(".back-view").querySelector("i");
		iTag.className = `fa-solid fa-${icons[arr[index]]}`
		card.addEventListener("click", flipCard);
	});
}

const chooseTheme = () => {
	titleWrapper.style.display = "none";
	themeWrapper.removeAttribute("style");

}

const startGame = () => {
	themeWrapper.style.display = "none";
	gameWrapper.removeAttribute("style");
	shuffleCards();

	cards.forEach(card => {
		card.addEventListener("click", flipCard);
	});
}

gameWrapper.style.display = "none";
themeWrapper.style.display = "none";
startBtn.onclick = chooseTheme;