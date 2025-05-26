function loadDirectory(path, element) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "dir-manager.php?directory=" + encodeURIComponent(path), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const ul = document.createElement("ul");

            data.forEach(entry => {
                const li = document.createElement("li");
                li.textContent = entry.name;

                if (entry.type === "dir") {
                    li.addEventListener("click", function (e) {
                        e.stopPropagation();
                        if (this.querySelector("ul")) {
                            this.querySelector("ul").classList.toggle("hidden");
                        } else {
                            loadDirectory(entry.path, this);
                        }
                    });
                } else {
                    li.addEventListener("click", function (e) {
                        e.stopPropagation();
                        const fileXhr = new XMLHttpRequest();
                        fileXhr.open("GET", "file-viewer.php?file=" + encodeURIComponent(entry.path), true);
                        fileXhr.onload = function () {
                            if (fileXhr.status === 200) {
                                document.getElementById("fileContent").innerHTML = fileXhr.responseText;
                            }
                        };
                        fileXhr.send();
                    });
                }

                ul.appendChild(li);
            });

            element.appendChild(ul);
        }
    };
    xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById("tree");
    loadDirectory("C:/xampp/htdocs", root);
});
