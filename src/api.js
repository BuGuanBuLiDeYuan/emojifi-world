import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

export const fetchTopCryptos = async (limit = 100) => {
    try {
        const response = await axios.get(`${API_URL}/coins/markets`, {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: limit,
                page: 1,
                sparkline: false
            }
        });

        const data = {
            name: 'Cryptocurrencies',
            children: response.data.map(crypto => ({
                name: crypto.symbol.toUpperCase(),
                emoji: '💰', // 暂时使用通用emoji
                value: crypto.market_cap
            }))
        };

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

