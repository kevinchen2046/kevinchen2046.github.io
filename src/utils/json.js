module.exports = class JsonUtil {

    static space(len) {
        var t = [], i;
        for (i = 0; i < len; i++) {
            t.push(' ');
        }
        return t.join('');
    };

    static format(content) {
        var text = content.split("\n").join(" ");
        var t = [];
        var tab = 0;
        var inString = false;
        for (var i = 0, len = text.length; i < len; i++) {
            var c = text.charAt(i);
            if (inString && c === inString) {
                // TODO: \\"
                if (text.charAt(i - 1) !== '\\') {
                    inString = false;
                }
            } else if (!inString && (c === '"' || c === "'")) {
                inString = c;
            } else if (!inString && (c === ' ' || c === "\t")) {
                c = '';
            } else if (!inString && c === ':') {
                c += ' ';
            } else if (!inString && c === ',') {
                c += "\n" + JsonUtil.space(tab * 2);
            } else if (!inString && (c === '[' || c === '{')) {
                tab++;
                c += "\n" + JsonUtil.space(tab * 2);
            } else if (!inString && (c === ']' || c === '}')) {
                tab--;
                c = "\n" + JsonUtil.space(tab * 2) + c;
            }
            t.push(c);
        }
        return t.join('')
    }
}

