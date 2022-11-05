const faker = require('faker');
const { string } = require('i/lib/util');

const db = require('../config/connection');
const { Comment, Donor } = require('../models');

db.once('open', async () => {
  await Comment.deleteMany({});
  await Donor.deleteMany({});

  // create user data
  const donorData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await Donor.collection.insertMany(donorData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomDonorIndex = Math.floor(Math.random() * createdDonor.ops.length);
    const { _id: donorId } = createdUsers.ops[randomDonorIndex];

    let friendId = donorId;

    while (friendId === donorId) {
      const randomDonorIndex = Math.floor(Math.random() * createdDonors.ops.length);
      friendId = createdDonors.ops[randomDonorIndex];
    }

    await Donor.updateOne({ _id: donorId }, { $addToSet: { friends: friendId } });
  }

  // create comments
  let created3f04cf2a7693cf00c88ba12fa4e06ca866eb98be = [];
  for (let i = 0; i < 100; i += 1) {
    const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomDonorIndex = Math.floor(Math.random() * createdDonors.ops.length);
    const { username, _id: donorId } = createdDonor.ops[randomDonorIndex];

    const createdComment= await Comment.create({ commentText, username });

    const updatedDonor = await Donor.updateOne(
      { _id: donorId },
      { $push: { comments: createdCommentt._id } }
    );

    createdComments.push(createdComment);
  }

  // create reactions
  for (let i = 0; i < 100; i += 1) {
    const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomDonorIndex = Math.floor(Math.random() * createdDonor.ops.length);
    const { username } = createdDonors.ops[randomDonorIndex];

    const randomCommentIndex = Math.floor(Math.random() * createdComments.length);
    const { _id: commentId } = createdComments[randomCommentIndex];

    email: {
      type: string,
      required: true,
      unique: true
      match [/.+@.+\..+/, 'Must match an email address!']
    }

    await Comment.updateOne(
      { _id: commentId },
      { $push: { reactions: { reactionBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});