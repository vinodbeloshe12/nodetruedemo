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
    status: {
        type: String,
        default: "Pending"
    },
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
    getAll: function(data, callback) {
        this.find({
                $or: [{
                    user: data.user
                }, {
                    user2: data.user
                }]
            },
            function(err, data) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(null, data);
                }
            });
    },
};
module.exports = _.assign(module.exports, model);
