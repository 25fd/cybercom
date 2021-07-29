const catchAsync = require("./../Utilis/catchAsync");


exports.protect = catchAsync(async (req, res, next) => {

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (token != "YouMayEnter")
    return res.status(401).json({
      "status": 'Unauthorized Access'
    });

  next()
})