const createPool = require("./db");

async function asyncFunction() {
    const pool = createPool(); // Create the pool
    let conn;
    try {
        conn = await pool.getConnection(); // Get a connection from the pool
        const rows = await conn.query("SELECT * FROM tweets"); // Execute query
        for (let row of rows) {
            console.log(`(id=${row.id}) ${row.first_name} ${row.last_name} <${row.email}>`);
        }
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) conn.release(); // Release the connection back to the pool
        if (pool) await pool.end(); // Close the pool
    }
}

asyncFunction();
