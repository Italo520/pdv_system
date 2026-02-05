# Plano de Implementação: Fluxo de Mesas e Comandas

**Status**: Planning
**Project Type**: WEB
**Slug**: table-flow

## 1. Overview

Improve the table management flow for both Admin (Configuration) and Waiters (Operation). The goal is to separate the physical layout configuration from the daily operation, ensuring speed and reducing errors.

### Context
- **Admin**: Needs a visual tool to arrange tables (Table 01, VIP, etc.).
- **Waiter**: Needs a fast, color-coded map to see status (Free, Occupied, Bill Requested) and quickly open/manage tabs.
- **Current State**: Backend (`Table`, `Order`) exists. Frontend has basic modals but lacks the visual map and specific "Unique vs Individual" flow.

## 2. Success Criteria

- [ ] **Admin**: Can create, rename, and position tables on a grid.
- [ ] **Waiter**: Can view tables with correct color codes (Green=Free, Red=Occupied).
- [ ] **Flow**: Opening a table prompts for "Unique Key" or "Individual Tab".
- [ ] **Flow**: Clicking an occupied table shows details (Total, Tabs) before ordering.
- [ ] **Performance**: Table status updates in < 500ms.

## 3. Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS.
- **UI Components**: Shadcn/ui (Dialog, Button, Input, Card).
- **State Management**: Zustand (for local cart/session state).
- **Drag & Drop**: `@dnd-kit/core` (for Admin Layout).
- **Icons**: Lucide React.
- **Backend**: Server Actions (existing pattern), Prisma ORM.

## 4. File Structure

```
src/
├── app/
│   ├── (admin)/
│   │   └── admin/
│   │       └── tables/
│   │           └── page.tsx        # [NEW] Admin Table Layout
│   └── (pdv)/
│       └── pdv/
│           └── page.tsx            # [MODIFY] Main PDV Dashboard
├── components/
│   ├── admin/
│   │   └── table-editor.tsx        # [NEW] Drag & drop editor
│   ├── pdv/
│   │   ├── table-map.tsx           # [NEW] Visual grid for waiters
│   │   ├── table-card.tsx          # [NEW] Individual table component
│   │   ├── table-details-modal.tsx # [NEW] Occupied table summary
│   │   └── open-table-modal.tsx    # [MODIFY] New "Unique vs Individual" logic
└── lib/
    └── store/
        └── use-pdv-store.ts        # [MODIFY] Add table selection state
```

## 5. Task Breakdown

### Phase 1: Foundation & Admin
**Agent**: `frontend-specialist`

- [ ] **Task 1: Install Dependencies** <!-- id: 1 -->
  - **Input**: `@dnd-kit/core`, `@dnd-kit/sortable`
  - **Output**: Dependencies added to `package.json`.
  - **Verify**: `npm install` runs without errors.

- [ ] **Task 2: Admin Table Editor UI** <!-- id: 2 -->
  - **Input**: `src/app/(admin)/admin/tables/page.tsx`, `src/components/admin/table-editor.tsx`
  - **Output**: Interface to list, add, remove, and drag tables.
  - **Verify**: User can drag a table to a new position and save. Database updates `xPosition`/`yPosition`.

### Phase 2: Waiter Flow (Visual Map)
**Agent**: `frontend-specialist`

- [ ] **Task 3: Create TableMap Component** <!-- id: 3 -->
  - **Input**: `src/components/pdv/table-map.tsx`
  - **Output**: Grid view rendering tables based on DB coordinates.
  - **Verify**: Tables appear in the same positions as defined in Admin.

- [ ] **Task 4: Implement Status Visualization** <!-- id: 4 -->
  - **Input**: `src/components/pdv/table-card.tsx`
  - **Output**: Color coding (Green/Red/Yellow) based on `TableStatus`.
  - **Verify**: Changing status in DB updates color on frontend.

### Phase 3: Operational Flows (Modals)
**Agent**: `frontend-specialist`

- [ ] **Task 5: Refactor OpenTableModal** <!-- id: 5 -->
  - **Input**: `src/components/pdv/open-table-modal.tsx`
  - **Output**: Two distinct paths: "Comanda Única" (auto-name) vs "Individual" (input name).
  - **Verify**: Opening "Unique" creates 1 order. Opening "Individual" creates 1 order with specific name.

- [ ] **Task 6: Create TableDetailsModal (Occupied)** <!-- id: 6 -->
  - **Input**: `src/components/pdv/table-details-modal.tsx`
  - **Output**: Modal showing Total, List of Orders, "New Tab" button.
  - **Verify**: Clicking occupied table opens this modal instead of direct order screen.

- [ ] **Task 7: Integration** <!-- id: 7 -->
  - **Input**: `src/app/(pdv)/pdv/page.tsx`
  - **Output**: Connect `TableMap` to the main dashboard.
  - **Verify**: Full flow from opening app -> selecting table -> placing order.

## 6. Phase X: Verification

- [ ] **Manual Test**: Admin -> Create "Mesa 99" at pose (5,5).
- [ ] **Manual Test**: Waiter -> See "Mesa 99" at (5,5).
- [ ] **Manual Test**: Waiter -> Click "Mesa 99" -> Open "Unique". Verify Status = RED.
- [ ] **Manual Test**: Waiter -> Click "Mesa 99" (RED) -> See Details Modal.
- [ ] **Lint Check**: `npm run lint`
- [ ] **Build Check**: `npm run build`
