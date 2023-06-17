const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config();

const PORT = process.env.PORT;

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API Documentation',
            version: '1.0.0',
            description: 'Documentatio for NE Revision'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        fullnames: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        NID: {
                            type: 'integer'
                        },
                        phoneNumber: {
                            type: 'string'
                        },
                        username: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                    },
                },
                Vehicle: {
                    type: 'object',
                    properties: {
                        chasisNumber: {
                            type: 'integer'
                        },
                        manufacturer: {
                            type: 'string'
                        },
                        manufacturedYear: {
                            type: 'integer'
                        },
                        price: {
                            type: 'integer'
                        },
                        plateNumber: {
                            type: 'string'
                        },
                        model: {
                            type: 'string'
                        },
                        createdBy: {
                            type: 'string',
                            description: 'Foreign key referencing the User model'
                        }
                    }
                },
                Owner: {
                    type: 'object',
                    properties: {
                        fullnames: {
                            type: 'string'
                        },
                        nid: {
                            type: 'integer'
                        },
                        phoneNumber : {
                            type: 'string'
                        },
                        address: {
                            type: 'string'
                        }
                    }
                }
            },
        },
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJsDoc(options)

module.exports = (app) => {
    app.use('/api-docs',swaggerUi.serve)
    app.get('/api-docs', swaggerUi.setup(specs))
}
