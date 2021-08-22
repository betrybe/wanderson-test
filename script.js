function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
function createCustomButton(element, className, innerText, sku) {
  /* criamos o botão que mostra o id do produto */
  const button = document.createElement('button');
  button.className = className;
  button.innerText = innerText;
  button.addEventListener('click', () => {
    getProduto(sku,);
  });
  return button;
}


// eslint-disable-next-line no-unused-vars
function createProductItemElement(sku, name, image) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomButton('button', 'item__add', 'Adicionar ao carrinho!', sku,));


  addSectionItens(section);
}

// eslint-disable-next-line no-unused-vars
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// eslint-disable-next-line no-unused-vars
function createCartItemElement(sku, name, salePrice) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: ${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  const sectionWander = document.querySelector('.cart__items');
  sectionWander.appendChild(li);
  return li;
}

function sumTotalPricesCart(vl) {
  const price = document.createElement('span.total-price');
  soma = vl;
  price.innerText = `${soma}`;
  const sectionTeste = document.querySelector('.total-price');
  sectionTeste.appendChild(price);
}

function clearCart() {
  const buttomClear = document.querySelector('.empty-cart');
  buttomClear.addEventListener('click', () => {
    document.querySelectorAll('.cart__item').forEach(li => li.remove());
            // criar funcao para limpar o preco total

  });
}

// eslint-disable-next-line no-unused-vars
function cartItemClickListener(event) {
  
  event.target.remove();
    // coloque seu código aqui
  event.target.remove();
  // ao clicar remove os itens da lista
  sumAllItemPricesOnCart();
  storageCart();
  cartCounter();
}

function addSectionItens(element) {
  const sectionPai = document.querySelector('.items');
  sectionPai.appendChild(element);
}

function getProdutos() {
  /* buscar os dados na API inicia o processo de montagem da página */
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador').then((response, reject) => {
    response.json().then((dados) => {
      dados.results.forEach((index) => {
        createProductItemElement(index.id, index.title, index.thumbnail);
        /* chama a primeira função para criar os elementos (sections) da página */
      })
    });
  })
}

function getProduto(sku) {
  fetch(`https://api.mercadolibre.com/items/${sku}`).then((response, reject) => {
    response.json().then((dados) => {
      console.log(dados.id, dados.title, dados.price);
      createCartItemElement(dados.id, dados.title, dados.price);
      sumTotalPricesCart(dados.price);
    });
  })
}

window.onload = () => {
  // ao carregar a página, limpa os valores do carrinho
  getProdutos();
  clearCart();
};
