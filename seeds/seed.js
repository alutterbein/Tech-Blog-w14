const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Posts.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
for (const comment of commentsData) {
  await Comments.create({
    ...comment,
    user_id: users[Math.floor(Math.random() * users.length)].id,
    post_id: postData[Math.floor(Math.random() * postData.length)].id,
  })
}
  process.exit(0);
};

seedDatabase();
