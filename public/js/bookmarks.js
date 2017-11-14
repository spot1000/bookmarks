
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    getBookmarks(function(error, bookmarks) {
        if (error) {
            throw error;
        }
        updateBookmarks(bookmarks);
    });

    var addBookmarkForm = document.getElementById('add-bookmark');
    addBookmarkForm.addEventListener("submit", function (event) {
        event.preventDefault();

        addBookmark(addBookmarkForm, function(error) {
            if (error) {
                throw error;
            }

            console.log('Bookmark added!');

            getBookmarks(function(error, bookmarks) {
                if (error) {
                    throw error;
                }
                updateBookmarks(bookmarks);
            });
        });
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

function addBookmark(form, callback) {
    var bookmarkData = new FormData(form);

    var addBookmarkRequest = new XMLHttpRequest();

    addBookmarkRequest.onreadystatechange = function getBookmarks() {
        if (addBookmarkRequest.readyState === XMLHttpRequest.DONE) {
            if (addBookmarkRequest.status === 200) {
                callback(null);
            } else {
                callback(new Error('Error adding bookmark: ' + addBookmarkRequest.status))
            }
        }
    }
    addBookmarkRequest.open('POST', '/api/bookmarks');
    addBookmarkRequest.send(bookmarkData);
}
