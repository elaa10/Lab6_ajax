let filters = {};

function getFilters() {
    $.get("get-products.php", function (data) {
        document.getElementById("combo").innerHTML = data;

        $("input[type=checkbox]").on("change", function () {
            const name = $(this).attr("name");
            const value = $(this).val();

            if (!filters[name]) filters[name] = new Set();

            if (this.checked) {
                filters[name].add(value);
            } else {
                filters[name].delete(value);
                if (filters[name].size === 0) delete filters[name];
            }

            loadProducts();
        });
    });
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
    $.get("get-filtered-products.php" + buildQueryString(), function (data) {
        $("#productTable").html(data);
    });
}

function clearAllFilters() {
    filters = {};
    $("input[type=checkbox]").prop("checked", false);
    loadProducts();
}

$(document).ready(function () {
    getFilters();
    loadProducts();
    $("#clearFilters").click(clearAllFilters);
});
