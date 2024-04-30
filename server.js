// server.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const readline = require('readline');
const fs = require('fs');

app.post('/findAllWords', (req, res) => {
    let lineReader = readline.createInterface({
        input: fs.createReadStream('dutch_words.txt')
    });

    let lines = [];
    lineReader.on('line', function (line) {
        if(lines.length < 10) {
            lines.push(line);
        } else {
            lineReader.close();
        }
    });

    lineReader.on('close', function () {
        res.json({ words: lines });
    });

    lineReader.on('error', function (err) {
        throw err;
    });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




