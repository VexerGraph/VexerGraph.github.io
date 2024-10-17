import { fullTitle, shuffle } from "./modules.js";

const duelButton = document.getElementById("duel"),
teamButton = document.getElementById("team"),
startButton = document.getElementById("start-battle"),
warLog = document.getElementById("war-log"),
clearLog = document.getElementById("clear-log"),
saveLog = document.getElementById("copy-log"),
fighterField = document.getElementById("fighter"),
fighterList = document.getElementById("fighter-list"),
clearFighters = document.getElementById("clear-fighters"),
statuses = document.getElementById("statuses");

//ok so I might remove duel gamemode all togehter and make ffa the default.

let fighterNames = ["Default Billy", "Default Mandy"];
let fIndex = 0;



fighterField.addEventListener('keypress', (e) => {
	if (e.key === 'Enter'){
		if (fighterField.value == ''){
			fighterNames[fIndex] = fullTitle(true);
		}
		else{
			fighterNames[fIndex] = fighterField.value;
		};
		
		fighterField.value = '';
		fIndex += 1;
		fighterField.placeholder = `Fighter ${fIndex + 1}`;

		if (fIndex == 1){
			fighterList.append(document.createElement("h6").textContent = "Current Fighters:");
			fighterList.append(document.createElement("br"));
			fighterList.append(document.createElement("p").textContent = " --" + fighterNames[fIndex - 1]);
		}
		else{
			fighterList.append(document.createElement("br"));
			fighterList.append(document.createElement("p").textContent = " --" + fighterNames[fIndex - 1]);
			clearFighters.style.display = 'inline';
		};
	};
});

clearFighters.onclick = () => {
	fIndex = 0;
	fighterNames = ["Default Billy", "Default Mandy"];
	fighterList.innerHTML = '';
	clearFighters.style.display = 'none';
};

let gameMode = duelButton;

duelButton.onclick = () => {
	changeGameMode(duelButton);
};
teamButton.onclick = () => {
	changeGameMode(teamButton);
};

startButton.onclick = () => {
	startButton.innerHTML = "Commence Battle 💥";
	startButton.classList.add("is-danger","is-outlined");

	clearLog.style.display = 'inline';
	saveLog.style.display = 'inline';

	commenceBattle(gameMode);
};
startButton.onmouseleave = () => {
    if (startButton.innerHTML != "Commence Battle 💥"){
        return;
    }
	const interval = setTimeout(async () => {
		startButton.innerHTML = "Commence Battle 💣";
		startButton.classList.remove("is-danger","is-outlined")
	}, 500);
};

clearLog.onmouseenter = () => {
	clearLog.classList.add("is-danger","is-outlined");
};
clearLog.onmouseleave = () => {
	clearLog.classList.remove("is-danger","is-outlined");
};
saveLog.onmouseenter = () => {
	saveLog.classList.add("is-success","is-outlined");
};
saveLog.onmouseleave = () => {
	saveLog.classList.remove("is-success","is-outlined");
};
clearLog.onclick = () => {
	let isConfirmed = confirm("Are you sure you want to clear the War Log? All history will be deleted.")
	if (!isConfirmed){
		return;
	}

	warLog.innerHTML = "⚠️ Wiped the battle history. ⚠️"

	setTimeout(async () => {
		warLog.innerHTML = "";
	},300);

	clearLog.style.display = 'none';
	saveLog.style.display = 'none';
}

function changeGameMode(mode){
	const modeButtons = [
		duelButton,
		teamButton
	];
	for (let i = 0; i < modeButtons.length; i++){
		if(modeButtons[i].id == mode.id){
			modeButtons.splice(i,1)
			mode.classList.add("is-success","is-selected");
		}
	};
	
	for (let i = 0; i < modeButtons.length; i++){
		modeButtons[i].classList.remove("is-success","is-selected");
	}
	gameMode = mode;
};

const BattleTypes = [
	"Tavern Brawl",
	"Battle to the Death",
	"Lesson in Hand to Hand Combat",
	"Skirmish Between Enemies",
	"Clash of Swords",
	"Devastating Engagemant",
	"Fierce Battle",
	"Onslaught",
];
let fightersHP = 75;
let fightersSP = 25;
//hp for duels and team battles will be configurable with a slider

console.log("initialized battle-sim");

function commenceBattle(battleType){
	console.log("Starting battle of type: " + battleType.id);

	const message = document.createElement("p");
	message.textContent = "The " + battleType.innerHTML + " begins! 🎺";
	warLog.append(message);

	if(battleType.id == "duel"){
		duel(fighterNames);
	};
	if(battleType.id == "team"){
		warLog.append(document.createElement("p").innerHTML = "Currently, only the FFA gamemode works 😬");
	};
	if(battleType.id == "ffa"){
		warLog.append(document.createElement("p").innerHTML = "Currently, only the FFA gamemode works 😬");
	};
};

//basic duel function
function duel(contestants){
    const Fighters = [];

	for (let i = 0; i < contestants.length; i++){
		Fighters.push(
			{
				name: contestants[i],
				hp: fightersHP,
				sp: fightersSP,
			}
		);
	}

	const setTitle = document.createElement("h5");

    setTitle.textContent = "It's a " +
					BattleTypes[Math.floor(Math.random() * BattleTypes.length)] +
					"!";
	
	warLog.append(setTitle);
	
		let nameList = '';
		for (let i = 0; i < Fighters.length; i++){
			if (i < Fighters.length - 1){
				nameList += Fighters[i].name + ", ";
			}
			else{
				nameList += Fighters[i].name;
			};
		};

    let setDescription = document.createElement("p");
	setDescription.innerHTML = `<big> Fighters in conflict: ${nameList}. </big>`;

	warLog.append(setDescription);

    let TurnNumber = 1;
    let Assailant = 0;
    let Reciever = 1;
    let FightLog = [""];

	// let combatIndex = 0;
	// let combatOrder;

    const interval = setInterval(async () => {

		const turnFighter = [
			Fighters[Math.floor(Math.random() * Fighters.length)],
			Fighters[Math.floor(Math.random() * Fighters.length)]
		];

		while (turnFighter[0].name == turnFighter[1].name){
			turnFighter[1] = Fighters[Math.floor(Math.random() * Fighters.length)];
		};

        let attack = randomAttackUser(
            turnFighter[Assailant].name,
            turnFighter[Assailant].sp,
            turnFighter[Reciever].name,
            turnFighter[Reciever].hp,
        );

		turnFighter[Reciever].hp = attack[1];
		turnFighter[Assailant].sp = attack[2];

        FightLog.push(" " + attack[0] + "\n");

		if (turnFighter[0].hp < 1) {
			let index = Fighters.indexOf(turnFighter[0]);
			if (index !== -1) {
				Fighters.splice(index, 1);
			}
			else{
				console.log("Houston we have a problem:" + index);
			}
		}
		if (turnFighter[1].hp < 1) {
			let index = Fighters.indexOf(turnFighter[1]);
			if (index !== -1) {
				Fighters.splice(index, 1);
			}
			else{
				console.log("Houston we have a problem:" + index);
			}
		}

		let formattedM = document.createElement("p");
		formattedM.innerHTML = "<b> Turn " + TurnNumber + ": </b>" + attack[0];
		warLog.append(formattedM);

        Assailant = 1 - Assailant;
        Reciever = 1 - Reciever;
        TurnNumber += 1;

        if (Fighters.length <= 1) {
			let formattedM = document.createElement("p");
			formattedM.innerHTML = `The last contestant standing is <strong> ${Fighters[0].name} </strong>🏆!`;
			warLog.append(formattedM);

            clearInterval(interval);
        }
    }, 750);
}

// function formattedText(text, format){
// 	let boldedText = document.createElement("p");
// 	boldedText.textContent = text;
// 	boldedText.style.fontWeight = format;
// 	return boldedText;
// }

function randomAttackUser(Assailant, AssailantSP, Reciever, RecieverHP) {
	const attacks = [
		{
			message: `<strong> ${Assailant} </strong> punches <strong> ${Reciever} </strong> with a mean right-hook!`,
			damage: 7,
			energy: 3,
		},
		{
			message: `<strong> ${Assailant} </strong> slams a chair over <strong> ${Reciever} </strong>'s head!`,
			damage: 10,
			energy: 5,
		},
		{
			message: `<strong> ${Assailant} </strong> stabs <strong> ${Reciever} </strong> with a dagger!`,
			damage: 25,
			energy: 10,
		},
		{
			message: `<strong> ${Assailant} </strong> kicks <strong> ${Reciever} </strong>!`,
			damage: 5,
			energy: 2,
		},
		{
			message: `<strong> ${Assailant} </strong> uppercuts <strong> ${Reciever} </strong>!`,
			damage: 5,
			energy: 2,
		},
		{
			message: `<strong> ${Assailant} </strong> karate-chops <strong> ${Reciever} </strong>!`,
			damage: 8,
			energy: 4,
		},
		{
			message: `<strong> ${Assailant} </strong> butt-slams <strong> ${Reciever} </strong>!`,
			damage: 8,
			energy: 4,
		},
		{
			message: `<strong> ${Assailant} </strong> verbally harasses <strong> ${Reciever} </strong>!`,
			damage: 3,
			energy: 1,
		},
		{
			message: `<strong> ${Assailant} </strong> rubs some dirt <strong> ${Reciever} </strong>'s eye!`,
			damage: 3,
			energy: 1,
		},
		{
			message: `<strong> ${Assailant} </strong> knocks <strong> ${Reciever} </strong> into a pile of rubble!`,
			damage: 8,
			energy: 4,
		},
		{
			message: `<strong> ${Assailant} </strong> pokes <strong> ${Reciever} </strong> in the eye!`,
			damage: 8,
			energy: 2,
		},
		{
			message: `<strong> ${Assailant} </strong> pulls out a gun and shoots <strong> ${Reciever} </strong>!`,
			damage: 60,
			energy: 10,
		},
		{
			message: `<strong> ${Assailant} </strong> force feeds <strong> ${Reciever} </strong> rat poison!`,
			damage: 30,
			energy: 10,
		},
		{
			message: `<strong> ${Assailant} </strong> stabs <strong> ${Reciever} </strong> with a broken beer bottle!`,
			damage: 25,
			energy: 10,
		},
		{
			message: `<strong> ${Assailant} </strong> hits <strong> ${Reciever} </strong> with a frying pan!`,
			damage: 15,
			energy: 7,
		},
		{
			message: `<strong> ${Assailant} </strong> snitches on <strong> ${Reciever} </strong> to Tuxxego...`,
			damage: 80,
			energy: 50,
		},
		{
			message: `<strong> ${Assailant} </strong> throws a smoke bomb and disappears, leaving <strong> ${Reciever} </strong> disoriented!`,
			damage: 10,
			energy: 5,
		},
		{
			message: `<strong> ${Assailant} </strong> casts a spell, engulfing <strong> ${Reciever} </strong> in flames!`,
			damage: 15,
			energy: 7,
		},
		{
			message: `<strong> ${Assailant} </strong> teleports behind <strong> ${Reciever} </strong> and delivers a surprise blow!`,
			damage: 12,
			energy: 6,
		},
		{
			message: `<strong> ${Assailant} </strong> hypnotizes <strong> ${Reciever} </strong> with a mesmerizing dance, leaving them vulnerable!`,
			damage: 8,
			energy: 4,
		},
		{
			message: `<strong> ${Assailant} </strong> summons a swarm of angry bees to attack <strong> ${Reciever} </strong>!`,
			damage: 20,
			energy: 10,
		},
		{
			message: `<strong> ${Assailant} </strong> uses mind control to force <strong> ${Reciever} </strong> to attack themselves!`,
			damage: 5,
			energy: 2,
		},
		{
			message: `<strong> ${Assailant} </strong> reveals their true form—a monstrous creature—and terrifies <strong> ${Reciever} </strong>!`,
			damage: 18,
			energy: 9,
		},
		{
			message: `<strong> ${Assailant} </strong> throws a handful of marbles, causing <strong> ${Reciever} </strong> to slip and fall!`,
			damage: 7,
			energy: 2,
		},
		{
			message: `<strong> ${Assailant} </strong> recites a cursed incantation, draining <strong> ${Reciever} </strong>'s life force!`,
			damage: 25,
			energy: 10,
		},
		{
			message: `<strong> ${Assailant} </strong> whips out a laser sword and slashes at <strong> ${Reciever} </strong>!`,
			damage: 30,
			energy: 15,
		},
		{
			message: `<strong> ${Assailant} </strong> used console commands to kill <strong> ${Reciever} </strong> RIGGED THIS IS RIGGED!`,
			damage: 100,
			energy: 50,
		},
		{
			message: `<strong> ${Assailant} </strong> whips <strong> ${Reciever} </strong> with a heavy chain!`,
			damage: 15,
			energy: 7,
		},
		{
			message: `<strong> ${Assailant} </strong> hits <strong> ${Reciever} </strong> with a stunning lightning bolt!`,
			damage: 30,
			energy: 10,
		},
		{
			message: `<strong> ${Assailant} </strong> launches a fireball at <strong> ${Reciever} </strong>!`,
			damage: 20,
			energy: 10,
		},
		{
			message: `<strong> ${Assailant} </strong> freezes <strong> ${Reciever} </strong> with a chilling frost spell!`,
			damage: 18,
			energy: 9,
		},
		{
			message: `<strong> ${Assailant} </strong> ensnares <strong> ${Reciever} </strong> in a net of thorns!`,
			damage: 12,
			energy: 6,
		},
		{
			message: `<strong> ${Assailant} </strong> lashes out with a flurry of shadow strikes at <strong> ${Reciever} </strong>!`,
			damage: 22,
			energy: 11,
		},
		{
			message: `<strong> ${Assailant} </strong> conjures a vortex of wind to hurl <strong> ${Reciever} </strong> into the air!`,
			damage: 17,
			energy: 8,
		},
		{
			message: `<strong> ${Assailant} </strong> blinds <strong> ${Reciever} </strong> with a high-lumen flashlight!`,
			damage: 13,
			energy: 4,
		},
		{
			message: `<strong> ${Assailant} </strong> traps <strong> ${Reciever} </strong> in an explosive rune trap!`,
			damage: 26,
			energy: 13,
		},
		{
			message: `<strong> ${Assailant} </strong> throws a javelin at <strong> ${Reciever} </strong>!`,
			damage: 19,
			energy: 9,
		},
	];
	const recoveryActions = [
		{
			trigger: `<strong> ${Assailant} </strong> takes a deep breath, focusing their energy...`,
			recovery: 40,
		},
		{
			trigger: `<strong> ${Assailant} </strong> finds their inner calm amidst the chaos...`,
			recovery: 45,
		},
		{
			trigger: `<strong> ${Assailant} </strong> rallies with a fierce battle cry...`,
			recovery: 60,
		},
		{
			trigger: `<strong> ${Assailant} </strong> drinks a mysterious revitalizing potion...`,
			recovery: 80,
		},
		{
			trigger: `<strong> ${Assailant} </strong> taps into a hidden reserve of strength...`,
			recovery: 80,
		},
		{
			trigger: `<strong> ${Assailant} </strong> feels the exhaustion leave their body as they recite a restorative spell.`,
			recovery: 60,
		},
		{
			trigger: `<strong> ${Assailant} </strong> absorbs the energy from the surrounding environment...`,
			recovery: 50,
		},
		{
			trigger: `<strong> ${Assailant} </strong> uses a moment of peace to meditate and restore vitality...`,
			recovery: 20,
		},
		{
			trigger: `<strong> ${Assailant} </strong> calls upon the spirits of previous battles to invigorate him...`,
			recovery: 50,
		},
		{
			trigger: `<strong> ${Assailant} </strong> invokes an ancestral spirit for protection and healing...`,
			recovery: 80,
		},
	];
	if (AssailantSP <= 0) {
		var secondWind = Math.random() < 0.25;
		if (secondWind) {
			var action =
				recoveryActions[Math.floor(Math.random() * recoveryActions.length)];
			AssailantSP += action.recovery;
			return [
				`<strong> ${Assailant} </strong> is too exhausted to attack. <em> However... ${action.trigger} </em>`,
				RecieverHP,
				AssailantSP,
			];
		}
		return [
			`<em> <strong> ${Assailant} </strong> is too exhausted to attack. </em>`,
			RecieverHP,
			AssailantSP,
		];
	}
	const usableAttacks = [];
	for (const attack of attacks) {
		if (attack.energy <= AssailantSP) {
			usableAttacks.push(attack);
		}
	}
	var chosenAttack =
		usableAttacks[Math.floor(Math.random() * usableAttacks.length)];
	RecieverHP -= chosenAttack.damage;
	AssailantSP -= chosenAttack.energy;
	if (RecieverHP < 1) {
		return [
			`${chosenAttack.message} <em> <strong> ${Reciever} </strong> finally succumbs to their injuries... </em> <strong> ${Assailant} </strong> is the winner of this battle! 💪`,
			RecieverHP,
			AssailantSP,
		];
	} else {
		return [
			`${chosenAttack.message} The attack deals ${chosenAttack.damage} damage!`,
			RecieverHP,
			AssailantSP,
		];
	}
}

function getSkirmishReason(faction1, faction2) {
	const SkirmishTypes = [
		`*${faction1}* snuck into *${faction2}*'s camp and took them by surprise!`,
		`*${faction1}* met *${faction2}* in an open field, ready to fight!`,
		`*${faction1}*'s warlord insulted *${faction2}*'s warlord to their face, causing a skirmish to break out!`,
		`*${faction1}* is disputing territory with *${faction2}* through "diplomacy" and "understanding."`,
		`*${faction1}* laid an ambush for *${faction2}* at the river crossing!`,
		`*${faction1}*'s scouts encountered *${faction2}*'s patrol in the dense forest!`,
		`*${faction1}* challenged *${faction2}* to a duel of champions in the ancient arena!`,
		`*${faction1}* and *${faction2}* clashed over a disputed border fort!`,
		`*${faction1}*'s soldiers provoked *${faction2}*'s soldiers into a bloody duel!`,
		`*${faction1}*'s raiders attacked *${faction2}*'s supply caravan on the mountain pass!`,
		`*${faction1}* and *${faction2}*'s armies collided unexpectedly in the fog of war!`,
	];
	return SkirmishTypes[Math.floor(Math.random() * SkirmishTypes.length)];
}
//ok so to spice up the battle, when the players enter their names they can choose an emoji to represent them, which will work like a pfp.