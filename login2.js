const btnLogin = document.getElementById('btnLogin');
    const inpUsername = document.getElementById('username');
    const inpPassword = document.getElementById('password');
    const selRole = document.getElementById('role');


    btnLogin.addEventListener('click', () => {
        const username = inpUsername.value.trim();
        const password = inpPassword.value.trim();
        const role = selRole.value;

      // Cek jika semua kosong
    if (!username && !password && !role) {
        Swal.fire({
            icon: 'warning',
            title: 'Semua field kosong!',
            text: 'Silakan isi username, password, dan pilih role.'
        });
        return;
    }
    if (!username && !password) {
        Swal.fire({
            icon: 'warning',
            title: 'username dan password kosong!',
            text: 'Silakan isi username dan password.'
        });
        return;
    }
    if (!username && !role) {
        Swal.fire({
            icon: 'warning',
            title: 'username dan role kosong!',
            text: 'Silakan isi username dan pilih role anda.'
        });
        return;
    }
    if (!password && !role) {
        Swal.fire({
            icon: 'warning',
            title: 'password dan role kosong!',
            text: 'Silakan isi password dan pilih role anda.'
        });
        return;
    }
      // Cek individual
    if (!username) {
        Swal.fire({ icon: 'error', title: 'Username kosong!', text: 'Silakan masukkan username.' });
        return;
    }
    if (!password) {
        Swal.fire({ icon: 'error', title: 'Password kosong!', text: 'Silakan masukkan password.' });
        return;
    }
    if (!role) {
        Swal.fire({ icon: 'error', title: 'Role belum dipilih!', text: 'Silakan pilih role.' });
        return;
    }

      // Daftar akun valid
    const accounts = {
        siswa: { username: 'siswa', password: '1234', role: 'siswa'},
        guru:  { username: 'guru', password: '4321', role: 'guru' }
    };

      // Validasi akun
    const account = accounts[role];
    if (account && username === account.username && password === account.password) {
        // Simpan ke localStorage jika perlu
        localStorage.setItem('role', role);
        localStorage.setItem('username', username);

        Swal.fire({
            icon: 'success',
            title: 'Login berhasil!',
            text: 'Selamat datang, di website kami!!',
            showConfirmButton: true
        }).then(() => {
          // Redirect sesuai role
            const targetPage = role === 'siswa' ? 'form data.html' : 'form data.html';
            window.location.href = targetPage;
        });
        } else {
        Swal.fire({
            icon: 'error',
            title: 'Login gagal!',
            text: 'Username, password, atau role salah.'
        });
        }
    });
    
    // fungsi untuk tombol lihat password
    function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('#togglePassword i');
    const toggleText = document.getElementById('toggleText');
    
    if (passwordInput.type === 'password') {
      // Tampilkanpassword menjadi text
    passwordInput.type = 'text';
    toggleIcon.classList.remove('ph-eye-closed');
    toggleIcon.classList.add('ph-eye');
    toggleText.textContent = 'Sembunyikan Password';
    } else {
      // Sembunyikan password menjadi password lagi
    passwordInput.type = 'password';
    toggleIcon.classList.remove('ph-eye');
    toggleIcon.classList.add('ph-eye-closed');
    toggleText.textContent = 'Lihat Password';
    }
    }