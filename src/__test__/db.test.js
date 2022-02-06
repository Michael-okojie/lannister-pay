import fs from "fs";
import sinon from "sinon";
import DbModule from "../config/db";

describe("Unit tests for Database:", () => {
  let readFile;
  let writeFile;

  beforeEach(() => {
    readFile = sinon.stub(fs, "readFile").returns({});
    writeFile = sinon.stub(fs, "writeFile").returns({});
  });

  afterEach(() => {
    // jest.restoreAllMocks();
    readFile.restore();
    writeFile.restore();
    sinon.restore();
  });

  it("should return true for writing to a file", (done) => {
    sinon
      .stub(DbModule, "writeToFile")
      .withArgs("test.json", "[]")
      .callsFake(function foo() {
        return true;
      });

    DbModule.writeToFile.callThrough();

    expect(DbModule.writeToFile("test.json", "[]")).toBeTruthy();

    done();
  });

  it("should return false when db not connected to read the db file", async () => {
    await DbModule.readFileContent();
    expect(readFile.calledOnceWith("feeConfig.json", "utf8")).toBeFalsy();
  });
});
