# maple-mono-cn

[![Build](https://github.com/mogeko/maple-mono-cn/actions/workflows/build.yaml/badge.svg)](https://github.com/mogeko/maple-mono-cn/actions/workflows/build.yaml)

Process and distribute [Maple Mono CN](https://github.com/subframe7536/maple-font/blob/variable/README_CN.md) by NPM.

This project aims to optimize Maple Mono CN and package it for upload to [NPM](https://www.npmjs.com/package/@mogeko/maple-mono-cn), making it convenient for web development use.

## Features

- **Subset Support**: Automatically splits fonts for optimal performance
- **NPM Distribution**: Easy installation via npm

## Usage

### Installation

```bash
npm install @mogeko/maple-mono-cn
```

or use pnpm, yarn, bun, etc.

### React  

```jsx
import '@mogeko/maple-mono-cn';

function App() {
  return (
    <div style={{ fontFamily: "'Maple Mono CN', monospace" }}>
      Hello, Maple Mono CN!
    </div>
  );
}
```

Or use CSS modules:

```css
/* App.module.css */
@import '@mogeko/maple-mono-cn';

.container {
  font-family: 'Maple Mono CN', monospace;
}
```

```jsx
import styles from './App.module.css';

function App() {
  return <div className={styles.container}>Hello, Maple Mono CN!</div>;
}
```

### Vue

```vue
<template>
  <div class="container">Hello, Maple Mono CN!</div>
</template>

<style scoped>
@import '@mogeko/maple-mono-cn';

.container {
  font-family: 'Maple Mono CN', monospace;
}
</style>
```

### HTML

Add the link tag to your HTML:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mogeko/maple-mono-cn" />
```

Then use the font:

```css
body {
  font-family: 'Maple Mono CN', monospace;
}
```

## Development

### Prerequisites

This project uses [Bun](https://bun.sh) to bundle NPM modules, so installing Bun is a requirement.

### Build

```bash
bun run build
```

This will process the Maple Mono CN font and output optimized fonts to the `dist/` directory.

### Lint & Format

```bash
bun run lint
bun run fmt
```

## LICENSE

The code in this project is released under the [MIT License](./LICENSE).

