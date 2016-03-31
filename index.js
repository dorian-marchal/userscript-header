var fs = require('fs');

var getPackage = function(packagePath) {
    return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
}

var getUserscriptFields = function(pkg) {
    var fields = [];

    pkg.userscript = pkg.userscript || {};

    // Default to package values for some fields.
    ['name', 'author', 'version', 'description'].forEach(function(field) {
        var value = pkg.userscript[field] || pkg[field];
        if (value) {
            pkg.userscript[field] = value;
        }
    });

    Object.keys(pkg.userscript).sort().forEach(function(key) {
        var values = pkg.userscript[key];

        if (!(values instanceof Array)) {
            values = [values];
        }
        values.forEach(function(value) {
            fields.push({
                key: key,
                value: value,
            });
        });
    });

    return fields;
}

module.exports = {
    fromPackage: function(packagePath) {
        var fields = getUserscriptFields(getPackage(packagePath));

        var header = '// ==UserScript==\n';
        fields.forEach(function(field) {
            header += '// @' + field.key + ' ' + field.value + '\n';
        });
        header += '// ==/UserScript==\n';

        return header;
    },
};
