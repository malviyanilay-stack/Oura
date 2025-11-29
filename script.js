let aura = 0;
let auraPerClick = 1;
let auraPerSecond = 0;

const clickSound = new Audio("https://cdn.pixabay.com/download/audio/2021/08/04/audio_bfbea995d7.mp3?filename=click-124467.mp3");
const buySound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_5946ee93e1.mp3?filename=correct-2-46134.mp3");

const auraImage = document.getElementById("auraImage");

auraImage.onclick = (e) => {
    aura += auraPerClick;
    updateAura();

    clickSound.currentTime = 0;
    clickSound.play();

    spawnFloatingText(e.pageX, e.pageY);
    spawnParticles(e.pageX, e.pageY);
};

// Floating + aura text
function spawnFloatingText(x, y) {
    const text = document.createElement("div");
    text.className = "floatingText";
    text.style.left = (x - 10) + "px";
    text.style.top = (y - 20) + "px";
    text.innerText = "+" + auraPerClick;

    document.body.appendChild(text);
    setTimeout(() => text.remove(), 1000);
}

// Particle burst animation
function spawnParticles(x, y) {
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";

        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 40;

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        particle.style.setProperty('--dx', Math.cos(angle) * distance + "px");
        particle.style.setProperty('--dy', Math.sin(angle) * distance + "px");

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 700);
    }
}

function updateAura() {
    document.getElementById("auraCount").innerText = Math.floor(aura);
}

// 20 upgrades
const upgrades = [
    {name: "Spark Boost",        cost: 20,   click: 1},
    {name: "Gleam Touch",        cost: 50,   click: 2},
    {name: "Radiant Surge",      cost: 120,  click: 4},
    {name: "Aurora Infusion",    cost: 300,  click: 7},
    {name: "Ethereal Tap",       cost: 600,  click: 10},
    {name: "Celestial Reach",    cost: 1200, click: 15},
    {name: "Lunar Blessing",     cost: 2500, click: 25},
    {name: "Solar Harmony",      cost: 5000, click: 40},
    {name: "Nebula Focus",       cost: 9000, click: 60},
    {name: "Starlight Pulse",    cost: 15000,click: 90},

    {name: "Calm Breeze",        cost: 2000, passive: 1},
    {name: "Sky Glow",           cost: 4500, passive: 3},
    {name: "Northern Drift",     cost: 9000, passive: 5},
    {name: "Arctic Flow",        cost: 15000, passive: 8},
    {name: "Polar Radiance",     cost: 30000, passive: 12},
    {name: "Dreamy Horizon",     cost: 60000, passive: 20},
    {name: "Twilight Hum",       cost: 120000, passive: 35},
    {name: "Cosmic Whisper",     cost: 250000, passive: 50},
    {name: "Eclipse Spirit",     cost: 450000, passive: 75},
    {name: "Astral Heart",       cost: 700000, passive: 120}
];

const storeDiv = document.getElementById("store");

// Construct upgrade list
upgrades.forEach((upg, i) => {
    const div = document.createElement("div");
    div.className = "upgrade";
    div.id = "upgrade" + i;

    div.innerHTML = `
        <strong>${upg.name}</strong><br>
        Cost: ${upg.cost} aura<br>
        ${upg.click ? "+" + upg.click + " per click" : ""}
        ${upg.passive ? "+" + upg.passive + " per second" : ""}
    `;

    div.onclick = () => buyUpgrade(i);
    storeDiv.appendChild(div);
});

function buyUpgrade(i) {
    const upg = upgrades[i];
    if (aura >= upg.cost) {
        aura -= upg.cost;

        if (upg.click) auraPerClick += upg.click;
        if (upg.passive) auraPerSecond += upg.passive;

        updateAura();

        buySound.currentTime = 0;
        buySound.play();

        document.getElementById("upgrade" + i).remove();
    }
}

// Passive aura generation
setInterval(() => {
    aura += auraPerSecond;
    updateAura();
}, 1000);
