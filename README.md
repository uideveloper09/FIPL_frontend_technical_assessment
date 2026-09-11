# Force Intellect — React Developer Assignment

Purchase Requisition Management module for the Force Intellect React Developer technical assessment.

Built with the required stack: **React.js**, **TypeScript**, **Tailwind CSS**, **React Router**, and **Zustand-ready local state** through a dedicated service layer (local persistence + loading/error handling).

## Live demo

Open the GitHub Pages app:

https://uideveloper09.github.io/FIPL_frontend_technical_assessment/

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (Vite default is `http://localhost:5173`).

```bash
npm run build
npm run preview
```

## Assignment coverage

### 4.1 Purchase Requisition Listing

| Requirement | Implementation |
| --- | --- |
| Columns: PR Number, Date, Department, Requested By, Status, Total Items, Actions | Listing table |
| Date format DD/MM/YYYY | Displayed on list and view screens |
| Search by PR Number | Debounced text search |
| Filter by Status | Draft / Submitted / Approved / Rejected |
| Date filter | From date and To date |
| Pagination | 5 records per page |
| Loading state | Skeleton rows |
| Empty state | No data / no filter match |
| Error state | Retry action |
| View / Edit actions | Eye and pencil icons |

Sample row from the brief is included: **PR-0001 · 25/09/2025 · Production · John Doe · Draft · 5 items**.

### 4.2 Create Purchase Requisition

#### 4.2.1 Header Information

| Field | Type | Behaviour |
| --- | --- | --- |
| PR Number | Auto-generated | `PR-0001` format, read-only |
| Request Date | Date | Date of requisition |
| Department | Dropdown | Production, Purchase, Quality, Stores, Maintenance, Finance |
| Requested By | Auto-fill / Select user | Defaults to login user **John Doe** |
| Priority | Dropdown | Low / Medium / High |

#### 4.2.2 Material Items

| Field | Example from brief |
| --- | --- |
| Material Code | MAT-001 |
| Material Name | Bearing |
| Quantity | 10 |
| Unit | NOS |
| Required Date | 30/09/2025 |
| Remarks | For production |
| Action | Remove row |

Also implemented:

- Add new material row
- Remove material row
- Form validation
- Quantity must be greater than 0
- Duplicate material codes are blocked
- Save as Draft
- Submit for Approval

### Extra screens for a complete ERP flow

The attached PDF shows **Page 1 of 6** and **Page 2 of 6**. View, edit, and approval actions are included so the module is usable end to end:

- View PR (read-only header + items)
- Edit only when status is **Draft** or **Rejected**
- Approve / Reject from the view screen when status is **Submitted**

## Architecture

```text
src/
  components/     layout, shared UI, PR table/form
  data/           departments, users, materials, seed PRs
  pages/          listing, create/edit, view
  services/       mock API with delay, filters, localStorage
  types/          TypeScript contracts
  utils/          dates, PR numbering, validation
```

- UI talks to `src/services/pr-service.ts` instead of writing storage logic in components.
- Validation lives in `src/utils/validation.ts`.
- Seed data is stored in `localStorage` under `fi-pr-requisitions`. Use **Reset sample data** on the listing page to restore the original records.

## Demo notes

- Login user is **John Doe** (auto-filled on create).
- To preview the listing error state in DevTools:
  `sessionStorage.setItem('fi-pr-force-error', '1')` then refresh the listing. Clear the flag and click **Retry**.
