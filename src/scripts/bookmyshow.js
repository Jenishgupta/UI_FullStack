var movies = ["Bahubali: The Epic", "The Taj Story"];

function LoadMovies() {
    document.getElementById("lstMovies").innerHTML = "";
    movies.map(function(movie) {
        var option = document.createElement("option");
        option.text = movie.toUpperCase();
        option.value = movie.toLowerCase();
        document.getElementById("lstMovies").appendChild(option);
    });
    document.getElementById("lblCount").innerHTML = `Total No of Movies : ${movies.length}`;
}

function AddClick() {
    var movieName = document.getElementById("txtMovie").value;
    var searchResult = movies.find(function(movie) {
        return movie.toLowerCase() === movieName.toLowerCase();
    });

    if (searchResult) {
        alert(`${movieName} Exists`);
    } else {
        movies.push(movieName.toLowerCase());
        alert(`${movieName}\nAdded to list`);
        LoadMovies();
        document.getElementById("txtMovie").value = "";
    }
}

function SortAsc() {
    movies.sort();
    LoadMovies();
}

function SortDesc() {
    movies.sort();
    movies.reverse();
    LoadMovies();
}

function DeleteClick() {
    var selectedMovieName = document.getElementById("lstMovies").value;
    var selectedMovieIndex = movies.indexOf(selectedMovieName);
    var flag = confirm(`Are you sure?\nWant to Delete ${selectedMovieName}`);
    if (flag === true) {
        movies.splice(selectedMovieIndex, 1);
        alert(`${selectedMovieName}\nDeleted Successfully..`);
        LoadMovies();
    }
}

function ClearClick() {
    movies.length = 0;
    LoadMovies();
}

function EditClick() {
    var selectedMovieName = document.getElementById("lstMovies").value;
    document.getElementById("txtEditMovie").value = selectedMovieName.toUpperCase();
}

function SaveClick() {
    var editedMovieName = document.getElementById("txtEditMovie").value;
    var selectedMovieName = document.getElementById("lstMovies").value;
    var selectedMovieIndex = movies.indexOf(selectedMovieName.toLowerCase());
    console.log(selectedMovieIndex);
    console.log(selectedMovieName);
    movies[selectedMovieIndex] = editedMovieName;
    LoadMovies();
}
