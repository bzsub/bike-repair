require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");
const Repair = require("../models/repair");
const User = require("../models/user");
const Shop = require("../models/shop");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");


describe("/api/repair/ POST requests", () => {
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
    const response = await client.post("/api/repair/");

    // then
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({});
  });

  test("should return 400 without body", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0";
    const johnDoe = await User.create({
        _id: id,
        username: "johnDoe",
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.post("/api/repair/").send({});

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  test("should return 400 without comment", async () => {
    // given
    const id = "62cbb266d11db7131fe719a0";
    const johnDoe = await User.create({
        _id: id,
        username: "johnDoe",
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.post("/api/repair/").send({"badkey":"somevalue"});

    // then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({});
  });

  //need jwt decode validation
  test("should return 200 and Repair with comment, user_id, shop_id", async () => {
    // given

    const id = "62cbb266d11db7131fe719a0";
    const johnDoe = await User.create({
      _id: id,
      username: "johnDoe",
    });
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
    client.set("authorization", token);

    // when
    const response = await client.post("/api/repair/").send({
        "user_id": "62cbb266d11db7131fe719a0",
        "shop_id": "62cbb266d11db7131fe719a1",
        "comment":"repair comment"
    });

    // then
    expect(response.status).toBe(200);
  });
});

describe("/api/repair/:repair_id GET requests", () => {
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
      await deleteAll(Repair);
    });
  
    afterAll(async () => {
      await stopDb(connection, server);
    });
  
    /* test("should return 401 with invalid token", async () => {
        // given
        const id = "62cbb266d11db7131fe719a0";
        const johnDoe = await User.create({
            _id: id,
            username: "johnDoe",
        });
        const token = jwt.sign({ userId: id }, "bad_token");
        client.set("authorization", token);
    
        // when
        const response = await client.get("/api/repair/");
    
        // then
        expect(response.status).toBe(401);
        expect(response.body).toStrictEqual({});
    }); */

    test("should return 400 with invalid repair_id", async () => {
      // given
  
      // when
      const response = await client.get("/api/user/" + "bad_repair_id");
  
      // then
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({});
    });

    test("should return 400 if the DB doesn't find the repair_id", async () => {
        // given
        const id = "62cbb266d11db7131fe719a0"
        const johnDoe = await User.create({
            _id: id,
            username: "johnDoe",
        });
        const repairId = "62cbb266d11db7131fe719a9";
        const repairTest = await Repair.create({
            _id: repairId,
            "user_id": "62cbb266d11db7131fe719a2",
            "shop_id": "62cbb266d11db7131fe719a1",
            "comment":"repair comment"
        });
        await Repair.deleteMany()
        const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
        client.set("authorization", token);
    
        // when
        const response = await client.get("/api/user/" + repairId);
    
        // then
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({});
      });
  
    test("should return 200 and the Repair", async () => {
      // given
        const id = "62cbb266d11db7131fe719a0"
        const johnDoe = await User.create({
            _id: id,
            username: "johnDoe",
        });
        const repairId = "62cbb266d11db7131fe719a9";
        const repairTest = await Repair.create({
            _id: repairId,
            "user_id": "62cbb266d11db7131fe719a2",
            "shop_id": "62cbb266d11db7131fe719a1",
            "comment":"repair comment"
        });
      // when
      const response = await client.get(`/api/repair/` + repairId);
  
      // then
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({"__v": 0, "_id": repairId, "comment": "repair comment", "shop_id": "62cbb266d11db7131fe719a1", "status": "active", "user_id": "62cbb266d11db7131fe719a2"});
    }); 
});

describe("/api/repair/shop/:shop_id GET requests", () => {
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
      await deleteAll(Repair);
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
        const response = await client.get("/api/repair/shop/" + id);
    
        // then
        expect(response.status).toBe(401);
        expect(response.body).toStrictEqual({});
    });

    test("should return 200 and [] if the DB doesn't find any Repair with shop_id", async () => {
        // given
        const id = "62cbb266d11db7131fe719a8"
        const bikeShop = await Shop.create({
            _id: id,
            username: "JohnDoe",
            prices: {
                "flatTire": 1,
                "chainSwap": 1,
                "wheelSwap": 1,
            },
        });
        const repairId = "62cbb266d11db7131fe719a9";
        const repairTest = await Repair.create({
            _id: repairId,
            "user_id": "62cbb266d11db7131fe719a2",
            "shop_id": "62cbb266d11db7131fe719a1",
            "comment":"repair comment"
        });
        const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
        client.set("authorization", token);
    
        // when
        const response = await client.get("/api/repair/shop/" + id);
    
        // then
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([]);
    });
  
    test("should return 200 and all of the Repairs which shop._id === <Shop>._id", async () => {
        // given
        const id = "62cbb266d11db7131fe719a8"
        const bikeShop = await Shop.create({
            _id: id,
            username: "JohnDoe",
            prices: {
                "flatTire": 1,
                "chainSwap": 1,
                "wheelSwap": 1,
            },
        });
        const repairId = "62cbb266d11db7131fe719a9";
        const repairTest = await Repair.create({
            _id: repairId,
            "user_id": "62cbb266d11db7131fe719a2",
            "shop_id": id,
            "comment":"repair comment"
        });
        const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
        client.set("authorization", token);
    
      // when
      const response = await client.get(`/api/repair/shop/` + id);
  
      // then
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([{"__v": 0, "_id": repairId, "comment": "repair comment", "shop_id": id, "status": "active", "user_id": "62cbb266d11db7131fe719a2"}]);
    }); 
});

describe("/api/repair/:repair_id PATCH requests", () => {
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
      await deleteAll(Repair);
    });
  
    afterAll(async () => {
      await stopDb(connection, server);
    });
  
    test("should return 401 with invalid token", async () => {
      // given
        const id = "62cbb266d11db7131fe719a0"
        const johnDoe = await User.create({
            _id: id,
            username: "johnDoe",
        });
        const repairId = "62cbb266d11db7131fe719a9";
        const repairTest = await Repair.create({
            _id: repairId,
            "user_id": "62cbb266d11db7131fe719a2",
            "shop_id": "62cbb266d11db7131fe719a1",
            "comment":"repair comment"
        });
        const token = jwt.sign({ userId: id }, "bad_token");
        client.set("authorization", token);
    
        // when
        const response = await client.patch("/api/user/" + repairId);
    
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
        const repairId = "62cbb266d11db7131fe719a9";
        const repairTest = await Repair.create({
            _id: repairId,
            "user_id": "62cbb266d11db7131fe719a2",
            "shop_id": "62cbb266d11db7131fe719a1",
            "comment":"repair comment"
        });
        
        const token = jwt.sign({ userId: id2 }, process.env.SECRET_KEY);
        client.set("authorization", token);
    
        await User.deleteMany()
    
        // when
        const response = await client.patch("/api/repair/" + repairId);
    
        // then
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({});
    });
  
    test("should return 400 without body", async () => {
      // given
      const id = "62cbb266d11db7131fe719a0";
      const johnDoe = await User.create({
          _id: id,
          username: "johnDoe",
      }); 
      const repairId = "62cbb266d11db7131fe719a9";
      const repairTest = await Repair.create({
          _id: repairId,
          "user_id": "62cbb266d11db7131fe719a2",
          "shop_id": "62cbb266d11db7131fe719a1",
          "comment":"repair comment"
      });
      const token = jwt.sign({ userId: johnDoe._id }, process.env.SECRET_KEY);
      client.set("authorization", token);
  
      // when
      const response = await client.patch("/api/repair/" + repairId).send({});
  
      // then
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({});
    }); 

    test("should return 400 without status", async () => {
        // given
        const id = "62cbb266d11db7131fe719a0";
        const johnDoe = await User.create({
            _id: id,
            username: "johnDoe",
        }); 
        const repairId = "62cbb266d11db7131fe719a9";
        const repairTest = await Repair.create({
            _id: repairId,
            "user_id": "62cbb266d11db7131fe719a2",
            "shop_id": "62cbb266d11db7131fe719a1",
            "comment":"repair comment"
        });
        const token = jwt.sign({ userId: johnDoe._id }, process.env.SECRET_KEY);
        client.set("authorization", token);
    
        // when
        const response = await client.patch("/api/repair/" + repairId).send({"comment":"updated comment"});
    
        // then
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({});
      });
  
    //SHOULD UPDATE !!!
    //NEED TO TEST IT OR MODIFY CONTROLLER!!!!
    test("should return 200 and update the User", async () => {
      // given
        const id = "62cbb266d11db7131fe719a0"
        const johnDoe = await User.create({
            _id: id,
            username: "johnDoe",
        });
        const repairId = "62cbb266d11db7131fe719a9";
        const repairTest = await Repair.create({
            _id: repairId,
            "user_id": "62cbb266d11db7131fe719a2",
            "shop_id": "62cbb266d11db7131fe719a1",
            "comment":"repair comment"
        });
        const token = jwt.sign({ userId: id }, process.env.SECRET_KEY);
        client.set("authorization", token);
    
        // when
        const response = await client.patch("/api/repair/" + repairId).send({
            "status":"finished"
        });
    
        //then
        expect(response.status).toBe(200);
        const repairs = await Repair.find();
        expect(repairs[0].status).toStrictEqual("finished")
        expect(response.body).toStrictEqual({"__v": 0, "_id": repairId, "comment": "repair comment", "shop_id": "62cbb266d11db7131fe719a1", "status": "finished", "user_id": "62cbb266d11db7131fe719a2"});
    });
});

