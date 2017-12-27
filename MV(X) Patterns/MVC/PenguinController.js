// Controller: Handles events and is the mediator between the view and the model.

// Controller Constructor
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

// Unit Tests
let PenguinViewMock = function PenguinViewMock() {
	this.calledRenderWith = null;
};

PenguinViewMock.prototype.render = function render(penguinViewModel) {
	this.calledRenderWith = penguinViewModel;
};

let penguinViewMock = new PenguinViewMock();

let controller = new PenguinController(penguinViewMock, null);

var penguinModelDataMock = {
  name: 'Pingu',
  imageUrl: 'https://static.pexels.com/photos/86405/penguin-funny-blue-water-86405.jpeg',
  size: '5.0kg (m), 4.8kg (f)',
  favoriteFood: 'krill',
  index: 2,
  count: 5
};