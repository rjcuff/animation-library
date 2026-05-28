// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"animate.mdx": () => import("../content/docs/animate.mdx?collection=docs"), "cascade-sequence.mdx": () => import("../content/docs/cascade-sequence.mdx?collection=docs"), "enter-tween.mdx": () => import("../content/docs/enter-tween.mdx?collection=docs"), "getting-started.mdx": () => import("../content/docs/getting-started.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "on-visible.mdx": () => import("../content/docs/on-visible.mdx?collection=docs"), "presets.mdx": () => import("../content/docs/presets.mdx?collection=docs"), "properties.mdx": () => import("../content/docs/properties.mdx?collection=docs"), "spring.mdx": () => import("../content/docs/spring.mdx?collection=docs"), }),
};
export default browserCollections;