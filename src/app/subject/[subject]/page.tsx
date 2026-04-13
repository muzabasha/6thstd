import { notFound } from "next/navigation";
import curriculumData from "@/data/curriculum.json";
import { slugify } from "@/lib/utils";
import SubjectClient from "@/components/SubjectClient";

type SubjectData = {
  name: string;
  icon: string;
  chapters: { title: string; topics: { id: string; title: string; description: string }[] }[];
};

export async function generateStaticParams() {
  const subjects = curriculumData.subjects as SubjectData[];
  return subjects.map((s) => ({
    subject: slugify(s.name),
  }));
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectSlug } = await params;
  const subjects = curriculumData.subjects as SubjectData[];
  const subject = subjects.find((s) => slugify(s.name) === subjectSlug);
  
  if (!subject) notFound();

  return <SubjectClient subject={subject} subjectSlug={subjectSlug} />;
}
