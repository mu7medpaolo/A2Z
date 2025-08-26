// ملف script.js المحسن
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة جميع المكونات
    initMobileMenu();
    initSearch();
    initScrollToTop();
    initAddToCart();
    initQuickView();
    initAnimations();
});

// تهيئة قائمة الموبايل
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// تهيئة البحث
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            
            if (query.length > 2) {
                // محاكاة نتائج البحث (في تطبيق حقيقي، ستأتي هذه البيانات من الخادم)
                const suggestions = [
                    'ماكينة إسبريسو ديلونجي',
                    'ماكينة كبسولات نيسبرسو',
                    'ماكينة قهوة تركية',
                    'قهوة إيطالية',
                    'إكسسوارات القهوة'
                ].filter(item => item.includes(query));
                
                displaySearchSuggestions(suggestions);
            } else {
                searchSuggestions.classList.remove('active');
            }
        });
        
        // إغلاق الاقتراحات عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                searchSuggestions.classList.remove('active');
            }
        });
    }
}

// عرض اقتراحات البحث
function displaySearchSuggestions(suggestions) {
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (suggestions.length > 0) {
        searchSuggestions.innerHTML = '';
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion;
            div.addEventListener('click', function() {
                document.getElementById('searchInput').value = suggestion;
                searchSuggestions.classList.remove('active');
                performSearch();
            });
            searchSuggestions.appendChild(div);
        });
        searchSuggestions.classList.add('active');
    } else {
        searchSuggestions.classList.remove('active');
    }
}

// تبديل عرض شريط البحث
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    
    searchBar.classList.toggle('active');
    
    if (searchBar.classList.contains('active')) {
        setTimeout(() => {
            searchInput.focus();
        }, 100);
    }
}

// تنفيذ البحث
function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (query.length > 0) {
        // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة نتائج البحث
        alert(`سيتم البحث عن: ${query}`);
        // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
}

// تهيئة زر العودة للأعلى
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// تهيئة إضافة إلى السلة
function initAddToCart() {
    // تحميل محتويات السلة من localStorage إذا كانت موجودة
    let cart = JSON.parse(localStorage.getItem('a2z_cart')) || [];
    updateCartCount(cart.length);
}

// إضافة منتج إلى السلة
function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('a2z_cart')) || [];
    
    // التحقق إذا كان المنتج موجوداً بالفعل في السلة
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    // حفظ السلة في localStorage
    localStorage.setItem('a2z_cart', JSON.stringify(cart));
    
    // تحديث عدد العناصر في السلة
    updateCartCount(cart.length);
    
    // عرض إشعار الإضافة
    showCartNotification();
}

// تحديث عدد العناصر في السلة
function updateCartCount(count) {
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// عرض إشعار الإضافة إلى السلة
function showCartNotification() {
    const notification = document.getElementById('cartNotification');
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// تهيئة المعاينة السريعة
function initQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (quickViewButtons.length > 0 && quickViewModal) {
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                openQuickView(productId);
            });
        });
        
        closeModal.addEventListener('click', function() {
            quickViewModal.classList.remove('active');
        });
        
        quickViewModal.addEventListener('click', function(e) {
            if (e.target === quickViewModal) {
                quickViewModal.classList.remove('active');
            }
        });
    }
}

// فتح نافذة المعاينة السريعة
function openQuickView(productId) {
    const quickViewModal = document.getElementById('quickViewModal');
    const modalBody = document.querySelector('.modal-body');
    
    // محاكاة بيانات المنتج (في التطبيق الحقيقي، سيتم جلب البيانات من الخادم)
    const products = {
        1: {
            name: 'ماكينة إسبريسو ديلونجي',
            price: '999 جنيه',
            image: 'images/product1.jpg',
            description: 'ماكينة إسبريسو احترافية من ديلونجي مع طاحونة مدمجة، تسمح لك بتحضير أروع أنواع الإسبريسو والكابتشينو في منزلك.',
            features: ['طاحونة مدمجة', 'نظام كابتشينو', 'شاشة LCD', 'إعدادات قابلة للتخصيص'],
            rating: 4.5
        },
        2: {
            name: 'ماكينة كبسولات نيسبرسو',
            price: '799 جنيه',
            image: 'images/product2.jpg',
            description: 'ماكينة كبسولات نيسبرسو الأنيقة والسريعة، تحضر قهوة مثالية في ثوانٍ مع نظام تسخين سريع.',
            features: ['تسخين سريع 25 ثانية', 'حجم مضغوط', 'نظام كبسولات متوافق', 'إيقاف تلقائي'],
            rating: 4
        }
    };
    
    const product = products[productId];
    
    if (product) {
        modalBody.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h2>${product.name}</h2>
                <div class="product-rating">
                    ${generateRatingStars(product.rating)}
                    <span>(${product.rating})</span>
                </div>
                <p class="product-price">${product.price}</p>
                <p class="product-description">${product.description}</p>
                <ul class="product-features">
                    ${product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
                <button class="add-to-cart" onclick="addToCart(${productId}, '${product.name}', ${parseInt(product.price)}, '${product.image}')">
                    <i class="fas fa-shopping-cart"></i> اضف إلى السلة
                </button>
            </div>
        `;
        
        quickViewModal.classList.add('active');
    }
}

// توليد نجوم التقييم
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// تهيئة الرسوم المتحركة
function initAnimations() {
    // سيتم تهيئة AOS في الصفحة الرئيسية
}

// وظائف إضافية للصفحات الأخرى
function filterProducts(category) {
    // في التطبيق الحقيقي، سيتم تصفية المنتجات حسب الفئة
    console.log(`تصفية المنتجات حسب: ${category}`);
}

function sortProducts(sortBy) {
    // في التطبيق الحقيقي، سيتم ترتيب المنتجات حسب المعيار المحدد
    console.log(`ترتيب المنتجات حسب: ${sortBy}`);
}

// وظائف لإدارة السلة (لصفحة السلة)
function updateCartItemQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem('a2z_cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('a2z_cart', JSON.stringify(cart));
        updateCartCount(cart.length);
        
        // إذا كنا في صفحة السلة، قم بتحديث العرض
        if (typeof updateCartDisplay === 'function') {
            updateCartDisplay();
        }
    }
}

function removeCartItem(id) {
    let cart = JSON.parse(localStorage.getItem('a2z_cart')) || [];
    cart = cart.filter(item => item.id !== id);
    
    localStorage.setItem('a2z_cart', JSON.stringify(cart));
    updateCartCount(cart.length);
    
    // إذا كنا في صفحة السلة، قم بتحديث العرض
    if (typeof updateCartDisplay === 'function') {
        updateCartDisplay();
    }
}

// وظائف للاتصال (لصفحة الاتصال)
function validateContactForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const errors = [];
    
    if (name.length < 3) {
        errors.push('الاسم يجب أن يكون至少 3 أحرف');
    }
    
    if (!isValidEmail(email)) {
        errors.push('البريد الإلكتروني غير صحيح');
    }
    
    if (message.length < 10) {
        errors.push('الرسالة يجب أن تكون至少 10 أحرف');
    }
    
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}