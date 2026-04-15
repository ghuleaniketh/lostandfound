const express = require('express');
const dotenv = require('dotenv');

// routes imports
const auth = require('./src/auth/auth.routes.js');
const lost = require('./src/lostitems/lost.routes.js');
const found = require('./src/founditems/found.routes.js');
const user = require('./src/user/user.routes.js');
const dashboard = require('./src/dashboard/dashboard.routes.js');

// configs 
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT ;


app.use('/api/lost', lost);
app.use('/api/found', found);
// app.use('/api/user', user);
// app.use('/api/dashboard', dashboard);
// app.use('/api/auth', auth);

app.get('/', (req, res) => {
  res.send('we are making lost and found app');
});

app.get('/create', (req, res) => {
  res.send('creating a found item');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});