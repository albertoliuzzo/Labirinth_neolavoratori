import React from 'react';
import { Button } from '@/components/ui/button';

const TestQuestion = ({ question, onAnswer, currentAnswer }) => {
  const options = [
    { value: 1, label: 'Per niente d\'accordo' },
    { value: 2, label: 'Poco d\'accordo' },
    { value: 3, label: 'Abbastanza d\'accordo' },
    { value: 4, label: 'Molto d\'accordo' },
    { value: 5, label: 'Assolutamente d\'accordo' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">
        {question}
      </h3>
      
      <div className="grid gap-3">
        {options.map((option) => (
          <Button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            variant={currentAnswer === option.value ? "default" : "outline"}
            className={`w-full justify-start text-left ${
              currentAnswer === option.value 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'hover:bg-purple-50'
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TestQuestion; 