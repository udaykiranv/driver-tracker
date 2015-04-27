'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
/*
var AddressSchema = new Schema({
   address_lane1 : String,
   address_lane2 : String,
   place : String,
   town : String,
   state : String,
   district : String,
   pincode : String,
   landmark : String
}); 

var ContactSchema = new Schema({
   mobile_number : Number,
   mobile_make : String,
   landline_number : Number,
   emergency_number : Number
});

var FamilyDetailsSchema = new Schema({

wife_first_name : String,
wife_last_name : String,
date_of_birth : Date,
children : Array,
no_of_relatives : Number 

});*/

/**
 * Driver Schema
 */
var DriverSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
 /* Personal Information */ 
 first_name: {
    type: String,
    required: false,
    trim: true
  },
  last_name: {
    type: String,
    required: false,
    trim: true
  },
  date_of_birth: {
    type: Date,
    required: false,
    trim: true
  },
  gender: {
    type: String,
    required: false,
    trim: true
  },
  nationality: {
    type: String,
    required: false,
    trim: true
  },
  marital_status: {
    type: String,
    required: false,
    trim: true
  },
  photo: {
    type: String,
    required: false,
    trim: true
  },
  address : {
   address_lane1 : String,
   address_lane2 : String,
   place : String,
   town : String,
   state : String,
   district : String,
   pincode : String,
   landmark : String
},
  contact : {
   mobile_number : Number,
   mobile_make : String,
   landline_number : Number,
   emergency_number : Number
},
  email : String,
  qualification : String,
  monthly_income : Number,
  languages_known : Array,
  aadhar : {
  no : String,
  scan_copy : String
  },
  voter_id : {
  no : String,
  scan_copy : String
  },
  height : String,
  weight : String,
  certification : Array,
  insurance_details : {
   issuer_compay_name : String,
   policy_number : String,
   date_of_issue : Date,
   personal_or_sponsored : String,
   sponsor_name : String
  },
  health_status : String,
  hobbies : Array,
  criminal_offences : String,

  
  family_details : {

wife_first_name : String,
wife_last_name : String,
date_of_birth : Date,
/* TODO Change it later */
children : Array,
no_of_relatives : Number

},
  property_details : {
  property_type : String,
  property_address : String,
  value : Number
  },
  /* Driving Details */
  driving_license : {
   number : String,
   issue_date : Date,
   expiry_date : String,
   scan_copy : String  
  },
  years_of_experience : Number,
  vehicle_type_known: Array,
  employment_type : String,
  current_employer : {
  first_name : String,
  last_name : String,
  address : {
   address_lane1 : String,
   address_lane2 : String,
   place : String,
   town : String,
   state : String,
   district : String,
   pincode : String,
   landmark : String
},
  phone : String,
  email : String,
  no_of_vehicles_owned : Number,
  duration_of_current_employer : Number,
  driving_region : String,
  current_vehicle_details : {
  type : String,
  make : String,
  model : String,
  year : Number,
  registration_details : String,
  insurance_details : {
  issue_date : Date,
  expiry_date : Date 
  },
  tyre_details : {
  make : String,
  model : String,
  kms_ran : Number
  },
  assistant : {
  name : String,
  gender : String,
  age : Number,
  native_place : String,
  qualification : String
  },
  ownership_type : String
  },
  cargo_details : {
  cargo_type_handled : String,
  handling_company_details : {
  name : String,
  location : String,
  yrs_service : Number
  }
  },
  past_driving_details : String,
  },

  title: {
    type: String,
    required: false,
    trim: true
  },
  content: {
    type: String,
    required: false,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
DriverSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

DriverSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
DriverSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Driver', DriverSchema);
