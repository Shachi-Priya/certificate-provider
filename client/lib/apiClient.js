async function parseResponse(r) {
  const text = await r.text();
  try { return JSON.parse(text); } catch { return text; }
}

export async function apiGet(path) {
  const r = await fetch(path, { credentials: "include" });
  const data = await parseResponse(r);
  if (!r.ok) throw new Error(typeof data === "string" ? data : data?.message || "Request failed");
  return data;
}

export async function apiPost(path, body) {
  const r = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await parseResponse(r);
  if (!r.ok) throw new Error(typeof data === "string" ? data : data?.message || "Request failed");
  return data;
}

export async function apiPut(path, body) {
  const r = await fetch(path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await parseResponse(r);
  if (!r.ok) throw new Error(typeof data === "string" ? data : data?.message || "Request failed");
  return data;
}
