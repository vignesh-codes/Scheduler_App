//userController.js
//Import User Model
const e = require('express');
var validator = require('validator');

User = require('../models/userModel');
//For index
exports.index = function (req, res) {
    User.get(function (err, user) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.status(200).json({
            status: 200,
            status: "success",
            message: "Got User Successfully!",
            data: user       
        });
    });
};


//For creating new user
exports.add = function (req, res) {
    if (!validator.isEmail(req.body.email)){
        res.status(300).json({
            status: 300,
            message: "Error, Enter a valid email address"
        })
    }
    else if(!validator.isMobilePhone(req.body.phone)){
        res.status(300).json({
            status: 300,
            message: "Error, Enter a Valid Phone Number"
        })
    }
    else{
        var user = new User();
        user.name = req.body.name? req.body.name: user.name;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.location = req.body.location;
        user.job_type = req.body.job_type;
    }
//Save and check error
    user.save()
    
    .then(user => res.status(200).json({
        status: 200,
        message: "New User Added!",
        data: user
    }))
    .catch(err=> res.status(500).json({
        status: 500,
        message: "Error Creating the User",
        err_msg: err.message
    }))
}


//Add Work Schedule for a User
exports.addWork = function (req, res){
    User.findById(req.params.user_id, function(err, user){
        console.log(req.body)
        if (err){
            return res.status(500).json({
                status: 500,
                message: "User Not Found",
                data: err
        })}
        
        // Check if the vaild body exist
        else{
            day = req.body.day
            if (req.body.work_start_hours && req.body.work_end_hours){

                for (i in day){
                    
                    if (day[i] === "monday"){
                        user.schedules.monday.work_start_hours = req.body.work_start_hours,
                        user.schedules.monday.work_end_hours = req.body.work_end_hours

                    }
                    if (day[i] === "tuesday"){
                        user.schedules.tuesday.work_start_hours = req.body.work_start_hours,
                        user.schedules.tuesday.work_end_hours = req.body.work_end_hours

                    }
                    if (day[i] === "wednesday"){
                        user.schedules.wednesday.work_start_hours = req.body.work_start_hours,
                        user.schedules.wednesday.work_end_hours = req.body.work_end_hours

                    }
                    if (day[i] === "thursday"){
                        user.schedules.thursday.work_start_hours = req.body.work_start_hours,
                        user.schedules.thursday.work_end_hours = req.body.work_end_hours

                    }
                    
                    if (day[i] === "friday"){
                        user.schedules.friday.work_start_hours = req.body.work_start_hours,
                        user.schedules.friday.work_end_hours = req.body.work_end_hours

                    }
                    if (day[i] === "saturday"){
                        user.schedules.saturday.work_start_hours = req.body.work_start_hours,
                        user.schedules.saturday.work_end_hours = req.body.work_end_hours

                    }
                    if (day[i] === "sunday"){
                        user.schedules.sunday.work_start_hours = req.body.work_start_hours,
                        user.schedules.sunday.work_end_hours = req.body.work_end_hours

                    }

            }

            
            
}
    // Check if the valid body exist
    if (req.body.break_time_start && req.body.break_time_end){

        for (i in day){
            
            if (day[i] === "monday"){
                user.schedules.monday.break_time_start = req.body.break_time_start,
                user.schedules.monday.break_time_end = req.body.break_time_end

            }
            if (day[i] === "tuesday"){
                user.schedules.tuesday.break_time_start = req.body.break_time_start,
                user.schedules.tuesday.break_time_end = req.body.break_time_end

            }
            if (day[i] === "wednesday"){
                user.schedules.wednesday.break_time_start = req.body.break_time_start,
                user.schedules.wednesday.break_time_end = req.body.break_time_end

            }
            if (day[i] === "thursday"){
                user.schedules.thursday.break_time_start = req.body.break_time_start,
                user.schedules.thursday.break_time_end = req.body.break_time_end

            }
            
            if (day[i] === "friday"){
                user.schedules.friday.break_time_start = req.body.break_time_start,
                user.schedules.friday.break_time_end = req.body.break_time_end

            }
            if (day[i] === "saturday"){
                user.schedules.saturday.break_time_start = req.body.break_time_start,
                user.schedules.saturday.break_time_end = req.body.break_time_end

            }
            if (day[i] === "sunday"){
                user.schedules.sunday.break_time_start = req.body.break_time_start,
                user.schedules.sunday.break_time_end = req.body.break_time_end

            }

        }
        
    }
        // Save the updated objects
        user.save()
            .then(user => res.status(200).json({
                status: 200,
                message: "Work Hours Updated",
                data: user
            }))
            .catch(err=> res.status(500).json({
                status: 500,
                message: "Error Updating Work Hours",
                err_msg: err.message
        }))
        }
    }) 
    
}

// Add Limited Hours alone for certain App
exports.addLimited = function (req, res) {
    User.findById(req.params.user_id, function(err, user){
        if (err){
            res.status(500).json({
                status: 500,
                message: "User Not Found",
                data: err
        })}
        else{
        day = req.body.day
        var time_limit_dict = {
            site: req.body.site, weekday_time_limit: req.body.weekday_time_limit, weekend_time_limit: req.body.weekend_time_limit
        }
        for (i in day){
            console.log("NEW", day[i])
            if (req.body.day[i] === "monday"){
                
                user.schedules.monday.limited_sites.push(time_limit_dict)
                
            }
        
            else if (req.body.day[i] === "tuesday"){
                user.schedules.tuesday.limited_sites.push(time_limit_dict)
                
            }
        
            else if (req.body.day[i] === "wednesday"){
                user.schedules.wednesday.limited_sites.push(time_limit_dict)
                
            }      
        
            else if (req.body.day[i] === "thursday"){
                user.schedules.thursday.limited_sites.push(time_limit_dict)
                
            }
            else if (req.body.day[i] === "friday"){
                user.schedules.friday.limited_sites.push(time_limit_dict)
                
            }
            else if (req.body.day[i] === "saturday"){
                user.schedules.saturday.limited_sites.push(time_limit_dict)
                
            }
            else if (req.body.day[i] === "sunday"){
                user.schedules.sunday.limited_sites.push(time_limit_dict)      
        }
    }
        user.save()
            .then(user => res.status(200).json({
                status: 200,
                message: "Limited Hours for Blocked Apps Updated",
                data: user
            }))
            .catch(err=> res.status(500).json({
                status: 500,
                message: "Error Updating Limited Hours",
                err_msg: err.message
        }))
    }
    
        
            console.log(day[i]) 
        
    })
}


// Add Apps to be blocked for a user
exports.addApp = function(req, res) {
    User.findById(req.params.user_id, function (err, user){
        var time_limit_dict = {
            site: req.body.site, weekday_time_limit: "1 hr", weekend_time_limit: "2 hr"
        }
        if (err){
            res.status(500).json({
                status: 500,
                message: "User Not Found",
                data: err
        })}
        else{
        bsites = req.body.site

        for (i in req.body.day){
            if (req.body.day[i] === "monday"){
                    
                
                current = user.schedules.monday.blocked_sites
                if (current.indexOf(bsites) === -1) current.push(bsites);
                user.schedules.monday.limited_sites.push(time_limit_dict)
            }
            else if (req.body.day[i] === "tuesday"){
                    
                
                current = user.schedules.tuesday.blocked_sites
                if (current.indexOf(bsites) === -1) current.push(bsites);
                user.schedules.tuesday.limited_sites.push(time_limit_dict)
            }
            else if (req.body.day[i] === "wednesday"){
                    
                
                current = user.schedules.wednesday.blocked_sites
                if (current.indexOf(bsites) === -1) current.push(bsites);
                user.schedules.wednesday.limited_sites.push(time_limit_dict)
            }
            else if (req.body.day[i] === "thursday"){
                    
                
                current = user.schedules.thursday.blocked_sites
                if (current.indexOf(bsites) === -1) current.push(bsites);
                user.schedules.thursday.limited_sites.push(time_limit_dict)
            }
            else if (req.body.day[i] === "friday"){
                    
                
                current = user.schedules.friday.blocked_sites
                if (current.indexOf(bsites) === -1) current.push(bsites);
                user.schedules.friday.limited_sites.push(time_limit_dict)
            }
            else if (req.body.day[i] === "saturday"){
                    
                
                current = user.schedules.saturday.blocked_sites
                if (current.indexOf(bsites) === -1) current.push(bsites);
                user.schedules.saturday.limited_sites.push(time_limit_dict)
            }
            else if (req.body.day[i] === "sunday"){
                    
                
                current = user.schedules.sunday.blocked_sites
                if (current.indexOf(bsites) === -1) current.push(bsites);
                user.schedules.sunday.limited_sites.push(time_limit_dict)
            }
        
        }
        user.save()
        .then(user => res.status(200).json({
            status: 200,
            message: "Blocked Apps Added",
            data: user
        }))
        .catch(err=> res.status(500).json({
            status: 500,
            message: "Error Adding Blocked Apps",
            err_msg: err.message
    }))
        
    }})
    
}

// Remove an app from the blocked list and limited apps list
exports.removeApp = function(req, res) {
    User.findById(req.params.user_id, function (err, user){
        if (err){
            res.status(500).json({
                status: 500,
                message: "User Not Found",
                data: err
        })}
        
        
        
        else{
        get_sites = req.body.site
        console.log(get_sites)
        for (i in req.body.day) {
            console.log("num", req.body.day[i], req.body.id[i])
            if (req.body.day[i] === "monday"){
                    
                
                current = user.schedules.monday.blocked_sites
                for (i in current){
                    if (current[i] === get_sites){
                        toDelete = i
                        console.log(i)
                        
                        break
                    }
                }
                updatedAppList = current.filter((value)=>value!=current[i])
                
                user.schedules.monday.blocked_sites = updatedAppList
                console.log(updatedAppList)
                user.schedules.monday.limited_sites.pull({_id: req.body.id[i]})
            }
            else if (req.body.day[i] === "tuesday"){
                    
                
                current = user.schedules.tuesday.blocked_sites
                for (i in current){
                    if (current[i] === get_sites){
                        toDelete = i
                        console.log(i)
                        
                        break
                    }
                }
                updatedAppList = current.filter((value)=>value!=current[i])
                
                user.schedules.tuesday.blocked_sites = updatedAppList
                console.log(updatedAppList)
                user.schedules.tuesday.limited_sites.pull({_id: req.body.id[i]})
            }
            else if (req.body.day[i] === "wednesday"){
                    
                
                current = user.schedules.wednesday.blocked_sites
                for (i in current){
                    if (current[i] === get_sites){
                        toDelete = i
                        console.log(i)
                        
                        break
                    }
                }
                updatedAppList = current.filter((value)=>value!=current[i])
                
                user.schedules.wednesday.blocked_sites = updatedAppList
                console.log(updatedAppList)
                user.schedules.wednesday.limited_sites.pull({_id: req.body.id[i]})
            }
            else if (req.body.day[i] === "thursday"){
                    
                
                current = user.schedules.thursday.blocked_sites
                for (i in current){
                    if (current[i] === get_sites){
                        toDelete = i
                        console.log(i)
                        
                        break
                    }
                }
                updatedAppList = current.filter((value)=>value!=current[i])
                
                user.schedules.thursday.blocked_sites = updatedAppList
                console.log(updatedAppList)
                user.schedules.thursday.limited_sites.pull({_id: req.body.id[i]})
            }
            else if (req.body.day[i] === "friday"){
                    
                
                current = user.schedules.friday.blocked_sites
                for (i in current){
                    if (current[i] === get_sites){
                        toDelete = i
                        console.log(i)
                        
                        break
                    }
                }
                updatedAppList = current.filter((value)=>value!=current[i])
                
                user.schedules.friday.blocked_sites = updatedAppList
                console.log(updatedAppList)
                user.schedules.friday.limited_sites.pull({_id: req.body.id[i]})
            }
            else if (req.body.day[i] === "saturday"){
                    
                
                current = user.schedules.saturday.blocked_sites
                for (i in current){
                    if (current[i] === get_sites){
                        toDelete = i
                        console.log(i)
                        
                        break
                    }
                }
                updatedAppList = current.filter((value)=>value!=current[i])
                
                user.schedules.saturday.blocked_sites = updatedAppList
                console.log(updatedAppList)
                user.schedules.saturday.limited_sites.pull({_id: req.body.id[i]})
            }
            else if (req.body.day[i] === "sunday"){
                    
                
                current = user.schedules.sunday.blocked_sites
                for (i in current){
                    if (current[i] === get_sites){
                        toDelete = i
                        console.log(i)
                        
                        break
                    }
                }
                updatedAppList = current.filter((value)=>value!=current[i])
                
                user.schedules.sunday.blocked_sites = updatedAppList
                console.log(updatedAppList)
                user.schedules.sunday.limited_sites.pull({_id: req.body.id[i]})
            }
        }
        user.save()
        .then(user => res.status(200).json({
            status: 200,
            message: "Blocked Apps List Updated",
            data: user
        }))
        .catch(err=> res.status(500).json({
            status: 500,
            message: "Error Updating Blocked Apps List",
            err_msg: err.message
    }))
    }

        console.log("Removing App")
        
        
    })
}


// Edit the limited hours for the blocked apps to be used during free time
exports.limitedAppTime = function(req, res) {
    
    User.findById(req.params.user_id, function(err, user) {
        if (err){
            res.status(500).json({
                status: 500,
                message: "User Not Found",
                data: err
        })}
        else{
        for (i in req.body.day) {
            if (req.body.day[i] === "monday"){
                for (i in user.schedules.monday.limited_sites){
                    if (user.schedules.monday.limited_sites[i].site === req.body.site){
                        console.log("HERERERE")
                        user.schedules.monday.limited_sites[i].weekday_time_limit = req.body.weekday_time_limit
                        user.schedules.monday.limited_sites[i].weekend_time_limit = req.body.weekend_time_limit
                        
                        
                    }
                }
            }
            else if (req.body.day[i] === "tuesday"){
                for (i in user.schedules.tuesday.limited_sites){
                    if (user.schedules.tuesday.limited_sites[i].site === req.body.site){
                        console.log("HERERERE")
                        user.schedules.tuesday.limited_sites[i].weekday_time_limit = req.body.weekday_time_limit
                        user.schedules.tuesday.limited_sites[i].weekend_time_limit = req.body.weekend_time_limit
                        
                        
                    }
                }
            }

            else if (req.body.day[i] === "wednesday"){
                for (i in user.schedules.wednesday.limited_sites){
                    if (user.schedules.wednesday.limited_sites[i].site === req.body.site){
                        console.log("HERERERE")
                        user.schedules.wednesday.limited_sites[i].weekday_time_limit = req.body.weekday_time_limit
                        user.schedules.wednesday.limited_sites[i].weekend_time_limit = req.body.weekend_time_limit
                        
                        
                    }
                }
            }
            else if (req.body.day[i] === "thursday"){
                for (i in user.schedules.thursday.limited_sites){
                    if (user.schedules.thursday.limited_sites[i].site === req.body.site){
                        console.log("HERERERE")
                        user.schedules.thursday.limited_sites[i].weekday_time_limit = req.body.weekday_time_limit
                        user.schedules.thursday.limited_sites[i].weekend_time_limit = req.body.weekend_time_limit
                        
                        
                    }
                }
            }
            else if (req.body.day[i] === "friday"){
                for (i in user.schedules.friday.limited_sites){
                    if (user.schedules.friday.limited_sites[i].site === req.body.site){
                        console.log("HERERERE")
                        user.schedules.friday.limited_sites[i].weekday_time_limit = req.body.weekday_time_limit
                        user.schedules.friday.limited_sites[i].weekend_time_limit = req.body.weekend_time_limit
                        
                        
                    }
                }
            }

            else if (req.body.day[i] === "saturday"){
                for (i in user.schedules.saturday.limited_sites){
                    if (user.schedules.saturday.limited_sites[i].site === req.body.site){
                        console.log("HERERERE")
                        user.schedules.saturday.limited_sites[i].weekday_time_limit = req.body.weekday_time_limit
                        user.schedules.saturday.limited_sites[i].weekend_time_limit = req.body.weekend_time_limit
                        
                        
                    }
                }
            }

            else if (req.body.day[i] === "sunday"){
                for (i in user.schedules.sunday.limited_sites){
                    if (user.schedules.sunday.limited_sites[i].site === req.body.site){
                        console.log("HERERERE")
                        user.schedules.sunday.limited_sites[i].weekday_time_limit = req.body.weekday_time_limit
                        user.schedules.sunday.limited_sites[i].weekend_time_limit = req.body.weekend_time_limit
                        
                        
                    }
                }
            }
        }}
        user.save()
        .then(user => res.status(200).json({
            status: 200,
            message: "Successfully Updated the Limited Apps Time",
            data:user
        }))
        .catch(err=> res.status(500).json({
            status: 500,
            message: "Error Updating the Limited Apps Time",
            err_msg: err.message
    }))
    })  
    

        
}



// View User
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user){})
    .then(user => res.status(200).json({
        status: 200,
        message: "User Details",
        data: user
    }))
    .catch(err=> res.status(500).json({
        status: 500,
        message: "Error Getting the User",
        err_msg: err.message
}))

};



// Update User
exports.update = function (req, res) {
    if (!validator.isEmail(req.body.email)){
        res.status(300).json({
            status: 300,
            message: "Error, Enter a valid email address"
        })
    }
    else if(!validator.isMobilePhone(req.body.phone)){
        res.status(300).json({
            status: 300,
            message: "Error, Enter a Valid Phone Number"
        })
    }
    else{
        User.findById(req.params.user_id, function (err, user) {
            if (err){
                res.status(500).json({
                    status: 500,
                    message: "User Not Found",
                    data: err
            })}
            user.name = req.body.name ? req.body.name : user.name;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.location = req.body.location;
            user.job_type = req.body.job_type;
            
    //save and check errors
            user.save(function (err) {
                if (err){
                    res.status(500).json({
                        status: 500,
                        message: "Error Updating the DB",
                        data: err
                })}
                res.json({
                    status: 200,
                    message: "User Updated Successfully",
                    data: user
                });
            });
        })}
};


// Delete User
exports.delete = function (req, res) {
    User.deleteOne({
        _id: req.params.user_id
    }, function (err, contact) {
        if (err){
            res.status(500).json({
                status: 500,
                message: "User Not Found",
                data: err
        })}
        res.json({
            status: 200,
            message: 'User Deleted'
        })
    })
}


exports.deleteLimited = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err){
            res.status(500).json({
                status: 500,
                message: "User Not Found",
                data: err
        })}
        else{
        day = req.body.day

        if (day === "monday") {
        user.schedules.monday.limited_sites.pull({_id: req.body.id})
        }
        else if (day === "tuesday") {
            user.schedules.tuesday.limited_sites.pull({_id: req.body.id})
            }
        else if (day === "wednesday") {
            user.schedules.wednesday.limited_sites.pull({_id: req.body.id})
            }
        else if (day === "thursday") {
            user.schedules.thursday.limited_sites.pull({_id: req.body.id})
        }  
        else if (day === "friday") {
            user.schedules.friday.limited_sites.pull({_id: req.body.id})
            }
        else if (day === "saturday") {
            user.schedules.saturday.limited_sites.pull({_id: req.body.id})
            }
        else if (day === "sunday") {
            user.schedules.sunday.limited_sites.pull({_id: req.body.id})
        }        

//save and check errors
        user.save(function (err) {
            if (err){
                res.status(500).json({
                    status: 500,
                    message: "Error Updating the DB",
                    data: err
            })}
            res.status(200).json({
                status: 200,
                message: "Limited Hours List Updated Successfully",
                data: user
            });
        });
        }
    });
};

