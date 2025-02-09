import connectDB from "./database/db.connect.js";
import app from "./app.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {
    console.log(`DB connected! ...`)

    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is listining on port :: ${process.env.PORT || 4000}`)
        console.log(`Server address :: http://localhost:${process.env.PORT || 4000}`)
    })
})
.catch((error) => {
    console.error(`ERROR while connecting DB & starting server :: ${error?.message}`);
})