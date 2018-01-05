// The view contains an html property which is the HTML representation of this widget, a template.
// All views must returns a public getHtml() function which will return the HTML object, the rendered template.
function TaskView() {
	let html;

	function init() {
		html = $("<li><input type='checkbox'/><label>Something</label></li>");
	}

	let publicAPI = {
		getHTML: function() {
			return html;
		},
		setModel: function(model) {
	 		html.find("input").attr("id", model.getID());
   		html.find("label").attr("for", model.getID());
    	html.find("label").text(model.getText());
		},
		addCheckHandler: function(handler) {
			html.find("input").click(handler);
		},
		remove: function() {
			html.remove();
		}
	};

	init();
	return publicAPI;

}