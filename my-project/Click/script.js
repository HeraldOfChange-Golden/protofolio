(function clockInit(){
  const el = document.getElementById('clock');
  function update(){
    // Ambil waktu sekarang dalam UTC
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    // Tambahkan offset WIB = UTC+7
    const wib = new Date(utc + (7 * 60 * 60000));

    const hh = String(wib.getHours()).padStart(2, '0');
    const mm = String(wib.getMinutes()).padStart(2, '0');
    const ss = String(wib.getSeconds()).padStart(2, '0');

    el.textContent = `${hh}:${mm}:${ss}`;
  }
  update();
  setInterval(update, 1000);
})();



// ---------- Calculator ----------
(function calcInit(){
  const btn = document.getElementById('calcBtn');
  const n1 = document.getElementById('num1');
  const n2 = document.getElementById('num2');
  const op = document.getElementById('op');
  const out = document.getElementById('calcResult');

  function safeParse(v){
    return v === '' ? 0 : Number(v);
  }

  if(btn){
    btn.addEventListener('click', () => {
      const a = safeParse(n1.value);
      const b = safeParse(n2.value);
      let res;
      switch(op.value){
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '*': res = a * b; break;
        case '/': res = b !== 0 ? (a / b) : 'Error (bagi 0)'; break;
        default: res = 'Operator tidak valid';
      }
      out.textContent = 'Hasil: ' + res;
    });
  }
})();

// ---------- Contact form ----------
(function contactHandler(){
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nama = data.get('nama') || '';
    const email = data.get('email') || '';
    const pesan = data.get('pesan') || '';
    if(!nama.trim() || !email.trim() || !pesan.trim()){
      msg.textContent = 'Mohon isi semua field sebelum mengirim :(';
      return;
    }
    // mimic success
    msg.textContent = 'Terima kasih! Pesan berhasil disimpan :)';
    form.reset();
  });
})();

// ---------- Lightweight smoke background ----------
(function smoke(){
  const canvas = document.getElementById('smokeCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);

  // particles
  const particles = [];
  const P = 28; // low count for performance
  for(let i=0;i<P;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: (Math.random()* 50 + 20),
      vx: (Math.random()*0.2 - 0.1),
      vy: (Math.random()*0.3 + 0.05),
      alpha: Math.random()*0.25 + 0.05
    });
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    // subtle gradient overlay
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0, 'rgba(125, 181, 255, 0.29)');
    g.addColorStop(1, 'rgba(18, 18, 32, 0.18)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);

    particles.forEach(p=>{
      p.x += p.vx;
      p.y -= p.vy;
      p.alpha -= 0.00010;
      if(p.alpha <= 0 || p.y + p.r < -50){
        p.x = Math.random()*W;
        p.y = H + Math.random()*200;
        p.r = (Math.random()*105 + 70);
        p.vx = (Math.random()*0.5 - 0.3);
        p.vy = (Math.random()*0.2 + 0.04);
        p.alpha = Math.random()*0.25 + 0.05;
      }

      // draw soft circle
      const rad = ctx.createRadialGradient(p.x, p.y, p.r*0.1, p.x, p.y, p.r);
      rad.addColorStop(0, `rgba(120,140,255,${p.alpha})`);
      rad.addColorStop(0.6, `rgba(120,140,255,${p.alpha*0.12})`);
      rad.addColorStop(1, `rgba(255, 255, 255, 0.06)`);
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
})();

// ---------- Avatar Shake Timer ----------
(function avatarShake() {
    const avatar = document.getElementById('myAvatar');
    if (!avatar) return;

    const SHAKE_DURATION = 10000;
    let shakeTimer = null;

    function startShake() {

        clearTimeout(shakeTimer); 

        avatar.classList.add('shaking');

        shakeTimer = setTimeout(() => {
            avatar.classList.remove('shaking');
        }, SHAKE_DURATION);
    }
    avatar.addEventListener('mouseenter', startShake);

    avatar.addEventListener('touchstart', startShake);

    avatar.addEventListener('mouseleave', () => {
        clearTimeout(shakeTimer);
        avatar.classList.remove('shaking');
    });

        clearTimeout(shakeTimer);
    });

// Tambahkan code ini ke script.js Anda

(function weatherInit() {
  const API_KEY = "1a707d8de7e48449e26ebb1c28967458";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/";

  const resultContainer = document.getElementById('weatherResult');
  const locationBtn = document.getElementById('useLocationBtn');
  const searchBtn = document.getElementById('searchCityBtn');
  const cityInput = document.getElementById('cityInput');
  const tempToggleBtn = document.getElementById('toggleTempBtn');
  const msg = document.getElementById('weatherMessage');

  let unit = 'C';
  let currentWeatherData = null;
  let forecastData = null;

  function kelvinToUnit(kelvin, targetUnit) {
    return targetUnit === 'F'
      ? Math.round((kelvin - 273.15) * 9 / 5 + 32)
      : Math.round(kelvin - 273.15);
  }

  function showMessage(text, isError = false) {
    msg.textContent = text;
    msg.className = isError ? 'text-red-400 mt-4 text-center' : 'text-green-400 mt-4 text-center';
  }

  function renderWeather() {
    if (!currentWeatherData || !forecastData) return;

    const { name, sys, main, weather, wind, rain } = currentWeatherData;
    document.getElementById('currentLocation').textContent = `${name}, ${sys.country}`;
    document.getElementById('currentTemp').textContent = `${kelvinToUnit(main.temp, unit)}°${unit}`;
    tempToggleBtn.textContent = unit === 'C' ? '°F' : '°C';
    document.getElementById('weatherDesc').textContent = weather[0].description.toUpperCase();
    document.getElementById('currentPrecip').textContent = `Precipitation: ${(rain?.['1h'] || 0)} mm`;
    document.getElementById('currentWind').textContent = `Wind: ${wind.speed.toFixed(1)} m/s`;

    const hourlyContainer = document.getElementById('hourlyForecast');
    hourlyContainer.innerHTML = '';
    forecastData.list.slice(0, 8).forEach(item => {
      const time = new Date(item.dt * 1000);
      const timeStr = time.getHours().toString().padStart(2, '0') + ':00';
      const temp = kelvinToUnit(item.main.temp, unit);
      const icon = item.weather[0].icon;
      hourlyContainer.innerHTML += `
        <div class="flex flex-col items-center p-3 flex-shrink-0 w-24 bg-gray-800/50 rounded-lg shadow-md">
          <span class="text-sm text-gray-300">${timeStr}</span>
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon" class="w-10 h-10">
          <span class="text-lg font-bold">${temp}°${unit}</span>
        </div>`;
    });

    resultContainer.classList.remove('hidden');
  }

  async function fetchWeather(query, isCoord = false) {
    try {
      showMessage('Loading data...');
      resultContainer.classList.add('hidden');

      const queryParam = isCoord ? `lat=${query.lat}&lon=${query.lon}` : `q=${query}`;
      const [curRes, forRes] = await Promise.all([
        fetch(`${BASE_URL}weather?${queryParam}&appid=${API_KEY}`),
        fetch(`${BASE_URL}forecast?${queryParam}&appid=${API_KEY}`)
      ]);

      currentWeatherData = await curRes.json();
      forecastData = await forRes.json();

      if (currentWeatherData.cod != 200) throw new Error('The city was not found...');

      renderWeather();
      showMessage('Weather data successfully loaded!');
    } catch (err) {
      showMessage(`Error: ${err.message}`, true);
    }
  }

  searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
    else showMessage('Enter the city name first.', true);
  });

  locationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) return showMessage('Geolocation is not supported.', true);
    showMessage('Requesting location permission...');
    navigator.geolocation.getCurrentPosition(
      pos => fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude }, true),
      err => showMessage('Cant get location: ' + err.message, true)
    );
  });
  tempToggleBtn.addEventListener('click', () => {
    unit = unit === 'C' ? 'F' : 'C';
    renderWeather();
  });


})();
