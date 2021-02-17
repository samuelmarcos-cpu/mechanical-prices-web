import { parseProduct } from '../../api/utils'

const { MongoClient } = require('mongodb')
const uri = process.env.MONGO_URI
const dbName = process.env.DB_NAME
const collectionName = process.env.COLLECTION_NAME

export default async (req, res) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()
    const db = client.db(dbName)
    const productsRef = db.collection(collectionName)

    const { id } = req.query
    const rawProduct = await productsRef.findOne({ _id: id })
    const product = parseProduct(rawProduct)

    client.close()
    res.json(product)
    res.statusCode = 200
}