// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
var docs = defineDocs({ dir: "content/docs" });
var source_config_default = defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "one-dark-pro",
        dark: "one-dark-pro"
      }
    }
  }
});
export {
  source_config_default as default,
  docs
};
