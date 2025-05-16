import { faker } from "@faker-js/faker";

function generateUsers(count = 5) {
    const users = [];

    for (let i = 0; i < count; i++) {
        const user = {
            fullName: faker.person.fullName(),
            email: faker.internet.email(),
            gender: faker.person.gender(),
            role: faker.helpers.arrayElement(["admin", "user", "moderator"]),
        };
        users.push(user);
    }

    return users;
}

export default generateUsers;
