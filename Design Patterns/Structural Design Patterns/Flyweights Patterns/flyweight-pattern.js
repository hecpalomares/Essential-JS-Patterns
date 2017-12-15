//	Flyweight Pattern: solution for optimizing code that is repetitive, slow and inefficiently shares data
//	Applied to data-layer: concept of sharing data between large quantities of similar objecets stored in memory
// 	Applied to DOM-layer: central event manager, avoid attaching event handlers to every child element in parent containers
//	Intrinsic Data: Required by internal methods in the object, neccessary to function. Extrinsic information can be removed and stored externally.

let Book = function(title, author, genre, pageCount, publisherID, ISBN){
 this.title = title;
 this.author = author;
 this.genre = genre;
 this.pageCount = pageCount;
 this.publisherID = publisherID;
 this.ISBN = ISBN;
};

/*Book.prototype = {
	getTitle: function() {
		return this.title;
	},
	getAuthor: function() {
		return this.author;
	},
	getISBN: function() {
		return this.ISBN;
	},
	updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {
		this.id = bookID;
		this.availability = newStatus;
		this.checkoutDate = checkoutDate;
		this.checkoutMember = checkoutMember;
		this.dueReturnDate = newReturnDate;
	},
	extendCheckoutPeriod: function(bookID, newReturnDate) {
		this.id = id;
		this.dueReturnDate = newReturnDate;
	},
	isPastDue: function(bookID) {
		let currentDate = new Date();
		return currentDate.getTime() > Date.parse(this.dueReturnDate);
	}
};
*/

//	Book Factory Singleton (intrinsic states)
let BookFactory = (function() {
	let existingBooks = {};
	let existingBook;

	return {
		createBook: function(title, author, genre, pageCount, publisherID, ISBN) {
			//	Find out if a particular book meta-data combination has been created
			//	(!!) force a boolean to be returned
			existingBook = existingBooks[ISBN];
			if(!!existingBook) {
				return existingBook;
			} else {
				// create a new instance of the book and store it
				let book = new Book(title, author, genre, pageCount, publisherID, ISBN);
        existingBooks[ISBN] = book;
        return book;
			}
		}
	};
})();

// BookRecordManager singleton (extrinsic states)
let BookRecordManager = (function() {
	let bookRecordDatabase = {};

	return {
		addBookRecord: function (id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {
			let book = BookFactory.createBook(title, author, genre, pageCount, publisherID, ISBN);
			bookRecordDatabase[id] = {
				checkoutMember: checkoutMember,
				checkoutDate: checkoutDate,
				dueReturnDate: dueReturnDate,
				availability: availability,
				book: book
			};
		},
		updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember, dueReturnDate) {
			let record = bookRecordDatabase[bookID];
			record.availability = newStatus;
			record.checkoutDate = checkoutDate;
			record.checkoutMember = checkoutMember;
			record.dueReturnDate = dueReturnDate;
		},
		extendCheckoutPeriod: function (bookID, newReturnDate) {
			bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
		},
		isPastDue: function(bookID) {
			let currentDate = new Date();
			return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
		},
		getRecords: function() {
			return bookRecordDatabase;
		}
	};
})();

let myBook = BookFactory.createBook('Catcher in the Rye', 'J. D. Salinger', 'Fiction', 214, 'P-31', '78964568-NC')
let myOtherBook = BookFactory.createBook('Zoey and Clark', 'J. D. Salinger', 'Fiction', 150, 'P-40', '78964568-NC')

console.log(myBook === myOtherBook);	//true, same ISBN we are getting the data for myBook not myOtherBook

let today = new Date().toLocaleDateString("en-GB");
let record = BookRecordManager.addBookRecord(1, 'Zoey and Clark', 'J. D. Salinger', 'Fiction', 150, 'P-40', '78964568-NC', today, 'A01089860', today, 0);
console.log(BookRecordManager.getRecords());