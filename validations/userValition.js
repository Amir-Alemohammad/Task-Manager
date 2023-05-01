const Yup = require("yup");


const userValidation = Yup.object().shape({
    FullName: Yup.string().required("نام و نام خانوادگی الزامی می باشد").min(3,"نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد"),
    UserName: Yup.string().required("نام کاربری الزامی می باشد").min(3,"نام کاربری نباید کمتر از 3 کاراکتر باشد"),
    PhoneNumber: Yup.string().required("شماره تلفن الزامی می باشد").min(11,"شماره تلفن را صحیح وارد کنید").max(11,"شماره تلفن را صحیح وارد کنید"),
    Password:Yup.string().required("کلمه عبور الزامی می باشد").min(6,"کلمه عبور نباید کمتر از 6 کاراکتر باشد"),
    Email:Yup.string().email(),
    Rols: Yup.string().default([]),
    Skills: Yup.string().default([]),
    Teams: Yup.string().default([]),
});

module.exports = {
    userValidation,
};
