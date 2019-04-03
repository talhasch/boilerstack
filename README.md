# BoilerStack

Boilerplate for blockstack apps


BoilerStack is modified version of a rejected create-react-app. Includes blockstack auth and a radiks based crud todo application.


## Installation


#### 1- Clone this repo:

```
git clone --depth 1 https://github.com/talhasch/boilerstack my-app
cd my-app
```

#### 2- Make it your own:

```
rm -rf .git && git init && npm init
```

#### 3- Install the dependencies:

```
npm install
```


#### 4- Create config.js 

Make a copy of config.example.js and edit RADIKS_ADDRESS inside it

```
cp src/config.example.js src/config.js
```

#### 5- Run

```
npm start
```