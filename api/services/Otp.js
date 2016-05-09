/**
 * Otp.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 var mongoose = require("mongoose");
 var Schema = mongoose.Schema;
 var schema = new Schema({
     contact: String,
     otp: String,
     timestamp: {
         type: Date,
         default: Date.now
     }
   });
   module.exports = mongoose.model("Otp", schema);
   var model = {
       saveData: function(data, callback) {
           var otp = this(data);
          //  if (data._id) {
          //    data.modificationDate = new Date();
          //      this.findOneAndUpdate({
          //          _id: data._id
          //      }, data, function(err, data2) {
          //          if (err) {
          //              console.log(err);
          //              callback(err, null);
          //          } else {
          //              callback(null, data2);
          //          }
          //      });
          //  } else {
 otp.otp = (Math.random() + "").substring(2, 8);
               otp.save(function(err, data2) {
                   if (err) {
                       console.log(err);
                       callback(err, null);
                   } else {
                       callback(null, data2);
                   }
               });
          //  }
       },

           getNumber: function(data, callback) {
               otp.findOne({
                   contact: data.contact
               }, function(err, data2) {
                   if (err) {
                       console.log(err);
                       callback(err, null);
                   } else {
                       if (data2 == null) {
                           // console.log("no data");
                           User.saveData(data, function(err, data3) {
                               if (err) {
                                   console.log(err);
                                   callback(err, null);
                               } else {
                                   callback(err, data3);
                               }
                           });

                       } else {
                           callback(null, data2);
                       }


                   }
               });
           },
     };
     module.exports = _.assign(module.exports, model);
