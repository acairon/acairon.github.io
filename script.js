// Asegúrate de que tu script se ejecute cuando el DOM ya está cargado
document.addEventListener('DOMContentLoaded', () => {
  /* ========== PARTICLES.JS CONFIG ========== */
  particlesJS("particles-js", {
    "particles": {
      "number": { "value": 50 },
      "color": { "value": ["#ffffff", "#cceeff"] },
      "shape": { "type": "circle" },
      "opacity": {
        "value": 0.5,
        "random": true
      },
      "size": {
        "value": 3,
        "random": true
      },
      "line_linked": { "enable": false },
      "move": {
        "enable": true,
        "speed": 1.5,
        "random": true,
        "out_mode": "out"
      }
    },
    "interactivity": {
      "events": {
        "onhover": { "enable": true, "mode": "bubble" },
        "onclick": { "enable": false }
      },
      "modes": {
        "bubble": { "distance": 200, "size": 5, "duration": 2 }
      }
    },
    "retina_detect": true
  });

  /* ========== SCROLL TOP BUTTON ========== */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  scrollTopBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ========== BURBUJAS HEADER => Explosión y reaparición ========== */
  const headerBubbles = document.querySelectorAll('.bubble');
  headerBubbles.forEach(bub => {
    bub.addEventListener('click', () => {
      bub.classList.add('explode');
      bub.addEventListener('animationend', () => {
        bub.remove();
        // Reaparecer otra burbuja tras X ms
        setTimeout(() => {
          recreateBubble();
        }, 2000);
      }, { once: true });
    });
  });

  function recreateBubble() {
    const header = document.querySelector('header');
    const newBub = document.createElement('div');
    newBub.classList.add('bubble');
    // Tamaño
    const size = 40 + Math.random() * 40;
    newBub.style.width = size + "px";
    newBub.style.height = size + "px";
    // Posición
    newBub.style.top = (10 + Math.random() * 40) + "%";
    newBub.style.left = (10 + Math.random() * 70) + "%";

    // Lógica de click
    newBub.addEventListener('click', () => {
      newBub.classList.add('explode');
      newBub.addEventListener('animationend', () => {
        newBub.remove();
        setTimeout(() => recreateBubble(), 2000);
      }, { once: true });
    });
    header.appendChild(newBub);
  }

  /* ========== EASTER EGG: MINIJUEGO ========== */
  const unlockGameBtn = document.getElementById("unlockGameBtn");
  const body = document.body;
  const minigamePlayArea = document.getElementById("minigamePlayArea");

  const heartsDiv = document.getElementById("hearts");
  const scoreVal = document.getElementById("scoreVal");
  const gameOverMsg = document.getElementById("gameOverMsg");
  const finalScore = document.getElementById("finalScore");
  const btnRetryGame = document.getElementById("btnRetryGame");
  const btnExitPortfolio = document.getElementById("btnExitPortfolio");

  let hearts = 3;
  let score = 0;
  let spawnInterval;
  let gameActive = false;

  unlockGameBtn.addEventListener('click', () => {
    // Activar modo minijuego
    body.classList.add("minigame-mode");
    startGame();
  });
  btnExitPortfolio.addEventListener('click', exitGameMode);
  btnRetryGame.addEventListener('click', startGame);

  function startGame() {
    gameActive = true;
    hearts = 3;
    score = 0;
    renderHearts();
    scoreVal.textContent = score;
    gameOverMsg.style.display = "none";

    // Eliminar burbujas previas
    document.querySelectorAll(".minigame-bubble").forEach(b => b.remove());

    // Iniciar spawn
    spawnInterval = setInterval(createMinigameBubble, 700);
  }

  function createMinigameBubble() {
    if (!gameActive) return;

    const bubble = document.createElement("div");
    bubble.classList.add("minigame-bubble");

    // Tamaño
    const size = 30 + Math.random() * 40;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    // Posición horizontal
    const areaW = minigamePlayArea.clientWidth;
    const maxLeft = areaW - size;
    const leftPos = Math.random() * maxLeft;
    bubble.style.left = leftPos + "px";

    // Clic => sumar punto
    bubble.addEventListener("click", () => {
      score++;
      scoreVal.textContent = score;
      bubble.remove();
    });

    // Al terminar la animación => no explotada => pierdes vida
    bubble.addEventListener("animationend", () => {
      if (bubble.parentNode) {
        hearts--;
        renderHearts();
        bubble.remove();
        if (hearts <= 0) {
          endGame();
        }
      }
    });

    minigamePlayArea.appendChild(bubble);
  }

  function endGame() {
    gameActive = false;
    clearInterval(spawnInterval);
    document.querySelectorAll(".minigame-bubble").forEach(b => b.remove());
    finalScore.textContent = score;
    gameOverMsg.style.display = "block";
  }

  function exitGameMode() {
    endGame();
    // Quitamos la clase -> vuelve a verse el portafolio
    body.classList.remove("minigame-mode");
  }

  function renderHearts() {
    heartsDiv.innerHTML = "";
    for (let i = 0; i < hearts; i++) {
      heartsDiv.innerHTML += `<span class="heart">❤️</span>`;
    }
  }

  setTimeout(() => {
    console.log("%c¡Ssshh! Hay un minijuego oculto en el portafolio...", "color: #0a74da; font-size:14px;");
  }, 10000);

  /* ========== LÓGICA DEL MODAL PARA CONTACTO ========== */
  const contactEmail = document.getElementById('contactEmail');
  const emailModal = document.getElementById('emailModal');
  const openDefaultEmailBtn = document.getElementById('openDefaultEmail');
  const openFormBtn = document.getElementById('openForm');
  const contactForm = document.getElementById('contactForm');
  const cancelFormBtn = document.getElementById('cancelForm');

  // Al hacer clic en el correo
  contactEmail.addEventListener('click', () => {
    emailModal.style.display = 'flex';
  });

  // Opción 1: abrir la app de correo local
  openDefaultEmailBtn.addEventListener('click', () => {
    window.location.href = 'mailto:angelshce@gmail.com?subject=Contacto%20desde%20el%20Portafolio';
    emailModal.style.display = 'none';
  });

  // Opción 2: mostrar formulario (servicio externo)
  openFormBtn.addEventListener('click', () => {
    // Ocultamos los botones iniciales, si deseas
    openDefaultEmailBtn.style.display = 'none';
    openFormBtn.style.display = 'none';
    // Muestra el formulario
    contactForm.style.display = 'block';
  });

  // Botón "Cancelar" del formulario
  cancelFormBtn.addEventListener('click', () => {
    contactForm.reset();
    contactForm.style.display = 'none';
    openDefaultEmailBtn.style.display = 'inline-block';
    openFormBtn.style.display = 'inline-block';
    emailModal.style.display = 'none';
  });

  // Al enviar el formulario (Formspree u otro servicio maneja el POST)
  contactForm.addEventListener('submit', () => {
    // Simplemente dejamos que el formulario se envíe a la URL indicada en "action"
    // Después de enviar, cerramos el modal y reseteamos
    emailModal.style.display = 'none';
    contactForm.reset();
    contactForm.style.display = 'none';
    openDefaultEmailBtn.style.display = 'inline-block';
    openFormBtn.style.display = 'inline-block';
  });
});


document.getElementById('contactForm').addEventListener('submit', function (e) {
  const email = document.getElementById('senderEmail').value;
  const message = document.getElementById('message').value;

  if (!email || !message) {
    e.preventDefault(); // Evita el envío del formulario
    alert('Por favor, completa todos los campos.');
  } else {
    console.log('Email:', email);
    console.log('Message:', message);
  }
});