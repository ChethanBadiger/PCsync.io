const componentsDB = {
    // Image paths for component types
    
    cpu: {
        intel: [
            {
                id: 'i5-13600k',
                name: 'Intel Core i5-13600K',
                price: 31999,
                socket: 'LGA1700',
                specs: {
                    cores: 14,
                    threads: 20,
                    base_clock: 3.5,
                    boost_clock: 5.1,
                    cache: { l3: 24 }
                }
            },
            {
                id: 'i7-13700k',
                name: 'Intel Core i7-13700K',
                price: 41999,
                socket: 'LGA1700',
                specs: {
                    cores: 16,
                    threads: 24,
                    base_clock: 3.4,
                    boost_clock: 5.4,
                    cache: { l3: 30 }
                }
            },
            {
                id: 'i9-13900k',
                name: 'Intel Core i9-13900K',
                price: 57999,
                socket: 'LGA1700',
                specs: {
                    cores: 24,
                    threads: 32,
                    base_clock: 3.0,
                    boost_clock: 5.8,
                    cache: { l3: 36 }
                }
            }
        ],
        amd: [
            {
                id: 'r5-7600x',
                name: 'AMD Ryzen 5 7600X',
                price: 29999,
                socket: 'AM5',
                specs: {
                    cores: 6,
                    threads: 12,
                    base_clock: 4.7,
                    boost_clock: 5.3,
                    cache: { l3: 32 }
                }
            },
            {
                id: 'r7-7700x',
                name: 'AMD Ryzen 7 7700X',
                price: 38999,
                socket: 'AM5',
                specs: {
                    cores: 8,
                    threads: 16,
                    base_clock: 4.5,
                    boost_clock: 5.4,
                    cache: { l3: 32 }
                }
            },
            {
                id: 'r9-7950x',
                name: 'AMD Ryzen 9 7950X',
                price: 59999,
                socket: 'AM5',
                specs: {
                    cores: 16,
                    threads: 32,
                    base_clock: 4.5,
                    boost_clock: 5.7,
                    cache: { l3: 64 }
                }
            }
        ]
    },
    motherboard: {
        intel: [
            {
                id: 'z790-a',
                name: 'ASUS ROG STRIX Z790-A GAMING WIFI',
                price: 39999,
                specs: {
                    socket: 'LGA1700',
                    memory_type: 'DDR5',
                    storage_support: ['M.2 NVMe', 'SATA']
                }
            },
            {
                id: 'z790-e',
                name: 'ASUS ROG MAXIMUS Z790 HERO',
                price: 59999,
                specs: {
                    socket: 'LGA1700',
                    memory_type: 'DDR5',
                    storage_support: ['M.2 NVMe', 'SATA']
                }
            }
        ],
        amd: [
            {
                id: 'x670e-e',
                name: 'ASUS ROG STRIX X670E-E GAMING WIFI',
                price: 44999,
                specs: {
                    socket: 'AM5',
                    memory_type: 'DDR5',
                    storage_support: ['M.2 NVMe', 'SATA']
                }
            },
            {
                id: 'x670e-hero',
                name: 'ASUS ROG CROSSHAIR X670E HERO',
                price: 64999,
                specs: {
                    socket: 'AM5',
                    memory_type: 'DDR5',
                    storage_support: ['M.2 NVMe', 'SATA']
                }
            }
        ]
    },
    cpu_cooler: [
        {
            id: 'nh-d15',
            name: 'Noctua NH-D15',
            price: 9999,
            socket_support: ['LGA1700', 'AM5']
        },
        {
            id: 'h150i',
            name: 'Corsair H150i ELITE LCD',
            price: 19999,
            socket_support: ['LGA1700', 'AM5']
        }
    ],
    ram: [
        {
            id: 'dominator-32',
            name: 'Corsair Dominator Platinum RGB 32GB DDR5-6000',
            price: 19999,
            type: 'DDR5'
        },
        {
            id: 'trident-32',
            name: 'G.Skill Trident Z5 RGB 32GB DDR5-6400',
            price: 21999,
            type: 'DDR5'
        }
    ],
    gpu: [
        {
            id: '4070-gaming',
            name: 'NVIDIA GeForce RTX 4070 Gaming OC',
            price: 59999,
            length: 282,
            specs: {
                vram: 12,
                performance: {
                    gaming_1080p: {
                        valorant: 400,
                        fortnite: 220
                    }
                }
            }
        },
        {
            id: '4080-gaming',
            name: 'NVIDIA GeForce RTX 4080 Gaming OC',
            price: 109999,
            length: 320,
            specs: {
                vram: 16,
                performance: {
                    gaming_1080p: {
                        valorant: 600,
                        fortnite: 320
                    }
                }
            }
        },
        {
            id: '7900xt-gaming',
            name: 'AMD Radeon RX 7900 XT Gaming OC',
            price: 89999,
            length: 300,
            specs: {
                vram: 20,
                performance: {
                    gaming_1080p: {
                        valorant: 550,
                        fortnite: 300
                    }
                }
            }
        }
    ],
    storage: [
        {
            id: '980-pro-1tb',
            name: 'Samsung 980 PRO 1TB NVMe SSD',
            price: 12999,
            type: 'M.2 NVMe'
        },
        {
            id: '870-evo-1tb',
            name: 'Samsung 870 EVO 1TB SATA SSD',
            price: 8999,
            type: 'SATA'
        }
    ],
    case: [
        {
            id: '5000d',
            name: 'Corsair 5000D Airflow',
            price: 14999,
            size: 'Mid Tower',
            max_gpu_length: 400
        },
        {
            id: 'h7-flow',
            name: 'NZXT H7 Flow',
            price: 13999,
            size: 'Mid Tower',
            max_gpu_length: 400
        }
    ]
};