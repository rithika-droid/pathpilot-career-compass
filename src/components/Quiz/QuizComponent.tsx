
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { quizQuestionsByLevel, QuizQuestion } from '../../data/quizQuestions';

interface QuizComponentProps {
  careerPath: string;
  level: number;
  onComplete: (score: number, passed: boolean) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ careerPath, level, onComplete }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchQuiz();
  }, [careerPath, level]);

  // Reset current answer when question changes
  useEffect(() => {
    setCurrentAnswer('');
    setShowExplanation(false);
  }, [currentQuestion]);

  const fetchQuiz = async () => {
    try {
      // Try to get questions from Supabase first
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
          setQuestions(parsedQuestions as QuizQuestion[]);
        } else {
          // Fall back to local questions
          setQuestions(quizQuestionsByLevel[level] || quizQuestionsByLevel[1]);
        }
      } else {
        // Fall back to local questions
        setQuestions(quizQuestionsByLevel[level] || quizQuestionsByLevel[1]);
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      // Use local questions as fallback
      setQuestions(quizQuestionsByLevel[level] || quizQuestionsByLevel[1]);
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

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
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

    // Save quiz attempt to localStorage for persistence
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
    
    if (passed) {
      toast({
        title: "🎉 Quiz Passed!",
        description: `Great job! You scored ${finalScore}% on the Level ${level} quiz.`,
      });
    } else {
      toast({
        title: "Quiz Results",
        description: `You scored ${finalScore}%. You need 70% to pass this level.`,
      });
    }
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
            
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Question Summary:</h3>
              <div className="space-y-3">
                {questions.map((question, index) => {
                  const isCorrect = selectedAnswers[index] === question.correct;
                  return (
                    <div 
                      key={index} 
                      className={`p-3 rounded-md ${
                        isCorrect ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium text-sm">{question.question}</p>
                          <p className="text-sm mt-1">
                            <span className="font-medium">Your answer:</span> {question.options[selectedAnswers[index]]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-700 dark:text-green-300">
                              <span className="font-medium">Correct answer:</span> {question.options[question.correct]}
                            </p>
                          )}
                          {question.explanation && (
                            <p className="text-xs text-muted-foreground mt-1 italic">{question.explanation}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <Button onClick={() => {
              setShowResults(false);
              setCurrentQuestion(0);
              setSelectedAnswers([]);
              setCurrentAnswer('');
            }} className="mt-4">
              Retry Quiz
            </Button>
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
              <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {showExplanation && currentQ.explanation && (
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md">
            <div className="flex gap-2">
              <Lightbulb className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700 dark:text-blue-300">{currentQ.explanation}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            {currentQ.explanation && (
              <Button 
                variant="outline"
                onClick={toggleExplanation}
                className="text-blue-500 border-blue-200 hover:bg-blue-50"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {showExplanation ? "Hide Hint" : "Show Hint"}
              </Button>
            )}
          </div>
          
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
