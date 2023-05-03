document.getElementById('product-form').addEventListener('submit', function (){

    const url = document.querySelector('.url-form').value;

    const name = document.querySelector('.name-form').value;

    const description = document.querySelector('.description-form').value;

    const price = document.querySelector('.price-form').value;

    const product = new Product(url,name,description,price);

    const ui = new UI();

    ui.addProduct(product);

});

class Product{

    constructor(url,name,description,price){

        this.url = url;
        this.name = name;
        this.description = description;
        this.price = price;

    }

}

class UI{

    addProduct(product){

        const productList = document.getElementById('product-list-form');

        const element = document.createElement('div');

        element.innerHTML = `
        
    <div class="product-box" data-name="p-1">

        <div>
             <img src="${product.url}" class="product-img">
             <h2 class="product-title">${product.name}</h2>
             <p>${product.description}</p>
        </div>
        <span class="price">${product.price}/span>
        <button class="show-product" data-id="8" >Ver producto</button>
   
    </div>`;

    productList.appendChild(element);

    }

}