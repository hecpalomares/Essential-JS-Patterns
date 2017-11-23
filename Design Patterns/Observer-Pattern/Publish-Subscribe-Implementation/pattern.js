var pubsub = {};

(function(myObject) {
	//	Storage for topics that can be broadcasted
	let topics = {};

	//	A topic identifier
	let subUid = -1;

	//	Publish or broadcast events of interest, with a name and arguments (data) to pass along
	myObject.publish = function(topic, args) {
		if(!topics[topic]) {
			return false;
		}

		let subscribers = topics[topic];
		let len = subscribers ? subscribers.length : 0;

		while(len--) {
			subscribers[len].func(topic, args);
		}

		return this;
	};

	//	Subscribe to events of interest with a specfic token name and a callback function, to be exectued when a topic/event is observed
	myObject.subscribe = function(topic, func) {
		if(!topics[topic]) {
			topics[topic] = [];
		}

		let token = (++subUid).toString();
		topics[topic].push({
			token: token,
			func: func
		});
		return token;
	};


	//	Unsubscribe from a specific topic, based on a tokenized reference to the subscription
	myObject.unsubscribe = function( token ) {
  	for (var m in topics) {
    	if (topics[m]) {
     		for (var i = 0, j = topics[m].length; i < j; i++) {
      		if ( topics[m][i].token === token ) {
          	topics[m].splice( i, 1 );
            return token;
          }
      	}
    	}
    }
  	return this;
  };

}(pubsub));

//	Simple message logger that logs any topics and data received through our subscriber
let messageLogger = function(topics, data) {
	console.log(`Logging: ${topics} : ${data}`);
};

//	Subscribers listen for topics they have subscribed to and invoke a callback function, once a new notificacion is broadcast on the topic
let subscription = pubsub.subscribe("inbox/newMessage", messageLogger);

//	Publishers are in charge of publishing topics or notifications of interest to the application
pubsub.publish( "inbox/newMessage", "hello world!" );
pubsub.publish( "inbox/newMessage", ["test", "a", "b", "c"] );
pubsub.publish( "inbox/newMessage", {
  sender: "hello@google.com",
  body: "Hey again!"
});

//	Unsuscribe a topic if we no longer need subscribers to be notified
pubsub.unsubscribe( subscription );

//	No longer listening. This message will not display anything.
pubsub.publish( "inbox/newMessage", "Hello! are you still there?" );