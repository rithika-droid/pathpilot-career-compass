
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';

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
  const { user } = useAuth();
  const { toast } = useToast();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

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

      if (data) {
        // Parse the JSON questions properly
        const parsedQuestions = Array.isArray(data.questions) 
          ? data.questions as Question[]
          : JSON.parse(data.questions as string) as Question[];
        
        const quizData: Quiz = {
          ...data,
          questions: parsedQuestions
        };
        
        setQuiz(quizData);
        setAnswers(new Array(parsedQuestions.length).fill(-1));
      }
    } catch (error) {
      console.error('Error loading quiz:', error);
      toast({
        title: "Error",
        description: "Failed to load quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null || !quiz) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(newAnswers[currentQuestion + 1] === -1 ? null : newAnswers[currentQuestion + 1]);
    } else {
      calculateResults(newAnswers);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] === -1 ? null : answers[currentQuestion - 1]);
    }
  };

  const calculateResults = async (finalAnswers: number[]) => {
    if (!quiz || !user) return;

    let correctAnswers = 0;
    finalAnswers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correct) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);

    // Save quiz attempt
    try {
      await supabase.from('quiz_attempts').insert({
        user_id: user.id,
        quiz_id: quiz.id,
        score: finalScore,
        answers: finalAnswers
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
      console.error('Error saving quiz attempt:', error);
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

  if (!quiz) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">No quiz available for this level.</div>
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
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold">{score}%</div>
            <div className={`text-lg ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? 'Congratulations! You passed!' : `You need ${quiz.passing_score}% to pass. Try again!`}
            </div>
            <div className="text-sm text-muted-foreground">
              You got {Math.round((score / 100) * quiz.questions.length)} out of {quiz.questions.length} questions correct.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Level {level} Quiz</CardTitle>
        <CardDescription>
          Question {currentQuestion + 1} of {quiz.questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{currentQ.question}</h3>
          
          <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
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
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizComponent;
