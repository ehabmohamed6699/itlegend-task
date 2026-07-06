import { useTheme } from '../context/ThemeContext';
import { HiOutlineBookOpen, HiOutlineChatAlt2, HiOutlineQuestionMarkCircle, HiOutlineChartBar, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

const NavigationBar = ({ onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'curriculum', label: 'Curriculum', icon: <HiOutlineBookOpen className="w-5 h-5" /> },
    { id: 'comments', label: 'Comments', icon: <HiOutlineChatAlt2 className="w-5 h-5" /> },
    { id: 'ask-question', label: 'Ask Question', icon: <HiOutlineQuestionMarkCircle className="w-5 h-5" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <HiOutlineChartBar className="w-5 h-5" /> },
  ];

  const handleClick = (id) => {
    if (id === 'ask-question' || id === 'leaderboard') {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`
      fixed bottom-0 left-0 right-0 z-40 
      ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      border-t shadow-lg
    `}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`
                flex flex-col items-center py-2 px-3 rounded-lg transition-colors
                ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'}
              `}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
          
          <button
            onClick={toggleTheme}
            className={`
              flex flex-col items-center py-2 px-3 rounded-lg transition-colors
              ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'}
            `}
          >
            {isDark ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
            <span className="text-xs mt-1">{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
