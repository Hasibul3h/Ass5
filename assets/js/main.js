document.addEventListener('DOMContentLoaded', function() {

// Get all seat buttons
const seatButtons = document.querySelectorAll('.seat');
// Get the "Next" button
const nextButton = document.getElementById('nextButton');
// Get the element that displays the total available seats
const totalSeatsElement = document.querySelector('.total-seats');
// Get the element that displays the booking seat count
const bookingSeatCountElement = document.querySelector('.booking-seat-count');
// Get the container for selected seat information
const selectedSeatsInfoContainer = document.querySelector('.selected-seats-info');

// Function to check if the maximum seat selection limit has been reached
function isSeatLimitReached() {
    return document.querySelectorAll('.seat.active').length === 4;
}

// Function to update the seat counts
function updateSeatCounts() {
    // Get the total number of seats
    const totalSeats = seatButtons.length;
    // Get the number of selected seats
    const selectedSeats = document.querySelectorAll('.seat.active').length;

    // Calculate the remaining available seats
    const availableSeats = totalSeats - selectedSeats;

    // Update the total available seats display
    totalSeatsElement.textContent = `${availableSeats} Seats left`;

    // Update the booking seat count display
    bookingSeatCountElement.textContent = `${selectedSeats}`;

    // If no seats are selected, display the message
    if (selectedSeats === 0) {
        displaySelectSeatMessage();
    } else {
        removeSelectSeatMessage();
    }
}

// Function to display "Please select a seat" message
function displaySelectSeatMessage() {
    const messageContainer = document.querySelector('.selected-seats-info');
    messageContainer.textContent = 'Please select a seat';
}

// Function to remove "Please select a seat" message
function removeSelectSeatMessage() {
    const selectSeatMessage = document.querySelector('.selected-seats-info');
    if (selectSeatMessage.textContent === 'Please select a seat') {
        selectSeatMessage.textContent = '';
    }
}

// Function to calculate the total price based on selected seats and price per seat
function calculateTotalPrice() {
    const pricePerSeat = 550; // Assuming price per seat is 550 BDT, you can adjust this as needed
    const selectedSeatsCount = document.querySelectorAll('.seat.active').length;
    const totalPrice = pricePerSeat * selectedSeatsCount;
    return totalPrice;
}

// Update total price element with dynamically calculated total price
function updateTotalPrice() {
    const totalPrice = calculateTotalPrice();
    const totalPriceElement = document.querySelector('.total-price');
    totalPriceElement.textContent = `BDT ${totalPrice}`;
}

// Function to display selected seat information and total price
function updateSelectedSeatsInfo() {
    let selectedSeatsInfoHTML = '';
    const selectedSeats = document.querySelectorAll('.seat.active');

    selectedSeats.forEach(seatButton => {
        const seatName = seatButton.textContent;
        const seatPrice = getSeatPrice(seatButton);

        selectedSeatsInfoHTML += `
            <div class="seat-item pt-3 flex" data-seat="${seatName}">
                <span class="w-[33.33%] text-left text-[16px] font-normal text-heading/60">${seatName}</span>
                <span class="w-[33.33%] text-left text-[16px] font-normal text-heading/60">${`Economy`}</span>
                <span class="w-[33.33%] text-left text-[16px] font-normal text-heading/60">${seatPrice}</span>
            </div>
        `;
    });

    // Display selected seat information
    selectedSeatsInfoContainer.innerHTML = selectedSeatsInfoHTML;

    // Display total price
    updateTotalPrice();
}

// Function to get seat price from the markup
function getSeatPrice(seatButton) {
    return seatButton.dataset.price; // Assuming the price is stored as a data attribute named 'data-price'
}

// Function to update both total price and grand total price
function updatePrices() {
    // Calculate total price
    const totalPrice = calculateTotalPrice();

    // Update total price element
    const totalPriceElement = document.querySelector('.total-price');
    totalPriceElement.textContent = `BDT ${totalPrice}`;

    // Get the entered coupon code
    const couponCode = couponInput.value;

    // Calculate discount based on coupon code
    let discountPercentage = 0;
    if (couponCode === 'NEW15') {
        discountPercentage = 15;
    } else if (couponCode === 'Couple20') {
        discountPercentage = 20;
    }

    // Calculate discount amount
    const discountAmount = (totalPrice * discountPercentage) / 100;

    // Calculate grand total price
    const grandTotalPrice = totalPrice - discountAmount;

    // Update grand total price element
    const grandTotalPriceElement = document.querySelector('.grand-totat-price');
    grandTotalPriceElement.textContent = `BDT ${grandTotalPrice}`;
}

// Function to handle seat increase/decrease and price calculation
function handleSeatSelection() {
    // Update selected seat information
    updateSelectedSeatsInfo();

    // Update total price
    updatePrices();

    // Update seat counts
    updateSeatCounts();
}


// Add click event listener to each seat button for seat increase/decrease
seatButtons.forEach(seatButton => {
    seatButton.addEventListener('click', () => {
        // Check if the maximum seat selection limit has been reached
        if (!seatButton.classList.contains('active') && isSeatLimitReached()) {
            // Alert the user that they can't select more than four seats.
            alert("You can't select more than four seats.");
            return; // Exit the function
        }

        // Toggle 'active' class on click
        seatButton.classList.toggle('active');

        // Handle seat selection
        handleSeatSelection();
    });
});

// Get coupon input and apply button
const couponInput = document.getElementById('coupon-code');
const applyButton = document.getElementById('applyButton');

// Add event listener to apply button
applyButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get entered coupon code
    const couponCode = couponInput.value;

    // Calculate discount based on coupon code
    let discountPercentage = 0;
    if (couponCode === 'NEW15') {
        discountPercentage = 15;
    } else if (couponCode === 'Couple20') {
        discountPercentage = 20;
    }

    // Get total price
    const totalPrice = calculateTotalPrice();

    // Calculate discount amount
    const discountAmount = (totalPrice * discountPercentage) / 100;

    // Calculate discounted price
    const discountedPrice = discountAmount;

    // Display discount amount
    const discountAmountElement = document.querySelector('.dicount-amount');
    discountAmountElement.textContent = `Discounted Price: BDT ${discountedPrice}`;

    // Hide the form
    const couponForm = document.querySelector('.coupon form');
    couponForm.style.display = 'none';

    // Calculate grand total price
    const grandTotalPrice = totalPrice - discountAmount;

    // Display grand total price
    const grandTotalPriceElement = document.querySelector('.grand-totat-price');
    grandTotalPriceElement.textContent = `BDT ${grandTotalPrice}`;

    // Enable the "Next" button
    const nextButton = document.getElementById('nextButton');
    nextButton.disabled = false;
});

// Add event listener to seat buttons to enable/disable apply button
seatButtons.forEach(seatButton => {
    seatButton.addEventListener('click', () => {
        const selectedSeats = document.querySelectorAll('.seat.active').length;

        // Enable apply button if seats are selected
        if (selectedSeats > 0) {
            applyButton.disabled = false;
        } else {
            applyButton.disabled = true;
        }
    });
});

// Add event listener to coupon input to enable/disable apply button
couponInput.addEventListener('input', () => {
    const couponCode = couponInput.value;

    // Enable apply button if coupon code is not empty
    if (couponCode.trim() !== '') {
        applyButton.disabled = false;
    } else {
        applyButton.disabled = true;
    }
});



// Initial update of seat counts and total price
handleSeatSelection();

});
