export default function getBaseUrl() { //Get parameter by name looking for mock API. If exists, go to local host. Otherwise, go to /
 return getQueryStringParameterByName('useMockApi') ? 'http://localhost:3001/' : 'https://lit-wildwood-93122.herokuapp.com/';
}


//This is needed to get the parameter from the URL.
function getQueryStringParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}