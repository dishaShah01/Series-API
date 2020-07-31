const express=require('express');
const path=require('path');
const exphbs=require("express-handlebars");
const logger=require("./middleware/logger");
const series=require("./Series.js");

const app=express();

app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res) =>
    res.render('index',{
        title:'Series API',
        series
    })
);

app.use(express.static(path.join(__dirname,'public')));

app.use('/api/series', require('./routes/api/series'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
