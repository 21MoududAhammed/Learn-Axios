import { useEffect, useState } from "react";
import "./App.css";
import AddPost from "./components/AddPost.jsx";
import EditPost from "./components/EditPost.jsx";
import Posts from "./components/Posts";
import axios from "axios";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null); // post I am editing

  const handleAddPost = (newPost) => {
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;

    setPosts([
      ...posts,
      {
        id,
        ...newPost,
      },
    ]);
  };

  const handleDeletePost = (postId) => {
    if (confirm("Are you sure you want to delete the post?")) {
      const newPosts = posts.filter((post) => post.id !== postId);
      setPosts(newPosts);
    } else {
      console("You chose not to delete the post!");
    }
  };

  const handleEditPost = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );

    setPosts(updatedPosts);
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
