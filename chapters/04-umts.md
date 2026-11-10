# Chapter 4 — UMTS

!!! abstract "Chapter at a glance"
    **Contact hours:** 3 lecture · **Home study:** 7 h · **Part III — Wireless network trends**
    
    **Coverage (syllabus):** migration path to UMTS · system architecture · the
    physical layer · coding and channel allocation · network design · 3.5G and
    3.75G systems (HSDPA, HSUPA, HSPA).

---

## Learning outcomes

By the end of this chapter you should be able to:

1. Trace the **migration path** from GSM to UMTS and the standards timeline.
2. Draw and describe the **UMTS Release 99 architecture** — UE, UTRAN (NodeB, RNC),
   Core Network (CS and PS domains), and the interfaces.
3. Explain the **WCDMA** physical layer — chip rate, spreading codes, scrambling,
   and the uplink/downlink differences.
4. Compute **processing gain**, **pole capacity**, and the **interference margin**
   that sets UMTS cell coverage and capacity.
5. Describe the **Rake receiver** and why it's essential in WCDMA multipath.
6. Distinguish **softer**, **soft**, and **hard handover** and their trigger
   conditions.
7. Explain **power control** — open-loop, closed-loop, and outer-loop — and why it
   is critical in CDMA.
8. Describe **HSDPA** and **HSUPA** enhancements (AMC, HARQ, fast scheduling,
   MIMO) and their peak rates.
9. Compute **HSPA throughput** given modulation, coding rate, MIMO configuration,
   and network load.
10. Compare UMTS with GSM in capacity, coverage, latency, and complexity.

---

## 4.1 The migration path from GSM to UMTS

### 4.1.1 Why a new system?

GSM (Chapter 3) served voice and slow data (up to ~470 kbps theoretical with EDGE,
but realistically 100–200 kbps). It could not deliver the "mobile broadband"
services that the market wanted by the late 1990s:

| Need | GSM capability | Gap |
|---|---|---|
| Web browsing | ~10–50 kbps practical (GPRS) | 10–100× too slow |
| Video streaming | Not feasible | — |
| Multimedia messaging | Slow, awkward | — |
| Symmetric uplink/downlink data | Asymmetric (EDGE DL >> UL) | Limited uplink |
| Spectrum efficiency | TDMA at ~0.2 bps/Hz/cell | Needs 1–5 bps/Hz/cell |

The International Telecommunication Union (ITU) defined **IMT-2000** — the 3G
requirements:

- **144 kbps** for vehicular users.
- **384 kbps** for pedestrians.
- **2 Mbps** for indoor/stationary users.
- Global roaming across multiple 3G standards.
- Support for circuit-switched voice and packet-switched data.

### 4.1.2 The 3G standardization

**3GPP** (3rd Generation Partnership Project) was formed in 1998, combining several
regional standards bodies (ETSI, ARIB, TTC, TTA, CCSA, ATIS) to develop a **global
3G standard** based on WCDMA.

**Key releases:**

| Release | Year | Key additions |
|:---:|:---:|---|
| **Release 99 (R99)** | 2000 | Base UMTS: WCDMA FDD and TDD, CS and PS core, voice + data |
| Release 4 | 2001 | All-IP core network; TDD enhancement |
| Release 5 | 2002 | **HSDPA** — high-speed downlink |
| Release 6 | 2004 | **HSUPA** — high-speed uplink; MBMS broadcast |
| Release 7 | 2007 | **HSPA+** (evolved HSPA): MIMO, 64-QAM DL, 16-QAM UL |
| Release 8 | 2008 | **LTE** introduced (Chapter 5) |
| Release 10 | 2011 | LTE-Advanced |
| Release 15 | 2018 | **5G NR** (Chapter 5) |

**UMTS R99** was the first commercial deployment. **HSPA (R5+R6)** was the workhorse
of 3G, deployed from ~2006 to ~2015. **HSPA+ (R7)** extended 3G's life through
the LTE transition.

### 4.1.3 3G variants

Three 3G standards were deployed:

| Standard | PHY | Status |
|---|---|---|
| **UMTS FDD** (WCDMA) | Wideband CDMA with FDD | Dominant globally — most of Europe, Asia, Africa |
| **UMTS TDD** (TD-CDMA) | CDMA with TDD | Some deployment in China, limited elsewhere |
| **cdma2000** (1xRTT, EV-DO) | cdmaOne evolution | North America, Japan, Korea |

This chapter focuses on **UMTS FDD (WCDMA)** — the dominant 3G standard, and the
natural successor to GSM.

### 4.1.4 The key technology shift — CDMA

GSM used **TDMA** — orthogonal frequency × time slots, so users do not interfere
(at least, not within a cell). UMTS uses **WCDMA** — all users share the same
frequency simultaneously, distinguished by their **spreading codes**.

This is a fundamental change:

| Aspect | GSM (TDMA) | UMTS (WCDMA) |
|---|---|---|
| Multiple access | Time slots | Spreading codes |
| Frequency reuse | Factor $N$ (typically 3–7) | **Factor $N = 1$** |
| Interference | Co-channel from other cells | **Self-interference + co-cell** |
| Capacity limited by | Number of slots | **Interference** (soft limit) |
| Handover | Hard | **Soft** (connected to 2+ cells) |
| Power control | Slow, coarse | **Fast, precise (1500 Hz)** |
| Synchronization | Frame-synchronous | Uplink asynchronous (scrambling codes) |

---

## 4.2 System architecture

### 4.2.1 The three subsystems

UMTS splits into the same logical structure as GSM, with new names:

- **UE** — User Equipment (handset + USIM).
- **UTRAN** — UMTS Terrestrial Radio Access Network.
- **CN** — Core Network.

Two additional pieces:

- **Serving RNC vs. Drift RNC** — during soft handover, a UE is connected to
  multiple RNCs; one is the "serving" (controls signalling) and the others are
  "drift" (relay data).
- **CS and PS domains** — the Core Network has both a **Circuit-Switched** domain
  (for voice, like GSM) and a **Packet-Switched** domain (for data, like GPRS).

### 4.2.2 UE — User Equipment

**UE = ME + USIM** (UMTS Subscriber Identity Module).

The USIM is an upgrade of the GSM SIM — same subscription model, but with
larger storage, stronger authentication (USIM AKA), and support for new services.

**Identifiers:**

- **IMSI** — as in GSM.
- **IMEI** — as in GSM.
- **P-TMSI** — packet-domain equivalent of TMSI.
- **GUTI** — GPRS temporary identity (in later releases).

### 4.2.3 UTRAN — UMTS Terrestrial Radio Access Network

**NodeB** — the base station.

- Handles **WCDMA physical layer**: spreading, scrambling, modulation, coding.
- **Rake receiver** — combining multipath components.
- **Fast power control** — transmits power-control commands to UEs every slot (1500 Hz).
- Multiple cells per NodeB (typically 3-sector, like GSM BTS).
- Connects to the RNC via the **Iub** interface.

**RNC — Radio Network Controller** — the UMTS equivalent of the GSM BSC.

- **Radio resource management** — spreading-code allocation, handover control.
- **Outer-loop power control** — sets the target SIR based on BLER.
- **Soft handover** management (combines signals from multiple NodeBs).
- **Ciphering** (in some configurations) and **header compression** (PDCP).
- Connects to the CN via **Iu-CS** (to MSC) or **Iu-PS** (to SGSN).

**The Iub interface** between NodeB and RNC is complex — it carries user traffic,
signalling, and timing (node synchronization) with strict timing requirements
(±1.25 ms for soft handover).

### 4.2.4 Core Network

**CS domain** (circuit-switched — for voice and CS data):

- **MSC** (Mobile Switching Center) — same role as GSM MSC.
- **GMSC** (Gateway MSC) — interface to PSTN.
- **VLR** (Visitor Location Register) — visitor database.

**PS domain** (packet-switched — for data):

- **SGSN** (Serving GPRS Support Node) — packet routing.
- **GGSN** (Gateway GPRS Support Node) — gateway to external PDN.

**Shared elements:**

- **HLR** (Home Location Register) — home subscriber database.
- **AuC** (Authentication Center) — holds subscriber keys.

**Evolution from GSM:**

The UMTS Core Network was designed to be a **superset of GPRS** — an operator
could evolve the GSM core to UMTS by upgrading software and adding capacity, not
replacing hardware. This was critical for GSM operators adopting 3G (most of them).

The **all-IP** transformation (Release 4 onward) replaced the MSC with a
**MSC Server** (signalling) and **MGW** (Media Gateway — user plane).

### 4.2.5 Interfaces

| Interface | Between | Purpose |
|---|---|---|
| **Uu** | UE ↔ NodeB | Radio air interface (WCDMA) |
| **Iub** | NodeB ↔ RNC | Control and user traffic |
| **Iur** | RNC ↔ RNC | Soft handover, inter-RNC mobility |
| **Iu-CS** | RNC ↔ MSC | CS traffic |
| **Iu-PS** | RNC ↔ SGSN | PS traffic |
| **Iu-BC** | RNC ↔ CBC | Broadcast (cell broadcast) |

The **Iur** interface is unique to UMTS — it enables **soft handover between RNCs**,
which is not possible in GSM (where handover between BSCs goes through the MSC).

### Worked example 4.1 — Iur and soft handover

**Scenario:** A UE on a highway moves from Cell A (RNC1) to Cell B (RNC2) to
Cell C (NodeB2 under RNC2).

**Without Iur:** at the RNC boundary, the connection must be **hard-handed** from
RNC1 to RNC2 — a break-before-make handover, ~200 ms interruption, potential call
drop at high speed.

**With Iur:** the UE enters soft handover at the RNC1/RNC2 boundary. Both RNCs
receive the same signal via the **Iur** interface; the serving RNC (say RNC1)
selects the best frame or soft-combines the two. The connection survives the
boundary without interruption, then the serving RNC switches to RNC2 (or the UE
drops RNC1 when RNC2's signal is dominant).

**The Iur interface** is what makes CDMA soft handover work across RNC boundaries.
Without it, UMTS would degrade to hard handover between every pair of RNCs —
losing the biggest CDMA advantage.

---

## 4.3 The WCDMA physical layer

### 4.3.1 Frequency and chip rate

**UMTS FDD:**

- **Uplink:** 1920–1980 MHz.
- **Downlink:** 2110–2170 MHz.
- **Duplex separation:** 190 MHz.
- **Channel bandwidth:** **5 MHz** per carrier.
- **Chip rate:** **3.84 Mcps** (megachips per second).

**Why 3.84 Mcps?** It's a multiple of the GSM bit rate (270.833 kbps × 4 = 1.083 Mbps; 3.84 / 1.083 ≈ 3.55, not a clean multiple). More precisely, 3.84 Mcps is chosen so that:

- **5 MHz channel** → 3.84 Mcps fills the channel with a small guard band.
- **Processing gain** for typical data rates: 3.84 Mcps / 12.2 kbps ≈ 315 (25 dB).
- **Coexistence** with GSM in adjacent bands.

**Number of channels in Europe:** 60 channels of 5 MHz in the 60 MHz uplink band
(1920–1980), and correspondingly in downlink.

### 4.3.2 Spreading and scrambling

WCDMA uses **two layers of spreading**, each serving a different purpose:

**Layer 1 — Channelization (spreading) codes:** orthogonal codes that separate
different physical channels **within one transmitter**.

- **Orthogonal Variable Spreading Factor (OVSF) codes** — a tree of codes that
  maintains orthogonality at different spreading factors.
- Used to distinguish **voice, data, control, pilot** channels from a single NodeB.
- **Downlink:** OVSF codes separate users within the cell.
- **Uplink:** OVSF codes separate the DPDCH (dedicated physical data channel) from
  the DPCCH (dedicated physical control channel) within one UE.

**Layer 2 — Scrambling codes:** pseudo-random codes that separate **different
transmitters** (cells or UEs).

- **Downlink scrambling codes** — Gold codes of length 38,400 chips (10 ms).
  Each cell has a unique **primary scrambling code**. There are 512 primary
  scrambling codes, organized in 64 groups of 8.
- **Uplink scrambling codes** — Gold codes, assigned by the RNC.
- **Scrambling does not change the signal bandwidth** — it just randomizes it so
  that different users' signals look uncorrelated to each other.

**The key property:** the orthogonality of OVSF codes is **destroyed by multipath** —
the delayed copies of a signal arrive out of sync with other users' codes, causing
multiple-access interference (MAI). Scrambling + Rake receiver + power control
collectively manage this.

### 4.3.3 Orthogonal Variable Spreading Factor (OVSF) codes

The OVSF tree generates codes of length $L = 2^k$ chips, where $L = \text{spreading
factor (SF)}$. Given a code $C$, its children are:

$$
\boxed{\;C_{2L, 2k} = (C_{L,k}, C_{L,k}),\quad C_{2L, 2k+1} = (C_{L,k}, -C_{L,k})\;}
$$

Starting with $C_{1,0} = (1)$, the tree generates codes like:

```
SF = 1 :              (1)
                     /  \
SF = 2 :          (1,1)  (1,-1)
                  /  \     /   \
SF = 4 :   (1,1,1,1)(1,1,-1,-1)(1,-1,1,-1)(1,-1,-1,1)
```

**Rule:** a code can be used only if **neither it nor any of its ancestors or
descendants** is in use. This preserves orthogonality.

**Example:** To allocate a voice channel (SF=128) and a data channel (SF=16) to
the same cell, the RNC picks codes from the tree such that they are not on the
same branch.

**Orthogonality:** OVSF codes are orthogonal **within a single transmitted signal**.
In the downlink, all users share one transmitter (the NodeB), so the codes are
orthogonal — no intra-cell interference **in the absence of multipath**.

**In the uplink, orthogonality is not enforced** — different UEs transmit
asynchronously, so their codes aren't strictly aligned. Uplink interference is
handled by **scrambling + Rake + power control**, not by orthogonality.

### Worked example 4.2 — OVSF allocation

**Downlink, one NodeB serves:**

- 1 pilot channel (CPICH) at SF = 256.
- 1 primary common control channel (P-CCPCH) at SF = 256.
- 1 voice user (SF = 128).
- 1 data user (SF = 32).

**Codes:** many valid assignments. The RNC chooses:

- CPICH at code index 0 (SF=256).
- P-CCPCH at code index 1 (SF=256).
- Voice user at SF=128, code index 1 (from a different subtree).
- Data user at SF=32, code index 3.

**Constraint:** no ancestor or descendant of any allocated code is used.
The RNC's code allocator tracks the tree and refuses allocations that would
violate orthogonality.

**In practice,** the downlink code tree supports roughly **SF=256 maximum per
cell** (256 spreading codes at SF=256) — but in practice operators allocate a
max of ~120–180 codes because:

- Signalling channels (pilot, sync, broadcast) take ~10–15.
- Soft handover reserves codes in multiple cells.
- Multipath destroys orthogonality beyond ~60–80% of codes, so adding more
  provides diminishing capacity.

### 4.3.4 Processing gain

$$
\boxed{\;G = \frac{R_c}{R_b} = \frac{3.84\ \text{Mcps}}{R_b}\;}
$$

| Service | $R_b$ | Processing gain |
|---|:---:|:---:|
| Voice (AMR 12.2 kbps) | 12.2 kbps | **315** (25 dB) |
| Video call (64 kbps) | 64 kbps | 60 (17.8 dB) |
| Data (384 kbps) | 384 kbps | 10 (10 dB) |
| HSPA peak (14.4 Mbps DL) | 14.4 Mbps | 0.27 (-5.7 dB!) |

**The last row** — HSPA DL peak is **higher than the chip rate**. That's because
HSPA uses **16-QAM or 64-QAM modulation**, which packs more bits per symbol, and
**high-rate channel coding** (efficient use of the channel). The processing gain
formula ($G = R_c/R_b$) applies to **voice and low-rate data**; for high-rate
systems, spectral efficiency per Hz exceeds 1 — the "processing gain" concept
breaks down.

### 4.3.5 Modulation

**UMTS R99:**

- **Downlink:** QPSK (2 bits/symbol) — data; **QPSK for control**.
- **Uplink:** dual-channel BPSK (two parallel BPSK streams on I and Q) — effectively
  QPSK but with specific power ratios.

**HSPA (R5+):**

- **Downlink:** QPSK → 16-QAM (R5) → 64-QAM (R7).
- **Uplink:** QPSK → 16-QAM (R6, HSUPA), later 16-QAM fixed.

**HSPA+ (R7+):**

- **Downlink:** 64-QAM with 2×2 MIMO (dual-stream).
- **Uplink:** 16-QAM with 2×2 MIMO (later, in R11).

**Why QPSK first?** CDMA wants to maintain a **constant-envelope** signal so
power amplifiers can operate efficiently, and QPSK with pulse shaping is
near-constant-envelope. Higher-order modulations (16-QAM, 64-QAM) have higher
PAPR, requiring PA backoff — but HSPA+ accepts this because the base station PA
can afford it.

---

## 4.4 The Rake receiver

The **Rake receiver** is the single most important element of the UMTS physical
layer. It exploits **multipath diversity** — the fact that a signal arriving
via multiple paths carries redundant information.

### 4.4.1 Why multipath is bad — and can be good

**Bad:** In a single-carrier narrowband system, multipath causes **ISI** (intersymbol
interference) — delayed copies of a symbol overlap with the next, requiring
equalization. This is what happens in GSM (Viterbi equalizer).

**Good (in CDMA):** In a **wideband** CDMA system, the symbol duration (84 ns per
chip at 3.84 Mcps) is much shorter than typical delay spreads (1–3 μs). Different
multipath components arrive with **chip-level delays** — they appear as
**distinguishable copies** rather than ISI. Each copy can be **separately
demodulated**, then **combined** to improve SNR.

### 4.4.2 The Rake concept

The Rake receiver is conceptually a set of parallel **finger** demodulators, each
locked to a specific multipath delay:

$$
\boxed{\;r(t) = \sum_{l=1}^{L} \alpha_l\, s(t - \tau_l)\;}
$$

where $\alpha_l$ is the complex gain and $\tau_l$ the delay of the $l$-th path.

**Each finger** correlates the received signal with the **UE's scrambling code
+ channelization code**, delayed by $\tau_l$. The output of finger $l$ is:

$$
y_l = \alpha_l\, s + \text{interference from other paths}
$$

**Combining:** the outputs are combined with **maximal-ratio combining (MRC)**:

$$
\boxed{\;y = \sum_{l=1}^{L} w_l\, y_l,\quad w_l \propto \alpha_l^*\;}
$$

The combined SNR is the **sum** of the SNRs of each finger:

$$
\text{SNR}_{\text{total}} = \sum_l \text{SNR}_l
$$

**The Rake receiver turns multipath from a problem into a benefit** — it's
essentially **diversity combining** at the chip level. In deep fade, if any one
path is strong, the UE still receives.

### Worked example 4.3 — Rake diversity gain

**Scenario:** A UE has a 3-finger Rake receiver. Measured path gains:

- Path 1 (delay 0 μs): $\alpha_1 = 1.0$ (0 dB).
- Path 2 (delay 1.2 μs): $\alpha_2 = 0.7$ (-3 dB).
- Path 3 (delay 2.4 μs): $\alpha_3 = 0.4$ (-8 dB).

**Per-path SNR** (assuming equal noise): proportional to $|\alpha_l|^2$:

- SNR1 ∝ 1.00
- SNR2 ∝ 0.49
- SNR3 ∝ 0.16

**Combined SNR** = 1.00 + 0.49 + 0.16 = **1.65** (linear), compared with a
single-path SNR of 1.0.

**Diversity gain:** 10·log₁₀(1.65) ≈ **2.2 dB** — the received SNR is 2.2 dB
better than a single-path system. In Rayleigh fading, this is the difference
between frequent dropouts and reliable connection.

**If all 3 paths had equal average power** (typical Rayleigh fading with
independent path statistics), the gain would be **4.77 dB** — the classic L=3
diversity gain.

### 4.4.3 Practical Rake receiver details

**Number of fingers:**

- **UE:** typically 3–6 fingers (handset size and cost constrain).
- **NodeB:** typically 4–8 fingers per antenna sector, with possible multiple
  antenna combining.

**Finger management:**

- **Searching** — the UE continually searches for new multipath peaks to assign
  fingers to.
- **Assignment** — when a strong new path appears, allocate a finger.
- **Locking** — lock the finger's delay to the peak.
- **Releasing** — when a path fades below threshold, release the finger.

**Delay spread limits:**

- **Typical urban:** 1–3 μs delay spread — Rake handles well.
- **Hilly / mountainous:** 10–30 μs delay spread — exceeds Rake's window,
  causes ISI between distant multipath, needs an **equalizer** (post-Rake).
- **Pedestrian / indoor:** <0.5 μs delay spread — Rake sees few multipaths;
  Rake gain is small but still useful.

---

## 4.5 Power control

In CDMA, **all users share the same frequency simultaneously**, so every
transmitter is an interferer to every other. If one user transmits at high power,
it overwhelms everyone else. This is the **near-far problem** — and its solution
is **fast, precise power control**.

### 4.5.1 The goal

Each UE should arrive at the NodeB with the **same received power** (before
spreading). Then all users' signals are separated cleanly by their codes, and no
one dominates.

**Signal-to-interference ratio** at the NodeB (per user):

$$
\boxed{\;\text{SIR} = \frac{P_{\text{received}}}{(N-1) P_{\text{received}} + N_0 W}\;}
$$

where $N$ is the number of active users, $P_{\text{received}}$ is the received
power per user, $N_0 W$ is the thermal noise, and $W$ is the bandwidth (3.84 MHz).

For **N users at equal power**, SIR ≈ $1/(N-1)$ — the capacity of the cell is
limited by interference (this is **soft capacity**, in contrast to GSM's hard
slot count).

### 4.5.2 Three levels of power control

**Open-loop power control** (initial access).

- UE measures the received power of the CPICH (pilot).
- Estimates path loss (assuming uplink and downlink path losses are similar).
- Sets its initial uplink transmit power based on the target received power
  at NodeB minus the estimated path loss.
- **Not accurate** (uplink and downlink frequencies differ → different fading);
  only used to set a starting point.

**Closed-loop power control** (fast, during the call).

- **NodeB** measures the received SIR every **slot** (0.667 ms).
- Compares to **target SIR** set by outer-loop control.
- Sends a **TPC (Transmit Power Control) command** every slot — either "up" or
  "down" by 1 dB.
- **Rate:** 1500 Hz — fast enough to track Rayleigh fading (coherence time at
  3 km/h ≈ 70 ms; at 100 km/h ≈ 2 ms).

**Outer-loop power control** (slow, in the RNC).

- The RNC monitors the **BLER** (block error rate) over frames (100–500 ms windows).
- If BLER > target (e.g., 1%), **raises** the target SIR.
- If BLER < target, **lowers** the target SIR.
- This adapts the target SIR to the **changing channel** and **data rate** — each
  service needs a different target.

### Worked example 4.4 — power control budget

**Scenario:** A UE at the cell edge, R99 voice, target SIR = 5 dB (0.316 in linear).

**NodeB measures SIR = 3 dB. Action:** NodeB sends **TPC = "up"** every slot
until SIR meets 5 dB.

**Rate of convergence:** 1 dB per slot × 1500 slots/s = **1500 dB/s** — very
fast. In 2 slots (1.3 ms), the SIR adjusts by 2 dB. In practice, the TPC is
**filtered** to avoid oscillation, and the effective update rate is
~500–1000 dB/s.

**Downstream effect on capacity:** if power control were absent and one UE
transmitted 10 dB too loud, the interference to other users would rise by 10 dB,
killing cell capacity. Precise power control keeps each user near minimum
transmit power — capacity scales linearly with quality of power control.

### 4.5.3 Power control in the downlink

The downlink also uses power control, but with different characteristics:

- **NodeB transmits at a common total power** (typically 20–40 W per sector).
- **Per-user power** is allocated so each UE achieves its target SIR.
- **Downlink is orthogonal within a cell** (OVSF codes), so intra-cell interference
  is minimal. Inter-cell interference dominates.
- **Fast power control** (1500 Hz) is used on DPDCH/DPCCH; **slow power control**
  on some channels (pilot, sync).

**Downlink capacity** is limited by **transmit power** — the NodeB PA can deliver
only so much. As more users demand more power, the cell's coverage shrinks (the
"cell breathing" phenomenon).

---

## 4.6 Handover in UMTS

WCDMA's universal frequency reuse ($N = 1$) enables a unique advantage: a UE
can be connected to **multiple cells simultaneously**.

### 4.6.1 Types of handover

**Softer handover** — the UE is connected to **two or more cells of the same
NodeB**.

- Different sectors of the same base station.
- Cells are on the same NodeB, so the uplink signals are combined at the NodeB
  (maximum-ratio combining).
- Downlink transmits the same data on multiple sector antennas (the UE combines).
- **Trigger:** RSSI of a neighbor sector enters a window relative to the serving.

**Soft handover** — the UE is connected to **two or more NodeBs** (potentially
under different RNCs).

- Signal is **soft-combined** at the RNC (or at the UE for downlink).
- No break-before-make — the UE keeps the old link while establishing the new.
- **Trigger:** RSSI of a neighbor NodeB enters a window relative to the serving.
- **This is CDMA's signature advantage** — no interruption during handover.

**Hard handover** — the UE breaks the old connection before establishing the
new.

- Used when moving between **frequencies** (inter-frequency) or **systems**
  (UMTS to GSM).
- Involves a brief interruption (~100–200 ms).

### 4.6.2 The active set and events

**Active set** — the set of cells to which the UE is currently connected.

**Monitored set** — cells the UE measures but is not connected to.

**Detected set** — cells detected but not in either set.

**Radio link events** (3GPP standard naming):

| Event | Trigger |
|---|---|
| **1A** | A primary CPICH enters the reporting range (candidate for adding) |
| **1B** | A primary CPICH leaves the reporting range (candidate for removing) |
| **1C** | A non-active CPICH becomes better than an active one (replace) |
| **1D** | Best cell change (best active cell changes) |
| **2A** | Best frequency change (inter-frequency) |
| **3A** | GSM cell becomes better than UMTS (inter-system) |

**Soft handover procedure:**

1. **Event 1A** triggers: a monitored cell's CPICH enters the reporting window.
2. UE sends **Measurement Report** to the serving RNC.
3. RNC decides to add the cell to the active set.
4. RNC sends **Radio Link Setup** to the target NodeB (via Iur if inter-RNC).
5. Target NodeB establishes the link and responds.
6. RNC sends **Active Set Update** to the UE (via the serving cell).
7. UE adds the new cell to its active set.
8. Now the UE receives from both cells — combining downlink, soft-combining uplink.

**Timing:** ~500–2000 ms from measurement trigger to full soft handover.

### Worked example 4.5 — soft handover window and trade-offs

**Soft handover threshold** (event 1A) — typically **3–6 dB** below the best
active cell.

**Scenario:** Serving cell CPICH = -85 dBm. Monitored neighbor = -82 dBm
(3 dB better). **Reporting range** configured as ±3 dB. Since the neighbor is
already 3 dB *better*, event 1A triggers.

**RNC adds** the neighbor to the active set. The UE now has 2 active links.

**Trade-offs:**

- **Too-narrow window:** cells are added late, misses soft-handover benefit,
  higher drop rate.
- **Too-wide window:** cells are added early, more active set cells → more
  downlink power consumed (each cell must transmit to the UE), fewer codes
  available per cell, lower capacity. UMTS typically limits the active set size
  to **4–6 cells**.

**Rule of thumb:** soft handover is beneficial when paths are within 3–6 dB, but
the active set must be limited to avoid resource waste.

---

## 4.7 HSDPA and HSUPA — the 3.5G enhancements

R99 UMTS delivered voice and up to 384 kbps data. It was a huge improvement over
GSM, but still not "broadband." **HSDPA (R5)** and **HSUPA (R6)** — collectively
**HSPA** — brought true mobile broadband.

### 4.7.1 What limited R99's data rate

R99 data rates were limited by three factors:

1. **Fixed spreading factor (SF) allocation** — data uses SF=8 or SF=16, capping
   peak at ~384 kbps (plus HSPA can go higher by using SF=1 or 2, but then almost
   all codes in the cell go to one user).
2. **Slow scheduling** — RNC handles scheduling (every 10–100 ms), too slow for
   bursty data and channel adaptation.
3. **No fast link adaptation** — the data rate cannot change rapidly with the
   channel.

### 4.7.2 HSDPA (High-Speed Downlink Packet Access) — R5

Three key innovations, all localized at the **NodeB** (not the RNC) to enable
fast response:

**1. Adaptive Modulation and Coding (AMC).**

- The NodeB chooses the modulation (QPSK / 16-QAM) and coding rate for each
  2 ms **TTI** (transmission-time interval).
- Fast adaptation (every 2 ms) to channel conditions.
- Uses **CQI** (channel quality indicator) feedback from UE — every 2 ms.

**2. Fast scheduling** at the NodeB.

- The NodeB decides which UEs to serve every 2 ms — not the RNC.
- **Proportional-fair** scheduling balances throughput and fairness.
- Multi-user diversity: at any instant, some UEs have good channel, some bad —
  serve the ones with good channel now.

**3. HARQ (Hybrid ARQ) with soft combining.**

- Fast retransmissions (every 2 ms, vs. R99's 100 ms).
- **Incremental redundancy:** retransmissions add new parity bits, combined
  with original at the UE.
- **Chase combining:** retransmissions of the same bits, combined with MRC.

**New channel: HS-DSCH** (High-Speed Downlink Shared CHannel) — a **shared**
channel, allocated dynamically to different UEs every TTI. Uses SF=16 with up to
**15 parallel codes**.

**Peak rate (R5):** 14.4 Mbps (SF=16, 15 codes, 16-QAM, rate 3/4 coding).

**Peak rate (R7, 64-QAM + MIMO):** 42 Mbps (HSPA+).

### 4.7.3 HSUPA (High-Speed Uplink Packet Access) — R6

Uplink counterpart to HSDPA:

**1. New channel: E-DCH** (Enhanced Dedicated CHannel).

- Uplink shared channel.
- Rate control by NodeB.

**2. Fast scheduling** at the NodeB.

- **Scheduling grants** — NodeB controls UE's uplink data rate.
- Two types: **absolute grants** (periodic) and **relative grants** (every TTI).

**3. HARQ** on the uplink (also 2 ms TTI).

**4. Short TTI** — 2 ms (vs. R99's 10, 20, or 40 ms).

**Peak rate (R6):** 5.76 Mbps (uplink).

**Peak rate (R7, 16-QAM):** 11.5 Mbps (uplink).

### 4.7.4 HSPA+ (R7 and beyond)

**HSPA+** extends HSPA with:

- **64-QAM downlink** (from 16-QAM) — R7.
- **2×2 MIMO downlink** (dual-stream, later) — R7.
- **16-QAM uplink** — R7.
- **Continuous Packet Connectivity (CPC)** — for always-on data services, reduces
  control overhead.
- **Dual-Cell HSDPA (DC-HSDPA)** — R8: two 5 MHz carriers aggregated, doubling
  downlink rate.
- **Dual-Cell HSUPA (DC-HSUPA)** — R9: uplink analog of DC-HSDPA.

**Peak rate (R11, 4×4 MIMO + 64-QAM, DC-HSDPA):** **168 Mbps downlink**.

### Worked example 4.6 — HSDPA peak rate calculation

**Parameters (HSDPA R5, single cell):**

- **15 HS-PDSCH codes** (spreading factor 16).
- **Modulation:** 16-QAM (4 bits/symbol).
- **Coding rate:** 3/4 (typical for good channel).
- **Chip rate:** 3.84 Mcps.
- **Spreading factor per code:** SF=16.

**Per-code symbol rate:**
$R_s = 3.84\ \text{Mcps} / 16 = 240$ ksym/s.

**Per-code bit rate (16-QAM, before coding):**
$240 \times 4 = 960$ kbps.

**After coding (rate 3/4):**
$960 \times 0.75 = 720$ kbps.

**15 codes combined:**
$720 \times 15 = 10,800$ kbps = **10.8 Mbps**.

**Standard says 14.4 Mbps** — the difference is because the standard assumes
**rate 1 (no coding)** for the theoretical peak, giving $240 \times 4 \times 15 = 14,400$ kbps. In practice, rate-3/4 coding is used for reliable throughput at
~10 Mbps.

**HSPA+ (R7) with 64-QAM (6 bits/symbol):**
$240 \times 6 \times 15 \times 0.75 = 16,200$ kbps = **16.2 Mbps** per stream,
and with 2×2 MIMO → **~32 Mbps peak**.

**Peak rate (R11, 4×4 MIMO, 64-QAM, DC-HSDPA):**
$32 \times 2\ \text{(dual cell)} \times 2\ \text{(4×4 MIMO streams)} = \mathbf{168\ Mbps}$ —
matching the 3GPP HSPA+ theoretical peak.

### Worked example 4.7 — HSUPA peak rate

**Parameters (HSUPA R6):**

- **1 E-DPDCH** with spreading factor 2 (maximum rate).
- **Modulation:** QPSK (2 bits/symbol).
- **Coding rate:** 1 (no coding for peak).

**Per-symbol rate:**
$3.84\ \text{Mcps} / 2 = 1920$ ksym/s.

**Bit rate:**
$1920 \times 2 = 3840$ kbps = **3.84 Mbps** per code.

**Standard says 5.76 Mbps** — because with **2 codes** (or with special allocation),
you get $3840 \times 1.5 = 5.76$ Mbps (one code at SF=2, plus one at SF=4).
In practice, R6 HSUPA peak is often stated as 5.76 Mbps.

**HSPA+ (R7) with 16-QAM:**
$1920 \times 4 \times \text{rate} = 7.68$ Mbps × 1.5 (dual code) = **11.5 Mbps**
— matching the standard.

### 4.7.5 HSPA evolution summary

| Release | DL modulation | UL modulation | MIMO | Peak DL | Peak UL |
|:---:|:---:|:---:|:---:|:---:|:---:|
| R99 (baseline) | QPSK | BPSK | — | 384 kbps | 384 kbps |
| R5 (HSDPA) | QPSK, 16-QAM | BPSK | — | 14.4 Mbps | 384 kbps |
| R6 (HSUPA) | QPSK, 16-QAM | BPSK, QPSK | — | 14.4 Mbps | 5.76 Mbps |
| R7 (HSPA+) | 64-QAM | 16-QAM | 2×2 | 28 Mbps | 11.5 Mbps |
| R8 (DC-HSDPA) | 64-QAM | 16-QAM | 2×2 | 42 Mbps | 11.5 Mbps |
| R9 (DC-HSUPA) | 64-QAM | 16-QAM | 2×2 | 42 Mbps | 23 Mbps |
| R11 (4×4 MIMO) | 64-QAM | 16-QAM | 4×4 | **168 Mbps** | 23 Mbps |

**The 10-year span from R5 to R11** multiplied peak downlink by **11×** — from
14.4 Mbps to 168 Mbps — purely through modulation, coding, and MIMO improvements,
without changing the 5 MHz carrier or the WCDMA chip rate.

### 4.7.6 What HSPA didn't fix

HSPA was a remarkable engineering achievement, but by the late 2000s it was hitting
fundamental limits:

- **WCDMA's 5 MHz carrier** limits peak spectral efficiency (about 5 bps/Hz with
  HSPA+ vs. 15+ bps/Hz with LTE's 20 MHz).
- **Interference-limited capacity** — WCDMA's $N=1$ reuse is efficient but every
  cell interferes with every other; adding more users degrades all users.
- **Control overhead** — the scheduling, HARQ, and pilot signals consume a
  significant fraction of capacity.

These limits motivated **LTE** (Chapter 5) — an **OFDMA** system with a fresh
air interface that reuses many of HSPA's concepts (AMC, HARQ, fast scheduling)
but with much higher spectral efficiency.

---

## 4.8 Network design considerations

Designing a UMTS network requires **coverage planning** and **capacity planning** —
the two are coupled (unlike GSM, where they were largely independent).

### 4.8.1 Coverage planning

**Maximum path loss** (MAPL) — the maximum path loss the link can tolerate:

$$
\boxed{\;\text{MAPL} = P_{\text{tx}} + G_{\text{tx}} + G_{\text{rx}} - L_{\text{cable}} - L_{\text{body}} - S_{\text{rx}} - M_{\text{interference}} - M_{\text{fade}}\;}
$$

where:

- $P_{\text{tx}}$ — transmit power (dBm).
- $G_{\text{tx}}, G_{\text{rx}}$ — antenna gains.
- $L_{\text{cable}}$ — cable loss.
- $L_{\text{body}}$ — body loss (handheld).
- $S_{\text{rx}}$ — receiver sensitivity.
- $M_{\text{interference}}$ — interference margin (depends on load).
- $M_{\text{fade}}$ — fade margin (for outdoor-to-indoor, shadowing, etc.).

**Interference margin** — unique to CDMA. As cell load increases, interference
rises, requiring more transmit power, which increases interference further — a
positive feedback loop that shrinks the cell.

$$
\boxed{\;M_{\text{interference}} = -10\log_{10}(1 - \eta)\;}
$$

where $\eta$ is the **load factor** (fraction of pole capacity).

**Example:** at $\eta = 50\%$ (typical), $M_{\text{interference}} = -10\log_{10}(0.5) = 3$ dB.
At $\eta = 75\%$, $M_{\text{interference}} = -10\log_{10}(0.25) = 6$ dB. At $\eta = 90\%$, 10 dB.

**The trade-off:** higher load = more capacity but smaller cell (breathing).

### 4.8.2 Capacity planning

**Pole capacity** — the theoretical limit where the interference grows without
bound (all power used for interference, none for useful signal).

**Uplink pole capacity:**

$$
\boxed{\;N_{\text{pole}} = 1 + \frac{W/R}{(E_b/N_0)_{\text{req}}} \cdot \frac{1}{1 + i}\;}
$$

where:

- $W/R$ = processing gain (e.g., 315 for 12.2 kbps voice).
- $(E_b/N_0)_{\text{req}}$ = required $E_b/N_0$ for the target BER (e.g., 5 dB = 3.16 for voice).
- $i$ = inter-cell interference factor (typically 0.4–0.6 for urban macro cells).

**Example:** $W/R = 315$, $(E_b/N_0) = 3.16$, $i = 0.55$:

$$
N_{\text{pole}} = 1 + \frac{315}{3.16 \times 1.55} = 1 + 64.3 \approx 65\ \text{voice users per cell.}
$$

**Realistic uplink capacity:** 40–60% of pole, so ~26–39 voice users per cell.

**Downlink pole capacity:** similar formula but different interference assumptions;
in practice the downlink is **power-limited** (the NodeB PA's max transmit power
constrains how many users can be served) rather than interference-limited.

### Worked example 4.8 — uplink capacity for mixed services

**Scenario:** UMTS cell supporting voice + data.

**Given:**

- $W = 3.84$ MHz.
- Voice: $R = 12.2$ kbps, $(E_b/N_0)_{\text{req}} = 5$ dB, activity factor $v = 0.6$.
- Data (384 kbps): $R = 384$ kbps, $(E_b/N_0)_{\text{req}} = 2$ dB, activity factor $v = 1.0$.
- Inter-cell interference factor $i = 0.5$.

**Effective processing gain (with activity):**

- Voice: $G_{\text{eff}} = W/(R \cdot v) = 3.84\text{M}/(12.2\text{k} \cdot 0.6) = 525$.
- Data: $G_{\text{eff}} = 3.84\text{M}/(384\text{k} \cdot 1.0) = 10$.

**Pole capacity:** $N_{\text{pole}} = 1 + G_{\text{eff}} / ((E_b/N_0)_{\text{req}} \cdot (1+i))$.

- Voice: $N_{\text{pole}} = 1 + 525 / (3.16 \cdot 1.5) = 1 + 111 \approx 112$ voice users.
- Data: $N_{\text{pole}} = 1 + 10 / (1.58 \cdot 1.5) = 1 + 4.2 \approx 5$ data users.

**Mixed load:** if the cell supports $N_v$ voice users and $N_d$ data users, they
must satisfy:

$$
\frac{N_v}{112} + \frac{N_d}{5} \le 1
$$

**Example configuration:** $N_v = 60$ voice + $N_d = 2$ data users:
$60/112 + 2/5 = 0.536 + 0.4 = 0.936$ — near capacity.

**Realistic (60% of pole):** $N_v = 50$ voice + $N_d = 1$ data user is a more
sustainable load.

---

## 4.9 UMTS vs. GSM — a summary comparison

| Aspect | GSM (2G) | UMTS (3G) |
|---|---|---|
| **Multiple access** | TDMA (8 slots/carrier) | WCDMA (spreading codes) |
| **Carrier bandwidth** | 200 kHz | 5 MHz |
| **Duplex** | FDD (45 MHz separation) | FDD (190 MHz separation) |
| **Chip rate** | 270.833 kbps | 3.84 Mcps |
| **Frequency reuse** | Factor N (typically 3–7) | Factor N = 1 |
| **Modulation (DL)** | GMSK | QPSK → 16-QAM → 64-QAM (HSPA) |
| **Modulation (UL)** | GMSK | BPSK → QPSK → 16-QAM (HSUPA) |
| **Channel coding** | Conv. rate 1/2, K=5 | Conv. (R99) or Turbo (R5+) |
| **Interleaving** | Depth 4 (20 ms) | Depth 1–4 (10–80 ms) |
| **Speech codec** | RPE-LTP, 13 kbps | AMR, 4.75–12.2 kbps |
| **Handover** | Hard | Softer + soft + hard |
| **Power control** | Slow (every 480 ms, coarse) | Fast (1500 Hz, fine) |
| **Receiver** | Viterbi equalizer | Rake receiver |
| **Peak DL rate** | 470 kbps (EDGE theoretical) | 42 Mbps (HSPA+) to 168 Mbps (HSPA+ R11) |
| **Peak UL rate** | 236 kbps (EDGE theoretical) | 5.76 Mbps (HSUPA) to 23 Mbps (DC-HSUPA) |
| **Latency (RTT)** | 600–800 ms | 50–100 ms (HSPA) |
| **Security algorithm** | A5/1, A5/3 | f8 (UEA1, UEA2 based on KASUMI) |
| **Voice capacity per cell** | ~50–100 (per 3-sector site) | ~60–120 (voice; higher with HSPA) |
| **Complexity** | Moderate | Very high |

**The bottom line:** UMTS is not just "GSM with faster data" — it is a fundamentally
different air interface (CDMA instead of TDMA) with different interference
mechanisms, different handover, different receiver architecture. The migration
from GSM to UMTS was a decade-long, multi-billion-dollar undertaking for global
operators.

---

## 4.10 Chapter summary

1. **UMTS** was the 3G system defined by 3GPP to meet the ITU IMT-2000 requirements
   (144 kbps / 384 kbps / 2 Mbps). It was deployed as **UMTS FDD (WCDMA)** — the
   dominant global 3G standard.
2. **Migration path:** GSM → GPRS → UMTS → HSPA → HSPA+ — a continuous evolution
   with backward-compatible core networks, and a completely new air interface for
   the 3G radio.
3. **System architecture:** UE, UTRAN (NodeB, RNC), CN (CS and PS domains). The
   **Iur interface** between RNCs enables soft handover across RNC boundaries.
4. **WCDMA physical layer:** 5 MHz carrier, 3.84 Mcps chip rate, QPSK (later
   16/64-QAM), **OVSF spreading codes** for channel separation, **Gold scrambling
   codes** for user separation.
5. **Processing gain** ($G = R_c/R_b$) for voice is ~25 dB — enough to operate
   below the noise floor. For high-rate HSPA, spectral efficiency can exceed 1
   bps/Hz, so "processing gain" becomes a misnomer.
6. **The Rake receiver** exploits multipath as **diversity** rather than ISI.
   Each finger tracks one path; maximal-ratio combining gives up to 5 dB gain
   for 3 paths, more with more fingers.
7. **Power control** is essential in CDMA — the **near-far problem** would
   destroy capacity without it. Three levels: open-loop (initial), closed-loop
   (fast, 1500 Hz, at the NodeB), outer-loop (target SIR, at the RNC).
8. **Soft handover** — a UE connected to 2+ cells simultaneously — is CDMA's
   signature advantage. It eliminates hard handover interruptions and provides
   macro-diversity. Active set size limited to 4–6 cells to avoid resource waste.
9. **HSDPA** (R5) — AMC, fast scheduling, HARQ — raised downlink peak from 384 kbps
   to 14.4 Mbps. **HSUPA** (R6) did the same for uplink (to 5.76 Mbps). **HSPA+**
   (R7–R11) added 64-QAM, MIMO, and dual-cell — pushing peak to 168 Mbps downlink.
10. **Network design** couples coverage and capacity via the **interference margin**:
    as load increases, cells shrink ("breathing"). The pole capacity is the
    theoretical maximum; realistic capacity is 40–60% of pole.
11. **UMTS vs. GSM:** fundamentally different air interface (CDMA vs. TDMA),
    different handover (soft vs. hard), different receiver (Rake vs. equalizer),
    different power control (fast and continuous vs. slow and discrete).

---

## 4.11 Quiz

### A. Multiple choice

1. UMTS FDD uses which multiple-access technique?
   (a) TDMA (b) FDMA (c) WCDMA (d) OFDMA

2. The chip rate of UMTS FDD is:
   (a) 1.2288 Mcps (b) 3.84 Mcps (c) 5 Mcps (d) 20 Mcps

3. The carrier bandwidth of UMTS FDD is:
   (a) 1.25 MHz (b) 5 MHz (c) 10 MHz (d) 20 MHz

4. Which receiver architecture is essential in UMTS?
   (a) Viterbi equalizer (b) Matched filter (c) Rake receiver (d) MMSE equalizer

5. Which is **not** a level of power control in UMTS?
   (a) Open-loop (b) Closed-loop (c) Outer-loop (d) Inner-loop

6. **Fast closed-loop power control** in UMTS operates at:
   (a) 10 Hz (b) 100 Hz (c) 1500 Hz (d) 15,000 Hz

7. The **near-far problem** is worst in:
   (a) FDMA (b) TDMA (c) CDMA (d) SDMA

8. **Soft handover** is a UE connected to:
   (a) One cell (b) Two cells of the same NodeB (c) Two or more NodeBs (d) Multiple frequencies

9. **HSDPA** peak downlink (R5) is:
   (a) 384 kbps (b) 2 Mbps (c) 14.4 Mbps (d) 42 Mbps

10. **HSUPA** peak uplink (R6) is:
    (a) 384 kbps (b) 2 Mbps (c) 5.76 Mbps (d) 11.5 Mbps

11. The **Iur** interface connects:
    (a) UE ↔ NodeB (b) NodeB ↔ RNC (c) RNC ↔ RNC (d) RNC ↔ SGSN

12. **Pole capacity** is:
    (a) The number of active users at 50% load (b) The theoretical max where interference diverges (c) The maximum downlink power (d) The chip rate divided by data rate

### B. Fill in the blank

1. UMTS FDD uses \_\_\_\_ MHz uplink and \_\_\_\_ MHz downlink.
2. The \textbf{chip rate} of UMTS FDD is \_\_\_\_ Mcps.
3. \textbf{OVSF} stands for Orthogonal \_\_\_\_ Spreading Factor.
4. The \textbf{scrambling codes} in the downlink are \_\_\_\_ codes of length 38,400 chips.
5. The \textbf{Rake receiver} exploits multipath as \_\_\_\_.
6. In UMTS, \_\_\_\_ -loop power control sets the target SIR based on BLER.
7. \textbf{Soft handover} is when a UE is connected to \_\_\_\_ or more NodeBs.
8. \textbf{HSDPA} peak downlink (R5) is \_\_\_\_ Mbps.
9. \textbf{HSUPA} peak uplink (R6) is \_\_\_\_ Mbps.
10. In a 3-sector NodeB, the maximum transmit power per sector is typically \_\_\_\_ W.

### C. Define / explain

1. Explain why CDMA uses **universal frequency reuse ($N=1$)** while TDMA uses
   frequency reuse factors $N > 1$. What is the trade-off?
2. Describe the **UMTS architecture** — UE, UTRAN, CN. What are the key components
   in each, and what does each do?
3. Explain **OVSF codes** and the tree structure. Why must no ancestor or
   descendant code be used simultaneously?
4. Explain the **Rake receiver**. Why is multipath a diversity rather than a
   problem in WCDMA? What is the gain for $L$ equal-power paths?
5. Compare **open-loop**, **closed-loop**, and **outer-loop power control**.
   What does each do, at what rate, and where is it implemented?
6. Describe **soft handover** in UMTS. What is the **active set**? What are the
   trade-offs in choosing the soft-handover window?
7. Describe **HSDPA**'s three main innovations (AMC, fast scheduling, HARQ).
   Why does each require localization at the NodeB (not the RNC)?
8. Compute the peak HSDPA downlink rate for 15 codes, 16-QAM, rate 3/4 coding.
   Then for HSPA+ with 64-QAM and 2×2 MIMO.
9. Derive the **interference margin** formula $M = -10\log_{10}(1 - \eta)$. What
   is it at $\eta = 50\%$, $75\%$, $90\%$?
10. Explain the **pole capacity** for uplink CDMA. Why is realistic capacity only
    40–60% of pole?

---

## 4.12 Answer key

??? success "A. Multiple choice"
    1. **(c)** — WCDMA.
    2. **(b)** — 3.84 Mcps.
    3. **(b)** — 5 MHz.
    4. **(c)** — Rake receiver.
    5. **(d)** — "inner-loop" is not a standard term (fast closed-loop is sometimes called inner-loop, but outer-loop is the RNC-side one).
    6. **(c)** — 1500 Hz.
    7. **(c)** — CDMA.
    8. **(c)** — two or more NodeBs.
    9. **(c)** — 14.4 Mbps.
    10. **(c)** — 5.76 Mbps.
    11. **(c)** — RNC ↔ RNC.
    12. **(b)** — theoretical max where interference diverges.

??? success "B. Fill in the blank"
    1. 1920–1980; 2110–2170.
    2. 3.84.
    3. Variable.
    4. Gold.
    5. Diversity.
    6. Outer.
    7. Two.
    8. 14.4.
    9. 5.76.
    10. 20–40.

??? success "C. Define / explain — model answers"
    1. *CDMA $N=1$ vs. TDMA $N>1$:* In CDMA, all users share the same frequency
       band everywhere, distinguished only by codes. Every cell uses the same 5 MHz
       carrier. Capacity is interference-limited (adding users adds interference to
       all cells) — soft capacity. In TDMA, users share time slots on a per-cell basis;
       to avoid interference between cells, frequencies must be reused at some distance
       ($N>1$). *Trade-off:* CDMA has no frequency planning needed (good), but
       interference from adjacent cells limits capacity (bad) — hence the inter-cell
       interference factor $i \approx 0.5$ in pole-capacity formulas.
    2. *UMTS architecture:* UE (handset + USIM). UTRAN = NodeB (base station, WCDMA
       PHY, Rake, fast power control) + RNC (radio resource management, soft handover,
       outer-loop power control, ciphers). Core Network = CS domain (MSC, VLR) + PS
       domain (SGSN, GGSN) + shared HLR/AuC. Interfaces: Uu (radio), Iub (NodeB-RNC),
       Iur (RNC-RNC), Iu-CS (RNC-MSC), Iu-PS (RNC-SGSN).
    3. *OVSF codes:* generated by a tree where each code has two children, one formed
       by replicating the parent, one by replicating-and-negating. Orthogonal within
       one transmitter. *Rule:* an allocated code excludes its ancestors (which are
       prefixes) and descendants (which begin with it) — because they would not be
       orthogonal to it. This maintains zero correlation within the cell's own transmission.
    4. *Rake receiver:* multiple finger demodulators, each locked to a multipath delay;
       MRC combining. *Why diversity, not ISI:* wideband CDMA's chip duration (0.26 μs)
       is much shorter than typical delay spread (1–3 μs), so multipath components
       are resolvable at chip granularity rather than overlapping at symbol granularity.
       *Gain:* $L$ equal-power independent paths give SNR gain of $L$ (in linear);
       10 log₁₀ L dB. For L=3: 4.77 dB.
    5. *Open-loop:* UE measures CPICH, estimates path loss, sets initial TX power.
       Not accurate (uplink ≠ downlink fading). Rate: once at call setup.
       *Closed-loop:* NodeB measures received SIR every slot (0.667 ms), compares to
       target, sends TPC commands every slot. Rate: 1500 Hz. Implemented in NodeB.
       *Outer-loop:* RNC monitors BLER over frames, adjusts target SIR. Rate: 10–100 Hz.
       Implemented in RNC.
    6. *Soft handover:* UE connected to 2+ NodeBs simultaneously, signals combined.
       *Active set:* cells the UE is currently connected to. *Trade-offs:* wider
       window = earlier addition, better reliability, but consumes more downlink power
       (each cell transmits to the UE) and more downlink codes per cell. Typical active
       set 4–6 cells, window 3–6 dB.
    7. *HSDPA's three innovations:* AMC (modulation+coding adapted per 2 ms TTI to
       instantaneous channel); fast scheduling (which UE gets the shared HS-DSCH each
       2 ms TTI, exploiting channel fluctuations via multi-user diversity); HARQ
       (fast retransmission with soft combining). All must be at the NodeB to be
       fast — the RNC is too slow (frame-level). Moving these functions to NodeB
       is what enabled the 14.4 Mbps peak.
    8. *HSDPA peak:* 15 codes × SF=16 → $240$ ksym/s/code × 4 bits/symbol (16-QAM) × 15 codes × 0.75 (rate 3/4) = 10.8 Mbps (practical) or 14.4 Mbps (rate 1, theoretical). *HSPA+ with 64-QAM + 2×2 MIMO:* 240 ksym/s × 6 bits/symbol × 15 codes × 0.75 × 2 (MIMO) = 32.4 Mbps per cell (theoretical peak 28–42 Mbps depending on the standard version).
    9. *Interference margin:* $M = -10\log_{10}(1-\eta)$. At $\eta=0.5$: 3 dB.
       At $\eta=0.75$: 6 dB. At $\eta=0.9$: 10 dB. Higher load = larger margin =
       smaller cell radius (cell breathing).
    10. *Pole capacity:* $N_{\text{pole}} = 1 + G/((E_b/N_0)_{\text{req}}(1+i))$.
        Realistic capacity is 40–60% of pole because at 100% of pole the interference
        grows without bound — the cell becomes unstable. To maintain reliable
        communication (BLER < target) and reserve capacity for soft handover
        overhead, operators dimension at 50–60% of pole.

---

## Further reading

- **H. Holma & A. Toskala**, *WCDMA for UMTS: HSPA Evolution and LTE*, 5th ed., Wiley, 2010 — the definitive reference; covers WCDMA, HSDPA, HSUPA, HSPA+ in depth.
- **H. Holma & A. Toskala**, *LTE for UMTS: Evolution to LTE-Advanced*, Wiley, 2011 — companion volume on the LTE transition.
- **H. Kaaranen, A. Ahtiainen, L. Laitinen, S. Naghian & V. Niemi**, *UMTS Networks: Architecture, Mobility and Services*, 2nd ed., Wiley, 2005 — systems-level view.
- **J. Laiho, A. Wacker & T. Novosad**, *Radio Network Planning and Optimisation for UMTS*, 2nd ed., Wiley, 2006 — the coverage/capacity planning reference.
- **T. Ojanperä & R. Prasad**, *Wideband CDMA for Third Generation Mobile Communications*, Artech, 1998 — the foundational WCDMA textbook.
- **A. J. Viterbi**, *CDMA: Principles of Spread Spectrum Communication*, Addison-Wesley, 1995 — the Rake receiver and CDMA capacity theory from the inventor.
- **3GPP TS 25.xxx series** — the UMTS specifications:
  - TS 25.201 — Physical layer: general description.
  - TS 25.211–25.215 — Physical channels, spreading, modulation.
  - TS 25.301 — Radio interface protocol architecture.
  - TS 25.401 — UTRAN overall description.
  - TS 25.331 — RRC protocol specification.
- **3GPP TS 25.308** — HSDPA overall description.
- **3GPP TS 25.319** — Enhanced uplink (HSUPA) overall description.
- **3GPP TS 25.306** — UE radio access capabilities.

---

## Suggested tutorial problems

1. **OVSF allocation.** Build the OVSF tree up to SF=8. Allocate a voice channel at SF=128, a video channel at SF=32, and a data channel at SF=16. Verify no ancestor/descendant conflict.

2. **Processing gain.** Compute the processing gain for voice (12.2 kbps AMR), video (64 kbps), data (384 kbps), and HSPA peak (14.4 Mbps) at $R_c = 3.84$ Mcps. Which of these does the "gain" concept break down for?

3. **Rake diversity.** A UE has 4 fingers. Paths have average power $[0, -3, -6, -9]$ dB. Compute the diversity gain vs. a single-path system in Rayleigh fading.

4. **Closed-loop power control.** If a UE starts at 20 dBm and the target SIR requires 23 dBm, how many TPC "up" commands (at 1 dB each) does it take? At 1500 Hz, how long does this take?

5. **Pole capacity.** For UMTS voice ($W=3.84$ MHz, $R=12.2$ kbps, $(E_b/N_0)_{\text{req}} = 5$ dB, $i=0.5$, $v=0.6$), compute the pole capacity. Then compute realistic capacity at 50% load.

6. **Interference margin.** Compute $M$ for $\eta = 0.3, 0.5, 0.7, 0.9$. Plot $M$ vs. $\eta$. What happens as $\eta \to 1$?

7. **HSDPA peak rate.** Derive the 14.4 Mbps peak (R5): 15 codes, SF=16, 16-QAM, rate 3/4. Then derive the 28 Mbps peak (HSPA+ R7) with 64-QAM. Then the 42 Mbps peak with 2×2 MIMO.

8. **HSUPA peak rate.** Derive the 5.76 Mbps uplink peak (R6): SF=2 + SF=4 (two codes), QPSK. Then 11.5 Mbps with 16-QAM.

9. **Soft handover events.** Given a UE with active set = {cellA}, monitored = {cellB, cellC}, describe what happens when:
   - cellB CPICH becomes 5 dB better than cellA.
   - cellA CPICH drops 10 dB below cellB.
   - cellB and cellC both become better than cellA.

10. **Cell breathing.** A cell is designed for 4 km radius at 40% load (interference margin 2.2 dB). What is the cell radius at 70% load (interference margin 5.2 dB), assuming path-loss exponent 3?

11. **HSDPA vs. HSUPA.** Compare HSDPA and HSUPA in: peak rate, HARQ type, scheduling grant structure, key innovation.

12. **HSPA+ evolution.** Tabulate HSPA+ peak rates by release (R7, R8, R9, R10, R11). What is the **fundamental limitation** that pushed operators to LTE?
