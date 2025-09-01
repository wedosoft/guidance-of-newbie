import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12 animate-fade-in">
      {/* Company Logo Placeholder */}
      <div className="mb-4 inline-block bg-slate-200 dark:bg-slate-700 p-3 rounded-full">
        <i className="fa-solid fa-building-columns text-2xl text-slate-500 dark:text-slate-400"></i>
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-bold text-sky-600 dark:text-sky-400 mb-2 flex items-center justify-center gap-3">
        <i className="fa-regular fa-compass"></i>
        온보딩 나침반
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400">
        AI 시니어 멘토와 함께하는 회사 생활 길라잡이
      </p>
    </header>
  );
};

export default Header;