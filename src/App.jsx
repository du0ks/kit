import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RiddleView from './components/RiddleView';
import MemoryView from './components/MemoryView';
import { decryptContent } from './utils/crypto';

function App() {
  const [levels, setLevels] = useState([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameState, setGameState] = useState('LOADING'); // LOADING, RIDDLE, MEMORY, ERROR
  const [currentContent, setCurrentContent] = useState(null);
  const [errorShake, setErrorShake] = useState(false);

  useEffect(() => {
    // Load manifest
    fetch('manifest.json')
      .then(res => res.json())
      .then(data => {
        setLevels(data);
        if (data.length > 0) setGameState('RIDDLE');
      })
      .catch(err => console.error("Failed to load levels", err));
  }, []);

  const handleUnlock = async (answer) => {
    const currentLevel = levels[currentLevelIndex];
    if (!currentLevel) return;

    try {
      // Fetch the encrypted file
      const response = await fetch(currentLevel.file);
      const encryptedData = await response.text();

      const decrypted = decryptContent(encryptedData, answer);

      if (decrypted) {
        setCurrentContent(decrypted);
        setGameState('MEMORY');
        // Preload next level data? Maybe not needed for small sizes
      } else {
        triggerError();
      }
    } catch (e) {
      console.error(e);
      triggerError();
    }
  };

  const triggerError = () => {
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 820);
  };

  const handleNext = () => {
    const nextIndex = currentLevelIndex + 1;
    if (nextIndex < levels.length) {
      setCurrentLevelIndex(nextIndex);
      setCurrentContent(null);
      setGameState('RIDDLE');
    } else {
      // Prepare for "End of Loop" or stay on final page
      // For now, let's keep it at the final memory or show a "The End" screen
      // But the design requested "Final page". The last memory IS the final page.
    }
  };

  // Background Particles/Orbs
  const Background = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-0 bg-slate-950">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-900/20 rounded-full blur-[100px]" />
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-amber-900/10 rounded-full blur-[100px]" />

      {/* Stars/Dust */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );

  if (gameState === 'LOADING') {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-rose-500">Loading...</div>;
  }

  const currentLevel = levels[currentLevelIndex];

  return (
    <>
      <Background />
      <AnimatePresence mode="wait">
        {gameState === 'RIDDLE' && (
          <motion.div
            key="riddle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RiddleView
              riddle={currentLevel.riddle}
              hint={currentLevel.hint}
              onUnlock={handleUnlock}
              isError={errorShake}
            />
          </motion.div>
        )}

        {gameState === 'MEMORY' && currentContent && (
          <motion.div
            key="memory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MemoryView
              content={currentContent}
              onNext={handleNext}
              isLast={currentLevelIndex === levels.length - 1}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
