import { useTheme } from '../context/ThemeContext';
import { HiCheck, HiLockClosed, HiDocumentText } from 'react-icons/hi';

const Curriculum = ({ curriculumData, progress }) => {
  const { isDark } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Topics for This Course</h2>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-500">
              <img
                src="https://i.pravatar.cc/40?img=5"
                alt="Your progress"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">You</span>
          </div>
          <span className="text-sm font-medium text-green-600">{progress || 63}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${progress || 63}%` }}
          />
        </div>
      </div>

      {/* Curriculum Weeks */}
      <div className="space-y-6">
        {curriculumData?.map((week) => (
          <div key={week.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
            <div className="flex items-center mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">{week.title}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{week.description}</p>
            
            <div className="space-y-3">
              {week.lessons.map((lesson) => (
                <div 
                  key={lesson.id} 
                  className={`
                    flex items-center text-sm
                    ${lesson.isCompleted || !lesson.isLocked 
                      ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer' 
                      : 'text-gray-400 dark:text-gray-500'}
                  `}
                >
                  {lesson.isCompleted ? (
                    <HiCheck className="w-4 h-4 mr-3 text-green-500 shrink-0" />
                  ) : lesson.isLocked ? (
                    <HiLockClosed className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  ) : (
                    <HiDocumentText className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  )}
                  <span className="flex-1">{lesson.title}</span>
                  {(lesson.questions > 0 || lesson.minutes > 0) && (
                    <div className="flex items-center gap-2 ml-2">
                      {lesson.questions > 0 && (
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
                          {lesson.questions} QUESTION{lesson.questions > 1 ? 'S' : ''}
                        </span>
                      )}
                      {lesson.minutes > 0 && (
                        <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded">
                          {lesson.minutes} MINUTES
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;
