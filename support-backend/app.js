const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', require('./routes/authRoutes'));
app.use('/cases', require('./routes/caseRoutes'));

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
