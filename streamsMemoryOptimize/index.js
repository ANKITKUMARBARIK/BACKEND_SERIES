const express = require("express")
const app = express()
const PORT = 8000
const status = require("express-status-monitor")

app.use(status())

const fs = require("fs")
const zlib = require("zlib")

// Stream Read (sample.txt) --> Zipper --> fs.createWriteStream  
fs.createReadStream("./sample.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./sample.zip")))

// ye sab se memory pe load hi nhi padega

app.get('/', (req, res) => {
    const stream = fs.createReadStream("./sample.txt", "utf-8")
    stream.on("data", (chunk) => res.write(chunk))
    stream.on("end", () => res.end())
})

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))