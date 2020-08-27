const validateParam = (req, res, next) => {
  const searchTerm = req.query.movieName;
  if (!searchTerm || searchTerm === "") {
    res.status(400).send({ msg: "Search parameter cannot be empty" });
    return;
  }

  //if param is not empty go to next middleware
  next();
};

module.exports = validateParam;
