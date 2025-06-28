// Navigation item type definition
export const createNavItem = (icon, label, path, badge = null) => ({
  icon,
  label,
  path,
  badge
});

// Sidebar variant types
export const SIDEBAR_VARIANTS = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  MINIMAL: 'minimal'
};

// Default sidebar configuration
export const DEFAULT_SIDEBAR_CONFIG = {
  collapsedWidth: 64,
  expandedWidth: 240,
  defaultExpanded: false,
  showPinToggle: true,
  variant: SIDEBAR_VARIANTS.DEFAULT
};