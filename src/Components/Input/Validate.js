export const emailValidate = ({val}) => {
    console.log(val)
    if (val.email === "") {
        errors.email = "وارد کردن ایمیل الزامی است"
    }
}