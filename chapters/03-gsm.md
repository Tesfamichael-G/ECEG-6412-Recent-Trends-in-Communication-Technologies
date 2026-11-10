# Chapter 3 — GSM

!!! abstract "Chapter at a glance"
    **Contact hours:** 3 lecture · **Home study:** 7 h · **Part III — Wireless network trends**
    
    **Coverage (syllabus):** system architecture · the physical layer · logical
    and physical channels · data and services · 2.5G basics (HSCSD, GPRS, EDGE,
    EGPRS).

---

## Learning outcomes

By the end of this chapter you should be able to:

1. Trace the **historical development of GSM** — from the 1982 Groupe Spécial
   Mobile to a 200+ country standard.
2. Draw and describe the **GSM system architecture** — MS, BSS, NSS, OSS, and the
   GPRS additions (SGSN, GGSN).
3. Compute **TDMA timing** — frame, slot, and burst durations — and identify the
   8 slots per 200 kHz carrier.
4. Describe the **GMSK physical layer** — pulse shaping, spectral efficiency, and
   the Gaussian filter's role.
5. Distinguish **logical channels** (traffic, control, signalling) and their
   **physical channel mappings** in the TDMA frame.
6. Explain the **speech coding pipeline** — 13 kbps RPE-LTP, its computation, and
   its contribution to GSM's spectral efficiency.
7. Describe **GSM security** — SIM, A3/A5/A8 algorithms, authentication, and
   encryption.
8. Trace **call setup** for mobile-originated and mobile-terminated calls.
9. Describe the **handover** procedure — types, triggers, and time budget.
10. Compute **HSCSD, GPRS, and EDGE** throughput and compare with GSM CSD at
    9.6 kbps.

---

## 3.1 Historical context and design goals

### 3.1.1 From fragmentation to a common standard

Before GSM, Europe had **five incompatible analog systems**:

- **NMT** (Nordic Mobile Telephony) — Scandinavia
- **TACS** (Total Access Communication System) — UK
- **C-Netz** — Germany
- **Radiocom 2000** — France
- **RTMS** — Italy

A user traveling from Berlin to Paris had to rent a different handset for each
country. The **Conference of European Postal and Telecommunications Administrations**
(CEPT) founded the **Groupe Spécial Mobile** (**GSM**, later renamed *Global System
for Mobile Communications*) in **1982** to design a pan-European digital system.

**Timeline:**

- **1982 — Groupe Spécial Mobile** founded at CEPT.
- **1987 — Memorandum of Understanding** — 13 countries commit to GSM.
- **1990 — First GSM specification** frozen (Phase 1).
- **1991 — First commercial GSM call** (Radiolinja, Finland).
- **1992 — SMS** introduced.
- **1995 — Phase 2** adds enhancements and GPRS standardization begins.
- **2000 — GPRS** commercial deployment (**2.5G**).
- **2003 — EDGE** commercial (**2.75G**).
- **2017 — Last 2G only networks** phased out; GSM still in operation for
  voice fallback in many countries through the 2020s.

### 3.1.2 Design goals

GSM's designers set twelve explicit goals (ETSI 1990). The most important:

| Goal | Requirement | GSM solution |
|---|---|---|
| **International roaming** | Work in any European country | Common standard; SIM card decouples subscriber from handset |
| **Digital voice** | Noise, echo, and interference suppression | 13 kbps RPE-LTP speech coding |
| **Capacity** | Exceed analog cellular | TDMA — 8 slots per 200 kHz carrier |
| **Security** | Prevent eavesdropping | A3 authentication, A5 encryption |
| **Data** | Support non-voice services | SMS, circuit-switched data, later GPRS |
| **Cost** | Inexpensive handsets | Economies of scale (global standard) |
| **Frequency flexibility** | Multiple bands | 900, 1800, 1900 MHz variants |
| **Compatibility with ISDN** | Interface to fixed network | 64 kbps voice coding (transcoded) |
| **Spectral efficiency** | Fit more users per MHz | Compressed digital voice; frequency hopping |

**The SIM card was the killer innovation.** Before GSM, each handset was locked
to one operator and one country. GSM separated the *subscriber identity module*
(SIM) from the handset, enabling:

- **Roaming** — put your SIM in a local handset abroad.
- **Portability** — move your subscription between phones.
- **Secure authentication** — the SIM stores the secret key $K_i$.
- **Service personalization** — phonebook, SMS, preferences on the SIM.

### 3.1.3 GSM frequencies

GSM operates in multiple bands, adding bands over the generations:

| Band | Uplink (MS → BTS) | Downlink (BTS → MS) | Region |
|---|---|---|---|
| **GSM 900** (primary) | 890–915 MHz | 935–960 MHz | Europe, Asia, Africa |
| **GSM 1800** (DCS) | 1710–1785 MHz | 1805–1880 MHz | Europe, Asia |
| **GSM 1900** (PCS) | 1850–1910 MHz | 1930–1990 MHz | Americas |
| **GSM 850** | 824–849 MHz | 869–894 MHz | Americas |

**Duplex separation:**

- **GSM 900:** 45 MHz
- **GSM 1800:** 95 MHz
- **GSM 1900:** 80 MHz

FDD requires **duplexers** in the mobile and base station — filters that separate
uplink and downlink bands (distinct from TDD systems, which share one band for
both directions with a time switch).

---

## 3.2 System architecture

GSM splits its architecture into three subsystems plus a management overlay:

- **MS** — Mobile Station (handset + SIM).
- **BSS** — Base Station Subsystem (BTS + BSC).
- **NSS** — Network and Switching Subsystem (MSC, VLR, HLR, AUC, EIR).
- **OSS** — Operation and Support Subsystem (management).

With GPRS (2.5G), two additional packet-switched nodes are inserted:

- **SGSN** — Serving GPRS Support Node.
- **GGSN** — Gateway GPRS Support Node.

### 3.2.1 Mobile Station (MS)

**Mobile Equipment (ME)** — the handset itself. Identified by:

- **IMEI** — International Mobile Equipment Identity — a 15-digit hardware serial
  (stored in the handset, not the SIM).
- **IMSI** — International Mobile Subscriber Identity — stored on the SIM.
- **MSISDN** — the phone number the world dials to reach the subscriber.

**Subscriber Identity Module (SIM)** — a smart card containing:

- **IMSI** — unique subscriber identifier (up to 15 digits): MCC + MNC + MSIN.
  - MCC = Mobile Country Code (3 digits, e.g., 310 = USA, 262 = Germany, 231 = Ethiopia).
  - MNC = Mobile Network Code (2–3 digits).
  - MSIN = Mobile Subscriber Identification Number.
- **$K_i$** — the 128-bit authentication key.
- **A3, A8 algorithms** — used for authentication and key derivation.
- **PIN/PUK** — user authentication codes.
- **Phonebook, SMS** storage (optional).

**The SIM's role in security:**

1. **Subscriber authentication** — the network challenges the SIM; the SIM responds
   using $K_i$ and the A3 algorithm.
2. **Key generation** — the A8 algorithm derives the ciphering key $K_c$.
3. **Encryption** — $K_c$ is used by A5 to encrypt the traffic and signalling.

### 3.2.2 Base Station Subsystem (BSS)

**Base Transceiver Station (BTS)** — the radio equipment in each cell.

- Transmits and receives on the GSM air interface.
- Handles **modulation, channel coding, interleaving, ciphering** (in some
  configurations, ciphering is done in BTS or BSC).
- Houses 1–12 transceivers (TRXs), each one a **carrier** with 8 slots.
- Manages **timing advance, power control** for each mobile.
- Connected to the **BSC** via the **Abis interface**.

**Base Station Controller (BSC)** — controls multiple BTSs.

- **Radio resource management** — channel allocation, handover decisions.
- **Frequency hopping** coordination.
- **Power control** (slow, at the BSC).
- **Transcoding** (in some architectures, TRAU is placed at BSC or MSC).
- Connects to the **MSC** via the **A interface**.

**Typical BSS configuration:**

- One BSC controls **~50–200 BTSs**.
- One BTS covers one cell, typically 1–35 km radius (depending on terrain and
  antenna height).

### 3.2.3 Network and Switching Subsystem (NSS)

The NSS is the "core network" — a circuit-switched network modeled on the PSTN.

**Mobile Switching Center (MSC)** — the central switch of the NSS.

- Connects the BSS to the PSTN and other MSCs.
- Handles **call setup, routing, handover between MSCs**.
- Interfaces to the HLR and VLR for subscriber data.
- Also called **GMSC** (Gateway MSC) when it interfaces to the external network.

**Visitor Location Register (VLR)** — a database co-located with each MSC.

- Stores the **IMSI, TMSI, location area, service profile** of every visiting
  subscriber (roamers + home subscribers).
- **TMSI** (Temporary IMSI) — a 4-byte pseudonym assigned on location update,
  used for privacy (IMSI only transmitted rarely).
- Updated when the mobile registers in a new location area.

**Home Location Register (HLR)** — the master database of home subscribers.

- Stores **IMSI, MSISDN, subscription info, current VLR** (where the subscriber is
  currently registered), service profile.
- Consulted at every call/ SMS for the subscriber.
- One per operator per country (typically).

**Authentication Center (AuC)** — a database paired with the HLR.

- Stores the $K_i$ for each subscriber.
- Generates **authentication triplets** (RAND, SRES, $K_c$) on demand.
- Never transmits $K_i$ over the air.

**Equipment Identity Register (EIR)** — database of handset IMEIs.

- **White list** — valid IMEIs.
- **Grey list** — permitted IMEIs under surveillance.
- **Black list** — stolen handsets; refused service.

### 3.2.4 GPRS additions

For packet data (2.5G), two new nodes:

**Serving GPRS Support Node (SGSN)** — the packet-domain analog of the MSC.

- Routes packets to/from the mobile in its service area.
- Handles mobility management, session management, authentication, ciphering.
- Interacts with the GSM MSC/VLR for combined attach (voice + data).

**Gateway GPRS Support Node (GGSN)** — the gateway to external packet data
networks (Internet, corporate networks).

- Acts as the **anchor point** for the mobile's IP session — the mobile's IP
  address is managed here.
- Routes packets between the SGSN and external PDN via **Gi** interface.
- Similar in role to a **P-GW** in 4G EPC (or **UPF** in 5G).

### 3.2.5 Interfaces

The GSM standard defines named interfaces between the subsystems:

| Interface | Between | Purpose |
|---|---|---|
| **Um** | MS ↔ BTS | Radio air interface |
| **Abis** | BTS ↔ BSC | Base station control, 16 kbps signalling or 64 kbps traffic |
| **A** | BSC ↔ MSC | Traffic and signalling, 64 kbps per voice channel |
| **B** | MSC ↔ VLR | Subscriber queries |
| **C** | MSC ↔ HLR | Subscriber location updates |
| **D** | HLR ↔ VLR | Inter-VLR roaming |
| **E** | MSC ↔ MSC | Inter-MSC handover |
| **F** | MSC ↔ EIR | IMEI validation |
| **G** | VLR ↔ VLR | Between visited locations |
| **Gb** | BSC ↔ SGSN | Packet control (GPRS) |
| **Gn** | SGSN ↔ GGSN | GPRS intra-PLMN |
| **Gi** | GGSN ↔ PDN | External data network |

### Worked example 3.1 — subscriber identity decomposition

**IMSI = 231 02 1234567890123:**

- **MCC = 231** — Ethiopia.
- **MNC = 02** — Ethio Telecom (or a specific operator; historical).
- **MSIN = 1234567890123** — subscriber identification.

**MSISDN = +251 91 234 5678:**

- **CC = +251** — Ethiopia country code.
- **NDC = 91** — mobile network code (part of the national number).
- **SN = 234 5678** — subscriber number.

The mapping from MSISDN to IMSI is done in the HLR — the HLR holds both, and a
mobile-originated call to the MSISDN is translated to the IMSI before paging.

### Worked example 3.2 — one MSC's subscriber capacity

**Assumptions:**

- One MSC serves **100 BTSs**, each with **6 TRXs** (transceivers).
- Each TRX carries **8 voice channels** (the 8 TDMA slots).
- **80% of channels are typically available for voice** (rest reserved for
  signalling, control, and paging).

**Total voice channels:** $100 \times 6 \times 8 \times 0.8 = 3840$.

**Erlang capacity** (from Erlang-B, at 2% blocking):

For 3840 channels total → per-cell = $6 \times 8 \times 0.8 = 38.4$ channels per cell.

Using Erlang-B for 38 channels at 2% blocking: **~29.5 Erlangs per cell**.

At 25 mErlangs per voice user (typical during busy hour), that's **~1180 users
per cell** — but a cell can only house ~1000–1500 in practice due to paging
and mobility constraints.

**MSC capacity:** typical MSCs handle **100k–1M subscribers** and **10k–100k
simultaneous calls**. A single MSC with 3840 channels can support ~1500 Erlangs
of traffic, or **~60,000 subscribers** at 25 mErlang each.

---

## 3.3 Physical layer

### 3.3.1 Frequency bands and carrier structure

Each **carrier** is **200 kHz wide** in the allocated band. For GSM 900:

- **Uplink:** 890–915 MHz (25 MHz) → **124 carriers** (200 kHz spacing).
- **Downlink:** 935–960 MHz (25 MHz) → **124 carriers**.
- **Duplex spacing:** 45 MHz.

**Number of carriers:**

$$
\boxed{\;N_c = \frac{B_{\text{total}}}{0.2\ \text{MHz}} = \frac{25}{0.2} = 125\ \text{(including 1 guard)}\;}
$$

So **124 usable carriers** in GSM 900 (or 125 in practice with the top-of-band
guard considered in some variants).

### 3.3.2 TDMA frame structure

Each 200 kHz carrier is shared by **8 users** via TDMA. The carrier's total
bit rate is:

$$
\boxed{\;R_c = 270.833\ \text{kbps}\quad(\text{approximately } 271\ \text{kbps})\;}
$$

Wait — that's the **gross** bit rate on the air interface. Each slot's useful bit
rate is $270.833 / 8 = 33.85$ kbps, but only ~22.8 kbps is available for the
traffic channel (the rest is guard, training, and overhead).

**Frame hierarchy:**

| Level | Duration | Contents |
|---|:---:|---|
| **Timeslot (burst)** | 577 μs (15/26 ms) | One burst |
| **TDMA frame** | 8 × 577 μs = **4.615 ms** | 8 slots, one per user |
| **26-frame multiframe** | 26 × 4.615 = **120 ms** | 26 frames (traffic + SACCH) |
| **51-frame multiframe** | 51 × 4.615 = **235.4 ms** | 51 frames (control) |
| **Superframe** | 51 × 26 frames = **6.12 s** | Multiframe × multiframe |
| **Hyperframe** | 2048 superframes = **3 h 28 m 53.76 s** | Frame number wraps |

!!! tip "Why 26 and 51?"
    Traffic channels use a 26-frame multiframe (24 traffic + 1 idle + 1 SACCH).
    Control channels use a 51-frame multiframe. The two are co-prime (26 and 51
    share only factor 1), so over a hyperframe of 26 × 51 = 1326 frames, all
    combinations of traffic and control timing occur exactly once.

### Worked example 3.3 — TDMA timing

**Frame duration:** 4.615 ms.
**Slot duration:** 577 μs.
**Bit rate:** 1/0.577 ms per slot ÷ 156.25 bits per slot = 270.833 kbps.

Compute: 156.25 bits / 577 μs = **270,833 bits/s** ✓.

**Guard time per slot:** 30.46 μs. **Propagation budget:** 30.46 μs × 3×10⁸ m/s
= **~9.1 km** of propagation, but split between uplink and downlink (round trip),
so **~4.5 km** one-way — roughly the max GSM cell radius. Real GSM cells rarely
exceed 35 km, achieved via **timing advance** (the mobile transmits earlier so
its burst arrives exactly at the BTS slot).

### 3.3.3 Burst types

GSM defines **five burst types**, each with a specific purpose:

**Normal burst (NB)** — for traffic and most control channels. 156.25 bits:

| Field | Length (bits) | Purpose |
|---|:---:|---|
| Tail | 3 | Synchronization ramp-up |
| Data | 58 | Encrypted voice/data |
| Training sequence | 26 | Channel estimation (8 known sequences) |
| Data | 58 | Encrypted voice/data |
| Tail | 3 | Synchronization ramp-down |
| Guard | 8.25 | Inter-burst guard |

**Total:** 3 + 58 + 26 + 58 + 3 + 8.25 = **156.25 bits**.

**Frequency correction burst (FB)** — for initial frequency synchronization.
All-zeros content, causing a pure tone in the GSM spectrum.

**Synchronization burst (SB)** — for timing and frame number recovery. Contains
a 64-bit training sequence encoding the **BSIC** (base station identity code).

**Access burst (AB)** — for **random access** (RACH). Shorter (88 bits) with a
longer guard time (68.25 bits) to accommodate unknown propagation delay — this is
how the mobile requests a channel without yet knowing its timing advance.

**Dummy burst (DB)** — fills unused slots (when no real transmission is queued),
keeping the carrier at constant power.

### 3.3.4 Modulation — GMSK

**Gaussian Minimum Shift Keying** (GMSK) is the modulation used on the GSM air
interface.

**MSK** is continuous-phase FSK with modulation index 0.5 — spectrally efficient
but the sidelobes are still too wide for a 200 kHz channel.

**GMSK** adds a **Gaussian lowpass filter** on the modulating signal:

$$
\boxed{\;h(t) = \frac{\sqrt{2\pi}}{\ln 2}\,B\, \exp\!\left(-\frac{2\pi^2 B^2 t^2}{\ln 2}\right)\;}
$$

where **$B$** is the Gaussian filter's 3 dB bandwidth and **$BT$** is the
normalized bandwidth (T = symbol period). GSM uses **$BT = 0.3$**.

**Trade-off:**

- **Smaller $BT$** → smoother spectrum, smaller sidelobes, but **more ISI**.
- **$BT = 0.3$** → -70 dB sidelobes at ±400 kHz (well inside the 200 kHz channel), but with ISI that is corrected by the Viterbi equalizer in the receiver.

**Spectral efficiency:** GMSK at $BT = 0.3$ achieves **1.35 bps/Hz** — enough
for the ~33.85 kbps per slot to fit inside 200 kHz.

**Why GMSK over QPSK for GSM?** GMSK has **constant envelope** — the power
amplifier can operate at saturation without distortion, giving high power
efficiency. Critical in the 1990s for battery life and handset cost. Modern
systems (LTE, 5G) use **OFDM with variable envelope** but rely on **digital
predistortion** of the PA to correct for non-linearity.

### Worked example 3.4 — GMSK spectral occupancy

For $BT = 0.3$ and $R_s = 270.833$ kSps:
- The main lobe extends to $\pm R_s/2 = \pm 135$ kHz — a total of 270 kHz.
- But the spectrum only needs to fit the **200 kHz** channel; the tails beyond
  are suppressed to -70 dB, satisfying the spectrum mask.

**If $BT$ were 0.5 (higher):** broader spectrum → adjacent-channel interference
violations. If $BT = 0.2$: narrower spectrum but more ISI, harder equalization.

$BT = 0.3$ is the sweet spot for GSM.

---

## 3.4 Logical and physical channels

**Physical channels** are the actual transmission resources — one **timeslot** on
one **carrier frequency** at one **frame number**. The 8 slots in each frame are
numbered 0–7; the physical channel is uniquely identified by (frequency, frame
number, slot number).

**Logical channels** are the *information streams* that use those physical
channels. Multiple logical channels can share one physical channel (multiplexed
by frame number).

### 3.4.1 Traffic channels (TCH)

Carry voice or data. Two main types:

**Full-rate TCH (TCH/F)** — one slot per frame, 8 slots total per carrier.

- **TCH/FS** — speech at 13 kbps (RPE-LTP).
- **TCH/F9.6** — data at 9.6 kbps (CSD — circuit-switched data).
- **TCH/F4.8** — data at 4.8 kbps.
- **TCH/F2.4** — data at 2.4 kbps.

**Half-rate TCH (TCH/H)** — one slot every other frame, 16 slots per carrier.

- **TCH/HS** — speech at 6.5 kbps (half-rate codec).
- **TCH/H4.8** — data at 4.8 kbps.
- **TCH/H2.4** — data at 2.4 kbps.

Half-rate doubles capacity (16 users per carrier) but at lower voice quality.

### 3.4.2 Control channels (CCH)

**Broadcast channels (BCH)** — downlink only, one-to-many:

| Channel | Function |
|---|---|
| **FCCH** (Frequency Correction CH) | Emits a pure tone — mobile tunes its frequency |
| **SCH** (Synchronization CH) | Frame timing and BSIC |
| **BCCH** (Broadcast Control CH) | System information — network identity, channel list, neighbor cells, LAI |

**Common control channels (CCCH)** — for call setup and paging:

| Channel | Direction | Function |
|---|---|---|
| **PCH** (Paging CH) | Downlink | Pages the mobile for incoming calls |
| **RACH** (Random Access CH) | Uplink | Mobile requests channel (random-access) |
| **AGCH** (Access Grant CH) | Downlink | Grants a channel in response to RACH |

**Dedicated control channels (DCCH)** — bidirectional, per-mobile:

| Channel | Function |
|---|---|
| **SDCCH** (Standalone DCCH) | Signalling while not on traffic channel (call setup, SMS, location update) |
| **SACCH** (Slow Associated DCCH) | Measurement reports, timing advance, power control during a call |
| **FACCH** (Fast Associated DCCH) | Fast signalling — steals traffic frames for handover commands |

### 3.4.3 Physical channel mapping

Each logical channel occupies specific timeslots in specific frames:

- **FCCH:** slot 0 of frame 0, 10, 20, 30, 40 of the 51-frame multiframe (once per ~5 frames).
- **SCH:** slot 0 of frame 1, 11, 21, 31, 41 (immediately after each FCCH).
- **BCCH:** slots 2, 3, 4, 5 of specific frames in the 51-frame multiframe.
- **CCCH (PCH, RACH, AGCH):** slots 0, 2, 4, 6 of specified frames, shared dynamically.
- **TCH:** one full slot per frame per user (8 slots per carrier).

**The 26-frame multiframe** for traffic:

- Frames 0–11: 12 TCH bursts
- Frame 12: SACCH
- Frames 13–24: 12 TCH bursts
- Frame 25: idle (for measuring neighbor cells)

So a full-rate user gets **24 TCH + 1 SACCH out of 26 frames** — 92.3% of
dedicated time is traffic.

### Worked example 3.5 — signalling overhead of SACCH

**SACCH transmission rate:** 1 burst per 26 frames (every 120 ms).
**SACCH capacity:** 114 bits per burst (the two 57-bit data fields).

So **~950 bps** of signalling bandwidth per user — plenty for measurement reports
(6 neighbor BTS RSSI values, 6-bit each, sent twice per second) plus timing
advance and power control commands.

**Why the overhead is worth it:** without SACCH, the network could not perform
handover decisions based on the mobile's measurements — the mobile would drop
calls at cell boundaries. 8% overhead is cheap for the mobility it enables.

---

## 3.5 Speech coding — RPE-LTP

GSM compresses 64 kbps PCM voice down to **13 kbps** using **Regular Pulse Excitation
with Long-Term Prediction** (RPE-LTP), which is essentially a form of **Linear
Predictive Coding** (LPC) with an excitation codebook.

### 3.5.1 Why 13 kbps?

**Design rationale:**

- **13 kbps** is the natural output of RPE-LTP at a 20 ms frame rate: **260 bits**
  per 20 ms frame (13 kbps = 260 bits / 20 ms).
- **20 ms** frames fit nicely into the TDMA timing: one frame every 4 slots.
- **8 kbps** (half-rate) requires more complex coding (VSELP) — delayed to Phase 2.
- **16 kbps** would have been more comfortable but exceeded the channel design
  budget: **22.8 kbps gross per slot**, of which **13 kbps speech + 9.8 kbps FEC**.

### 3.5.2 The RPE-LTP pipeline

**Input:** 8 kHz × 13-bit linear PCM.

**Step 1 — Pre-processing.** Offset compensation (DC removal) and pre-emphasis
(first-order highpass, coefficient 0.86).

**Step 2 — LPC analysis.** Per 20 ms frame:

- Compute autocorrelation for lags 0–8.
- Solve Yule–Walker (Levinson–Durbin) → **8 LPC coefficients** $a_1, \ldots, a_8$.
- Convert to **Log Area Ratio (LAR)** for quantization — 6, 6, 5, 5, 4, 4, 3, 3 bits = **36 bits**.

**Step 3 — Short-term analysis filter.** Use the LPC coefficients to **whiten**
the signal (compute prediction error). What's left is the residual — roughly the
glottal source.

**Step 4 — Long-term prediction (LTP).** Analyze the residual for pitch-period
correlation:

- **LTP lag** — the lag with maximum autocorrelation (typically 20–140 samples
  for $F_0$ = 60–400 Hz). **7 bits** per subframe.
- **LTP gain** — the correlation coefficient. **2 bits** per subframe.
- Four subframes per 20 ms frame → **36 bits** total for LTP.
- Long-term analysis filter removes the pitch-period structure from the residual.

**Step 5 — RPE analysis.** The remaining signal is split into **4 subframes** of
5 ms each (40 samples). For each subframe:

- Downsample to 13 samples at spacing 3.
- Select the best of **4 grid positions** — 2 bits per subframe.
- Quantize the 13 residual samples (3 bits each) — 39 bits per subframe.
- Grid position (2 bits) + samples (39 bits) = **41 bits × 4 subframes = 164 bits**.

**Step 6 — Bit packing.** Total per 20 ms frame:

| Component | Bits |
|---|:---:|
| LPC parameters (LARs) | 36 |
| LTP parameters | 36 |
| RPE parameters | 164 |
| **Total** | **236** |
| **Padding** | 24 |
| **Total frame** | **260** |

**260 bits × 50 frames/s = 13 kbps.** ✓

### 3.5.3 Channel coding and interleaving

The 260 bits per 20 ms frame are not all equal in importance. GSM splits them:

- **Class 1a** — 50 bits: LPC coefficients and LTP lags. **Protected with CRC** (3-bit parity — 53 bits total).
- **Class 1b** — 132 bits: LTP gains and RPE grid positions. **Convolutional-coded** (rate 1/2, K=5).
- **Class 2** — 78 bits: RPE samples. **Uncoded** (errors tolerable).

**Total after coding:** $53 + 132 \times 2 + 78 = \textbf{378}$ bits per 20 ms frame
— protected but now 25% larger than the raw 260.

**Interleaving.** To combat **burst errors** from fading, the 378 coded bits are
spread across **8 bursts** (8 consecutive TDMA frames):

- Each burst carries 2 × 57 = 114 bits.
- 378/114 ≈ **3.3 bursts** worth of coded data per 20 ms frame.
- Interleaving depth = **4** (bits from 4 consecutive frames are mixed in each
  burst), which distributes a burst error across 4 frames.

**Why interleave?** A **Rayleigh fade** can null out one burst (577 μs = 20 ms
frame at $f_D$ ~ 100 Hz gives $f_D T_s \ll 1$) — without interleaving, the whole
20 ms speech frame would be lost. With depth-4 interleaving, a burst error
becomes small errors in 4 frames, correctable by the convolutional code.

### Worked example 3.6 — interleaving latency

**Interleaving depth 4 bursts** → 4 × 577 μs = **2.3 ms** per block.

**Actual end-to-end delay contribution:**

- **Speech coding:** 20 ms frame (wait for frame to fill).
- **Interleaving:** 2.3 ms (wait for enough bits).
- **Deinterleaving at receiver:** 2.3 ms.
- **Speech decoding:** 20 ms.

Total speech path delay ~**50 ms** — plus network and transcoding, GSM calls have
~200–300 ms end-to-end latency. This is why GSM is not great for interactive
voice but acceptable for conversational calls.

---

## 3.6 Security

GSM was the first commercial cellular system with comprehensive security. The
architecture uses three cryptographic algorithms, all stored in the SIM (except
A5, which is in the handset):

### 3.6.1 A3 — authentication

**Purpose:** prove the SIM is genuine (knows $K_i$) without transmitting $K_i$.

**Flow:**

1. When the mobile registers, the VLR requests authentication from the AuC via
   the HLR.
2. The AuC generates a random number **RAND** (128 bits), and computes:
   - **SRES** = A3($K_i$, RAND) — 32-bit Signed RESponse.
   - **$K_c$** = A8($K_i$, RAND) — 64-bit ciphering Key.
3. The AuC sends the triplet **(RAND, SRES, $K_c$)** to the VLR.
4. The VLR sends RAND to the mobile.
5. The SIM computes SRES' = A3($K_i$, RAND) and sends SRES' back.
6. The VLR compares SRES' to SRES. If they match, authentication succeeds.

**Security property:** a passive eavesdropper sees RAND and SRES but cannot derive
$K_i$ or predict future SRES values (A3 is a one-way function).

### 3.6.2 A8 — key derivation

**A8($K_i$, RAND) = $K_c$** — generates the 64-bit ciphering key for A5.

The A3 and A8 algorithms are often **combined** into a single routine **COMP128**
in deployed SIMs. COMP128 was famously broken (Briceno et al., 1998) — an attacker
with physical access to a SIM can extract $K_i$ in ~8 hours. Subsequent SIMs
use **COMP128-2** and **COMP128-3**, which are much harder to break.

### 3.6.3 A5 — encryption

**A5** encrypts the over-the-air traffic using the ciphering key $K_c$ and a
**frame number** as a counter. Multiple A5 variants exist:

| Variant | Key length | Status |
|---|---|---|
| A5/0 | None | No encryption (some countries export restrictions) |
| A5/1 | 64 bits | Strong (used in Europe) — but broken in 2009 (KARSTEN attack) |
| A5/2 | 64 bits (weaker) | Export version — broken in 1999 |
| A5/3 | 64 bits | Based on KASUMI (3GPP); used in 3G and GSM upgrades |
| A5/4 | 128 bits | Extended version of A5/3 |

**Practical status:** A5/1 is still widely deployed but considered weak; A5/3
(or A5/4) is the modern recommendation for any network still running GSM.

### 3.6.4 What GSM's security does NOT cover

- **SIM cloning** — if $K_i$ is extracted, the SIM can be cloned (mitigated by
  modern SIM architectures).
- **IMSI catching** — a fake base station can page the mobile to reveal its IMSI
  (mitigated by **TMSI** — most paging uses the temporary identity).
- **Denial of service** — jamming attacks are trivial.
- **Location tracking** — the network always knows the mobile's location area.

Modern 4G/5G improve on these with **stronger ciphers**, **mutual authentication**
(both ends authenticate), and **SUPI/SUCI** (encrypted subscriber ID).

### Worked example 3.7 — authentication triplet exchange

**Mobile is powered on in a new country** (roaming):

1. **Attach.** The mobile sends **IMSI** or **TMSI** to the visited MSC/VLR.
2. **VLR queries HLR** — "new subscriber 231-02-xxx has appeared in my area."
3. **HLR → AuC** — authentication request for that IMSI.
4. **AuC generates 5 triplets** (RAND, SRES, $K_c$) → sends to VLR via HLR.
5. **VLR → mobile:** RAND.
6. **Mobile → VLR:** SRES' = A3($K_i$, RAND).
7. **VLR verifies** SRES' = SRES.
8. **VLR assigns TMSI** to hide IMSI in future paging.
9. **Mobile does Location Update** — HLR updated with new VLR address.

Now any incoming call to MSISDN → HLR lookup → VLR in the visited country →
MSC pages the mobile. **Roaming works** — the whole point of GSM.

---

## 3.7 Call flow

### 3.7.1 Mobile-originated (MO) call

The user dials a number. Sequence:

1. **Random access.** Mobile sends **Channel Request** on **RACH**. Contains a
   random reference + reason (call origination).
2. **Immediate assignment.** BTS responds on **AGCH** with an **SDCCH** assignment.
3. **CM Service Request** on SDCCH — the mobile requests call setup.
4. **Authentication.** MSC/VLR authenticates the mobile (A3/A5).
5. **Ciphering mode** set up (A5 handshake).
6. **Call setup.** Mobile sends the dialed number (SETUP) via SDCCH. MSC allocates
   a traffic channel (TCH).
7. **Assignment to TCH.** Mobile moves to the assigned TCH (SDCCH released).
8. **Alerting.** MSC routes the call to the PSTN or another mobile; when the called
   party answers, ringing stops, call begins.
9. **Conversation on TCH.** Audio flows both directions. SACCH carries measurement
   reports in the background.
10. **Disconnect and release.** When a party hangs up, MSC initiates release.

**Time from RACH to audible call setup:** ~2–5 s.

### 3.7.2 Mobile-terminated (MT) call

Someone dials the mobile's MSISDN:

1. **HLR lookup.** The calling network's GMSC queries the HLR "where is MSISDN?"
2. **HLR returns** the current VLR's MSC address.
3. **GMSC routes** the call to that MSC.
4. **Paging.** The MSC/VLR pages the mobile on PCH across all cells in its
   location area (LA).
5. **Paging response.** Mobile responds on RACH, then SDCCH.
6. **Authentication + ciphering** as in MO.
7. **Call setup** (SETUP message) — the mobile accepts or rejects.
8. **Assignment to TCH.**
9. **Alerting.** Mobile rings (ringing tone back to caller).
10. **Call accepted** when user picks up.

**Time:** ~3–10 s depending on paging delay and routing.

### Worked example 3.8 — paging load in a location area

**Scenario:** A location area (LA) covers **100 BTSs**. Each BTS has 6 TRXs and
carries 8 slots of PCH capacity (shared with RACH/AGCH).

**Incoming call rate:** 1000 calls/hour to mobile subscribers in this LA.

**Paging capacity:** each PCH burst carries ~2-4 IMSIs. Per BTS, ~8 slots per
51-frame multiframe → **~8 × 4 = 32 IMSIs per ~235 ms** = ~136 IMSIs/sec per BTS.

**Total paging capacity:** 100 BTSs × 136 = **13,600 IMSIs/sec** — vastly exceeds
the 0.28 calls/sec (1000/hour) requirement.

**Why LA size matters:**

- **Smaller LA** → less paging load per BTS, but **more frequent location updates**
  (each LA crossing triggers update signalling).
- **Larger LA** → less update signalling, but more paging load on every BTS.

GSM operators typically choose LA size (100–500 cells) based on a trade-off
between paging and update load.

---

## 3.8 Handover

**Handover** (handoff in North America) — transferring a mobile's connection from
one cell/BTS/BSC/MSC to another as it moves.

### 3.8.1 Types of handover

**Within BSS** (same BSC):

- **Intra-cell** — same BTS, different channel (usually due to interference).
- **Inter-cell** — different BTS, same BSC.

**Between BSS** (different BSC, same MSC):

- **Intra-MSC** — controlled by the MSC.

**Between MSC:**

- **Inter-MSC** — anchored at the original MSC (unless mobile is handed back).

### 3.8.2 Handover triggers

The mobile continuously measures:

- **Serving cell** RSSI and quality (via SACCH).
- **Neighbor cells** RSSI — up to 32 in the neighbor list (from BCCH).

The BSC compares **serving** vs. **neighbor** measurements. Handover is triggered
if:

$$
\boxed{\;\text{RSSI}_{\text{neighbor}} > \text{RSSI}_{\text{serving}} + H_{\text{margin}}\quad\text{for}\quad T_{\text{window}}\;}
$$

where $H_{\text{margin}}$ (typically 3–6 dB) and $T_{\text{window}}$ (typically
a few SACCH intervals, 480 ms to 2 s) are the **hysteresis** and **time window** —
preventing ping-pong handovers.

Also triggered by:

- **Quality (BER) too high** even if RSSI is acceptable.
- **Timing advance > threshold** — mobile is too far from the BTS.
- **Congestion** — serving cell is overloaded, offload to neighbor.
- **Distance / power budget** — mobile too far from a microcell.

### 3.8.3 Handover procedure (intra-MSC)

1. **Measurement.** Mobile sends SACCH reports (2×/sec) with neighbor RSSI.
2. **Decision.** BSC decides handover is needed.
3. **Handover request.** BSC → MSC (Handover Required).
4. **Channel allocation.** MSC asks the target BSC for a channel.
5. **Handover Command.** MSC → serving BSC → mobile.
6. **Synchronization.** Mobile tunes to new channel, sends Handover Access bursts.
7. **New channel established.** Mobile transmits on the target.
8. **Release.** Serving BSC releases the old channel.

**Time:** typically **150–250 ms** — brief interruption, imperceptible for voice.

### Worked example 3.9 — handover timing budget

**Serving cell RSSI = -85 dBm, neighbor = -80 dBm.**
**Margin $H$ = 5 dB, window $T = 480$ ms (2 SACCH intervals).**

**Trigger condition:** neighbor − serving > 5 dB sustained for 2 SACCH.
At the moment measured: −80 − (−85) = 5 dB — just meets margin, but must be
sustained for 480 ms.

**Handover decision:** after 480 ms of sustained difference.

**Handover execution:** 150 ms signalling + 50 ms synch.

**Total latency:** ~680 ms from trigger condition being met to new channel active.

**Why not handover immediately?** Because at 5 dB margin, the difference is barely
significant — noise and shadowing can flip it. Waiting for the window filters
noise; otherwise the mobile would hand over every 100 ms as RSSI fluctuates.

---

## 3.9 Data services

### 3.9.1 SMS (Short Message Service)

SMS was an afterthought — designed into GSM Phase 1 for testing, not as a
marketed service. Yet it became a **massive** revenue source (~$100B/year
globally at peak).

**Technical details:**

- **160 characters** of 7-bit ASCII (or 70 characters of 16-bit Unicode).
- Transported via **signalling channels** — no traffic channel required.
- The **SMSC** (Short Message Service Center) is a store-and-forward server.
- Delivery: MO-SMS (mobile → SMSC) then MT-SMS (SMSC → mobile).
- Uses the **SDCCH** — you can send SMS during a call or with no call active.

**Why 160 characters?** The signalling payload for SMS was 140 bytes (from
existing SDCCH signalling capacity), giving 160 × 7-bit characters.

### 3.9.2 Circuit-Switched Data (CSD)

**CSD** — original GSM data service, defined in Phase 1.

- **9.6 kbps** data rate (matching the fixed telephone network's typical rate).
- Uses a **TCH/F9.6** channel (one full-rate slot).
- **Dial-up style** — the mobile establishes a circuit to a modem at the other end.
- Billed **per unit time**, like a voice call.

**Limitations:**

- **Inefficient** — one user occupies one slot continuously.
- **Slow** — 9.6 kbps is modem-era speed.
- **Circuit-switched** — wasteful for bursty data (internet traffic).
- **Billed per minute** — expensive for email/web.

### 3.9.3 HSCSD (High-Speed Circuit-Switched Data)

**Idea:** use **multiple slots** for one user to increase CSD speed.

**Speeds:**

- **Standard CSD:** 1 slot → 9.6 kbps.
- **HSCSD with 4 slots** (with 14.4 kbps coding): **57.6 kbps**.
- **Theoretical max** with all 8 slots: ~115 kbps.

**Standards:**

- **TCH/F9.6** — 9.6 kbps per slot, standard coding.
- **TCH/F14.4** — 14.4 kbps per slot, enhanced coding.

**Why HSCSD failed:** **expensive** (still circuit-switched, billed per slot-minute
— 4× the cost of CSD) and **wasteful** (blocking 4 slots for one user is terrible
for network capacity). It was superseded by GPRS almost immediately.

### 3.9.4 GPRS (General Packet Radio Service) — 2.5G

**GPRS** brought **packet-switched** data to GSM — the real game-changer.

**Core architectural changes:**

- **SGSN** (Serving GPRS Support Node) — routes packets to/from the mobile.
- **GGSN** (Gateway GPRS Support Node) — gateway to external PDN (Internet).
- **PCU** (Packet Control Unit) — added to BSC; separates packet from circuit
  traffic.

**Radio interface changes:**

- **New channels:** **PDTCH** (Packet Data Traffic CH), **PACCH** (Packet
  Associated Control CH), **PBCCH** (Packet BCCH).
- **New coding schemes:**
  - **CS-1:** rate 1/2, 9.05 kbps/slot.
  - **CS-2:** rate ~2/3, 13.4 kbps/slot.
  - **CS-3:** rate ~3/4, 15.6 kbps/slot.
  - **CS-4:** rate 1 (no coding), 21.4 kbps/slot.

**Multi-slot capability:** up to **8 slots downlink**, **8 slots uplink** (usually
asymmetric — e.g., 4 DL + 1 UL for typical smartphone traffic).

**Theoretical peak rate:** 8 × CS-4 = **171.2 kbps** (downlink).

**Practical peak:** typically **20–50 kbps** per user in real deployments
(depending on coding scheme, contention, and network load).

**Always-on** — the mobile keeps a **PDP context** (session) active, and packets
flow without a setup per-transaction (unlike CSD).

**Billing** — **per volume** (per MB), not per minute. This was the paradigm
shift that made mobile data economically viable.

### Worked example 3.10 — GPRS throughput calculation

**Scenario:** GPRS multislot class 10 (4 DL slots, 2 UL slots), CS-2 coding
(13.4 kbps/slot). Network load allows 80% of slots.

**Downlink:** 4 × 13.4 × 0.8 = **42.9 kbps**.
**Uplink:** 2 × 13.4 × 0.8 = **21.4 kbps**.

**Real-world throughput:** After RLC/MAC retransmissions and contention, expect
**~25–35 kbps** — roughly 3× better than CSD, but not enough for real mobile
internet. GPRS was always a stopgap.

### 3.9.5 EDGE (Enhanced Data rates for GSM Evolution) — 2.75G

**EDGE** extends GPRS with **higher-order modulation** and **incremental redundancy**.

**PHY changes:**

- **8-PSK modulation** (3 bits/symbol) — triples the bit rate per symbol over GMSK (1 bit/symbol).
- **New modulation and coding schemes (MCS-1 to MCS-9):**
  - MCS-1 to MCS-4: GMSK (backward compatible with GPRS).
  - MCS-5 to MCS-9: 8-PSK.

**Theoretical peak:** 8 slots × MCS-9 = **473.6 kbps** (EGPRS, downlink).
**Practical:** typically **100–200 kbps** in real deployments.

**Incremental redundancy (IR):** instead of fixed-code retransmissions, retransmissions
carry **additional parity bits** — the receiver combines original and retransmission
to decode the message. More efficient than GPRS's fixed retransmission.

### Worked example 3.11 — EDGE vs. GPRS throughput

**Same 4 DL slots, favorable conditions:**

| | GPRS (CS-4) | EDGE (MCS-9) |
|---|:---:|:---:|
| Modulation | GMSK | 8-PSK |
| Symbol rate | 270.833 kSps | 270.833 kSps |
| Bits/symbol | 1 | 3 |
| Gross rate/slot | 22.8 kbps | 69.2 kbps |
| Channel coding | none (CS-4) | ~rate 1.0 (MCS-9, minimal FEC) |
| Net rate/slot | 21.4 kbps | 59.2 kbps |
| **4-slot throughput** | **~86 kbps** | **~237 kbps** |

**The 8-PSK advantage:** triples the throughput at the cost of **~3–4 dB higher SNR**
(8-PSK is more sensitive to noise than GMSK). EDGE is used in good radio conditions
(near cell center); near the cell edge, it falls back to GMSK.

**EDGE** was the last GSM evolution before UMTS (Chapter 4) took over. Many
networks still run EDGE today for 2G fallback.

---

## 3.10 Chapter summary

1. **GSM** was designed to unify fragmented European analog systems into a **global
   digital standard**. The core innovations: digital voice, TDMA multiplexing,
   SIM-based subscriber identity, comprehensive security.
2. **System architecture:** MS (handset + SIM), BSS (BTS + BSC), NSS (MSC + VLR
   + HLR + AuC + EIR), OSS (management). GPRS adds SGSN and GGSN for packet data.
3. **Physical layer:** 200 kHz carriers, **8 slots per TDMA frame**, 4.615 ms
   frame, **GMSK** modulation with $BT = 0.3$ — constant envelope, spectrally
   efficient, robust.
4. **Burst types:** Normal (traffic/control), Frequency Correction, Synchronization,
   Access (RACH), Dummy.
5. **Logical channels:** traffic (TCH/F, TCH/H), broadcast (FCCH, SCH, BCCH),
   common (PCH, RACH, AGCH), dedicated (SDCCH, SACCH, FACCH).
6. **Speech coding:** RPE-LTP at **13 kbps** — LPC analysis, LTP pitch prediction,
   RPE residual coding, all in 260 bits per 20 ms frame.
7. **Channel coding:** split by importance (Class 1a/1b/2), convolutional code
   (rate 1/2, K=5), interleaving depth 4 — resilient to Rayleigh fading bursts.
8. **Security:** A3 authentication, A8 key derivation, A5 encryption; SIM stores
   $K_i$; TMSI hides IMSI over the air.
9. **Call flow:** MO and MT calls both use RACH → SDCCH → TCH, with authentication
   and ciphering in between. Setup takes ~2–5 s.
10. **Handover** is triggered by RSSI, quality, timing advance, or congestion —
    with hysteresis and time windows to avoid ping-pong. Intra-MSC handover takes
    ~200 ms.
11. **Data evolution:** CSD (9.6 kbps) → HSCSD (up to 57.6 kbps) → **GPRS** (packet
    data, up to 171 kbps theoretical) → **EDGE** (8-PSK, up to 473 kbps theoretical).
    Each step reflects the shift from voice-centric circuit switching toward
    packet-switched data, culminating in UMTS (Chapter 4).

---

## 3.11 Quiz

### A. Multiple choice

1. GSM uses which multiple-access scheme?
   (a) FDMA (b) TDMA (c) CDMA (d) OFDMA

2. The number of **timeslots per TDMA frame** in GSM is:
   (a) 4 (b) 8 (c) 16 (d) 26

3. The TDMA frame duration in GSM is:
   (a) 0.577 ms (b) 4.615 ms (c) 20 ms (d) 120 ms

4. Which modulation is used in GSM?
   (a) GMSK (b) QPSK (c) 8-PSK (d) 16-QAM

5. The **Gaussian filter** in GMSK has a **$BT$ product** of:
   (a) 0.1 (b) 0.3 (c) 0.5 (d) 1.0

6. The speech codec used in GSM is:
   (a) AMR-NB (b) RPE-LTP (c) G.729 (d) MP3

7. The **SIM card** primarily stores:
   (a) The phone number (b) The IMEI (c) The authentication key $K_i$
   (d) The user's contacts only

8. **Authentication** in GSM uses which algorithm?
   (a) A5 (b) A3 (c) A8 (d) A1

9. **Ciphering** on the GSM air interface uses which algorithm?
   (a) A5 (b) A3 (c) A8 (d) AES

10. **GPRS** introduces which two network nodes?
    (a) BTS, BSC (b) MSC, VLR (c) SGSN, GGSN (d) HLR, AuC

11. **EDGE** adds which modulation scheme?
    (a) 8-PSK (b) 16-QAM (c) QPSK (d) GMSK

12. **HSCSD** (High-Speed Circuit-Switched Data) achieves higher data rates by:
    (a) Higher-order modulation (b) Multiple time slots per user
    (c) Packet switching (d) Multiple antennas

### B. Fill in the blank

1. GSM 900 uses \_\_\_\_ MHz uplink and \_\_\_\_ MHz downlink.
2. The GSM \textbf{TDMA frame} has \_\_\_\_ slots of \_\_\_\_ μs each.
3. GSM's \textbf{bit rate} on the air interface is \_\_\_\_ kbps.
4. The **normal burst** contains \_\_\_\_ bits total.
5. The **SACCH** stands for Slow \_\_\_\_ Control CHannel.
6. The **channel coding** in GSM uses a \_\_\_\_ code (rate $\frac{1}{2}$, K=5).
7. The interleaving depth in GSM speech is \_\_\_\_ bursts.
8. **GPRS** theoretical peak downlink with CS-4 and 8 slots is \_\_\_\_ kbps.
9. **EDGE** theoretical peak downlink with MCS-9 and 8 slots is \_\_\_\_ kbps.
10. The **SIM card** stores the subscriber identity as \_\_\_\_ (acronym).

### C. Define / explain

1. Describe the **GSM system architecture** — MS, BSS, NSS, OSS. What are the
   primary components of each, and what is the role of each?
2. Explain **GMSK** modulation. Why is constant envelope important? What does
   $BT = 0.3$ trade off?
3. Describe the **TDMA frame structure** in GSM: frames, multiframes, superframes,
   hyperframes. Why 26 and 51?
4. Describe **three burst types** (normal, frequency correction, access) and the
   role of each.
5. Explain the **speech coding pipeline** (RPE-LTP). What are the three main
   components, and how do they contribute to the 13 kbps bit rate?
6. Describe **GSM security**: A3, A5, A8. What does each do, and what are the
   limitations of the overall scheme?
7. Trace a **mobile-originated call**. What channels are used at each step, and
   what messages flow?
8. Describe the **handover trigger** in GSM. What is the role of hysteresis?
9. Compare **CSD, HSCSD, GPRS, and EDGE** in data rate, billing, and application.
10. Explain the **SGSN and GGSN** in GPRS. What is the role of each, and how do
    they differ from the MSC?

---

## 3.12 Answer key

??? success "A. Multiple choice"
    1. **(b)** — TDMA.
    2. **(b)** — 8.
    3. **(b)** — 4.615 ms.
    4. **(a)** — GMSK.
    5. **(b)** — 0.3.
    6. **(b)** — RPE-LTP.
    7. **(c)** — the authentication key $K_i$.
    8. **(b)** — A3.
    9. **(a)** — A5.
    10. **(c)** — SGSN and GGSN.
    11. **(a)** — 8-PSK.
    12. **(b)** — multiple slots per user.

??? success "B. Fill in the blank"
    1. 890–915; 935–960.
    2. 8; 577.
    3. 270.833 (approximately 271).
    4. 156.25.
    5. Associated.
    6. convolutional.
    7. 4.
    8. 171.2.
    9. 473.6.
    10. IMSI.

??? success "C. Define / explain — model answers"
    1. *Architecture:* MS (Mobile Station) = handset + SIM, user equipment. BSS
       (Base Station Subsystem) = BTS (radio transceiver in each cell) + BSC (controls
       many BTSs). NSS (Network and Switching Subsystem) = MSC (switch) + VLR (visitor
       database) + HLR (home database) + AuC (authentication) + EIR (equipment registry).
       OSS (Operation and Support Subsystem) = network management. GPRS additions:
       SGSN (packet routing in service area) + GGSN (gateway to external PDN).
    2. *GMSK:* FSK modulation with Gaussian-filtered baseband signal. *Constant
       envelope:* the signal amplitude is constant, so the power amplifier can operate
       at saturation → high power efficiency → important for mobile battery life.
       *$BT = 0.3$:* trade-off between spectral occupancy (smaller $BT$ = narrower
       spectrum, less adjacent channel interference) and intersymbol interference
       (smaller $BT$ = more ISI). 0.3 is the sweet spot that fits in a 200 kHz channel
       while keeping ISI manageable (corrected by the Viterbi equalizer).
    3. *Frame structure:* 8 slots per TDMA frame (4.615 ms). 26 frames = one 120 ms
       traffic multiframe (24 TCH + SACCH + idle). 51 frames = one control multiframe
       (235 ms) for BCCH/SCH/FCCH/CCCH. Superframe = 51 × 26 frames = 6.12 s. Hyperframe
       = 2048 superframes = 3 h 28 m 53.76 s. *Why 26 and 51:* they're co-prime (only
       share factor 1), so within a hyperframe every combination of traffic and control
       timing occurs exactly once — allowing any mobile to listen to any channel at any
       time without ambiguity.
    4. *Burst types:* (a) **Normal burst** — 156.25 bits, carries traffic and most
       control. Has a training sequence in the middle for channel estimation. (b)
       **Frequency Correction burst** — all zeros, produces a pure tone, allows mobile
       to tune its frequency to the BTS. (c) **Synchronization burst** — contains a
       long training sequence encoding the BSIC (base station identity), allows frame
       timing recovery. (d) **Access burst** — shorter (88 bits), longer guard time
       (68.25 bits), used on RACH for random access (unknown propagation delay). (e)
       **Dummy burst** — fills unused slots to maintain constant carrier power.
    5. *RPE-LTP pipeline:* (a) **LPC analysis** — 8 LPC coefficients from Yule-Walker
       on each 20 ms frame, converted to Log Area Ratios (36 bits). (b) **LTP** — pitch
       prediction removes the periodicity from the residual; 7-bit lag + 2-bit gain per
       subframe × 4 = 36 bits. (c) **RPE** — the remaining signal is downsampled to 13
       samples per 5 ms subframe, with a 2-bit grid position and 3-bit sample quantization
       → 41 bits per subframe × 4 = 164 bits. Total: 36 + 36 + 164 = 236 bits; padded
       to 260; 260 × 50 = 13 kbps.
    6. *Security:* (a) **A3** — authentication; the SIM proves it knows $K_i$ by
       computing SRES = A3($K_i$, RAND) in response to a network challenge. (b) **A8**
       — derives ciphering key $K_c$ = A8($K_i$, RAND) at both ends. (c) **A5** —
       encrypts traffic and signalling using $K_c$ and the frame number. *Limitations:*
       A5/1 is broken (2009); SIM cloning possible if $K_i$ is extracted; IMSI catching
       via fake BTS is mitigated only by TMSI; denial of service trivial; location
       tracking inherent. Modern systems add mutual authentication and SUPI/SUCI.
    7. *MO call:* RACH (Channel Request) → AGCH (Immediate Assignment) → SDCCH (CM
       Service Request) → SDCCH (authentication with A3/A5) → SDCCH (ciphering mode)
       → SDCCH (SETUP with dialled number) → AGCH+SDCCH (Assignment to TCH) → TCH
       (call proceeds) → DISCONNECT / Release.
    8. *Handover trigger:* the serving cell's RSSI drops relative to a neighbor cell's
       RSSI by a margin (typically 3–6 dB), sustained for a time window (typically
       480 ms to 2 s). The **hysteresis** prevents ping-pong handovers from random
       RSSI fluctuations — a small immediate difference doesn't trigger handover because
       the condition must be sustained. Additional triggers: quality degradation, timing
       advance too high, congestion.
    9. *Data evolution:* **CSD** — 9.6 kbps, circuit-switched, billed per minute,
       dial-up style. **HSCSD** — up to 57.6 kbps via 4 slots, still circuit-switched,
       billed per slot-minute (expensive). **GPRS** — up to 171 kbps theoretical, packet-switched,
       billed per MB, always-on. **EDGE** — up to 473 kbps theoretical via 8-PSK,
       packet-switched, billed per MB, backward compatible with GPRS. Each step increases
       data rate and reduces cost-per-bit.
    10. *SGSN and GGSN:* SGSN (Serving GPRS Support Node) is the packet-domain analog
        of the MSC — it handles packet routing to/from the mobile in its service area,
        mobility management, authentication, session management. GGSN (Gateway GPRS
        Support Node) is the gateway to external PDNs — it manages the mobile's IP
        session (the "anchor point"), routes packets between SGSN and Internet, and
        holds the mobile's IP address. Difference from MSC: MSC is circuit-switched
        (dedicated path per call); SGSN/GGSN are packet-switched (shared resources,
        IP routing).

---

## Further reading

- **M. Mouly & M.-B. Pautet**, *The GSM System for Mobile Communications*, Cell & Sys, 1992 — the definitive GSM reference. The authors were involved in GSM design; the book explains every detail including the reasoning. Somewhat dated but still the best pedagogical reference.
- **S. M. Redl, M. K. Weber & M. W. Oliphant**, *An Introduction to GSM*, Artech House, 1995 — a more accessible introduction.
- **J. Eberspächer, H.-J. Vögel & C. Bettstetter**, *GSM: Switching, Services and Protocols*, 2nd ed., Wiley, 2001 — good for the architecture and protocols.
- **X. Lagrange, P. Godlewski & S. Tabbane**, *GSM: The Radio Interface*, Springer, 2000 — detailed radio-layer reference.
- **G. Heine & H. Sagkob**, *GPRS: Gateway to Third Generation Mobile Networks*, Artech, 2003 — the definitive GPRS reference.
- **3GPP TS 45.xxx** — GSM/EDGE Radio Access Network (GERAN) specifications — the primary source.
- **3GPP TS 43.xxx** — GSM/EDGE network architecture.
- **3GPP TS 23.060** — GPRS Service Description.
- **TS 51.010** — Mobile Station (MS) conformance specification — the test reference.
- **GSMA roaming guides** — practical documents on real-world GSM deployment and roaming.
- **ETSI 1990 GSM Phase 1 specifications** — the original design documents (historical interest).

---

## Suggested tutorial problems

1. **TDMA timing.** Compute the total bit rate on one 200 kHz carrier if each burst has 156.25 bits and there are 8 bursts per 4.615 ms frame. Verify $R_c = 270.833$ kbps.

2. **Capacity calculation.** A GSM cell has 4 TRXs (4 carriers). Compute the number of full-rate voice channels. Using Erlang-B at 2% blocking, what is the traffic capacity? At 25 mErlang/user, how many subscribers can this cell serve?

3. **Frequencies.** GSM 1800 has 75 MHz uplink (1710–1785) and 75 MHz downlink. Compute the number of 200 kHz carriers (minus guard bands). Compare with GSM 900's 124 carriers.

4. **GMSK spectrum.** For $BT = 0.3$ at 270.833 kSps, plot the spectral occupancy. Mark the 200 kHz channel boundaries. How much power is outside the channel?

5. **Speech coding.** Compute the total bit rate including all channel coding:
   - Speech: 13 kbps (260 bits per 20 ms).
   - After Class 1a CRC + Class 1b convolutional: 378 bits per 20 ms.
   - What is the actual on-air rate per speech user (only TCH frames)?
   - Compare with raw rate on carrier.

6. **Authentication.** Describe what happens if the SRES returned by the mobile does not match. What does the network do? How is this different from an impersonation attack?

7. **Handover timing.** A mobile moves at 100 km/h. It crosses from cell A (radius 1 km) to cell B (radius 1 km). At what point during the traverse will handover trigger? How long is the "active" handover window (using 500 ms decision window)?

8. **GPRS throughput.** For a multislot class 12 mobile (4 DL, 4 UL), CS-3 coding at 15.6 kbps/slot, and 70% network efficiency, what is the expected DL throughput? Compare with CSD at 9.6 kbps.

9. **EDGE MCS comparison.** MCS-5 (8-PSK, rate 0.37) vs. MCS-9 (8-PSK, rate 1.0). Compute the throughput per slot for each. Then compute the required SNR difference — which MCS would you use near the cell edge?

10. **SMS.** A 200-character message exceeds the 160-character SMS limit. How many SMS messages will it split into? What is the per-message overhead in bytes?

11. **Roaming.** A subscriber has IMSI 231-02-xxxxxxx in Ethiopia and travels to Germany (MCC 262). Trace the location update. What network entities are consulted? What changes in the HLR?

12. **GSM vs. UMTS.** Compare GSM and UMTS in terms of: chip rate, bandwidth, multiple access, modulation, handover type, peak rate, security algorithm. Which differences are fundamental (architecture) vs. evolutionary (feature)?
