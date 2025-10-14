<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nama = htmlspecialchars($_POST["nama"]);
  $email = htmlspecialchars($_POST["email"]);
  $pesan = htmlspecialchars($_POST["pesan"]);

  $tujuan = "akuma.plot@gmail.com";  
  $subject = "Pesan dari Portofolio";
  $isi = "Nama: $nama\nEmail: $email\nPesan: $pesan";

  $headers = "From: $email";

  if (mail($tujuan, $subject, $isi, $headers)) {
    echo "<script>alert('Pesan berhasil dikirim!'); window.location.href='index.html';</script>";
  } else {
    echo "<script>alert('Pesan gagal dikirim!'); window.location.href='index.html';</script>";
  }
} else {
  echo "Akses dilarang.";
}
?>