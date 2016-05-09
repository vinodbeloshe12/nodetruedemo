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
    image: String,
    gender: String,
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
    profession: [String],
    company: String,
    facebook: String,
    google: String,
    twitter: String,
    otp: {
        type: String,
        default: (Math.random() + "").substring(2, 8)
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    modificationDate: Date
});
module.exports = mongoose.model("User", schema);
var model = {
    saveData: function(data, callback) {
        var user = this(data);
        if (data._id) {
          data.modificationDate = new Date();
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
    getOne: function(data, callback) {
        User.findOne({
            _id: data._id
        }).populate("contacts.user").exec(callback);
    },

    getNumber: function(data, callback) {
        User.findOne({
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
