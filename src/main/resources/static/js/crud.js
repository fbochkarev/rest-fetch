// id user from table by click
let elClick = document.getElementById('usersTable');
if(elClick) {
    elClick.addEventListener('click', (e) => {
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
                    document.getElementById('formEmail').value = `${user.email}`;
                })
            $('#exampleModal').modal('show');
        }
    })
}

//submit create, delete and update user in model
let elCreate = document.getElementById('createUser');
let elDelete = document.getElementById('deleteUser');
let elUpdate = document.getElementById('updateUser');

if(elCreate){
    elCreate.addEventListener('submit', submitFormCreateUser);
}if(elDelete){
    elDelete.addEventListener('submit', submitFormDeleteUser);
}if(elUpdate){
    elUpdate.addEventListener('submit', submitFormUpdateUser);
}


function submitFormCreateUser(event) {
    event.preventDefault();

    let formData = new FormData(event.target);

    let obj = {};
    formData.forEach((value, key) => obj[key] = value);

    console.log(obj);

    let request = new Request(event.target.action, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(request);

    fetch(request).then(
        function(response) {
            console.log(response);
        },
        function(error) {
            console.error(error);
        }
    );
}

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

function submitFormUpdateUser(event) {
    event.preventDefault();

    let formData = new FormData(event.target);

    let obj = {};
    formData.forEach((value, key) => obj[key] = value);

    let request = new Request(event.target.action, {
        method: 'PUT',
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

    $('#exampleModal').modal('hide');
}