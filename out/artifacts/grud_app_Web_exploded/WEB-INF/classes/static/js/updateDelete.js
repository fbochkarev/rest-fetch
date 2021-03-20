document.getElementById('usersTable').addEventListener('click', (e) => {
    e.preventDefault();
    let deleteButtonIsPressed = e.target.id === 'delete-user';
    let editButtonIsPressed = e.target.id === 'edit-user';

    let id = e.target.parentElement.id;
console.log(id)
    let url = 'http://localhost:8080/admin/rest/user';
    // delete user
    if (deleteButtonIsPressed) {
        fetch(`${url}/${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(user => {
                document.getElementById('deleteId').value = `${user.id}`;
                document.getElementById('deleteFirstName').value = `${user.username}`;
                document.getElementById('deleteLastName').value = `${user.lastName}`;
                document.getElementById('deleteEmail').value = `${user.email}`;
            })
        $('#exampleModalDelete').modal('show');
    }

    // edit modal
    if (editButtonIsPressed) {
        fetch(`${url}/${id}`, {
            method: 'GET'
        })

            .then(res => res.json())
            .then(user => {
                document.getElementById('formId').value = `${user.id}`;
                document.getElementById('formUserName').value = `${user.username}`;
                document.getElementById('formLastName').value = `${user.lastName}`;
                document.getElementById('formEmail').value = `${user.username}`;
        //         document.getElementById('formPassword').value = ``;
            })
        $('#exampleModal').modal('show');
    }
})

// $(document).ready(function () {
//     $('#deleteButton').on('click', function (event) {
// event.preventDefault();
// var href = $(this).attr('href');
//
// $.get(href, function (user, status) {
//     $('.myFormDelete #id').val(user.id);
//     $('.myFormDelete #username').val(user.username);
//     $('.myFormDelete #lastName').val(user.lastName);
//     $('.myFormDelete #email').val(user.email);
//     $('.myFormDelete #roles').val(user.roles);
// })

//     $('.myFormDelete #exampleModalDelete').modal('show');
// });

//submit delete user in model
document.getElementById('deleteUser').addEventListener('submit', submitFormDeleteUser);

function submitFormDeleteUser(event) {
    event.preventDefault();

    let formData = new FormData(event.target);

    let obj = {};
    formData.forEach((value, key) => obj[key] = value);

    let request = new Request(event.target.action, {
        method: 'DELETE',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(request);

    fetch(request).then(
        function (response) {
            console.log(response);
        },
        function (error) {
            console.error(error);
        }
    )

    $('#exampleModalDelete').modal('hide');
}

// close modal
$('.close').click(function () {
    $('.modal').modal('hide');
});
$('.closeBtn').click(function () {
    $('.modal').modal('hide');
});