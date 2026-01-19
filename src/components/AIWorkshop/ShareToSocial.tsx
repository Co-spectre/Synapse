import React, { useState } from 'react';
import { ShareIcon, CheckIcon, CloseIcon } from './icons';

interface ShareToSocialProps {
  title: string;
  content: string;
  url?: string;
  onClose: () => void;
}

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  shareUrl: (title: string, content: string, url: string) => string;
  available: boolean;
}

export const ShareToSocial: React.FC<ShareToSocialProps> = ({
  title,
  content,
  url = window.location.href,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState<string[]>([]);

  const platforms: SocialPlatform[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      color: 'from-blue-600 to-blue-700',
      shareUrl: (title, content) => 
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(content)}`,
      available: true
    },
    {
      id: 'github',
      name: 'GitHub Gist',
      icon: '🐙',
      color: 'from-neutral-700 to-neutral-800',
      shareUrl: () => 'https://gist.github.com/',
      available: true
    },
    {
      id: 'behance',
      name: 'Behance',
      icon: '🎨',
      color: 'from-blue-500 to-indigo-600',
      shareUrl: () => 'https://www.behance.net/create/project',
      available: true
    },
    {
      id: 'dribbble',
      name: 'Dribbble',
      icon: '🏀',
      color: 'from-pink-500 to-rose-600',
      shareUrl: () => 'https://dribbble.com/shots/new',
      available: true
    },
    {
      id: 'dev',
      name: 'DEV.to',
      icon: '📝',
      color: 'from-neutral-800 to-neutral-900',
      shareUrl: (title, content) => 
        `https://dev.to/new?prefill=${encodeURIComponent(`---\ntitle: ${title}\n---\n\n${content}`)}`,
      available: true
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: '🐦',
      color: 'from-neutral-900 to-black',
      shareUrl: (title) => 
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      available: true
    },
    {
      id: 'notion',
      name: 'Notion',
      icon: '📋',
      color: 'from-neutral-600 to-neutral-700',
      shareUrl: () => 'https://www.notion.so/',
      available: true
    },
    {
      id: 'medium',
      name: 'Medium',
      icon: '✍️',
      color: 'from-green-600 to-green-700',
      shareUrl: () => 'https://medium.com/new-story',
      available: true
    }
  ];

  const handleShare = (platform: SocialPlatform) => {
    const shareUrl = platform.shareUrl(title, content, url);
    window.open(shareUrl, '_blank', 'width=600,height=600');
    setShared([...shared, platform.id]);
  };

  const handleCopyLink = () => {
    const shareText = `${title}\n\n${content}\n\n${url}`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-neutral-200 max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
              <ShareIcon size={16} className="text-white" />
            </div>
            <h3 className="text-neutral-900 font-semibold">Share to Professional Networks</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <CloseIcon size={20} className="text-neutral-400" />
          </button>
        </div>

        {/* Preview */}
        <div className="px-5 py-4 bg-neutral-50 border-b border-neutral-100">
          <p className="text-sm text-neutral-500 mb-1">Preview:</p>
          <h4 className="text-neutral-900 font-medium mb-2">{title}</h4>
          <p className="text-sm text-neutral-600 line-clamp-2">{content}</p>
        </div>

        {/* Platforms Grid */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handleShare(platform)}
                disabled={!platform.available}
                className={`relative p-4 rounded-lg border border-neutral-200 transition-all ${
                  platform.available 
                    ? 'hover:bg-neutral-50 hover:shadow-md cursor-pointer' 
                    : 'opacity-40 cursor-not-allowed'
                }`}
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${platform.color} rounded-lg flex items-center justify-center text-2xl mb-2`}>
                  {platform.icon}
                </div>
                <p className="text-neutral-900 text-sm font-medium">{platform.name}</p>
                {shared.includes(platform.id) && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckIcon size={12} className="text-white" />
                  </div>
                )}
                {!platform.available && (
                  <span className="absolute top-2 right-2 text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                    Soon
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="mt-5 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700 font-medium mb-2">💡 Pro Tips:</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• LinkedIn: Best for reaching professionals and recruiters</li>
              <li>• GitHub: Perfect for code projects and technical work</li>
              <li>• Behance/Dribbble: Ideal for design portfolios</li>
              <li>• DEV.to: Great for developer community engagement</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 border-t border-neutral-100 flex gap-3">
          <button
            onClick={handleCopyLink}
            className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm text-neutral-700 font-medium transition-colors flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <CheckIcon size={16} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <ShareIcon size={16} />
                <span>Copy Link</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-sm text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareToSocial;
