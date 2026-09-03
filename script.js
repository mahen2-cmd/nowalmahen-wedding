function initWebsite() {
    let currentLang = "en";

    // Navigation & UI Elements

    const langToggle = document.getElementById("langToggle");

    const navToggle = document.getElementById("navToggle");

    const navMenu = document.getElementById("navMenu");

    const navBackdrop = document.getElementById("navBackdrop");

    const navLinks = document.querySelectorAll(".nav-links a");

    const petalContainer =
        document.getElementById("petalContainer") ||
        document.querySelector(".floral-bg-petals");

    // Helper function to convert English digits (0-9) to Urdu digits (۰-۹)

    function toUrduDigits(str) {
        const urduDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

        return String(str).replace(
            /[0-9]/g,
            (w) => urduDigits[parseInt(w, 10)],
        );
    }

    function setLanguage(lang) {
        currentLang = lang;

        document.body.classList.toggle("lang-ur", currentLang === "ur");

        if (langToggle) {
            langToggle.textContent = currentLang === "en" ? "اردو" : "English";
        }

        const translatableElements =
            document.querySelectorAll("[data-en][data-ur]");

        translatableElements.forEach((el) => {
            let text = el.getAttribute(`data-${currentLang}`);

            if (currentLang === "ur") {
                text = toUrduDigits(text);
            }

            el.textContent = text;
        });

        updateCountdown();

        stopCardTTS();
    }

    // 0. 3D Wrought-Iron Arch Gate Entrance Animation with Language Selection

    const gateIntro = document.getElementById("gateIntro");

    const gateEnterEn = document.getElementById("gateEnterEn");

    const gateEnterUr = document.getElementById("gateEnterUr");

    const gateSeal = document.getElementById("gateSeal");

    let gateOpened = false;

    function openGateWithLang(chosenLang, e) {
        if (e && e.cancelable && e.type !== "click") {
            e.preventDefault();
        }

        if (e) e.stopPropagation();

        if (gateOpened || !gateIntro) return;

        gateOpened = true;

        if (chosenLang && chosenLang !== currentLang) {
            setLanguage(chosenLang);
        }

        gateIntro.classList.add("gate-opening");

        setTimeout(() => {
            if (gateIntro && gateIntro.parentNode) {
                gateIntro.style.display = "none";
            }
        }, 1800);
    }

    if (gateEnterEn) {
        ["click", "touchend", "pointerup"].forEach((evt) => {
            gateEnterEn.addEventListener(
                evt,
                (e) => openGateWithLang("en", e),
                { passive: false },
            );
        });
    }

    if (gateEnterUr) {
        ["click", "touchend", "pointerup"].forEach((evt) => {
            gateEnterUr.addEventListener(
                evt,
                (e) => openGateWithLang("ur", e),
                { passive: false },
            );
        });
    }

    if (gateIntro) {
        ["click", "touchend", "pointerup"].forEach((evt) => {
            gateIntro.addEventListener(
                evt,
                (e) => openGateWithLang(currentLang, e),
                { passive: false },
            );
        });
    }

    // 1. Live Countdown Timer
    // Target: Sept 13, 2026, 2:45 PM PKT
    // Unix timestamp: 1789292700

    const targetTimestamp = 1789292700 * 1000;

    function updateCountdown() {
        const cdDays = document.getElementById("cd-days");

        const cdHours = document.getElementById("cd-hours");

        const cdMins = document.getElementById("cd-mins");

        const cdSecs = document.getElementById("cd-secs");

        const now = Date.now();

        const diff = Math.max(0, targetTimestamp - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );

        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const dStr = String(days).padStart(2, "0");

        const hStr = String(hours).padStart(2, "0");

        const mStr = String(minutes).padStart(2, "0");

        const sStr = String(seconds).padStart(2, "0");

        if (cdDays) {
            cdDays.textContent =
                currentLang === "ur" ? toUrduDigits(dStr) : dStr;
        }

        if (cdHours) {
            cdHours.textContent =
                currentLang === "ur" ? toUrduDigits(hStr) : hStr;
        }

        if (cdMins) {
            cdMins.textContent =
                currentLang === "ur" ? toUrduDigits(mStr) : mStr;
        }

        if (cdSecs) {
            cdSecs.textContent =
                currentLang === "ur" ? toUrduDigits(sStr) : sStr;
        }
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);

    // 2. Romantic Blush & Rose Vector Petals Generator

    const petalSVGs = [
        // Soft Rose Petal

        `<svg viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path
        d="M15 2 C24 2, 29 12, 27 24 C25 34, 18 39, 15 39
           C12 39, 5 34, 3 24 C1 12, 6 2, 15 2 Z"
        fill="url(#roseGrad)"
        opacity="0.9"
      />

      <defs>

        <linearGradient
          id="roseGrad"
          x1="0"
          y1="0"
          x2="30"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >

          <stop stop-color="#FCDADF"/>

          <stop offset="0.5" stop-color="#E89BB4"/>

          <stop offset="1" stop-color="#C46988"/>

        </linearGradient>

      </defs>

    </svg>`,

        // Blush Peach Petal

        `<svg viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path
        d="M14 2 C23 6, 26 20, 20 30 C16 36, 12 38, 14 38
           C10 38, 4 32, 2 22 C0 12, 5 4, 14 2 Z"
        fill="url(#peachGrad)"
        opacity="0.88"
      />

      <defs>

        <linearGradient
          id="peachGrad"
          x1="0"
          y1="0"
          x2="28"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >

          <stop stop-color="#FFE4D6"/>

          <stop offset="0.5" stop-color="#FBBCA4"/>

          <stop offset="1" stop-color="#E2876A"/>

        </linearGradient>

      </defs>

    </svg>`,

        // Ivory Magnolia Petal

        `<svg viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path
        d="M15 2 C24 4, 27 15, 25 26 C23 35, 17 39, 15 39
           C13 39, 7 35, 5 26 C3 15, 6 4, 15 2 Z"
        fill="url(#ivoryGrad)"
        opacity="0.92"
      />

      <defs>

        <linearGradient
          id="ivoryGrad"
          x1="0"
          y1="0"
          x2="30"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >

          <stop stop-color="#FFFFFF"/>

          <stop offset="0.6" stop-color="#FDF2EC"/>

          <stop offset="1" stop-color="#F2D5C4"/>

        </linearGradient>

      </defs>

    </svg>`,

        // Warm Plum Blossom Petal

        `<svg viewBox="0 0 26 36" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path
        d="M13 2 C22 8, 24 22, 13 34 C2 22, 4 8, 13 2 Z"
        fill="url(#plumGrad)"
        opacity="0.85"
      />

      <defs>

        <linearGradient
          id="plumGrad"
          x1="0"
          y1="0"
          x2="26"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >

          <stop stop-color="#EBBFD2"/>

          <stop offset="0.6" stop-color="#B87697"/>

          <stop offset="1" stop-color="#865275"/>

        </linearGradient>

      </defs>

    </svg>`,
    ];

    function createPetal(initialY = null) {
        if (!petalContainer) return;

        const petal = document.createElement("div");

        const isBg = Math.random() > 0.6;

        petal.className = `petal ${isBg ? "bg-depth" : "fg-depth"}`;

        const svgIndex = Math.floor(Math.random() * petalSVGs.length);

        petal.innerHTML = petalSVGs[svgIndex];

        const left = Math.random() * 94;

        const size = isBg ? Math.random() * 8 + 14 : Math.random() * 12 + 20;

        const duration = isBg ? Math.random() * 6 + 14 : Math.random() * 6 + 10;

        const delay = initialY !== null ? 0 : Math.random() * 2;

        petal.style.left = `${left}vw`;

        petal.style.width = `${size}px`;

        petal.style.height = `${size * 1.3}px`;

        petal.style.animationDuration = `${duration}s`;

        petal.style.animationDelay = `${delay}s`;

        if (initialY !== null) {
            petal.style.top = `${initialY}vh`;
        } else {
            petal.style.top = `-40px`;
        }

        petal.addEventListener("animationend", () => {
            petal.remove();
        });

        petalContainer.appendChild(petal);
    }

    for (let i = 0; i < 7; i++) {
        createPetal(Math.random() * 90);
    }

    setInterval(() => createPetal(), 2800);

    // 3. Language Toggle Logic (English <-> Urdu with Number Translation)

    if (langToggle) {
        langToggle.addEventListener("click", () => {
            const nextLang = currentLang === "en" ? "ur" : "en";

            setLanguage(nextLang);
        });
    }

    // 4. Reliable Card-by-Card Audio Voice Player

    const cardAudioBtns = document.querySelectorAll(".card-audio-btn");

    let currentAudio = null;

    let activeCardKey = null;

    function stopCardTTS() {
        activeCardKey = null;

        cardAudioBtns.forEach((btn) => {
            btn.classList.remove("playing");

            const textSpan = btn.querySelector(".card-audio-text");

            if (textSpan) {
                textSpan.textContent = currentLang === "ur" ? "سنیں" : "Listen";
            }
        });

        if (currentAudio) {
            currentAudio.pause();

            currentAudio.currentTime = 0;

            currentAudio = null;
        }
    }

    function playCardTTS(cardKey, btn) {
        const isSameCard = activeCardKey === cardKey;

        stopCardTTS();

        if (isSameCard) return;

        activeCardKey = cardKey;

        btn.classList.add("playing");

        const textSpan = btn.querySelector(".card-audio-text");

        if (textSpan) {
            textSpan.textContent = currentLang === "ur" ? "روکیں" : "Pause";
        }

        const audioSrc = `audio/${cardKey}_${currentLang}.mp3?v=17`;

        const audio = new Audio(audioSrc);

        currentAudio = audio;

        audio.onended = () => {
            stopCardTTS();
        };

        audio.onerror = () => {
            console.warn("Could not play:", audioSrc);

            stopCardTTS();
        };

        audio.play().catch((err) => {
            console.warn("Audio playback error:", err);

            stopCardTTS();
        });
    }

    cardAudioBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const cardKey = btn.getAttribute("data-tts-card");

            if (cardKey) {
                playCardTTS(cardKey, btn);
            }
        });
    });

    // 5. Mobile Sidebar Navigation Controls

    function toggleMenu() {
        if (navToggle) {
            navToggle.classList.toggle("active");
        }

        if (navMenu) {
            navMenu.classList.toggle("active");
        }

        if (navBackdrop) {
            navBackdrop.classList.toggle("active");
        }
    }

    function closeMenu() {
        if (navToggle) {
            navToggle.classList.remove("active");
        }

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (navBackdrop) {
            navBackdrop.classList.remove("active");
        }
    }

    if (navToggle) {
        navToggle.addEventListener("click", toggleMenu);
    }

    if (navBackdrop) {
        navBackdrop.addEventListener("click", closeMenu);
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // 6. 3D Scroll Animations

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },

        { threshold: 0.08 },
    );

    document.querySelectorAll(".fade-in").forEach((el) => {
        observer.observe(el);
    });

    // 7. Subtle Parallax & 3D Interactive Card Tilt

    const leftDecor = document.querySelector(".left-decor");

    const rightDecor = document.querySelector(".right-decor");

    const fairyLights = document.querySelector(".fairy-lights-container");

    let ticking = false;

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;

                    if (scrolled < 900) {
                        if (leftDecor) {
                            leftDecor.style.transform = `translateY(${scrolled * 0.12}px)`;
                        }

                        if (rightDecor) {
                            rightDecor.style.transform = `translateY(${scrolled * 0.12}px)`;
                        }

                        if (fairyLights) {
                            fairyLights.style.transform = `translateX(-50%) translateY(${scrolled * 0.07}px)`;
                        }
                    }

                    ticking = false;
                });

                ticking = true;
            }
        },
        { passive: true },
    );

    // Subtle 3D Card Hover Tilt (for mouse devices)

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const cards = document.querySelectorAll(".card");

        cards.forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;

                const y = e.clientY - rect.top;

                const xPercent = (x / rect.width - 0.5) * 6;

                const yPercent = (y / rect.height - 0.5) * -6;

                card.style.transform = `perspective(800px) rotateX(${yPercent.toFixed(2)}deg) rotateY(${xPercent.toFixed(2)}deg) translateY(-6px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWebsite);
} else {
    initWebsite();
}
