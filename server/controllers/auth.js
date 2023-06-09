import User from '../models/user'
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");
const nanoid = require("nanoid");
// sendgrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.signup = async (req, res) => {
  // console.log("HIT SIGNUP", req.body);
  try {
    // validation
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);

    try {
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();

      // console.log("user saved in signup", user);

      // create signed token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // console.log(user);
      const { password, ...rest } = user._doc;
      return res.json({
        token,
        user: rest,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.signin = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

const nodemailer = require("nodemailer");

exports.forgotPassword = async (req, res) => {


  const { email } = req.body;
  // find user by email
  const user = await User.findOne({ email });
  console.log("USER ===> ", user);
  if (!user) {
    return res.json({ error: "User not found" });
  }
  // generate code
  const resetCode = nanoid(5).toUpperCase();
  // save to db
  user.resetCode = resetCode;
  user.save();
  // prepare email
  // const emailData = {
  //   from: process.env.EMAIL_FROM,
  //   to: user.email,
  //   subject: "Password reset code",
  //   html: "<h1>Your password  reset code is: {resetCode}</h1>",
  // };

  const emailData = {
    
    from: '"Aditya PasswordReset 👻" <amstu01@gmail.com>',
    to: email,
    subject: "Password reset code",
    text: `Your password  reset code is: ${resetCode}`,
    // html: "<html><body>Hello and welcome</body></html>",
}


          
  try {
      const transporter = nodemailer.createTransport({
          // name:process.env.HOST,
          host: process.env.HOST,
          service: process.env.SERVICE,
          port: 465,
          secure: true,
          // secureConnection: false,
          auth: {
              user: process.env.USER,
              pass: process.env.PASS,
          },
          
      });

      await transporter.sendMail(emailData, (error,info)=>{
        if (error) {
            console.log("sendmail" + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
      })
      
      console.log("email sent sucessfully");
      res.json({ ok: true });
      } catch (error) {
        console.log(error, "email not sent");
      res.json({ ok: false });
    }
};
        

  // // send email
  // try {
  //   const data = await sgMail.send(emailData);
  //   console.log(data);
  //   res.json({ ok: true });
  // } catch (err) {
  //   console.log(err);
  //   res.json({ ok: false });
  // }
// };

exports.resetPassword = async (req, res) => {
  try {
    const { email, password, resetCode } = req.body;
    // find user based on email and resetCode
    const user = await User.findOne({ email, resetCode });
    // if user not found
    if (!user) {
      return res.json({ error: "Email or reset code is invalid" });
    }
    // if password is short
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetCode = "";
    user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};


export const currentUser = async (req,res) =>{
  try{
    // const user = await User.findById(req.user._id);
    res.json({ok:true}); // we just wanted to match the user role on server instead of local storage so this line will be executed if the middleware in routes return true
  } catch(err){
    console.log(err)
  }

}