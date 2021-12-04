
import response from "../helpers/response.js";
import moment from "moment";

export default function(app, db) {
  const {
    Assistance,
    User
  } = db;

  const Controller = {
    list: async function( req, res ) {
      try {

        let queryBuilder = {
          include: [{
            model: User,
            required: true
          }],
          where: [],
          order: [ ["id", "desc"] ]
        }

        if (req.body.filters.dateStart) {
          queryBuilder.where.push({ createdAt: { [db.Sequelize.Op.gt]: req.body.filters.dateStart } });
        }

        if (req.body.filters.dateEnd) {
          queryBuilder.where.push({ createdAt: { [db.Sequelize.Op.lt]: req.body.filters.dateEnd } });
        }

        if (req.body.filters.userId) {
          queryBuilder.where.push({ userId: req.body.filters.userId });
        }

        let assistances = await Assistance.findAll(queryBuilder);
        assistances = assistances.map(a => {
          return {
            id: a.User.id,
            name: a.User.name,
            cellphone: a.User.cellphone,
            date: moment(a.createdAt).format("DD/MM/YY"),
            hours: a.closedAt ? moment(a.closedAt).diff(a.createdAt, "hours") : null,
            timeStart: moment(a.createdAt).format("HH:mm:ss"),
            timeEnd: a.closedAt ? moment(a.closedAt).format("HH:mm:ss"): "",
          };
        });


        return res.json(assistances)
      } catch( err ) {
        console.log(err)
        return res.status(400).json({ message: "Algo salió mal", code: 106 });
      }
    },


    users: async function( req, res ) {
      try {

        let queryBuilder = {
        }

        let users = await User.findAll(queryBuilder);
        users = users.map(a => {
          return {
            id: a.id,
            name: a.name,
            cellphone: a.cellphone,
            image: a.image,
          };
        });


        return res.json(users)
      } catch( err ) {
        console.log(err)
        return res.status(400).json({ message: "Algo salió mal", code: 106 });
      }
    }
  };
  return Controller;
}