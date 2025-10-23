// ---------- Clock ----------
(function clockInit(){
  const el = document.getElementById('clock');
  function update(){
    const d = new Date();
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    const ss = String(d.getSeconds()).padStart(2,'0');
    el.textContent = `${hh}:${mm}:${ss}`;
  }
  update();
  setInterval(update,1000);
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

// ---------- Contact form (local demo handler) ----------
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
      r: (Math.random()*80 + 40),
      vx: (Math.random()*0.2 - 0.1),
      vy: (Math.random()*0.3 + 0.05),
      alpha: Math.random()*0.25 + 0.05
    });
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    // subtle gradient overlay
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0, 'rgba(30,34,50,0.0)');
    g.addColorStop(1, 'rgba(6,8,12,0.25)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);

    particles.forEach(p=>{
      p.x += p.vx;
      p.y -= p.vy;
      p.alpha -= 0.0003;
      if(p.alpha <= 0 || p.y + p.r < -50){
        p.x = Math.random()*W;
        p.y = H + Math.random()*200;
        p.r = (Math.random()*80 + 40);
        p.vx = (Math.random()*0.2 - 0.1);
        p.vy = (Math.random()*0.3 + 0.05);
        p.alpha = Math.random()*0.25 + 0.05;
      }

      // draw soft circle
      const rad = ctx.createRadialGradient(p.x, p.y, p.r*0.1, p.x, p.y, p.r);
      rad.addColorStop(0, `rgba(120,140,255,${p.alpha})`);
      rad.addColorStop(0.6, `rgba(120,140,255,${p.alpha*0.12})`);
      rad.addColorStop(1, `rgba(120,140,255,0)`);
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
})();
