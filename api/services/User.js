/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new Schema({
  name: String,
  email: [String],
  contact: String,
  dob: Date,
  marriage: Date,
  url: String,
  address: String,
  contacts: {
    type: [{
      name: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }],
    index: true
  },
  proffesion: [String],
  otp: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("User", schema);
var model = {
  saveData: function(data, callback) {
    var user = this(data);
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data, function(err, data2) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, data2);
        }
      });
    } else {
      user.save(function(err, data2) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, data2);
        }
      });
    }
  },
  getOne:function(data,callback){
    User.findOne({
      _id:data._id
    }).populate("contacts.user").exec(callback);
  }
};
module.exports = _.assign(module.exports, model);
