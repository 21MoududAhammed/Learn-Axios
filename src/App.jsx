import { useEffect, useState } from "react";
import "./App.css";
import AddPost from "./components/AddPost.jsx";
import EditPost from "./components/EditPost.jsx";
import Posts from "./components/Posts";
import axios from "axios";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null); // post I am editing

  const handleAddPost = async (newPost) => {
    try {
      const id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;
      const nextPost = {
        ...newPost,
        id: id.toString(),
      };
      const response = await axios.post(
        `http://localhost:3000/posts`,
        nextPost
      );

      if (response.data) {
        setPosts([...posts, response.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      if (confirm("Are you sure you want to delete the post?")) {
        const newPosts = posts.filter((post) => post.id !== postId);
        await axios.delete(`http://localhost:3000/posts/${postId}`);
        setPosts(newPosts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditPost = async (updatedPost) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/posts/${updatedPost.id}`,
        updatedPost
      );
      if (response.data) {
        const updatedPosts = posts.map((post) =>
          post.id === updatedPost.id ? response.data : post
        );
        setPosts(updatedPosts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // load all posts for the first time
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts`);
        if (response.data) {
          setPosts(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div>
        <h1>API Request with Axios</h1>
        <hr />

        <div>
          <Posts
            posts={posts}
            onDeletePost={handleDeletePost}
            onEditClick={setPost}
          />

          <hr />

          {!post ? (
            <AddPost onAddPost={handleAddPost} />
          ) : (
            <EditPost post={post} onEditPost={handleEditPost} />
          )}
        </div>
      </div>
    </div>
  );
}
