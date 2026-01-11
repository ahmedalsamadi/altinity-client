import React from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../redux/modules/posts";
import { formatDate, getProfileImage } from "../../utiles";

const CommentItem = ({
  comment: { _id, text, name, user, date },
  postId,
  users,
  deleteComment,
}) => {
  return (
    <div className="glass rounded-xl p-4 border-l-4 border-cyan-400/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <img
            src={getProfileImage(user, users)}
            alt=""
            className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400/30"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-white/90 text-sm">{name}</p>
            <span className="text-xs text-white/50">•</span>
            <span className="text-xs text-white/50">{formatDate(date)}</span>
          </div>
          <p className="text-white/80 mb-2 leading-relaxed whitespace-pre-wrap">{text}</p>
          {!users.loading && user === users.user._id && (
            <button
              type="button"
              className="mt-2 px-3 py-1 rounded-lg glass text-red-400 text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:scale-105"
              onClick={() => deleteComment(postId, _id)}
            >
              <i className="fas fa-trash mr-1"></i>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
