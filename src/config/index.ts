import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
   env: process.env.NODE_DEV,
   port: process.env.PORT,
   database_url: process.env.DATABASE_URL,
   default_student_password: process.env.DEFAULT_STUDENT_PASSWORD,
   default_faculty_password: process.env.DEFAULT_FACULTY_PASSWORD,
   default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD,
   bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
   jwt_secret_token: process.env.JWT_SICRATE_TOKEN,
   jwt_secret_expire: process.env.JWT_SICRATE_EXPIRE,
   jwt_refresh_token: process.env.JWT_REFRESHE_TOKEN,
   jwt_refresh_expire: process.env.JWT_REFRESHE_EXPIRE,
};
