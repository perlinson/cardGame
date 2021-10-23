

const bcrypt = require('bcryptjs')
const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.postSignin = async (req, res, next) => {
  const { fullname, email, password } = req.body
  try {
    const existUser = await UserModel.findOne({ email: email, decks: [] })
    if (existUser) {
      const error = new Error(
        "Eamil already exist, please pick another email!"
      );
      res.status(409).json({
        error: "Eamil already exist, please pick another email! ",
      });
      error.statusCode = 409;
      throw error;
    }

    console.log(password)

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new UserModel({
      fullname: fullname,
      email: email,
      password: hashedPassword
    })

    const result = await user.save()
    res.status(200).json({
      message: "User created",
      user: { id: result._id, email: result.email },
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

let loadUser;
exports.postLogin = async (req, res, next) => {
  // const { email, password } = req.body;
  // try {
  //   const user = await UserModel.findOne({ email: email })
  //   if (!user){
  //     const error = new Error("user with this email not found!");
  //   error.statusCode = 401;
  //   throw error;
  //   }

  //   loadUser = user
  //   const comparePassword = bcrypt.compare(password, user.password)
  //   if(comparePassword){
  //     const error = new Error("password is not match!");
  //     error.statusCode = 401;
  //     throw error;
  //   }

  //   const token = jwt.sign({email: loadUser.email}, 'expressnuxtsecret', {
  //     expiresIn : '20m'
  //   })

  //   res.status(200).json({ token: token });



  // } catch (err) {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // }

  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email }).populate('decks');

    if (!user) {
      const error = new Error("user with this email not found!");
      error.statusCode = 401;
      throw error;
    }
    loadUser = user;

    const comparePassword = bcrypt.compare(password, user.password);

    if (!comparePassword) {
      const error = new Error("password is not match!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ email: loadUser.email }, process.env.SECRET_KEY, {
      expiresIn: "20m",
    });
    console.log(loadUser)
    res.status(200).json({ token: token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getUser =  (req, res, next) => {
  console.log('loaduser value',loadUser)

  res.status(200).json({
    user: {
      fullname: loadUser.fullname,
      email: loadUser.email
    }
  })
}