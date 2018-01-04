//Listen for submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

function fetchBookmarks() {
	// Get bookmarks from Local Storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Get output id
		var bookmarksResults = document.getElementById('bookmarksResults');

	// Build output
	bookmarksResults.innerHTML = '';

	for (var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="alert alert-primary"><h3>' + name + ' <a class="btn btn-primary" target="_blank" href="' + url + '">Visit</a>' + ' <button onclick="deleteBookmark(\''+ name +'\')" class="btn btn-danger">Delete</button>' + '</h3></div>';
	}
}

// Save Bookmark
function saveBookmark(e){
	// Get form values
	var siteName = document.getElementById("siteName").value;
	var siteUrl = document.getElementById("siteUrl").value;

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	if(!validateForm(siteName, siteUrl)) return false;

	// local storage test
	// localStorage.setItem('test','Hi,bahuzz');
	// console.log(localStorage.getItem('test'));

	if(localStorage.getItem('bookmarks') === null) {
		// init array
		var bookmarks = [];
		// add new bookmark to array
		bookmarks.push(bookmark);
		// Set to Local Storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from Local Storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// add new bookmark to array
		bookmarks.push(bookmark);
		// ReSet to Local Storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}
	// Clear the form

		document.getElementById('myForm').reset();

	// Refetch bookmarks
		fetchBookmarks();

	// Prevent form form submit
	e.preventDefault();
}

// Delete bookmark
function deleteBookmark(name){
	console.log(name);
	// Get bookmarks from Local Storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for (var i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].name == name){
			// Remove from array
			bookmarks.splice(i,1);
		}
	}
	// ReSet to Local Storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	// Refetch bookmarks
		fetchBookmarks();
}

function validateForm(siteName, siteUrl) {
	// Checking for non-empty fields

	if(!siteName || !siteUrl) {
		alert("Please, fill all fields!");
		return false;
	}

	// Checking url for valid

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)) {
	  alert("Please use a valid url");
	  return false
	} 

	return true;
}