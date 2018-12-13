'use strict'

const url = require('url')
const msScopes = require('multiserver-scopes')
const msAddress = require('multiserver-address')

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
    const address = sbot.getAddress()
    // buggy, so we switch out the host
    const parsed = msAddress.decode(address)
    parsed[0][0].data[0] = ip

    res.end(msAddress.encode(parsed))
  })
}
