function postTweet() {
    var tweetContent = document.getElementById("tweetContent").value;
    if (tweetContent.trim() !== "") {
        var tweet = document.createElement("div");
        tweet.className = "tweet";
        
        var userInfo = document.createElement("div");
        userInfo.className = "user-info";
        userInfo.textContent = "Your Name (@yourusername)";
        tweet.appendChild(userInfo);
        
        var tweetContentElement = document.createElement("div");
        tweetContentElement.className = "tweet-content";
        tweetContentElement.textContent = tweetContent;
        tweet.appendChild(tweetContentElement);
        
        var timestamp = document.createElement("div");
        timestamp.className = "timestamp";
        timestamp.textContent = new Date().toLocaleString();
        tweet.appendChild(timestamp);
        
        var interactionSection = document.createElement("div");
        interactionSection.className = "interaction-section";
        
        var likeButton = document.createElement("button");
        likeButton.textContent = "Like";
        likeButton.onclick = function() { likeTweet(this); };
        interactionSection.appendChild(likeButton);
        
        var likeCount = document.createElement("span");
        likeCount.className = "like-count";
        likeCount.textContent = "0";
        interactionSection.appendChild(likeCount);
        
        var commentButton = document.createElement("button");
        commentButton.textContent = "Comment";
        commentButton.onclick = function() { commentTweet(this); };
        interactionSection.appendChild(commentButton);
        
        tweet.appendChild(interactionSection);
        
        var commentsSection = document.createElement("div");
        commentsSection.className = "comments";
        tweet.appendChild(commentsSection);
        
        var container = document.querySelector(".container");
        container.insertBefore(tweet, container.children[1]);
        
        // Clear the tweet box
        document.getElementById("tweetContent").value = "";
    }
}

function likeTweet(button) {
    var tweet = button.closest('.tweet');
    var likeCount = tweet.querySelector('.like-count');
    var currentLikes = parseInt(likeCount.textContent);
    likeCount.textContent = currentLikes + 1;
}

function commentTweet(button) {
    var tweet = button.closest('.tweet');
    var commentsSection = tweet.querySelector('.comments');
    var commentInput = prompt("Enter your comment:");
    if (commentInput !== null && commentInput.trim() !== "") {
        var comment = document.createElement("div");
        comment.className = "comment";
        comment.textContent = "Your Name (@yourusername): " + commentInput;
        commentsSection.appendChild(comment);
    }
}
