
const adminDOM = document.getElementById('admin-table');
const containerAdmin = adminDOM.querySelector('tbody');


const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'));
const formEdit = document.getElementById('modalEdit').querySelector('form');
const id1 = document.getElementById('id1');
const name1 = document.getElementById('name1');
const surname1 = document.getElementById('surname1');
const age1 = document.getElementById('age1');
const email1 = document.getElementById('email1');
const password = document.getElementById('password');
const roles = formEdit.roles;


const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'));
const formDelete = document.getElementById('modalDelete').querySelector('form');
const id2 = document.getElementById('id2');
const name2 = document.getElementById('name2');
const surname2 = document.getElementById('surname2');
const age2 = document.getElementById('age2');
const email2 = document.getElementById('email2');


const formNewUser = document.getElementById('nav-new-user').querySelector('form');
const newName = document.getElementById('newName');
const newSurname = document.getElementById('newSurname');
const newAge = document.getElementById('newAge');
const newEmail = document.getElementById('newEmail');
const newPassword = document.getElementById('newPassword');
const newRoles = formNewUser.roles;


const showAllUsers = (articles) => {
    let results = '';
    articles.forEach(article => {
        let roles = '';
        article.roles.forEach(role => {
            roles += (role.name + ' ');
        })

        results += `
                <tr>
                    <td>${article.id}</td>
                    <td>${article.name}</td>
                    <td>${article.surname}</td>
                    <td>${article.age}</td>
                    <td>${article.username}</td>
                    <td>${roles}</td>
                    <td><a class="btnEdit btn btn-info text-white btn-sm">Edit</a></td>
                    <td><a class="btnDelete btn btn-danger btn-sm">Delete</a></td>
                </tr>
                `
    });
    containerAdmin.innerHTML = results;
}


async function getRoles(options, selectedRoles) {
    for (let i = 0; i < options.length; i++) {
        const option = options[i].text;
        await fetch('http://localhost:8080/api/roles/' + option, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                selectedRoles.push(data);
            });
    }
}


function showTable() {
    fetch(url)
        .then(response => response.json())
        .then(data => showAllUsers(data))
        .catch(error => console.log(error));
}

showTable();


const on = (element, event, selector, handler)  => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
}


on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode;
    id1.value = row.children[0].innerHTML;
    name1.value = row.children[1].innerHTML;
    surname1.value = row.children[2].innerHTML;
    age1.value = row.children[3].innerHTML;
    email1.value = row.children[4].innerHTML;
    modalEdit.show();
})

on(document, 'click', '.btnDelete', e => {
    const row = e.target.parentNode.parentNode;
    id2.value = row.children[0].innerHTML;
    name2.value = row.children[1].innerHTML;
    surname2.value = row.children[2].innerHTML;
    age2.value = row.children[3].innerHTML;
    email2.value = row.children[4].innerHTML;
    modalDelete.show();
})

formEdit.addEventListener('submit', async (e) => {
    e.preventDefault();

    const options = roles.selectedOptions;

    const selectedRoles = [];

    await getRoles(options, selectedRoles);

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:id1.value,
            name:name1.value,
            surname:surname1.value,
            age:age1.value,
            username:email1.value,
            password:password.value,
            roles:selectedRoles
        })
    })
        .then(response => response.json())
        .then(() => showTable());
    modalEdit.hide();
    while (options.length > 0) {
        options[0].selected = false;
    }
    password.value = '';
})

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url + id2.value, {
        method: 'DELETE'
    })
        .then(() => showTable());
    modalDelete.hide();
})


formNewUser.addEventListener('submit', async (e) => {
    e.preventDefault();

    const options = newRoles.selectedOptions;

    const selectedRoles = [];

    await getRoles(options, selectedRoles);

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:newName.value,
            surname:newSurname.value,
            age:newAge.value,
            username:newEmail.value,
            password:newPassword.value,
            roles: selectedRoles
        })
    })
        .then(response => response.json())
        .then(() => showTable());

    $('#nav-tab a[href="#nav-users"]').tab('show');

    newName.value = '';
    newSurname.value = '';
    newAge.value = '';
    newEmail.value = '';
    newPassword.value = '';

    while (options.length > 0) {
        options[0].selected = false;
    }
})

