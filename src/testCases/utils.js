const add = (a, b) => a + b;

const square = (x) => x * x;

const setName = (user, fullName) => {
    var names = fullName.split(' ');
    user.firstName = names[0];
    user.lastName = names[1];
    return user;
};

const asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 1000);
};

module.exports = {
    add,
    square,
    setName,
    asyncAdd,
};