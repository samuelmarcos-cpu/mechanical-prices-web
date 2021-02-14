const { MongoClient } = require('mongodb')
const uri = process.env.MONGO_URI
const dbName = process.env.DB_NAME
const collectionName = process.env.COLLECTION_NAME

const parseProduct = product => ({ ...product, id: product._id })

export default async (req, res) => {
  const client = new MongoClient(uri, { useUnifiedTopology: true })
  await client.connect()
  const db = client.db(dbName)
  const productsRef = db.collection(collectionName)

  let filter = {}
  const { term } = req.query
  if (term) filter = { title: { $regex: term, $options: 'i' } }

  const rawProducts = await productsRef.find(filter).limit(12).toArray()
  const products = rawProducts.map(parseProduct)

  client.close()

  res.json(products)
  res.statusCode = 200
}