// @ts-nocheck
import * as __fd_glob_8 from "../content/docs/spring.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/properties.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/presets.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/on-visible.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/enter-tween.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/cascade-sequence.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/animate.mdx?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, }, {"animate.mdx": __fd_glob_1, "cascade-sequence.mdx": __fd_glob_2, "enter-tween.mdx": __fd_glob_3, "index.mdx": __fd_glob_4, "on-visible.mdx": __fd_glob_5, "presets.mdx": __fd_glob_6, "properties.mdx": __fd_glob_7, "spring.mdx": __fd_glob_8, });