import React, { useState } from 'react';

function CommentForm({ onCommentSubmit }) {
	const [content, setContent] = useState(' ');

const handleContentChange = (event) => {
	setContent(event.target.value);
};

const handleSubmit = (event) => {
	event.preventDefault();
	onCommentSubmit(content);
	setContent(' ');
};

return(
	<from onSubmit={handleSubmit}>
	<textarea value={content} onChange={handleContentChange} />
	<button type="submit">Comment</button>
	</form>
);
}

export default CommentForm;
