// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { getMarkets } from "../api/coinGecko";
import { CryptoCard } from "../components/CryptoCard";
import { Dropdown } from "../components/Dropdown";
import { DecryptedText } from "../components/DecryptedText";
import { useCurrency } from "../context/CurrencyContext";
import { useWatchlist } from "../context/WatchlistContext";

export const Home = () => {
  // --- STATE MANAGEMENT ---
  const [cryptoList, setCryptoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI States
  const [category, setCategory] = useState("all"); // 'all' atau 'watchlist'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' atau 'list'
  const [sortBy, setSortBy] = useState("market_cap_rank");
  const [searchQuery, setSearchQuery] = useState("");

  // Contexts
  const { currency, setCurrency } = useCurrency();
  const { watchlist } = useWatchlist();

  // --- DATA OPTIONS ---
  const sortOptions = [
    { label: "Rank", value: "market_cap_rank" },
    { label: "Name", value: "name" },
    { label: "Price (Low to High)", value: "price" },
    { label: "Price (High to Low)", value: "price_desc" },
    { label: "24h Change", value: "change" },
    { label: "Market Cap", value: "market_cap" },
  ];

  const currencyOptions = [
    { label: "USD ($)", value: "usd" },
    { label: "IDR (Rp)", value: "idr" },
  ];

  // --- EFFECTS ---

  // 1. Fetch data saat currency berubah
  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Update tiap 60 detik
    return () => clearInterval(interval);
  }, [currency]);

  // 2. Filter & Sort otomatis saat ada perubahan input/data
  useEffect(() => {
    filterAndSort();
  }, [sortBy, cryptoList, searchQuery, category, watchlist]);

  // --- FUNCTIONS ---

  const fetchCryptoData = async () => {
    setIsLoading(true);
    try {
      const data = await getMarkets(currency);
      setCryptoList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching crypto: ", err);
      setCryptoList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSort = () => {
    if (!cryptoList) return;

    // A. Filter Pencarian
    let filtered = cryptoList.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // B. Filter Kategori (Watchlist)
    if (category === "watchlist") {
      filtered = filtered.filter((crypto) => watchlist.includes(crypto.id));
    }

    // C. Sorting
    filtered.sort((a, b) => {
      // Prioritas 1: Watchlist (Hanya jika di tab "All Coins")
      const aInWatchlist = watchlist.includes(a.id);
      const bInWatchlist = watchlist.includes(b.id);

      if (category === "all" && aInWatchlist !== bInWatchlist) {
        // Item watchlist naik ke atas
        return bInWatchlist - aInWatchlist;
      }

      // Prioritas 2: Sorting biasa berdasarkan dropdown
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.current_price - b.current_price;
        case "price_desc":
          return b.current_price - a.current_price;
        case "change":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case "market_cap":
          return a.market_cap - b.market_cap;
        default:
          return a.market_cap_rank - b.market_cap_rank;
      }
    });

    setFilteredList(filtered);
  };

  // --- RENDER ---
  return (
    <div className="app">
      {/* HEADER SECTION */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>🚀</span>
              <DecryptedText
                text="Crypto Tracker"
                speed={30}
                maxIterations={15}
                className="neon-title"
              />
            </h1>
            <p>Real-time cryptocurrency prices and market data</p>
          </div>
          <div className="search-section">
            <input
              type="text"
              placeholder="Search cryptos..."
              className="search-input"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>
        </div>
      </header>

      {/* CONTROLS SECTION (TATA LETAK BARU) */}
      <div className="controls">
        {/* KIRI: Tabs (All / Watchlist) */}
        <div className="view-toggle">
          <button
            className={category === "all" ? "active" : ""}
            onClick={() => setCategory("all")}
          >
            All Coins
          </button>
          <button
            className={category === "watchlist" ? "active" : ""}
            onClick={() => setCategory("watchlist")}
          >
            My Watchlist {watchlist.length > 0 && `(${watchlist.length})`}
          </button>
        </div>

        {/* TENGAH: Dropdowns (Menggunakan margin: 0 auto untuk centering) */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            margin: "0 auto", // Kunci agar elemen ini ke tengah
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div className="filter-group">
            <label style={{ marginRight: "10px" }}>Currency:</label>
            <Dropdown
              options={currencyOptions}
              value={currency}
              onChange={setCurrency}
            />
          </div>

          <div className="filter-group">
            <label style={{ marginRight: "10px" }}>Sort by:</label>
            <Dropdown
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>

        {/* KANAN: Grid/List Toggle */}
        <div className="view-toggle">
          <button
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </button>
          <button
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}
          >
            List
          </button>
        </div>
      </div>

      {/* CONTENT SECTION */}
      {isLoading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Loading crypto data...</p>
        </div>
      ) : (
        <>
          {/* Pesan jika Watchlist Kosong */}
          {category === "watchlist" && filteredList.length === 0 && (
            <div
              style={{ textAlign: "center", padding: "60px", color: "#6b7280" }}
            >
              <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
                Your watchlist is empty 🌟
              </h2>
              <p>
                Click the star icon (☆) on any coin to add it to your favorites.
              </p>
            </div>
          )}

          {/* Daftar Koin */}
          <div className={`crypto-container ${viewMode}`}>
            {filteredList.map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} currency={currency} />
            ))}
          </div>
        </>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <p>Data provided by CoinGecko API • Updated every 60 seconds</p>
      </footer>
    </div>
  );
};
