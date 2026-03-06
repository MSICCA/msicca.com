# BASIS KIT v5.0 - Integration Guide

**Guía completa de integración para el ecosistema Grupo MARTE**

---

## 📋 Requisitos Previos

- Node.js 18+
- npm, yarn, pnpm o bun
- Tailwind CSS v4 (recomendado) o v3

---

## 🚀 Instalación

### Paso 1: Copiar Archivos

```bash
# Crear directorio de estilos
mkdir -p src/styles/basis-kit

# Copiar archivos del kit
cp basis-kit-5.0/BASIS_KIT_Design_Tokens.css src/styles/basis-kit/
cp basis-kit-5.0/BASIS_KIT_Components.css src/styles/basis-kit/
cp basis-kit-5.0/tailwind.config.basis.ts ./tailwind.config.ts
cp basis-kit-5.0/postcss.config.basis.js ./postcss.config.js
```

### Paso 2: Instalar Dependencias

```bash
# Tailwind CSS v4
npm install tailwindcss @tailwindcss/postcss autoprefixer

# Fuentes (Google Fonts)
# Agregar en tu HTML:
# <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Paso 3: Configurar CSS Global

```css
/* src/app/globals.css o src/styles/globals.css */

/* Importar Tailwind */
@import "tailwindcss";

/* Importar BASIS KIT */
@import "./basis-kit/BASIS_KIT_Design_Tokens.css";
@import "./basis-kit/BASIS_KIT_Components.css";

/* Opcional: Sobrescribir variables de marca */
:root {
  --brand: #C93400;
  --brand-secondary: #0095C9;
}
```

---

## 🎨 Configuración de Marca

### Variables CSS Principales

```css
:root {
  /* Colores de Marca */
  --brand: #C93400;           /* Primary */
  --brand-rgb: 201, 52, 0;
  --brand-secondary: #0095C9;  /* Secondary */
  --brand-secondary-rgb: 0, 149, 201;
  
  /* Tokens de Espaciado (8px grid) */
  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-3: 24px;
  --spacing-4: 32px;
  --spacing-6: 48px;
  --spacing-8: 64px;
}
```

### Cambiar Marca por Plataforma

```css
/* Para NEXUS */
:root {
  --brand: #2980B9;
  --brand-rgb: 41, 128, 185;
}

/* Para OPERAND */
:root {
  --brand: #27AE60;
  --brand-rgb: 39, 174, 96;
}

/* Para AXIS */
:root {
  --brand: #E67E22;
  --brand-rgb: 230, 126, 34;
}
```

---

## 📱 Integración por Framework

### Next.js 15+ (App Router)

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const ibmPlexMono = IBM_Plex_Mono({ 
  variable: "--font-mono", 
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"] 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

### React (Vite)

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Vue 3

```typescript
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import './styles/globals.css';

createApp(App).mount('#app');
```

### Angular

```typescript
// angular.json
{
  "styles": [
    "src/styles/globals.css"
  ]
}
```

---

## 🌓 Dark Mode

### Activación por Clase

```html
<html class="dark">
  <!-- Dark mode activo -->
</html>

<html>
  <!-- Light mode -->
</html>
```

### Toggle con JavaScript

```typescript
// Toggle dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}

// Detectar preferencia del sistema
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}
```

### Con Next.js

```tsx
'use client';
import { useEffect, useState } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <>
      <button onClick={() => setDark(!dark)}>
        {dark ? 'Light' : 'Dark'}
      </button>
      {children}
    </>
  );
}
```

---

## 📐 Uso de Componentes

### Button

```tsx
<button className="basis-btn basis-btn-primary">
  Primary Action
</button>

<button className="basis-btn basis-btn-secondary">
  Secondary
</button>

<button className="basis-btn basis-btn-outline">
  Outline
</button>

<button className="basis-btn basis-btn-ghost">
  Ghost
</button>

<button className="basis-btn basis-btn-danger">
  Delete
</button>
```

### Card

```tsx
<div className="basis-card">
  <h4 className="font-mono font-bold">Card Title</h4>
  <p className="text-sm opacity-70">Card content goes here</p>
</div>

<div className="basis-card basis-card-accent">
  Featured card with brand accent
</div>

<div className="basis-card basis-card-stripes">
  Card with diagonal stripe pattern
</div>
```

### Form Elements

```tsx
// Input
<input type="text" className="basis-input" placeholder="Enter text..." />

// Select
<select className="basis-select">
  <option>Option 1</option>
  <option>Option 2</option>
</select>

// Textarea
<textarea className="basis-textarea" placeholder="Enter message..." />

// Checkbox
<input type="checkbox" className="basis-checkbox" />

// Radio
<input type="radio" className="basis-radio" name="group" />

// Switch
<input type="checkbox" className="basis-switch" />
```

### Badge

```tsx
<span className="basis-badge basis-badge-success">Success</span>
<span className="basis-badge basis-badge-warning">Warning</span>
<span className="basis-badge basis-badge-error">Error</span>
<span className="basis-badge basis-badge-info">Info</span>
<span className="basis-badge basis-badge-brand">Brand</span>
```

### Alerts

```tsx
<div className="basis-alert basis-alert-success">
  <div className="basis-alert-content">
    <p className="basis-alert-title">Success</p>
    <p className="basis-alert-description">Operation completed successfully.</p>
  </div>
</div>
```

### Modal

```tsx
{showModal && (
  <div className="basis-modal-overlay" onClick={() => setShowModal(false)}>
    <div className="basis-modal" onClick={e => e.stopPropagation()}>
      <div className="basis-modal-header">
        <h3 className="basis-modal-title">Modal Title</h3>
        <button className="basis-modal-close" onClick={() => setShowModal(false)}>✕</button>
      </div>
      <div className="basis-modal-body">
        Modal content...
      </div>
      <div className="basis-modal-footer">
        <button className="basis-btn basis-btn-secondary">Cancel</button>
        <button className="basis-btn basis-btn-primary">Confirm</button>
      </div>
    </div>
  </div>
)}
```

---

## 🎯 Patrones Brutales

### Sombras (Brutal Shadows)

```tsx
<div className="shadow-brutal">Sombra estándar</div>
<div className="shadow-brutal-sm">Sombra pequeña</div>
<div className="shadow-brutal-lg">Sombra grande</div>
<div className="shadow-brutal-brand">Sombra con color de marca</div>
```

### Patrón Diagonal

```tsx
<div className="bg-stripes">
  Fondo con rayas diagonales
</div>

<div className="bg-stripes-brand">
  Fondo con rayas en color de marca
</div>
```

---

## 📊 Componentes de Datos (v5.0)

### Data Grid

```tsx
<div className="basis-data-grid">
  <div className="basis-data-grid-header">
    <div className="basis-data-grid-cell">ID</div>
    <div className="basis-data-grid-cell">Name</div>
    <div className="basis-data-grid-cell">Status</div>
  </div>
  <div className="basis-data-grid-row">
    <div className="basis-data-grid-cell">001</div>
    <div className="basis-data-grid-cell">System Alpha</div>
    <div className="basis-data-grid-cell">Active</div>
  </div>
</div>
```

### Gauge Meter

```tsx
<div className="relative w-32 h-16 overflow-hidden">
  <div className="absolute inset-0 border-8 border-white/10 rounded-t-full" style={{ borderBottom: 'none' }} />
  <div className="absolute inset-0 border-8 rounded-t-full origin-bottom"
    style={{ 
      borderBottom: 'none',
      borderColor: '#22C55E',
      transform: `rotate(${value * 1.8 - 90}deg)`,
      clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
    }}
  />
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-2xl font-bold">
    {value}%
  </div>
</div>
```

---

## ✅ Checklist de Integración

- [ ] Copiar archivos de BASIS KIT
- [ ] Configurar Tailwind CSS
- [ ] Instalar fuentes (IBM Plex Mono + Inter)
- [ ] Importar CSS global
- [ ] Configurar variables de marca
- [ ] Configurar dark mode
- [ ] Verificar componentes básicos (button, card, input)
- [ ] Probar responsive breakpoints
- [ ] Validar accesibilidad (contraste, focus states)

---

## 🐛 Solución de Problemas

### Los estilos no se aplican

1. Verificar que los archivos CSS estén importados correctamente
2. Comprobar el orden de imports (tokens antes que componentes)
3. Verificar que PostCSS esté configurado

### Dark mode no funciona

1. Agregar clase `dark` al elemento `<html>`
2. Verificar que las variables CSS de dark mode estén definidas

### Fuentes no cargan

1. Verificar que el link de Google Fonts esté en el `<head>`
2. Comprobar que las variables `--font-mono` y `--font-sans` estén definidas

---

## 📞 Soporte

**MSICCA Development Team**  
**Grupo MARTE**

Para consultas técnicas, revisar la documentación interactiva en el sitio de BASIS KIT.
