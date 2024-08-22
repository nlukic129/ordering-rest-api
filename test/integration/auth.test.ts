import request from "supertest";
import jwt from "jsonwebtoken";

import app from "../../src/app";
import { prisma } from "../../src/server";
import { Shutdown } from "../../src/server";
import { TUserRoles } from "../../src/api/v1/models/user";
import { JWT_SECRET_KEY } from "../../src/config/config";
import { registerService } from "../../src/api/v1/services/authServices";
import { log } from "console";

const testUserData = {
  username: "admin-test",
  password: "S3cureP@ssword!",
  role: "",
};

const generateUserToken = (role: TUserRoles) => {
  const adminUser = {
    uuid: "admin-uuid",
    username: testUserData.username,
    role: role,
  };

  return jwt.sign(adminUser, JWT_SECRET_KEY, { expiresIn: "1h" });
};

const getUserRole = async (roleName: string) => {
  const role = await prisma.role.findFirst({ where: { name: roleName }, select: { uuid: true } });

  if (role === null) {
    logging.error(`Role "${roleName}" not found, skipping tests.`);
    throw new Error(`Role "${roleName}" not found, skipping tests.`);
  }

  return role;
};

const deleteUserData = async (username: string) => {
  await prisma.user.delete({
    where: { username },
  });
};

beforeAll((done) => {
  done();
});

afterAll((done) => {
  Shutdown(done);
});

describe("POST /login", () => {
  beforeAll(async () => {
    try {
      const adminRole = await getUserRole("ADMIN");
      await registerService(testUserData.username, testUserData.password, adminRole.uuid);
    } catch (err) {
      logging.error("Error during beforeAll setup in POST /login:", err);
      throw err;
    }
  });

  afterAll(async () => {
    await deleteUserData(testUserData.username);
  });

  describe("When user gives correct username and password", () => {
    it("should return 200 and log in", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({ username: testUserData.username, password: testUserData.password });

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
      const response = await request(app).post("/api/v1/auth/login").send({ username: "", password: testUserData.password });

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
      const response = await request(app).post("/api/v1/auth/login").send({ username: "incorrectUsername", password: testUserData.password });

      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(false);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User not found.");

      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toBe("Not Found");
    });
  });

  describe("When user gives incorrect password", () => {
    it("should return an invalid password error", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({ username: testUserData.username, password: "S3cureP@ssword!!" });

      expect(response.status).toBe(401);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(false);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Invalid password.");

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
        .send({ username: testUserData.username, password: testUserData.password });

      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(false);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("You are already logged in.");

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

  describe("When user is not logged in", () => {
    it("should return message that user are not logged in", async () => {
      const response = await request(app).post("/api/v1/auth/logout");

      expect(response.status).toBe(401);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(false);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("You must be logged in, please login.");

      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toBe("Authentication Error");
    });
  });
});

describe("POST /register", () => {
  describe("User with ADMIN role", () => {
    beforeAll(async () => {
      try {
        const adminRole = await getUserRole("ADMIN");
        await registerService(testUserData.username, testUserData.password, adminRole.uuid);
      } catch (err) {
        logging.error("Error during beforeAll setup in POST /register:", err);
        throw err;
      }
    });

    afterAll(async () => {
      await deleteUserData(testUserData.username);
    });

    it("should return 201 and register user", async () => {
      const managerRole = await getUserRole("MANAGER");
      const userToken = generateUserToken("ADMIN");

      const response = await request(app).post("/api/v1/auth/register").set("Cookie", `jwt=${userToken}`).send({
        username: "testUser",
        password: "S3cureP@ssword!",
        confirmPassword: "S3cureP@ssword!",
        roleId: managerRole.uuid,
      });

      console.log(response.body);

      expect(response.status).toBe(201);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(true);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User registered successfully.");

      await deleteUserData("testUser");
    });
  });

  describe("User with non ADMIN role", () => {
    beforeAll(async () => {
      try {
        const managerRole = await getUserRole("MANAGER");
        await registerService(testUserData.username, testUserData.password, managerRole.uuid);
      } catch (err) {
        logging.error("Error during beforeAll setup in POST /register:", err);
        throw err;
      }
    });

    afterAll(async () => {
      await deleteUserData(testUserData.username);
    });

    it("should return permission error ", async () => {
      const userRole = await getUserRole("ADMIN");
      const userToken = generateUserToken("MANAGER");

      const response = await request(app).post("/api/v1/auth/register").set("Cookie", `jwt=${userToken}`).send({
        username: "testUser",
        password: "S3cureP@ssword!",
        confirmPassword: "S3cureP@ssword!",
        roleId: userRole.uuid,
      });

      expect(response.status).toBe(403);

      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(false);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("You do not have the necessary permissions to access this resource.");

      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toBe("Authorization Error");
    });
  });
});
