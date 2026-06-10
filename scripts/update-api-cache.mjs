import fs from 'node:fs/promises';

const API_URL = 'https://api.brawlapi.com/v1/brawlers';

async function main() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`BrawlAPI returned ${res.status}`);
  const json = await res.json();
  const list = json.list || json.data || [];
  await fs.mkdir('assets', { recursive: true });
  await fs.writeFile(
    'assets/api-cache.json',
    JSON.stringify({ updatedAt: new Date().toISOString(), list }, null, 2)
  );
  console.log(`Saved ${list.length} brawlers to assets/api-cache.json`);
}
main().catch(err => {
  console.error(err);
  process.exit(1);
});
