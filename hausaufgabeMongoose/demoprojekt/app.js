const express = require('express');
const mongoose = require('mongoose');

//Importiere das Schrauben Model
const Schraube = require('./models/Schraube');

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://christiangruender:8fBQzZdDlLX1kBE4@cluster0.xhnylat.mongodb.net/schrauben24?retryWrites=true&w=majority",
 { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('MongoDB connected...');
})
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route eine Schraube
app.get('/sales/:id', async (req, res) => {
  try {
    const sales = await Schraube.find({ produkt_id: req.params.id });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Route alle Schrauben
app.get('/sales', async (req, res) => {
  try {
    const sales = await Schraube.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
