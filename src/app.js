const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger');
const userRoutes = require('./routes/userRoutes');

const app = express();
const prisma = new PrismaClient(); 
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await prisma.$connect(); 
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
});

module.exports = app;
