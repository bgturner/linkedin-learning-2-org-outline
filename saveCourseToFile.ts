import { folderPathFromUrl } from "./folderPathFromUrl.ts";
import { getOrgMarkupFromCourseSchema } from './getOrgMarkupFromCourseSchema.ts';

// TODO: add arg for the base path to save the files
export async function saveCourseToFile(courseSchemas: any) {
  const resolvedSchemas = await courseSchemas;
  resolvedSchemas.forEach(async (courseSchema: any) => {
    const folderPath = folderPathFromUrl(courseSchema.url);
    await Deno.mkdir(folderPath, { recursive: true });
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(courseSchema, null, 2));
    await Deno.writeFile(`${folderPath}/courseSchema.json`, data);

    const orgMarkup = getOrgMarkupFromCourseSchema(courseSchema);
    const courseName = courseSchema.name.toLowerCase().replace(/\s/g, '-');
    const orgMarkupData = encoder.encode(orgMarkup);
    await Deno.writeFile(`${folderPath}/${courseName}.org`, orgMarkupData);
  });
  return resolvedSchemas;
}

