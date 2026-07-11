# zero27rh

![App Preview](https://imgix.cosmicjs.com/c932cce0-7d63-11f1-94ad-a52b70e9a615-autopilot-photo-1555066931-4365d14bab8c-1783800295589.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern creative portfolio & blog built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). **zero27rh** showcases posts, authors, and categories with a clean, responsive design powered entirely by your existing Cosmic content model.

## Features

- 📝 **Blog Posts** — Full post listing and individual post pages with featured images, tags, and rich content
- 👤 **Authors** — Dedicated author pages with bios, avatars, and their published posts
- 🏷️ **Categories** — Browse posts filtered by category
- 🎨 **Modern Design** — Clean, responsive layout with smooth transitions and beautiful typography
- ⚡ **Server-Side Rendering** — Fast, SEO-optimized pages using Next.js App Router and Server Components
- 🖼️ **Optimized Images** — All images served via imgix with automatic format & compression
- 📱 **Fully Responsive** — Looks great on mobile, tablet, and desktop

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a52a1a867f2f6a3f805a555&clone_repository=6a52a2a267f2f6a3f805a58a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "zero27rh". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) — Headless CMS
- [@cosmicjs/sdk](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing `authors`, `categories`, and `posts` object types

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd zero27rh
```

2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables (these are automatically provided when deploying via Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with connected author and category (depth=1)
const response = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const posts = response.objects

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(1)

// Fetch posts for a specific author
const authorPosts = await cosmic.objects
  .find({ type: 'posts', 'metadata.author': authorId })
  .depth(1)
```

## Cosmic CMS Integration

This app connects to your Cosmic bucket and reads from three object types:

- **Posts** (`posts`) — content, featured_image, tags, publication_date, author, category
- **Authors** (`authors`) — name, bio, avatar, email
- **Categories** (`categories`) — name, description

Connected objects (author and category) are fetched using the `depth` parameter so nested data is directly available. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push your code to a Git repository
2. Import the project into [Vercel](https://vercel.com)
3. Add your `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables
4. Deploy!

### Netlify

1. Push your code to a Git repository
2. Import into [Netlify](https://netlify.com)
3. Set the build command to `bun run build` and add environment variables
4. Deploy!

<!-- README_END -->