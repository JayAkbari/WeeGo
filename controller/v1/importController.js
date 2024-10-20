const { Op } = require('sequelize');

const db = require('../../database/models');
const xlsx = require('xlsx');
const { CONSTANTS } = require('../../utils/constants');
const { hashPassword } = require('../../helpers/password');

exports.importDrivers = async (req, res) => {
    try {
        if (!req.file) {
            return res.handler.notFound('File not found.');
        }

        const modelName = 'Drivers';

        // Read Excel data from buffer
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // First row (headers)
        const sheetHeaders = xlsx.utils.sheet_to_json(sheet, { header: 1 })[0];
        const missingHeaders = CONSTANTS.EXCEL.HEADERS.DRIVERS.filter((header) => !sheetHeaders.includes(header));

        if (missingHeaders.length) {
            return res.handler.badRequest(`Missing headers: ${missingHeaders.join(', ')}`);
        }

        // Convert sheet to JSON
        const rows = xlsx.utils.sheet_to_json(sheet);

        if (!rows.length) {
            return res.handler.badRequest('Sheet is empty.');
        }

        // Extract all emails and mobiles from the Excel file
        const { emails, mobiles } = await extractEmailsAndMobiles(rows);

        // Query the database to check existing records
        const existingRecords = await checkExistingRecords(modelName, emails, mobiles);

        // Filter out duplicates from the Excel data
        const { validRows, duplicateRows } = await filterExistingRecords(rows, existingRecords);

        // Bulk insert valid rows
        if (validRows.length > 0) {
            let bulkData = [];
            for (let validRow of validRows) {
                bulkData.push({
                    name: validRow.driver_name,
                    email: validRow.email,
                    mobile: validRow.mobile,
                    password: await hashPassword('Admin@1234'),
                    licence_no: validRow.driver_licence_no,
                    aadhar_no: validRow.driver_aadhar_no,
                    pan_no: validRow.driver_pan_no,
                    dob: excelSerialToJSDate(validRow.date_of_birth),
                    licence_validity_upto: excelSerialToJSDate(validRow.licence_validity_upto),
                    address: validRow.driver_address,
                });
            }

            await bulkInsert(modelName, bulkData);
        }

        // Return response with the result of the import
        if (duplicateRows.length > 0) {
            return res.handler.success('Partial Drivers imported successfully.', { duplicate: duplicateRows });
        }

        return res.handler.success('Drivers imported successfully.');
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

exports.importVehicles = async (req, res) => {
    try {
        if (!req.file) {
            return res.handler.notFound('File not found.');
        }

        // Read Excel data from buffer
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // First row (headers)
        const sheetHeaders = xlsx.utils.sheet_to_json(sheet, { header: 1 })[0];
        const missingHeaders = CONSTANTS.EXCEL.HEADERS.VEHICLE.filter((header) => !sheetHeaders.includes(header));

        if (missingHeaders.length) {
            return res.handler.badRequest(`Missing headers: ${missingHeaders.join(', ')}`);
        }

        // Convert sheet to JSON
        const rows = xlsx.utils.sheet_to_json(sheet);

        if (!rows.length) {
            return res.handler.badRequest('Sheet is empty.');
        }

        for (let row of rows) {
            // find or create vehicle type
            const [vehicle_type] = await db.VehicleTypes.findOrCreate({
                where: { name: row.vehicle_type },
                defaults: { name: row.vehicle_type }
            });

            // find or create route
            // const [route] = await db.Routes.findOrCreate({
            //     where: { custom_id: row.default_route_id, name: row.default_route_name },
            //     defaults: { custom_id: row.default_route_id, name: row.default_route_name }
            // });

            // create vehicle
            db.Vehicles.create({
                description: row.vehicle_description,
                registration_no: row.vehicle_reg_no,
                type_id: vehicle_type.id,
                seating_capacity: row.seating_capacity,
                // default_route_id: route.id
            });
        }

        return res.handler.success('Vehicles imported successfully.');
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

exports.importStudents = async (req, res) => {
    try {
        if (!req.file) {
            return res.handler.notFound('File not found.');
        }

        // Read Excel data from buffer
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // First row (headers)
        const sheetHeaders = xlsx.utils.sheet_to_json(sheet, { header: 1 })[0];
        const missingHeaders = CONSTANTS.EXCEL.HEADERS.STUDENT.filter((header) => !sheetHeaders.includes(header));

        if (missingHeaders.length) {
            return res.handler.badRequest(`Missing headers: ${missingHeaders.join(', ')}`);
        }

        // Convert sheet to JSON
        const rows = xlsx.utils.sheet_to_json(sheet);

        if (!rows.length) {
            return res.handler.badRequest('Sheet is empty.');
        }

        for (let row of rows) {
            // create student
            const student = await db.Students.create({
                custom_id: row.student_id_no,
                name: row.student_name,
                dob: excelSerialToJSDate(row.date_of_birth),
                gender: row.gender,
                address: row.address,
                area: row.area,
                class: row.class,
                // img_url: '',
                school_id: req.user.id,
            });

            // create parents
            const default_password = await hashPassword('Admin@1234');
            const [parent_father] = await db.Parents.findOrCreate({
                where: { email: row.father_email },
                defaults: {
                    name: row.father_name,
                    relationship: 'Father',
                    email: row.father_email,
                    mobile: 0,
                    password: default_password
                }
            });

            const [parent_mother] = await db.Parents.findOrCreate({
                where: { email: row.mother_email },
                defaults: {
                    name: row.mother_name,
                    relationship: 'Mother',
                    email: row.mother_email,
                    mobile: 0,
                    password: default_password
                }
            });

            // create student-parents relationship
            const data = [
                { parent_id: parent_father.id, student_id: student.id },
                { parent_id: parent_mother.id, student_id: student.id }
            ];

            await db.StudentParents.bulkCreate(data);
        }

        return res.handler.success('Students imported successfully.');
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

const extractEmailsAndMobiles = async (rows) => {
    const emails = rows.map(row => row.email);
    const mobiles = rows.map(row => (row.mobile).toString());
    return { emails, mobiles };
};

const checkExistingRecords = async (modelName, emails, mobiles) => {
    const existingRecords = await db[modelName].findAll({
        where: {
            [Op.or]: [
                { email: { [Op.in]: emails } },
                { mobile: { [Op.in]: mobiles } }
            ]
        },
        attributes: ['email', 'mobile']
    });

    return existingRecords;
};

const filterExistingRecords = async (rows, existingRecords) => {
    const existingEmails = existingRecords.map(record => record.email);
    const existingMobiles = existingRecords.map(record => record.mobile);

    let validRows = [], duplicateRows = [];

    rows.forEach(async (row) => {
        if (existingEmails.includes(row.email) || existingMobiles.includes(row.mobile)) {
            duplicateRows.push(existingEmails.includes(row.email) ? row.email : row.mobile);
        }
        else {
            validRows.push(row);
        }
    });

    return { validRows, duplicateRows };
};

const excelSerialToJSDate = (serial) => {
    if (!serial) {
        return null;
    }

    // Excel starts counting from Jan 1, 1900
    const epoch = new Date(1900, 0, 1);
    // Add the serial number of days, subtract 1 because Excel treats 1st Jan 1900 as 1, not 0
    epoch.setDate(epoch.getDate() + serial - 1);
    return epoch;
};

const bulkInsert = async (modelName, validRows) => {
    try {
        await db[modelName].bulkCreate(validRows);
    } catch (error) {
        throw new Error(error.message);
    }
};
