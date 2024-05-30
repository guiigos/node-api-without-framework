import { describe, before, after, it } from "node:test";
import { deepEqual, ok } from "node:assert";

const task = {
  name: "NAME",
  description: "DESCRIPTION",
};

const BASE_URL = "http://localhost";
describe("Test API /tasks", () => {
  process.env.NODE_ENV = "test";
  let _app;
  let _port;
  let _id;

  before(async () => {
    const server = await import("../src/bin/www.mjs");
    _app = server.app;
    _port = server.PORT;

    await new Promise(resolve => _app.once('listening', resolve));
  });

  it("should be create new task", async () => {
    const post = await fetch(`${BASE_URL}:${_port}/tasks`, {
      method: "POST",
      body: JSON.stringify(task),
    });

    deepEqual(post.status, 200);
  });

  it("should be return all tasks", async () => {
    const get = await fetch(`${BASE_URL}:${_port}/tasks`, {
      method: "GET",
    });

    deepEqual(get.status, 200);
    const response = await get.json();

    ok(response.length === 1, "Amount of data that returned invalid");
    ok(response[0].name === task.name, "Name invalid");
    ok(response[0].description === task.description, "Description invalid");

    _id = response[0]._id;
  });

  it("should be return only tasks", async () => {
    const get = await fetch(`${BASE_URL}:${_port}/tasks?id=${_id}`, {
      method: "GET",
    });

    deepEqual(get.status, 200);
    const response = await get.json();

    ok(response.name === task.name, "Name invalid");
    ok(response.description === task.description, "Description invalid");
  });

  it("should be update tasks", async () => {
    const name = "NEW NAME";
    const description = "NEW DESCRIPTION";

    const put = await fetch(`${BASE_URL}:${_port}/tasks?id=${_id}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        description,
      }),
    });

    deepEqual(put.status, 200);

    const get = await fetch(`${BASE_URL}:${_port}/tasks?id=${_id}`, {
      method: "GET",
    });

    deepEqual(get.status, 200);
    const response = await get.json();

    ok(response.name === name, "Name invalid");
    ok(response.description === description, "Description invalid");
  });

  it("should be delete tasks", async () => {
    const del = await fetch(`${BASE_URL}:${_port}/tasks?id=${_id}`, {
      method: "DELETE",
    });

    deepEqual(del.status, 200);

    const get = await fetch(`${BASE_URL}:${_port}/tasks?id=${_id}`, {
      method: "GET",
    });

    deepEqual(get.status, 200);
    const response = await get.json();

    ok(!response, "Deleted failed");
  });

  after(done => _app.close(done));
});
