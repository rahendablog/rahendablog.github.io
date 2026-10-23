# Markdown alternates: /<slug>.md for every published post.
#
# An AI agent that lands on a post can fetch the same text as Markdown instead
# of parsing the HTML, and finds a pointer to the site index at the top of it.
# The pages are declared from head.html with
# <link rel="alternate" type="text/markdown">.
#
# The source name ends in .txt on purpose: Jekyll picks its converter from the
# source extension, so a .txt name leaves the Markdown body alone, while the
# permalink decides the served path (/<slug>.md) and the output extension.
# GitHub Pages serves .md as text/markdown; charset=utf-8.
module MdAlternates
  def self.absolute_url(site, path)
    base = site.config["url"].to_s.chomp("/")
    baseurl = site.config["baseurl"].to_s
    baseurl = "" if baseurl == "/"
    "#{base}#{baseurl.chomp("/")}#{path}"
  end

  def self.md_path(post)
    post.url.sub(%r{\.html\z}, "").sub(%r{/\z}, "") + ".md"
  end

  def self.body(site, post)
    index_url = absolute_url(site, "/llms.txt")
    author = site.data.dig("authors", post.data["author"].to_s) || {}
    lang = post.data["lang"] || site.config["lang"] || "en"

    lines = [
      "> ## Site index",
      "> Fetch the complete site index at: #{index_url}",
      "> Use it to discover every page on this site before exploring further.",
      "",
      "# #{post.data["title"]}",
      "Source: #{absolute_url(site, post.url)}",
      "Published: #{post.date.strftime("%Y-%m-%d")}",
      "Author: #{author["name"] || site.config.dig("author", "name")}",
      "Language: #{lang}",
    ]

    description = post.data["description"].to_s.strip.gsub(/\s+/, " ")
    lines.push("", "> #{description}") unless description.empty?
    lines.push("", post.content.to_s.strip, "")
    lines.join("\n")
  end

  class Page < Jekyll::PageWithoutAFile
    def initialize(site, post)
      super(site, site.source, "", "#{post.basename_without_ext}.txt")
      self.data = {
        "layout"    => nil,
        "permalink" => MdAlternates.md_path(post),
        "sitemap"   => false,
        "title"     => post.data["title"],
      }
      self.content = MdAlternates.body(site, post)
    end
  end

  class Generator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      site.posts.docs.each do |post|
        next if post.data["unlisted"]

        site.pages << Page.new(site, post)
      end
    end
  end
end
