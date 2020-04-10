module.exports = (app) => {
    const applications = require('./application.controller.js');

    // Create a new application
    app.post('/app', applications.create);

    // Retrieve all applications
    app.get('/app', applications.findAll);

    // Retrieve a single application with applicationId
    app.get('/app/:applicationId', applications.findOne);

    // Update a Note with applicationId
    app.put('/app/:applicationId', applications.update);

    // Delete an application with applicationId
    app.delete('/app/:applicationId', applications.delete);
}