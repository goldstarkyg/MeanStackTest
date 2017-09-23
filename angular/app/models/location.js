var mongoose = require('mongoose');

module.exports = mongoose.model('Location', {
    user_id: {
        type: String,
        default: ''
    },
    user_name: {
        type: String,
        default: ''
    },
    min_distance: {
        type: String,
        default: ''
    },
    max_distance: {
        type: String,
        default: ''
    },
    image_src: {
        type: String,
        default:''
    }
});