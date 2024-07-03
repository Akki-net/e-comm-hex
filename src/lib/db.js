import mongoose from 'mongoose'

export default async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        const conn = mongoose.connection
        conn.on('open', () => {
            console.log('db is connected')
        })
    } catch (error) {
        throw new Error(`error while connecting: ${error.message}`)
    }
}