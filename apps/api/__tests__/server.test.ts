import supertest from "supertest";
import { createServer } from "../src/server";

describe("server", () => {
  it("should start the server", async () => {
    await supertest(createServer())
      .get("/")
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("tessellator-api is running!");
      });
  });
});
