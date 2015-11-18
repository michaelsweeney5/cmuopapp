/*
 * GET employees page.
 */

exports.employees = function(req, res){
  res.render('employees', { title: 'Employees' })
};
