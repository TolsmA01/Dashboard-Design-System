/* ============================================================
   DASHBOARD DESIGN SYSTEM BUILDER — App Logic
   ============================================================ */

'use strict';

// ─── State ────────────────────────────────────────────────────────────────────

const state = {
  currentStep: 0,

  brand: {
    name:           'Acme Corp',
    tagline:        'Data & Analytics',
    initial:        'A',
    logoUrl:        null,   // data URL for uploaded logo
    extractedColors:[],     // colors from brand image upload
    guidelinesText: ''      // pasted brand guidelines text
  },

  colors: {
    pageBg:    '#0D1B2A',
    cardBg:    '#1A2B3C',
    headerBg:  '#081525',
    navBg:     '#0F2236',
    textPrimary:   '#FFFFFF',
    textSecondary: '#94A3B8',
    accent1:   '#00B4D8',
    accent2:   '#F4A261',
    chart: ['#00B4D8','#F4A261','#7B2D8B','#3CB371','#FF6B6B','#FFD700'],
    statusPos: '#22C55E',
    statusWarn:'#F59E0B',
    statusNeg: '#EF4444',
    tableHeaderBg:   '#00B4D8',
    tableHeaderText: '#FFFFFF',
    kpiCardBg: '#00B4D8'
  },

  typography: {
    headingFont: 'Inter',
    bodyFont:    'Inter',
    titleSize:   24,
    cardTitleSize: 13,
    kpiValueSize:  28,
    bodySize:    12,
    labelSize:   10
  },

  layout: {
    cardRadius:    8,
    cardShadow:    true,
    cardBorder:    false,
    kpiStyle:      'colored',   // colored | dark | minimal
    tableStyle:    'striped',   // striped | clean | bordered
    spacing:       'normal'     // compact | normal | spacious
  },

  components: {
    chartBarStyle: 'rounded',  // rounded | sharp
    showGridLines: true,
    kpiAccentBar:  true
  }
};

// ─── Preset Themes ────────────────────────────────────────────────────────────

const PRESETS = {
  'corporate-dark': {
    label: 'Corporate Dark',
    dots: ['#00B4D8','#F4A261','#0D1B2A'],
    colors: {
      pageBg:'#0D1B2A', cardBg:'#1A2B3C', headerBg:'#081525', navBg:'#0F2236',
      textPrimary:'#FFFFFF', textSecondary:'#94A3B8',
      accent1:'#00B4D8', accent2:'#F4A261',
      chart:['#00B4D8','#F4A261','#7B2D8B','#3CB371','#FF6B6B','#FFD700'],
      statusPos:'#22C55E', statusWarn:'#F59E0B', statusNeg:'#EF4444',
      tableHeaderBg:'#00B4D8', tableHeaderText:'#ffffff', kpiCardBg:'#00B4D8'
    }
  },
  'midnight-purple': {
    label: 'Midnight Purple',
    dots: ['#7C3AED','#A78BFA','#1E1B4B'],
    colors: {
      pageBg:'#1E1B4B', cardBg:'#2D2A6E', headerBg:'#16134A', navBg:'#1A1752',
      textPrimary:'#EDE9FE', textSecondary:'#A78BFA',
      accent1:'#7C3AED', accent2:'#F472B6',
      chart:['#7C3AED','#F472B6','#38BDF8','#34D399','#FBBF24','#FB7185'],
      statusPos:'#34D399', statusWarn:'#FBBF24', statusNeg:'#FB7185',
      tableHeaderBg:'#7C3AED', tableHeaderText:'#ffffff', kpiCardBg:'#7C3AED'
    }
  },
  'corporate-light': {
    label: 'Corporate Light',
    dots: ['#0EA5E9','#F97316','#F8FAFC'],
    colors: {
      pageBg:'#F1F5F9', cardBg:'#FFFFFF', headerBg:'#1E3A5F', navBg:'#EFF6FF',
      textPrimary:'#1E293B', textSecondary:'#64748B',
      accent1:'#0EA5E9', accent2:'#F97316',
      chart:['#0EA5E9','#F97316','#8B5CF6','#10B981','#F43F5E','#EAB308'],
      statusPos:'#10B981', statusWarn:'#F59E0B', statusNeg:'#EF4444',
      tableHeaderBg:'#1E3A5F', tableHeaderText:'#ffffff', kpiCardBg:'#0EA5E9'
    }
  },
  'emerald': {
    label: 'Emerald Dark',
    dots: ['#10B981','#6EE7B7','#0A2520'],
    colors: {
      pageBg:'#0A2520', cardBg:'#133027', headerBg:'#071A17', navBg:'#0F2A22',
      textPrimary:'#ECFDF5', textSecondary:'#6EE7B7',
      accent1:'#10B981', accent2:'#FBBF24',
      chart:['#10B981','#FBBF24','#38BDF8','#A78BFA','#FB923C','#F472B6'],
      statusPos:'#34D399', statusWarn:'#FBBF24', statusNeg:'#F87171',
      tableHeaderBg:'#10B981', tableHeaderText:'#ffffff', kpiCardBg:'#10B981'
    }
  }
};

// ─── Step Definitions ─────────────────────────────────────────────────────────

const STEPS = [
  { id: 'brand',      label: 'Brand Identity',   badge: '01', desc: 'Set your brand name, tagline and choose a theme starting point.' },
  { id: 'colors',     label: 'Color Palette',    badge: '02', desc: 'Define background, card, text and accent colors for your dashboard.' },
  { id: 'typography', label: 'Typography',       badge: '03', desc: 'Choose fonts and set the size scale for your dashboard elements.' },
  { id: 'layout',     label: 'Layout & Cards',   badge: '04', desc: 'Configure card style, radius, shadows and dashboard spacing.' },
  { id: 'components', label: 'KPIs & Tables',    badge: '05', desc: 'Define KPI card appearance, table styles and chart options.' },
  { id: 'export',     label: 'Export',           badge: '06', desc: 'Download your design system as PDF, Power BI theme, and background assets.' }
];

// ─── Step Renderers ───────────────────────────────────────────────────────────

function renderStepBrand() {
  const ec = state.brand.extractedColors;
  const extractedHtml = ec.length ? `
    <div class="extracted-colors-wrap">
      <div class="extracted-colors-label">Colors extracted from brand — click any to apply</div>
      <div class="extracted-chips">
        ${ec.map((col,i) => `
          <div class="color-chip" style="background:${col}" title="${col}" onclick="applyExtractedColor(${i},'${col}')">
            <div class="color-chip-hex">${col.toUpperCase()}</div>
          </div>`).join('')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-ghost" style="font-size:11px;padding:5px 12px" onclick="applyAllExtractedColors()">
          ✦ Apply all to palette
        </button>
        <button class="btn btn-ghost" style="font-size:11px;padding:5px 12px" onclick="state.brand.extractedColors=[];renderCurrentStep();">
          Clear
        </button>
      </div>
    </div>` : '';

  return `
    <div class="form-section">
      <div class="form-section-title">Dashboard Identity</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Brand / Dashboard Name</label>
          <input type="text" value="${state.brand.name}" oninput="updateState('brand.name',this.value);updatePreview();" placeholder="e.g. Acme Corp">
        </div>
        <div class="form-group" style="max-width:88px">
          <label class="form-label">Initial</label>
          <input type="text" value="${state.brand.initial}" maxlength="2" oninput="updateState('brand.initial',this.value.toUpperCase());updatePreview();" placeholder="A">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Department / Tagline</label>
          <input type="text" value="${state.brand.tagline}" oninput="updateState('brand.tagline',this.value);updatePreview();" placeholder="e.g. Data & Analytics">
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Company Logo</div>
      ${state.brand.logoUrl ? `
        <div class="logo-preview-wrap">
          <img src="${state.brand.logoUrl}" alt="Company logo">
          <div class="logo-preview-info">
            <div class="logo-preview-name">Logo uploaded</div>
            <div class="logo-preview-size">Shown in preview &amp; PDF</div>
          </div>
          <button class="btn btn-ghost" style="font-size:11px;padding:5px 10px" onclick="removeLogo()">Remove</button>
        </div>` : `
        <label class="upload-zone">
          <input type="file" accept="image/*" style="display:none" onchange="handleLogoUpload(this)">
          <div class="upload-zone-icon">🏢</div>
          <div class="upload-zone-label">Click to upload company logo</div>
          <div class="upload-zone-sub">PNG, SVG, JPG — shown in dashboard header &amp; PDF cover</div>
        </label>`}
    </div>

    <div class="form-section">
      <div class="form-section-title">Brand Inspiration</div>
      <div class="info-banner">
        <span class="info-banner-icon">💡</span>
        <span>Upload a brand image (logo, guidelines page, website screenshot) or paste your brand guidelines text. We'll extract the color palette and font suggestions automatically.</span>
      </div>
      <label class="upload-zone" style="margin-bottom:12px">
        <input type="file" accept="image/*,.txt,.md" style="display:none" onchange="handleBrandUpload(this)">
        <div class="upload-zone-icon">📎</div>
        <div class="upload-zone-label">Upload brand image or text file</div>
        <div class="upload-zone-sub">JPG · PNG · WebP · TXT · MD — colors extracted automatically</div>
      </label>
      ${extractedHtml}
      <label class="form-label" style="display:block;margin-top:14px;margin-bottom:6px">Or paste brand guidelines text</label>
      <textarea rows="3" placeholder="e.g. Primary: #1E3A5F · Accent: #00B4D8 · Font: Montserrat · Secondary: #F4A261..."
        oninput="updateState('brand.guidelinesText',this.value)">${state.brand.guidelinesText}</textarea>
      <button class="btn btn-ghost" style="margin-top:8px;font-size:12px" onclick="parseBrandText()">
        ✨ Extract colors &amp; fonts from text
      </button>
    </div>

    <div class="form-section">
      <div class="form-section-title">Theme Starting Point</div>
      <div class="presets-row" id="presets-row">
        ${Object.entries(PRESETS).map(([key, p]) => `
          <button class="preset-btn" data-preset="${key}" onclick="applyPreset('${key}')">
            <span class="preset-dots">${p.dots.map(c=>`<span class="preset-dot" style="background:${c}"></span>`).join('')}</span>
            ${p.label}
          </button>`).join('')}
      </div>
      <p style="font-size:11px;color:var(--text-lo);margin-top:8px;line-height:1.6">
        Pick a preset or use your brand colors above. All values can be fine-tuned in the next steps.
      </p>
    </div>`;
}

function renderStepColors() {
  const c = state.colors;

  function cp(key, label, val) {
    return `
      <div class="color-item">
        <div class="color-swatch-btn" style="background:${val}" title="${label}">
          <div class="color-swatch-preview" style="background:${val}"></div>
          <input type="color" value="${val}" oninput="updateState('colors.${key}',this.value);syncSwatchPreview(this);updatePreview();">
        </div>
        <label>${label}</label>
      </div>`;
  }

  const chartPills = c.chart.map((col, i) => `
    <div class="palette-pill" style="background:${col}" title="Chart color ${i+1}">
      <div class="palette-pill-bg" style="background:${col}"></div>
      <input type="color" value="${col}" oninput="updateChartColor(${i},this.value);syncPillPreview(this);">
    </div>`).join('');

  return `
    <div class="form-section">
      <div class="form-section-title">Page & Structure</div>
      <div class="color-row">
        ${cp('pageBg','Page BG', c.pageBg)}
        ${cp('cardBg','Card BG', c.cardBg)}
        ${cp('headerBg','Header', c.headerBg)}
        ${cp('navBg','Nav BG', c.navBg)}
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Text Colors</div>
      <div class="color-row">
        ${cp('textPrimary','Primary', c.textPrimary)}
        ${cp('textSecondary','Secondary', c.textSecondary)}
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Brand Accent Colors</div>
      <div class="color-row">
        ${cp('accent1','Primary Accent', c.accent1)}
        ${cp('accent2','Secondary Accent', c.accent2)}
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Chart / Data Visualization Palette</div>
      <div class="palette-grid" style="margin-bottom:8px">${chartPills}</div>
      <p style="font-size:10px;color:var(--text-lo)">Click any swatch to change its color. Used in order for all chart series.</p>
    </div>

    <div class="form-section">
      <div class="form-section-title">Status & Alert Colors</div>
      <div class="color-row">
        ${cp('statusPos','Positive', c.statusPos)}
        ${cp('statusWarn','Warning', c.statusWarn)}
        ${cp('statusNeg','Negative', c.statusNeg)}
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Table & KPI Colors</div>
      <div class="color-row">
        ${cp('tableHeaderBg','Table Header BG', c.tableHeaderBg)}
        ${cp('tableHeaderText','Table Header Text', c.tableHeaderText)}
        ${cp('kpiCardBg','KPI Card (colored)', c.kpiCardBg)}
      </div>
    </div>`;
}

function renderStepTypography() {
  const fonts = ['Inter','Roboto','Open Sans','Lato','Source Sans 3','IBM Plex Sans','DM Sans','Nunito Sans','Montserrat','Poppins','Raleway'];
  const t = state.typography;

  function fontSelect(key, label, val) {
    return `
      <div class="form-group">
        <label class="form-label">${label}</label>
        <select onchange="updateState('typography.${key}',this.value);renderCurrentStep();updatePreview();">
          ${fonts.map(f => `<option value="${f}" ${f===val?'selected':''}>${f}</option>`).join('')}
        </select>
      </div>`;
  }

  function sizeInput(key, label, val, min, max) {
    return `
      <div class="form-group">
        <label class="form-label">${label} <span class="form-label-value">${val}px</span></label>
        <input type="range" min="${min}" max="${max}" value="${val}"
          oninput="updateState('typography.${key}',+this.value);this.previousElementSibling.querySelector('.form-label-value').textContent=this.value+'px';updatePreview();">
      </div>`;
  }

  const headFont  = t.headingFont;
  const bodyFont  = t.bodyFont;

  return `
    <div class="form-section">
      <div class="form-section-title">Font Families</div>
      <div class="form-row">
        ${fontSelect('headingFont','Heading / KPI Font', headFont)}
        ${fontSelect('bodyFont','Body / Label Font', bodyFont)}
      </div>
      <div class="font-preview-row">
        <div class="font-preview-card">
          <div class="font-preview-name">Heading font — ${headFont}</div>
          <div class="font-preview-large" style="font-family:'${headFont}',sans-serif">Dashboard Title</div>
          <div class="font-preview-num"  style="font-family:'${headFont}',sans-serif">$2,483,920</div>
        </div>
        <div class="font-preview-card">
          <div class="font-preview-name">Body font — ${bodyFont}</div>
          <div class="font-preview-large" style="font-family:'${bodyFont}',sans-serif;font-size:14px;font-weight:600">Section Label</div>
          <div class="font-preview-body"  style="font-family:'${bodyFont}',sans-serif">Data updated daily at 06:00 UTC</div>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Size Scale</div>
      ${sizeInput('titleSize',    'Dashboard Title',  t.titleSize,    16, 40)}
      ${sizeInput('cardTitleSize','Card / Section Title', t.cardTitleSize, 9, 20)}
      ${sizeInput('kpiValueSize', 'KPI Value',        t.kpiValueSize, 18, 52)}
      ${sizeInput('bodySize',     'Body Text',        t.bodySize,      9, 18)}
      ${sizeInput('labelSize',    'Label / Caption',  t.labelSize,     8, 14)}
    </div>`;
}

function renderStepLayout() {
  const l = state.layout;

  function optCards(groupKey, options) {
    return `<div class="option-cards">
      ${options.map(o => `
        <div class="option-card ${l[groupKey]===o.val?'selected':''}"
          onclick="updateState('layout.${groupKey}','${o.val}');renderCurrentStep();updatePreview();">
          <div class="option-card-icon">${o.icon}</div>
          <div class="option-card-label">${o.label}</div>
          ${o.desc ? `<div class="option-card-desc">${o.desc}</div>` : ''}
        </div>`).join('')}
    </div>`;
  }

  return `
    <div class="form-section">
      <div class="form-section-title">KPI Card Style</div>
      ${optCards('kpiStyle',[
        {val:'colored', icon:'🟦', label:'Colored',   desc:'Accent BG'},
        {val:'dark',    icon:'⬛', label:'Dark',      desc:'Card BG'},
        {val:'minimal', icon:'◻️',  label:'Minimal',   desc:'Accent bar'}
      ])}
    </div>

    <div class="form-section">
      <div class="form-section-title">Card Corner Radius</div>
      <div class="form-group">
        <label class="form-label">Radius <span class="form-label-value" id="radius-val">${l.cardRadius}px</span></label>
        <input type="range" min="0" max="24" value="${l.cardRadius}"
          oninput="updateState('layout.cardRadius',+this.value);document.getElementById('radius-val').textContent=this.value+'px';updatePreview();">
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Card Depth</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Drop Shadow</label>
          <div class="option-cards">
            <div class="option-card ${l.cardShadow?'selected':''}" onclick="updateState('layout.cardShadow',true);renderCurrentStep();updatePreview();">
              <div class="option-card-icon">🌑</div>
              <div class="option-card-label">On</div>
            </div>
            <div class="option-card ${!l.cardShadow?'selected':''}" onclick="updateState('layout.cardShadow',false);renderCurrentStep();updatePreview();">
              <div class="option-card-icon">⬜</div>
              <div class="option-card-label">Off</div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Card Border</label>
          <div class="option-cards">
            <div class="option-card ${l.cardBorder?'selected':''}" onclick="updateState('layout.cardBorder',true);renderCurrentStep();updatePreview();">
              <div class="option-card-icon">🔲</div>
              <div class="option-card-label">On</div>
            </div>
            <div class="option-card ${!l.cardBorder?'selected':''}" onclick="updateState('layout.cardBorder',false);renderCurrentStep();updatePreview();">
              <div class="option-card-icon">⬜</div>
              <div class="option-card-label">Off</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Dashboard Spacing</div>
      ${optCards('spacing',[
        {val:'compact',  icon:'⬛', label:'Compact',  desc:'Tight gaps'},
        {val:'normal',   icon:'🟦', label:'Normal',   desc:'Balanced'},
        {val:'spacious', icon:'🟩', label:'Spacious', desc:'Airy layout'}
      ])}
    </div>`;
}

function renderStepComponents() {
  const comp = state.components;
  const l = state.layout;

  function optCards(obj, key, options) {
    return `<div class="option-cards">
      ${options.map(o => `
        <div class="option-card ${obj[key]===o.val?'selected':''}"
          onclick="updateState('${key.includes('.')?key:'components.'+key}','${o.val}');renderCurrentStep();updatePreview();">
          <div class="option-card-icon">${o.icon}</div>
          <div class="option-card-label">${o.label}</div>
          ${o.desc ? `<div class="option-card-desc">${o.desc}</div>` : ''}
        </div>`).join('')}
    </div>`;
  }

  return `
    <div class="form-section">
      <div class="form-section-title">Table Style</div>
      <div class="option-cards">
        ${['striped','clean','bordered'].map(v => `
          <div class="option-card ${l.tableStyle===v?'selected':''}"
            onclick="updateState('layout.tableStyle','${v}');renderCurrentStep();updatePreview();">
            <div class="option-card-icon">${v==='striped'?'📊':v==='clean'?'📋':'🗄️'}</div>
            <div class="option-card-label">${v.charAt(0).toUpperCase()+v.slice(1)}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Chart Bar Style</div>
      ${optCards(comp,'chartBarStyle',[
        {val:'rounded', icon:'⬛', label:'Rounded', desc:'Soft corners'},
        {val:'sharp',   icon:'🔲', label:'Sharp',   desc:'Crisp edges'}
      ])}
    </div>

    <div class="form-section">
      <div class="form-section-title">Grid Lines in Charts</div>
      <div class="option-cards">
        <div class="option-card ${comp.showGridLines?'selected':''}" onclick="updateState('components.showGridLines',true);renderCurrentStep();updatePreview();">
          <div class="option-card-icon">⊞</div>
          <div class="option-card-label">Show</div>
        </div>
        <div class="option-card ${!comp.showGridLines?'selected':''}" onclick="updateState('components.showGridLines',false);renderCurrentStep();updatePreview();">
          <div class="option-card-icon">◻️</div>
          <div class="option-card-label">Hide</div>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">KPI Accent Bar</div>
      <div class="option-cards">
        <div class="option-card ${comp.kpiAccentBar?'selected':''}" onclick="updateState('components.kpiAccentBar',true);renderCurrentStep();updatePreview();">
          <div class="option-card-icon">▌</div>
          <div class="option-card-label">Show</div>
        </div>
        <div class="option-card ${!comp.kpiAccentBar?'selected':''}" onclick="updateState('components.kpiAccentBar',false);renderCurrentStep();updatePreview();">
          <div class="option-card-icon">◻️</div>
          <div class="option-card-label">Hide</div>
        </div>
      </div>
    </div>`;
}

function renderStepExport() {
  const c = state.colors;
  const summaryItems = [
    {label:'Brand Name',     value: state.brand.name},
    {label:'Page Background', swatch: c.pageBg},
    {label:'Card Background', swatch: c.cardBg},
    {label:'Primary Accent',  swatch: c.accent1},
    {label:'Secondary Accent',swatch: c.accent2},
    {label:'Heading Font',    value: state.typography.headingFont},
    {label:'Body Font',       value: state.typography.bodyFont},
    {label:'KPI Style',       value: state.layout.kpiStyle},
    {label:'Card Radius',     value: state.layout.cardRadius + 'px'}
  ];

  return `
    <div class="form-section">
      <div class="form-section-title">Design Summary</div>
      <div class="summary-grid">
        ${summaryItems.map(r => `
          <div class="summary-row">
            <span class="summary-label">${r.label}</span>
            ${r.swatch ? `<span class="summary-swatch" style="background:${r.swatch}"></span><span class="summary-value">${r.swatch}</span>` : `<span class="summary-value">${r.value}</span>`}
          </div>`).join('')}
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Downloads</div>
      <div class="export-grid">

        <div class="export-card" onclick="exportPDF()">
          <div class="export-card-icon">📄</div>
          <div class="export-card-title">Brand Guidelines PDF</div>
          <div class="export-card-desc">Multi-page PDF with color swatches, typography scale, layout specs and component guidelines.</div>
          <span class="export-card-badge">PDF</span>
        </div>

        <div class="export-card" onclick="exportPowerBIJson()">
          <div class="export-card-icon">📊</div>
          <div class="export-card-title">Power BI Theme JSON</div>
          <div class="export-card-desc">Ready-to-upload .json theme file for Power BI with your full color palette and font settings.</div>
          <span class="export-card-badge">JSON</span>
        </div>

        <div class="export-card" onclick="exportBackground()">
          <div class="export-card-icon">🖼️</div>
          <div class="export-card-title">Page Background</div>
          <div class="export-card-desc">1920×1080 PNG background scrim with your page background color and optional subtle pattern.</div>
          <span class="export-card-badge">PNG 1920×1080</span>
        </div>

        <div class="export-card" onclick="exportCardTemplate()">
          <div class="export-card-icon">🃏</div>
          <div class="export-card-title">Card Template</div>
          <div class="export-card-desc">Styled card PNG with your card background, radius and border settings for use in design tools.</div>
          <span class="export-card-badge">PNG 600×400</span>
        </div>

        <div class="export-card" onclick="exportMarkdown()" style="grid-column:1/-1;border-color:rgba(99,102,241,0.3);background:rgba(99,102,241,0.04)">
          <div class="export-card-icon">📝</div>
          <div class="export-card-title" style="color:var(--accent)">UX Compliance Guidelines (Markdown)</div>
          <div class="export-card-desc">Complete rules document — colors, fonts, spacing, radius, KPI rules, table rules and a compliance checklist. Plug directly into the UX guideline compliance checker tool.</div>
          <span class="export-card-badge" style="background:rgba(99,102,241,0.1);color:var(--accent);border-color:rgba(99,102,241,0.2)">.md Markdown</span>
        </div>

      </div>
    </div>`;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function updateState(path, value) {
  const keys = path.split('.');
  let obj = state;
  for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
  obj[keys[keys.length - 1]] = value;
}

function updateChartColor(idx, val) {
  state.colors.chart[idx] = val;
  updatePreview();
}

function syncSwatchPreview(input) {
  const preview = input.previousElementSibling;
  if (preview) preview.style.background = input.value;
  const btn = input.closest('.color-swatch-btn');
  if (btn) btn.style.background = input.value;
}

function syncPillPreview(input) {
  const preview = input.previousElementSibling;
  if (preview) preview.style.background = input.value;
  const pill = input.closest('.palette-pill');
  if (pill) pill.style.background = input.value;
}

function applyPreset(key) {
  const preset = PRESETS[key];
  if (!preset) return;
  Object.assign(state.colors, preset.colors);
  renderCurrentStep();
  updatePreview();
  // Highlight active preset
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.preset === key);
  });
  showToast(`Theme "${preset.label}" applied`);
}

function updateFontLink() {
  // Fonts already loaded via <link> in head; just update preview
}

// ─── Logo Upload ───────────────────────────────────────────────────────────────

function handleLogoUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    state.brand.logoUrl = e.target.result;
    renderCurrentStep();
    updatePreview();
    showToast('Logo uploaded!');
  };
  reader.readAsDataURL(file);
}

function removeLogo() {
  state.brand.logoUrl = null;
  renderCurrentStep();
  updatePreview();
}

// ─── Brand Upload & Color Extraction ──────────────────────────────────────────

function handleBrandUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = e => {
      extractDominantColors(e.target.result, colors => {
        state.brand.extractedColors = colors;
        renderCurrentStep();
        showToast(`Extracted ${colors.length} brand colors — click any to apply!`);
      });
    };
    reader.readAsDataURL(file);
  } else if (file.type === 'text/plain' || /\.(txt|md)$/i.test(file.name)) {
    const reader = new FileReader();
    reader.onload = e => {
      state.brand.guidelinesText = e.target.result.slice(0, 3000);
      renderCurrentStep();
      parseBrandText();
    };
    reader.readAsText(file);
  } else {
    showToast('Please upload an image or a .txt / .md text file');
  }
}

function extractDominantColors(imgDataUrl, callback) {
  const img = new Image();
  img.onload = function () {
    const MAX = 140;
    const scale = Math.min(MAX / img.width, MAX / img.height, 1);
    const canvas = document.createElement('canvas');
    canvas.width  = Math.max(1, Math.floor(img.width  * scale));
    canvas.height = Math.max(1, Math.floor(img.height * scale));
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const map = {};
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
      if (a < 128) continue;
      const qr = Math.round(r / 22) * 22;
      const qg = Math.round(g / 22) * 22;
      const qb = Math.round(b / 22) * 22;
      const avg = (qr + qg + qb) / 3;
      if (avg > 238 || avg < 12) continue;             // skip near-white / near-black
      const mx = Math.max(qr, qg, qb);
      const mn = Math.min(qr, qg, qb);
      if (mx > 0 && (mx - mn) / mx < 0.1) continue;   // skip near-gray
      const key = `${Math.min(255,qr)},${Math.min(255,qg)},${Math.min(255,qb)}`;
      map[key] = (map[key] || 0) + 1;
    }
    const colors = Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([key]) => {
        const [r, g, b] = key.split(',').map(Number);
        return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
      });
    callback(colors);
  };
  img.src = imgDataUrl;
}

function parseBrandText() {
  const text = state.brand.guidelinesText || '';
  if (!text.trim()) { showToast('Paste some brand guidelines text first'); return; }

  // Hex colors
  const hexColors = [...new Set((text.match(/#[0-9A-Fa-f]{6}/g) || []).map(h => h.toLowerCase()))];
  // rgb() colors → hex
  const rgbColors = (text.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/gi) || []).map(rgb => {
    const nums = rgb.match(/\d+/g).map(Number);
    return '#' + nums.slice(0, 3).map(v => Math.min(255,v).toString(16).padStart(2,'0')).join('');
  });
  const allColors = [...new Set([...hexColors, ...rgbColors])].slice(0, 8);

  // Font names
  const FONT_LIST = ['Inter','Roboto','Open Sans','Lato','Source Sans 3','Source Sans Pro',
    'IBM Plex Sans','DM Sans','Nunito Sans','Nunito','Montserrat','Poppins','Raleway',
    'Arial','Helvetica','Georgia','Calibri','DIN','Segoe UI','Noto Sans'];
  const foundFonts = FONT_LIST.filter(f => new RegExp('\\b' + f + '\\b', 'i').test(text));

  if (allColors.length === 0 && foundFonts.length === 0) {
    showToast('No colors or fonts detected. Include hex codes like #1E3A5F or font names like Inter.');
    return;
  }

  if (allColors.length > 0) {
    state.brand.extractedColors = allColors;
  }
  if (foundFonts.length > 0) {
    state.typography.headingFont = foundFonts[0];
    state.typography.bodyFont    = foundFonts.length > 1 ? foundFonts[1] : foundFonts[0];
  }
  renderCurrentStep();
  const msg = [
    allColors.length  ? `${allColors.length} color${allColors.length > 1 ? 's' : ''} found` : '',
    foundFonts.length ? `fonts: ${foundFonts.slice(0,2).join(', ')}` : ''
  ].filter(Boolean).join(' · ');
  showToast(msg || 'Done!');
  updatePreview();
}

function applyExtractedColor(idx, hex) {
  const [r, g, b] = [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  let target;
  if (brightness < 55)       { state.colors.pageBg    = hex; target = 'page background'; }
  else if (brightness < 110) { state.colors.cardBg    = hex; target = 'card background'; }
  else if (brightness > 210) { state.colors.textPrimary= hex; target = 'primary text'; }
  else                       { state.colors.accent1   = hex; state.colors.chart[0] = hex; target = 'primary accent'; }
  updatePreview();
  showToast(`Applied ${hex.toUpperCase()} → ${target}`);
}

function applyAllExtractedColors() {
  const colors = state.brand.extractedColors;
  if (!colors.length) return;
  const withBri = colors.map(hex => {
    const [r, g, b] = [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
    return { hex, bri: (r * 299 + g * 587 + b * 114) / 1000 };
  }).sort((a, b) => a.bri - b.bri);

  if (withBri.length >= 1) state.colors.pageBg   = withBri[0].hex;
  if (withBri.length >= 2) state.colors.cardBg   = withBri[1].hex;
  state.colors.headerBg = withBri[0].hex;
  const bright = withBri[withBri.length - 1];
  if (bright.bri > 185) state.colors.textPrimary = bright.hex;
  const mids = withBri.filter(c => c.bri >= 55 && c.bri <= 195);
  if (mids[0]) { state.colors.accent1 = mids[0].hex; state.colors.chart[0] = mids[0].hex; state.colors.tableHeaderBg = mids[0].hex; state.colors.kpiCardBg = mids[0].hex; }
  if (mids[1]) { state.colors.accent2 = mids[1].hex; state.colors.chart[1] = mids[1].hex; }
  if (mids[2]) state.colors.chart[2] = mids[2].hex;
  if (mids[3]) state.colors.chart[3] = mids[3].hex;

  updatePreview();
  showToast('Brand palette applied! Fine-tune in Step 2.');
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function goToStep(idx) {
  if (idx < 0 || idx >= STEPS.length) return;
  state.currentStep = idx;
  renderSidebar();
  renderCurrentStep();
  updateNavButtons();
  updateProgress();
}

function nextStep() {
  goToStep(state.currentStep + 1);
}

function prevStep() {
  goToStep(state.currentStep - 1);
}

function updateNavButtons() {
  const prev = document.getElementById('btn-prev');
  const next = document.getElementById('btn-next');
  if (!prev || !next) return;
  prev.disabled = state.currentStep === 0;
  const isLast = state.currentStep === STEPS.length - 1;
  next.textContent = isLast ? '✓ Done' : 'Next Step →';
  if (isLast) {
    next.onclick = () => showToast('Your design system is complete! Use the downloads above.');
  } else {
    next.onclick = nextStep;
  }
}

function updateProgress() {
  const pct = Math.round(((state.currentStep + 1) / STEPS.length) * 100);
  const fill  = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  const pctEl = document.getElementById('progress-pct');
  if (fill)  fill.style.width = pct + '%';
  if (label) label.textContent = `Step ${state.currentStep + 1} of ${STEPS.length}`;
  if (pctEl) pctEl.textContent = pct + '%';
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function renderSidebar() {
  const list = document.getElementById('step-list');
  if (!list) return;
  list.innerHTML = STEPS.map((s, i) => {
    const done   = i < state.currentStep;
    const active = i === state.currentStep;
    return `
      <li class="step-item ${active?'active':''} ${done?'done':''}" onclick="goToStep(${i})">
        <div class="step-num">
          <span class="step-num-digit">${i + 1}</span>
          <svg class="check-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <span class="step-item-label">${s.label}</span>
      </li>`;
  }).join('');
}

// ─── Step Rendering ───────────────────────────────────────────────────────────

function renderCurrentStep() {
  const step   = STEPS[state.currentStep];
  const badge  = document.getElementById('step-badge');
  const title  = document.getElementById('step-title');
  const desc   = document.getElementById('step-desc');
  const content = document.getElementById('step-content');

  if (badge)  badge.textContent  = step.badge;
  if (title)  title.textContent  = step.label;
  if (desc)   desc.textContent   = step.desc;

  if (content) {
    const renderers = {
      brand:      renderStepBrand,
      colors:     renderStepColors,
      typography: renderStepTypography,
      layout:     renderStepLayout,
      components: renderStepComponents,
      export:     renderStepExport
    };
    content.innerHTML = renderers[step.id]?.() || '';
  }
}

// ─── Preview ──────────────────────────────────────────────────────────────────

function buildPreview() {
  const preview = document.getElementById('dashboard-preview');
  if (!preview) return;

  const c   = state.colors;
  const t   = state.typography;
  const l   = state.layout;
  const comp = state.components;

  // KPI cards
  const kpiData = [
    { label:'Total Revenue',    value:'$2.48M', change:'+12.3%', type:'pos', colored: true },
    { label:'Active Users',     value:'48,291', change:'+5.7%',  type:'pos', colored: false },
    { label:'Avg. Response Time',value:'1.4s',  change:'-8.2%',  type:'neg', colored: false },
    { label:'Goal Completion',  value:'87.3%',  change:'+2.1%',  type:'pos', colored: false }
  ];

  const kpiHtml = kpiData.map((k, i) => {
    const isColored = l.kpiStyle === 'colored' && i === 0;
    const isDark    = l.kpiStyle === 'dark';
    const hasBar    = comp.kpiAccentBar && !isColored;
    return `
      <div class="kpi-card ${isColored?'colored':''} ${isDark?'dark-kpi':''}">
        ${hasBar ? '<div class="kpi-accent-bar"></div>' : ''}
        <div class="kpi-label">${k.label}</div>
        <div class="kpi-value">${k.value}</div>
        <div class="kpi-change ${k.type==='pos'?'pos':k.type==='neg'?'neg':'neu'}">
          ${k.type==='pos'?'▲':k.type==='neg'?'▼':'—'} ${k.change}
        </div>
      </div>`;
  }).join('');

  // Bar chart SVG
  const barData = [65, 82, 55, 91, 70, 88, 74];
  const months  = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan'];
  const barW    = 30;
  const barGap  = 8;
  const svgW    = barData.length * (barW + barGap) - barGap + 20;
  const svgH    = 120;
  const maxH    = 90;
  const rx      = comp.chartBarStyle === 'rounded' ? 4 : 0;
  const gridLines = comp.showGridLines
    ? [0.25,0.5,0.75,1].map(f => {
        const y = svgH - (f * maxH) - 4;
        return `<line x1="0" y1="${y}" x2="${svgW}" y2="${y}" stroke="${hexToRgba(c.textSecondary,0.12)}" stroke-width="1"/>`;
      }).join('')
    : '';

  const bars = barData.map((v, i) => {
    const h    = (v / 100) * maxH;
    const x    = i * (barW + barGap) + 10;
    const y    = svgH - h - 4;
    const col  = i % 2 === 0 ? c.chart[0] : c.chart[1];
    return `
      <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="${rx}" fill="${col}" fill-opacity="0.9"/>
      <text x="${x + barW/2}" y="${svgH + 12}" text-anchor="middle" font-size="8" fill="${c.textSecondary}">${months[i]}</text>`;
  }).join('');

  const barChartSvg = `
    <svg class="chart-svg" viewBox="0 0 ${svgW} ${svgH+18}" xmlns="http://www.w3.org/2000/svg">
      ${gridLines}
      ${bars}
    </svg>`;

  // Donut chart SVG
  const donutData  = [42, 28, 18, 12];
  const donutTotal = donutData.reduce((a, b) => a + b, 0);
  const r = 44, cx2 = 60, cy2 = 60, sw = 16;
  let dashOffset = -90;
  const circumference = 2 * Math.PI * r;

  const donutSlices = donutData.map((v, i) => {
    const pct   = v / donutTotal;
    const dash  = pct * circumference;
    const gap   = circumference - dash;
    const rot   = dashOffset;
    dashOffset += pct * 360;
    return `<circle cx="${cx2}" cy="${cy2}" r="${r}" fill="none"
      stroke="${c.chart[i] || c.chart[i % c.chart.length]}" stroke-width="${sw}"
      stroke-dasharray="${dash.toFixed(1)} ${gap.toFixed(1)}"
      transform="rotate(${rot} ${cx2} ${cy2})"/>`;
  }).join('');

  const donutLabels = ['Category A','Category B','Category C','Category D'];
  const donutLegend = donutData.map((v, i) => `
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;font-family:var(--p-body-font);font-size:9px;color:var(--p-text-secondary)">
      <span style="width:8px;height:8px;border-radius:50%;background:${c.chart[i]};flex-shrink:0"></span>
      <span>${donutLabels[i]}</span>
      <span style="margin-left:auto;font-weight:700;color:var(--p-text-primary)">${v}%</span>
    </div>`).join('');

  const donutChartHtml = `
    <div style="display:flex;flex-direction:column;height:100%">
      <svg viewBox="0 0 120 120" style="width:110px;height:110px;margin:0 auto 8px">
        ${donutSlices}
        <text x="${cx2}" y="${cy2+4}" text-anchor="middle" font-size="14" font-weight="700"
          fill="${c.textPrimary}" font-family="${t.headingFont},sans-serif">88%</text>
      </svg>
      <div style="flex:1">${donutLegend}</div>
    </div>`;

  // Line chart SVG
  const lineData = [45, 60, 38, 72, 55, 80, 68, 90, 75, 95, 82, 100];
  const lineW = 380, lineH = 100;
  const linePoints = lineData.map((v, i) => {
    const x = (i / (lineData.length - 1)) * (lineW - 20) + 10;
    const y = lineH - (v / 100) * (lineH - 10) - 5;
    return `${x},${y}`;
  }).join(' ');

  const areaPath = `M ${linePoints.split(' ')[0]} L ${linePoints} L ${(lineData.length - 1) / (lineData.length - 1) * (lineW - 20) + 10},${lineH} L 10,${lineH} Z`;

  const lineGridLines = comp.showGridLines
    ? [0.25,0.5,0.75].map(f => {
        const y = lineH - f * (lineH - 10) - 5;
        return `<line x1="0" y1="${y}" x2="${lineW}" y2="${y}" stroke="${hexToRgba(c.textSecondary,0.1)}" stroke-width="1"/>`;
      }).join('')
    : '';

  const lineChartSvg = `
    <svg class="chart-svg" viewBox="0 0 ${lineW} ${lineH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="${c.chart[0]}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${c.chart[0]}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${lineGridLines}
      <path d="${areaPath}" fill="url(#lineGrad)"/>
      <polyline points="${linePoints}" fill="none" stroke="${c.chart[0]}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>`;

  // Table
  const tableRows = [
    { region:'North America', revenue:'$842K', growth:'+18%', status:'pos', users:'12,430' },
    { region:'Europe',        revenue:'$621K', growth:'+9%',  status:'pos', users:'9,820'  },
    { region:'Asia Pacific',  revenue:'$438K', growth:'-3%',  status:'neg', users:'7,210'  },
    { region:'Latin America', revenue:'$289K', growth:'+5%',  status:'pos', users:'4,150'  }
  ];

  const tableHtml = `
    <table class="dash-table">
      <thead>
        <tr>
          <th>Region</th>
          <th>Revenue</th>
          <th>YoY Growth</th>
          <th>Status</th>
          <th>Active Users</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows.map((r, i) => `
          <tr ${l.tableStyle==='striped' && i%2===1 ? 'class="striped"' : ''}>
            <td style="font-weight:600">${r.region}</td>
            <td>${r.revenue}</td>
            <td style="color:${r.status==='pos'?c.statusPos:c.statusNeg};font-weight:600">${r.growth}</td>
            <td><span class="badge badge-${r.status}">${r.status==='pos'?'On Track':'At Risk'}</span></td>
            <td>${r.users}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;

  // Spacing map
  const spacingMap = { compact:'10px 16px', normal:'16px 24px', spacious:'22px 32px' };
  const bodyPad = spacingMap[l.spacing] || '16px 24px';

  preview.innerHTML = `
    <div class="dash-header">
      <div class="dash-header-left">
        ${state.brand.logoUrl
          ? `<img src="${state.brand.logoUrl}" alt="logo" style="height:34px;width:auto;max-width:80px;object-fit:contain;border-radius:4px">`
          : `<div class="dash-logo-box">${state.brand.initial || state.brand.name.charAt(0).toUpperCase()}</div>`}
        <div>
          <div class="dash-brand-name">${state.brand.name}</div>
          <div class="dash-brand-tag">${state.brand.tagline}</div>
        </div>
      </div>
      <div class="dash-header-right">
        <div class="dash-header-date">Updated Mar 2026 · Q1 Report</div>
        <div class="dash-avatar">${state.brand.initial || state.brand.name.charAt(0).toUpperCase()}</div>
      </div>
    </div>

    <div class="dash-nav">
      <div class="dash-tab active">Overview</div>
      <div class="dash-tab">Sales</div>
      <div class="dash-tab">Operations</div>
      <div class="dash-tab">Finance</div>
    </div>

    <div class="dash-body" style="padding:${bodyPad};gap:${l.spacing==='compact'?'10px':l.spacing==='spacious'?'18px':'14px'}">
      <div class="kpi-row">${kpiHtml}</div>

      <div class="charts-row">
        <div class="chart-card wide">
          <div class="card-title">Revenue by Month</div>
          <div class="card-subtitle">vs. Previous Year</div>
          ${barChartSvg}
        </div>
        <div class="chart-card" style="flex:1.6">
          <div class="card-title">Trend — Last 12 months</div>
          ${lineChartSvg}
        </div>
        <div class="chart-card" style="flex:1.2;min-width:160px">
          <div class="card-title">Revenue Mix</div>
          ${donutChartHtml}
        </div>
      </div>

      <div class="table-card">
        <div class="card-title">Performance by Region</div>
        ${tableHtml}
      </div>
    </div>

    <div class="dash-footer">
      <span>${state.brand.name} · Confidential</span>
      <span>${state.brand.tagline} · © 2026</span>
    </div>`;
}

function updatePreview() {
  const preview = document.getElementById('dashboard-preview');
  if (!preview) return;

  const c   = state.colors;
  const t   = state.typography;
  const l   = state.layout;

  // CSS custom props on preview root
  const vars = {
    '--p-page-bg':          c.pageBg,
    '--p-card-bg':          c.cardBg,
    '--p-header-bg':        c.headerBg,
    '--p-nav-bg':           c.navBg,
    '--p-text-primary':     c.textPrimary,
    '--p-text-secondary':   c.textSecondary,
    '--p-accent-1':         c.accent1,
    '--p-accent-2':         c.accent2,
    '--p-chart-0':          c.chart[0],
    '--p-chart-1':          c.chart[1],
    '--p-chart-2':          c.chart[2],
    '--p-chart-3':          c.chart[3],
    '--p-chart-4':          c.chart[4],
    '--p-chart-5':          c.chart[5],
    '--p-status-pos':       c.statusPos,
    '--p-status-warn':      c.statusWarn,
    '--p-status-neg':       c.statusNeg,
    '--p-table-header-bg':  c.tableHeaderBg,
    '--p-table-header-text':c.tableHeaderText,
    '--p-kpi-bg':           l.kpiStyle === 'colored' ? c.kpiCardBg : c.cardBg,
    '--p-card-radius':      l.cardRadius + 'px',
    '--p-card-shadow':      l.cardShadow ? '0 4px 16px rgba(0,0,0,0.35)' : 'none',
    '--p-card-border-color':l.cardBorder ? hexToRgba(c.textSecondary, 0.15) : 'transparent',
    '--p-table-stripe':     hexToRgba(c.textSecondary, 0.05),
    '--p-table-row-border': hexToRgba(c.textSecondary, 0.08),
    '--p-heading-font':     `'${t.headingFont}', sans-serif`,
    '--p-body-font':        `'${t.bodyFont}', sans-serif`
  };

  for (const [prop, val] of Object.entries(vars)) {
    preview.style.setProperty(prop, val);
  }

  // KPI value size
  preview.querySelectorAll('.kpi-value').forEach(el => {
    el.style.fontSize = t.kpiValueSize + 'px';
    el.style.fontFamily = `'${t.headingFont}', sans-serif`;
  });
  preview.querySelectorAll('.kpi-label').forEach(el => {
    el.style.fontSize = t.labelSize + 'px';
    el.style.fontFamily = `'${t.bodyFont}', sans-serif`;
  });
  preview.querySelectorAll('.card-title').forEach(el => {
    el.style.fontSize = t.cardTitleSize + 'px';
    el.style.fontFamily = `'${t.headingFont}', sans-serif`;
  });
  preview.querySelectorAll('.dash-brand-name').forEach(el => {
    el.style.fontSize = Math.min(t.titleSize * 0.7, 18) + 'px';
  });

  // Rebuild if structural changes needed
  buildPreview();
  updatePreviewScale();
}

// ─── Preview Scaling ──────────────────────────────────────────────────────────

let manualScale = null;

function updatePreviewScale() {
  const viewport = document.getElementById('preview-viewport');
  const scaler   = document.getElementById('preview-scaler');
  if (!viewport || !scaler) return;

  const containerW = viewport.clientWidth  - 32;
  const containerH = viewport.clientHeight - 32;
  const previewW   = 1200;
  const previewH   = 800;

  const scale = manualScale !== null
    ? manualScale
    : Math.min(containerW / previewW, containerH / previewH, 1);

  scaler.style.transform       = `scale(${scale})`;
  scaler.style.transformOrigin = 'top left';
  scaler.style.width           = previewW + 'px';
  scaler.style.height          = previewH + 'px';

  // shrink the scaler container so scrollbars appear at correct time
  const scaledW = previewW * scale;
  const scaledH = previewH * scale;
  scaler.parentElement.style.width  = scaledW + 'px';
  scaler.parentElement.style.height = scaledH + 'px';

  document.getElementById('preview-scale-lbl').textContent = Math.round(scale * 100) + '%';
}

function adjustPreviewScale(delta) {
  const scaler   = document.getElementById('preview-scaler');
  const viewport = document.getElementById('preview-viewport');
  if (!scaler || !viewport) return;

  const containerW = viewport.clientWidth  - 32;
  const previewW   = 1200;
  const auto = Math.min(containerW / previewW, 1);

  if (manualScale === null) manualScale = auto;
  manualScale = Math.max(0.2, Math.min(1.2, manualScale + delta));
  updatePreviewScale();
}

// ─── Export Functions ─────────────────────────────────────────────────────────

// PDF — generated programmatically with jsPDF
async function exportPDF() {
  if (typeof window.jspdf === 'undefined') {
    showToast('PDF library loading, please try again shortly.'); return;
  }
  showToast('Generating PDF…');

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const W = 297, H = 210;
  const c = state.colors;
  const t = state.typography;
  const l = state.layout;
  const brandName = state.brand.name;
  const hexToRgbArr = hex => {
    if (!hex || hex.length < 7) return [128,128,128];
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return [isNaN(r)?128:r, isNaN(g)?128:g, isNaN(b)?128:b];
  };
  // Blend fg hex over bg hex at alpha (0-1), returns hex string
  const blendHex = (fg, bg, alpha) => {
    const [fr,fg2,fb] = hexToRgbArr(fg);
    const [br,bg2,bb] = hexToRgbArr(bg);
    const r = Math.round(fr * alpha + br * (1-alpha));
    const g = Math.round(fg2 * alpha + bg2 * (1-alpha));
    const b = Math.round(fb * alpha + bb * (1-alpha));
    return '#' + [r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
  };
  const setFill = hex => { const [r,g,b] = hexToRgbArr(hex); doc.setFillColor(r,g,b); };
  const setDraw = hex => { const [r,g,b] = hexToRgbArr(hex); doc.setDrawColor(r,g,b); };
  const setTextCol = hex => { const [r,g,b] = hexToRgbArr(hex); doc.setTextColor(r,g,b); };

  // ── Page 1: Cover ──────────────────────────────────────────
  setFill(c.headerBg); doc.rect(0,0,W,H,'F');
  setFill(c.accent1);  doc.rect(0, H-8, W, 8, 'F');

  // Brand initial circle
  setFill(c.accent1); doc.circle(40, H/2, 22, 'F');
  setTextCol('#ffffff');
  doc.setFontSize(28); doc.setFont('helvetica','bold');
  doc.text(state.brand.initial || brandName.charAt(0).toUpperCase(), 40, H/2 + 5, {align:'center'});

  // Brand name
  setTextCol(c.textPrimary);
  doc.setFontSize(36); doc.setFont('helvetica','bold');
  doc.text(brandName, 75, H/2 - 10);

  setTextCol(c.textSecondary);
  doc.setFontSize(14); doc.setFont('helvetica','normal');
  doc.text(state.brand.tagline, 75, H/2 + 4);
  doc.text('Dashboard Design System & Brand Guidelines', 75, H/2 + 14);

  setTextCol(c.textSecondary);
  doc.setFontSize(9);
  doc.text('Generated ' + new Date().toLocaleDateString('en-GB', {year:'numeric',month:'long',day:'numeric'}), W-20, H-14, {align:'right'});
  doc.text('CONFIDENTIAL', W-20, H-8, {align:'right'});

  // ── Page 2: Color Palette ──────────────────────────────────
  doc.addPage();
  setFill(c.pageBg); doc.rect(0,0,W,H,'F');
  setFill(c.accent1); doc.rect(0,0,W,2,'F');

  setTextCol(c.textSecondary);
  doc.setFontSize(9); doc.setFont('helvetica','normal');
  doc.text(brandName + ' · Design System', 16, 14);
  setTextCol(c.textPrimary);
  doc.setFontSize(22); doc.setFont('helvetica','bold');
  doc.text('Color Palette', 16, 28);

  const colorGroups = [
    { title:'Structure', items:[
      {label:'Page Background',  hex: c.pageBg},
      {label:'Card Background',  hex: c.cardBg},
      {label:'Header',           hex: c.headerBg},
      {label:'Navigation',       hex: c.navBg}
    ]},
    { title:'Text', items:[
      {label:'Primary Text',     hex: c.textPrimary},
      {label:'Secondary Text',   hex: c.textSecondary}
    ]},
    { title:'Accent', items:[
      {label:'Primary Accent',   hex: c.accent1},
      {label:'Secondary Accent', hex: c.accent2}
    ]},
    { title:'Status', items:[
      {label:'Positive',         hex: c.statusPos},
      {label:'Warning',          hex: c.statusWarn},
      {label:'Negative',         hex: c.statusNeg}
    ]}
  ];

  let gx = 16, gy = 40;
  colorGroups.forEach(group => {
    setTextCol(c.textSecondary);
    doc.setFontSize(8); doc.setFont('helvetica','bold');
    doc.text(group.title.toUpperCase(), gx, gy + 5);
    gy += 12;

    group.items.forEach(item => {
      setFill(item.hex); doc.roundedRect(gx, gy, 40, 24, 3, 3, 'F');
      setDraw(blendHex(c.textSecondary, c.pageBg, 0.2));
      doc.setLineWidth(0.3);
      doc.roundedRect(gx, gy, 40, 24, 3, 3, 'S');

      setTextCol(c.textPrimary);
      doc.setFontSize(8); doc.setFont('helvetica','bold');
      doc.text(item.label, gx + 44, gy + 10);
      setTextCol(c.textSecondary);
      doc.setFontSize(7); doc.setFont('helvetica','normal');
      doc.text(item.hex.toUpperCase(), gx + 44, gy + 18);

      gy += 30;
    });
    gy += 8;
    if (gy > 160) { gy = 40; gx += 120; }
  });

  // Chart palette
  let px = 16, py = H - 55;
  setTextCol(c.textSecondary);
  doc.setFontSize(8); doc.setFont('helvetica','bold');
  doc.text('DATA VISUALIZATION PALETTE', px, py);
  py += 8;

  c.chart.forEach((col, i) => {
    setFill(col); doc.roundedRect(px + i * 36, py, 30, 20, 3, 3, 'F');
    setTextCol(c.textSecondary);
    doc.setFontSize(6.5);
    doc.text(col.toUpperCase(), px + i * 36, py + 26, {maxWidth: 30});
  });

  // ── Page 3: Typography ─────────────────────────────────────
  doc.addPage();
  setFill(c.pageBg); doc.rect(0,0,W,H,'F');
  setFill(c.accent1); doc.rect(0,0,W,2,'F');

  setTextCol(c.textSecondary);
  doc.setFontSize(9); doc.setFont('helvetica','normal');
  doc.text(brandName + ' · Design System', 16, 14);
  setTextCol(c.textPrimary);
  doc.setFontSize(22); doc.setFont('helvetica','bold');
  doc.text('Typography', 16, 28);

  const typoItems = [
    {label:'Heading / KPI Font', font: t.headingFont, example:'Dashboard Headline', size: 20, weight:'bold'},
    {label:'Body / Label Font',  font: t.bodyFont,    example:'Body text and labels', size: 12, weight:'normal'},
    {label:'Dashboard Title',    font: t.headingFont, example: brandName, size: t.titleSize * 0.75, weight:'bold'},
    {label:'Card Title',         font: t.headingFont, example:'SECTION HEADER', size: t.cardTitleSize * 0.75, weight:'bold'},
    {label:'KPI Value',          font: t.headingFont, example:'$2,483,920', size: Math.min(t.kpiValueSize * 0.75, 32), weight:'bold'},
    {label:'Body Text',          font: t.bodyFont,    example:'Data refreshed daily at 06:00 UTC', size: t.bodySize * 0.75, weight:'normal'},
    {label:'Label / Caption',    font: t.bodyFont,    example:'TOTAL REVENUE · YTD', size: t.labelSize * 0.75, weight:'normal'}
  ];

  let ty = 42;
  typoItems.forEach(item => {
    setTextCol(c.textSecondary);
    doc.setFontSize(7); doc.setFont('helvetica','normal');
    doc.text(item.label.toUpperCase() + '  ·  ' + item.font + '  ·  ' + (item.size/0.75).toFixed(0) + 'px', 16, ty);

    setTextCol(c.textPrimary);
    doc.setFontSize(item.size); doc.setFont('helvetica', item.weight);
    doc.text(item.example, 16, ty + item.size * 0.5 + 2);

    ty += item.size * 0.8 + 14;
  });

  // ── Page 4: Layout & Components ───────────────────────────
  doc.addPage();
  setFill(c.pageBg); doc.rect(0,0,W,H,'F');
  setFill(c.accent1); doc.rect(0,0,W,2,'F');

  setTextCol(c.textSecondary);
  doc.setFontSize(9); doc.setFont('helvetica','normal');
  doc.text(brandName + ' · Design System', 16, 14);
  setTextCol(c.textPrimary);
  doc.setFontSize(22); doc.setFont('helvetica','bold');
  doc.text('Layout & Components', 16, 28);

  const specs = [
    ['Card Corner Radius',   l.cardRadius + 'px'],
    ['Drop Shadow',          l.cardShadow ? 'Enabled — rgba(0,0,0,0.35) blur 16px' : 'Disabled'],
    ['Card Border',          l.cardBorder ? 'Enabled — 1px solid' : 'Disabled'],
    ['Dashboard Spacing',    l.spacing.charAt(0).toUpperCase() + l.spacing.slice(1)],
    ['KPI Card Style',       l.kpiStyle.charAt(0).toUpperCase() + l.kpiStyle.slice(1)],
    ['Table Style',          l.tableStyle.charAt(0).toUpperCase() + l.tableStyle.slice(1)],
    ['Chart Bar Style',      state.components.chartBarStyle],
    ['Grid Lines',           state.components.showGridLines ? 'Shown' : 'Hidden'],
    ['KPI Accent Bar',       state.components.kpiAccentBar ? 'Shown' : 'Hidden']
  ];

  let sy = 42;
  specs.forEach(([label, val]) => {
    setFill(c.cardBg); doc.roundedRect(16, sy, 265, 16, 2, 2, 'F');
    setTextCol(c.textSecondary);
    doc.setFontSize(8); doc.setFont('helvetica','normal');
    doc.text(label, 22, sy + 10);
    setTextCol(c.textPrimary);
    doc.setFont('helvetica','bold');
    doc.text(val, 165, sy + 10);
    sy += 20;
  });

  // KPI card mockup
  const kpiX = 300, kpiY = 42;
  [c.accent1, c.accent2, c.cardBg].forEach((bg, i) => {
    const kx = kpiX + i * 68;
    setFill(bg); doc.roundedRect(kx, kpiY, 60, 44, l.cardRadius * 0.4, l.cardRadius * 0.4, 'F');
    if (l.cardShadow) {
      setDraw(blendHex('#000000', c.cardBg, 0.4));
      doc.setLineWidth(0.5);
      doc.roundedRect(kx, kpiY, 60, 44, l.cardRadius * 0.4, l.cardRadius * 0.4, 'S');
    }
    const txtCol = i < 2 ? '#ffffff' : c.textPrimary;
    setTextCol(txtCol);
    doc.setFontSize(7); doc.setFont('helvetica','normal');
    doc.text('METRIC LABEL', kx + 30, kpiY + 12, {align:'center'});
    doc.setFontSize(16); doc.setFont('helvetica','bold');
    doc.text(i === 0 ? '$2.4M' : i === 1 ? '48.3K' : '87.3%', kx + 30, kpiY + 28, {align:'center'});
    setTextCol(c.statusPos);
    doc.setFontSize(7); doc.setFont('helvetica','normal');
    doc.text('▲ 12.3%', kx + 30, kpiY + 38, {align:'center'});
  });

  // ── Page 5: Do's and Don'ts ────────────────────────────────
  doc.addPage();
  setFill(c.pageBg); doc.rect(0,0,W,H,'F');
  setFill(c.accent1); doc.rect(0,0,W,2,'F');

  setTextCol(c.textSecondary);
  doc.setFontSize(9); doc.setFont('helvetica','normal');
  doc.text(brandName + ' · Design System', 16, 14);
  setTextCol(c.textPrimary);
  doc.setFontSize(22); doc.setFont('helvetica','bold');
  doc.text("Do's & Don'ts", 16, 28);

  const dos  = ['Use the primary accent color for key metrics and CTAs','Keep font sizes within the defined scale','Maintain consistent card radius throughout all visuals','Use status colors only for their defined meaning','Keep chart series within the 6-color palette','Use sufficient contrast for text on colored backgrounds'];
  const donts = ["Mix font families beyond heading + body","Use more than 6 chart colors in a single visual","Override status colors for decorative purposes","Use gradients in data bars unless brand-approved","Omit padding within cards—minimum 14px","Scale KPI values beyond the defined max size"];

  let dy = 40;
  setFill(blendHex(c.statusPos, c.pageBg, 0.12)); doc.roundedRect(16, dy, 130, 145, 4, 4, 'F');
  setTextCol(c.statusPos);
  doc.setFontSize(11); doc.setFont('helvetica','bold');
  doc.text('✓  DO', 24, dy + 14);

  setTextCol(c.textPrimary);
  doc.setFontSize(8.5); doc.setFont('helvetica','normal');
  dos.forEach((item, i) => {
    doc.text('• ' + item, 24, dy + 28 + i * 18, {maxWidth: 110});
  });

  setFill(blendHex(c.statusNeg, c.pageBg, 0.12)); doc.roundedRect(158, dy, 130, 145, 4, 4, 'F');
  setTextCol(c.statusNeg);
  doc.setFontSize(11); doc.setFont('helvetica','bold');
  doc.text('\u2715  DON\u2019T', 166, dy + 14);

  setTextCol(c.textPrimary);
  doc.setFontSize(8.5); doc.setFont('helvetica','normal');
  donts.forEach((item, i) => {
    doc.text('• ' + item, 166, dy + 28 + i * 18, {maxWidth: 110});
  });

  // footer on all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    setFill(c.headerBg); doc.rect(0, H-10, W, 10, 'F');
    setTextCol(c.textSecondary);
    doc.setFontSize(7); doc.setFont('helvetica','normal');
    doc.text(brandName + ' · Dashboard Design System · Confidential', W/2, H-3, {align:'center'});
    doc.text(p + ' / ' + totalPages, W-10, H-3, {align:'right'});
  }

  doc.save(brandName.replace(/\s+/g,'-').toLowerCase() + '-design-system.pdf');
  showToast('PDF downloaded!');
}

// Power BI Theme JSON
function exportPowerBIJson() {
  const c  = state.colors;
  const t  = state.typography;
  const name = state.brand.name;

  const theme = {
    name: name + ' Dashboard Theme',
    dataColors: state.colors.chart,
    good:        c.statusPos,
    neutral:     c.textSecondary,
    bad:         c.statusNeg,
    maximum:     c.statusPos,
    center:      c.statusWarn,
    minimum:     c.statusNeg,
    null:        c.textSecondary,
    background:  c.pageBg,
    foreground:  c.textPrimary,
    foregroundNeutralSecondary: c.textSecondary,
    backgroundLight:   lightenHex(c.cardBg, 10),
    backgroundNeutral: c.navBg,
    hyperlink:   c.accent1,
    tableAccent: c.accent1,
    total:       'bold',
    visualStyles: {
      '*': {
        '*': {
          background: [{ color: { solid: { color: c.cardBg } } }],
          border: [{ show: state.layout.cardBorder }],
          dropShadow: [{ show: state.layout.cardShadow }]
        },
        title: [{ fontColor: { solid: { color: c.textPrimary } }, fontSize: [t.cardTitleSize], fontFamily: t.headingFont }]
      },
      card: {
        '*': {
          background: [{ color: { solid: { color: c.kpiCardBg } } }]
        }
      }
    },
    textClasses: {
      callout: { fontSize: t.kpiValueSize, fontFace: t.headingFont, color: c.textPrimary },
      title:   { fontSize: t.titleSize,    fontFace: t.headingFont, color: c.textPrimary },
      header:  { fontSize: t.cardTitleSize,fontFace: t.headingFont, color: c.textPrimary },
      label:   { fontSize: t.labelSize,    fontFace: t.bodyFont,    color: c.textSecondary }
    }
  };

  downloadBlob(
    JSON.stringify(theme, null, 2),
    'application/json',
    state.brand.name.replace(/\s+/g,'-').toLowerCase() + '-powerbi-theme.json'
  );
  showToast('Power BI theme JSON downloaded!');
}

// ─── Markdown Export (UX Compliance) ─────────────────────────────────────────

function exportMarkdown() {
  const c     = state.colors;
  const t     = state.typography;
  const l     = state.layout;
  const comp  = state.components;
  const brand = state.brand;
  const today = new Date().toISOString().split('T')[0];

  const sp = { compact:'10px 12px', normal:'14px 16px', spacious:'20px 24px' };
  const gp = { compact:'8px', normal:'12px', spacious:'18px' };
  const pad = sp[l.spacing] || '14px 16px';
  const gap = gp[l.spacing] || '12px';
  const chartPalette = c.chart.map(h => '`' + h.toUpperCase() + '`').join('  ');

  const md =
`---
brand: ${brand.name}
tagline: ${brand.tagline}
generated: ${today}
version: 1.0
tool: Dashboard Design System Builder
---

# ${brand.name} — Dashboard Design Guidelines

> These guidelines define the visual standards for all **${brand.tagline}** dashboards.
> Use this document with the **UX Compliance Checker** to validate dashboard outputs.

---

## 1. Color System

### Background & Structure

| Token | Hex | Usage |
|-------|-----|-------|
| \`page-background\` | \`${c.pageBg.toUpperCase()}\` | Main page / canvas background |
| \`card-background\` | \`${c.cardBg.toUpperCase()}\` | Cards, panels, visual containers |
| \`header-background\` | \`${c.headerBg.toUpperCase()}\` | Top header bar |
| \`nav-background\` | \`${c.navBg.toUpperCase()}\` | Navigation / tab bar |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| \`text-primary\` | \`${c.textPrimary.toUpperCase()}\` | Main body and heading text |
| \`text-secondary\` | \`${c.textSecondary.toUpperCase()}\` | Labels, captions, secondary info |

### Brand Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| \`accent-primary\` | \`${c.accent1.toUpperCase()}\` | Key CTAs, active states, highlights, table headers |
| \`accent-secondary\` | \`${c.accent2.toUpperCase()}\` | Secondary highlights, chart series 2 |

### Status & Alert Colors

| Token | Hex | Meaning |
|-------|-----|---------|
| \`status-positive\` | \`${c.statusPos.toUpperCase()}\` | Favourable KPI change, on-track indicator |
| \`status-warning\` | \`${c.statusWarn.toUpperCase()}\` | At-risk, requires attention |
| \`status-negative\` | \`${c.statusNeg.toUpperCase()}\` | Unfavourable change, critical alert |

### Table Colors

| Token | Hex | Usage |
|-------|-----|-------|
| \`table-header-bg\` | \`${c.tableHeaderBg.toUpperCase()}\` | Table / column header background |
| \`table-header-text\` | \`${c.tableHeaderText.toUpperCase()}\` | Table / column header text |

### Data Visualization Palette (use strictly in this order)

${chartPalette}

> **Rule:** Always use chart colors in the defined order. Do not skip or reorder colors.
> **Rule:** Never use more than **6 series** in a single chart visual.

### Color Rules

- MUST NOT introduce colors outside the defined palette
- Status colors MUST be used exclusively for their defined meaning — never for decoration
- Background colors MUST maintain a minimum WCAG AA contrast ratio (4.5:1) against text placed on them
- Chart palette MUST be used in sequence — do not cherry-pick colors

---

## 2. Typography

### Font Families

| Role | Font | Fallback |
|------|------|----------|
| Heading / KPI Values / Titles | \`${t.headingFont}\` | system-ui, sans-serif |
| Body / Labels / Table text | \`${t.bodyFont}\` | system-ui, sans-serif |

### Size Scale

| Element | Size | Weight | Font Role | Text Transform |
|---------|------|--------|-----------|----------------|
| Dashboard Title | \`${t.titleSize}px\` | \`700\` | Heading | — |
| Card / Section Title | \`${t.cardTitleSize}px\` | \`700\` | Heading | uppercase |
| KPI Value | \`${t.kpiValueSize}px\` | \`800\` | Heading | — |
| Body Text | \`${t.bodySize}px\` | \`400\` | Body | — |
| Label / Caption | \`${t.labelSize}px\` | \`500\` | Body | uppercase |

### Typography Rules

- MUST use \`${t.headingFont}\` for all KPI values, dashboard titles and card titles
- MUST use \`${t.bodyFont}\` for table cell text, tooltips, labels and captions
- MUST NOT use font sizes outside the defined scale above
- Section headers and KPI labels MUST be uppercase (\`text-transform: uppercase\`)
- Minimum readable text size: \`${t.labelSize}px\`
- All text MUST meet **WCAG AA contrast ratio** (4.5:1 minimum) against its background

---

## 3. Layout & Spacing

### Card Properties

| Property | Value | Rule |
|----------|-------|------|
| Corner radius | \`${l.cardRadius}px\` | Apply uniformly to ALL card and panel components |
| Drop shadow | \`${l.cardShadow ? `0 4px 16px rgba(0,0,0,0.35)` : 'none'}\` | ${l.cardShadow ? 'Required on all floating cards' : 'Flat design — no shadow'} |
| Card border | \`${l.cardBorder ? '1px solid — text-secondary at 15% opacity' : 'none'}\` | ${l.cardBorder ? 'Required subtle border on all cards' : 'No card borders'} |
| Internal padding | \`${pad}\` | Minimum — never reduce below \`10px\` on any side |
| Gap between cards | \`${gap}\` | Consistent across all card grids and rows |
| Dashboard body padding | \`${l.spacing === 'compact' ? '10px 16px' : l.spacing === 'spacious' ? '22px 32px' : '16px 24px'}\` | Outer padding of main content area |

### Layout Structure (Required)

Every dashboard MUST include these sections in this order:
1. **Header bar** — brand logo, dashboard name, date/context, user avatar
2. **Navigation tabs** — section-level navigation
3. **Content area** — KPI row first, then charts, then tables
4. **Footer** — brand name, report info, confidential label

### Layout Rules

- MUST apply \`${l.cardRadius}px\` corner radius to ALL card components — no mixing
- MUST maintain minimum \`${gap}\` gap between all adjacent cards
- DO NOT mix different padding values within the same dashboard section
- KPI row MUST be the first content element after navigation tabs
- MUST NOT render content outside defined card boundaries

---

## 4. KPI Cards

### Style: **${l.kpiStyle.charAt(0).toUpperCase() + l.kpiStyle.slice(1)}**

${l.kpiStyle === 'colored'
? `- First / primary KPI card uses \`accent-primary\` (\`${c.accent1.toUpperCase()}\`) as background color
- Remaining KPI cards use standard \`card-background\` (\`${c.cardBg.toUpperCase()}\`)
- Text on colored card MUST be white (\`#FFFFFF\`) to ensure contrast`
: l.kpiStyle === 'dark'
? `- ALL KPI cards use \`card-background\` (\`${c.cardBg.toUpperCase()}\`)
- No colored card backgrounds permitted in this style`
: `- All KPI cards use \`card-background\` — accent expressed only via the left border bar
- No filled colored backgrounds`}

### Required KPI Card Elements

Every KPI card **MUST** contain all three of the following elements:

1. **Label** — uppercase, \`text-secondary\` color, \`${t.labelSize}px\`, body font (\`${t.bodyFont}\`)
2. **Value** — \`${t.kpiValueSize}px\`, weight \`800\`, heading font (\`${t.headingFont}\`), \`text-primary\` color
3. **Change Indicator** — directional symbol + percentage, correct status color

### Change Indicator Rules

| Scenario | Symbol | Color Token | Hex |
|----------|--------|-------------|-----|
| Positive change | \`▲\` | \`status-positive\` | \`${c.statusPos.toUpperCase()}\` |
| Negative change | \`▼\` | \`status-negative\` | \`${c.statusNeg.toUpperCase()}\` |
| No change / neutral | \`—\` | \`text-secondary\` | \`${c.textSecondary.toUpperCase()}\` |

${comp.kpiAccentBar ? `### KPI Accent Bar

- Required on all **non-colored** KPI cards
- Position: left edge, full card height
- Size: \`3px\` wide
- Color: \`accent-primary\` (\`${c.accent1.toUpperCase()}\`)` : ''}

### KPI Rules

- MUST NOT omit change indicators — every KPI card must show trend direction
- MUST NOT use custom colors outside the status palette for change indicators
- KPI values MUST be the visually largest element within the card
- MUST NOT display more than **5 KPI cards** in a single row

---

## 5. Tables

### Style: **${l.tableStyle.charAt(0).toUpperCase() + l.tableStyle.slice(1)}**

| Property | Value |
|----------|-------|
| Header background | \`${c.tableHeaderBg.toUpperCase()}\` |
| Header text color | \`${c.tableHeaderText.toUpperCase()}\` |
| Header font weight | \`700\` (bold) |
| Header text transform | \`uppercase\` |
| Header font size | \`${t.labelSize}px\` |
| Header letter-spacing | \`0.08em\` |
${l.tableStyle === 'striped' ? `| Alternating row stripe | \`text-secondary\` at 5% opacity |\n` : ''}| Row border | \`1px solid\` — \`text-secondary\` at 8% opacity |
| Cell padding | \`7px 12px\` |
| Cell font size | \`${t.bodySize}px\` |
| Cell font | \`${t.bodyFont}\` |

### Table Rules

- Header row MUST use \`${c.tableHeaderBg.toUpperCase()}\` background — never \`card-background\`
- Header text MUST be uppercase and weight \`700\`
- Status and categorical values MUST use **badge components** with the correct status color background
- MUST NOT exceed **7 columns** in a single table
- Numeric columns MUST be right-aligned
- Text columns MUST be left-aligned
- Table borders MUST NOT visually compete with card border/radius

---

## 6. Charts

### Chart Rules

| Rule | Requirement |
|------|-------------|
| Maximum series | **6** per chart |
| Colour order | Use palette in defined order — do not skip or reorder |
| Grid lines | ${comp.showGridLines ? '**Required** — use `text-secondary` at 10–12% opacity' : '**Hidden** — clean/minimal style'} |
| Bar corner style | ${comp.chartBarStyle === 'rounded' ? 'Rounded corners — **4px radius**' : 'Sharp / square corners — no radius'} |
| Legend | Required when more than **2 series** are displayed |
| Axis labels | Required — body font (\`${t.bodyFont}\`), \`${t.labelSize}px\`, \`text-secondary\` color |
| Chart titles | Required — use card-title style (uppercase, \`${t.cardTitleSize}px\`, \`${t.headingFont}\`) |

### Chart Do's

- Use a consistent chart type for the same metric across dashboards
- Ensure adequate contrast between series colors and background
- Include clear axis labels and chart titles
- Use \`text-secondary\` for all axis text and grid lines

### Chart Don'ts

- Do **not** use more than 6 colour series in a single chart
- Do **not** use gradients in bars or columns unless brand-approved
- Do **not** render charts without a title
- Do **not** use chart colors for non-data elements (borders, backgrounds)

---

## 7. Compliance Checklist

Use this checklist to validate any dashboard against these guidelines.

### Colors
- [ ] Page background is \`${c.pageBg.toUpperCase()}\`
- [ ] Card backgrounds are \`${c.cardBg.toUpperCase()}\`
- [ ] Header uses \`${c.headerBg.toUpperCase()}\`
- [ ] Primary text is \`${c.textPrimary.toUpperCase()}\`
- [ ] \`status-positive\` (\`${c.statusPos.toUpperCase()}\`) used only for positive/favourable states
- [ ] \`status-negative\` (\`${c.statusNeg.toUpperCase()}\`) used only for negative/critical states
- [ ] \`status-warning\` (\`${c.statusWarn.toUpperCase()}\`) used only for warning/at-risk states
- [ ] Chart series use colors in defined palette order
- [ ] No additional colors introduced outside the defined palette
- [ ] All text meets WCAG AA contrast ratio (4.5:1) on its background

### Typography
- [ ] Heading font (\`${t.headingFont}\`) used for KPI values, dashboard titles and card titles
- [ ] Body font (\`${t.bodyFont}\`) used for table cell text, labels and captions
- [ ] KPI values are \`${t.kpiValueSize}px\`, weight \`800\`
- [ ] Dashboard title is \`${t.titleSize}px\`, weight \`700\`
- [ ] Card titles are \`${t.cardTitleSize}px\`, uppercase
- [ ] Labels/captions are \`${t.labelSize}px\`, uppercase
- [ ] No font sizes used outside the defined scale

### Layout
- [ ] All cards use \`${l.cardRadius}px\` corner radius uniformly
- [ ] ${l.cardShadow ? 'Drop shadow (`0 4px 16px rgba(0,0,0,0.35)`) present on all floating cards' : 'No drop shadow (flat design)'}
- [ ] ${l.cardBorder ? 'Subtle card border (1px solid) applied to all cards' : 'No card borders applied'}
- [ ] Minimum \`${gap}\` gap maintained between all adjacent cards
- [ ] Card internal padding is at least \`${pad}\`
- [ ] Dashboard includes: header, navigation tabs, content area, footer
- [ ] KPI row is the first content element after navigation

### KPI Cards
- [ ] Every KPI card contains label, value, and change indicator
- [ ] Change indicators use correct status colors only
- [ ] KPI style (${l.kpiStyle}) applied consistently across all KPI cards
- [ ] KPI values use heading font at \`${t.kpiValueSize}px\`, weight \`800\`
- [ ] No more than 5 KPI cards per row
${comp.kpiAccentBar ? '- [ ] Left accent bar (3px, accent-primary) present on all non-colored KPI cards\n' : ''}
### Tables
- [ ] Table headers use \`${c.tableHeaderBg.toUpperCase()}\` background
- [ ] Header text is uppercase, \`700\` weight, \`${t.labelSize}px\`
- [ ] Status/categorical values use badge components with correct status colors
${l.tableStyle === 'striped' ? '- [ ] Alternating row stripe styling applied\n' : ''}- [ ] No more than 7 columns per table
- [ ] Numeric columns are right-aligned, text columns are left-aligned

### Charts
- [ ] Maximum 6 data series per chart
- [ ] Chart colors used in defined palette order
- [ ] ${comp.showGridLines ? 'Grid lines visible, using `text-secondary` at 10–12% opacity' : 'Grid lines hidden (clean/minimal style)'}
- [ ] Bar corners are ${comp.chartBarStyle === 'rounded' ? 'rounded (4px radius)' : 'sharp/square'}
- [ ] All charts have titles and axis labels
- [ ] Legend present when more than 2 series displayed

### Structure
- [ ] Header bar present with brand logo/initial, dashboard name and date
- [ ] Navigation tabs present and functional
- [ ] Footer present with brand name and confidential label

---

*Generated by Dashboard Design System Builder · ${today} · ${brand.name} · Confidential*
`;

  downloadBlob(md, 'text/markdown',
    brand.name.replace(/\s+/g, '-').toLowerCase() + '-ux-guidelines.md');
  showToast('UX Compliance Markdown downloaded!');
}

// Page background PNG (1920×1080)
function exportBackground() {
  const canvas = document.createElement('canvas');
  canvas.width  = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  const c   = state.colors;

  // Base background
  ctx.fillStyle = c.pageBg;
  ctx.fillRect(0, 0, 1920, 1080);

  // Subtle radial gradient
  const grad = ctx.createRadialGradient(1920, 0, 0, 1920, 0, 1800);
  grad.addColorStop(0,   hexToRgba(c.accent1, 0.07));
  grad.addColorStop(0.5, hexToRgba(c.accent2, 0.03));
  grad.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1920, 1080);

  // Subtle dot grid pattern
  ctx.fillStyle = hexToRgba(c.textSecondary, 0.07);
  for (let x = 40; x < 1920; x += 40) {
    for (let y = 40; y < 1080; y += 40) {
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Header bar
  ctx.fillStyle = c.headerBg;
  ctx.fillRect(0, 0, 1920, 64);

  // Accent line
  ctx.fillStyle = c.accent1;
  ctx.fillRect(0, 62, 1920, 3);

  canvas.toBlob(blob => {
    downloadBlob(blob, 'image/png', state.brand.name.replace(/\s+/g,'-').toLowerCase() + '-background.png', true);
    showToast('Background PNG downloaded!');
  });
}

// Card template PNG (600×400)
function exportCardTemplate() {
  const canvas  = document.createElement('canvas');
  canvas.width  = 600;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  const c   = state.colors;
  const r   = state.layout.cardRadius * 2;

  // Card background with radius
  roundRect(ctx, 0, 0, 600, 400, r);
  ctx.fillStyle = c.cardBg;
  ctx.fill();

  if (state.layout.cardBorder) {
    ctx.strokeStyle = hexToRgba(c.textSecondary, 0.15);
    ctx.lineWidth   = 1.5;
    ctx.stroke();
  }

  if (state.layout.cardShadow) {
    // Draw a shadow effect by drawing a blurred rect underneath
    ctx.save();
    ctx.shadowColor   = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur    = 24;
    ctx.shadowOffsetY = 8;
    roundRect(ctx, 2, 2, 596, 396, r);
    ctx.fillStyle = c.cardBg;
    ctx.fill();
    ctx.restore();
  }

  // Accent bar at top
  if (state.components.kpiAccentBar) {
    ctx.fillStyle = c.accent1;
    roundRect(ctx, 0, 0, 4, 400, [r, 0, 0, r]);
    ctx.fill();
  }

  // Header strip
  ctx.fillStyle = hexToRgba(c.accent1, 0.08);
  ctx.fillRect(0, 0, 600, 44);

  // Title text
  ctx.fillStyle = c.textPrimary;
  ctx.font      = `700 14px '${state.typography.headingFont}', sans-serif`;
  ctx.fillText('CARD TITLE', 24, 27);

  // Body text line
  ctx.fillStyle = c.textSecondary;
  ctx.font      = `400 11px '${state.typography.bodyFont}', sans-serif`;
  ctx.fillText('Subtitle / date range', 24, 44);

  // KPI value
  ctx.fillStyle = c.textPrimary;
  ctx.font      = `800 ${state.typography.kpiValueSize * 1.5}px '${state.typography.headingFont}', sans-serif`;
  ctx.fillText('$2,483,920', 24, 120);

  // Change badge
  ctx.fillStyle = hexToRgba(c.statusPos, 0.12);
  roundRect(ctx, 24, 132, 80, 20, 10);
  ctx.fill();
  ctx.fillStyle = c.statusPos;
  ctx.font      = `700 11px '${state.typography.bodyFont}', sans-serif`;
  ctx.fillText('▲  +12.3%', 36, 146);

  // Mini bar chart
  const barData = [0.65, 0.80, 0.55, 0.90, 0.70, 0.88];
  const bw = 40, bh = 100, bGap = 12, startX = 24, startY = 280;
  barData.forEach((v, i) => {
    const h = v * bh;
    ctx.fillStyle = i % 2 === 0 ? c.chart[0] : c.chart[1];
    const br = state.components.chartBarStyle === 'rounded' ? 4 : 0;
    roundRect(ctx, startX + i * (bw + bGap), startY - h, bw, h, [br, br, 0, 0]);
    ctx.fill();
  });

  // Footer label
  ctx.fillStyle = c.textSecondary;
  ctx.font      = `400 10px '${state.typography.bodyFont}', sans-serif`;
  ctx.fillText(state.brand.name + '  ·  ' + state.brand.tagline + '  ·  Confidential', 24, 385);

  canvas.toBlob(blob => {
    downloadBlob(blob, 'image/png', state.brand.name.replace(/\s+/g,'-').toLowerCase() + '-card-template.png', true);
    showToast('Card template PNG downloaded!');
  });
}

// ─── Canvas Utilities ─────────────────────────────────────────────────────────

function roundRect(ctx, x, y, w, h, radii) {
  if (typeof radii === 'number') radii = [radii, radii, radii, radii];
  const [tl, tr, br, bl] = radii;
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  ctx.lineTo(x + bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
}

// ─── Download Helper ──────────────────────────────────────────────────────────

function downloadBlob(data, type, filename, isBlob = false) {
  const url = isBlob ? URL.createObjectURL(data) : URL.createObjectURL(new Blob([data], { type }));
  const a   = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// ─── Color Utilities ──────────────────────────────────────────────────────────

function hexToRgba(hex, alpha = 1) {
  if (!hex || hex.length < 7) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function lightenHex(hex, pct) {
  if (!hex || hex.length < 7) return hex;
  const r = Math.min(255, parseInt(hex.slice(1,3),16) + pct);
  const g = Math.min(255, parseInt(hex.slice(3,5),16) + pct);
  const b = Math.min(255, parseInt(hex.slice(5,7),16) + pct);
  return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}

// ─── Toast ────────────────────────────────────────────────────────────────────

let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  renderSidebar();
  renderCurrentStep();
  updateNavButtons();
  updateProgress();
  updatePreview(); // sets all CSS vars and builds preview HTML

  // Auto-scale on resize
  window.addEventListener('resize', () => {
    manualScale = null;
    updatePreviewScale();
  });

  // Apply a default preset to ensure preset button shows as active
  setTimeout(() => {
    const firstBtn = document.querySelector('.preset-btn[data-preset="corporate-dark"]');
    if (firstBtn) firstBtn.classList.add('active');
  }, 100);
}

document.addEventListener('DOMContentLoaded', init);
