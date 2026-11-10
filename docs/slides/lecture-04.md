---
revealjs:
  mode: diapo
  highlight:
    light: vs
    dark:  vs2015
  autoAnimate:  true
  autoAnimateDuration: 1.0
  transition: slide
  transitionSpeed: default
  js: slides/assets/quiz.js
---

## ECEG-6412

### Chapter 4 — UMTS

MSc in Communication Engineering · Year 1, Semester I

Dr. Tesfamichael Gebregziabher

---

## Outline

<div class="fragment">

**Part 1 — Migration to 3G**

- Why GSM needed a successor
- The IMT-2000 requirements

</div>

<div class="fragment">

**Part 2 — Architecture**

- UE, UTRAN (NodeB, RNC), Core Network
- The Iur interface

</div>

<div class="fragment">

**Part 3 — WCDMA PHY**

- Chip rate, spreading, scrambling, OVSF
- The Rake receiver

</div>

<div class="fragment">

**Part 4 — Power control and handover**

- Near-far problem
- Softer, soft, hard handover

</div>

<div class="fragment">

**Part 5 — HSPA and network design**

- HSDPA, HSUPA, HSPA+
- Coverage / capacity trade-off

</div>

---

## Learning outcomes

<div class="fragment">

**LO1 — Trace the 3G migration path**

GSM → GPRS → UMTS → HSPA → HSPA+.

</div>

<div class="fragment">

**LO2 — Draw the UMTS architecture**

UE, UTRAN, CN (CS + PS). Iur interface enables soft handover across RNCs.

</div>

<div class="fragment">

**LO3 — Explain WCDMA physical layer**

3.84 Mcps chip rate, 5 MHz carrier, OVSF spreading + Gold scrambling.

</div>

<div class="fragment">

**LO4 — Describe the Rake receiver**

Multipath as diversity. MRC combining. ~5 dB gain for 3 equal paths.

</div>

<div class="fragment">

**LO5 — Analyze power control and handover**

Open / closed / outer loop. Softer, soft, hard. Active set.

</div>

<div class="fragment">

**LO6 — Compute HSPA peak rates and pole capacity**

HSDPA 14.4 Mbps; HSUPA 5.76 Mbps; pole capacity formula.

</div>

---

## §4.1 — Why GSM needed a successor

<div class="fragment">

GSM (Chapter 3) served voice and slow data (~100 kbps with EDGE).

</div>

<div class="fragment">

By the late 1990s, demand for **mobile internet** — web, email, video — was emerging.

</div>

<div class="fragment">

| Need | GSM capability | Gap |
|---|---|---|
| Web browsing | ~10–50 kbps practical | 10–100× too slow |
| Video streaming | Not feasible | — |
| Symmetric uplink/downlink | Asymmetric (EDGE DL >> UL) | Limited |
| Spectral efficiency | ~0.2 bps/Hz/cell | Needs 1–5 bps/Hz/cell |

</div>

<div class="fragment">

The **ITU IMT-2000** requirements defined 3G:

- **144 kbps** vehicular
- **384 kbps** pedestrian
- **2 Mbps** indoor
- Global roaming
- CS voice + PS data

</div>

---

## The 3GPP standardization

<div class="fragment">

**3GPP** (3rd Generation Partnership Project) formed in 1998 — combining ETSI, ARIB, TTC, TTA, CCSA, ATIS.

</div>

<div class="fragment">

**Release 99 (2000)** — base UMTS: WCDMA FDD, CS + PS core.

</div>

<div class="fragment">

**Release 5 (2002)** — HSDPA (14.4 Mbps DL peak).

**Release 6 (2004)** — HSUPA (5.76 Mbps UL peak).

**Release 7 (2007)** — HSPA+ (MIMO, 64-QAM DL).

</div>

<div class="fragment">

Three 3G variants deployed:
- **UMTS FDD** (WCDMA) — dominant
- **UMTS TDD** — limited
- **cdma2000** — North America, Japan, Korea

</div>

<div class="fragment">

**This chapter focuses on UMTS FDD** — the global 3G standard.

</div>

---

## The fundamental shift — TDMA to CDMA

<div class="fragment">

GSM used **TDMA** — orthogonal time slots; users don't interfere within a cell.

</div>

<div class="fragment">

UMTS uses **WCDMA** — all users share the same frequency; distinguished by **spreading codes.**

</div>

<div class="fragment">

| Aspect | GSM (TDMA) | UMTS (WCDMA) |
|---|---|---|
| Multiple access | Time slots | Spreading codes |
| Frequency reuse | Factor N (3–7) | **Factor N = 1** |
| Interference | Co-channel from other cells | **Self + co-cell** |
| Handover | Hard | **Soft** (2+ cells) |
| Power control | Slow, coarse | **Fast (1500 Hz)** |
| Receiver | Viterbi equalizer | **Rake** |

</div>

<div class="fragment">

**The most fundamental change since GSM** — not an evolution, a new PHY.

</div>

---

## §4.2 — UMTS system architecture

<div class="fragment">

Three subsystems:

**UE** — User Equipment (handset + USIM)

**UTRAN** — UMTS Terrestrial Radio Access Network

**CN** — Core Network (CS + PS domains)

</div>

<div class="fragment">

CS domain — Circuit-Switched (voice, CS data):
- **MSC**, **GMSC**, **VLR**

</div>

<div class="fragment">

PS domain — Packet-Switched (data):
- **SGSN**, **GGSN**

</div>

<div class="fragment">

Shared: **HLR**, **AuC** — same role as in GSM.

</div>

---

## UTRAN — NodeB and RNC

<div class="fragment">

**NodeB** — the base station:
- WCDMA PHY: spreading, scrambling, modulation, coding
- **Rake receiver**
- Fast power control (1500 Hz)
- Multiple cells per NodeB (typically 3 sectors)

</div>

<div class="fragment">

**RNC** — Radio Network Controller:
- Radio resource management
- **Outer-loop power control** (target SIR from BLER)
- **Soft handover** management
- Ciphering
- Controls ~50–200 NodeBs

</div>

<div class="fragment">

**Key difference from GSM:** the RNC is **not** just a BSC — it handles soft handover, which requires combining signals from multiple NodeBs.

</div>

---

## The Iur interface — UMTS's secret weapon

<div class="fragment">

**Iur** connects RNC ↔ RNC.

</div>

<div class="fragment">

**Why it matters:** a mobile can be connected to NodeBs **under different RNCs** simultaneously.

</div>

<div class="fragment">

**Scenario:** UE on a highway, moving from RNC1 → RNC2.

- **Without Iur:** hard handover at the boundary — break-before-make, ~200 ms interruption.
- **With Iur:** **soft handover survives the boundary** — no interruption.

</div>

<div class="fragment">

**The Iur interface** is what makes CDMA soft handover work across RNC boundaries.

**GSM (with $N>1$) has no equivalent** — BSC-to-BSC handover always goes through the MSC.

</div>

---

## Key interfaces

<div class="fragment">

| Interface | Between | Purpose |
|---|---|---|
| **Uu** | UE ↔ NodeB | Radio air interface |
| **Iub** | NodeB ↔ RNC | Control + traffic |
| **Iur** | RNC ↔ RNC | Soft handover, inter-RNC mobility |
| **Iu-CS** | RNC ↔ MSC | CS traffic |
| **Iu-PS** | RNC ↔ SGSN | PS traffic |

</div>

<div class="fragment">

**The Iur** is the UMTS innovation — GSM has no equivalent.

</div>

---

## Checkpoint — Why Iur matters

<div class="quiz" data-question="iur-role">
  <p class="quiz-question">What does the <strong>Iur</strong> interface enable that GSM does not have?</p>
  <button class="quiz-option" data-answer="wrong">Voice over IP</button>
  <button class="quiz-option" data-answer="correct">Soft handover across RNC boundaries</button>
  <button class="quiz-option" data-answer="wrong">Packet data services</button>
  <button class="quiz-option" data-answer="wrong">Authentication between operators</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** Without Iur, a mobile moving from RNC1 to RNC2 would need a hard handover through the MSC — with interruption. With Iur, the two RNCs combine signals via the Iur interface, so the mobile survives the RNC boundary without interruption. This is what makes UMTS soft handover work at scale.

</div>

---

## §4.3 — WCDMA physical layer

<div class="fragment">

**Frequency band:** 1920–1980 MHz uplink, 2110–2170 MHz downlink.

**Channel bandwidth:** **5 MHz** per carrier.

**Chip rate:** **3.84 Mcps** (megachips per second).

</div>

<div class="fragment">

**Why 3.84 Mcps?** Fills a 5 MHz channel with small guard. Processing gain for voice: 3.84 M / 12.2 k ≈ **315** (25 dB).

</div>

<div class="fragment">

**Duplex separation:** 190 MHz (much wider than GSM's 45 MHz).

</div>

<div class="fragment">

**Number of channels:** ~60 carriers of 5 MHz in the 60 MHz uplink band.

</div>

---

## Two layers of spreading — the key WCDMA idea

<div class="fragment">

WCDMA uses **two orthogonal layers**:

**Layer 1 — Channelization (spreading) codes:** separate physical channels **within one transmitter.**

**Layer 2 — Scrambling codes:** separate different **transmitters** (cells or UEs).

</div>

<div class="fragment">

**Channelization: OVSF codes** (Orthogonal Variable Spreading Factor).

- Tree structure, maintains orthogonality at different spreading factors
- Downlink: separates users within the cell
- Uplink: separates DPDCH from DPCCH within one UE

</div>

<div class="fragment">

**Scrambling: Gold codes** of length 38,400 chips (10 ms).

- Downlink: 512 primary scrambling codes per cell
- Uplink: assigned by RNC per UE

</div>

---

## OVSF codes — the tree

<div class="fragment">

**OVSF tree:** each code has two children, formed by replicate (child 0) or replicate-and-negate (child 1).

```
SF=1:     (1)
         /   \
SF=2:  (1,1) (1,-1)
       /  \    /   \
SF=4: ...
```

</div>

<div class="fragment">

**Rule:** a code can be used only if **neither it nor any ancestor or descendant** is in use.

**This preserves orthogonality** within the transmitter.

</div>

<div class="fragment">

**Capacity:** with SF=256, up to 256 orthogonal codes per cell. In practice ~120–180 used (rest for pilots, sync, soft handover reservations).

</div>

---

## Processing gain

<div class="fragment">

$$
\boxed{\;G = \frac{R_c}{R_b} = \frac{3.84\ \text{Mcps}}{R_b}\;}
$$

</div>

<div class="fragment">

| Service | $R_b$ | $G$ |
|---|:---:|:---:|
| Voice (AMR 12.2 kbps) | 12.2 kbps | **315** (25 dB) |
| Video (64 kbps) | 64 kbps | 60 (17.8 dB) |
| Data (384 kbps) | 384 kbps | 10 (10 dB) |
| HSPA peak (14.4 Mbps) | 14.4 Mbps | **0.27 — breaks down** |

</div>

<div class="fragment">

**The breakdown:** HSPA peak uses 16-QAM and high-rate coding, so the "spread below the chip rate" concept no longer applies. Spectral efficiency matters instead.

</div>

---

## Modulation evolution

<div class="fragment">

**UMTS R99 (baseline):**
- Downlink: **QPSK**
- Uplink: dual-channel BPSK (effectively QPSK)

</div>

<div class="fragment">

**HSPA (R5–R7):**
- Downlink: QPSK → 16-QAM (R5) → **64-QAM** (R7)
- Uplink: QPSK → 16-QAM (R6)

</div>

<div class="fragment">

**HSPA+ (R7+):**
- 64-QAM DL with 2×2 MIMO
- 16-QAM UL

</div>

<div class="fragment">

**Why not higher modulation from the start?** Constant-envelope (QPSK) is easier on the PA. Higher QAM increases PAPR — requires PA backoff — but enables much higher peak rates when SNR is good.

</div>

---

## §4.4 — The Rake receiver

<div class="fragment">

The Rake receiver is **the single most important element** of the UMTS PHY.

</div>

<div class="fragment">

**What it does:** exploits **multipath diversity** — a signal arriving via multiple paths carries redundant information.

</div>

<div class="fragment">

**Why multipath is good in WCDMA:** wideband CDMA's chip duration (~0.26 μs at 3.84 Mcps) is much shorter than typical delay spread (1–3 μs). Multipath components arrive at **chip-level delays** — distinguishable, not ISI.

</div>

<div class="fragment">

**In narrowband GSM,** the same multipath causes ISI — requires a **Viterbi equalizer**.

**In wideband WCDMA,** it becomes **diversity** — exploited by the **Rake.**

</div>

---

## The Rake concept — multiple fingers, MRC combining

<div class="fragment">

**Channel with $L$ paths:**

$$
r(t) = \sum_{l=1}^{L} \alpha_l\, s(t - \tau_l)
$$

</div>

<div class="fragment">

**Rake:** a set of **finger** demodulators, each locked to one path delay $\tau_l$.

Each finger correlates with the spreading code, delayed by $\tau_l$.

</div>

<div class="fragment">

**Combining:** **maximal-ratio combining (MRC)** — weight each finger by its path gain:

$$
\boxed{\;y = \sum_{l=1}^{L} w_l\, y_l,\quad w_l \propto \alpha_l^*\;}
$$

Combined SNR = sum of per-finger SNRs.

</div>

<div class="fragment">

**The Rake turns multipath from a problem into a benefit** — it's diversity combining at the chip level.

</div>

---

## Rake diversity gain

<div class="fragment">

**Example — 3 paths with relative powers $[0, -3, -8]$ dB:**

Linear powers: $[1, 0.501, 0.158]$. Sum = 1.659.

**Diversity gain:** $10\log_{10}(1.659) \approx$ **2.2 dB** over single-path.

</div>

<div class="fragment">

**For $L$ equal-power paths:** SNR gain = $10\log_{10}(L)$ dB.

- $L = 2$: 3.0 dB
- $L = 3$: 4.77 dB
- $L = 4$: 6.0 dB

</div>

<div class="fragment">

**In Rayleigh fading, this diversity gain is the difference between frequent dropouts and reliable connection** — the reason WCDMA works even at low per-path SNR.

</div>

---

## Finger management

<div class="fragment">

**UE typically has 3–6 fingers** (handset size and cost constrain).

**NodeB typically 4–8 per sector**, with possible multi-antenna combining.

</div>

<div class="fragment">

**Searching:** continuously scan for new multipath peaks.

**Assignment:** allocate a finger when a strong new path appears.

**Locking:** lock the finger's delay to the peak.

**Releasing:** free the finger when a path fades below threshold.

</div>

<div class="fragment">

**For large delay spread** (hilly terrain, 10–30 μs): exceeds the Rake's window → needs an **equalizer** (post-Rake).

</div>

---

## Checkpoint — Rake vs. equalizer

<div class="quiz" data-question="rake-vs-eq">
  <p class="quiz-question">Why does UMTS use a <strong>Rake receiver</strong> where GSM uses a <strong>Viterbi equalizer</strong>?</p>
  <button class="quiz-option" data-answer="wrong">WCDMA has less multipath than GSM</button>
  <button class="quiz-option" data-answer="correct">WCDMA's wide bandwidth makes multipath resolvable at chip level — diversity, not ISI</button>
  <button class="quiz-option" data-answer="wrong">The Rake is cheaper than an equalizer</button>
  <button class="quiz-option" data-answer="wrong">UMTS uses more antennas</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** GSM's 200 kHz channel has a chip/symbol duration (~3.7 μs) much longer than typical delay spread — so multipath overlaps symbols and causes ISI, needing an equalizer. UMTS's 3.84 Mcps chip duration (~0.26 μs) is shorter than typical delay spread — multipath arrives as distinguishable copies, and the Rake combines them as diversity.

</div>

---

## §4.5 — Power control — the CDMA necessity

<div class="fragment">

**The near-far problem:** in CDMA, all users share the same frequency. A strong nearby user **overwhelms** a distant weak user.

</div>

<div class="fragment">

**The goal:** each UE should arrive at the NodeB with **the same received power** — so codes can separate them cleanly.

</div>

<div class="fragment">

**Three levels of power control:**

- **Open-loop** — initial access (fast, coarse)
- **Closed-loop** — 1500 Hz (fast, fine) at the NodeB
- **Outer-loop** — 10–100 Hz at the RNC (target SIR from BLER)

</div>

<div class="fragment">

**Without power control, CDMA cell capacity collapses** — one strong user kills everyone else.

</div>

---

## Three levels of power control

<div class="fragment">

**Open-loop** — initial access.

- UE measures CPICH, estimates path loss, sets TX power accordingly.
- Not accurate (UL ≠ DL fading), but a good starting point.

</div>

<div class="fragment">

**Closed-loop** — the key to CDMA capacity.

- NodeB measures received SIR **every slot (0.667 ms)**.
- Compares to **target SIR**.
- Sends **TPC (Transmit Power Control)** command every slot: up or down by 1 dB.
- **Rate: 1500 Hz** — fast enough to track Rayleigh fading.

</div>

<div class="fragment">

**Outer-loop** — adapts the target.

- RNC monitors **BLER** over frames (100–500 ms windows).
- If BLER > target (e.g., 1%): **raise** target SIR.
- If BLER < target: **lower** target SIR.
- Adapts to service, data rate, and channel.

</div>

---

## Power control budget

<div class="fragment">

**Example — UE at cell edge, R99 voice, target SIR = 5 dB.**

NodeB measures SIR = 3 dB. Sends **TPC = "up"** every slot.

</div>

<div class="fragment">

**Rate of convergence:** 1 dB/slot × 1500 slots/s = **1500 dB/s**.

In 2 slots (1.3 ms): +2 dB → target reached.

</div>

<div class="fragment">

**The efficiency:** without precise power control, a 10 dB error in TX power for one user would rise cell interference by 10 dB → kills capacity.

With 1500 Hz fine control, each user stays near minimum TX power → capacity scales linearly.

</div>

<div class="fragment">

**This is why UMTS capacity is measured in users per cell, not in slots** — power control quality determines the effective capacity.

</div>

---

## §4.6 — Handover in UMTS

<div class="fragment">

WCDMA's $N=1$ reuse enables a unique advantage: a UE can be connected to **multiple cells simultaneously.**

</div>

<div class="fragment">

**Three types of handover:**

**Softer** — 2+ cells of the **same NodeB**

**Soft** — 2+ NodeBs (potentially under different RNCs)

**Hard** — break-before-make (inter-frequency or inter-system)

</div>

<div class="fragment">

**Soft handover is CDMA's signature advantage** — no interruption during the transition.

</div>

<div class="fragment">

**Not possible in GSM** (with $N>1$): different cells use different frequencies, so the UE cannot receive from both simultaneously.

</div>

---

## Active set and handover events

<div class="fragment">

**Active set** — the set of cells the UE is currently connected to.

**Monitored set** — cells the UE measures but is not connected to.

</div>

<div class="fragment">

**Key events (3GPP naming):**

- **Event 1A** — a CPICH enters the reporting range (candidate for adding)
- **Event 1B** — a CPICH leaves the reporting range (candidate for removing)
- **Event 1C** — a non-active cell becomes better than an active one (replace)
- **Event 2A** — best frequency change (inter-frequency)
- **Event 3A** — GSM cell becomes better than UMTS (inter-system)

</div>

<div class="fragment">

**Active set size typically limited to 4–6 cells** — wider window means more robustness but more downlink power consumed per UE.

</div>

---

## Soft handover — the sequence

<div class="fragment">

**1. Event 1A** — a monitored cell's CPICH enters the reporting window.

**2. UE sends Measurement Report** to serving RNC.

**3. RNC decides to add the cell** to the active set.

**4. Radio Link Setup** to target NodeB (via Iur if inter-RNC).

**5. Target NodeB establishes the link.**

**6. Active Set Update** sent to UE (via the serving cell).

**7. UE adds the new cell** — now receives from both.

</div>

<div class="fragment">

**Timing:** ~500–2000 ms from measurement trigger to full soft handover.

</div>

---

## Checkpoint — Soft handover window

<div class="quiz" data-question="soft-ho-window">
  <p class="quiz-question">Why is the active set typically limited to <strong>4–6 cells</strong>?</p>
  <button class="quiz-option" data-answer="wrong">Because the UE has only 4–6 antennas</button>
  <button class="quiz-option" data-answer="correct">Each additional cell consumes downlink power and codes, reducing capacity</button>
  <button class="quiz-option" data-answer="wrong">Because GSM only supports 6 cells</button>
  <button class="quiz-option" data-answer="wrong">Because the Iur interface has a 6-cell limit</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** Every cell in the active set must transmit to the UE and reserve codes for it — even if the signal is weak. Too many cells in the active set → wasted downlink power and codes → less capacity. Too few → missed soft-handover opportunity → higher drop rate.

</div>

---

## §4.7 — HSPA — the 3.5G enhancements

<div class="fragment">

**R99 UMTS** was a huge improvement over GSM, but not "broadband." HSPA brought true mobile broadband.

</div>

<div class="fragment">

**Three limiting factors of R99:**

1. **Fixed spreading factor** caps peak rate
2. **Slow scheduling** (RNC every 10–100 ms) — too slow
3. **No fast link adaptation**

</div>

<div class="fragment">

**HSPA moves key functions to NodeB** — enabling fast response (every 2 ms).

</div>

<div class="fragment">

**Collective name:** **HSPA** = HSDPA (downlink) + HSUPA (uplink).

</div>

---

## HSDPA — three innovations

<div class="fragment">

**1. Adaptive Modulation and Coding (AMC)**

- NodeB chooses modulation + coding **every 2 ms TTI**
- Uses **CQI** feedback from UE (every 2 ms)

</div>

<div class="fragment">

**2. Fast scheduling at NodeB**

- NodeB decides which UEs get the shared HS-DSCH every 2 ms
- **Proportional-fair scheduling** balances throughput and fairness
- **Multi-user diversity** — serve UEs with good channel now

</div>

<div class="fragment">

**3. HARQ with soft combining**

- Fast retransmissions (2 ms, vs. R99's 100 ms)
- **Incremental redundancy** — retransmissions add new parity
- **Chase combining** — retransmissions of same bits, MRC-combined

</div>

<div class="fragment">

**New channel: HS-DSCH** — shared, allocated dynamically to different UEs every TTI.

Uses SF=16, up to **15 parallel codes**.

</div>

---

## HSDPA peak rate derivation

<div class="fragment">

**Setup (R5):** 15 HS-PDSCH codes, SF=16, 16-QAM, rate-3/4 coding, 3.84 Mcps.

</div>

<div class="fragment">

**Per code symbol rate:**

$$
\frac{3.84\ \text{Mcps}}{16} = 240\ \text{ksym/s}
$$

</div>

<div class="fragment">

**Per code bit rate (16-QAM, 4 bits/sym):**

$$
240 \times 4 = 960\ \text{kbps}
$$

**After rate-3/4 coding:**

$$
960 \times 0.75 = 720\ \text{kbps per code}
$$

</div>

<div class="fragment">

**× 15 codes:**

$$
720 \times 15 = \mathbf{10.8\ Mbps}\ \text{(practical)}
$$

The standard's 14.4 Mbps uses rate-1 theoretical — matches.

</div>

---

## HSUPA and HSPA+

<div class="fragment">

**HSUPA (R6)** — uplink counterpart:

- **E-DCH** channel, rate controlled by NodeB
- **Fast scheduling grants** (absolute + relative)
- **HARQ** with short 2 ms TTI
- **Peak: 5.76 Mbps UL**

</div>

<div class="fragment">

**HSPA+ (R7+):**

- **64-QAM DL** (from 16-QAM)
- **2×2 MIMO** (dual-stream)
- **16-QAM UL**
- **Dual-Cell HSDPA** (R8) — 2 carriers
- **4×4 MIMO + 4-carrier** (R11)

</div>

<div class="fragment">

**Peak evolution:**

| Release | DL Peak |
|:---:|:---:|
| R5 (HSDPA) | 14.4 Mbps |
| R7 (HSPA+) | 28 Mbps |
| R8 (DC-HSDPA) | 42 Mbps |
| R11 (4×4 MIMO + DC) | **168 Mbps** |

</div>

<div class="fragment">

**The 10-year span multiplied peak DL by 11×** — through modulation, coding, MIMO, and carrier aggregation, without changing the 5 MHz carrier.

</div>

---

## Checkpoint — HSPA peak rate

<div class="quiz" data-question="hsdpa-peak">
  <p class="quiz-question">What is the <strong>HSDPA R5</strong> peak downlink rate with 15 codes, 16-QAM, and rate-3/4 coding?</p>
  <button class="quiz-option" data-answer="wrong">5.76 Mbps</button>
  <button class="quiz-option" data-answer="wrong">14.4 Mbps (that's rate-1 theoretical)</button>
  <button class="quiz-option" data-answer="correct">~10.8 Mbps (practical with rate-3/4)</button>
  <button class="quiz-option" data-answer="wrong">42 Mbps</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**The math:** 15 codes × 240 ksym/s × 4 bits/sym (16-QAM) × 0.75 (rate 3/4) = 10.8 Mbps. The 14.4 Mbps spec figure assumes rate-1 (no FEC) — practical peak is ~10.8 Mbps with realistic coding.

</div>

---

## §4.8 — Network design — coverage vs. capacity

<div class="fragment">

In CDMA, **coverage and capacity are coupled** (unlike GSM, where they were largely independent).

</div>

<div class="fragment">

**Interference margin** — the extra link budget needed as cell load increases:

$$
\boxed{\;M = -10\log_{10}(1 - \eta)\;}
$$

where $\eta$ is the load factor (fraction of pole capacity).

</div>

<div class="fragment">

| Load $\eta$ | Interference margin |
|:---:|:---:|
| 30% | 1.55 dB |
| 50% | **3.0 dB** |
| 70% | 5.2 dB |
| 90% | **10.0 dB** |

</div>

<div class="fragment">

**The trade-off:** higher load = more capacity, but smaller cell ("cell breathing").

</div>

---

## Pole capacity — the theoretical limit

<div class="fragment">

**Uplink pole capacity:**

$$
\boxed{\;N_{\text{pole}} = 1 + \frac{W/R}{(E_b/N_0)_{\text{req}} \cdot (1+i) \cdot v}\;}
$$

where:
- $W$ = chip rate (3.84 Mcps)
- $R$ = data rate
- $i$ = inter-cell interference factor (~0.5)
- $v$ = activity factor (~0.6 voice)

</div>

<div class="fragment">

**UMTS voice example:**

$G = 3.84\text{M} / 12.2\text{k} = 315$. $(E_b/N_0) = 5$ dB = 3.16.

$N_{\text{pole}} = 1 + 315 / (3.16 \cdot 1.5 \cdot 0.6) \approx 1 + 110 \approx \mathbf{111}$.

</div>

<div class="fragment">

**Realistic at 50% of pole:** ~55 voice users per cell.

</div>

<div class="fragment">

**Why 40–60% of pole:** at 100% the cell becomes unstable — interference diverges. Operators dimension for headroom.

</div>

---

## §4.9 — UMTS vs. GSM — the summary

| Aspect | GSM | UMTS |
|---|---|---|
| **Multiple access** | TDMA | **WCDMA** |
| **Chip rate** | 270.833 kbps | **3.84 Mcps** |
| **Bandwidth** | 200 kHz | **5 MHz** |
| **Reuse factor** | N (3–7) | **N = 1** |
| **Modulation** | GMSK | QPSK → 16-QAM → 64-QAM |
| **Handover** | Hard | **Soft / softer / hard** |
| **Power control** | Slow (480 ms) | **Fast (1500 Hz)** |
| **Receiver** | Viterbi equalizer | **Rake** |
| **Peak DL** | ~470 kbps (EDGE) | 168 Mbps (HSPA+ R11) |
| **Latency** | ~600 ms | **~50–100 ms** |

<div class="fragment">

**UMTS is not "GSM with faster data"** — it's a fundamentally different air interface. The migration was a decade-long, multi-billion-dollar undertaking for global operators.

</div>

---

## Checkpoint — Power control

<div class="quiz" data-question="power-ctrl-rate">
  <p class="quiz-question">What is the update rate of <strong>fast closed-loop power control</strong> in UMTS?</p>
  <button class="quiz-option" data-answer="wrong">10 Hz</button>
  <button class="quiz-option" data-answer="wrong">100 Hz</button>
  <button class="quiz-option" data-answer="correct">1500 Hz</button>
  <button class="quiz-option" data-answer="wrong">15,000 Hz</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why so fast.** Rayleigh fading at highway speed (100 km/h, 2 GHz) has a coherence time of ~2 ms — the channel changes significantly every few slots. 1500 Hz (one TPC per 0.667 ms slot) is the minimum to track it.

</div>

---

## Chapter 4 — key takeaways

<div class="fragment">

**1.** UMTS was the **3G system** defined by 3GPP — deployed as **UMTS FDD (WCDMA)** — the dominant global 3G standard.

</div>

<div class="fragment">

**2.** Architecture: **UE + UTRAN + CN**. The **Iur interface** enables soft handover across RNC boundaries — unique to UMTS.

</div>

<div class="fragment">

**3.** WCDMA PHY: **5 MHz carrier, 3.84 Mcps, OVSF + Gold codes**. Processing gain ~25 dB for voice.

</div>

<div class="fragment">

**4.** The **Rake receiver** turns multipath into diversity. For $L$ equal paths, gain $\approx 10\log_{10} L$ dB.

</div>

<div class="fragment">

**5.** **Power control** is essential — near-far problem. Three levels: open, closed (1500 Hz), outer (target SIR).

</div>

<div class="fragment">

**6.** **Soft handover** — 2+ cells simultaneously — is CDMA's signature advantage. Active set limited to 4–6 cells.

</div>

<div class="fragment">

**7.** **HSPA** (HSDPA + HSUPA) brought true mobile broadband — AMC, fast scheduling, HARQ at the NodeB. Peak 14.4 Mbps (R5) → 168 Mbps (R11).

</div>

<div class="fragment">

**8.** Network design is **interference-limited** — coverage and capacity are coupled via the load factor.

</div>

---

## Next — Chapter 5

**4G — LTE and WiMAX**

<div class="fragment">

- IMT-Advanced requirements
- **OFDMA** (downlink) + **SC-FDMA** (uplink) — the new PHY
- MIMO: spatial multiplexing, diversity, beamforming
- **LTE EPC architecture** — flat, all-IP
- LTE-Advanced: carrier aggregation, 8×8 MIMO, CoMP
- **WiMAX** — technically comparable, commercially defeated

</div>

<div class="fragment">

**The biggest air-interface shift since UMTS — CDMA to OFDMA.**

</div>

---

<aside class="notes">
  <div style="font-size: 16px; line-height: 1.6;">

**Speaker notes for the whole lecture:**

- Slides 4–7 (why UMTS, timeline, TDMA→CDMA): ~8 min. Emphasize that **TDMA → CDMA** is a fundamental change — not an evolution. Every subsequent concept (power control, Rake, soft handover) exists because of CDMA.
- Slides 8–14 (architecture): ~8 min. The **Iur interface** is the key — spend extra time on it. Without Iur, UMTS would have GSM-style hard handovers at every RNC boundary.
- Slides 15–21 (WCDMA PHY): ~10 min. Two-layer spreading (OVSF + scrambling) is confusing; draw the diagram on the board. Emphasize **why OVSF is needed**: to separate users within a cell (downlink) and channels within a UE (uplink).
- Slides 22–27 (Rake): the most important concept. Emphasize **why multipath is good here** (chip-level resolution → diversity) vs. bad in GSM (symbol-level overlap → ISI).
- Slides 28–33 (power control + handover): ~10 min. Near-far problem is the motivating concept. Walk through all three power control loops.
- Slides 34–40 (HSPA): the 3.5G evolution. HSPA's key innovation is **moving AMC/HARQ/scheduling to the NodeB** — from RNC's 100 ms to NodeB's 2 ms. This is what enabled the 14.4 Mbps peak.
- Slides 41–45 (network design + comparison): the trade-off between coverage and capacity (cell breathing) is critical. The exam will ask for pole capacity computation.

**The exam will test: processing gain, OVSF rule, Rake diversity gain, pole capacity formula, and HSPA peak rate derivation.**

  </div>
</aside>