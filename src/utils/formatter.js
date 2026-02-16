export const formatPrice = (price, currency = "usd") => {
  if (price === null || price === undefined) return "0";

  return new Intl.NumberFormat(currency === "idr" ? "id-ID" : "en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatMarketCap = (marketCap) => {
  if (!marketCap) return "0";

  if (marketCap >= 1e12) {
    return (marketCap / 1e12).toFixed(2) + "T";
  } else if (marketCap >= 1e9) {
    return (marketCap / 1e9).toFixed(2) + "B";
  } else if (marketCap >= 1e6) {
    return (marketCap / 1e6).toFixed(2) + "M";
  } else {
    return marketCap.toLocaleString();
  }
};
