import pickle
import sys
import select
from classes import *
BUFFERSIZE = 6400
    
def SignUp(client_socket, username, password, email, name, age, gender, status, city, institute):
    #client to server
    new_signup = signup("SignUp",username, password, email, name, age, gender, status, city, institute, 0)
    data = pickle.dumps(new_signup)
    client_socket.send(data)
    
    #server to client
    reply=client_socket.recv(BUFFERSIZE)
    # while(len(reply)==0):
    #     reply=client_socket.recv(BUFFERSIZE) 
    data=pickle.loads(reply)
    if(data.flag==0):
        print("Weak password")
    else:
        print("Signed up")
    return

def Login(client_socket, username, password):
    #client to server
    credentials = login("Login",username, password,list(),0)            
    data = pickle.dumps(credentials)
    client_socket.send(data)
    
    #server to client
    reply=client_socket.recv(BUFFERSIZE)
    # while(len(reply)==0):
    #     reply=client_socket.recv(BUFFERSIZE) 
    data=pickle.loads(reply)
    if(data.flag==0):
        print("Login failed, invalid credentials")
    else:
        print("Login Succesful")
        print("Recent tweets from your following")
        for tweet in data.tweets:
            print(tweet)
    return data.flag
    

def Unfollow(client_socket ,following):
    #client to server
    msg=unfollow("Unfollow",following,0)
    data=pickle.dumps(msg)
    client_socket.send(data)
    
    #server's reply
    reply=client_socket.recv(BUFFERSIZE)
    # while(len(reply)==0):
    #     reply=client_socket.recv(BUFFERSIZE) 
    data=pickle.loads(reply)
    if(data.flag==1):
        print(following, "unfollowed")

def DeleteFollower(client_socket ,follower):
    #client to server
    msg=deletefollower("DeleteFollower",follower,0)
    data=pickle.dumps(msg)
    client_socket.send(data)
    
    #server's reply
    reply=client_socket.recv(BUFFERSIZE)
    # while(len(reply)==0):
    #     reply=client_socket.recv(BUFFERSIZE) 
    data=pickle.loads(reply)
    if(data.flag==1):
        print(follower, "deleted")

def ShowAllFollowers(client_socket, username):
    arr=list()
    msg=showallfollowers("ShowAllFollowers",arr,0)
    data=pickle.dumps(msg)
    client_socket.send(data)
    
    #server to client
    reply=client_socket.recv(BUFFERSIZE)
    # while(len(reply)==0):
    #     reply=client_socket.recv(BUFFERSIZE) 
    data=pickle.loads(reply)
    names=data.arr 
    if len(names)==0:
        print("No followers")
        # return 0
    else:
        for name in names:
            print(name[0])


def SearchPerson(client_socket, name):
    #client to server
    msg = searchperson("SearchPerson",name,name,"","","","","",0)
    data = pickle.dumps(msg)
    client_socket.send(data)

    #server to client
    reply = client_socket.recv(BUFFERSIZE)
    # while(len(reply)==0):
    #     reply = client_socket.recv(BUFFERSIZE) 
    data = pickle.loads(reply)
    if(len(data.name)>0 or len(data.username)>0):
        print("Name: ",data.name)
        print("Username: ",data.username)
        print("Age: ",data.age)
        print("Gender: ",data.gender)
        print("Status: ",data.status)
        print("City: ",data.city)
        print("Education: ",data.institute)
    else:
        print("No such user")

def Follow(client_socket,username):
    #check if username to be followed exists
    msg=follow("Follow",username,username)
    data=pickle.dumps(msg)
    client_socket.send(data)

    reply = client_socket.recv(BUFFERSIZE)
    # while(len(reply)==0):
    #     reply = client_socket.recv(BUFFERSIZE) 
    data = pickle.loads(reply)
    if(data.flag==0):
        print("Invalid name/username")
    else: #if the username existed, then he/she was followed 
        print("Following ",username)

def Logout(client_socket):
    message = logout("Logout")
    data = pickle.dumps(message)
    client_socket.send(data)