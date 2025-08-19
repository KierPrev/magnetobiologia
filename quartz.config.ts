// .github/quartz/quartz.config.ts
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Mind Map de Magnetobiología - Kiernan Preve",
    locale: "es-ES",
    // mientras probás en GitHub Pages (project page):
    // baseUrl = "kierprev.github.io/<NOMBRE-DEL-REPO>"
    // cuando pases a subdominio:
    // baseUrl = "notes.kier.ar"
    baseUrl: "kierprev.github.io/magnetobiologia"
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.ObsidianFlavoredMarkdown(),
      Plugin.Description(),
      Plugin.CrawlLinks(),
      Plugin.CreatedModifiedDate(),
      Plugin.SyntaxHighlighting(),
      Plugin.TableOfContents(),
      Plugin.Citations(),
    ],
    filters: [
      Plugin.RemoveDrafts(),
      // Si querés que SOLO publiquen notas con `publish: true`, descomentá:
      // Plugin.ExplicitPublish(),
    ],
    emitters: [
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
