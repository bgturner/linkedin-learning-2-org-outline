import * as cheerio from "$cheerio";
import { downloadHtml } from './downloadHtml.ts';

export const makeSchemaGetter = (schemaType: string) => {
  return async (url: string) => {

    const html = await downloadHtml(url);
    const $ = cheerio.load(html);

    const scripts = $('script[type="application/ld+json"]').get();

    const schemas: any = [];

    scripts.forEach((script) => {
        if (script.children && script.children[0].data ) {
            const data = JSON.parse(script.children[0].data);
            if (data['@type'] === schemaType) {
                schemas.push(data);
            }
        }
    });
    return schemas;
  }
}

export const getCourseSchemas = makeSchemaGetter("Course");
export const getVideoSchemas = makeSchemaGetter("VideoObject");
