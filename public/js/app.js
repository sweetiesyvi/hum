let currentId = null

$(document).ready(function(){

loadUsers()

$("#addBtn").click(addUser)

$("#updateBtn").click(updateUser)

})

function loadUsers(){

fetch('/api/users')

.then(res=>res.json())

.then(users=>{

$("#tableBody").html("")

users.forEach(u=>{

$("#tableBody").append(

`<tr>

<td>${u.name}</td>

<td>

<button class="btn btn-warning btn-sm"
onclick="editUser('${u._id}','${u.name}')">

Edit

</button>

<button class="btn btn-danger btn-sm"
onclick="deleteUser('${u._id}')">

Delete

</button>

</td>

</tr>`

)

})

})

}

function addUser(){

const name = $("#nameInput").val()

fetch('/api/users',{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({name})

})

.then(()=>{

$("#nameInput").val("")

loadUsers()

})

}

function editUser(id,name){

currentId = id

$("#nameInput").val(name)

$("#addBtn").hide()

$("#updateBtn").show()

}

function updateUser(){

const name = $("#nameInput").val()

fetch('/api/users/'+currentId,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({name})

})

.then(()=>{

$("#nameInput").val("")

$("#addBtn").show()

$("#updateBtn").hide()

loadUsers()

})

}

function deleteUser(id){

fetch('/api/users/'+id,{

method:"DELETE"

})

.then(()=>{

loadUsers()

})

}
