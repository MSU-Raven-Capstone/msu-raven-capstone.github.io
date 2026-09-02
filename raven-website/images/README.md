# Adding Images to This Site

This folder is where every image on the site lives. None of the HTML pages
reference an image file yet — instead, every spot that needs a picture shows
a dashed placeholder box that says "Image Placeholder" until you add one.

## Quick steps (for every image)

1. **Save your image file into this `images/` folder.**
   Use a short, descriptive, lowercase file name with hyphens instead of
   spaces, for example:
   - `raven-in-flight.jpg`
   - `raven-cad-render.jpg`
   - `raven-logo.png`
   - `cfd-result-1.png`

2. **Open the page's `.html` file** and find the placeholder you want to
   replace. Every placeholder has an HTML comment directly above it (look
   for a block of `<!-- ... -->` text) that explains exactly what to paste
   in. It looks like this:

   ```html
   <!--
     IMAGE PLACEHOLDER — ...
     1. Save your image into "images"
     2. Delete the <div class="figure-placeholder"> block below
     3. Paste this in its place:
          <figure class="figure">
            <img src="images/your-file-name.jpg" alt="Describe the image here">
            <figcaption>Optional caption</figcaption>
          </figure>
   -->
   <div class="figure-placeholder">
     ...
   </div>
   ```

3. **Delete** the `<div class="figure-placeholder">...</div>` block.

4. **Paste in** the `<figure>...</figure>` snippet from the comment,
   updating:
   - `src="images/your-file-name.jpg"` to match the file you saved in step 1
   - `alt="Describe the image here"` to a short, accurate description of
     what's in the image (for accessibility and for anyone whose image
     doesn't load)
   - the `<figcaption>` text to a caption, or delete that line entirely if
     you don't want a caption

5. **Save the file and reload the page in your browser** to check it looks
   right. If the image doesn't show up, double check:
   - The file name in `src="images/..."` exactly matches the file name in
     the `images` folder (including capitalization and file extension)
   - The image file actually saved into the `images` folder, not somewhere
     else

## Formats & sizing tips

- **Photos**: `.jpg` is usually smallest. **Logos / diagrams with
  transparent backgrounds**: use `.png`. Either works fine on this site.
- **Keep file sizes reasonable** (aim for under ~500 KB per image) so pages
  load quickly. Most phone/camera photos are far larger than needed for the
  web — resize or compress them first (e.g. with an online image compressor,
  or Preview/Photos app "export" at a smaller size) before adding them here.
- **Recommended widths**: about 1200px wide for full-size figures, and
  around 400px wide for small logos, is more than enough for any screen.
- The site's CSS automatically scales images to fit their container and
  keeps them from overflowing on mobile, so you don't need to resize images
  precisely — just avoid uploading huge multi-megabyte camera originals.

## Side-by-side image pairs

A few pages (like `raven.html`) show two images next to each other. These
live inside a `<div class="figure-row">...</div>` wrapper that already
contains two placeholder boxes. Replace each placeholder individually using
the steps above — the layout will automatically arrange them side by side on
wide screens and stack them on narrow/mobile screens.

## Adding a brand-new image that isn't already a placeholder

You're not limited to the placeholders already on the pages. To add an
additional image anywhere in the content of a page, save the file into this
folder and paste in the same `<figure>` snippet shown in step 4 above,
anywhere inside a `<section class="section content">...</section>` block.
