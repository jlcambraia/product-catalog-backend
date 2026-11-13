export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  if (err?.type === "entity.too.large") return res.status(413).json({ message: "Request body too large" });
  if (err instanceof SyntaxError && err.status === 400) return res.status(400).json({ message: "Invalid JSON" });
  console.error("Unhandled API error:", err);
  return res.status(500).json({ message: "Internal server error" });
}
