'use strict';

const neo4j = require('neo4j-driver')

// console.log(process.env.neo_ip);
var driver = neo4j.driver(
  'bolt://10.0.1.72', // ec2 IP private
  neo4j.auth.basic('neo4j', 'cuelogic')
)


module.exports.insert = async (event) => {

  var query = [
    'MERGE (p_a:Person {name:$name_a,age:$age_a})',
    'MERGE (p_b:Person {name:$name_b,age:$age_b})',
    'CREATE (p_a)-[r:KNOWS]->(p_b)',
    'RETURN p_a, p_b, r'
  ]

  var def_params = {
    name_a: 'Alice',
    age_a: 33,
    name_b: 'Bob',
    age_b: 44
  }

  var params = event.userdata || def_params

  var promiseSession = driver.session({ database: 'neo4j' })


  // the Promise way, where the complete result is collected before we act on it:
  const promise = new Promise(function (resolve, reject) {
    promiseSession
      .run(query.join(' '), params)
      .then(result => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: "Inserted records successfully", result })
        })
      })
      .catch(error => {
        reject({
          statusCode: 400,
          body: JSON.stringify({ message: "Failed to insert", error })
        })
      })
      .then(() => {
        promiseSession.close()
      })
  })

  await driver.close()
  return promise



  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


module.exports.create = async (event) => {

  var query = [
    'CREATE (p:Person {name: $name})',
    'RETURN p'
  ]

  var def_params = {
    name: 'Alice',
    age: 33,
  }

  var params = event.userdata || def_params

  var promiseSession = driver.session({ database: 'neo4j' })


  // the Promise way, where the complete result is collected before we act on it:
  const promise = new Promise(function (resolve, reject) {
    promiseSession
      .run(query.join(' '), params)
      .then(result => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: "Created node successfully", result })
        })
      })
      .catch(error => {
        reject({
          statusCode: 400,
          body: JSON.stringify({ message: "Failed to create", error })
        })
      })
      .then(() => {
        promiseSession.close()
      })
  })

  await driver.close()
  return promise



  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};



module.exports.read = async (event) => {

  // var query = [
  //   'MATCH (p:Person {name: $name})-[r]-(n)',
  //   'RETURN p,r,n'
  // ]
  var query = [
    'MATCH (p:Person {name: $name})',
    'RETURN p'
  ]

  var def_params = {
    name: 'Alice',
  }

  var params = event.userdata || def_params

  var promiseSession = driver.session({ database: 'neo4j' })


  // the Promise way, where the complete result is collected before we act on it:
  const promise = new Promise(function (resolve, reject) {
    promiseSession
      .run(query.join(' '), params)
      .then(result => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: "Read records successfully", result })
        })
      })
      .catch(error => {
        reject({
          statusCode: 400,
          body: JSON.stringify({ message: "Failed to read", error })
        })
      })
      .then(() => {
        promiseSession.close()
      })
  })

  await driver.close()
  return promise



  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};



module.exports.update = async (event) => {

  var query = [
    'MATCH (p:Person {name: $name})',
    'SET p.age = $age',
    'RETURN p'
  ]

  var def_params = {
    name: 'alpha',
    age: 99,
  }

  var params = event.userdata || def_params

  var promiseSession = driver.session({ database: 'neo4j' })


  // the Promise way, where the complete result is collected before we act on it:
  const promise = new Promise(function (resolve, reject) {
    promiseSession
      .run(query.join(' '), params)
      .then(result => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: "Updated node successfully", result })
        })
      })
      .catch(error => {
        reject({
          statusCode: 400,
          body: JSON.stringify({ message: "Failed to Update", error })
        })
      })
      .then(() => {
        promiseSession.close()
      })
  })

  await driver.close()
  return promise



  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};



module.exports.delete = async (event) => {

  var query = [
    'MATCH (p:Person {name: $name_a})-[r:KNOWS]->(m:Person {name: $name_b})',
    'DELETE p,r,m'
  ]

  var def_params = {
    name_a: 'Alice',
    name_b: 'Bob',
  }

  var params = event.userdata || def_params

  var promiseSession = driver.session({ database: 'neo4j' })


  // the Promise way, where the complete result is collected before we act on it:
  const promise = new Promise(function (resolve, reject) {
    promiseSession
      .run(query.join(' '), params)
      .then(result => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: "Deleted records successfully", result })
        })
      })
      .catch(error => {
        reject({
          statusCode: 400,
          body: JSON.stringify({ message: "Failed to delete", error })
        })
      })
      .then(() => {
        promiseSession.close()
      })
  })

  await driver.close()
  return promise



  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

