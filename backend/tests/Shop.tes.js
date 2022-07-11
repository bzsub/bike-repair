require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");
const Shop = require("../models/shop");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");

describe("/api/shop/:shop_id DEL requests", () => {
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
  
    test("should return 401 with invalid token", async () => {
      // given
      const id = "62cbb266d11db7131fe719a0";
  
      const johnDoe = await User.create({
        _id: id,
        username: "johnDoe",
      });
      const token = jwt.sign({ userId: id }, "bad_token");
      client.set("authorization", token);
  
      // when
      const response = await client.delete("/api/user/" + id);
  
      // then
      expect(response.status).toBe(401);
      expect(response.body).toStrictEqual({});
    });
  
    test("should return 400 with different User's token", async () => {
      // given
      const id = "62cbb266d11db7131fe719a0";
      const id2 = "62cbb266d11db7131fe719a2";
  
      const johnDoe = await User.create({
        _id: id,
        username: "johnDoe",
      });
      const johnDoe2 = await User.create({
        _id: id2,
        username: "johnDoe2",
      });
      const token = jwt.sign({ userId: id2 }, process.env.SECRET_KEY);
      client.set("authorization", token);
  
      await User.deleteMany()
  
      // when
      const response = await client.delete("/api/user/" + id);
  
      // then
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({});
    });
  
    test("should return 400 with bad user_id", async () => {
      // given
      const johnDoe = await User.create({
          username: "johnDoe",
      });
      const token = jwt.sign({ userId: johnDoe._id }, process.env.SECRET_KEY);
      client.set("authorization", token);
  
      // when
      const response = await client.delete("/api/user/" + "bad_user_id");
  
      // then
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({});
    });
  
    test("should return 400 with deleted User's user_id", async () => {
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
      const response = await client.delete("/api/user/" + id);
  
      // then
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({});
    });
  
    test("should return 200 and the deleted User when user_id mathces a User", async () => {
      // given
      const id = "62cbb266d11db7131fe719a0"
      const johnDoe = await User.create({
        _id: id,
        username: "johnDoe",
      });
      const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
      client.set("authorization", token);
  
  
      // when
      const response = await client.delete("/api/user/" + id);
  
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

