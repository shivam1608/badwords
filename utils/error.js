/**
 * Simple Error Handler
 */

const { NODE_ENV } = require("../config");
 module.exports = (err, req, res, next) => {
   if (NODE_ENV === "production") {
     if (err instanceof TypeError) {
       res.status(400).send({
         error: true,
         message: "🤦‍♂️ schema of request body don't match check the docs.",
       });
       return;
     }
     res.status(500).send({ error: true, message: "🌋internal server error" });
   }
   next(err);
 };