window.addEventListener("load", function(){
    const totalPriceEl = document.getElementById("total_price");
    showCheckAnimation();
    addDate();

    let total = localStorage.getItem('total price');
    if (total) {
        total = parseFloat(total);
        if (totalPriceEl) totalPriceEl.innerHTML = `$${total.toFixed(2)}`;
    } else {
        if (totalPriceEl) totalPriceEl.innerHTML = `$0.00`;
    }

    // Populate hidden inputs for bank transfer
    try {
      const cartRaw = localStorage.getItem('cart') || '[]';
      const cart = JSON.parse(cartRaw);
      const cartJsonInput = document.getElementById('cart-json');
      const totalAmountInput = document.getElementById('total-amount');
      if (cartJsonInput) cartJsonInput.value = JSON.stringify(cart);
      if (totalAmountInput) totalAmountInput.value = total ? `$${parseFloat(total).toFixed(2)}` : '$0.00';
    } catch (e) {
      // ignore parse error
    }
});

function showCheckAnimation(){
    const checkIconContainer = document.getElementById('checkoutIcon');
    if (!checkIconContainer) return;
    checkIconContainer.innerHTML = '';
    const newCheckIcon = document.createElement('div');
    newCheckIcon.style.width = '200px';
    newCheckIcon.style.height = '200px';
    checkIconContainer.appendChild(newCheckIcon);
 
    lottie.loadAnimation({
        container: newCheckIcon,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'json/AnimationCheckoutPage.json'
    });
}

function addDate(){
    const date = document.getElementById("order_date");
    const now = new Date();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const day = now.getDate(); 
    const month = months[now.getMonth()]; 
    const year = now.getFullYear();
    if (date) date.innerHTML  = ` ${month} ${day},  ${year}`;
}

function clearCart() {
    localStorage.removeItem('cart');
}
function backHome() {
    window.location.href = "index.html"; 
}

const cursor = document.getElementById('custom-cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  });
}

document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener('change', function() {
    const cardDetails = document.getElementById('card-details');
    const bankDetails = document.getElementById('bank-details');
    if (this.value === 'card') {
      if (cardDetails) cardDetails.style.display = 'block';
      if (bankDetails) bankDetails.style.display = 'none';
    } else if (this.value === 'bank') {
      if (cardDetails) cardDetails.style.display = 'none';
      if (bankDetails) bankDetails.style.display = 'block';
    } else {
      if (cardDetails) cardDetails.style.display = 'none';
      if (bankDetails) bankDetails.style.display = 'none';
    }
  });
});
// Show card details by default, hide bank details
if (document.getElementById('card-details')) document.getElementById('card-details').style.display = 'block';
if (document.getElementById('bank-details')) document.getElementById('bank-details').style.display = 'none';

const receiptInput = document.getElementById('receipt-upload');
if (receiptInput) {
  receiptInput.addEventListener('change', function() {
    const status = document.getElementById('receipt-status');
    if (status) {
      if (this.files && this.files.length > 0) {
        status.textContent = 'Receipt selected: ' + this.files[0].name;
        status.style.color = '#097a6e';
      } else {
        status.textContent = '';
      }
    }
  });
}

document.getElementById('pay-btn').addEventListener('click', async function() {
  const payBtn = this;
  const selectedPaymentEl = document.querySelector('input[name="payment"]:checked');
  const selectedPayment = selectedPaymentEl ? selectedPaymentEl.value : 'card';
  payBtn.innerText = 'Processing...';
  payBtn.disabled = true;
  payBtn.style.background = 'linear-gradient(90deg, #097a6e 0%, #ff00cc 100%)';

  if (selectedPayment === 'bank') {
    // Client-side validation and robust network handling
    const form = document.getElementById('bank-receipt-form');
    const nameEl = document.getElementById('customer-name');
    const emailEl = document.getElementById('customer-email');
    const receiptEl = document.getElementById('receipt-upload');
    const bankSelect = document.getElementById('bank-select');
    const bankNameHidden = document.getElementById('bank-name');

    if (!form || !nameEl || !emailEl || !receiptEl || !bankSelect) {
      alert('Form not ready. Reload the page and try again.');
      payBtn.innerText = 'Pay Now';
      payBtn.disabled = false;
      payBtn.style.background = '';
      return;
    }

    if (bankNameHidden) bankNameHidden.value = bankSelect.value;

    if (!nameEl.value.trim()) {
      alert('Please enter your full name.');
      payBtn.innerText = 'Pay Now';
      payBtn.disabled = false;
      payBtn.style.background = '';
      return;
    }
    if (!emailEl.checkValidity()) {
      alert('Please enter a valid email.');
      payBtn.innerText = 'Pay Now';
      payBtn.disabled = false;
      payBtn.style.background = '';
      return;
    }
    if (!receiptEl.files || receiptEl.files.length === 0) {
      alert('Please select a receipt file.');
      payBtn.innerText = 'Pay Now';
      payBtn.disabled = false;
      payBtn.style.background = '';
      return;
    }

    try {
      const fd = new FormData(form);
      if (window.location.protocol === 'file:') {
        throw new Error('LOCAL_FILE_PROTOCOL');
      }
      const res = await fetch('send_receipt.php', { method: 'POST', body: fd });
      let data;
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { success: res.ok, message: text ? text.substring(0, 300) : ('HTTP ' + res.status) };
      }
      if (data.success) {
        const pg = document.querySelector('.payment-glass');
        const oc = document.getElementById('order-confirmation');
        if (pg) pg.style.display = 'none';
        if (oc) oc.style.display = 'block';
        showCheckAnimation();
      } else {
        alert('Failed to submit receipt: ' + (data.message || 'Unknown error'));
        payBtn.innerText = 'Pay Now';
        payBtn.disabled = false;
        payBtn.style.background = '';
        return;
      }
    } catch (e) {
      if (e && e.message === 'LOCAL_FILE_PROTOCOL') {
        alert('This page must be served from a PHP server (http:// or https://). Start a PHP server in the Ecommerce-website-main/Ecommerce-website-main folder and open http://127.0.0.1:8000/checkout.html');
      } else {
        alert('Error submitting receipt. Please try again.');
      }
      payBtn.innerText = 'Pay Now';
      payBtn.disabled = false;
      payBtn.style.background = '';
      return;
    }
  } else {
    setTimeout(() => {
      const pg = document.querySelector('.payment-glass');
      const oc = document.getElementById('order-confirmation');
      if (pg) pg.style.display = 'none';
      if (oc) oc.style.display = 'block';
      showCheckAnimation();
    }, 800);
  }
});

const contactBtn = document.getElementById('contact-seller-btn');
if (contactBtn) {
  contactBtn.onclick = function() {
    const modal = document.getElementById('contact-modal');
    if (modal) modal.style.display = 'block';
  };
}
