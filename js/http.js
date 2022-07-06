const baseUrl = "https://makeup-api.herokuapp.com/";
// const baseUrl = "http://localhost:3000/products";

// function listMakeups() {
//     console.log("List MAkeups");

//     return fetch(`${baseUrl}api/v1/products.json`, {
//         method: "GET"
//     })


//     // return fetch("http://localhost:3000/products")
//     //     .then((r) => r.json());

    
// }

function listMakeups(){
    return products.products;
}





// function fetchJson(url, options) {
//     return fetch(url, options)
//       .then((r) => {
//         if (r.ok) {
//           return r.json();
//         } else {
//           throw new Error(r.statusText);
//         }
//       })
//       .catch((error) => {
//         showError("Error loading data", error);
//         throw error;
//       });
//   }