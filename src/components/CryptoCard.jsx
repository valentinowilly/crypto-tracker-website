// src/components/CryptoCard.jsx
import { Link } from "react-router"; // Atau 'react-router-dom' sesuai versi yang Anda pakai
import { formatPrice, formatMarketCap } from "../utils/formatter";

export const CryptoCard = ({ crypto, currency }) => {
  return (
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
          {/* Pastikan currency diteruskan ke sini */}
          <p className="price">{formatPrice(crypto.current_price, currency)}</p>

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
              {/* Tampilkan simbol mata uang manual */}
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
  );
};
