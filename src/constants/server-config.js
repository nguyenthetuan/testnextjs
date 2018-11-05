/*
 * @Author: CuongHx 
 * @Date: 2018-07-08 18:00:20 
 * @Last Modified by: 
 * @Last Modified time: 2018-09-11 23:19:07
 */
const BUILD_ENV = process.env.REACT_APP_SERVER_CONFIG;
const configFile = require(`./service-config/${BUILD_ENV || 'development'}.json`);
export const CURRENT_ENV = BUILD_ENV === 'production' || false;
const config = Object.assign({ CURRENT_ENV }, configFile);
export default config;
