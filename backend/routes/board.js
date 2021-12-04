import Controller from '../controllers/board';
import Validator from '../validators/board';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.get('/sendData', validate.sendData, controller.sendData);

  return router;
};

export default Route;
