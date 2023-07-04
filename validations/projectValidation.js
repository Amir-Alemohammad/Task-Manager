const Yup = require("yup");

const mongoIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

const projectValidation = Yup.object().shape({
    Title: Yup.string().required("عنوان الزامی می باشد"),
    Text: Yup.string().max(50,"توضیحات نباید بیشتر از 50 کاراکتر باشد").min(3,"توضیحات نباید کمتر از 3 کاراکتر باشد"),
    Image: Yup.string().default("/defaults/default.png"),
    Private: Yup.boolean().default(true),
    tags: Yup.string().default("").max(10,"برچسب ها نمیتوانند بیشتر از 10 مورد باشند"),
});

const mongoIdValidation = Yup.object().shape({
    id: Yup.string().matches(mongoIdRegex,"شناسه معتبر را وارد کنید")
})

module.exports = {
    projectValidation,
    mongoIdValidation,
}