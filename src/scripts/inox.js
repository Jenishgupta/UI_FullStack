// Src/scripts/inox.js

let selectedSeats = [];
let bookingData = {};

function nextToSeats() {
    const movie = document.getElementById("lstMovies").value;
    const date = document.getElementById("lstDate").value;
    const cinema = document.getElementById("lstCinema").value;
    const timing = document.getElementById("lstTiming").value;

    if (movie === "Select Movie" || date === "Select Date" || cinema === "Select Cinema" || timing === "Select Timing") {
        alert("Please select all options.");
        return;
    }

    bookingData = { movie, date, cinema, timing };

    // Switch to seats tab
    document.getElementById("selection-tab").classList.remove("active");
    document.getElementById("seats-tab").classList.add("active");
    document.getElementById("seats-tab").disabled = false;
    document.getElementById("selection").classList.remove("show", "active");
    document.getElementById("seats").classList.add("show", "active");

    generateSeatGrid();
}

function generateSeatGrid() {
    const seatGrid = document.getElementById("seatGrid");
    seatGrid.innerHTML = "";
    selectedSeats = [];

    const rows = 5;
    const cols = 10;
    const bookedSeats = new Set();

    // Randomly book some seats
    for (let i = 0; i < 20; i++) {
        const row = Math.floor(Math.random() * rows) + 1;
        const col = Math.floor(Math.random() * cols) + 1;
        bookedSeats.add(`${row}-${col}`);
    }

    for (let r = 1; r <= rows; r++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "d-flex justify-content-center mb-2";
        for (let c = 1; c <= cols; c++) {
            const seatBtn = document.createElement("button");
            seatBtn.className = "btn btn-outline-secondary m-1";
            seatBtn.style.width = "40px";
            seatBtn.style.height = "40px";
            seatBtn.textContent = `${r}${String.fromCharCode(64 + c)}`;
            seatBtn.dataset.seat = `${r}-${c}`;

            if (bookedSeats.has(`${r}-${c}`)) {
                seatBtn.classList.add("btn-danger");
                seatBtn.disabled = true;
            } else {
                seatBtn.onclick = () => selectSeat(seatBtn);
            }

            rowDiv.appendChild(seatBtn);
        }
        seatGrid.appendChild(rowDiv);
    }
}

function selectSeat(seatBtn) {
    const seat = seatBtn.dataset.seat;
    if (selectedSeats.includes(seat)) {
        selectedSeats = selectedSeats.filter(s => s !== seat);
        seatBtn.classList.remove("btn-primary");
        seatBtn.classList.add("btn-outline-secondary");
    } else {
        if (selectedSeats.length >= 10) {
            alert("You can select up to 10 seats.");
            return;
        }
        selectedSeats.push(seat);
        seatBtn.classList.remove("btn-outline-secondary");
        seatBtn.classList.add("btn-primary");
    }
}

function nextToDetails() {
    if (selectedSeats.length === 0) {
        alert("Please select at least one seat.");
        return;
    }

    bookingData.seats = selectedSeats;

    // Switch to details tab
    document.getElementById("seats-tab").classList.remove("active");
    document.getElementById("details-tab").classList.add("active");
    document.getElementById("details-tab").disabled = false;
    document.getElementById("seats").classList.remove("show", "active");
    document.getElementById("details").classList.add("show", "active");
}

function nextToPayment() {
    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const phone = document.getElementById("userPhone").value;

    if (!name || !email || !phone) {
        alert("Please fill in all details.");
        return;
    }

    bookingData.name = name;
    bookingData.email = email;
    bookingData.phone = phone;

    // Switch to payment tab
    document.getElementById("details-tab").classList.remove("active");
    document.getElementById("payment-tab").classList.add("active");
    document.getElementById("payment-tab").disabled = false;
    document.getElementById("details").classList.remove("show", "active");
    document.getElementById("payment").classList.add("show", "active");
}

function confirmBooking() {
    const cardNumber = document.getElementById("cardNumber").value;
    const expiry = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;

    if (!cardNumber || !expiry || !cvv) {
        alert("Please fill in payment details.");
        return;
    }

    // Simulate payment
    alert("Payment processed successfully!");

    // Generate booking ID
    bookingData.bookingID = "BK" + Date.now();

    // Store in localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Switch to confirmation tab
    document.getElementById("payment-tab").classList.remove("active");
    document.getElementById("confirmation-tab").classList.add("active");
    document.getElementById("confirmation-tab").disabled = false;
    document.getElementById("payment").classList.remove("show", "active");
    document.getElementById("confirmation").classList.add("show", "active");

    // Display confirmation
    const confirmationDetails = document.getElementById("confirmationDetails");
    confirmationDetails.innerHTML = `
        <p><strong>Booking ID:</strong> ${bookingData.bookingID}</p>
        <p><strong>Movie:</strong> ${bookingData.movie}</p>
        <p><strong>Date:</strong> ${bookingData.date}</p>
        <p><strong>Cinema:</strong> ${bookingData.cinema}</p>
        <p><strong>Timing:</strong> ${bookingData.timing}</p>
        <p><strong>Seats:</strong> ${bookingData.seats.join(", ")}</p>
        <p><strong>Name:</strong> ${bookingData.name}</p>
        <p><strong>Email:</strong> ${bookingData.email}</p>
        <p><strong>Phone:</strong> ${bookingData.phone}</p>
    `;
}

function finishBooking() {
    // Show summary
    const summaryContainer = document.getElementById("summaryContainer");
    summaryContainer.style.display = "block";

    // Update summary
    document.getElementById("lblMovie").textContent = bookingData.movie;
    document.getElementById("lblDate").textContent = bookingData.date;
    document.getElementById("lblCinema").textContent = bookingData.cinema;
    document.getElementById("lblTiming").textContent = bookingData.timing;
    document.getElementById("lblSeats").textContent = bookingData.seats.join(", ");
    document.getElementById("lblName").textContent = bookingData.name;
    document.getElementById("lblEmail").textContent = bookingData.email;
    document.getElementById("lblPhone").textContent = bookingData.phone;
    document.getElementById("lblBookingID").textContent = bookingData.bookingID;

    // Set poster
    const poster = document.getElementById("imgPoster");
    poster.src = "../public/images/movieposter.png";

    // Reset modal
    resetModal();
}

function resetModal() {
    // Reset tabs
    document.getElementById("selection-tab").classList.add("active");
    document.getElementById("seats-tab").classList.remove("active");
    document.getElementById("details-tab").classList.remove("active");
    document.getElementById("payment-tab").classList.remove("active");
    document.getElementById("confirmation-tab").classList.remove("active");

    document.getElementById("seats-tab").disabled = true;
    document.getElementById("details-tab").disabled = true;
    document.getElementById("payment-tab").disabled = true;
    document.getElementById("confirmation-tab").disabled = true;

    document.getElementById("selection").classList.add("show", "active");
    document.getElementById("seats").classList.remove("show", "active");
    document.getElementById("details").classList.remove("show", "active");
    document.getElementById("payment").classList.remove("show", "active");
    document.getElementById("confirmation").classList.remove("show", "active");

    // Clear forms
    document.getElementById("lstMovies").value = "Select Movie";
    document.getElementById("lstDate").value = "Select Date";
    document.getElementById("lstCinema").value = "Select Cinema";
    document.getElementById("lstTiming").value = "Select Timing";
    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("userPhone").value = "";
    document.getElementById("cardNumber").value = "";
    document.getElementById("expiryDate").value = "";
    document.getElementById("cvv").value = "";
    document.getElementById("confirmationDetails").innerHTML = "";
}

function backToSelection() {
    document.getElementById("seats-tab").classList.remove("active");
    document.getElementById("selection-tab").classList.add("active");
    document.getElementById("seats").classList.remove("show", "active");
    document.getElementById("selection").classList.add("show", "active");
}

function backToSeats() {
    document.getElementById("details-tab").classList.remove("active");
    document.getElementById("seats-tab").classList.add("active");
    document.getElementById("details").classList.remove("show", "active");
    document.getElementById("seats").classList.add("show", "active");
}

function backToDetails() {
    document.getElementById("payment-tab").classList.remove("active");
    document.getElementById("details-tab").classList.add("active");
    document.getElementById("payment").classList.remove("show", "active");
    document.getElementById("details").classList.add("show", "active");
}

function ModifyClick() {
    document.getElementById("lblBooking").textContent = "Modify Booking";
    // For simplicity, reset to selection
    resetModal();
    document.getElementById("booking").classList.add("show");
}

// Auto-show the booking modal on page load
window.addEventListener('DOMContentLoaded', function() {
    const bookingModal = new bootstrap.Modal(document.getElementById('booking'));
    bookingModal.show();
});
