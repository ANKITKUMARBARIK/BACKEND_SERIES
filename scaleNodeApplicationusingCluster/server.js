const express = require("express")
const cluster = require('cluster');
const os = require("os")


const totalCPUs = os.cpus().length
// console.log(totalCPUs)

if (cluster.isPrimary) {
    // console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
} else {
    const app = express()
    const PORT = 8000

    app.get('/', (req, res) => {
        return res.json({ message: `Hello From Express Server ${process.pid}` })
    })

    app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))
}