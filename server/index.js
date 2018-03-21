let env = require('dotenv').config()
// hotfix, since dotenv on local keeps "hiding" the env variables behind "parsed" field
if (env.parsed !== undefined) {
  env = env.parsed
} else {
  env = {
    CARDANOLITE_BLOCKCHAIN_EXPLORER_URL: process.env.CARDANOLITE_BLOCKCHAIN_EXPLORER_URL,
    CARDANOLITE_TRANSACTION_SUBMITTER_URL: process.env.CARDANOLITE_TRANSACTION_SUBMITTER_URL,
    CARDANOLITE_ADDRESS_RECOVERY_GAP_LENGTH: process.env.CARDANOLITE_ADDRESS_RECOVERY_GAP_LENGTH,
    CARDANOLITE_FORCE_HTTPS: process.env.CARDANOLITE_FORCE_HTTPS,
  }
}
const express = require('express')
const app = express()

if (env.CARDANOLITE_FORCE_HTTPS === 'true') {
  app.use((req, res, next) => {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      res.redirect(301, `https://${req.get('host')}${req.url}`)
    } else {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000')
      next()
    }
  })
}

app.use(express.static('public'))

app.get('/', (req, res) => {
  return res.status(200).send(`
    <!doctype html>
    <html>

      <head>
        <title>CardanoLite Wallet</title>
        <script src="js/frontend.bundle.js" defer></script>
        <link rel="stylesheet" type="text/css" href="css/styles.css">
        <link rel="icon" type="image/ico" href="assets/favicon.ico">
      </head>

      <body data-config=${JSON.stringify(env)}>
        <div id="root" style="width: 100%; height: 100%;"></div>
      </body>

    </html>
  `)
})

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Cardano wallet app listening on ${process.env.PORT}!`)
})
