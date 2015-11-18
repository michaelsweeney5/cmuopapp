/*
 * GET inventory page.
 */

exports.inventory = function(req, res){
  res.render('inventory', { title: 'Inventory' })
};
