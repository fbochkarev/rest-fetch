function show() {
    $(document).ready(function () {
        fetch("http://localhost:8080/admin/rest/users").then(
            res => {
                res.json().then(
                    data => {
                        console.log(data);
                        if (data.length > 0) {
                            var temp = "";

                            data.forEach((user) => {
                                temp += "<tr>";
                                temp += "<td>" + user.id + "</td>";
                                temp += "<td>" + user.username + "</td>";
                                temp += "<td>" + user.lastName + "</td>";
                                temp += "<td>" + user.email + "</td>";
                                temp += '<td id="' + user.id + '">' +
                                    '<a class="btn btn-primary" id="edit-user">' +
                                        '<i class="bi bi-pencil-square"></i>' +
                                    '</a></td>';
                                temp += '<td id="' + user.id + '">' +
                                    '<a class="btn btn-danger" id="delete-user">' +
                                        '<i class="bi bi-trash"></i>' +
                                    '</a>';
                                temp += "</td></tr>";
                            });

                            console.log(temp);

                            document.getElementById("tableData").innerHTML = temp;
                        }
                    }
                )
            }
        )
    });
}

$(document).ready(function () {
    show();
    setInterval('show()', 1000);
});
