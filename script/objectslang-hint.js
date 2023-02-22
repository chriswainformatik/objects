// custom hint file

function objectslangHint(editor, options) {
    // pre run code to create completions

    var lines = editor.getValue().split('\n')
    for (var i = 0; i < lines.length; i++) {
        try {
            runner.checkSyntax(i, lines[i])
        } catch (e) {
            // do nothing since the last line is probably unfinished
        }
    }

    for (var i = 0; i < lines.length; i++) {
        try {
            runner.checkSemantics(i, lines[i])
        } catch (e) {
            // do nothing (see above)
        }
    }

    var Pos = CodeMirror.Pos

    var cur = editor.getCursor()
    var token = editor.getTokenAt(cur);

    var autocompletelist = []


    // define helper funtctions

    function getClassNamesList() {
        var result = []
        for (var i = 0; i < globalClassesList.length; i++) {
            result.push(globalClassesList[i].name)
        }
        return result
    }

    function getMethodNamesListFor(classname) {
        var result = []
        for (var i = 0; i < globalClassesList.length; i++) {
            if (globalClassesList[i].name == classname) {
                var methodsList = globalClassesList[i].methods
                for (var j = 0; j < methodsList.length; j++) {
                    result.push(methodsList[j].name + '(')
                }
            }
        }
        return result
    }

    function getClassNameFor(instancename) {
        for (var i = 0; i < globalInstancesList.length; i++) {
            if (globalInstancesList[i].name == instancename) {
                return globalInstancesList[i].class
            }
        }
        return
    }

    if (token.type == 'seperator') {
        if (token.string == ':') {
            autocompletelist = getClassNamesList()
        } else if (token.string == '.') {
            var instancename = editor.getTokenAt(Pos(cur.line, token.start)).string;
            var classname = getClassNameFor(instancename)
            autocompletelist = getMethodNamesListFor(classname)
            token.start++
            token.end++
        } else {
            return
        }
    } else if (token.type == 'classname') {
        var list = getClassNamesList()
        for (var i = 0; i < list.length; i++) {
            if (list[i].startsWith(token.string)) {
                autocompletelist.push(list[i])
            }
        }
    } else if (token.type == 'identifier') {
        // TODO
    } else {
        return
    }

    return {
        list: autocompletelist,
        from: Pos(cur.line, token.start),
        to: Pos(cur.line, token.end)
    }
}

CodeMirror.registerHelper("hint", "objectslang", objectslangHint);