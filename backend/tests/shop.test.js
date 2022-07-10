require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");
// const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/user");
const Shop = require("../models/shop");
const Repair = require("../models/repair");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");

describe("requests to api/shop", () => {
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

  test("api/shop with empty db should return null and 200", async () => {
    // given
    const johnDoe = new User({
        username: "johnDoe",
    });
    const token = jwt.sign({ userId: johnDoe._id }, process.env.SECRET_KEY);

    client.set("authorization", token);
    // can be multiple client.set();

    // when
    const response = await client.get(`/api/shop`);

    // then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData).toStrictEqual([]);
  });

  test("request to api/shop with 1 shop in db should return with 1 shop and 200", async () => {
    // given
    const johnDoe = new User({
        username: "johnDoe",
    });
    const shop = await Shop.create({
        username: "shop1",
        prices: {
            "flatTire": 1,
            "chainSwap": 1,
            "wheelSwap": 1,
        },
        providers: {},
    });
    const token = jwt.sign({ userId: johnDoe._id }, process.env.SECRET_KEY);

    client.set("authorization", token);
    // can be multiple client.set();

    // when
    const response = await client.get(`/api/shop/post`, {
        username: "shop1",
        prices: {
            "flatTire": 1,
            "chainSwap": 1,
            "wheelSwap": 1,
        },
        providers: {},
    });

    // then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData).toStrictEqual({
        username: "shop1",
        prices: {
            "flatTire": 1,
            "chainSwap": 1,
            "wheelSwap": 1,
        },
        providers: {},
    });
  });
  /* const shop = await ShopService.saveShop({
        username: req.body.username,
        prices: req.body.prices,
        providers: res.locals.entity.providers,
    });

    const token = jwt.sign({ userId: shop._id, entity: shop.entity, providers: shop.providers }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token }); */

});
