# Xclone
A basic and user friendly twitter in python3 and MySQL server database in the backend

---

## Requirements and Libraries

1. [MySQL](https://dev.mysql.com/downloads/installer/) must be installed
2. python3 libraies
    1. mysql.connector
    2. select
    3. pickle

## Usage

1. Run MySQL server as Administrator and run the following queries for database setup (NOTE: Use exact names as specified below) -
  - create database

    `$ create database X`<br />
  - change database

    `$ use X`<br />
    
  - create table Users

    `$ create table Users ( Username varchar(50) NOT NULL UNIQUE, Password varchar(50), Email varchar(50), Name varchar(50), Age int, Gender varchar(2), Status varchar(50), City varchar(50), Institute varchar(50));`<br />
    
  - create table Tweets

    `$ create table Tweets ( Username varchar(50), TweetID varchar(20), TweetMessage varchar(500), Hashtag1 varchar(30), Hashtag2 varchar(30), Hashtag3 varchar(30), Hashtag4 varchar(30), Hashtag5 varchar(30), Retweets int DEFAULT 0);`<br />

2. Open a terminal and run the server with following commmand and enter the port number when asked - 

    `$ python3 server.py`

3. Run multiple clients in different terminals with the following command - 

    `$ python3 client.py`

---

## Functionalities
3. Follow or unfollow a person and delete a follower
## Features
- Complete modular and commented code with ease of understanding
