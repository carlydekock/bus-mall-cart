/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //DONE: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    // create element
    var optionElement = document.createElement('option');
    // give it content
    optionElement.textContent = Product.allProducts[i].name;
    // give it a value attribute
    optionElement.value = Product.allProducts[i].name;
    // optionElement.setAttribute() // ???
    // append to dom
    selectElement.appendChild(optionElement);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // DONE: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// DONE Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // DONE suss out the item picked from the select list
  var itemName = document.getElementById('items').value;
  // DONE get the quantity
  var itemQuantity = document.getElementById('quantity').value;
  // DONE using those, add one item to the Cart
  cart.addItem(itemName, itemQuantity);
  console.log(cart);
}

// DONE Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var cartTotal = document.getElementById('itemCount');
  cartTotal.textContent = `You have ${cart.items.length} items in the cart.`;
}

// DONE: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // DONE: Get the item and quantity from the form
  var cartOutput = document.getElementById('cartContents');
  // var divElement = document.createElement('div');
  // cartOutput.appendChild(divElement);
  
  //create another div //from class
  //give that div text content of product info: item name and quantity //from class
  cartOutput.innerHTML = '';
  for (var i = 0; i < cart.items.length; i++) {
    var divElement = document.createElement('div')
    divElement.textContent = `${cart.items[i].product}: ${cart.items[i].quantity}`;
    cartOutput.appendChild(divElement);
  }
  // console.log(divElement);
  //append it to the parent/DOM //from class

  // DONE Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
