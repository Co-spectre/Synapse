import React, { useState } from 'react';
import { SendIcon, CommentIcon } from './icons';

interface Comment {
  id: number;
  author: string;
  color: string;
  text: string;
  timestamp: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="border-t border-neutral-100 bg-neutral-50">
      {/* Comments List */}
      <div className="px-5 py-4 space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-6">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-neutral-100 flex items-center justify-center">
              <CommentIcon className="text-neutral-400" size={18} />
            </div>
            <p className="text-neutral-500 text-sm">Be the first to share your thoughts</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                {comment.author.charAt(0)}
              </div>
              <div className="flex-1 bg-white rounded-lg border border-neutral-200 px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-neutral-900 text-sm">{comment.author}</span>
                  <span className="text-xs text-neutral-400">{comment.timestamp}</span>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Comment Input */}
      <form onSubmit={handleSubmit} className="px-5 pb-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
            Y
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-neutral-900 placeholder-neutral-400 pr-12 text-sm"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                newComment.trim()
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                  : 'bg-neutral-100 text-neutral-400'
              }`}
            >
              <SendIcon size={14} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
