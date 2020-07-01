import AuthService from '../services/auth';
import isAuth from '../middlewares/isAuth';

export default (router) => {
  router
    .route('/user/login')
    .post(async(req, res) => {
      const email = req.body.user.email;
      const password = req.body.user.password;
      try {
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.Login(email, password);

        return res.json({ success: true, user, token }).status(200).end();
      } catch(e) {
        return res.status(500).json({ success: false, error: e });
      }
    })

  router
    .route('/user/signup')
    .post(async(req, res) => {
      try {
        const { name, email, password } = req.body.user;
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.SignUp(email, password, name);
        return res.json({ success: true, user, token }).status(200).end();
      } catch (e) {
        return res.status(500).json({ success: false, error: e });
      }
    })

  router
    .use(isAuth)
    .use(function (err, req, res, next) {
      if (err) {
        if (err.status === 401) {
          return res.status(401).json({ success: false, error: err });
        } else {
          return res.status(500).json({ success: false, error: err });
        }
      } else {
        next()
      }
    })
    .route('/ping')
    .get((req, res) => {
      return res.json({test: 'pong', success: true })
        .status(200).end();
      },
    )
  }
