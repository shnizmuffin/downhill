// 11ty config.
import path from 'node:path';
// register dotenv for process.env.* variables to pickup
import dotenv from 'dotenv';
dotenv.config();
import tailwindcss from '@tailwindcss/vite';

//  config import
import collections from './.11ty/collections.js';
// import events from './.11ty/events.js';
import filters from './.11ty/filters.js';
import plugins from './.11ty/plugins.js';
// import shortcodes from './.11ty/shortcodes.js';

export default async function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/_assets/**/*.{css,js,svg,png,jpeg}');
  eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');

  // --------------------- Collections

  eleventyConfig.addCollection('pages', collections.pages);

  // ---------------------  Filters

  eleventyConfig.addFilter('dir', filters.relativeDir);
  eleventyConfig.addFilter('relativeUrl', filters.relativeUrl);
  eleventyConfig.addFilter('flatMap', filters.flatMap);
  eleventyConfig.addFilter('unique', filters.unique);

  // ---------------------  Plugins
  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.eleventyNavigationPlugin);
  eleventyConfig.addPlugin(plugins.EleventyVitePlugin, {
    tempFolderName: '.11ty-vite',
    serverOptions: {
      module: '@11ty/eleventy-dev-server',
      domDiff: false,
    },
    viteOptions: {
      base: '',
      clearScreen: false,
      appType: 'mpa',
      plugins: [tailwindcss()],

      server: {
        mode: 'development',
        middlewareMode: true,
      },

      build: {
        emptyOutDir: true,
        mode: 'production',
      },

      resolve: {
        alias: {
          // Allow references to `node_modules` folder directly
          '/node_modules': path.resolve('.', 'node_modules'),
        },
      },
    },
  });
  eleventyConfig.addPlugin(plugins.webc, {
    components: ['./src/_includes/**/*.webc', 'npm:@11ty/eleventy-img/*.webc'],
  });
  eleventyConfig.addPlugin(plugins.eleventyImagePlugin, {
    useCache: true,
    outputDir: './_site/img/',
    formats: ['avif', 'webp'],
    widths: ['auto'],
    defaultAttributes: {
      loading: 'lazy',
      decoding: 'async',
      sizes: 'auto',
    },
  });
  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    // which file extensions to process
    extensions: 'html',
    useCache: true,
    // optional, output image formats
    formats: ['avif', 'webp'],
    // optional, output image widths
    widths: ['auto'],
    // optional, attributes assigned on <img> override these values.
    defaultAttributes: {
      loading: 'lazy',
      sizes: 'auto',
      decoding: 'async',
    },
    // transform: (sharp) => {
    //   sharp.resize({width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true});
    // },
    // filenameFormat: function (id, src, width, format, options) {
    //   const extension = path.extname(src);
    //   const name = path.basename(src, extension);
    //   return `${name}-${width}w.${format}`;
    // },
  });

  // eleventyConfig.addPlugin(plugins.htmlConfig);
  // eleventyConfig.addPlugin(plugins.cssConfig);
  // eleventyConfig.addPlugin(plugins.jsConfig);
  // eleventyConfig.addPlugin(plugins.rss);
  // eleventyConfig.addPlugin(plugins.drafts);
  // eleventyConfig.addPlugin(plugins.syntaxHighlight);

  // Copy static assets
  eleventyConfig.addPassthroughCopy('src/**/.htaccess');
  eleventyConfig.addPassthroughCopy('src/**/*.pdf');
  eleventyConfig.addPassthroughCopy({ 'src/_assets/css/*.css': 'assets/css/' });
  eleventyConfig.addPassthroughCopy({ 'src/_assets/js/*.js': 'assets/js/' });

  return {
    dir: {
      input: 'src/',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
    },
    passthroughFileCopy: true,
  };
}
