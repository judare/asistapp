import Board from './board';
import Assistance from './assistance';

function Routes(app, db, services) {
  this.routes = {
    Board,
    Assistance
  };

  this.associate = function() {
    const names = Object.keys(this.routes);
    for (let i = 0; i < names.length; i++) {
      console.log(names[i]);
      this[names[i]] = this.routes[names[i]](app, db, services);
    }
  };


  this.associate();
}

export default Routes;
