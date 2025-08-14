import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from './models/user.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/read', async (req, res) => {
    try {
        const users = await User.find();
        res.render('read', { users }); // Pass data to EJS template
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Failed to fetch users' });
    }
});


app.post('/create', async (req, res) => {
    try {
        const { name, email, imageUrl } = req.body;
        const createdUser = await User.create({ name, email, imageUrl });
        res.redirect('/read');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ error: 'Failed to create user' });
    }
});

app.get('/edit/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");
        res.render('update', { user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ error: 'Failed to fetch user' });
    }
});

app.post('/update/:id', async (req, res) => {
    try {
        const { name, email, imageUrl } = req.body;
        await User.findByIdAndUpdate(req.params.id, { name, email, imageUrl });
        res.redirect('/read');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ error: 'Failed to update user' });
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/read');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ error: 'Failed to delete user' });
    }
});



app.listen(3000, () => {
    console.log(`App is listening on http://localhost:3000`);
})