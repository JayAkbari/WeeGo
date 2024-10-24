const COMMON = {
    GET: '/get',
    UPDATE: '/update',
    CREATE: '/create',
};

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
        GET: COMMON.GET,
    },

    VEHICLES: {
        BASE: '/vehicles',
        GET: COMMON.GET,
    },

    STUDENTS: {
        BASE: '/students',
        GET: COMMON.GET,
        GET_BY_DRIVER: '/get-by-driver/:driver_id',
        GET_BY_PARENTS: '/get-by-parents/:parent_id',
        ASSIGN_STOP: '/assign-stop',
    },

    SCHOOLS: {
        BASE: '/schools',
        CREATE: COMMON.CREATE,
        GET: COMMON.GET,
    },

    ROUTES: {
        BASE: '/routes',
        CREATE: COMMON.CREATE,
        GET: COMMON.GET,
    },

    LOCATION: {
        BASE: '/location',
        UPDATE: COMMON.UPDATE,
        GET: COMMON.GET,
    },

    PUSHER: {
        BASE: '/pusher',
        AUTH: '/auth'
    },
};
