<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the storefront catalog and brand settings in Lovable Cloud with public read access and admin-only writes, so edits appear across devices.
- Keep admin privileges in a separate role table with one-time first-account claim, so a public browser cannot self-assert an admin role after ownership is claimed.
- Store newly uploaded storefront imagery as browser-compressed WebP data URLs in the catalog/settings, because public storage buckets are disabled for this workspace; starter mockups remain CDN assets.
- Keep cart state in the browser and complete orders via WhatsApp only when the merchant supplies a number, so the site never implies an unconfigured payment integration.
