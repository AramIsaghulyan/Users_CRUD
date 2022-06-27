/**
 * Standard requires
 */

const _ = require('lodash');

/**
 * config requires
 */

const config = require('../../../config.json');

class Utils {

    constructor() {
    }

    static loadConfig() {

        const defaultConfig = config.development;
        const envieroment = process.env.NODE_ENV || 'developmnet';
        const envieromentConfig = config[envieroment];
        this._config = _.merge(defaultConfig, envieromentConfig);
    }

    static getConfigParameter(param) {

        if(this._config == undefined) {
            this.loadConfig();
        }
        return this._config[param];
    }
};

module.exports = Utils;