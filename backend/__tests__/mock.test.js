const fs = require("fs");
const path = require("path");
const EasyGraphQLTester = require("easygraphql-tester");
const { expect } = require("chai");
const schemaCode = fs.readFileSync(
  path.join(__dirname, "..", "schema.gql"),
  "utf8"
);

describe("Mock all queries", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });

  afterAll(() => {
    tester.clearFixture();
  });

  test("Should have all properties for all set", () => {
    const query = `
    {
      data{
          tnx_id
          user
          description
          date
      }
    }
  `;

    const {
      data: { data },
    } = tester.mock(query);

    console.log(data);

    expect(data).to.be.a("array");
    expect(data[0].user).to.be.a("string");
    expect(data[0].tnx_id).to.be.a("string");
    expect(data[0].description).to.be.a("string");
  });

  test("Should have all properties for one Data", () => {
    const query = `
    {
      oneData(tnx_id: "100023") {
          tnx_id
          user
          description
          date
      }
    }
  `;

    const {
      data: { oneData },
    } = tester.mock(query);

    console.log(oneData);

    expect(oneData.tnx_id).to.be.a("string");
    expect(oneData.user).to.be.a("string");
    expect(oneData.description).to.be.a("string");
  });
});
