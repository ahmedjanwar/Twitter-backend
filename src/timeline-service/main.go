package main

import (
	"log"
	"net/http"

	"timeline/db"
	"timeline/timeline"

	"github.com/gorilla/mux"
)

func main() {
	// Initialize the database connection
	db.InitDB()
	defer db.DB.Close()

	// Create a new router
	router := mux.NewRouter()

	// Define HTTP endpoints
	router.HandleFunc("/timeline", timeline.GetUserTimeline).Methods("GET")

	// Start the HTTP server
	log.Println("Server started on port 3001")
	log.Fatal(http.ListenAndServe(":3001", router))
}