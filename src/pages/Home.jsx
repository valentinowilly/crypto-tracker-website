// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { getMarkets } from "../api/coinGecko";
import { CryptoCard } from "../components/CryptoCard";
import { Dropdown } from "../components/Dropdown";
import { DecryptedText } from "../components/DecryptedText";
import { useCurrency } from "../context/CurrencyContext"; // Import context

export const Home = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("market_cap_rank");
  const [searchQuery, setSearchQuery] = useState("");

  // Ambil currency dari context
  const { currency, setCurrency } = useCurrency();

  const sortOptions = [
    { label: "Rank", value: "market_cap_rank" },
    { label: "Name", value: "name" },
    { label: "Price (Low to High)", value: "price" },
    { label: "Price (High to Low)", value: "price_desc" },
    { label: "24h Change", value: "change" },
    { label: "Market Cap", value: "market_cap" },
  ];

  // Opsi untuk dropdown mata uang
  const currencyOptions = [
    { label: "USD ($)", value: "usd" },
    { label: "IDR (Rp)", value: "idr" },
  ];

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, [currency]); // Refresh saat currency berubah

  useEffect(() => {
    filterAndSort();
  }, [sortBy, cryptoList, searchQuery]);

  const fetchCryptoData = async () => {
    setIsLoading(true);
    try {
      // Panggil API dengan parameter currency
      const data = await getMarkets(currency);
      setCryptoList(data);
    } catch (err) {
      console.error("Error fetching crypto: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSort = () => {
    let filtered = cryptoList.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    filtered.sort((a, b) => {
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

  return (
    <div className="app">
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

      <div className="controls">
        {/* Dropdown Mata Uang */}
        <div className="filter-group">
          <label style={{ marginRight: "10px" }}>Currency:</label>
          <Dropdown
            options={currencyOptions}
            value={currency}
            onChange={(val) => setCurrency(val)}
          />
        </div>

        <div className="filter-group">
          <label style={{ marginRight: "10px" }}>Sort by:</label>
          <Dropdown
            options={sortOptions}
            value={sortBy}
            onChange={(val) => setSortBy(val)}
          />
        </div>

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

      {isLoading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Loading crypto data...</p>
        </div>
      ) : (
        <div className={`crypto-container ${viewMode}`}>
          {filteredList.map((crypto, key) => (
            // Kirim currency ke komponen kartu
            <CryptoCard crypto={crypto} key={key} currency={currency} />
          ))}
        </div>
      )}

      <footer className="footer">
        <p>Data provided by CoinGecko API • Updated every 60 seconds</p>
      </footer>
    </div>
  );
};
