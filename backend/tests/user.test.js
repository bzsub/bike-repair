require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");
const User = require("../models/user");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");

describe("api/user", () => {
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

  test("post request to api/user - when db empty - returns the creasted user ", async () => {
    // given
    const token = jwt.sign({ userId: "" }, process.env.SECRET_KEY);

    client.set("authorization", token);
    // can be multiple client.set();

    // when
    const response = await client.post("/api/user",{
       
    });

    // then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData.user.dashboards).toStrictEqual([]);
  });
});
