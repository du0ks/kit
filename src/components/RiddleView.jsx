import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Key } from 'lucide-react';

const RiddleView = ({ riddle, onUnlock, isError, hint }) => {
    const [answer, setAnswer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onUnlock(answer);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-md"
            >
                <div className="mb-8 flex justify-center">
                    <div className="p-4 bg-slate-800/50 rounded-full border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                        <Lock className="w-10 h-10 text-rose-500" />
                    </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-light text-slate-200 mb-2 font-serif tracking-wide">
                    Unlock the Memory
                </h2>

                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto mb-8 opacity-50" />

                <p className="text-lg text-slate-300 mb-8 italic leading-relaxed">
                    "{riddle}"
                </p>

                <form onSubmit={handleSubmit} className="relative w-full max-w-xs mx-auto">
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type your answer..."
                        className={`w-full px-6 py-4 bg-slate-800/80 border-2 rounded-xl text-center text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10 transition-all duration-300 ${isError ? 'animate-shake border-red-500/50 text-red-200' : 'border-slate-700'
                            }`}
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-rose-500 transition-colors"
                    >
                        <Key className="w-5 h-5" />
                    </button>
                </form>

                <AnimatePresence>
                    {isError && hint && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 text-sm text-rose-400/80"
                        >
                            💡 Hint: {hint}
                        </motion.p>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
};

export default RiddleView;
