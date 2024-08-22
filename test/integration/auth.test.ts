import request from "supertest";
import jwt from "jsonwebtoken";

import app from "../../src/app";
import { Shutdown } from "../../src/server";
import { TUserRoles } from "../../src/api/v1/models/user";
import { JWT_SECRET_KEY } from "../../src/config/config";

const generateUserToken = (role: TUserRoles) => {
  const adminUser = {
    uuid: "admin-uuid",
    username: "admin",
    role: role,
  };

  return jwt.sign(adminUser, JWT_SECRET_KEY, { expiresIn: "1h" });
};

beforeAll((done) => {
  done();
});

afterAll((done) => {
  Shutdown(done);
});

describe("POST /login", () => {
  describe("When user gives correct username and password", () => {
    it("should return 200 and log in", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({ username: "admin", password: "S3cureP@ssword!" });

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(true);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User logged in successfully.");

      expect(response.body).toHaveProperty("data");
      expect(typeof response.body.data).toBe("object");

      expect(response.headers["set-cookie"]).toBeDefined();
    });
  });

  describe("When user gives invalid username", () => {
    it("should return an invalid username error", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({ username: "", password: "S3cureP@ssword!" });

      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(false);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Username cannot be empty.");

      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toBe("Bad Request");
    });
  });

  describe("When user gives username that not exist", () => {
    it("should return an invalid not existing username error", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({ username: "incorrectUsername", password: "S3cureP@ssword!" });

      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(false);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User not found");

      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toBe("Not Found");
    });
  });

  describe("When user gives incorrect password", () => {
    it("should return an invalid password error", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({ username: "admin", password: "S3cureP@ssword!!" });

      expect(response.status).toBe(401);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(false);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Invalid password");

      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toBe("Unauthorized");
    });
  });

  describe("When user is already logged in", () => {
    const userToken = generateUserToken("ADMIN");

    it("should return message that user are already logged in", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .set("Cookie", `jwt=${userToken}`)
        .send({ username: "admin", password: "S3cureP@ssword!" });

      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(false);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("You are already logged in");

      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toBe("Authentication Error");
    });
  });
});

describe("POST /logout", () => {
  describe("When user is logged in", () => {
    const userToken = generateUserToken("ADMIN");

    it("should return 200 and log out", async () => {
      const response = await request(app).post("/api/v1/auth/logout").set("Cookie", `jwt=${userToken}`);

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(true);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User logged out successfully.");

      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toContain("jwt=;");
    });
  });

  describe("When user has not valid token", () => {
    it("should return message that user are not logged in", async () => {
      const response = await request(app).post("/api/v1/auth/logout");

      console.log(response.body);

      expect(response.status).toBe(401);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(false);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("You must be logged in, please login.");

      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toBe("Authentication Error");
    });

    it("should return an invalid token error", async () => {
      const response = await request(app).post("/api/v1/auth/logout").set("Cookie", "jwt=invalidToken");

      expect(response.status).toBe(403);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(false);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Your token is not valid, please login.");

      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toBe("Authentication Error");
    });
  });
});
