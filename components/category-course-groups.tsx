import type { Course } from "@/content/site";
import { CourseCard } from "@/components/course-card";

export type CourseGroup = {
  id: string;
  title: string;
  courses: Course[];
};

export function CategoryCourseGroups({ groups }: { groups: CourseGroup[] }) {
  return (
    <div className="space-y-14">
      {groups.map((group) => (
        <div key={group.id} id={group.id} className="scroll-mt-28">
          <div className="mb-5">
            <h3 className="font-sans text-[1.25rem] font-bold tracking-[-0.015em] text-[#001830] sm:text-[1.35rem]">
              {group.title}
            </h3>
          </div>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {group.courses.map((course) => (
              <li key={`${group.id}-${course.slug}`}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
