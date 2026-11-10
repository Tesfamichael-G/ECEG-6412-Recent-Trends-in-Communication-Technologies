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

### Part II — Wired Technology Trends

MSc in Communication Engineering · Year 1, Semester I

Dr. Tesfamichael Gebregziabher

---

## Outline

<div class="fragment">

**Part 1 — Why wired still matters**

- Every wireless call is mostly wired
- Three tiers of wired infrastructure

</div>

<div class="fragment">

**Part 2 — Access loop**

- xDSL vs. DOCSIS vs. PON
- FTTH, FTTC, FWA economics

</div>

<div class="fragment">

**Part 3 — Core network**

- DWDM, OTN, IP/MPLS
- SDN/NFV, submarine cables

</div>

<div class="fragment">

**Part 4 — Distribution & backhaul**

- Carrier Ethernet
- Mobile backhaul, CPRI fronthaul, timing

</div>

<div class="fragment">

**Part 5 — Economics**

- Cost per bit: 100–1000× difference
- Fiber vs. FWA deployment

</div>

---

## Learning outcomes

<div class="fragment">

**LO1 — Explain why wireless depends on wired**

The radio is the last 100 m–1 km; everything else is fiber.

</div>

<div class="fragment">

**LO2 — Compare access-loop technologies**

xDSL, DOCSIS, PON — capacity, distance, cost.

</div>

<div class="fragment">

**LO3 — Analyse core-network capacity**

DWDM wavelength stacking; submarine cables carry 99% of international traffic.

</div>

<div class="fragment">

**LO4 — Design mobile backhaul**

Fiber vs. microwave vs. satellite; CPRI bandwidth; timing requirements.

</div>

<div class="fragment">

**LO5 — Evaluate wired vs. wireless economics**

Cost per bit; deployment trade-offs at different densities.

</div>

---

## §1 — Every wireless call is mostly wired

<div class="fragment">

```
UE ──[radio]── gNB ──[fiber]── aggregation ──[fiber]── core ──[fiber]── internet
     100 m       10 km          100 km           1000+ km
```

</div>

<div class="fragment">

The **radio link is the last 100 m–1 km.**

Everything else — **fiber** — carries the vast majority of the **distance, capacity, and cost**.

</div>

<div class="fragment">

**True of:**

- 4G/5G mobile — fiber backhaul from gNB
- WiFi — Ethernet/fiber uplink from AP
- Fixed broadband — FTTH, xDSL, DOCSIS all terminate in fiber

</div>

<div class="fragment">

**Understanding wireless networks without wired infrastructure** is like understanding city traffic by looking only at parking lots.

</div>

---

## Three tiers of wired infrastructure

<div class="fragment">

| Tier | Function | Technology | Distance |
|---|---|---|---|
| **Access loop** | Connects individual subscribers | PON, xDSL, DOCSIS | 100 m – 20 km |
| **Distribution / metro** | Aggregates access traffic | Carrier Ethernet, IP/MPLS, DWDM | 5 – 100 km |
| **Core** | Between cities / continents | DWDM, IP/MPLS, OTN | 100 – 10,000+ km |

</div>

<div class="fragment">

**Each tier** has its own economics and technology — and each has evolved dramatically in 20 years.

</div>

---

## Why wired matters in a wireless course

<div class="fragment">

**1. Mobile backhaul is the bottleneck.**

5G sites produce **10–20 Gbps peak traffic**. Backhaul often lags radio capacity by 3–5 years.

**Radio transmits more than the network can deliver.**

</div>

<div class="fragment">

**2. Fixed-mobile convergence.**

5G, WiFi, and fiber share a common core. VoWiFi uses the same IMS as VoLTE. Convergence is *wired*.

</div>

<div class="fragment">

**3. The economics of data.**

Wired cost per bit: **~$0.001/GB**. Wireless: **~$1–10/GB**.

**1000× difference** — drives WiFi offload, FMC, and fiber deployment strategy.

</div>

---

## §2 — Access loop — the last mile

<div class="fragment">

Connects each subscriber to the operator's first aggregation point.

**Historically:** copper twisted pair (phone) → coax (TV) → fiber.

</div>

<div class="fragment">

**Design constraints:**

- **Dedicated wire** per subscriber (or shared point-to-multipoint)
- **Distance-limited** by attenuation
- **Cost per subscriber dominated by trenching** — $500–$2,000 per home

</div>

<div class="fragment">

**The access loop is the most expensive part of the network** — 40–60% of total capex.

</div>

---

## xDSL vs. DOCSIS vs. PON

<div class="fragment">

| Technology | Peak rate | Distance | Sharing | Best for |
|---|:---:|:---:|:---:|---|
| **xDSL** (VDSL2/G.fast) | 100 Mbps–1 Gbps | 100 m–1.5 km | Dedicated | Reusing copper |
| **DOCSIS** (3.1) | 10 Gbps DL | 500 m–2 km | 500–2000 homes/node | Cable operators |
| **PON** (GPON / XGS) | 2.5–10 Gbps | 20 km | 32–128 subscribers | New builds, dense urban |

</div>

<div class="fragment">

**xDSL** trades distance for rate — the further from the cabinet, the slower.

**DOCSIS** is a shared medium — congestion at peak.

**PON** is passive — no field electronics, lowest maintenance cost.

</div>

---

## PON — the fiber access architecture

<div class="fragment">

```
OLT ──[fiber]── splitter 1:32 ──[fiber]── ONU (home)
```

- **OLT** — Optical Line Terminal at the exchange
- **Splitter** — passive optical device (no power, no maintenance)
- **ONU / ONT** — Optical Network Unit at the subscriber

</div>

<div class="fragment">

**Downstream 1490 nm, upstream 1310 nm, video overlay 1550 nm** (WDM).

</div>

<div class="fragment">

**The passive splitter is why PON is cheap.**

No active electronics in the field. No batteries, no cooling, no cabinet. Only the OLT (at the exchange) and the ONU (at the home) need power.

</div>

---

## PON generations and split ratios

<div class="fragment">

| Standard | Year | Downstream | Upstream | Split |
|:---:|:---:|:---:|:---:|:---:|
| **GPON** | 2003 | 2.5 Gbps | 1.25 Gbps | 1:128 |
| **XG-PON** | 2010 | 10 Gbps | 2.5 Gbps | 1:128 |
| **XGS-PON** | 2016 | 10 Gbps | 10 Gbps | 1:128 |
| **NG-PON2** | 2015 | 40 Gbps | 40 Gbps | 1:64 |
| **50G PON** | 2021+ | 50 Gbps | 25–50 Gbps | 1:32 |

</div>

<div class="fragment">

**Worked example — GPON with 1:32 split:**

Worst case (all 32 active): $2.5 / 32 =$ **78 Mbps** per user.

Realistic (60% active): $2.5 / 19 =$ **131 Mbps** per user.

</div>

<div class="fragment">

**XGS-PON with 1:32 split:**

Worst case: $10 / 32 =$ **312 Mbps** per user.

**Ample headroom** for 4K video (~25 Mbps) + multiple HD streams + web.

</div>

---

## Checkpoint — Which access technology for rural?

<div class="quiz" data-question="rural-access">
  <p class="quiz-question">A rural area has 500 homes over 30 km². Fiber trenching costs $50,000/km; a 5G FWA base station covers the area at $200,000. Which is likely cheaper per home?</p>
  <button class="quiz-option" data-answer="wrong">Fiber — always cheaper in the long term</button>
  <button class="quiz-option" data-answer="wrong">PON — passive splitters are free</button>
  <button class="quiz-option" data-answer="correct">5G FWA — the low home density doesn't amortize trenching costs</button>
  <button class="quiz-option" data-answer="wrong">xDSL — reuses existing copper</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** At ~17 homes/km², fiber trenching costs dominate: ~20 km trench × $50K = $1M, plus ONTs → ~$2,200/home. 5G FWA: ~$200K base station + $150K backhaul + $300/CPE × 500 → ~$1,000/home. **FWA wins below the ~70–80 homes/km² crossover.** Above it, fiber is cheaper and higher-capacity.

</div>

---

## FTTH vs. FTTC vs. FWA

<div class="fragment">

**Three deployment models:**

- **FTTH** — fiber to the home. 1–10 Gbps per home.
- **FTTC** — fiber to the cabinet, copper (VDSL2, G.fast) for last 100–500 m.
- **FWA** — 5G wireless to the home. 100 Mbps–1 Gbps per home.

</div>

<div class="fragment">

| Architecture | Capex / home | Peak rate | Deploy time |
|---|:---:|:---:|:---:|
| FTTC | $200–500 | 100 Mbps | Weeks |
| FTTB | $500–1000 | 500 Mbps | Months |
| FTTH | $1000–2500 | 1–10 Gbps | Months |
| 5G FWA | $500–1500 | 100 Mbps–1 Gbps | Weeks |

</div>

<div class="fragment">

**Operators deploy a mix** — FTTH in new builds and dense urban, FTTC in older areas, FWA in rural where trenching is prohibitive.

</div>

---

## §3 — Core network — the optical backbone

<div class="fragment">

**The problem:** transport **terabits per second** over **thousands of km**, with **sub-10-ms latency** and **99.999% reliability**.

</div>

<div class="fragment">

**Two technologies dominate:**

- **DWDM** — dense wavelength division multiplexing (optical transport)
- **IP/MPLS** — packet routing

</div>

<div class="fragment">

**Layered stack:**

| Layer | Technology | Function |
|---|---|---|
| L0 | Fiber | Physical medium |
| L1 | DWDM | 80+ wavelengths, 100–400 Gbps each |
| L2 | OTN | Framing, FEC, monitoring |
| L3 | IP/MPLS | Routing, traffic engineering |

</div>

---

## DWDM — the capacity multiplier

<div class="fragment">

**DWDM** transmits multiple wavelengths on one fiber — each carries an independent signal.

- **Spacing:** 50 or 100 GHz (ITU-T grid)
- **Band:** C-band (1530–1565 nm, ~35 nm → ~80 channels at 50 GHz)
- **Per-wavelength:** 100–400 Gbps (coherent detection)
- **Per fiber:** **8–32 Tbps**

</div>

<div class="fragment">

**Worked example — 100 GHz C-band:**

Channels: 4.4 THz / 100 GHz ≈ **44 channels**.

At 200 Gbps each: 44 × 200 = **8.8 Tbps** per fiber.

At 400 Gbps (coherent 64-QAM): **17.6 Tbps** per fiber.

</div>

<div class="fragment">

**Perspective:** one modern fiber pair carries the **entire traffic of a mid-sized country**.

</div>

---

## OTN, IP/MPLS, and SDN/NFV

<div class="fragment">

**OTN** — Optical Transport Network (ITU-T G.709):

- Framing, forward error correction, monitoring
- Common rates: OTU4 (111.8 Gbps), OTUCn (n×100 Gbps)

</div>

<div class="fragment">

**IP/MPLS** — carries the actual packets:

- Label switching (fast forwarding)
- Traffic engineering (explicit routes)
- VPNs, fast reroute (< 50 ms protection)

**Modern evolution:** **Segment Routing** (SR-MPLS, SRv6) — labels encode paths, no per-flow state.

</div>

<div class="fragment">

**SDN** — control plane separate from data plane. Centralized controller, programmable network.

**NFV** — network functions virtualized onto commodity servers (containers).

**Together:** the network becomes a **software platform** — new services in minutes.

</div>

---

## Submarine cables — connecting continents

<div class="fragment">

**99% of international data travels through submarine cables** — not satellites.

**~450 cables globally**, ~1.4 million km total length.

</div>

<div class="fragment">

**Modern cables:**

- **8–24 fiber pairs** per cable
- **100–250 Tbps** per cable (newer ones)
- **Repeaters** every 40–80 km (optical amplifiers)
- **Latency:** ~5 μs per km of fiber (speed of light in glass)

</div>

<div class="fragment">

**Economics:**

- Capex $100M–500M per cable
- **Cost per bit < $0.0001/GB** — the cheapest transport in the network
- Lifespan: 25 years (capacity upgrades every 5 years as coherent optics improve)

</div>

<div class="fragment">

**The "latency race":** a shorter transatlantic cable saves milliseconds off London–New York round-trip — worth billions to financial trading.

</div>

---

## §4 — Mobile backhaul — the critical link

<div class="fragment">

**Mobile backhaul** connects cell sites to the core network.

Often **the bottleneck** — radio capacity grows faster than backhaul.

</div>

<div class="fragment">

**The capacity gap:**

| Generation | Backhaul requirement / site |
|---|---|
| 2G | 2–10 Mbps |
| 3G | 50–100 Mbps |
| 4G | **500 Mbps–2 Gbps** |
| 4G (LTE-A, 3-sector, CA) | **2–6 Gbps** |
| 5G (sub-6, mid-band) | **5–10 Gbps** |
| 5G (mmWave, dense) | **10–25 Gbps** |

</div>

<div class="fragment">

**Each generation asks for 5–10× more backhaul** — often ahead of what operators can deploy.

</div>

---

## Backhaul technologies

<div class="fragment">

| Technology | Capacity | Distance | Latency |
|---|:---:|:---:|:---:|
| **Fiber** | 1–100+ Gbps | 40–80 km | ~5 μs/km |
| **Microwave** (6–42 GHz) | 100 Mbps–3 Gbps | 1–30 km (LOS) | ~3 μs/km |
| **E-band** (70/80 GHz) | 1–10 Gbps | 1–3 km (LOS) | low |
| **Satellite** (LEO) | 50–200 Mbps | global | 30–60 ms |
| **DSL** | 5–100 Mbps | 1–5 km | low |

</div>

<div class="fragment">

**Only ~20–30% of cell sites worldwide have fiber.**

The rest use **microwave** or other wireless backhaul.

</div>

<div class="fragment">

**Fiber preferred** — highest capacity, lowest latency, lowest cost per bit.

**Microwave** dominates rural — deployed in 30–60 days vs. months for fiber.

</div>

---

## Backhaul sizing — worked example

<div class="fragment">

**Setup:** 5G gNB, 3 sectors × 100 MHz (Sub-6), 64T64R massive MIMO, peak **10 Gbps per sector**.

</div>

<div class="fragment">

**Peak per site:** 3 × 10 = **30 Gbps**.

**Busy-hour average:** 40% of peak = **12 Gbps**.

**With 2× headroom for growth:** **~24 Gbps** target backhaul.

</div>

<div class="fragment">

**Fiber options:**

- 40G (4×10G) — marginal
- **100G — comfortable, future-proof**

**Microwave alternative:** 4× E-band (10 Gbps each) = 40 Gbps — viable but weather-sensitive.

</div>

<div class="fragment">

**Rule:** provision **1.5–2× busy-hour average** to allow for burst and growth.

</div>

---

## CPRI fronthaul — the fronthaul tax

<div class="fragment">

**C-RAN** (Chapter 5) splits the base station into RRH (at tower) + BBU (centralized).

The **fronthaul** carries **digitized I/Q samples** — not user data.

</div>

<div class="fragment">

**CPRI bandwidth** (per antenna stream):

$$
R_{\text{CPRI}} = f_s \cdot N_{\text{bits}} \cdot 2
$$

For LTE 20 MHz: $30.72 \text{ Msps} \times 15 \text{ bits} \times 2 = \mathbf{921.6\ Mbps}$.

</div>

<div class="fragment">

**Worked example — 3-sector, 4×4 MIMO LTE:**

Per sector: 4 antennas × 921.6 Mbps = 3.69 Gbps.

**3 sectors:** **~11 Gbps CPRI.**

</div>

<div class="fragment">

**User peak per sector: 150 Mbps.**

**CPRI is 24× the user data.** This is the "**fronthaul tax**".

</div>

<div class="fragment">

**eCPRI** reduces this by splitting the PHY between RRH and BBU — different split options give 4×–20× reduction. Essential for 5G massive MIMO.

</div>

---

## Checkpoint — Why CPRI is so large

<div class="quiz" data-question="cpri-tax">
  <p class="quiz-question">Why is <strong>CPRI fronthaul</strong> bandwidth ~24× larger than the user data it carries?</p>
  <button class="quiz-option" data-answer="wrong">Because CPRI includes encryption overhead</button>
  <button class="quiz-option" data-answer="correct">It carries raw digitized I/Q samples — not compressed user data</button>
  <button class="quiz-option" data-answer="wrong">Because the fiber is shared among many users</button>
  <button class="quiz-option" data-answer="wrong">Because CPRI carries control signalling</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** CPRI carries the **raw digitized I/Q samples** — 15 bits per I and 15 per Q at 30.72 Msps per antenna — before any demodulation, equalization, or decoding. The user data (150 Mbps) is what's left *after* all PHY processing. **The fronthaul transport carries the signal, not the information.**

</div>

---

## Timing — critical for TDD

<div class="fragment">

**TDD** uses the same frequency for uplink and downlink. Cells must align their UL/DL switches precisely.

**Requirement:** **±1.5 μs absolute time** for 5G NR TDD.

</div>

<div class="fragment">

**Where timing comes from:**

| Source | Accuracy | Notes |
|---|:---:|---|
| **GNSS** (GPS) | < 100 ns | Primary; vulnerable to jamming |
| **IEEE 1588 PTP** | < 1 μs (over fiber) | Backup; hardware timestamping needed |
| **SyncE** | < 10 ppb frequency | Frequency only |

</div>

<div class="fragment">

**The trend:** with 5G's tighter requirements and GNSS vulnerability, operators use **PTP + SyncE as primary**, GNSS as backup.

</div>

<div class="fragment">

**Without precise timing, a TDD network cannot function** — uplink bursts interfere with downlink in adjacent cells.

</div>

---

## §5 — Economics — the 1000× gap

<div class="fragment">

**Cost per bit** across access technologies:

| Technology | Cost per GB |
|---|:---:|
| **Fiber (FTTH)** | $0.001–0.01 |
| **Cable (DOCSIS 3.1)** | $0.01–0.05 |
| **xDSL (VDSL2)** | $0.02–0.10 |
| **Fixed wireless (5G FWA)** | $0.10–0.50 |
| **Mobile 4G/5G** | **$1–10** |

</div>

<div class="fragment">

**The economic implication:**

- Operators push traffic to **WiFi offload** (60–80% of smartphone data in urban areas)
- **Fixed-mobile convergence** — single core for both
- **Femtocells and small cells** — cellular at home, cheaper than macro

</div>

<div class="fragment">

**This is why mobile data is priced to discourage heavy use** — the radio spectrum is the most expensive transport.

</div>

---

## Fiber vs. FWA — worked example

<div class="fragment">

**Setup:** 200 homes in 20 km². Compare fiber vs. 5G FWA deployment cost.

</div>

<div class="fragment">

**Fiber:**

- Trench: ~15 km × $50,000/km = $750,000
- ONT: $200 × 200 = $40,000
- **Total: $790,000 → $3,950/home**

</div>

<div class="fragment">

**5G FWA:**

- 2 base stations: $80,000 × 2 = $160,000
- CPE per home: $300 × 200 = $60,000
- Backhaul: $100,000
- **Total: $320,000 → $1,600/home**

</div>

<div class="fragment">

**FWA wins at low density** (10 homes/km²).

**Fiber wins above ~70–80 homes/km²** — trenching is amortized.

**Below ~10 homes/km²** — both uneconomical; government subsidy or satellite needed.

</div>

---

## The three lessons

<div class="fragment">

**1. Wireless is the tip of the iceberg.**

Every call, every video, every sensor reading — travels mostly on **fiber**.

</div>

<div class="fragment">

**2. Backhaul is the bottleneck.**

Radio capacity grows faster than operators can deploy fiber. **Microwave + E-band** fill the gap; 5G will need more fiber everywhere.

</div>

<div class="fragment">

**3. Economics dictates architecture.**

Cost per bit (100–1000× gap) drives **WiFi offload**, **FMC**, **small cells**, and **fiber vs. FWA** choices. Every wireless design is really a wired-economics decision.

</div>

---

## Chapter summary

<div class="fragment">

**Access loop:** xDSL (copper), DOCSIS (coax), PON (fiber). **PON dominates new builds.**

</div>

<div class="fragment">

**Core:** DWDM carries 8–32 Tbps per fiber; submarine cables carry 99% of international traffic.

</div>

<div class="fragment">

**Backhaul:** fiber preferred, but only 20–30% of cell sites have it. 5G sites need 5–25 Gbps.

</div>

<div class="fragment">

**Fronthaul:** CPRI carries raw I/Q — 24× user data. eCPRI reduces it for 5G.

</div>

<div class="fragment">

**Timing:** PTP + SyncE, backed by GNSS, for TDD synchronization.

</div>

<div class="fragment">

**Economics:** 100–1000× cost-per-bit difference between wired and wireless. **Density determines which wins.**

</div>

---

## Course complete

<div class="fragment">

**ECEG-6412 — Recent Trends in Communication Technologies**

**Part I — Wireless basics:** Ch 1, Ch 2

**Part II — Wired trends:** this chapter

**Part III — Cellular:** Ch 3 (GSM), Ch 4 (UMTS)

**Part IV — Emerging:** Ch 5 (4G/LTE), Ch 6 (NGN/IoT), Ch 7 (ML)

</div>

<div class="fragment">

**The full picture:** wireless is the last hop of a mostly-wired network, and every generation pushes deeper into the wired infrastructure's capacity limits.

</div>

<div class="fragment">

**Good luck with your final examination.**

</div>

---

<aside class="notes">
  <div style="font-size: 16px; line-height: 1.6;">

**Speaker notes for the whole lecture:**

- **This is a survey chapter** — 22 slides for ~90 minutes of content. Pace yourself: 3–4 minutes per slide, don't rush.
- Slides 4–6 (the premise, three tiers): **the motivating frame**. Spend 5 min. Emphasize that "wireless is the tip of the iceberg" — students remember this.
- Slides 7–12 (access loop): ~15 min. The **PON passive splitter** is the killer insight — no power, no maintenance in the field. The split-ratio worked example shows the trade-off.
- Slide 13 (**Checkpoint 1 — rural access**): engages students. Emphasize the **crossover density** (70–80 homes/km²) — this is the "textbook" answer.
- Slides 14–18 (core + submarine): ~15 min. **DWDM worked example** — one fiber carries a country's traffic. Submarine cables: 99% of international data is a striking fact.
- Slides 19–22 (backhaul): **the core technical content**. Walk through the **backhaul sizing** and **CPRI bandwidth** examples carefully — these are the numbers the exam will test.
- Slide 23 (**Checkpoint 2 — CPRI**): test the "raw I/Q vs. user data" insight.
- Slides 24–25 (timing): brief — just emphasize **±1.5 μs requirement** and **PTP backup**.
- Slides 26–29 (economics): ~10 min. The **cost-per-bit bar chart** is the slide to remember. The fiber-vs-FWA worked example shows the density crossover.
- Slides 30–32 (three lessons): the closing summary — connect to the whole course.

**The exam likely tests:** PON split ratio calculation, DWDM capacity, backhaul sizing, CPRI bandwidth, and the cost-per-bit comparison. The **fiber vs. FWA economics** problem is a good exam question.

  </div>
</aside>