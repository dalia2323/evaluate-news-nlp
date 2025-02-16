const http = require('http');
const { analyze } = require('./analyse');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.static('dist'))
app.use(express.json())
dotenv.config()
app.use(cors())


const MEAN_CLOUD_API_KEY = process.env.API_KEY;

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST' && req.url === '/') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // تحويل البيانات إلى سلسلة نصية
        });

        req.on('end', async () => {
            try {
                const { url } = JSON.parse(body); // تحليل البيانات كـ JSON
                const Analyze = await analyze(url, MEAN_CLOUD_API_KEY);
                const { code, msg, sample } = Analyze;

                res.writeHead(200, { 'Content-Type': 'application/json' });

                if (code === 212 || code === 100) {
                    res.end(JSON.stringify({ msg, code }));
                } else {
                    res.end(JSON.stringify({ sample, code }));
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ msg: 'Internal Server Error', code: 500 }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const port = 8000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});