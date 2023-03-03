//TODO: seeds script should come here, so we'll be able to put some data in our local env
var mongoose = require("mongoose");

if (!process.env.MONGODB_URI) {
    console.warn("Missing MONGODB_URI in env, please add it to your .env file");
}
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);

require("../models/User");
require("../models/Item");
require("../models/Comment");


var Item = mongoose.model("Item");
var Comment = mongoose.model("Comment");
var User = mongoose.model("User");


seed();

function seed() {

    User.findOne({ username: 'rg' }).then(function(user){ 
        const items = generateItems(user);
        Item.insertMany(items);
    });
}

function generateItems(user) {
    const items = [];
  
    for (let i = 1; i <= 100; i++) {
      const slug = `item-${i}`;
      const title = `Item ${i}`;
      const description = `This is item ${i}`;
      const image = `https://example.com/item-${i}.jpg`;
      const favoritesCount = Math.floor(Math.random() * 100);
      const comments = [];
      const tagList = ['tag1', 'tag2', 'tag3'];
      const sellerId = user;
  
      const item = new Item({
        slug,
        title,
        description,
        image,
        favoritesCount,
        comments,
        tagList,
        seller: sellerId
      });
  
      items.push(item);
    }
  
    return items;
  }