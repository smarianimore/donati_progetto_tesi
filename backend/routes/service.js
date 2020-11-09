module.exports = function(app) {
    app.get('/entities/patients', (req, res) => {
        const response = JSON.parse(JSON.stringify(result));
        response.age = user.age(result.birthday);
        res.send(response);
    });
    app.get('/entities/vehicles', (req, res) => {
        const response = JSON.parse(JSON.stringify(result));
        response.age = user.age(result.birthday);
        res.send(response);
    });
}