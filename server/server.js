require('dotenv').config();

const express = require('express');

const environment = process.env.NODE_ENV || 'development';

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Autorization');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', '*');

  return next();
});

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

// swagger
if (environment === 'development') {
  const swagger = require('express-swagger-generator')(app);

  let options = {
    swaggerDefinition: {
      info: {
        description: 'Olufy Jeweal - API',
        title: 'Olufy Jeweal - API',
        version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '/',
      produces: [
        "application/json",
        "application/xml"
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: "",
        }
      }
    },
    basedir: __dirname,
    files: [
      '../models/**/*.js',
      './routes/**/*.js'
    ]
  };

  swagger(options);
}

// error 404
app.use((req, res) => {
  res
    .status(404)
    .send({
      error: 'Not found',
      path: req.url
    });
});

app.listen(process.env.PORT || '3000', () => {
  console.log(`Server is running on port: ${process.env.PORT || '3000'}`);

  if (environment === 'development') {
    console.log(`Swagger UI: http://localhost:${process.env.PORT || '3000'}/api-docs`);
  }
});
