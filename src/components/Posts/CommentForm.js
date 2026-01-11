import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../redux/modules/posts";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };

  return (
    <div className="glass-strong rounded-2xl p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)] border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 flex items-center justify-center border border-cyan-400/30">
          <i className="fas fa-comment text-cyan-400"></i>
        </div>
        <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          Leave a Comment
        </h3>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <textarea
            name="text"
            placeholder="Enter your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="w-full min-h-[100px] px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105"
        >
          <i className="fas fa-paper-plane mr-2"></i>
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect(null, { addComment })(CommentForm);
