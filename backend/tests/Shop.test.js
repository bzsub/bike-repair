require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");
const Shop = require("../models/shop");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");

describe("/api/shop/ GET requests", () => {
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
    await deleteAll(Shop);
  });

  afterAll(async () => {
    await stopDb(connection, server);
  });

  test("should return 200", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0"
    const bikeShop = await Shop.create({
      _id: id,
      username: "JohnDoe",
      "prices": {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.get("/api/shop/");

    // then
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([{"__v": 0, "_id": "62cbb266d11db7131fe719a0", "entity": "shop", "prices": {"chainSwap": 1, "flatTire": 1, "wheelSwap": 1}, "username": "JohnDoe"}]);
  });
});

describe("/api/shop/ POST requests", () => {
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
    await deleteAll(Shop);
  });

  afterAll(async () => {
    await stopDb(connection, server);
  });

  test("should return 401 with invalid token", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0"
    const bikeShop = await Shop.create({
      _id: id,
      username: "JohnDoe",
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: id }, "bad_token");
    client.set("authorization", token);

    // when
    const response = await client.post("/api/shop/")

    // then
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({});
  });

  test("should return 400 without body", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0"
    const bikeShop = await Shop.create({
      _id: id,
      username: "JohnDoe",
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.post("/api/shop/").send({});

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  test("should return 400 without prices", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0"
    const bikeShop = await Shop.create({
      _id: id,
      username: "JohnDoe",
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.post("/api/shop/").send({"badkey":"somevalue"});

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  test("should return 400 without username", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0"
    const bikeShop = await Shop.create({
      _id: id,
      username: "JohnDoe",
      "prices": {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.post("/api/shop/").send({
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap":1
      }
    });

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  //need jwt decode validation
  test("should return 200 with updated token (with same payload.userId) and save Shop", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0"
    const bikeShop = await Shop.create({
      _id: id,
      username: "JohnDoe",
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.post("/api/shop/").send({
      "username":"new user",
      "prices": {
        "flatTire": 2,
        "chainSwap": 2,
        "wheelSwap": 2,
      }
    });

    // then
    expect(response.status).toBe(200);
    expect(response.body.token).not.toBe(null);
    expect(response.body.token).not.toEqual(token);
    /*const responseToken = jwt.decode(response.body.token);
    const originalToken = jwt.decode(token);
    expect(responseToken.userId).toEqual(originalToken.userId) 
    */
    const shops = await Shop.find();
    expect(shops[1].username).toStrictEqual("new user");
    expect(shops[1].prices.flatTire).toBe(2)
    expect(shops[1].prices.chainSwap).toBe(2)
    expect(shops[1].prices.wheelSwap).toBe(2)  
  });
});

describe("/api/shop/:shop_id GET requests", () => {
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
    await deleteAll(Shop);
  });

  afterAll(async () => {
    await stopDb(connection, server);
  });

  test("should return 400 with invalid shop_id", async () => {
    // given

    // when
    const response = await client.get("/api/shop/" + "bad_shop_id");

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  /* test("should return 400 with deleted Shop's shop_id", async () => {
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
  }); */

  test("should return 200 and the Shop with valid shop_id", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0"
    const bikeShop = await Shop.create({
      _id: id,
      username: "JohnDoe",
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);


    // when
    const response = await client.get(`/api/shop/` + id);

    // then
    expect(response.status).toBe(200);
    expect(response.body.username).toStrictEqual("JohnDoe");
    expect(response.body.prices).toStrictEqual({
      "flatTire": 1,
      "chainSwap": 1,
      "wheelSwap": 1,
    });
  }); 
});

describe("/api/shop/:shop_id PATCH requests", () => {
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
    await deleteAll(Shop);
  });

  afterAll(async () => {
    await stopDb(connection, server);
  });

  test("should return 401 with invalid token", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0";

    const bikeShop = await Shop.create({
      _id: id,
      username: "JohnDoe",
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: id }, "bad_token");
    client.set("authorization", token);

    // when
    const response = await client.patch("/api/shop/" + id);

    // then
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({});
  });

  test("should return 400 with different Shop's token", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0";
    const id2 = "62cbb266d11db7131fe719a2";

    const bikeShop = await Shop.create({
      _id: id,
      username: "JohnDoe",
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const bikeShop2 = await Shop.create({
      _id: id2,
      username: "JohnDoe",
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: id2 }, process.env.SECRET_KEY);
    client.set("authorization", token);

    await Shop.deleteMany()

    // when
    const response = await client.patch("/api/shop/" + id);

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  test("should return 400 with bad shop_id", async () => {
    // given
    const bikeShop = await Shop.create({
      username: "JohnDoe",
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: bikeShop._id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.patch("/api/shop/" + "bad_shop_id");

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  test("should return 400 with deleted Shop's shop_id", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0";

    const bikeShop = await Shop.create({
      _id: id,
      username: "JohnDoe",
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    await Shop.deleteMany()

    // when
    const response = await client.patch("/api/shop/" + id);

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  test("should return 400 without body", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0"
    const bikeShop = await Shop.create({
      username: "JohnDoe",
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.patch("/api/shop/" + id).send({});

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  }); 

  // SHOULD UPDATE 
  test("should return 200 and update the User", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0"
    const bikeShop = await Shop.create({
      _id: id,
      username: "JohnDoe",
      prices: {
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      },
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.patch("/api/shop/" + id).send({
      "username":"new username"
    });

    //then
    expect(response.status).toBe(200);
    expect(response.body.username).toStrictEqual("new username");
    expect(response.body.prices).toStrictEqual({
      "flatTire": 1,
      "chainSwap": 1,
      "wheelSwap": 1,
    });
    const shops = await Shop.find();
    expect(shops[0].username).toStrictEqual("new username")
  });
});

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
      await deleteAll(Shop);
    });
  
    afterAll(async () => {
      await stopDb(connection, server);
    });
  
    test("should return 401 with invalid token", async () => {
      // given
      const id = "62cbb266d11db7131fe719a0";
  
      const bikeShop = await Shop.create({
        username: "JohnDoe",
        prices: {
          "flatTire": 1,
          "chainSwap": 1,
          "wheelSwap": 1,
        },
      });
      const token = jwt.sign({ userId: id }, "bad_token");
      client.set("authorization", token);
  
      // when
      const response = await client.delete("/api/shop/" + id);
  
      // then
      expect(response.status).toBe(401);
      expect(response.body).toStrictEqual({});
    });
  
    test("should return 400 with different Shop's token", async () => {
      // given
      const id = "62cbb266d11db7131fe719a0";
      const id2 = "62cbb266d11db7131fe719a2";
  
      const bikeShop = await Shop.create({
        _id: id,
        username: "JohnDoe",
        prices: {
          "flatTire": 1,
          "chainSwap": 1,
          "wheelSwap": 1,
        },
      });
      const bikeShop2 = await Shop.create({
        _id: id2,
        username: "JohnDoe",
        prices: {
          "flatTire": 1,
          "chainSwap": 1,
          "wheelSwap": 1,
        },
      });
      const token = jwt.sign({ userId: id2 }, process.env.SECRET_KEY);
      client.set("authorization", token);
  
      // when
      const response = await client.delete("/api/shop/" + id);
  
      // then
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({});
    });
  
    test("should return 400 with bad shop_id", async () => {
      // given
      const bikeShop = await Shop.create({
        username: "JohnDoe",
        prices: {
          "flatTire": 1,
          "chainSwap": 1,
          "wheelSwap": 1,
        },
      });
      const token = jwt.sign({ userId: bikeShop._id }, process.env.SECRET_KEY);
      client.set("authorization", token);
  
      // when
      const response = await client.delete("/api/shop/" + "bad_user_id");
  
      // then
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({});
    });
  
    /* test("should return 400 with deleted Shop's shop_id", async () => {
      // given
      const id = "62cbb266d11db7131fe719a0";
  
      const bikeShop = await Shop.create({
        _id: id,
        username: "JohnDoe",
        prices: {
          "flatTire": 1,
          "chainSwap": 1,
          "wheelSwap": 1,
        },
      });
      const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
      client.set("authorization", token);
  
      await Shop.deleteMany()
  
      // when
      const response = await client.delete("/api/shop/" + id);
  
      // then
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({});
    }); */
  
    test("should return 200 and the deleted User when user_id mathces a User", async () => {
      // given
      const id = "62cbb266d11db7131fe719a0"
      const bikeShop = await Shop.create({
        _id: id,
        username: "JohnDoe",
        prices: {
          "flatTire": 1,
          "chainSwap": 1,
          "wheelSwap": 1,
        },
      });
      const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
      client.set("authorization", token);
  
  
      // when
      const response = await client.delete("/api/shop/" + id);
  
      // then
      expect(response.status).toBe(200);
      expect(response.body.username).toStrictEqual("JohnDoe");
      expect(response.body.prices).toStrictEqual({
        "flatTire": 1,
        "chainSwap": 1,
        "wheelSwap": 1,
      });
      const shops = await Shop.find()
      expect(shops).toStrictEqual([])
    }); 
    
});


