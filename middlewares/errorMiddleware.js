// error middleware || next function

const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    message: "Something went wrong",
    success: false,
    err,
  });
};
export default errorMiddleware;
