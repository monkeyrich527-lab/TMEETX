document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    const resetButton = document.getElementById('resetButton');
    const generateButton = document.getElementById('generateButton');
    const downloadButton = document.getElementById('downloadButton');

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    // --- DAFTAR ASET MEME ---

    // 1. DAFTAR NAMA FILE GAMBAR (GANTI NAMA FILE INI DENGAN FILE ANDA!)
    const imageFiles = [
        'meme1.png', 
        'meme2.png', 
        'meme3.png', 
        'meme4.png', 
        'meme5.png', 
        'meme6.png', 
        'meme7.png', 
        'meme8.png', 
        'meme9.png', 
        'meme10.png', 
        'meme11.png', 
        'meme12.png', 
    ];

    // 2. DAFTAR TEKS NEGOSIASI 
    const negosiasiAcak = [
        "We agree to PUMP!", 
        "Trade War is a Degen Game.", 
        "China #1 HODLER!", 
        "Make Crypto Great Again!",
        "TMEETX to the Moon!",
        "Tariffs are Banned!",
        "Long $TMEETX, Short Fiat!",
        "My meme coin is bigger!", 
        "The best meme coin, believe me!",
        "This deal is HUGE!",
        "Wen Binance listing?",
        "Solana will carry us!",
        "Bullish or Bearish? PUMPISH!",
        "The only negotiation is the price."
    ];

    // --- FUNGSI UTAMA MENGGAMBAR MEME ---
    const drawMeme = (options = {}) => {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = options.background || '#4a2f2f'; 
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        const randomImageFile = options.image || imageFiles[Math.floor(Math.random() * imageFiles.length)];
        const randomText = options.text || negosiasiAcak[Math.floor(Math.random() * negosiasiAcak.length)];
        
        const img = new Image();
        img.src = randomImageFile; 

        const textToDisplay = randomText;
        
        img.onload = () => {
             // Menggambar Gambar Utama
             ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
             
             // Menggambar Teks dengan style meme (Impact, Outline Hitam)
             ctx.fillStyle = 'white';
             ctx.font = '24px Impact, sans-serif'; 
             ctx.textAlign = 'center';
             ctx.strokeStyle = 'black'; 
             ctx.lineWidth = 3;
             
             ctx.strokeText(textToDisplay, WIDTH / 2, 380); 
             ctx.fillText(textToDisplay, WIDTH / 2, 380); 
        };
        // Menangani kasus jika gambar gagal dimuat (penting untuk bug path)
        img.onerror = () => {
            console.error("Gagal memuat gambar: " + randomImageFile + ". Cek nama file!");
            // Tampilkan pesan error di canvas jika gagal
            ctx.fillStyle = 'red';
            ctx.font = '20px Arial';
            ctx.fillText("ERROR: Cek Nama File Gambar Anda!", WIDTH / 2, HEIGHT / 2);
        };
    };

    // --- EVENT LISTENERS (Fungsi Tombol) ---

    // 1. Reset
    resetButton.addEventListener('click', () => {
        drawMeme({
             image: imageFiles[0],
             text: negosiasiAcak[Math.floor(Math.random() * negosiasiAcak.length)]
        }); 
    });

    // 2. Negotiate Meme (Generate Acak Gambar & Teks)
    generateButton.addEventListener('click', () => {
        const newText = negosiasiAcak[Math.floor(Math.random() * negosiasiAcak.length)];
        const newImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

        drawMeme({
            image: newImage,
            text: newText
        });
    });
    
// 3. Download (FUNGSI PALING ANDAL)
    downloadButton.addEventListener('click', () => {
        // 1. Dapatkan URL data gambar dari canvas
        const imageURL = canvas.toDataURL('image/png');

        // 2. Buat elemen link (<a>) baru secara dinamis
        const link = document.createElement('a');

        // 3. Atur nama file
        link.download = `$TMEETX_negotiated_${Date.now()}.png`;
        
        // 4. Atur sumber data gambar
        link.href = imageURL;
        
        // 5. Penting: Klik link secara otomatis
        // Tidak perlu menambahkannya ke body, klik saja langsung
        link.click();
        
        // Catatan: Teks di console mungkin muncul: 'Not allowed to navigate top frame...' 
        // Abaikan pesan itu, yang penting file terunduh.
    });
    // Inisialisasi tampilan awal
    drawMeme({
        image: imageFiles[0]
    });
});