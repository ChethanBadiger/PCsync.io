/*=============== SHOP FUNCTIONALITY ===============*/

// Product database for pre-owned components and systems
const preOwnedProducts = {
    storage: [
        {
            id: 'used_980pro_2tb',
            name: 'Samsung 980 PRO 2TB NVMe SSD (Pre-owned)',
            image: 'https://m.media-amazon.com/images/I/71qA45tWZ5L.jpg',
            price: 14999,
            condition: 'Like New',
            usage_period: '2 months',
            specs: {
                capacity: '2TB',
                interface: 'PCIe 4.0 NVMe',
                read_speed: '7000 MB/s',
                write_speed: '5100 MB/s'
            }
        },
        {
            id: 'used_sn850x_2tb',
            name: 'WD Black SN850X 2TB NVMe SSD (Pre-owned)',
            image: 'https://m.media-amazon.com/images/I/61KeSQhDm4L.jpg',
            price: 13999,
            condition: 'Excellent',
            usage_period: '3 months',
            specs: {
                capacity: '2TB',
                interface: 'PCIe 4.0 NVMe',
                read_speed: '7300 MB/s',
                write_speed: '6300 MB/s'
            }
        }
    ],
    ram: [
        {
            id: 'used_dominator_32gb',
            name: 'Corsair Dominator 32GB DDR5-6000 (Pre-owned)',
            image: 'https://m.media-amazon.com/images/I/71WjY9LoM+L.jpg',
            price: 15999,
            condition: 'Like New',
            usage_period: '1 month',
            specs: {
                capacity: '32GB (2x16GB)',
                speed: 'DDR5-6000',
                timing: 'CL36',
                voltage: '1.35V'
            }
        },
        {
            id: 'used_tridentz5_32gb',
            name: 'G.Skill Trident Z5 32GB DDR5-6400 (Pre-owned)',
            image: 'https://m.media-amazon.com/images/I/61bc6zvEIIL._AC_UF1000,1000_QL80_.jpg',
            price: 16999,
            condition: 'Excellent',
            usage_period: '2 months',
            specs: {
                capacity: '32GB (2x16GB)',
                speed: 'DDR5-6400',
                timing: 'CL32',
                voltage: '1.40V'
            }
        }
    ],
    motherboard: [
        {
            id: 'used_z790_hero',
            name: 'ASUS ROG Maximus Z790 Hero (Pre-owned)',
            image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/motherboard/h/7/t/rog-maximus-z790-hero-asus-original-imagszhygfwbrwyg.jpeg?q=20&crop=false',
            price: 39999,
            condition: 'Like New',
            usage_period: '2 months',
            specs: {
                socket: 'LGA1700',
                chipset: 'Z790',
                memory: 'DDR5',
                pcie: 'PCIe 5.0'
            }
        },
        {
            id: 'used_x670e_ace',
            name: 'MSI MEG X670E ACE (Pre-owned)',
            image: 'https://m.media-amazon.com/images/I/81YdRatx95L._AC_UF350,350_QL80_.jpg',
            price: 44999,
            condition: 'Excellent',
            usage_period: '1 month',
            specs: {
                socket: 'AM5',
                chipset: 'X670E',
                memory: 'DDR5',
                pcie: 'PCIe 5.0'
            }
        }
    ],
    cpu: [
        {
            id: 'used_r7_7800x3d',
            name: 'AMD Ryzen 7 7800X3D (Pre-owned)',
            image: 'https://m.media-amazon.com/images/I/51HqC0rU9HL.jpg',
            price: 35999,
            condition: 'Like New',
            usage_period: '1 month',
            specs: {
                cores: 8,
                threads: 16,
                base_clock: 4.2,
                boost_clock: 5.0,
                cache: '104MB Total'
            }
        },
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
            id: 'used_rtx4070ti',
            name: 'NVIDIA RTX 4070 Ti 12GB (Pre-owned)',
            image: 'https://m.media-amazon.com/images/I/71-djDvKjfL.jpg',
            price: 69999,
            condition: 'Excellent',
            usage_period: '2 months',
            specs: {
                vram: '12GB GDDR6X',
                boost_clock: '2.61 GHz',
                cuda_cores: 7680
            }
        },
        {
            id: 'used_rx7800xt',
            name: 'AMD RX 7800 XT 16GB (Pre-owned)',
            image: 'https://m.media-amazon.com/images/I/71GKfo5qtaL.jpg',
            price: 59999,
            condition: 'Like New',
            usage_period: '1 month',
            specs: {
                vram: '16GB GDDR6',
                boost_clock: '2.43 GHz',
                stream_processors: 3840
            }
        },
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
            id: 'content_creator',
            name: 'Content Creator PC (Pre-owned)',
            image: 'https://static.digit.in/Kingston-PC-Key-visual.jpg',
            price: 139999,
            condition: 'Like New',
            usage_period: '1 month',
            specs: {
                cpu: 'AMD Ryzen 9 7900X',
                gpu: 'NVIDIA RTX 4070 Ti',
                ram: '32GB DDR5-6000',
                storage: '2TB NVMe SSD',
                case: 'Corsair 7000D Airflow'
            }
        },
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
        <div class="product__card" data-product-id="${product.id}">
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
                <button class="button product__button" onclick="addToCart(this)" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
};

// Add to cart functionality
const addToCart = (button) => {
    const productId = button.dataset.productId;
    let product;

    // Find the product in our database
    Object.values(preOwnedProducts).forEach(category => {
        const found = category.find(p => p.id === productId);
        if (found) product = found;
    });

    if (!product) return;

    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    const event = new Event('storage');
    event.key = 'cart';
    window.dispatchEvent(event);

    // Visual feedback
    button.textContent = 'Added to Cart!';
    setTimeout(() => {
        button.textContent = 'Add to Cart';
    }, 2000);
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