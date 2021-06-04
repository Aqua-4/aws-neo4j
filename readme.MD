TODO:

- [x] create neo4j ec2 instance
  - [x]  (use bash script to setup the env) 
- [x] put it on a private vpc
- [x] lambda function to query
  - [x] connect with neo4j 

--------


- [x] get server IP using variables
- [ ] dir structure
  - [x] split resources to compute,network,storage
  - [ ] node folder structure
- [ ] API structure
- use `https://www.npmjs.com/package/dotenv`

# Neo4j 
* cypher connection `cypher-shell -u neo4j -p cuelogic`
* get all data `Match (n)-[r]->(m) Return n,r,m;`
* delete all data `MATCH (n) DETACH DELETE n`

## error & settings

1. `sudo nano /etc/neo4j/neo4j.conf` To have Bolt accept non-local connections, uncomment this line::
   * dbms.connector.bolt.address=0.0.0.0:7687



MERGE (a:Person {name:"alpha",age:1}) 
MERGE (b:Person {name:"beta",age:2})
CREATE  (a)-[rel:KNOWS]->(b) 
RETURN a, b, rel

MATCH (p:Person {name: "alpha"})-[r]-(n)
RETURN p,r,n;


