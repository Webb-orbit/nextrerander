import { connect, connection } from "mongoose";

export async function connectdb() {
    try {
        if (connection.readyState !== 1) {
            await connect(`${process.env.MONGODB_URL}/darkbacker`)
            console.log("MONGO CONNECTED");
        }else{
            console.log("MONGO ALRADY CONNECTED");
            return;
        }
    } catch (error) {
        console.log(error);
        console.log("MONGO NOT CONNECT");
        // process.exit(1)
    }
}