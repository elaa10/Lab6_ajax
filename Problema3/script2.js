let currentId = null;
let originalData = {};

function getIds() {
    $.get("get-all-id.php", function (data) {
        $("#idsList").append(data); // răspunsul e o listă de <option>
    });
}

function loadData(id) {
    $.get("get-people.php", { id: id }, function (data) {
        try {
            $("#firstname").val(data.Nume);
            $("#lastname").val(data.Prenume);
            $("#phone").val(data.Telefon);
            $("#email").val(data.Email);

            originalData = { ...data };
            currentId = id;
            checkChanges();
        } catch (e) {
            alert("Eroare la parsarea datelor.");
        }
    }, "json");
}

function checkChanges() {
    const hasChanges =
        $("#firstname").val() !== originalData.Nume ||
        $("#lastname").val() !== originalData.Prenume ||
        $("#phone").val() !== originalData.Telefon ||
        $("#email").val() !== originalData.Email;

    $("#submit").prop("disabled", !hasChanges);
}

function updateEntity() {
    const data = {
        Nume: $("#firstname").val(),
        Prenume: $("#lastname").val(),
        Telefon: $("#phone").val(),
        Email: $("#email").val(),
    };

    $.post("update-table.php?id=" + encodeURIComponent(currentId), data, function () {
        originalData = { ...data };
        checkChanges();
        alert("Date salvate cu succes!");
    }).fail(function () {
        alert("Eroare la salvare.");
    });
}

function setupListeners() {
    $("#idsList").on("change", function () {
        const selectedId = $(this).val();
        if (!selectedId) return;

        if ($("#submit").prop("disabled")) {
            loadData(selectedId);
        } else {
            if (confirm("Ai modificări nesalvate. Le pierzi dacă schimbi ID-ul. Continuăm?")) {
                loadData(selectedId);
            } else {
                $(this).val(currentId); // revine la selecția anterioară
            }
        }
    });

    $("#submit").on("click", updateEntity);

    $("#firstname, #lastname, #phone, #email").on("input", checkChanges);
}

$(document).ready(function () {
    getIds();
    setupListeners();
});
