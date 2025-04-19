import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // check for already connection due to DB choking
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      tls: true,
      tlsAllowInvalidCertificates: false,
    });

    connection.isConnected = db.connections[0].readyState;
    // console.log(db.connection);

    console.log(`DB connected successfully`);
  } catch (error) {
    console.log(`DB connection failed`, error);
    // throw new Error("Database connection failed");
    process.exit(1);
    /*Using process.exit(1) is fine in CLI scripts, but in a serverless or Next.js environment (like API routes), it can cause the entire serverless function to crash.*/
  }
}

export default dbConnect;
