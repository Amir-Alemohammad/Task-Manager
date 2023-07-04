const Yup = require("yup");

const projectValidation = Yup.object().shape({
    Title: Yup.string().required("عنوان الزامی می باشد"),
    Text: Yup.string().max(50,"توضیحات نباید بیشتر از 50 کاراکتر باشد").min(3,"توضیحات نباید کمتر از 3 کاراکتر باشد"),
    Image: Yup.string().default("/defaults/default.png"),
    Private: Yup.boolean().default(true),
    tags: Yup.string().default("").max(10,"برچسب ها نمیتوانند بیشتر از 10 مورد باشند"),
});

module.exports = {
    projectValidation,
}