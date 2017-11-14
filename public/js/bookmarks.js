
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    getBookmarks(function(error, bookmarks) {
        if (error) {
            throw error;
        }
        updateBookmarks(bookmarks);
    });
});

function getBookmarks(callback) {
    var bookmarksRequest = new XMLHttpRequest();

    bookmarksRequest.onreadystatechange = function getBookmarks() {
        if (bookmarksRequest.readyState === XMLHttpRequest.DONE) {
            if (bookmarksRequest.status === 200) {
                var response = JSON.parse(bookmarksRequest.responseText);

                callback(null, response.bookmarks);
            } else {
               callback(new Error('Error downloading bookmarks: ' + bookmarksRequest.status));
            }
        }
    }
    bookmarksRequest.open('GET', '/api/bookmarks');
    bookmarksRequest.send();
}

function updateBookmarks(bookmarks) {
    var bookmarksContainer = document.getElementById('bookmarks');

    // empty bookmarks container
    bookmarksContainer.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = document.createElement('div');
        var documentUrl = document.createElement('a');
        documentUrl.innerHTML = bookmarks[i];
        documentUrl.setAttribute('href', bookmarks[i]);

        bookmark.appendChild(documentUrl);

        bookmarksContainer.appendChild(bookmark);
    }
}

