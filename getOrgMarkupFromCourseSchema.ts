// TODO: This is the hackiest part but it works. Probably should cleanup how the org markup is generated...
export function getOrgMarkupFromCourseSchema(schema) {
  console.log('schema: ', schema);

  const creators = schema.creator.map(creator => {
    return `[[${creator.url}][${creator.name}]]`;
  }).join(', ');

  // The hasPart videos array doesn't have as detailed descriptions as
  // the syllabus sections so we need to create a lookup map of
  // syllabus name and description
  const syllabus = new Map();
  schema.syllabusSections.forEach((section) => {
    syllabus.set(section.name, section.description);
  });

  // The only hint of each section name is in the video name as
  // part after a hyphen, so we need to parse the section/video
  // names out in order to build up a course Map
  const course = new Map();
  schema.hasPart.forEach((section) => {
    const sectionName = section[0].name.split(' - ')[1];
    course.set(sectionName, []);
    section.forEach((video) => {
      if (video['@type'] === 'VideoObject') {
        const [videoName, sectionName] = video.name.split(' - ') || ['',''];
        const description = syllabus.get(videoName) || '';
        course.get(sectionName).push({
          name: videoName,
          duration: video.duration,
          contentUrl: video.contentUrl,
          description,
        });
      }
    });
  });

  const courseMarkup = Array.from(course).map(([section, videos]) => {
    return `
* ${section}
${videos.map(video => {
  return `
** [[${video.contentUrl}][${video.name}]]
   :PROPERTIES:
   :DURATION: ${video.duration}
   :END:

${video.description}

`;
}).join('')}
`;
}).join('');

  const orgMarkup = `
#+TITLE: ${schema.name}

Creators: ${creators}

Time Required: ${schema.timeRequired}

${schema.description}

${courseMarkup}
`;

  return orgMarkup;
}
