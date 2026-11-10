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

### Chapter 3 — GSM

MSc in Communication Engineering · Year 1, Semester I

Dr. Tesfamichael Gebregziabher

---

## Outline

<div class="fragment">

**Part 1 — History and design goals**

- From European fragmentation to a global standard
- The SIM card revolution

</div>

<div class="fragment">

**Part 2 — Architecture**

- MS, BSS, NSS, OSS
- GPRS additions: SGSN, GGSN

</div>

<div class="fragment">

**Part 3 — Physical layer**

- TDMA frame hierarchy
- GMSK modulation
- Burst types

</div>

<div class="fragment">

**Part 4 — Channels, speech, security**

- Logical and physical channels
- RPE-LTP speech coding
- A3/A5/A8 security

</div>

<div class="fragment">

**Part 5 — Mobility and data**

- Call flow, handover
- SMS, CSD, HSCSD, GPRS, EDGE

</div>

---

## Learning outcomes

<div class="fragment">

**LO1 — Describe GSM architecture**

MS, BSS (BTS + BSC), NSS (MSC + VLR + HLR + AuC + EIR), OSS.

</div>

<div class="fragment">

**LO2 — Compute TDMA timing and capacity**

Frame = 4.615 ms, 8 slots × 577 μs, 270.833 kbps per carrier.

</div>

<div class="fragment">

**LO3 — Explain GMSK and burst types**

Constant envelope, BT = 0.3, normal / FB / SB / AB / DB.

</div>

<div class="fragment">

**LO4 — Trace the speech coding pipeline**

RPE-LTP: 260 bits per 20 ms = 13 kbps.

</div>

<div class="fragment">

**LO5 — Describe GSM security and mobility**

A3 authentication, A5 ciphering, soft-capacity handover, call flow.

</div>

<div class="fragment">

**LO6 — Analyse 2.5G evolution**

CSD → HSCSD → GPRS → EDGE. Peak rates and why each step happened.

</div>

---

## §3.1 — From fragmentation to a common standard

<div class="fragment">

Before GSM, Europe had **five incompatible analog systems:**

**NMT** (Nordic) · **TACS** (UK) · **C-Netz** (Germany) · **Radiocom 2000** (France) · **RTMS** (Italy)

</div>

<div class="fragment">

A user traveling from Berlin to Paris had to **rent a different handset** in each country.

</div>

<div class="fragment">

**1982** — CEPT founds the **Groupe Spécial Mobile** (GSM) to design a pan-European digital system.

</div>

<div class="fragment">

Later renamed: **Global System for Mobile Communications** — the same acronym, new meaning.

</div>

---

## The GSM timeline

<div class="fragment">

**1982** — Groupe Spécial Mobile founded.

</div>

<div class="fragment">

**1987** — Memorandum of Understanding: 13 countries commit.

</div>

<div class="fragment">

**1990** — First GSM specification (Phase 1) frozen.

</div>

<div class="fragment">

**1991** — First commercial call (Radiolinja, Finland).

</div>

<div class="fragment">

**1992** — SMS introduced. **1995** — Phase 2.

</div>

<div class="fragment">

**2000** — GPRS commercial. **2003** — EDGE commercial.

</div>

<div class="fragment">

**2010s–2020s** — Still the global voice fallback; ~800 networks in 200+ countries.

</div>

---

## The design goals (ETSI, 1990)

| Goal | Requirement | GSM's answer |
|---|---|---|
| International roaming | Work in any country | Global standard; **SIM card** |
| Digital voice | Noise suppression | 13 kbps **RPE-LTP** |
| Capacity | Beat analog | **TDMA** — 8 slots/carrier |
| Security | Prevent eavesdropping | **A3 / A5 / A8** |
| Data | Support non-voice | SMS, CSD → GPRS |
| Cost | Cheap handsets | **Global scale** |
| Spectrum flexibility | Multiple bands | 900, 1800, 1900 MHz |

<div class="fragment">

**The SIM card was the killer innovation** — separating subscriber from handset.

</div>

---

## The SIM revolution

<div class="fragment">

Before GSM: handsets locked to one operator, one country.

</div>

<div class="fragment">

GSM: **Subscriber Identity Module** stores IMSI, key $K_i$, A3/A8, PIN.

</div>

<div class="fragment">

**Roaming** — put your SIM in a local handset abroad.

</div>

<div class="fragment">

**Portability** — move your subscription between phones.

</div>

<div class="fragment">

**Security** — cryptographic authentication, SIM-based.

</div>

<div class="fragment">

**Personalisation** — phonebook, SMS, preferences on the card.

</div>

---

## GSM frequency bands

<div class="fragment">

| Band | Uplink (MS→BTS) | Downlink (BTS→MS) |
|---|---|---|
| **GSM 900** | 890–915 MHz | 935–960 MHz |
| **GSM 1800** (DCS) | 1710–1785 MHz | 1805–1880 MHz |
| **GSM 1900** (PCS, Americas) | 1850–1910 MHz | 1930–1990 MHz |
| **GSM 850** (Americas) | 824–849 MHz | 869–894 MHz |

</div>

<div class="fragment">

**Duplex separation:**
- GSM 900 → 45 MHz
- GSM 1800 → 95 MHz
- GSM 1900 → 80 MHz

</div>

<div class="fragment">

**FDD everywhere.** Duplexers in UE and BTS separate uplink and downlink bands.

</div>

---

## §3.2 — GSM system architecture

<div class="fragment">

Four subsystems:

**MS** — Mobile Station (handset + SIM)

</div>

<div class="fragment">

**BSS** — Base Station Subsystem (BTS + BSC)

</div>

<div class="fragment">

**NSS** — Network and Switching Subsystem (MSC, VLR, HLR, AuC, EIR)

</div>

<div class="fragment">

**OSS** — Operation and Support Subsystem (management)

</div>

<div class="fragment">

**GPRS additions:** SGSN (Serving) + GGSN (Gateway) for packet data.

</div>

---

## Mobile Station (MS)

<div class="fragment">

**ME — Mobile Equipment**
- The handset itself
- Identified by **IMEI** (15-digit hardware serial)

</div>

<div class="fragment">

**SIM — Subscriber Identity Module**
- **IMSI** — International Mobile Subscriber Identity
  - MCC (country) + MNC (network) + MSIN (subscriber)
- **$K_i$** — 128-bit secret authentication key
- **A3 / A8** algorithms

</div>

<div class="fragment">

**MSISDN** — the phone number the world dials (+251 …). Mapped to IMSI in the HLR.

</div>

---

## Base Station Subsystem (BSS)

<div class="fragment">

**BTS — Base Transceiver Station** (the tower)
- Radio PHY: modulation, coding, ciphering
- 1–12 transceivers per site
- Timing advance, power control
- Connects to BSC via the **Abis** interface

</div>

<div class="fragment">

**BSC — Base Station Controller**
- Radio resource management
- Handover decisions
- Frequency hopping coordination
- Controls **~50–200 BTSs**
- Connects to MSC via the **A** interface

</div>

---

## Network and Switching Subsystem (NSS)

<div class="fragment">

**MSC — Mobile Switching Center** (the central switch)
- Connects BSS to PSTN and other MSCs
- Call setup, routing, inter-MSC handover

</div>

<div class="fragment">

**VLR — Visitor Location Register**
- Database co-located with MSC
- IMSI, TMSI, location area, service profile of visiting subscribers

</div>

<div class="fragment">

**HLR — Home Location Register** (master database)
- IMSI, MSISDN, subscription, current VLR

</div>

<div class="fragment">

**AuC — Authentication Center**
- Stores $K_i$; generates authentication triplets

</div>

<div class="fragment">

**EIR — Equipment Identity Register**
- IMEI white/grey/black lists

</div>

---

## GPRS — the packet-data additions

<div class="fragment">

**SGSN — Serving GPRS Support Node**
- The packet-domain analog of the MSC
- Routes packets to/from mobile in its service area
- Mobility + session management

</div>

<div class="fragment">

**GGSN — Gateway GPRS Support Node**
- Gateway to external PDNs (Internet, corporate)
- **Anchor point** for the mobile's IP session
- Allocates IP address

</div>

<div class="fragment">

**Voice + data together:** mobile has both CS (MSC) and PS (SGSN/GGSN) connections.

</div>

---

## Key interfaces

<div class="fragment">

| Interface | Between | Purpose |
|---|---|---|
| **Um** | MS ↔ BTS | Radio air interface |
| **Abis** | BTS ↔ BSC | Control + traffic |
| **A** | BSC ↔ MSC | Traffic + signalling |
| **B** | MSC ↔ VLR | Subscriber queries |
| **C** | MSC ↔ HLR | Location updates |
| **D** | HLR ↔ VLR | Inter-VLR roaming |
| **E** | MSC ↔ MSC | Inter-MSC handover |
| **Gb** | BSC ↔ SGSN | GPRS packet control |

</div>

<div class="fragment">

**The D interface** — HLR ↔ VLR — is what enables **international roaming.**

</div>

---

## Checkpoint — Which entity authenticates the subscriber?

<div class="quiz" data-question="auc-role">
  <p class="quiz-question">Which entity stores <strong>$K_i$</strong> and generates authentication triplets (RAND, SRES, $K_c$)?</p>
  <button class="quiz-option" data-answer="wrong">HLR — Home Location Register</button>
  <button class="quiz-option" data-answer="correct">AuC — Authentication Center</button>
  <button class="quiz-option" data-answer="wrong">EIR — Equipment Identity Register</button>
  <button class="quiz-option" data-answer="wrong">MSC — Mobile Switching Center</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** The AuC is paired with the HLR: the HLR holds subscription data, the AuC holds the cryptographic key $K_i$ and computes the triplets. The VLR queries the HLR, which forwards to the AuC. The $K_i$ never leaves the AuC or the SIM.

</div>

---

## §3.3 — Physical layer: TDMA timing

<div class="fragment">

Each GSM carrier is **200 kHz wide** and carries **8 users via TDMA.**

</div>

<div class="fragment">

**Gross bit rate** per carrier:

$$
R_c = 270.833\ \text{kbps}
$$

</div>

<div class="fragment">

**Timeslot (burst) duration:** 577 μs (exactly $\tfrac{15}{26}$ ms).

**TDMA frame:** 8 slots × 577 μs = **4.615 ms**.

</div>

<div class="fragment">

**The math:** 156.25 bits per burst / 577 μs = **270,833 bps**.

</div>

---

## Frame hierarchy

<div class="fragment">

| Level | Duration | Contents |
|---|:---:|---|
| **Slot** | 577 μs | One burst |
| **TDMA frame** | 4.615 ms | 8 slots |
| **Traffic multiframe** | 120 ms | 26 frames (24 TCH + SACCH + idle) |
| **Control multiframe** | 235.4 ms | 51 frames |
| **Superframe** | 6.12 s | 51 × 26 frames |
| **Hyperframe** | 3h 28m 53.76s | 2048 superframes |

</div>

<div class="fragment">

**Why 26 and 51?** They are **co-prime** — over a hyperframe (26 × 51 = 1326 frames), every traffic/control timing combination occurs exactly once.

</div>

---

## Timing advance — how GSM handles large cells

<div class="fragment">

**Problem:** a mobile at the cell edge is farther from the BTS than one nearby — its bursts arrive **later**.

</div>

<div class="fragment">

**Guard time in each slot:** 30.46 μs.

**Round-trip propagation:** 30.46 μs × c = ~9 km.

One-way cell radius: **~4.5 km** (naive limit).

</div>

<div class="fragment">

**Solution: timing advance (TA).** The BTS tells each mobile to transmit **earlier** by an amount equal to its propagation delay.

</div>

<div class="fragment">

**TA range:** 0 to 63 (each step = 1 bit = 3.69 μs), giving cell radius up to **~35 km** with extended range.

</div>

---

## Burst types

<div class="fragment">

**Normal burst (NB)** — 156.25 bits:
- 3 tail + 58 data + **26 training** + 58 data + 3 tail + 8.25 guard
- Used for traffic and most control

</div>

<div class="fragment">

**Frequency Correction Burst (FB)** — all zeros, pure tone for frequency tuning.

**Synchronization Burst (SB)** — encodes BSIC (base station identity).

</div>

<div class="fragment">

**Access Burst (AB)** — shorter (88 bits), longer guard (68.25 bits). Used on RACH (random access) before timing advance is known.

</div>

<div class="fragment">

**Dummy Burst (DB)** — fills unused slots to keep power constant.

</div>

---

## GMSK modulation — constant envelope

<div class="fragment">

**Gaussian Minimum Shift Keying** — the modulation of GSM.

</div>

<div class="fragment">

MSK is continuous-phase FSK with modulation index 0.5. **GMSK** adds a Gaussian filter to reduce spectral sidelobes.

</div>

<div class="fragment">

**Parameter: $BT = 0.3$.** The Gaussian filter's bandwidth times the bit period.

</div>

<div class="fragment">

**Spectral efficiency:** ~1.35 bps/Hz — enough to fit 270.833 kbps in 200 kHz.

</div>

<div class="fragment">

**Constant envelope:** PA operates at saturation → high efficiency → longer battery, smaller handsets.

</div>

---

## Checkpoint — Why GMSK?

<div class="quiz" data-question="gmsk-choice">
  <p class="quiz-question">Why did GSM choose <strong>GMSK</strong> instead of QPSK?</p>
  <button class="quiz-option" data-answer="wrong">GMSK has higher spectral efficiency</button>
  <button class="quiz-option" data-answer="correct">GMSK has constant envelope — power amplifier operates at saturation</button>
  <button class="quiz-option" data-answer="wrong">GMSK is simpler to demodulate</button>
  <button class="quiz-option" data-answer="wrong">GMSK works better on mmWave</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Trade-off.** GSM was designed in the 1980s, when PA efficiency dominated handset size and battery life. GMSK's constant envelope lets the PA run saturated — critical for a palm-sized phone. Modern systems (LTE/5G) use OFDM with variable envelope but recover efficiency through **digital predistortion**.

</div>

---

## §3.4 — Logical and physical channels

<div class="fragment">

**Physical channel:** one timeslot × one carrier × one frame number.

</div>

<div class="fragment">

**Logical channel:** the *information stream* (traffic, control, signalling) mapped onto physical channels.

</div>

<div class="fragment">

**Three families:**
- **TCH** — Traffic channels (voice / data)
- **CCH** — Control channels (broadcast, common, dedicated)
- **Multiplexed by frame number** — multiple logical channels share one physical channel

</div>

---

## Traffic channels

<div class="fragment">

**Full-rate TCH (TCH/F):** one slot every frame, 8 slots per carrier.

- **TCH/FS** — speech at 13 kbps
- **TCH/F9.6** — data at 9.6 kbps (CSD)
- **TCH/F4.8, TCH/F2.4**

</div>

<div class="fragment">

**Half-rate TCH (TCH/H):** one slot every **other** frame, 16 slots per carrier.

- **TCH/HS** — half-rate speech (6.5 kbps)
- **TCH/H4.8, TCH/H2.4**

</div>

<div class="fragment">

**Half-rate doubles capacity** but at lower voice quality.

</div>

---

## Control channels

<div class="fragment">

**Broadcast channels (BCH)** — downlink, one-to-many:
- **FCCH** — frequency correction (pure tone)
- **SCH** — synchronization + BSIC
- **BCCH** — system information (network identity, neighbor cells)

</div>

<div class="fragment">

**Common control channels (CCCH)** — for call setup:
- **PCH** — paging (incoming calls)
- **RACH** — random access request (uplink)
- **AGCH** — access grant (downlink)

</div>

<div class="fragment">

**Dedicated control channels (DCCH)** — per-user:
- **SDCCH** — signalling (call setup, SMS, location update)
- **SACCH** — slow associated (measurements, timing advance, power control)
- **FACCH** — fast associated (handover commands)

</div>

---

## §3.5 — Speech coding: RPE-LTP at 13 kbps

<div class="fragment">

GSM compresses 64 kbps PCM voice to **13 kbps** using **RPE-LTP**: Regular Pulse Excitation with Long-Term Prediction.

</div>

<div class="fragment">

Essentially an LPC variant with an excitation codebook.

</div>

<div class="fragment">

**The design constraint:** 13 kbps fits the 20 ms frame (260 bits) with enough room for channel coding within the 22.8 kbps gross per-slot payload.

</div>

---

## RPE-LTP pipeline

<div class="fragment">

**Step 1 — LPC analysis**
- 8 LPC coefficients per 20 ms frame
- Converted to Log Area Ratios, quantized: **36 bits**

</div>

<div class="fragment">

**Step 2 — Long-Term Prediction (LTP)**
- Removes pitch-period structure from the residual
- Lag (7 bits) + gain (2 bits) per subframe × 4 subframes = **36 bits**

</div>

<div class="fragment">

**Step 3 — Regular Pulse Excitation (RPE)**
- Residual downsampled to 13 samples, quantized at 3 bits each
- Grid position (2 bits) + 13 × 3 = **41 bits per subframe × 4 = 164 bits**

</div>

<div class="fragment">

**Total:** 36 + 36 + 164 = **236 bits** (padded to 260 with 24 bits of protection).

</div>

---

## Channel coding + interleaving

<div class="fragment">

Speech bits are **not all equal** in importance:

- **Class 1a** — 50 bits (LPC + LTP lags). Protected by CRC-3.
- **Class 1b** — 132 bits (LTP gains, RPE grids). Convolutional code rate 1/2, K=5.
- **Class 2** — 78 bits (RPE samples). Uncoded.

</div>

<div class="fragment">

**After coding:** 53 + 264 + 78 = **395 bits per 20 ms frame.**

</div>

<div class="fragment">

**Interleaving depth = 4 bursts.** Spreads burst errors across 4 TDMA frames.

</div>

<div class="fragment">

**Why interleave?** A Rayleigh fade can null one 577 μs burst — but only a fraction of each speech frame. Depth-4 interleaving distributes the corruption so the convolutional code can recover.

</div>

---

## §3.6 — GSM security

<div class="fragment">

Three cryptographic algorithms, all SIM-resident except A5 (in the handset):

</div>

<div class="fragment">

**A3 — Authentication**

SIM proves it knows $K_i$ by computing:

$$
\text{SRES} = A3(K_i, \text{RAND})
$$

Network compares to expected SRES.

</div>

<div class="fragment">

**A8 — Key derivation**

Derives ciphering key from the same $(K_i, \text{RAND})$:

$$
K_c = A8(K_i, \text{RAND})
$$

</div>

<div class="fragment">

**A5 — Encryption**

Encrypts over-the-air traffic using $K_c$ and frame number as counter.

</div>

---

## The authentication triplet

<div class="fragment">

**AuC generates for each subscriber:**

- **RAND** — 128-bit random challenge
- **SRES** — 32-bit signed response
- **$K_c$** — 64-bit ciphering key

</div>

<div class="fragment">

**Flow:**

1. VLR → HLR → AuC: request authentication for IMSI
2. AuC sends triplet back to VLR
3. VLR sends **RAND** to mobile
4. SIM computes SRES' = A3($K_i$, RAND)
5. Mobile sends SRES' to VLR
6. VLR compares SRES' with stored SRES — match → authenticated

</div>

<div class="fragment">

**The $K_i$ never leaves the SIM or AuC** — the triplet contains only derived values.

</div>

---

## Checkpoint — Which algorithm does ciphering?

<div class="quiz" data-question="a5-role">
  <p class="quiz-question">Which algorithm <strong>encrypts the over-the-air traffic</strong> in GSM?</p>
  <button class="quiz-option" data-answer="wrong">A3 — authentication</button>
  <button class="quiz-option" data-answer="wrong">A8 — key derivation</button>
  <button class="quiz-option" data-answer="correct">A5 — ciphering</button>
  <button class="quiz-option" data-answer="wrong">COMP128 — SIM routine</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Naming.** A3 authenticates (proves you are who you say). A8 derives $K_c$ (from the same triplet). A5 encrypts traffic (using $K_c$). COMP128 is a combined A3/A8 implementation on many SIMs.

</div>

---

## §3.7 — Call flow — mobile-originated

<div class="fragment">

**Step 1 — Random access.** Mobile sends Channel Request on **RACH**.

</div>

<div class="fragment">

**Step 2 — Immediate assignment.** BTS responds on AGCH with an **SDCCH** assignment.

</div>

<div class="fragment">

**Step 3 — CM Service Request.** Signalling on SDCCH.

</div>

<div class="fragment">

**Step 4 — Authentication + ciphering.** A3/A5 handshake.

</div>

<div class="fragment">

**Step 5 — Call setup.** Dialled number via SDCCH.

</div>

<div class="fragment">

**Step 6 — Traffic channel assignment.** Move to TCH, call proceeds.

</div>

<div class="fragment">

**Total time:** ~2–5 seconds from dialling to ringing.

</div>

---

## Handover — hard handover

<div class="fragment">

**Unlike UMTS**, GSM handover is **hard** — break-before-make. No soft handover possible with $N=7$ reuse.

</div>

<div class="fragment">

**Triggers:**
- **RSSI drop** — neighbor is 3–6 dB better, sustained for a window (typically 480 ms to 2 s)
- **Quality (BER) too high** even if RSSI acceptable
- **Timing advance > threshold** — mobile too far
- **Congestion** — serving cell overloaded

</div>

<div class="fragment">

**Hysteresis** prevents ping-pong handovers: the trigger condition must be sustained.

</div>

<div class="fragment">

**Total handover latency:** ~150–250 ms — brief interruption, imperceptible for voice.

</div>

---

## §3.8 — Data services — SMS, CSD, HSCSD

<div class="fragment">

**SMS — Short Message Service**
- **160 characters** of 7-bit ASCII
- Uses **signalling channels** (SDCCH) — no traffic channel needed
- **Store-and-forward** via SMSC
- $100B/yr industry globally at peak

</div>

<div class="fragment">

**CSD — Circuit-Switched Data**
- **9.6 kbps** via a TCH/F9.6 slot
- Dial-up style, billed **per minute**

</div>

<div class="fragment">

**HSCSD — High-Speed CSD**
- Uses **multiple slots** for one user
- Up to **57.6 kbps** (4 slots × 14.4 kbps)
- Billed **per slot-minute** — very expensive
- Superseded by GPRS

</div>

---

## GPRS — the packet-data revolution

<div class="fragment">

**GPRS** (General Packet Radio Service) — the **2.5G** evolution.

</div>

<div class="fragment">

**Architecture changes:**
- **SGSN** — packet routing
- **GGSN** — gateway to external PDN
- **PCU** — packet control unit at BSC

</div>

<div class="fragment">

**New coding schemes:**
- CS-1: rate 1/2, 9.05 kbps/slot
- CS-2: rate 2/3, 13.4 kbps/slot
- CS-3: rate 3/4, 15.6 kbps/slot
- CS-4: rate 1, **21.4 kbps/slot**

</div>

<div class="fragment">

**Multi-slot:** up to 8 slots → **171.2 kbps** theoretical peak.

Realistic: **20–50 kbps** per user.

</div>

<div class="fragment">

**Always-on**, **billed per MB** — not per minute. The paradigm shift that made mobile data viable.

</div>

---

## EDGE — 2.75G

<div class="fragment">

**Enhanced Data rates for GSM Evolution** — extends GPRS with higher-order modulation.

</div>

<div class="fragment">

**Key change: 8-PSK modulation** (3 bits/symbol) — vs. GMSK's 1 bit/symbol.

</div>

<div class="fragment">

**New MCS schemes (MCS-1 to MCS-9):**
- MCS-1 to 4: GMSK (backward compatible)
- MCS-5 to 9: 8-PSK

</div>

<div class="fragment">

**Peak:** 8 slots × MCS-9 = **~473 kbps** theoretical.
Realistic: **100–200 kbps** in deployment.

</div>

<div class="fragment">

**Incremental redundancy:** retransmissions carry new parity bits (combined at receiver) — more efficient than fixed retransmission.

</div>

---

## Checkpoint — GPRS vs. EDGE

<div class="quiz" data-question="edge-gain">
  <p class="quiz-question">What was the <strong>key PHY change</strong> that makes EDGE faster than GPRS?</p>
  <button class="quiz-option" data-answer="wrong">Higher chip rate</button>
  <button class="quiz-option" data-answer="correct">8-PSK modulation (3 bits/symbol vs GMSK's 1)</button>
  <button class="quiz-option" data-answer="wrong">More TDMA slots per carrier</button>
  <button class="quiz-option" data-answer="wrong">Wider carrier bandwidth</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** EDGE keeps GSM's 200 kHz carrier and 8-slot TDMA but switches from GMSK (1 bit/symbol) to **8-PSK** (3 bits/symbol) when the channel is good. The peak rate roughly triples (MCS-9 vs CS-4), at the cost of ~3–4 dB higher SNR requirement.

</div>

---

## Chapter 3 — key takeaways

<div class="fragment">

**1.** GSM unified fragmented European analog systems into a **global digital standard**.

</div>

<div class="fragment">

**2.** Architecture: **MS + BSS + NSS + OSS.** GPRS adds **SGSN + GGSN** for packet data.

</div>

<div class="fragment">

**3.** Physical layer: **200 kHz carriers**, **8 slots per TDMA frame**, 4.615 ms frame, **GMSK** modulation with $BT = 0.3$.

</div>

<div class="fragment">

**4.** Speech: **RPE-LTP at 13 kbps.** Channel coding + interleaving give robustness to Rayleigh fading.

</div>

<div class="fragment">

**5.** Security: **A3 / A5 / A8.** $K_i$ never leaves SIM/AuC. TMSI hides IMSI.

</div>

<div class="fragment">

**6.** Data evolution: CSD (9.6 kbps) → HSCSD → **GPRS** (packet, up to 171 kbps) → **EDGE** (8-PSK, up to 473 kbps). Each step reflects the shift from voice to data.

</div>

---

## Next — Chapter 4

**UMTS — the WCDMA generation**

<div class="fragment">

- The migration path from GSM (TDMA) to UMTS (CDMA)
- WCDMA physical layer: 5 MHz, 3.84 Mcps, OVSF codes
- **Rake receiver** — multipath as diversity
- **Soft handover** — CDMA's signature advantage
- Power control (open / closed / outer loop)
- HSPA: HSDPA (14.4 Mbps) and HSUPA (5.76 Mbps)

</div>

<div class="fragment">

**The biggest architectural shift since GSM — from time slots to spreading codes.**

</div>

---

<aside class="notes">
  <div style="font-size: 16px; line-height: 1.6;">

**Speaker notes for the whole lecture:**

- Slides 4–8 (history and design goals): ~5 min. Emphasize that **GSM's answers to the five AMPS limitations** drove every design decision — digital voice, TDMA, SMS, global standard, SIM card.
- Slides 9–16 (architecture): ~8 min. Walk through the three subsystems, then GPRS additions. The **D interface** (HLR ↔ VLR) is the soul of roaming — worth a minute.
- Slides 17–21 (TDMA timing + bursts + GMSK): the technical core. **Timing advance is elegant** — emphasize how GSM solves large-cell propagation with a simple timing correction.
- Slides 22–25 (channels): a quick landscape. Don't memorize the full channel map — just understand **TCH** (traffic), **BCH** (broadcast), **CCCH** (call setup), **DCCH** (per-user signalling).
- Slides 26–28 (RPE-LTP + coding): the compression story. 64 kbps → 13 kbps is 5:1 compression, achieved by exploiting **vocal-tract structure**. Channel coding then adds robustness.
- Slides 29–31 (security): A3/A5/A8 distinction. **COMP128** is a historical detail; don't dwell.
- Slides 32–34 (call flow + handover): the call flow is scripted — walk through once, don't memorize. Handover hysteresis is the key concept.
- Slides 35–38 (data): SMS, CSD, GPRS, EDGE — the four-step evolution. Emphasize that **GPRS's billing change** (per MB, always-on) is what made mobile data economically viable.

**The exam will test: TDMA bit rate computation, GMSK why-constant-envelope, RPE-LTP bit breakdown, A3/A5/A8, and GPRS/EDGE peak rates.**

  </div>
</aside>