/*=============== SHOP FUNCTIONALITY ===============*/

// Product database for pre-owned components and systems
const preOwnedProducts = {
    cpu: [
        {
            id: 'used_i9_13900k',
            name: 'Intel Core i9-13900K (Pre-owned)',
            image: 'https://www.computerchaupati.in/images/upload/products/16790572793.png',
            price: 45999,
            condition: 'Like New',
            usage_period: '3 months',
            specs: {
                cores: 24,
                threads: 32,
                base_clock: 3.0,
                boost_clock: 5.8
            }
        },
        {
            id: 'used_r9_7950x',
            name: 'AMD Ryzen 9 7950X (Pre-owned)',
            image: 'https://m.media-amazon.com/images/I/5116zdA9uyL._AC_UF1000,1000_QL80_.jpg',
            price: 49999,
            condition: 'Excellent',
            usage_period: '4 months',
            specs: {
                cores: 16,
                threads: 32,
                base_clock: 4.5,
                boost_clock: 5.7
            }
        }
    ],
    gpu: [
        {
            id: 'used_rtx4080',
            name: 'NVIDIA RTX 4080 16GB (Pre-owned)',
            image: 'https://www.zotac.com/kh/system/files/styles/org/private/product_main_image/graphics_cards/zt-d40820d-10p-image01.jpg?itok=uUZkMTfy',
            price: 89999,
            condition: 'Like New',
            usage_period: '2 months',
            specs: {
                vram: '16GB GDDR6X',
                boost_clock: '2.51 GHz',
                cuda_cores: 9728
            }
        },
        {

            id: 'used_rx7900xt',
            name: 'AMD RX 7900 XT 20GB(Pre-owned)',
            image: 'https://m.media-amazon.com/images/I/81AnvEdFSAL.jpg',
            price: 79999,
            condition: 'Excellent',
            usage_period: '3 months',
            specs: {
                vram: '20GB GDDR6',
                boost_clock: '2.4 GHz',
                stream_processors: 10752
            }
        }
    ],
    prebuilt: [
        {
            id: 'gaming_beast',
            name: 'Gaming Beast PC (Pre-owned)',
            image: 'https://danscustombuiltgamingbeasts.com/cdn/shop/files/IMG_8062_8d5341e5-871a-47bd-a068-2363d16abcd9.jpg?v=1686327250&width=1445',
            price: 149999,
            condition: 'Like New',
            usage_period: '2 months',
            specs: {
                cpu: 'Intel Core i9-13900K',
                gpu: 'NVIDIA RTX 4080 16GB',
                ram: '32GB DDR5-6000',
                storage: '2TB NVMe SSD',
                case: 'Lian Li O11 Dynamic'
            }
        },
        {
            id: 'creator_pro',
            name: 'Creator Pro PC (Pre-owned)',
            image: 'https://m.media-amazon.com/images/I/8148yvkQwGL.jpg',
            price: 169999,
            condition: 'Excellent',
            usage_period: '3 months',
            specs: {
                cpu: 'AMD Ryzen 9 7950X',
                gpu: 'NVIDIA RTX 4090 24GB',
                ram: '64GB DDR5-6400',
                storage: '4TB NVMe SSD',
                case: 'Phanteks Evolv X'
            }
        }
    ]
};

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const filterButtons = document.querySelectorAll('.filter__button');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');

// Current filter state
let currentCategory = 'all';
let currentMaxPrice = 200000;

// Format price in Indian Rupees
const formatPrice = (price) => {
    return '₹' + price.toLocaleString('en-IN');
};

// Create product card HTML
const createProductCard = (product) => {
    const specsHtml = product.specs ? Object.entries(product.specs)
        .map(([key, value]) => `<li class="product__spec"><span>${key.replace('_', ' ')}:</span> ${value}</li>`)
        .join('') : '';

    const imageHtml = product.image ? `<img src="${product.image}" alt="${product.name}" class="product__image">` : '';

    return `
        <div class="product__card">
            ${imageHtml}
            <div class="product__content">
                <h3 class="product__title">${product.name}</h3>
                <div class="product__info">
                    <span class="product__price">${formatPrice(product.price)}</span>
                    <span class="product__condition">${product.condition}</span>
                </div>
                <p class="product__usage">Used for: ${product.usage_period}</p>
                <div class="product__specs">
                    <h4>Specifications:</h4>
                    <ul class="specs__list">
                        ${specsHtml}
                    </ul>
                </div>
                <button class="button product__button">Add to Cart</button>
            </div>
        </div>
    `;
};

// Filter and render products
const filterAndRenderProducts = () => {
    let filteredProducts = [];

    if (currentCategory === 'all') {
        Object.values(preOwnedProducts).forEach(category => {
            filteredProducts = [...filteredProducts, ...category];
        });
    } else {
        filteredProducts = preOwnedProducts[currentCategory] || [];
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(product => product.price <= currentMaxPrice);

    // Render filtered products
    productsContainer.innerHTML = filteredProducts
        .map(product => createProductCard(product))
        .join('');
};

// Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Update current category and render
        currentCategory = button.dataset.category;
        filterAndRenderProducts();
    });
});

priceRange.addEventListener('input', (e) => {
    currentMaxPrice = parseInt(e.target.value);
    priceValue.textContent = formatPrice(currentMaxPrice);
    filterAndRenderProducts();
});

// Initial render
document.addEventListener('DOMContentLoaded', filterAndRenderProducts);