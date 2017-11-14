
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    getBookmarks()
        .then(function (bookmarks) {
            updateBookmarks(bookmarks);
        })
        .catch(function(e) {
            throw e;
        });

    var addBookmarkForm = document.getElementById('add-bookmark');
    addBookmarkForm.addEventListener("submit", function (event) {
        event.preventDefault();

        addBookmark(addBookmarkForm)
            .then(getBookmarks)
            .then(function(bookmarks) {
                updateBookmarks(bookmarks);
                console.log('Bookmark added!');
            })
            .catch(function(e) {
                throw e;
            });
    });
});

function getBookmarks() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/api/bookmarks',
            success: function(data) {
                resolve(data.bookmarks);
            },
            error: function() {
                reject(new Error('Error downloading bookmarks'));
            }
        });
    });
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

function addBookmark(form) {
    return new Promise(function(resolve, reject) {
        var bookmarkData = new FormData(form);
        
        $.ajax({
            url: '/api/bookmarks',
            type: 'POST',
            data: bookmarkData,
            processData: false,
            contentType: false,
            success: function() {
                resolve();
            },
            error: function() {
                reject(new Error('Error adding bookmark'));
            }
        });
    });
}
