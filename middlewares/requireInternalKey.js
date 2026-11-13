import { timingSafeEqual } from "node:crypto";

export function requireInternalKey(req, res, next) {
  const expected = process.env.INTERNAL_API_KEY;
  const received = req.get("X-Internal-API-Key");
  if (!expected || !received) return res.status(401).json({ message: "Unauthorized" });
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}
