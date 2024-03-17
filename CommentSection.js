import React from 'react';
import CommentForm from './CommentForm';

function TweetDetail() {
	const handleCommentSubmit = (content) => {
	console.log('Comment send:', content);
};

return(
	<div>
	{/* Show tweet */}
	<p>Information tweet</p>

	{/*Show form Comment */}
	<CommentForm onCommentSUbmit={handleCommentSubmit} />
	</div>

);
}

export default TweetDetail;
