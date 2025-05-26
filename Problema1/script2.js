$(document).ready(function () {
    $.get("get-departure-stations.php", function (departures) {
        const $select = $("#departureStations");
        $.each(departures, function (index, city) {
            $select.append($("<option></option>").val(city).text(city));
        });
    }, "json");

    $("#departureStations").on("change", function () {
        const departure = $(this).val();
        if (!departure) return;

        $.get("get-arrival-stations.php", { departure: departure }, function (data) {
            $("#arrivalStations").html(data);
        });
    });
});
