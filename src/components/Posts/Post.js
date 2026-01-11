import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../redux/modules/posts";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

function Post({ getPost, post: { post, loading } }) {
  let { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);
  return loading || post === null ? null : (
    <div className="home">
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
      </div>
      {post.comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  post: state.posts,
});
export default connect(mapStateToProps, { getPost })(Post);
