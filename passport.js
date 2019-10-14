const passport = require("passport");
const UserModel = require("./model/userdb");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "userpassword"
    },
    function(username, userpassword, cb) {
      return UserModel.findOne({
        where: {
          username: username,
          userpassword: userpassword
        }
      })
        .then(user => {
          if (!user) {
            return cb(true, null, { message: "Incorrect email or password." });
          }
          return cb(false, user.dataValues, {
            message: "Logged In Successfully"
          });
        })
        .catch(err => cb(err));
    }
  )
);
var opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'thienbao';
passport.use(new JWTStrategy(opts,
function (jwtPayload, cb) {
    console.log("------------");
    console.log(opts);
    
    //find the user in db if needed
    return UserModel.findOne({
        where: {
        id:jwtPayload.id,
    }})
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));

module.exports = passport;
