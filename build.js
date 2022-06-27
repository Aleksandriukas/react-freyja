const Metro = require('metro');

const main = async () => {
    const config = await Metro.loadConfig();

    await Metro.runBuild(config, {
        entry: 'src/index.ts',
        platform: 'android',
        minify: false,
        out: './build/index.bundle.js',
    });


};

main();
