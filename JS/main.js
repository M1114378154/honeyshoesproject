// 创建变量用于存储商品数据
var productsList;
// 购物车实例化
var cart = new ShoppingCart();
//  console.log(cart);

// 1.0创建请求对象
var request = new XMLHttpRequest();
// 2.0设置请求对象
// 2.1用open() 方法来指定从网络请求资源的 HTTP request method , 以及URL。
request.open('GET', 'productsList.json');
// 2.2设置响应类型 （返回什么类型的数据）
request.responseType = 'json';

request.onload = function () {
  if (request.status === 200) {
    productsList = request.response;

    // 调用初始化函数
    displayProducts();
    // displayTotalQty();
  } else {
    //  如果获取文件失败，则向控制台提供错误信息
    console.log('网络请求productsList.json失败，响应吗' + request.status + ': ' + request.statusText)
  }
};
// 3.0发送请求
request.send();


// 显示商品数据
function displayProducts() {
  // console.log(productsList[2]);
  // 获取商品列表父节点
  let productListNode = document.querySelector('#productList');
   //console.log(productListNode);

  // 获取商品样本节点
  let productExampleNode = document.querySelector('#productExample');
   console.log(productExampleNode);
   
  for (const key in productsList) {
    // 当前商品数据
    let product = productsList[key];
    //  console.log(product);
    // 克隆样本节点形成当前商品节点
    let node = productExampleNode.cloneNode(true);
    // console.log(node);
    // 将商品节点挂接到父节点下
    productListNode.appendChild(node);

    // 设置数据
    // 商品节点id
    node.id = product.id;
    // 商品标题
    let example = node.querySelector('[data-name="title"]');
    example.textContent = product.title;
    // console.log(example);
    // 商品单价
    example = node.querySelector('[data-name="unitPrice"]');
    example.textContent = "¥ " + product.price.toFixed(2);
    // console.log(example);
    // 图像地址
    example = node.querySelector('[data-name="imgSrc"]');
    example.src = "images/" + product.imgSrc;
    // console.log(example);
    // 去除隐藏
    node.classList.remove('d-none');
  }
  // 给各个按钮添加事件
  addEvent();
}
// 显示加入购物车的商品的总数量
function displayTotalQty() {
  // 获取购物车旁边的徽标
  var totalQty = document.getElementsByName('totalQty')[0];
  console.log(totalQty);

  // 更改徽标数据
  totalQty.textContent = cart.getDataFromLocalStorage().totalQty;
}
// 给各个按钮添加事件
function addEvent() {
  // 获取各个按钮节点
  var increase = document.getElementsByName('increase');
  // console.log(increase);
  var decrease = document.getElementsByName('decrease');
  // console.log(decrease);
  var addToCart = document.getElementsByName('addToCart');
  // console.log(addToCart);

  // 给各个按钮节点添加单击事件
  for (var i = 0; i < increase.length; i++) {
    increase[i].addEventListener('click', increaseValue);
    decrease[i].addEventListener('click', decreaseValue);
    addToCart[i].addEventListener('click', addToCartNum);
  }
}

// “+”按钮触发函数
function increaseValue(e) {
  // DOM nextElementSibling属性，返回元素的下一个兄弟元素
  let qtyObj = e.target.nextElementSibling;
  // 利用JavaScript parseInt()函数返回整数
  let qty = parseInt(qtyObj.innerText);
  qty++;
  // 更改商品数量
  qtyObj.innerText = qty;
}
// “-”按钮触发函数
function decreaseValue(e) {
  // DOM previousElementSibling属性，返回元素的前一个兄弟元素
  let qtyObj = e.target.previousElementSibling;
  // 利用JavaScript parseInt()函数返回整数
  let qty = parseInt(qtyObj.innerText);
  if (qty > 1) qty--;
  else qty = 0;
  // 更改商品数量
  qtyObj.innerText = qty;
}


// “加入购物车”按钮触发函数
function addToCartNum(e) {
  // 获取商品数量节点（DOM previousElementSibling属性，返回元素的前一个兄弟元素）
  let qtyObj = e.target.previousElementSibling.previousElementSibling;
   console.log(qtyObj);
  // 商品数量（利用JavaScript parseInt()函数返回整数）
  let qty = parseInt(qtyObj.innerText);
  // console.log(qty);

  // 获取当前商品的的id
  let productionId = (e.target.parentNode.parentNode.parentNode.parentNode.parentNode).getAttribute("id");
  console.log(productionId);
  // 定义变量product用于储存商品的数据
  let product;
  // 遍历所有商品数据products，与当前id相同的商品数据存入变量product
  for (const i in productsList) {
    if (productionId == productsList[i].id) {
      product = productsList[i];
      break;
    }
  }
  // 实例化Order并存入变量order中
  let order = new Order(product, qty, true);

  //将选中商品写入购物车
  cart.addToCart(order);

  // 调用displayTotalQty函数修改徽标的数据
  displayTotalQty();
}


