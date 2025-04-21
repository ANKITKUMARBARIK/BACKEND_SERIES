const fs = require('fs')
const filePath = "./tasks.json"

const command = process.argv[2]  // -> command
const argument = process.argv[3]  // -> argument

const loadTask = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath) // binary/raw data
        const dataJSON = dataBuffer.toString() // string data
        return JSON.parse(dataJSON) // array/object data
    } catch (error) {
        return []
    }
}

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks)
    fs.writeFileSync(filePath, dataJSON)
}

const addTask = (task) => {
    const tasks = loadTask()
    tasks.push({ task })
    saveTasks(tasks)
    console.log("Task added", task);
}

const listTasks = () => {
    const tasks = loadTask()
    tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`))
}

const removeTask = (index) => {
    const tasks = loadTask()
    if (index > 0 && index <= tasks.length) {
        const removed = tasks.splice(index - 1, 1) // index-1 because list 1 se start ho rahi hai, and 1 because ek hi task delete krna h
        saveTasks(tasks)
        console.log(`Removed task: ${removed[0].task}`)
    } else {
        console.log("Invalid task index!")
    }
}

// starting point
if (command === 'add') {
    addTask(argument)
} else if (command === 'list') {
    listTasks()
} else if (command === 'remove') {
    removeTask(parseInt(argument))
} else {
    console.log('Command not found !');
}


// Run command :- 
// node TaskCLI.js add "vibe"
// node TaskCLI.js list
// node TaskCLI.js remove 2