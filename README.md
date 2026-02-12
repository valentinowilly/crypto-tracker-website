# 🚀 Crypto Tracker

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CoinGecko](https://img.shields.io/badge/API-CoinGecko-8BC03E?style=for-the-badge)

Aplikasi pemantau harga aset kripto *real-time* yang dibangun dengan React dan Vite. Proyek ini berfokus pada performa, pengelolaan data API yang efisien, dan tampilan antarmuka yang bersih dengan sentuhan estetika *cyberpunk/glassmorphism*.

## ✨ Fitur Utama

* **Real-time Market Data**: Mengambil data harga, market cap, dan volume terbaru dari CoinGecko API setiap 60 detik.
* **Multi-Currency Support**: Dukungan penuh untuk konversi mata uang **USD ($)** secara instan.
* **Smart Search**: Fitur pencarian koin untuk mempercepat tracking.
* **Custom Sorting**: Urutkan koin berdasarkan Peringkat, Nama, Harga, atau Perubahan menggunakan dropdown kustom.

## 🛠️ Teknologi yang Digunakan

* **Framework**: React.js (Vite)
* **Styling**: CSS
* **State Management**: Context API & React Hooks (`useState`, `useEffect`, `useMemo`)
* **Data Fetching**: Axios
* **Charting**: Recharts

## 🚀 Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan project di komputermu:

1.  **Clone repository ini**
    ```bash
    git clone [https://github.com/valentinowilly/crypto-tracker-website.git](https://github.com/valentinowilly/crypto-tracker-website.git)
    cd crypto-tracker-website
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Jalankan development server**
    ```bash
    npm run dev
    ```

4.  Buka browser dan akses `http://localhost:5173`

## 📂 Struktur Project

```bash
src/
├── api/
│   └── coinGecko.js       # Konfigurasi API CoinGecko
├── components/
│   ├── CryptoCard.jsx     # Kartu tampilan koin
│   ├── DecryptedText.jsx  # Komponen animasi teks judul
│   └── Dropdown.jsx       # Komponen dropdown custom
├── context/
│   └── CurrencyContext.jsx # Global state untuk mata uang (IDR/USD)
├── pages/
│   ├── Home.jsx           # Halaman utama (List & Grid view)
│   └── CoinDetail.jsx     # Halaman detail & grafik koin
├── utils/
│   └── formatter.js       # Helper untuk format angka & mata uang
├── App.jsx                # Komponen utama
└── main.jsx               # Entry point
