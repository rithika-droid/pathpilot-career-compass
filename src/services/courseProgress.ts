
interface CourseProgress {
  courseId: string;
  courseName: string;
  completed: boolean;
  completedAt: string;
  level: number;
}

class CourseProgressService {
  private storageKey = 'pathpilot_course_progress';

  // Get all completed courses
  getCompletedCourses(): CourseProgress[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading course progress:', error);
      return [];
    }
  }

  // Check if a specific course is completed
  isCourseCompleted(courseId: string): boolean {
    const progress = this.getCompletedCourses();
    return progress.some(p => p.courseId === courseId && p.completed);
  }

  // Mark a course as completed
  markCourseCompleted(courseId: string, courseName: string, level: number): void {
    try {
      const progress = this.getCompletedCourses();
      const existingIndex = progress.findIndex(p => p.courseId === courseId);
      
      const courseProgress: CourseProgress = {
        courseId,
        courseName,
        completed: true,
        completedAt: new Date().toISOString(),
        level
      };

      if (existingIndex >= 0) {
        progress[existingIndex] = courseProgress;
      } else {
        progress.push(courseProgress);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(progress));
      
      // Dispatch custom event for UI updates
      window.dispatchEvent(new CustomEvent('courseProgressUpdated', { detail: courseProgress }));
    } catch (error) {
      console.error('Error saving course progress:', error);
    }
  }

  // Mark a course as incomplete
  markCourseIncomplete(courseId: string): void {
    try {
      const progress = this.getCompletedCourses();
      const updatedProgress = progress.filter(p => p.courseId !== courseId);
      localStorage.setItem(this.storageKey, JSON.stringify(updatedProgress));
      
      // Dispatch custom event for UI updates
      window.dispatchEvent(new CustomEvent('courseProgressUpdated', { detail: { courseId, completed: false } }));
    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  }

  // Get completion stats
  getCompletionStats(totalCourses: number): { completed: number; percentage: number } {
    const completed = this.getCompletedCourses().length;
    return {
      completed,
      percentage: totalCourses > 0 ? Math.round((completed / totalCourses) * 100) : 0
    };
  }

  // Get completed courses by level
  getCompletedCoursesByLevel(level: number): CourseProgress[] {
    return this.getCompletedCourses().filter(p => p.level === level);
  }
}

export const courseProgressService = new CourseProgressService();
