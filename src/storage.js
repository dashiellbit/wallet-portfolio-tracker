const STORAGE_KEY = 'portfolio_history';

function saveSnapshot(walletsData, totalValue) {
    const history = getHistory();
    const snapshot = {
        timestamp: Date.now(),
        date: new Date().toISOString(),
        totalValue,
        wallets: walletsData.map(w => ({
            address: w.address,
            ethBalance: w.ethBalance,
            value: w.value
        }))
    };

    history.push(snapshot);

    // keep last 30 days only
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const filtered = history.filter(h => h.timestamp > thirtyDaysAgo);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

function getHistory() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function getHistoryForChart() {
    const history = getHistory();
    return {
        labels: history.map(h => new Date(h.timestamp).toLocaleDateString()),
        values: history.map(h => h.totalValue)
    };
}