import AuthService from '../services/auth';

export default (router) => {
  router
    .route('/user/login')
    .post(async(req, res) => {
      const email = req.body.user.email;
      const password = req.body.user.password;
      try {
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.Login(email, password);

        return res.status(200).json({ user, token }).end();
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
        return res.json({ user, token }).status(200).end();
      } catch (e) {
        return res.status(500).json({ success: false, error: e });
      }
    })

  router
    .route('/ping')
    .get(
      (req, res, next) => {
        console.log('---test---', req.body);
        return res.json({ result: {test: 'pong'}, success: true });
      },
    )
  }

