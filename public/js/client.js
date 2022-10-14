
function submitForm(formId,btnId){
  alert("here");
  var form = document.getElementById(formId);
  form.submit();
  // document.getElementById(btnId).addEventListener("click", function () {
  
  // });
}

// function postToServer(idName,formName){
//   const button = document.getElementById(idName);
//   const formElement = document.getElementById(formName);

//   button.addEventListener('click', function(e) {
//     const data = new URLSearchParams();

//     for (const pair of new FormData(formElement)) {
//       data.append(pair[0], pair[1]);
//     }

//     postData('/actv', { data: data })
//       .then((data) => {
//         console.log(data); // JSON data parsed by `data.json()` call
//       });
//     });
// }

// // Example POST method implementation:
// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: 'POST',
//       body: data
//     });
//     return response; // parses JSON response into native JavaScript objects
// }
  
