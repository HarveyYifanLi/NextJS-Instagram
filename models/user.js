import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 6-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});
// due to the fact that serverless routes are run everytime when it is called
// we need to make sure we check if a certain model (i.e. User) already exists in the models object, only create one if NOT exists
const User = models.User || model("User", UserSchema);

export default User;