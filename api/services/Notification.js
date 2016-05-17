/**
 * Notification.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new Schema({
    type: String,
    user: String,
    user2: String,
    status: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Notification", schema);
var model = {
    saveData: function(data, callback) {
        var notification = this(data);
        notification.save(function(err, data) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },
    getOne: function(data, callback) {
        this.findOne({
            _id: data._id
        }, function(err, data2) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, data2);
            }
        });
    },
};
module.exports = _.assign(module.exports, model);
