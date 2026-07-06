import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { HiOutlinePaperAirplane } from 'react-icons/hi';

const Comments = ({ comments: initialComments }) => {
  const { isDark } = useTheme();
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: `c${Date.now()}`,
      author: 'You',
      avatar: 'https://i.pravatar.cc/40?img=14',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      content: newComment
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <section id="comments" className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Comments</h2>
      
      <div className="space-y-6 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <img
              src={comment.avatar}
              alt={comment.author}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900 dark:text-white">{comment.author}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment"
          className={`
            w-full p-4 rounded-xl border resize-none h-32
            ${isDark 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'}
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
          `}
        />
        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          Submit Review
          <HiOutlinePaperAirplane className="w-4 h-4" />
        </button>
      </form>
    </section>
  );
};

export default Comments;
