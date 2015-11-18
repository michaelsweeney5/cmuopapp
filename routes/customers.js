/*
 * GET customers page.
 */

exports.customers = function(req, res){
  res.render('customers', { title: 'Customers' }
};
