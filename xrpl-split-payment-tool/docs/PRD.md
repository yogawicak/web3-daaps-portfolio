# Product Requirements Document (PRD)

## XRPL Split Payment Tool

---

## 1. Executive Summary

### Product Overview

A decentralized application (dApp) built on XRP Ledger that enables users to split bills and expenses among multiple people, automatically calculating and distributing payments in XRP with instant settlement.

### Target Users

- Friends splitting restaurant bills
- Roommates sharing rent and utilities
- Travel groups managing shared expenses
- Event organizers collecting contributions
- Small businesses splitting costs with partners

### Key Value Proposition

- **Instant settlement** (3-5 seconds vs days for traditional banking)
- **Ultra-low fees** (~$0.0002 per transaction)
- **Transparent** - all transactions on public ledger
- **No intermediaries** - direct wallet-to-wallet transfers
- **Global** - works across borders without friction

---

## 2. Product Goals & Success Metrics

### Primary Goals

1. Simplify group payment splitting using XRPL
2. Provide transparent, instant settlements
3. Eliminate the awkwardness of requesting money from friends
4. Showcase XRPL's speed and low-cost advantages

### Success Metrics (6 months post-launch)

- **Adoption:** 5,000+ active users
- **Usage:** 10,000+ split payments processed
- **Volume:** $500,000+ total XRP distributed
- **Retention:** 40%+ monthly active users return
- **NPS Score:** 50+
- **Average transaction fee savings:** 99% vs traditional payment apps

---

## 3. User Stories & Use Cases

### Primary Use Cases

**UC-1: Restaurant Bill Split**

> "As a group of 5 friends at dinner, we want to split a $150 bill equally so everyone pays their fair share instantly without one person fronting the cost."

**UC-2: Custom Amount Split**

> "As someone who paid for concert tickets, I want to collect different amounts from friends ($50 for general admission, $100 for VIP) so everyone pays what they owe."

**UC-3: Recurring Expense Split**

> "As roommates, we want to split monthly rent ($2,000 among 4 people) so we can automate this recurring payment."

**UC-4: Expense Tracking**

> "As a travel group leader, I want to track all shared expenses during our trip so we can settle up at the end with a single payment per person."

**UC-5: Request Payment**

> "As someone who covered a group expense, I want to send payment requests with a shareable link so people can pay me back easily."

---

## 4. Feature Requirements

### 4.1 MVP Features (Phase 1)

#### F-1: Wallet Connection

**Priority:** P0 (Must Have)

- Support XUMM wallet integration
- Support Crossmark wallet integration
- Display connected wallet address (truncated)
- Show current XRP balance
- Disconnect wallet option
- Security: Only allow signing, never expose private keys

**Acceptance Criteria:**

- User can connect wallet in < 10 seconds
- Connection persists across page refreshes
- Clear error messages for connection failures

---

#### F-2: Equal Split Calculator

**Priority:** P0 (Must Have)

- Input total amount to split
- Input number of participants
- Auto-calculate per-person amount
- Display calculation breakdown
- Support up to 20 participants

**Business Logic:**

```
Per Person Amount = Total Amount / Number of Participants
(Round to 6 decimal places for XRP)
```

**Acceptance Criteria:**

- Calculation updates in real-time
- Handles decimal amounts correctly
- Shows clear breakdown: "Total: 100 XRP ÷ 5 people = 20 XRP each"

---

#### F-3: Participant Management

**Priority:** P0 (Must Have)

- Add participant wallet addresses
- Manual address entry with validation
- Remove participants
- Nickname/label for each participant (optional)
- Validate XRPL address format
- Detect invalid addresses before submission

**Validation Rules:**

- XRPL address must start with 'r'
- Must be 25-35 characters long
- Valid base58 encoding
- Show error: "Invalid XRPL address format"

**Acceptance Criteria:**

- Can add/remove participants smoothly
- Address validation prevents typos
- Clear visual distinction between valid/invalid addresses

---

#### F-4: Payment Execution

**Priority:** P0 (Must Have)

- Review screen showing all payments before execution
- Batch payment processing (send to all participants)
- Transaction signing via connected wallet
- Real-time transaction status updates
- Success/failure notifications for each payment

**Transaction Flow:**

1. User reviews payment summary
2. Clicks "Send Payments" button
3. Wallet prompts for signature (once for batch or per transaction based on wallet)
4. Transactions broadcast to XRPL
5. Monitor transaction status
6. Display results with transaction hashes

**Acceptance Criteria:**

- User can review before confirming
- Clear progress indicator during processing
- All successful transactions return tx hash
- Failed transactions show clear error reasons

---

#### F-5: Transaction History

**Priority:** P0 (Must Have)

- Display list of past split payments
- Show date, total amount, participants count
- Link to XRPL explorer for each transaction
- Filter by date range
- Store history locally (browser storage initially)

**Data to Display:**

- Split date/time
- Total amount
- Number of participants
- Status (completed/partial/failed)
- Transaction hashes (links to explorer)

**Acceptance Criteria:**

- History loads in < 2 seconds
- Can view details of past splits
- Links to explorer work correctly

---

### 4.2 Phase 2 Features (Post-MVP)

#### F-6: Custom Split Amounts

**Priority:** P1 (Should Have)

- Allow different amounts per participant
- Percentage-based splits
- Remaining amount calculator
- Handle scenarios like "I'll pay 40%, split the rest equally among others"

#### F-7: Memo/Note Attachment

**Priority:** P1 (Should Have)

- Add memo to each transaction (e.g., "Dinner at Mario's - Dec 15")
- Max 256 characters (XRPL memo limit)
- Appears on blockchain and in XRPL explorers

#### F-8: Payment Request Links

**Priority:** P1 (Should Have)

- Generate shareable payment link
- Pre-filled with amount and recipient
- Recipients click link → connect wallet → pay
- Track who has paid via unique identifiers

#### F-9: QR Code Generation

**Priority:** P2 (Nice to Have)

- Generate QR code for payment requests
- Scannable by mobile wallets
- Includes amount and destination address

#### F-10: Multi-Currency Support

**Priority:** P2 (Nice to Have)

- Support XRPL-issued tokens (not just XRP)
- USD-pegged stablecoins
- Popular tokens on XRPL DEX

#### F-11: Recurring Splits

**Priority:** P2 (Nice to Have)

- Save split configurations
- Schedule automatic recurring payments
- Monthly rent, subscription splits, etc.

#### F-12: Group Expense Tracking

**Priority:** P2 (Nice to Have)

- Create expense groups (e.g., "Bali Trip 2025")
- Multiple people can add expenses
- Calculate net balances (who owes whom)
- Final settlement with minimum transactions

---

## 5. Technical Architecture

### 5.1 Technology Stack

**Frontend:**

- React.js (UI framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- xrpl.js library (XRPL interaction)

**Wallet Integration:**

- XUMM SDK
- Crossmark extension API

**Backend (Optional for MVP):**

- Can be fully client-side initially
- Later: Node.js + Express for analytics
- Database: PostgreSQL (if storing user data)

**Infrastructure:**

- XRPL Mainnet for production
- XRPL Testnet for development
- CDN for static assets

---

### 5.2 XRPL Integration Points

**Key XRPL Features Used:**

1. **Payment transactions** - Direct XRP transfers
2. **Memos** - Attach notes to transactions
3. **Multi-signing** - Batch payment execution
4. **Account info** - Check balances before sending

**XRPL APIs:**

- `rippled` WebSocket API (primary)
- Public XRPL nodes (fallback)
- Your validator (once fully synced)

**Transaction Structure:**

```json
{
  "TransactionType": "Payment",
  "Account": "rSenderAddress...",
  "Destination": "rRecipientAddress...",
  "Amount": "20000000", // 20 XRP in drops
  "Memos": [
    {
      "Memo": {
        "MemoData": "Split payment - Dinner"
      }
    }
  ]
}
```

---

### 5.3 Security Considerations

**Wallet Security:**

- Never store or transmit private keys
- All signing done through wallet apps
- Use secure WebSocket connections (wss://)

**Address Validation:**

- Validate XRPL address format client-side
- Verify address exists on-chain before sending
- Warn users about potential typos

**Transaction Safety:**

- Show clear confirmation before execution
- Display total amount being sent
- Prevent accidental duplicate transactions

**Data Privacy:**

- Store minimal user data
- No email/phone required
- Transaction history stored locally (or encrypted if backend)

---

## 6. User Interface & Experience

### 6.1 User Flow

**Main Flow:**

```
1. Landing Page
   ↓
2. Connect Wallet (XUMM/Crossmark)
   ↓
3. Split Payment Dashboard
   ↓
4. Enter Total Amount
   ↓
5. Add Participants (addresses)
   ↓
6. Choose Split Type (equal/custom)
   ↓
7. Review Summary
   ↓
8. Confirm & Sign Transaction
   ↓
9. Monitor Transaction Status
   ↓
10. Success Screen with TX hashes
```

---

### 6.2 Key Screens

**Screen 1: Landing Page**

- Hero section: "Split Bills Instantly on XRPL"
- Benefits: Fast, cheap, transparent
- "Connect Wallet" CTA button
- Example use cases
- How it works (3 simple steps)

**Screen 2: Dashboard**

- Connected wallet info (top right)
- Current XRP balance
- Quick actions: "New Split", "View History"
- Recent splits (last 5)

**Screen 3: Split Creator**

- Step indicator (Step 1/4, 2/4, etc.)
- Total amount input (large, centered)
- Number of people selector
- Participant list with addresses
- Real-time calculation display
- "Next" button

**Screen 4: Review & Confirm**

- Summary card:
  - Total: X XRP
  - Split among: Y people
  - Each person pays: Z XRP
- Participant list with amounts
- Transaction fee estimate
- Edit button (go back)
- "Send Payments" button (primary action)

**Screen 5: Processing**

- Progress indicator
- Status for each transaction:
  - ✓ Success
  - ⏳ Pending
  - ✗ Failed
- "View on Explorer" links

**Screen 6: Success**

- Celebration animation
- "All payments sent successfully!"
- Total amount distributed
- Number of successful transactions
- "View Details" button
- "Start New Split" button

---

### 6.3 Design Principles

1. **Simplicity First** - Minimize cognitive load
2. **Trust & Transparency** - Always show what's happening
3. **Error Prevention** - Validate before execution
4. **Responsive Design** - Mobile-first approach
5. **Accessibility** - WCAG 2.1 AA compliance

---

## 7. Technical Requirements

### 7.1 Performance Requirements

- **Page Load Time:** < 2 seconds
- **Transaction Signing:** < 5 seconds
- **Transaction Confirmation:** 3-5 seconds (XRPL standard)
- **Wallet Connection:** < 10 seconds
- **Max Concurrent Payments:** 20 per batch

### 7.2 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### 7.3 Scalability

**MVP Target:**

- 100 concurrent users
- 1,000 transactions/day
- 10,000 total users

**Phase 2 Target:**

- 1,000 concurrent users
- 10,000 transactions/day
- 100,000 total users

---

## 8. Business & Monetization

### 8.1 Revenue Model (Future)

**Option 1: Transaction Fee**

- Add small fee (0.1-0.5%) on top of XRPL network fee
- Only for amounts > 100 XRP
- Transparent: "Your fee: 0.5 XRP | Network fee: 0.00001 XRP"

**Option 2: Premium Features**

- Free: Basic equal splits
- Premium ($5/month): Custom splits, recurring payments, groups
- Enterprise: API access, white-label solution

**Option 3: Sponsored/Partnership**

- Partner with restaurants, event organizers
- They cover fees for their customers
- Branding opportunities

### 8.2 Go-to-Market Strategy

**Phase 1: Launch (Months 1-2)**

- Beta launch to crypto communities
- XRPL Discord, Reddit, Twitter
- Partner with 5-10 crypto-friendly restaurants
- Content marketing: "How to split bills using XRPL"

**Phase 2: Growth (Months 3-6)**

- Referral program: "Invite 3 friends, get 5 XRP"
- Integration with popular wallets
- Educational videos and tutorials
- Local meetups and demos

**Phase 3: Scale (Months 6-12)**

- Mobile app (iOS/Android)
- API for third-party integrations
- B2B partnerships with restaurants/venues
- International expansion

---

## 9. Risks & Mitigation

### Risk 1: Low XRP Adoption

**Mitigation:**

- Educational content about XRPL benefits
- Partner with wallet providers for onboarding
- Fiat on-ramp partnerships

### Risk 2: User Experience Complexity

**Mitigation:**

- Extensive UX testing
- Simple onboarding tutorial
- 24/7 support chat

### Risk 3: Transaction Failures

**Mitigation:**

- Robust error handling
- Retry mechanism for failed transactions
- Clear error messages with solutions

### Risk 4: Wallet Integration Issues

**Mitigation:**

- Support multiple wallets
- Fallback options
- Detailed integration docs

### Risk 5: Regulatory Compliance

**Mitigation:**

- No fiat currency handling (XRP only initially)
- No custody of user funds
- Clear terms of service
- Consult with legal experts

---

## 10. Development Roadmap

### Phase 1: MVP (8 weeks)

**Week 1-2: Setup & Design**

- Project setup (React + TypeScript)
- UI/UX design mockups
- XRPL testnet environment

**Week 3-4: Core Features**

- Wallet connection (XUMM/Crossmark)
- Equal split calculator
- Participant management

**Week 5-6: Payment Execution**

- Transaction creation
- Batch payment processing
- Status monitoring

**Week 7-8: Testing & Launch**

- End-to-end testing
- Security audit
- Beta launch on mainnet

### Phase 2: Enhanced Features (8 weeks)

**Week 9-10:**

- Custom split amounts
- Memo attachment

**Week 11-12:**

- Payment request links
- QR code generation

**Week 13-14:**

- Transaction history improvements
- Analytics dashboard

**Week 15-16:**

- Mobile optimization
- Performance improvements

### Phase 3: Advanced Features (12 weeks)

**Week 17-20:**

- Multi-currency support
- Group expense tracking

**Week 21-24:**

- Recurring payments
- API development

**Week 25-28:**

- Mobile app development
- Enterprise features

---

## 11. Success Criteria & KPIs

### Launch Success (Week 1)

- ✓ 100+ wallet connections
- ✓ 50+ successful split payments
- ✓ < 5% transaction failure rate
- ✓ No critical bugs

### Month 1 Success

- ✓ 1,000+ active users
- ✓ 500+ split payments processed
- ✓ $50,000+ XRP volume
- ✓ 4.0+ app store rating

### Month 6 Success

- ✓ 5,000+ monthly active users
- ✓ 10,000+ total split payments
- ✓ $500,000+ total XRP volume
- ✓ 30%+ user retention rate
- ✓ 2+ partnerships signed

---

## 12. Open Questions & Decisions Needed

1. **Which wallet to prioritize first?** XUMM vs Crossmark
2. **Should we store any user data?** Or keep it 100% client-side?
3. **Maximum participants per split?** 20? 50? 100?
4. **Add fiat conversion display?** Show USD equivalent?
5. **Support other XRPL tokens from MVP?** Or XRP only?
6. **Open source the code?** Could attract developers but also competitors
7. **Mobile app priority?** PWA vs Native app
8. **Branding & Name?** "SplitXRP"? "SharePay"? "DivvyXRP"?

---

## 13. Appendix

### A. Glossary

- **XRPL:** XRP Ledger - decentralized blockchain
- **dApp:** Decentralized application
- **Drop:** Smallest unit of XRP (1 XRP = 1,000,000 drops)
- **Memo:** Optional message attached to XRPL transaction
- **Testnet:** XRPL test network for development

### B. References

- XRPL Documentation: https://xrpl.org
- xrpl.js Library: https://js.xrpl.org
- XUMM SDK: https://xumm.readme.io
- Crossmark Docs: https://crossmark.io/developers

### C. Competitive Analysis

**Venmo/PayPal:**

- Pros: Established user base
- Cons: High fees, slow settlement, US-only

**Splitwise:**

- Pros: Great UX, expense tracking
- Cons: Requires external payment, IOU-based

**XRPL Split Payment Tool:**

- Unique advantages: Instant settlement, global, transparent, ultra-low cost

---

## Document History

| Version | Date       | Author       | Changes     |
| ------- | ---------- | ------------ | ----------- |
| 1.0     | 2026-01-11 | Product Team | Initial PRD |

---

**Questions or Feedback?**
Contact: [Your Email/Contact Info]
