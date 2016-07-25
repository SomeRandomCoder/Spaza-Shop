var bcrypt = require('bcrypt');
var flash = require('express-flash');

module.exports = function(req, res, next) {

    req.getConnection(function(err, connection) {


        if (err)
            return next(err);

        var username = req.body.username;
        var password = req.body.password;
        var admin = "";
        var locked = "";



        if(req.body.admin === "on"){
          admin = "1";
        }
        else {
          admin = "0";
        }
        if(req.body.locked === "on"){
          locked = "1";
        }
        else {
          locked = "0";
        }
        var data = {
            username: req.body.username,
            admin: admin,
            locked: locked,

        };
        if(username.length <4 || password.length <4){
          req.flash('warning',"Username/Password cant be less than four characters");
          res.redirect("/signup");
        }
        else{
          req.getConnection(function(err, connection){
            if(err)
            return next(err);



                bcrypt.hash(password, 10, function(err, hash) {
                    data.password = hash;

                    connection.query('insert into users set ?', data, function(err, data) {
                         if (err) {
                            //  req.flash('warning username already exist');
                             res.redirect('/signup');
                         } else {
                            //  req.flash('success', "Thank you for registering, Now login");
                             res.redirect('/login');
                         }
            });
      });
    });

    }


});
};
