'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { useGameSounds } from '@/hooks/useGameSounds';

export function QuizModal() {
  const {
    showQuiz,
    currentQuestion,
    setShowQuiz,
    setQuizAnswer,
    updateScore,
    completeStage,
    currentStage,
    setGameOver,
    score,
    sessionCoins
  } = useGameStore();
  
  const { playSound } = useGameSounds();
  
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (showQuiz && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [showQuiz, currentQuestion]);

  useEffect(() => {
    if (!showQuiz || !currentQuestion) return;

    let timerId: NodeJS.Timeout;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSelectedAnswer((currentAnswer) => {
            if (currentAnswer === null) {
              setShowResult(true);
              setIsCorrect(false);
              playSound('answerWrong');
              setTimeout(() => {
                setGameOver('question', score, sessionCoins);
                setShowQuiz(false);
              }, 2000);
            } else {
              handleSubmit(currentAnswer);
            }
            return currentAnswer;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timerId = timer;

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [showQuiz, currentQuestion, score, sessionCoins]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    playSound('button');
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = (answerToSubmit?: number | null) => {
    const answer = answerToSubmit !== undefined ? answerToSubmit : selectedAnswer;
    
    if (!currentQuestion) {
      setGameOver('question', score, sessionCoins);
      setShowQuiz(false);
      return;
    }
    if (answer === null) return;

    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playSound('answerCorrect');
      updateScore(currentQuestion.points);
      setQuizAnswer(currentQuestion.id, answer);
    } else {
      playSound('answerWrong');
    }

    setTimeout(() => {
      if (correct) {
        setGameOver('completed', score + currentQuestion.points, sessionCoins);
      } else {
        setGameOver('question', score, sessionCoins);
      }
      setShowQuiz(false);
    }, 2000);
  };

  if (!showQuiz || !currentQuestion) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-3 sm:p-4 md:p-6"
      onClick={() => {
        if (!showResult) {
          playSound('button');
          setShowQuiz(false);
        }
      }}
    >
      <div 
        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md lg:max-w-2xl w-full border-2 sm:border-3 lg:border-4 border-black shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
            🧠 Quiz Time
          </h2>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-red-100 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg border-2 border-red-500 flex-shrink-0">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            <span className="text-base sm:text-lg lg:text-xl font-bold text-red-600 tabular-nums">
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="mb-5 sm:mb-6 lg:mb-8">
          <div className="mb-4 sm:mb-5 lg:mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 lg:p-5 rounded-lg border-2 border-blue-300">
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-black leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>
          
          {/* Answer Options */}
          <div className="space-y-2 sm:space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-3 sm:p-4 text-left rounded-lg sm:rounded-xl border-2 transition-all ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-100 text-blue-900 shadow-md scale-[1.02]'
                    : 'border-gray-400 hover:border-gray-600 bg-gray-50 text-black hover:bg-gray-100 hover:shadow-sm'
                } ${
                  showResult
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-100 text-green-900 shadow-md'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-100 text-red-900'
                      : 'border-gray-300 bg-gray-100 text-gray-600 opacity-60'
                    : ''
                } ${showResult ? 'cursor-default' : 'cursor-pointer active:scale-[0.98]'}`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Radio Button */}
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400'
                  } ${
                    showResult && index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-500'
                      : ''
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full" />
                    )}
                  </div>
                  
                  {/* Option Text */}
                  <span className="text-sm sm:text-base lg:text-lg font-medium text-black flex-1 leading-relaxed">
                    {option}
                  </span>
                  
                  {/* Result Icons */}
                  {showResult && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result Message */}
        {showResult && (
          <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl mb-4 sm:mb-5 ${
            isCorrect 
              ? 'bg-green-50 border-2 border-green-200' 
              : 'bg-red-50 border-2 border-red-200'
          }`}>
            <div className="flex items-center gap-2 sm:gap-3">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" />
              )}
              <span className={`font-semibold text-sm sm:text-base ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}>
                {isCorrect ? '✨ Correct! Well done!' : '💭 Incorrect. Better luck next time!'}
              </span>
            </div>
            {isCorrect && (
              <p className="text-green-700 mt-2 text-xs sm:text-sm ml-7 sm:ml-9">
                You earned <span className="font-bold">{currentQuestion.points} points</span>!
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        {!showResult && (
          <div className="flex justify-end pt-2">
            <button
              onClick={() => { 
                playSound('button'); 
                handleSubmit(); 
              }}
              disabled={selectedAnswer === null}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8 lg:py-3 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl active:scale-95 disabled:hover:scale-100 disabled:shadow-none"
            >
              Submit Answer
            </button>
          </div>
        )}

        {/* Help Text */}
        {!showResult && (
          <p className="text-xs sm:text-sm text-gray-500 text-center mt-3 sm:mt-4">
            Select an answer and click Submit, or wait for the timer to auto-submit
          </p>
        )}
      </div>
    </div>
  );
}
