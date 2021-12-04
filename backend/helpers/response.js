
export default function(res, next = null) {
  return function(response, error) {

    if (error) {
      res.status(error.status).json({
        errorCode: error.code,
        message: "Error",
      });
      if (next) next();
      return;
    }

    res.status(200).json({
      "statusCode": 200,
      "message": "Successful",
      "data": response,
      "_channel": "web"
    });
    if (next) next();
    return;
  }
}