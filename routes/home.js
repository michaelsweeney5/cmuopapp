/*
 * GET home page.
 */

exports.home = function(req, res){
  res.render('home', { title: 'CMU Outdoor Program Home Page' })
};
