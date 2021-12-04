export default function(app, db) {

  let {
    Assistance,
    User
  } = db;

  const Controller = {
    sendData: async function( req, res, next ) {
      try {


        let queryBuilder = {
          where: {
            uid: req.query.uid
          }
        }
        let user = await User.findOne(queryBuilder);

        if (!user) {
          return res.status(200).send("Error")
        }

        queryBuilder = {
          where: {
            userId: user.id,
            createdAt: { [db.Sequelize.Op.gt]: Date.now() - 30 * 1000 },
          }
        }
        let assistance = await Assistance.findOne(queryBuilder);

        if (assistance) {
          await assistance.update({ closedAt: Date.now() });
        } else {
          await Assistance.create({
            userId: user.id
          });
        }

        return res.status(200).send("Ok")
      } catch( err ) {
        console.log(err);
        return res.status(200).send("Error")
      }
    },
  }

  return Controller;
}