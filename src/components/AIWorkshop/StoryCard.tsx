import React, { useState } from 'react';
import { CommentSection } from './CommentSection';
import { IllustrationPlaceholder } from './IllustrationPlaceholder';
import { ShareToSocial } from './ShareToSocial';
import { HeartIcon, SparkleIcon, RocketIcon, CommentIcon, MoreIcon, AlertIcon, ShareIcon, BookmarkIcon } from './icons';

interface Story {
  id: number;
  title: string;
  illustration: string;
  author: {
    name: string;
    role: string;
    color: string;
  };
  timestamp: string;
  content: {
    paragraph1: string;
    paragraph2: string;
  };
  limitation: {
    text: string;
  };
  reactions: {
    hearts: number;
    sparkles: number;
    rockets: number;
  };
  comments: Array<{
    id: number;
    author: string;
    color: string;
    text: string;
    timestamp: string;
  }>;
}

interface StoryCardProps {
  story: Story;
  onReaction: (type: 'hearts' | 'sparkles' | 'rockets') => void;
  onAddComment: (comment: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onReaction, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());
  const [showShare, setShowShare] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleReaction = (type: 'hearts' | 'sparkles' | 'rockets') => {
    if (!userReactions.has(type)) {
      onReaction(type);
      setUserReactions(new Set([...userReactions, type]));
    }
  };

  return (
    <article className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Author Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
            {story.author.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-neutral-900">{story.author.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-500">{story.author.role}</span>
              <span className="text-neutral-300">•</span>
              <span className="text-sm text-neutral-500">{story.timestamp}</span>
            </div>
          </div>
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <MoreIcon className="text-neutral-400" size={18} />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="px-5 pb-3">
        <h2 className="text-lg font-semibold text-neutral-900">
          {story.title}
        </h2>
      </div>

      {/* Illustration Placeholder */}
      <div className="px-5 pb-4">
        <IllustrationPlaceholder type={story.illustration} />
      </div>

      {/* Plain English Breakdown */}
      <div className="px-5 pb-4 space-y-2">
        <p className="text-neutral-600 leading-relaxed">
          {story.content.paragraph1}
        </p>
        {story.content.paragraph2 && (
          <p className="text-neutral-600 leading-relaxed">
            {story.content.paragraph2}
          </p>
        )}
      </div>

      {/* Limitation Nook */}
      <div className="mx-5 mb-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertIcon className="text-amber-600" size={16} />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-800 mb-1">Good to know</h4>
            <p className="text-sm text-amber-700/80 leading-relaxed">
              {story.limitation.text}
            </p>
          </div>
        </div>
      </div>

      {/* Reaction Bar */}
      <div className="px-5 py-4 border-t border-neutral-100">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <ReactionButton
              icon={<HeartIcon size={16} />}
              count={story.reactions.hearts}
              onClick={() => handleReaction('hearts')}
              isActive={userReactions.has('hearts')}
              activeColor="text-rose-500"
              activeBg="bg-rose-50"
            />
            <ReactionButton
              icon={<SparkleIcon size={16} />}
              count={story.reactions.sparkles}
              onClick={() => handleReaction('sparkles')}
              isActive={userReactions.has('sparkles')}
              activeColor="text-amber-500"
              activeBg="bg-amber-50"
            />
            <ReactionButton
              icon={<RocketIcon size={16} />}
              count={story.reactions.rockets}
              onClick={() => handleReaction('rockets')}
              isActive={userReactions.has('rockets')}
              activeColor="text-blue-500"
              activeBg="bg-blue-50"
            />
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 px-3 py-1.5 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <CommentIcon size={16} />
              <span className="text-sm font-medium">{story.comments.length}</span>
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg transition-all ${
                isBookmarked 
                  ? 'text-amber-500 bg-amber-50' 
                  : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
              }`}
              title="Bookmark"
            >
              <BookmarkIcon size={16} />
            </button>
            <button
              onClick={() => setShowShare(true)}
              className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              title="Share"
            >
              <ShareIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
        <ShareToSocial
          title={story.title}
          content={story.content.paragraph1}
          onClose={() => setShowShare(false)}
        />
      )}

      {/* Comments Section */}
      {showComments && (
        <CommentSection
          comments={story.comments}
          onAddComment={onAddComment}
        />
      )}
    </article>
  );
};

interface ReactionButtonProps {
  icon: React.ReactNode;
  count: number;
  onClick: () => void;
  isActive: boolean;
  activeColor: string;
  activeBg: string;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({ icon, count, onClick, isActive, activeColor, activeBg }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
        isActive 
          ? `${activeBg} ${activeColor}` 
          : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600'
      }`}
    >
      <span className={isActive ? 'scale-110' : ''}>{icon}</span>
      <span className="text-sm font-medium">{count}</span>
    </button>
  );
};

export default StoryCard;
