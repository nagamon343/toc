function generate_toc() {
    var elms = document.querySelectorAll("h1,h2,h3,h4,h5");
    var dummy_counter = 0;
    elms.forEach(e => {
        if (!e.getAttribute("id")) {
            e.setAttribute("id", "dummy_foobar_" + dummy_counter.toString());
            dummy_counter++;
        }
    });

    var toc = document.createElement("ul")
    var current_level = 1;
    var parent = toc;
    elms.forEach(e => {
        var level = get_level(e);
        if (level == current_level)
        {
            append_item(e, parent);
        }
        else if (level > current_level)
        {
            var new_ul = document.createElement("ul");
            var elm = parent.appendChild(new_ul);
            parent = elm;
            current_level++;

            append_item(e, parent);
        }
        else if (level < current_level)
        {
            while (level < current_level) {
                parent = parent.parentElement;
                current_level--;
            }
            append_item(e, parent);
        }
    });

    document.body.insertBefore(toc, document.body.firstChild);
}

function get_level(elem) {
    return parseInt(elem.tagName[1]);
}

function append_item(e, parent) {
    var item = document.createElement("li");
    var link = document.createElement("a");
    link.innerHTML = e.innerHTML;
    link.setAttribute("href", "#" + e.id);
    item.appendChild(link);
    parent.appendChild(item);
}

(function () {
    document.addEventListener("DOMContentLoaded", generate_toc)
}());
