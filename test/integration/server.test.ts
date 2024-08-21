import request from "supertest";
import app from "../../src/app";
import { Shutdown } from "../../src/server";

describe("Server", () => {
  afterAll((done) => {
    Shutdown(done);
  });

  it(
    "Starts and has the proper test environment",
    async () => {
      expect(process.env.NODE_ENV).toBe("test");
      expect(app).toBeDefined();
    },
    10 * 1000
  );

  it("Returns 404 when the route requested is not found.", async () => {
    const response = await request(app).get("/a/cute/route/that/does/not/exist/");

    expect(response.status).toBe(404);
  }, 10000);
});
