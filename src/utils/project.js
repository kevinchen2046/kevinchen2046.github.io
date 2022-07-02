module.exports = class ProjectUtil {

    static getReleasePaths(projectPath) {
        var folders = fs.readdirSync(projectPath + 'bin-release/web/');
        if (!folders || !folders.length) return [];
        var results = [];
        for (var folder of folders) {
            results.push(projectPath + 'bin-release/web/' + folder + '/')
        }
        return results;
    }

    static getLastReleasePath(projectPath) {
        var folders = fs.readdirSync(projectPath + 'bin-release/web/');
        if (!folders || !folders.length) return [];
        var last = ''
        var min = 0;
        for (var name of folders) {
            if (parseInt(name) > min) {
                last = name;
            }
        }
        return [(projectPath + 'bin-release/web/' + last + '/')];
    }

}