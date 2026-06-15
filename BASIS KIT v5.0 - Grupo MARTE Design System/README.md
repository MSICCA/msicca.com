# BASIS KIT v5.0

**Neo-Brutalismo Técnico + Gamut Accents**

Single Source of Truth para el ecosistema digital de Grupo MARTE / MSICCA.

---

## 📦 Paquete Incluye

| Archivo | Descripción |
|---------|-------------|
| `tailwind.config.basis.ts` | Configuración completa para Tailwind CSS v4 |
| `postcss.config.basis.js` | Configuración PostCSS para procesamiento |
| `BASIS_KIT_Design_Tokens.css` | Variables CSS (colores, spacing, tipografía) |
| `BASIS_KIT_Components.css` | Componentes standalone (sin Tailwind) |
| `BASIS_KIT_Design_Tokens.json` | Tokens en formato JSON para herramientas |

---

## 🚀 Inicio Rápido

### Opción 1: CSS Standalone

```html
<!-- Importar tokens y componentes -->
<link rel="stylesheet" href="BASIS_KIT_Design_Tokens.css">
<link rel="stylesheet" href="BASIS_KIT_Components.css">

<!-- Agregar fuentes -->
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Opción 2: Tailwind CSS Integration

```bash
# Copiar configuración
cp tailwind.config.basis.ts ./tailwind.config.ts
cp postcss.config.basis.js ./postcss.config.js
```

```css
/* En tu CSS global */
@import "tailwindcss";
@import "BASIS_KIT_Design_Tokens.css";
```

---

## 🎨 Características Principales

- **75+ Componentes** - Biblioteca completa con múltiples variantes
- **15 Propiedades** - Soporte para todo el ecosistema MARTE
- **Sistema Dual de Colores** - MSICCA con Primario + Secundario
- **Grid 8px** - Sistema de espaciado consistente
- **Patrón Diagonal** - Stripes a -21°, 8px spacing, 50% opacity
- **Sombras Brutales** - Hard shadows sin blur
- **Dark Mode** - Soporte nativo con variables CSS

---

## 📊 Módulos Nuevos v5.0

### Engineering Data
- Data Grid
- Code Block
- Status Timeline
- Stat Trend
- Gauge Meter
- Heatmap Grid

### Technical Charts
- Gantt Chart
- Sankey Diagram
- Candlestick Chart

### Process Control
- App Shell
- Diff Viewer
- Tree View

### Financial/ERP
- Waterfall Chart
- Bullet Graph
- Treemap
- Burn Rate
- Aging Heatmap

---

## 🎯 Brand Colors

### MSICCA (Dual Primary)
```css
--brand: #C93400;           /* Naranja Industrial */
--brand-secondary: #0095C9; /* Azul Técnico */
```

### Ecosistema (15 Propiedades)
| Plataforma | Color | Uso |
|------------|-------|-----|
| MSICCA | `#C93400` | Plataforma Principal |
| Visual | `#6366F1` | Inteligencia Visual |
| Dev | `#059669` | Portal de Desarrollo |
| NEXUS | `#2980B9` | Corporate Intelligence |
| OPERAND | `#27AE60` | Enterprise Resource Planning |
| VECTOR | `#3498DB` | Power Design Studio |
| CÓDEX | `#7F8C8D` | Enterprise Records |
| AXIS | `#E67E22` | Construction Control |
| SYNAPSE | `#8B5CF6` | Collaborative Network |
| CREADOR | `#8B5CF6` | Content Creator |
| SABIO | `#06B6D4` | Knowledge Base |
| ATLAS | `#EC4899` | Project Portfolio |
| BASIS Core | `#27AE60` | Auth & Admin |

---

## 🔧 Uso de Componentes

### Button
```html
<button class="basis-btn basis-btn-primary">Primary</button>
<button class="basis-btn basis-btn-secondary">Secondary</button>
<button class="basis-btn basis-btn-outline">Outline</button>
<button class="basis-btn basis-btn-ghost">Ghost</button>
```

### Card
```html
<div class="basis-card">
  <h4>Título</h4>
  <p>Contenido de la tarjeta</p>
</div>

<div class="basis-card basis-card-accent">
  Card con acento de marca
</div>

<div class="basis-card basis-card-stripes">
  Card con patrón diagonal
</div>
```

### Badge
```html
<span class="basis-badge basis-badge-success">Success</span>
<span class="basis-badge basis-badge-error">Error</span>
<span class="basis-badge basis-badge-warning">Warning</span>
<span class="basis-badge basis-badge-info">Info</span>
```

---

## 🌓 Dark Mode

```html
<!-- Agregar clase .dark al elemento html -->
<html class="dark">
  ...
</html>
```

Todos los componentes tienen variantes automáticas para dark mode.

---

## 📐 Sistema de Grid

```html
<!-- 8px Grid -->
<div class="basis-grid-2">2 columnas</div>
<div class="basis-grid-3">3 columnas</div>
<div class="basis-grid-4">4 columnas</div>
```

---

## 👥 Equipo

**MSICCA Development Team**  
**Grupo MARTE**

---

## 📄 Licencia

Propietario - Solo para uso interno del ecosistema MARTE.
