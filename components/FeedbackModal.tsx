import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: string;
  onNext: () => void;
  isLoading: boolean;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, feedback, onNext, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 id="feedback-title" className="text-xl sm:text-2xl font-bold text-sky-600 dark:text-sky-400">
            <i className="fa-solid fa-graduation-cap mr-2"></i>
            AI 멘토 피드백
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            aria-label="닫기"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </header>
        <div className="p-6 sm:p-8 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <LoadingSpinner />
            </div>
          ) : (
             <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {feedback}
                </ReactMarkdown>
             </div>
          )}
        </div>
        <footer className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-700 mt-auto flex justify-end">
          <button
            onClick={onNext}
            disabled={isLoading || !feedback}
            className="bg-sky-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-700 transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            다음 시나리오
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </footer>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FeedbackModal;