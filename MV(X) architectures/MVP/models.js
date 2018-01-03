// Constructor of Task: getter and setter for each property in the model
function TaskModel(text) {
	let _id = (new Date()).getTime();
	let _text = text;

	this.getID = function() {
		return _id;
	}

	this.getText = function() {
		return _text;
	}

	this.setText = function(value) {
		_text = value;
	}

}