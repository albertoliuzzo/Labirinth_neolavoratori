import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import TestQuestion from '@/components/TestQuestion';
import { testQuestions } from '@/lib/testQuestions';

const OrientationTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    // Calcola il numero totale di domande
    const total = testQuestions.reduce((acc, section) => acc + section.questions.length, 0);
    setTotalQuestions(total);
  }, []);

  const getCurrentQuestion = () => {
    let questionIndex = currentQuestion;
    for (const section of testQuestions) {
      if (questionIndex < section.questions.length) {
        return {
          question: section.questions[questionIndex],
          section: section.title
        };
      }
      questionIndex -= section.questions.length;
    }
    return null;
  };

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Salva le risposte e vai alla pagina dei risultati
      localStorage.setItem('test_answers', JSON.stringify(answers));
      navigate('/risultati-test');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentQuestionData = getCurrentQuestion();
  if (!currentQuestionData) return null;

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Domanda {currentQuestion + 1} di {totalQuestions}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <span className="text-base font-medium text-purple-600 block mb-4">
              {currentQuestionData.section}
            </span>
            <TestQuestion
              question={currentQuestionData.question}
              onAnswer={handleAnswer}
              currentAnswer={answers[currentQuestion]}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Indietro
            </Button>
            <Button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700"
              disabled={answers[currentQuestion] === undefined}
            >
              {currentQuestion === totalQuestions - 1 ? 'Invia Risposte' : 'Avanti'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationTest; 