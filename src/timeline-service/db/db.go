package db

import (
	"database/sql"
	"log"

	"github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	dataSourceName := mysql.Config{
		User:                 "e2001332",
		Passwd:               "hutCGmFRgZ9",
		Net:                  "tcp",
		Addr:                 "mariadb.vamk.fi",
		DBName:               "e2001332_tweet_service_db",
		AllowNativePasswords: true,
	}

	var err error
	DB, err = sql.Open("mysql", dataSourceName.FormatDSN())
	if err != nil {
		log.Fatal("Error connecting to database:", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("Error pinging database:", err)
	}

	log.Println("Database connection established successfully")
}
