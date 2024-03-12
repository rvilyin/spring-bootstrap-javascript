const url = 'http://localhost:8080/api/users/';
const userDOM = document.getElementById('user-table');
const containerUser = userDOM.querySelector('tbody');
const currentUserId = document.getElementById('hidden-id').getAttribute('value');

const showUser = (user) => {
    let roles = '';
    user.roles.forEach(role => {
        roles += (role.name + ' ');
    })

    containerUser.innerHTML = `<tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.surname}</td>
                    <td>${user.age}</td>
                    <td>${user.username}</td>
                    <td>${roles}</td>
                </tr>          
                `;

}

fetch(url + currentUserId)
    .then(response => response.json())
    .then(data => showUser(data))
    .catch(error => console.log(error));
