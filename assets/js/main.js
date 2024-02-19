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

// Add click event listener to each seat button
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

        // Update the seat counts
        updateSeatCounts();

        // Print seat information if the seat is selected
        if (seatButton.classList.contains('active')) {
            // Extract seat name, class, and price
            const seatName = seatButton.textContent;
            const seatClass = 'Economy'; // You can modify this to extract class from your markup
            const seatPrice = '550'; // You can modify this to extract price from your markup

            // Create HTML markup for seat information
            const seatInfoMarkup = `
                <div class="seat-item pt-3 flex" data-seat="${seatName}">
                    <span class="w-[33.33%] text-left text-[16px] font-normal text-heading/60">${seatName}</span>
                    <span class="w-[33.33%] text-left text-[16px] font-normal text-heading/60">${seatClass}</span>
                    <span class="w-[33.33%] text-right text-[16px] font-normal text-heading/60">${seatPrice}</span>
                </div>
            `;

            // Append the seat information markup to the specified container
            selectedSeatsInfoContainer.innerHTML += seatInfoMarkup;
        } else {
            // If the seat is deselected, remove its corresponding information from the markup
            const selectedSeatInfo = selectedSeatsInfoContainer.querySelector(`[data-seat="${seatButton.textContent}"]`);
            if (selectedSeatInfo) {
                selectedSeatInfo.remove();
            }
        }
    });
});

// Initial update of seat counts
updateSeatCounts();
