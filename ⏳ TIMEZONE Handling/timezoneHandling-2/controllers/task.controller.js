import Task from "../models/task.model.js";

async function handleCreate(req, res) {
    const { title } = req.body;
    if (!title) return res.status(400).json({ msg: "all fields req..." });
    const result = await Task.create({
        title,
    });

    return res.redirect("/");
}

export default handleCreate;
