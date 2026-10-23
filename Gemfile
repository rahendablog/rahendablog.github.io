source "https://rubygems.org"
# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll"

# The github-pages gem is deliberately NOT used: this site is built by
# .github/workflows/jekyll.yml and deployed as an artifact (upload-pages-artifact
# -> deploy-pages), so GitHub's own Jekyll builder never runs on it. That gem only
# emulates the restricted builder, and its config overrides (safe => true,
# plugins_dir => random) disable _plugins/, which this site needs.
# gem "jekyll-remote-theme"
# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "liquid_reading_time"
  gem "jekyll-paginate-v2"
  gem "jekyll-auto-authors"
  gem "jekyll-github-metadata"
end
