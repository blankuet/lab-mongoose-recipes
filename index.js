const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const recipes = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((response) => {
    console.log(response);
    return Recipe.create({title: "Pesto italian Pasta", cuisine: "italian"})
  })
  .then(data => {
    console.log(data);
    return Recipe.insertMany(recipes)
  })
  .then(data => {
    data.forEach((element) => console.log(element.title));
    const filter = { title: 'Rigatoni alla Genovese' };
    const update = { duration: 100 };
    return Recipe.findOneAndUpdate(filter, update)
  })  
  .then(data => {
    console.log(`Success! ${data.title} updated`);
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(data => {
    console.log(`Deleted entry ${data.title}`); //PREGUNTAR EN CLASE
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.disconnect()
    console.log('Disconnected from the database');
    
  })
