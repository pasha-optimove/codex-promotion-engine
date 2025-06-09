const express = require('express');
const bodyParser = require('body-parser');
const promotionsRouter = require('./routes/promotions');

const app = express();
app.use(bodyParser.json());

app.use('/promotions', promotionsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
