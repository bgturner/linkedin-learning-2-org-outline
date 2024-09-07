import { parseArgs } from "./parseArgs.ts";
import { getCourseSchemas, getVideoSchemas } from './schemaGetters.ts';
import { saveCourseToFile } from './saveCourseToFile.ts';

const args = parseArgs(Deno.args);

const coursesSchemas = getCourseSchemas(args.urls[0]);

saveCourseToFile(coursesSchemas)
