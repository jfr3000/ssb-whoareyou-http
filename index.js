'use strict'

const url = require('url')
const msScopes = require('multiserver-scopes')

exports.name = 'whoareyou-http'
exports.manifest = {}
exports.version = require('./package.json').version
exports.init = function (sbot) {
// set host in case it hasn't been set
  const ip = msScopes.host('public')
  sbot.config.host = ip
  sbot.ws.use(function (req, res, next) {
    if (req.method !== "GET") return next()
    const u = url.parse(req.url)
    if (u.pathname !== '/whoareyou') return next()

    res.setHeader('Content-Type', 'text/plain')
    sbot.whoami((err, key) => {
      if (err) {
        res.statusCode = 503
        res.end(err.message)
        return
      }

      res.end(key.id)
    })
  })
}
