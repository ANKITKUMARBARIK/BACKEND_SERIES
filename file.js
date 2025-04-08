// fs(file system) -> module
const fs = require('fs');

// NOTE -> Synchronous - return the data // Asychronous - doesn't return anything, but except callback

// Synchronous way - write
fs.writeFileSync('./write1.txt', 'Hey there synchronous')

// Asynchronous way - write
fs.writeFile('./write2.txt', 'Hey there asynchronous', (err) => {
    if (err) {
        console.log('Error', err);
    }
})

// Synchronous way - read
const dataBuffer = fs.readFileSync('./read1.txt','utf-8')
console.log(dataBuffer.toString());

// Asynchronous way - read
fs.readFile('./read2.txt','utf-8',(err,result)=>{
    if(err){
        console.log('Error',err)
    }else{
        console.log(result);
    }
})

// Synchronous way - append
fs.appendFileSync('./append1.txt',`\nHey buddy : ${new Date().getDate().toLocaleString()}`)

// Asynchronous way - append
fs.appendFile('./append2.txt',`\nHey buddy : ${Date.now()}`,(err)=>{
    if(err){
        console.log('Error',err);
    }
})

// Synchronous way - copy
fs.cpSync('./append2.txt','./copy.txt')

// // Synchronous way - rename
// fs.renameSync('./copy.txt','paste.txt')

// Synchronous way - delete
// fs.unlinkSync('./copy.txt')

// Synchronous way - status
const status = fs.statSync('./read1.txt')
console.log(status);

// Synchronous way - create folder
fs.mkdirSync('myDocs/a/b', {recursive: true})