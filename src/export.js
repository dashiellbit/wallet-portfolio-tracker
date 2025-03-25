document.getElementById('exportData').addEventListener('click', exportToCSV);

function exportToCSV() {
    const history = getHistory();

    if (history.length === 0) {
        alert('No data to export');
        return;
    }

    const csvRows = ['Date,Total Value,Wallets'];

    history.forEach(snapshot => {
        const date = new Date(snapshot.timestamp).toISOString();
        const walletAddresses = snapshot.wallets.map(w => w.address).join('; ');
        csvRows.push(`${date},${snapshot.totalValue},"${walletAddresses}"`);
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_export_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportToJSON() {
    const history = getHistory();

    if (history.length === 0) {
        alert('No data to export');
        return;
    }

    const jsonContent = JSON.stringify(history, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_export_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}