# CalcuPortal CMS

This directory is reserved for the CalcuPortal content-management layer.

The production site remains static/GitHub Pages based. CMS changes should publish content into the existing repository structure and continue using the existing GitHub Actions sitemap generation.

## Planned content fields

- Title
- Slug
- Category
- Featured image
- Excerpt
- Article content
- Meta title
- Meta description
- Canonical URL
- Publish date
- Author
- Draft/published status

## Important

Do not move the existing calculator pages or break the current `/blog/` URL structure. CMS publishing should preserve existing SEO URLs and automatically trigger the sitemap workflow through the normal GitHub commit process.
