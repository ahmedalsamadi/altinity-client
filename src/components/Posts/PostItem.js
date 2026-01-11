import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike, deletePost } from "../../redux/modules/posts";
import { formatDate, getProfileImage, getPostImage } from "../../utiles";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  users,
  post: { _id, text, name, user, likes, comments, date, pic },
  showActions,
}) => {
  const isLiked = users.user && likes.some((like) => like.user === users.user._id);
  const postImageUrl = getPostImage(pic);

  return (
    <div className="glass-strong rounded-2xl p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)] border border-white/10 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <img
            className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            alt=""
            src={getProfileImage(user, users.profiles)}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-semibold text-white/90">{name}</p>
            <span className="text-xs text-white/50">•</span>
            <span className="text-xs text-white/50">{formatDate(date)}</span>
          </div>
          
          <p className="text-white/80 mb-4 leading-relaxed whitespace-pre-wrap">{text}</p>

          {/* Post Image */}
          {postImageUrl && (
            <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
              <img
                src={postImageUrl}
                alt="Post"
                className="w-full max-h-96 object-contain bg-white/5"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
          
          {showActions && (
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => addLike(_id)}
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isLiked
                    ? "bg-cyan-400/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                    : "glass text-white/70 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                }`}
              >
                <i className="fas fa-thumbs-up"></i>
                {likes.length > 0 && <span className="text-sm font-medium">{likes.length}</span>}
              </button>
              
              <button
                onClick={() => removeLike(_id)}
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-white/70 transition-all duration-300 hover:text-fuchsia-400 hover:shadow-[0_0_15px_rgba(244,114,182,0.3)]"
              >
                <i className="fas fa-thumbs-down"></i>
              </button>
              
              <Link
                to={`/posts/${_id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 border border-cyan-400/30 text-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105"
              >
                <i className="fas fa-comments"></i>
                <span>Discussion</span>
                {comments.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-xs font-semibold">
                    {comments.length}
                  </span>
                )}
              </Link>
              
              {!users.loading && users.user && user === users.user._id && (
                <button
                  onClick={() => deletePost(_id)}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-red-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:scale-105 ml-auto"
                >
                  <i className="fas fa-trash"></i>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
PostItem.defaultProps = {
  showActions: true,
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
