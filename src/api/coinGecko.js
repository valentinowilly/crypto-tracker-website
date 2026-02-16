const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCryptos = async () => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cryptos");
  }

  return response.json();
};

export const fetchCoinData = async (id) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coin data");
  }

  return response.json();
};

export const fetchChartData = async (id) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch chart data");
  }
  return response.json();
};

export const getMarkets = async (currency = "usd") => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    );
    if (!response.ok) throw new Error("Failed to fetch markets");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCoinData = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
    );
    if (!response.ok) throw new Error("Failed to fetch coin data");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCoinHistory = async (id, days = 7, currency = "usd") => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
    );
    if (!response.ok) throw new Error("Failed to fetch history");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
