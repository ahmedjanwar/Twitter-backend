package timeline

import (
	"encoding/json"
	"net/http"

	"timeline/db"

	"github.com/gorilla/mux"
)

type Timeline struct {
	ID        int    `json:"id"`
	UserID    int    `json:"userId"`
	Content   string `json:"content"`
	Timestamp string `json:"timestamp"`
}

func GetUserTimeline(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	userID := params["userID"]

	// Query the database for user's timeline
	rows, err := db.DB.Query("SELECT id, user_id, content, timestamp FROM timeline WHERE user_id = ?", userID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var timelines []Timeline
	for rows.Next() {
		var timeline Timeline
		err := rows.Scan(&timeline.ID, &timeline.UserID, &timeline.Content, &timeline.Timestamp)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		timelines = append(timelines, timeline)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(timelines)
}
