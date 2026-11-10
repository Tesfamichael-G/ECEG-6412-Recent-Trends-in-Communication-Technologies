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

### Chapter 5 — Advanced Broadband Wireless Access & Services

MSc in Communication Engineering · Year 1, Semester I

Dr. Tesfamichael Gebregziabher

---

## Outline

<div class="fragment">

**Part 1 — The 4G vision**

- IMT-Advanced requirements
- LTE vs. WiMAX — two paths to 4G

</div>

<div class="fragment">

**Part 2 — The new PHY**

- OFDMA (downlink)
- SC-FDMA (uplink)

</div>

<div class="fragment">

**Part 3 — MIMO**

- Spatial multiplexing, diversity, beamforming
- The workhorse of 4G

</div>

<div class="fragment">

**Part 4 — LTE architecture**

- The flat, all-IP EPC
- MME, S-GW, P-GW, HSS

</div>

<div class="fragment">

**Part 5 — LTE-Advanced, WiMAX, deployment**

- Carrier aggregation, CoMP, massive MIMO
- WiMAX and the market outcome
- Network capacity and components

</div>

---

## Learning outcomes

<div class="fragment">

**LO1 — State IMT-Advanced requirements**

1 Gbps peak DL, 100 Mbps high mobility, all-IP, < 10 ms latency.

</div>

<div class="fragment">

**LO2 — Explain OFDMA and SC-FDMA**

Why LTE uses OFDMA in the downlink but SC-FDMA in the uplink.

</div>

<div class="fragment">

**LO3 — Compute LTE resource-block capacity**

100 RBs per subframe at 20 MHz; peak throughput derivation.

</div>

<div class="fragment">

**LO4 — Describe MIMO modes**

Spatial multiplexing (capacity), transmit diversity (reliability),
beamforming (coverage).

</div>

<div class="fragment">

**LO5 — Draw the LTE EPC**

eNodeB, MME, S-GW, P-GW, HSS — roles and interfaces.

</div>

<div class="fragment">

**LO6 — Compare LTE-A and WiMAX**

Peak rates, features, and why LTE won commercially.

</div>

---

## §5.1 — The 4G vision

<div class="fragment">

**4G** = the generation defined by **ITU-R IMT-Advanced** (2008).

</div>

<div class="fragment">

| Requirement | Value |
|---|---|
| Peak DL | **1 Gbps** (low mobility), 100 Mbps (high) |
| Peak UL | 500 Mbps |
| Spectral efficiency | 15 bps/Hz DL, 6.75 UL |
| Bandwidth | up to **100 MHz** (aggregated) |
| Latency (user plane) | < 10 ms |
| Latency (control) | < 100 ms |
| Mobility | up to 350 km/h |
| All-IP | Yes |
| Coexistence | with 2G/3G |

</div>

<div class="fragment">

**This is a 10× leap from 3G** — not an incremental update.

</div>

---

## Two paths to 4G

<div class="fragment">

Two standards competed:

**LTE** — 3GPP, evolved from UMTS

**WiMAX** — IEEE 802.16e/m

</div>

<div class="fragment">

**Both met the technical requirements** — similar PHY (OFDMA), similar peak rates.

</div>

<div class="fragment">

**LTE won the market** — for reasons outside technical specs:

- Ecosystem (200+ operators)
- Backward compatibility with 2G/3G
- Device scale
- Intel's exit from WiMAX (2010)

</div>

<div class="fragment">

**By 2018**: LTE carried ~70% of global mobile traffic. WiMAX was commercially dead.

</div>

---

## The 4G challenges

<div class="fragment">

**1. Spectrum scarcity** — 3G's 5 MHz carrier can't deliver 100 Mbps. 4G needed **20 MHz**, later **100+ MHz** via carrier aggregation.

</div>

<div class="fragment">

**2. Latency** — 3G's hierarchical RNC/BSC added ~50 ms. 4G removed the RNC, flattened the architecture → ~10 ms.

</div>

<div class="fragment">

**3. All-IP** — circuit switching is gone. Even voice rides on IP (VoLTE).

</div>

<div class="fragment">

**4. MIMO** — the only way to Gbps at reasonable SNR.

</div>

<div class="fragment">

**5. Flexible spectrum** — 4G must work in FDD and TDD, with variable bandwidths (1.4, 3, 5, 10, 15, 20 MHz).

</div>

---

## §5.2 — OFDMA and SC-FDMA — the new PHY

<div class="fragment">

**Why not WCDMA?**

At 100 Mbps, WCDMA hits limits:

- 5 MHz carrier can't deliver >5 bps/Hz (Shannon)
- Rake receiver becomes impractical at high chip rates
- Self-interference dominates at high SNR

</div>

<div class="fragment">

**OFDMA** = Orthogonal Frequency Division Multiple Access — a **multi-user OFDM** system.

- Bandwidth split into narrow subcarriers
- Each subcarrier allocated to a UE dynamically
- OFDM handles frequency selectivity at the **subcarrier** level

</div>

<div class="fragment">

**The right tool for high-rate broadband.**

</div>

---

## LTE resource grid

<div class="fragment">

**Subcarrier spacing:** 15 kHz (fixed in LTE).

**Resource element (RE):** 1 subcarrier × 1 OFDM symbol.

**Resource block (RB):** 12 subcarriers × 7 symbols = 84 REs, **180 kHz × 0.5 ms**.

</div>

<div class="fragment">

**Time-frequency hierarchy:**

| Level | Duration | Contents |
|---|:---:|---|
| OFDM symbol | 71.4 μs | One QAM symbol per subcarrier |
| Slot | 0.5 ms (7 symbols) | 7 symbols |
| Subframe | 1 ms (2 slots) | 14 symbols |
| Radio frame | 10 ms (10 subframes) | 20 slots |

</div>

<div class="fragment">

**Scheduler at eNodeB** allocates RBs every **1 ms** to each UE — dynamic, frequency-selective.

</div>

---

## OFDMA downlink vs. SC-FDMA uplink

<div class="fragment">

**Why the difference?**

The UE has a battery. OFDMA's **high PAPR** (10–12 dB) would require the power amplifier to back off 10 dB → very inefficient → poor coverage.

</div>

<div class="fragment">

**SC-FDMA** applies **DFT precoding** before IFFT:

$$
\text{data} \to \text{DFT} \to \text{subcarrier map} \to \text{IFFT} \to \text{CP}
$$

Result: **single-carrier signal** with PAPR ~3–6 dB. UE PA operates near saturation.

</div>

<div class="fragment">

| Property | OFDMA | SC-FDMA |
|---|---|---|
| PAPR | 10–12 dB | **3–6 dB** |
| PA efficiency | Low | **High** |
| Scheduling flexibility | **High** | Moderate |
| **Used in LTE** | **DL** | **UL** |

</div>

<div class="fragment">

**The 6 dB PAPR reduction gives ~2× uplink cell radius** — the difference between working indoors or not.

</div>

---

## Checkpoint — Why SC-FDMA in the uplink?

<div class="quiz" data-question="sc-fdma-why">
  <p class="quiz-question">Why does LTE use <strong>SC-FDMA</strong> in the uplink instead of OFDMA?</p>
  <button class="quiz-option" data-answer="wrong">SC-FDMA has higher peak data rate</button>
  <button class="quiz-option" data-answer="correct">SC-FDMA has much lower PAPR — UE power amplifier operates efficiently</button>
  <button class="quiz-option" data-answer="wrong">SC-FDMA requires no equalization</button>
  <button class="quiz-option" data-answer="wrong">SC-FDMA uses more bandwidth</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**The trade-off.** OFDMA has higher spectral flexibility (any RB allocation). SC-FDMA requires contiguous RBs, so scheduling is less flexible. But the 6 dB PAPR reduction is worth it — the UE's battery life and coverage depend on it. **Downlink uses OFDMA because the eNodeB is mains-powered.**

</div>

---

## LTE resource-block capacity

<div class="fragment">

**20 MHz carrier: 100 RBs** (180 kHz each = 18 MHz used, 2 MHz guard).

</div>

<div class="fragment">

**REs per RB per subframe:** 12 subcarriers × 7 symbols × 2 slots = 168 REs.

After reference signals, control channels, sync (~20% overhead): **~134 usable REs**.

</div>

<div class="fragment">

**Bits per RE with 64-QAM, rate-3/4:** 6 bits × 0.75 = **4.5 bits**.

**Per RB per subframe:** 134 × 4.5 = **603 bits**.

</div>

<div class="fragment">

**Per subframe per stream:** 100 RBs × 603 = **60,300 bits**.

**Per second:** 1000 subframes/s → **60.3 Mbps per stream**.

</div>

<div class="fragment">

**With 2×2 MIMO:** 2 streams → **~120 Mbps**.

Standard LTE Cat-4 spec: **150 Mbps** — close.

</div>

---

## §5.3 — MIMO — the spatial dimension

<div class="fragment">

MIMO (Multiple-Input Multiple-Output) makes gigabit wireless feasible.

</div>

<div class="fragment">

**Four modes, four use cases:**

**1. Spatial multiplexing** — multiple independent streams → linear capacity gain.

**2. Transmit diversity** — same data via orthogonal codes → reliability.

**3. Beamforming** — focus energy toward a UE → coverage.

**4. MU-MIMO** — serve multiple UEs on the same resource.

</div>

<div class="fragment">

**In rich scattering, all four can operate simultaneously** — LTE-A's 8×8 MIMO uses spatial multiplexing with beamforming.

</div>

---

## Spatial multiplexing — the capacity multiplier

<div class="fragment">

**Channel matrix:** $H$ ($N_r \times N_t$).

</div>

<div class="fragment">

**Capacity (i.i.d. Rayleigh):**

$$
\boxed{\;C = B \log_2 \det\!\left(I + \frac{\text{SNR}}{N_t}\, HH^\dagger\right)\;}
$$

At high SNR:

$$
C \approx \min(N_t, N_r) \cdot B \log_2(\text{SNR})
$$

</div>

<div class="fragment">

**2×2 MIMO at high SNR ≈ 2× the capacity of SISO.**

**4×4 ≈ 4×.**

**8×8 ≈ 8×.**

</div>

<div class="fragment">

**Why 4G achieves 100 Mbps per 20 MHz** — mostly MIMO.

</div>

---

## MIMO capacity — worked example

<div class="fragment">

**Setup:** SNR = 20 dB (linear 100), 20 MHz.

</div>

<div class="fragment">

**SISO:**

$$
C = 20\times 10^6 \times \log_2(101) \approx 133\ \text{Mbps}
$$

</div>

<div class="fragment">

**2×2 MIMO:** ~266 Mbps (2× SISO).

**4×4 MIMO:** ~532 Mbps.

**8×8 MIMO:** ~1064 Mbps.

</div>

<div class="fragment">

**Practical:** 2×2 gives ~1.7× (not quite 2× due to pilots, correlation). 4×4 gives ~3×. 8×8 is used only in dense urban.

</div>

---

## Transmit diversity and beamforming

<div class="fragment">

**Transmit diversity (Alamouti):**

For 2 antennas, transmit $x_1, x_2$ in two time slots from antenna 1, and $-x_2^*, x_1^*$ from antenna 2.

Receiver combines → **2nd-order diversity** (3 dB power gain in Rayleigh fading).

**Trade-off:** half the spatial multiplexing rate.

</div>

<div class="fragment">

**Beamforming:**

$$
\mathbf{w} = \frac{\mathbf{h}^*}{\|\mathbf{h}\|}, \quad y = \|\mathbf{h}\|\, s
$$

**Gain:** $10\log_{10}(N_t)$ dB.

- 8 antennas → 9 dB
- 64 antennas → 18 dB
- 256 antennas → 24 dB

</div>

<div class="fragment">

**Used for:** coverage extension, interference reduction, multi-user MIMO.

</div>

---

## Checkpoint — MIMO modes

<div class="quiz" data-question="mimo-mode">
  <p class="quiz-question">A UE is at <strong>0 dB SNR with one dominant path</strong>. Which MIMO mode should the eNodeB choose?</p>
  <button class="quiz-option" data-answer="wrong">Spatial multiplexing (4×4)</button>
  <button class="quiz-option" data-answer="correct">Transmit diversity (SFBC)</button>
  <button class="quiz-option" data-answer="wrong">MU-MIMO</button>
  <button class="quiz-option" data-answer="wrong">Beamforming</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** At 0 dB SNR, multi-stream detection (spatial multiplexing) would fail — no margin. And one dominant path = rank-1 channel — spatial multiplexing's gain is unavailable anyway. **Transmit diversity** (Alamouti / SFBC) sends the same data via orthogonal codes from multiple antennas → 3 dB diversity gain → the only viable option.

</div>

---

## §5.4 — LTE architecture — the flat, all-IP EPC

<div class="fragment">

LTE redesigned the core network **completely** — flat, all-IP, low latency.

</div>

<div class="fragment">

**The biggest change: the RNC is gone.**

eNodeB combines PHY + MAC + RRC + user-plane forwarding.

</div>

<div class="fragment">

| Aspect | UMTS | LTE |
|---|---|---|
| **Base station** | NodeB + RNC | **eNodeB** (all in one) |
| **Handover** | Through RNC | eNodeB ↔ eNodeB via X2 |
| **Latency** | ~50 ms | **~10 ms** |
| **Interfaces** | Iu, Iub, Iur | S1 (to core), X2 (between eNodeBs) |

</div>

<div class="fragment">

**Flat architecture = fewer nodes = lower latency.**

</div>

---

## The EPC network elements

<div class="fragment">

**eNodeB** — base station
- All radio functions (PHY, MAC, RLC, PDCP, RRC)
- **User plane:** forwards IP packets to/from S-GW
- **Control plane:** RRC signalling, bearer setup

</div>

<div class="fragment">

**MME (Mobility Management Entity)** — control plane
- NAS signalling (attach, detach, auth)
- Mobility tracking (tracking areas)
- Bearer management, handover coordination
- Security (with HSS via S6a)

</div>

<div class="fragment">

**S-GW (Serving Gateway)** — user plane
- **Anchors user plane** across handovers
- Charging, lawful interception
- **Mobility within the MME pool**

</div>

<div class="fragment">

**P-GW (Packet Data Network Gateway)** — edge of EPC
- **Allocates IP address**
- **Anchors** session to external PDNs (Internet, IMS)
- QoS enforcement, policy control (with PCRF)

</div>

<div class="fragment">

**HSS** — subscription database + authentication (like GSM HLR + AuC).

</div>

---

## Key interfaces

<div class="fragment">

| Interface | Between | Purpose |
|---|---|---|
| **Uu** | UE ↔ eNodeB | Radio |
| **S1-MME** | eNodeB ↔ MME | Control plane |
| **S1-U** | eNodeB ↔ S-GW | User plane |
| **X2** | eNodeB ↔ eNodeB | Inter-eNodeB handover |
| **S5/S8** | S-GW ↔ P-GW | EPC internal |
| **S6a** | MME ↔ HSS | Auth + subscription |
| **S11** | MME ↔ S-GW | Control within EPC |
| **Gx** | P-GW ↔ PCRF | Policy |
| **SGi** | P-GW ↔ PDN | External network |

</div>

<div class="fragment">

**The X2 interface** — between eNodeBs — is what makes flat handover possible.

</div>

---

## The EPS bearer — QoS in LTE

<div class="fragment">

**Bearer** = the basic QoS unit in LTE. Each UE has one or more bearers.

</div>

<div class="fragment">

**Default bearer** — established at attach, best-effort.

**Dedicated bearer** — on-demand for specific traffic (e.g., VoLTE).

</div>

<div class="fragment">

**QCI (QoS Class Identifier)** — 9 defined classes:

| QCI | Service | Priority |
|:---:|---|:---:|
| 1 | VoLTE | 2 |
| 5 | IMS signalling | 1 |
| 7 | Video/gaming | 7 |
| 8 | TCP web | 8 |
| 9 | Best-effort | 9 |

</div>

<div class="fragment">

**The eNodeB uses QCI** to prioritize scheduling across bearers.

</div>

---

## Checkpoint — MME vs S-GW

<div class="quiz" data-question="mme-sgw">
  <p class="quiz-question">Which EPC element <strong>anchors the user plane</strong> across eNodeB handovers?</p>
  <button class="quiz-option" data-answer="wrong">MME</button>
  <button class="quiz-option" data-answer="correct">S-GW</button>
  <button class="quiz-option" data-answer="wrong">P-GW</button>
  <button class="quiz-option" data-answer="wrong">HSS</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** When the UE moves from eNodeB1 to eNodeB2, the data path changes at the eNodeB level, but the S-GW stays the same — it **anchors** the session. Packets arriving from P-GW continue to reach the UE without interruption. **This is why LTE handovers have near-zero packet loss.**

</div>

---

## §5.5 — LTE-Advanced enhancements

<div class="fragment">

Release 8 LTE met most IMT-Advanced requirements, but true 4G (1 Gbps) needed further evolution.

</div>

<div class="fragment">

**Release 10 (LTE-Advanced):**

1. **Carrier aggregation** — 5 carriers of 20 MHz = 100 MHz total
2. **8×8 MIMO** downlink
3. **CoMP** — coordinated multipoint
4. **Relays**

</div>

<div class="fragment">

**Carrier aggregation:**

$$
B_{\text{total}} = \sum_{i=1}^{K} B_i,\quad K \le 5
$$

Types: intra-band contiguous, intra-band non-contiguous, inter-band.

</div>

<div class="fragment">

**Deployment impact:** fragmented spectrum becomes a virtual wide channel.

</div>

---

## LTE-Advanced peak rates

<div class="fragment">

**Release 10:** 100 MHz (5×CA) + 8×8 MIMO + 64-QAM → **~3 Gbps DL peak**.

**Release 12 (LTE-A Pro):** 256-QAM, enhanced CA → **~3.9 Gbps**.

**Release 13:** 32-carrier CA (including unlicensed) → **~4.5 Gbps**.

</div>

<div class="fragment">

**Peak rate evolution by release:**

| Release | DL Peak | Key feature |
|:---:|:---:|---|
| 8 (LTE) | 150 Mbps | 20 MHz, 2×2 MIMO |
| 10 (LTE-A) | 1 Gbps | 100 MHz, 8×8 MIMO |
| 12 | 3 Gbps | Enhanced CA, 256-QAM |
| 13 | 3.9 Gbps | 32-carrier CA |
| 14 | 4.5 Gbps | eLAA, feLAA |

</div>

<div class="fragment">

**30× peak improvement from Release 8 to Release 14** — in 8 years.

</div>

---

## §5.6 — WiMAX — the other 4G standard

<div class="fragment">

**WiMAX** = IEEE 802.16 family — Wireless Metropolitan Area Network.

- **802.16e** (2005) — Mobile WiMAX (OFDMA, 2048 FFT)
- **802.16m** (2011) — WiMAX 2 (IMT-Advanced)

</div>

<div class="fragment">

**PHY similar to LTE:**

| | WiMAX | LTE |
|---|---|---|
| Multiple access DL | OFDMA | OFDMA |
| Multiple access UL | **OFDMA** | SC-FDMA |
| Subcarrier spacing | 10.94 kHz | 15 kHz |
| Channel bandwidth | 1.25–20 MHz | 1.4–20 MHz |
| Frame duration | 5 ms | 10 ms |
| Duplex | **TDD-first** | FDD-first |

</div>

<div class="fragment">

**Architecture:** ASN (BS + ASN-GW) + CSN (HA, AAA, DHCP).

Fewer nodes than LTE's EPC — WiMAX is even flatter.

</div>

---

## Why WiMAX lost

<div class="fragment">

**Technical parity:** WiMAX 802.16e and early LTE were **comparable in peak rate**.

</div>

<div class="fragment">

**Ecosystem factors:**

- **LTE inherited the global GSM/UMTS operator base** (200+ operators vs. ~30 for WiMAX)
- **Dual-mode LTE devices** fall back to 2G/3G — users don't notice coverage gaps
- **Qualcomm, Apple, Samsung** built LTE chipsets, not WiMAX
- **Intel exited WiMAX in 2010** — the fatal blow
- **TDD-first WiMAX** didn't match most operators' FDD spectrum

</div>

<div class="fragment">

**By 2015**, WiMAX was commercially dead. LTE carried ~70% of global mobile traffic by 2018.

</div>

<div class="fragment">

**Legacy:** WiMAX proved OFDMA + MIMO at scale, which LTE adopted. It also influenced WiFi 4/5/6 and 5G FWA.

</div>

---

## Checkpoint — WiMAX vs LTE

<div class="quiz" data-question="wimax-lte">
  <p class="quiz-question">Why did WiMAX lose the 4G battle despite being technically comparable to LTE?</p>
  <button class="quiz-option" data-answer="wrong">WiMAX had lower peak rates</button>
  <button class="quiz-option" data-answer="wrong">WiMAX was technically superior but too expensive</button>
  <button class="quiz-option" data-answer="correct">LTE had a massive ecosystem advantage — 200+ operators, backward compatibility, dominant device support</button>
  <button class="quiz-option" data-answer="wrong">WiMAX lacked OFDMA and MIMO</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**The lesson.** In telecommunications, **ecosystem beats marginal technical advantage**. LTE inherited the global GSM/UMTS operator base and their existing spectrum. WiMAX operators had to build networks and customer bases from scratch — an economic impossibility against incumbents.

</div>

---

## §5.7 — Network capacity and design

<div class="fragment">

**Spectral efficiency** (bps/Hz/cell) — the fundamental metric.

</div>

<div class="fragment">

| System | Peak DL bps/Hz | Average DL bps/Hz |
|---|---|---|
| UMTS R99 | 0.4 | 0.5 |
| HSPA+ | 8.4 | 2 |
| LTE (2×2) | 7.5 | 3 |
| LTE-A (8×8 + CoMP) | **15** | 6 |
| 5G NR (Sub-6) | 30 | 15 |

</div>

<div class="fragment">

**Cell-edge throughput** — 5th percentile — is **10–100× worse than average.**

This is the fundamental cellular challenge.

</div>

<div class="fragment">

**CoMP, beamforming, small cells** all target cell-edge improvement.

</div>

---

## Capacity per km²

<div class="fragment">

**LTE cell example:**

20 MHz, 2.5 bps/Hz/cell → **50 Mbps per cell**.

**Site coverage:** 3 sectors × 10.4 km² per cell (2 km radius) = 31.2 km² per site.

**150 Mbps per site / 31.2 km² ≈ 4.8 Mbps/km²**.

</div>

<div class="fragment">

**LTE-A** (8×8 MIMO, CA, ~2× spectral efficiency): **~10 Mbps/km²**.

**5G NR** (mmWave, small cells, ~10× spectral efficiency): **50–100 Mbps/km²** in dense urban.

</div>

<div class="fragment">

**Densification** — more cells per km² — is the main lever for capacity.

But cost per Gbps grows nonlinearly as cell size shrinks.

</div>

---

## Radio and network components

<div class="fragment">

**Traditional base station:** RF + baseband in one box at the tower → heavy, hard to maintain, high coax loss.

</div>

<div class="fragment">

**Modern split:**

- **RRH** (Remote Radio Head) — RF + antenna at the tower top
- **BBU** (Baseband Unit) — baseband processing at the bottom or centralized
- **CPRI/eCPRI** — fiber between RRH and BBU

</div>

<div class="fragment">

**C-RAN:** BBUs from many sites centralized in a **BBU pool** at a data center.

- Statistical multiplexing of BBU processing
- Easier upgrades
- CoMP-ready

**Challenge:** fiber everywhere, CPRI latency, single point of failure.

</div>

<div class="fragment">

**Small cells** — femtocells, picocells, microcells — for capacity and coverage in specific areas.

**Backhaul** — fiber, microwave, E-band, satellite.

</div>

---

## Chapter 5 — key takeaways

<div class="fragment">

**1.** 4G (IMT-Advanced) requires **1 Gbps peak DL, 100 Mbps high mobility, all-IP, < 10 ms latency.** LTE-A and WiMAX both meet it technically; LTE won the market.

</div>

<div class="fragment">

**2.** **OFDMA** (DL) + **SC-FDMA** (UL) replace WCDMA. OFDMA for flexibility, SC-FDMA for UE power efficiency.

</div>

<div class="fragment">

**3.** **LTE resource block** = 12 subcarriers × 7 symbols × 0.5 ms = 180 kHz × 0.5 ms. 100 RBs in 20 MHz.

</div>

<div class="fragment">

**4.** **MIMO** is the workhorse — spatial multiplexing gives linear capacity gain, transmit diversity gives reliability, beamforming gives coverage.

</div>

<div class="fragment">

**5.** **EPC** is flat and all-IP — eNodeB, MME, S-GW, P-GW, HSS. Latency < 10 ms (vs. 50 ms in UMTS).

</div>

<div class="fragment">

**6.** **LTE-Advanced** adds carrier aggregation (100 MHz), 8×8 MIMO, CoMP, relays — pushing peak to 3 Gbps.

</div>

<div class="fragment">

**7.** **WiMAX** was technically comparable but lost to LTE's ecosystem — 200+ operators, backward compatibility, device scale.

</div>

<div class="fragment">

**8.** **Network capacity** depends on spectral efficiency, cell-edge, and density. Cell-edge is 10–100× worse than average — the fundamental cellular challenge.

</div>

---

## Next — Chapter 6

**NGN — Bluetooth, ZigBee, WiFi, UWB, 5G, IoT**

<div class="fragment">

- Bluetooth Classic vs. BLE
- ZigBee mesh for sensor networks
- WiFi 4/5/6/7 — the OFDMA evolution
- UWB — cm-precision positioning
- LPWAN — LoRa, NB-IoT, Sigfox
- 5G use cases (eMBB, URLLC, mMTC), 5GC, network slicing, MEC

</div>

<div class="fragment">

**The wireless ecosystem beyond cellular — the "everything else."**

</div>

---

<aside class="notes">
  <div style="font-size: 16px; line-height: 1.6;">

**Speaker notes for the whole lecture:**

- Slides 4–7 (4G vision, IMT-Advanced, two paths): ~8 min. Emphasize the **10× leap** from 3G — 100 Mbps high-mobility, 1 Gbps peak, < 10 ms latency.
- Slides 8–14 (OFDMA, SC-FDMA): the biggest PHY change since UMTS. Emphasize **why SC-FDMA in the uplink** — the ~6 dB PAPR saving = ~2× cell radius. This is a non-obvious design choice students often miss.
- Slides 15–20 (MIMO): the capacity multiplier. The **capacity formula** is worth deriving on the board. Emphasize the four modes and when to use each.
- Slides 21–25 (EPC architecture): the flat, all-IP core. The **S-GW anchors handovers** — this is critical to understanding why LTE has ~zero packet loss during handover (vs. UMTS).
- Slides 26–30 (LTE-Advanced): carrier aggregation, 8×8 MIMO, CoMP. Show the **5-carrier CA** example in detail.
- Slides 31–34 (WiMAX): the parallel standard, and why it lost. This is a **business lesson** — technical parity is not enough.
- Slides 35–38 (network design): spectral efficiency, capacity per km², cell-edge. Emphasize that **cell-edge is 10–100× worse than average** — CoMP, beamforming, and small cells all target this.
- Slides 39–41 (radio/network components): RRH/BBU/C-RAN — how modern 4G/5G is deployed. Emphasize the **fronthaul tax** (CPRI bandwidth ~30× the user data).

**The exam will test: OFDMA vs. SC-FDMA reasons, LTE resource block calculation, MIMO capacity formula, EPC elements, and carrier aggregation peak rate.**

  </div>
</aside>