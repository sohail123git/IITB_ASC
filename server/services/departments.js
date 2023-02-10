const client = require("../models/database")

async function DepartmentQuery(req) {
    const Department = await client.query("select dept_name from department")
    return Department.rows
}

module.exports = DepartmentQuery    
