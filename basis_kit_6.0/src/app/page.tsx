'use client';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BASIS KIT v6.0 - Interactive Documentation
 * Grupo MARTE Design System
 * Industrial Precision Design System - 75+ CSS Components | 40+ React Components
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useCallback } from 'react';
import { PriceTable, PricingToggle, type PricingPlan } from '@/components/basis';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface NavItem {
  id: string;
  label: string;
  children?: NavItem[];
}

interface Website {
  id: string;
  name: string;
  domain: string;
  color: string;
  description: string;
  secondaryColor?: string;
  hasDualColors?: boolean;
  // Colores adicionales según especificaciones del usuario
  apoyo?: string[];      // Colores de apoyo
  darker?: string;       // Variante oscura
  lighter?: string;      // Variante clara
}

interface Application {
  id: string;
  name: string;
  color: string;
  description: string;
}

type Brand = Website | Application;

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

const NAV_STRUCTURE: NavItem[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    children: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'installation', label: 'Installation' },
      { id: 'units', label: 'Units' },
    ]
  },
  {
    id: 'variables',
    label: 'Variables',
    children: [
      { id: 'colors', label: 'Colors' },
      { id: 'borders', label: 'Borders' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'typography-vars', label: 'Typography' },
    ]
  },
  {
    id: 'layout',
    label: 'Structure & Layout',
    children: [
      { id: 'page-structure', label: 'Page Structure' },
      { id: 'grid', label: 'Grid' },
      { id: 'flex', label: 'Flex' },
    ]
  },
  {
    id: 'website-sections',
    label: 'Website Sections',
    children: [
      { id: 'hero-section', label: 'Hero' },
      { id: 'features-section', label: 'Features' },
      { id: 'cta-section', label: 'CTA' },
      { id: 'testimonials-section', label: 'Testimonials' },
      { id: 'stats-section', label: 'Stats' },
      { id: 'about-section', label: 'About' },
      { id: 'pricing-section', label: 'Pricing' },
      { id: 'team-section', label: 'Team' },
      { id: 'faq-section', label: 'FAQ' },
      { id: 'bento-grid', label: 'Bento Grid' },
      { id: 'process-steps', label: 'Process Steps' },
      { id: 'comparison-table', label: 'Comparison' },
      { id: 'footer-section', label: 'Footer' },
      { id: 'social-media', label: 'Social Media' },
      { id: 'contact-info', label: 'Contact' },
    ]
  },
  {
    id: 'components',
    label: 'Components',
    children: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'cards', label: 'Cards' },
      { id: 'forms', label: 'Forms' },
      { id: 'typography', label: 'Typography' },
      { id: 'lists', label: 'Lists' },
      { id: 'images', label: 'Images' },
      { id: 'icons', label: 'Icons' },
      { id: 'badges', label: 'Badges & Chips' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'progress', label: 'Progress' },
      { id: 'skeleton', label: 'Skeleton' },
      { id: 'alerts', label: 'Alerts' },
      { id: 'table', label: 'Table' },
      { id: 'price-table', label: 'Price Table' },
      { id: 'toast', label: 'Toast' },
      { id: 'modal', label: 'Modal' },
      { id: 'dropdown', label: 'Dropdown' },
      { id: 'tooltip', label: 'Tooltip' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'accordion', label: 'Accordion' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'breadcrumb', label: 'Breadcrumb' },
      { id: 'stepper', label: 'Stepper' },
      { id: 'divider', label: 'Divider' },
      { id: 'nav-components', label: 'Navigation' },
      { id: 'search', label: 'Search' },
      { id: 'logo', label: 'Logo' },
      { id: 'menu', label: 'Menu' },
    ]
  },
  {
    id: 'engineering',
    label: 'Engineering Data',
    children: [
      { id: 'data-grid', label: 'Data Grid' },
      { id: 'code-block', label: 'Code Block' },
      { id: 'status-timeline', label: 'Status Timeline' },
      { id: 'stat-trend', label: 'Stat Trend' },
      { id: 'gauge-meter', label: 'Gauge Meter' },
      { id: 'heatmap-grid', label: 'Heatmap Grid' },
    ]
  },
  {
    id: 'technical-charts',
    label: 'Technical Charts',
    children: [
      { id: 'gantt-chart', label: 'Gantt Chart' },
      { id: 'sankey-diagram', label: 'Sankey Diagram' },
      { id: 'candlestick-chart', label: 'Candlestick' },
    ]
  },
  {
    id: 'process-control',
    label: 'Process Control',
    children: [
      { id: 'app-shell', label: 'App Shell' },
      { id: 'diff-viewer', label: 'Diff Viewer' },
      { id: 'tree-view', label: 'Tree View' },
    ]
  },
  {
    id: 'financial',
    label: 'Financial/ERP',
    children: [
      { id: 'waterfall-chart', label: 'Waterfall Chart' },
      { id: 'bullet-graph', label: 'Bullet Graph' },
      { id: 'treemap', label: 'Treemap' },
      { id: 'burn-rate', label: 'Burn Rate' },
      { id: 'aging-heatmap', label: 'Aging Heatmap' },
    ]
  },
  {
    id: 'utilities',
    label: 'Utilities',
    children: [
      { id: 'visibility', label: 'Visibility' },
      { id: 'spacing-utils', label: 'Spacing' },
      { id: 'sizing', label: 'Sizing' },
    ]
  },
  {
    id: 'changelog',
    label: 'Changelog',
    children: [
      { id: 'changelog-v6', label: 'v6.0' },
      { id: 'changelog-all', label: 'Version History' },
    ]
  },
];

const WEBSITES: Website[] = [
  { id: 'msicca', name: 'MSICCA', domain: 'msicca.com', color: '#C93400', secondaryColor: '#0095C9', description: 'Plataforma Principal', hasDualColors: true },
  { id: 'visual', name: 'MSICCA Visual', domain: 'visual.msicca.com', color: '#6366F1', description: 'Inteligencia Visual' },
  { id: 'dev', name: 'MSICCA Dev', domain: 'dev.msicca.com', color: '#00FFFF', description: 'Portal de Desarrollo', apoyo: ['#E34F26', '#F16529', '#F7DF1E', '#264DE4'] },
  { id: 'ing-marval', name: 'Ing. Marval', domain: 'ing.marval.blog', color: '#00FFFF', secondaryColor: '#F24100', description: 'Blog Tecnico', hasDualColors: true, darker: '#2A207C', apoyo: ['#FFD700'] },
  { id: 'marval', name: 'Marval Blog', domain: 'marval.blog', color: '#00FFFF', secondaryColor: '#F24100', description: 'Blog Personal', hasDualColors: true, darker: '#2A207C', apoyo: ['#FFD700'] },
  { id: 'suinmaca', name: 'SUINMACA', domain: 'suinmaca.com', color: '#FB730D', secondaryColor: '#0073DD', description: 'Gestion Suinicola', hasDualColors: true, darker: '#032040', lighter: '#BDBFC1' },
  { id: 'smilelovers', name: 'Smile Lovers', domain: 'smilelovers.ve', color: '#E20073', description: 'Salud Dental' },
  { id: 'marte-group', name: 'MARTE Group', domain: 'marte.group', color: '#017234', secondaryColor: '#007ECA', description: 'Marca Sombrilla', hasDualColors: true, apoyo: ['#78828B'] },
  { id: 'spuntini', name: 'Spuntini', domain: 'spuntini.ve', color: '#B91C1C', description: 'Gastronomia Italiana' },
];

const APPLICATIONS = [
  { id: 'nexus', name: 'NEXUS', color: '#2980B9', description: 'Corporate Intelligence Hub' },
  { id: 'operand', name: 'OPERAND', color: '#27AE60', description: 'Enterprise Resource Planning' },
  { id: 'vector', name: 'VECTOR', color: '#3498DB', description: 'Power Design Studio' },
  { id: 'codex', name: 'CODEX', color: '#7F8C8D', description: 'Enterprise Records Vault' },
  { id: 'axis', name: 'AXIS', color: '#E67E22', description: 'Construction Control Platform' },
  { id: 'synapse', name: 'SYNAPSE', color: '#8B5CF6', description: 'Collaborative Network' },
];

const ALL_BRANDS = [...WEBSITES, ...APPLICATIONS];

const TYPOGRAPHY_SCALE = [
  { name: 'text-9xl', size: '128px', usage: 'Display Hero' },
  { name: 'text-7xl', size: '72px', usage: 'H1 Display' },
  { name: 'text-5xl', size: '48px', usage: 'H2 Section' },
  { name: 'text-4xl', size: '36px', usage: 'H3 Subsection' },
  { name: 'text-3xl', size: '30px', usage: 'H4 Component' },
  { name: 'text-2xl', size: '24px', usage: 'H5 Card Title' },
  { name: 'text-xl', size: '20px', usage: 'H6 Label' },
  { name: 'text-base', size: '16px', usage: 'Body Primary' },
  { name: 'text-sm', size: '14px', usage: 'Body Secondary' },
  { name: 'text-xs', size: '12px', usage: 'Caption' },
];

const SPACING_TOKENS = [
  { name: 'spacing-1', value: '8px', description: 'Element tight' },
  { name: 'spacing-2', value: '16px', description: 'Element default' },
  { name: 'spacing-3', value: '24px', description: 'Component' },
  { name: 'spacing-4', value: '32px', description: 'Section small' },
  { name: 'spacing-6', value: '48px', description: 'Section medium' },
  { name: 'spacing-8', value: '64px', description: 'Section large' },
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : '0, 0, 0';
}

// Generate brand color palette - Respeta exactamente los colores especificados por el usuario
function getBrandColors(brand: { 
  id: string; 
  color: string; 
  secondaryColor?: string; 
  hasDualColors?: boolean;
  apoyo?: string[];
  darker?: string;
  lighter?: string;
}) {
  const primary = brand.color;
  const secondary = brand.secondaryColor || primary;
  
  // Generate lighter and darker variants (solo si no están especificados)
  const adjustColor = (hex: string, amount: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const brandName = brand.id.toUpperCase().replace(/-/g, ' ');
  const colors: { name: string; hex: string; rgb: string; label: string }[] = [];
  
  // Primary color
  colors.push({ name: 'Primary', hex: primary, rgb: hexToRgb(primary), label: 'Color Principal' });
  
  // Secondary color (si existe)
  if (brand.hasDualColors && brand.secondaryColor) {
    colors.push({ name: 'Secondary', hex: secondary, rgb: hexToRgb(secondary), label: 'Color Secundario' });
  }
  
  // Colores de apoyo (exactamente como los especificó el usuario)
  if (brand.apoyo && brand.apoyo.length > 0) {
    brand.apoyo.forEach((color, index) => {
      colors.push({ name: `Apoyo ${index + 1}`, hex: color, rgb: hexToRgb(color), label: 'Color de Apoyo' });
    });
  }
  
  // Darker (exactamente como lo especificó el usuario)
  if (brand.darker) {
    colors.push({ name: 'Darker', hex: brand.darker, rgb: hexToRgb(brand.darker), label: 'Variante Oscura' });
  }
  
  // Lighter (exactamente como lo especificó el usuario)
  if (brand.lighter) {
    colors.push({ name: 'Lighter', hex: brand.lighter, rgb: hexToRgb(brand.lighter), label: 'Variante Clara' });
  }
  
  // Si no hay colores adicionales, generar variantes automáticas
  if (!brand.darker && !brand.lighter && !brand.apoyo) {
    if (brand.hasDualColors) {
      colors.push(
        { name: 'Accent 1', hex: adjustColor(primary, 60), rgb: hexToRgb(adjustColor(primary, 60)), label: 'Acento Claro 1' },
        { name: 'Accent 2', hex: adjustColor(secondary, 60), rgb: hexToRgb(adjustColor(secondary, 60)), label: 'Acento Claro 2' },
        { name: 'Dark 1', hex: adjustColor(primary, -40), rgb: hexToRgb(adjustColor(primary, -40)), label: 'Oscuro 1' },
        { name: 'Dark 2', hex: adjustColor(secondary, -40), rgb: hexToRgb(adjustColor(secondary, -40)), label: 'Oscuro 2' }
      );
    } else {
      colors.push(
        { name: 'Light', hex: adjustColor(primary, 60), rgb: hexToRgb(adjustColor(primary, 60)), label: 'Claro' },
        { name: 'Dark', hex: adjustColor(primary, -40), rgb: hexToRgb(adjustColor(primary, -40)), label: 'Oscuro' }
      );
    }
  }
  
  return {
    name: brandName,
    hasDualPrimary: brand.hasDualColors || false,
    colors
  };
}

function CodeBlock({ code, language = 'html' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="relative group">
      <pre className="bg-neutral-900 text-neutral-100 p-4 overflow-x-auto text-sm font-mono border-2 border-white/20">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyCode}
        className="absolute top-2 right-2 px-2 py-1 text-xs font-mono bg-white/20 hover:bg-white/30 text-white transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

function ComponentSection({ title, description, children, code }: { title: string; description?: string; children: React.ReactNode; code?: string }) {
  return (
    <div className="mb-8">
      <h4 className="font-mono font-bold text-lg mb-2">{title}</h4>
      {description && <p className="text-sm opacity-70 mb-4">{description}</p>}
      <div className="basis-card p-6 mb-4">
        {children}
      </div>
      {code && <CodeBlock code={code} />}
    </div>
  );
}

// Mode selector for showing CSS / Tailwind / React code variants
type CodeMode = 'css' | 'tailwind' | 'react';

function ModeCodeBlock({ 
  modes 
}: { 
  modes: {
    css?: string;
    tailwind?: string;
    react?: string;
  };
}) {
  const [mode, setMode] = useState<CodeMode>('css');
  
  const availableModes = [
    { key: 'css' as const, label: 'CSS', available: !!modes.css },
    { key: 'tailwind' as const, label: 'Tailwind', available: !!modes.tailwind },
    { key: 'react' as const, label: 'React', available: !!modes.react },
  ].filter(m => m.available);

  const currentCode = modes[mode] || modes.css || '';
  
  return (
    <div className="relative group">
      {/* Mode Tabs */}
      <div className="flex gap-0 border-b-2 border-white/20 mb-0">
        {availableModes.map(m => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={"px-4 py-2 font-mono text-xs font-bold transition-colors " + (
              mode === m.key 
                ? 'bg-neutral-900 text-white border-t-2 border-l-2 border-r-2 border-white/20 -mb-[2px]' 
                : 'bg-neutral-800 text-white/60 hover:text-white hover:bg-neutral-700'
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      
      {/* Code Block */}
      <pre className="bg-neutral-900 text-neutral-100 p-4 overflow-x-auto text-sm font-mono border-2 border-white/20 border-t-0">
        <code>{currentCode}</code>
      </pre>
      
      {/* Copy Button */}
      <button
        onClick={() => navigator.clipboard.writeText(currentCode)}
        className="absolute top-10 right-2 px-2 py-1 text-xs font-mono bg-white/20 hover:bg-white/30 text-white transition-colors"
      >
        Copy
      </button>
      
      {/* Mode Indicator */}
      <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-mono bg-brand text-white uppercase">
        {mode}
      </span>
    </div>
  );
}

// Component section with multi-mode code support
function ComponentSectionModes({ 
  title, 
  description, 
  children, 
  modes 
}: { 
  title: string; 
  description?: string; 
  children: React.ReactNode; 
  modes: {
    css?: string;
    tailwind?: string;
    react?: string;
  };
}) {
  return (
    <div className="mb-8">
      <h4 className="font-mono font-bold text-lg mb-2">{title}</h4>
      {description && <p className="text-sm opacity-70 mb-4">{description}</p>}
      <div className="basis-card p-6 mb-4">
        {children}
      </div>
      <ModeCodeBlock modes={modes} />
    </div>
  );
}

// Pricing Toggle Demo Component - USES BASIS COMPONENTS
// Financial Strategy: LTV vs CAC | Anchoring effect | Transparency | Micro-copy incentive

function PricingToggleDemo() {
  const [isYearly, setIsYearly] = useState(false); // Default: Monthly (for anchoring effect)
  
  // Calculate yearly pricing (20% discount = 2 months free)
  const getYearlyPrice = (monthly: number) => Math.round(monthly * 12 * 0.8);
  const getYearlyMonthlyEquivalent = (monthly: number) => Math.round(getYearlyPrice(monthly) / 12);
  const getSavings = (monthly: number) => (monthly * 12) - getYearlyPrice(monthly);
  
  // Base pricing data
  const basePlans = [
    { 
      name: 'Basic', 
      monthlyPrice: 9,
      description: 'Perfect for getting started',
      features: ['5 Projects', '10GB Storage', 'Basic Support'],
      cta: 'Select Plan',
      popular: false
    },
    { 
      name: 'Pro', 
      monthlyPrice: 29,
      description: 'Best for growing teams',
      features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'API Access', 'Advanced Analytics'],
      cta: 'Select Plan',
      popular: true
    },
    { 
      name: 'Enterprise', 
      monthlyPrice: 99,
      description: 'For large organizations',
      features: ['Unlimited Everything', '1TB Storage', '24/7 Support', 'Custom Integrations'],
      cta: 'Contact Sales',
      popular: false
    },
  ];
  
  // Transform to PricingPlan format for PriceTable component
  const plans: PricingPlan[] = basePlans.map(plan => {
    const displayPrice = isYearly ? getYearlyMonthlyEquivalent(plan.monthlyPrice) : plan.monthlyPrice;
    const totalYearly = getYearlyPrice(plan.monthlyPrice);
    const savings = getSavings(plan.monthlyPrice);
    
    return {
      name: plan.name,
      description: plan.description,
      price: "$" + displayPrice,
      period: 'month',
      features: plan.features.map(f => ({ text: f, included: true })),
      cta: plan.cta,
      popular: plan.popular,
      yearlyPrice: isYearly ? ("$" + totalYearly + " billed annually") : undefined,
      yearlySavings: isYearly ? ("$" + savings) : undefined,
      billedAnnually: isYearly,
    };
  });
  
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Strategy Banner */}
      <div className="w-full p-4 bg-brand/5 border-2 border-brand/30 mb-2">
        <p className="text-sm font-mono">
          <strong className="text-brand">Pricing Strategy:</strong> Monthly shown first for anchoring effect. 
          Yearly shows equivalent monthly rate for direct comparison.
        </p>
      </div>
      
      {/* Toggle - USING COMPONENT */}
      <PricingToggle 
        isYearly={isYearly} 
        onToggle={setIsYearly}
        savingsText="SAVE 20%"
      />
      
      {/* Pricing Cards - USING PriceTable COMPONENT */}
      <PriceTable plans={plans} />
      
      {/* Decision Matrix Guide */}
      <div className="w-full mt-4 p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/10 dark:border-white/10">
        <h4 className="font-mono font-bold text-sm mb-3">Decision Matrix for Users</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 border border-current/10">
            <h5 className="font-mono font-bold text-brand mb-2">Monthly Plan</h5>
            <ul className="space-y-1 opacity-70">
              <li>Low commitment (Trial/Error)</li>
              <li>Higher total cost</li>
              <li>OpEx (Operating Expense)</li>
              <li>Best for: Freelancers, Startups</li>
            </ul>
          </div>
          <div className="p-3 border border-green-500/50 bg-green-500/5">
            <h5 className="font-mono font-bold text-green-600 dark:text-green-400 mb-2">Yearly Plan</h5>
            <ul className="space-y-1 opacity-70">
              <li>High commitment (Adoption)</li>
              <li>Lower total cost (20% off)</li>
              <li>One-time investment</li>
              <li>Best for: Enterprise, Stable teams</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Selected Plan Display */}
      <div className="text-center">
        <p className="font-mono text-sm">
          Current selection: <span className="font-bold text-brand">{isYearly ? 'Yearly (20% off)' : 'Monthly'}</span>
        </p>
      </div>
    </div>
  );
}

// Form Validation Demo Component
function FormValidationDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState<{email: boolean; password: boolean}>({email: false, password: false});
  
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 8;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValid && passwordValid) {
      alert('Form submitted successfully!');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <div>
        <label className="basis-form-label">Email</label>
        <input 
          type="email" 
          className={"basis-input " + (touched.email && !emailValid ? "basis-input-error" : "")}
          placeholder="email@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setTouched(t => ({...t, email: true}))}
        />
        {touched.email && !emailValid && (
          <p className="basis-form-error">Please enter a valid email address</p>
        )}
        {touched.email && emailValid && (
          <p className="text-xs text-green-500 mt-1">✓ Valid email</p>
        )}
      </div>
      
      <div>
        <label className="basis-form-label">Password</label>
        <input 
          type="password" 
          className={"basis-input " + (touched.password && !passwordValid ? "basis-input-error" : "")}
          placeholder="Min 8 characters"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => setTouched(t => ({...t, password: true}))}
        />
        {touched.password && !passwordValid && (
          <p className="basis-form-error">Password must be at least 8 characters</p>
        )}
        {touched.password && passwordValid && (
          <p className="text-xs text-green-500 mt-1">✓ Strong password</p>
        )}
      </div>
      
      <button 
        type="submit" 
        className="basis-btn basis-btn-primary w-full"
        disabled={!emailValid || !passwordValid}
      >
        Submit Form
      </button>
    </form>
  );
}

// Progress Animated Demo Component
function ProgressAnimatedDemo() {
  const [progress, setProgress] = useState(65);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const animateProgress = () => {
    setIsAnimating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsAnimating(false);
          return 100;
        }
        return p + 2;
      });
    }, 50);
  };
  
  return (
    <div className="space-y-4">
      <div className="basis-progress basis-progress-double">
        <div 
          className="basis-progress-bar transition-all duration-100" 
          style={{ width: progress + "%" }}
        ></div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm">{progress}%</span>
        <div className="flex gap-2">
          <button 
            className="basis-btn basis-btn-sm basis-btn-outline"
            onClick={() => setProgress(p => Math.max(0, p - 10))}
            disabled={isAnimating}
          >
            -10%
          </button>
          <button 
            className="basis-btn basis-btn-sm basis-btn-outline"
            onClick={() => setProgress(p => Math.min(100, p + 10))}
            disabled={isAnimating}
          >
            +10%
          </button>
          <button 
            className="basis-btn basis-btn-sm basis-btn-primary"
            onClick={animateProgress}
            disabled={isAnimating}
          >
            {isAnimating ? 'Loading...' : 'Animate'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Stepper Interactive Demo Component
function StepperInteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const steps = [
    { num: 1, label: 'Account', icon: '👤' },
    { num: 2, label: 'Profile', icon: '📝' },
    { num: 3, label: 'Settings', icon: '⚙️' },
    { num: 4, label: 'Complete', icon: '✓' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Stepper */}
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={"w-10 h-10 flex items-center justify-center border-2 font-mono font-bold transition-colors " + (
                currentStep > step.num 
                  ? 'bg-brand text-white border-brand' 
                  : currentStep === step.num
                    ? 'bg-brand/10 text-brand border-brand'
                    : 'bg-secondary dark:bg-white/5 border-foreground/20 dark:border-white/20'
              )}>
                {currentStep > step.num ? '✓' : step.icon}
              </div>
              <span className={"font-mono text-xs mt-2 transition-colors " + (
                currentStep === step.num ? 'text-brand font-bold' : 'opacity-60'
              )}>
                {step.label}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div className={"flex-1 h-0.5 mx-2 transition-colors " + (
                currentStep > step.num ? 'bg-brand' : 'bg-foreground/20 dark:bg-white/20'
              )}></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Step Content */}
      <div className="basis-card p-4">
        <h4 className="font-mono font-bold mb-2">Step {currentStep}: {steps[currentStep - 1].label}</h4>
        <p className="text-sm opacity-60 mb-4">
          {currentStep === 1 && 'Create your account credentials...'}
          {currentStep === 2 && 'Fill out your profile information...'}
          {currentStep === 3 && 'Configure your preferences...'}
          {currentStep === 4 && 'Review and complete your setup!'}
        </p>
        
        <div className="flex gap-2">
          <button 
            className="basis-btn basis-btn-outline"
            onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button 
            className="basis-btn basis-btn-primary"
            onClick={() => setCurrentStep(s => Math.min(totalSteps, s + 1))}
            disabled={currentStep === totalSteps}
          >
            {currentStep === totalSteps ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Chips Interactive Demo
function ChipsInteractiveDemo() {
  const [chips, setChips] = useState(['React', 'TypeScript', 'BASIS KIT', 'Tailwind']);
  
  const removeChip = (index: number) => {
    setChips(chips.filter((_, i) => i !== index));
  };
  
  const addChip = () => {
    const newChip = prompt('Enter tag name:');
    if (newChip && !chips.includes(newChip)) {
      setChips([...chips, newChip]);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, i) => (
          <span key={i} className="basis-chip basis-chip-removable">
            {chip}
            <button 
              className="basis-chip-remove"
              onClick={() => removeChip(i)}
            >
              ×
            </button>
          </span>
        ))}
        <button 
          onClick={addChip}
          className="px-2 py-1 text-xs font-mono border border-dashed border-current/30 hover:border-brand hover:text-brand transition-colors"
        >
          + Add Tag
        </button>
      </div>
      <p className="text-xs opacity-60">Click × to remove, click "Add Tag" to add new</p>
    </div>
  );
}

// Counter Interactive Demo
function CounterInteractiveDemo() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="flex items-center gap-4">
      <button 
        className="basis-btn basis-btn-outline"
        onClick={() => setCount(c => c - 1)}
      >
        −
      </button>
      <span className="font-mono text-3xl font-bold w-16 text-center">{count}</span>
      <button 
        className="basis-btn basis-btn-primary"
        onClick={() => setCount(c => c + 1)}
      >
        +
      </button>
      <button 
        className="basis-btn basis-btn-ghost text-xs"
        onClick={() => setCount(0)}
      >
        Reset
      </button>
    </div>
  );
}

// Engineering Data Grid Demo with sorting and filtering
function DataGridInteractiveDemo() {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  const rawData = [
    { id: 'ENG-001', name: 'Motor Controller A', status: 'Active', temp: 45, rpm: 2450, efficiency: 94.2 },
    { id: 'ENG-002', name: 'Sensor Array North', status: 'Warning', temp: 87, rpm: 0, efficiency: 78.5 },
    { id: 'ENG-003', name: 'Power Unit Main', status: 'Active', temp: 52, rpm: 1800, efficiency: 91.8 },
    { id: 'ENG-004', name: 'Control Valve B2', status: 'Offline', temp: 22, rpm: 0, efficiency: 0 },
    { id: 'ENG-005', name: 'Motor Controller B', status: 'Active', temp: 48, rpm: 2200, efficiency: 92.1 },
    { id: 'ENG-006', name: 'Sensor Array South', status: 'Active', temp: 44, rpm: 0, efficiency: 95.3 },
    { id: 'ENG-007', name: 'Cooling System', status: 'Warning', temp: 91, rpm: 1200, efficiency: 67.2 },
    { id: 'ENG-008', name: 'Backup Generator', status: 'Standby', temp: 25, rpm: 0, efficiency: 0 },
  ];
  
  let data = [...rawData];
  
  // Filter
  if (filterStatus) {
    data = data.filter(d => d.status === filterStatus);
  }
  
  // Sort
  if (sortField) {
    data.sort((a, b) => {
      const aVal = a[sortField as keyof typeof a];
      const bVal = b[sortField as keyof typeof b];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }
  
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };
  
  const statusColors: Record<string, string> = {
    'Active': 'text-green-600 dark:text-green-400',
    'Warning': 'text-yellow-600 dark:text-yellow-400',
    'Offline': 'text-red-600 dark:text-red-400',
    'Standby': 'text-blue-600 dark:text-blue-400',
  };
  
  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex gap-2 flex-wrap">
        <button 
          onClick={() => setFilterStatus(null)}
          className={"px-3 py-1 text-xs font-mono border-2 transition-colors " + (!filterStatus ? 'bg-brand text-white border-brand' : 'border-foreground/20 dark:border-white/20 hover:border-brand')}
        >
          All
        </button>
        {['Active', 'Warning', 'Offline', 'Standby'].map(status => (
          <button 
            key={status}
            onClick={() => setFilterStatus(filterStatus === status ? null : status)}
            className={"px-3 py-1 text-xs font-mono border-2 transition-colors " + (filterStatus === status ? 'bg-brand text-white border-brand' : 'border-foreground/20 dark:border-white/20 hover:border-brand')}
          >
            {status}
          </button>
        ))}
      </div>
      
      {/* Data Grid */}
      <div className="overflow-x-auto border-2 border-foreground/20 dark:border-white/20">
        <table className="w-full text-sm">
          <thead className="bg-foreground/5 dark:bg-white/5">
            <tr>
              {[
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Component' },
                { key: 'status', label: 'Status' },
                { key: 'temp', label: 'Temp (°C)' },
                { key: 'rpm', label: 'RPM' },
                { key: 'efficiency', label: 'Efficiency' },
              ].map(col => (
                <th 
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="p-3 text-left font-mono font-bold cursor-pointer hover:bg-foreground/10 dark:hover:bg-white/10 select-none"
                >
                  {col.label}
                  {sortField === col.key && (
                    <span className="ml-2">{sortDir === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className={"border-t border-foreground/10 dark:border-white/10 " + (i % 2 === 0 ? '' : 'bg-foreground/5 dark:bg-white/5')}>
                <td className="p-3 font-mono text-xs">{row.id}</td>
                <td className="p-3">{row.name}</td>
                <td className={"p-3 font-mono text-xs font-bold " + statusColors[row.status]}>{row.status}</td>
                <td className={"p-3 font-mono " + (row.temp > 80 ? 'text-red-600 dark:text-red-400 font-bold' : '')}>{row.temp}°C</td>
                <td className="p-3 font-mono">{row.rpm.toLocaleString()}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-foreground/10 dark:bg-white/10">
                      <div 
                        className={"h-full " + (row.efficiency > 90 ? 'bg-green-500' : row.efficiency > 70 ? 'bg-yellow-500' : 'bg-red-500')}
                        style={{ width: row.efficiency + "%" }}
                      />
                    </div>
                    <span className="font-mono text-xs">{row.efficiency}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="text-xs opacity-60 font-mono">
        Showing {data.length} of {rawData.length} records • Click headers to sort • Click status buttons to filter
      </div>
    </div>
  );
}

// Gauge Meter Interactive Demo
function GaugeMeterInteractiveDemo() {
  const [value, setValue] = useState(68);
  
  const getColor = (v: number) => {
    if (v < 30) return '#22C55E'; // green
    if (v < 70) return '#C93400'; // brand
    return '#EF4444'; // red
  };
  
  const getLabel = (v: number) => {
    if (v < 30) return 'LOW';
    if (v < 70) return 'OPTIMAL';
    if (v < 90) return 'HIGH';
    return 'CRITICAL';
  };
  
  const rotation = (value / 100) * 180 - 90;
  const color = getColor(value);
  const label = getLabel(value);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="relative w-48 h-24">
          {/* Background arc */}
          <div className="absolute inset-0 border-[12px] border-foreground/10 dark:border-white/10 rounded-t-full" style={{ borderBottom: 'none' }} />
          {/* Value arc */}
          <div 
            className="absolute inset-0 border-[12px] rounded-t-full origin-bottom transition-all duration-300"
            style={{
              borderBottom: 'none',
              borderColor: color,
              transform: "rotate(" + rotation + "deg)",
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
            }}
          />
          {/* Center display */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <div className="font-mono text-3xl font-bold" style={{ color }}>{value}%</div>
            <div className="font-mono text-xs opacity-60">{label}</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 justify-center">
        <button 
          onClick={() => setValue(v => Math.max(0, v - 10))}
          className="basis-btn basis-btn-sm basis-btn-outline"
        >
          -10
        </button>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="w-32"
        />
        <button 
          onClick={() => setValue(v => Math.min(100, v + 10))}
          className="basis-btn basis-btn-sm basis-btn-outline"
        >
          +10
        </button>
      </div>
      
      <div className="text-xs opacity-60 text-center font-mono">
        Adjust slider or buttons to change gauge value
      </div>
    </div>
  );
}

// Heatmap Grid Interactive Demo
function HeatmapGridInteractiveDemo() {
  const [hoveredCell, setHoveredCell] = useState<{day: string, hour: number, value: number} | null>(null);
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({length: 24}, (_, i) => i);
  
  // Generate semi-random data
  const getValue = (day: number, hour: number) => {
    const base = Math.sin((hour - 6) * Math.PI / 12) * 50 + 50;
    const noise = Math.random() * 30;
    const weekend = day >= 5 ? -30 : 0;
    return Math.max(0, Math.min(100, base + noise + weekend));
  };
  
  const getColor = (value: number) => {
    if (value < 20) return 'bg-foreground/5 dark:bg-white/5';
    if (value < 40) return 'bg-green-200 dark:bg-green-900';
    if (value < 60) return 'bg-green-300 dark:bg-green-700';
    if (value < 80) return 'bg-green-400 dark:bg-green-500';
    return 'bg-green-500 dark:bg-green-400';
  };
  
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="inline-block">
          {/* Hour labels */}
          <div className="flex items-center mb-1">
            <div className="w-10" />
            {hours.filter(h => h % 4 === 0).map(h => (
              <div key={h} className="w-3 text-[8px] font-mono opacity-40 text-center" style={{ marginLeft: h === 0 ? 0 : '8px' }}>
                {h}
              </div>
            ))}
          </div>
          
          {/* Grid */}
          {days.map((day, dayIdx) => (
            <div key={day} className="flex items-center gap-0.5">
              <span className="font-mono text-xs w-10 text-foreground/60 dark:text-white/60">{day}</span>
              <div className="flex gap-0.5">
                {hours.map(hour => {
                  const value = Math.round(getValue(dayIdx, hour));
                  return (
                    <div 
                      key={hour}
                      className={"w-3 h-3 " + getColor(value) + " cursor-pointer hover:ring-2 hover:ring-brand transition-all"}
                      onMouseEnter={() => setHoveredCell({ day, hour, value })}
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tooltip / Info */}
      <div className="flex items-center justify-between">
        <div className="h-8 p-2 bg-foreground/5 dark:bg-white/5 border border-foreground/20 dark:border-white/20 font-mono text-xs">
          {hoveredCell ? (
            <span>
              <strong>{hoveredCell.day}</strong> at {hoveredCell.hour}:00 — 
              <span className="ml-2 text-brand font-bold">{hoveredCell.value}% activity</span>
            </span>
          ) : (
            <span className="opacity-50">Hover over cells to see values</span>
          )}
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs opacity-60">Less</span>
          {['bg-foreground/5 dark:bg-white/5', 'bg-green-200 dark:bg-green-900', 'bg-green-300 dark:bg-green-700', 'bg-green-400 dark:bg-green-500', 'bg-green-500 dark:bg-green-400'].map((color, i) => (
            <div key={i} className={"w-3 h-3 " + color} />
          ))}
          <span className="font-mono text-xs opacity-60">More</span>
        </div>
      </div>
    </div>
  );
}

// Code Block Interactive Demo with Copy Functionality
function CodeBlockInteractiveDemo() {
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState<'javascript' | 'python' | 'css'>('javascript');
  
  const codeExamples = {
    javascript: `// Engineering Configuration
const config = {
  motorSpeed: 2450,    // RPM
  temperature: 87.3,   // Celsius
  voltage: 480,        // Volts
  status: 'active'
};

// Start monitoring
function startMonitoring() {
  setInterval(() => {
    console.log(\`Motor: \${config.motorSpeed} RPM\`);
  }, 1000);
}`,
    python: `# Engineering Configuration
config = {
    "motor_speed": 2450,    # RPM
    "temperature": 87.3,    # Celsius
    "voltage": 480,         # Volts
    "status": "active"
}

# Start monitoring
def start_monitoring():
    import time
    while True:
        print(f"Motor: {config['motor_speed']} RPM")
        time.sleep(1)`,
    css: "/* Engineering Dashboard Styles */\n" +
    ".basis-gauge {\n" +
    "  --gauge-value: 68;\n" +
    "  --gauge-max: 100;\n" +
    "  \n" +
    "  position: relative;\n" +
    "  width: 200px;\n" +
    "  height: 100px;\n" +
    "  overflow: hidden;\n" +
    "}\n" +
    "\n" +
    ".basis-gauge-track {\n" +
    "  border: 8px solid var(--color-muted);\n" +
    "  border-radius: 100px 100px 0 0;\n" +
    "  border-bottom: none;\n" +
    "}"
  };
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExamples[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="space-y-4">
      {/* Language Tabs */}
      <div className="flex gap-1 border-b border-foreground/20 dark:border-white/20">
        {(['javascript', 'python', 'css'] as const).map(lang => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            className={"px-4 py-2 font-mono text-xs uppercase transition-colors " + (
              activeLang === lang
                ? 'bg-neutral-800 text-white border-b-2 border-brand'
                : 'text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white'
            )}
          >
            {lang}
          </button>
        ))}
      </div>
      
      {/* Code Block */}
      <div className="relative bg-neutral-900 border-2 border-foreground/20 dark:border-white/20">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={"absolute top-2 right-2 px-3 py-1 text-xs font-mono border transition-all " + (
            copied
              ? 'bg-green-500 text-white border-green-500'
              : 'bg-transparent text-foreground/60 dark:text-white/60 border-foreground/20 dark:border-white/20 hover:border-brand hover:text-brand'
          )}
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
        
        {/* Code Content */}
        <div className="p-4 font-mono text-sm overflow-x-auto">
          <div className="flex gap-4">
            <div className="text-white/30 select-none text-right" style={{minWidth: '2rem'}}>
              {codeExamples[activeLang].split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <pre className={"" + (
              activeLang === 'javascript' ? 'text-green-400' :
              activeLang === 'python' ? 'text-blue-400' :
              'text-purple-400'
            )}>
              {codeExamples[activeLang]}
            </pre>
          </div>
        </div>
      </div>
      
      <p className="text-xs opacity-60 font-mono">Click language tabs to switch • Click copy button to copy code</p>
    </div>
  );
}

// Status Timeline Interactive Demo
function StatusTimelineInteractiveDemo() {
  const [activeStep, setActiveStep] = useState(2);
  
  const steps = [
    { id: 1, title: 'Design Phase', time: 'Completed 2 days ago', desc: 'Initial specifications and wireframes', status: 'complete' },
    { id: 2, title: 'Development', time: 'Completed yesterday', desc: 'Core module implementation', status: 'complete' },
    { id: 3, title: 'Testing', time: 'In Progress', desc: 'QA validation and bug fixes', status: 'active' },
    { id: 4, title: 'Review', time: 'Pending', desc: 'Code review and optimization', status: 'pending' },
    { id: 5, title: 'Deployment', time: 'Scheduled', desc: 'Production rollout', status: 'pending' },
  ];
  
  return (
    <div className="space-y-4">
      <div className="basis-timeline relative pl-8">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-foreground/20 dark:bg-white/20" />
        {steps.map((step, i) => (
          <div 
            key={step.id} 
            className={`relative pb-6 last:pb-0 cursor-pointer group`}
            onClick={() => setActiveStep(step.id)}
          >
            <div className={"absolute left-[-22px] top-1 w-4 h-4 rounded-full border-2 transition-all " + (
              step.status === 'complete'
                ? 'bg-green-500 border-green-500'
                : step.status === 'active'
                  ? 'bg-brand border-brand ring-2 ring-brand/30 ring-offset-2'
                  : 'bg-neutral-300 dark:bg-neutral-800 border-foreground/30 dark:border-white/30 group-hover:border-brand'
            )} />
            <div className={"pl-4 transition-all " + (activeStep === step.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100')}>
              <div className="flex items-center gap-2">
                <span className={"font-mono font-bold " + (activeStep === step.id ? 'text-brand' : '')}>{step.title}</span>
                <span className="text-xs opacity-50">{step.time}</span>
                {step.status === 'active' && (
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-brand/20 text-brand animate-pulse">ACTIVE</span>
                )}
              </div>
              <p className="text-sm opacity-60 mt-1">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="basis-card p-4 bg-brand/5 border-2 border-brand/30">
        <p className="font-mono text-sm">
          <strong>Selected Step:</strong> {steps.find(s => s.id === activeStep)?.title}
        </p>
        <p className="text-xs opacity-60 mt-1">Click any timeline item to select it</p>
      </div>
    </div>
  );
}

// Stat Trend Interactive Demo
function StatTrendInteractiveDemo() {
  const [stats, setStats] = useState([
    { id: 'efficiency', label: 'EFFICIENCY', value: 24.5, trend: 'up', history: [20, 22, 21, 23, 24, 24.5] },
    { id: 'latency', label: 'LATENCY', value: 12.3, trend: 'down', history: [15, 14, 13, 13, 12, 12.3] },
    { id: 'throughput', label: 'THROUGHPUT', value: 156, trend: 'up', history: [120, 130, 140, 145, 150, 156] },
  ]);
  
  const refreshStats = () => {
    setStats(prev => prev.map(stat => {
      const change = (Math.random() - 0.5) * 10;
      const newValue = Math.max(0, stat.value + change);
      const newHistory = [...stat.history.slice(1), newValue];
      return {
        ...stat,
        value: newValue,
        trend: newValue > stat.history[stat.history.length - 2] ? 'up' : 'down',
        history: newHistory
      };
    }));
  };
  
  const generateSparkline = (history: number[], trend: 'up' | 'down') => {
    const max = Math.max(...history);
    const min = Math.min(...history);
    const range = max - min || 1;
    const points = history.map((v, i) => `${i * 10},${30 - ((v - min) / range) * 25}`).join(' ');
    
    return (
      <svg viewBox="0 0 60 35" className="w-16 h-8">
        <polyline 
          fill="none" 
          stroke={trend === 'up' ? '#22C55E' : '#EF4444'} 
          strokeWidth="2" 
          opacity="0.3"
          points={points}
        />
      </svg>
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {stats.map(stat => (
          <div key={stat.id} className="basis-card p-4 transition-all hover:border-brand">
            <div className="text-xs opacity-50 mb-2 font-mono">{stat.label}</div>
            <div className="flex items-end gap-2">
              <span className={"text-2xl font-mono font-bold " + (
                stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              )}>
                {stat.trend === 'up' ? '+' : '-'}{stat.value.toFixed(1)}
                {stat.id === 'throughput' ? 'K' : stat.id === 'latency' ? 'ms' : '%'}
              </span>
              {generateSparkline(stat.history, stat.trend)}
            </div>
            <div className="mt-2 flex gap-0.5">
              {stat.history.map((h, i) => (
                <div 
                  key={i} 
                  className={"flex-1 h-1 " + (
                    stat.trend === 'up' ? 'bg-green-500/30' : 'bg-red-500/30'
                  )}
                  style={{ opacity: 0.3 + (i / stat.history.length) * 0.7 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={refreshStats}
          className="basis-btn basis-btn-primary"
        >
          ⟳ Simulate Data Update
        </button>
      </div>
      
      <p className="text-xs opacity-60 text-center font-mono">Click button to simulate real-time data changes</p>
    </div>
  );
}

// Data Grid Pagination Demo
function DataGridPaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  const allData = [
    { id: 'ENG-001', name: 'Motor Controller A', status: 'Active', temp: 45, rpm: 2450 },
    { id: 'ENG-002', name: 'Sensor Array North', status: 'Warning', temp: 87, rpm: 0 },
    { id: 'ENG-003', name: 'Power Unit Main', status: 'Active', temp: 52, rpm: 1800 },
    { id: 'ENG-004', name: 'Control Valve B2', status: 'Offline', temp: 22, rpm: 0 },
    { id: 'ENG-005', name: 'Motor Controller B', status: 'Active', temp: 48, rpm: 2200 },
    { id: 'ENG-006', name: 'Sensor Array South', status: 'Active', temp: 44, rpm: 0 },
    { id: 'ENG-007', name: 'Cooling System', status: 'Warning', temp: 91, rpm: 1200 },
    { id: 'ENG-008', name: 'Backup Generator', status: 'Standby', temp: 25, rpm: 0 },
    { id: 'ENG-009', name: 'Hydraulic Pump', status: 'Active', temp: 58, rpm: 1500 },
    { id: 'ENG-010', name: 'Exhaust Fan 1', status: 'Active', temp: 42, rpm: 900 },
    { id: 'ENG-011', name: 'Exhaust Fan 2', status: 'Offline', temp: 20, rpm: 0 },
    { id: 'ENG-012', name: 'Conveyor Belt', status: 'Active', temp: 35, rpm: 60 },
  ];
  
  const totalPages = Math.ceil(allData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const pageData = allData.slice(startIndex, startIndex + rowsPerPage);
  
  const toggleRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };
  
  const toggleAll = () => {
    if (selectedRows.length === pageData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(pageData.map(r => r.id));
    }
  };
  
  const statusColors: Record<string, string> = {
    'Active': 'text-green-600 dark:text-green-400',
    'Warning': 'text-yellow-600 dark:text-yellow-400',
    'Offline': 'text-red-600 dark:text-red-400',
    'Standby': 'text-blue-600 dark:text-blue-400',
  };
  
  return (
    <div className="space-y-4">
      {/* Data Grid */}
      <div className="overflow-x-auto border-2 border-foreground/20 dark:border-white/20">
        <table className="w-full text-sm">
          <thead className="bg-foreground/5 dark:bg-white/5">
            <tr>
              <th className="p-3 text-left">
                <input 
                  type="checkbox" 
                  checked={selectedRows.length === pageData.length && pageData.length > 0}
                  onChange={toggleAll}
                  className="w-4 h-4"
                />
              </th>
              <th className="p-3 text-left font-mono font-bold">ID</th>
              <th className="p-3 text-left font-mono font-bold">Component</th>
              <th className="p-3 text-left font-mono font-bold">Status</th>
              <th className="p-3 text-left font-mono font-bold">Temp</th>
              <th className="p-3 text-left font-mono font-bold">RPM</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr 
                key={row.id} 
                className={"border-t border-foreground/10 dark:border-white/10 cursor-pointer transition-colors " + (
                  selectedRows.includes(row.id)
                    ? 'bg-brand/10'
                    : i % 2 === 0 ? '' : 'bg-foreground/5 dark:bg-white/5'
                )}
                onClick={() => toggleRow(row.id)}
              >
                <td className="p-3">
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleRow(row.id)}
                    className="w-4 h-4"
                  />
                </td>
                <td className="p-3 font-mono text-xs">{row.id}</td>
                <td className="p-3">{row.name}</td>
                <td className={"p-3 font-mono text-xs font-bold " + statusColors[row.status]}>{row.status}</td>
                <td className={"p-3 font-mono " + (row.temp > 80 ? 'text-red-600 dark:text-red-400 font-bold' : '')}>{row.temp}°C</td>
                <td className="p-3 font-mono">{row.rpm.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono opacity-60">Rows per page:</span>
          <select 
            value={rowsPerPage}
            onChange={e => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="px-2 py-1 text-xs font-mono border border-current/20 bg-transparent"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono opacity-60">
            {startIndex + 1}-{Math.min(startIndex + rowsPerPage, allData.length)} of {allData.length}
          </span>
          
          <div className="flex gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 text-xs font-mono border border-current/20 disabled:opacity-30"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={"px-2 py-1 text-xs font-mono border " + (
                  currentPage === page
                    ? 'bg-brand text-white border-brand'
                    : 'border-current/20 hover:border-brand'
                )}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 text-xs font-mono border border-current/20 disabled:opacity-30"
            >
              ›
            </button>
          </div>
        </div>
      </div>
      
      {selectedRows.length > 0 && (
        <div className="basis-card p-2 bg-brand/5 border-2 border-brand/30">
          <p className="text-xs font-mono">
            <strong>{selectedRows.length}</strong> row(s) selected: {selectedRows.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}

// Multi-Gauge Dashboard Demo
function MultiGaugeDashboardDemo() {
  const [gauges, setGauges] = useState([
    { id: 'cpu', label: 'CPU Load', value: 68, unit: '%', warning: 80, critical: 95 },
    { id: 'memory', label: 'Memory', value: 45, unit: '%', warning: 75, critical: 90 },
    { id: 'network', label: 'Network I/O', value: 82, unit: '%', warning: 70, critical: 85 },
    { id: 'disk', label: 'Disk Usage', value: 34, unit: '%', warning: 80, critical: 95 },
  ]);
  
  const getColor = (value: number, warning: number, critical: number) => {
    if (value >= critical) return '#EF4444';
    if (value >= warning) return '#F59E0B';
    return '#22C55E';
  };
  
  const getLabel = (value: number, warning: number, critical: number) => {
    if (value >= critical) return 'CRITICAL';
    if (value >= warning) return 'WARNING';
    return 'NORMAL';
  };
  
  const randomize = () => {
    setGauges(prev => prev.map(g => ({
      ...g,
      value: Math.round(Math.random() * 100)
    })));
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {gauges.map(gauge => {
          const rotation = (gauge.value / 100) * 180 - 90;
          const color = getColor(gauge.value, gauge.warning, gauge.critical);
          const label = getLabel(gauge.value, gauge.warning, gauge.critical);
          
          return (
            <div key={gauge.id} className="basis-card p-4 text-center">
              <div className="text-xs opacity-50 mb-2 font-mono">{gauge.label}</div>
              <div className="relative w-24 h-12 mx-auto">
                <div className="absolute inset-0 border-6 border-foreground/10 dark:border-white/10 rounded-t-full" style={{ borderBottom: 'none' }} />
                <div 
                  className="absolute inset-0 border-6 rounded-t-full origin-bottom transition-all duration-500"
                  style={{
                    borderBottom: 'none',
                    borderColor: color,
                    transform: "rotate(" + rotation + "deg)",
                    clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
                  }}
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-lg font-bold" style={{ color }}>
                  {gauge.value}{gauge.unit}
                </div>
              </div>
              <div className="mt-2 font-mono text-[10px]" style={{ color }}>{label}</div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center">
        <button onClick={randomize} className="basis-btn basis-btn-primary basis-btn-sm">
          ⟳ Randomize Values
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function Page() {
  const [brand, setBrand] = useState('msicca');
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState('introduction');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['getting-started', 'layout']));
  const [activeTab, setActiveTab] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState<number | null>(0);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [showDropdown, setShowDropdown] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [hoverTooltip, setHoverTooltip] = useState<string | null>(null);
  
  const current = ALL_BRANDS.find(b => b.id === brand) || ALL_BRANDS[0];

  // Toggle sidebar section expand/collapse
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  // Auto-expand parent section when child is active (using callback pattern)
  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    // Find and expand parent section
    const parentSection = NAV_STRUCTURE.find(s => 
      s.children?.some(c => c.id === sectionId)
    );
    if (parentSection) {
      setExpandedSections(prev => {
        if (!prev.has(parentSection.id)) {
          return new Set([...prev, parentSection.id]);
        }
        return prev;
      });
    }
  }, []);

  const showToastDemo = (type: 'success' | 'error' | 'warning' | 'info') => {
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const renderContent = () => {
    switch (activeSection) {
      // ─────────────────────────────────────────────────────────────────────
      // GETTING STARTED
      // ─────────────────────────────────────────────────────────────────────
      case 'introduction':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="font-mono text-3xl font-bold mb-4">Introduction</h2>
              <p className="basis-paragraph-lg mb-6">
                BASIS KIT is a Neo-Brutalist Design System built for Grupo MARTE ecosystem. 
                It provides a comprehensive set of components, design tokens, and utilities 
                for building consistent, industrial-strength interfaces.
              </p>
            </div>
            
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Design Philosophy</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border border-current/20">
                  <h4 className="font-mono font-bold text-brand mb-2">Industrial Precision</h4>
                  <p className="text-sm opacity-70">8px grid system with mathematical consistency across all components.</p>
                </div>
                <div className="p-4 border border-current/20">
                  <h4 className="font-mono font-bold text-brand mb-2">Brutal Aesthetics</h4>
                  <p className="text-sm opacity-70">Hard shadows, solid borders, no rounded corners. Pure, unapologetic design.</p>
                </div>
                <div className="p-4 border border-current/20">
                  <h4 className="font-mono font-bold text-brand mb-2">Dual Identity</h4>
                  <p className="text-sm opacity-70">MSICCA's dual primary color system for flexible brand expression.</p>
                </div>
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Key Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-brand text-white flex items-center justify-center font-mono text-xs flex-shrink-0">1</span>
                  <span><strong className="font-mono">75+ Components</strong> - Complete UI library with Engineering Data, Technical Charts, Process Control & Financial/ERP modules</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-brand text-white flex items-center justify-center font-mono text-xs flex-shrink-0">2</span>
                  <span><strong className="font-mono">8px Grid System</strong> - Consistent spacing and alignment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-brand text-white flex items-center justify-center font-mono text-xs flex-shrink-0">3</span>
                  <span><strong className="font-mono">Diagonal Pattern</strong> - Signature stripes at -21 degrees</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-brand text-white flex items-center justify-center font-mono text-xs flex-shrink-0">4</span>
                  <span><strong className="font-mono">Dark Mode</strong> - Built-in theme switching</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-brand text-white flex items-center justify-center font-mono text-xs flex-shrink-0">5</span>
                  <span><strong className="font-mono">Multi-brand Support</strong> - Easy theming for ecosystem</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'installation':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Installation</h2>
            
            <div className="basis-card p-6 bg-brand/10 border-2 border-brand">
              <h3 className="font-mono font-bold text-xl mb-2">Three Integration Modes</h3>
              <p className="text-sm opacity-80">
                BASIS KIT v6.0 can be used in three different ways depending on your project needs and tech stack.
                Choose the mode that best fits your workflow.
              </p>
            </div>

            {/* Mode A: CSS-only */}
            <div className="basis-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-brand text-white font-mono text-xs font-bold">MODE A</span>
                <h3 className="font-mono font-bold">CSS-only (Framework Agnostic)</h3>
              </div>
              <p className="text-sm opacity-70 mb-4">
                Use the compiled CSS file directly. Works with any framework: HTML, PHP, Laravel, Django, WordPress, etc.
              </p>
              <CodeBlock code={`<!-- 1. Include the CSS file -->
<link rel="stylesheet" href="basis-kit.css" />

<!-- 2. Use component classes directly -->
<button class="basis-btn basis-btn-primary shadow-brutal">
  Primary Button
</button>

<div class="basis-card">
  <h3 class="font-mono font-bold">Card Title</h3>
  <p class="text-sm opacity-70">Card content here</p>
</div>

<!-- 3. Brand color modules -->
<div class="module-nexus">
  <button class="basis-btn basis-btn-primary">NEXUS Button</button>
</div>`} />
              <div className="mt-4 p-3 bg-secondary dark:bg-white/5 border border-current/20">
                <p className="font-mono text-xs"><strong>Best for:</strong> Static sites, WordPress, Laravel, legacy projects</p>
              </div>
            </div>

            {/* Mode B: Tailwind */}
            <div className="basis-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-brand text-white font-mono text-xs font-bold">MODE B</span>
                <h3 className="font-mono font-bold">Tailwind CSS Integration</h3>
              </div>
              <p className="text-sm opacity-70 mb-4">
                Integrate with Tailwind CSS for utility-first development with BASIS KIT design tokens.
              </p>
              <CodeBlock code={`# 1. Install dependencies (with Bun)
bun add -d tailwindcss postcss autoprefixer

# Or with npm
npm install -D tailwindcss postcss autoprefixer`} />
              <CodeBlock code={`// 2. tailwind.config.ts - Copy tailwind.config.basis.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--brand)",
          secondary: "var(--brand-secondary)",
        },
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "brutal-sm": "2px 2px 0 0 currentColor",
        "brutal": "4px 4px 0 0 currentColor",
        "brutal-lg": "6px 6px 0 0 currentColor",
        "brutal-xl": "8px 8px 0 0 currentColor",
      },
    },
  },
};

export default config;`} />
              <CodeBlock code={`// 3. postcss.config.js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

module.exports = config;`} />
              <CodeBlock code={`/* 4. globals.css - Import BASIS KIT */
@import 'tailwindcss';
@import 'basis-kit/globals.css';  /* Design tokens + components */

/* Or import separately */
@import 'basis-kit/design-tokens.css';
@import 'basis-kit/components.css';`} />
              <div className="mt-4 p-3 bg-secondary dark:bg-white/5 border border-current/20">
                <p className="font-mono text-xs"><strong>Best for:</strong> Next.js, Remix, Astro, Vite projects with Tailwind</p>
              </div>
            </div>

            {/* Mode C: React */}
            <div className="basis-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-brand text-white font-mono text-xs font-bold">MODE C</span>
                <h3 className="font-mono font-bold">React Components (New in v6.0)</h3>
              </div>
              <p className="text-sm opacity-70 mb-4">
                Use typed React components that wrap the CSS classes for superior Developer Experience.
                Includes TypeScript types, forwardRef support, and compound components.
              </p>
              <CodeBlock code={`// 1. Install dependencies
bun add @marte/basis-kit
# or
npm install @marte/basis-kit`} />
              <CodeBlock code={`// 2. Import components
import {
  Button, Card, Badge, Alert,
  Input, Select, Checkbox,
  Modal, Toast, Dropdown,
  Tabs, Accordion, Stepper,
  Hero, CTA, Features,
  Navbar, Sidebar, Footer,
  type ButtonProps, type CardProps,
} from '@marte/basis';

// 3. Use with TypeScript props
<Button variant="primary" shadow="lg" size="md">
  Get Started
</Button>

// Card with compound components
<Card variant="stripes" shadow="lg" hoverable>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Optional description</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Main content...</p>
  </Card.Content>
  <Card.Footer>
    <Button size="sm">Action</Button>
  </Card.Footer>
</Card>

// Form with validation
<Input
  label="Email"
  placeholder="email@example.com"
  value={email}
  onChange={setEmail}
  error={!isValid}
  errorMessage="Invalid email"
  required
/>`} />
              <div className="mt-4 p-3 bg-secondary dark:bg-white/5 border border-current/20">
                <p className="font-mono text-xs"><strong>Best for:</strong> React, Next.js, Remix apps with TypeScript</p>
              </div>
            </div>

            {/* Required Fonts */}
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Required Fonts</h3>
              <p className="text-sm opacity-70 mb-4">
                BASIS KIT requires IBM Plex Mono and Inter fonts. Add to your HTML head or configure in your framework.
              </p>
              <CodeBlock code={`<!-- Option 1: Google Fonts CDN -->
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

/* Option 2: Next.js app/layout.tsx */
import { Inter, IBM_Plex_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono' 
});

export default function RootLayout({ children }) {
  return (
    <html className={\`\${inter.variable} \${ibmPlexMono.variable}\`}>
      <body>{children}</body>
    </html>
  );
}`} />
            </div>

            {/* Quick Start */}
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Quick Start with Next.js + Bun</h3>
              <CodeBlock code={`# Create new Next.js project
bunx create-next-app@latest my-app --typescript --tailwind

# Navigate to project
cd my-app

# Copy BASIS KIT files
cp -r basis-kit/css/* my-project/app/

# Start development server
bun run dev`} />
            </div>
          </div>
        );

      case 'units':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Units System</h2>
            <p className="basis-paragraph-lg mb-6">
              BASIS KIT uses an 8px grid system as its foundation. All spacing, sizing, 
              and layout decisions are derived from this base unit.
            </p>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">8px Grid Base</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-brand" style={{ boxShadow: '4px 4px 0 #000' }}></div>
                <div className="font-mono text-sm">
                  <span className="text-brand font-bold">8px</span> = 1 unit
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {[8, 16, 24, 32, 48, 64].map((size, i) => (
                  <div key={size} className="text-center">
                    <div className="bg-brand mx-auto mb-2" style={{ width: size, height: size, boxShadow: '2px 2px 0 #000' }}></div>
                    <span className="font-mono text-xs">{size}px</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Typography Scale</h3>
              <div className="space-y-3">
                {TYPOGRAPHY_SCALE.map(t => (
                  <div key={t.name} className="flex items-baseline gap-4 p-2 border-b border-current/10">
                    <code className="font-mono text-xs opacity-60 w-24">{t.name}</code>
                    <span className="font-mono text-xs opacity-60 w-16">{t.size}</span>
                    <span className="font-mono" style={{ fontSize: t.size }}>{t.usage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Diagonal Stripes Pattern</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="h-32 bg-stripes border-2 border-current/20"></div>
                  <p className="font-mono text-xs mt-2">Pattern Background</p>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <p><span className="opacity-60">Angle:</span> <strong>-21 degrees</strong></p>
                  <p><span className="opacity-60">Spacing:</span> <strong>8px</strong></p>
                  <p><span className="opacity-60">Opacity:</span> <strong>50%</strong></p>
                </div>
              </div>
            </div>
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      // VARIABLES
      // ─────────────────────────────────────────────────────────────────────
      case 'colors':
        const brandColors = getBrandColors(current);
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Colors</h2>
            
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">{brandColors.name} {brandColors.hasDualPrimary ? 'Dual Primary' : 'Brand Colors'}</h3>
              <div className={"grid " + (brandColors.hasDualPrimary ? 'md:grid-cols-3' : 'md:grid-cols-5') + " gap-4"}>
                {brandColors.colors.map((c, i) => (
                  <div key={i} className="border-2 border-current/20 overflow-hidden">
                    <div className="h-24" style={{ background: c.hex }}></div>
                    <div className="p-3">
                      <p className="font-mono text-xs font-bold">{c.name}</p>
                      <p className="font-mono text-xs opacity-60">{c.hex}</p>
                      <p className="font-mono text-[10px] opacity-40 mt-1">{c.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Color Values</h3>
              <div className="overflow-x-auto">
                <table className="basis-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>HEX</th>
                      <th>RGB</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandColors.colors.map((c, i) => (
                      <tr key={i}>
                        <td className="font-mono text-sm">{c.name}</td>
                        <td className="font-mono text-xs">{c.hex}</td>
                        <td className="font-mono text-xs opacity-60">rgb({c.rgb})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Semantic Colors</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { name: 'Success', color: '#10B981' },
                  { name: 'Warning', color: '#F59E0B' },
                  { name: 'Error', color: '#EF4444' },
                  { name: 'Info', color: '#3B82F6' },
                ].map(s => (
                  <div key={s.name} className="border-2 border-current/20 overflow-hidden">
                    <div className="h-16" style={{ background: s.color }}></div>
                    <div className="p-2">
                      <p className="font-mono text-xs font-semibold">{s.name}</p>
                      <p className="font-mono text-xs opacity-60">{s.color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Neutral Scale</h3>
              <div className="flex gap-1">
                {['#FAFAFA', '#E5E5E5', '#D4D4D4', '#A3A3A3', '#737373', '#525252', '#404040', '#262626', '#171717', '#0A0A0A'].map((c, i) => (
                  <div key={i} className="flex-1">
                    <div className="h-12 border border-current/20" style={{ background: c }}></div>
                    <p className="font-mono text-[10px] text-center mt-1 opacity-60">{i * 100 + 50}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">CSS Variables</h3>
              <CodeBlock code={`:root {
  --brand: ${current.color};
  --brand-rgb: ${hexToRgb(current.color)};
  ${current.secondaryColor ? `--brand-secondary: ${current.secondaryColor};
  --brand-secondary-rgb: ${hexToRgb(current.secondaryColor)};` : ''}
}

/* Utility classes */
.bg-brand { background-color: var(--brand); }
.text-brand { color: var(--brand); }
.border-brand { border-color: var(--brand); }`} />
            </div>
          </div>
        );

      case 'borders':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Borders</h2>
            
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Border Widths</h3>
              <div className="flex gap-4">
                <div className="p-4 border border-current"><code className="font-mono text-xs">border</code></div>
                <div className="p-4 border-2 border-current"><code className="font-mono text-xs">border-2</code></div>
                <div className="p-4 border-4 border-current"><code className="font-mono text-xs">border-4</code></div>
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Brutal Shadows</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 border-2 border-current shadow-brutal-sm">
                  <code className="font-mono text-xs">shadow-brutal-sm</code>
                </div>
                <div className="p-4 border-2 border-current shadow-brutal">
                  <code className="font-mono text-xs">shadow-brutal</code>
                </div>
                <div className="p-4 border-2 border-current shadow-brutal-lg">
                  <code className="font-mono text-xs">shadow-brutal-lg</code>
                </div>
                <div className="p-4 border-2 border-current shadow-brutal-xl">
                  <code className="font-mono text-xs">shadow-brutal-xl</code>
                </div>
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Brand Shadows</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-current shadow-brutal-brand">
                  <code className="font-mono text-xs">shadow-brutal-brand</code>
                  <p className="text-xs opacity-60 mt-1">Shadow uses brand primary color</p>
                </div>
                <div className="p-4 border-2 border-current shadow-brutal-secondary">
                  <code className="font-mono text-xs">shadow-brutal-secondary</code>
                  <p className="text-xs opacity-60 mt-1">Shadow uses brand secondary color</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'spacing':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Spacing</h2>
            
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Spacing Scale</h3>
              <div className="space-y-4">
                {SPACING_TOKENS.map(s => (
                  <div key={s.name} className="flex items-center gap-4">
                    <code className="font-mono text-xs w-28">--{s.name}</code>
                    <div className="bg-brand" style={{ width: s.value, height: '24px' }}></div>
                    <code className="font-mono text-xs opacity-60">{s.value}</code>
                    <span className="font-mono text-xs opacity-40">{s.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Breakpoints</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { name: 'sm', value: '480px' },
                  { name: 'md', value: '768px' },
                  { name: 'xl', value: '1024px' },
                  { name: '2xl', value: '1280px' },
                ].map(b => (
                  <div key={b.name} className="text-center p-4 border-2 border-current/20">
                    <p className="font-mono text-lg font-bold text-brand">{b.name}</p>
                    <p className="font-mono text-xs opacity-60">{b.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'typography-vars':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Typography Variables</h2>
            
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Font Families</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-current/20">
                  <p className="font-mono text-xs opacity-60 mb-2">IBM Plex Mono</p>
                  <p className="text-3xl font-bold" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>Display</p>
                  <p className="text-sm mt-2" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>Technical typography for headings, buttons, and data.</p>
                </div>
                <div className="p-4 border-2 border-current/20">
                  <p className="font-mono text-xs opacity-60 mb-2">Inter</p>
                  <p className="text-3xl font-bold">Display</p>
                  <p className="text-sm mt-2">Human-readable typography for body text.</p>
                </div>
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">CSS Variables</h3>
              <CodeBlock code={`:root {
  --font-mono: 'IBM Plex Mono', monospace;
  --font-sans: 'Inter', sans-serif;
  
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;
  --text-4xl: 36px;
  --text-5xl: 48px;
}`} />
            </div>
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      // LAYOUT
      // ─────────────────────────────────────────────────────────────────────
      case 'page-structure':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Page Structure</h2>
            <p className="basis-paragraph-lg mb-6">
              Page structure patterns provide the foundational layouts for building consistent 
              application interfaces. Each pattern addresses different content organization needs.
            </p>
            
            {/* Container Standards */}
            <div className="basis-card p-6 bg-brand/10 border-2 border-brand mb-6">
              <h3 className="font-mono font-bold text-lg mb-3">📐 Container Standards</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-3 bg-background border-2 border-current/20">
                  <p className="font-mono text-xs opacity-60">Max Width</p>
                  <p className="font-mono text-xl font-bold">1280px</p>
                </div>
                <div className="p-3 bg-background border-2 border-current/20">
                  <p className="font-mono text-xs opacity-60">Gutter</p>
                  <p className="font-mono text-xl font-bold">32px</p>
                </div>
                <div className="p-3 bg-background border-2 border-current/20">
                  <p className="font-mono text-xs opacity-60">Grid Columns</p>
                  <p className="font-mono text-xl font-bold">12</p>
                </div>
                <div className="p-3 bg-background border-2 border-current/20">
                  <p className="font-mono text-xs opacity-60">Grid Gap</p>
                  <p className="font-mono text-xl font-bold">24px</p>
                </div>
              </div>
              <p className="font-mono text-xs mt-4 opacity-70">
                ⚠️ Box-sizing: border-box is MANDATORY for brutal borders to not break layout.
              </p>
            </div>
            
            <ComponentSectionModes 
              title="Master Container"
              modes={{
                css: "<!-- Master Container (Boxed) - 1280px max -->\n" +
                "<div class=\"basis-container\">\n" +
                "  <main>Content lives here...</main>\n" +
                "</div>\n" +
                "\n" +
                "<!-- Alternative - 1440px max -->\n" +
                "<div class=\"basis-container basis-container-lg\">\n" +
                "  <main>Wider content...</main>\n" +
                "</div>\n" +
                "\n" +
                "<!-- Fluid - No max-width -->\n" +
                "<div class=\"basis-container-fluid\">\n" +
                "  <main>Full fluid content...</main>\n" +
                "</div>",
                tailwind: "<!-- Container with 1280px max -->\n" +
                "<div class=\"w-full max-w-[1280px] mx-auto px-8\">\n" +
                "  <main>Content lives here...</main>\n" +
                "</div>\n" +
                "\n" +
                "<!-- Alternative - 1440px max -->\n" +
                "<div class=\"max-w-[1440px] mx-auto px-8\">\n" +
                "  <main>Wider content...</main>\n" +
                "</div>",
                react: "// React Container Component\n" +
                "import { Container } from '@marte/basis';\n" +
                "\n" +
                "<Container variant=\"boxed\">  {/* 1280px */}\n" +
                "  <main>Content lives here...</main>\n" +
                "</Container>\n" +
                "\n" +
                "<Container variant=\"wide\">  {/* 1440px */}\n" +
                "  <main>Wider content...</main>\n" +
                "</Container>\n" +
                "\n" +
                "<Container variant=\"fluid\">  {/* No max-width */}\n" +
                "  <main>Full fluid content...</main>\n" +
                "</Container>"
              }}
            >
              <div className="border-2 border-current/20 p-4">
                <div className="relative">
                  <div className="border-2 border-dashed border-brand/50 p-6 max-w-[280px] mx-auto">
                    <span className="font-mono text-xs opacity-60">1280px Container</span>
                    <div className="flex justify-between mt-2 text-xs font-mono opacity-40">
                      <span>← 32px gutter</span>
                      <span>32px gutter →</span>
                    </div>
                  </div>
                  <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none">
                    <div className="h-full border-2 border-dashed border-current/10"></div>
                  </div>
                </div>
              </div>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="12 Column Grid System"
              modes={{
                css: "<!-- 12 Column Grid with 24px Gap -->\n" +
                "<div class=\"basis-grid\">\n" +
                "  <div class=\"basis-col-4\">4 columns</div>\n" +
                "  <div class=\"basis-col-8\">8 columns</div>\n" +
                "</div>\n" +
                "\n" +
                "<div class=\"basis-grid\">\n" +
                "  <div class=\"basis-col-3\">3 cols</div>\n" +
                "  <div class=\"basis-col-3\">3 cols</div>\n" +
                "  <div class=\"basis-col-3\">3 cols</div>\n" +
                "  <div class=\"basis-col-3\">3 cols</div>\n" +
                "</div>",
                tailwind: "<!-- Grid with Tailwind -->\n" +
                "<div class=\"grid grid-cols-12 gap-6\">\n" +
                "  <div class=\"col-span-4\">4 columns</div>\n" +
                "  <div class=\"col-span-8\">8 columns</div>\n" +
                "</div>\n" +
                "\n" +
                "<!-- Responsive Grid -->\n" +
                "<div class=\"grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6\">\n" +
                "  ...\n" +
                "</div>",
                react: "// React Grid Component\n" +
                "import { Grid, Col } from '@marte/basis';\n" +
                "\n" +
                "<Grid columns={12} gap={24}>\n" +
                "  <Col span={4}>4 columns</Col>\n" +
                "  <Col span={8}>8 columns</Col>\n" +
                "</Grid>\n" +
                "\n" +
                "// Responsive\n" +
                "<Grid responsive>\n" +
                "  <Col span={12} md={6} lg={4}>...</Col>\n" +
                "</Grid>"
              }}
            >
              <div className="space-y-4">
                <div className="basis-grid">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-8 bg-brand/20 border border-brand/40 flex items-center justify-center">
                      <span className="font-mono text-[10px]">{i + 1}</span>
                    </div>
                  ))}
                </div>
                <div className="basis-grid">
                  <div className="basis-col-4 h-10 bg-brand/30 border-2 border-brand flex items-center justify-center">
                    <span className="font-mono text-xs">basis-col-4</span>
                  </div>
                  <div className="basis-col-8 h-10 bg-brand/20 border-2 border-brand/50 flex items-center justify-center">
                    <span className="font-mono text-xs">basis-col-8</span>
                  </div>
                </div>
              </div>
            </ComponentSectionModes>

            {/* Navbar Variants */}
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Navbar Variants</h3>
              <p className="text-sm opacity-70 mb-4">
                Three navbar styles under the same brutalist visual logic.
              </p>
              
              <div className="space-y-6">
                {/* Utility Bar */}
                <div className="border-2 border-current/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-brand text-white text-xs font-mono">DEFAULT</span>
                    <h4 className="font-mono font-bold">Utility Bar</h4>
                  </div>
                  <p className="text-xs opacity-60 mb-3">
                    Height: 72px | Sticky | Border-bottom: 4px solid #000
                  </p>
                  <CodeBlock code={`<nav class="basis-navbar-utility">
  <div class="basis-navbar-brand">Brand</div>
  <div class="basis-navbar-menu">...</div>
</nav>`} />
                </div>
                
                {/* Floating Console */}
                <div className="border-2 border-current/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-brand-secondary text-white text-xs font-mono">ALT</span>
                    <h4 className="font-mono font-bold">Floating Console</h4>
                  </div>
                  <p className="text-xs opacity-60 mb-3">
                    Width: 90% | Centered | Box-shadow: 8px 8px 0 #000
                  </p>
                  <CodeBlock code={`<nav class="basis-navbar-floating">
  <div class="basis-navbar-brand">Brand</div>
  <div class="basis-navbar-menu">...</div>
</nav>`} />
                </div>
                
                {/* Sidebar Index */}
                <div className="border-2 border-current/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-foreground/80 text-white text-xs font-mono">ADMIN</span>
                    <h4 className="font-mono font-bold">Sidebar Index</h4>
                  </div>
                  <p className="text-xs opacity-60 mb-3">
                    Width: 260px | Fixed position | Full height | For management apps
                  </p>
                  <CodeBlock code={`<aside class="basis-navbar-sidebar">
  <div class="basis-sidebar-header">Brand</div>
  <nav class="basis-sidebar-content">...</nav>
</aside>`} />
                </div>
              </div>
            </div>

            {/* Breakpoints */}
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Responsive Breakpoints</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-brand/10 border-2 border-brand">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs px-2 py-0.5 bg-brand text-white">MOBILE</span>
                  </div>
                  <p className="font-mono text-lg font-bold">320px – 480px</p>
                  <p className="text-xs opacity-60">Fluid containers, single column grid</p>
                </div>
                <div className="p-4 bg-brand-secondary/10 border-2 border-brand-secondary">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs px-2 py-0.5 bg-brand-secondary text-white">TABLET</span>
                  </div>
                  <p className="font-mono text-lg font-bold">481px – 1023px</p>
                  <p className="text-xs opacity-60">Fluid containers, 6-column grid</p>
                </div>
                <div className="p-4 bg-green-500/10 border-2 border-green-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs px-2 py-0.5 bg-green-600 text-white">DESKTOP</span>
                  </div>
                  <p className="font-mono text-lg font-bold">1024px – 1440px</p>
                  <p className="text-xs opacity-60">Boxed 1280px container, 12-column grid</p>
                </div>
                <div className="p-4 bg-purple-500/10 border-2 border-purple-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs px-2 py-0.5 bg-purple-600 text-white">ULTRAWIDE</span>
                  </div>
                  <p className="font-mono text-lg font-bold">&gt; 1440px</p>
                  <p className="text-xs opacity-60">Centered with infinite margins</p>
                </div>
              </div>
            </div>

            {/* Brutalist Overlap Rule */}
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">🔥 Brutalist Overlap Rule</h3>
              <p className="text-sm opacity-70 mb-4">
                Allow specific elements (images, banners, heroes) to break the grid and extend beyond 
                the container for industrial emphasis.
              </p>
              
              <div className="space-y-4">
                <div className="border-2 border-current/20 p-4">
                  <h4 className="font-mono text-sm font-bold mb-2">basis-break-110</h4>
                  <p className="text-xs opacity-60 mb-2">Extends 110% width, breaking container bounds</p>
                  <CodeBlock code={`<div class="basis-container">
  <article>Normal content...</article>
  
  <!-- Hero breaks the grid -->
  <figure class="basis-break-110">
    <img src="hero.jpg" alt="Hero" />
  </figure>
  
  <p>Content continues...</p>
</div>`} />
                </div>
                
                <div className="border-2 border-current/20 p-4">
                  <h4 className="font-mono text-sm font-bold mb-2">basis-break-full</h4>
                  <p className="text-xs opacity-60 mb-2">Full-width breakout, max 1920px</p>
                  <CodeBlock code={`<!-- Full-width banner -->
<section class="basis-break-full bg-brand text-white py-12">
  <div class="basis-container">
    <h2>Full-width Banner</h2>
  </div>
</section>`} />
                </div>
                
                <div className="border-2 border-current/20 p-4">
                  <h4 className="font-mono text-sm font-bold mb-2">basis-break-edge</h4>
                  <p className="text-xs opacity-60 mb-2">Edge-to-edge breakout, 100vw</p>
                  <CodeBlock code={`<!-- Edge-to-edge image -->
<img class="basis-break-edge" src="banner.jpg" alt="Full edge banner" />`} />
                </div>
              </div>
            </div>

            <ComponentSection 
              title="Basic Layout"
              description="Standard page structure with header, main content area, and footer stacked vertically."
              code={`<div class="min-h-screen flex flex-col">
  <!-- Header -->
  <header class="basis-navbar-utility">
    <div class="basis-navbar-brand">...</div>
    <nav class="basis-navbar-menu">...</nav>
  </header>
  
  <!-- Main Content -->
  <main class="flex-1">
    <div class="basis-container py-8">
      ...
    </div>
  </main>
  
  <!-- Footer -->
  <footer class="basis-footer">
    ...
  </footer>
</div>`}
            >
              <div className="border-2 border-current/20 p-2">
                <div className="bg-brand/20 p-2 mb-2 border-2 border-current/20">
                  <span className="font-mono text-xs">HEADER - basis-navbar-utility (72px)</span>
                </div>
                <div className="bg-brand/10 p-8 mb-2 border-2 border-dashed border-current/30 min-h-[80px]">
                  <span className="font-mono text-xs">MAIN CONTENT - basis-container (1280px)</span>
                </div>
                <div className="bg-neutral-500/20 p-2 border-2 border-current/20">
                  <span className="font-mono text-xs">FOOTER - basis-footer</span>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="With Sidebar"
              description="Layout with fixed sidebar navigation for documentation, dashboards, or admin interfaces."
              code={`<div class="flex min-h-screen">
  <!-- Sidebar -->
  <aside class="basis-navbar-sidebar">
    <div class="basis-sidebar-header">Brand</div>
    <nav class="basis-sidebar-content">...</nav>
  </aside>
  
  <!-- Main -->
  <main class="flex-1 ml-[260px]">
    <div class="basis-container">
      ...
    </div>
  </main>
</div>`}
            >
              <div className="border-2 border-current/20 p-2">
                <div className="flex">
                  <div className="w-1/4 bg-brand/20 p-2 border-2 border-current/20 min-h-[120px]">
                    <span className="font-mono text-xs">SIDEBAR - 260px</span>
                    <div className="mt-2 space-y-1">
                      <div className="h-2 bg-current/20 w-full"></div>
                      <div className="h-2 bg-current/20 w-3/4"></div>
                      <div className="h-2 bg-current/20 w-5/6"></div>
                    </div>
                  </div>
                  <div className="flex-1 bg-brand/10 p-2 ml-2 border-2 border-dashed border-current/30 min-h-[120px]">
                    <span className="font-mono text-xs">MAIN CONTENT - basis-container</span>
                  </div>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Split View"
              description="Two-column layout for comparisons, editors, or master-detail interfaces."
              code={`<div class="basis-grid">
  <div class="basis-col-6">
    <!-- Left Panel -->
  </div>
  <div class="basis-col-6">
    <!-- Right Panel -->
  </div>
</div>`}
            >
              <div className="border-2 border-current/20 p-2">
                <div className="basis-grid">
                  <div className="basis-col-6 bg-brand/20 p-4 border-r-2 border-current/20 min-h-[80px]">
                    <span className="font-mono text-xs">LEFT PANEL (6 cols)</span>
                  </div>
                  <div className="basis-col-6 bg-brand/10 p-4 min-h-[80px]">
                    <span className="font-mono text-xs">RIGHT PANEL (6 cols)</span>
                  </div>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Dashboard Layout"
              description="Complex layout with sidebar, header, and content area with grid panels."
              code={`<div class="flex min-h-screen">
  <aside class="basis-navbar-sidebar">...</aside>
  <div class="flex-1 flex flex-col ml-[260px]">
    <header class="basis-navbar-utility">...</header>
    <main class="flex-1 p-4">
      <div class="basis-grid">...</div>
    </main>
  </div>
</div>`}
            >
              <div className="border-2 border-current/20 p-2">
                <div className="flex">
                  <div className="w-1/5 bg-brand/20 p-1 border-2 border-current/20 min-h-[140px]">
                    <span className="font-mono text-[10px]">SIDEBAR 260px</span>
                  </div>
                  <div className="flex-1 ml-2 flex flex-col">
                    <div className="bg-brand/20 p-1 mb-2 border-2 border-current/20">
                      <span className="font-mono text-[10px]">HEADER 72px</span>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-1">
                      <div className="bg-brand/10 p-2 border-2 border-dashed border-current/30">
                        <span className="font-mono text-[10px]">CARD</span>
                      </div>
                      <div className="bg-brand/10 p-2 border-2 border-dashed border-current/30">
                        <span className="font-mono text-[10px]">CARD</span>
                      </div>
                      <div className="bg-brand/10 p-2 border-2 border-dashed border-current/30">
                        <span className="font-mono text-[10px]">CARD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'grid':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Grid System</h2>
            
            <div className="basis-card p-4 bg-brand/5 border-2 border-brand/30 mb-6">
              <p className="text-sm">
                <strong className="font-mono">💡 Tip:</strong> Each component shows code for all 3 modes: 
                <span className="font-mono ml-2 px-2 py-0.5 bg-neutral-800 text-white text-xs">CSS</span>
                <span className="font-mono ml-1 px-2 py-0.5 bg-neutral-700 text-white text-xs">Tailwind</span>
                <span className="font-mono ml-1 px-2 py-0.5 bg-neutral-600 text-white text-xs">React</span>
              </p>
            </div>
            
            <ComponentSectionModes 
              title="2 Column Grid"
              modes={{
                css: "<!-- CSS-only: Pre-built grid class -->\n" +
                "<div class=\"basis-grid-2\">\n" +
                "  <div class=\"basis-card\">Column 1</div>\n" +
                "  <div class=\"basis-card\">Column 2</div>\n" +
                "</div>\n" +
                "\n" +
                "<!-- With gap variants -->\n" +
                "<div class=\"basis-grid-2 basis-grid-gap-sm\">Small gap</div>\n" +
                "<div class=\"basis-grid-2 basis-grid-gap-lg\">Large gap</div>",
                tailwind: "<!-- Tailwind: Use grid utilities -->\n" +
                "<div class=\"grid grid-cols-2 gap-6\">\n" +
                "  <div class=\"p-6 border-2 border-current shadow-[4px_4px_0_0_currentColor]\">\n" +
                "    Column 1\n" +
                "  </div>\n" +
                "  <div class=\"p-6 border-2 border-current shadow-[4px_4px_0_0_currentColor]\">\n" +
                "    Column 2\n" +
                "  </div>\n" +
                "</div>\n" +
                "\n" +
                "<!-- Responsive columns -->\n" +
                "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-6\">\n" +
                "  <!-- Responsive 2-column layout -->\n" +
                "</div>",
                react: "// React: Use Grid component\n" +
                "import { Grid } from '@marte/basis';\n" +
                "\n" +
                "<Grid cols={2} gap=\"md\">\n" +
                "  <Grid.Item>\n" +
                "    <Card>Column 1</Card>\n" +
                "  </Grid.Item>\n" +
                "  <Grid.Item>\n" +
                "    <Card>Column 2</Card>\n" +
                "  </Grid.Item>\n" +
                "</Grid>\n" +
                "\n" +
                "// Available props\n" +
                "<Grid \n" +
                "  cols={1 | 2 | 3 | 4 | 6 | 12}  // Number of columns\n" +
                "  gap={'none' | 'sm' | 'md' | 'lg' | 'xl'}  // Gap size\n" +
                "  responsive={{ sm: 1, md: 2, lg: 2 }}  // Responsive breakpoints\n" +
                ">"
              }}
            >
              <div className="basis-grid-2">
                <div className="p-4 border-2 border-current/20 bg-brand/10">Col 1</div>
                <div className="p-4 border-2 border-current/20 bg-brand/10">Col 2</div>
              </div>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="3 Column Grid"
              modes={{
                css: "<!-- CSS-only: 3-column grid -->\n" +
                "<div class=\"basis-grid-3\">\n" +
                "  <div class=\"basis-card\">Column 1</div>\n" +
                "  <div class=\"basis-card\">Column 2</div>\n" +
                "  <div class=\"basis-card\">Column 3</div>\n" +
                "</div>",
                tailwind: "<!-- Tailwind: 3-column grid -->\n" +
                "<div class=\"grid grid-cols-3 gap-6\">\n" +
                "  <div class=\"p-6 border-2 border-current\">Column 1</div>\n" +
                "  <div class=\"p-6 border-2 border-current\">Column 2</div>\n" +
                "  <div class=\"p-6 border-2 border-current\">Column 3</div>\n" +
                "</div>\n" +
                "\n" +
                "<!-- Responsive 3-column -->\n" +
                "<div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6\">\n" +
                "  <!-- Responsive layout -->\n" +
                "</div>",
                react: "// React: 3-column Grid\n" +
                "import { Grid, Card } from '@marte/basis';\n" +
                "\n" +
                "<Grid cols={3} gap=\"md\">\n" +
                "  {items.map(item => (\n" +
                "    <Grid.Item key={item.id}>\n" +
                "      <Card>{item.content}</Card>\n" +
                "    </Grid.Item>\n" +
                "  ))}\n" +
                "</Grid>\n" +
                "\n" +
                "// With responsive config\n" +
                "<Grid \n" +
                "  cols={3} \n" +
                "  responsive={{ base: 1, sm: 2, lg: 3 }}\n" +
                ">"
              }}
            >
              <div className="basis-grid-3">
                <div className="p-4 border-2 border-current/20 bg-brand/10">Col 1</div>
                <div className="p-4 border-2 border-current/20 bg-brand/10">Col 2</div>
                <div className="p-4 border-2 border-current/20 bg-brand/10">Col 3</div>
              </div>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="4 Column Grid"
              modes={{
                css: "<!-- CSS-only: 4-column grid -->\n" +
                "<div class=\"basis-grid-4\">\n" +
                "  <div class=\"basis-card\">Column 1</div>\n" +
                "  <div class=\"basis-card\">Column 2</div>\n" +
                "  <div class=\"basis-card\">Column 3</div>\n" +
                "  <div class=\"basis-card\">Column 4</div>\n" +
                "</div>",
                tailwind: "<!-- Tailwind: 4-column grid -->\n" +
                "<div class=\"grid grid-cols-4 gap-6\">\n" +
                "  <div class=\"p-4 border-2 border-current\">1</div>\n" +
                "  <div class=\"p-4 border-2 border-current\">2</div>\n" +
                "  <div class=\"p-4 border-2 border-current\">3</div>\n" +
                "  <div class=\"p-4 border-2 border-current\">4</div>\n" +
                "</div>",
                react: "// React: 4-column Grid\n" +
                "import { Grid, Card } from '@marte/basis';\n" +
                "\n" +
                "<Grid cols={4} gap=\"md\">\n" +
                "  <Grid.Item><Card>1</Card></Grid.Item>\n" +
                "  <Grid.Item><Card>2</Card></Grid.Item>\n" +
                "  <Grid.Item><Card>3</Card></Grid.Item>\n" +
                "  <Grid.Item><Card>4</Card></Grid.Item>\n" +
                "</Grid>"
              }}
            >
              <div className="basis-grid-4">
                <div className="p-4 border-2 border-current/20 bg-brand/10">1</div>
                <div className="p-4 border-2 border-current/20 bg-brand/10">2</div>
                <div className="p-4 border-2 border-current/20 bg-brand/10">3</div>
                <div className="p-4 border-2 border-current/20 bg-brand/10">4</div>
              </div>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="12 Column Grid with Spans"
              modes={{
                css: "<!-- CSS-only: 12-column grid with span utilities -->\n" +
                "<div class=\"basis-grid\">\n" +
                "  <div class=\"basis-col-12\">Full width (12 cols)</div>\n" +
                "  <div class=\"basis-col-6\">Half (6 cols)</div>\n" +
                "  <div class=\"basis-col-6\">Half (6 cols)</div>\n" +
                "  <div class=\"basis-col-4\">Third (4 cols)</div>\n" +
                "  <div class=\"basis-col-8\">Two-thirds (8 cols)</div>\n" +
                "</div>",
                tailwind: "<!-- Tailwind: Col span utilities -->\n" +
                "<div class=\"grid grid-cols-12 gap-6\">\n" +
                "  <div class=\"col-span-12 p-4 border-2\">Full width</div>\n" +
                "  <div class=\"col-span-6 p-4 border-2\">Half</div>\n" +
                "  <div class=\"col-span-6 p-4 border-2\">Half</div>\n" +
                "  <div class=\"col-span-4 p-4 border-2\">Third</div>\n" +
                "  <div class=\"col-span-8 p-4 border-2\">Two-thirds</div>\n" +
                "</div>",
                react: "// React: Grid with spans\n" +
                "import { Grid } from '@marte/basis';\n" +
                "\n" +
                "<Grid cols={12} gap=\"md\">\n" +
                "  <Grid.Item span={12}>Full width</Grid.Item>\n" +
                "  <Grid.Item span={6}>Half</Grid.Item>\n" +
                "  <Grid.Item span={6}>Half</Grid.Item>\n" +
                "  <Grid.Item span={4}>Third</Grid.Item>\n" +
                "  <Grid.Item span={8}>Two-thirds</Grid.Item>\n" +
                "</Grid>\n" +
                "\n" +
                "// GridItem props\n" +
                "<Grid.Item \n" +
                "  span={1-12}           // Column span\n" +
                "  rowSpan={1-12}        // Row span for nested grids\n" +
                "  start={1-12}          // Start position\n" +
                "  order={'first' | 'last' | number}\n" +
                "/>"
              }}
            >
              <div className="basis-grid">
                <div className="basis-col-12 p-3 border-2 border-current/20 bg-brand/10 text-center font-mono text-sm">col-span-12</div>
                <div className="basis-col-6 p-3 border-2 border-current/20 bg-brand/10 text-center font-mono text-sm">col-span-6</div>
                <div className="basis-col-6 p-3 border-2 border-current/20 bg-brand/10 text-center font-mono text-sm">col-span-6</div>
                <div className="basis-col-4 p-3 border-2 border-current/20 bg-brand/10 text-center font-mono text-sm">col-span-4</div>
                <div className="basis-col-8 p-3 border-2 border-current/20 bg-brand/10 text-center font-mono text-sm">col-span-8</div>
              </div>
            </ComponentSectionModes>
          </div>
        );

      case 'flex':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Flex Patterns</h2>
            
            <ComponentSection 
              title="Center"
              code={`<div class="basis-flex-center">
  <div>Centered</div>
</div>`}
            >
              <div className="basis-flex-center h-24 border-2 border-current/20">
                <span className="font-mono">Centered Content</span>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Between"
              code={`<div class="basis-flex-between">
  <div>Left</div>
  <div>Right</div>
</div>`}
            >
              <div className="basis-flex-between p-4 border-2 border-current/20">
                <span className="font-mono">Left</span>
                <span className="font-mono">Right</span>
              </div>
            </ComponentSection>
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      // WEBSITE SECTIONS
      // ─────────────────────────────────────────────────────────────────────
      case 'hero-section':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Hero Section</h2>
            <p className="text-sm opacity-70 mb-4">The first, most prominent area featuring a main headline, subheadings, and a call-to-action.</p>
            
            <div className="basis-card p-4 bg-brand/5 border-2 border-brand/30 mb-6">
              <p className="text-sm">
                <strong className="font-mono">💡 Tip:</strong> Each component shows code for all 3 modes: 
                <span className="font-mono ml-2 px-2 py-0.5 bg-neutral-800 text-white text-xs">CSS</span>
                <span className="font-mono ml-1 px-2 py-0.5 bg-neutral-700 text-white text-xs">Tailwind</span>
                <span className="font-mono ml-1 px-2 py-0.5 bg-neutral-600 text-white text-xs">React</span>
              </p>
            </div>
            
            <ComponentSectionModes 
              title="Default Hero"
              modes={{
                css: "<!-- CSS-only: Pre-built hero classes -->\n" +
                "<section class=\"basis-hero\">\n" +
                "  <span class=\"basis-eyebrow\">Welcome to</span>\n" +
                "  <h1 class=\"basis-hero-title\">Main Headline</h1>\n" +
                "  <p class=\"basis-hero-subtitle\">Supporting text for context and engagement.</p>\n" +
                "  <div class=\"basis-hero-actions\">\n" +
                "    <button class=\"basis-btn basis-btn-primary\">Get Started</button>\n" +
                "    <button class=\"basis-btn basis-btn-outline\">Learn More</button>\n" +
                "  </div>\n" +
                "</section>",
                tailwind: "<!-- Tailwind: Build hero with utilities -->\n" +
                "<section class=\"text-center py-16 px-8 bg-secondary dark:bg-white/5 border-2 border-current\">\n" +
                "  <span class=\"font-mono text-xs uppercase tracking-widest text-brand mb-4 inline-block\">\n" +
                "    Welcome to\n" +
                "  </span>\n" +
                "  <h1 class=\"font-mono text-4xl md:text-5xl font-bold mb-4\">\n" +
                "    Main Headline\n" +
                "  </h1>\n" +
                "  <p class=\"text-lg opacity-70 max-w-2xl mx-auto mb-8\">\n" +
                "    Supporting text for context.\n" +
                "  </p>\n" +
                "  <div class=\"flex flex-wrap justify-center gap-4\">\n" +
                "    <button class=\"px-4 py-2 bg-brand text-white font-mono font-semibold border-2 border-current shadow-[4px_4px_0_0_currentColor]\">\n" +
                "      Get Started\n" +
                "    </button>\n" +
                "    <button class=\"px-4 py-2 bg-transparent border-2 border-current font-mono\">\n" +
                "      Learn More\n" +
                "    </button>\n" +
                "  </div>\n" +
                "</section>",
                react: "// React: Use Hero compound component\n" +
                "import { Hero, Button } from '@marte/basis';\n" +
                "\n" +
                "<Hero>\n" +
                "  <Hero.Eyebrow>Welcome to</Hero.Eyebrow>\n" +
                "  <Hero.Title>Main Headline</Hero.Title>\n" +
                "  <Hero.Subtitle>\n" +
                "    Supporting text for context and engagement.\n" +
                "  </Hero.Subtitle>\n" +
                "  <Hero.Actions>\n" +
                "    <Button variant=\"primary\">Get Started</Button>\n" +
                "    <Button variant=\"outline\">Learn More</Button>\n" +
                "  </Hero.Actions>\n" +
                "</Hero>\n" +
                "\n" +
                "// Hero props\n" +
                "<Hero \n" +
                "  size={'sm' | 'md' | 'lg' | 'full'}   // Height variant\n" +
                "  align={'left' | 'center' | 'right'}  // Text alignment\n" +
                "  pattern={'none' | 'stripes' | 'dots' | 'grid'}  // Background pattern\n" +
                "  background=\"url(...)\"                 // Optional image\n" +
                "  overlay={true}                        // Dark overlay for images\n" +
                "/>"
              }}
            >
              <div className="basis-hero text-center py-16 px-8 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                <span className="basis-eyebrow mb-4 inline-block">Welcome to</span>
                <h1 className="font-mono text-4xl md:text-5xl font-bold mb-4">BASIS KIT Framework</h1>
                <p className="text-lg opacity-70 max-w-2xl mx-auto mb-8">A Neo-Brutalist Design System built for modern web applications with industrial precision.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="basis-btn basis-btn-primary">Get Started</button>
                  <button className="basis-btn basis-btn-outline">View Docs</button>
                </div>
              </div>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="Hero with Background Pattern"
              modes={{
                css: "<!-- CSS-only: Hero with pattern background -->\n" +
                "<section class=\"basis-hero bg-stripes-brand\">\n" +
                "  <div class=\"basis-hero-content relative z-10\">\n" +
                "    <h1 class=\"basis-hero-title\">Hero with Stripes</h1>\n" +
                "    <p class=\"basis-hero-subtitle\">Background patterns add visual interest.</p>\n" +
                "    <button class=\"basis-btn basis-btn-primary\">Start Now</button>\n" +
                "  </div>\n" +
                "</section>\n" +
                "\n" +
                "<!-- Available patterns -->\n" +
                "<section class=\"basis-hero bg-dots-brand\">...</section>\n" +
                "<section class=\"basis-hero bg-grid-brand\">...</section>",
                tailwind: "<!-- Tailwind: Hero with pattern utilities -->\n" +
                "<section class=\"relative text-center py-16 px-8 bg-brand/10 overflow-hidden\"\n" +
                "  style=\"background-image: repeating-linear-gradient(-21deg, transparent, transparent 7.5px, var(--brand) 7.5px, var(--brand) 8px)\">\n" +
                "  \n" +
                "  <div class=\"relative z-10\">\n" +
                "    <h1 class=\"font-mono text-3xl font-bold mb-4\">Hero with Stripes</h1>\n" +
                "    <p class=\"opacity-70 mb-6\">Background patterns add visual interest.</p>\n" +
                "    <button class=\"px-4 py-2 bg-brand text-white border-2 border-current\">\n" +
                "      Start Now\n" +
                "    </button>\n" +
                "  </div>\n" +
                "</section>",
                react: "// React: Hero with pattern prop\n" +
                "import { Hero, Button } from '@marte/basis';\n" +
                "\n" +
                "<Hero pattern=\"stripes\" patternColor=\"brand\">\n" +
                "  <Hero.Title>Hero with Stripes</Hero.Title>\n" +
                "  <Hero.Subtitle>Background patterns add visual interest.</Hero.Subtitle>\n" +
                "  <Hero.Actions>\n" +
                "    <Button variant=\"primary\">Start Now</Button>\n" +
                "  </Hero.Actions>\n" +
                "</Hero>\n" +
                "\n" +
                "// Available patterns\n" +
                "<Hero pattern=\"stripes\" />\n" +
                "<Hero pattern=\"dots\" />\n" +
                "<Hero pattern=\"grid\" />\n" +
                "<Hero pattern=\"grid-angle\" />\n" +
                "\n" +
                "// Custom pattern colors\n" +
                "<Hero pattern=\"stripes\" patternColor=\"brand-secondary\" />"
              }}
            >
              <div className="relative text-center py-16 px-8 bg-brand/10 bg-stripes-brand border-2 border-foreground/20 dark:border-white/20 overflow-hidden">
                <h1 className="relative z-10 font-mono text-3xl font-bold mb-4">Hero with Stripes</h1>
                <p className="relative z-10 opacity-70 mb-6">Background patterns add visual interest.</p>
                <button className="relative z-10 basis-btn basis-btn-primary">Start Now</button>
              </div>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="Hero with Image Background"
              modes={{
                css: "<!-- CSS-only: Hero with image background -->\n" +
                "<section class=\"basis-hero basis-hero-image\" style=\"background-image: url('/hero.jpg')\">\n" +
                "  <div class=\"basis-hero-overlay\"></div>\n" +
                "  <div class=\"basis-hero-content relative z-10\">\n" +
                "    <h1 class=\"basis-hero-title text-white\">Hero with Image</h1>\n" +
                "    <p class=\"basis-hero-subtitle text-white/80\">Dark overlay ensures text readability.</p>\n" +
                "    <button class=\"basis-btn basis-btn-primary\">Explore</button>\n" +
                "  </div>\n" +
                "</section>",
                tailwind: "<!-- Tailwind: Hero with image background -->\n" +
                "<section class=\"relative text-center py-24 px-8 bg-cover bg-center\"\n" +
                "  style=\"background-image: url('/hero.jpg')\">\n" +
                "  \n" +
                "  <!-- Dark overlay -->\n" +
                "  <div class=\"absolute inset-0 bg-black/60\"></div>\n" +
                "  \n" +
                "  <div class=\"relative z-10\">\n" +
                "    <h1 class=\"font-mono text-4xl font-bold mb-4 text-white\">\n" +
                "      Hero with Image\n" +
                "    </h1>\n" +
                "    <p class=\"text-lg text-white/80 mb-8 max-w-2xl mx-auto\">\n" +
                "      Dark overlay ensures text readability.\n" +
                "    </p>\n" +
                "    <button class=\"px-6 py-3 bg-brand text-white font-mono border-2 border-current\">\n" +
                "      Explore\n" +
                "    </button>\n" +
                "  </div>\n" +
                "</section>",
                react: "// React: Hero with image background\n" +
                "import { Hero, Button } from '@marte/basis';\n" +
                "\n" +
                "<Hero \n" +
                "  background=\"/hero.jpg\"\n" +
                "  overlay\n" +
                "  overlayOpacity={0.6}\n" +
                ">\n" +
                "  <Hero.Title className=\"text-white\">\n" +
                "    Hero with Image\n" +
                "  </Hero.Title>\n" +
                "  <Hero.Subtitle className=\"text-white/80\">\n" +
                "    Dark overlay ensures text readability.\n" +
                "  </Hero.Subtitle>\n" +
                "  <Hero.Actions>\n" +
                "    <Button variant=\"primary\">Explore</Button>\n" +
                "  </Hero.Actions>\n" +
                "</Hero>\n" +
                "\n" +
                "// Overlay options\n" +
                "<Hero \n" +
                "  background=\"/hero.jpg\"\n" +
                "  overlay\n" +
                "  overlayColor=\"black\"      // or \"brand\"\n" +
                "  overlayOpacity={0.4}      // 0-1\n" +
                "/>"
              }}
            >
              <div className="relative text-center py-16 px-8 border-2 border-foreground/20 dark:border-white/20 overflow-hidden bg-neutral-800">
                <div className="absolute inset-0 bg-brand/30"></div>
                <h1 className="relative z-10 font-mono text-3xl font-bold mb-4 text-white">Hero with Image Background</h1>
                <p className="relative z-10 opacity-80 mb-6 text-white">Dark overlay ensures text readability.</p>
                <button className="relative z-10 basis-btn basis-btn-primary">Explore</button>
              </div>
            </ComponentSectionModes>
          </div>
        );

      case 'about-section':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">About Section</h2>
            <p className="text-sm opacity-70 mb-4">Sections describing the brand, company, or purpose.</p>
            
            <ComponentSection 
              title="Company About"
              code={`<section class="basis-about">
  <div class="basis-about-content">
    <h2 class="basis-about-title">About Us</h2>
    <p class="basis-about-text">Description text...</p>
  </div>
  <div class="basis-about-image">
    <img src="..." alt="Team" />
  </div>
</section>`}
            >
              <div className="grid md:grid-cols-2 gap-8 p-8 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                <div>
                  <span className="basis-eyebrow mb-2 inline-block">Our Story</span>
                  <h2 className="font-mono text-2xl font-bold mb-4">Building the Future of Design</h2>
                  <p className="opacity-70 mb-4">Founded in 2020, we've been dedicated to creating tools that empower developers and designers to build better interfaces faster.</p>
                  <p className="opacity-70">Our mission is to standardize design systems across the entire MARTE ecosystem, ensuring consistency and quality in every project.</p>
                </div>
                <div className="bg-foreground/10 dark:bg-white/10 flex items-center justify-center min-h-[200px]">
                  <span className="font-mono text-sm opacity-50">Team Image / Illustration</span>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Mission & Vision"
              code={`<section class="basis-about-cards">
  <div class="basis-card">
    <h3>Mission</h3>
    <p>Mission statement...</p>
  </div>
  <div class="basis-card">
    <h3>Vision</h3>
    <p>Vision statement...</p>
  </div>
</section>`}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="basis-card">
                  <h3 className="font-mono font-bold text-lg mb-2 text-brand">Our Mission</h3>
                  <p className="text-sm opacity-70">To provide a unified design language that scales across all products and platforms.</p>
                </div>
                <div className="basis-card">
                  <h3 className="font-mono font-bold text-lg mb-2 text-brand">Our Vision</h3>
                  <p className="text-sm opacity-70">A world where every interface is intuitive, accessible, and beautiful by default.</p>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'features-section':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Features Section</h2>
            <p className="text-sm opacity-70 mb-4">Detailed, often icon-based, descriptions of what is offered.</p>
            
            <ComponentSection 
              title="Feature Grid"
              code={`<section class="basis-features">
  <div class="basis-features-header">
    <h2>Features</h2>
    <p>What we offer</p>
  </div>
  <div class="basis-features-grid">
    <div class="basis-feature-card">...</div>
  </div>
</section>`}
            >
              <div className="text-center mb-8">
                <h2 className="font-mono text-2xl font-bold mb-2">Powerful Features</h2>
                <p className="opacity-60">Everything you need to build amazing interfaces</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized for performance with minimal bundle size' },
                  { icon: '🎨', title: 'Fully Customizable', desc: 'Adapt every component to your brand identity' },
                  { icon: '📱', title: 'Responsive', desc: 'Works perfectly on all screen sizes' },
                  { icon: '🌙', title: 'Dark Mode', desc: 'Built-in theme switching support' },
                  { icon: '♿', title: 'Accessible', desc: 'WCAG compliant components out of the box' },
                  { icon: '🔧', title: 'Developer First', desc: 'TypeScript types and great DX' },
                ].map((f, i) => (
                  <div key={i} className="basis-card text-center p-6">
                    <div className="text-3xl mb-3">{f.icon}</div>
                    <h3 className="font-mono font-bold mb-2">{f.title}</h3>
                    <p className="text-sm opacity-60">{f.desc}</p>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Feature List with Icons"
              code={`<div class="basis-feature-list">
  <div class="basis-feature-item">
    <div class="basis-feature-icon">✓</div>
    <div class="basis-feature-text">Feature description</div>
  </div>
</div>`}
            >
              <div className="space-y-4">
                {[
                  '75+ CSS Components ready to use',
                  '40+ React Components with TypeScript',
                  '8px Grid System for consistency',
                  'Dual Primary Color System',
                  'Dark Mode built-in',
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-secondary dark:bg-white/5 border border-foreground/10 dark:border-white/10">
                    <span className="text-brand font-bold">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </ComponentSection>
          </div>
        );

      case 'cta-section':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">CTA Section</h2>
            <p className="text-sm opacity-70 mb-4">Prominent buttons or banners encouraging user action.</p>
            
            <ComponentSection 
              title="Simple CTA"
              code={`<section class="basis-cta">
  <h2>Ready to Start?</h2>
  <p>Join thousands of developers</p>
  <button class="basis-btn basis-btn-primary">Get Started</button>
</section>`}
            >
              <div className="text-center py-12 px-8 bg-brand/10 border-2 border-brand/50">
                <h2 className="font-mono text-2xl font-bold mb-2">Ready to Get Started?</h2>
                <p className="opacity-70 mb-6">Join thousands of developers building better interfaces.</p>
                <button className="basis-btn basis-btn-primary">Start Building →</button>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Full Width CTA Banner"
              code={`<section class="basis-cta-banner bg-brand">
  <div class="basis-cta-content">
    <h2>Limited Time Offer</h2>
    <button>Claim Now</button>
  </div>
</section>`}
            >
              <div className="bg-brand text-white p-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="font-mono text-xl font-bold">Upgrade to Pro Today</h2>
                  <p className="opacity-80 text-sm">Get access to all premium components and templates.</p>
                </div>
                <button className="basis-btn bg-white text-brand border-white hover:bg-white/90">Upgrade Now</button>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="CTA with Pattern Background"
              code={`<section class="basis-cta bg-stripes">
  <!-- CTA content with pattern -->
</section>`}
            >
              <div className="relative text-center py-12 px-8 bg-stripes border-2 border-foreground/20 dark:border-white/20 overflow-hidden">
                <div className="relative z-10">
                  <h2 className="font-mono text-2xl font-bold mb-2">Build Something Amazing</h2>
                  <p className="opacity-70 mb-6">The only design system you'll ever need.</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button className="basis-btn basis-btn-primary">Get Started Free</button>
                    <button className="basis-btn basis-btn-outline">View Examples</button>
                  </div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'testimonials-section':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Testimonials</h2>
            <p className="text-sm opacity-70 mb-4">Reviews, client quotes, or case studies to build trust.</p>
            
            <ComponentSection 
              title="Testimonial Cards"
              code={`<section class="basis-testimonials">
  <div class="basis-testimonial-card">
    <p class="basis-quote">"Quote text..."</p>
    <div class="basis-author">
      <img class="basis-avatar" src="..." />
      <span>Name, Role</span>
    </div>
  </div>
</section>`}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { quote: "BASIS KIT has transformed how we build products. Consistent, fast, and beautiful.", name: "Ana García", role: "Lead Designer" },
                  { quote: "The component library is incredibly well thought out. It just works.", name: "Carlos Rodríguez", role: "Senior Developer" },
                ].map((t, i) => (
                  <div key={i} className="basis-card">
                    <p className="italic opacity-80 mb-4">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="basis-avatar basis-avatar-md bg-brand text-white">{t.name[0]}</div>
                      <div>
                        <p className="font-mono font-bold text-sm">{t.name}</p>
                        <p className="text-xs opacity-60">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Featured Testimonial"
              code={`<section class="basis-testimonial-featured">
  <blockquote>Large quote...</blockquote>
  <cite>— Author Name</cite>
</section>`}
            >
              <div className="text-center py-12 px-8 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                <p className="text-xl md:text-2xl italic opacity-80 max-w-2xl mx-auto mb-6">
                  "The best design system we've ever used. It has become the foundation for all our products at MARTE Group."
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="basis-avatar basis-avatar-lg bg-brand text-white">M</div>
                  <div className="text-left">
                    <p className="font-mono font-bold">Marco Valle</p>
                    <p className="text-sm opacity-60">CEO, MARTE Group</p>
                  </div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'stats-section':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Stats Section</h2>
            <p className="text-sm opacity-70 mb-4">Key metrics and statistics to showcase achievements.</p>
            
            <ComponentSection 
              title="Stats Grid"
              code={`<section class="basis-stats">
  <div class="basis-stat">
    <span class="basis-stat-value">75+</span>
    <span class="basis-stat-label">Components</span>
  </div>
</section>`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: '75+', label: 'CSS Components' },
                  { value: '40+', label: 'React Components' },
                  { value: '8px', label: 'Grid System' },
                  { value: '100%', label: 'TypeScript' },
                ].map((s, i) => (
                  <div key={i} className="text-center p-6 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                    <div className="font-mono text-3xl md:text-4xl font-bold text-brand mb-2">{s.value}</div>
                    <div className="font-mono text-xs uppercase tracking-wider opacity-60">{s.label}</div>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Stats with Trend"
              code={`<div class="basis-stat-trend">
  <span class="basis-stat-value">2,450</span>
  <span class="basis-stat-change">+12%</span>
</div>`}
            >
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { value: '12,450', label: 'Active Users', change: '+24%', positive: true },
                  { value: '98.9%', label: 'Uptime', change: '+0.2%', positive: true },
                  { value: '4.9', label: 'Rating', change: '+0.3', positive: true },
                ].map((s, i) => (
                  <div key={i} className="basis-card">
                    <div className="font-mono text-xs uppercase tracking-wider opacity-60 mb-1">{s.label}</div>
                    <div className="flex items-end gap-2">
                      <span className="font-mono text-2xl font-bold">{s.value}</span>
                      <span className={"text-sm font-mono " + (s.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>{s.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ComponentSection>
          </div>
        );

      case 'footer-section':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Footer</h2>
            <p className="text-sm opacity-70 mb-4">Bottom section with legal links, contact information, and social media links.</p>
            
            <ComponentSection 
              title="Simple Footer"
              code={`<footer class="basis-footer">
  <div class="basis-footer-brand">© 2024 Brand</div>
  <nav class="basis-footer-links">...</nav>
</footer>`}
            >
              <div className="border-2 border-foreground/20 dark:border-white/20 p-6 bg-secondary dark:bg-white/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand flex items-center justify-center font-mono font-bold text-white text-sm">B</div>
                    <span className="font-mono font-bold">BASIS KIT</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-6 text-sm">
                    <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">Documentation</a>
                    <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">Components</a>
                    <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">Examples</a>
                    <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">GitHub</a>
                  </div>
                  <p className="text-sm opacity-60">© 2024 MARTE Group</p>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Full Footer"
              code={`<footer class="basis-footer-full">
  <div class="basis-footer-grid">
    <div class="basis-footer-col">Brand info</div>
    <div class="basis-footer-col">Links</div>
    <div class="basis-footer-col">Contact</div>
  </div>
  <div class="basis-footer-bottom">Legal links</div>
</footer>`}
            >
              <div className="border-2 border-foreground/20 dark:border-white/20 bg-secondary dark:bg-white/5 overflow-hidden">
                <div className="grid md:grid-cols-4 gap-8 p-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-brand flex items-center justify-center font-mono font-bold text-white text-sm">B</div>
                      <span className="font-mono font-bold">BASIS KIT</span>
                    </div>
                    <p className="text-sm opacity-60">Neo-Brutalist Design System for modern web applications.</p>
                  </div>
                  <div>
                    <h4 className="font-mono font-bold mb-3">Product</h4>
                    <ul className="space-y-2 text-sm opacity-60">
                      <li><a href="#" className="hover:opacity-100">Components</a></li>
                      <li><a href="#" className="hover:opacity-100">Templates</a></li>
                      <li><a href="#" className="hover:opacity-100">Themes</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-mono font-bold mb-3">Resources</h4>
                    <ul className="space-y-2 text-sm opacity-60">
                      <li><a href="#" className="hover:opacity-100">Documentation</a></li>
                      <li><a href="#" className="hover:opacity-100">Guides</a></li>
                      <li><a href="#" className="hover:opacity-100">API Reference</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-mono font-bold mb-3">Company</h4>
                    <ul className="space-y-2 text-sm opacity-60">
                      <li><a href="#" className="hover:opacity-100">About</a></li>
                      <li><a href="#" className="hover:opacity-100">Blog</a></li>
                      <li><a href="#" className="hover:opacity-100">Contact</a></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-foreground/10 dark:border-white/10 p-4 flex flex-col md:flex-row items-center justify-between gap-2">
                  <p className="text-xs opacity-60">© 2024 MARTE Group. All rights reserved.</p>
                  <div className="flex gap-4 text-xs opacity-60">
                    <a href="#" className="hover:opacity-100">Privacy</a>
                    <a href="#" className="hover:opacity-100">Terms</a>
                    <a href="#" className="hover:opacity-100">Cookies</a>
                  </div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'social-media':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Social Media</h2>
            <p className="text-sm opacity-70 mb-4">Social media links and sharing components.</p>
            
            <ComponentSection 
              title="Social Links"
              code={`<div class="basis-social-links">
  <a href="#" class="basis-social-link">Twitter</a>
  <a href="#" class="basis-social-link">GitHub</a>
</div>`}
            >
              <div className="flex gap-3">
                {[
                  { name: 'Twitter', icon: '𝕏' },
                  { name: 'GitHub', icon: '⌘' },
                  { name: 'LinkedIn', icon: 'in' },
                  { name: 'Instagram', icon: '◉' },
                  { name: 'YouTube', icon: '▶' },
                ].map((s, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-10 h-10 flex items-center justify-center border-2 border-foreground/20 dark:border-white/20 hover:border-brand hover:bg-brand/10 transition-colors font-mono text-sm"
                    title={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Social Share Buttons"
              code={`<div class="basis-social-share">
  <span>Share:</span>
  <button class="basis-share-btn">Twitter</button>
  <button class="basis-share-btn">Facebook</button>
</div>`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm opacity-60">Share:</span>
                <button className="basis-btn basis-btn-sm basis-btn-secondary">𝕏 Tweet</button>
                <button className="basis-btn basis-btn-sm basis-btn-secondary">↗ Share</button>
                <button className="basis-btn basis-btn-sm basis-btn-secondary">✂ Copy Link</button>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Follow Section"
              code={`<div class="basis-social-follow">
  <h3>Follow Us</h3>
  <div class="basis-social-icons">...</div>
</div>`}
            >
              <div className="flex items-center gap-4 p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                <span className="font-mono text-sm">Follow us:</span>
                <div className="flex gap-2">
                  {['𝕏', '⌘', 'in', '◉'].map((icon, i) => (
                    <button key={i} className="w-8 h-8 flex items-center justify-center bg-brand/10 hover:bg-brand/20 border border-brand/30 transition-colors">
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'contact-info':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Contact Info</h2>
            <p className="text-sm opacity-70 mb-4">Contact information sections with address, phone, and email.</p>
            
            <ComponentSection 
              title="Contact Card"
              code={`<div class="basis-contact-card">
  <h3>Contact Us</h3>
  <div class="basis-contact-item">📧 email@example.com</div>
  <div class="basis-contact-item">📞 +1 234 567 890</div>
  <div class="basis-contact-item">📍 Address</div>
</div>`}
            >
              <div className="basis-card max-w-sm">
                <h3 className="font-mono font-bold text-lg mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-brand/10 border border-brand/30">📧</span>
                    <span className="text-sm">hello@marte.group</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-brand/10 border border-brand/30">📞</span>
                    <span className="text-sm">+58 212 555 0100</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-brand/10 border border-brand/30">📍</span>
                    <span className="text-sm">Caracas, Venezuela</span>
                  </div>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Contact Grid"
              code={`<div class="basis-contact-grid">
  <div class="basis-contact-block">Email</div>
  <div class="basis-contact-block">Phone</div>
  <div class="basis-contact-block">Address</div>
  <div class="basis-contact-block">Hours</div>
</div>`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '📧', label: 'Email', value: 'hello@marte.group' },
                  { icon: '📞', label: 'Phone', value: '+58 212 555 0100' },
                  { icon: '📍', label: 'Address', value: 'Caracas, VE' },
                  { icon: '🕐', label: 'Hours', value: 'Mon-Fri 9-6' },
                ].map((c, i) => (
                  <div key={i} className="text-center p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                    <div className="text-2xl mb-2">{c.icon}</div>
                    <div className="font-mono text-xs uppercase tracking-wider opacity-60 mb-1">{c.label}</div>
                    <div className="text-sm font-medium">{c.value}</div>
                  </div>
                ))}
              </div>
            </ComponentSection>
          </div>
        );

      case 'pricing-section':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Pricing Section</h2>
            <p className="text-sm opacity-70 mb-4">Pricing plans and subscription options for products or services.</p>
            
            <ComponentSection 
              title="Pricing Cards"
              code={`<section class="basis-pricing">
  <div class="basis-pricing-card">
    <h3 class="basis-pricing-tier">Starter</h3>
    <div class="basis-pricing-price">$9/mo</div>
    <ul class="basis-pricing-features">...</ul>
    <button class="basis-btn">Choose</button>
  </div>
</section>`}
            >
              {/* Using PriceTable Component */}
              <PriceTable plans={[
                { 
                  name: 'Basic', 
                  price: '$9', 
                  period: 'month',
                  description: 'Perfect for getting started',
                  features: [
                    { text: '5 Projects', included: true },
                    { text: '10GB Storage', included: true },
                    { text: 'API Access', included: false },
                  ],
                  cta: 'Select Plan',
                  popular: false
                },
                { 
                  name: 'Pro', 
                  price: '$29', 
                  period: 'month',
                  description: 'Best for growing teams',
                  features: [
                    { text: 'Unlimited Projects', included: true },
                    { text: '100GB Storage', included: true },
                    { text: 'Priority Support', included: true },
                    { text: 'API Access', included: true },
                  ],
                  cta: 'Select Plan',
                  popular: true
                },
                { 
                  name: 'Enterprise', 
                  price: '$99', 
                  period: 'month',
                  description: 'For large organizations',
                  features: [
                    { text: 'Unlimited Everything', included: true },
                    { text: '1TB Storage', included: true },
                    { text: '24/7 Support', included: true },
                    { text: 'Custom Integrations', included: true },
                  ],
                  cta: 'Contact Sales',
                  popular: false
                },
              ]} />
            </ComponentSection>

            <ComponentSection 
              title="Pricing with Toggle"
              code={`<div class="basis-pricing-toggle">
  <button class="active">Monthly</button>
  <button>Yearly</button>
  <span class="basis-badge">Save 20%</span>
</div>`}
            >
              <PricingToggleDemo />
            </ComponentSection>

            <ComponentSection 
              title="Feature Comparison"
              code={`<table class="basis-pricing-table">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Starter</th>
      <th>Pro</th>
      <th>Enterprise</th>
    </tr>
  </thead>
  <tbody>...</tbody>
</table>`}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-foreground/20 dark:border-white/20">
                      <th className="text-left p-3 font-mono">Feature</th>
                      <th className="text-center p-3 font-mono">Starter</th>
                      <th className="text-center p-3 font-mono text-brand">Pro</th>
                      <th className="text-center p-3 font-mono">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Projects', starter: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
                      { feature: 'Storage', starter: '10GB', pro: '100GB', enterprise: '∞' },
                      { feature: 'API Access', starter: '✕', pro: '✓', enterprise: '✓' },
                      { feature: 'Priority Support', starter: '✕', pro: '✓', enterprise: '✓' },
                      { feature: 'Custom Domain', starter: '✕', pro: '✕', enterprise: '✓' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-foreground/10 dark:border-white/10">
                        <td className="p-3">{row.feature}</td>
                        <td className="text-center p-3 opacity-60">{row.starter}</td>
                        <td className="text-center p-3 text-brand font-medium">{row.pro}</td>
                        <td className="text-center p-3 opacity-80">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ComponentSection>
          </div>
        );

      case 'team-section':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Team Section</h2>
            <p className="text-sm opacity-70 mb-4">Team member profiles and organizational structure displays.</p>
            
            <ComponentSection 
              title="Team Grid"
              code={`<section class="basis-team">
  <div class="basis-team-member">
    <img class="basis-team-avatar" src="..." />
    <h3 class="basis-team-name">Name</h3>
    <p class="basis-team-role">Role</p>
    <div class="basis-team-social">...</div>
  </div>
</section>`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Marco Valle', role: 'CEO & Founder', initial: 'MV' },
                  { name: 'Ana García', role: 'Lead Designer', initial: 'AG' },
                  { name: 'Carlos Ruiz', role: 'Tech Lead', initial: 'CR' },
                  { name: 'Sofía Martín', role: 'Product Manager', initial: 'SM' },
                ].map((member, i) => (
                  <div key={i} className="basis-card text-center">
                    <div className="basis-avatar basis-avatar-xl mx-auto mb-4 bg-brand text-white text-xl">
                      {member.initial}
                    </div>
                    <h3 className="font-mono font-bold">{member.name}</h3>
                    <p className="text-sm opacity-60 mb-3">{member.role}</p>
                    <div className="flex justify-center gap-2">
                      {['𝕏', 'in', '⌘'].map((icon, j) => (
                        <a key={j} href="#" className="w-6 h-6 flex items-center justify-center text-xs opacity-40 hover:opacity-100 transition-opacity">
                          {icon}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Team with Bio"
              code={`<div class="basis-team-bio">
  <img class="basis-team-avatar-lg" src="..." />
  <div class="basis-team-info">
    <h3>Name</h3>
    <p class="basis-team-role">Role</p>
    <p class="basis-team-bio-text">Bio text...</p>
  </div>
</div>`}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: 'Marco Valle', role: 'CEO & Founder', bio: 'With over 15 years of experience in technology and design, Marco leads the vision and strategy of MARTE Group.', initial: 'MV' },
                  { name: 'Ana García', role: 'Lead Designer', bio: 'Ana brings creative excellence to every project, ensuring our design systems are both beautiful and functional.', initial: 'AG' },
                ].map((member, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                    <div className="basis-avatar basis-avatar-xl bg-brand text-white text-xl flex-shrink-0">
                      {member.initial}
                    </div>
                    <div>
                      <h3 className="font-mono font-bold">{member.name}</h3>
                      <p className="text-sm text-brand mb-2">{member.role}</p>
                      <p className="text-sm opacity-60">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Leadership Row"
              code={`<section class="basis-team-leadership">
  <div class="basis-team-leader featured">...</div>
  <div class="basis-team-leader">...</div>
</section>`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/2 basis-card p-6 text-center border-brand border-2">
                  <div className="basis-avatar basis-avatar-xl mx-auto mb-4 bg-brand text-white text-2xl">MV</div>
                  <h3 className="font-mono text-xl font-bold">Marco Valle</h3>
                  <p className="text-brand font-mono text-sm mb-3">CEO & Founder</p>
                  <p className="text-sm opacity-60">Leading the company vision since 2020. Passionate about design systems and developer experience.</p>
                </div>
                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                  {[
                    { name: 'Ana García', role: 'Design', initial: 'AG' },
                    { name: 'Carlos Ruiz', role: 'Engineering', initial: 'CR' },
                    { name: 'Sofía Martín', role: 'Product', initial: 'SM' },
                    { name: 'Luis Torres', role: 'Operations', initial: 'LT' },
                  ].map((m, i) => (
                    <div key={i} className="basis-card text-center p-4">
                      <div className="basis-avatar mx-auto mb-2 bg-brand/80 text-white">{m.initial}</div>
                      <p className="font-mono font-bold text-sm">{m.name}</p>
                      <p className="text-xs opacity-60">{m.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'faq-section':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">FAQ Section</h2>
            <p className="text-sm opacity-70 mb-4">Frequently asked questions with expandable answers.</p>
            
            <ComponentSection 
              title="FAQ Accordion"
              code={`<section class="basis-faq">
  <div class="basis-faq-item">
    <button class="basis-faq-question">Question?</button>
    <div class="basis-faq-answer">Answer...</div>
  </div>
</section>`}
            >
              <div className="space-y-2">
                {[
                  { q: 'What is BASIS KIT?', a: 'BASIS KIT is a Neo-Brutalist Design System built for the MARTE ecosystem. It provides 75+ CSS components and 40+ React components for building consistent, industrial-strength interfaces.' },
                  { q: 'How do I get started?', a: 'Simply include the CSS file or install the npm package. Check the Installation section for detailed instructions for CSS-only, Tailwind, or React integration modes.' },
                  { q: 'Is it free to use?', a: 'Yes! BASIS KIT is open source and free to use for personal and commercial projects. Some premium templates may be available for purchase.' },
                  { q: 'Does it support dark mode?', a: 'Absolutely! Dark mode is built into the core of BASIS KIT. Simply add the "dark" class to your root element or use the provided theme toggle components.' },
                ].map((faq, i) => (
                  <div key={i} className="border-2 border-foreground/20 dark:border-white/20">
                    <button 
                      className="w-full flex items-center justify-between p-4 text-left font-mono font-bold hover:bg-foreground/5 dark:hover:bg-white/5 transition-colors"
                      onClick={() => setAccordionOpen(accordionOpen === i ? null : i)}
                    >
                      <span>{faq.q}</span>
                      <span className="text-brand">{accordionOpen === i ? '−' : '+'}</span>
                    </button>
                    {accordionOpen === i && (
                      <div className="p-4 pt-0 text-sm opacity-70 border-t border-foreground/10 dark:border-white/10">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="FAQ with Categories"
              code={`<div class="basis-faq-categories">
  <button class="basis-faq-category active">General</button>
  <button class="basis-faq-category">Technical</button>
  <button class="basis-faq-category">Billing</button>
</div>
<div class="basis-faq-list">...</div>`}
            >
              <div className="space-y-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {['General', 'Technical', 'Billing', 'Support'].map((cat, i) => (
                    <button 
                      key={i} 
                      className={"px-4 py-2 font-mono text-sm whitespace-nowrap border-2 transition-colors " + (
                        i === 0
                          ? 'bg-brand text-white border-brand'
                          : 'border-foreground/20 dark:border-white/20 hover:border-brand'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {[
                    { q: 'What browsers are supported?', a: 'BASIS KIT supports all modern browsers including Chrome, Firefox, Safari, and Edge. IE11 is not supported.' },
                    { q: 'Can I customize the design tokens?', a: 'Yes! All design tokens are CSS variables that can be overridden. You can also extend the Tailwind config for utility-based customization.' },
                  ].map((faq, i) => (
                    <div key={i} className="p-4 bg-secondary dark:bg-white/5 border border-foreground/20 dark:border-white/20">
                      <p className="font-mono font-bold mb-2">{faq.q}</p>
                      <p className="text-sm opacity-70">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="FAQ Grid"
              code={`<div class="basis-faq-grid">
  <div class="basis-faq-card">
    <h4>Question</h4>
    <p>Answer</p>
  </div>
</div>`}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { q: 'How do I report a bug?', a: 'Open an issue on our GitHub repository with a detailed description and reproduction steps.' },
                  { q: 'Can I contribute?', a: 'Yes! We welcome contributions. Check our contributing guide and submit a pull request.' },
                  { q: 'Is TypeScript supported?', a: 'Yes, all React components include TypeScript definitions out of the box.' },
                  { q: 'How often is it updated?', a: 'We release updates regularly, typically every 2-4 weeks with new features and fixes.' },
                ].map((faq, i) => (
                  <div key={i} className="basis-card">
                    <h4 className="font-mono font-bold mb-2">{faq.q}</h4>
                    <p className="text-sm opacity-70">{faq.a}</p>
                  </div>
                ))}
              </div>
            </ComponentSection>
          </div>
        );

      case 'bento-grid':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Bento Grid</h2>
            <p className="text-sm opacity-70 mb-4">Modern modular grid layout inspired by Apple's bento boxes. Perfect for showcasing features, products, or content blocks.</p>
            
            <ComponentSection 
              title="Bento Grid Basic"
              code={`<section class="basis-bento">
  <div class="basis-bento-item">1x1</div>
  <div class="basis-bento-item span-2">2x1</div>
  <div class="basis-bento-item span-row">1x2</div>
  <div class="basis-bento-item span-2 span-row">2x2</div>
</section>`}
            >
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-2 row-span-2 p-6 bg-brand text-white border-2 border-current">
                  <span className="font-mono text-xs opacity-60">FEATURED</span>
                  <h3 className="font-mono text-xl font-bold mt-2">Main Feature</h3>
                  <p className="text-sm opacity-80 mt-2">2x2 cell spanning both columns and rows</p>
                </div>
                <div className="p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                  <span className="text-2xl">⚡</span>
                  <p className="font-mono text-sm font-bold mt-2">Fast</p>
                </div>
                <div className="p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                  <span className="text-2xl">🎨</span>
                  <p className="font-mono text-sm font-bold mt-2">Custom</p>
                </div>
                <div className="col-span-2 p-4 bg-brand/10 border-2 border-brand">
                  <p className="font-mono text-sm font-bold">Wide Feature Block</p>
                  <p className="text-xs opacity-60 mt-1">Spans 2 columns</p>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Bento Grid Features"
              code={`<div class="basis-bento-features">
  <div class="basis-bento-feature icon">...</div>
</div>`}
            >
              <div className="grid grid-cols-3 gap-3">
                <div className="p-5 bg-brand text-white border-2 border-current">
                  <span className="text-3xl">🚀</span>
                  <h3 className="font-mono font-bold mt-3">Performance</h3>
                  <p className="text-sm opacity-80 mt-2">Optimized for speed with minimal bundle size</p>
                </div>
                <div className="p-5 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                  <span className="text-3xl">📱</span>
                  <h3 className="font-mono font-bold mt-3">Responsive</h3>
                  <p className="text-sm opacity-60 mt-2">Works on all screen sizes</p>
                </div>
                <div className="p-5 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                  <span className="text-3xl">🌙</span>
                  <h3 className="font-mono font-bold mt-3">Dark Mode</h3>
                  <p className="text-sm opacity-60 mt-2">Built-in theme switching</p>
                </div>
                <div className="col-span-2 p-5 bg-stripes border-2 border-foreground/20 dark:border-white/20">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">💎</span>
                    <div>
                      <h3 className="font-mono font-bold">Premium Quality</h3>
                      <p className="text-sm opacity-60 mt-1">Every component is carefully crafted and tested</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-brand-secondary text-white border-2 border-current">
                  <span className="text-3xl">🔧</span>
                  <h3 className="font-mono font-bold mt-3">DX First</h3>
                  <p className="text-sm opacity-80 mt-2">Great developer experience</p>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Bento Grid Dashboard"
              code={`<div class="basis-bento-dashboard">
  <div class="basis-bento-stat">...</div>
  <div class="basis-bento-chart">...</div>
</div>`}
            >
              <div className="grid grid-cols-4 gap-3">
                <div className="p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                  <p className="font-mono text-xs opacity-60">Users</p>
                  <p className="font-mono text-2xl font-bold text-brand">12.4K</p>
                  <p className="text-xs text-green-500">↑ 12%</p>
                </div>
                <div className="p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                  <p className="font-mono text-xs opacity-60">Revenue</p>
                  <p className="font-mono text-2xl font-bold text-brand">$45K</p>
                  <p className="text-xs text-green-500">↑ 8%</p>
                </div>
                <div className="p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                  <p className="font-mono text-xs opacity-60">Orders</p>
                  <p className="font-mono text-2xl font-bold text-brand">847</p>
                  <p className="text-xs text-green-500">↑ 24%</p>
                </div>
                <div className="p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                  <p className="font-mono text-xs opacity-60">Growth</p>
                  <p className="font-mono text-2xl font-bold text-brand">+32%</p>
                  <p className="text-xs text-green-500">↑ this month</p>
                </div>
                <div className="col-span-3 row-span-2 p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                  <p className="font-mono text-xs opacity-60 mb-4">Activity Chart</p>
                  <div className="flex items-end gap-2 h-24">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div key={i} className="flex-1 bg-brand/60 hover:bg-brand transition-colors" style={{ height: h + "%" }}></div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-brand text-white border-2 border-current">
                  <p className="font-mono text-xs opacity-80">Conversion</p>
                  <p className="font-mono text-3xl font-bold">4.2%</p>
                  <div className="mt-2 h-2 bg-white/20">
                    <div className="h-full bg-white w-[42%]"></div>
                  </div>
                </div>
                <div className="p-4 bg-green-500/10 border-2 border-green-500 text-center">
                  <p className="font-mono text-2xl">✓</p>
                  <p className="text-xs font-mono mt-1">All Systems OK</p>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'process-steps':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Process Steps</h2>
            <p className="text-sm opacity-70 mb-4">Visual representation of workflows, processes, or sequential steps.</p>
            
            <ComponentSection 
              title="Horizontal Steps"
              code={`<nav class="basis-steps">
  <div class="basis-step complete">
    <span class="basis-step-number">1</span>
    <span class="basis-step-label">Step One</span>
  </div>
  <div class="basis-step active">...</div>
  <div class="basis-step">...</div>
</nav>`}
            >
              <div className="flex items-center justify-between">
                {[
                  { num: '1', label: 'Create', status: 'complete' },
                  { num: '2', label: 'Configure', status: 'complete' },
                  { num: '3', label: 'Deploy', status: 'active' },
                  { num: '4', label: 'Monitor', status: 'pending' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={"w-10 h-10 flex items-center justify-center border-2 font-mono font-bold " + (
                        step.status === 'complete'
                          ? 'bg-brand text-white border-brand'
                          : step.status === 'active'
                            ? 'bg-brand/10 text-brand border-brand'
                            : 'bg-secondary dark:bg-white/5 border-foreground/20 dark:border-white/20'
                      )}>
                        {step.status === 'complete' ? '✓' : step.num}
                      </div>
                      <span className={"font-mono text-xs mt-2 " + (
                        step.status === 'active' ? 'text-brand font-bold' : 'opacity-60'
                      )}>
                        {step.label}
                      </span>
                    </div>
                    {i < 3 && (
                      <div className={"flex-1 h-0.5 mx-2 " + (
                        step.status === 'complete' ? 'bg-brand' : 'bg-foreground/20 dark:bg-white/20'
                      )}></div>
                    )}
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Vertical Process"
              code={`<div class="basis-process">
  <div class="basis-process-step">
    <div class="basis-process-marker">1</div>
    <div class="basis-process-content">...</div>
  </div>
</div>`}
            >
              <div className="space-y-0">
                {[
                  { num: '01', title: 'Design', desc: 'Create your design tokens and component specifications', icon: '🎨' },
                  { num: '02', title: 'Develop', desc: 'Build components using the BASIS KIT framework', icon: '⚙️' },
                  { num: '03', title: 'Test', desc: 'Validate accessibility and cross-browser compatibility', icon: '🧪' },
                  { num: '04', title: 'Deploy', desc: 'Ship your design system to production', icon: '🚀' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-brand text-white font-mono font-bold border-2 border-brand">
                        {step.num}
                      </div>
                      {i < 3 && (
                        <div className="w-0.5 h-16 bg-brand/30"></div>
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{step.icon}</span>
                        <h4 className="font-mono font-bold">{step.title}</h4>
                      </div>
                      <p className="text-sm opacity-60">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Process Cards"
              code={`<div class="basis-process-cards">
  <div class="basis-process-card">
    <span class="basis-process-icon">🎯</span>
    <h4>Step Title</h4>
    <p>Step description...</p>
  </div>
</div>`}
            >
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { num: '01', title: 'Research', desc: 'Understand user needs and business goals', icon: '🔍' },
                  { num: '02', title: 'Design', desc: 'Create wireframes and visual designs', icon: '✏️' },
                  { num: '03', title: 'Build', desc: 'Develop with BASIS KIT components', icon: '🛠️' },
                  { num: '04', title: 'Launch', desc: 'Deploy and iterate based on feedback', icon: '🎯' },
                ].map((step, i) => (
                  <div key={i} className="basis-card relative overflow-hidden">
                    <span className="absolute top-2 right-2 font-mono text-4xl font-bold opacity-10">{step.num}</span>
                    <span className="text-3xl mb-3 block">{step.icon}</span>
                    <h4 className="font-mono font-bold mb-2">{step.title}</h4>
                    <p className="text-sm opacity-60">{step.desc}</p>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Timeline Process"
              code={`<div class="basis-timeline">
  <div class="basis-timeline-item">
    <div class="basis-timeline-date">Jan 2024</div>
    <div class="basis-timeline-content">...</div>
  </div>
</div>`}
            >
              <div className="relative pl-8 border-l-2 border-foreground/20 dark:border-white/20 space-y-6">
                {[
                  { date: 'Q1 2024', title: 'Project Kickoff', desc: 'Initial planning and team assembly', status: 'complete' },
                  { date: 'Q2 2024', title: 'Design Phase', desc: 'Create design system foundation', status: 'complete' },
                  { date: 'Q3 2024', title: 'Development', desc: 'Build and test all components', status: 'active' },
                  { date: 'Q4 2024', title: 'Launch', desc: 'Public release and documentation', status: 'pending' },
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[25px] w-4 h-4 border-2 ${
                      item.status === 'complete' 
                        ? 'bg-brand border-brand' 
                        : item.status === 'active'
                          ? 'bg-background border-brand'
                          : 'bg-background border-foreground/30 dark:border-white/30'
                    }`}></div>
                    <div className="mb-1">
                      <span className="font-mono text-xs text-brand">{item.date}</span>
                    </div>
                    <h4 className="font-mono font-bold">{item.title}</h4>
                    <p className="text-sm opacity-60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </ComponentSection>
          </div>
        );

      case 'comparison-table':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Comparison Table</h2>
            <p className="text-sm opacity-70 mb-4">Side-by-side comparison of features, plans, or options.</p>
            
            <ComponentSection 
              title="Feature Comparison"
              code={`<table class="basis-comparison">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Basic</th>
      <th>Pro</th>
      <th>Enterprise</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Users</td>
      <td>5</td>
      <td>50</td>
      <td>Unlimited</td>
    </tr>
  </tbody>
</table>`}
            >
              <div className="overflow-x-auto">
                <table className="w-full border-2 border-foreground/20 dark:border-white/20">
                  <thead>
                    <tr className="bg-secondary dark:bg-white/5">
                      <th className="text-left p-4 font-mono font-bold border-b border-foreground/20 dark:border-white/20">Feature</th>
                      <th className="text-center p-4 font-mono border-b border-foreground/20 dark:border-white/20">
                        <span className="opacity-60">Basic</span>
                      </th>
                      <th className="text-center p-4 font-mono border-b border-foreground/20 dark:border-white/20">
                        <span className="text-brand font-bold">Pro</span>
                      </th>
                      <th className="text-center p-4 font-mono border-b border-foreground/20 dark:border-white/20">
                        <span className="opacity-80">Enterprise</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Team Members', basic: '3', pro: '20', enterprise: 'Unlimited' },
                      { feature: 'Projects', basic: '5', pro: '50', enterprise: 'Unlimited' },
                      { feature: 'Storage', basic: '10 GB', pro: '100 GB', enterprise: '1 TB' },
                      { feature: 'API Access', basic: '✕', pro: '✓', enterprise: '✓' },
                      { feature: 'Custom Domain', basic: '✕', pro: '✓', enterprise: '✓' },
                      { feature: 'Priority Support', basic: '✕', pro: '✕', enterprise: '✓' },
                      { feature: 'SLA', basic: '✕', pro: '✕', enterprise: '99.9%' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-foreground/10 dark:border-white/10 hover:bg-foreground/5 dark:hover:bg-white/5">
                        <td className="p-4 font-mono">{row.feature}</td>
                        <td className="text-center p-4 opacity-60">{row.basic}</td>
                        <td className="text-center p-4 text-brand font-medium">{row.pro}</td>
                        <td className="text-center p-4">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Comparison Cards"
              code={`<div class="basis-comparison-cards">
  <div class="basis-comparison-card">Option A</div>
  <div class="basis-comparison-card featured">Option B</div>
</div>`}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="basis-card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-foreground/10 dark:bg-white/10 flex items-center justify-center font-mono font-bold">A</div>
                    <div>
                      <h4 className="font-mono font-bold">Current Solution</h4>
                      <p className="text-xs opacity-60">What you're using now</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {['Manual CSS management', 'Inconsistent design', 'No dark mode support', 'High maintenance cost'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 opacity-60">
                        <span className="text-red-500">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="basis-card border-brand border-2 relative">
                  <span className="absolute -top-3 right-4 px-2 py-0.5 bg-brand text-white text-xs font-mono">RECOMMENDED</span>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-brand flex items-center justify-center text-white font-mono font-bold">B</div>
                    <div>
                      <h4 className="font-mono font-bold">BASIS KIT</h4>
                      <p className="text-xs opacity-60">Design System Solution</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {['75+ ready components', 'Consistent design language', 'Built-in dark mode', 'Active development'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Technology Stack Comparison"
              code={`<div class="basis-tech-comparison">
  <div class="basis-tech-item">React vs Vue</div>
</div>`}
            >
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { 
                    tech: 'CSS Only', 
                    icon: '🎨',
                    pros: ['Zero dependencies', 'Works everywhere', 'Small bundle'],
                    cons: ['No interactivity', 'Manual implementation'],
                    useCase: 'Static sites, WordPress'
                  },
                  { 
                    tech: 'Tailwind', 
                    icon: '💨',
                    pros: ['Rapid development', 'Utility-first', 'Highly customizable'],
                    cons: ['Learning curve', 'HTML can get verbose'],
                    useCase: 'Modern web apps',
                    featured: true
                  },
                  { 
                    tech: 'React', 
                    icon: '⚛️',
                    pros: ['Full DX', 'TypeScript support', 'Compound components'],
                    cons: ['React required', 'Bundle overhead'],
                    useCase: 'React/Next.js apps'
                  },
                ].map((tech, i) => (
                  <div key={i} className={`basis-card ${tech.featured ? 'border-brand border-2' : ''}`}>
                    <div className="text-center mb-4">
                      <span className="text-3xl">{tech.icon}</span>
                      <h4 className="font-mono font-bold mt-2">{tech.tech}</h4>
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      {tech.pros.map((pro, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <span className="text-green-500 text-xs">+</span>
                          <span className="opacity-70">{pro}</span>
                        </div>
                      ))}
                      {tech.cons.map((con, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <span className="text-red-500 text-xs">−</span>
                          <span className="opacity-50">{con}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-foreground/10 dark:border-white/10">
                      <p className="text-xs font-mono opacity-60">Best for:</p>
                      <p className="text-sm">{tech.useCase}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Decision Matrix"
              code={`<table class="basis-decision-matrix">
  <tr>
    <th>Criteria</th>
    <th>Weight</th>
    <th>Option A</th>
    <th>Option B</th>
  </tr>
</table>`}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary dark:bg-white/5">
                      <th className="text-left p-3 font-mono">Criteria</th>
                      <th className="text-center p-3 font-mono">Weight</th>
                      <th className="text-center p-3 font-mono">CSS</th>
                      <th className="text-center p-3 font-mono">Tailwind</th>
                      <th className="text-center p-3 font-mono">React</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { criteria: 'Performance', weight: 'High', css: '★★★★★', tailwind: '★★★★☆', react: '★★★★☆' },
                      { criteria: 'DX', weight: 'High', css: '★★☆☆☆', tailwind: '★★★★☆', react: '★★★★★' },
                      { criteria: 'Flexibility', weight: 'Medium', css: '★★★☆☆', tailwind: '★★★★★', react: '★★★★☆' },
                      { criteria: 'Learning Curve', weight: 'Medium', css: '★★★★★', tailwind: '★★★☆☆', react: '★★★☆☆' },
                      { criteria: 'Bundle Size', weight: 'High', css: '★★★★★', tailwind: '★★★★☆', react: '★★★☆☆' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-foreground/10 dark:border-white/10">
                        <td className="p-3 font-mono">{row.criteria}</td>
                        <td className="text-center p-3">
                          <span className={`text-xs px-2 py-0.5 ${
                            row.weight === 'High' ? 'bg-brand/10 text-brand' : 'bg-foreground/5 dark:bg-white/5'
                          }`}>{row.weight}</span>
                        </td>
                        <td className="text-center p-3">{row.css}</td>
                        <td className="text-center p-3">{row.tailwind}</td>
                        <td className="text-center p-3">{row.react}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ComponentSection>
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      // COMPONENTS
      // ─────────────────────────────────────────────────────────────────────
      case 'buttons':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Buttons</h2>
            
            <div className="basis-card p-4 bg-brand/10 border-2 border-brand mb-6">
              <p className="text-sm">
                <strong className="font-mono">💡 Tip:</strong> Each component shows code for all 3 modes: 
                <span className="font-mono ml-2 px-2 py-0.5 bg-neutral-800 text-white text-xs">CSS</span>
                <span className="font-mono ml-1 px-2 py-0.5 bg-neutral-700 text-white text-xs">Tailwind</span>
                <span className="font-mono ml-1 px-2 py-0.5 bg-neutral-600 text-white text-xs">React</span>
              </p>
            </div>

            <ComponentSectionModes 
              title="Button Variants"
              modes={{
                css: "<!-- CSS-only: Use pre-built component classes -->\n" +
                "<button class=\"basis-btn basis-btn-primary\">Primary</button>\n" +
                "<button class=\"basis-btn basis-btn-secondary\">Secondary</button>\n" +
                "<button class=\"basis-btn basis-btn-outline\">Outline</button>\n" +
                "<button class=\"basis-btn basis-btn-ghost\">Ghost</button>\n" +
                "<button class=\"basis-btn basis-btn-danger\">Danger</button>\n" +
                "<button class=\"basis-btn basis-btn-success\">Success</button>",
                tailwind: "<!-- Tailwind: Build with utility classes -->\n" +
                "<button class=\"px-4 py-2 bg-brand text-white font-mono font-semibold \n" +
                "  border-2 border-current shadow-[4px_4px_0_0_currentColor] \n" +
                "  hover:translate-x-[2px] hover:translate-y-[2px] \n" +
                "  hover:shadow-[2px_2px_0_0_currentColor] transition-all\">\n" +
                "  Primary\n" +
                "</button>\n" +
                "\n" +
                "<button class=\"px-4 py-2 bg-brand-secondary text-white font-mono font-semibold \n" +
                "  border-2 border-current shadow-[4px_4px_0_0_currentColor]\">\n" +
                "  Secondary\n" +
                "</button>\n" +
                "\n" +
                "<button class=\"px-4 py-2 bg-transparent text-current font-mono font-semibold \n" +
                "  border-2 border-current hover:bg-current/10 transition-colors\">\n" +
                "  Outline\n" +
                "</button>",
                react: "// React: Use typed components\n" +
                "import { Button } from '@marte/basis';\n" +
                "\n" +
                "<Button variant=\"primary\">Primary</Button>\n" +
                "<Button variant=\"secondary\">Secondary</Button>\n" +
                "<Button variant=\"outline\">Outline</Button>\n" +
                "<Button variant=\"ghost\">Ghost</Button>\n" +
                "<Button variant=\"danger\">Danger</Button>\n" +
                "<Button variant=\"success\">Success</Button>\n" +
                "\n" +
                "// With additional props\n" +
                "<Button variant=\"primary\" size=\"lg\" shadow=\"lg\" disabled>\n" +
                "  Large Disabled\n" +
                "</Button>"
              }}
            >
              <div className="flex flex-wrap gap-3">
                <button className="basis-btn basis-btn-primary">Primary</button>
                <button className="basis-btn basis-btn-secondary">Secondary</button>
                <button className="basis-btn basis-btn-outline">Outline</button>
                <button className="basis-btn basis-btn-ghost">Ghost</button>
                <button className="basis-btn basis-btn-danger">Danger</button>
                <button className="basis-btn basis-btn-success">Success</button>
              </div>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="Button Sizes"
              modes={{
                css: "<!-- CSS-only: Size modifier classes -->\n" +
                "<button class=\"basis-btn basis-btn-primary basis-btn-xs\">XS</button>\n" +
                "<button class=\"basis-btn basis-btn-primary basis-btn-sm\">SM</button>\n" +
                "<button class=\"basis-btn basis-btn-primary\">MD (default)</button>\n" +
                "<button class=\"basis-btn basis-btn-primary basis-btn-lg\">LG</button>\n" +
                "<button class=\"basis-btn basis-btn-primary basis-btn-xl\">XL</button>",
                tailwind: "<!-- Tailwind: Size with padding utilities -->\n" +
                "<button class=\"px-2 py-1 text-xs font-mono\">XS</button>\n" +
                "<button class=\"px-3 py-1.5 text-sm font-mono\">SM</button>\n" +
                "<button class=\"px-4 py-2 text-base font-mono\">MD</button>\n" +
                "<button class=\"px-6 py-3 text-lg font-mono\">LG</button>\n" +
                "<button class=\"px-8 py-4 text-xl font-mono\">XL</button>",
                react: "// React: Size prop with TypeScript\n" +
                "<Button variant=\"primary\" size=\"xs\">XS</Button>\n" +
                "<Button variant=\"primary\" size=\"sm\">SM</Button>\n" +
                "<Button variant=\"primary\" size=\"md\">MD</Button>\n" +
                "<Button variant=\"primary\" size=\"lg\">LG</Button>\n" +
                "<Button variant=\"primary\" size=\"xl\">XL</Button>\n" +
                "\n" +
                "// Available sizes: 'xs' | 'sm' | 'md' | 'lg' | 'xl'"
              }}
            >
              <div className="flex flex-wrap items-end gap-3">
                <button className="basis-btn basis-btn-primary basis-btn-xs">XS</button>
                <button className="basis-btn basis-btn-primary basis-btn-sm">SM</button>
                <button className="basis-btn basis-btn-primary">MD</button>
                <button className="basis-btn basis-btn-primary basis-btn-lg">LG</button>
                <button className="basis-btn basis-btn-primary basis-btn-xl">XL</button>
              </div>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="Button Shadows"
              modes={{
                css: "<!-- CSS-only: Shadow modifier classes -->\n" +
                "<button class=\"basis-btn basis-btn-primary shadow-brutal-sm\">Small</button>\n" +
                "<button class=\"basis-btn basis-btn-primary shadow-brutal\">Default</button>\n" +
                "<button class=\"basis-btn basis-btn-primary shadow-brutal-lg\">Large</button>\n" +
                "<button class=\"basis-btn basis-btn-primary shadow-brutal-xl\">XL</button>\n" +
                "<button class=\"basis-btn basis-btn-primary shadow-brutal-brand\">Brand</button>",
                tailwind: "<!-- Tailwind: Custom shadow utilities -->\n" +
                "<button class=\"shadow-[2px_2px_0_0_currentColor]\">Small</button>\n" +
                "<button class=\"shadow-[4px_4px_0_0_currentColor]\">Default</button>\n" +
                "<button class=\"shadow-[6px_6px_0_0_currentColor]\">Large</button>\n" +
                "<button class=\"shadow-[8px_8px_0_0_currentColor]\">XL</button>\n" +
                "<button class=\"shadow-[4px_4px_0_0_var(--brand)]\">Brand</button>",
                react: "// React: Shadow prop\n" +
                "<Button variant=\"primary\" shadow=\"sm\">Small</Button>\n" +
                "<Button variant=\"primary\" shadow=\"md\">Default</Button>\n" +
                "<Button variant=\"primary\" shadow=\"lg\">Large</Button>\n" +
                "<Button variant=\"primary\" shadow=\"xl\">XL</Button>\n" +
                "<Button variant=\"primary\" shadow=\"brand\">Brand</Button>\n" +
                "\n" +
                "// Available: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'brand' | 'brand-secondary'"
              }}
            >
              <div className="flex flex-wrap gap-3">
                <button className="basis-btn basis-btn-primary shadow-brutal-sm">Small</button>
                <button className="basis-btn basis-btn-primary shadow-brutal">Default</button>
                <button className="basis-btn basis-btn-primary shadow-brutal-lg">Large</button>
                <button className="basis-btn basis-btn-primary shadow-brutal-xl">XL</button>
                <button className="basis-btn basis-btn-primary shadow-brutal-brand">Brand</button>
              </div>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="Brand Secondary"
              modes={{
                css: "<!-- CSS-only: Dual primary color system -->\n" +
                "<button class=\"basis-btn basis-btn-brand-secondary\">Brand Secondary</button>\n" +
                "\n" +
                "<!-- For MSICCA: primary is orange, secondary is blue -->\n" +
                "<!-- Color automatically switches based on brand context -->",
                tailwind: "<!-- Tailwind: Use brand-secondary color -->\n" +
                "<button class=\"px-4 py-2 bg-brand-secondary text-white \n" +
                "  font-mono font-semibold border-2 border-current \n" +
                "  shadow-[4px_4px_0_0_currentColor]\">\n" +
                "  Brand Secondary\n" +
                "</button>",
                react: "// React: brand-secondary variant\n" +
                "<Button variant=\"brand-secondary\">Brand Secondary</Button>\n" +
                "\n" +
                "// For dual-brand contexts (like MSICCA)\n" +
                "// primary = #C93400 (orange)\n" +
                "// secondary = #0095C9 (blue)"
              }}
            >
              <button className="basis-btn basis-btn-brand-secondary">Brand Secondary</button>
            </ComponentSectionModes>
          </div>
        );

      case 'cards':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Cards</h2>
            
            <ComponentSectionModes 
              title="Card Variants"
              modes={{
                css: "<!-- CSS-only: Card component classes -->\n" +
                "<div class=\"basis-card\">\n" +
                "  <h3>Standard Card</h3>\n" +
                "  <p>Brutal border + shadow</p>\n" +
                "</div>\n" +
                "\n" +
                "<div class=\"basis-card basis-card-stripes\">\n" +
                "  <h3>Striped Card</h3>\n" +
                "  <p>With diagonal pattern background</p>\n" +
                "</div>\n" +
                "\n" +
                "<div class=\"basis-card basis-card-accent\">\n" +
                "  <h3>Accent Card</h3>\n" +
                "  <p>Brand color top border</p>\n" +
                "</div>\n" +
                "\n" +
                "<div class=\"basis-card basis-card-outlined\">\n" +
                "  <h3>Outlined Card</h3>\n" +
                "  <p>No shadow, just border</p>\n" +
                "</div>",
                tailwind: "<!-- Tailwind: Card with utilities -->\n" +
                "<div class=\"p-6 bg-white dark:bg-neutral-900 border-2 border-current \n" +
                "  shadow-[4px_4px_0_0_currentColor]\">\n" +
                "  <h3 class=\"font-mono font-bold\">Standard Card</h3>\n" +
                "  <p class=\"text-sm opacity-70\">Card content</p>\n" +
                "</div>\n" +
                "\n" +
                "<!-- Striped with pattern -->\n" +
                "<div class=\"p-6 border-2 border-current bg-stripes \n" +
                "  shadow-[4px_4px_0_0_currentColor]\">\n" +
                "  <h3>Striped Card</h3>\n" +
                "</div>\n" +
                "\n" +
                "<!-- Accent with brand border -->\n" +
                "<div class=\"p-6 border-2 border-t-4 border-t-brand \n" +
                "  shadow-[4px_4px_0_0_currentColor]\">\n" +
                "  <h3>Accent Card</h3>\n" +
                "</div>",
                react: "// React: Card with compound components\n" +
                "import { Card, Button } from '@marte/basis';\n" +
                "\n" +
                "<Card variant=\"standard\" shadow=\"lg\">\n" +
                "  <Card.Header>\n" +
                "    <Card.Title>Card Title</Card.Title>\n" +
                "    <Card.Description>Optional description</Card.Description>\n" +
                "  </Card.Header>\n" +
                "  <Card.Content>\n" +
                "    <p>Main content...</p>\n" +
                "  </Card.Content>\n" +
                "  <Card.Footer>\n" +
                "    <Button size=\"sm\">Action</Button>\n" +
                "  </Card.Footer>\n" +
                "</Card>\n" +
                "\n" +
                "// Variants: 'standard' | 'stripes' | 'accent' | 'outlined' | 'interactive'\n" +
                "<Card variant=\"stripes\" hoverable>Striped Card</Card>\n" +
                "<Card variant=\"accent\">Accent Card</Card>\n" +
                "<Card variant=\"outlined\">Outlined Card</Card>"
              }}
            >
              <div className="grid md:grid-cols-4 gap-4">
                <div className="basis-card">
                  <h4 className="font-mono font-semibold">Standard</h4>
                  <p className="text-sm opacity-70 mt-1">Brutal border + shadow</p>
                </div>
                <div className="basis-card basis-card-stripes">
                  <h4 className="font-mono font-semibold">Striped</h4>
                  <p className="text-sm opacity-70 mt-1">Diagonal pattern</p>
                </div>
                <div className="basis-card basis-card-accent">
                  <h4 className="font-mono font-semibold">Accent</h4>
                  <p className="text-sm opacity-70 mt-1">Brand color accent</p>
                </div>
                <div className="basis-card basis-card-outlined">
                  <h4 className="font-mono font-semibold">Outlined</h4>
                  <p className="text-sm opacity-70 mt-1">No shadow</p>
                </div>
              </div>
            </ComponentSectionModes>

            <ComponentSection 
              title="Pattern Backgrounds"
              description="Patterns can be applied to any element. Spacing is configurable: sm (4px), default (8px), lg (16px), xl (24px)"
              code={`<!-- Diagonal Stripes (-21deg) -->
<div class="bg-stripes">Default stripes</div>
<div class="bg-stripes-brand">Brand stripes</div>

<!-- Dotted Pattern (configurable spacing) -->
<div class="bg-dots-sm">Small dots (4px)</div>
<div class="bg-dots">Default dots (8px)</div>
<div class="bg-dots-lg">Large dots (16px)</div>
<div class="bg-dots-xl">Extra large dots (24px)</div>
<div class="bg-dots-brand">Brand dots</div>

<!-- Grid Pattern (configurable spacing) -->
<div class="bg-grid-sm">Small grid (4px)</div>
<div class="bg-grid">Default grid (8px)</div>
<div class="bg-grid-lg">Large grid (16px)</div>
<div class="bg-grid-xl">Extra large grid (24px)</div>
<div class="bg-grid-brand">Brand grid</div>

<!-- Angled Grid (X pattern, configurable) -->
<div class="bg-grid-angle">Default (8px)</div>
<div class="bg-grid-angle-lg">Large (16px)</div>
<div class="bg-grid-angle-xl">Extra large (24px)</div>
<div class="bg-grid-angle-brand">Brand angled</div>

<!-- Diamond Pattern -->
<div class="bg-diamond">Default diamond</div>
<div class="bg-diamond-lg">Large diamond</div>`}
            >
              <p className="font-mono text-xs opacity-60 mb-4">All patterns support dark mode automatically</p>
              
              <h4 className="font-mono font-semibold text-sm mb-2 opacity-60">Diagonal Stripes</h4>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-stripes">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">Stripes</h4>
                    <p className="text-xs opacity-60">.bg-stripes</p>
                  </div>
                </div>
                <div className="relative overflow-hidden border-2 border-brand/30 p-4 h-20 bg-stripes-brand">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm text-brand">Brand Stripes</h4>
                    <p className="text-xs opacity-60">.bg-stripes-brand</p>
                  </div>
                </div>
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-stripes-bg">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">Subtle Stripes</h4>
                    <p className="text-xs opacity-60">.bg-stripes-bg</p>
                  </div>
                </div>
              </div>

              <h4 className="font-mono font-semibold text-sm mb-2 opacity-60">Dotted Pattern (configurable)</h4>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-dots-sm">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">Small</h4>
                    <p className="text-xs opacity-60">.bg-dots-sm (4px)</p>
                  </div>
                </div>
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-dots">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">Default</h4>
                    <p className="text-xs opacity-60">.bg-dots (8px)</p>
                  </div>
                </div>
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-dots-lg">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">Large</h4>
                    <p className="text-xs opacity-60">.bg-dots-lg (16px)</p>
                  </div>
                </div>
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-dots-xl">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">XL</h4>
                    <p className="text-xs opacity-60">.bg-dots-xl (24px)</p>
                  </div>
                </div>
              </div>

              <h4 className="font-mono font-semibold text-sm mb-2 opacity-60">Grid Pattern (configurable)</h4>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-grid-sm">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">Small</h4>
                    <p className="text-xs opacity-60">.bg-grid-sm (4px)</p>
                  </div>
                </div>
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-grid">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">Default</h4>
                    <p className="text-xs opacity-60">.bg-grid (8px)</p>
                  </div>
                </div>
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-grid-lg">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">Large</h4>
                    <p className="text-xs opacity-60">.bg-grid-lg (16px)</p>
                  </div>
                </div>
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-grid-xl">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">XL</h4>
                    <p className="text-xs opacity-60">.bg-grid-xl (24px)</p>
                  </div>
                </div>
              </div>

              <h4 className="font-mono font-semibold text-sm mb-2 opacity-60">Angled Grid / X Pattern (45° cross)</h4>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-grid-angle">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">Default</h4>
                    <p className="text-xs opacity-60">.bg-grid-angle (8px)</p>
                  </div>
                </div>
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-grid-angle-lg">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">Large</h4>
                    <p className="text-xs opacity-60">.bg-grid-angle-lg (16px)</p>
                  </div>
                </div>
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-grid-angle-xl">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">XL</h4>
                    <p className="text-xs opacity-60">.bg-grid-angle-xl (24px)</p>
                  </div>
                </div>
                <div className="relative overflow-hidden border-2 border-brand/30 p-4 h-20 bg-grid-angle-brand">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm text-brand">Brand</h4>
                    <p className="text-xs opacity-60">.bg-grid-angle-brand</p>
                  </div>
                </div>
              </div>

              <h4 className="font-mono font-semibold text-sm mb-2 opacity-60">Diamond Pattern</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-diamond">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">Diamond</h4>
                    <p className="text-xs opacity-60">.bg-diamond</p>
                  </div>
                </div>
                <div className="relative overflow-hidden border-2 border-foreground/20 p-4 h-20 bg-diamond-lg">
                  <div className="relative z-10">
                    <h4 className="font-mono font-semibold text-sm">Diamond Large</h4>
                    <p className="text-xs opacity-60">.bg-diamond-lg</p>
                  </div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'typography':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Typography Components</h2>
            
            <ComponentSection 
              title="Paragraph"
              code={`<p class="basis-paragraph">Regular paragraph text.</p>
<p class="basis-paragraph basis-paragraph-lead">Lead paragraph for introductions.</p>`}
            >
              <p className="basis-paragraph mb-2">This is a regular paragraph with proper line height and readability settings.</p>
              <p className="basis-paragraph basis-paragraph-lead">This is a lead paragraph, typically used for introductions or important summaries.</p>
            </ComponentSection>

            <ComponentSection 
              title="Subheading & Eyebrow"
              code={`<p class="basis-subheading">SECTION LABEL</p>
<p class="basis-eyebrow">Chapter 01</p>`}
            >
              <p className="basis-subheading mb-4">SECTION LABEL</p>
              <p className="basis-eyebrow">Chapter 01</p>
            </ComponentSection>

            <ComponentSection 
              title="Quote"
              code={`<blockquote class="basis-quote">
  "Design is not just what it looks like."
  <cite class="basis-quote-attribution">- Steve Jobs</cite>
</blockquote>`}
            >
              <blockquote className="basis-quote">
                "Design is not just what it looks like and feels like. Design is how it works."
                <cite className="basis-quote-attribution">- Steve Jobs</cite>
              </blockquote>
            </ComponentSection>
          </div>
        );

      case 'lists':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Lists</h2>
            
            <ComponentSection 
              title="Unordered List Variants"
              code={`<ul class="basis-list-unordered basis-list-disc">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>`}
            >
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <p className="font-mono text-xs opacity-60 mb-2">Default (Square)</p>
                  <ul className="basis-list-unordered">
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs opacity-60 mb-2">Disc</p>
                  <ul className="basis-list-unordered basis-list-disc">
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs opacity-60 mb-2">Circle</p>
                  <ul className="basis-list-unordered basis-list-circle">
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                  </ul>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Ordered List Variants"
              code={`<ol class="basis-list-ordered">
  <li>Step 1</li>
  <li>Step 2</li>
</ol>`}
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="font-mono text-xs opacity-60 mb-2">Decimal</p>
                  <ol className="basis-list-ordered">
                    <li>First step</li>
                    <li>Second step</li>
                    <li>Third step</li>
                  </ol>
                </div>
                <div>
                  <p className="font-mono text-xs opacity-60 mb-2">Roman</p>
                  <ol className="basis-list-ordered basis-list-ordered-roman">
                    <li>Introduction</li>
                    <li>Methods</li>
                    <li>Results</li>
                  </ol>
                </div>
                <div>
                  <p className="font-mono text-xs opacity-60 mb-2">Alpha</p>
                  <ol className="basis-list-ordered basis-list-ordered-alpha">
                    <li>Option A</li>
                    <li>Option B</li>
                    <li>Option C</li>
                  </ol>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'images':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Images</h2>
            
            <ComponentSection 
              title="Basic Image"
              code={`<img class="basis-image" src="image.jpg" alt="Description" />`}
            >
              <div className="basis-image basis-ratio-16x9 bg-gradient-to-br from-brand to-brand-secondary flex items-center justify-center">
                <span className="font-mono text-white text-xl">16:9 Aspect Ratio</span>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Aspect Ratios"
              code={`<img class="basis-image basis-ratio-1x1" src="..." />
<img class="basis-image basis-ratio-4x3" src="..." />
<img class="basis-image basis-ratio-16x9" src="..." />
<img class="basis-image basis-ratio-2x3" src="..." />`}
            >
              <div className="grid md:grid-cols-4 gap-4">
                <div className="basis-image basis-ratio-1x1 bg-brand/20 flex items-center justify-center">
                  <span className="font-mono text-xs">1:1</span>
                </div>
                <div className="basis-image basis-ratio-4x3 bg-brand/30 flex items-center justify-center">
                  <span className="font-mono text-xs">4:3</span>
                </div>
                <div className="basis-image basis-ratio-16x9 bg-brand/40 flex items-center justify-center">
                  <span className="font-mono text-xs">16:9</span>
                </div>
                <div className="basis-image basis-ratio-2x3 bg-brand/50 flex items-center justify-center">
                  <span className="font-mono text-xs">2:3</span>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Radius Modifiers"
              code={`<img class="basis-image basis-radius-0" src="..." />
<img class="basis-image basis-radius-lg" src="..." />`}
            >
              <p className="text-sm opacity-60">Radius classes: basis-radius-0, basis-radius-sm, basis-radius-md, basis-radius-lg, basis-radius-xl, basis-radius-full</p>
            </ComponentSection>
          </div>
        );

      case 'icons':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Icons</h2>
            
            <ComponentSection 
              title="Icon Sizes"
              code={`<span class="basis-icon basis-icon-xs">X</span>
<span class="basis-icon basis-icon-sm">X</span>
<span class="basis-icon basis-icon-md">X</span>
<span class="basis-icon basis-icon-lg">X</span>
<span class="basis-icon basis-icon-xl">X</span>`}
            >
              <div className="flex items-end gap-4">
                <div className="text-center">
                  <span className="basis-icon basis-icon-xs mb-1">X</span>
                  <p className="font-mono text-xs opacity-60">xs</p>
                </div>
                <div className="text-center">
                  <span className="basis-icon basis-icon-sm mb-1">X</span>
                  <p className="font-mono text-xs opacity-60">sm</p>
                </div>
                <div className="text-center">
                  <span className="basis-icon basis-icon-md mb-1">X</span>
                  <p className="font-mono text-xs opacity-60">md</p>
                </div>
                <div className="text-center">
                  <span className="basis-icon basis-icon-lg mb-1">X</span>
                  <p className="font-mono text-xs opacity-60">lg</p>
                </div>
                <div className="text-center">
                  <span className="basis-icon basis-icon-xl mb-1">X</span>
                  <p className="font-mono text-xs opacity-60">xl</p>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Surface Modifiers"
              code={`<span class="basis-icon basis-icon-on-inverse">X</span>
<span class="basis-icon basis-icon-on-accent-primary">X</span>`}
            >
              <div className="flex gap-4">
                <span className="basis-icon basis-icon-on-inverse">X</span>
                <span className="basis-icon basis-icon-on-accent-primary">X</span>
                <span className="basis-icon basis-icon-on-accent-secondary">X</span>
                <span className="basis-icon basis-icon-is-background">X</span>
              </div>
            </ComponentSection>
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Slider</h2>
            
            <ComponentSection 
              title="Basic Slider"
              code={`<div class="basis-slider">
  <div class="basis-slider-mask">
    <div class="basis-slider-track">
      <div class="basis-slider-slide">Slide 1</div>
      <div class="basis-slider-slide">Slide 2</div>
    </div>
  </div>
</div>`}
            >
              <div className="basis-slider">
                <div className="basis-slider-mask">
                  <div className="basis-slider-track" style={{ transform: "translateX(-" + (sliderIndex * 100) + "%)" }}>
                    <div className="basis-slider-slide">
                      <div className="basis-ratio-16x9 bg-gradient-to-br from-brand to-brand-secondary flex items-center justify-center">
                        <span className="font-mono text-white text-xl">Slide 1</span>
                      </div>
                    </div>
                    <div className="basis-slider-slide">
                      <div className="basis-ratio-16x9 bg-gradient-to-br from-brand-secondary to-green-500 flex items-center justify-center">
                        <span className="font-mono text-white text-xl">Slide 2</span>
                      </div>
                    </div>
                    <div className="basis-slider-slide">
                      <div className="basis-ratio-16x9 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="font-mono text-white text-xl">Slide 3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button className="basis-slider-arrow basis-slider-arrow-prev" onClick={() => setSliderIndex(Math.max(0, sliderIndex - 1))}></button>
                <button className="basis-slider-arrow basis-slider-arrow-next" onClick={() => setSliderIndex(Math.min(2, sliderIndex + 1))}></button>
              </div>
            </ComponentSection>
          </div>
        );

      case 'counters':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Counters</h2>
            
            <ComponentSection 
              title="Counter Badges"
              code={`<span class="basis-counter">5</span>
<span class="basis-counter basis-counter-secondary">12</span>
<span class="basis-counter basis-counter-outline">99+</span>`}
            >
              <div className="flex items-center gap-4">
                <span className="basis-counter">5</span>
                <span className="basis-counter basis-counter-secondary">12</span>
                <span className="basis-counter basis-counter-outline">99+</span>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Counter Display"
              code={`<span class="basis-counter-display">1,234</span>
<span class="basis-counter-display basis-counter-display-lg">56,789</span>`}
            >
              <div className="space-y-4">
                <p className="font-mono text-xs opacity-60">Default</p>
                <span className="basis-counter-display text-brand">1,234</span>
                <p className="font-mono text-xs opacity-60 mt-4">Large</p>
                <span className="basis-counter-display basis-counter-display-lg text-brand-secondary">56,789</span>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="CSS Counters - Section"
              code={`<ol class="basis-counter-section">
  <li>First item</li>
  <li>Second item</li>
</ol>`}
            >
              <ol className="basis-counter-section space-y-2">
                <li className="font-mono">Introduction to BASIS KIT</li>
                <li className="font-mono">Getting Started Guide</li>
                <li className="font-mono">Component Reference</li>
              </ol>
            </ComponentSection>

            <ComponentSection 
              title="CSS Counters - Steps"
              code={`<ol class="basis-counter-steps">
  <li>Step 1</li>
  <li>Step 2</li>
</ol>`}
            >
              <ol className="basis-counter-steps">
                <li>Install the package via npm or yarn</li>
                <li>Import the CSS file in your project</li>
                <li>Start using the components</li>
              </ol>
            </ComponentSection>

            <ComponentSection 
              title="Interactive Counter"
              code={`<!-- Counter with increment/decrement buttons -->
<div class="basis-counter-group">
  <button onclick="decrement()">−</button>
  <span class="basis-counter-display">count</span>
  <button onclick="increment()">+</button>
</div>`}
            >
              <div className="p-4 bg-brand/5 border-2 border-brand/30 mb-4">
                <p className="font-mono text-xs text-brand">💡 Interactive Demo - Click buttons to change count!</p>
              </div>
              <CounterInteractiveDemo />
            </ComponentSection>
          </div>
        );

      case 'forms':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Form Elements</h2>
            
            <div className="basis-card p-4 bg-brand/5 border-2 border-brand/30 mb-6">
              <p className="text-sm">
                <strong className="font-mono">💡 Tip:</strong> Each component shows code for all 3 modes: 
                <span className="font-mono ml-2 px-2 py-0.5 bg-neutral-800 text-white text-xs">CSS</span>
                <span className="font-mono ml-1 px-2 py-0.5 bg-neutral-700 text-white text-xs">Tailwind</span>
                <span className="font-mono ml-1 px-2 py-0.5 bg-neutral-600 text-white text-xs">React</span>
              </p>
            </div>
            
            <ComponentSectionModes 
              title="Input Fields"
              modes={{
                css: "<!-- CSS-only: Input component classes -->\n" +
                "<input type=\"text\" class=\"basis-input\" placeholder=\"Default input\" />\n" +
                "<input type=\"text\" class=\"basis-input basis-input-sm\" placeholder=\"Small\" />\n" +
                "<input type=\"text\" class=\"basis-input basis-input-lg\" placeholder=\"Large\" />\n" +
                "<input type=\"text\" class=\"basis-input basis-input-error\" placeholder=\"Error\" />\n" +
                "<input type=\"text\" class=\"basis-input basis-input-success\" placeholder=\"Success\" />\n" +
                "<input type=\"text\" class=\"basis-input\" disabled placeholder=\"Disabled\" />",
                tailwind: "<!-- Tailwind: Input with utilities -->\n" +
                "<input type=\"text\" \n" +
                "  class=\"w-full px-4 py-2 font-mono text-base border-2 border-current \n" +
                "         bg-white dark:bg-neutral-900 focus:border-brand focus:outline-none\"\n" +
                "  placeholder=\"Default input\" />\n" +
                "\n" +
                "<!-- Small input -->\n" +
                "<input type=\"text\" \n" +
                "  class=\"px-3 py-1.5 text-sm border-2 border-current\" \n" +
                "  placeholder=\"Small\" />\n" +
                "\n" +
                "<!-- Error state -->\n" +
                "<input type=\"text\" \n" +
                "  class=\"px-4 py-2 border-2 border-red-500 focus:border-red-600\" \n" +
                "  placeholder=\"Error\" />",
                react: "// React: Use Input component\n" +
                "import { Input, Label } from '@marte/basis';\n" +
                "\n" +
                "<Input placeholder=\"Default input\" />\n" +
                "<Input size=\"sm\" placeholder=\"Small input\" />\n" +
                "<Input size=\"lg\" placeholder=\"Large input\" />\n" +
                "<Input state=\"error\" placeholder=\"Error state\" />\n" +
                "<Input state=\"success\" placeholder=\"Success state\" />\n" +
                "<Input disabled placeholder=\"Disabled\" />\n" +
                "\n" +
                "// With label and error\n" +
                "<div className=\"space-y-1\">\n" +
                "  <Label htmlFor=\"email\">Email</Label>\n" +
                "  <Input \n" +
                "    id=\"email\" \n" +
                "    type=\"email\" \n" +
                "    placeholder=\"you@example.com\"\n" +
                "    state=\"error\"\n" +
                "  />\n" +
                "  <Input.Error>This field is required</Input.Error>\n" +
                "</div>\n" +
                "\n" +
                "// Input props\n" +
                "<Input\n" +
                "  size={'sm' | 'md' | 'lg'}           // Size variant\n" +
                "  state={'default' | 'error' | 'success'}  // State\n" +
                "  leftIcon={<Icon />}                  // Left icon\n" +
                "  rightIcon={<Icon />}                 // Right icon\n" +
                "  fullWidth                            // Full width\n" +
                "/>"
              }}
            >
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="basis-form-label">Default Input</label>
                  <input type="text" className="basis-input" placeholder="Enter text..." />
                </div>
                <div>
                  <label className="basis-form-label">Small Input</label>
                  <input type="text" className="basis-input basis-input-sm" placeholder="Small size" />
                </div>
                <div>
                  <label className="basis-form-label">Error State</label>
                  <input type="text" className="basis-input basis-input-error" placeholder="Error state" />
                  <p className="basis-form-error">This field is required</p>
                </div>
              </div>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="Select"
              modes={{
                css: "<!-- CSS-only: Select component -->\n" +
                "<select class=\"basis-select\">\n" +
                "  <option>Select an option...</option>\n" +
                "  <option>Option 1</option>\n" +
                "  <option>Option 2</option>\n" +
                "</select>\n" +
                "\n" +
                "<select class=\"basis-select basis-select-sm\">\n" +
                "  <!-- Small select -->\n" +
                "</select>",
                tailwind: "<!-- Tailwind: Select with utilities -->\n" +
                "<select class=\"px-4 py-2 font-mono border-2 border-current \n" +
                "  bg-white dark:bg-neutral-900 cursor-pointer\n" +
                "  focus:border-brand focus:outline-none\">\n" +
                "  <option>Select an option...</option>\n" +
                "  <option>Option 1</option>\n" +
                "  <option>Option 2</option>\n" +
                "</select>",
                react: "// React: Use Select component\n" +
                "import { Select } from '@marte/basis';\n" +
                "\n" +
                "<Select>\n" +
                "  <Select.Option value=\"\">Select an option...</Select.Option>\n" +
                "  <Select.Option value=\"1\">Option 1</Select.Option>\n" +
                "  <Select.Option value=\"2\">Option 2</Select.Option>\n" +
                "</Select>\n" +
                "\n" +
                "// With controlled state\n" +
                "<Select \n" +
                "  value={selected}\n" +
                "  onChange={setSelected}\n" +
                "  options={[\n" +
                "    { value: '1', label: 'Option 1' },\n" +
                "    { value: '2', label: 'Option 2' },\n" +
                "  ]}\n" +
                "  placeholder=\"Choose...\"\n" +
                "/>\n" +
                "\n" +
                "// Select props\n" +
                "<Select\n" +
                "  size={'sm' | 'md' | 'lg'}\n" +
                "  state={'default' | 'error' | 'success'}\n" +
                "  disabled\n" +
                "/>"
              }}
            >
              <select className="basis-select max-w-xs">
                <option>Select an option...</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="Textarea"
              modes={{
                css: "<!-- CSS-only: Textarea component -->\n" +
                "<textarea class=\"basis-textarea\" placeholder=\"Enter your message...\"></textarea>\n" +
                "\n" +
                "<textarea class=\"basis-textarea basis-textarea-sm\" placeholder=\"Small\">\n" +
                "</textarea>\n" +
                "\n" +
                "<!-- With resize control -->\n" +
                "<textarea class=\"basis-textarea basis-textarea-no-resize\">\n" +
                "</textarea>",
                tailwind: "<!-- Tailwind: Textarea with utilities -->\n" +
                "<textarea \n" +
                "  class=\"w-full px-4 py-2 font-mono border-2 border-current \n" +
                "         bg-white dark:bg-neutral-900 min-h-[100px]\n" +
                "         focus:border-brand focus:outline-none resize-y\"\n" +
                "  placeholder=\"Enter your message...\">\n" +
                "</textarea>",
                react: "// React: Use Textarea component\n" +
                "import { Textarea } from '@marte/basis';\n" +
                "\n" +
                "<Textarea placeholder=\"Enter your message...\" />\n" +
                "\n" +
                "<Textarea \n" +
                "  rows={5}\n" +
                "  maxLength={500}\n" +
                "  showCount\n" +
                "  placeholder=\"Max 500 characters...\"\n" +
                "/>\n" +
                "\n" +
                "// Textarea props\n" +
                "<Textarea\n" +
                "  size={'sm' | 'md' | 'lg'}\n" +
                "  state={'default' | 'error' | 'success'}\n" +
                "  resize={'none' | 'vertical' | 'horizontal' | 'both'}\n" +
                "  disabled\n" +
                "/>"
              }}
            >
              <textarea className="basis-textarea max-w-md" placeholder="Enter your message..."></textarea>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="Checkbox, Radio, Switch"
              modes={{
                css: "<!-- CSS-only: Form controls -->\n" +
                "<input type=\"checkbox\" class=\"basis-checkbox\" />\n" +
                "<input type=\"checkbox\" class=\"basis-checkbox\" checked />\n" +
                "\n" +
                "<input type=\"radio\" class=\"basis-radio\" name=\"group\" />\n" +
                "<input type=\"radio\" class=\"basis-radio\" name=\"group\" checked />\n" +
                "\n" +
                "<input type=\"checkbox\" class=\"basis-switch\" />\n" +
                "<input type=\"checkbox\" class=\"basis-switch\" checked />",
                tailwind: "<!-- Tailwind: Custom form controls -->\n" +
                "<!-- Checkbox -->\n" +
                "<input type=\"checkbox\" \n" +
                "  class=\"w-5 h-5 border-2 border-current \n" +
                "         checked:bg-brand checked:border-brand\n" +
                "         focus:ring-2 focus:ring-brand/30\" />\n" +
                "\n" +
                "<!-- Radio -->\n" +
                "<input type=\"radio\" \n" +
                "  class=\"w-5 h-5 border-2 border-current rounded-full\n" +
                "         checked:border-brand\" />\n" +
                "\n" +
                "<!-- Switch -->\n" +
                "<input type=\"checkbox\" \n" +
                "  class=\"w-10 h-6 bg-neutral-200 rounded-full\n" +
                "         checked:bg-brand appearance-none\n" +
                "         before:content-[''] before:w-4 before:h-4 before:bg-white\n" +
                "         before:rounded-full before:transition-transform\n" +
                "         checked:before:translate-x-4\" />",
                react: "// React: Form control components\n" +
                "import { Checkbox, Radio, Switch } from '@marte/basis';\n" +
                "\n" +
                "<Checkbox>Accept terms</Checkbox>\n" +
                "<Checkbox checked disabled>Pre-selected</Checkbox>\n" +
                "\n" +
                "<Radio name=\"plan\" value=\"basic\">Basic</Radio>\n" +
                "<Radio name=\"plan\" value=\"pro\" defaultChecked>Pro</Radio>\n" +
                "\n" +
                "<Switch>Enable notifications</Switch>\n" +
                "<Switch checked>Dark mode</Switch>\n" +
                "\n" +
                "// Checkbox/Radio props\n" +
                "<Checkbox\n" +
                "  checked={boolean}\n" +
                "  onChange={(e) => {}}\n" +
                "  indeterminate            // Partial selection\n" +
                "  disabled\n" +
                "/>\n" +
                "\n" +
                "// Switch props\n" +
                "<Switch\n" +
                "  checked={boolean}\n" +
                "  onChange={(e) => {}}\n" +
                "  size={'sm' | 'md' | 'lg'}\n" +
                "  label=\"Enable feature\"\n" +
                "/>"
              }}
            >
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="basis-checkbox" defaultChecked />
                  <span className="font-mono text-sm">Checkbox</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" className="basis-radio" name="radio-demo" defaultChecked />
                  <span className="font-mono text-sm">Radio</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="basis-switch" defaultChecked />
                  <span className="font-mono text-sm">Switch</span>
                </label>
              </div>
            </ComponentSectionModes>

            <ComponentSection 
              title="Form with Validation"
              code={`<!-- Interactive form with real-time validation -->
<form class="basis-form" onsubmit="...">
  <div class="basis-form-group">
    <label class="basis-form-label">Email</label>
    <input type="email" class="basis-input" />
    <p class="basis-form-error">Error message</p>
  </div>
  <button class="basis-btn basis-btn-primary">Submit</button>
</form>`}
            >
              <div className="p-4 bg-brand/5 border-2 border-brand/30 mb-4">
                <p className="font-mono text-xs text-brand mb-2">💡 Interactive Demo - Try entering invalid data!</p>
              </div>
              <FormValidationDemo />
            </ComponentSection>
          </div>
        );

      case 'badges':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Badges & Chips</h2>
            
            <ComponentSection 
              title="Badges"
              code={`<span class="basis-badge basis-badge-success">Success</span>
<span class="basis-badge basis-badge-warning">Warning</span>
<span class="basis-badge basis-badge-error">Error</span>
<span class="basis-badge basis-badge-info">Info</span>
<span class="basis-badge basis-badge-brand">Brand</span>`}
            >
              <div className="flex flex-wrap gap-2">
                <span className="basis-badge basis-badge-success">Success</span>
                <span className="basis-badge basis-badge-warning">Warning</span>
                <span className="basis-badge basis-badge-error">Error</span>
                <span className="basis-badge basis-badge-info">Info</span>
                <span className="basis-badge basis-badge-brand">Brand</span>
                <span className="basis-badge basis-badge-secondary">Secondary</span>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Chips"
              code={`<span class="basis-chip">Default Chip</span>
<span class="basis-chip basis-chip-removable">
  Tag <span class="basis-chip-remove">×</span>
</span>`}
            >
              <div className="flex flex-wrap gap-2">
                <span className="basis-chip">Default Chip</span>
                <span className="basis-chip basis-chip-removable">
                  Removable <span className="basis-chip-remove">×</span>
                </span>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Interactive Chips"
              code={`<!-- Add and remove chips dynamically -->
<div class="basis-chips-container">
  <span class="basis-chip" onclick="remove()">Tag ×</span>
</div>`}
            >
              <div className="p-4 bg-brand/5 border-2 border-brand/30 mb-4">
                <p className="font-mono text-xs text-brand">💡 Interactive Demo - Click × to remove, Add Tag to create!</p>
              </div>
              <ChipsInteractiveDemo />
            </ComponentSection>
          </div>
        );

      case 'avatar':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Avatar</h2>
            
            <ComponentSection 
              title="Avatar Sizes"
              code={`<div class="basis-avatar basis-avatar-xs">JD</div>
<div class="basis-avatar basis-avatar-sm">JD</div>
<div class="basis-avatar basis-avatar-md">JD</div>
<div class="basis-avatar basis-avatar-lg">JD</div>
<div class="basis-avatar basis-avatar-xl">JD</div>`}
            >
              <div className="flex items-end gap-3">
                <div className="basis-avatar basis-avatar-xs" style={{ background: current.color }}>JD</div>
                <div className="basis-avatar basis-avatar-sm" style={{ background: current.color }}>JD</div>
                <div className="basis-avatar basis-avatar-md" style={{ background: current.color }}>JD</div>
                <div className="basis-avatar basis-avatar-lg" style={{ background: current.color }}>JD</div>
                <div className="basis-avatar basis-avatar-xl" style={{ background: current.color }}>JD</div>
                <div className="basis-avatar basis-avatar-2xl" style={{ background: current.color }}>JD</div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Avatar Group"
              code={`<div class="basis-avatar-group">
  <div class="basis-avatar">AB</div>
  <div class="basis-avatar">CD</div>
  <div class="basis-avatar">+3</div>
</div>`}
            >
              <div className="basis-avatar-group">
                <div className="basis-avatar basis-avatar-md" style={{ background: '#EF4444' }}>AB</div>
                <div className="basis-avatar basis-avatar-md" style={{ background: '#10B981' }}>CD</div>
                <div className="basis-avatar basis-avatar-md" style={{ background: '#3B82F6' }}>EF</div>
                <div className="basis-avatar basis-avatar-md" style={{ background: '#8B5CF6' }}>+3</div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Progress</h2>
            
            <ComponentSection 
              title="Progress Bars"
              code={`<div class="basis-progress">
  <div class="basis-progress-bar" style="width: 25%"></div>
</div>
<div class="basis-progress basis-progress-double">
  <div class="basis-progress-bar" style="width: 50%"></div>
</div>`}
            >
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-xs opacity-60 mb-2">Default (8px)</p>
                  <div className="basis-progress">
                    <div className="basis-progress-bar" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs opacity-60 mb-2">Double (16px)</p>
                  <div className="basis-progress basis-progress-double">
                    <div className="basis-progress-bar" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs opacity-60 mb-2">Animated</p>
                  <div className="basis-progress basis-progress-double basis-progress-animated">
                    <div className="basis-progress-bar" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Interactive Progress"
              code={`<!-- Control progress dynamically -->
<div class="basis-progress">
  <div class="basis-progress-bar" style="width: progress + '%'"></div>
</div>
<button onclick="setProgress(progress + 10)">+10%</button>`}
            >
              <div className="p-4 bg-brand/5 border-2 border-brand/30 mb-4">
                <p className="font-mono text-xs text-brand">💡 Interactive Demo - Control the progress bar!</p>
              </div>
              <ProgressAnimatedDemo />
            </ComponentSection>
          </div>
        );

      case 'skeleton':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Skeleton</h2>
            
            <ComponentSection 
              title="Skeleton Loading"
              code={`<div class="basis-skeleton basis-skeleton-avatar"></div>
<div class="basis-skeleton basis-skeleton-text"></div>
<div class="basis-skeleton basis-skeleton-card"></div>`}
            >
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="basis-skeleton basis-skeleton-avatar"></div>
                  <div className="flex-1 space-y-2">
                    <div className="basis-skeleton basis-skeleton-text" style={{ width: '60%' }}></div>
                    <div className="basis-skeleton basis-skeleton-text" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="basis-skeleton basis-skeleton-card"></div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'alerts':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Alerts</h2>
            
            <ComponentSection 
              title="Alert Variants"
              code={`<div class="basis-alert basis-alert-success">
  <div class="basis-alert-content">
    <p class="basis-alert-title">Success</p>
    <p class="basis-alert-description">Operation completed.</p>
  </div>
</div>`}
            >
              <div className="space-y-3">
                <div className="basis-alert basis-alert-success">
                  <div className="basis-alert-content">
                    <p className="basis-alert-title">Success</p>
                    <p className="basis-alert-description">Your changes have been saved successfully.</p>
                  </div>
                </div>
                <div className="basis-alert basis-alert-error">
                  <div className="basis-alert-content">
                    <p className="basis-alert-title">Error</p>
                    <p className="basis-alert-description">Something went wrong. Please try again.</p>
                  </div>
                </div>
                <div className="basis-alert basis-alert-warning">
                  <div className="basis-alert-content">
                    <p className="basis-alert-title">Warning</p>
                    <p className="basis-alert-description">This action cannot be undone.</p>
                  </div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'table':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Table</h2>
            
            <ComponentSection 
              title="Basic Table"
              code={`<table class="basis-table">
  <thead>
    <tr><th>Name</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>John</td><td>Active</td></tr>
  </tbody>
</table>`}
            >
              <table className="basis-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td><span className="basis-badge basis-badge-success">Active</span></td>
                    <td>Admin</td>
                    <td><button className="basis-btn basis-btn-ghost basis-btn-xs">Edit</button></td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td><span className="basis-badge basis-badge-warning">Pending</span></td>
                    <td>User</td>
                    <td><button className="basis-btn basis-btn-ghost basis-btn-xs">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </ComponentSection>
          </div>
        );

      case 'price-table':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Price Table</h2>
            <p className="text-sm opacity-70 mb-4">Pricing plans and comparison tables</p>
            
            <ComponentSection 
              title="Pricing Cards"
              code={`<div class="basis-price-table">
  <div class="basis-price-card">
    <div class="basis-price-header">
      <h4 class="basis-price-name">Basic</h4>
      <p class="basis-price-description">Perfect for getting started</p>
      <div class="basis-price-amount">$9</div>
      <span class="basis-price-period">/month</span>
    </div>
    <ul class="basis-price-features">
      <li>Feature 1</li>
      <li>Feature 2</li>
    </ul>
    <button class="basis-btn basis-btn-outline basis-btn-full">Select</button>
  </div>
</div>`}
            >
              {/* Using PriceTable Component */}
              <PriceTable plans={[
                { 
                  name: 'Basic', 
                  price: '$9', 
                  period: 'month',
                  description: 'Perfect for getting started with your first projects',
                  features: [
                    { text: '5 Projects', included: true },
                    { text: '10GB Storage', included: true },
                    { text: 'Basic Support', included: true },
                    { text: 'API Access', included: false },
                  ],
                  cta: 'Select Plan',
                  popular: false
                },
                { 
                  name: 'Pro', 
                  price: '$29', 
                  period: 'month',
                  description: 'Best for growing teams and businesses that need more power',
                  features: [
                    { text: 'Unlimited Projects', included: true },
                    { text: '100GB Storage', included: true },
                    { text: 'Priority Support', included: true },
                    { text: 'API Access', included: true },
                    { text: 'Advanced Analytics', included: true },
                  ],
                  cta: 'Select Plan',
                  popular: true
                },
                { 
                  name: 'Enterprise', 
                  price: '$99', 
                  period: 'month',
                  description: 'For large organizations with custom requirements',
                  features: [
                    { text: 'Unlimited Everything', included: true },
                    { text: '1TB Storage', included: true },
                    { text: '24/7 Dedicated Support', included: true },
                    { text: 'Custom Integrations', included: true },
                  ],
                  cta: 'Contact Sales',
                  popular: false
                },
              ]} />
            </ComponentSection>

            <ComponentSection 
              title="Comparison Table"
              code={`<table class="basis-table basis-price-comparison">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Basic</th>
      <th>Pro</th>
      <th>Enterprise</th>
    </tr>
  </thead>
  <tbody>...</tbody>
</table>`}
            >
              <table className="basis-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="text-center">Basic</th>
                    <th className="text-center">Pro</th>
                    <th className="text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Projects</td>
                    <td className="text-center">5</td>
                    <td className="text-center">Unlimited</td>
                    <td className="text-center">Unlimited</td>
                  </tr>
                  <tr>
                    <td>Storage</td>
                    <td className="text-center">10GB</td>
                    <td className="text-center">100GB</td>
                    <td className="text-center">1TB</td>
                  </tr>
                  <tr>
                    <td>API Access</td>
                    <td className="text-center opacity-40">—</td>
                    <td className="text-center text-green-500">✓</td>
                    <td className="text-center text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td>Support</td>
                    <td className="text-center">Email</td>
                    <td className="text-center">Priority</td>
                    <td className="text-center">24/7</td>
                  </tr>
                </tbody>
              </table>
            </ComponentSection>
          </div>
        );

      case 'toast':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Toast</h2>
            
            <ComponentSection 
              title="Toast Notifications"
              code={`<div class="basis-toast basis-toast-success basis-toast-top-right">
  Success message
</div>`}
            >
              <div className="flex gap-2">
                <button className="basis-btn basis-btn-primary" onClick={() => showToastDemo('success')}>Success</button>
                <button className="basis-btn basis-btn-danger" onClick={() => showToastDemo('error')}>Error</button>
                <button className="basis-btn basis-btn-secondary" onClick={() => showToastDemo('warning')}>Warning</button>
                <button className="basis-btn basis-btn-outline" onClick={() => showToastDemo('info')}>Info</button>
              </div>
            </ComponentSection>
          </div>
        );

      case 'modal':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Modal</h2>
            
            <ComponentSection 
              title="Modal Dialog"
              code={`<div class="basis-modal-overlay">
  <div class="basis-modal basis-modal-lg">
    <div class="basis-modal-header">
      <h3 class="basis-modal-title">Title</h3>
      <button class="basis-modal-close">×</button>
    </div>
    <div class="basis-modal-body">Content...</div>
    <div class="basis-modal-footer">
      <button class="basis-btn basis-btn-secondary">Cancel</button>
      <button class="basis-btn basis-btn-primary">Confirm</button>
    </div>
  </div>
</div>`}
            >
              <button className="basis-btn basis-btn-primary" onClick={() => setShowModal(true)}>Open Modal</button>
            </ComponentSection>
          </div>
        );

      case 'dropdown':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Dropdown</h2>
            
            <ComponentSection 
              title="Dropdown Menu"
              code={`<div class="basis-dropdown">
  <button class="basis-btn">Dropdown ▾</button>
  <div class="basis-dropdown-menu">
    <div class="basis-dropdown-item">Option 1</div>
    <div class="basis-dropdown-item">Option 2</div>
    <div class="basis-dropdown-divider"></div>
    <div class="basis-dropdown-item">Option 3</div>
  </div>
</div>`}
            >
              <div className="basis-dropdown">
                <button className="basis-btn basis-btn-secondary" onClick={() => setShowDropdown(!showDropdown)}>
                  Dropdown Menu
                </button>
                {showDropdown && (
                  <div className="basis-dropdown-menu">
                    <div className="basis-dropdown-item basis-dropdown-item-active">Option 1</div>
                    <div className="basis-dropdown-item">Option 2</div>
                    <div className="basis-dropdown-divider"></div>
                    <div className="basis-dropdown-item">Option 3</div>
                  </div>
                )}
              </div>
            </ComponentSection>
          </div>
        );

      case 'tooltip':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Tooltip</h2>
            
            <ComponentSection 
              title="Tooltip Positions"
              code={`<div class="basis-tooltip">
  <button>Hover me</button>
  <div class="basis-tooltip-content basis-tooltip-top">Tooltip</div>
</div>`}
            >
              <div className="flex gap-8">
                <div className="basis-tooltip">
                  <button 
                    className="basis-btn basis-btn-secondary"
                    onMouseEnter={() => setHoverTooltip('top')}
                    onMouseLeave={() => setHoverTooltip(null)}
                  >
                    Top
                  </button>
                  {hoverTooltip === 'top' && <div className="basis-tooltip-content basis-tooltip-top">Tooltip on top</div>}
                </div>
                <div className="basis-tooltip">
                  <button 
                    className="basis-btn basis-btn-secondary"
                    onMouseEnter={() => setHoverTooltip('bottom')}
                    onMouseLeave={() => setHoverTooltip(null)}
                  >
                    Bottom
                  </button>
                  {hoverTooltip === 'bottom' && <div className="basis-tooltip-content basis-tooltip-bottom">Tooltip on bottom</div>}
                </div>
                <div className="basis-tooltip">
                  <button 
                    className="basis-btn basis-btn-secondary"
                    onMouseEnter={() => setHoverTooltip('left')}
                    onMouseLeave={() => setHoverTooltip(null)}
                  >
                    Left
                  </button>
                  {hoverTooltip === 'left' && <div className="basis-tooltip-content basis-tooltip-left">Tooltip on left</div>}
                </div>
                <div className="basis-tooltip">
                  <button 
                    className="basis-btn basis-btn-secondary"
                    onMouseEnter={() => setHoverTooltip('right')}
                    onMouseLeave={() => setHoverTooltip(null)}
                  >
                    Right
                  </button>
                  {hoverTooltip === 'right' && <div className="basis-tooltip-content basis-tooltip-right">Tooltip on right</div>}
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'tabs':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Tabs</h2>
            
            <ComponentSection 
              title="Horizontal Tabs"
              code={`<div class="basis-tabs">
  <button class="basis-tab basis-tab-active">Tab 1</button>
  <button class="basis-tab">Tab 2</button>
</div>
<div class="basis-tabs-panel">Content</div>`}
            >
              <div>
                <div className="basis-tabs">
                  {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, i) => (
                    <button 
                      key={tab}
                      className={`basis-tab ${activeTab === i ? 'basis-tab-active' : ''}`}
                      onClick={() => setActiveTab(i)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="basis-tabs-panel">
                  <p className="font-mono text-sm opacity-70">Content for Tab {activeTab + 1}</p>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'accordion':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Accordion</h2>
            
            <ComponentSection 
              title="Accordion"
              code={`<div class="basis-accordion">
  <div class="basis-accordion-item basis-accordion-item-open">
    <button class="basis-accordion-trigger">
      <span>Section 1</span>
      <span class="basis-accordion-icon">▼</span>
    </button>
    <div class="basis-accordion-content">Content...</div>
  </div>
</div>`}
            >
              <div className="basis-accordion">
                {[0, 1, 2].map(i => (
                  <div key={i} className={`basis-accordion-item ${accordionOpen === i ? 'basis-accordion-item-open' : ''}`}>
                    <button 
                      className="basis-accordion-trigger"
                      onClick={() => setAccordionOpen(accordionOpen === i ? null : i)}
                    >
                      <span>Section {i + 1}</span>
                      <span className="basis-accordion-icon">▼</span>
                    </button>
                    {accordionOpen === i && (
                      <div className="basis-accordion-content">
                        <p className="opacity-70">This is the content for section {i + 1}. Click on another section to expand it.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ComponentSection>
          </div>
        );

      case 'pagination':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Pagination</h2>
            
            <ComponentSection 
              title="Pagination"
              code={`<div class="basis-pagination">
  <button class="basis-pagination-item">←</button>
  <button class="basis-pagination-item basis-pagination-item-active">1</button>
  <button class="basis-pagination-item">2</button>
  <button class="basis-pagination-item">→</button>
</div>`}
            >
              <div className="basis-pagination">
                <button className="basis-pagination-item basis-pagination-item-disabled">←</button>
                <button className="basis-pagination-item basis-pagination-item-active">1</button>
                <button className="basis-pagination-item">2</button>
                <button className="basis-pagination-item">3</button>
                <button className="basis-pagination-item">→</button>
              </div>
            </ComponentSection>
          </div>
        );

      case 'breadcrumb':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Breadcrumb</h2>
            
            <ComponentSection 
              title="Breadcrumb Navigation"
              code={`<nav class="basis-breadcrumb">
  <a class="basis-breadcrumb-item">Home</a>
  <span class="basis-breadcrumb-separator">/</span>
  <a class="basis-breadcrumb-item">Components</a>
  <span class="basis-breadcrumb-separator">/</span>
  <span class="basis-breadcrumb-item basis-breadcrumb-item-active">Breadcrumb</span>
</nav>`}
            >
              <nav className="basis-breadcrumb">
                <a className="basis-breadcrumb-item cursor-pointer">Home</a>
                <span className="basis-breadcrumb-separator">/</span>
                <a className="basis-breadcrumb-item cursor-pointer">Components</a>
                <span className="basis-breadcrumb-separator">/</span>
                <span className="basis-breadcrumb-item basis-breadcrumb-item-active">Breadcrumb</span>
              </nav>
            </ComponentSection>
          </div>
        );

      case 'stepper':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Stepper</h2>
            
            <ComponentSection 
              title="Horizontal Stepper"
              code={`<div class="basis-stepper">
  <div class="basis-stepper-item">
    <div class="basis-stepper-indicator basis-stepper-indicator-completed">1</div>
    <span class="basis-stepper-label">Step 1</span>
  </div>
  <div class="basis-stepper-line basis-stepper-line-completed"></div>
  <div class="basis-stepper-item">
    <div class="basis-stepper-indicator basis-stepper-indicator-active">2</div>
    <span class="basis-stepper-label">Step 2</span>
  </div>
</div>`}
            >
              <div className="basis-stepper">
                <div className="basis-stepper-item">
                  <div className="basis-stepper-indicator basis-stepper-indicator-completed">1</div>
                  <span className="basis-stepper-label">Account</span>
                </div>
                <div className="basis-stepper-line basis-stepper-line-completed"></div>
                <div className="basis-stepper-item">
                  <div className="basis-stepper-indicator basis-stepper-indicator-active">2</div>
                  <span className="basis-stepper-label">Profile</span>
                </div>
                <div className="basis-stepper-line"></div>
                <div className="basis-stepper-item">
                  <div className="basis-stepper-indicator">3</div>
                  <span className="basis-stepper-label">Confirm</span>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Interactive Stepper"
              code={`<!-- Dynamic stepper with navigation -->
<div class="basis-stepper-interactive">
  <div class="basis-stepper">
    <!-- Steps render based on current step -->
  </div>
  <div class="basis-stepper-content">
    <button onclick="prevStep()">Previous</button>
    <button onclick="nextStep()">Next</button>
  </div>
</div>`}
            >
              <div className="p-4 bg-brand/5 border-2 border-brand/30 mb-4">
                <p className="font-mono text-xs text-brand">💡 Interactive Demo - Navigate through steps!</p>
              </div>
              <StepperInteractiveDemo />
            </ComponentSection>
          </div>
        );

      case 'divider':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Divider</h2>
            
            <ComponentSection 
              title="Divider Variants"
              code={`<div class="basis-divider"></div>
<div class="basis-divider basis-divider-brutal"></div>
<div class="basis-divider basis-divider-dashed"></div>
<div class="basis-divider-label">OR</div>`}
            >
              <div className="space-y-4">
                <div className="basis-divider"></div>
                <div className="basis-divider basis-divider-brutal"></div>
                <div className="basis-divider basis-divider-dashed"></div>
                <div className="basis-divider-label">OR</div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'nav-components':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Navigation Components</h2>
            
            <ComponentSection 
              title="Navbar"
              code={`<nav class="basis-navbar">
  <div class="basis-navbar-brand">
    <div class="basis-navbar-logo">B</div>
    <span class="basis-navbar-title">Brand</span>
  </div>
  <div class="basis-navbar-menu">
    <a class="basis-navbar-item">Link</a>
  </div>
</nav>`}
            >
              <nav className="basis-navbar">
                <div className="basis-navbar-brand">
                  <div className="basis-navbar-logo" style={{ background: current.color }}>B</div>
                  <span className="basis-navbar-title">{current.name}</span>
                </div>
                <div className="basis-navbar-menu">
                  <a className="basis-navbar-item basis-navbar-item-active">Home</a>
                  <a className="basis-navbar-item">Products</a>
                  <a className="basis-navbar-item">About</a>
                </div>
              </nav>
            </ComponentSection>

            <ComponentSection 
              title="Sidebar Navigation"
              code={`<aside class="basis-sidebar">
  <div class="basis-sidebar-header">Brand</div>
  <nav class="basis-sidebar-content">
    <a class="basis-sidebar-item basis-sidebar-item-active">Dashboard</a>
  </nav>
</aside>`}
            >
              <div className="basis-sidebar w-48 h-48">
                <div className="basis-sidebar-header">
                  <span className="font-mono font-bold">{current.name}</span>
                </div>
                <nav className="basis-sidebar-content">
                  <a className="basis-sidebar-item basis-sidebar-item-active">Dashboard</a>
                  <a className="basis-sidebar-item">Projects</a>
                  <a className="basis-sidebar-item">Settings</a>
                </nav>
              </div>
            </ComponentSection>
          </div>
        );

      case 'search':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Search Components</h2>
            <p className="text-sm opacity-70 mb-4">Search input components for navigation and filtering.</p>
            
            <ComponentSection 
              title="Search Input"
              code={`<div class="basis-search">
  <input type="search" class="basis-search-input" placeholder="Search..." />
  <button class="basis-search-btn">🔍</button>
</div>`}
            >
              <div className="flex items-center gap-2 max-w-md">
                <input 
                  type="search" 
                  className="basis-input flex-1" 
                  placeholder="Search components..."
                />
                <button className="basis-btn basis-btn-primary">🔍</button>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Search with Dropdown"
              code={`<div class="basis-search-dropdown">
  <input type="search" class="basis-search-input" />
  <div class="basis-search-results">...</div>
</div>`}
            >
              <div className="relative max-w-md">
                <input 
                  type="search" 
                  className="basis-input w-full" 
                  placeholder="Type to search..."
                />
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border-2 border-foreground/20 dark:border-white/20 shadow-brutal z-10">
                  <div className="p-2 border-b border-foreground/10 dark:border-white/10 font-mono text-xs opacity-60">Results</div>
                  <div className="p-2 hover:bg-secondary dark:hover:bg-white/5 cursor-pointer">
                    <span className="font-mono text-sm">Button Component</span>
                  </div>
                  <div className="p-2 hover:bg-secondary dark:hover:bg-white/5 cursor-pointer">
                    <span className="font-mono text-sm">Card Component</span>
                  </div>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Minimal Search"
              code={`<input type="search" class="basis-search-minimal" placeholder="Search..." />`}
            >
              <div className="flex items-center gap-2 p-2 bg-secondary dark:bg-white/5 border border-foreground/20 dark:border-white/20 max-w-sm">
                <span className="opacity-50">🔍</span>
                <input 
                  type="search" 
                  className="bg-transparent border-none outline-none flex-1 text-sm"
                  placeholder="Quick search..."
                />
                <span className="font-mono text-xs opacity-40">⌘K</span>
              </div>
            </ComponentSection>
          </div>
        );

      case 'logo':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Logo Components</h2>
            <p className="text-sm opacity-70 mb-4">Logo variations for headers, footers, and branding.</p>
            
            <ComponentSection 
              title="Logo Mark"
              code={`<div class="basis-logo">
  <span class="basis-logo-mark">B</span>
</div>`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center font-mono font-bold text-white text-lg border-2 border-current" style={{ background: current.color }}>B</div>
                <div className="w-12 h-12 flex items-center justify-center font-mono font-bold text-white text-xl border-2 border-current" style={{ background: current.color }}>B</div>
                <div className="w-16 h-16 flex items-center justify-center font-mono font-bold text-white text-2xl border-2 border-current" style={{ background: current.color }}>B</div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Logo with Text"
              code={`<div class="basis-logo-full">
  <div class="basis-logo-icon">B</div>
  <span class="basis-logo-text">Brand Name</span>
</div>`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center font-mono font-bold text-white border-2 border-current" style={{ background: current.color }}>B</div>
                <div>
                  <span className="font-mono font-bold text-lg uppercase tracking-wider">BASIS KIT</span>
                  <span className="block text-xs opacity-60">Design System</span>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Logo Sizes"
              code={`<div class="basis-logo-sm">...</div>
<div class="basis-logo-md">...</div>
<div class="basis-logo-lg">...</div>`}
            >
              <div className="flex items-end gap-4">
                <div className="text-center">
                  <div className="w-6 h-6 flex items-center justify-center font-mono font-bold text-white text-xs border border-current" style={{ background: current.color }}>B</div>
                  <span className="font-mono text-xs opacity-50 mt-1 block">sm</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 flex items-center justify-center font-mono font-bold text-white text-sm border-2 border-current" style={{ background: current.color }}>B</div>
                  <span className="font-mono text-xs opacity-50 mt-1 block">md</span>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 flex items-center justify-center font-mono font-bold text-white text-base border-2 border-current" style={{ background: current.color }}>B</div>
                  <span className="font-mono text-xs opacity-50 mt-1 block">lg</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 flex items-center justify-center font-mono font-bold text-white text-lg border-2 border-current" style={{ background: current.color }}>B</div>
                  <span className="font-mono text-xs opacity-50 mt-1 block">xl</span>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'menu':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Menu Components</h2>
            <p className="text-sm opacity-70 mb-4">Menu, dropdown menu, and context menu components.</p>
            
            <ComponentSection 
              title="Simple Menu"
              code={`<nav class="basis-menu">
  <a class="basis-menu-item basis-menu-item-active">Home</a>
  <a class="basis-menu-item">About</a>
  <a class="basis-menu-item">Contact</a>
</nav>`}
            >
              <nav className="flex gap-1 p-1 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                <a className="px-4 py-2 font-mono text-sm bg-brand text-white">Home</a>
                <a className="px-4 py-2 font-mono text-sm opacity-70 hover:opacity-100 hover:bg-foreground/5 dark:hover:bg-white/5">About</a>
                <a className="px-4 py-2 font-mono text-sm opacity-70 hover:opacity-100 hover:bg-foreground/5 dark:hover:bg-white/5">Services</a>
                <a className="px-4 py-2 font-mono text-sm opacity-70 hover:opacity-100 hover:bg-foreground/5 dark:hover:bg-white/5">Contact</a>
              </nav>
            </ComponentSection>

            <ComponentSection 
              title="Vertical Menu"
              code={`<nav class="basis-menu-vertical">
  <a class="basis-menu-item">Dashboard</a>
  <a class="basis-menu-item">Profile</a>
  <a class="basis-menu-item basis-menu-item-active">Settings</a>
</nav>`}
            >
              <nav className="w-48 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                <a className="block px-4 py-2 font-mono text-sm opacity-70 hover:opacity-100 hover:bg-foreground/5 dark:hover:bg-white/5">Dashboard</a>
                <a className="block px-4 py-2 font-mono text-sm opacity-70 hover:opacity-100 hover:bg-foreground/5 dark:hover:bg-white/5">Profile</a>
                <a className="block px-4 py-2 font-mono text-sm bg-brand/10 text-brand border-l-2 border-brand">Settings</a>
                <a className="block px-4 py-2 font-mono text-sm opacity-70 hover:opacity-100 hover:bg-foreground/5 dark:hover:bg-white/5">Logout</a>
              </nav>
            </ComponentSection>

            <ComponentSection 
              title="Menu with Icons"
              code={`<nav class="basis-menu-icons">
  <a class="basis-menu-item">
    <span class="basis-menu-icon">🏠</span>
    Home
  </a>
</nav>`}
            >
              <nav className="w-56 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                {[
                  { icon: '🏠', label: 'Home', active: true },
                  { icon: '📁', label: 'Projects', active: false },
                  { icon: '⚙️', label: 'Settings', active: false },
                  { icon: '👤', label: 'Profile', active: false },
                ].map((item, i) => (
                  <a 
                    key={i} 
                    className={`flex items-center gap-3 px-4 py-2 font-mono text-sm ${item.active ? 'bg-brand/10 text-brand border-l-2 border-brand' : 'opacity-70 hover:opacity-100 hover:bg-foreground/5 dark:hover:bg-white/5'}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </ComponentSection>
          </div>
        );

      case 'empty-state':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Empty State</h2>
            
            <ComponentSection 
              title="Empty State"
              code={`<div class="basis-empty-state">
  <div class="basis-empty-state-icon">📭</div>
  <h3 class="basis-empty-state-title">No items found</h3>
  <p class="basis-empty-state-description">Get started by creating a new item.</p>
  <button class="basis-btn basis-btn-primary">Create Item</button>
</div>`}
            >
              <div className="basis-empty-state">
                <div className="basis-empty-state-icon text-4xl">📭</div>
                <h3 className="basis-empty-state-title">No items found</h3>
                <p className="basis-empty-state-description">Get started by creating your first item.</p>
                <button className="basis-btn basis-btn-primary">Create Item</button>
              </div>
            </ComponentSection>
          </div>
        );

      case 'stat-card':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Stat Card</h2>
            
            <ComponentSection 
              title="Statistics Card"
              code={`<div class="basis-stat-card">
  <div class="basis-stat-card-header">
    <span class="basis-stat-card-label">TOTAL USERS</span>
  </div>
  <div class="basis-stat-card-value">12,345</div>
  <div class="basis-stat-card-change basis-stat-card-change-up">
    +12.5% from last month
  </div>
</div>`}
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div className="basis-stat-card">
                  <div className="basis-stat-card-header">
                    <span className="basis-stat-card-label">TOTAL USERS</span>
                  </div>
                  <div className="basis-stat-card-value text-brand">12,345</div>
                  <div className="basis-stat-card-change basis-stat-card-change-up">+12.5% from last month</div>
                </div>
                <div className="basis-stat-card">
                  <div className="basis-stat-card-header">
                    <span className="basis-stat-card-label">REVENUE</span>
                  </div>
                  <div className="basis-stat-card-value text-brand-secondary">$45,678</div>
                  <div className="basis-stat-card-change basis-stat-card-change-up">+8.2% from last month</div>
                </div>
                <div className="basis-stat-card">
                  <div className="basis-stat-card-header">
                    <span className="basis-stat-card-label">BOUNCE RATE</span>
                  </div>
                  <div className="basis-stat-card-value">24.8%</div>
                  <div className="basis-stat-card-change basis-stat-card-change-down">-2.1% from last month</div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      // ENGINEERING DATA (v6.0)
      // ─────────────────────────────────────────────────────────────────────
      case 'data-grid':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Data Grid</h2>
            <p className="text-sm opacity-70 mb-4">High-density data table for engineering applications with sorting and filtering capabilities.</p>
            
            <div className="basis-card p-4 bg-brand/5 border-2 border-brand/30 mb-6">
              <p className="font-mono text-xs text-brand">💡 Interactive Demo - Sort columns by clicking headers, filter by status buttons</p>
            </div>
            
            <ComponentSection 
              title="Basic Data Grid"
              code={`<div class="basis-data-grid">
  <div class="basis-data-grid-header">
    <div class="basis-data-grid-cell">ID</div>
    <div class="basis-data-grid-cell">Name</div>
    <div class="basis-data-grid-cell">Status</div>
  </div>
  <div class="basis-data-grid-row">
    <div class="basis-data-grid-cell">001</div>
    <div class="basis-data-grid-cell">System Alpha</div>
    <div class="basis-data-grid-cell basis-badge-success">Active</div>
  </div>
</div>`}
            >
              <div className="basis-data-grid">
                <div className="basis-data-grid-header grid grid-cols-4">
                  <div className="basis-data-grid-cell">ID</div>
                  <div className="basis-data-grid-cell">Component</div>
                  <div className="basis-data-grid-cell">Status</div>
                  <div className="basis-data-grid-cell">Value</div>
                </div>
                {[
                  ['ENG-001', 'Motor Controller', 'Active', '2,450 RPM'],
                  ['ENG-002', 'Sensor Array', 'Warning', '87.3°C'],
                  ['ENG-003', 'Power Unit', 'Active', '480V'],
                  ['ENG-004', 'Control Valve', 'Offline', '—'],
                ].map(([id, name, status, value]) => (
                  <div key={id} className="basis-data-grid-row grid grid-cols-4">
                    <div className="basis-data-grid-cell font-mono text-xs">{id}</div>
                    <div className="basis-data-grid-cell">{name}</div>
                    <div className={`basis-data-grid-cell text-xs ${status === 'Active' ? 'text-green-600 dark:text-green-400' : status === 'Warning' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>{status}</div>
                    <div className="basis-data-grid-cell font-mono text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Interactive Data Grid (Sort & Filter)"
              code={`<!-- Data grid with sorting and filtering -->
<div class="basis-data-grid-interactive">
  <!-- Filter buttons -->
  <div class="basis-data-filters">
    <button class="basis-filter-btn active">All</button>
    <button class="basis-filter-btn">Active</button>
    <button class="basis-filter-btn">Warning</button>
  </div>
  
  <!-- Sortable headers -->
  <table class="basis-data-table">
    <thead>
      <tr>
        <th onclick="sortBy('id')">ID ↑↓</th>
        <th onclick="sortBy('name')">Name ↑↓</th>
        <th onclick="sortBy('temp')">Temp ↑↓</th>
      </tr>
    </thead>
    <tbody id="data-rows">...</tbody>
  </table>
</div>`}
            >
              <DataGridInteractiveDemo />
            </ComponentSection>

            <ComponentSection 
              title="Data Grid with Pagination & Selection"
              code={`<!-- Data grid with pagination -->
<div class="basis-data-grid-paginated">
  <table class="basis-data-table">
    <thead>
      <tr>
        <th><input type="checkbox" onchange="toggleAll()"></th>
        <th>ID</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody id="page-rows">...</tbody>
  </table>
  
  <!-- Pagination controls -->
  <div class="basis-pagination">
    <button onclick="prevPage()">‹</button>
    <span>Page 1 of 5</span>
    <button onclick="nextPage()">›</button>
  </div>
</div>`}
            >
              <DataGridPaginationDemo />
            </ComponentSection>
          </div>
        );

      case 'code-block':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Code Block</h2>
            <p className="text-sm opacity-70 mb-4">Syntax-highlighted code display for technical documentation with copy functionality and multi-language support.</p>
            
            <div className="basis-card p-4 bg-brand/5 border-2 border-brand/30 mb-6">
              <p className="font-mono text-xs text-brand">💡 Interactive Demo - Switch languages, copy code to clipboard</p>
            </div>
            
            <ComponentSection 
              title="Code Block with Line Numbers"
              code={`<div class="basis-code-block" data-language="javascript">
  <div class="basis-code-line" data-line="1">const x = 42;</div>
  <div class="basis-code-line" data-line="2">console.log(x);</div>
</div>`}
            >
              <div className="basis-code-block bg-neutral-900 dark:bg-neutral-900 p-4 font-mono text-sm overflow-x-auto border-2 border-foreground/20 dark:border-white/20">
                <div className="flex gap-4">
                  <div className="text-foreground/30 dark:text-white/30 select-none text-right" style={{minWidth: '2rem'}}>
                    {Array.from({length: 6}, (_, i) => <div key={i}>{i + 1}</div>)}
                  </div>
                  <pre className="text-green-600 dark:text-green-400">
{`// Engineering Configuration
const config = {
  motorSpeed: 2450,
  temperature: 87.3,
  voltage: 480,
  status: 'active'
};

console.log(config);`}
                  </pre>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Interactive Code Block (Multi-Language + Copy)"
              code={`<!-- Code block with tabs and copy button -->
<div class="basis-code-block-interactive">
  <div class="basis-code-tabs">
    <button class="basis-code-tab active">JavaScript</button>
    <button class="basis-code-tab">Python</button>
    <button class="basis-code-tab">CSS</button>
  </div>
  <div class="basis-code-content">
    <button class="basis-copy-btn" onclick="copyCode()">
      Copy
    </button>
    <pre><code>...</code></pre>
  </div>
</div>`}
            >
              <CodeBlockInteractiveDemo />
            </ComponentSection>
          </div>
        );

      case 'status-timeline':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Status Timeline</h2>
            <p className="text-sm opacity-70 mb-4">Progress tracking for engineering processes with interactive step selection.</p>
            
            <div className="basis-card p-4 bg-brand/5 border-2 border-brand/30 mb-6">
              <p className="font-mono text-xs text-brand">💡 Interactive Demo - Click on timeline steps to select them</p>
            </div>
            
            <ComponentSection 
              title="Process Timeline"
              code={`<div class="basis-timeline">
  <div class="basis-timeline-item basis-timeline-complete">
    <div class="basis-timeline-dot"></div>
    <div class="basis-timeline-content">Design Phase</div>
  </div>
  <div class="basis-timeline-item basis-timeline-active">
    <div class="basis-timeline-dot"></div>
    <div class="basis-timeline-content">Development</div>
  </div>
</div>`}
            >
              <div className="basis-timeline relative pl-8">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-foreground/20 dark:bg-white/20" />
                {[
                  { status: 'complete', title: 'Design Phase', time: '2 days ago', desc: 'Initial specifications completed' },
                  { status: 'complete', title: 'Development', time: '1 day ago', desc: 'Core modules implemented' },
                  { status: 'active', title: 'Testing', time: 'In Progress', desc: 'QA validation in progress' },
                  { status: 'pending', title: 'Deployment', time: 'Scheduled', desc: 'Production rollout planned' },
                ].map((item, i) => (
                  <div key={i} className="basis-timeline-item relative pb-6 last:pb-0">
                    <div className={`absolute left-[-22px] top-1 w-4 h-4 rounded-full border-2 ${
                      item.status === 'complete' ? 'bg-green-500 border-green-500' :
                      item.status === 'active' ? 'bg-brand border-brand animate-pulse' :
                      'bg-neutral-300 dark:bg-neutral-800 border-foreground/30 dark:border-white/30'
                    }`} />
                    <div className="pl-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold">{item.title}</span>
                        <span className="text-xs opacity-50">{item.time}</span>
                      </div>
                      <p className="text-sm opacity-60 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Interactive Timeline (Selectable Steps)"
              code={`<!-- Timeline with clickable steps -->
<div class="basis-timeline-interactive">
  <div class="basis-timeline-item" onclick="selectStep(1)">
    <div class="basis-timeline-dot"></div>
    <div class="basis-timeline-content">Step 1</div>
  </div>
  <!-- ... -->
</div>

<!-- Selected step info -->
<div class="basis-timeline-info">
  Selected: <span id="selected-step">Step 1</span>
</div>`}
            >
              <StatusTimelineInteractiveDemo />
            </ComponentSection>
          </div>
        );

      case 'stat-trend':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Stat Trend</h2>
            <p className="text-sm opacity-70 mb-4">Trending statistics with sparkline visualization and real-time data updates.</p>
            
            <div className="basis-card p-4 bg-brand/5 border-2 border-brand/30 mb-6">
              <p className="font-mono text-xs text-brand">💡 Interactive Demo - Click to simulate real-time data updates</p>
            </div>
            
            <ComponentSection 
              title="Trend Indicators"
              code={`<div class="basis-stat-trend basis-stat-trend-up">
  <span class="basis-stat-value">+24.5%</span>
  <span class="basis-stat-label">vs last period</span>
</div>`}
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="basis-card p-4">
                  <div className="text-xs opacity-50 mb-2 font-mono">EFFICIENCY</div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">+24.5%</span>
                    <svg className="w-16 h-8 text-green-600/30 dark:text-green-400/30" viewBox="0 0 64 32">
                      <polyline fill="none" stroke="currentColor" strokeWidth="2" points="0,28 16,20 32,24 48,12 64,8" />
                    </svg>
                  </div>
                </div>
                <div className="basis-card p-4">
                  <div className="text-xs opacity-50 mb-2 font-mono">LATENCY</div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-mono font-bold text-red-600 dark:text-red-400">-12.3ms</span>
                    <svg className="w-16 h-8 text-red-600/30 dark:text-red-400/30" viewBox="0 0 64 32">
                      <polyline fill="none" stroke="currentColor" strokeWidth="2" points="0,8 16,12 32,16 48,20 64,28" />
                    </svg>
                  </div>
                </div>
                <div className="basis-card p-4">
                  <div className="text-xs opacity-50 mb-2 font-mono">THROUGHPUT</div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-mono font-bold text-brand">+156K</span>
                    <svg className="w-16 h-8 text-brand/30" viewBox="0 0 64 32">
                      <polyline fill="none" stroke="currentColor" strokeWidth="2" points="0,24 16,20 32,16 48,18 64,10" />
                    </svg>
                  </div>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Real-Time Stat Dashboard"
              code={`<!-- Stats with live updates -->
<div class="basis-stat-dashboard">
  <div class="basis-stat-card" id="stat-efficiency">
    <span class="basis-stat-label">EFFICIENCY</span>
    <span class="basis-stat-value" data-trend="up">+24.5%</span>
    <svg class="basis-stat-sparkline">
      <polyline points="..." />
    </svg>
  </div>
  <!-- Additional stats... -->
</div>

<button onclick="refreshStats()">
  ⟳ Refresh Data
</button>`}
            >
              <StatTrendInteractiveDemo />
            </ComponentSection>
          </div>
        );

      case 'gauge-meter':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Gauge Meter</h2>
            <p className="text-sm opacity-70 mb-4">Semi-circular gauge for single-value metrics with real-time visualization and multi-gauge dashboards.</p>
            
            <div className="basis-card p-4 bg-brand/5 border-2 border-brand/30 mb-6">
              <p className="font-mono text-xs text-brand">💡 Interactive Demos - Single gauge with slider, multi-gauge dashboard with randomize</p>
            </div>
            
            <ComponentSection 
              title="Static Gauges"
              code={`<div class="basis-gauge" data-value="75" data-max="100">
  <div class="basis-gauge-track"></div>
  <div class="basis-gauge-fill"></div>
  <div class="basis-gauge-value">75%</div>
</div>`}
            >
              <div className="flex justify-around items-end">
                {[
                  { value: 35, label: 'LOW', color: '#22C55E' },
                  { value: 68, label: 'OPTIMAL', color: '#C93400' },
                  { value: 92, label: 'CRITICAL', color: '#EF4444' },
                ].map(g => (
                  <div key={g.label} className="text-center">
                    <div className="relative w-32 h-16 overflow-hidden">
                      <div className="absolute inset-0 border-8 border-foreground/10 dark:border-white/10 rounded-t-full" style={{ borderBottom: 'none' }} />
                      <div 
                        className="absolute inset-0 border-8 rounded-t-full origin-bottom"
                        style={{ 
                          borderBottom: 'none',
                          borderColor: g.color,
                          transform: `rotate(${(g.value / 100) * 180 - 90}deg)`,
                          clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
                        }}
                      />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-2xl font-bold">{g.value}%</div>
                    </div>
                    <div className="mt-2 font-mono text-xs opacity-60">{g.label}</div>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Interactive Gauge"
              code={`<!-- Gauge with dynamic value binding -->
<div class="basis-gauge-interactive">
  <div class="basis-gauge" style="transform: rotate(calc(var(--value) * 1.8deg - 90deg))">
    <div class="basis-gauge-track"></div>
    <div class="basis-gauge-needle"></div>
  </div>
  <input type="range" min="0" max="100" bind:value="gaugeValue" />
</div>`}
            >
              <GaugeMeterInteractiveDemo />
            </ComponentSection>

            <ComponentSection 
              title="Multi-Gauge Dashboard"
              code={`<!-- System monitoring dashboard -->
<div class="basis-gauge-dashboard">
  <div class="basis-gauge-card">
    <span class="basis-gauge-label">CPU Load</span>
    <div class="basis-gauge" data-value="68"></div>
    <span class="basis-gauge-status">NORMAL</span>
  </div>
  <div class="basis-gauge-card">
    <span class="basis-gauge-label">Memory</span>
    <div class="basis-gauge" data-value="45"></div>
    <span class="basis-gauge-status">NORMAL</span>
  </div>
  <!-- Additional gauges... -->
</div>`}
            >
              <MultiGaugeDashboardDemo />
            </ComponentSection>
          </div>
        );

      case 'heatmap-grid':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Heatmap Grid</h2>
            <p className="text-sm opacity-70 mb-4">GitHub-style activity heatmap for data density visualization with hover tooltips.</p>
            
            <div className="basis-card p-4 bg-brand/5 border-2 border-brand/30 mb-6">
              <p className="font-mono text-xs text-brand">💡 Interactive Demo - Hover over cells to see detailed values</p>
            </div>
            
            <ComponentSection 
              title="Static Heatmap"
              code={`<div class="basis-heatmap">
  <div class="basis-heatmap-row">
    <div class="basis-heatmap-cell" data-level="0"></div>
    <div class="basis-heatmap-cell" data-level="3"></div>
  </div>
</div>`}
            >
              <div className="space-y-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, rowIdx) => (
                  <div key={day} className="flex items-center gap-1">
                    <span className="font-mono text-xs w-8 text-foreground/60 dark:text-white/60">{day}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 20 }, (_, colIdx) => {
                        const level = (rowIdx * 7 + colIdx * 3 + colIdx * colIdx) % 5;
                        const colors = ['bg-foreground/5 dark:bg-white/5', 'bg-green-200 dark:bg-green-900', 'bg-green-300 dark:bg-green-700', 'bg-green-400 dark:bg-green-500', 'bg-green-500 dark:bg-green-400'];
                        return <div key={colIdx} className={`w-3 h-3 ${colors[level]}`} />;
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 mt-2">
                <span className="font-mono text-xs text-foreground/60 dark:text-white/60">Less</span>
                {['bg-foreground/5 dark:bg-white/5', 'bg-green-200 dark:bg-green-900', 'bg-green-300 dark:bg-green-700', 'bg-green-400 dark:bg-green-500', 'bg-green-500 dark:bg-green-400'].map((color, i) => (
                  <div key={i} className={`w-3 h-3 ${color}`} />
                ))}
                <span className="font-mono text-xs text-foreground/60 dark:text-white/60">More</span>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Interactive Heatmap"
              code={`<!-- Heatmap with hover tooltips -->
<div class="basis-heatmap-interactive">
  <div class="basis-heatmap-cell" 
       onmouseenter="showTooltip(day, hour, value)"
       onmouseleave="hideTooltip()">
  </div>
</div>
<div class="basis-heatmap-tooltip" id="tooltip">
  <span class="day">Mon</span> at <span class="hour">14:00</span>
  <span class="value">85% activity</span>
</div>`}
            >
              <HeatmapGridInteractiveDemo />
            </ComponentSection>
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      // TECHNICAL CHARTS (v6.0)
      // ─────────────────────────────────────────────────────────────────────
      case 'gantt-chart':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Gantt Chart</h2>
            <p className="text-sm opacity-70 mb-4">Project timeline visualization with textured progress bars</p>
            <ComponentSection 
              title="Project Timeline"
              code={`<div class="basis-gantt">
  <div class="basis-gantt-row">
    <div class="basis-gantt-label">Design</div>
    <div class="basis-gantt-bar" style="--start: 0; --duration: 2"></div>
  </div>
</div>`}
            >
              <div className="border-2 border-foreground/20 dark:border-white/20">
                <div className="flex bg-secondary dark:bg-white/5 border-b border-foreground/10 dark:border-white/10">
                  <div className="w-24 p-2 font-mono text-xs uppercase">Task</div>
                  <div className="flex-1 flex">
                    {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map(w => (
                      <div key={w} className="flex-1 text-center font-mono text-xs opacity-60 p-2 border-l border-foreground/10 dark:border-white/10">{w}</div>
                    ))}
                  </div>
                </div>
                {[
                  { name: 'Design', start: 0, duration: 2, color: '#C93400' },
                  { name: 'Frontend', start: 2, duration: 3, color: '#3B82F6' },
                  { name: 'Backend', start: 2, duration: 4, color: '#22C55E' },
                  { name: 'Testing', start: 5, duration: 2, color: '#8B5CF6' },
                  { name: 'Deploy', start: 7, duration: 1, color: '#F59E0B' },
                ].map(task => (
                  <div key={task.name} className="flex items-center border-b border-foreground/10 dark:border-white/10 last:border-b-0">
                    <div className="w-24 p-2 font-mono text-sm">{task.name}</div>
                    <div className="flex-1 relative h-8">
                      <div 
                        className="absolute top-1 h-6"
                        style={{
                          left: `${(task.start / 8) * 100}%`,
                          width: `${(task.duration / 8) * 100}%`,
                          background: `repeating-linear-gradient(-21deg, ${task.color}, ${task.color} 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ComponentSection>
          </div>
        );

      case 'sankey-diagram':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Sankey Diagram</h2>
            <p className="text-sm opacity-70 mb-4">Flow visualization for process analysis</p>
            <ComponentSection 
              title="Process Flow"
              code={`<div class="basis-sankey">
  <div class="basis-sankey-node">Source</div>
  <div class="basis-sankey-flow" data-width="40"></div>
  <div class="basis-sankey-node">Target</div>
</div>`}
            >
              <div className="bg-secondary dark:bg-white/5 p-6 border-2 border-foreground/20 dark:border-white/20">
                <div className="flex justify-between mb-8">
                  <div className="space-y-2">
                    {['Energy Input', 'Materials', 'Labor'].map((s, i) => (
                      <div key={s} className="bg-brand/20 px-4 py-2 font-mono text-sm border-l-4 border-brand">{s}</div>
                    ))}
                  </div>
                  <div className="flex-1 px-8">
                    <svg viewBox="0 0 200 100" className="w-full h-24">
                      <path d="M0,20 C100,20 100,30 200,30" fill="none" stroke="#C93400" strokeWidth="8" opacity="0.6" />
                      <path d="M0,50 C100,50 100,50 200,50" fill="none" stroke="#0095C9" strokeWidth="12" opacity="0.6" />
                      <path d="M0,80 C100,80 100,70 200,70" fill="none" stroke="#22C55E" strokeWidth="6" opacity="0.6" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    {['Production', 'Quality', 'Distribution'].map((s, i) => (
                      <div key={s} className="bg-brand-secondary/20 px-4 py-2 font-mono text-sm border-r-4 border-brand-secondary">{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'candlestick-chart':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Candlestick Chart</h2>
            <p className="text-sm opacity-70 mb-4">Financial price data visualization</p>
            <ComponentSection 
              title="Price Movement"
              code={`<div class="basis-candlestick">
  <div class="basis-candle" data-open="100" data-close="105" data-high="108" data-low="98"></div>
</div>`}
            >
              <div className="flex items-end gap-1 h-40 p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                {[
                  { o: 60, c: 75, h: 85, l: 50, bull: true },
                  { o: 75, c: 70, h: 80, l: 55, bull: false },
                  { o: 70, c: 85, h: 90, l: 65, bull: true },
                  { o: 85, c: 80, h: 95, l: 70, bull: false },
                  { o: 80, c: 95, h: 100, l: 75, bull: true },
                  { o: 95, c: 90, h: 98, l: 85, bull: false },
                  { o: 90, c: 100, h: 105, l: 88, bull: true },
                ].map((c, i) => (
                  <div key={i} className="flex-1 flex justify-center">
                    <div className="relative w-4">
                      <div className="absolute w-0.5 left-1/2 -translate-x-1/2 bg-foreground/40 dark:bg-white/40" style={{ top: `${100 - c.h}%`, height: `${c.h - c.l}%` }} />
                      <div 
                        className={`absolute w-full left-0 ${c.bull ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ 
                          top: `${100 - Math.max(c.o, c.c)}%`,
                          height: `${Math.abs(c.o - c.c)}%`,
                          minHeight: '4px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ComponentSection>
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      // PROCESS CONTROL (v6.0)
      // ─────────────────────────────────────────────────────────────────────
      case 'app-shell':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">App Shell</h2>
            <p className="text-sm opacity-70 mb-4">Application layout structure with sidebar and header for dashboard-style interfaces.</p>
            
            <div className="basis-card p-4 bg-brand/5 border-2 border-brand/30 mb-6">
              <p className="text-sm">
                <strong className="font-mono">💡 Tip:</strong> Each component shows code for all 3 modes: 
                <span className="font-mono ml-2 px-2 py-0.5 bg-neutral-800 text-white text-xs">CSS</span>
                <span className="font-mono ml-1 px-2 py-0.5 bg-neutral-700 text-white text-xs">Tailwind</span>
                <span className="font-mono ml-1 px-2 py-0.5 bg-neutral-600 text-white text-xs">React</span>
              </p>
            </div>
            
            <ComponentSectionModes 
              title="Application Framework"
              modes={{
                css: "<!-- CSS-only: Pre-built app shell classes -->\n" +
                "<div class=\"basis-app-shell\">\n" +
                "  <!-- Header -->\n" +
                "  <header class=\"basis-app-header\">\n" +
                "    <div class=\"basis-app-header-brand\">\n" +
                "      <span class=\"basis-app-logo\">Logo</span>\n" +
                "      <span class=\"basis-app-title\">App Name</span>\n" +
                "    </div>\n" +
                "    <nav class=\"basis-app-header-nav\">\n" +
                "      <a class=\"basis-app-nav-link active\">Dashboard</a>\n" +
                "      <a class=\"basis-app-nav-link\">Settings</a>\n" +
                "    </nav>\n" +
                "  </header>\n" +
                "  \n" +
                "  <!-- Sidebar -->\n" +
                "  <aside class=\"basis-app-sidebar\">\n" +
                "    <nav class=\"basis-app-sidebar-nav\">\n" +
                "      <a class=\"basis-app-sidebar-link active\">\n" +
                "        <span class=\"basis-app-sidebar-icon\">📊</span>\n" +
                "        <span class=\"basis-app-sidebar-label\">Dashboard</span>\n" +
                "      </a>\n" +
                "    </nav>\n" +
                "  </aside>\n" +
                "  \n" +
                "  <!-- Main Content -->\n" +
                "  <main class=\"basis-app-main\">\n" +
                "    <!-- Page content -->\n" +
                "  </main>\n" +
                "</div>",
                tailwind: "<!-- Tailwind: Build app shell with utilities -->\n" +
                "<div class=\"min-h-screen flex flex-col\">\n" +
                "  <!-- Header (72px fixed) -->\n" +
                "  <header class=\"h-[72px] border-b-2 border-current bg-white dark:bg-neutral-900 \n" +
                "                sticky top-0 z-50 flex items-center justify-between px-6\">\n" +
                "    <div class=\"flex items-center gap-3\">\n" +
                "      <div class=\"w-10 h-10 bg-brand text-white flex items-center justify-center \n" +
                "                  font-mono font-bold border-2 border-current shadow-[4px_4px_0_0_currentColor]\">\n" +
                "        A\n" +
                "      </div>\n" +
                "      <span class=\"font-mono font-bold\">App Name</span>\n" +
                "    </div>\n" +
                "    <nav class=\"flex gap-4\">\n" +
                "      <a class=\"font-mono text-sm px-3 py-1 border-b-2 border-brand text-brand\">Dashboard</a>\n" +
                "      <a class=\"font-mono text-sm px-3 py-1 opacity-60 hover:opacity-100\">Settings</a>\n" +
                "    </nav>\n" +
                "  </header>\n" +
                "  \n" +
                "  <div class=\"flex flex-1\">\n" +
                "    <!-- Sidebar (260px fixed) -->\n" +
                "    <aside class=\"w-[260px] border-r-2 border-current bg-neutral-50 dark:bg-neutral-900 \n" +
                "                  fixed top-[72px] bottom-0 overflow-y-auto p-4\">\n" +
                "      <nav class=\"space-y-1\">\n" +
                "        <a class=\"flex items-center gap-3 px-3 py-2 bg-brand/10 text-brand border-l-2 border-brand\">\n" +
                "          📊 Dashboard\n" +
                "        </a>\n" +
                "      </nav>\n" +
                "    </aside>\n" +
                "    \n" +
                "    <!-- Main Content -->\n" +
                "    <main class=\"flex-1 ml-[260px] p-6\">\n" +
                "      <!-- Content -->\n" +
                "    </main>\n" +
                "  </div>\n" +
                "</div>",
                react: "// React: Use AppShell compound component\n" +
                "import { AppShell, Nav, Sidebar } from '@marte/basis';\n" +
                "\n" +
                "<AppShell>\n" +
                "  <AppShell.Header>\n" +
                "    <AppShell.Logo src=\"/logo.svg\" alt=\"App\" />\n" +
                "    <AppShell.Title>Dashboard</AppShell.Title>\n" +
                "    <AppShell.HeaderNav>\n" +
                "      <Nav.Link active>Dashboard</Nav.Link>\n" +
                "      <Nav.Link>Analytics</Nav.Link>\n" +
                "      <Nav.Link>Settings</Nav.Link>\n" +
                "    </AppShell.HeaderNav>\n" +
                "    <AppShell.HeaderActions>\n" +
                "      <Button variant=\"ghost\" size=\"sm\">\n" +
                "        <Icon name=\"bell\" />\n" +
                "      </Button>\n" +
                "      <Avatar name=\"John Doe\" />\n" +
                "    </AppShell.HeaderActions>\n" +
                "  </AppShell.Header>\n" +
                "  \n" +
                "  <AppShell.Sidebar>\n" +
                "    <Sidebar.Section title=\"Main\">\n" +
                "      <Sidebar.Item active icon={<Icon name=\"home\" />}>\n" +
                "        Dashboard\n" +
                "      </Sidebar.Item>\n" +
                "      <Sidebar.Item icon={<Icon name=\"chart\" />}>\n" +
                "        Analytics\n" +
                "      </Sidebar.Item>\n" +
                "    </Sidebar.Section>\n" +
                "    \n" +
                "    <Sidebar.Section title=\"Settings\">\n" +
                "      <Sidebar.Item icon={<Icon name=\"settings\" />}>\n" +
                "        Configuration\n" +
                "      </Sidebar.Item>\n" +
                "    </Sidebar.Section>\n" +
                "  </AppShell.Sidebar>\n" +
                "  \n" +
                "  <AppShell.Main>\n" +
                "    {/* Page content */}\n" +
                "    {children}\n" +
                "  </AppShell.Main>\n" +
                "</AppShell>\n" +
                "\n" +
                "// AppShell props\n" +
                "<AppShell\n" +
                "  sidebarWidth={'sm' | 'md' | 'lg'}    // 200px | 260px | 320px\n" +
                "  headerHeight={'sm' | 'md' | 'lg'}    // 56px | 72px | 88px\n" +
                "  sidebarPosition={'left' | 'right'}\n" +
                "  headerSticky\n" +
                "  sidebarCollapsible\n" +
                "/>"
              }}
            >
              <div className="border-2 border-foreground/20 dark:border-white/20 h-64 overflow-hidden">
                <div className="h-10 bg-brand/20 border-b border-foreground/20 dark:border-white/20 flex items-center px-4">
                  <span className="font-mono text-xs">HEADER - basis-app-header (72px sticky)</span>
                </div>
                <div className="flex h-[calc(100%-2.5rem)]">
                  <div className="w-20 bg-secondary dark:bg-white/5 border-r border-foreground/20 dark:border-white/20 p-2">
                    <div className="font-mono text-xs opacity-50">Sidebar (260px fixed)</div>
                  </div>
                  <div className="flex-1 bg-secondary dark:bg-white/5 p-4">
                    <div className="font-mono text-xs opacity-50">Main Content Area</div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="h-8 bg-foreground/10 dark:bg-white/10" />
                      <div className="h-8 bg-foreground/10 dark:bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </ComponentSectionModes>

            <ComponentSectionModes 
              title="Dashboard Layout Variant"
              modes={{
                css: "<!-- CSS-only: Dashboard with collapsible sidebar -->\n" +
                "<div class=\"basis-app-shell basis-app-shell-collapsible\">\n" +
                "  <input type=\"checkbox\" id=\"sidebar-toggle\" class=\"hidden\" />\n" +
                "  \n" +
                "  <aside class=\"basis-app-sidebar\">\n" +
                "    <label for=\"sidebar-toggle\" class=\"basis-app-sidebar-toggle\">\n" +
                "      ☰\n" +
                "    </label>\n" +
                "    <!-- Sidebar content -->\n" +
                "  </aside>\n" +
                "  \n" +
                "  <main class=\"basis-app-main\">\n" +
                "    <!-- Dashboard grid -->\n" +
                "    <div class=\"basis-grid basis-grid-4\">\n" +
                "      <div class=\"basis-stat-card\">...</div>\n" +
                "      <!-- More cards -->\n" +
                "    </div>\n" +
                "  </main>\n" +
                "</div>",
                tailwind: "<!-- Tailwind: Dashboard layout -->\n" +
                "<div class=\"min-h-screen bg-neutral-100 dark:bg-neutral-950\">\n" +
                "  <header class=\"bg-white dark:bg-neutral-900 border-b border-neutral-200 \n" +
                "                dark:border-neutral-800 p-4\">\n" +
                "    <div class=\"max-w-7xl mx-auto flex justify-between items-center\">\n" +
                "      <h1 class=\"font-mono text-xl font-bold\">Dashboard</h1>\n" +
                "      <div class=\"flex items-center gap-4\">\n" +
                "        <input type=\"search\" class=\"px-4 py-2 border rounded-lg\" />\n" +
                "        <div class=\"w-10 h-10 bg-brand rounded-full\"></div>\n" +
                "      </div>\n" +
                "    </div>\n" +
                "  </header>\n" +
                "  \n" +
                "  <main class=\"max-w-7xl mx-auto p-6\">\n" +
                "    <!-- Stats Row -->\n" +
                "    <div class=\"grid grid-cols-4 gap-4 mb-6\">\n" +
                "      <!-- Stat cards -->\n" +
                "    </div>\n" +
                "    \n" +
                "    <!-- Content Grid -->\n" +
                "    <div class=\"grid grid-cols-3 gap-6\">\n" +
                "      <div class=\"col-span-2\">\n" +
                "        <!-- Main chart -->\n" +
                "      </div>\n" +
                "      <div>\n" +
                "        <!-- Side panel -->\n" +
                "      </div>\n" +
                "    </div>\n" +
                "  </main>\n" +
                "</div>",
                react: "// React: Dashboard layout variant\n" +
                "import { AppShell, Dashboard } from '@marte/basis';\n" +
                "\n" +
                "<AppShell variant=\"dashboard\">\n" +
                "  <AppShell.Header>\n" +
                "    <AppShell.Breadcrumb items={[\n" +
                "      { label: 'Home', href: '/' },\n" +
                "      { label: 'Dashboard', href: '/dashboard' },\n" +
                "    ]} />\n" +
                "    <AppShell.Search placeholder=\"Search...\" />\n" +
                "    <AppShell.UserMenu \n" +
                "      name=\"John Doe\"\n" +
                "      email=\"john@example.com\"\n" +
                "      items={[\n" +
                "        { label: 'Profile', onClick: () => {} },\n" +
                "        { label: 'Settings', onClick: () => {} },\n" +
                "        { label: 'Logout', onClick: () => {} },\n" +
                "      ]}\n" +
                "    />\n" +
                "  </AppShell.Header>\n" +
                "  \n" +
                "  <AppShell.Main>\n" +
                "    <Dashboard>\n" +
                "      <Dashboard.StatsRow>\n" +
                "        <StatCard title=\"Revenue\" value=\"$45,231\" change=\"+20.1%\" />\n" +
                "        <StatCard title=\"Users\" value=\"2,350\" change=\"+180\" />\n" +
                "        <StatCard title=\"Sales\" value=\"12,234\" change=\"+19%\" />\n" +
                "        <StatCard title=\"Active\" value=\"573\" change=\"+201\" />\n" +
                "      </Dashboard.StatsRow>\n" +
                "      \n" +
                "      <Dashboard.Grid>\n" +
                "        <Dashboard.Main>\n" +
                "          <Card title=\"Overview\">\n" +
                "            <Chart type=\"area\" data={chartData} />\n" +
                "          </Card>\n" +
                "        </Dashboard.Main>\n" +
                "        <Dashboard.Sidebar>\n" +
                "          <Card title=\"Recent Activity\">\n" +
                "            <ActivityList items={activities} />\n" +
                "          </Card>\n" +
                "        </Dashboard.Sidebar>\n" +
                "      </Dashboard.Grid>\n" +
                "    </Dashboard>\n" +
                "  </AppShell.Main>\n" +
                "</AppShell>"
              }}
            >
              <div className="border-2 border-foreground/20 dark:border-white/20 overflow-hidden">
                <div className="bg-brand/10 p-3 border-b border-foreground/20 dark:border-white/20">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs opacity-50">◀</span>
                      <span className="font-mono text-sm">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-6 bg-foreground/10 dark:bg-white/10"></div>
                      <div className="w-6 h-6 bg-brand rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-secondary dark:bg-white/5">
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-12 bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 p-2">
                        <div className="h-2 w-8 bg-brand/30 mb-1"></div>
                        <div className="h-3 w-6 bg-brand/50"></div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 h-20 bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10"></div>
                    <div className="h-20 bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10"></div>
                  </div>
                </div>
              </div>
            </ComponentSectionModes>
          </div>
        );

      case 'diff-viewer':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Diff Viewer</h2>
            <p className="text-sm opacity-70 mb-4">Side-by-side code comparison for version control</p>
            <ComponentSection 
              title="Code Comparison"
              code={`<div class="basis-diff">
  <div class="basis-diff-pane basis-diff-old">- removed line</div>
  <div class="basis-diff-pane basis-diff-new">+ added line</div>
</div>`}
            >
              <div className="basis-diff font-mono text-sm border-2 border-foreground/20 dark:border-white/20">
                <div className="flex border-b border-foreground/20 dark:border-white/20 bg-secondary dark:bg-white/5">
                  <div className="flex-1 p-2 text-xs uppercase opacity-60 border-r border-foreground/20 dark:border-white/20">Original</div>
                  <div className="flex-1 p-2 text-xs uppercase opacity-60">Modified</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="p-4 border-r border-foreground/20 dark:border-white/20 text-xs">
                    <div className="text-red-600 dark:text-red-400 bg-red-500/10 px-2">- const value = 100;</div>
                    <div className="px-2 opacity-70">  const multiplier = 2;</div>
                    <div className="px-2 opacity-70">  const result = value * multiplier;</div>
                  </div>
                  <div className="p-4 text-xs">
                    <div className="text-green-600 dark:text-green-400 bg-green-500/10 px-2">+ const value = 200;</div>
                    <div className="px-2 opacity-70">  const multiplier = 2;</div>
                    <div className="px-2 opacity-70">  const result = value * multiplier;</div>
                  </div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'tree-view':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Tree View</h2>
            <p className="text-sm opacity-70 mb-4">Hierarchical file/folder navigation</p>
            <ComponentSection 
              title="File Tree"
              code={`<div class="basis-tree">
  <div class="basis-tree-folder">
    <span class="basis-tree-toggle">▼</span>
    src/
  </div>
  <div class="basis-tree-children">...</div>
</div>`}
            >
              <div className="basis-tree font-mono text-sm bg-secondary dark:bg-white/5 p-4 border-2 border-foreground/20 dark:border-white/20">
                {[
                  { name: 'src/', type: 'folder', open: true, level: 0 },
                  { name: 'components/', type: 'folder', open: true, level: 1 },
                  { name: 'Button.tsx', type: 'file', level: 2 },
                  { name: 'Card.tsx', type: 'file', level: 2 },
                  { name: 'utils/', type: 'folder', level: 1 },
                  { name: 'helpers.ts', type: 'file', level: 2 },
                  { name: 'index.ts', type: 'file', level: 1 },
                  { name: 'package.json', type: 'file', level: 0 },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="py-1 hover:bg-foreground/5 dark:hover:bg-white/10 px-2 cursor-pointer"
                    style={{ paddingLeft: `${item.level * 16 + 8}px` }}
                  >
                    <span className="opacity-60 mr-2">
                      {item.type === 'folder' ? (item.open ? '▼' : '▶') : '·'}
                    </span>
                    <span className={item.type === 'folder' ? 'text-brand' : ''}>{item.name}</span>
                  </div>
                ))}
              </div>
            </ComponentSection>
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      // FINANCIAL/ERP (v6.0)
      // ─────────────────────────────────────────────────────────────────────
      case 'waterfall-chart':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Waterfall Chart</h2>
            <p className="text-sm opacity-70 mb-4">Sequential value changes showing cumulative impact</p>
            <ComponentSection 
              title="Revenue Breakdown"
              code={`<div class="basis-waterfall">
  <div class="basis-waterfall-bar" data-value="100" data-type="positive"></div>
  <div class="basis-waterfall-bar" data-value="-20" data-type="negative"></div>
</div>`}
            >
              <div className="flex items-end justify-around gap-2 h-48 p-4 bg-secondary dark:bg-white/5 border-2 border-foreground/20 dark:border-white/20">
                {[
                  { label: 'Start', value: 100, offset: 0, type: 'neutral' },
                  { label: 'Sales', value: 40, offset: 100, type: 'positive' },
                  { label: 'Costs', value: -25, offset: 140, type: 'negative' },
                  { label: 'Tax', value: -15, offset: 115, type: 'negative' },
                  { label: 'End', value: 100, offset: 0, type: 'total' },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-xs font-mono mb-1 opacity-60">{bar.type === 'total' ? 'Total' : bar.value > 0 ? `+${bar.value}` : bar.value}</div>
                    <div className="relative h-32 w-8">
                      {bar.type !== 'total' && <div className="absolute w-full bg-foreground/10 dark:bg-white/10" style={{ bottom: `${bar.offset}%`, height: '2px' }} />}
                      <div 
                        className={`absolute w-full ${
                          bar.type === 'positive' ? 'bg-green-500' : 
                          bar.type === 'negative' ? 'bg-red-500' : 
                          bar.type === 'total' ? 'bg-brand' : 'bg-brand-secondary'
                        }`}
                        style={{ 
                          bottom: bar.type === 'negative' ? `${bar.offset + bar.value}%` : `${bar.offset}%`,
                          height: `${Math.abs(bar.value)}%`
                        }}
                      />
                    </div>
                    <div className="text-xs font-mono mt-2 opacity-60">{bar.label}</div>
                  </div>
                ))}
              </div>
            </ComponentSection>
          </div>
        );

      case 'bullet-graph':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Bullet Graph</h2>
            <p className="text-sm opacity-70 mb-4">Compact performance indicator with target and ranges</p>
            <ComponentSection 
              title="KPI Performance"
              code={`<div class="basis-bullet">
  <div class="basis-bullet-track">
    <div class="basis-bullet-range" data-range="poor"></div>
    <div class="basis-bullet-range" data-range="avg"></div>
    <div class="basis-bullet-range" data-range="good"></div>
  </div>
  <div class="basis-bullet-measure" style="width: 75%"></div>
  <div class="basis-bullet-marker" style="left: 80%"></div>
</div>`}
            >
              <div className="space-y-6">
                {[
                  { label: 'Revenue', value: 75, target: 80 },
                  { label: 'Users', value: 92, target: 85 },
                  { label: 'Efficiency', value: 68, target: 75 },
                ].map(kpi => (
                  <div key={kpi.label}>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-sm">{kpi.label}</span>
                      <span className="font-mono text-sm opacity-60">{kpi.value}%</span>
                    </div>
                    <div className="relative h-6 bg-secondary dark:bg-white/5 border border-foreground/20 dark:border-white/20">
                      <div className="absolute inset-y-1 left-0 right-0 flex">
                        <div className="flex-1 bg-red-500/20" />
                        <div className="flex-1 bg-yellow-500/20" />
                        <div className="flex-1 bg-green-500/20" />
                      </div>
                      <div className="absolute top-1/2 -translate-y-1/2 h-2 bg-brand" style={{ left: '8px', width: `calc(${kpi.value}% - 16px)` }} />
                      <div className="absolute top-1/2 -translate-y-1/2 w-1 h-5 bg-foreground dark:bg-white" style={{ left: `${kpi.target}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </ComponentSection>
          </div>
        );

      case 'treemap':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Treemap</h2>
            <p className="text-sm opacity-70 mb-4">Hierarchical data visualization using nested rectangles</p>
            <ComponentSection 
              title="Portfolio Distribution"
              code={`<div class="basis-treemap">
  <div class="basis-treemap-cell" data-size="40">Category A</div>
  <div class="basis-treemap-cell" data-size="30">Category B</div>
</div>`}
            >
              <div className="grid grid-cols-4 grid-rows-2 gap-1 h-48 bg-secondary dark:bg-white/5 p-2 border-2 border-foreground/20 dark:border-white/20">
                <div className="col-span-2 row-span-2 bg-brand/30 border-2 border-brand/50 flex items-center justify-center font-mono text-sm">Products (40%)</div>
                <div className="bg-green-500/30 border-2 border-green-500/50 flex items-center justify-center font-mono text-xs">Services (25%)</div>
                <div className="bg-blue-500/30 border-2 border-blue-500/50 flex items-center justify-center font-mono text-xs">Support (15%)</div>
                <div className="bg-purple-500/30 border-2 border-purple-500/50 flex items-center justify-center font-mono text-xs">R&D (12%)</div>
                <div className="bg-yellow-500/30 border-2 border-yellow-500/50 flex items-center justify-center font-mono text-xs">Other (8%)</div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'burn-rate':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Burn Rate</h2>
            <p className="text-sm opacity-70 mb-4">Resource consumption over time with projected depletion</p>
            <ComponentSection 
              title="Budget Burn"
              code={`<div class="basis-burn-rate">
  <div class="basis-burn-ideal"></div>
  <div class="basis-burn-actual"></div>
  <div class="basis-burn-projection"></div>
</div>`}
            >
              <div className="bg-secondary dark:bg-white/5 p-4 border-2 border-foreground/20 dark:border-white/20">
                <div className="flex justify-between mb-4">
                  <span className="font-mono text-sm font-bold">Monthly Budget</span>
                  <span className="font-mono text-sm opacity-60">$50,000 remaining</span>
                </div>
                <div className="relative h-24">
                  <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4" opacity="0.2" />
                    <polyline 
                      points="0,0 20,8 40,15 60,28 80,32 100,45" 
                      fill="none" 
                      stroke="#C93400" 
                      strokeWidth="2"
                    />
                    <polygon 
                      points="0,0 20,8 40,15 60,28 80,32 100,45 100,50 0,50" 
                      fill="url(#burnGradient)" 
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient id="burnGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#C93400" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex justify-between mt-2 font-mono text-xs opacity-50">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'aging-heatmap':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Aging Heatmap</h2>
            <p className="text-sm opacity-70 mb-4">Accounts receivable/payable aging analysis</p>
            <ComponentSection 
              title="AR Aging Report"
              code={`<div class="basis-aging">
  <div class="basis-aging-row">
    <div class="basis-aging-label">Client A</div>
    <div class="basis-aging-cell" data-age="current">$500</div>
    <div class="basis-aging-cell" data-age="30">$200</div>
  </div>
</div>`}
            >
              <div className="border-2 border-foreground/20 dark:border-white/20 overflow-hidden">
                <div className="flex bg-foreground/5 dark:bg-white/10 border-b border-foreground/20 dark:border-white/20 font-mono text-xs uppercase">
                  <div className="w-24 p-2">Account</div>
                  <div className="flex-1 p-2 text-center text-green-600 dark:text-green-400">Current</div>
                  <div className="flex-1 p-2 text-center text-yellow-600 dark:text-yellow-400">1-30</div>
                  <div className="flex-1 p-2 text-center text-orange-600 dark:text-orange-400">31-60</div>
                  <div className="flex-1 p-2 text-center text-red-600 dark:text-red-400">61-90</div>
                  <div className="flex-1 p-2 text-center text-red-700 dark:text-red-500">90+</div>
                </div>
                {[
                  { name: 'Client A', values: [5000, 1200, 0, 0, 0] },
                  { name: 'Client B', values: [3200, 800, 400, 0, 0] },
                  { name: 'Client C', values: [1500, 0, 1200, 600, 300] },
                  { name: 'Client D', values: [8000, 2000, 1000, 500, 800] },
                ].map(row => (
                  <div key={row.name} className="flex border-b border-foreground/10 dark:border-white/10 last:border-b-0">
                    <div className="w-24 p-2 font-mono text-sm">{row.name}</div>
                    {row.values.map((v, i) => {
                      const colors = ['rgba(34, 197, 94, ', 'rgba(234, 179, 8, ', 'rgba(249, 115, 22, ', 'rgba(239, 68, 68, ', 'rgba(220, 38, 38, '];
                      const opacity = Math.min(v / 5000, 0.4);
                      return (
                        <div 
                          key={i} 
                          className="flex-1 p-2 text-center font-mono text-sm"
                          style={{
                            backgroundColor: v > 0 ? `${colors[i]}${opacity})` : 'transparent'
                          }}
                        >
                          {v > 0 ? `$${v.toLocaleString()}` : '—'}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </ComponentSection>
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      // UTILITIES
      // ─────────────────────────────────────────────────────────────────────
      case 'visibility':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Visibility Utilities</h2>
            <div className="basis-card">
              <CodeBlock code={`.hide { display: none !important; }
.invisible { visibility: hidden; }
.visible { visibility: visible; }`} />
            </div>
          </div>
        );

      case 'spacing-utils':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Spacing Utilities</h2>
            <div className="basis-card">
              <p className="text-sm opacity-70 mb-4">All spacing uses the 8px base unit:</p>
              <CodeBlock code={`.gap-1 { gap: 8px; }
.gap-2 { gap: 16px; }
.gap-3 { gap: 24px; }
.gap-4 { gap: 32px; }
.gap-6 { gap: 48px; }
.gap-8 { gap: 64px; }

.p-1 { padding: 8px; }
.p-2 { padding: 16px; }
/* etc... */`} />
            </div>
          </div>
        );

      case 'sizing':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Sizing Utilities</h2>
            <div className="basis-card">
              <p className="text-sm opacity-70 mb-4">Width and height utilities follow the spacing scale:</p>
              <CodeBlock code={`.w-full { width: 100%; }
.w-auto { width: auto; }
.h-full { height: 100%; }
.min-h-screen { min-height: 100vh; }`} />
            </div>
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      // REACT COMPONENTS
      // ─────────────────────────────────────────────────────────────────────
      case 'react-intro':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">React Components</h2>
            <p className="basis-paragraph-lg mb-6">
              BASIS KIT v6.0 introduces 40+ React component wrappers that encapsulate CSS classes, 
              providing TypeScript types, forwardRef support, and improved Developer Experience.
            </p>
            
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Why React Components?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-red-500/50 bg-red-500/5">
                  <p className="font-mono text-xs opacity-60 mb-2">Before (CSS-only)</p>
                  <code className="text-sm text-red-400">{`<button className="basis-btn basis-btn-primary shadow-brutal-sm">`}</code>
                  <p className="text-xs opacity-60 mt-2">Prone to typos, hard to remember</p>
                </div>
                <div className="p-4 border border-green-500/50 bg-green-500/5">
                  <p className="font-mono text-xs opacity-60 mb-2">Now (React)</p>
                  <code className="text-sm text-green-400">{`<Button variant="primary" shadow="sm">`}</code>
                  <p className="text-xs opacity-60 mt-2">Type-safe, autocomplete-friendly</p>
                </div>
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Component Categories</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border border-current/20">
                  <h4 className="font-mono font-bold text-brand mb-2">Base Components</h4>
                  <p className="text-xs opacity-60">Button, Card, Badge, Chip, Alert, Input, Avatar, Progress, Skeleton, StatCard, Divider, CodeBlock</p>
                </div>
                <div className="p-4 border border-current/20">
                  <h4 className="font-mono font-bold text-brand mb-2">Overlay Components</h4>
                  <p className="text-xs opacity-60">Toast (Provider + Hook), Modal, ConfirmModal, Dropdown, Tooltip</p>
                </div>
                <div className="p-4 border border-current/20">
                  <h4 className="font-mono font-bold text-brand mb-2">Navigation Components</h4>
                  <p className="text-xs opacity-60">Tabs, Accordion, Pagination, Breadcrumb, Stepper</p>
                </div>
                <div className="p-4 border border-current/20">
                  <h4 className="font-mono font-bold text-brand mb-2">Data Components</h4>
                  <p className="text-xs opacity-60">Table, SimpleTable, Counter, PriceTable, EmptyState</p>
                </div>
                <div className="p-4 border border-current/20">
                  <h4 className="font-mono font-bold text-brand mb-2">Section Components</h4>
                  <p className="text-xs opacity-60">Hero, CTA, Features, Testimonials</p>
                </div>
                <div className="p-4 border border-current/20">
                  <h4 className="font-mono font-bold text-brand mb-2">Layout Components</h4>
                  <p className="text-xs opacity-60">Navbar, Sidebar, Footer, AppShell, DashboardLayout</p>
                </div>
              </div>
            </div>

            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Developer Experience</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-brand font-bold">✓</span>
                  <span>TypeScript types exportados para todos los componentes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand font-bold">✓</span>
                  <span>forwardRef support para acceso al DOM</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand font-bold">✓</span>
                  <span>Compound components (Card.Header, Tabs.List, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand font-bold">✓</span>
                  <span>Custom hooks (useToast)</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'react-button':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Button Component</h2>
            
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Props Interface</h3>
              <CodeBlock code={`interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'brand-secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}`} language="tsx" />
            </div>

            <ComponentSection 
              title="Variants"
              code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
            >
              <div className="flex flex-wrap gap-3">
                <button className="basis-btn basis-btn-primary">Primary</button>
                <button className="basis-btn basis-btn-secondary">Secondary</button>
                <button className="basis-btn basis-btn-outline">Outline</button>
                <button className="basis-btn basis-btn-ghost">Ghost</button>
                <button className="basis-btn basis-btn-danger">Danger</button>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Sizes"
              code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <button className="basis-btn basis-btn-primary basis-btn-xs">XS</button>
                <button className="basis-btn basis-btn-primary basis-btn-sm">SM</button>
                <button className="basis-btn basis-btn-primary">MD</button>
                <button className="basis-btn basis-btn-primary basis-btn-lg">LG</button>
                <button className="basis-btn basis-btn-primary basis-btn-xl">XL</button>
              </div>
            </ComponentSection>
          </div>
        );

      case 'react-card':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Card Component</h2>
            
            <div className="basis-card">
              <h3 className="font-mono font-bold mb-4">Props Interface</h3>
              <CodeBlock code={`interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'stripes' | 'accent' | 'accent-secondary' | 'outlined';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// Compound Components
Card.Header
Card.Body
Card.Footer
Card.Title
Card.Description`} language="tsx" />
            </div>

            <ComponentSection 
              title="Card Variants"
              code={`<Card variant="standard">Standard card</Card>
<Card variant="stripes">Striped card</Card>
<Card variant="accent">Accent card</Card>
<Card variant="outlined">Outlined card</Card>`}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="basis-card">
                  <h4 className="font-mono font-bold mb-1">Standard</h4>
                  <p className="text-sm opacity-60">Default card with shadow</p>
                </div>
                <div className="basis-card basis-card-stripes">
                  <h4 className="font-mono font-bold mb-1">Stripes</h4>
                  <p className="text-sm opacity-60">Diagonal pattern background</p>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'react-forms':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Form Components</h2>
            
            <ComponentSection 
              title="Input"
              code={`<Input label="Email" type="email" placeholder="your@email.com" />
<Input label="Password" type="password" error errorMessage="Invalid password" />`}
            >
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="basis-form-label">Email</label>
                  <input type="email" placeholder="your@email.com" className="basis-input" />
                </div>
                <div>
                  <label className="basis-form-label">Password</label>
                  <input type="password" className="basis-input basis-input-error" />
                  <p className="basis-form-error">Password must be at least 8 characters</p>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Select"
              code={`<Select label="Country">
  <option value="mx">Mexico</option>
  <option value="es">Spain</option>
</Select>`}
            >
              <div className="max-w-md">
                <label className="basis-form-label">Country</label>
                <select className="basis-select">
                  <option>Mexico</option>
                  <option>Spain</option>
                </select>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Checkbox & Radio"
              code={`<Checkbox label="Accept terms" />
<Radio name="option" label="Option 1" />`}
            >
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="basis-checkbox" defaultChecked />
                  <span className="text-sm">Accept terms</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="radio" className="basis-radio" defaultChecked />
                  <span className="text-sm">Option 1</span>
                </label>
              </div>
            </ComponentSection>
          </div>
        );

      case 'react-overlay':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Overlay Components</h2>
            
            <ComponentSection 
              title="Toast"
              code={`// Provider
<ToastProvider>
  <App />
</ToastProvider>

// Hook
const toast = useToast();

toast.success('Saved successfully!');
toast.error('Something went wrong');`}
            >
              <div className="flex gap-2">
                <button className="basis-btn basis-btn-primary" onClick={() => showToastDemo('success')}>Success</button>
                <button className="basis-btn basis-btn-danger" onClick={() => showToastDemo('error')}>Error</button>
                <button className="basis-btn basis-btn-secondary" onClick={() => showToastDemo('warning')}>Warning</button>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Modal"
              code={`<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content...</Modal.Body>
  <Modal.Footer>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </Modal.Footer>
</Modal>`}
            >
              <button className="basis-btn basis-btn-primary" onClick={() => setShowModal(true)}>Open Modal</button>
            </ComponentSection>

            <ComponentSection 
              title="Dropdown"
              code={`<Dropdown trigger={<Button>Menu</Button>}>
  <Dropdown.Item>Option 1</Dropdown.Item>
  <Dropdown.Item>Option 2</Dropdown.Item>
  <Dropdown.Divider />
  <Dropdown.Item>Option 3</Dropdown.Item>
</Dropdown>`}
            >
              <div className="basis-dropdown">
                <button className="basis-btn basis-btn-secondary" onClick={() => setShowDropdown(!showDropdown)}>
                  Dropdown Menu
                </button>
                {showDropdown && (
                  <div className="basis-dropdown-menu">
                    <div className="basis-dropdown-item">Option 1</div>
                    <div className="basis-dropdown-item">Option 2</div>
                    <div className="basis-dropdown-divider"></div>
                    <div className="basis-dropdown-item">Option 3</div>
                  </div>
                )}
              </div>
            </ComponentSection>
          </div>
        );

      case 'react-sections':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Section Components</h2>
            <p className="text-sm opacity-70 mb-4">Landing page sections for marketing sites and applications</p>

            <ComponentSection
              title="Hero Section"
              code={`<Hero
  title="Build Amazing Interfaces"
  subtitle="The Neo-Brutalist Design System for Industrial Applications"
  primaryAction={{ label: 'Get Started', href: '/docs' }}
  secondaryAction={{ label: 'GitHub', href: 'https://github.com' }}
/>`}
            >
              <div className="p-8 border-2 border-current/20 bg-brand/5 text-center">
                <h3 className="font-mono text-2xl font-bold mb-2">Build Amazing Interfaces</h3>
                <p className="opacity-70 mb-4">The Neo-Brutalist Design System</p>
                <div className="flex justify-center gap-3">
                  <button className="basis-btn basis-btn-primary">Get Started</button>
                  <button className="basis-btn basis-btn-outline">GitHub</button>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection
              title="CTA Section"
              code={`<CTA
  title="Ready to Get Started?"
  description="Join thousands of developers building with BASIS KIT"
  primaryAction={{ label: 'Start Free', href: '/signup' }}
  secondaryAction={{ label: 'Contact Sales', href: '/contact' }}
/>`}
            >
              <div className="p-8 border-2 border-current/20 bg-brand text-white text-center">
                <h3 className="font-mono text-2xl font-bold mb-2">Ready to Get Started?</h3>
                <p className="opacity-80 mb-4">Join thousands of developers building with BASIS KIT</p>
                <div className="flex justify-center gap-3">
                  <button className="basis-btn bg-white text-brand border-white">Start Free</button>
                  <button className="basis-btn basis-btn-outline border-white text-white hover:bg-white/10">Contact Sales</button>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection
              title="Features Grid"
              code={`<Features columns={3}>
  <Feature icon="◎" title="Industrial Precision" description="8px grid system" />
  <Feature icon="◐" title="Brutal Aesthetics" description="Hard shadows" />
  <Feature icon="◑" title="Dual Identity" description="Two primary colors" />
</Features>`}
            >
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: '◎', title: 'Industrial Precision', desc: '8px grid system' },
                  { icon: '◐', title: 'Brutal Aesthetics', desc: 'Hard shadows' },
                  { icon: '◑', title: 'Dual Identity', desc: 'Two primary colors' },
                ].map(f => (
                  <div key={f.title} className="p-4 border-2 border-current/20">
                    <div className="text-2xl mb-2">{f.icon}</div>
                    <h4 className="font-mono font-bold">{f.title}</h4>
                    <p className="text-sm opacity-60">{f.desc}</p>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection
              title="Testimonials"
              code={`<Testimonials>
  <Testimonial
    quote="BASIS KIT transformed our development workflow"
    author="John Doe"
    role="CTO at TechCorp"
    avatar="/avatar.jpg"
  />
</Testimonials>`}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { quote: 'BASIS KIT transformed our development workflow. The consistency across projects is remarkable.', author: 'Ana García', role: 'Lead Developer' },
                  { quote: 'The brutal aesthetic fits perfectly with our industrial applications. Highly recommended.', author: 'Carlos Mendoza', role: 'UI Architect' },
                ].map((t, i) => (
                  <div key={i} className="p-6 border-2 border-current/20">
                    <p className="italic mb-4 opacity-80">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand text-white flex items-center justify-center font-mono font-bold">{t.author[0]}</div>
                      <div>
                        <p className="font-mono font-bold text-sm">{t.author}</p>
                        <p className="text-xs opacity-60">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection
              title="Stats Section"
              code={`<Stats>
  <Stat value="75+" label="Components" />
  <Stat value="40+" label="React Wrappers" />
  <Stat value="15+" label="Brands" />
</Stats>`}
            >
              <div className="grid md:grid-cols-4 gap-4 p-6 border-2 border-current/20 bg-card">
                {[
                  { value: '75+', label: 'Components' },
                  { value: '40+', label: 'React Wrappers' },
                  { value: '15+', label: 'Brands' },
                  { value: '8px', label: 'Grid System' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-mono text-4xl font-bold text-brand">{s.value}</div>
                    <div className="font-mono text-xs opacity-60 uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection
              title="Bento Grid"
              code={`<div class="basis-bento-grid">
  <div class="basis-bento-item basis-bento-span-2">Large Item</div>
  <div class="basis-bento-item">Small Item</div>
</div>`}
            >
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-2 row-span-2 basis-card p-4 bg-brand/10 border-brand/30">
                  <h4 className="font-mono font-bold">Featured</h4>
                  <p className="text-sm opacity-60 mt-1">2x2 span item</p>
                </div>
                <div className="basis-card p-3">
                  <h4 className="font-mono font-semibold text-sm">Stat 1</h4>
                  <p className="text-xs opacity-60">1x1</p>
                </div>
                <div className="basis-card p-3">
                  <h4 className="font-mono font-semibold text-sm">Stat 2</h4>
                  <p className="text-xs opacity-60">1x1</p>
                </div>
                <div className="basis-card p-3">
                  <h4 className="font-mono font-semibold text-sm">Metric</h4>
                  <p className="text-xs opacity-60">1x1</p>
                </div>
                <div className="col-span-2 basis-card p-3">
                  <h4 className="font-mono font-semibold text-sm">Wide Card</h4>
                  <p className="text-xs opacity-60">Spans 2 columns</p>
                </div>
                <div className="col-span-2 basis-card p-3">
                  <h4 className="font-mono font-semibold text-sm">Another Wide</h4>
                  <p className="text-xs opacity-60">Spans 2 columns</p>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection
              title="Process Steps"
              code={`<div class="basis-process">
  <div class="basis-step basis-step-complete">
    <div class="basis-step-number">1</div>
    <div class="basis-step-content">Step Title</div>
  </div>
</div>`}
            >
              <div className="flex gap-4">
                {[
                  { num: '01', title: 'Discovery', desc: 'Research & Planning', status: 'complete' },
                  { num: '02', title: 'Design', desc: 'UI/UX Design', status: 'complete' },
                  { num: '03', title: 'Development', desc: 'Build & Test', status: 'active' },
                  { num: '04', title: 'Deploy', desc: 'Launch & Monitor', status: 'pending' },
                ].map((step, i) => (
                  <div key={i} className="flex-1 relative">
                    <div className={`h-2 mb-4 ${step.status === 'complete' ? 'bg-green-500' : step.status === 'active' ? 'bg-brand' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-6 h-6 flex items-center justify-center font-mono text-xs font-bold ${step.status === 'complete' ? 'bg-green-500 text-white' : step.status === 'active' ? 'bg-brand text-white' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
                        {step.num}
                      </div>
                      <span className="font-mono font-semibold text-sm">{step.title}</span>
                    </div>
                    <p className="text-xs opacity-60">{step.desc}</p>
                  </div>
                ))}
              </div>
            </ComponentSection>

            <ComponentSection
              title="Comparison Table"
              code={`<div class="basis-comparison">
  <div class="basis-comparison-header">Feature Comparison</div>
</div>`}
            >
              <div className="border-2 border-foreground/20">
                <div className="grid grid-cols-4 gap-0 font-mono text-sm">
                  <div className="bg-secondary dark:bg-white/5 p-3 font-bold border-b border-foreground/20">Feature</div>
                  <div className="bg-secondary dark:bg-white/5 p-3 font-bold text-center border-b border-foreground/20">Basic</div>
                  <div className="bg-brand/10 p-3 font-bold text-center border-b border-brand/30">Pro</div>
                  <div className="bg-secondary dark:bg-white/5 p-3 font-bold text-center border-b border-foreground/20">Enterprise</div>
                  
                  <div className="p-3 border-b border-foreground/10">Users</div>
                  <div className="p-3 text-center border-b border-foreground/10">1</div>
                  <div className="p-3 text-center bg-brand/5 border-b border-brand/20">5</div>
                  <div className="p-3 text-center border-b border-foreground/10">Unlimited</div>
                  
                  <div className="p-3 border-b border-foreground/10">Storage</div>
                  <div className="p-3 text-center border-b border-foreground/10">1 GB</div>
                  <div className="p-3 text-center bg-brand/5 border-b border-brand/20">10 GB</div>
                  <div className="p-3 text-center border-b border-foreground/10">Unlimited</div>
                  
                  <div className="p-3">API Access</div>
                  <div className="p-3 text-center text-red-500">✕</div>
                  <div className="p-3 text-center bg-brand/5 text-green-500">✓</div>
                  <div className="p-3 text-center text-green-500">✓</div>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection
              title="Contact Form"
              code={`<form class="basis-form">
  <div class="basis-form-group">
    <label class="basis-label">Name</label>
    <input class="basis-input" type="text" />
  </div>
</form>`}
            >
              <form className="basis-form max-w-md">
                <div className="basis-form-group">
                  <label className="basis-label">Name</label>
                  <input className="basis-input" type="text" placeholder="Your name" />
                </div>
                <div className="basis-form-group">
                  <label className="basis-label">Email</label>
                  <input className="basis-input" type="email" placeholder="you@example.com" />
                </div>
                <div className="basis-form-group">
                  <label className="basis-label">Message</label>
                  <textarea className="basis-textarea" placeholder="Your message..." rows={3}></textarea>
                </div>
                <div className="flex gap-2 mt-4">
                  <button type="button" className="basis-btn basis-btn-primary">Send Message</button>
                  <button type="button" className="basis-btn basis-btn-secondary">Cancel</button>
                </div>
              </form>
            </ComponentSection>
          </div>
        );

      case 'react-navigation':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Navigation Components</h2>
            
            <ComponentSection 
              title="Navbar"
              code={`<Navbar brand={{ name: 'Brand', logo: 'B' }}>
  <Navbar.Item href="/">Home</Navbar.Item>
  <Navbar.Item href="/docs">Docs</Navbar.Item>
  <Navbar.Item href="/about">About</Navbar.Item>
</Navbar>`}
            >
              <nav className="basis-navbar">
                <div className="basis-navbar-brand">
                  <div className="basis-navbar-logo" style={{ background: current.color }}>B</div>
                  <span className="basis-navbar-title">{current.name}</span>
                </div>
                <div className="basis-navbar-menu">
                  <a className="basis-navbar-item basis-navbar-item-active">Home</a>
                  <a className="basis-navbar-item">Docs</a>
                  <a className="basis-navbar-item">About</a>
                </div>
              </nav>
            </ComponentSection>

            <ComponentSection 
              title="Tabs"
              code={`<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>`}
            >
              <div>
                <div className="basis-tabs">
                  {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, i) => (
                    <button 
                      key={tab}
                      className={`basis-tab ${activeTab === i ? 'basis-tab-active' : ''}`}
                      onClick={() => setActiveTab(i)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="basis-tabs-panel">
                  <p className="font-mono text-sm opacity-70">Content for Tab {activeTab + 1}</p>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection 
              title="Breadcrumb"
              code={`<Breadcrumb>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
  <Breadcrumb.Item current>Components</Breadcrumb.Item>
</Breadcrumb>`}
            >
              <nav className="basis-breadcrumb">
                <a className="basis-breadcrumb-item">Home</a>
                <span className="basis-breadcrumb-separator">/</span>
                <a className="basis-breadcrumb-item">Components</a>
                <span className="basis-breadcrumb-separator">/</span>
                <span className="basis-breadcrumb-item basis-breadcrumb-item-active">Breadcrumb</span>
              </nav>
            </ComponentSection>
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      // CHANGELOG v6.0
      // ─────────────────────────────────────────────────────────────────────
      case 'changelog-v6':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Changelog - v6.0</h2>
            
            <div className="basis-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-brand text-white font-mono text-xs font-bold">v6.0.0</span>
                <span className="font-mono text-xs opacity-60">Current Release</span>
              </div>
              
              <h3 className="font-mono text-lg font-bold mb-3 text-green-500">🆕 React Components (40+ componentes)</h3>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                <div className="p-3 border border-current/20">
                  <p className="font-mono text-xs font-bold text-brand mb-1">Base</p>
                  <p className="text-xs opacity-70">Button, Card, Badge, Chip, Alert, Input, Avatar, Progress, Skeleton, StatCard, Divider, CodeBlock</p>
                </div>
                <div className="p-3 border border-current/20">
                  <p className="font-mono text-xs font-bold text-brand mb-1">Overlay</p>
                  <p className="text-xs opacity-70">Toast (con Provider + Hook), Modal, ConfirmModal, Dropdown, Tooltip</p>
                </div>
                <div className="p-3 border border-current/20">
                  <p className="font-mono text-xs font-bold text-brand mb-1">Navigation</p>
                  <p className="text-xs opacity-70">Tabs, Accordion, Pagination, Breadcrumb, Stepper</p>
                </div>
                <div className="p-3 border border-current/20">
                  <p className="font-mono text-xs font-bold text-brand mb-1">Data</p>
                  <p className="text-xs opacity-70">Table, SimpleTable, Counter, PriceTable, EmptyState</p>
                </div>
                <div className="p-3 border border-current/20">
                  <p className="font-mono text-xs font-bold text-brand mb-1">Section</p>
                  <p className="text-xs opacity-70">Hero, CTA, Features, Testimonials</p>
                </div>
                <div className="p-3 border border-current/20">
                  <p className="font-mono text-xs font-bold text-brand mb-1">Layout</p>
                  <p className="text-xs opacity-70">Navbar, Sidebar, Footer, AppShell, DashboardLayout</p>
                </div>
              </div>

              <h3 className="font-mono text-lg font-bold mb-3 text-cyan-500">⚡ Developer Experience (DX)</h3>
              <ul className="space-y-2 mb-6 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>TypeScript types exportados para todos los componentes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>forwardRef support en todos los componentes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Compound components (Card.Header, Tabs.List, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Custom hooks (useToast)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Props inteligentes con valores por defecto</span>
                </li>
              </ul>

              <h3 className="font-mono text-lg font-bold mb-3 text-purple-500">🏗️ Arquitectura CSS → React</h3>
              <div className="bg-white/5 p-4 border border-current/20 mb-6">
                <div className="flex items-center gap-4 text-sm">
                  <div className="p-2 border border-current/20">
                    <p className="font-mono text-xs opacity-60">CSS</p>
                    <p className="font-mono font-bold">globals.css</p>
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="p-2 border border-current/20">
                    <p className="font-mono text-xs opacity-60">Single Source</p>
                    <p className="font-mono font-bold">of Truth</p>
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="p-2 border border-current/20">
                    <p className="font-mono text-xs opacity-60">React</p>
                    <p className="font-mono font-bold">Components</p>
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="p-2 border border-brand/50 bg-brand/10">
                    <p className="font-mono text-xs opacity-60">Developer</p>
                    <p className="font-mono font-bold text-brand">Props</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // ─────────────────────────────────────────────────────────────────────
      // CHANGELOG - VERSION HISTORY
      // ─────────────────────────────────────────────────────────────────────
      case 'changelog-all':
        return (
          <div className="space-y-8">
            <h2 className="font-mono text-3xl font-bold mb-4">Changelog</h2>
            
            {/* v5.0.0 */}
            <div className="basis-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-brand text-white font-mono text-xs font-bold">v5.0.0</span>
                <span className="font-mono text-xs opacity-60">Current Release</span>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-mono font-semibold mb-2">New Modules</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><span className="text-green-500">+</span> Engineering Data: Data Grid, Code Block, Status Timeline, Stat Trend, Gauge Meter, Heatmap Grid</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Technical Charts: Gantt Chart, Sankey Diagram, Candlestick Chart</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Process Control: App Shell, Diff Viewer, Tree View</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Financial/ERP: Waterfall Chart, Bullet Graph, Treemap, Burn Rate, Aging Heatmap</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Price Table component for Data Display</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono font-semibold mb-2">Improvements</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><span className="text-blue-500">~</span> 75+ components total (from 45+)</li>
                    <li className="flex gap-2"><span className="text-blue-500">~</span> Improved light mode contrast for Engineering Data components</li>
                    <li className="flex gap-2"><span className="text-blue-500">~</span> Fixed Brand Shadows to only affect shadow color, not background</li>
                    <li className="flex gap-2"><span className="text-blue-500">~</span> Fixed spacing in ordered list Roman numerals</li>
                    <li className="flex gap-2"><span className="text-blue-500">~</span> Better copy button contrast in code blocks</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* v4.0 */}
            <div className="basis-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-brand-secondary text-white font-mono text-xs font-bold">v4.0.0</span>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-mono font-semibold mb-2">New Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><span className="text-green-500">+</span> 45+ component library with full documentation</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Dual primary color system for MSICCA brand</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Images component with aspect ratios</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Icons component with size and surface modifiers</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Slider component for carousels</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> CSS Counters system (section, chapter, steps, roman, alpha)</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Counter badges and display components</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Interactive documentation with live examples</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono font-semibold mb-2">Changes</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><span className="text-yellow-500">~</span> Diagonal stripes: 8px spacing (was 12px), 50% opacity (was 20%)</li>
                    <li className="flex gap-2"><span className="text-yellow-500">~</span> Progress bar 2x height renamed from &quot;wide&quot; to &quot;double&quot;</li>
                    <li className="flex gap-2"><span className="text-yellow-500">~</span> Improved dark mode pattern opacity</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* v3.0 */}
            <div className="basis-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-brand-secondary text-white font-mono text-xs font-bold">v3.0.0</span>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-mono font-semibold mb-2">New Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><span className="text-green-500">+</span> 32+ component library</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> MSICCA dual primary colors (#C93400 + #0095C9)</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Diagonal stripes pattern (12px spacing, 20% opacity)</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Progress bar 2x height variant</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* v2.0 */}
            <div className="basis-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-neutral-500 text-white font-mono text-xs font-bold">v2.0.0</span>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-mono font-semibold mb-2">New Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><span className="text-green-500">+</span> Basic component library (20+ components)</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Neo-brutalist design system foundation</li>
                    <li className="flex gap-2"><span className="text-green-500">+</span> Dark mode support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* v1.0 */}
            <div className="basis-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-neutral-700 text-white font-mono text-xs font-bold">v1.0.0</span>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-mono font-semibold mb-2">Initial Release</h4>
                  <ul className="space-y-2 text-sm opacity-70">
                    <li className="flex gap-2"><span className="text-blue-500">•</span> Core design tokens</li>
                    <li className="flex gap-2"><span className="text-blue-500">•</span> Basic CSS variables</li>
                    <li className="flex gap-2"><span className="text-blue-500">•</span> IBM Plex Mono + Inter fonts</li>
                    <li className="flex gap-2"><span className="text-blue-500">•</span> 8px grid foundation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`min-h-screen ${dark ? 'dark bg-[#171717] text-white' : 'bg-white text-black'}`}
      style={{ '--brand': current.color, '--brand-rgb': hexToRgb(current.color), '--brand-secondary': current.secondaryColor || current.color } as React.CSSProperties}
    >
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.08]" style={{
        backgroundImage: `repeating-linear-gradient(-21deg, transparent, transparent 7.5px, ${dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} 7.5px, ${dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} 8px)`
      }} />

      {/* Toast */}
      {showToast && (
        <div className={`basis-toast basis-toast-top-right basis-toast-${toastType}`}>
          <span>{toastType === 'success' ? '✓' : toastType === 'error' ? '✕' : toastType === 'warning' ? '⚠' : 'ℹ'}</span>
          <span>This is a {toastType} toast notification</span>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="basis-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="basis-modal basis-modal-lg" onClick={e => e.stopPropagation()}>
            <div className="basis-modal-header">
              <h3 className="basis-modal-title">Modal Title</h3>
              <button className="basis-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="basis-modal-body">
              <p className="opacity-70">This is a modal dialog with brutal styling. You can put any content here including forms, text, or other components.</p>
              <div className="mt-4">
                <label className="basis-form-label">Sample Input</label>
                <input type="text" className="basis-input" placeholder="Enter text..." />
              </div>
            </div>
            <div className="basis-modal-footer">
              <button className="basis-btn basis-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="basis-btn basis-btn-primary" onClick={() => setShowModal(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-50 border-b-2 ${dark ? 'border-white/20 bg-[#171717]/95 backdrop-blur' : 'border-black bg-white/95 backdrop-blur'}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10"
            >
              <span className="font-mono text-sm">{sidebarOpen ? '◀' : '▶'}</span>
            </button>
            <div className="w-10 h-10 border-2 border-current flex items-center justify-center font-mono font-bold text-white text-lg shadow-brutal" style={{ background: current.color }}>B</div>
            <div>
              <h1 className="font-mono font-bold uppercase tracking-wider">BASIS KIT</h1>
              <p className="font-mono text-xs opacity-60">v6.0 - Interactive Documentation</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={brand} 
              onChange={e => setBrand(e.target.value)} 
              className="basis-select w-auto"
            >
              <optgroup label="Websites">
                {WEBSITES.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
              </optgroup>
              <optgroup label="Applications">
                {APPLICATIONS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </optgroup>
            </select>
            <button 
              onClick={() => setDark(!dark)} 
              className="basis-btn basis-btn-secondary text-xs"
            >
              {dark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Fixed Position */}
        <aside 
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } fixed top-[72px] bottom-0 left-0 z-40 transition-all duration-300 overflow-hidden border-r-2 ${
            dark ? 'border-white/20 bg-[#171717]' : 'border-black/20 bg-white'
          }`}
        >
          <nav className="p-4 h-full overflow-y-auto scrollbar-hide">
            {NAV_STRUCTURE.map(section => {
              const isExpanded = expandedSections.has(section.id);
              const hasChildren = section.children && section.children.length > 0;
              
              return (
                <div key={section.id} className="mb-2">
                  {/* Section Header - Clickable to expand/collapse */}
                  <button
                    onClick={() => hasChildren && toggleSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                      dark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                    }`}
                  >
                    <span className="opacity-50">{section.label}</span>
                    {hasChildren && (
                      <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                        ▶
                      </span>
                    )}
                  </button>
                  
                  {/* Section Children - Collapsible */}
                  {isExpanded && hasChildren && (
                    <div className="ml-2 border-l border-current/10">
                      {section.children?.map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleSectionChange(item.id)}
                          className={`w-full text-left px-3 py-2 font-mono text-sm transition-colors ${
                            activeSection === item.id 
                              ? 'text-brand bg-brand/10 border-l-2 border-brand -ml-[2px] pl-[calc(0.75rem+2px)]' 
                              : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content - Dynamic Margin */}
        <main className={`flex-1 p-8 overflow-x-hidden transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="max-w-4xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
