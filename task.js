const fs = require('fs');

// add task
const addTask = function(title, description) {
    // get old task
    const tasks = getTask();
    // check exists task
    const checkTask = tasks.find((item) => {
        return item.title === title;
    })
    if (checkTask) return;
    // add task
    const task = { title, description };
    tasks.push(task);
    saveTask(tasks);

}

// remove task
const deleteTask = function(title) {
    const tasks = getTask();
    const index = tasks.findIndex((item) => {
        return item.title === title;
    })
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTask(tasks);
    }
};

// list all task
const listAllTask = function() {
    const tasks = getTask();
    tasks.forEach((element, index) => {
        console.log(index + 1, "title:", element.title);
        console.log("description:", element.description);
        console.log("---")
    });
}

const saveTask = function(tasks) {
    const taskJSON = JSON.stringify(tasks);
    fs.writeFileSync("task.json", taskJSON);
}

const getTask = function() {
    try {
        const taskBuffer = fs.readFileSync('task.json');
        const taskJSON = taskBuffer.toString();
        return JSON.parse(taskJSON);
    } catch (error) {
        return []
    }
}

// const student = { name: "Bao", age: "24" }
// console.log(student)
// const studentJSON = JSON.stringify(student);
// console.log(studentJSON)

module.exports = {
    addTask,
    deleteTask,
    listAllTask,
}