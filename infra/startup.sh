#!/bin/bash

date >> /home/ec2-user/tmp.txt
# str8 from the neo4j docs
sudo rpm --import https://debian.neo4j.com/neotechnology.gpg.key
sudo cat <<EOF >  /etc/yum.repos.d/neo4j.repo
[neo4j]
name=Neo4j RPM Repository
baseurl=https://yum.neo4j.com/stable
enabled=1
gpgcheck=1
EOF

sudo amazon-linux-extras enable java-openjdk11

# install java
sudo yum install java-11-openjdk -y
# install adapter
sudo yum install https://dist.neo4j.org/neo4j-java11-adapter.noarch.rpm -y
# install neo4j
sudo yum install neo4j-4.2.6 -y
# get version
rpm -qa | grep neo

# To have Bolt accept non-local connections, uncomment this line
sudo echo 'dbms.default_listen_address=0.0.0.0' >> /etc/neo4j/neo4j.conf

sudo neo4j-admin set-initial-password cuelogic

sudo neo4j start
