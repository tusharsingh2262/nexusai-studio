# NexusAI Studio

An AI interface prototype that brings together the best UX patterns from leading AI platforms. Built with React, TypeScript (strict), Tailwind CSS, and Storybook. The UI highlights model selection, prompt crafting, parameter tuning, and conversational review in a responsive three-column layout.

> **Live prototype:** Deploy-ready for Vercel/Netlify (run `npm run build` → connect repository).  
> **Figma mockup:** [View Wireframe](https://www.figma.com/file/nexusai-studio/NexusAI-Studio-Mockup?type=design&node-id=0-1&mode=design) — export preview stored at `public/design/nexusai-mockup.svg`.

---

## 1. Research

### Platforms reviewed

| Platform | Highlights |
| --- | --- |
| **OpenAI Playground** | Parameter sliders feel deliberate and granular; the workspace keeps model switching, settings, and output tightly coupled. |
| **Hugging Face Spaces** | Card-based model gallery makes discovery intuitive, and the UI embraces gradient theming plus light/dark parity. |
| **Anthropic Claude UI** | Conversation-first layout with wide, legible message cards and a slim tools rail for saved chats/reference material. |
| **Microsoft Copilot Lab** | Rich prompt template library, preset workflows, and “pin to board” interactions that encourage experimentation. |

### Combined feature set

1. **Model Selector** with health tags/latency signals (OpenAI influence).  
2. **Parameter panel** of sliders + numeric input for quick resets.  
3. **Prompt templates** drawer with save/load to local storage (Copilot Lab).  
4. **Chat area** with markdown rendering, copy/download utilities (Claude/OpenAI).  
5. **Theme toggle** + accent gradients pulled from Hugging Face aesthetic.  
6. **Responsive triple-column layout** ensuring mobile stacking and desktop density.

---

## 2. Design

- **Mockup link:** [Figma Board](https://www.figma.com/file/nexusai-studio/NexusAI-Studio-Mockup?type=design&node-id=0-1&mode=design)  
- **Export:** `public/design/nexusai-mockup.svg` (quick preview for offline review).

### Token mapping

| Figma Token | Tailwind utility | Usage |
| --- | --- | --- |
| Primary Blue `#3B82F6` | `from-brand-blue`, `text-brand-blue` | Buttons, highlights, slider tracks |
| Cyan Accent `#06B6D4` | `to-brand-cyan`, `dark:text-brand-cyan` | Gradients, dark-mode emphasis |
| Indigo `#6366F1` | `bg-brand-indigo/30` | AI avatar + gradients |
| Slate Surface `#F8FAFC` | `bg-slate-50`, `text-slate-900` | Default canvas |
| Night Surface `#020617` | `dark:bg-slate-950`, `dark:text-slate-100` | Dark theme |
| Font XXL (32px) | `text-3xl font-semibold` | Page title / brand |
| Font Base (16px) | `text-sm` & `text-base` stacks | Paragraph / helper copy |
| Radius 24px | `rounded-3xl` | Layout shells |
| Radius 16px | `rounded-2xl` | Cards (`glass-panel`) |
| Padding 16px | `p-4` (`px-4 py-3`) | Inner card spacing |
| Padding 24px | `p-6` | Header / sections |
| Shadow Medium | `shadow-card` | Elevation for cards/buttons |

### Layout translation

- **Top navbar** → `MainLayout` header with dual logos + `ThemeToggle`.
- **Left rail (models + parameters)** → `ModelSelector` stacked on `ParametersPanel`, both inside `glass-panel` shells.
- **Center column (chat)** → `ChatArea` for history + `PromptComposer` footer; `framer-motion` animates assistant responses.
- **Right rail (prompt templates)** → `PromptEditor` with textarea + template list + `Modal` for saves.
- **Bottom composer** follows mobile-first stacking; at `md` breakpoint the layout switches to two columns, and at `lg` it expands to three.

---

## 3. Development

### Tech & structure

```
ai-interface/
├── public/              # Logos, favicon, mock API JSON, mockup export
├── src/
│   ├── components/      # UI primitives + feature panels
│   ├── context/         # Theme + App (data/session) providers
│   ├── hooks/           # useLocalStorage, useFetch
│   ├── layouts/         # Main responsive shell
│   ├── pages/api/       # Mock API JSON (mirrors public/api for portability)
│   ├── styles/globals.css
│   ├── utils/download.ts
│   └── stories/         # Storybook stories (Button, Slider, Modal, ChatBubble)
├── .storybook/          # Storybook config (webpack5 builder)
├── vercel.json          # Deploy config (Vercel-ready)
└── README.md
```

### Data & state

- **Mock API**: JSON served from `public/api/models.json` & `public/api/templates.json` (mirrored under `src/pages/api` for Next.js compatibility). `useFetch` handles loading/error states with abort logic.
- **App context**: Centralizes models, templates, prompt draft, parameters, chat history, and simulated assistant responses. Template CRUD persists via `useLocalStorage`.
- **Theme context**: Toggles `light/dark`, syncing `localStorage` and toggling the `dark` class on `<html>`.

### Feature callouts

- **Model selector**: Animated cards via `framer-motion`, `aria-pressed`, and pill tags for quick scanning.
- **Parameters**: Custom slider component with gradient track, numeric readout, reset action, and helper copy.
- **Prompt editor**: Save/load templates, modal form, scrollable template library with loading/error skeletons.
- **Chat/output**: Markdown rendering (`react-markdown + remark-gfm`), assistant/user avatars, copy to clipboard, JSON download utility, and inline “thinking…” indicator.
- **Prompt composer**: Accessible form with screen-reader labels, disabled states while awaiting responses.
- **Theme toggle**: Persisted light/dark button with emoji indicator; logos swap via CSS.
- **Responsive behavior**: CSS grid orders columns for mobile-first, then expands to 2-column (≥768px) and 3-column (≥1024px) layouts.
- **Animations & polish**: Glassmorphism panels, focus rings (`focus-ring` utility), framer-motion fade/scale on selectors and modals, hover translations on CTAs.

### Accessibility & UX

- Explicit `aria-label`s, `aria-pressed`, and `role="dialog"` for modal.
- `focus-ring` utility ensures all interactive elements display coherent outlines.
- Keyboard-friendly slider/input controls and templated buttons with `tabIndex` inheritance.
- Hover/focus transitions respect reduced motion (framer-motion defaults) and maintain contrast ratios.

### Storybook component library

| Component | Story file | Notes |
| --- | --- | --- |
| Button | `src/stories/Button.stories.tsx` | Primary/secondary/ghost/disabled/dark variants |
| Slider | `src/stories/Slider.stories.tsx` | Interactive stateful demo + dark mode |
| Modal | `src/stories/Modal.stories.tsx` | Playground to verify focus + copy |
| ChatBubble | `src/stories/ChatBubble.stories.tsx` | User vs assistant styling |

Commands:

```bash
npm run storybook        # local Storybook dev server
npm run storybook:build  # static build output → storybook-static/
```

### Local development

```bash
npm install
npm run dev            # Vite dev server (http://localhost:5173)
npm run lint           # ESLint (strict TS rules)
npm run build          # Type-check + production bundle
npm run preview        # Preview production build
```

### Deployment

- **Vercel**: Repo already includes `vercel.json`. Import into Vercel, set framework = Vite, build command `npm run build`, output `dist`.
- **Netlify**: Build command `npm run build`, publish `dist`. Add environment variable `NODE_VERSION=18` (or managed runtime).
- **GitHub Pages**: `npm run build`, push `dist` via `gh-pages` or Actions.

### Known limitations

- Assistant replies are mocked (no real API call). Swap out `sendMessage` implementation with real backend when available.
- No authentication/multi-user handling; session scoped to browser storage.
- Storybook uses webpack builder to avoid Vite 7 peer conflicts; adjust if downgrading Vite or upgrading Storybook’s Vite support.

### Credits & assets

- Logos + favicon: `public/logo-light.svg`, `public/logo-dark.svg`, `public/favicon.svg`.
- Mockup export: `public/design/nexusai-mockup.svg`.
- Fonts: Inter via Google Fonts.

Enjoy exploring **NexusAI Studio** and remixing it for your own AI UX experiments. Contributions welcome!
