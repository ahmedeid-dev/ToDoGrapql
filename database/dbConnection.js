import  {connect } from "mongoose";

const dbConnection = async () => {
    const connection = await connect('mongodb://localhost:27017/todographql')
    .then(() => {
        console.log(`Database connected successfully`); 
    })
    .catch((err) => {
        console.log('Database connection error', err);
    })
    return connection
}

export default dbConnection