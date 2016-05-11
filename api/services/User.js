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
var Sample = mongoose.model("User", schema);
var model = {
    saveData: function(data, callback) {
        var user = this(data);
        this.findOne({
            contact: data.contact
        }, function(err, found) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                // callback(null, data2);
                if (_.isEmpty(found)) {
                    user.save(function(err, data2) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else {
                            callback(null, data2);
                        }
                    });
                } else {
                    callback(null, found);
                }
            }
        });
    },
    getOne: function(data, callback) {
        User.findOne({
            _id: data._id
        }).populate("contacts.user").exec(callback);
    },


    saveContacts: function(data, callback) {
        if (data.contacts && data.contacts.length > 0) {
            var i = 0;
            var contactarr = [];

            function callme(num) {
                var abc = data.contacts[num];
                User.saveData(abc, function(err, data4) {
                    if (err) {
                        console.log(err);
                    } else {
                        contactarr.push({
                            name: data4.name,
                            user: data4._id
                        });
                    }
                    num++;
                    if (num == data.contacts.length) {
                        User.editProfile({
                            _id: data._id,
                            contacts: contactarr
                        }, function(err, saveres) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else {
                                callback(null, {
                                    message: "contacts inserted"
                                });
                            }
                        });
                    } else {
                        callme(num);
                    }

                });
            }
            callme(0);

        } else {
            callback(null, {
                message: "contacts not found"
            })
        }
    },

    editProfile: function(data, callback) {
      delete data.contact;
        data.modificationDate = new Date();
        this.findOneAndUpdate({
            _id: data._id
        }, data, function(err, data2) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, {
                    message: "user updated"
                });
                // callback(null, data2);
            }
        });
    }
};
module.exports = _.assign(module.exports, model);
