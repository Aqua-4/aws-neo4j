TODO:

- [ ] create neo4j ec2 instance (use bash script to setup the env) 
- [ ] put it on a private vpc
- [ ] lambda function to query 


* cypher connection `cypher-shell -u neo4j -p cuelogic`
* get all data `Match (n)-[r]->(m) Return n,r,m;`