/*const assert = require('assert');*/

// Model: Cares about the data. Single place for server-side calls.
let PenguinModel = function PenguinModel(XMLHttpRequest) {
	this.XMLHttpRequest = XMLHttpRequest;
};

PenguinModel.prototype.getPenguin = function getPenguin(index, fn) {
	let oReq = new this.XMLHttpRequest();

  oReq.onload = function onLoad(e) {
    let ajaxResponse = JSON.parse(e.currentTarget.responseText);
    // The index must be an integer type, else this fails
    let penguin = ajaxResponse[index];

    penguin.index = index;
    penguin.count = ajaxResponse.length;

    fn(penguin);
  };

  oReq.open('GET', 'https://codepen.io/beautifulcoder/pen/vmOOLr.js', true);
  oReq.send();
}

// View: Cares about DOM. Only the view cares about changing the DOM (wiring up events).
let PenguinView = function PenguinView(element) {
	this.element = element;
	this.onClickGetPenguin = null;
};

PenguinView.prototype.render = function render(viewModel) {
	this.element.innerHTML = `<h3>${viewModel.name}</h3>
														<img class="penguin-image" src="${viewModel.imageUrl}" 
														alt="${viewModel.name}" /> 
    												<p><b>Size:</b>${viewModel.size}</p> 
    												<p><b>Favorite food:</b>${viewModel.favoriteFood}</p> 
    												<a id="previousPenguin" class="previous button" href="javascript:void(0);" data-penguin-index="${viewModel.previousIndex}">Previous</a>  
   													<a id="nextPenguin" class="next button" href="javascript:void(0);" data-penguin-index="${viewModel.nextIndex}">Next</a>;`;

  this.previousIndex = viewModel.previousIndex;
  this.nextIndex = viewModel.nextIndex;

  // Wire up click events, and let the controller handle events
  let previousPenguin = this.element.querySelector('#previousPenguin');
  previousPenguin.addEventListener('click', this.onClickGetPenguin);

  let nextPenguin = this.element.querySelector('#nextPenguin');
  nextPenguin.addEventListener('click', this.onClickGetPenguin);
  nextPenguin.focus();
}

// Controller Constructor: Handles events and is the mediator between the view and the model.
let PenguinController = function(penguinView, penguinModel) {
	this.penguinView = penguinView;
	this.penguinModel = penguinModel;
};

// Handle events
PenguinController.prototype.initialize = function initialize() {
	this.penguinView.onClickGetPenguin = this.onClickGetPenguin.bind(this);
};

PenguinController.prototype.onClickGetPenguin = function onClickGetPenguin(e) {
	let target = e.currentTarget;
	let index = parseInt(target.dataset.penguinIndex, 10);

	this.penguinModel.getPenguin(index, this.showPenguin.bind(this));
}

// Calculate indexes to chain penguins, grabs data from model and transforms into an object to the view can understand
PenguinController.prototype.showPenguin = function showPenguin(penguinModelData) {
	let penguinViewModel = {
		name: penguinModelData.name,
		imageUrl: penguinModelData.imageUrl,
		size: penguinModelData.size,
		favoriteFood: penguinModelData.favoriteFood
	};

	penguinViewModel.previousIndex = penguinModelData.index - 1;
	penguinViewModel.nextIndex = penguinModelData.index + 1;

	// If the penguin is the first, link the previous index to the last penguin.
	if(penguinModelData.index === 0){
    penguinViewModel.previousIndex = penguinModelData.count - 1;
  }

  // If the penguin is the last, link the next index to the first penguin.
  if(penguinModelData.index === penguinModelData.count - 1){
    penguinViewModel.nextIndex = 0;
  }

  this.penguinView.render(penguinViewModel);
};

let penguinModel = new PenguinModel(XMLHttpRequest);

let targetElement = document.getElementById('listOfPenguins');
let penguinView = new PenguinView(targetElement);

let controller = new PenguinController(penguinView, penguinModel);

controller.initialize();

controller.onClickGetPenguin({ currentTarget: { dataset: { penguinIndex: 0 } } });

// Unit Test Controller
/*{
	let PenguinViewMock = function PenguinViewMock() {
		this.calledRenderWith = null;
	};

	PenguinViewMock.prototype.render = function render(penguinViewModel) {
		this.calledRenderWith = penguinViewModel;
	};

	let penguinViewMock = new PenguinViewMock();

	let controller = new PenguinController(penguinViewMock, null);

	let penguinModelDataMock = {
	  name: 'Pingu',
	  imageUrl: 'https://static.pexels.com/photos/86405/penguin-funny-blue-water-86405.jpeg',
	  size: '5.0kg (m), 4.8kg (f)',
	  favoriteFood: 'krill',
	  index: 2,
	  count: 5
	};

	controller.showPenguin(penguinModelDataMock);

	assert.strictEqual(penguinViewMock.calledRenderWith.name, 'Pingu');
	assert.strictEqual(penguinViewMock.calledRenderWith.imageUrl, 'https://static.pexels.com/photos/86405/penguin-funny-blue-water-86405.jpeg');
	assert.strictEqual(penguinViewMock.calledRenderWith.size, '5.0kg (m), 4.8kg (f)');
	assert.strictEqual(penguinViewMock.calledRenderWith.previousIndex, 1);
	assert.strictEqual(penguinViewMock.calledRenderWith.nextIndex, 3);
}*/

// Unit Test View
/*{
	let ElementMock = function ElementMock() {
		this.innerHTML = null;
	}

	ElementMock.prototype.querySelector	= function querySelector() { };
	ElementMock.prototype.addEventListener = function addEventListener() { };
	ElementMock.prototype.focus = function focus() { };

	let elementMock = new ElementMock();

	let view = new PenguinView(elementMock);

	let viewModel = {
	  name: 'Pingu',
	  imageUrl: 'https://static.pexels.com/photos/86405/penguin-funny-blue-water-86405.jpeg',
	  size: '5.0kg (m), 4.8kg (f)',
	  favoriteFood: 'krill',
	  index: 2,
	  count: 5
	};

	view.render(viewModel);

	assert(elementMock.innerHTML.indexOf(viewModel.name) > 0);
	assert(elementMock.innerHTML.indexOf(viewModel.imageUrl) > 0);
	assert(elementMock.innerHTML.indexOf(viewModel.size) > 0);
	assert(elementMock.innerHTML.indexOf(viewModel.favoriteFood) > 0);
	assert(elementMock.innerHTML.indexOf(viewModel.previousIndex) > 0);
	assert(elementMock.innerHTML.indexOf(viewModel.nextIndex) > 0);
}*/

// Unit Test Model
/*{
	let LIST_OF_PENGUINS = '[{"name":"Emperor","imageUrl":"http://imageUrl",' +
  '"size":"36.7kg (m), 28.4kg (f)","favoriteFood":"fish and squid"}]';

  let XMLHttpRequestMock = function XMLHttpRequestMock() {
  	this.onload = null;
  };

  XMLHttpRequestMock.prototype.open = function open(method, url, async) {
  	// Internal checks, system under test must have a method and url endpoint
  	assert(method);
  	assert(url);
  	assert.strictEqual(async, true);
  };

  XMLHttpRequestMock.prototype.send = function send() {
  	// Callback on this object simulates an Ajax request
  	this.onload({ currentTarget: { responseText: LIST_OF_PENGUINS } });
	};

	let penguinModel = new PenguinModel(XMLHttpRequest);

	penguinModel.getPenguin(0, function onPenguinData(penguinData) {
		assert.strictEqual(penguinData.name, 'Emperor');
	  assert(penguinData.imageUrl);
	  assert.strictEqual(penguinData.size, '36.7kg (m), 28.4kg (f)');
	  assert.strictEqual(penguinData.favoriteFood, 'fish and squid');
	  assert.strictEqual(penguinData.index, 0);
	  assert.strictEqual(penguinData.count, 1);
	});
}*/