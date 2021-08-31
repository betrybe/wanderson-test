const precoTotal = document.querySelector('.total-price');

//Função que carrega o carrinho de compras através do LocalStorage ao iniciar a página
function createLoadingSpan() {
  const loading = document.createElement('span');
  loading.className = 'loading';
  loading.innerText = 'loading...';
  document.querySelector('body').appendChild(loading);
}

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

// Função que cria o botão que mostra o id do produto
function createCustomButton(element, className, innerText, sku) {
  const button = document.createElement('button');
  button.className = className;
  button.innerText = innerText;
  button.addEventListener('click', () => {
    getProduto(sku);
  });
  return button;
}

function createProductItemElement(sku, name, image) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomButton('button', 'item__add', 'Adicionar ao carrinho!', sku,));
  addSectionItens(section);
}

// Criação da variável sectionCont
function createCartItemElement(sku, name, salePrice) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: ${salePrice}`;
  li.id = salePrice;
  li.addEventListener('click', cartItemClickListener);
  const sectionCont = document.querySelector('.cart__items');//procura a classe no documento
  sectionCont.appendChild(li);//adicionar o conteudo em filhos
  return li;
}

// Criada a função para somar os valores de cada item 
function sumTotalPricesCart(vl) {
  if (precoTotal.innerText !== undefined) {
    precoTotal.innerText = parseFloat(precoTotal.innerText) + parseFloat(vl);
  } else {
    precoTotal.innerText = parseFloat(vl);
  }
}

//Criada a função para limpar o carrinho de compra e colocar valor zero no preço total
function clearCart() {
  const buttomClear = document.querySelector('.empty-cart');
  buttomClear.addEventListener('click', () => {
    document.querySelectorAll('.cart__item').forEach((li) => li.remove());
    precoTotal.innerText = 0;
  });
}

// Função que ao clicar com o mouse, remove os itens da lista
function cartItemClickListener(event) {
  event.target.remove();
  precoTotal.innerText = parseFloat(precoTotal.innerText) - parseFloat(event.target.id);
  }

function addSectionItens(element) {
  const sectionPai = document.querySelector('.items');
  sectionPai.appendChild(element);
}

// Busca os dados na API inicia o processo de montagem da página
function getProdutos() {
  precoTotal.innerText = 0;
  createLoadingSpan();
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador').then((response, reject) => {
    response.json().then((dados) => {
      dados.results.forEach((index) => {
        createProductItemElement(index.id, index.title, index.thumbnail);
        // Chama a primeira função para criar os elementos (sections) da página 
      })
    });
  })
}

// Criado a função que adiciona os dados na section.cart
function getProduto(sku) {
  fetch(`https://api.mercadolibre.com/items/${sku}`).then((response, reject) => {
    response.json().then((dados) => {
      createCartItemElement(dados.id, dados.title, dados.price);
      sumTotalPricesCart(dados.price);
    });
  })
}

//Adicionado os eventos que ao carregar a página, limpa os valores do carrinho
window.onload = () => {
  getProdutos();
  clearCart();
};
