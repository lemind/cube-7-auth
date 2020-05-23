
const ping = (req, res, next) => {
  res.json({ success: true, data: 'pong' });
  return;
}

module.exports = (router) => {
  router
    .route('/test')
    .get(ping)
}