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
let fightersHP = 100;
let fightersSP = 50;
//hp for duels and team battles will be configurable with a slider

console.log("initialized battle-sim");

//basic duel function
function duel(){
    const Fighters = [
        {
            name: "InputName1",
            //maybe make their individual hp's and sp's configurable instead?
            hp: fightersHP,
            sp: fightersSP,
        },
        {
            name: "InputName2",
            hp: fightersHP,
            sp: fightersSP,
        },
    ];
    const setTitle = "It's a " +
					BattleTypes[Math.floor(Math.random() * BattleTypes.length)] +
					"!";
    let setDescription = `Fighters in conflict: ${Fighters[0].name}, ${Fighters[1].name}`;

    let TurnNumber = 1;
    let Assailant = 0;
    let Reciever = 1;
    let FightLog = [""];

    const interval = setInterval(async () => {
        var attack = randomAttackUser(
            Fighters[Assailant].name,
            Fighters[Assailant].sp,
            Fighters[Reciever].name,
            Fighters[Reciever].hp,
        );
        FightLog.push(" " + attack[0] + "\n");
        Fighters[Reciever].hp = attack[1];
        Fighters[Assailant].sp = attack[2];

        setDescription = (FightLog.toString())

        //create two buttons or fields at the bottom of the war log to represent the two fighter's hp

        // const newEmbedState = new EmbedBuilder()
        //     .setTitle("Turn " + TurnNumber + " :people_wrestling:")
        //     .setDescription(FightLog.toString())
        //     .addFields(
        //         {
        //             name: `${Fighters[0].name}'s health`,
        //             value: `${Fighters[0].hp} HP`,
        //             inline: true,
        //         },
        //         {
        //             name: `${Fighters[1].name}'s health`,
        //             value: `${Fighters[1].hp} HP`,
        //             inline: true,
        //         },
        //     )
        //     .setColor("#ff0000");
        // Msg.edit({ embeds: [newEmbedState] });
        Assailant = 1 - Assailant;
        Reciever = 1 - Reciever;
        TurnNumber += 1;
        if (Fighters[0].hp < 1 || Fighters[1].hp < 1) {
            clearInterval(interval);
        }
    }, 1000);
}

function randomAttackUser(Assailant, AssailantSP, Reciever, RecieverHP) {
	const attacks = [
		{
			message: `**${Assailant}** punches **${Reciever}** with a mean right-hook!`,
			damage: 7,
			energy: 3,
		},
		{
			message: `**${Assailant}** slams a chair over **${Reciever}**'s head!`,
			damage: 10,
			energy: 5,
		},
		{
			message: `**${Assailant}** stabs **${Reciever}** with a dagger!`,
			damage: 25,
			energy: 10,
		},
		{
			message: `**${Assailant}** kicks **${Reciever}**!`,
			damage: 5,
			energy: 2,
		},
		{
			message: `**${Assailant}** uppercuts **${Reciever}**!`,
			damage: 5,
			energy: 2,
		},
		{
			message: `**${Assailant}** karate-chops **${Reciever}**!`,
			damage: 8,
			energy: 4,
		},
		{
			message: `**${Assailant}** butt-slams **${Reciever}**!`,
			damage: 8,
			energy: 4,
		},
		{
			message: `**${Assailant}** verbally harasses **${Reciever}**!`,
			damage: 3,
			energy: 1,
		},
		{
			message: `**${Assailant}** rubs some dirt **${Reciever}**'s eye!`,
			damage: 3,
			energy: 1,
		},
		{
			message: `**${Assailant}** knocks **${Reciever}** into a pile of rubble!`,
			damage: 8,
			energy: 4,
		},
		{
			message: `**${Assailant}** pokes **${Reciever}** in the eye!`,
			damage: 8,
			energy: 2,
		},
		{
			message: `**${Assailant}** pulls out a gun and shoots **${Reciever}**!`,
			damage: 60,
			energy: 10,
		},
		{
			message: `**${Assailant}** force feeds **${Reciever}** rat poison!`,
			damage: 30,
			energy: 10,
		},
		{
			message: `**${Assailant}** stabs **${Reciever}** with a broken beer bottle!`,
			damage: 25,
			energy: 10,
		},
		{
			message: `**${Assailant}** hits **${Reciever}** with a frying pan!`,
			damage: 15,
			energy: 7,
		},
		{
			message: `**${Assailant}** snitches on **${Reciever}** to Tuxxego...`,
			damage: 80,
			energy: 50,
		},
		{
			message: `**${Assailant}** throws a smoke bomb and disappears, leaving **${Reciever}** disoriented!`,
			damage: 10,
			energy: 5,
		},
		{
			message: `**${Assailant}** casts a spell, engulfing **${Reciever}** in flames!`,
			damage: 15,
			energy: 7,
		},
		{
			message: `**${Assailant}** teleports behind **${Reciever}** and delivers a surprise blow!`,
			damage: 12,
			energy: 6,
		},
		{
			message: `**${Assailant}** hypnotizes **${Reciever}** with a mesmerizing dance, leaving them vulnerable!`,
			damage: 8,
			energy: 4,
		},
		{
			message: `**${Assailant}** summons a swarm of angry bees to attack **${Reciever}**!`,
			damage: 20,
			energy: 10,
		},
		{
			message: `**${Assailant}** uses mind control to force **${Reciever}** to attack themselves!`,
			damage: 5,
			energy: 2,
		},
		{
			message: `**${Assailant}** reveals their true form—a monstrous creature—and terrifies **${Reciever}**!`,
			damage: 18,
			energy: 9,
		},
		{
			message: `**${Assailant}** throws a handful of marbles, causing **${Reciever}** to slip and fall!`,
			damage: 7,
			energy: 2,
		},
		{
			message: `**${Assailant}** recites a cursed incantation, draining **${Reciever}**'s life force!`,
			damage: 25,
			energy: 10,
		},
		{
			message: `**${Assailant}** whips out a laser sword and slashes at **${Reciever}**!`,
			damage: 30,
			energy: 15,
		},
		{
			message: `**${Assailant}** used console commands to kill **${Reciever}** RIGGED THIS IS RIGGED!`,
			damage: 100,
			energy: 50,
		},
		{
			message: `**${Assailant}** whips **${Reciever}** with a heavy chain!`,
			damage: 15,
			energy: 7,
		},
		{
			message: `**${Assailant}** hits **${Reciever}** with a stunning lightning bolt!`,
			damage: 30,
			energy: 10,
		},
		{
			message: `**${Assailant}** launches a fireball at **${Reciever}**!`,
			damage: 20,
			energy: 10,
		},
		{
			message: `**${Assailant}** freezes **${Reciever}** with a chilling frost spell!`,
			damage: 18,
			energy: 9,
		},
		{
			message: `**${Assailant}** ensnares **${Reciever}** in a net of thorns!`,
			damage: 12,
			energy: 6,
		},
		{
			message: `**${Assailant}** lashes out with a flurry of shadow strikes at **${Reciever}**!`,
			damage: 22,
			energy: 11,
		},
		{
			message: `**${Assailant}** conjures a vortex of wind to hurl **${Reciever}** into the air!`,
			damage: 17,
			energy: 8,
		},
		{
			message: `**${Assailant}** blinds **${Reciever}** with a high-lumen flashlight!`,
			damage: 13,
			energy: 4,
		},
		{
			message: `**${Assailant}** traps **${Reciever}** in an explosive rune trap!`,
			damage: 26,
			energy: 13,
		},
		{
			message: `**${Assailant}** throws a javelin at **${Reciever}**!`,
			damage: 19,
			energy: 9,
		},
	];
	const recoveryActions = [
		{
			trigger: `**${Assailant}** takes a deep breath, focusing their energy...`,
			recovery: 40,
		},
		{
			trigger: `**${Assailant}** finds their inner calm amidst the chaos...`,
			recovery: 45,
		},
		{
			trigger: `**${Assailant}** rallies with a fierce battle cry...`,
			recovery: 60,
		},
		{
			trigger: `**${Assailant}** drinks a mysterious revitalizing potion...`,
			recovery: 80,
		},
		{
			trigger: `**${Assailant}** taps into a hidden reserve of strength...`,
			recovery: 80,
		},
		{
			trigger: `**${Assailant}** feels the exhaustion leave their body as they recite a restorative spell.`,
			recovery: 60,
		},
		{
			trigger: `**${Assailant}** absorbs the energy from the surrounding environment...`,
			recovery: 50,
		},
		{
			trigger: `**${Assailant}** uses a moment of peace to meditate and restore vitality...`,
			recovery: 20,
		},
		{
			trigger: `**${Assailant}** calls upon the spirits of previous battles to invigorate him...`,
			recovery: 50,
		},
		{
			trigger: `**${Assailant}** invokes an ancestral spirit for protection and healing...`,
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
				`**${Assailant}** is too exhausted to attack. *However... ${action.trigger}*`,
				RecieverHP,
				AssailantSP,
			];
		}
		return [
			`***${Assailant}** is too exhausted to attack.*`,
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
			`${chosenAttack.message} ***${Reciever}** finally succumbs to their injuries...* **${Assailant}** is the winner of this battle! 💪`,
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