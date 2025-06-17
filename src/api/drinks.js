const BASE_URL = "http://localhost:4000/drinks";

/** GET all drinks (you already fetch these in ShopPage) */
export async function fetchDrinks() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`Fetch drinks failed: ${res.status}`);
  return res.json();
}

/** POST a new drink */
export async function createDrink(drink) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(drink),
  });
  if (!res.ok) throw new Error(`Create drink failed: ${res.status}`);
  return res.json();
}

/** PATCH an existing drink (for later update functionality) */
export async function updateDrink(id, updates) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error(`Update drink ${id} failed: ${res.status}`);
  return res.json();
}
