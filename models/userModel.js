import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    userId: {
        type:Number,
        required: true,
      },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },

    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    
  },
  {
    timestamps: true,
  }
);



const Users = mongoose.model("Users", usersSchema);

export default Users;

