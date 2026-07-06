import { useTheme } from '../context/ThemeContext';
import { HiOutlineX } from 'react-icons/hi';

const PdfViewer = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/80">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
        <h3 className="text-white font-medium">Course Material - PDF</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-700 text-white transition-colors"
        >
          <HiOutlineX className="w-6 h-6" />
        </button>
      </div>

      {/* PDF Content */}
      <div className="flex-1 bg-white">
        <iframe
          src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
          className="w-full h-full"
          title="PDF Viewer"
        />
      </div>
    </div>
  );
};

export default PdfViewer;
