 /**
 * config of share_picture
 */
exports.config = {
  //page info
  name: "share_picture",
  email: 'wjl891014@gmail.com',
  version: "0.0.1",
  host: "www.brucewar.com",
  port: "8000",
  session_secret: "sharepicture",
  max_age: 3600000 * 24 * 30,
  web_root: __dirname,
  upload_dir: __dirname + '/public/uploads',

  page_limit: 5,

  //db info
  db: {
    host: "127.0.0.1",
    port: 3306,
    user: "brucewar",
    password: "wjl891014",
    database: "web_game"
  },

  //local test db
  local_db: "mysql://127.0.0.1/web_game",

  //mail options
  mail_opts: {
    host: 'smtp.163.com',
    port: 25,
    auth: {
      user: 'brucewar@163.com',
      pass: 'brucewar'
    }
  },

  //log level
  log_level: 'debug',

  mini_assets: false
};