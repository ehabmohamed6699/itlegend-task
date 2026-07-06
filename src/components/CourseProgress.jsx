import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { HiOutlineLightningBolt } from 'react-icons/hi';

const CourseProgress = ({ progressData }) => {
  const { isDark } = useTheme();
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setAnimatedWidth(progressData?.overall || 0);
            }, 300);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => observer.disconnect();
  }, [progressData?.overall]);

  if (!progressData) return null;

  const xpPercentage = (progressData.xp / progressData.nextLevelXp) * 100;

  return (
    <section ref={progressRef} className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Course Progress</h2>
      
      <div className={`
        rounded-2xl border p-6
        ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Overall Progress
            </span>
            <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {progressData.overall}%
            </span>
          </div>
          <div className={`w-full h-4 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="h-full bg-linear-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${animatedWidth}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current Week</div>
            <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{progressData.currentWeek}</div>
          </div>
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Lessons</div>
            <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {progressData.completedLessons}/{progressData.totalLessons}
            </div>
          </div>
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Level</div>
            <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{progressData.level}</div>
          </div>
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>XP</div>
            <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {progressData.xp}/{progressData.nextLevelXp}
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Level Progress
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {Math.round(xpPercentage)}%
            </span>
          </div>
          <div className={`w-full h-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="h-full bg-linear-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${animatedWidth > 0 ? xpPercentage : 0}%` }}
            />
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Achievements
          </div>
          <div className="flex gap-4">
            {progressData.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`
                  flex flex-col items-center p-3 rounded-xl
                  ${achievement.earned 
                    ? isDark ? 'bg-purple-900/30 border border-purple-700' : 'bg-purple-50 border border-purple-200'
                    : isDark ? 'bg-gray-700/30 border border-gray-600 opacity-50' : 'bg-gray-100 border border-gray-200 opacity-50'}
                `}
              >
                <HiOutlineLightningBolt className={`w-8 h-8 mb-1 ${achievement.earned ? 'text-purple-500' : 'text-gray-400'}`} />
                <span className={`text-xs text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {achievement.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseProgress;
