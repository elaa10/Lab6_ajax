let filters = {};

function getFilters() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "get-products.php", true);
    xhr.onload = function () {
        document.getElementById("combo").innerHTML = xhr.responseText;

        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                const name = checkbox.name;
                const value = checkbox.value;

                if (!filters[name]) filters[name] = new Set();

                if (checkbox.checked) {
                    filters[name].add(value);
                } else {
                    filters[name].delete(value);
                    if (filters[name].size === 0) delete filters[name];
                }

                loadProducts();
            });
        });
    };
    xhr.send();
}

function buildQueryString() {
    const params = [];
    for (const key in filters) {
        filters[key].forEach(val => {
            params.push(`${key}[]=${encodeURIComponent(val)}`);
        });
    }
    return params.length ? "?" + params.join("&") : "";
}

function loadProducts() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "get-filtered-products.php" + buildQueryString(), true);
    xhr.onload = function () {
        document.getElementById("productTable").innerHTML = xhr.responseText;
    };
    xhr.send();
}

function clearAllFilters() {
    filters = {};
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach(cb => cb.checked = false);
    loadProducts();
}

document.addEventListener("DOMContentLoaded", function () {
    getFilters();
    loadProducts();
    document.getElementById("clearFilters").addEventListener("click", clearAllFilters);
});
