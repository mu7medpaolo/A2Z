function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        searchInput.focus();
    }
}

function performSearch() {
    const query = document.getElementById('searchInput').value;
    console.log(`Searching for: ${query}`);
    alert(`Searching for: ${query}`);

    const searchBar = document.getElementById('searchBar');
    searchBar.style.animation = 'shake 0.5s';
    setTimeout(() => {
        searchBar.style.animation = '';
    }, 500);
}

const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0% { transform: translateX(-50%) translateY(0); }
        25% { transform: translateX(-50%) translateY(-5px); }
        50% { transform: translateX(-50%) translateY(5px); }
        75% { transform: translateX(-50%) translateY(-5px); }
        100% { transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(style);

let cartCount = 0;

function addToCart() {
    cartCount++;
    document.querySelector('.cart-count').textContent = cartCount;
    alert('تمت إضافة المنتج إلى السلة!');
}

// إضافة event listener لكل زر "اضف إلى السلة"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});
const searchInput = document.getElementById('searchInput');
const suggestions = ['ماكينة إسبريسو', 'ماكينة كبسولات', 'قهوة تركية', 'إكسسوارات قهوة'];

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredSuggestions = suggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(query)
    );
    console.log(filteredSuggestions); // يمكنك عرضها في dropdown أو console
});

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const products = [
        { name: 'ماكينة إسبريسو ديلونجي', price: '999 جنيه', image: 'images/product1.jpg', link: 'product1.html' },
        { name: 'ماكينة كبسولات نيسبرسو', price: '799 جنيه', image: 'images/product2.jpg', link: 'product2.html' },
        // إضافة المزيد من المنتجات هنا
    ];

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );

    if (filteredProducts.length > 0) {
        // عرض النتائج في صفحة نتائج البحث
        localStorage.setItem('searchResults', JSON.stringify(filteredProducts));
        window.location.href = 'search-results.html';
    } else {
        alert('لم يتم العثور على منتجات تطابق بحثك.');
    }
}

console.log('نتائج البحث:', filteredProducts);

if (filteredProducts.length > 0) {
    localStorage.setItem('searchResults', JSON.stringify(filteredProducts));
    window.location.href = 'search-results.html';
} else {
    alert('لم يتم العثور على منتجات تطابق بحثك.');
}
console.log('تم تخزين نتائج البحث:', JSON.stringify(filteredProducts));
localStorage.setItem('searchResults', JSON.stringify(filteredProducts));