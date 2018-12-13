# ssb-whoareyou-http

## Install

`npm i ssb-whoareyou-http`

Then add it to your other plugins:

```javascript
sbot.use('ssb-whoareyou-http')
```

## Usage

Using

```javascript
sbot.ws.getAddress()
```

, get the sbot's HTTP IP and port. Then,

```bash
curl <your sbot's address and port>/whoareyou
```

will give you the sbot's address.
