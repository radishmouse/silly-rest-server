
module.exports = function (router, Model, modelName) {
    'use strict';

    // Routes for adding to and retrieving collections
    router.route('/' + modelName + 's')
        .post(function (req, res) {
            var model = new Model();
            var data = req.body[modelName];

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    model[key] = data[key];
                }
            }
            model.save(function (err) {
                if (err) {
                    return res.send(err);
                }
                var key = modelName;
                var obj = {};
                obj[key] = model;
                console.log(model);
                return res.json(obj);
            });
        })
        .get(function (req, res) {
            Model.find(function (err, models) {
                var key = (modelName + 's');
                var payload = {};
                payload[key] = models;

                if (err) {
                    res.send(err);
                }

                res.json(payload);
            });
        });

    // Routes for a single model
    router.route('/' + modelName + 's/:id')
        .get(function (req, res) {
            console.log(req.params);
            Model.findById(req.params.id, function (err, model) {
                if (err) {
                    res.send(err);
                }
                var key = (modelName);
                var payload = {};
                payload[key] = model;
                // console.log(payload);
                res.json(payload);
            });
        })
        .put(function (req, res) {
            Model.findById(req.params.id, function (err, model) {
                if (err) {
                    res.send(err);
                }
                var modelNameKey = modelName;

                for (var key in req.body[modelNameKey]) {
                    if (req.body[modelNameKey].hasOwnProperty(key)) {
                        model[key] = req.body[modelNameKey][key];
                    }
                }
                console.log(req.body[modelNameKey]);
                model.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    var key = (modelName);
                    var payload = {};
                    payload[key] = model;
                    payload.message = modelName + ' updated';
                    res.json(payload);
                });
            });
        })
        .delete(function (req, res) {
            Model.remove({
                _id: req.params.id
            }, function (err, model) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted ' + modelName + ' ' + req.params.id });
            });
        });
};


