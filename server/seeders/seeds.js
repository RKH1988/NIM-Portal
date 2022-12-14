const faker = require('faker');
const userSeeds = require('./userSeed.json');
const CommentSeeds = require('./commentSeed.json');
const db = require('../config/connection');
const { Comment, User } = require('../models');

db.once('open', async () => {
  try {
  await Comment.deleteMany({});
  await User.deleteMany({});

  await User.create(userSeeds);

  for (let i = 0; i < CommentSeeds.length; i++) {
    const { _id, commentAuthor } = await Comment.create(CommentSeeds[i]);
    const user = await User.findOneAndUpdate(
      { username: commentAuthor },
      {
        $addToSet: {
          comments: _id,
        },
      }
    );
  }
  // create user data
//   // const userData = [];

//   // for (let i = 0; i < 50; i += 1) {
//   //   const username = faker.internet.userName();
//   //   const email = faker.internet.email(username);
//   //   const password = faker.internet.password();

//   //   userData.push({ username, email, password });
//   // }

//   // const createdUsers = await User.collection.insertMany(userData);

//   // create friends
//   for (let i = 0; i < 100; i += 1) {
//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { _id: userId } = createdUsers.ops[randomUserIndex];

//     let friendId = userId;

//     while (friendId === userId) {
//       const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//       friendId = createdUsers.ops[randomUserIndex];
//     }

//     await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
//   }

//   // create comments
//   let created3f04cf2a7693cf00c88ba12fa4e06ca866eb98be = [];
//   for (let i = 0; i < 100; i += 1) {
//     const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { username, _id: userId } = createdUsers.ops[randomUserIndex];

//     const createdComment= await Comment.create({ commentText, username });

//     const updatedUser = await User.updateOne(
//       { _id: userId },
//       { $push: { comments: createdComment._id } }
//     );

//     createdComment.push(createdComment);
//   }

//   // create reactions
//   for (let i = 0; i < 100; i += 1) {
//     const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { username } = createdUsers.ops[randomUserIndex];

//     const randomCommentIndex = Math.floor(Math.random() * createdComments.length);
//     const { _id: commentId } = createdComments[randomCommentIndex];

//     await Comment.updateOne(
//       { _id: commentId },
//       { $push: { reactions: { reactionBody, username } } },
//       { runValidators: true }
//     );
//   }
 }
catch (err) {
  console.error(err);
  process.exit(1);
}


  console.log('all done!');
  process.exit(0);
});