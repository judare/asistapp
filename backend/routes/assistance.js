import Controller from '../controllers/assistance';
import Validator from '../validators/assistance';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/list', validate.list, controller.list);

  router.post('/users', validate.users, controller.users);

  router.post('/report', validate.report, controller.report);

  return router;
};

export default Route;
