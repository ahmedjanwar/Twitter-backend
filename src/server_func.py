import mysql.connector
from classes import *
from globalvars import *

mydb = mysql.connector.connect(host="mariadb.vamk.fi",  # MariaDB server address
                               user="e2101098",         # Username
                               password="cqgYeaFEN6A",  # Password
                               database="e2101098_X"    # Database name
                               )

# signup function
def Login(conn, loginData):
    	
	#check if supplied credentials are correct
	query = "SELECT * FROM Users where Username=" + "'" +str(loginData.username)+ "'" +" AND Password ="+ "'"+ str(loginData.password)+"'"
	mycursor = mydb.cursor()
	mycursor.execute(query)
	result = mycursor.fetchall()

	if(len(result)==0): #i.e. no username,password in db matches with the given
		reply=login("","","","",0)
	else:#if login was succesful, call show tweets functions and get latest 5(or less) tweets 
		tweets=list()
		tweets=ShowTweets(loginData.username)
		reply=login("","","",tweets,1)
	
	data=pickle.dumps(reply)
	conn.send(data)

	# server side
	return_arr = [loginData]
	if len(result)==0:
		return_arr.append(0)
	else:
		return_arr.append(1)
	return return_arr 

def SignUp(conn, addr, data):
	
	#add a new user into 'Users' table in the database
	query = "INSERT INTO Users (Username, Password, Email, Name, Age, Gender, Status, City, Institute) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
	val = (data.username, data.password, data.email, data.name, data.age, data.gender, data.status, data.city, data.institute)
	mycursor = mydb.cursor()
	mycursor.execute(query, val)
	mydb.commit()

	#create a table that will store followers of this user (once users start following this new user)
	mycursor = mydb.cursor() 
	query = "CREATE TABLE "+ str(data.username) + "_followers"+" (Username varchar(20))"
	mycursor.execute(query)
	mydb.commit()

	#create table to store following (updated when this new user follows someone)
	mycursor = mydb.cursor() 
	query = "CREATE TABLE "+ str(data.username) + "_following"+" (Username varchar(20))"
	mycursor.execute(query)
	mydb.commit()
	
	#Tell client if signup was succesful
	reply=signup("","","","","","","","","","",1)
	msg=pickle.dumps(reply)
	conn.send(msg)
	return "Done"


def ShowTweets(username):#returns a list of recent tweets to the login function

	query="SELECT Username FROM "+str(username)+"_following"
	mycursor=mydb.cursor()
	mycursor.execute(query)
	
	names=mycursor.fetchall()
	dic={}  #key=a following of the user , value=1
	
	for name in names:
		dic[name[0]]=1
		
	query="SELECT * FROM Tweets ORDER BY TweetID DESC" #sort by tweet id in descending order
	val=()
	mycursor=mydb.cursor()
	mycursor.execute(query,val) 
	results=mycursor.fetchall()
	
	ls=list()
	count=0
	for row in results: #get the top 5 tweets from the following of this user 
		if(count==5):
			break
		if(row[0] in dic): #if this user is in the following of our user, then take his/her tweet into the list of top 5 tweets
			ls.append(row)
			count+=1   
	return ls

def SearchPerson(conn, addr, username, data):

	query="SELECT Username, Name, Age, Gender, Status, City, Institute FROM Users where Username = %s or Name = %s"
	val = (data.username, data.name)
	mycursor = mydb.cursor()
	mycursor.execute(query,val)
	results = mycursor.fetchall()
	if len(results)==0:
		message = searchperson("SearchPerson", "", "", "", "", "", "", "", 0)
	else:
		results = results[0]
		print(results)
		message = searchperson("SearchPerson", results[0], results[1], results[2], results[3], results[4], results[5], results[6], 1)
	data=pickle.dumps(message)
	conn.send(data)
	print("Data of the searched person sent")
	return message.flag

	
def Unfollow(conn,username, data):
    
	#remove the person(to be unfollowed by curr client) from the following of username
	query="DELETE FROM "+str(username) + "_following"+" WHERE Username ='" + str(data.following) +"'"
	mycursor=mydb.cursor()
	mycursor.execute(query)
	mydb.commit()
	
	#remove username from the followers of the person
	query="DELETE FROM "+str(data.following)+"_followers"+" WHERE Username ='" + str(username) +"'"
	mycursor=mydb.cursor()
	mycursor.execute(query)
	mydb.commit()

	#Tell client that the person was succesfully unfollowed
	reply=unfollow("","",1)
	data=pickle.dumps(reply)
	conn.send(data)
	# print("Unfollowed ",data.following)


def DeleteFollower(conn,username, data):
    
	#remove the person(follower to be deleted by curr client) from the followers of username
	query="DELETE FROM "+str(username) + "_followers"+" WHERE Username ='" + str(data.follower) +"'"
	mycursor=mydb.cursor()
	mycursor.execute(query)
	mydb.commit()
	
	#remove username from the person's following
	query="DELETE FROM "+str(data.follower)+"_following"+" WHERE Username ='" + str(username) +"'"
	mycursor=mydb.cursor()
	mycursor.execute(query)
	mydb.commit()

	#Tell client that the person was succesfully unfollowed
	reply=deletefollower("","",1)
	data=pickle.dumps(reply)
	conn.send(data)
	# print("Deleted ",data.follower)

def ShowAllFollowers(conn, username, data):

	query="SELECT Username FROM " + str(username) + "_followers"
	mycursor=mydb.cursor()
	mycursor.execute(query)
	arr=mycursor.fetchall()
	# print(arr)
	if (len(arr)==0):
		results=showallfollowers("",arr,0)
		data=pickle.dumps(results)
		conn.send(data)
	else:
		results=showallfollowers("",arr,1)
		data=pickle.dumps(results)
		conn.send(data)
		print("Followers list sent")
	
def Follow(conn, addr, username, data):
	#check if such name/username exists
	available = SearchPerson(conn, addr, username, data)
	if (available==1):
		#update curr client's following
		query = "INSERT INTO "+ str(username)+"_following" + " (Username)" + " VALUES("+ "'"+str(data.username)+"'" ")"
		mycursor = mydb.cursor()
		mycursor.execute(query)
		mydb.commit()

		#update his(the person whon client wants to follow) followers
		query = "INSERT INTO "+ str(data.username)+"_followers" + " (Username)" + " VALUES("+ "'"+str(username)+"'" ")"
		mycursor = mydb.cursor()
		mycursor.execute(query)
		mydb.commit()
		print("Following ", data.username)
	else:
		print("person not found")

