import React from 'react';

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

interface ProfileCardProps {
  author: {
    name: string;
    role: string;
    color: string;
    bio?: string;
    avatar?: string;
    company?: string;
    location?: string;
  };
  socialLinks?: SocialLink[];
  showBio?: boolean;
  compact?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  author,
  socialLinks = [],
  showBio = false,
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${author.color} rounded-lg flex items-center justify-center text-white text-sm font-medium`}>
          {author.avatar || author.name.charAt(0)}
        </div>
        <div>
          <p className="text-neutral-900 font-medium text-sm">{author.name}</p>
          <p className="text-neutral-500 text-xs">{author.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5">
      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-16 h-16 bg-gradient-to-br ${author.color} rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
          {author.avatar || author.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-neutral-900 font-semibold text-lg truncate">{author.name}</h3>
          <p className="text-neutral-600 text-sm">{author.role}</p>
          {author.company && (
            <p className="text-neutral-500 text-xs mt-0.5">
              @ {author.company}
              {author.location && ` • ${author.location}`}
            </p>
          )}
        </div>
      </div>

      {/* Bio */}
      {showBio && author.bio && (
        <p className="text-sm text-neutral-600 mb-4">{author.bio}</p>
      )}

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-xs text-neutral-700 hover:text-neutral-900 transition-all group"
              title={`${link.platform}${link.username ? `: ${link.username}` : ''}`}
            >
              <span className="text-base">{link.icon}</span>
              <span className="hidden sm:inline">{link.platform}</span>
              {link.username && (
                <span className="text-neutral-500 group-hover:text-neutral-600">@{link.username}</span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// Extended Author Profile Component
interface AuthorWithLinks {
  name: string;
  role: string;
  color: string;
  bio?: string;
  company?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  behance?: string;
  dribbble?: string;
  portfolio?: string;
  twitter?: string;
}

export const generateSocialLinks = (author: AuthorWithLinks): SocialLink[] => {
  const links: SocialLink[] = [];

  if (author.github) {
    links.push({
      platform: 'GitHub',
      url: `https://github.com/${author.github}`,
      icon: '🐙',
      username: author.github
    });
  }

  if (author.linkedin) {
    links.push({
      platform: 'LinkedIn',
      url: `https://linkedin.com/in/${author.linkedin}`,
      icon: '💼',
      username: author.linkedin
    });
  }

  if (author.behance) {
    links.push({
      platform: 'Behance',
      url: `https://behance.net/${author.behance}`,
      icon: '🎨',
      username: author.behance
    });
  }

  if (author.dribbble) {
    links.push({
      platform: 'Dribbble',
      url: `https://dribbble.com/${author.dribbble}`,
      icon: '🏀',
      username: author.dribbble
    });
  }

  if (author.twitter) {
    links.push({
      platform: 'X',
      url: `https://twitter.com/${author.twitter}`,
      icon: '🐦',
      username: author.twitter
    });
  }

  if (author.portfolio) {
    links.push({
      platform: 'Portfolio',
      url: author.portfolio,
      icon: '🌐'
    });
  }

  return links;
};

export default ProfileCard;
