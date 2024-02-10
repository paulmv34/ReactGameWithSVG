const fs = require('fs')

fs.copyFileSync('.env', '.env')

fs.mkdirSync('tmp/pgdata', { recursive: true })
