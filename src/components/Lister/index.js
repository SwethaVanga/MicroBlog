import React, { useEffect, useState } from 'react';
import getPosts from '../../services/posts';
import Post from './Post'
import CreatePost from './CreatePost';

const Lister = () => {

	const [loading, setLoading] = useState(true);
	const [allPosts, setPosts] = useState([]);

	useEffect(() => {
		getPosts().then(data => {
			setLoading(false);
			setPosts(data);
		});
	}, []);


	const onDeletePost = (id) => {
		setPosts(prev => [...prev.filter(p => p.id !== id)])
	}

	const onCreatePost = post => {
		let newPost = {
			id: new Date().getTime(),
			...post
		}
		setPosts(prev => [...prev, newPost])
	}

	return (
		<div className="postList">
			<CreatePost onCreate={onCreatePost} />
			{!loading ? <>
				{allPosts.length > 0 ? allPosts.map(post => (
					<Post
						key={post.id}
						id={post.id}
						title={post.title}
						body={post.body}
						author={post.author}
						onDelete={() => onDeletePost(post.id)} />
				)) : 'No posts available...'}
			</> : 'Loading...'}
		</div>
	)
};

export default Lister;