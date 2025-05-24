
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink, Trophy } from 'lucide-react';
import { courseProgressService } from '@/services/courseProgress';
import { useNavigate } from 'react-router-dom';

const CompletedCoursesSection = () => {
  const [completedCourses, setCompletedCourses] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCompletedCourses = () => {
      setCompletedCourses(courseProgressService.getCompletedCourses());
    };

    updateCompletedCourses();
    window.addEventListener('courseProgressUpdated', updateCompletedCourses);
    
    return () => {
      window.removeEventListener('courseProgressUpdated', updateCompletedCourses);
    };
  }, []);

  if (completedCourses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Completed Courses
          </CardTitle>
          <CardDescription>
            Courses you've completed will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No completed courses yet</p>
            <Button onClick={() => navigate('/courses')}>
              Start Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Completed Courses
            </CardTitle>
            <CardDescription>
              {completedCourses.length} course{completedCourses.length !== 1 ? 's' : ''} completed
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/courses')}>
            View All
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {completedCourses.slice(0, 5).map((course, index) => (
            <div key={course.courseId} className="flex items-center justify-between p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm line-clamp-1">{course.courseName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                      Level {course.level}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(course.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {completedCourses.length > 5 && (
            <div className="text-center pt-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/courses')}>
                View {completedCourses.length - 5} more courses
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletedCoursesSection;
