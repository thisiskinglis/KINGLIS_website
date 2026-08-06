# thesisdashboard — EDIT GUIDE

**This folder contains one file: `index.html` — the private client portal for KINGLIS Thesis Ledger™**

### Where to edit
**Line ~506 in `index.html`** — search for `COMMISSION CONFIGURATION`

That block is the ONLY place you edit for all 7 manual updates.

```js
const commission = {
  // FOUNDER DETAILS
  founderName: "James Whitfield",
  commissionId: "TL-2027-001",
  
  // CURRENT PHASE - moves the gold dot
  currentPhase: "extraction", // activation | evidence | extraction | validation | writing | production | delivered

  // ANALYST NOTE - only sentence you write
  analystNote: "Session 2 identified...",
  analystNoteDate: "8 October 2027",

  // EVIDENCE - switches Evidence page
  evidenceState: "received", // awaiting = shows Upload button + secure.thisiskinglis.com iframe
  
  // SESSIONS - flip after each session
  sessions: [
    { number: 3, status: "scheduled" } // change to "complete"
  ],

  // DOCUMENTS - make visible when ready
  documents: {
    foundation: [
      { name: "Session 3 Register", visible: false } // false → true
    ]
  },

  // PAYMENTS
  payments: [
    { name: "Evidence & Extraction Fee", status: "pending" } // pending → received
  ]
}
```

### GitHub workflow
1. Open `index.html` in this folder
2. Click pencil icon ✏️ (top right)
3. Ctrl+F → search `COMMISSION CONFIGURATION`
4. Edit only that block
5. Commit changes → `thisiskinglis.com/thesisdashboard/` updates live (1-2 min)

**Do NOT edit anything below `// END OF COMMISSION CONFIGURATION`**

— Kaylee-Jane
