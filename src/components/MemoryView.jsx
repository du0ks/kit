import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

const MemoryView = ({ content, onNext, isLast }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 z-10 relative overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-lg bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl"
            >
                {content.image && (
                    <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden rounded-lg bg-slate-800 shadow-inner">
                        {/* Polaroid style border effect */}
                        <div className="absolute inset-0 border-8 border-white/5 opacity-20 pointer-events-none z-10"></div>
                        <img
                            src={content.image}
                            alt="Memory"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-invert prose-p:text-slate-300 mx-auto mb-8 text-center font-light leading-relaxed">
                    <p className="text-lg whitespace-pre-wrap">{content.text}</p>
                </div>

                <button
                    onClick={onNext}
                    className="group flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-rose-600 to-rose-500 rounded-xl text-white font-medium shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                    {isLast ? (
                        <><span>Forever & Always</span> <Heart className="w-4 h-4 fill-white" /></>
                    ) : (
                        <><span>Next Memory</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                </button>
            </motion.div>
        </div>
    );
};

export default MemoryView;
