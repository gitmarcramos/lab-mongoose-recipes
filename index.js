const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    async function handleDB() {
      // create
      try {
        await Recipe.create({
          title: "Sushis",
          level: "Easy Peasy",
          ingredients: ["fish", "fhisherman"],
          cuisine: "japan",
          dishType: "main_course",
        });
      } catch {
        console.log("Recipe create not working");
      }

      // insert many
      try{
        await Recipe.insertMany(data);
        data.forEach((recipe) => {
          console.log(`${recipe.title} added to DB`);
        });
      } catch {
        console.log("Insert many not working");
      }

      // update one
      try{
        await Recipe.updateOne(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        )
      } catch {
        console.log('Update one not working')
      }

      // delete one
      try{
        await Recipe.deleteOne({ title: "Carrot Cake" });
      } catch {
        console.log('DeleteOne not working')
      } 
    }
    handleDB();
  })



  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

  // mongoose.connection.close()