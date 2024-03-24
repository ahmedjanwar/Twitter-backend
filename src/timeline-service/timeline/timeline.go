package timeline

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"timeline/db"
)

type Timeline struct {
	ID        int            `json:"id"`
	Content   string         `json:"content"`
	AuthorID  int            `json:"authorId"`
	CreatedAt string         `json:"createdAt"`
	Comments  sql.NullString `json:"comments"`
	Likes     int            `json:"likes"`
}

func GetUserTimeline(w http.ResponseWriter, r *http.Request) {
	log.Println("Getting users timeline")
	// Query the database for all tweets
	rows, err := db.DB.Query("SELECT id, content, authorid, createdAt, comments, likes FROM tweets")
	if err != nil {
		log.Println("Error querying database:", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var timelines []Timeline
	for rows.Next() {
		var timeline Timeline
		err := rows.Scan(&timeline.ID, &timeline.Content, &timeline.AuthorID, &timeline.CreatedAt, &timeline.Comments, &timeline.Likes)
		if err != nil {
			log.Println("Error scanning rows:", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		timelines = append(timelines, timeline)
	}

	// Check if any rows were found
	if len(timelines) == 0 {
		log.Println("No tweets found")
		w.WriteHeader(http.StatusNotFound)
		return
	}

	// Set response header and encode timelines to JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(timelines)
}
