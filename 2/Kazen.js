// Jam Digital dengan suara detik (stabil)
const jamDiv = document.getElementById("jam");

function updateJam() {
  if (!jamDiv) return;
  const sekarang = new Date();
  const jam24 = sekarang.getHours();
  const menit = sekarang.getMinutes();
  const detik = sekarang.getSeconds();
  const ampm = jam24 >= 12 ? 'PM' : 'AM';
  const jam12 = jam24 % 12 || 12;
  jamDiv.textContent = `${jam12.toString().padStart(2, '0')}:${menit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')} ${ampm}`;
  tick();
}

setInterval(updateJam, 1000);
updateJam();

function hitung() {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const operator = document.getElementById("operator").value;
  let hasil;

  switch (operator) {
    case '+': hasil = num1 + num2; break;
    case '-': hasil = num1 - num2; break;
    case '*': hasil = num1 * num2; break;
    case '/':
      hasil = num2 !== 0 ? (num1 / num2) : "Error (bagi 0)";
      break;
    default:
      hasil = "Operator tidak valid";
  }

  const hasilEl = document.getElementById("hasil");
  if (hasilEl) hasilEl.innerText = "Hasil: " + hasil;
}


function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  const size = Math.random() * 40 + 10;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.left = Math.random() * window.innerWidth + "px";
  bubble.style.bottom = "0px";

  // warna merah acak
  const redShade = Math.floor(Math.random() * 100) + 155;
  bubble.style.background = `rgba(${redShade}, 0, 0, 0.6)`;

  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 5000);
}

setInterval(createBubble, 300);


  const left = Math.random() * (containerRect.width - size);
  bubble.style.left = `${left}px`;
  bubble.style.bottom = `-${Math.floor(size/2)}px`;

  // random red-ish shade like sebelum
  const redShade = Math.floor(Math.random() * 100) + 155;
  bubble.style.background = `rgba(${redShade}, 0, 0, 0.5)`;

  parent.appendChild(bubble);

  // hapus setelah animasi selesai (sinkron dengan CSS 10s)
  setTimeout(() => bubble.remove(), 10000);
setInterval(createBubble, 500);

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('dragstart', e => e.preventDefault());