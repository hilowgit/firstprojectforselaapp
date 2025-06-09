import React, { useState, useEffect } from 'react';
import { BookOpen, Laptop, Briefcase, TrendingUp, Sun, Globe, Zap, Clock, Tag } from 'lucide-react'; // Icons for categories and details

// Mock Data for Categories and Courses
const categories = [
  { id: 'engineering', name: 'القسم الهندسي', icon: BookOpen },
  { id: 'technical', name: 'القسم التقني', icon: Laptop },
  { id: 'professional', name: 'القسم المهني', icon: Briefcase },
  { id: 'management', name: 'قسم الإدارة والقيادة', icon: TrendingUp },
  { id: 'development', name: 'قسم التنمية البشرية', icon: Zap },
  { id: 'languages', name: 'قسم اللغات', icon: Globe },
  { id: 'summer_club', name: 'قسم النادي الصيفي', icon: Sun },
];

const courses = [
  {
    id: 'python_basics',
    categoryId: 'technical',
    name: 'أساسيات لغة بايثون Python',
    shortDescription: 'من الصفر إلى بناء مشروعك الأول.',
    price: 900,
    originalPrice: 1200,
    offerEndDate: '2025-06-30T23:59:59',
    images: [
      'https://placehold.co/600x400/D1FAE5/065F46?text=صورة+الدورة+1',
      'https://placehold.co/600x400/E0F2FE/1D4ED8?text=صورة+الدورة+2',
      'https://placehold.co/600x400/FEE2E2/B91C1C?text=صورة+الدورة+3',
    ],
    outline: [
      'مقدمة في البرمجة والتعرف على بيئة العمل.',
      'المتغيرات، أنواع البيانات، والعمليات الأساسية.',
      'الجمل الشرطية والحلقات التكرارية.',
      'الدوال والمكتبات الأساسية.',
      'مشروع تطبيقي نهائي.',
    ],
    prerequisites: [
      'لا يشترط وجود خبرة برمجية سابقة.',
      'الإلمام بأساسيات استخدام الحاسوب.',
      'شغف ورغبة حقيقية في التعلم.',
    ],
    duration: '40 ساعة تدريبية',
    sessions: '16 جلسة',
  },
  {
    id: 'cyber_security',
    categoryId: 'technical',
    name: 'الأمن السيبراني للمبتدئين',
    shortDescription: 'ابدأ رحلتك في عالم حماية البيانات.',
    price: 750,
    originalPrice: 1000,
    offerEndDate: '2025-07-15T23:59:59',
    images: [
      'https://placehold.co/600x400/D1FAE5/065F46?text=صورة+الأمن+السيبراني+1',
      'https://placehold.co/600x400/E0F2FE/1D4ED8?text=صورة+الأمن+السيبراني+2',
      'https://placehold.co/600x400/FEE2E2/B91C1C?text=صورة+الأمن+السيبراني+3',
    ],
    outline: [
      'مقدمة في الأمن السيبراني والمخاطر الشائعة.',
      'أساسيات حماية الشبكات والأنظمة.',
      'التعامل مع البرمجيات الخبيثة.',
      'أفضل ممارسات الأمن الشخصي والمهني.',
    ],
    prerequisites: [
      'فهم أساسي لاستخدام الحاسوب والإنترنت.',
      'رغبة في تعلم كيفية حماية المعلومات.',
    ],
    duration: '30 ساعة تدريبية',
    sessions: '10 جلسات',
  },
  {
    id: 'web_design',
    categoryId: 'technical',
    name: 'تصميم واجهات المستخدم (UI/UX)',
    shortDescription: 'صمم تجارب مستخدم مذهلة وجذابة.',
    price: 1100,
    originalPrice: 1500,
    offerEndDate: '2025-07-01T23:59:59',
    images: [
      'https://placehold.co/600x400/D1FAE5/065F46?text=صورة+UI/UX+1',
      'https://placehold.co/600x400/E0F2FE/1D4ED8?text=صورة+UI/UX+2',
      'https://placehold.co/600x400/FEE2E2/B91C1C?text=صورة+UI/UX+3',
    ],
    outline: [
      'مبادئ تصميم واجهات المستخدم.',
      'فهم تجربة المستخدم وأبحاثها.',
      'أدوات التصميم (Figma, Sketch, Adobe XD).',
      'بناء نماذج أولية وتجربتها.',
      'مشروع تصميم واجهة كاملة.',
    ],
    prerequisites: [
      'لا يشترط وجود خبرة سابقة في التصميم.',
      'حس فني ورغبة في الإبداع.',
    ],
    duration: '50 ساعة تدريبية',
    sessions: '20 جلسة',
  },
  {
    id: 'excel_bi',
    categoryId: 'technical',
    name: 'تحليل البيانات باستخدام Excel و Power BI',
    shortDescription: 'حول البيانات الخام إلى رؤى قيمة لاتخاذ القرار.',
    price: 850,
    originalPrice: 1100,
    images: [
      'https://placehold.co/600x400/D1FAE5/065F46?text=صورة+Excel+BI+1',
      'https://placehold.co/600x400/E0F2FE/1D4ED8?text=صورة+Excel+BI+2',
      'https://placehold.co/600x400/FEE2E2/B91C1C?text=صورة+Excel+BI+3',
    ],
    outline: [
      'أساسيات Excel المتقدمة لتحليل البيانات.',
      'مقدمة إلى Power BI وبناء لوحات المعلومات.',
      'تحويل البيانات وتنظيفها (ETL).',
      'إنشاء تقارير تفاعلية ومشاركتها.',
      'دراسات حالة عملية في تحليل البيانات.',
    ],
    prerequisites: [
      'إلمام بأساسيات برنامج Excel.',
      'رغبة في تطوير مهارات تحليل البيانات.',
    ],
    duration: '35 ساعة تدريبية',
    sessions: '14 جلسة',
  },
  {
    id: 'summer_fun',
    categoryId: 'summer_club',
    name: 'نادي الصيف للمرح والإبداع',
    shortDescription: 'أنشطة صيفية ممتعة وتنمية للمهارات.',
    price: 500,
    originalPrice: null, // No original price for summer club
    offerEndDate: null,
    images: [
      'https://placehold.co/600x400/D1FAE5/065F46?text=صورة+النادي+الصيفي+1',
      'https://placehold.co/600x400/E0F2FE/1D4ED8?text=صورة+النادي+الصيفي+2',
      'https://placehold.co/600x400/FEE2E2/B91C1C?text=صورة+النادي+الصيفي+3',
    ],
    outline: [
      'ورش عمل فنية وحرف يدوية.',
      'ألعاب جماعية ورياضات خفيفة.',
      'قصص تفاعلية وأنشطة ثقافية.',
      'تحديات ذهنية وألعاب تعليمية.',
    ],
    prerequisites: [
      'الفئة العمرية من 6-12 سنة.',
      'حب الاستكشاف والمرح.',
    ],
    duration: '4 أسابيع',
    sessions: 'يومياً (5 أيام في الأسبوع)',
  },
  {
    id: 'english_conversation',
    categoryId: 'languages',
    name: 'محادثة اللغة الإنجليزية للمتقدمين',
    shortDescription: 'تحدث الإنجليزية بطلاقة وثقة.',
    price: 700,
    originalPrice: 950,
    offerEndDate: '2025-06-25T23:59:59',
    images: [
      'https://placehold.co/600x400/D1FAE5/065F46?text=صورة+اللغات+1',
      'https://placehold.co/600x400/E0F2FE/1D4ED8?text=صورة+اللغات+2',
      'https://placehold.co/600x400/FEE2E2/B91C1C?text=صورة+اللغات+3',
    ],
    outline: [
      'نقاشات حول مواضيع متنوعة.',
      'تحسين النطق واللكنة.',
      'زيادة المفردات والتعبيرات.',
      'جلسات لعب أدوار وتمارين عملية.',
    ],
    prerequisites: [
      'مستوى متوسط إلى متقدم في اللغة الإنجليزية.',
      'رغبة في الممارسة والتطوير المستمر.',
    ],
    duration: '25 ساعة تدريبية',
    sessions: '10 جلسات',
  },
];

// Main App Component
function App() {
  // State to manage current screen and selected items
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'courseList', 'courseDetails'
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // --- Home Screen Component ---
  const HomeScreen = ({ onSelectCategory }) => {
    return (
      <div className="p-6 md:p-8 bg-gray-50 min-h-screen font-inter text-right flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 mt-4 text-center">
          أقسامنا التدريبية
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 text-center max-w-2xl">
          اختر اهتمامك وانطلق في رحلتك التعليمية معنا!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center border border-gray-200"
            >
              <div className="p-4 bg-indigo-100 rounded-full mb-4">
                <category.icon className="w-10 h-10 text-indigo-700" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Course List Screen Component ---
  const CourseListScreen = ({ categoryId, onSelectCourse, onBack }) => {
    const category = categories.find((cat) => cat.id === categoryId);
    const filteredCourses = courses.filter((course) => course.categoryId === categoryId);

    if (!category) {
      return <div className="p-6 text-center text-red-500">حدث خطأ: القسم غير موجود.</div>;
    }

    return (
      <div className="p-6 md:p-8 bg-gray-50 min-h-screen font-inter text-right flex flex-col items-center">
        <div className="w-full max-w-4xl flex items-center mb-6">
          <button
            onClick={onBack}
            className="p-2 mr-4 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition-colors"
            aria-label="العودة"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 transform rotate-180" // Rotate for RTL back arrow
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex-grow text-center ml-16">
            دورات {category.name}
          </h1>
        </div>

        {filteredCourses.length === 0 ? (
          <p className="text-lg text-gray-600 mt-10">لا توجد دورات متاحة في هذا القسم حاليًا.</p>
        ) : (
          <div className="w-full max-w-4xl space-y-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course.id)}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between"
              >
                <div className="flex-1 mb-3 md:mb-0">
                  <h2 className="text-xl font-bold text-gray-900">{course.name}</h2>
                  <p className="text-gray-600 mt-1">{course.shortDescription}</p>
                </div>
                {course.price && (
                  <div className="flex items-center text-lg font-semibold text-indigo-600">
                    {course.offerEndDate && new Date(course.offerEndDate) > new Date() && course.originalPrice ? (
                      <span className="text-gray-500 line-through ml-2">{course.originalPrice} ريال</span>
                    ) : null}
                    <span>{course.price} ريال</span>
                    {course.offerEndDate && new Date(course.offerEndDate) > new Date() && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">عرض خاص</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // --- Course Detail Screen Component ---
  const CourseDetailScreen = ({ courseId, onBack }) => {
    const course = courses.find((c) => c.id === courseId);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
      if (course?.offerEndDate) {
        const calculateTimeLeft = () => {
          const difference = +new Date(course.offerEndDate) - +new Date();
          let timeLeft = {};

          if (difference > 0) {
            timeLeft = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
            };
          }
          return timeLeft;
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [course]);

    if (!course) {
      return <div className="p-6 text-center text-red-500">حدث خطأ: الدورة غير موجودة.</div>;
    }

    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % course.images.length);
    };

    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + course.images.length) % course.images.length);
    };

    const whatsappMessage = encodeURIComponent(
      `مرحباً، أرغب بالاستفسار عن (${course.name}). هل يمكنني الحصول على المزيد من التفاصيل؟`
    );
    // Replace with your actual WhatsApp number
    const whatsappLink = `https://wa.me/966500000000?text=${whatsappMessage}`;

    const timerComponents = [];
    if (timeLeft) {
      Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval] && interval !== 'seconds' && interval !== 'minutes') {
          return;
        }
        timerComponents.push(
          <span key={interval} className="mx-1 p-2 bg-indigo-100 rounded-lg text-indigo-800 font-bold">
            {timeLeft[interval]} {
              interval === 'days' ? 'أيام' :
              interval === 'hours' ? 'ساعات' :
              interval === 'minutes' ? 'دقائق' :
              'ثواني'
            }
          </span>
        );
      });
    }

    return (
      <div className="p-6 md:p-8 bg-gray-50 min-h-screen font-inter text-right flex flex-col items-center">
        <div className="w-full max-w-4xl flex items-center mb-6">
          <button
            onClick={onBack}
            className="p-2 mr-4 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition-colors"
            aria-label="العودة"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 transform rotate-180" // Rotate for RTL back arrow
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex-grow text-center ml-16">
            {course.name}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-4xl border border-gray-200">
          {/* Image Carousel */}
          {course.images && course.images.length > 0 && (
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8 shadow-md">
              <img
                src={course.images[currentImageIndex]}
                alt={`صورة الدورة ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=صورة+غير+متوفرة';
                }}
              />
              {course.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none hover:bg-opacity-75 transition-colors"
                    aria-label="الصورة السابقة"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 transform rotate-180"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none hover:bg-opacity-75 transition-colors"
                    aria-label="الصورة التالية"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          )}

          {/* Course Outline */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen className="ml-2 text-indigo-600" /> ماذا ستتعلم في هذه الدورة؟
            </h2>
            <ul className="list-none space-y-3">
              {course.outline.map((item, index) => (
                <li key={index} className="text-gray-700 text-lg flex items-start">
                  <span className="text-indigo-600 font-extrabold text-2xl leading-none ml-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Laptop className="ml-2 text-indigo-600" /> لمن هذه الدورة؟ / متطلبات الدورة
            </h2>
            <ul className="list-none space-y-3">
              {course.prerequisites.map((item, index) => (
                <li key={index} className="text-gray-700 text-lg flex items-start">
                  <span className="text-indigo-600 font-extrabold text-2xl leading-none ml-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Duration Details */}
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner mb-8 flex flex-col sm:flex-row justify-around items-center text-center sm:text-right border border-indigo-200">
            <div className="flex items-center mb-4 sm:mb-0">
              <Clock className="ml-3 text-indigo-700 w-8 h-8" />
              <div>
                <p className="text-gray-600">المدة الإجمالية:</p>
                <p className="text-xl font-bold text-indigo-800">{course.duration}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Tag className="ml-3 text-indigo-700 w-8 h-8" />
              <div>
                <p className="text-gray-600">عدد الجلسات:</p>
                <p className="text-xl font-bold text-indigo-800">{course.sessions}</p>
              </div>
            </div>
          </div>

          {/* Discounts & Offers */}
          {course.offerEndDate && new Date(course.offerEndDate) > new Date() && (
            <div className="bg-red-50 p-6 rounded-2xl shadow-inner mb-8 text-center border border-red-200">
              <h2 className="text-2xl font-bold text-red-700 mb-3 flex items-center justify-center">
                <span className="text-3xl ml-2">🎉</span> عرض خاص!
              </h2>
              <p className="text-red-800 text-xl font-semibold mb-2">خصم 25% للتسجيل المبكر.</p>
              <p className="text-gray-700 text-lg mb-3">
                السعر الأصلي: <span className="line-through">{course.originalPrice} ريال</span>
              </p>
              <p className="text-red-900 text-3xl font-extrabold mb-4">
                السعر الآن: {course.price} ريال فقط!
              </p>
              <p className="text-red-600 text-lg">
                ينتهي العرض بتاريخ: {new Date(course.offerEndDate).toLocaleDateString('ar-EG')}
              </p>
              {timerComponents.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
                  <span className="text-red-700 text-xl">تبقى:</span>
                  {timerComponents}
                </div>
              )}
            </div>
          )}

          {/* Call to Action Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center bg-green-500 text-white py-4 rounded-xl text-2xl font-bold shadow-lg hover:bg-green-600 transition-colors transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 ml-3"
            >
              <path d="M12.0001 2C6.47715 2 2.0001 6.47715 2.0001 12C2.0001 14.159 2.68594 16.2081 3.90098 17.9229L2.0001 22.0001L6.23071 20.0768C7.94057 21.0374 9.92383 21.5001 12.0001 21.5001C17.523 21.5001 22.0001 17.023 22.0001 12C22.0001 6.47715 17.523 2 12.0001 2ZM16.5001 15.5C16.3334 15.6667 16.1667 15.75 15.9167 15.75C15.6667 15.75 15.4167 15.6667 15.2501 15.5L14.0001 14.1667C13.8334 14 13.6667 13.9167 13.4167 13.9167C13.1667 13.9167 12.9167 14 12.7501 14.1667L10.7501 16.1667C10.5834 16.3334 10.3334 16.4167 10.0834 16.4167C9.83344 16.4167 9.58344 16.3334 9.41677 16.1667L8.16677 14.9167C8.0001 14.75 7.91677 14.5 7.91677 14.25C7.91677 14 8.0001 13.75 8.16677 13.5834L9.08344 12.6667C9.2501 12.5 9.33344 12.25 9.33344 12C9.33344 11.75 9.2501 11.5 9.08344 11.3334L8.16677 10.4167C8.0001 10.25 7.91677 10 7.91677 9.75C7.91677 9.5 8.0001 9.25 8.16677 9.08344L9.41677 7.83344C9.58344 7.66677 9.83344 7.58344 10.0834 7.58344C10.3334 7.58344 10.5834 7.66677 10.7501 7.83344L12.7501 9.83344C12.9167 10 13.1667 10.0834 13.4167 10.0834C13.6667 10.0834 13.8334 10 14.0001 9.83344L15.2501 8.58344C15.4167 8.41677 15.6667 8.33344 15.9167 8.33344C16.1667 8.33344 16.3334 8.41677 16.5001 8.58344L17.4167 9.5001C17.5834 9.66677 17.6667 9.91677 17.6667 10.1667C17.6667 10.4167 17.5834 10.6667 17.4167 10.8334L16.5001 11.75C16.3334 11.9167 16.2501 12.1667 16.2501 12.4167C16.2501 12.6667 16.3334 12.9167 16.5001 13.0834L17.4167 14C17.5834 14.1667 17.6667 14.4167 17.6667 14.6667C17.6667 14.9167 17.5834 15.1667 17.4167 15.3334L16.5001 15.5Z" />
            </svg>
            سجل الآن عبر الواتساب
          </a>
        </div>
      </div>
    );
  };

  // Main App rendering logic based on currentScreen state
  return (
    <div className="App text-right">
      <style>{`
        /* Import Google Font - Inter */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          direction: rtl; /* Set overall text direction to right-to-left */
        }
      `}</style>
      {currentScreen === 'home' && (
        <HomeScreen onSelectCategory={(id) => { setSelectedCategoryId(id); setCurrentScreen('courseList'); }} />
      )}
      {currentScreen === 'courseList' && (
        <CourseListScreen
          categoryId={selectedCategoryId}
          onSelectCourse={(id) => { setSelectedCourseId(id); setCurrentScreen('courseDetails'); }}
          onBack={() => setCurrentScreen('home')}
        />
      )}
      {currentScreen === 'courseDetails' && (
        <CourseDetailScreen courseId={selectedCourseId} onBack={() => setCurrentScreen('courseList')} />
      )}
    </div>
  );
}

export default App;
