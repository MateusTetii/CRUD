const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const vendaRoutes = require('./routes/vendaRoutes'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações de visualização
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

// Middleware de sessões
const sessionStore = new MySQLStore({}, require('./config/db').promise());

app.use(session({
    key: 'user_sid',
    secret: process.env.SESSION_SECRET, // Chave secreta
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { expires: 600000 } // Expira em 10 minutos
}));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Rotas
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/vendas', vendaRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
