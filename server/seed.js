// ---------------------------------------------------------------------------
// Seeds MongoDB from the SAME JSON files the JSON adapter uses
// (../public/data/*.json), so the two backends are guaranteed to agree.
//
//   MONGODB_URI="mongodb://localhost:27017" npm run seed
// ---------------------------------------------------------------------------
import { MongoClient } from 'mongodb'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.resolve(__dirname, '../public/data')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.MONGODB_DB || 'porfolio'

const load = async (file) =>
  JSON.parse(await readFile(path.join(DATA_DIR, file), 'utf8'))

const withOrder = (arr) => arr.map((doc, i) => ({ ...doc, order: i }))

const client = new MongoClient(MONGODB_URI)
await client.connect()
const db = client.db(DB_NAME)

const [
  profile,
  contact,
  links,
  experience,
  projects,
  skills,
  education,
  achievements,
  testimonials,
] = await Promise.all([
  load('profile.json'),
  load('contact.json'),
  load('links.json'),
  load('experience.json'),
  load('projects.json'),
  load('skills.json'),
  load('education.json'),
  load('achievements.json'),
  load('testimonials.json'),
])

const singletons = { profile, contact, links }
const collections = {
  experience: withOrder(experience),
  projects: withOrder(projects),
  skills: withOrder(skills),
  education: withOrder(education),
  achievements: withOrder(achievements),
  testimonials: withOrder(testimonials),
}

for (const [name, doc] of Object.entries(singletons)) {
  await db.collection(name).deleteMany({})
  await db.collection(name).insertOne(doc)
  console.log(`seeded ${name} (1 doc)`)
}
for (const [name, docs] of Object.entries(collections)) {
  await db.collection(name).deleteMany({})
  await db.collection(name).insertMany(docs)
  console.log(`seeded ${name} (${docs.length} docs)`)
}

await client.close()
console.log('Done.')
