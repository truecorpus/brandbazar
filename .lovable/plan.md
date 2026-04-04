## Bulk Personalization Feature

### 1. Database Migration
- Add `bulk_personalization_data` JSONB column to `order_items` for storing variable data per unit
- Add `personalization_fields` JSONB column to `customization_sessions` for field definitions

### 2. New Components
- **BulkPersonalizationPanel.tsx** — Right 40% panel with:
  - Variable field definition (mark layers as variable)
  - Data entry table (spreadsheet-like)
  - CSV upload/download
  - Preview carousel for individual units
  - Validation summary
- **BulkDataTable.tsx** — Spreadsheet component with paste support
- **BulkPreviewCarousel.tsx** — Mini preview of individual units

### 3. Integration
- Add "Bulk Personalization" button to CustomizerTopBar (shown when qty ≥ 25)
- Toggle between regular and bulk mode in Customizer page
- Pricing: +₹15/unit for text personalization, +₹25/unit for photo

### 4. Admin Enhancement
- Add variable data tab to admin order detail view
- CSV export of variable data
- Per-unit production status tracking
