'use strict';

const neo4j = require('neo4j-driver')

var driver = neo4j.driver(
  'bolt://35.154.128.63',
  neo4j.auth.basic('neo4j', 'cuelogic')
)

module.exports.hello = async (event) => {

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
