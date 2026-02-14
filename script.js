let pin = "";
const correctPin = "0214";
let yesScale = 1;
const maxScale = 4; // batas biar ga kebesaran

function goToPage(id) {
    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
        setTimeout(() => { p.style.display = "none"; }, 500);
    });

    const target = document.getElementById(id);
    setTimeout(() => {
        target.style.display = "flex";
        setTimeout(() => { target.classList.add("active"); }, 50);
    }, 550);

    if (id !== "page-wrong") {
        localStorage.setItem("valentinePage", id);
    }
}

window.onload = function () {
    const savedPage = localStorage.getItem("valentinePage");
    if (savedPage) {
        goToPage(savedPage);
    } else {
        goToPage("page-pin");
    }
};

function addNumber(num) {
    if (pin.length < 4) {
        pin += num;
        document.getElementById("pinDisplay").innerText = "•".repeat(pin.length);
    }
}

function clearPin() {
    pin = pin.slice(0, -1);
    document.getElementById("pinDisplay").innerText = "•".repeat(pin.length);
}

function checkPin() {
    if (pin === correctPin) {
        goToPage("page-card");
    } else {
        goToPage("page-wrong");
    }
    pin = "";
    document.getElementById("pinDisplay").innerText = "";
}

function flipCard() {
    document.querySelector(".flip-card").classList.toggle("flipped");
    document.getElementById("nextAfterCard").classList.remove("hidden");
}


/* ================= NO BUTTON EFFECT ================= */
function growYes() {

    if (yesScale < maxScale) {
        yesScale += 0.6;
    }

    const yesBtn = document.getElementById("yesBtn");
    yesBtn.style.transform = `scale(${yesScale})`;

    // efek sedikit geser tombol No biar makin panik
    const noBtn = document.getElementById("noBtn");
    noBtn.style.transform = `translateX(${Math.random() * 30 - 15}px)`;

    setTimeout(() => {
        alert("Yang bener aja, RUGI DONG!!");
    }, 200);
}

/* ================= YES ================= */
function sayYes() {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        goToPage("page-final");
    }, 1000);
}

function resetApp() {
    localStorage.clear();
    location.reload();
}

const audio = document.getElementById("song");
const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸ Pause";
    } else {
        audio.pause();
        playBtn.textContent = "▶ Play Song";
    }
});

// Kalau lagu selesai, balik ke Play
audio.addEventListener("ended", function () {
    playBtn.textContent = "▶ Play Song";
});

