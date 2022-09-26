import app from "../src/app";
import request from "supertest";

describe("GET /tasks", () => {
    test("Should respond with a 200 status code", async () => {
        const response = await request(app).get("/tasks").send();
        expect(response.statusCode).toBe(200);
    });

    test("Should return an array", async () => {
        const response = await request(app).get("/tasks").send();
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe("POST /tasks", () => {
    describe("Given title and description", () => {
        const newTask = {
            title: "test task",
            description: "test description",
        };
        test("Should respond with a 200 status code", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.statusCode).toBe(200);
        });
        test("Should respond with a content-type of application/json", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.header["content-type"]).toEqual(expect.stringContaining("application/json"));
        });

        test("Should return a json object containing a new task with an id", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.body.id).toBeDefined();
        });
    });

    describe("Not given title and description", () => {
        test("Should respond with 400 status code", async () => {
            const response = await request(app).post("/tasks").send({});
            expect(response.statusCode).toBe(400);

            const fields = [{}, { title: "Test task" }, { description: "Test Description" }];

            for (const body of fields) {
                const response = await request(app).post("/tasks").send(body);
                expect(response.statusCode).toBe(400);
            }
        });
    });
});
