
// 购物车实例化
var cart = new ShoppingCart();
// 获取购物车根节点
let cartRoot = document.querySelector("#cartRoot");
// 获取订单根节点
var cartListNode = document.querySelector('#cartContent');
//定义一组字符串命名规则-JSON
// 数据
const dataNameJson =
{
    "price": "[data-name='price']",
    "qty": "[data-name='qty']",
    "imgSrc": '[data-name="imgSrc"]',
    "subPrice": '[data-name="subPrice"]',
    "selectedQty": '[data-name="selectedQty"]',
    "selectedAmount": '[data-name="selectedAmount"]',
    "units": '[data-name="units"]'
};
//订单操作
const operatorNameJson =
{
    "checkItem": "[data-operator='checkItem']",
    "increase": "[data-operator='increase']",
    "decrease": "[data-operator='decrease']",
    "deleteItem": "[data-operator='deleteItem']",
    "deleteSelected": "[data-operator='deleteSelected']"

};

// 全局操作
const operatorGlobal = {
    "clearAll": "[data-operator='clearAll']",
    "selectAll": "[data-operator='selectAll']"
}
// console.log(cart);

//显示购物车所有订单列表
function displayOrderList() {
    //获取购物车
    let cartData = cart.getDataFromLocalStorage();
    // console.log(cartData);
    //获取购物车的JSON数据中的订单列表
    let orderList = cartData.orderList;
    //挂接到父元素，找到孩子节点
    let cartContent = document.querySelector("#cartContent");
    //获取id
    let exampleNode = document.querySelector('#orderExample');
    for (let i = 0; i < orderList.length; i++) {

        //重新定义一个order,把orderList元素重新赋值给order
        let order = orderList[i];
        //克隆样本节点
        let orderNew = exampleNode.cloneNode(true);
        //设id
        orderNew.id = order.id;
        // console.log(orderNew); 
        //挂接到父元素，找到孩子节点       
        cartContent.appendChild(orderNew);
        //移除新节点到隐藏属性
        orderNew.classList.remove("d-none");

        //获取图片的所有节点
        let imgSrcNew = orderNew.querySelector('[data-name="imgSrc"]');
        imgSrcNew.src = 'images/' + order.imgSrc;

        //获取名字的所有节点
        let nameNew = orderNew.querySelector('[data-name="title"]');
        // console.log(nameNew);
        nameNew.textContent = order.title;

        //获取单价的所有节点
        let priceNew = orderNew.querySelector('[data-name="price"]');
        //  console.log(priceNew);
        priceNew.textContent = order.price;

        //获取选择框设置转态
        let checkboxNew = orderNew.querySelector('[data-operator="checkItem"]');
        //  console.log(checkboxNew);
        checkboxNew.checked = order.selectStatus;

        //获取数量的所有的节点
        let qtyNew = orderNew.querySelector('[data-name="qty"]');
        // console.log(qtyNew);
        qtyNew.textContent = order.qty;

        //获取小计的所有节点
        let subPriceNew = orderNew.querySelector('[data-name="subPrice"]');
        // console.log(subPriceNew);
        subPriceNew.textContent = (order.price * order.qty);
    }


}

//显示商品总样本数
//显示已选中商品到总件数和总价格
function displaySelectedTotal() {

    //获取总数相关节点,并设置对应值

    let totalNode = cartRoot.querySelector(dataNameJson.units);
    
    totalNode.textContent = cart.getDataFromLocalStorage().units;
 // totalNode.textContent = cart.getDataFromLocalStorage().units;

    totalNode = cartRoot.querySelector(dataNameJson.selectedQty);
     // console.log(totalNode);
    totalNode.textContent = cart.getSelectedQty();

    totalNode = cartRoot.querySelector(dataNameJson.selectedAmount);
    totalNode.textContent = (cart.getSelectedAmount()).toFixed(2);

}
//为相关节点注册事件
function regEvent() {
    // 获取清空购物车节点
    let element = cartRoot.querySelector(operatorGlobal.clearAll);
    // console.log(element);
    // 注册单击事件触发函数
    element.onclick = clearAllEventFun;

    //获取一组订单删除按钮
    element = cartRoot.querySelectorAll(operatorNameJson.deleteItem);
    //console.log(element);

    //为每一个删除按钮设计单击事件—触发
    for (const i in element) {
        element[i].onclick = deleteItemEventFun;
    }


    // 获取删除选中订单节点
    element = cartRoot.querySelector(operatorNameJson.deleteSelected);
    //console.log(element);
    // 为"删除选中的商品"节点注册单机事件,事件触发函数
    element.onclick = deleteSelectedOrder;

    // 获取所有+号节点
    element = cartRoot.querySelectorAll(operatorNameJson.increase);
    //  console.log(element);
    // 为每个+号节点注册单机事件,事件触发函数
    for (const i in element) {
        element[i].onclick = changeQty;
    }
    // 获取所有-号节点
    element = cartRoot.querySelectorAll(operatorNameJson.decrease);
    //  console.log(element);
    // 为每个-号节点注册单机事件,事件触发函数
    for (const i in element) {
        element[i].onclick = changeQty;
    }


    // 获取所有订单复选框节点
    element = document.querySelectorAll(operatorNameJson.checkItem);
    //  console.log(element);
    // 为每个订单复选框节点注册单机事件,事件触发函数
    for (const i in element) {
        element[i].onclick = checkItemFun;
    }

        // 获取全选节点
        element = cartRoot.querySelectorAll(operatorGlobal.selectAll);
        //  console.log(element);
        // 为全选节点注册单机事件,事件触发函数
        for (const i in element) {
            element[i].onclick = selectAllFun;
        }
    

}
// 清空事件触发函数
function clearAllEventFun() {
    cart.clearCart();
    // 获取订单根节点
      // let cartListNode = document.querySelector('#cartContent');
    //保留样本节点
    let ExampleNode = (document.querySelector('#orderExample')).cloneNode(true);
    //清除订单根节点的所有元素
    cartListNode.innerHTML = "";
    //将样本节点挂接回列表根节点
    cartListNode.appendChild(ExampleNode);
    // 更新商品总数据
    displaySelectedTotal();
}
//加减事件触发函数
function changeQty() {

    //获取订单根节点
    //获取获取当前订单节点
    let node = this.parentNode.parentNode.parentNode;

    // 获取当前订单数量节点
    let qtyNode = node.querySelector(dataNameJson.qty);
    // console.log(qtyNode);
        //获取购物车订单列表根元素
  //  let cartListNode = document.querySelector('#cartContent');
    //console.log(cartListNode);

    // 获取当前订单数量
    let qty = parseInt(qtyNode.textContent);
      // let qtyNode = cartListNode.querySelector('[data-name="qty"]');
    //  console.log(qty);

    // 获取当前操作是+号还是-号
    let AddOrMinus = this.textContent;
    // console.log(AddOrMinus);

    // 获取当前订单的id
    let id = node.id;
    // console.log(id);

    // 获取当前订单的小计
    let subPrice = node.querySelector(dataNameJson.subPrice);
    //  console.log(subPrice);
    // 获取当前订单的单价
    let PriceNode = node.querySelector(dataNameJson.price);
    // console.log(PriceNode);

    // 订单数量加或减
    if (AddOrMinus == '+') {
        qty++;
    } else {
        qty--;
        if (qty <= 0) { qty = 1; return; }
    }
    // 修改页面订单数量
    qtyNode.textContent = qty;
    // 调用指定某个订单数量加1/减1的方法
    cart.changeQty(id, AddOrMinus);
    // 修改小计
    subPrice.textContent = (qtyNode.textContent * PriceNode.textContent).toFixed(2);
    // 修改商品的总数和总价格
    displaySelectedTotal();
}

// 删除选中订单事件触发函数
function deleteSelectedOrder() {
    // 获取所有订单的复选框
    let checkItems = document.querySelectorAll('[data-operator="checkItem"]');
    //  console.log(checkItems);
    // 定义id数组储存状态为选中的订单的id
    let idArray = new Array();
    // 向id数组添加元素
    for (let i = 1; i < checkItems.length; i++) {
        // console.log(checkItems[i].checked);
        if (checkItems[i].checked) {
            idArray.push((checkItems[i].parentNode.parentNode).id);
        }
    }
    for (const i in idArray) {
        // 调用购物车类删除订单函数
        id = idArray[i];
        cart.deleteItem(id);
        // 获取订单根节点
        var cartListNode = document.querySelector('#cartContent');
        // 获取要删除的订单节点
        let node = cartListNode.querySelector('[id="' + id + '"]');
        console.log(node);
        // 删除节点
        cartListNode.removeChild(node);
    }
    // 修改各种总数据
    displaySelectedTotal();
}

// // 订单复选框触发函数
function checkItemFun() {
     // 获取“全选复选框”节点
    let cheselectAlls = document.querySelectorAll('[data-operator="selectAll"]');
    // console.log(cheselectAlls);
    // 获取当前订单节点
    let node = this.parentNode.parentNode;

    // 获取当前订单id
    let id = node.id;
    // console.log(id);
    // 获取当前订单的选择状态
    let selectStatus = this.checked;
    // console.log(selectStatus);

    // 调用“设置购物订单项选择状态”方法
    cart.setItemSelectStatus(id, selectStatus);

    // 设置全选状态
    if (selectStatus == false) {
        for (const key in cheselectAlls) {
            cheselectAlls[key].checked = false;
        }
    } else {
        // 当选中商品的总数量=购物车数据的总件数时，“全选”复选框状态为选中
        if (cart.getSelectedQty() == cart.getDataFromLocalStorage().totalQty) {
            for (const key in cheselectAlls) {
                cheselectAlls[key].checked = true;
            }
        }
    }
    // 修改商品的总数和总价格
    displaySelectedTotal();
}
// //删除事件触发函数
function deleteItemEventFun(e) {

    // 获取订单根节点
    //获取获取当前被单击的删除按钮
    let currentBtn = e.target;
    //获取单击按钮的父节点的父节点
    let node = currentBtn.parentNode.parentNode;
    // 
    //删除父节点的id 
    cart.deleteItem(node.id);
    //移除订单根节点的父节点
    cartListNode.removeChild(node);

    displaySelectedTotal();

}
function selectAllFun(e) {
     // console.log(e);
    // 获取“全选“复选框节点
    let cheselectAlls = document.querySelectorAll('[data-operator="selectAll"]');
    //  console.log(cheselectAlls);
    // 获取所有订单复选框节点
    let checkItems = document.querySelectorAll('[data-operator="checkItem"]');
    // 设置所有“全选”复选框的状态同步
    for (const key in cheselectAlls) {
        cheselectAlls[key].checked = e.target.checked;
    }
    // 设置所有订单的状态与“全选”复选框的状态同步
    for (let i=1;i<checkItems.length;i++) {
        // 获取订单id
        let id=(checkItems[i].parentNode.parentNode).id;
        // 将“全选”复选框的状态赋值给订单
        checkItems[i].checked=e.target.checked;
        // 调用“设置购物订单项选择状态”方法
        cart.setItemSelectStatus(id,e.target.checked);
    }
    // 修改商品的总数和总价格
    displaySelectedTotal();
}


// 初始化函数
function init() {
    //显示订单列表
    displayOrderList();
    //显示总数据
    displaySelectedTotal();
    //为相关节点注册事件
    regEvent();

}
//调用初始化函数
init();


