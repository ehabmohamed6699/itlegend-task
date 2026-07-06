import { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import {
  fetchCourseData,
  fetchCourseMaterials,
  fetchCurriculum,
  fetchComments,
  fetchLeaderboard,
  fetchCourseProgress,
  fetchExamData
} from './data/fetchData';
import CoursePlayer from './components/CoursePlayer';
import Comments from './components/Comments';
import AskQuestion from './components/AskQuestion';
import Leaderboard from './components/Leaderboard';
import CourseProgress from './components/CourseProgress';
import CourseMaterials from './components/CourseMaterials';
import Curriculum from './components/Curriculum';
import PdfViewer from './components/PdfViewer';
import ExamPopup from './components/ExamPopup';
import ThemeToggler from './components/ThemeToggler';
import { HiOutlineBookOpen, HiOutlineChatAlt2, HiOutlineQuestionMarkCircle, HiOutlineChartBar, HiOutlineDocumentText, HiOutlineClipboardCheck, HiOutlineChevronRight } from 'react-icons/hi';

const CourseDetails = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  
  const [courseData, setCourseData] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [curriculum, setCurriculum] = useState(null);
  const [comments, setComments] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [examData, setExamData] = useState(null);

  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [showExam, setShowExam] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [course, materials, curriculum, comments, leaderboard, progress, exam] = await Promise.all([
          fetchCourseData(),
          fetchCourseMaterials(),
          fetchCurriculum(),
          fetchComments(),
          fetchLeaderboard(),
          fetchCourseProgress(),
          fetchExamData()
        ]);

        setCourseData(course);
        setMaterials(materials);
        setCurriculum(curriculum);
        setComments(comments);
        setLeaderboardData(leaderboard);
        setProgressData(progress);
        setExamData(exam);
      } catch (error) {
        console.error('Error loading course data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleNavigation = (section) => {
    switch (section) {
      case 'ask-question':
        setShowAskQuestion(true);
        break;
      case 'leaderboard':
        setShowLeaderboard(true);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          {courseData?.breadcrumb?.map((item, index) => (
            <span key={index} className="flex items-center">
              {index > 0 && <HiOutlineChevronRight className="w-4 h-4 mx-1" />}
              {index === courseData.breadcrumb.length - 1 ? (
                <span className="text-gray-900 dark:text-white">{item}</span>
              ) : (
                <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">{item}</a>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-8">
          {courseData?.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <CoursePlayer videoData={courseData?.video} />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <HiOutlineBookOpen className="w-5 h-5" />
                Curriculum
              </button>
              <button
                onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <HiOutlineChatAlt2 className="w-5 h-5" />
                Comments
              </button>
              <button
                onClick={() => setShowAskQuestion(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <HiOutlineQuestionMarkCircle className="w-5 h-5" />
                Ask Question
              </button>
              <button
                onClick={() => setShowLeaderboard(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <HiOutlineChartBar className="w-5 h-5" />
                Leaderboard
              </button>
              <button
                onClick={() => setShowPdf(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <HiOutlineDocumentText className="w-5 h-5" />
                PDF Material
              </button>
              <button
                onClick={() => setShowExam(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                <HiOutlineClipboardCheck className="w-5 h-5" />
                Take Exam
              </button>
            </div>

            <CourseMaterials materials={materials} />
            <CourseProgress progressData={progressData} />
            <Comments comments={comments} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div id="curriculum">
              <Curriculum curriculumData={curriculum} progress={progressData?.overall} />
            </div>
          </div>
        </div>
      </div>

      <ThemeToggler />

      {/* Popups */}
      <AskQuestion isOpen={showAskQuestion} onClose={() => setShowAskQuestion(false)} />
      <Leaderboard isOpen={showLeaderboard} onClose={() => setShowLeaderboard(false)} leaderboardData={leaderboardData} />
      <PdfViewer isOpen={showPdf} onClose={() => setShowPdf(false)} />
      <ExamPopup isOpen={showExam} onClose={() => setShowExam(false)} examData={examData} />
    </div>
  );
};

export default CourseDetails;
