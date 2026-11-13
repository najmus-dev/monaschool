import type { MetadataRoute } from "next";
import { courses } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/florida-real-estate",
    "/professional-development",
    "/international-business",
    "/privacy",
    "/terms",
    "/reviews",
    "/license",
    "/courses",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const courseRoutes = courses
    .filter((course) => course.published)
    .map((course) => ({
      url: `${base}/courses/${course.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...courseRoutes];
}
