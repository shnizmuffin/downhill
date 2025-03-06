// 11ty config.
import path from 'node:path';
// register dotenv for process.env.* variables to pickup
import dotenv from 'dotenv';
dotenv.config();

//  config import
// import {getAllPosts, showInSitemap, tagList} from './.11ty/collections.js';
// import events from './.11ty/events.js';
import filters from './.11ty/filters.js';
import plugins from './.11ty/plugins.js';
// import shortcodes from './.11ty/shortcodes.js';

export default async function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/_assets/**/*.{css,js,svg,png,jpeg}');
  eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');

  // ---------------------  Filters

  eleventyConfig.addFilter('relativeDir', filters.relativeDir);
  eleventyConfig.addFilter('relativeUrl', filters.relativeUrl);
  
  // ---------------------  Plugins
  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
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
    useTransform: true,
  });
  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    formats: ['webp', 'jpeg'],
    widths: ['auto'],
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async',
        sizes: 'auto',
      },
      pictureAttributes: {},
    },
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
  eleventyConfig.addPassthroughCopy({ 'src/_assets/images': 'assets/images' });
  eleventyConfig.addPassthroughCopy({ 'src/_assets/css/*.css': 'assets/css' });
  eleventyConfig.addPassthroughCopy({ 'src/_assets/js/*.js': 'assets/js' });

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
