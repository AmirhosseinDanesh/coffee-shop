export const registerValidate = (values) => {
    const errors = {};

    if (values.name === "") {
        errors.name = "وارد کردن نام الزامی است"
    } else if (values.name.length < 4) {
        errors.name = "کاراکتر های نام کم است"
    }

    if (values.username === "") {
        errors.username = "وارد کردن یوزرنیم الزامی است"
    } else if (values.username.length < 4) {
        errors.username = "کاراکتر های یوزرنیم کم است"
    } else if (!/^[a-z0-9_-]{3,15}$/i.test(values.username)) {
        errors.username = "یوزرنیم باید انگلیسی باشد"
    }

    if (values.phone === "") {
        errors.phone = "وارد کردن شماره تلفن الزامی است"
    } else if (values.phone.length < 11) {
        errors.phone = "کاراکتر های شماره تلفن کم است"
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(values.phone)) {
        errors.phone = "شماره باید  وارد کنید"
    }

    if (values.email === "") {
        errors.email = "وارد کردن ایمیل الزامی است"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "ایمیل وارد شده اشتباه است"
    }

    if (values.password === "") {
        errors.password = "وارد کردن رمزعبور الزامی است"
    } else if (values.password.length < 4) {
        errors.password = "کاراکتر های رمزعبور کم است"
    }
    
    
    return errors;
}

export const loginValidate = (values) => {
    const errors = {};

    if (values.email === "") {
        errors.email = "وارد کردن ایمیل الزامی است"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "ایمیل وارد شده اشتباه است"
    }

    if (values.password === "") {
        errors.password = "وارد کردن رمزعبور الزامی است"
    } else if (values.password.length < 4) {
        errors.password = "کاراکتر های رمزعبور کم است"
    }

    return errors;
}



export const productValidate = (values) => {
    const errors = {};

    if (values.name === "") {
        errors.name = "وارد کردن ایمیل الزامی است"
    }
    if (values.shortName === "") {
        errors.shortName = "وارد کردن ایمیل الزامی است"
    }
    if (values.description === "") {
        errors.description = "وارد کردن ایمیل الزامی است"
    }
    if (values.price === "") {
        errors.price = "وارد کردن ایمیل الزامی است"
    }
    if (values.status === "") {
        errors.status = "وارد کردن ایمیل الزامی است"
    }
    if (values.categoryID === "") {
        errors.categoryID = "وارد کردن دسته بندی الزامی است"
    }
    if (values.status === "") {
        errors.status = "وارد کردن وضعیت الزامی است"
    }
    if (values.cover === "") {
        errors.cover = "وارد کردن عکس الزامی است"
    }


    return errors;

}
export const productEditValidate = (values) => {
    const errors = {};

    if (values.name === "") {
        errors.name = "وارد کردن ایمیل الزامی است"
    }
    if (values.shortName === "") {
        errors.shortName = "وارد کردن ایمیل الزامی است"
    }
    if (values.description === "") {
        errors.description = "وارد کردن ایمیل الزامی است"
    }
    if (values.price === "") {
        errors.price = "وارد کردن ایمیل الزامی است"
    }
    if (values.status === "") {
        errors.status = "وارد کردن ایمیل الزامی است"
    }
    if (values.categoryID === "") {
        errors.categoryID = "وارد کردن دسته بندی الزامی است"
    }
    if (values.status === "") {
        errors.status = "وارد کردن وضعیت الزامی است"
    }
    // if (values.cover === "") {
    //     errors.cover = "وارد کردن عکس الزامی است"
    // }


    return errors;

}

