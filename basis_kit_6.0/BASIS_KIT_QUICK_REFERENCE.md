# BASIS KIT v6.0 - Quick Reference

## Sistema de Diseño Neo-Brutalista para Ecosistema MARTE/MSICCA

---

## Reglas Fundamentales

| Regla | Valor |
|-------|-------|
| Grid System | 8px |
| Border Radius | **NUNCA** (0) |
| Border Width | 2px |
| Shadow Offset | 4px 4px 0 |
| Pattern Angle | -21° |
| Font | Monospace (font-mono) |

---

## Variables CSS Principales

```css
:root {
  --brand: #C93400;           /* Color primario */
  --brand-secondary: #0095C9; /* Color secundario (opcional) */
  --brand-rgb: 201, 52, 0;    /* RGB para transparencias */
}
```

---

## Clases CSS Principales

### Botones
```html
<button class="basis-btn basis-btn-primary">Primary</button>
<button class="basis-btn basis-btn-outline">Outline</button>
<button class="basis-btn basis-btn-ghost">Ghost</button>
<button class="basis-btn basis-btn-danger">Danger</button>
```

### Cards
```html
<div class="basis-card">Contenido</div>
<div class="basis-card basis-card-static">Sin hover</div>
```

### Inputs
```html
<input class="basis-input" placeholder="Texto..." />
<input class="basis-input basis-input-error" /> <!-- Con error -->
```

### Badges
```html
<span class="basis-badge">Default</span>
<span class="basis-badge basis-badge-success">Success</span>
<span class="basis-badge basis-badge-warning">Warning</span>
```

---

## Paleta de Aplicaciones

| App | Color Primario | Color Secundario |
|-----|---------------|------------------|
| MSICCA | `#C93400` | `#0095C9` |
| SUINMACA | `#FB730D` | `#0073DD` |
| MARTE Group | `#017234` | `#007ECA` |
| NEXUS | `#2980B9` | - |
| OPERAND | `#27AE60` | - |
| VECTOR | `#3498DB` | - |
| SYNAPSE | `#8B5CF6` | - |

---

## Estructura de Archivos

```
basis-kit/
├── src/app/page.tsx          # Documentación completa
├── src/app/globals.css       # Estilos CSS
├── src/components/basis/     # Componentes React
├── tailwind.config.ts        # Config Tailwind
└── src/lib/basis-tokens.json # Design tokens
```

---

## Componentes Disponibles

### UI Básicos
- Button (6 variantes, 5 tamaños)
- Card (3 variantes)
- Input, Select, Textarea
- Badge, Chip, Avatar
- Progress, Skeleton

### Navegación
- Navbar, Sidebar
- Tabs, Breadcrumb
- Pagination, Stepper

### Feedback
- Alert (4 tipos)
- Toast
- Modal
- Tooltip

### Secciones
- Hero, Features, CTA
- Testimonials, Stats
- Pricing, Team, FAQ
- Footer, Contact

### Datos
- Table, DataGrid
- PriceTable
- ComparisonTable
- Charts (técnicos y financieros)

---

## Ejemplo Rápido

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="globals.css">
  <style>
    :root { --brand: #C93400; }
  </style>
</head>
<body>
  <nav class="basis-navbar">
    <div class="basis-navbar-brand">MI APP</div>
  </nav>
  
  <main class="p-8">
    <div class="basis-card">
      <h2 class="font-mono font-bold text-xl mb-4">Título</h2>
      <button class="basis-btn basis-btn-primary">Acción</button>
    </div>
  </main>
</body>
</html>
```

---

## Contacto

BASIS KIT v6.0 - Grupo MARTE / MSICCA
