const Yup = require("yup");

const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}$/gim

const teamSchema = Yup.object().shape({
    name : Yup.string().required("نام تیم الزامی می باشد").min(5,"نام تیم نباید کمتر از 5 کاراکتر باشد"),
    Description: Yup.string().min(25,"توضیحات نباید کمتر از 25 کاراکتر باشد").max(255),
    username: Yup.string().required("نام کاربری برای تیم الزامی میباشد").min(4,"نام کاربری نباید کمتر از 4 کاراکتر باشد").matches(usernameRegex,"نام کاربری را به طور صحیح وارد کنید"),
});
module.exports = {
    teamSchema,
}