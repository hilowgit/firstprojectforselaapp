import React, { useState, useEffect, useMemo } from 'react';

// --- Helper Components ---

// The Header component with the menu button
const Header = ({ onMenuToggle }) => {
  return (
    <header className="fixed top-0 right-0 left-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md h-16 z-40 flex items-center justify-between px-4">
      <h1 className="text-xl font-bold text-blue-700 dark:text-teal-400">المركز التعليمي</h1>
      <button onClick={onMenuToggle} className="p-2 text-gray-800 dark:text-gray-200" aria-label="فتح القائمة">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </header>
  );
};

// The new Side Menu component
const SideMenu = ({ isOpen, onClose, theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    onClose(); // Close menu after selection
  };
  
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40 animate-fade-in"></div>
      
      {/* Menu Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out translate-x-0"
           style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">الإعدادات</h2>
            <button onClick={onClose} className="p-2 text-gray-600 dark:text-gray-400" aria-label="إغلاق القائمة">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <ul>
            <li>
              <button onClick={toggleTheme} className="w-full flex items-center gap-4 p-3 rounded-lg text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                {theme === 'dark' ? 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> : 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                }
                <span>الوضع {theme === 'dark' ? 'النهاري' : 'الليلي'}</span>
              </button>
            </li>
            {/* You can add more settings items here in the future */}
          </ul>
        </div>
      </div>
    </>
  );
};


// --- Application Data (Unchanged) ---
const educationalCenterData = { categories: [{ id: 'tech', name: 'القسم التقني', icon: (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>), courses: [{ id: 'web-dev', name: 'تطوير تطبيقات الويب الشاملة', shortDescription: 'من الصفر إلى بناء مشروعك الأول', images: ['https://placehold.co/600x400/3B82F6/ffffff?text=قاعة+التدريب','https://placehold.co/600x400/10B981/ffffff?text=مشاريع+الطلاب','https://placehold.co/600x400/EF4444/ffffff?text=بيئة+العمل'], outline: ['مقدمة في HTML, CSS, و JavaScript','أساسيات React.js وبناء الواجهات التفاعلية','التعامل مع قواعد البيانات و بناء API','نشر التطبيقات على الإنترنت','مشروع تطبيقي نهائي'], prerequisites: ['لا يشترط وجود خبرة برمجية سابقة.','الإلمام بأساسيات استخدام الحاسوب.','شغف ورغبة حقيقية في التعلم.'], duration: '60 ساعة تدريبية', sessions: '20 جلسة', price: { original: 1500, discounted: 1125 }, offerEndDate: '2025-07-15' }, { id: 'python-basics', name: 'أساسيات لغة بايثون Python', shortDescription: 'انطلق في عالم البرمجة مع أقوى اللغات', images: ['https://placehold.co/600x400/F59E0B/ffffff?text=Python+Code'], outline: ['مقدمة في البرمجة وبيئة العمل.','المتغيرات، أنواع البيانات، والعمليات الأساسية.','الجمل الشرطية والحلقات التكرارية.','الدوال والمكتبات الأساسية.','مشروع تطبيقي نهائي.'], prerequisites: ['لا يتطلب أي خبرة مسبقة.'], duration: '40 ساعة تدريبية', sessions: '16 جلسة', price: { original: 1200, discounted: 900 }, offerEndDate: '2025-06-30' }, { id: 'ui-ux', name: 'تصميم واجهات المستخدم (UI/UX)', shortDescription: 'اصنع تجارب مستخدم مذهلة وسهلة', images: ['https://placehold.co/600x400/8B5CF6/ffffff?text=UI/UX+Design'], outline: ['مبادئ تجربة المستخدم (UX)','تصميم الواجهات (UI) باستخدام Figma','بناء النماذج الأولية (Prototypes)','اختبار قابلية الاستخدام'], prerequisites: ['حس فني ورغبة في التصميم.'], duration: '35 ساعة تدريبية', sessions: '14 جلسة', price: { original: 1100, discounted: 850 }, offerEndDate: '2025-07-20' },] }, { id: 'management', name: 'قسم الإدارة والقيادة', icon: (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>), courses: [], }, { id: 'languages', name: 'قسم اللغات', icon: (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>), courses: [], }, { id: 'summer-club', name: 'قسم النادي الصيفي', icon: (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>), courses: [], },] };

// --- Sub-components (Updated with new styling, same as before) ---
const CourseDetails = ({ course, onBack }) => { const [currentImageIndex, setCurrentImageIndex] = useState(0); const nextImage = () => { setCurrentImageIndex((prev) => (prev + 1) % course.images.length); }; const prevImage = () => { setCurrentImageIndex((prev) => (prev - 1 + course.images.length) % course.images.length); }; const CountdownTimer = ({ endDate }) => { const calculateTimeLeft = () => { const diff = +new Date(endDate) - +new Date(); let timeLeft = {}; if (diff > 0) { timeLeft = { 'أيام': Math.floor(diff / (1000 * 60 * 60 * 24)), 'ساعات': Math.floor((diff / (1000 * 60 * 60)) % 24), 'دقائق': Math.floor((diff / 1000 / 60) % 60) }; } return timeLeft; }; const [timeLeft, setTimeLeft] = useState(calculateTimeLeft()); useEffect(() => { const timer = setTimeout(() => { setTimeLeft(calculateTimeLeft()); }, 1000); return () => clearTimeout(timer); }, [timeLeft]); const components = Object.keys(timeLeft).map((i) => <div key={i} className="text-center"><div className="text-xl md:text-2xl font-bold text-blue-500 dark:text-teal-400">{timeLeft[i]}</div><div className="text-xs text-gray-500 dark:text-gray-400">{i}</div></div>); return components.length ? <div className="flex justify-center gap-4">{components}</div> : <span className="text-red-500 font-semibold">انتهى العرض!</span>; }; const handleWhatsAppInquiry = () => { const phone = '966000000000'; const msg = `مرحباً، أرغب بالاستفسار عن دورة "${course.name}". هل يمكنني الحصول على المزيد من التفاصيل؟`; window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank'); }; return ( <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg animate-fade-in shadow-lg"><button onClick={onBack} className="mb-4 flex items-center gap-2 text-blue-600 dark:text-teal-400 hover:text-blue-800 dark:hover:text-teal-300 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>العودة لقائمة الدورات</button><h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">{course.name}</h1><div className="relative w-full max-w-2xl mx-auto mb-6 rounded-lg overflow-hidden shadow-lg"><img src={course.images[currentImageIndex]} alt={`صورة عرض ${currentImageIndex + 1}`} className="w-full h-56 md:h-72 object-cover transition-transform duration-500 ease-in-out" />{course.images.length > 1 && (<><button onClick={prevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button><button onClick={nextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg></button></>)}</div><div className="space-y-6"><div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"><h2 className="text-2xl font-semibold text-blue-700 dark:text-teal-400 mb-3">ماذا ستتعلم في هذه الدورة؟</h2><ul className="space-y-2 pr-5 text-gray-700 dark:text-gray-300 list-disc list-inside">{course.outline.map((item, i) => <li key={i}>{item}</li>)}</ul></div><div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"><h2 className="text-2xl font-semibold text-blue-700 dark:text-teal-400 mb-3">لمن هذه الدورة؟</h2><ul className="space-y-2 pr-5 text-gray-700 dark:text-gray-300 list-disc list-inside">{course.prerequisites.map((item, i) => <li key={i}>{item}</li>)}</ul></div><div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center flex justify-around items-center"><div><p className="text-lg font-semibold text-gray-800 dark:text-white">المدة الإجمالية</p><p className="text-xl text-blue-600 dark:text-teal-400">{course.duration}</p></div><div className="border-l-2 border-gray-200 dark:border-gray-600 h-12"></div><div><p className="text-lg font-semibold text-gray-800 dark:text-white">عدد الجلسات</p><p className="text-xl text-blue-600 dark:text-teal-400">{course.sessions}</p></div></div><div className="bg-blue-100 dark:bg-gradient-to-l from-teal-500 to-cyan-600 p-5 rounded-lg text-center shadow-lg"><h2 className="text-2xl font-bold text-blue-800 dark:text-white mb-2">عرض خاص للتسجيل المبكر!</h2><div className="flex justify-center items-center gap-4 my-3"><span className="line-through text-gray-500 dark:text-gray-200 text-xl">{course.price.original} ريال</span><span className="text-3xl font-extrabold text-blue-600 dark:text-yellow-300 animate-pulse">{course.price.discounted} ريال فقط!</span></div><div className="mt-4 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg"><p className="mb-2 text-gray-700 dark:text-gray-200">ينتهي العرض خلال:</p><CountdownTimer endDate={course.offerEndDate} /></div></div><div className="mt-8"><button onClick={handleWhatsAppInquiry} className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.451-4.437-9.887-9.888-9.888-5.452 0-9.888 4.436-9.889 9.888.001 2.228.651 4.315 1.731 6.086l.001.004l-1.043 3.803 3.827-1.011z"/></svg>سجل الآن عبر الواتساب</button></div></div></div> ); };
const CoursesList = ({ category, onSelectCourse, onBack }) => { return ( <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg animate-fade-in shadow-lg"><button onClick={onBack} className="mb-4 flex items-center gap-2 text-blue-600 dark:text-teal-400 hover:text-blue-800 dark:hover:text-teal-300 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>العودة للأقسام</button><h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">دورات {category.name}</h1>{category.courses.length > 0 ? ( <div className="space-y-4">{category.courses.map((course) => ( <div key={course.id} onClick={() => onSelectCourse(course.id)} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"><div><h2 className="text-xl font-semibold text-blue-700 dark:text-teal-400">{course.name}</h2><p className="text-gray-600 dark:text-gray-400">{course.shortDescription}</p></div><svg className="text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg></div> ))}</div> ) : ( <p className="text-center text-gray-500 dark:text-gray-400 mt-8 text-lg">لا توجد دورات في هذا القسم حالياً. ترقبوا جديدنا!</p> )}</div> ); };
const HomeScreen = ({ onSelectCategory }) => { return ( <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg animate-fade-in shadow-lg"><h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">أقسامنا التدريبية</h1><p className="text-center text-gray-600 dark:text-gray-400 mb-8">اختر اهتمامك وانطلق في رحلة التعلم</p><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{educationalCenterData.categories.map((category) => ( <div key={category.id} onClick={() => onSelectCategory(category.id)} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center cursor-pointer flex flex-col items-center justify-center gap-4 hover:bg-blue-500/10 dark:hover:bg-teal-500/20 hover:shadow-xl hover:border-blue-500 dark:hover:border-teal-500 border-2 border-transparent transition-all duration-300 transform hover:-translate-y-2"><div className="text-blue-600 dark:text-teal-400">{React.cloneElement(category.icon, { width: "48", height: "48", strokeWidth:"1.5" })}</div><h2 className="text-xl font-semibold text-gray-800 dark:text-white">{category.name}</h2></div> ))}</div></div> ); };


// --- Main Application Component ---
export default function App() {
  const [page, setPage] = useState('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  
  // --- Theme Logic ---
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // --- Menu Logic ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- PWA Install Logic ---
  const [installPrompt, setInstallPrompt] = useState(null);
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  const handleInstallClick = () => { if (installPrompt) { installPrompt.prompt(); } };

  // --- Navigation Logic ---
  const goToHome = () => { setPage('home'); setSelectedCategoryId(null); setSelectedCourseId(null); };
  const handleSelectCategory = (categoryId) => { setSelectedCategoryId(categoryId); setPage('courses'); };
  const handleSelectCourse = (courseId) => { setSelectedCourseId(courseId); setPage('details'); };
  const handleBackToCourses = () => { setPage('courses'); setSelectedCourseId(null); };
  
  const selectedCategory = useMemo(() => educationalCenterData.categories.find(c => c.id === selectedCategoryId), [selectedCategoryId] );
  const selectedCourse = useMemo(() => selectedCategory?.courses.find(c => c.id === selectedCourseId), [selectedCategory, selectedCourseId] );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white font-['Cairo',_sans-serif] transition-colors duration-500">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap'); .animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      
      <Header onMenuToggle={() => setIsMenuOpen(true)} />
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} theme={theme} setTheme={setTheme} />
      
      <main className="pt-20 p-4 flex items-center justify-center">
        {page === 'home' && <HomeScreen onSelectCategory={handleSelectCategory} />}
        {page === 'courses' && selectedCategory && ( <CoursesList category={selectedCategory} onSelectCourse={handleSelectCourse} onBack={goToHome} /> )}
        {page === 'details' && selectedCourse && ( <CourseDetails course={selectedCourse} onBack={handleBackToCourses} /> )}
      </main>

      {installPrompt && (
        <button onClick={handleInstallClick} className="fixed bottom-4 right-4 bg-blue-600 dark:bg-teal-500 hover:bg-blue-700 dark:hover:bg-teal-600 text-white font-bold py-3 px-5 rounded-full shadow-lg z-30 flex items-center gap-3 animate-pulse transition-transform transform hover:scale-110" title="تثبيت التطبيق على جهازك">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          <span>تثبيت</span>
        </button>
      )}
    </div>
  );
}
