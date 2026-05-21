import dotenv from 'dotenv'
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env')
})

const config = {
    port: process.env.PORT,
    db_connect: process.env.DB_CONNECTION,
    jwt_secret: process.env.JWT_SECRET
}

export default config