
export const checkEmail = (email) => {
    const emailRegex = /^[a-z0-9_]{3,}@[a-z]{3,}.[a-z]{3,6}$/;
    return emailRegex.test(email)
};

export const checkName = (name) => {
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(name);
}