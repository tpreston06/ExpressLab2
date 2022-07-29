const express = require('express')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3003;

const responses = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"]


// Configure the app (app.set)
const fs = require('fs') // this engine requires the fs module 
app.engine('hypatia', (filePath, options, callback) => { // define the view engine called hypatia
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    //simple view engine from hypatia sheet
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engine

// greetings route
app.get('/greetings/', (req, res) => {
    res.send('greetings');
});

//greetings/:name
app.get('/greetings/:name', (req, res) => {
    res.send("what's up, " + req.params.name);
});

//tip
app.get('/tip/:total', (req, res) => {
    res.send('Total is $' + req.params.total);
});

//tip total * percentage
app.get('/tip/:total/:percentage', (req, res) => {
    let tip = (req.params.total * req.params.percentage/100);
    res.render('magic', { title: 'TipPercent', message: 'The total is $ ' + req.params.total + ', and your tip amount is $ ' + tip + ''});
  });

//magic eight ball
app.get ('/magic/:question', (req, res) => {
    const reponse = responses[Math.floor(Math.random() * responses.length)]

    res.render('magic', {title: 'Magic', message: reponse});
});

app.get("/:numberOfBottles?", function( req, res ){
    var bottles = parseInt(req.params.numberOfBottles) || 99
    var next = bottles - 1
    res.send(`<div> ${next}
    <head>
    Take One Down, Pass it Around
    </head>
    <body>
    <header> ${bottles}  bottles of beer on the wall</header>
    <a href='/${next}'>Next</a>
    </body> 
    </div>`)
  })

// Tell the app to listen on port 3000
app.listen(port, function() {
 console.log('Listening on port', port);
});



