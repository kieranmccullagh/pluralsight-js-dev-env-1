import './index.css'; //Just like importing a js file. It works.
import {getUsers, deleteUser} from './api/userApi';


// Populate table of users via API call.
getUsers().then(result => { //use the then function on the promise to hand
  let usersBody = "";

  result.forEach(user => { //Loop through the list of users returned.
    usersBody+= `<tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      </tr>`
  });

  global.document.getElementById('users').innerHTML = usersBody; //Return a string of HTML and return within the users table we created in the html file.

  const deleteLinks = global.document.getElementsByClassName('deleteUser');

  // Must use array.from to create a real array from a DOM collection
  // getElementsByClassname only returns an "array like" object
  Array.from(deleteLinks, link => {
    link.onclick = function(event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
   });
  });