const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const quotes = require("./quotes.json");

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Root reading;
app.get('/', function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

//Reading all the quotes;
app.get("/quotes", function(request, response){
  response.json(quotes);
});

// Reading one quote specified by an ID;
app.get('/quotes/:id', (req, res) => {
    const Id = req.params.id;
    const Quote = quotes.find(m => m.id == Id);
    if (Quote) { res.json(Quote) } else { res.send("Quote not found") }
});

// Updating the quote
app.put('/quotes/:id', (req, res)=>{
  console.log('req.body')
  const Id = req.params.id;
  
  let newQuote = {
    quote: req.body.quote,
    author : req.body.author
  }

  let existingQuote = quotes.find(x => x.id == Id);

    if (existingQuote !== "" && newQuote !== "") {
      existingQuote.quote = newQuote.quote;
      existingQuote.author = newQuote.fauthor;
      res.status(200).send('Quote updated');
    } else{
      res.status(400).send('Quote not found');
    }
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, console.log('server is running'));
