import { useTheme } from '../context/ThemeContext';
import { HiClock, HiBookOpen, HiUserGroup, HiGlobe } from 'react-icons/hi';

const CourseMaterials = ({ materials }) => {
  const { isDark } = useTheme();

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Course Materials
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {materials?.map((material) => (
          <div 
            key={material.id}
            className={`
              rounded-xl border p-5
              ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
            `}
          >
            <div className="flex items-center mb-3">
              <HiClock className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Duration:</span>
              <span className="ml-2 font-semibold text-gray-900 dark:text-white">{material.duration}</span>
            </div>
            <div className="flex items-center mb-3">
              <HiBookOpen className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Lessons:</span>
              <span className="ml-2 font-semibold text-gray-900 dark:text-white">{material.lessons}</span>
            </div>
            <div className="flex items-center mb-3">
              <HiUserGroup className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Enrolled:</span>
              <span className="ml-2 font-semibold text-gray-900 dark:text-white">{material.enrolled} students</span>
            </div>
            <div className="flex items-center">
              <HiGlobe className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Language:</span>
              <span className="ml-2 font-semibold text-gray-900 dark:text-white">{material.language}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseMaterials;
