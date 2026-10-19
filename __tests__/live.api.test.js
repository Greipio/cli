const fs = require("fs");
const {
  sendGetRequest,
  sendPostRequest,
  isApiSuccess,
} = require("../lib/utils");

const TOKEN = process.env.GREIP_TOKEN || "";

beforeAll(() => {
  if (!TOKEN) {
    throw new Error("Set GREIP_TOKEN before running tests.");
  }
  fs.writeFileSync("/tmp/.greip-storage", TOKEN);
});

const qs = (extra = "") => {
  const base = "source=CLI-Test";
  return extra ? `?${base}&${extra}` : `?${base}`;
};

describe("Greip API v2 (live)", () => {
  test("lookup ip", async () => {
    const res = await sendGetRequest("lookup/ip/1.1.1.1", qs());
    expect(isApiSuccess(res)).toBe(true);
    expect(res.data.ip.address).toBe("1.1.1.1");
  });

  test("score ip (threats)", async () => {
    const res = await sendGetRequest("score/ip/1.1.1.1", qs());
    expect(isApiSuccess(res)).toBe(true);
    expect(res.data.score).toBeDefined();
  });

  test("bulk lookup", async () => {
    const res = await sendGetRequest("geo/ip/bulk", qs("ips=1.1.1.1,8.8.8.8"));
    expect(isApiSuccess(res)).toBe(true);
    expect(res.data["1.1.1.1"]).toBeDefined();
  });

  test("country", async () => {
    const res = await sendGetRequest("lookup/countries/PS", qs());
    expect(isApiSuccess(res)).toBe(true);
    expect(res.data.geo.country_code).toBe("PS");
  });

  test("asn", async () => {
    const res = await sendGetRequest("lookup/asn/AS13335", qs());
    expect(isApiSuccess(res)).toBe(true);
    expect(res.data.number).toBe("AS13335");
  });

  test("email", async () => {
    const res = await sendGetRequest("score/email/name%40domain.com", qs());
    expect(isApiSuccess(res)).toBe(true);
    expect(res.data.email).toBeDefined();
  });

  test("phone", async () => {
    const res = await sendGetRequest(
      "score/phone/1234567890",
      qs("country_code=TR"),
    );
    expect(isApiSuccess(res)).toBe(true);
  });

  test("iban", async () => {
    const res = await sendGetRequest(
      "lookup/iban/DE89370400440532013000",
      qs(),
    );
    expect(isApiSuccess(res)).toBe(true);
    expect(res.data.is_valid).toBe(true);
  });

  test("profanity", async () => {
    const res = await sendPostRequest("score/text", {
      text: "This is a test message",
      source: "CLI-Test",
    });
    expect(isApiSuccess(res)).toBe(true);
    expect(res.data.risk_level).toBe("low");
  });
});
