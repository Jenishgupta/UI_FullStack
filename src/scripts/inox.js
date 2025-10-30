// Src/scripts/inox.js

function BookClick() {
    const summaryContainer = document.getElementById("summaryContainer");
    const buttonContainer = document.getElementById("buttonContainer");

    summaryContainer.style.display = "block";
    buttonContainer.style.display = "none";

    // Update booking details
    document.getElementById("lblMovie").textContent = document.getElementById("lstMovies").value;
    document.getElementById("lblDate").textContent = document.getElementById("lstDate").value;
    document.getElementById("lblCinema").textContent = document.getElementById("lstCinema").value;
    document.getElementById("lblTiming").textContent = document.getElementById("lstTiming").value;

    // Set poster image
    const poster = document.getElementById("imgPoster");
    const movieName = document.getElementById("lstMovies").value;

    if (movieName === "THAMMA") {
        poster.src = "../public/images/thamma.png";
    } else {
        poster.src = "../public/images/llb.png";
    }
}

function ModifyClick() {
    document.getElementById("lblBooking").textContent = "Modify Booking";
    const btnBook = document.getElementById("btnBook");

    btnBook.textContent = "Save";
    btnBook.className = "btn btn-success";
}
