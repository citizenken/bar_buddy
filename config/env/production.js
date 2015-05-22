/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  hookTimeout: 40000,

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
    connection: 'mysqlServer-prod',
    migrate: 'safe'
  },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  port: process.env.PORT || 1337,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  log: {
    level: process.env.LOG_LEVEL
  },


  /***************************************************************************
   * Redis settings                                                          *
   ***************************************************************************/

  session: {
    adapter: 'redis',
    host: process.env.REDIS_IP,
    port: process.env.REDIS_PORT,
    // ttl: <redis session TTL in seconds>,
    // db: 0,
    // pass: <redis auth password>
    prefix: 'sess:'
  }

};
