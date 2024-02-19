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
    bookingSeatCountElement.textContent = `${selectedSeats} Seats booked`;

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
    // You need to replace this with the actual logic to extract the price from your markup
    // For example, if the price is stored as a data attribute, you might do something like:
    // return seatButton.getAttribute('data-price');
    
    // For demonstration purposes, let's assume the price is stored as text content within the seat button
    return seatButton.dataset.price; // Assuming the price is stored as a data attribute named 'data-price'
}

// Function to handle seat increase/decrease and price calculation
function handleSeatSelection() {
    // Update selected seat information
    updateSelectedSeatsInfo();

    // Update total price
    updateTotalPrice();

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

// Initial update of seat counts and total price
handleSeatSelection();
