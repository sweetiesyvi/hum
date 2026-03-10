const addBtn = document.getElementById("addBtn")
const updateBtn = document.getElementById("updateBtn")
const nameInput = document.getElementById("nameInput")
const tableBody = document.getElementById("tableBody")

let currentUserId = null

addBtn.addEventListener("click", addUser)
updateBtn.addEventListener("click", updateUser)

loadUsers()

/* CREATE */

function addUser() {

  const name = nameInput.value

  fetch('/api/users', {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({ name })

  })
  .then(res => res.json())
  .then(() => {

    nameInput.value = ""

    loadUsers()

  })

}

/* READ */

function loadUsers(){

fetch('/api/users')

.then(res => res.json())

.then(users => {

tableBody.innerHTML = ""

users.forEach(u => {

const row = document.createElement("tr")

row.innerHTML = `

<td>${u.name}</td>

<td>

<button class="btn btn-warning btn-sm" onclick="editUser('${u._id}','${u.name}')">
Edit
</button>

<button class="btn btn-danger btn-sm" onclick="deleteUser('${u._id}')">
Delete
</button>

</td>

`

tableBody.appendChild(row)

})

})

}

/* PREPARE UPDATE */

function editUser(id, name){

currentUserId = id

nameInput.value = name

addBtn.style.display = "none"

updateBtn.style.display = "inline-block"

}

/* UPDATE */

function updateUser(){

fetch('/api/users/' + currentUserId, {

method:'PUT',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify({

name:nameInput.value

})

})
.then(res=>res.json())
.then(()=>{

nameInput.value = ""

addBtn.style.display = "inline-block"

updateBtn.style.display = "none"

loadUsers()

})

}

/* DELETE */

function deleteUser(id){

fetch('/api/users/' + id,{

method:'DELETE'

})
.then(()=>{

loadUsers()

})

}
