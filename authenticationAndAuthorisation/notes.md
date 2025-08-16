
---

```markdown
# 🔐 Authentication, Authorization, Cookies, Sessions, and Tokens

## 📌 Authentication vs Authorization

| Concept         | Description                                                                 | Example in GitHub |
|----------------|-----------------------------------------------------------------------------|-------------------|
| **Authentication** | Verifying who the user is.                                                   | GitHub login via username/password or OAuth |
| **Authorization**  | Determining what the authenticated user is allowed to do.                   | Only repo owner can delete a repository |

---

## 🍪 Cookies, 🗂️ Sessions, and 🔑 Tokens

### 1. Cookies
- Stored on the client (browser).
- Used to store session IDs or JWTs.
- Sent automatically with each request to the same domain.

```js
res.cookie('session_id', 'abc123', { httpOnly: true, secure: true });
```

---

### 2. Sessions
- Server-side storage of user data.
- Session ID stored in a cookie.

```js
req.session.user = { id: '123', username: 'gaurav' };
```

---

### 3. Tokens (JWT)
- Stateless, stored client-side.
- Encodes user info and expiration.

**Example JWT Payload:**
```json
{
  "userId": "123",
  "role": "admin",
  "exp": 1699999999
}
```

---

## 🔄 Access Token vs Refresh Token

| Token Type      | Purpose                                  | Lifespan | Stored Where?         |
|-----------------|-------------------------------------------|----------|------------------------|
| **Access Token** | Used to access protected resources         | Short    | Cookie / localStorage  |
| **Refresh Token**| Used to obtain new access tokens           | Long     | HttpOnly Cookie / DB   |

---

## 🧪 Example Usage in GitHub-style App

### 🔐 Login Route
```js
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !user.verifyPassword(req.body.password)) {
    return res.status(401).send('Invalid credentials');
  }

  const accessToken = jwt.sign({ userId: user.id }, ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, { expiresIn: '7d' });

  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.json({ accessToken });
});
```

---

### 🛡️ Protected Route
```js
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/repos', authenticateToken, async (req, res) => {
  const repos = await Repo.find({ owner: req.user.userId });
  res.json(repos);
});
```

---

### 🔄 Refresh Token Route
```js
app.post('/refresh-token', (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = jwt.sign({ userId: user.userId }, ACCESS_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  });
});
```

---

## 🧠 Best Practices

- ✅ Use **HttpOnly cookies** for refresh tokens to prevent XSS.
- ✅ Store access tokens in memory or localStorage (with caution).
- ✅ Implement **role-based authorization** (e.g., admin vs contributor).
- ✅ Use **middleware** to verify access tokens on protected routes.
- ✅ Rotate refresh tokens on each use to prevent replay attacks.

