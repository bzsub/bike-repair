require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");
const User = require("../models/user");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");


describe("/api/user/ POST requests", () => {
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
    const johnDoe = await User.create({
      username: "johnDoe",
    });
    const token = jwt.sign({ userId: johnDoe._id }, "bad_token");
    client.set("authorization", token);

    // when
    const response = await client.post("/api/user/").send({
      username:"ola"
    });

    // then
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({});
  });

  test("should return 400 without body", async () => {
    // given
    const johnDoe = await User.create({
      username: "johnDoe",
    });
    const token = jwt.sign({ userId: johnDoe._id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.post("/api/user/").send({});

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  test("should return 400 without username", async () => {
    // given
    const johnDoe = await User.create({
      username: "johnDoe",
    });
    const token = jwt.sign({ userId: johnDoe._id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.post("/api/user/").send({"badkey":"somevalue"});

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  //need jwt decode validation
  test("should return 200 with updated token (with same payload.userId) and save User", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0";
    await User.deleteMany();
    const johnDoe = await User.create({
      _id: id,
      username: "johnDoe",
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);
    await User.deleteMany();

    // when
    const response = await client.post("/api/user/").send({
      "username":"new user"
    });

    // then
    expect(response.status).toBe(200);
    /* const responseToken = jwt.decode(response.body.token);
    const originalToken = jwt.decode(token);
    expect(responseToken.userId).toEqual(originalToken.userId) 
    const users = await User.find();
    expect(users[0]).toStrictEqual({
      "__v": 0,
      "_id": id,
      "entity": "user",
      "username": "johnDoe",
    });*/
    expect(response.body.token).not.toBe(null);
    expect(response.body.token).not.toEqual(token);
  });

});

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

describe("/api/user/:user_id PATCH requests", () => {
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
      const response = await client.patch("/api/user/" + id);
  
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
      const response = await client.patch("/api/user/" + id);
  
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
      const response = await client.patch("/api/user/" + "bad_user_id");
  
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
      const response = await client.patch("/api/user/" + id);
  
      // then
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({});
    });
  
    test("should return 400 without body", async () => {
      // given
      const id = "62cbb266d11db7131fe719a0"
      const johnDoe = await User.create({
        _id: id,
        username: "johnDoe",
      });
      const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
      client.set("authorization", token);
  
      // when
      const response = await client.patch("/api/user/" + id).send({});
  
      // then
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({});
    }); 
  
    // SHOULD UPDATE 
    test("should return 200 and update the User", async () => {
      // given
      const id = "62cbb266d11db7131fe719a0"
      const johnDoe = await User.create({
        _id: id,
        username: "johnDoe",
      });
      const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
      client.set("authorization", token);
  
      // when
      const response = await client.patch("/api/user/" + id).send({
        "username":"new username"
      });
  
      //then
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({"__v": 0, "_id": id, "entity": "user", "username": "new username"});
    });
});

describe("/api/user/:user_id DEL requests", () => {
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

    const users = await User.find()
    expect(users).toStrictEqual([])
  }); 
  
});
