let currentId = null;
let originalData = {};

function getIds() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "get-all-id.php", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.getElementById("idsList").innerHTML += xhr.responseText;
        }
    };
    xhr.send();
}

function loadData(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "get-people.php?id=" + encodeURIComponent(id), true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                document.getElementById("firstname").value = data.Nume;
                document.getElementById("lastname").value = data.Prenume;
                document.getElementById("phone").value = data.Telefon;
                document.getElementById("email").value = data.Email;

                originalData = { ...data };
                currentId = id;
                checkChanges();
            } catch (e) {
                alert("Eroare la parsarea datelor.");
            }
        }
    };
    xhr.send();
}

function checkChanges() {
    const submitBtn = document.getElementById("submit");

    const hasChanges =
        document.getElementById("firstname").value !== originalData.Nume ||
        document.getElementById("lastname").value !== originalData.Prenume ||
        document.getElementById("phone").value !== originalData.Telefon ||
        document.getElementById("email").value !== originalData.Email;

    submitBtn.disabled = !hasChanges;
}

function updateEntity() {
    const data = new URLSearchParams();
    data.append("Nume", document.getElementById("firstname").value);
    data.append("Prenume", document.getElementById("lastname").value);
    data.append("Telefon", document.getElementById("phone").value);
    data.append("Email", document.getElementById("email").value);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "update-table.php?id=" + encodeURIComponent(currentId), true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200) {
            originalData = {
                Nume: document.getElementById("firstname").value,
                Prenume: document.getElementById("lastname").value,
                Telefon: document.getElementById("phone").value,
                Email: document.getElementById("email").value,
            };
            checkChanges();
            alert("Date salvate cu succes!");
        } else {
            alert("Eroare la salvare.");
        }
    };
    xhr.send(data.toString());
}

function setupListeners() {
    document.getElementById("idsList").addEventListener("change", function () {
        const selectedId = this.value;
        if (!selectedId) return;

        if (document.getElementById("submit").disabled) {
            loadData(selectedId);
        } else {
            if (confirm("Ai modificări nesalvate. Le pierzi dacă schimbi ID-ul. Continuăm?")) {
                loadData(selectedId);
            } else {
                this.value = currentId;
            }
        }
    });

    ["firstname", "lastname", "phone", "email"].forEach(id => {
        document.getElementById(id).addEventListener("input", checkChanges);
    });

    document.getElementById("submit").addEventListener("click", updateEntity);
}

document.addEventListener("DOMContentLoaded", function () {
    getIds();
    setupListeners();
});
