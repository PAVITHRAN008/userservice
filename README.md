# userservice -api
### Important commands


1.`npm install`
2.`npm run server`
3.`git init`
4.`git add`
5.`git commit -m "your msg"`
6.`git push oriign main`
or `git push`


### Database options

1. SQL - (MySql, PostgreSQL)

2. noSQL - (MongoBD)


### 1. Install Dependencies

npm init -y
npm install express mongoose dotenv cors nodemon

### In package.json, add:
"scripts": {
  "dev": "nodemon server.js"
}

## Step 1: Generate RSA Keys
# Generate private key
openssl genrsa -out private.pem 2048

# Extract public key
openssl rsa -in private.pem -pubout -out public.pem

### Angular – Encrypt Password
npm install node-forge --save


