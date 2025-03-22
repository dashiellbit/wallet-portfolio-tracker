let portfolioChart = null;
let historyChart = null;

function initChart() {
    const ctx = document.getElementById('portfolioChart').getContext('2d');

    portfolioChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#6c63ff',
                    '#3f37c9',
                    '#4361ee',
                    '#4895ef',
                    '#4cc9f0'
                ],
                borderColor: '#1a1a2e',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

function initHistoryChart() {
    const ctx = document.getElementById('historyChart').getContext('2d');

    historyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Portfolio Value (USD)',
                data: [],
                borderColor: '#6c63ff',
                backgroundColor: 'rgba(108, 99, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#e0e0e0'
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#e0e0e0'
                    },
                    grid: {
                        color: '#2d2d44'
                    }
                },
                x: {
                    ticks: {
                        color: '#e0e0e0'
                    },
                    grid: {
                        color: '#2d2d44'
                    }
                }
            }
        }
    });

    updateHistoryChart();
}

function updateChart(walletsData) {
    if (!portfolioChart) {
        initChart();
    }

    const labels = walletsData.map(w =>
        `${w.address.substring(0, 6)}...${w.address.substring(w.address.length - 4)}`
    );
    const values = walletsData.map(w => w.value);

    portfolioChart.data.labels = labels;
    portfolioChart.data.datasets[0].data = values;
    portfolioChart.update();
}

function updateHistoryChart() {
    if (!historyChart) return;

    const history = getHistoryForChart();
    historyChart.data.labels = history.labels;
    historyChart.data.datasets[0].data = history.values;
    historyChart.update();
}

window.addEventListener('load', () => {
    initChart();
    initHistoryChart();
});