module.exports = {
    AUTH: {
        BASE: '/auth',
        SIGNIN: '/signin',
        SIGNIN_PARENTS: '/signin/parents',
        SIGNIN_DRIVER: '/signin/driver',
        SIGNIN_SCHOOL: '/signin/school',
    },

    IMPORT: {
        BASE: '/import',
        DRIVERS: '/drivers',
        VEHICLES: '/vehicles',
        STUDENTS: '/students',
    },

    DRIVERS: {
        BASE: '/drivers',
        GET: '/get',
    },

    VEHICLES: {
        BASE: '/vehicles',
        GET: '/get',
    },

    STUDENTS: {
        BASE: '/students',
        GET: '/get',
        GET_BY_DRIVER: '/get-by-driver/:driver_id',
        GET_BY_PARENTS: '/get-by-parents/:parent_id',
        ASSIGN_STOP: '/assign-stop',
    },

    ROUTES: {
        BASE: '/routes',
        CREATE: '/create',
        GET: '/get',
    },
};
