// 1. DATA PRODUK (Array & Looping)
const products = [
    { id: 1, name: "MacBook Pro M3", price: 25000000, category: "Laptop", desc: "Laptop powerful untuk programming kelas berat.", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600" },
    { id: 2, name: "iPhone 15 Pro", price: 20000000, category: "Smartphone", desc: "Kamera kelas profesional dengan chip A17 Pro.", img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600" }
];

for(let i = 3; i <= 30; i++) {
    const cats = ["Laptop", "Smartphone", "Aksesoris"];
    const currentCat = cats[i % 3];
    products.push({
        id: i,
        name: `${currentCat} Seri Modern X-${i}`,
        price: 500000 + (i * 350000),
        category: currentCat,
        desc: `Perangkat canggih kategori ${currentCat} untuk produktivitas mahasiswa IT seri ke-${i}.`,
        img: `https://picsum.photos/seed/${i+10}/600/400`
    });
}

const container = document.getElementById('productContainer');
const searchInput = document.getElementById('searchInput');

// 2. FUNGSI TAMPILKAN PRODUK (Looping render)
function render(data) {
    container.innerHTML = '';
    data.forEach(item => {
        container.innerHTML += `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="product-card shadow-sm d-flex flex-column">
                    <div class="img-container">
                        <img src="${item.img}" alt="${item.name}">
                    </div>
                    <div class="p-3 d-flex flex-column flex-grow-1">
                        <span class="badge bg-primary-subtle text-primary mb-2 w-fit" style="width:fit-content">${item.category}</span>
                        <h6 class="fw-bold text-truncate">${item.name}</h6>
                        <p class="text-success fw-bold small">Rp ${item.price.toLocaleString('id-ID')}</p>
                        <button onclick="openQuickView(${item.id})" class="btn btn-sm btn-primary mt-auto rounded-pill">Detail</button>
                    </div>
                </div>
            </div>`;
    });
}

// 3. FITUR FILTER & SEARCH
function applyFilters() {
    const query = searchInput.value.toLowerCase();
    const activeBtn = document.querySelector('.filter-btn.active').dataset.filter;

    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(query);
        const matchesCat = activeBtn === 'all' || p.category === activeBtn;
        return matchesSearch && matchesCat;
    });
    render(filtered);
}

searchInput.addEventListener('input', applyFilters);

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
        this.classList.add('active', 'btn-primary');
        applyFilters();
    });
});

// 4. MODAL & IMAGE ZOOMER (Tanpa error)
const bootstrapModal = new bootstrap.Modal(document.getElementById('productModal'));
function openQuickView(id) {
    const p = products.find(prod => prod.id === id);
    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalTitle').innerText = p.name;
    document.getElementById('modalPrice').innerText = `Rp ${p.price.toLocaleString('id-ID')}`;
    document.getElementById('modalDesc').innerText = p.desc;
    document.getElementById('modalCat').innerText = p.category;
    bootstrapModal.show();
}

const zoomArea = document.getElementById('zoomArea');
const modalImg = document.getElementById('modalImg');

zoomArea.addEventListener('mousemove', (e) => {
    modalImg.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`;
    modalImg.style.transform = "scale(2)";
});

zoomArea.addEventListener('mouseleave', () => {
    modalImg.style.transform = "scale(1)";
});

// 5. FITUR DARK MODE
document.getElementById('themeToggle').addEventListener('click', function() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('themeIcon').className = isDark ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
});

// Load awal
window.onload = () => render(products);