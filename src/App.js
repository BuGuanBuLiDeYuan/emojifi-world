import React, { useState, useEffect } from 'react';
import TreeMap from './TreeMap';
import { fetchTopCryptos } from './api';
import './App.css';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchTopCryptos();
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <div className="App">
            <h1>Emojifi World - 加密货币市值可视化</h1>
            {data ? <TreeMap data={data} /> : <p>加载中...</p>}
        </div>
    );
}

export default App;

