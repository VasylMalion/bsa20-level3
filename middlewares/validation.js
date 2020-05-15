const isEmpty = (data) => {
  return data === undefined;
};

const isEmail = (email) => {
    const regex = /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/gi;
    return regex.test(email);
};

const isPhoneNumber = (phone) => {
    const regex = /^\+380(\d{9})$/g;
    return regex.test(phone);
};

const minLength = (num, min) => {
    if (num === '') {
        return false
    }
    return num.length >= min;
};

const maxLength = (num, max) => {
    if (num === '') {
        return false
    }
    return num.length <= max;
};

module.exports = {
    isEmail,
    isEmpty,
    isPhoneNumber,
    minLength,
    maxLength
};