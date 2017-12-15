
//	Flyweight constructor
function Flyweight (make, model, processor) {
  this.make = make;
  this.model = model;
  this.processor = processor;
};

// Flyweight Factory
let FlyweightFactory = (function() {
	let flyweights = {};

	return {
		get: function(make, model, processor) {
			if(!flyweights[make + model]) {
				flyweights[make + model] = new Flyweight(make, model, processor);
			}
			return flyweights[make + model];
		},
		getCount: function() {
			return Object.keys(flyweights).length;
		}
	};
})();

function ComputerCollection() {
	let computers = {};
	let count = 0;

	return {
		add: function(make, model, processor, memory, tag) {
			computers[tag] = new Computer(make, model, processor, memory, tag);
			count++;
		},
		get: function(tag) {
			return computers(tag);
		},
		getCount: function() {
			return count;
		}
	};
}

let Computer = function(make, model, processor, memory, tag) {
	this.flyweight = FlyweightFactory.get(make, model, processor);
	this.memory = memory;
	this.tag = tag;
	this.getMake = function() {
		return this.flyweight.make;
	}
}

let log = (function () {
    let log = "";
 
    return {
    	add: function (msg) { 
    		log += msg + "\n"; 
    	},
    	show: function () { 
    		console.log(log); 
    		log = ""; 
    	}
    }
})();

(function run() {
	let computers = new ComputerCollection();
	
	computers.add("Apple", "iMac", "Intel 2.5 GHz", "6G", "123AX");					// Make + Model = 2
	computers.add("Apple", "iMac", "Intel 2.5 GHz", "8G", "123AY");
	computers.add("Apple", "iMac", "Intel 2.5 GHz", "16G", "123AZ");
	computers.add("Apple", "iMac", "Intel 2.5 GHz", "16G", "123AZ");
	computers.add("Apple", "MacBookPro", "Intel 2.5 GHz", "16G", "123AZ");	// Make + Model = 2
	computers.add("Acer", "MKTS", "Intel 2.3 GHz", "4G", "123AC");					// Make + Model = 3
	computers.add("Acer", "MKTS", "Intel 2.3 GHz", "4G", "123AC");
	computers.add("Acer", "MKTS", "Intel 2.3 GHz", "8G", "123AB");
	computers.add("Acer", "MKTS", "Intel 2.1 GHz", "4G", "123AA");	
	
	log.add("Computers: " + computers.getCount());
	log.add("Flyweights: " + FlyweightFactory.getCount());
	log.show();
})();

