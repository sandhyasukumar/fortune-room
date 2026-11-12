
/* ========================================
   THE FORTUNE ROOM
   Fortune Categories
======================================== */

// TYPE A: Predictions

const typeA = [
    "You work best when you care about the problem.",
    "A small thing you try this month will matter more than you expect.",
    "You are better at something than you currently believe.",
    "Someone around you is quietly learning from how you work.",
    "Your best idea will come when you stop forcing it.",
    "You will enjoy work where you can see the result.",
    "People will remember how you helped them more than what you said.",
    "A hard subject now will become a useful skill later.",
    "You are about to find out something new about yourself.",
    "The path you take will not be a straight line.",
    "You will do your best work with people you trust.",
    "Something you are curious about right now will stay with you."
];


// TYPE B: Funny and silly fortunes

const typeB = [
    "You will become a world champion at finding lost chargers.",
    "You will invent a cure for Monday mornings.",
    "A pigeon will soon give you very good advice.",
    "You will win a debate against your own alarm clock.",
    "You will one day explain your job to a very confused grandparent.",
    "Your future includes a lot of filter coffee.",
    "You will rename a street and nobody will notice.",
    "You will teach a robot to say vanakkam.",
    "You will be the only person who reads the whole user manual.",
    "You will beat Chennai traffic once, and tell everyone about it."
];


// TYPE C: Reflective questions

const typeC = [
    "What would you try if you knew you could not fail?",
    "What do you do for hours without noticing the time?",
    "Who do you know that has a job you are curious about?",
    "What problem around you would you like to fix?",
    "What did you enjoy in Class 9 or 10 that you have stopped doing?",
    "If you could follow someone around at work for a day, who would it be?",
    "What are you good at that nobody has asked you about?",
    "What would a Tuesday afternoon look like in your dream job?"
];


// ALL FORTUNES

const fortunes = [...typeA, ...typeB, ...typeC];


// ========================================
// CATEGORY SELECTOR
// ========================================

const categorySelect = document.createElement("select");

categorySelect.id = "fortuneCategory";

categorySelect.innerHTML = `
    <option value="all">✧ Surprise Me ✧</option>
    <option value="typeA">🔮 Prediction</option>
    <option value="typeB">☻ Funny Fortune</option>
    <option value="typeC">✧ Reflective Question</option>
`;

// Style the category selector

categorySelect.style.cssText = `
    display: block;
    margin: 20px auto;
    padding: 12px 22px;
    min-width: 230px;
    background: #fff8e9;
    color: #805b35;
    border: 1px solid #c9a36c;
    border-radius: 30px;
    font-family: Georgia, serif;
    font-size: 14px;
    letter-spacing: 0.5px;
    cursor: pointer;
    outline: none;
    box-shadow: 0 3px 12px #9c744522;
`;


// Put selector above the button

const fortuneButton = document.getElementById("fortuneButton");

fortuneButton.parentNode.insertBefore(
    categorySelect,
    fortuneButton
);


// ========================================
// SOUND EFFECTS
// ========================================

let audioContext;

function getAudio() {

    if (!audioContext) {
        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    return audioContext;
}


// COOKIE CRACK SOUND

function playCrackSound() {

    const audio = getAudio();
    const now = audio.currentTime;

    const buffer = audio.createBuffer(
        1,
        audio.sampleRate * 0.15,
        audio.sampleRate
    );

    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audio.createBufferSource();
    const volume = audio.createGain();

    noise.buffer = buffer;

    volume.gain.setValueAtTime(0.3, now);

    volume.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.15
    );

    noise.connect(volume);
    volume.connect(audio.destination);

    noise.start(now);
    noise.stop(now + 0.15);
}


// MAGICAL REVEAL CHIME

function playRevealSound() {

    const audio = getAudio();
    const now = audio.currentTime;

    [880, 1174, 1480].forEach(function(frequency, index) {

        const oscillator = audio.createOscillator();
        const volume = audio.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;

        volume.gain.setValueAtTime(0.001, now);

        volume.gain.linearRampToValueAtTime(
            0.12,
            now + 0.05
        );

        volume.gain.exponentialRampToValueAtTime(
            0.001,
            now + 0.8
        );

        oscillator.connect(volume);
        volume.connect(audio.destination);

        oscillator.start(now + index * 0.12);
        oscillator.stop(now + 0.9);

    });
}


// ========================================
// SELECT FORTUNE CATEGORY
// ========================================

function getSelectedFortunes() {

    const category = categorySelect.value;

    if (category === "typeA") {
        return typeA;
    }

    if (category === "typeB") {
        return typeB;
    }

    if (category === "typeC") {
        return typeC;
    }

    return fortunes;
}


// ========================================
// MAIN FORTUNE FUNCTION
// ========================================

function getFortune() {

    const selectedFortunes = getSelectedFortunes();

    const randomIndex = Math.floor(
        Math.random() * selectedFortunes.length
    );

    const fortuneBox = document.getElementById("fortune");
    const cookie = document.getElementById("cookie");
    const button = document.getElementById("fortuneButton");
    const sparkleBurst = document.getElementById("sparkleBurst");

    // Prevent multiple clicks during animation

    button.disabled = true;

    // Reset previous cookie animation

    cookie.classList.remove("open");
    sparkleBurst.classList.remove("show");

    // Shake the cookie

    cookie.classList.add("shaking");

    setTimeout(function() {

        cookie.classList.remove("shaking");

    }, 450);


    // Update button text

    button.innerHTML = 'Crack Another Cookie <span>✧</span>';


    // Wait for the previous paper to disappear

    setTimeout(function() {

        // Choose a fortune from the selected category

        fortuneBox.innerText = selectedFortunes[randomIndex];

        // Play crack sound

        playCrackSound();

        // Open the cookie

        cookie.classList.add("open");


        // Show golden sparkles

        sparkleBurst.classList.add("show");

        setTimeout(function() {

            sparkleBurst.classList.remove("show");

        }, 900);


        // Play reveal chime after paper unfolds

        setTimeout(function() {

            playRevealSound();

            button.disabled = false;

        }, 1300);

    }, 1300);

}
