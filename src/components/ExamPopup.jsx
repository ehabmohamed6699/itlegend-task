import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { HiOutlineX, HiOutlineClock, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi';

const ExamPopup = ({ isOpen, onClose, examData }) => {
  const { isDark } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(examData?.timeLimit || 600);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (isOpen && examData) {
      const savedProgress = localStorage.getItem(`exam-${examData.id}`);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        setAnswers(progress.answers || {});
        setCurrentQuestion(progress.currentQuestion || 0);
        setTimeLeft(progress.timeLeft || examData.timeLimit);
      }
    }
  }, [isOpen, examData]);

  useEffect(() => {
    if (isOpen && examData && !isSubmitted) {
      localStorage.setItem(`exam-${examData.id}`, JSON.stringify({
        answers,
        currentQuestion,
        timeLeft
      }));
    }
  }, [answers, currentQuestion, timeLeft, isOpen, examData, isSubmitted]);

  useEffect(() => {
    if (!isOpen || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleSubmit = useCallback(() => {
    if (!examData) return;

    let correctCount = 0;
    examData.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / examData.questions.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);
    localStorage.removeItem(`exam-${examData.id}`);
  }, [examData, answers]);

  const handleClose = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(examData?.timeLimit || 600);
    setIsSubmitted(false);
    setScore(null);
    onClose();
  };

  if (!isOpen || !examData) return null;

  const question = examData.questions[currentQuestion];
  const totalQuestions = examData.questions.length;

  if (isSubmitted) {
    const passed = score >= examData.passingScore;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className={`w-full max-w-md rounded-2xl shadow-xl p-8 text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-center mb-4">
            {passed ? (
              <HiOutlineCheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <HiOutlineExclamationCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {passed ? 'Congratulations!' : 'Keep Learning!'}
          </h3>
          <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Your Score: <span className={`font-bold ${passed ? 'text-green-500' : 'text-red-500'}`}>{score}%</span>
          </p>
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {passed 
              ? 'You passed the exam! Great job!' 
              : `You need ${examData.passingScore}% to pass. Keep studying!`}
          </p>
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`
        w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col
        ${isDark ? 'bg-gray-800' : 'bg-white'}
      `}>
        {/* Header with Timer */}
        <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {examData.title}
          </h3>
          <div className="flex items-center gap-4">
            <div className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold
              ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}
            `}>
              <HiOutlineClock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
            <button
              onClick={handleClose}
              className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question Navigation Dots */}
        <div className={`p-4 border-b flex justify-center gap-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {examData.questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(index)}
              className={`
                w-10 h-10 rounded-full font-medium transition-all
                ${currentQuestion === index 
                  ? 'bg-purple-600 text-white scale-110' 
                  : answers[q.id] 
                    ? 'bg-green-500 text-white' 
                    : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Question Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className={`
            rounded-xl p-6
            ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}
          `}>
            <div className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {currentQuestion + 1}. of {totalQuestions}
            </div>
            <p className={`text-lg mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {question.text}
            </p>

            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(question.id, option.id)}
                  className={`
                    w-full p-4 rounded-xl text-left transition-all flex items-center gap-4
                    ${answers[question.id] === option.id
                      ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                      : isDark 
                        ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}
                  `}
                >
                  <div className={`
                    w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0
                    ${answers[question.id] === option.id
                      ? 'border-white bg-white/20'
                      : isDark ? 'border-gray-400' : 'border-gray-300'}
                  `}>
                    {answers[question.id] === option.id && (
                      <div className="w-3 h-3 rounded-sm bg-purple-600" />
                    )}
                  </div>
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors
              ${currentQuestion === 0 
                ? 'opacity-50 cursor-not-allowed' 
                : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            Previous
          </button>
          
          {currentQuestion === totalQuestions - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Submit Exam
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(Math.min(totalQuestions - 1, currentQuestion + 1))}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamPopup;
