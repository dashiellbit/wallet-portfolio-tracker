let portfolioChart = null;

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

window.addEventListener('load', initChart);