import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Failed to read directory');
        }
        res.render('index', { files:files });
    });
});

app.post('/create', (req, res) => {
    const { title, detail } = req.body;
    const safeTitle = title.replace(/[^a-zA-Z0-9-_]/g, '_');
    fs.writeFile(`./files/${safeTitle}.txt`, detail, (error) => {
        if (error) {
            console.log(error);
            return res.status(500).send(`Task creation failed: ${error}`);
        }
        res.redirect('/');
    });
});

app.get('/readmore/:name', (req, res) => {
    const filename = req.params.name;
    fs.readFile(`./files/${filename}`, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send(`Failed to read file: ${err}`);
        }
        res.render('readmore', { title: filename, detail: data });
    });
});

app.post('/delete/:name', (req, res) => {
    const filename = req.params.name;
    fs.unlink(`./files/${filename}`, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send(`Failed to delete file: ${err}`);
        }
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log(`App is listening on http://localhost:3000`);
});