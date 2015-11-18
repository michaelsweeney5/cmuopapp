/*
 * GET schedule page.
 */

exports.schedule = function(req, res){
  res.render('schedule', { title: 'Schedule' })
};
