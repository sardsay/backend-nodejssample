"use strict";
var mongoose = require('mongoose');
var MyCoreFunction = require('../../libs/mycorefunction');
var User = require('../models/user');
var Counters = require('../models/counters');

module.exports.index = function(req, res) {
	
	let page = req.query.page;
	let name = req.body.txtname;
	let email = req.body.txtemail;
	let group = req.body.selgroup;
	let status = req.body.selstatus;
	let whereString = {};
	let search = {};
	
    if (name)
    	whereString.name = new RegExp(name, "i");search.txtname = name;
    if (email)
    	whereString.email = new RegExp(email, "i");search.txtemail = email;
    if (group)
    	whereString.group = group;search.selgroup = group;
    if (status)
    	whereString.status = status;search.selstatus = status;
    
    User
    	.paginate({query:whereString,
    		select:   'name email group status',
    		page : req.query.page || 1, 
		    per_page : 3,
		    url : '/users'
    	}, function(err, result, pagination){
    		if (err) {
	            return res.status(400).send({
	                message: errorHandler.getErrorMessage(err)
	            });
	        } else {
	            res.render('users/index',{ csrfToken: req.csrfToken(),  data : result, pagination : pagination.render(), data_pagination : {total : pagination.json().total, per_page : pagination.json().per_page}, search:search, response:req.flash()}); 
	        }
    });
    	
}

module.exports.create = function(req, res) {
	
	res.render('users/create',{ csrfToken: req.csrfToken() });
}

module.exports.store = function(req, res) {
	
	Counters.increment('userID',function(err,result){

		if (!err) {
			var reqUser = {
				_id: result.seq,
				name : req.body.txtname,
				email: req.body.txtemail,
				group : req.body.selgroup,
				status : req.body.selstatus
			}
			User.register(new User(reqUser), req.body.txtpassword, function(err) {
				if (err) {
					req.flash('message','ไม่สามารถเพิ่มข้อมูลได้ กรุณาติดต่อผู้ดูแลระบบ')
					req.flash('status', 400);
					res.redirect('/users')
				} else {
					req.flash('message','เพิ่มข้อมูลเรียบร้อยแล้ว')
					req.flash('status', 200);
					res.redirect('/users')
				}
			});
			
		}else{
			req.flash('message','ไม่สามารถเพิ่มข้อมูลได้ กรุณาติดต่อผู้ดูแลระบบ')
			req.flash('status', 400);
			res.redirect('/users')
		}
	});
	
}

module.exports.edit = function(req, res) {
	
	User.findOne({ '_id': req.params.id }, 'name email group status', function (err, person) {
		if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {console.log(person)
            res.render('users/edit',{ csrfToken: req.csrfToken(),person:person });
        }
	})
}

module.exports.update = function(req, res) {
	
	var reqUser = {
				name : req.body.txtname,
				group : req.body.selgroup,
				status : req.body.selstatus
			}
			// console.log(req.body)
	User.findByUsername(req.body.txtemail,true,function(err,user){
	    if (user){
	        user.setPassword(req.body.txtpassword, function(){
	            user.save();
	            	User.findOneAndUpdate({ email : req.body.txtemail}, reqUser,function(err,result){
						if (err) {
							res.send('can not update password.')
						}else{
							res.send('update password complete')
						}
							
					});
	        });
	    } else {
	        res.status(500).json({message: 'This user does not exist'});
	    }
	})
	
}

module.exports.destroy = function(req, res) {
	
	User.remove({ _id : req.body.id },function(err){
		if (err) 
			res.status(400).send({status:400,message:'ไม่สามารถลบข้อมูลได้ กรุณาติดต่อผู้ดูแลระบบ'})
		else
			res.status(200).send({status:200,message:'ลบข้อมูลเรียบร้อยแล้ว'})	
	});
}

module.exports.emails = function(req, res) {
	
	User.find().select('email').exec(function(err, result){
		if (err) {
			res.status(400).send({message:'Can not call data.'});
		}else{
			res.status(200).send(result);
		}
	});
	
}
