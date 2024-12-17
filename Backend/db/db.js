import mongoose from 'mongoose'

async function connectDB(){
    try {
        await mongoose.connect(`${process.env.DB_Connect}`)
        .then(() => {
            console.log('Connect to DB');        
        })
        .catch((err) => {
            console.log(err);         
        })

    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1)
    }
}

export default connectDB