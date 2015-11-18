/*
 * GET settings page.
 */

exports.settings = function(req, res){
  res.render('settings', { title: 'Settings' })
};
