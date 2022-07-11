require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");
const User = require("../models/user");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");

describe("/api/user/:user_id GET requests", () => {
  let connection;
  let server;
  let client;

  beforeAll(async () => {
    const result = await startDb();
    connection = result[0];
    server = result[1];
    client = mockServer.agent(app);
  });

  afterEach(async () => {
    await deleteAll(User);
  });

  afterAll(async () => {
    await stopDb(connection, server);
  });

  test("For badly formatted user_id should return 400 and empty response", async () => {
    // given

    // when
    const response = await client.get("/api/user/" + "bad_user_id");

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  test("For good formatted but non existing user_id should return 400 and empty response", async () => {
    // given
    const actualId = "62cbb266d11db7131fe719a0";
    const fakeId = "62cbb266d11db7131fe719a1";

    const johnDoe = await User.create({
      _id: actualId,
      username: "johnDoe",
    });
    const token = jwt.sign({ userId: actualId }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.get(`/api/user/` + fakeId);

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  test("For deleted User should return 400 and empty response", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0";

    const johnDoe = await User.create({
      _id: id,
      username: "johnDoe",
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    await User.deleteMany()

    // when
    const response = await client.get(`/api/user/` + id);

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  test("For existing user_id should return 200 and the User", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0"
    const johnDoe = await User.create({
      _id: id,
      username: "johnDoe",
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);


    // when
    const response = await client.get(`/api/user/` + id);

    // then
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
         "__v": 0,
         "_id": id,
         "entity": "user",
         "username": "johnDoe",
       });
  });

  
});
