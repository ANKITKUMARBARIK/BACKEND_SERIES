import dotenv from "dotenv";
import mongoConnect from "./connection.js";
import User from "./models/user.model.js";
import generateUsers from "./seed/user.seed.js";

dotenv.config();

// import data
async function importData() {
    try {
        await User.deleteMany();
        const users = generateUsers(10);
        await User.insertMany(users);
        console.log("✅ Data Imported!");
        process.exit(); // Script successfully(0) band kar deta hai
    } catch (err) {
        console.error("❌ Import Error:", err.message);
        process.exit(1); // Script error(1) ke saath band kar deta hai
    }
}

// destroy data
async function destroyData() {
    try {
        await User.deleteMany();
        console.log("🗑️ All Users Deleted!");
        process.exit();
    } catch (err) {
        console.error("❌ Destroy Error:", err.message);
        process.exit(1);
    }
}

// run based on argument
async function runSeeder() {
    await mongoConnect(process.env.MONGO_URI);

    const action = process.argv[2]; // e.g., node seeder.js -d
    if (action === "-d") {
        await destroyData();
    } else {
        await importData();
    }
}

runSeeder();

// RUN:-
// npm run seed:import
// npm run seed:destroy
