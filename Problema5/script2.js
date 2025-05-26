function loadDirectory(path, element) {
    $.get("dir-manager.php", { directory: path }, function (data) {
        const $ul = $("<ul>");

        data.forEach(entry => {
            const $li = $("<li>").text(entry.name);

            if (entry.type === "dir") {
                $li.on("click", function (e) {
                    e.stopPropagation();
                    if ($(this).children("ul").length === 0) {
                        loadDirectory(entry.path, this);
                    } else {
                        $(this).children("ul").toggle();
                    }
                });
            } else {
                $li.on("click", function (e) {
                    e.stopPropagation();
                    $.get("file-viewer.php", { file: entry.path }, function (content) {
                        $("#fileContent").html(content);
                    });
                });
            }

            $ul.append($li);
        });

        $(element).append($ul);
    }, "json");
}

$(document).ready(function () {
    loadDirectory("C:/xampp/htdocs", "#tree");
});
