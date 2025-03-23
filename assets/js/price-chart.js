/*=============== PRICE TRACKING CHART ===============*/

// Sample GPU price history data
const gpuData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'RTX 4090',
            data: [1599, 1550, 1500, 1450, 1400, 1350],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: 'RTX 4080',
            data: [1199, 1150, 1100, 1050, 1000, 950],
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
        },
        {
            label: 'RX 7900 XT',
            data: [899, 880, 860, 840, 820, 800],
            borderColor: 'rgb(255, 205, 86)',
            tension: 0.1
        }
    ]
};

// Sample CPU price history data
const cpuData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'i9-13900K',
            data: [589, 579, 569, 559, 549, 539],
            borderColor: 'rgb(153, 102, 255)',
            tension: 0.1
        },
        {
            label: 'i7-13700K',
            data: [419, 409, 399, 389, 379, 369],
            borderColor: 'rgb(54, 162, 235)',
            tension: 0.1
        },
        {
            label: 'R9 7900X',
            data: [549, 539, 529, 519, 509, 499],
            borderColor: 'rgb(255, 159, 64)',
            tension: 0.1
        }
    ]
};

// Chart configuration
const chartConfig = {
    type: 'line',
    options: {
        responsive: true,
        interaction: {
            intersect: false,
            mode: 'index'
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: $${context.parsed.y}`;
                    }
                }
            },
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Price (USD)'
                },
                grid: {
                    color: 'rgba(var(--border-color-rgb), 0.1)'
                }
            },
            x: {
                grid: {
                    color: 'rgba(var(--border-color-rgb), 0.1)'
                }
            }
        },
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear'
            }
        }
    }
};

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize GPU chart
        const gpuCanvas = document.getElementById('gpuPriceChart');
        if (gpuCanvas) {
            const gpuCtx = gpuCanvas.getContext('2d');
            new Chart(gpuCtx, {
                ...chartConfig,
                data: {
                    ...gpuData,
                    datasets: gpuData.datasets.map(dataset => ({
                        ...dataset,
                        fill: true,
                        backgroundColor: dataset.borderColor.replace('rgb', 'rgba').replace(')', ', 0.1)')
                    }))
                }
            });
        }

        // Initialize CPU chart
        const cpuCanvas = document.getElementById('cpuPriceChart');
        if (cpuCanvas) {
            const cpuCtx = cpuCanvas.getContext('2d');
            new Chart(cpuCtx, {
                ...chartConfig,
                data: {
                    ...cpuData,
                    datasets: cpuData.datasets.map(dataset => ({
                        ...dataset,
                        fill: true,
                        backgroundColor: dataset.borderColor.replace('rgb', 'rgba').replace(')', ', 0.1)')
                    }))
                }
            });
        }
    } catch (error) {
        console.error('Error initializing price charts:', error);
    }
});