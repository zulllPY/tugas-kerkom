// Ambil data role dan username dari localStorage
  let currentRole = localStorage.getItem('role') || 'siswa';
  let currentUser = localStorage.getItem('username') || 'Anonim';

  // Saat halaman dimuat, tampilkan nama dan role
  window.onload = function () {
    document.getElementById('roleDisplay').textContent = currentRole;
    document.getElementById('userDisplay').textContent = currentUser;
    updateRole();
  };

  // Fungsi ini bisa dipakai untuk menyesuaikan tampilan berdasarkan role
  function updateRole() {
    renderTables();
  }

  // Fungsi submit form: ambil data dari input, validasi, baca file, dan tampilkan
  function submitForm(event) {
    event.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const umur = document.getElementById('umur').value.trim();
    const tanggalLahir = document.getElementById('tanggalLahir').value.trim();
    const alamat = document.getElementById('alamat').value.trim();
    const jenisKelamin = document.getElementById('jenisKelamin').value;
    const kkFile = document.getElementById('kk').files[0];
    const aktaFile = document.getElementById('akta').files[0];
    const ijazahFile = document.getElementById('ijazah').files[0];

    if (!nama || !umur || !tanggalLahir || !alamat || !jenisKelamin || !kkFile || !aktaFile || !ijazahFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Harap isi semua data terlebih dahulu!',
      });
      return;
    }

    // Membaca file gambar sebagai base64 agar bisa ditampilkan di tabel
    const readerKK = new FileReader();
    const readerAkta = new FileReader();
    const readerIjazah = new FileReader();

    readerKK.onload = function () {
      readerAkta.onload = function () {
        readerIjazah.onload = function () {
          const data = {
            nama: nama,
            umur: umur,
            tanggalLahir: tanggalLahir,
            alamat: alamat,
            jenisKelamin: jenisKelamin,
            kk: readerKK.result,
            akta: readerAkta.result,
            ijazah: readerIjazah.result
          };
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data anda berhasil ditambahkan, silahkan cek ke tabel belum approve.',
          });
          addRow('belumApprove', data);
          document.getElementById('siswaForm').reset(); // Kosongkan form setelah submit
        };
        readerIjazah.readAsDataURL(ijazahFile);
      };
      readerAkta.readAsDataURL(aktaFile);
    };
    readerKK.readAsDataURL(kkFile);
  }

  // Fungsi untuk menambahkan baris data ke tabel tertentu
  function addRow(tableId, data) {
    const tbody = document.getElementById(tableId).querySelector('tbody');
    const tr = document.createElement('tr');

    // Isi kolom data
    tr.innerHTML = `
      <td>${data.nama}</td>
      <td>${data.umur}</td>
      <td>${data.tanggalLahir}</td>
      <td>${data.alamat}</td>
      <td>${data.jenisKelamin}</td>
      <td class="img"><img src="${data.kk}" width="150"></td>
      <td class="img"><img src="${data.akta}" width="150"></td>
      <td class="img"><img src="${data.ijazah}" width="150"></td>
    `;

    const aksiTd = document.createElement('td');

    // Tampilkan tombol aksi sesuai role
    if (tableId === 'belumApprove') {
      if (currentRole === 'guru') {
        aksiTd.innerHTML = `<div class="aksi"><button onclick="approveRow(this)" class="acc"><i class="ph ph-check-circle"></i></button>
                            <button onclick="editRow(this)" class="edit"><i class="ph ph-pencil"></i></button> 
                            <button onclick="deleteRow(this)" class="hapus"><i class="ph ph-trash"></i></button><div>`;
      } else {
        aksiTd.innerHTML = `<button onclick="editRow(this)" class="edit"><i class="ph ph-pencil"></button>`;
      }
      tr.appendChild(aksiTd);
    }

    tbody.appendChild(tr);
  }

  // Fungsi untuk memindahkan data dari tabel belum approve ke tabel approved
  function approveRow(button) {
    const row = button.closest('tr');
    const tds = row.querySelectorAll('td');

    // Ambil data dari baris
    const data = {
      nama: tds[0].innerText,
      umur: tds[1].innerText,
      tanggalLahir: tds[2].innerText,
      alamat: tds[3].innerText,
      jenisKelamin: tds[4].innerText,
      kk: tds[5].querySelector('img').src,
      akta: tds[6].querySelector('img').src,
      ijazah: tds[7].querySelector('img').src
    };

    // Tambahkan ke tabel approved dan hapus dari tabel belum approve
    addRow('approved', data);
    row.remove();
  }

  // Fungsi untuk menghapus baris
  function deleteRow(button) {
    const row = button.closest('tr');
    Swal.fire({
      title: 'Yakin ingin menghapus data ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        row.remove();
        Swal.fire('Dihapus!', 'Data telah dihapus.', 'success');
      }
    });
  }

  // Fungsi untuk mengedit data siswa, isikan kembali ke form
  function editRow(button) {
    const row = button.closest('tr');
    const tds = row.querySelectorAll('td');

    // Set nilai form sesuai data baris
    document.getElementById('nama').value = tds[0].innerText;
    document.getElementById('umur').value = tds[1].innerText;
    document.getElementById('tanggalLahir').value = tds[2].innerText;
    document.getElementById('alamat').value = tds[3].innerText;
    document.getElementById('jenisKelamin').value = tds[4].innerText;

    // Hapus baris tersebut
    row.remove();
  }

  // Fungsi ini bisa dipakai untuk render ulang tabel berdasarkan role
  function renderTables() {
    const rows = document.querySelectorAll('#belumApprove tbody tr');
    rows.forEach(row => {
      const tds = row.querySelectorAll('td');
      const data = {
        nama: tds[0].innerText,
        umur: tds[1].innerText,
        tanggalLahir: tds[2].innerText,
        alamat: tds[3].innerText,
        jenisKelamin: tds[4].innerText,
        kk: tds[5].querySelector('img').src,
        akta: tds[6].querySelector('img').src,
        ijazah: tds[7].querySelector('img').src
      };
      row.innerHTML = '';
      addRow('belumApprove', data);
    });
  }

  // fungsi agar menu list bisa di pencet saat 768px kebawah
  const icon = document.getElementById("icon");
  const list = document.getElementById("list");
  
  icon.addEventListener("click", function () {
    list.classList.toggle("hidden");
  })

  const out = document.getElementById("out");
  out.addEventListener("click",function (){
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    Swal.fire({
      icon: 'question',
      title: 'keluar dari sini!',
      text: 'Anda anda yakin keluar dari sini?.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, keluar',
      cancelButtonText: 'batal'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "berhasil logout!",
          text: "kamu sudah berhasil logout.",
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "oke"
        }).then(() => {
        window.location.href = 'login2.html';
      });
      }
    });
  })

  // fungsi hitung umur otomatis
  function hitungUmur(){
    const input = document.getElementById('tanggalLahir').value;
    const lahir = new Date(input);
    const hariIni = new Date();
    // untuk menghitung tanggal, bulan dan tahun 
    let umur = hariIni.getFullYear() - lahir.getFullYear();
    const bulan = hariIni.getMonth() - lahir.getMonth();
    const tanggal = hariIni.getDate() - lahir.getDate();

    if (bulan < 0 || (bulan === 0 && hari < 0)) {
      umur--;
    }
    // dan keluar di id umur 
    document.getElementById('umur').value = umur;
  }