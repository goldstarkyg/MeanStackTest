var Location = require('./models/location');



function getLocations(res) {
    Location.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all locations in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all location
    app.get('/api/location', function (req, res) {
        // use mongoose to get all locations in the database
        getLocations(res);
    });

    // create location and send back all location after creation
    //image_src:      req.body.image_src,
    app.post('/api/location', function (req, res) {
        // create a location, information comes from AJAX request from Angular
        Location.create({
            user_id:        req.body.user_id,
            user_name:      req.body.user_name,
            min_distance:   req.body.min_distance,
            max_distance:   req.body.max_distance,
            image_src:      req.body.image_src,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the location after you create another
            getLocations(res);
        });

    });

    //update a location
    app.put('/api/location/:loation_id', function(req, res, next) {
        Location.put({
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            min_distance: req.body.min_distance,
            max_distance: req.body.max_distance,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the location after you create another
            getLocations(res);
        });
    });

    // delete a location
    app.delete('/api/location/:location_id', function (req, res) {
        Location.remove({
            _id: req.params.location_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getLocations(res);
        });
    });

    // application -------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file
    });

};
