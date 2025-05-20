// Initialize AOS Animation
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Loading Animation
window.addEventListener('load', function () {
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.style.opacity = '0';
    loaderContainer.style.visibility = 'hidden';
    setTimeout(() => {
        loaderContainer.style.display = 'none';
    }, 500);
});

// DOM Elements
let menuBtn = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');
let searchBtn = document.querySelector('#search-btn');
let searchForm = document.querySelector('.search-form');
let cartBtn = document.querySelector('#cart-btn');
let shoppingCart = document.querySelector('.shopping-cart');
let loginBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form');
let scrollTop = document.querySelector('.scroll-top');

// Toggle Menu
menuBtn.onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    menuBtn.classList.toggle('fa-times');
}

// Toggle Search Form
searchBtn.onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    menuBtn.classList.remove('fa-times');
}

// Toggle Shopping Cart
cartBtn.onclick = () => {
    shoppingCart.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    menuBtn.classList.remove('fa-times');
}

// Toggle Login Form
loginBtn.onclick = () => {
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    menuBtn.classList.remove('fa-times');
}

// Close All When Scrolling
window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    menuBtn.classList.remove('fa-times');

    // Scroll Top Button
    if (window.scrollY > 300) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }

    // Header Shadow on Scroll
    if (window.scrollY > 100) {
        document.querySelector('.header').classList.add('scrolled');
    } else {
        document.querySelector('.header').classList.remove('scrolled');
    }
}

// Scroll Top Button
scrollTop.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Product Filtering
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const productItems = document.querySelectorAll('.products .box-container .box');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            productItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(2rem)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
});

// Shopping Cart Functionality
document.querySelectorAll('.shopping-cart .fa-trash').forEach(item => {
    item.addEventListener('click', function () {
        this.parentElement.style.transform = 'translateX(10rem)';
        this.parentElement.style.opacity = '0';
        setTimeout(() => {
            this.parentElement.remove();
            updateTotal();
        }, 300);
    });
});

function updateTotal() {
    let total = 0;
    document.querySelectorAll('.shopping-cart .box').forEach(box => {
        const price = parseFloat(box.querySelector('.price').textContent.replace('$', ''));
        const quantity = parseInt(box.querySelector('.quantity').textContent.replace('qty: ', ''));
        total += price * quantity;
    });
    document.querySelector('.shopping-cart .total').textContent = `Total: $${total.toFixed(2)}`;

    // Update cart badge
    const cartCount = document.querySelectorAll('.shopping-cart .box').length;
    document.querySelector('.badge').textContent = cartCount;
}

// Add to Cart Buttons
document.querySelectorAll('.products .box-container .box .icons .fa-shopping-cart').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        const productBox = this.closest('.box');
        const productName = productBox.querySelector('.content h3').textContent;
        const productPrice = productBox.querySelector('.content .price').textContent.split(' ')[0];
        const productImage = productBox.querySelector('.image img').src;

        // Create new cart item
        const cartItem = document.createElement('div');
        cartItem.classList.add('box');
        cartItem.innerHTML = `
                    <i class="fas fa-trash"></i>
                    <img src="${productImage}" alt="${productName}">
                    <div class="content">
                        <h3>${productName}</h3>
                        <span class="price">${productPrice}</span>
                        <span class="quantity">qty: 1</span>
                    </div>
                `;

        // Add to cart
        document.querySelector('.shopping-cart').insertBefore(cartItem, document.querySelector('.shopping-cart .total'));

        // Add event listener to new trash icon
        cartItem.querySelector('.fa-trash').addEventListener('click', function () {
            this.parentElement.style.transform = 'translateX(10rem)';
            this.parentElement.style.opacity = '0';
            setTimeout(() => {
                this.parentElement.remove();
                updateTotal();
            }, 300);
        });

        // Update total
        updateTotal();

        // Show cart with animation
        shoppingCart.classList.add('active');

        // Add item animation
        cartItem.style.transform = 'translateX(10rem)';
        cartItem.style.opacity = '0';
        setTimeout(() => {
            cartItem.style.transform = 'translateX(0)';
            cartItem.style.opacity = '1';
        }, 50);

        // Cart button animation
        cartBtn.classList.add('animate');
        setTimeout(() => {
            cartBtn.classList.remove('animate');
        }, 500);
    });
});

// Form Submission
document.querySelector('.login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    // Simple validation
    if (email && password) {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Login successful! Redirecting...';
        this.appendChild(successMsg);

        // Hide form and show success
        this.querySelectorAll('.box').forEach(input => {
            input.style.opacity = '0';
            input.style.height = '0';
            input.style.padding = '0';
            input.style.margin = '0';
        });

        // Redirect after delay
        setTimeout(() => {
            window.location.href = '#';
        }, 1500);
    } else {
        alert('Please fill in all fields!');
    }
});

document.querySelector('.newsletter .content form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('.box').value;

    // Simple validation
    if (email) {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for subscribing!';
        this.parentNode.insertBefore(successMsg, this.nextSibling);

        // Hide form and show success
        this.style.opacity = '0';
        this.style.height = '0';
        this.style.padding = '0';
        this.style.margin = '0';

        // Reset after delay
        setTimeout(() => {
            this.reset();
            this.style.opacity = '1';
            this.style.height = 'auto';
            this.style.padding = '';
            this.style.margin = '';
            successMsg.remove();
        }, 3000);
    } else {
        alert('Please enter your email address!');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
