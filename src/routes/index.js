import user from './user';

const ping = (req, res, next) => {
  res.json({ success: true, data: 'pong' });
  return;
}

function mainRouting(router) {
  router
    .route('/test')
    .get(ping)

  user(router)
}

export default mainRouting
