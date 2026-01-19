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
  darkMode?: boolean;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment, darkMode = false }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className={`border-t ${darkMode ? 'border-neutral-700 bg-neutral-800/50' : 'border-neutral-100 bg-neutral-50'}`}>
      {/* Comments List */}
      <div className="px-5 py-4 space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-6">
            <div className={`w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-neutral-700' : 'bg-neutral-100'
            }`}>
              <CommentIcon className={darkMode ? 'text-neutral-500' : 'text-neutral-400'} size={18} />
            </div>
            <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Be the first to share your thoughts</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-medium flex-shrink-0 ${
                darkMode ? 'bg-neutral-600' : 'bg-neutral-900'
              }`}>
                {comment.author.charAt(0)}
              </div>
              <div className={`flex-1 rounded-lg border px-3 py-2 ${
                darkMode ? 'bg-neutral-700 border-neutral-600' : 'bg-white border-neutral-200'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{comment.author}</span>
                  <span className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>{comment.timestamp}</span>
                </div>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Comment Input */}
      <form onSubmit={handleSubmit} className="px-5 pb-4">
        <div className="flex gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-medium flex-shrink-0 ${
            darkMode ? 'bg-neutral-600' : 'bg-neutral-900'
          }`}>
            Y
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 pr-12 text-sm ${
                darkMode 
                  ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
                  : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400'
              }`}
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                newComment.trim()
                  ? darkMode ? 'bg-white text-neutral-900 hover:bg-neutral-100' : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  : darkMode ? 'bg-neutral-600 text-neutral-400' : 'bg-neutral-100 text-neutral-400'
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
