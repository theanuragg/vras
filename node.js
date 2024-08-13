const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/connect', (req, res) => {
    const { wallet } = req.body;
    if (!wallet) {
        return res.status(400).json({ message: 'Wallet not specified' });
    }
    console.log(`Wallet connected: ${wallet}`);
    res.json({ message: 'Wallet connected successfully' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
