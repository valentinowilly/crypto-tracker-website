import { useState } from "react";
import { Link } from "react-router";
import { formatPrice, formatMarketCap } from "../utils/formatter";
import { useWatchlist } from "../context/WatchlistContext";

export const CryptoCard = ({ crypto, currency }) => {
  const { watchlist, toggleWatchlist } = useWatchlist();

  const isInWatchlist =
    Array.isArray(watchlist) && watchlist.includes(crypto.id);

  const [isAnimating, setIsAnimating] = useState(false);

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    toggleWatchlist(crypto.id);
  };

  return (
    <div className="crypto-card-wrapper" style={{ position: "relative" }}>
      {/* Tombol Bintang dengan Animasi */}
      <button
        onClick={handleWatchlistClick}
        className={`watchlist-btn ${isAnimating ? "star-pop" : ""}`}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 10,
          color: isInWatchlist ? "#FFD700" : "#4B5563",
          transition: "transform 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) =>
          !isAnimating && (e.target.style.transform = "scale(1.2)")
        }
        onMouseLeave={(e) =>
          !isAnimating && (e.target.style.transform = "scale(1)")
        }
        title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      >
        {isInWatchlist ? "★" : "☆"}
      </button>

      <Link to={`/coin/${crypto.id}`} style={{ textDecoration: "none" }}>
        <div className="crypto-card">
          <div className="crypto-header">
            <div className="crypto-info">
              <img src={crypto.image} alt={crypto.name} />
              <div>
                <h3>{crypto.name}</h3>
                <p className="symbol">{crypto.symbol.toUpperCase()}</p>
                <span className="rank">#{crypto.market_cap_rank}</span>
              </div>
            </div>
          </div>

          <div className="crypto-price">
            <p className="price">
              {formatPrice(crypto.current_price, currency)}
            </p>
            <p
              className={`change ${crypto.price_change_percentage_24h >= 0 ? "positive" : "negative"}`}
            >
              {crypto.price_change_percentage_24h >= 0 ? "↑ " : "↓ "}
              {Math.abs(crypto.price_change_percentage_24h || 0).toFixed(2)}%
            </p>
          </div>

          <div className="crypto-stats">
            <div className="stat">
              <span className="stat-label">Market Cap</span>
              <span className="stat-value">
                {currency === "idr" ? "Rp" : "$"}
                {formatMarketCap(crypto.market_cap)}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Volume</span>
              <span className="stat-value">
                {currency === "idr" ? "Rp" : "$"}
                {formatMarketCap(crypto.total_volume)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
