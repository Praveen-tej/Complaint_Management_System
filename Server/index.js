const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const complaintsRoute = require("./routes/complaints");
require('dotenv').config();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use("/api/complaints", complaintsRoute);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
app.get('/', (req, res) => res.send('API Running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));