const CONSTANTS = {
    RESPONSE_STATUS: {
        TRUE: true,
        FALSE: false
    },

    ROLES: {
        SUPER_ADMIN: 'Super Admin',
        SCHOOL: 'School',
        PARENTS: 'Parents',
        DRIVER: 'Driver',
    },

    EXCEL: {
        HEADERS: {
            DRIVERS: ['driver_name', 'driver_licence_no', 'driver_aadhar_no', 'driver_pan_no', 'date_of_birth', 'licence_validity_upto', 'driver_address'],

            VEHICLE: ['vehicle_description', 'vehicle_reg_no', 'vehicle_type', 'seating_capacity', 'default_route_name', 'default_route_id'],

            STUDENT: ['student_name', 'student_id_no', 'date_of_birth', 'father_name', 'father_mobile_no', 'mother_name', 'mother_mobile_no', 'address', 'area', 'assigned_route_id'],
        },
    },
};

module.exports = { CONSTANTS };