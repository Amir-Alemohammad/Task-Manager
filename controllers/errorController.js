const createHttpError = require("http-errors");

const get404 = (req,res,next) => {
    next(createHttpError.NotFound("آدرس مورد نظر یافت نشد"));
}
module.exports = {
    get404,
}