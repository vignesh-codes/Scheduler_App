//userModel.js
const { Int32 } = require('bson');
var mongoose = require('mongoose');

//schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    activation_code: {
        type: String,
        required: true,
        default: "null"
    },
    is_activated: {
        type: String,
        required: true,
        enum: ["Yes", "No"],
        default: "No"
    },
    age:{
        age: String
    },
    job_type:{
        job_type: String,
        enum: ["IT", "Self_Bussiness", "Student", "Teacher", "Other"],
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    push_notifications: {
        type: String,
        required: true,
        enum: ["yes", "no"],
        default: "no"
    },
    weekly_newsletters: {
        type: String,
        required:true,
        enum: ["yes", "no"],
        default: "yes"
    },
    
    schedules:{ 
        
        monday: {
            work_start_hours: String,
            work_end_hours: String,
            break_time_start: String,
            break_time_end: String,
            blocked_sites: [String],
            limited_sites: [{site: String, weekday_time_limit: String, weekend_time_limit: String}],
            required: false
        },
        tuesday: {
            work_start_hours: String,
            work_end_hours: String,
            break_time_start: String,
            break_time_end: String,
            blocked_sites: [String],
            limited_sites: [{site: String, weekday_time_limit: String, weekend_time_limit: String}],
            required: false,
            
        },
        wednesday: {
            work_start_hours: String,
            work_end_hours: String,
            break_time_start: String,
            break_time_end: String,
            blocked_sites: [String],
            limited_sites: [{site: String, weekday_time_limit: String, weekend_time_limit: String}],
            required: false
        },
        thursday: {
            work_start_hours: String,
            work_end_hours: String,
            break_time_start: String,
            break_time_end: String,
            blocked_sites: [String],
            limited_sites: [{site: String, weekday_time_limit: String, weekend_time_limit: String}],
            required: false
        },
        friday: {
            work_start_hours: String,
            work_end_hours: String,
            break_time_start: String,
            break_time_end: String,
            blocked_sites: [String],
            limited_sites: [{site: String, weekday_time_limit: String, weekend_time_limit: String}],
            required: false
        },
        saturday: {
            work_start_hours: String,
            work_end_hours: String,
            break_time_start: String,
            break_time_end: String,
            blocked_sites: [String],
            limited_sites: [{site: String, weekday_time_limit: String, weekend_time_limit: String}],
            required: false
        },
        sunday: {
            work_start_hours: String,
            work_end_hours: String,
            break_time_start: String,
            break_time_end: String,
            blocked_sites: [String],
            limited_sites: [{site: String, weekday_time_limit: String, weekend_time_limit: String}],
            required: false
        },
    },
    

},
    {
        timestamps: true
    },
    { typeKey: '$blocked_sites' }
);

// Export User Model
var User = module.exports = mongoose.model('user', userSchema);



module.exports.get = function (callback, limit) {
   User.find(callback).limit(limit); 
}



