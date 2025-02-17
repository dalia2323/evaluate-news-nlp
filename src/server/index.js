const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
const fetch = require("node-fetch");
var bodyParser = require('body-parser');
var validator = require('validator');
const app = express();
let reqType = 'txt';
const cors = require('cors');
app.use(cors());  
const corsOptions = {
    origin: 'http://localhost:3001',  // السماح فقط للطلبات من الكلاينت على المنفذ 3001
    methods: ['GET', 'POST'], // السماح فقط بأساليب GET و POST
};

// تفعيل CORS مع الإعدادات المحددة
app.use(cors(corsOptions));

app.use(bodyParser.json()) // لتفعيل استخدام JSON
app.use(bodyParser.urlencoded({ extended: false })) // لتفعيل استخدام بيانات URL المشفرة

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'));
})

// تفعيل السيرفر للاستماع على المنفذ 8081
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

app.post('/userData', async (req, res) => {
    console.log("Received request:", req.body); // للتحقق من البيانات المستلمة

    if (!req.body.input) {
        return res.status(400).json({ error: "No input provided" });
    }

    let reqType = validator.isURL(req.body.input) ? 'url' : 'txt';

    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=auto&${reqType}=${req.body.input}`);
    
    try {
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
