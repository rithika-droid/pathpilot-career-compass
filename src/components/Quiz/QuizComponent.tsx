
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface Quiz {
  id: string;
  level: number;
  career_path: string;
  questions: Question[];
  passing_score: number;
}

interface QuizComponentProps {
  level: number;
  careerPath: string;
  onComplete: (passed: boolean, score: number) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ level, careerPath, onComplete }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadQuiz();
  }, [level, careerPath]);

  const loadQuiz = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('level', level)
        .eq('career_path', careerPath)
        .single();

      if (error) throw error;
      
      setQuiz(data);
      setSelectedAnswers(new Array(data.questions.length).fill(-1));
    } catch (error) {
      console.error('Error loading quiz:', error);
      toast({
        title: "Error",
        description: "Failed to load quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = async () => {
    if (!quiz || !user) return;

    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return answer === quiz.questions[index].correct ? count + 1 : count;
    }, 0);

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);

    try {
      await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          quiz_id: quiz.id,
          score: finalScore,
          answers: selectedAnswers
        });

      const passed = finalScore >= quiz.passing_score;
      onComplete(passed, finalScore);

      if (passed) {
        toast({
          title: "Congratulations!",
          description: `You passed with ${finalScore}%!`,
        });
      } else {
        toast({
          title: "Try Again",
          description: `You scored ${finalScore}%. You need ${quiz.passing_score}% to pass.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>Loading quiz...</p>
        </CardContent>
      </Card>
    );
  }

  if (!quiz) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>No quiz available for this level.</p>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const passed = score >= quiz.passing_score;
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
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{score}%</div>
            <p className="text-muted-foreground">
              You need {quiz.passing_score}% to pass
            </p>
          </div>
          <Progress value={score} className="w-full" />
          <div className="text-center">
            {passed ? (
              <p className="text-green-600 font-medium">
                Congratulations! You passed the quiz.
              </p>
            ) : (
              <p className="text-red-600 font-medium">
                You need to score higher to pass. Try again!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Level {level} Assessment</CardTitle>
        <CardDescription>
          Question {currentQuestion + 1} of {quiz.questions.length}
        </CardDescription>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
          <RadioGroup
            value={selectedAnswers[currentQuestion]?.toString()}
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          >
            {question.options.map((option, index) => (
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
            disabled={selectedAnswers[currentQuestion] === -1}
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizComponent;
