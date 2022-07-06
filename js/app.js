let state = {
  name: "",
  brand: "",
  category: "",
  order:""
}


let catalog = document.querySelector('.catalog')
let filterName = document.getElementById('filter-name');
let filterInput = document.getElementById('sort-type');
let buttonSearch = document.getElementById('button-search');
let filterBrand = document.getElementById('filter-brand');
let filterType = document.getElementById('filter-type');

let makeups;
let filteredMakeups;
const correctionFactor = 5.5;
buttonSearch.addEventListener('click', function(evt) {
  evt.preventDefault();  
  filterCatalog();
});



function filterCatalog(){
  state.name = filterName.value
  state.brand = filterBrand.value;
  state.category = filterType.value;
  state.order = filterInput.value;

  filteredMakeups = makeups.filter((makeup) => {
    return (makeup.brand === state.brand || state.brand === "") && (makeup.product_type === state.category || state.category === "") && (makeup.name.toUpperCase().indexOf(state.name.toUpperCase()) !== -1 || state.name === ""); 
  })

  filteredMakeups = filterData(state.order, filteredMakeups);
  console.log("filtered makeups", filteredMakeups);

  fillCatalog(filteredMakeups);
  console.log(state)
  
}


function getMakeup() {
  

  // listMakeups().then((response) => {
  //   console.log(response);
  //   makeups = orderByRating(response);

  //   fillCatalog(makeups);

  // });

  let response = listMakeups();
  makeups = orderByRating(response);
  fillBrand();
  fillType();
  fillCatalog(makeups);

}

function fillBrand(){
  let uniqueBrands = [];
  makeups.forEach(makeup => {
    if(uniqueBrands.indexOf(makeup.brand) === -1 && makeup.brand !== null){
      uniqueBrands.push(makeup.brand)
    }

  });
  uniqueBrands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.innerText = brand;
        
    filterBrand.appendChild(option);
    
  });
  
}

function fillType(){
  let uniqueCategory = [];
  makeups.forEach(makeup => {
    if(uniqueCategory.indexOf(makeup.product_type) === -1 && makeup.product_type !== null){
      uniqueCategory.push(makeup.product_type)
    }

  });

  uniqueCategory.forEach((Category) => {
    const option = document.createElement("option");
    option.value = Category;
    option.innerText = Category;
        
    filterType.appendChild(option);
    
  });
  
}

function fillCatalog(makeups) {
  catalog.innerHTML = "";
  renderMain(makeups);
  // renderDetails(makeups);
}

function filterData(order, filteredMakeups) {
  
  switch (order) {
    case "1":
      filteredMakeups = orderByRating(filteredMakeups);
      return filteredMakeups;      
    case "2":
      filteredMakeups = orderBylowestPrice(filteredMakeups);      
      return filteredMakeups;
    case "3":
      filteredMakeups = orderByHighestPrice(filteredMakeups);
      return filteredMakeups;
    case "4":
      filteredMakeups = orderByNameAsc(filteredMakeups);
      return filteredMakeups;
    case "5":
      filteredMakeups = orderByNameDesc(filteredMakeups);
      return filteredMakeups;

  }

}

function orderByRating(makeups) {
  return makeups.sort((a, b) => {
    
    if (+a.rating > +b.rating) {
      return -1;
    }
    if (+a.rating < +b.rating) {
      return 1;
    }
    return 0;
  })
}


function orderBylowestPrice(makeups) {
  return makeups.sort((a, b) => {
    if (+a.price > +b.price) {
      return 1;
    }
    if (+a.price < +b.price) {
      return -1;
    }
    return 0;
  })
}

function orderByHighestPrice(makeups) {
  return makeups.sort((a, b) => {
    if (+a.price > +b.price) {
      return -1;
    }
    if (+a.price < +b.price) {
      return 1;
    }
    return 0;
  })
}

function orderByNameAsc(makeups) {
  return makeups.sort((a, b) => {
    if (a.name.trim() > b.name.trim()) {
      return 1;
    }
    if (a.name.trim() < b.name.trim()) {
      return -1;
    }
    return 0;
  })
}

function orderByNameDesc(makeups) {
  return makeups.sort((a, b) => {
    if (a.name.trim() > b.name.trim()) {
      return -1;
    }
    if (a.name.trim() < b.name.trim()) {
      return 1;
    }
    return 0;
  })
}

function filterByBrand(){

}

function search(event){
  event.preventDefault();

}

function renderMain(makeups) {
  makeups.forEach((makeup, index) => {
    const outterDiv = document.createElement("div");

    outterDiv.classList.add("product");
    outterDiv.setAttribute('data-name', makeup.name);
    outterDiv.setAttribute('data-brand', makeup.brand);
    outterDiv.setAttribute('data-type', makeup.category);
    outterDiv.setAttribute('tabindex', index);

    const figure = document.createElement("figure");
    figure.classList.add("product-figure");

    const img = document.createElement("img");
    img.src = makeup.api_featured_image;
    let size = 215;
    img.width = size;
    img.height = size;
    img.alt = makeup.name;
    img.onerror = "javascript:this.src='img/unavailable.png'";

    const section = document.createElement("section");
    section.classList.add("product-description");
    const h1 = document.createElement("h1");
    h1.classList.add("product-name");
    h1.innerText = makeup.name;

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("product-brands");

    const brandSpan = document.createElement("span");
    brandSpan.classList.add("product-brand");
    brandSpan.classList.add("background-brand");
    brandSpan.innerText = makeup.brand;

    const priceSpan = document.createElement("span");
    priceSpan.classList.add("product-brand");
    priceSpan.classList.add("background-price");
    priceSpan.innerText = formatPrice(makeup.price);

    let innerSection = document.createElement("section");
    innerSection.classList.add("product-details");
    innerSection.innerHTML = loadDetails(makeup, index);

    section.appendChild(h1);
    innerDiv.appendChild(brandSpan)
    innerDiv.appendChild(priceSpan)
    section.appendChild(innerDiv);
    figure.appendChild(img);
    outterDiv.appendChild(figure);
    outterDiv.appendChild(section);    
    outterDiv.appendChild(innerSection);
    catalog.appendChild(outterDiv);
  });
}

function formatPrice(price) {
  price = (price * correctionFactor).toFixed(2);
  return `R$ ${price}`;
}

//EXEMPLO DO CÓDIGO PARA UM PRODUTO
// function productItem(makeup, index) {
//   return `<div class="product" data-name=${makeup.name} data-brand=${makeup.brand} data-type=${makeup.category} tabindex=${index}>
//   <figure class="product-figure">
//     <img src="https://d3t32hsnjxo7q6.cloudfront.net/i/deedb7bd74bda43f062a09aab2ee1ec8_ra,w158,h184_pa,w158,h184.png" width="215" height="215" alt="NYX Mosaic Powder Blush Paradise" onerror="javascript:this.src='img/unavailable.png'">
//   </figure>
//   <section class="product-description">
//     <h1 class="product-name">NYX Mosaic Powder Blush Paradise</h1>
//     <div class="product-brands"><span class="product-brand background-brand">Nyx</span>
// <span class="product-brand background-price">R$ 57.70</span></div>
//   </section>
//   // CARREGAR OS DETALHES
// </div>`;
// }

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(makeup, index) {
  return `<div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${makeup.brand}</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${formatPrice(makeup.price)}</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${makeup.rating}</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${makeup.category}</div>
        </div>
      </div><div class="details-row">
        <div>${makeup.category}</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">bronzer</div>
        </div>
      </div>`;
}


