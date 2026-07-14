// ---------------------------------------------------------------------------
// Reference API that fronts MongoDB for the portfolio's `mongo` data adapter.
//
// The browser can't speak the Mongo wire protocol, so this tiny Express app
// owns the driver and exposes the exact endpoints MongoAdapter expects. It is
// intentionally dependency-light and read-only.
//
//   Usage:
//     cd server
//     npm install
//     MONGODB_URI="mongodb://localhost:27017" npm run seed     # one-time
//     MONGODB_URI="mongodb://localhost:27017" npm start
//
//   Then point the front end at it:
//     VITE_DATA_SOURCE=mongo VITE_API_BASE_URL=http://localhost:4000/api npm run dev
// ---------------------------------------------------------------------------
import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.MONGODB_DB || 'porfolio'

const client = new MongoClient(MONGODB_URI)
await client.connect()
const db = client.db(DB_NAME)
console.log(`Connected to MongoDB · db="${DB_NAME}"`)

const app = express()
app.use(cors())

// Strip Mongo's _id from responses so payloads match the front-end types 1:1.
const clean = (doc) => {
  if (!doc) return doc
  const { _id, ...rest } = doc
  return rest
}

const one = (collection) => async (_req, res, next) => {
  try {
    const doc = await db.collection(collection).findOne({})
    res.json(clean(doc))
  } catch (err) {
    next(err)
  }
}

const many = (collection) => async (_req, res, next) => {
  try {
    const docs = await db.collection(collection).find({}).sort({ order: 1 }).toArray()
    res.json(docs.map(clean))
  } catch (err) {
    next(err)
  }
}

app.get('/api/profile', one('profile'))
app.get('/api/contact', one('contact'))
app.get('/api/links', one('links'))
app.get('/api/experience', many('experience'))
app.get('/api/projects', many('projects'))
app.get('/api/skills', many('skills'))
app.get('/api/education', many('education'))
app.get('/api/achievements', many('achievements'))
app.get('/api/testimonials', many('testimonials'))

// Optional fast path — one round-trip for everything.
app.get('/api/all', async (_req, res, next) => {
  try {
    const [
      profile,
      contact,
      experience,
      projects,
      skills,
      education,
      achievements,
      testimonials,
    ] = await Promise.all([
      db.collection('profile').findOne({}),
      db.collection('contact').findOne({}),
      db.collection('experience').find({}).sort({ order: 1 }).toArray(),
      db.collection('projects').find({}).sort({ order: 1 }).toArray(),
      db.collection('skills').find({}).sort({ order: 1 }).toArray(),
      db.collection('education').find({}).sort({ order: 1 }).toArray(),
      db.collection('achievements').find({}).sort({ order: 1 }).toArray(),
      db.collection('testimonials').find({}).sort({ order: 1 }).toArray(),
    ])
    res.json({
      profile: clean(profile),
      contact: clean(contact),
      experience: experience.map(clean),
      projects: projects.map(clean),
      skills: skills.map(clean),
      education: education.map(clean),
      achievements: achievements.map(clean),
      testimonials: testimonials.map(clean),
    })
  } catch (err) {
    next(err)
  }
})

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: err.message })
})

app.listen(PORT, () => console.log(`Portfolio API listening on :${PORT}`))
