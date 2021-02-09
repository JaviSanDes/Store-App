const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.options('*', cors());
app.use(express.static(path.join(__dirname, 'build')));

require('./startUp/db')();
require('./startUp/config')();
require('./startUp/prod')(app);
require('./startUp/routes')(app);
require('./startup/validation')();

// statics assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
    console.log(`Listening on port ${port}...`)
);

module.exports = server;
