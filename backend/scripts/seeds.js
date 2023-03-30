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
  preCleenAllData();
  seedUsers();
  seedItems();
  seedComments();
    
}

function preCleenAllData() {
  Comment.deleteMany({}).then();;
  Item.deleteMany({}).then();
  User.deleteMany({username: {$ne: "rg"}}).then();
}

function seedUsers() {
  const users = generateUsers();
  User.insertMany(users);
}

function generateUsers() {
  const users = []

  const username = `defUser`;
  const email = `defUser@email.com`;
  const bio = `defUser-bio`;
  const image = `https://example.com/defUser.jpg`;

  const user = new User({
    username,
    email,
    bio,
    image
  });

  users.push(user);

  for (let i = 1; i <= 99; i++) {
    const username = `usertemp${i}`;
    const email = `usertemp${i}@email.com`;
    const bio = `usertemp${i}-bio`;
    const image = `https://example.com/usertemp.jpg`;
    
    const user = new User({
      username,
      email,
      bio,
      image
    });

    users.push(user);
  } 

  return users;
}

function seedItems() {
  User.findOne({ username: 'defUser' }).then(function(user) { 
    const items = generateItems(user);
    Item.insertMany(items);
});
}

function generateItems(user) {
    const items = [];
  
    const slug = `defItem`;
    const title = `defItem`;
    const description = `This is defItem`;
    const image = `https://example.com/defItem.jpg`;
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

    for (let i = 1; i <= 99; i++) {
      const slug = `item-temp-${i}`;
      const title = `Item-temp-${i}`;
      const description = `This is item-temp-${i}`;
      const image = `https://example.com/item-temp-${i}.jpg`;
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

function seedComments() {
  User.findOne({ username: 'defUser' }).then(function(user) { 
    Item.findOne({ slug: 'defItem' }).then(function(item) {
      const comments = generateComments(user, item);
      Comment.insertMany(comments);
    });
  });
}

function generateComments(user, tItem) {
  const comments = [];
  
  for (let i = 1; i <= 100; i++) {
    const body = `new comment ${i}`;
    const item = tItem;
    const seller = user;

    var comment = new Comment({
      body,
      seller,
      item
    });

    comments.push(comment);
  }

  return comments;
}