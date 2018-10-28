const search = require('./src/scripts/search.js');

const express = require('express');
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/search', function (req, res) {
  res.render('search', {
    title: 'Search for houses and flats for sale across the UK'
  })
  res.end();
})

app.post('/results', function (req, res) {
  let p = new Promise(function(resolve, reject) {  
    let searchInstance = new search(req.body.search, resolve, reject);
    let data = searchInstance.init(); 
 });

  p.then( (data) => {
    // console.log('*** promise success ***');
    // console.log(data);
    res.render('Results', {
      title: 'Results',
      results: data.listing.length,
      data: data
    })
    res.end();
  }, (error) => {
    res.render('search', {
      title: 'No results found',
      subtitle: 'Enter another location and search again.'
    })
  });
})

app.use(function (req, res, next) {
  res.status(404).render('404', {
    title: '404',
    message: 'Requested page not found'
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))