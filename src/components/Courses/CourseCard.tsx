
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock, CheckCircle, Award } from 'lucide-react';
import { courseProgressService } from '@/services/courseProgress';
import { toast } from '@/hooks/use-toast';

interface CourseCardProps {
  course: {
    name: string;
    link: string;
  };
  levelNumber: number;
  levelTitle: string;
  isCompleted: boolean;
  isCurrentLevel: boolean;
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  levelNumber,
  levelTitle,
  isCompleted,
  isCurrentLevel,
  index
}) => {
  const courseId = `${levelNumber}-${index}`;
  const [isMarkedComplete, setIsMarkedComplete] = useState(false);

  useEffect(() => {
    setIsMarkedComplete(courseProgressService.isCourseCompleted(courseId));
  }, [courseId]);

  useEffect(() => {
    const handleProgressUpdate = (event: CustomEvent) => {
      const { courseId: updatedCourseId, completed } = event.detail;
      if (updatedCourseId === courseId) {
        setIsMarkedComplete(completed);
      }
    };

    window.addEventListener('courseProgressUpdated', handleProgressUpdate as EventListener);
    return () => {
      window.removeEventListener('courseProgressUpdated', handleProgressUpdate as EventListener);
    };
  }, [courseId]);

  const handleMarkComplete = () => {
    if (isMarkedComplete) {
      courseProgressService.markCourseIncomplete(courseId);
      toast({
        title: "Course unmarked",
        description: `${course.name} has been unmarked as complete.`,
      });
    } else {
      courseProgressService.markCourseCompleted(courseId, course.name, levelNumber);
      toast({
        title: "Course completed!",
        description: `${course.name} has been marked as complete.`,
      });
    }
  };

  const handleStartCourse = () => {
    window.open(course.link, '_blank');
  };

  return (
    <Card className={`overflow-hidden ${
      isCompleted ? 'border-green-500/40' : 
      isCurrentLevel ? 'border-primary/40' : 
      isMarkedComplete ? 'border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className={
              isCompleted ? 'bg-green-500/10 text-green-500' : 
              isCurrentLevel ? 'bg-primary/10 text-primary' : 
              'bg-secondary/50'
            }>
              Level {levelNumber}
            </Badge>
            <CardTitle className="mt-2 text-lg line-clamp-2">{course.name}</CardTitle>
          </div>
          {(isCompleted || isMarkedComplete) && (
            <div className="flex items-center gap-1">
              {isMarkedComplete && <Award className="h-4 w-4 text-emerald-500" />}
              <CheckCircle className={`h-5 w-5 shrink-0 ${
                isCompleted ? 'text-green-500' : 'text-emerald-500'
              }`} />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>Est. 4-6 hours</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {levelTitle}
        </p>

        {isMarkedComplete && (
          <div className="mt-2">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
              <Award className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex gap-2">
        <Button 
          variant={isCompleted || isMarkedComplete ? "outline" : "default"} 
          className="flex-1"
          onClick={handleStartCourse}
        >
          {isCompleted || isMarkedComplete ? 'Review Course' : 'Start Course'}
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
        
        <Button
          variant={isMarkedComplete ? "default" : "outline"}
          size="sm"
          onClick={handleMarkComplete}
          className={isMarkedComplete ? "bg-emerald-600 hover:bg-emerald-700" : ""}
        >
          {isMarkedComplete ? 'Completed' : 'Mark Complete'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
