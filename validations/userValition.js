const Yup = require("yup");

const phoneRegex = /^09[0-9]{9}$/ 

const userValidation = Yup.object().shape({
    FullName: Yup.string().required("نام و نام خانوادگی الزامی می باشد").min(3,"نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد"),
    UserName: Yup.string().required("نام کاربری الزامی می باشد").min(3,"نام کاربری نباید کمتر از 3 کاراکتر باشد"),
    PhoneNumber: Yup.string().required("شماره تلفن الزامی می باشد").min(11,"شماره تلفن را صحیح وارد کنید").max(11,"شماره تلفن را صحیح وارد کنید"),
    Password:Yup.string().required("کلمه عبور الزامی می باشد").min(6,"کلمه عبور نباید کمتر از 6 کاراکتر باشد"),
    ConfirmPassword: Yup.string().required("تکرار کلمه عبور الزامی می باشد").oneOf([Yup.ref("Password"),null],"تایید کلمه عبور با کلمه عبور مطابقت ندارد").min(6,"کلمه عبور نباید کمتر از 6 کاراکتر باشد"),
    Email:Yup.string().email(),
    Rols: Yup.string().default([]),
    Skills: Yup.string().default([]),
    Teams: Yup.string().default([]),
});

const checkOtpSchema = Yup.object().shape({
    PhoneNumber: Yup.string().required("شماره تلفن الزامی می باشد").matches(phoneRegex,"شماره تلفن را صحیح وارد کنید").min(11,"شماره تلفن را صحیح وارد کنید").max(11,"شماره تلفن را صحیح وارد کنید"),
    code : Yup.string().required("کد ارسال شده الزامی می باشد").min(4,"کد اعتبار سنجی نمیتواند کمتر از 4 کاراکتر باشد").max(6,"کد اعتبار سنجی نمیتواند بیشتر از 6 کاراکتر باشد"),
})

module.exports = {
    userValidation,
    checkOtpSchema
};
