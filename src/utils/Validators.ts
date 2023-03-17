export function validateEmail(value: string) {
    console.log(value);

    if (!value) {
        return "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return "Invalid email address";
    }
}

export function validatePassword(value: string) {
    if (value.length < 6) {
        return "min length is 6";
    }
    if (value.toUpperCase() == value || value.toLocaleLowerCase() == value) {
        return "must have upper and lower case characters";
    }
}

export function validateCPassword(cpass: string, pass: string) {
    console.log(pass);
    if (cpass !== pass) {
        return "passwords do not match";
    }
}
