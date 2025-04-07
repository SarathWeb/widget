// Sample service data
const services = {
    "Hair Services": [
        { name: "Haircut", price: 30, duration: "30 mins" },
        { name: "Haircolor", price: 300, duration: "2hrs 20 mins" },
        { name: "Hair Extensions", price: 100, duration: "20 mins" },
        { name: "Hair Spa", price: 100, duration: "50 mins" }
    ],
    "Beauty Services": [
        { name: "Haircut", price: 30, duration: "30 mins" },
        { name: "Haircolor", price: 300, duration: "2hrs 20 mins" },
        { name: "Hair Extensions", price: 100, duration: "20 mins" },
        { name: "Hair Spa", price: 100, duration: "50 mins" }
    ],
    "Spa Services": [
        { name: "Full Body Massage", price: 120, duration: "1hr" },
        { name: "Facial", price: 80, duration: "45 mins" },
        { name: "Body Scrub", price: 90, duration: "1hr 15 mins" },
        { name: "Aromatherapy", price: 110, duration: "1hr" }
    ],
    "Nail Services": [
        { name: "Manicure", price: 50, duration: "30 mins" },
        { name: "Pedicure", price: 60, duration: "45 mins" },
        { name: "Gel Nails", price: 70, duration: "1hr" },
        { name: "Nail Art", price: 40, duration: "25 mins" }
    ]
};

// Load categories
const categoryList = document.getElementById("category-list");
const servicesContainer = document.getElementById("services-container");

function openStaff() {
    document.getElementById('add-services').classList.add('d-none');
    document.getElementById('booking-selection').classList.add('d-flex');
    document.getElementById('book-staff').setAttribute('onclick', 'openCustomer()')
}

Object.keys(services).forEach((category, index) => {
    const li = document.createElement("li");
    li.textContent = category;
    if (index === 0) li.classList.add("active");
    li.onclick = () => {
        document.querySelectorAll(".categories li").forEach(el => el.classList.remove("active"));
        li.classList.add("active");
        loadServices(category);
    };
    categoryList.appendChild(li);
});

// Load services for default category
function loadServices(category) {
    servicesContainer.innerHTML = `<h3 class='category-title'>${category} <img src="./assests/icons/downarrow.svg" /> </h3>`;
    services[category].forEach((item, idx) => {
        servicesContainer.innerHTML += `
        <div class="service-item">
        <div class="service-selection">
           <label>
            <input type="checkbox" data-category="${category}" data-name="${item.name}" data-price="${item.price}"
            data-duration=${item.duration} onchange="updateCart('cart-summary')" />
          </label>
          <div class="service-list">  <small class="service-name">${item.name}</small>
        <small class="service-time">${item.duration}</small> </div>
        
        </div>
          <div class="service-price">
            $${item.price}<br>
           
          </div>
        </div>
      `;
    });
    // mobile accordion toogle:
    let categoryTitle = document.querySelector('.category-title img');

    categoryTitle.onclick = function () {
        let servicesContainer = document.getElementById('services-container');
        servicesContainer.classList.toggle('category-toogle');
    }
}
loadServices(Object.keys(services)[0]);

// Tab switching logic
function showTab(tab) {
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active-tab'));
    document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active-tab-content'));

    document.getElementById(`${tab}-tab`).classList.add('active-tab');
    document.getElementById(`${tab}-section`).classList.add('active-tab-content');
    document.querySelector('.empty-cart').innerHTML = tab === 'vouchers' ? `
     <div class="empty-cart-icon">
                            <img src="./assests/icons/giftbox.png" alt="Empty" />
                            <p>Surprise your loved ones with 
                                our Gift Vouchers, Select 
                                some Gift Vouchers.</p>                             
                        </div>
    ` :
        ` <div class="empty-cart-icon">
                            <img src="./assests/icons/serviceemptycard.png" alt="Empty" />
                            <p>Good looks always gives you
                                the confidence! Go ahead,
                                Select some services.</p>
                                
                        </div>`
}

const vouchers = [
    {
        name: "Daughter's Day",
        validity: "30 days",
        value: 50,
        price: 50
    },
    {
        name: "Mother's Day",
        validity: "45 days",
        value: 100,
        price: 100
    },
    {
        name: "Father's Day",
        validity: "40 days",
        value: 80,
        price: 80
    },
    {
        name: "Valentine's Day",
        validity: "60 days",
        value: 150,
        price: 150
    }
];

function loadVouchers() {
    const voucherList = document.getElementById("voucher-list");
    voucherList.innerHTML = vouchers
        .map((item) => {
            return `
          <div class="voucher-item">
            <div class="voucher-selection">
              <div class="voucher-list">
                <label>
                  <input type="checkbox" data-category="Voucher" data-day="${item.name}" 
                  data-price="${item.price}" data-validity=${item.validity} onchange="updateCart('cart-summary')" />
                 
                </label>
                <div class="voucher-days">
                    <h2>${item.name}</h2>
                    <div class="voucher-details">
                       <small>Validity: ${item.validity}</small>
                  <small>Voucher Value: $${item.value}</small>
                    </div>
               
                </div>
              </div>
              <div class="voucher-price">$${item.price}</div>
            </div>
          </div>
        `;
        })
        .join("");
}

// Call loadVouchers() when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loadVouchers();
});

function updateCart(id) {

    const cart = document.getElementById(id);
    const selectedStaff = document.querySelector('input[name="staff"]:checked')?.value || 'No preference';
    const selectedDate = document.querySelector('.date-item.active')?.textContent.trim().replace(/\s+/g, ' ') || '';
    const selectedTime = document.querySelector('.time-options button.active')?.textContent.trim() || '';
    const selectedServices = document.querySelectorAll('.service-item input:checked');
    const selectedVouchers = document.querySelectorAll('#voucher-list input[type="checkbox"]:checked');

    let total = 0;
    let itemCount = 0;
    let itemsHTML = '';

    selectedServices.forEach(input => {
        const name = input.dataset.name;
        const price = parseFloat(input.dataset.price) || 0;
        const duration = input.dataset.duration || '30 mins';
        total += price;
        itemCount++;

        itemsHTML += `
            <div class="cart-add-mb">
                <div class="cart-add-item">
                    <h2>${name || day}</h2>
                    <small>$${price.toFixed(2)}</small>
                </div>
                <span>${duration}</span>
            </div>
        `;
    });

    selectedVouchers.forEach(input => {
        const name = input.dataset.name;
        const price = parseFloat(input.dataset.price) || 0;
        const day = input.dataset.day;

        total += price;
        itemCount++;

        itemsHTML += `
            <div class="cart-add-mb">
                <div class="cart-add-item">
                    <h2>${day}</h2>
                    <small>$${price.toFixed(2)}</small>
                </div>
                <span>Voucher</span>
            </div>
        `;
    });

    if (selectedServices.length === 0 && selectedVouchers.length === 0) {
        cart.innerHTML = `
            <h2 class="empty-title">Your Cart is Empty</h2>
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <img src="./assests/icons/serviceemptycard.png" alt="Empty" />
                    <p>Good looks always gives you
                        the confidence! Go ahead,
                        Select some services or gift vouchers.</p>
                </div>
            </div>`;
        return;
    }

    if (selectedServices.length === 0 && selectedVouchers.length > 0) {
        cart.innerHTML = `
            <h2 class="empty-title">Your Cart is Empty</h2>
            <div class="empty-cart-icon">
                <img src="./assests/icons/serviceemptycard.png" alt="Empty" />
                <p>Please select at least one service to proceed.</p>
            </div>`;

    }

    if (selectedVouchers.length === 0 && selectedServices.length > 0) {
        cart.innerHTML = `
            <h2 class="empty-title">Your Cart is Empty</h2>
            <div class="empty-cart-icon">
                <img src="./assests/icons/giftbox.png" alt="Empty" />
                <p>Surprise your loved ones with our Gift Vouchers. 
                   Select some Gift Vouchers.</p>
            </div>`;

    }

    const tax = 0;
    const grandTotal = total + tax;

    cart.innerHTML = `
        <div class="cart-added">
            <div class="whole-cart">
                <div class="cart-add-title">
                    <h2>Cart</h2>
                    <small>${itemCount} ${itemCount === 1 ? 'item' : 'items'}</small>
                </div>
                ${itemsHTML || '<p>No items added</p>'}
            </div>
            <div class="cart-add-total">
                <div class="cart-tax" style=display:${selectedDate.length === 0 ? 'none' : 'block'}>
                    <small>Date: 0${parseInt(selectedDate)} oct, 2022</small>
                    
                </div>
                <div class="cart-tax" style=display:${selectedTime.length === 0 ? 'none' : 'block'}>
                    <small>Time: ${selectedTime}</small>
                   
                </div>
                <div class="cart-tax" style=display:${selectedDate.length === 0 ? 'none' : 'flex'}>
                    <small>Net Total:</small>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <div class="cart-tax">
                    <small>Tax</small>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="cart-total">
                    <small>Total</small>
                    <span>$${grandTotal.toFixed(2)}</span>
                </div>
                <button onclick="openStaff()" id="book-staff">Book Now</button>
            </div>
        </div>
    `;
}

document.querySelectorAll('#voucher-list input').forEach(input => {
    input.addEventListener('change', updateCart('cart-summary'));
});

document.querySelectorAll('.service-item input').forEach(input => {
    input.addEventListener('change', updateCart('cart-summary'));
});

document.querySelectorAll('input[name="staff"]').forEach(input => {
    input.addEventListener('change', () => {
        updateCart('cart-summary');
        document.getElementById('book-staff').setAttribute('onclick', 'openCustomer()')
    })
});

document.querySelectorAll('.date-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.date-item').forEach(d => d.classList.remove('active'));
        item.classList.add('active');
        updateCart('cart-summary');
        document.getElementById('book-staff').setAttribute('onclick', 'openCustomer()')
    });
});

document.querySelectorAll('.time-options button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.time-options button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateCart('cart-summary');
        document.getElementById('book-staff').setAttribute('onclick', 'openCustomer()')
    });
});

// calendar state change:
const dobInput = document.getElementById("dob");
const dobDisplay = document.getElementById("dob-display");
const calendarIcon = document.getElementById("calendar-icon");

calendarIcon.addEventListener("click", () => {
    dobInput.showPicker?.() || dobInput.focus();
});

dobInput.addEventListener("change", () => {
    const date = new Date(dobInput.value);
    if (!isNaN(date)) {
        const formatted = date.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
        dobDisplay.value = formatted;
    }
});

// modal Open and close function:
function openCustomer() {
    let modal = document.getElementById('modal-container');
    let overlay = document.getElementById('overlay');
    modal.classList.toggle('d-none');
    modal.classList.toggle('d-flex');
    overlay.style.visibility =
        overlay.style.visibility === 'visible' ? 'hidden' : 'visible';
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden'
}

// Handling Form Submit:
const form = document.querySelector(".booking-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const firstName = form.querySelector('input[placeholder="Andrew"]').value.trim();
    const lastName = form.querySelector('input[placeholder="Simon"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const mobile = form.querySelector('input[type="tel"]').value.trim();
    const dob = dobInput.value.trim();

    if (!firstName || !lastName || !email || !mobile || !dob) {
        alert("Please fill in all required fields.");
        return;
    }
    // Pay success modal open after two seconds:
    setTimeout(() => onPaySuccess(), 2000)
});

function onPaySuccess() {
    let salonContainer = document.querySelector('.salon-container');
    let payModal = document.getElementById('pay-modal');
    salonContainer.classList.add('d-none');
    payModal.classList.add('d-flex');
    openCustomer();
    setTimeout(() => {
        payModal.classList.remove('d-flex');
        payModal.classList.add('d-none');
        salonContainer.classList.remove('d-none');
        document.getElementById('add-services').classList.remove('d-none');
        document.getElementById('booking-selection').classList.remove('d-flex');
        document.getElementById('booking-selection').classList.add('d-none');

        // Clear selected services
        document.querySelectorAll('.service-item input:checked').forEach(input => {
            input.checked = false;
        });

        // Clear selected vouchers
        document.querySelectorAll('#voucher-list input[type="checkbox"]:checked').forEach(input => {
            input.checked = false;
        });

        // Optionally clear selected staff, date, and time
        let checkedStaff = document.querySelector('input[name="staff"]:checked');
        if (checkedStaff) checkedStaff.checked = false;

        document.querySelectorAll('.date-item.active').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.time-options button.active').forEach(el => el.classList.remove('active'));

        // Finally, update cart to reflect cleared state
        updateCart('cart-summary');
        showTab('services');
        form.reset()
    }, 2000)
}

// Image slider functionality:
const carousel = document.querySelector('.carousel')
const slider = carousel.querySelector('.carousel_track')
let slides = [...slider.children]

// Initial slides position, so user can go from first to last slide (click to the left first)
slider.prepend(slides[slides.length - 1])

// Creating dot for each slide
const createDots = (carousel, initSlides) => {
    const dotsContainer = document.createElement('div')
    dotsContainer.classList.add('carousel_nav')

    initSlides.forEach((slide, index) => {
        const dot = document.createElement('button')
        dot.type = 'button'
        dot.classList.add('carousel_dot')
        dot.setAttribute('aria-label', `Slide number ${index + 1}`)
        slide.dataset.position = index
        slide.classList.contains('is-selected') && dot.classList.add('is-selected')
        dotsContainer.appendChild(dot)
    })

    carousel.appendChild(dotsContainer)

    return dotsContainer
}

// Updating relevant dot
const updateDot = slide => {
    const currDot = dotNav.querySelector('.is-selected')
    const targetDot = slide.dataset.position

    currDot.classList.remove('is-selected')
    dots[targetDot].classList.add('is-selected')
}

// Handling arrow buttons
const handleArrowClick = arrow => {
    arrow.addEventListener('click', () => {
        slides = [...slider.children]
        const currSlide = slider.querySelector('.is-selected')
        currSlide.classList.remove('is-selected')
        let targetSlide

        if (arrow.classList.contains('jsPrev')) {
            targetSlide = currSlide.previousElementSibling
            slider.prepend(slides[slides.length - 1])
        }

        if (arrow.classList.contains('jsNext')) {
            targetSlide = currSlide.nextElementSibling
            slider.append(slides[0])
        }

        targetSlide.classList.add('is-selected')
        updateDot(targetSlide)
    })
}

const buttons = carousel.querySelectorAll('.carousel_btn')
buttons.forEach(handleArrowClick)

// Handling dot buttons
const handleDotClick = dot => {
    const dotIndex = dots.indexOf(dot)
    const currSlidePos = slider.querySelector('.is-selected').dataset.position
    const targetSlidePos = slider.querySelector(`[data-position='${dotIndex}']`).dataset.position

    if (currSlidePos < targetSlidePos) {
        const count = targetSlidePos - currSlidePos
        for (let i = count; i > 0; i--) nextBtn.click()
    }

    if (currSlidePos > targetSlidePos) {
        const count = currSlidePos - targetSlidePos
        for (let i = count; i > 0; i--) prevBtn.click()
    }
}

const dotNav = createDots(carousel, slides)
const dots = [...dotNav.children]
const prevBtn = buttons[0]
const nextBtn = buttons[1]

dotNav.addEventListener('click', e => {
    const dot = e.target.closest('button')
    if (!dot) return
    handleDotClick(dot)
})

// Auto sliding
const slideTiming = 5000
let interval
const slideInterval = () => interval = setInterval(() => nextBtn.click(), slideTiming)

carousel.addEventListener('mouseover', () => clearInterval(interval))
carousel.addEventListener('mouseleave', slideInterval)
slideInterval();



