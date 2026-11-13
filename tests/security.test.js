import { describe, it, expect, vi, afterEach } from "vitest";
import express from "express";
import request from "supertest";
import { requireInternalKey } from "../middlewares/requireInternalKey.js";

const app = express();
app.post("/protected", requireInternalKey, (_req, res) => res.status(204).end());
afterEach(() => { delete process.env.INTERNAL_API_KEY; });

describe("internal API authentication", () => {
  it("rejects missing key", async () => {
    process.env.INTERNAL_API_KEY = "test-secret";
    expect((await request(app).post("/protected")).status).toBe(401);
  });
  it("rejects incorrect key", async () => {
    process.env.INTERNAL_API_KEY = "test-secret";
    expect((await request(app).post("/protected").set("X-Internal-API-Key", "wrong")).status).toBe(401);
  });
  it("accepts matching key", async () => {
    process.env.INTERNAL_API_KEY = "test-secret";
    expect((await request(app).post("/protected").set("X-Internal-API-Key", "test-secret")).status).toBe(204);
  });
});
