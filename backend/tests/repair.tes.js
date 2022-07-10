require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");
// const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/user");
const Repair = require("../models/repair");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");

describe("requests to api/repair", () => {
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
    await deleteAll(Repair);
  });

  afterAll(async () => {
    await stopDb(connection, server);
  });

  test("request to api/repair with empty db should return null and 400", async () => {
    // given
    const johnDoe = new User({
        username: "johnDoe",
    });
    const token = jwt.sign({ userId: johnDoe._id }, process.env.SECRET_KEY);

    client.set("authorization", token);
    // can be multiple client.set();

    // when
    const response = await client.get(`/api/repair`);

    // then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData).toStrictEqual([]);
  });

  /* test("request to api/repair after server starts return null and 200", async () => {
    // given
    const johnDoe = new User({
        username: "johnDoe",
    });
    const firstRepair = await Repair.create({
        user_id: "1234",
        shop_id: "1234", 
        comment:"1234",
        status:"active",
    });
    const token = jwt.sign({ userId: johnDoe._id }, process.env.SECRET_KEY);

    client.set("authorization", token);
    // can be multiple client.set();

    // when
    const response = await client.get(`/api/repair/${firstRepair._id}`);

    // then
    expect(response.status).toBe(200);
    //expect(response.data).toStrictEqual([]);
  }); */

  /* test("deleted user returns null object", async () => {
    // given
    const johnDoe = new User({
      username: "johnDoe",
    });
    await johnDoe.save();
    const token = jwt.sign({ userId: johnDoe._id }, process.env.SECRET_KEY);

    await User.deleteMany();

    client.set("authorization", token);

    // when
    const response = await client.get("/api/dashboards");

    // then
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ user: null });
  }); */
});
