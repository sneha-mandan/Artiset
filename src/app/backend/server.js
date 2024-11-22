const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); 

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/submit-form', async (req, res) => {
  const { name, email, phone, jobTitle, message, captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ message: 'CAPTCHA token is required.' });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY; 

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: secretKey,
          response: captchaToken,
        },
      }
    );

    if (!response.data.success) {
      return res.status(400).json({ message: 'CAPTCHA verification failed.' });
    }

    console.log('Form Data:', { name, email, phone, jobTitle, message });

    res.status(200).json({ message: 'Form submitted successfully.' });
  } catch (error) {
    console.error('Error verifying CAPTCHA:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
