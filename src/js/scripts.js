console.log("scripts loaded");
var app = angular.module("IMS", ['ui.select', 'ngSanitize','ngMaterial', 'ngMessages']); 

/*****************************
    Start of mocked data
******************************/
var loremTxt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non ullamcorper mauris. Suspendisse potenti. Interdum et malesuada fames ac ante ipsum primis in faucibus.";
var contacts=[{name:"Vendor A"},{name:"Vendor B"},{name:"Vendor C"},{name:"Vendor D"},{name:"Vendor E"},{name:"Vendor F"},{name:"Vendor G"},{name:"Vendor H"}];//TODO
var vendors=[{name:"Vendor A",name:"Vendor B"}];//TODO reference contacts in vendor list
var sysCategories = [
  {name:"Drugs"}, 
  {name:"Equipment"},
  {name:"Feed"},
  {name:"Tags"}
];
var sysProducts = [
  {product:{name:"Product A", description:loremTxt, category:sysCategories[0]},quantity:0,transactions:[],vendors:[]},
  {product:{name:"Product B", description:loremTxt, category:sysCategories[0]},quantity:0,transactions:[],vendors:[]},
  {product:{name:"Product C", description:loremTxt, category:sysCategories[1]},quantity:0,transactions:[],vendors:[]},
  {product:{name:"Product D", description:loremTxt, category:sysCategories[1]},quantity:0,transactions:[],vendors:[]},
  {product:{name:"Product E", description:loremTxt, category:sysCategories[1]},quantity:0,transactions:[],vendors:[]},
  {product:{name:"Product F", description:loremTxt, category:sysCategories[1]},quantity:0,transactions:[],vendors:[]},
  {product:{name:"Product G", description:loremTxt, category:sysCategories[2]},quantity:0,transactions:[],vendors:[]},
  {product:{name:"Product H", description:loremTxt, category:sysCategories[2]},quantity:0,transactions:[],vendors:[]},
  {product:{name:"Product I", description:loremTxt, category:sysCategories[1]},quantity:0,transactions:[],vendors:[]},
  {product:{name:"Product J", description:loremTxt, category:sysCategories[1]},quantity:0,transactions:[],vendors:[]},
  {product:{name:"Product K", description:loremTxt, category:sysCategories[3]},quantity:0,transactions:[],vendors:[]}
];
/*****************************
    End of mocked data
******************************/
app.controller("MainController", function($scope,$timeout,$interval,$mdToast) {
  var vm = this;
  /*Quick hacky solution for routing*/
  vm.SetPage = function(pageNumber){
    vm.pageNumber=pageNumber;
    switch(pageNumber) {
    case 0:
        vm.pageTitle="Inventory";
        break;
    case 1:
        vm.pageTitle="Transactions";
        break;
    case 2:
        vm.pageTitle="Settings";1
        break;
    case 3:
        vm.pageTitle=vm.singleProduct.product.name;
        break;
    case 4:
        vm.pageTitle="New transaction";
        break;
    }
  }

  $scope.primaryActionClicked = function(){
    switch(vm.pageNumber) {
    case 0:
        vm.SetPage(2);
        break;
    case 1:
        vm.SetPage(4);
        break;
    case 2:
        //Do Nothing
        break;
    case 3:
        vm.SetPage(0);
        break;
    case 4:
        vm.SetPage(1);
        break;
    }
  }

  //Add or remove inventory of a product
  $scope.SaveTransaction=function(){
    console.log(vm.transactions);
    var newTransaction=JSON.parse(JSON.stringify(vm.tempTransaction));
    
    newTransaction.productName=newTransaction.product.product.name;
    newTransaction.product={};//Clear this to prevent circular references
    if(newTransaction.quantity<1){
      newTransaction.vendor={}
      newTransaction.cost=0;
    }
    vm.tempTransaction.product.quantity+=newTransaction.quantity;
    vm.tempTransaction.product.transactions.push(newTransaction);
    $scope.showSimpleToast('Items succesfully '+(vm.tempTransaction.quantity<0?'removed.':'added.'));
    vm.transactions.push(newTransaction);
  }

  //navigates to the new transaction page, and sets the product if applicable
  $scope.NewTransaction=function(product={}){
    vm.tempTransaction.date = new Date();
    vm.tempTransaction.quantity=0;
    vm.tempTransaction.cost=0;
    vm.tempTransaction.product=product;
    vm.SetPage(4);
  }

  $scope.ProductDetails=function(product){
    console.log("Product Details page hit");
    vm.singleProduct=product;
    vm.SetPage(3);
  }

  $scope.RemoveProduct=function(index){
    if(index>-1){
      vm.products.splice(index,1);
    }
  }

  /*Initialize an mocked data*/
  vm.SetPage(0);
  vm.singleProduct={};//Optinoal parameter for the new transaction and product details page
  vm.tempTransaction={};//Data handler for new transactions
  vm.transactions=[];
  vm.sysCategories=sysCategories;
  vm.locations=[{name:"Location A"},{name:"Location B"},{name:"Location C"},{name:"Location D"}];
  vm.contacts=contacts;
  vm.vendors=[contacts[0],contacts[3],contacts[4]];
  vm.sysProducts=sysProducts;//List of all available products
  vm.products=[sysProducts[0],sysProducts[3],sysProducts[5]];//List of products the customer is tracking, prefilled with mock data
  vm.products[1].quantity=57;//sum of all mocked transactions for this product
  vm.products[2].quantity=25;//sum of all mocked transactions for this product
  vm.transactions=[
    {cost:123, date:"2018-03-31T17:50:06.322Z", location:vm.locations[1], productName:vm.products[1].product.name, quantity:15,vendor:vm.vendors[1]},
    {cost:16, date:"2018-03-31T17:50:06.322Z", location:vm.locations[1], productName:vm.products[1].product.name, quantity:14,vendor:vm.vendors[1]},
    {cost:15, date:"2018-03-31T17:50:06.322Z", location:vm.locations[1], productName:vm.products[2].product.name, quantity:10,vendor:vm.vendors[1]},
    {cost:10, date:"2018-03-29T17:50:06.322Z", location:vm.locations[1], productName:vm.products[2].product.name, quantity:10,vendor:vm.vendors[1]},
    {cost:15, date:"2018-03-18T17:50:06.322Z", location:vm.locations[1], productName:vm.products[1].product.name, quantity:10,vendor:vm.vendors[1]},
    {cost:15, date:"2018-03-28T17:50:06.322Z", location:vm.locations[1], productName:vm.products[1].product.name, quantity:25,vendor:vm.vendors[1]},
    {cost:5, date:"2018-03-31T17:50:06.322Z", location:vm.locations[1], productName:vm.products[2].product.name, quantity:10,vendor:vm.vendors[1]},
    {cost:0, date:"2018-03-31T17:50:06.322Z", location:vm.locations[1], productName:vm.products[2].product.name, quantity:-5,vendor:{}},
    {cost:0, date:"2018-03-31T17:50:06.322Z", location:vm.locations[1], productName:vm.products[1].product.name, quantity:-1,vendor:{}},
    {cost:0, date:"2018-03-29T17:50:06.322Z", location:vm.locations[1], productName:vm.products[1].product.name, quantity:-6,vendor:{}}
  ];
  vm.products[1].transactions.push(vm.transactions[0]);
  vm.products[1].transactions.push(vm.transactions[1]);
  vm.products[2].transactions.push(vm.transactions[2]);
  vm.products[2].transactions.push(vm.transactions[3]);
  vm.products[1].transactions.push(vm.transactions[4]);
  vm.products[1].transactions.push(vm.transactions[5]);
  vm.products[2].transactions.push(vm.transactions[6]);
  vm.products[2].transactions.push(vm.transactions[7]);
  vm.products[1].transactions.push(vm.transactions[8]);
  vm.products[1].transactions.push(vm.transactions[9]);

  /*Notification handler*/
   var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

  $scope.showSimpleToast = function(msg) {
    var pinTo = $scope.getToastPosition();
    $mdToast.show(
      $mdToast.simple()
        .textContent(msg)
        .position(pinTo )
        .hideDelay(3000)
    );
  };
  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };
  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }
  
});


