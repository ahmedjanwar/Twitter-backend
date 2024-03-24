package timeline

import (
	"io"
	"log"
	"net/http"
)

type Timeline struct {
	ID        int                    `json:"id"`
	Content   string                 `json:"content"`
	AuthorID  int                    `json:"authorId"`
	CreatedAt string                 `json:"createdAt"`
	Comments  map[string]interface{} `json:"comments"`
	Likes     int                    `json:"likes"`
}

func GetUserTimeline(w http.ResponseWriter, r *http.Request) {
	log.Println("Getting users timeline")

	// Extract tweetIds query parameter, if provided
	tweetIds := r.URL.Query().Get("tweetIds")

	// Build URL for the tweets endpoint with query parameters
	tweetsURL := "http://localhost:3000/tweets/all"
	if tweetIds != "" {
		tweetsURL += "?tweetIds=" + tweetIds
	}

	// Make HTTP GET request to fetch tweets
	resp, err := http.Get(tweetsURL)
	if err != nil {
		log.Println("Error fetching tweets:", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// Forward the response from the other service to the client
	_, err = io.Copy(w, resp.Body)
	if err != nil {
		log.Println("Error forwarding response to client:", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
