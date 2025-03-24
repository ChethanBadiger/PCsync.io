// Store selected components in a global object
let selectedComponents = {
    cpu: null,
    motherboard: null,
    cpu_cooler: null,
    ram: null,
    gpu: null,
    storage: null,
    case: null
};

// Initialize the page when it loads
window.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();
});

// Fill all dropdown menus with component options
function populateDropdowns() {
    // CPU dropdown population
    const cpuSelect = document.querySelector('#cpu select');
    const intelGroup = cpuSelect.querySelector('optgroup[label="Intel"]');
    const amdGroup = cpuSelect.querySelector('optgroup[label="AMD"]');

    // Add Intel CPUs
    componentsDB.cpu.intel.forEach(cpu => {
        intelGroup.innerHTML += `<option value="${cpu.id}" style="color: black;">${cpu.name} - ₹${cpu.price.toLocaleString()}</option>`;
    });

    // Add AMD CPUs
    componentsDB.cpu.amd.forEach(cpu => {
        amdGroup.innerHTML += `<option value="${cpu.id}" style="color: black;">${cpu.name} - ₹${cpu.price.toLocaleString()}</option>`;
    });

    // Populate other component dropdowns
    populateComponentDropdown('motherboard');
    populateComponentDropdown('ram');
    populateComponentDropdown('gpu');
    populateComponentDropdown('storage');
    populateComponentDropdown('case');
    populateComponentDropdown('cpu_cooler');
}

// Helper function to populate a single component dropdown
function populateComponentDropdown(componentType) {
    const select = document.querySelector(`#${componentType} select`);
    if (!select) return;

    select.innerHTML = `<option value="">Select ${componentType.replace('_', ' ').toUpperCase()}</option>`;

    // Handle special case for motherboard which has Intel and AMD categories
    if (componentType === 'motherboard') {
        [...componentsDB.motherboard.intel, ...componentsDB.motherboard.amd].forEach(component => {
            select.innerHTML += createOptionHTML(component);
        });
    } else {
        // Handle other components
        const components = componentsDB[componentType];
        if (Array.isArray(components)) {
            components.forEach(component => {
                select.innerHTML += createOptionHTML(component);
            });
        }
    }
}

// Create HTML for dropdown option
function createOptionHTML(component) {
    return `<option value="${component.id}" style="color: black;">${component.name} - ₹${component.price.toLocaleString()}</option>`;
}

// Handle component selection change
function updateComponentSelection(componentType, componentId) {
    // Find the selected component
    const component = findComponentById(componentType, componentId);

    // Update selected components object
    selectedComponents[componentType] = component;

    // Update UI
    if (component) {
        displayComponentSpecs(componentType, component);
        updateCompatibleComponents(componentType, component);
        validateCompatibility();
        updatePriceSummary();
    }
}

// Find a component by its ID
function findComponentById(type, id) {
    if (!id) return null;

    if (type === 'cpu') {
        return [...componentsDB.cpu.intel, ...componentsDB.cpu.amd].find(cpu => cpu.id === id);
    } else if (type === 'motherboard') {
        return [...componentsDB.motherboard.intel, ...componentsDB.motherboard.amd].find(mobo => mobo.id === id);
    } else {
        return componentsDB[type]?.find(component => component.id === id);
    }
}

// Update compatible components based on selection
function updateCompatibleComponents(changedType, component) {
    if (!component) return;

    // CPU selection affects motherboard and cooler compatibility
    if (changedType === 'cpu') {
        updateMotherboardOptions(component.socket);
        updateCoolerOptions(component.socket);
    }
    // Motherboard selection affects CPU compatibility
    else if (changedType === 'motherboard') {
        updateCPUOptions(component.specs.socket);
    }
    // Case selection affects GPU compatibility (length)
    else if (changedType === 'case') {
        updateGPUOptions(component.max_gpu_length);
    }
}

// Update motherboard options based on CPU socket
function updateMotherboardOptions(socket) {
    const moboSelect = document.querySelector('#motherboard select');
    moboSelect.innerHTML = '<option value="">Select Motherboard</option>';

    [...componentsDB.motherboard.intel, ...componentsDB.motherboard.amd]
        .filter(mobo => mobo.specs.socket === socket)
        .forEach(mobo => {
            moboSelect.innerHTML += createOptionHTML(mobo);
        });
}

// Update CPU cooler options based on socket
function updateCoolerOptions(socket) {
    const coolerSelect = document.querySelector('#cpu_cooler select');
    if (!coolerSelect) return;

    coolerSelect.innerHTML = '<option value="">Select CPU Cooler</option>';
    componentsDB.cpu_cooler
        .filter(cooler => cooler.socket_support.includes(socket))
        .forEach(cooler => {
            coolerSelect.innerHTML += createOptionHTML(cooler);
        });
}

// Update CPU options based on motherboard socket
function updateCPUOptions(socket) {
    const cpuSelect = document.querySelector('#cpu select');
    const intelGroup = cpuSelect.querySelector('optgroup[label="Intel"]');
    const amdGroup = cpuSelect.querySelector('optgroup[label="AMD"]');

    intelGroup.innerHTML = '';
    amdGroup.innerHTML = '';

    componentsDB.cpu.intel
        .filter(cpu => cpu.socket === socket)
        .forEach(cpu => {
            intelGroup.innerHTML += createOptionHTML(cpu);
        });

    componentsDB.cpu.amd
        .filter(cpu => cpu.socket === socket)
        .forEach(cpu => {
            amdGroup.innerHTML += createOptionHTML(cpu);
        });
}

// Update GPU options based on case size
function updateGPUOptions(maxLength) {
    const gpuSelect = document.querySelector('#gpu select');
    gpuSelect.innerHTML = '<option value="">Select GPU</option>';

    componentsDB.gpu
        .filter(gpu => gpu.length <= maxLength)
        .forEach(gpu => {
            gpuSelect.innerHTML += createOptionHTML(gpu);
        });
}

// Display component specifications
function displayComponentSpecs(type, component) {
    const specsDisplay = document.querySelector(`#${type} .specs-display`);
    let specsHTML = '<div class="specs-list">';

    // Display different specs based on component type
    switch (type) {
        case 'cpu':
            specsHTML += `
                <p>Cores: ${component.specs.cores}</p>
                <p>Threads: ${component.specs.threads}</p>
                <p>Base Clock: ${component.specs.base_clock} GHz</p>
                <p>Boost Clock: ${component.specs.boost_clock} GHz</p>
            `;
            break;
        case 'gpu':
            specsHTML += `
                <p>VRAM: ${component.specs.vram}GB</p>
                <p>Length: ${component.length}mm</p>
            `;
            break;
        case 'motherboard':
            specsHTML += `
                <p>Socket: ${component.specs.socket}</p>
                <p>Memory Type: ${component.specs.memory_type}</p>
            `;
            break;
    }

    specsHTML += '</div>';
    specsDisplay.innerHTML = specsHTML;
}

// Validate compatibility between components
function validateCompatibility() {
    const statusElements = document.querySelectorAll('.compatibility-status');
    statusElements.forEach(element => element.innerHTML = '');

    // Check CPU and Motherboard compatibility
    if (selectedComponents.cpu && selectedComponents.motherboard) {
        const cpuStatus = document.querySelector('#cpu .compatibility-status');
        const moboStatus = document.querySelector('#motherboard .compatibility-status');

        if (selectedComponents.cpu.socket !== selectedComponents.motherboard.specs.socket) {
            showIncompatibility(cpuStatus, 'Socket incompatible with motherboard');
            showIncompatibility(moboStatus, 'Socket incompatible with CPU');
        } else {
            showCompatibility(cpuStatus, 'Compatible with motherboard');
            showCompatibility(moboStatus, 'Compatible with CPU');
        }
    }

    // Check GPU and Case compatibility
    if (selectedComponents.gpu && selectedComponents.case) {
        const gpuStatus = document.querySelector('#gpu .compatibility-status');
        const caseStatus = document.querySelector('#case .compatibility-status');

        if (selectedComponents.gpu.length > selectedComponents.case.max_gpu_length) {
            showIncompatibility(gpuStatus, 'GPU too long for selected case');
            showIncompatibility(caseStatus, 'Case too small for selected GPU');
        } else {
            showCompatibility(gpuStatus, 'Compatible with case');
            showCompatibility(caseStatus, 'Compatible with GPU');
        }
    }
}

// Helper function to show compatibility status
function showCompatibility(element, message) {
    element.innerHTML = `<i class="fas fa-check"></i> ${message}`;
    element.className = 'compatibility-status compatible';
}

// Helper function to show incompatibility status
function showIncompatibility(element, message) {
    element.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    element.className = 'compatibility-status incompatible';
}

// Update price summary and build capabilities
function updatePriceSummary() {
    const componentPrices = document.querySelector('.component-prices');
    const totalPriceElement = document.querySelector('.total-price');
    let totalPrice = 0;

    // Clear previous price list
    componentPrices.innerHTML = '';

    // Add each selected component to the price summary
    Object.entries(selectedComponents).forEach(([type, component]) => {
        if (component) {
            totalPrice += component.price;
            componentPrices.innerHTML += `
                <div class="d-flex justify-content-between mb-2">
                    <span>${component.name}</span>
                    <span>₹${component.price.toLocaleString()}</span>
                </div>
            `;
        }
    });

    // Update total price
    totalPriceElement.textContent = `₹${totalPrice.toLocaleString()}`;

    // Update build capabilities
    updateBuildCapabilities();
}

// Analyze and display build capabilities
function updateBuildCapabilities() {
    const buildCapabilities = document.querySelector('.build-capabilities');
    if (!buildCapabilities) return;

    // Only show capabilities if CPU and GPU are selected
    if (!selectedComponents.cpu || !selectedComponents.gpu) {
        buildCapabilities.innerHTML = '<p class="text-muted">Select CPU and GPU to see build capabilities</p>';
        return;
    }

    let performanceLevel = calculatePerformanceLevel();
    let gamePerformance = getGamePerformance(performanceLevel);
    let upgradeRecommendations = getUpgradeRecommendations();
    let performanceScore = calculateOverallPerformanceScore();

    buildCapabilities.innerHTML = `
        <h4 class="mt-4">Build Performance</h4>
        <div class="performance-score mb-3">
            <div class="progress" style="height: 25px;">
                <div class="progress-bar bg-${getPerformanceColor(performanceScore)}" 
                     role="progressbar" 
                     style="width: ${performanceScore}%" 
                     aria-valuenow="${performanceScore}" 
                     aria-valuemin="0" 
                     aria-valuemax="100">
                    ${performanceScore}%
                </div>
            </div>
            <small class="text-muted mt-1">Overall Performance Score</small>
        </div>

        <h4>Gaming Performance</h4>
        <div class="performance-summary mb-3">
            ${gamePerformance.map(game => `
                <div class="game-performance mb-2">
                    <strong>${game.name}:</strong> ${game.performance}
                    <div class="progress" style="height: 10px;">
                        <div class="progress-bar bg-${getPerformanceColor(game.fps_score)}" 
                             role="progressbar" 
                             style="width: ${game.fps_score}%" 
                             aria-valuenow="${game.fps_score}" 
                             aria-valuemin="0" 
                             aria-valuemax="100">
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <h4>Recommended Upgrades</h4>
        <ul class="upgrade-recommendations list-unstyled">
            ${upgradeRecommendations.map(upgrade => `
                <li class="mb-2">
                    <i class="fas fa-arrow-up text-primary"></i> 
                    <strong>${upgrade.component}:</strong> ${upgrade.reason}
                    <div class="potential-gain text-success">
                        <small><i class="fas fa-chart-line"></i> +${upgrade.performance_gain}% potential performance gain</small>
                    </div>
                </li>
            `).join('')}
        </ul>
    `;
}

// Calculate overall performance level based on components
function calculatePerformanceLevel() {
    if (!selectedComponents.cpu || !selectedComponents.gpu) return 'unknown';

    const cpuScore = getCPUScore(selectedComponents.cpu);
    const gpuScore = getGPUScore(selectedComponents.gpu);
    const avgScore = (cpuScore + gpuScore) / 2;

    if (avgScore >= 8) return 'high';
    if (avgScore >= 6) return 'medium';
    return 'low';
}

// Calculate overall performance score (0-100)
function calculateOverallPerformanceScore() {
    if (!selectedComponents.cpu || !selectedComponents.gpu) return 0;

    const cpuScore = getCPUScore(selectedComponents.cpu) * 10;
    const gpuScore = getGPUScore(selectedComponents.gpu) * 10;
    const ramScore = calculateRAMScore();
    const storageScore = calculateStorageScore();

    return Math.round((cpuScore + gpuScore + ramScore + storageScore) / 4);
}

// Calculate RAM score (0-100)
function calculateRAMScore() {
    if (!selectedComponents.ram) return 0;
    const capacity = selectedComponents.ram.specs.capacity;
    if (capacity >= 32) return 100;
    if (capacity >= 16) return 80;
    if (capacity >= 8) return 60;
    return 40;
}

// Calculate storage score (0-100)
function calculateStorageScore() {
    if (!selectedComponents.storage) return 0;
    const type = selectedComponents.storage.specs.type;
    if (type.includes('NVMe')) return 100;
    if (type.includes('SSD')) return 80;
    return 50;
}

// Get color based on performance score
function getPerformanceColor(score) {
    if (score >= 80) return 'success';
    if (score >= 60) return 'info';
    if (score >= 40) return 'warning';
    return 'danger';
}

// Get CPU performance score
function getCPUScore(cpu) {
    // Simplified scoring based on CPU model
    if (cpu.name.includes('13900K') || cpu.name.includes('7950X')) return 9;
    if (cpu.name.includes('12700K') || cpu.name.includes('5800X')) return 7;
    if (cpu.name.includes('11600K') || cpu.name.includes('3600')) return 5;
    return 3;
}

// Get GPU performance score
function getGPUScore(gpu) {
    // Simplified scoring based on GPU model
    if (gpu.name.includes('4090') || gpu.name.includes('4080')) return 9;
    if (gpu.name.includes('3080') || gpu.name.includes('6800XT')) return 7;
    if (gpu.name.includes('3060') || gpu.name.includes('6600XT')) return 5;
    return 3;
}

// Get gaming performance estimates with FPS scores
function getGamePerformance(performanceLevel) {
    const performances = {
        high: [
            { name: 'Cyberpunk 2077', performance: '4K Ultra Settings with Ray Tracing @ 60+ FPS', fps_score: 90 },
            { name: 'Microsoft Flight Simulator', performance: '4K High Settings @ 60+ FPS', fps_score: 85 },
            { name: 'Forza Horizon 5', performance: '4K Ultra Settings @ 100+ FPS', fps_score: 95 }
        ],
        medium: [
            { name: 'Cyberpunk 2077', performance: '1440p High Settings @ 60+ FPS', fps_score: 75 },
            { name: 'Microsoft Flight Simulator', performance: '1440p Medium Settings @ 60+ FPS', fps_score: 70 },
            { name: 'Forza Horizon 5', performance: '1440p High Settings @ 80+ FPS', fps_score: 80 }
        ],
        low: [
            { name: 'Cyberpunk 2077', performance: '1080p Medium Settings @ 60 FPS', fps_score: 60 },
            { name: 'Microsoft Flight Simulator', performance: '1080p Low Settings @ 60 FPS', fps_score: 55 },
            { name: 'Forza Horizon 5', performance: '1080p Medium Settings @ 60+ FPS', fps_score: 65 }
        ],
        unknown: []
    };

    return performances[performanceLevel] || [];
}

// Get upgrade recommendations based on current components with performance gains
function getUpgradeRecommendations() {
    const recommendations = [];

    if (!selectedComponents.cpu || !selectedComponents.gpu) return recommendations;

    const cpuScore = getCPUScore(selectedComponents.cpu);
    const gpuScore = getGPUScore(selectedComponents.gpu);

    if (cpuScore < gpuScore - 2) {
        recommendations.push({
            component: 'CPU',
            reason: 'Current CPU is bottlenecking your GPU performance',
            performance_gain: 15
        });
    }
    if (gpuScore < cpuScore - 2) {
        recommendations.push({
            component: 'GPU',
            reason: 'Your CPU can handle a more powerful graphics card',
            performance_gain: 25
        });
    }
    if (selectedComponents.ram && selectedComponents.ram.specs.capacity < 16) {
        recommendations.push({
            component: 'RAM',
            reason: 'Upgrade to 16GB or more for better multitasking and gaming',
            performance_gain: 10
        });
    }
    if (!selectedComponents.storage || !selectedComponents.storage.specs.type.includes('SSD')) {
        recommendations.push({
            component: 'Storage',
            reason: 'Add an NVMe SSD for faster game loading and system responsiveness',
            performance_gain: 8
        });
    }

    return recommendations;
}

// Save the current configuration
function saveConfiguration() {
    // Convert selected components to a saveable format
    const configuration = {};
    Object.entries(selectedComponents).forEach(([type, component]) => {
        if (component) {
            configuration[type] = {
                id: component.id,
                name: component.name,
                price: component.price
            };
        }
    });

    // Save to localStorage
    localStorage.setItem('savedConfiguration', JSON.stringify(configuration));
    alert('Configuration saved successfully!');
    location.reload();
}