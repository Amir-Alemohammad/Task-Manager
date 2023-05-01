const setHeaders = (req,res,next) => {
    res.removeHeader("X-Powered-By");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
    next();
}
module.exports = {
    setHeaders,
}