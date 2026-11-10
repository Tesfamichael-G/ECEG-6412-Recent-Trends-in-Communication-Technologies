# Solutions to Chapter 4 — UMTS

[:octicons-arrow-left-24: Back to Chapter 4](../chapters/04-umts.md)

---

## 1. OVSF allocation

**OVSF tree up to SF = 8:** $C_1 = (1)$, $C_{2,0} = (1,1)$, $C_{2,1} = (1,-1)$, etc.

**Allocate:**
- Voice at SF = 128 — any leaf at SF 128, say $C_{128, 100}$.
- Video at SF = 32 — a different subtree, e.g., $C_{32, 10}$.
- Data at SF = 16 — a third subtree, e.g., $C_{16, 3}$.

**No conflict:** none of these codes is an ancestor or descendant of the others — all from different subtrees. If voice at SF 128 were on the path to $C_{16, 3}$, conflict.

---

## 2. Processing gain

| Service | $R$ | $G = 3.84\text{M}/R$ |
|:---:|:---:|:---:|
| Voice (12.2 kbps AMR) | 12.2 kbps | **315** (25 dB) |
| Video (64 kbps) | 64 kbps | 60 (17.8 dB) |
| Data (384 kbps) | 384 kbps | 10 (10 dB) |
| HSPA peak (14.4 Mbps) | 14.4 Mbps | 0.27 (breaks down) |

**Breakdown:** HSPA peak rate (14.4 Mbps) exceeds the chip rate (3.84 Mcps) — the "processing gain" concept applies only to spread-spectrum below the chip rate. For high-rate HSPA, use spectral efficiency (bits/Hz) instead.

---

## 3. Rake diversity gain

**Paths:** 4 with average power $[0, -3, -6, -9]$ dB → linear $[1, 0.501, 0.251, 0.126]$.

**Sum:** 1.878. Single-path average = 1.0.

**Diversity gain:** $10\log_{10}(1.878/1) \approx$ **2.74 dB**.

(If all 4 paths had equal average power, gain would be $10\log_4 = 6.02$ dB. The unequal paths reduce the effective gain.)

---

## 4. Power control convergence

**Start:** 20 dBm. **Target:** 23 dBm. **Step:** 1 dB per TPC.

**Steps needed:** 3 dB / 1 dB per step = **3 TPC commands**.

**At 1500 Hz (1 TPC per slot):** 3 slots × 0.667 ms = **2 ms**.

Very fast — matches the rate needed to track Rayleigh fading (coherence time at 3 km/h ≈ 70 ms; at 100 km/h ≈ 2 ms).

---

## 5. Pole capacity for UMTS voice

$N_{\text{pole}} = 1 + W/(R \cdot (E_b/N_0)_{\text{req}} \cdot (1+i) \cdot v)$.

- $W = 3.84\times10^6$ Hz.
- $R = 12.2\times10^3$ bps.
- $(E_b/N_0) = 5$ dB = 3.16.
- $i = 0.5$.
- $v = 0.6$.

$N_{\text{pole}} = 1 + 3.84\times10^6 / (12.2\times10^3 \cdot 3.16 \cdot 1.5 \cdot 0.6) \approx 1 + 110 \approx$ **111**.

**Realistic at 50%:** ~**55 voice users** per cell.

---

## 6. Interference margin

$M = -10\log_{10}(1 - \eta)$.

| $\eta$ | $M$ |
|:---:|:---:|
| 0.3 | 1.55 dB |
| 0.5 | **3.01 dB** |
| 0.7 | 5.23 dB |
| 0.9 | **10.0 dB** |

**As $\eta \to 1$:** $M \to \infty$ — the cell radius shrinks to zero, capacity diverges (impossible). Realistic design: $\eta \le 0.5$ (50% of pole).

---

## 7. HSDPA peak rate derivation

**Setup:** 15 codes, SF = 16, 16-QAM, rate 3/4.

- Per code symbol rate: $3.84$ Mcps / 16 = **240 ksym/s**.
- 16-QAM = 4 bits/sym → 240 × 4 = **960 kbps per code**.
- Rate 3/4 → 960 × 0.75 = **720 kbps per code**.
- 15 codes → 720 × 15 = **10.8 Mbps** (practical) or 14.4 Mbps (rate-1 theoretical).

**HSPA+ R7 with 64-QAM:**
- 6 bits/sym: 240 × 6 = 1440 kbps/code.
- Rate 3/4 → 1080 kbps/code.
- ×15 codes = 16.2 Mbps.
- ×2 MIMO streams = **~32 Mbps** peak (standard spec: 28 Mbps accounting for reference signals).

**R11 with 4×4 MIMO:**
- 32 Mbps × 2 (per stream doubling of MIMO) × 2 (dual cell, DC-HSDPA) = **~168 Mbps**.

---

## 8. HSUPA peak rate

**Setup:** SF=2 for E-DPDCH, QPSK, rate 1.

- Symbol rate: 3.84 Mcps / 2 = **1920 ksym/s**.
- QPSK: ×2 = 3840 kbps per code.
- Two codes (SF=2 + SF=4) → 1.5× total = **5.76 Mbps**.

**With 16-QAM (R7):** 1920 × 4 = 7680 kbps per code × 1.5 (two codes) = **11.5 Mbps**.

---

## 9. Soft handover events

**Scenario:** Active = {cellA}, monitored = {cellB, cellC}.

- **cellB 5 dB better than cellA:** Event 1A triggers — cellB enters reporting range. RNC adds cellB to active set → **2-cell soft handover**.

- **cellA 10 dB below cellB:** Event 1B for cellA — it's dropped from active. Now active = {cellB}.

- **cellB and cellC both better than cellA:** Event 1C triggers (a non-active cell becomes better than an active one). RNC replaces cellA with cellC → active = {cellB, cellC}.

---

## 10. Cell breathing

**Setup:** 4 km radius at 40% load (interference margin 2.2 dB). What radius at 70% load (5.2 dB)?

**Extra path loss due to load:** 5.2 − 2.2 = 3.0 dB.

**Path-loss exponent 3:** $d_1^{-3} / d_2^{-3} = 10^{3/10} \approx 2.0$ → $d_2/d_1 = 2^{1/3} \approx 1.26$.

Wait — more interference means less range. So at 70% load (5.2 dB margin), the link budget is **3 dB smaller**. Range shrinks.

$d_{70}/d_{40} = 10^{-3/(10\times3)} = 10^{-0.1} \approx$ **0.794**.

**New radius:** 4 × 0.794 ≈ **3.18 km**.

Cell "breathes" — 20% smaller at 70% vs. 40% load.

---

## 11. HSDPA vs. HSUPA

| Aspect | HSDPA | HSUPA |
|---|---|---|
| **Direction** | Downlink | Uplink |
| **Peak (R5/R6)** | 14.4 Mbps | 5.76 Mbps |
| **HARQ** | Async, adaptive | Sync/async (adaptive) |
| **Scheduling** | NodeB fast scheduler, shared HS-DSCH | NodeB grants (absolute + relative) |
| **Key innovation** | AMC + fast scheduling + HARQ at NodeB | Fast uplink scheduling + E-DCH |

---

## 12. HSPA+ evolution — fundamental limits

| Release | Peak DL | Notes |
|:---:|:---:|---|
| R7 | 28 Mbps | 64-QAM, 2×2 MIMO |
| R8 | 42 Mbps | DC-HSDPA (dual cell) |
| R9 | 42 Mbps DL / 23 Mbps UL | DC-HSUPA added |
| R10 | 84 Mbps | 4-carrier HSDPA |
| R11 | **168 Mbps** | 4×4 MIMO + 4-carrier |
| R12+ | 336 Mbps | 8×8 MIMO |

**Fundamental limits pushing to LTE:**
1. **WCDMA's 5 MHz carrier** caps peak spectral efficiency at ~5 bps/Hz (vs. 15+ for 20 MHz LTE).
2. **Interference-limited capacity** — adding more users degrades all.
3. **Control overhead** — scheduling, HARQ, pilots consume 30–40% of capacity.
4. **Hardware complexity** — massive MIMO needs wider bandwidth for beamforming gain.