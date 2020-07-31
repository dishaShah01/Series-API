  
const express = require('express');

const router = express.Router();
const series = require('../../Series');

const idFilter = req => s => s.id === parseInt(req.params.id);


router.get('/', (req, res) => res.json(series));


router.get('/:id', (req, res) => {
  const found = series.some(idFilter(req));

  if (found) {
    res.json(series.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No series with the id of ${req.params.id}` });
  }
});


router.post('/', (req, res) => {
  const news = {
    ...req.body,
    id: series.length+1
    
  };

  if (!news.name) {
    return res.status(400).json({ msg: 'Please include a name' });
  }

  series.push(news);
  //res.json(series);
  res.redirect('/');
});

router.put('/:id', (req, res) => {
  const found = series.some(idFilter(req));

  if (found) {
    series.forEach((s, i) => {
      if (idFilter(req)(s)) {

        const upds = {...s, ...req.body};
        series[i] = upds
        res.json({ msg: 'series updated', upds });
      }
    });
  } else {
    res.status(400).json({ msg: `No series with the id of ${req.params.id}` });
  }
});


router.delete('/:id', (req, res) => {
  const found = series.some(idFilter(req));

  if (found) {
    
    res.json({
      msg: 'series deleted',
      series: series.filter(s => !idFilter(req)(s))
      
    });
    
    //res.json(series);
    res.redirect('/');
  } else {
    res.status(400).json({ msg: `No series with the id of ${req.params.id}` });
  }
});

module.exports = router;