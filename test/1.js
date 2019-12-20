function extend(targer, options, deep) {
    for (let name in options) {
        let copy = options[name];
        if (deep && copy instanceof Array) {
            targer[name] == extend([], copy,deep);
        } else if (deep && copy instanceof Object) {
            targer[name] == extend({}, copy, deep);
        } else {
            targer[name] = options[name];
        }
    }
    return target;
}
