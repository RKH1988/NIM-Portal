const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const donorData = await Donor.findOne({ _id: context.donor._id })
          .select('-__v -password')
          .populate('thoughts')
          .populate('friends');

        return donorData;
      }

      throw new AuthenticationError('Not logged in');
    },
    donors: async () => {
      return Donor.find()
        .select('-__v -password')
        .populate('thoughts')
        .populate('friends');
    },
    donor: async (parent, { username }) => {
      return Donor.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    comments: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Comments.find(params).sort({ createdAt: -1 });
    },
    comment: async (parent, { _id }) => {
      return Comment.findOne({ _id });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const donor = await Donor.create(args);
      const token = signToken(donor);

      return { token, donor };
    },
    login: async (parent, { email, password }) => {
      const donor = await Donor.findOne({ email });

      if (!donor) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await donor.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, donor };
    },
    addThought: async (parent, args, context) => {
      if (context.user) {
        const comment = await Comment.create({ ...args, username: context.user.username });

        await Donor.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { comments: thought._id } },
          { new: true }
        );

        return comment;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addReaction: async (parent, { commentId, reactionBody }, context) => {
      if (context.user) {
        const updatedComment = await Comment.findOneAndUpdate(
          { _id: thoughtcomment { reactions: { reactionBody, username: context.donor.username } } },
          { new: true, runValidators: true }
        );

        return updatedComment;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.donor) {
        const updatedDonor = await Donor.findOneAndUpdate(
          { _id: context.donor._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedDonor;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;