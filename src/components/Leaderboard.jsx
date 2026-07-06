import { useTheme } from '../context/ThemeContext';
import { HiOutlineX, HiOutlineDocumentReport } from 'react-icons/hi';

const Leaderboard = ({ isOpen, onClose, leaderboardData }) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`
        w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-xl overflow-hidden
        ${isDark ? 'bg-gray-800' : 'bg-white'}
      `}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <HiOutlineDocumentReport className="w-6 h-6 text-yellow-500" />
            Leaderboard
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Leaderboard List */}
        <div className="overflow-y-auto max-h-[60vh] p-4">
          <div className="space-y-3">
            {leaderboardData?.map((entry, index) => (
              <div
                key={entry.rank}
                className={`
                  flex items-center gap-4 p-4 rounded-xl
                  ${index === 0 ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' : 
                    index === 1 ? 'bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600' :
                    index === 2 ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800' :
                    isDark ? 'bg-gray-700/30' : 'bg-gray-50'}
                `}
              >
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                  ${index === 0 ? 'bg-yellow-400 text-yellow-900' : 
                    index === 1 ? 'bg-gray-400 text-gray-900' :
                    index === 2 ? 'bg-orange-400 text-orange-900' :
                    isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}
                `}>
                  {entry.rank}
                </div>

                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {entry.name}
                  </span>
                </div>

                <div className={`text-right ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="text-2xl font-bold">{entry.score}</div>
                  <div className="text-xs">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
