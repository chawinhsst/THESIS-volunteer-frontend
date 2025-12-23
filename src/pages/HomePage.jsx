import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { 
  ChartBarIcon, 
  CpuChipIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  BeakerIcon,
  CodeBracketIcon,
  CheckBadgeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// --- Sub-Components ---

const HeroBadge = ({ text }) => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }} 
    animate={{ opacity: 1, y: 0 }} 
    className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-800 mb-6"
  >
    <CheckBadgeIcon className="mr-1.5 h-4 w-4 text-sky-600" />
    {text}
  </motion.div>
);

const StatCard = ({ label, value, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
  >
    <div className="p-3 bg-indigo-50 rounded-full mb-3">
      <Icon className="h-6 w-6 text-indigo-600" />
    </div>
    <dt className="text-3xl font-bold text-slate-900">{value}</dt>
    <dd className="text-sm font-medium text-slate-500 uppercase tracking-wide mt-1">{label}</dd>
  </motion.div>
);

const PerformanceBar = ({ name, score, peak, status, delay }) => {
  const widthPercentage = Math.min((score / 3) * 100, 100); 
  
  let statusColor = "bg-slate-100 text-slate-600";
  if (status === "Winner" || status === "ชนะเลิศ") statusColor = "bg-green-100 text-green-700 ring-1 ring-green-600/20";
  if (status === "Failed" || status === "ล้มเหลว") statusColor = "bg-red-50 text-red-600 ring-1 ring-red-600/20";

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="mb-6 last:mb-0"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-slate-700">{name}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor}`}>{status}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 mb-1 overflow-hidden">
        <motion.div 
          className="bg-indigo-600 h-3 rounded-full" 
          initial={{ width: 0 }}
          whileInView={{ width: `${widthPercentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2 }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>Avg F0.5: {score}%</span>
        <span>Peak: {peak}%</span>
      </div>
    </motion.div>
  );
};

const InsightCard = ({ title, content, color, delay }) => {
  const colorMap = {
    blue: "border-l-sky-500 bg-sky-50/50",
    red: "border-l-rose-500 bg-rose-50/50",
    amber: "border-l-amber-500 bg-amber-50/50"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`p-6 rounded-r-xl border-l-4 ${colorMap[color]} shadow-sm hover:shadow-md transition-all`}
    >
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
    </motion.div>
  );
};

// --- Main Component ---

export default function HomePage() {
  const { t } = useTranslation();

  const stats = t('homePage.stats', { returnObjects: true });
  const performance = t('homePage.performanceSection', { returnObjects: true });
  const insights = t('homePage.insightsSection.cards', { returnObjects: true });
  const techStack = t('homePage.techStack.stack', { returnObjects: true });

  return (
    <div className="overflow-hidden bg-slate-50/50">
      
      {/* 1. Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 pb-20 bg-white">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-4xl text-center pt-10 sm:pt-16">
          <HeroBadge text={t('homePage.hero.badge')} />
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6"
          >
            {t('homePage.hero.title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto"
          >
            {t('homePage.hero.subtitle')}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <a href="#performance" className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 hover:scale-105 transition-all duration-300">
              {t('homePage.hero.ctaPrimary')}
            </a>
            <Link to="/about-the-study" className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1 hover:text-indigo-600 transition-colors">
              {t('homePage.hero.ctaSecondary')} <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 2. Key Statistics Grid */}
      <div className="container mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={BeakerIcon} value="7" label={stats.models} delay={0.5} />
          <StatCard icon={UserGroupIcon} value="5" label={stats.volunteers} delay={0.6} />
          <StatCard icon={ChartBarIcon} value="8.26%" label={stats.accuracy} delay={0.7} />
          <StatCard icon={ShieldCheckIcon} value="17" label={stats.duration} delay={0.8} />
        </div>
      </div>

      {/* 3. Performance & Insights Section */}
      <div id="performance" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Col: Performance Chart */}
            <div>
              <div className="mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                  {performance.title}
                </h2>
                <p className="text-lg text-slate-600">
                  {performance.description}
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg ring-1 ring-slate-900/5">
                <h3 className="font-semibold text-slate-900 mb-6 border-b pb-2">{performance.subtitle}</h3>
                {performance.metrics.map((item, idx) => (
                  <PerformanceBar key={item.name} {...item} delay={idx * 0.1} />
                ))}
                <p className="text-xs text-slate-400 mt-6 italic">{performance.note}</p>
              </div>
            </div>

            {/* Right Col: Qualitative Insights */}
            <div className="space-y-8 lg:pt-20">
              <div className="pl-4 border-l-4 border-indigo-600">
                <h3 className="text-2xl font-bold text-slate-900">{t('homePage.insightsSection.title')}</h3>
              </div>
              <div className="grid gap-6">
                {insights.map((card, idx) => (
                  <InsightCard key={idx} {...card} delay={0.2 + (idx * 0.1)} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. Tech Stack Section */}
      <div className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <CodeBracketIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold tracking-tight mb-2">{t('homePage.techStack.title')}</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">{t('homePage.techStack.description')}</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, idx) => (
              <span key={idx} className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm font-mono text-indigo-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Researcher & Footer Info */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <div className="relative inline-block mb-6">
            
            {/* UPDATED: Changed to object-center and removed translate to center the face */}
            <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg mx-auto overflow-hidden bg-slate-50 relative">
                <img 
                  className="w-full h-full object-cover object-center transform scale-125" 
                  src="https://chawin.hansasuta.com/assets/Chawin_image-og7OhW3Z.svg"
                  alt="Chawin"
                  onError={(e) => {e.target.onerror = null; e.target.src="https://ui-avatars.com/api/?name=Chawin+H&background=random"}}
                />
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-1 right-2 h-6 w-6 bg-green-500 border-4 border-white rounded-full z-10"></div>
          
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-4">{t('homePage.researcher.name')}</h2>
          <p className="text-indigo-600 font-medium mb-4">{t('homePage.researcher.role')}</p>
          
          <div className="text-slate-600 leading-relaxed mb-8">
            <Trans i18nKey="homePage.researcher.bio" components={{ 1: <span className="font-semibold text-slate-900" /> }} />
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500 border-t pt-8">
            <ShieldCheckIcon className="h-5 w-5 text-green-600" />
            <span>{t('homePage.trust.text')}</span>
          </div>
        </div>
      </div>

    </div>
  );
}