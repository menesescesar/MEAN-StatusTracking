var configValues = require('./config');

module.exports = {
    
    getDbConnection: function() {
        return configValues.DB_CON;
    },

    getTestDbConnection: function() {
        return configValues.TEST_DB_CON;
    }
    
}