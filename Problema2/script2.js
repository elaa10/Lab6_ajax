let currentPage = 0;
const dimension = 3;
let pages = 0;

function getNoOfPages() {
    $.ajax({
        url: "get-total-count.php",
        method: "GET",
        async: false,
        success: function (data) {
            pages = Math.ceil(data / dimension);
            console.log("Total pages:", pages);
        },
        error: function () {
            alert("Eroare la încărcarea numărului de pagini");
        }
    });
}

function showPage(page) {
    $.get("get-people.php", { currentPage: page, dimension: dimension }, function (data) {
        const $table = $("#people");
        const header = $table.find("tr").first().prop("outerHTML");
        $table.html(header + data);
    }).fail(function () {
        alert("Eroare la încărcarea datelor.");
    });
}

function buttonState() {
    $("#previous-button").prop("disabled", currentPage === 0);
    $("#next-button").prop("disabled", currentPage >= pages - 1);
}

$(document).ready(function () {
    getNoOfPages();
    showPage(currentPage);
    buttonState();

    $("#previous-button").click(function () {
        currentPage--;
        showPage(currentPage);
        buttonState();
    });

    $("#next-button").click(function () {
        currentPage++;
        showPage(currentPage);
        buttonState();
    });
});
