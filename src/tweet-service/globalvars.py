import mysql.connector

BUFFERSIZE = 64000
mydb = mysql.connector.connect(host="mariadb.vamk.fi",  # MariaDB server address
                               user="e2101098",         # Username
                               password="cqgYeaFEN6A",  # Password
                               database="e2101098_X"    # Database name
                               )
