const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: [// Image formats
            'bmp',
            'gif',
            'jpg',
            'jpeg',
            'png',
            'psd',
            'svg',
            'webp',
            // Video formats
            'm4v',
            'mov',
            'mp4',
            'mpeg',
            'mpg',
            'webm',
            // Audio formats
            'aac',
            'aiff',
            'caf',
            'm4a',
            'mp3',
            'wav',
            // Document formats
            'html',
            'pdf',
            'yaml',
            'yml',
            // Font formats
            'otf',
            'ttf',
            // Archives (virtual files)
            'zip',
        ],
        sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx'],
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
