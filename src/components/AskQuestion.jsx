import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { HiOutlineX, HiOutlineInformationCircle } from 'react-icons/hi';

const AskQuestion = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('');
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedDraft = localStorage.getItem('askQuestionDraft');
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        setSubject(draft.subject || '');
        setQuestion(draft.question || '');
        setHasDraft(true);
      } else {
        setHasDraft(false);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (subject || question) {
      localStorage.setItem('askQuestionDraft', JSON.stringify({ subject, question }));
    }
  }, [subject, question]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('askQuestionDraft');
    setSubject('');
    setQuestion('');
    setHasDraft(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`
        w-full max-w-lg rounded-2xl shadow-xl
        ${isDark ? 'bg-gray-800' : 'bg-white'}
      `}>
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ask a Question
          </h3>
          <button
            onClick={handleClose}
            className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's your question about?"
              className={`
                w-full px-4 py-2 rounded-lg border
                ${isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'}
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              `}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Your Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Describe your question in detail..."
              rows={5}
              className={`
                w-full px-4 py-2 rounded-lg border resize-none
                ${isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'}
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              `}
            />
          </div>

          {hasDraft && (
            <p className={`text-sm flex items-center gap-2 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
              <HiOutlineInformationCircle className="w-5 h-5" />
              Your draft has been saved and will be restored if you close this dialog.
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
