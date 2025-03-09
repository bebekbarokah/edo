let cart = {};

function updateQuantity(item, amount) {
    let qtySpan = document.getElementById("qty-" + item);
    let currentQty = parseInt(qtySpan.innerText) || 0;
    let newQty = Math.max(0, currentQty + amount);
    qtySpan.innerText = newQty;
}

function addToCart(item, price) {
    let qtySpan = document.getElementById("qty-" + item);
    let currentQty = parseInt(qtySpan.innerText) || 0;

    if (currentQty > 0) { 
        cart[item] = { qty: currentQty, price: price };
        updateCart();
    } else {
        alert("Jumlah harus lebih dari 0 untuk menambahkan ke keranjang!");
    }
}

function removeFromCart(item) {
    delete cart[item];
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let totalPrice = 0;
    let totalItems = 0;
    cartList.innerHTML = "";

    for (let item in cart) {
        let totalItemPrice = cart[item].qty * cart[item].price;
        let li = document.createElement("li");
        li.innerHTML = `${item} x${cart[item].qty} - Rp ${totalItemPrice.toLocaleString()} 
                        <button onclick="removeFromCart('${item}')">X</button>`;
        cartList.appendChild(li);
        totalPrice += totalItemPrice;
        totalItems += cart[item].qty;
    }

    document.getElementById("total-price-button").innerText = `Total: Rp ${totalPrice.toLocaleString()}`;
    document.getElementById("total-price-modal").innerText = `Total: Rp ${totalPrice.toLocaleString()}`;
    cartCount.innerText = totalItems;
}

function toggleCart() {
    let cartModal = document.getElementById("cart-modal");
    let cartOverlay = document.getElementById("cart-overlay");

    if (cartModal.style.display === "block") {
        cartModal.style.display = "none";
        cartOverlay.style.display = "none";
    } else {
        cartModal.style.display = "block";
        cartOverlay.style.display = "block";
    }
}

function toggleDropdown() {
    document.getElementById("dropdownMenu").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function filterMenu(category) {
    let items = document.querySelectorAll('.menu-item');
    let titles = document.querySelectorAll('.food');
    const buttons = document.querySelectorAll('.dropdown-content button');

    // Sembunyikan semua item dan judul kategori
    items.forEach(item => {
        item.style.display = 'none';
    });

    titles.forEach(title => {
        title.style.display = 'none';
    });

    // Jika kategori 'all' dipilih, tampilkan semua item dan judulnya
    if (category === 'all') {
        items.forEach(item => {
            item.style.display = 'flex';
        });
        titles.forEach(title => {
            title.style.display = 'block';
        });
        return;
    }

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Tambahkan kelas active ke tombol yang dipilih
    event.target.classList.add('active');


    // Tampilkan hanya item yang sesuai dengan kategori yang dipilih
    document.querySelectorAll(`.menu-item[data-category="${category}"]`).forEach(item => {
        item.style.display = 'flex';
    });

    // Tampilkan judul kategori hanya jika ada item dalam kategori tersebut
    document.querySelectorAll(`h2.food`).forEach(title => {
        let nextItem = title.nextElementSibling;
        while (nextItem && !nextItem.matches('h2.food')) {
            if (nextItem.matches(`.menu-item[data-category="${category}"]`)) {
                title.style.display = 'block';
                break;
            }
            nextItem = nextItem.nextElementSibling;
        }
    });
}

function checkout() {
    if (Object.keys(cart).length === 0) {
        alert("Keranjang masih kosong!");
        return;
        cart = {};
        updateCart();

    }

    let name = document.getElementById("customer-name").value.trim();
    let phone = document.getElementById("customer-phone").value.trim();
    let address = document.getElementById("customer-address").value.trim();

    if (name === "" || phone === "" || address === "") {
        alert("Harap isi Nama, Nomor WhatsApp, dan Alamat sebelum checkout.");
        return;
    }

    let orderText = `Halo, saya ingin memesan:\n`;
    let totalPrice = 0;

    for (let item in cart) {
        let totalItemPrice = cart[item].qty * cart[item].price;
        orderText += `- ${item} x${cart[item].qty} = Rp ${totalItemPrice.toLocaleString()}\n`;
        totalPrice += totalItemPrice;
    }

    orderText += `\nTotal harga: Rp ${totalPrice.toLocaleString()}\n\n`;
    orderText += `👤 Nama: ${name}\n📞 Nomor WA: ${phone}\n📍 Alamat: ${address}`;

    let waLink = `https://wa.me/6285739734668?text=${encodeURIComponent(orderText)}`;
    window.open(waLink, "_blank");
}




