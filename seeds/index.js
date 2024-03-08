const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '65e05460be7ccb3b2dec9b71',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
              type: "Point",
              coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dveemjzod/image/upload/v1709374009/YelpCamp/neodbo4vslnhfwcqtuxa.jpg',
                  filename: 'YelpCamp/neodbo4vslnhfwcqtuxa',
                },
                {
                  url: 'https://res.cloudinary.com/dveemjzod/image/upload/v1709374010/YelpCamp/cdarmb6wn5dtqppsqk6g.jpg',
                  filename: 'YelpCamp/cdarmb6wn5dtqppsqk6g',
                }
              ],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias libero hic voluptate fuga. Consequatur eaque iusto sapiente quod doloribus? Quidem, unde. Numquam aspernatur maxime, aliquam ipsum voluptas sit iste dolor.',
            price
        });
        
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});