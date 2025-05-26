document.addEventListener("DOMContentLoaded", function () {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "get-departure-stations.php", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const departures = JSON.parse(xhr.responseText);
            const select = document.getElementById("departureStations");
            departures.forEach(function (city) {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                select.appendChild(option);
            });
        } else {
            alert("Eroare la încărcarea plecărilor.");
        }
    };
    xhr.send();


    document.getElementById("departureStations").addEventListener("change", function () {
        const departure = this.value;
        if (!departure || departure === "Selectează o plecare") return;

        const xhr2 = new XMLHttpRequest();
        xhr2.open("GET", "get-arrival-stations.php?departure=" + encodeURIComponent(departure), true);
        xhr2.onload = function () {
            if (xhr2.status === 200) {
                document.getElementById("arrivalStations").innerHTML = xhr2.responseText;
            } else {
                alert("Eroare la încărcarea sosirilor.");
            }
        };
        xhr2.send();
    });
});
