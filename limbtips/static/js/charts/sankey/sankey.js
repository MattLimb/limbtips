var chart_data = [];

var colors = {
    "colorful": ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f', '#cab2d6', '#ffff99', '#1f78b4', '#33a02c'],
    "blue": ["#aed6f1", "#85c1e9", "#5dade2", "#3498db", "#2e86c1", "#2874a6", "#21618c", "#1b4f72"],
    "purple": ["#d2b4de", "#bb8fce", "#a569bd", "#8e44ad", "#8e44ad", "#6c3483", "#5b2c6f", "#4a235a"],
    "red": ["#f5b7b1", "#f1948a", "#ec7063", "#cb4335", "#cb4335", "#b03a2e", "#943126", "#78281f"],
    "green": ["#a9dfbf", "#7dcea0", "#52be80", "#27ae60", "#229954", "#1e8449", "#196f3d", "#145a32"],
    "orange": ["#f5cba7", "#f0b27a", "#eb984e", "#e67e22", "#ca6f1e", "#af601a", "#935116", "#784212"],
    "gray": ["#b2babb", "#b2babb", "#99a3a4", "#7f8c8d", "#707b7c", "#616a6b", "#515a5a", "#424949"]
}

var trash_icon_svg = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg>'
var edit_icon_svg = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>'
var save_icon_svg = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle-fill mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>'

google.charts.load("current", {
    packages: ["sankey"]
});
google.charts.setOnLoadCallback(GenerateChartData);

function CalculateWidth(exp){
    var selector = document.getElementById("width_selector").value;
    if ( selector === "default" ){
        return document.getElementById('sankey_multiple').clientWidth
    } else {
        if ( exp ){
            return parseInt(selector) + 25
        } else {
            return parseInt(selector)
        }
    }
}

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Weight');
    data.addRows(chart_data);

    // Set chart options
    var options = {
        width: CalculateWidth(false),
        height: parseInt(document.getElementById("height_selector").value),
        sankey: {
            node: {
                colors: colors[document.getElementById("theme_selector").value]
            },
            link: {
                colorMode: document.getElementById("mode_selector").value,
                colors: colors[document.getElementById("theme_selector").value]
            }
        }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.Sankey(document.getElementById('sankey_multiple'));
    chart.draw(data, options);
}
/* Custom Table JS */
function GenerateChartData() {
    var table_body = document.getElementById("table_body");
    chart_data = [];
    for (var r = 0; r < table_body.children.length; r++) {
        var row = table_body.children.item(r);
        var tmp_data = [];
        for (var i = 0; i < row.children.length; i++) {
            if (i == 2) {
                tmp_data.push(parseInt(row.children[i].textContent));
            } else if (i < 3) {
                tmp_data.push(row.children[i].textContent);
            }
        }
        chart_data.push(tmp_data);
    }
    drawChart();
}

function GenerateUUID(chars) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var length = characters.length;

    for (var i = 0; i < chars; i++) {
        result = result + characters.charAt(Math.floor(Math.random() * length));
    }
    return result
}

function GenerateCell(value = null, button = false, id = null) {
    var cell = document.createElement("td");
    cell.style.width = "30%";
    cell.style.borderTop = 0;
    cell.style.verticalAlign = "middle";

    if (button === true) {
        var button_group = document.createElement("div");
        button_group.classList.add("btn-group");
        button_group.setAttribute("role", "group");

        var edit_button = document.createElement("button");
        edit_button.classList.add("btn");
        edit_button.classList.add("btn-primary");
        edit_button.innerHTML = edit_icon_svg;
        edit_button.setAttribute("onclick", "EditRow('" + id + "');");

        var trash_button = document.createElement("button");
        trash_button.classList.add("btn");
        trash_button.classList.add("btn-danger");
        trash_button.innerHTML = trash_icon_svg;
        trash_button.setAttribute("onclick", "DeleteRow('" + id + "');");

        button_group.appendChild(edit_button);
        button_group.appendChild(trash_button);
        cell.appendChild(button_group);
    } else if (value !== null) {
        cell.innerText = value;
    }

    return cell
}

function GenerateRow(start, end, weight, off_color) {
    var id = GenerateUUID(10);
    var row = document.createElement("tr");
    row.setAttribute("id", id);

    if (off_color) {
        row.classList.add("bg-gray-100");
    }

    row.appendChild(GenerateCell(start, false));
    row.appendChild(GenerateCell(end, false));
    row.appendChild(GenerateCell(weight, false));
    row.appendChild(GenerateCell(null, true, id));
    return row
}

function AddToTable() {
    var start = document.getElementById("start_node").value;
    var end = document.getElementById("end_node").value;
    var weight = document.getElementById("weight").value;
    var table_body = document.getElementById("table_body");

    if (start !== "" && end !== "" && weight !== "") {
        if (table_body.children.length % 2 !== 0) {
            table_body.appendChild(GenerateRow(start, end, weight, true));
        } else {
            table_body.appendChild(GenerateRow(start, end, weight, false));
        }

    }
    document.getElementById("start_node").value = null;
    document.getElementById("end_node").value = null;
    document.getElementById("weight").value = null;
    GenerateChartData();
}

function DeleteRow(id) {
    var row = document.getElementById(id);
    var table_body = document.getElementById("table_body");
    table_body.removeChild(row);
    GenerateChartData();
}

function SaveSankey() {
    var node = document.getElementById('the-body');
    
    var options = {
        allowTaint: true,
        foreighObjectRendering: false,
        letterRendering: true,
        width: CalculateWidth(true),
        height: parseInt(document.getElementById("height_selector").value) + 25,
        onclone: (i) => {
            var xpath = "//*[@fill]";
            var paths = i.evaluate(xpath, i, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

            for ( var j=0 ; j < paths.snapshotLength; j++ ){
                var elm = paths.snapshotItem(j);

                if ( elm.nodeName === "path" ){
                    elm.setAttribute("fill", elm.getAttribute("fill").replace(window.location.href, ""));
                }
            }
        }
    };
    html2canvas(node, options).then(canvas => {
        window.saveAs(canvas.toDataURL("image/png"), 'sankey.png');
    })
}

function ChangeUploadLabel() {
    var upload = document.getElementById("input-csv");
    var label = document.getElementById("csv-label");
    var button = document.getElementById("csv-button");
    label.innerText = upload.files[0].name;
    button.removeAttribute("disabled");
    button.setAttribute("aria-disabled", false);
}

function ParseUpload() {
    var file = document.getElementById("input-csv").files[0];

    const reader = new FileReader;
    reader.onloadend = function () {
        var file_content = reader.result;

        var table_body = document.getElementById("table_body");
        for (var i = table_body.children.length - 1; i >= 0; i--) {
            var id = table_body.children[i].id;
            DeleteRow(id);
        }

        var file_array = [];
        if (file_content.includes("\r\n")) {
            file_array = file_content.split("\r\n");
        } else {
            file_array = file_content.split("\n");
        }

        for (var i = 0; i < file_array.length; i++) {
            if (file_array[i].includes(",")) {
                var elements = file_array[i].split(",");
                document.getElementById("table_body").appendChild(GenerateRow(elements[0].trim(), elements[1].trim(), elements[2].trim()));
            }
        }
        GenerateChartData();
        var table_tab = document.getElementById("table-data-tab");
        var csv_tab = document.getElementById("csv-data-tab");

        table_tab.click();
    };
    reader.readAsText(file);
}

function GenerateTextBox(value, placeholder, id) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("form-group");

    var textbox = document.createElement("input");
    textbox.setAttribute("type", "text");
    textbox.setAttribute("placeholder", placeholder);
    textbox.setAttribute("id", id);
    textbox.classList.add("form-control");
    textbox.classList.add("mt-1");
    textbox.value = value;

    wrapper.appendChild(textbox);
    return wrapper;
}

function EditRow(id){
    var row = document.getElementById(id).children;
    var node_names = [ ["Start Node", "sn"], [ "End Node", "en"], [ "Weight", "w"]];

    for ( var i = 0; i < row.length; i++){
        var node_value = row[i].innerText;
        row[i].innerText = "";
        if ( i < 3 ) {    
            row[i].appendChild(GenerateTextBox(node_value, node_names[i][0], node_names[i][1]+"_"+id));
        } else {
            var button_group = document.createElement("div");
            button_group.classList.add("btn-group");
            button_group.setAttribute("role", "group");

            var save_button = document.createElement("button");
            save_button.classList.add("btn");
            save_button.classList.add("btn-primary");
            save_button.innerHTML = save_icon_svg;
            save_button.setAttribute("onclick", "SaveRow('" + id + "');");

            var trash_button = document.createElement("button");
            trash_button.classList.add("btn");
            trash_button.classList.add("btn-danger");
            trash_button.innerHTML = trash_icon_svg;
            trash_button.setAttribute("onclick", "DeleteRow('" + id + "');");

            button_group.appendChild(save_button);
            button_group.appendChild(trash_button);
            row[i].appendChild(button_group);
        }
        
    }
}

function SaveRow(id){
    var row = document.getElementById(id).children;
    var start = document.getElementById("sn_"+id).value;
    var end = document.getElementById("en_"+id).value;
    var weight = document.getElementById("w_"+id).value;

    row[0].innerHTML = "";
    row[0].innerText = start;

    row[1].innerHTML = "";
    row[1].innerText = end;

    row[2].innerHTML = "";
    row[2].innerText = weight;

    row[3].innerHTML = "";

    var button_group = document.createElement("div");
    button_group.classList.add("btn-group");
    button_group.setAttribute("role", "group");

    var edit_button = document.createElement("button");
    edit_button.classList.add("btn");
    edit_button.classList.add("btn-primary");
    edit_button.innerHTML = edit_icon_svg;
    edit_button.setAttribute("onclick", "EditRow('" + id + "');");

    var trash_button = document.createElement("button");
    trash_button.classList.add("btn");
    trash_button.classList.add("btn-danger");
    trash_button.innerHTML = trash_icon_svg;
    trash_button.setAttribute("onclick", "DeleteRow('" + id + "');");

    button_group.appendChild(edit_button);
    button_group.appendChild(trash_button);
    row[3].appendChild(button_group);

    GenerateChartData();
}

function SaveToCSV() {
    var csv_string = "data:text/csv;charset=utf-8,"+ chart_data.map(e => e.join(",")).join("\r\n");
    
    window.saveAs(encodeURI(csv_string), "sankey_data.csv");
}