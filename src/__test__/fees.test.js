import request from "supertest";
import app from "../";
import DbModule from "../config/db";
import {
  feeConfigurationSpec,
  feeSampleOne,
  feeSampleTwo,
  feeSampleThreeForUSD,
} from "./feeMocks";

describe("Tests for lannister pay fee routes:", function () {
  beforeAll(async () => {
    await request(app)
      .post("/fees")
      .send({ FeeConfigurationSpec: feeConfigurationSpec });
  });

  afterAll(async () => {
    await DbModule.clean();
    return;
  });

  it("should compute transaction fee for sample data 1", async () => {
    const result = await request(app)
      .post("/compute-transaction-fee")
      .send(feeSampleOne);

    expect(result.statusCode).toBe(200);
    expect(result.body).toStrictEqual({
      AppliedFeeID: "LNPY1223",
      AppliedFeeValue: 120,
      ChargeAmount: 5120,
      SettlementAmount: 5000,
    });
  });

  it("should compute transaction fee for sample data 2", async () => {
    const response = await request(app)
      .post("/compute-transaction-fee")
      .send(feeSampleTwo);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      AppliedFeeID: "LNPY1221",
      AppliedFeeValue: 49,
      ChargeAmount: 3500,
      SettlementAmount: 3451,
    });
  });

  it("should not compute transaction fee for invalid currency", async () => {
    const response = await request(app)
      .post("/compute-transaction-fee")
      .send(feeSampleThreeForUSD);
    expect(response.statusCode).toBe(400);
    expect(response.body.Error).toEqual(
      "No fee configuration for USD transactions."
    );
  });
});
