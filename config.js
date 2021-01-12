// puerto

process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


process.env.CADUCIDAD = 60 * 60 * 24 * 30;

process.env.SEED = process.env.SEED || 'este-es-seed';



let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://admin:admin@cluster0.qqqgz.mongodb.net/cafe';
}


process.env.urlDB = urlDB;