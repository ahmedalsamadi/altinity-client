import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../redux/modules/posts";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

function Posts({ getPosts, posts }) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div className="min-h-screen pt-20 pb-20 lg:pb-8 lg:pl-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <PostForm />
        <div className="space-y-6">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});
export default connect(mapStateToProps, { getPosts })(Posts);
