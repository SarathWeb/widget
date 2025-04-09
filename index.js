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
const bookingContainer = document.getElementById('booking-container');
const salonHeader = document.getElementById('salon-header');
const paymentSummary = document.getElementById('payment-summary');
let modal = document.getElementById('modal-container');
let overlay = document.getElementById('overlay');

function openStaff(id) {
    document.getElementById('add-services').classList.add('d-none');
    document.getElementById('booking-selection').classList.remove('d-none');
    document.getElementById('booking-selection').classList.add('d-flex');
    //check mobile cart button
    if (id === 'book-mob') {
        document.getElementById(id).setAttribute('onclick', 'openSummary()');
        openKiddyHeader();
    } else {
        document.getElementById('book-staff').setAttribute('onclick', 'openCustomer()')
    }
}

function openKiddyHeader() {
    salonHeader.classList.add('header-hidden');
    salonHeader.innerHTML += `
    <div class="salon-kid-mob" id="salon-kid-mob"
             style="display: flex;gap: 12px;align-items:center;padding: 16px 0;margin:0 16px;border-bottom: 1px solid #b0aaaa66;">
                <div  style="display: flex;gap: 9px;align-items: center;">
                    <img src="./assests//icons/headleftarrow.svg" alt="Back Arrow" />
                    <img src="./assests//icons/headspin.svg" alt="spinner" />
                </div>
                <h1>Kiddy Corture</h1>
            </div>
    `
}

function openSummary() {
    console.log('openSummary');
    document.getElementById('booking-selection').classList.remove('d-flex');
    document.getElementById('booking-selection').classList.add('d-none');
    document.getElementById('payment-summary').classList.remove('d-none');
    document.getElementById('book-mob').setAttribute('onclick', 'showModal()');

}

// show modal in mobile:
function showModal() {
    bookingContainer.classList.toggle('d-flex')
    bookingContainer.classList.toggle('d-none')
    modal.classList.toggle('d-none');
    modal.classList.toggle('d-flex');
    if (!modal.classList.contains('view-check')) {
        modal.classList.add('view-check');
    } else {
        modal.classList.remove('view-check');
    }
}

Object.keys(services).forEach((category, index) => {
    const li = document.createElement("li");
    li.textContent = category;
    if (index === 0) li.classList.add("active");
    li.onclick = () => {
        document.querySelectorAll(".categories li").forEach(el => el.classList.remove("active"));
        li.classList.add("active");
        loadServices(index);
    };
    categoryList.appendChild(li);
});

// Load services for default category
function loadServices(startIndex) {
    servicesContainer.innerHTML = ""; // Clear previous content

    const categories = Object.keys(services);
    const selectedCategories = categories.slice(startIndex, startIndex + 2); // get 2 categories

    selectedCategories.forEach(cat => {
        const div = document.createElement('div');
        div.classList.add("services-content");

        // Add category title
        div.innerHTML = `<h3 class='category-title'>${cat} <img src="./assests/icons/downarrow.svg" /></h3>`;
        const subDiv = document.createElement('div');
        subDiv.classList.add('accordion-content')
        // Add each service under that category
        services[cat].forEach(item => {
            subDiv.innerHTML += `
        <div class="service-item">
          <div class="service-selection">
            <label>
              <input type="checkbox" data-category="${cat}" data-name="${item.name}" data-price="${item.price}"
                data-duration="${item.duration}" onchange="updateCart('cart-summary')" />
            </label>
            <div class="service-list">
              <small class="service-name">${item.name}</small>
              <small class="service-time">${item.duration}</small>
            </div>
          </div>
          <div class="service-price">
            $${item.price}
          </div>
        </div>
      `;
        });
        div.appendChild(subDiv)
        servicesContainer.appendChild(div);
    });
}

loadServices(0);

// Tab switching logic
function showTab(tab) {
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active-tab'));
    document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active-tab-content'));

    document.getElementById(`${tab}-tab`).classList.add('active-tab');
    document.getElementById(`${tab}-section`).classList.add('active-tab-content');
    let emptyCart = document.querySelector('.empty-cart');
    if (emptyCart) {
        emptyCart.innerHTML = tab === 'vouchers' ? `
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
    const mobileCart = document.getElementById('mobile-cart')
    const selectedStaff = document.querySelector('input[name="staff"]:checked')?.value || 'No preference';
    const selectedDate = document.querySelector('.date-item.active')?.textContent.trim().replace(/\s+/g, ' ') || '';
    const selectedTime = document.querySelector('.time-options button.active')?.textContent.trim() || '';
    const selectedServices = document.querySelectorAll('.service-item input:checked');
    const selectedVouchers = document.querySelectorAll('#voucher-list input[type="checkbox"]:checked');

    let total = 0;
    let itemCount = 0;
    let itemsHTML = '';
    let payItems = '';

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
        // add payment summary content
        payItems += `
          <div class="service-summary-item">
        <div class="summary-service">
        <div class="service-list">
            <small class="service-name">${name}</small>
            <small class="service-time">Staff: ${selectedStaff.charAt(0).toUpperCase() + selectedStaff.slice(1).toLowerCase()}</small>
        </div>
        <div class="service-price">
           $${price.toFixed()}
        </div>
    </div>
     <img src="./assests/icons/deleteicon.svg" alt="delete icon"
                                style="width: 20px; height: 22px;" />
      </div>
`
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
        mobileCart.innerHTML = `
            <div style="display: flex;flex-direction: column;gap: 4px;">
                        <h2>$0</h2>
                        <small>0 services</small>
                    </div>
                    <button id="book-mob" onclick="openStaff('book-mob')">Book Now</button>
            `;
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

    //  cart item added
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

    paymentSummary.innerHTML = `
                    <div>
                    <h1 class="summary-book-title">Booking Summary</h1>
                    <div class="service-summary">
                      ${payItems || 'noservice'}
                    </div>
                    <p class="add-service">Add service</p>
                    <div class="service-summary">
                        <div class="service-summary-item">
                            <div class="summary-service">
                                <div class="service-list">
                                    <small class="service-name">Date: ${String(parseInt(selectedDate)).padStart(2, '0')} (Tuesday)</small>
                                </div>
                            </div>
                            <img src="./assests/icons/editicon.svg" alt="edit icon"
                                style="width: 18px; height: 17px;" />
                        </div>
                        <div class="service-summary-item">
                            <div class="summary-service">
                                <div class="service-list">
                                    <small class="service-name">Time: ${selectedTime} </small>
                                </div>
                            </div>
                            <img src="./assests/icons/editicon.svg" alt="edit icon"
                                style="width: 18px; height: 17px;" />
                        </div>
                    </div>
                    <div class="payment-summary">
                        <h2 class="summary-book-title" style="margin-top:25px">Payment summary</h2>
                        <div class="payment-card">
                            <div class="payment-list">
                                <div>
                                    <small class="payment-item">Item total</small>
                                    <small class="payment-price">$${grandTotal.toFixed()}</small>
                                </div>
                                <div>
                                    <small class="payment-item">Discount</small>
                                    <small class="discount-price">-$30</small>
                                </div>
                                <div>
                                    <small class="payment-item">Tax (GST) </small>
                                    <small class="payment-price">$10</small>
                                </div>
                            </div>
                            <div class="payment-total">
                                <small class="payment-item">Total</small>
                                <small class="payment-price">$${grandTotal.toFixed() - 20}</small>
                            </div>
                        </div>

                    </div>
                </div>
    `

    // Update mobile cart
    mobileCart.innerHTML = `
<div style="display: flex;flex-direction: column;gap: 4px;">
  <h2>$${grandTotal.toFixed()}</h2>
  <small>${itemCount} ${itemCount === 1 ? 'service' : 'services'}</small>
</div>
<button id="book-mob"  onclick="openStaff('book-mob')"} >Book Now</button>
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
        document.getElementById('book-staff')?.setAttribute('onclick', 'openCustomer()');
        document.getElementById('book-mob')?.setAttribute('onclick', 'openSummary()')
    })
});

document.querySelectorAll('.date-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.date-item').forEach(d => d.classList.remove('active'));
        item.classList.add('active');
        updateCart('cart-summary');
        document.getElementById('book-staff')?.setAttribute('onclick', 'openCustomer()')
        document.getElementById('book-mob')?.setAttribute('onclick', 'openSummary()')
    });
});

document.querySelectorAll('.time-options button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.time-options button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateCart('cart-summary');

        document.getElementById('book-staff')?.setAttribute('onclick', 'openCustomer()')
        document.getElementById('book-mob')?.setAttribute('onclick', 'openSummary()')
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
    modal.classList.toggle('d-none');
    modal.classList.toggle('d-flex');
    overlay.style.visibility =
        overlay.style.visibility === 'visible' ? 'hidden' : 'visible';
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden'
}

// Handling Form Submit:
const form = document.querySelector(".booking-form");
const loader = document.getElementById("loading-state")

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
    // loading states add
    loader.classList.remove('d-none');
    loader.classList.add('d-flex')
    // Pay success modal open after two seconds:
    setTimeout(() => onPaySuccess(), 2000)
});

function onPaySuccess() {
    let salonContainer = document.querySelector('.salon-container');
    let payModal = document.getElementById('pay-modal');
    salonContainer.classList.add('d-none');
    payModal.classList.add('d-flex'); // show payment success modal
    // check modal container view
    if (!modal.classList.contains('view-check')) {
        openCustomer();
    }
    // loading states remove
    loader.classList.add('d-none');
    loader.classList.remove('d-flex');
    setTimeout(() => {
        payModal.classList.remove('d-flex');
        payModal.classList.add('d-none');
        salonContainer.classList.remove('d-none');
        document.getElementById('add-services').classList.remove('d-none');
        document.getElementById('booking-selection').classList.remove('d-flex');
        document.getElementById('booking-selection').classList.add('d-none');
        document.getElementById('payment-summary').classList.add('d-none');
        // after submit show again all services
        if (modal.classList.contains('view-check')) showModal(); slideInterval();
        let salonKid = document.getElementById('salon-kid-mob');
        if (salonKid) document.getElementById('salon-kid-mob').remove();
        salonHeader.classList.remove('header-hidden');

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
    carousel.appendChild(dotsContainer);
    return dotsContainer;
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
const slideTiming = 3000
let interval
const slideInterval = () => interval = setInterval(() => nextBtn.click(), slideTiming)

carousel.addEventListener('mouseover', () => clearInterval(interval))
carousel.addEventListener('mouseleave', slideInterval)
slideInterval();

// mobile accordion functionality:
let categoryTitleImage = document.querySelectorAll('.category-title img');
let accordionContent = document.querySelectorAll('.accordion-content');

categoryTitleImage.forEach((imgItem, ind) => {
    imgItem.onclick = () => {
        imgItem.classList.toggle('category-toggle');
        accordionContent[ind].style.maxHeight = accordionContent[ind].style.maxHeight === 'fit-content' ? "0px" : "fit-content";
        console.log(ind, 'ind', accordionContent[ind]);
    }
})