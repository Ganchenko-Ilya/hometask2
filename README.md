## Create project with typescript and nodemon

0.add express

1. yarn add @types/express ts-node typescript nodemon @types/node jest ts-jest @types/jest supertest @types/supertest
   prettier --dev
2. create files .gitignore,.prettierrc,yarn ts-jest config:init,yarn tsc --init and add in file jest.config.js
   testRegex: "__tests__/.*.e2e.test.ts$.
3. add scripts in packages.json
4. yarn nodemon --exec "node --inspect -r ts-node/register" ./src/index.ts one of the method for running app.
