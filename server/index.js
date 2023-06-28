import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 5001;
const app = express();
app.use(cors());
app.use(express.json());

const database = [
  {
    username: "test",
    password: "123abc"
  },
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body["username"]);
  const userData = database.find((user) => user.username === req.body["username"]);
  // Perform validation and authentication logic here
  // If the credentials are valid, generate a token or session
  // Compare user info
  if (userData) {
    if (userData.password !== req.body["password"]) {
      res.json({ token: 'Invalid password' });
    } else {
      res.json({ token: 'true' });
    }
  } else {
    // Username not foun
    res.json({ token: 'Uer Not Found' });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});