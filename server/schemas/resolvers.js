
const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')

                return userData
            }
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
          },
          saveBook: async (parent, { input }, context) => {
              if (context.user) {
                  const editedUser = await User.findOneAndUpdate(
                      { _id: context.user._id },
                      { $push: { savedBooks: input } },
                      { new: true, runValidators: true }
                  );
                  return editedUser;
              }
              throw new AuthenticationError('Incorrect credentials');
          }
    }

}

module.exports = resolvers;