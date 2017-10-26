document.addEventListener("DOMContentLoaded", function() {
  // console.log("yo")

  var howManyProducts = 25;
  var productsPerPage = 6;
  var currentPerPage = productsPerPage;
  var data;
  var id;
  var viewCounter = 0;
  var imageURL;
  var totalProductsOnScreen = 0;
  var productArray = [];
  var productHighToLow = [];

  // displays the number under what's new of the total number of products
  var totalProducts = document.getElementsByClassName("total-number-of-products")[0].textContent = howManyProducts + " Results";
  // displays the products per page when clicking on next
  var showProductPerPage = document.getElementById("next").innerHTML = "<a>" + "NEXT " + currentPerPage + "</a>"
  // displays the products per page when clicking on the next at the bottomof the page
  var showProductPerPage = document.getElementById("next-at-bottom").innerHTML = "<a>" + "NEXT " + currentPerPage + "</a>"
  // sets the text on the view button
  var viewButton = document.getElementsByClassName("secondary-button")[0].textContent = "Product View";

  // URL used in fetching the API data with howManyProducts we want to display
  // const productsURL = 'http://127.0.0.1:3000/api/products/?limit=' + howManyProducts; // get X products
  // const productsURL = 'http://127.0.0.1:3000/api/products/?offset=' + productsPerPage; // get X products
  var productsURL;
  var container = document.querySelector('.container');

  // URL used in fetching the API data for the product details data
  var productDetails = 'http://127.0.0.1:3000/api/product/';
  var productsPerPageCounter = 0;

  var prodContainer;
  var prodImage;
  var prodDesigner;
  var prodName;
  var prodPrice;

  // using fetch on the Products API here - http://127.0.0.1:3000/api/products
  function getProduct(){

    if (productsPerPageCounter == 0) {
      productsURL = 'http://127.0.0.1:3000/api/products/?offset=' + productsPerPage + '&limit=' + howManyProducts; // get X products
      productsPerPageCounter += 1;
    } else if (productsPerPageCounter >= 1) {
      productsPerPage += productsPerPage;
      productsURL = 'http://127.0.0.1:3000/api/products/?offset=' + productsPerPage + '&limit=' + howManyProducts; // get X products
    }

    fetch(productsURL)
    .then((resp) => resp.json())
    .then(function(data) {
      // console.log(data);
      data = data.data;
      displayProductAPIData(data)
    })
  }

  // displays the Product data
  function displayProductAPIData(data){

    console.log(currentPerPage);

    for (var i=0; i<currentPerPage; i++){

      var id = data[i].id;

      productArray.push(data[i]);

      var imageURL = "https:" + data[i].image.outfit;
      // var imageURL2 = "https://cache.net-a-porter.com/images/products/"+id+"/"+id+"_in_sl.jpg";
      // console.log(imageURL2);

      var prodContainer = document.createElement('div');
      var prodImage = document.createElement('div');
      var prodDesigner = document.createElement('div');
      var prodName = document.createElement('div');
      var prodPrice = document.createElement('div');

      prodContainer.className = 'prod-container';
      prodImage.className = 'prod-image';
      prodDesigner.className = 'prod-designer';
      prodName.className = 'prod-name';
      prodPrice.className = 'prod-price';

      prodImage.style.backgroundImage = "url(" + imageURL  + ")";
      prodDesigner.innerHTML = "<span>" + data[i].designer + "</span>";
      prodName.innerHTML = "<span>" + data[i].name + "</span>";
      prodPrice.innerHTML = "<span>" + data[i].price + "</span>";

      container.append(prodContainer);

      prodContainer.append(prodImage);
      prodContainer.append(prodDesigner);
      prodContainer.append(prodName);
      prodContainer.append(prodPrice);
      // console.log(i);
      totalProductsOnScreen += 1;
    }
    console.log("totalProductsOnScreen " + totalProductsOnScreen);
    // console.log(productArray);
    // priceHighToLow();
    // priceLowToHigh();
  }

  function priceHighToLow() {
    // slicing the first charcter to get rid of the £ character in the API before comparing
    var ascending = productArray.sort((a, b) => a.price.slice(1) - b.price.slice(1));
    clearPage()
    for (var i=0; i<ascending.length; i++) {
      if (viewCounter == 1) {
        // this uses _in_sl.jpg
        imageURL = "https://cache.net-a-porter.com/images/products/"+productArray[i].id+"/"+productArray[i].id+"_ou_sl.jpg";
      } else if (viewCounter == 0) {
        // this uses _ou_sl.jpg
        imageURL = "https://cache.net-a-porter.com/images/products/"+productArray[i].id+"/"+productArray[i].id+"_in_sl.jpg";
      }

      var prodContainer = document.createElement('div');
      var prodImage = document.createElement('div');
      var prodDesigner = document.createElement('div');
      var prodName = document.createElement('div');
      var prodPrice = document.createElement('div');

      prodContainer.className = 'prod-container';
      prodImage.className = 'prod-image';
      prodDesigner.className = 'prod-designer';
      prodName.className = 'prod-name';
      prodPrice.className = 'prod-price';

      prodImage.style.backgroundImage = "url(" + imageURL  + ")";
      prodDesigner.innerHTML = "<span>" + ascending[i].designer + "</span>";
      prodName.innerHTML = "<span>" + ascending[i].name + "</span>";
      prodPrice.innerHTML = "<span>" + ascending[i].price + "</span>";

      container.append(prodContainer);

      prodContainer.append(prodImage);
      prodContainer.append(prodDesigner);
      prodContainer.append(prodName);
      prodContainer.append(prodPrice);
    }
    console.log("yo ascending");
  }

  function priceLowToHigh() {
    var descending = productArray.sort((a, b) => b.price.slice(1) - a.price.slice(1));
    clearPage()
    for (var i=0; i<descending.length; i++) {
      if (viewCounter == 1) {
        // this uses _in_sl.jpg
        imageURL = "https://cache.net-a-porter.com/images/products/"+productArray[i].id+"/"+productArray[i].id+"_ou_sl.jpg";
      } else if (viewCounter == 0) {
        // this uses _ou_sl.jpg
        imageURL = "https://cache.net-a-porter.com/images/products/"+productArray[i].id+"/"+productArray[i].id+"_in_sl.jpg";
      }

      var prodContainer = document.createElement('div');
      var prodImage = document.createElement('div');
      var prodDesigner = document.createElement('div');
      var prodName = document.createElement('div');
      var prodPrice = document.createElement('div');

      prodContainer.className = 'prod-container';
      prodImage.className = 'prod-image';
      prodDesigner.className = 'prod-designer';
      prodName.className = 'prod-name';
      prodPrice.className = 'prod-price';

      prodImage.style.backgroundImage = "url(" + imageURL  + ")";
      prodDesigner.innerHTML = "<span>" + descending[i].designer + "</span>";
      prodName.innerHTML = "<span>" + descending[i].name + "</span>";
      prodPrice.innerHTML = "<span>" + descending[i].price + "</span>";

      container.append(prodContainer);

      prodContainer.append(prodImage);
      prodContainer.append(prodDesigner);
      prodContainer.append(prodName);
      prodContainer.append(prodPrice);
    }
    console.log("yo descending");

  }

  // creates the pagination depending on how many products you want to view and display
  function createPages() {

    var pages;

    if (howManyProducts < productsPerPage){
      pages = 1;   // if products per page is less than the product to display then only need 1 page
    } else {
      pages = howManyProducts / productsPerPage;
      pages = Math.ceil(pages);  // rounds up to the nearest whole number
      // if 26 products and 25 to show on each page this will provide the second page to display that 1 extra product etc
    }
    // console.log("Pages: " + pages)

    // this works out how many pages to add to the pagination display
    if (pages > 1){
      for (var p=2; p<=pages; p++) {
        var pagination = document.querySelector('.pagination');
        var addPagination = document.createElement('li');
        addPagination.innerHTML = "<a>" + p + "</a>";
        // add id="page" to every new li
        addPagination.id = "page" + p;
        pagination.append(addPagination);
      }
    }
    // have not considered when pages overflow on the div - current max is 11 pages
    // so need to implement an left and right arrow to cater for this and show max 5 pages
  }

  // Product Details API - http://127.0.0.1:3000/api/product/$id
  function getProductDetails(id){
    fetch(productDetails+id)
    .then((resp) => resp.json())
    .then(function(data) {
      for (var i=0; i<productsPerPage; i++){
      console.log(data);
      }
    })
  }

  function productViewOrOutfitView() {

    if (viewCounter == 0) {
      // change button text
      var viewButton = document.getElementsByClassName("secondary-button")[0].textContent = "Outfit View";

      // show the outfit images
      currentPerPage = totalProductsOnScreen;
      // totalProductsOnScreen = 0;
      clearPage();
      changeDataInView();
      viewCounter = 1;
    } else if (viewCounter == 1) {
      // change button text
      var viewButton = document.getElementsByClassName("secondary-button")[0].textContent = "Product View";
      clearPage();
      changeDataInView();
      // show the product images
      currentPerPage = totalProductsOnScreen;
      // totalProductsOnScreen = 0;
      viewCounter = 0;
    }

  }

  function changeDataInView() {

    for (var i=0; i<productArray.length; i++){

      if (viewCounter == 1) {
        // this uses _in_sl.jpg
        imageURL = "https://cache.net-a-porter.com/images/products/"+productArray[i].id+"/"+productArray[i].id+"_ou_sl.jpg";
      } else if (viewCounter == 0) {
        // this uses _ou_sl.jpg
        imageURL = "https://cache.net-a-porter.com/images/products/"+productArray[i].id+"/"+productArray[i].id+"_in_sl.jpg";
      }

      var prodContainer = document.createElement('div');
      var prodImage = document.createElement('div');
      var prodDesigner = document.createElement('div');
      var prodName = document.createElement('div');
      var prodPrice = document.createElement('div');

      prodContainer.className = 'prod-container';
      prodImage.className = 'prod-image';
      prodDesigner.className = 'prod-designer';
      prodName.className = 'prod-name';
      prodPrice.className = 'prod-price';

      prodImage.style.backgroundImage = "url(" + imageURL  + ")";
      prodDesigner.innerHTML = "<span>" + productArray[i].designer + "</span>";
      prodName.innerHTML = "<span>" + productArray[i].name + "</span>";
      prodPrice.innerHTML = "<span>" + productArray[i].price + "</span>";

      container.append(prodContainer);

      prodContainer.append(prodImage);
      prodContainer.append(prodDesigner);
      prodContainer.append(prodName);
      prodContainer.append(prodPrice);
    }
  }

  function clearPage(){
    document.getElementById("container").innerHTML = "";
  }

  // Functions to run
  getProduct();
  createPages();

  // Event listeners
  var nextPage = document.getElementById("next");
  nextPage.addEventListener("click", getProduct, false);

  var nextPage = document.getElementById("next-at-bottom");
  nextPage.addEventListener("click", getProduct, false);

  var view = document.getElementById("view");
  view.addEventListener("click", productViewOrOutfitView, false);

  var priceView = document.getElementById("sort-order");
  priceView.onchange = function(e) {
    var value = this.options[this.selectedIndex].value;
    console.log(value);
    if (value == "price-asc") {
      priceHighToLow();
    } else if (value == "price-desc") {
      priceLowToHigh();
    }
  }

});



// console.log(data.badges); // just says in stock
// console.log(data.id);
// console.log(data.name);
// console.log(data.price);
// console.log(data.designer);
// console.log("https:" + data.images.large);
// console.log("https:" + data.images.outfit);
// console.log("https:" + data.images.small);
// imageURL2 = "https:" + data.images.small;
// console.log(imageURL2);
// console.log("On sale: " + data.onSale);
// // console.log(data.price);
// console.log("Sizes: " + data.sizes); // need to work out the size of the array and then do a for loop for those sizes

// var mainContainer = document.getElementsByClassName('main-container');
// console.log(mainContainer);
// container = document.createElement('div');
// container.className = 'container';
// // console.log("mainController: " + mainContainer);
// console.log(mainContainer);
// mainContainer.append(container);
// console.log(mainContainer);
