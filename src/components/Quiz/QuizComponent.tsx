
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface QuizComponentProps {
  careerPath: string;
  level: number;
  onComplete: (score: number, passed: boolean) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ careerPath, level, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>(''); // Track current question answer
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock questions if Supabase fails
  const mockQuestions: Question[] = [
    {
      question: "What is the primary purpose of HTML?",
      options: ["Styling web pages", "Adding interactivity", "Structuring web content", "Database management"],
      correct: 2
    },
    {
      question: "Which CSS property is used to change text color?",
      options: ["background-color", "color", "text-style", "font-color"],
      correct: 1
    },
    {
      question: "What does JavaScript primarily add to web pages?",
      options: ["Structure", "Styling", "Interactivity", "Images"],
      correct: 2
    },
    {
      question: "Which HTML tag is used for creating links?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correct: 1
    },
    {
      question: "What is the correct way to include CSS in HTML?",
      options: ["<css>", "<style>", "<stylesheet>", "<design>"],
      correct: 1
    }
  ];

  useEffect(() => {
    fetchQuiz();
  }, [careerPath, level]);

  // Reset current answer when question changes
  useEffect(() => {
    setCurrentAnswer('');
  }, [currentQuestion]);

  const fetchQuiz = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('career_path', careerPath)
        .eq('level', level)
        .single();

      if (error) throw error;

      if (data && data.questions) {
        const parsedQuestions = data.questions as unknown;
        if (Array.isArray(parsedQuestions)) {
          setQuestions(parsedQuestions as Question[]);
        } else {
          setQuestions(mockQuestions);
        }
      } else {
        setQuestions(mockQuestions);
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      // Use mock questions as fallback
      setQuestions(mockQuestions);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: string) => {
    setCurrentAnswer(answerIndex);
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = parseInt(answerIndex);
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Restore the selected answer for the previous question
      const previousAnswer = selectedAnswers[currentQuestion - 1];
      setCurrentAnswer(previousAnswer !== undefined ? previousAnswer.toString() : '');
    }
  };

  const calculateResults = async () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);

    const passed = finalScore >= 70;

    // Save quiz attempt to localStorage as fallback
    const quizAttempts = JSON.parse(localStorage.getItem('pathpilot_quiz_attempts') || '[]');
    const attemptData = {
      careerPath,
      level,
      score: finalScore,
      answers: selectedAnswers,
      completedAt: new Date().toISOString(),
      passed
    };
    quizAttempts.push(attemptData);
    localStorage.setItem('pathpilot_quiz_attempts', JSON.stringify(quizAttempts));

    // Try to save to Supabase if available
    if (user) {
      try {
        const { data: quizData } = await supabase
          .from('quizzes')
          .select('id')
          .eq('career_path', careerPath)
          .eq('level', level)
          .single();

        if (quizData) {
          await supabase.from('quiz_attempts').insert({
            user_id: user.id,
            quiz_id: quizData.id,
            score: finalScore,
            answers: selectedAnswers,
          });
        }
      } catch (error) {
        console.error('Error saving quiz attempt:', error);
      }
    }

    onComplete(finalScore, passed);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading quiz...</div>
        </CardContent>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">No quiz available for this level.</div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const passed = score >= 70;
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {passed ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold">{score}%</div>
            <div className={`text-lg ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? 'Congratulations! You passed!' : 'Keep studying and try again!'}
            </div>
            <div className="text-sm text-muted-foreground">
              You need 70% to pass this level.
            </div>
            <div className="text-sm text-muted-foreground">
              You got {questions.filter((q, i) => selectedAnswers[i] === q.correct).length} out of {questions.length} questions correct.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Level {level} Quiz</CardTitle>
        <CardDescription>
          Question {currentQuestion + 1} of {questions.length}
        </CardDescription>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
          
          <RadioGroup
            value={currentAnswer}
            onValueChange={handleAnswerSelect}
          >
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentAnswer === ''}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizComponent;
