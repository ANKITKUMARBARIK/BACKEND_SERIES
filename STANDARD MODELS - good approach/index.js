const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    return res.end("Industry approach - precious way to write models.");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});