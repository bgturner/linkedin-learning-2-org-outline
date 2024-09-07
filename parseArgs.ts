export function parseArgs(args: string[]) {
    const urls: string[] = [];

    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('http')) {
            urls.push(args[i]);
        } else {
            console.warn(`Unknown option: ${args[i]}`);
        }
    }

    if (urls.length < 1) {
      console.error('At least one url needs to be passed to download.');
      Deno.exit(1);
    }
    return {
        urls
    };
}
