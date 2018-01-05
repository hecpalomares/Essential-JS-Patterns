function ListView(){
	let html;

	function init() {
		html = $("<div>"+
                "<h1>MVP Task</h1>"+
                    "<fieldset><legend>Don't forget!</legend>"+
                        "<ul id='tasklist'></ul>"+
                    "</fieldset>"+
                "<h2>Add a new task:</h2>"+
                "What do you need to do? <input id='taskinput' placeholder='I need to do…'/> <input id='submittask' type='submit' value='Add Task'/>"+
              "</div>");
	}

	let publicAPI = {
		getHTML: function() {
			return html;
		},
		addCreateTaskHandler: function(handler) {
			html.find("#submittask").click(function(){
	      let newTaskTitle = html.find("#taskinput").val();
	      html.find("#taskinput").val("");
	      handler(newTaskTitle);
      });
		},
		addTask: function(taskView) {
			html.find("#tasklist").append(taskView.getHTML());
		}
	};

	init();
	return publicAPI;
}