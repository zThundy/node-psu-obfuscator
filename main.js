// const obj = require("./index.js")
const fetch = require("node-fetch");
const fs = require("fs")

const config = require("./config.js")

const inputPath = config.inputPath
const outPath = config.outPath

async function mainFetch(script) {
    // console.log(typeof(script))
    const body = {
        "key": config.key,
        "script": script,
        "options": config.options
    }
    const a = await fetch(config.api_link, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (a.status !== 200) {
        console.log("Cannot get result. Please check site status, error code: " + a.status + ": " + a.statusText)
        return false
    }
    return await a.json()
}

async function main(path) {
    // console.log("start func path " + path)
    fs.readdir(path, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            // console.log(path + file)
            if (!fs.lstatSync(path + file).isDirectory()) {
                fs.readFile(path + file, 'utf8', async function(err, data) {
                    if (err) throw err;
                    var obf_script = await mainFetch(data)
                    if (!obf_script) return
                    var out = path
                    out = out.replace(inputPath, outPath)
                    out = out + file
                    // console.log(out)
                    fs.writeFile(out, obf_script.data, (err) => {
                        if (err) throw err;
                    })
                })
            } else {
                var _path = path + file + "/"
                var out = _path.replace(inputPath, outPath)
                if (!fs.existsSync(out)){ fs.mkdirSync(out); }
                main(_path)
            }
        })
    })

    // fs.readFile(inputPath + filename, 'utf8', function(err, data) {
    //     if (err) throw err;
    //     var obf_script = mainFetch()
    // })
}

main(inputPath)