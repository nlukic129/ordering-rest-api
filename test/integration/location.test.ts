import request from "supertest";

import app from "../../src/app";
import { prisma, Shutdown } from "../../src/server";
import { registerService } from "../../src/api/v1/services/authServices";
import { deleteUserData, generateUserToken, getUserRole, testUserData } from "../utils";

const deleteLocationData = async (name: string) => {
  await prisma.location.delete({
    where: { name },
  });
};

beforeAll((done) => {
  done();
});

afterAll((done) => {
  Shutdown(done);
});

describe("POST /", () => {
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

    describe("When user gives correct data", () => {
      it("should return 201 and create location", async () => {
        const userToken = generateUserToken("ADMIN");

        const response = await request(app)
          .post("/api/v1/location/")
          .set("Cookie", `jwt=${userToken}`)
          .send({
            name: "location-test",
            displayName: "LocationTest",
            coordinates: {
              x: 5,
              y: 5,
            },
          });

        expect(response.status).toBe(201);

        expect(response.body).toHaveProperty("success");
        expect(response.body.success).toBe(true);

        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Location created successfully.");

        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("uuid");
        expect(response.body.data).toHaveProperty("name");
        expect(response.body.data).toHaveProperty("display_name");
        expect(response.body.data).toHaveProperty("coordinates");
        expect(response.body.data.coordinates).toHaveProperty("x");
        expect(response.body.data.coordinates).toHaveProperty("y");

        await deleteLocationData("location-test");
      });
    });
  });
});
