/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	save: function(req, res) {
			if (req.body) {
					Notification.saveData(req.body, function(err, data) {
							if (err) {
									res.json({
											value: false,
											data: err
									});
							} else {
									res.json({
											value: true,
											data: data
									});
							}
					});
			} else {
					res.json({
							value: false,
							data: "Invalid Call"
					});
			}
	},
	getAll: function(req, res) {
    if (req.body) {
      if (req.body.user && req.body.user != "") {
        Notification.getAll(req.body, function(err, data) {
          if (err) {
            res.json({
              value: false,
              data: err
            });
          } else {
            res.json({
              value: true,
              data: data
            });
          }
        });
      } else {
        res.json({
          value: false,
          data: "Invalid Id"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Call"
      });
    }
  }
};
