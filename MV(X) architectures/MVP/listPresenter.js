// Registers a handler in the view when a new task is created, which then it will create a new task object and pass it’s view to the list view.
function ListPresenter(view) {
	let _view;
	let model;

	function init() {
		_view = view;
		_view.addCreateTaskHandler(function(taskTitle) {
			let model = new TaskModel(taskTitle);
			let task = new TaskPresenter(new TaskView());
			task.setModel(model);
			_view.addTask(task.getView());
		});
	}

	let publicAPI = {
		getView: function() {
			return _view;
		}
	}

	init();
	return publicAPI;

}