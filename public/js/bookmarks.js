
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
    $.ajax({
        url: '/api/bookmarks',
        success: function(data) {
            callback(null, data.bookmarks);
        },
        error: function() {
            callback(new Error('Error downloading bookmarks'));
        }
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

function addBookmark(form, callback) {
    var bookmarkData = new FormData(form);

    $.ajax({
        url: '/api/bookmarks',
        type: 'POST',
        data: bookmarkData,
        processData: false,
        contentType: false,
        success: function() {
            callback(null);
        },
        error: function() {
            callback(new Error('Error adding bookmark'));
        }
    });
}
