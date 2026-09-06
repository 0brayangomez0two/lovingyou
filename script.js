document.addEventListener('DOMContentLoaded', () => {

  // 1. CONFIGURACIÓN DE FECHA DE INICIO (Año, Mes [0-11], Día, Hora, Minutos)
  // 1. CONFIGURACIÓN DE FECHA DE INICIO (Año, Mes [0-11], Día, Hora, Minutos)
  // Nota: Los meses en JavaScript van de 0 (Enero) a 11 (Diciembre)
  const startDate = new Date(2025, 9, 10, 0, 0, 0); // Ejemplo: Ajusta a tu fecha real de aniversario

  const yearsEl = document.getElementById('years');
  const monthsEl = document.getElementById('months');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCounter() {
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    // Ajuste preciso de tiempo (segundos, minutos, horas)
    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }

    // Ajuste preciso de días y meses tomando el mes de referencia correcto
    if (days < 0) {
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    yearsEl.textContent = years;
    monthsEl.textContent = months;
    daysEl.textContent = days;
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCounter, 1000);
  updateCounter();

  // 2. LÓGICA DEL CARRUSEL DE FOTOS (BUCLE EN DESPLAZAMIENTO)
  const track = document.getElementById('carouselTrack');
  const slides = Array.from(track.children);
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nav = document.getElementById('carouselNav');

  let currentIndex = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-indicator');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => moveToSlide(index));
    nav.appendChild(dot);
  });

  const dots = Array.from(nav.children);

  function moveToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;
  }

  nextBtn.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(nextIndex);
  });

  prevBtn.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide(prevIndex);
  });

  // 3. CONTROL DEL REPRODUCTOR ESTILO LOVELY LENS
  const music = document.getElementById('bgMusic');
  const playBtn = document.getElementById('playMusicBtn');
  const playIcon = document.getElementById('playIcon');
  const songDisc = document.getElementById('songDisc');
  const progressBar = document.getElementById('progressBar');
  const progressContainer = document.getElementById('progressContainer');
  const currentTimeEl = document.getElementById('currentTime');
  const durationTimeEl = document.getElementById('durationTime');

  playBtn.addEventListener('click', () => {
    if (music.paused) {
      music.play();
      playIcon.textContent = '⏸';
      songDisc.classList.add('playing');
    } else {
      music.pause();
      playIcon.textContent = '▶';
      songDisc.classList.remove('playing');
    }
  });

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  music.addEventListener('loadedmetadata', () => {
    durationTimeEl.textContent = formatTime(music.duration);
  });

  music.addEventListener('timeupdate', () => {
    if (music.duration) {
      const progressPercent = (music.currentTime / music.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      currentTimeEl.textContent = formatTime(music.currentTime);
    }
  });

  progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;
    if (duration) {
      music.currentTime = (clickX / width) * duration;
    }
  });

  // 4. BOTÓN INTERACTIVO SORPRESA
  const loveBtn = document.getElementById('loveBtn');
  const surpriseMessage = document.getElementById('surpriseMessage');

  loveBtn.addEventListener('click', () => {
    surpriseMessage.classList.toggle('hidden');
  });

});