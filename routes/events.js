/*
 * GET events page.
 */

exports.events = function(req, res){
  res.render('events', { title: 'Events' })
};