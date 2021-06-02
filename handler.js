'use strict';

var neo4j = require('neo4j-driver')

module.exports.hello = async (event) => {

  var driver = neo4j.driver(
    'bolt://13.233.148.163',
    neo4j.auth.basic('neo4j', 'cuelogic')
  )


  var query = [
    'MERGE (alice:Person {name:$name_a,age:$age_a})',
    'MERGE (bob:Person {name:$name_b,age:$age_b})',
    'CREATE (alice)-[alice_knows_bob:KNOWS]->(bob)',
    'RETURN alice, bob, alice_knows_bob'
  ]

  var params = {
    name_a: 'Alice',
    age_a: 33,
    name_b: 'Bob',
    age_b: 44
  }

  // var session = driver.session()
  // var session = driver.session({ defaultAccessMode: neo4j.session.READ })
  // var session = driver.session({
  //   database: 'foo',
  //   defaultAccessMode: neo4j.session.WRITE
  // })

  var promiseSession = driver.session({ database: 'neo4j' })


  // the Promise way, where the complete result is collected before we act on it:
  promiseSession
    // .run('MERGE (james:Person {name : $nameParam}) RETURN james.name AS name', { nameParam: 'James' })
    .run(query.join(' '), params)
    .then(result => {
      result.records.forEach(record => {
        console.log(record)
      })
    })
    .catch(error => {
      console.log(error)
    })
    .then(() => promiseSession.close())

  // var promiseResult = promiseSession.run(query.join(' '), params)

  // promiseResult.then(function (res) {
  //   console.log(res);
  // })

  // promiseResult
  //   .then(function (records) {
  //     records.forEach(function (record) {
  //       for (var i in record) {
  //         console.log(i)
  //         console.log(record[i])
  //       }
  //     })
  //     var summary = promiseResult.summarize()
  //     // Print number of nodes created
  //     console.log('--------------nodes created-----------')
  //     console.log(summary.updateStatistics.nodesCreated())


  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify(
  //         {
  //           message: summary.updateStatistics.nodesCreated(),
  //           input: event,
  //         },
  //         null,
  //         2
  //       ),
  //     };

  //   })
  //   .catch(function (error) {
  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify(
  //         {
  //           message: error,
  //           input: event,
  //         },
  //         null,
  //         2
  //       ),
  //     };
  //   })
  //   .then(function () {
  //     promiseSession.close()
  //   })


  await driver.close()


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
