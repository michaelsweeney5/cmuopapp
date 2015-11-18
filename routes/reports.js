/*
 * GET reports page.
 */

exports.reports = function(req, res){
  res.render('reports', { title: 'Reports' })
};
