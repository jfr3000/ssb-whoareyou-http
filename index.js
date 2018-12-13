'use strict'

const url = require('url')

exports.name = 'whoareyou-http'
exports.manifest = {}
exports.version = require('./package.json').version
exports.init = function (sbot) {
  // set host in case it hasn't been set
  const ip = url.parse(sbot.getAddress()).hostname
  sbot.config.host = ip

  sbot.ws.use(function (req, res, next) {
    if (req.method !== "GET") return next()
    const u = url.parse(req.url)
    if (u.pathname !== '/whoareyou') return next()

    res.setHeader('Content-Type', 'text/plain')
    const address = sbot.getAddress()
    res.end(address)
  })
}
