import { hash } from "bcryptjs";
import { v4 } from "uuid";
import { AppDataSource } from "..";

async function create(): Promise<void> {
    //createConnection;
    const connection = await AppDataSource.initialize();

    const id = v4();

    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS(id, email, password, name, "isAdmin", driver_licence, created_at)  
        values('${id}',  'maumauxy94@gmail.com', '${password}', 'admin', true, 'sne' ,now())`
    )
    // await connection.query(
    //     "INSERT INTO USERS(id, name, email, password, is_admin, driver_licence, created_at) "+
    //     " values('"+id+"', 'HotFire', 'admin@rental.com', '"+password+"', true, Sne ,now())"
    // )
    await connection.close
}

create().then(() => console.log("User Admin Created"));

