import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Home, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>

            <span className="font-bold text-xl text-primary">
              AI Career<span className="text-secondary">Nav</span>
            </span>
          </Link>
        </motion.div>

        {/* Error Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass-card p-8 sm:p-12 text-center"
        >
          {/* 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.15,
              duration: 0.6,
              type: 'spring',
            }}
            className="relative inline-block mb-5"
          >
            <span className="text-[100px] sm:text-[140px] leading-none font-extrabold gradient-text">
              404
            </span>

            <Sparkles className="absolute -top-2 -right-5 w-7 h-7 text-secondary animate-pulse" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
            Page Not Found
          </h1>

          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
            Looks like this career path doesn't exist. The page you're
            looking for may have been moved, removed, or never existed.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl border border-border text-primary font-medium hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>

            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Home className="w-4 h-4" />
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Bottom message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          Let's get you back on your career journey.
        </motion.p>
      </div>
    </main>
  );
};

export default NotFound;