'use strict';

var _ = require('lodash');
var Customer = require('./customer.model');

// Get list of customers
exports.index = function(req, res) {
  Customer.find(function (err, customers) {
    if(err) { return handleError(res, err); }
    return res.json(200, customers);
  });
};

// Get a single customer
exports.show = function(req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    return res.json(customer);
  });
};

// Creates a new customer in the DB.
exports.create = function(req, res) {
  Customer.create(req.body, function(err, customer) {
    if(err) { return handleError(res, err); }
    return res.json(201, customer);
  });
};

// Updates an existing customer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Customer.findById(req.params.id, function (err, customer) {
    if (err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    var updated = _.merge(customer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, customer);
    });
  });
};

// Deletes a customer from the DB.
exports.destroy = function(req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    customer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

//// Update customer offer count in DB.
exports.updateOfferCount = function(req, res, next) {

  var customerId =req.params.id;
  var count = Number(req.params.count);
  console.log('Reached customer controller updateCount !!! - customerId ' + customerId);
  console.log('Reached customer controller updateCount !!! - count ' + count);
  Customer.findById(customerId,function(err,customer){ 
    if(err) { return handleError(res, err); }
    console.log('count before :'+customer.offerCount);
    count = count + Number(customer.offerCount);
   console.log('count after :'+count);
   Customer.update(
    { _id: customerId },
    { offerCount:count },function(err,result){       
      if (err) return validationError(res, err);
      console.log ( 'Affected records '+ result);
      Customer.findById(customerId,function(err,resultAfter){ 
        if (err) return validationError(res, err);
        return res.json(200, resultAfter);

      });

    });

 });


};

function handleError(res, err) {
  return res.send(500, err);
}