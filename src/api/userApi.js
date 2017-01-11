import 'whatwg-fetch'; //what working group fetch. Browers that dont have fetch natively.
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

export function getUsers() { //Only one public function. All the ones below are private
  return get('users');
}

export function deleteUser(id) { //Looks at users then passes the id that it receives. Delegates to a seperate function called De l.
  return del(`users/${id}`);
}

function get(url) { //Actual call that uses fetch. We are only supporting get at this stage. Push, put etc are different.
  return fetch(baseUrl + url).then(onSuccess, onError);
}

// Can't call func delete since reserved word.
function del(url) { //Private Del function to handle all our delete calls.
  const request = new Request(baseUrl + url, {
    method: 'DELETE'
  });

  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}