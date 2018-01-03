// Presenter of Task: presenter object gets its view (the UI) object in the constructor.
function TaskPresenter(view) {
	let _view;
	let _model;

	// Handler with the view that will fire when a task has been checked
	function init() {
		_view = view;
		// Presenter does not care how ‘checking the task’ was achieved, but it knows what to do once that action happened
		_view.addCheckHandler(function() {
			_view.remove();
		});
	}

	let publicAPI = {
		// Returns the view object that was supplied to the constructor
		getView: function() {
			return _view;
		},
		setModel: function(model) {
			_model = model;
			_view.setModel(_model);
		}
	};

	init();
	return publicAPI;

}