const express = require('express');
const bodyParser = require('body-parser');

const port = 8888;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const bookmarks = [];

app.get('/', (req, res) => {
    res.status(200).send();
});

app.get('/bookmarks', (req, res) => {
    res.json({ bookmarks });
})

app.post('/bookmarks', (req, res) => {
    if (req.body && req.body.url) {
        bookmarks.push(req.body.url);
        return res.status(200).send();
    }

    res.status(400).send();
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
