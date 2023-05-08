const get404 = (req,res) => {
    res.status(404).json({
        status: 404,
        message: "صفحه مورد نظر پیدا نشد",
        success: false
    });
}
const get500 = (req,res) => {
   res.status(500).json({
    status: 500,
    message : "خطایی از سمت سرور رخ داده است",
    success : false,
   });
}
module.exports = {
    get404,
    get500
}