//	Object that handles worlflow between objects. Workflow easier to understand and mantain.
let orgChart = {
	addNewEmployee: function() {
		//	getEmployeeDetail provides a view that users interact with
		let employeeDetail = this.getEmployeeDetail();

		// when employeeDetail is complete, the mediator (org chart object) decides what should happens next
		employeeDetail.on("complete", function(employee){
			//	set up additional objects that have additional events, which are used bu the mediator to do additional things
			let managerSelector = this.selectManager(employee);
			managerSelector.on("save", function(employee){
				employee.save();
			});
		});
	},
	//	Rest of utility methods
};

/*A&D*/
//	Advantages: Reduce the communication channels needed between objects or components in a system from many to many to many to one.
//							Create a decoupled system benefit, domino effect of module throwing an error are contained into a single module.
//							Reduce tight-coupling (always a good thing)
//	Disadvantages: Produce a single-point of failure. Can cause a performance hit, as modules are always communicating between them.
