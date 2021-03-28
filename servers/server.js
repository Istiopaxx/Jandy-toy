const express = require('express')
const app = express();

const port = process.env.PORT || 3001;


app.use('/api', (req, res) => res.json({data: "null"}));

app.listen(port, () => {
    console.log(`express is running on ${port}`);
})