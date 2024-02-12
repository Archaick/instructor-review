import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";

function Home({ isAuth }) {
  const [postLists, setPostLists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const postsCollectionRef = collection(db, "posts");

  const getPosts = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
      const postsData = data.docs.map((post) => ({
        ...post.data(),
        id: post.id,
      }));
      setPostLists(postsData);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      console.log("Post deleted successfully:", id);
      setPostLists(prevPostLists => prevPostLists.filter(post => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  
  const handleDeletePost = async (id) => {
    await deletePost(id);
    getPosts(); // Refresh posts after deletion
  };

  const handleSearch = async () => {
    try {
      const querySnapshot = await getDocs(postsCollectionRef);
      const results = querySnapshot.docs
        .map(doc => doc.data())
        .filter(post => post.title.toLowerCase().includes(searchQuery.trim().toLowerCase()));
      setPostLists(results);
      setSearchPerformed(true);
      setSearchQuery(''); // Reset the search query after performing the search
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="homePage">
      {/* Search input field and button */}
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress} // Call handleSearch on Enter key press
          placeholder="CS 1101..."
          className="search"
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
      </div>

      {searchPerformed &&
        postLists.map((post) => (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                <button onClick={() => handleDeletePost(post.id)} className="delete-btn">X</button>
                )}
              </div>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3 className="auth-initals">@{`${post.author.name.charAt(0)}. ${post.author.name.split(' ').pop().charAt(0)}.`}</h3>
          </div>
        ))}
    </div>
  );
}

export default Home;
