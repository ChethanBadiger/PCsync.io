<?php

require 'connect_db.php';

$data = [];

// Fetch CPUs with their specs and brand
$query = "
    SELECT cpus.*, cpu_brands.brand_name, cpu_specs.cores, cpu_specs.threads, cpu_specs.base_clock, cpu_specs.boost_clock, cpu_specs.l3_cache
    FROM cpus
    JOIN cpu_brands ON cpus.brand_id = cpu_brands.id
    JOIN cpu_specs ON cpus.id = cpu_specs.cpu_id
";
$result = $conn->query($query);
$data['cpus'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

print_r($data['cpus']);

// Fetch motherboards with their brand
$query = "
    SELECT motherboards.*, motherboard_brands.brand_name
    FROM motherboards
    JOIN motherboard_brands ON motherboards.brand_id = motherboard_brands.id
";
$result = $conn->query($query);
$data['motherboards'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

// Fetch GPU data with brand and performance
$query = "
    SELECT gpus.*, gpu_brands.brand_name
    FROM gpus
    JOIN gpu_brands ON gpus.brand_id = gpu_brands.id
";
$result = $conn->query($query);
$data['gpus'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

// Fetch GPU performance data
$query = "
    SELECT gpu_performance.gpu_id, gpus.name AS gpu_name, gpu_performance.game_name, gpu_performance.resolution, gpu_performance.fps
    FROM gpu_performance
    JOIN gpus ON gpu_performance.gpu_id = gpus.id
";
$result = $conn->query($query);
$data['gpu_performance'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

// Fetch CPU coolers with supported sockets
$query = "
    SELECT cpu_coolers.*, GROUP_CONCAT(cpu_cooler_sockets.socket) AS supported_sockets
    FROM cpu_coolers
    LEFT JOIN cpu_cooler_sockets ON cpu_coolers.id = cpu_cooler_sockets.cooler_id
    GROUP BY cpu_coolers.id
";
$result = $conn->query($query);
$data['cpu_coolers'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

// Fetch RAM modules
$query = "SELECT * FROM ram_modules";
$result = $conn->query($query);
$data['ram_modules'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

// Fetch storage devices
$query = "SELECT * FROM storage_devices";
$result = $conn->query($query);
$data['storage_devices'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

// Fetch PC cases
$query = "SELECT * FROM pc_cases";
$result = $conn->query($query);
$data['pc_cases'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];

echo "<pre>";
var_dump($data);
echo "</pre>";


// Output JSON
echo json_encode($data, JSON_PRETTY_PRINT);
?>