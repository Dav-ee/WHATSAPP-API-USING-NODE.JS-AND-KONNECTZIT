var PORT = process.env.PORT || 8000;
var express = require('express');
var app = express();

app.listen(PORT, printME())
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/', express.static('public'));
app.use(express.urlencoded({ extended: true }));

const request = require("request-promise");
var https = require("https");


app.get('/', function (req, res) {
    res.render('send_msg');
});

app.post('/whatsapp', async function (req, res) {
    const Get_all_Data = req.body;

    const Get_Username = req.body.Username;
    const Get_Phone = req.body.Phone;
    const Get_Invoice = req.body.Invoice;
    const Get_Filename = req.body.FileName;

    const myUrl = `https://production.konnectzit.com/webhooks/catch/6FsiMzxusH-kz7030-lrd24eywOd?Username=${Get_Username}&Phone=${Get_Phone}&Invoice=${Get_Invoice}&FileName=${Get_Filename}`;
    console.log(myUrl);
    try {
        const response = await request(
            myUrl
        );
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
    }


});

function printME() {
    console.log('NODE.JS APP STARTED ON ' + PORT);
}