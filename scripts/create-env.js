const fs = require('fs');

try {
  if (fs.existsSync('./.evn')) {
    console.log('.env file already exists. will exit now.');
    process.exit(0);
  } else {
    // create .env file
    fs.writeFileSync(
      './.env',
      `AUTH0_DOMAIN=${process.env.AUTH0_DOMAIN}\n
        AUTH0_CLIENT_ID=${process.env.AUTH0_CLIENT_ID}\n
        AUTH0_REDIRECT_URL=${process.env.AUTH0_REDIRECT_URL}\n
        AUTH0_AUDIENCE=${process.env.AUTH0_AUDIENCE}\n
        MONGODB_URI=${process.env.MONGODB_URI}\n
        MONGODB_USER=${process.env.MONGODB_USER}\n
        MONGODB_PSWD=${process.env.MONGODB_PSWD}\n
        MONGODB_NAME=${process.env.MONGODB_NAME}\n`
    );
    console.log('new .env created!');
    process.exit(0);
  }
} catch (e) {
  console.error('unexpected error happened: ' + e);
  process.exit(1);
}
