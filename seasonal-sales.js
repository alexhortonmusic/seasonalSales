//---------Container--------//

var container = document.getElementById('container');

//------Get and Print JSON to page------//

function executeCodeWhenCategoriesLoads () {
  var categories = JSON.parse(event.target.responseText);
  console.log("categories", categories)
  categoriesToDOM(categories);
};

function executeCodeWhenProductsLoads () {
  var products = JSON.parse(event.target.responseText);
  console.log("products", products)
  productsToDOM(products);
};

function executeIfFilesFailToLoad () {
  container.innerHTML = 'error';
};

// declaring globally in order to access in eventListeners...
var apparelPriceArr = [];
var furniturePriceArr = [];
var householdPriceArr = [];

var apparel;
// prints "products" to DOM
function productsToDOM (productsJSON) {
	// loop thru json for each product
	for (var i = 0; i < productsJSON.products.length; i++) {
		var currentProduct = productsJSON.products[i];
		var productID = currentProduct.id;
		var productName = currentProduct.name;
		var productPrice = currentProduct.price;
		var productDepartment = currentProduct.category_id;
		
		// if/else to sort each product for each department
		if (productDepartment === 1) {
			apparelPriceArr.push(productPrice);
			apparel = document.getElementById('Apparel');
			apparel.innerHTML += `
				<div class="products">
					<h3>${productName}</h3>
					<h4 id="winterDiscount--${productID}">${productPrice}</h4>
				</div>
			`;
		} else if (productDepartment === 2) {
			furniturePriceArr.push(productPrice);
			var furniture = document.getElementById('Furniture');
			furniture.innerHTML += `
				<div class="products">
					<h3>${productName}</h3>
					<h4 id="autumnDiscount--${productID}">${productPrice}</h4>
				</div>
			`; 
		} else if (productDepartment === 3) {
			householdPriceArr.push(productPrice);
			var household = document.getElementById('Household');
			household.innerHTML += `
				<div class="products" >
					<h3>${productName}</h3>
					<h4 id="springDiscount--${productID}">${productPrice}</h4>
				</div>
			`; 
		}
	};
	// listens once the page has been filled
	seasonDiscounts.addEventListener('change', discountsPerSeason);
};
// puts all discount percentages into an array
var departmentPercentArr = [];


// prints "categories" to DOM
function categoriesToDOM (catJSON) {
	for (var i = 0; i < catJSON.categories.length; i++) {
		var currentDepartment = catJSON.categories[i];
		var departmentID = currentDepartment.id;
		var departmentName = currentDepartment.name;
		var departmentDiscount = currentDepartment.season_discount;
		var departmentPercentOff = currentDepartment.discount;
		departmentPercentArr.push(departmentPercentOff);
		container.innerHTML += `
			<div id="${departmentName}">
				<h2>${departmentName}</h2>
			</div>
		`;
	}
	//---this forces the products JSON to load AFTER the categories JSON
	productsRequest.addEventListener('load', executeCodeWhenProductsLoads);
	productsRequest.send();
};


//----------XHR------------//

// Products XHR
var productsRequest = new XMLHttpRequest();

productsRequest.addEventListener('error', executeIfFilesFailToLoad);

productsRequest.open('GET', 'products.json');


// Categories XHR
var catRequest = new XMLHttpRequest();

catRequest.addEventListener('load', executeCodeWhenCategoriesLoads);
catRequest.addEventListener('error', executeIfFilesFailToLoad);

catRequest.open('GET', 'categories.json');

catRequest.send();

//------DISCOUNTS------//

var seasonDiscounts = document.getElementById('seasonDiscounts');

function discountsPerSeason (event) {
	var seasonToDiscount = event.target.value;
	if (seasonToDiscount === "autumn") {
		var autumnDiscount = departmentPercentArr[1];
		// loops thru furniture price array and assigns new values based on discount
		furniturePriceArr.forEach(function (money, index) {
			var adjustedPrice = money - (money * autumnDiscount);
			adjustedPrice = adjustedPrice.toFixed(2);
			var autumnId = document.getElementById(`autumnDiscount--${index}`)
			autumnId.innerHTML = `<h4>${adjustedPrice}</h4>`;
			//logic to print adjustPrice to DOM
		});
	} else if (seasonToDiscount === "winter") {
			var winterDiscount = departmentPercentArr[0];

			apparelPriceArr.forEach(function (money, index) {
				var adjustedPrice = money - (money * winterDiscount);
				adjustedPrice = adjustedPrice.toFixed(2);
				var winterId = document.getElementById(`winterDiscount--${index}`)
				winterId.innerHTML = `<h4>${adjustedPrice}</h4>`;
		});		
	} else if (seasonToDiscount === "spring") {
			var springDiscount = departmentPercentArr[2];

			householdPriceArr.forEach(function (money, index) {
				var adjustedPrice = money - (money * springDiscount);
				adjustedPrice = adjustedPrice.toFixed(2);
				var springId = document.getElementById(`springDiscount--${index}`)
				springId.innerHTML = `<h4>${adjustedPrice}</h4>`;

				//logic to print adjustPrice to DOM
		});
	}
};

