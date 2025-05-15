import mongoose from "mongoose";

async function mongoConnect(url) {
    return mongoose.connect(url);
}

export default mongoConnect;
