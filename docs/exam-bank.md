# Exam Bank — ECEG-6412 Recent Trends in Communication Technologies

40 questions spanning all seven chapters plus the wired-technology chapter.
Use for self-assessment and exam preparation. **Answers and grading rubric at
the end.**

**Instructions (for a mock exam):**

- Time: **3 hours**
- Closed book; **one A4 handwritten formula sheet** allowed
- Non-programmable calculator permitted
- Total marks: **100**
- Marks per question in brackets

---

## Section A — Introduction (Ch 1) — 15 marks

### A1. Multiple choice [2]

In a hexagonal cellular system with cluster size $N = 7$ and path-loss exponent
$n = 4$, the approximate omni-cell SIR is:

(a) 10 dB (b) 13 dB (c) **18.7 dB** (d) 30 dB

### A2. Multiple choice [2]

**Log-normal shadowing** in an urban environment has a typical standard deviation of:

(a) 1 dB (b) 3 dB (c) **6–10 dB** (d) 25 dB

### A3. Multiple choice [2]

Which 3GPP protocol layer is responsible for **HARQ retransmissions**?

(a) PHY (b) **MAC** (c) RRC (d) NAS

### A4. Short answer [3]

State the **free-space path-loss** (Friis) formula in dB, and explain why mmWave
(28 GHz) has ~30 dB more path loss at 1 km than sub-1 GHz.

### A5. Short answer [3]

Define **coherence bandwidth** $B_c$ and **coherence time** $T_c$. Explain what
type of fading the system experiences when the signal bandwidth $B_s \gg B_c$.

### A6. Derivation [3]

For a two-tier hexagonal cellular system, derive the approximate **SIR**
expression $\text{SIR} \approx (3N)^{n/2}/6$ (or state assumptions and result).
What does it say about the trade-off between $N$ and capacity?

---

## Section B — Modulation and Coding (Ch 2) — 20 marks

### B1. Multiple choice [2]

At the same $E_b/N_0$, QPSK gives:

(a) Half the BER of BPSK (b) **The same BER as BPSK** (c) Twice the BER of
BPSK (d) Unrelated BER

### B2. Multiple choice [2]

The **spectral efficiency** of QPSK with an ideal Nyquist pulse ($\beta = 0$)
is:

(a) 1 bps/Hz (b) **2 bps/Hz** (c) 4 bps/Hz (d) 6 bps/Hz

### B3. Multiple choice [2]

**OFDM** handles frequency-selective fading by:

(a) Using a Rake receiver (b) Using higher power (c) **Splitting the channel
into flat subcarriers** (d) Spreading across the time axis

### B4. Short answer [3]

State the **Shannon capacity** formula. For a 20 MHz channel at SNR = 15 dB,
compute the maximum achievable rate.

### B5. Short answer [3]

Explain **Gray coding** and why it reduces BER at the same symbol error rate.

### B6. Derivation [4]

Compute the peak **HSDPA** downlink rate (R5) for:
- 15 HS-PDSCH codes, SF = 16
- 16-QAM modulation
- Rate-3/4 coding
- Chip rate = 3.84 Mcps

Show all steps.

### B7. Short answer [4]

State the **cycle prefix** in OFDM. Why must $T_{cp} > \tau_{\max}$? What is
the throughput cost of the CP (formula and typical percentage)?

---

## Section C — Wired Technology Trends — 5 marks

### C1. Multiple choice [2]

**GPON** downstream capacity is:

(a) 155 Mbps (b) **2.5 Gbps** (c) 10 Gbps (d) 40 Gbps

### C2. Short answer [3]

Explain why every wireless call is "mostly wired." Give one reason the wired
backhaul is often the bottleneck in 5G networks.

---

## Section D — GSM (Ch 3) — 15 marks

### D1. Multiple choice [2]

GSM uses which multiple-access technique?

(a) FDMA (b) **TDMA** (c) CDMA (d) OFDMA

### D2. Multiple choice [2]

GSM's bit rate on the air interface (per 200 kHz carrier) is:

(a) 33.85 kbps (b) 100 kbps (c) **270.833 kbps** (d) 1 Mbps

### D3. Short answer [3]

Describe the **three burst types** in GSM (Normal, Frequency Correction, Access)
and the purpose of each.

### D4. Short answer [3]

Explain the **RPE-LTP speech codec** at 13 kbps. What are its three main
components, and how do they contribute to the compression?

### D5. Derivation [5]

For a GSM TDMA frame with 8 slots of 577 μs each:
(a) Compute the total gross bit rate per carrier.
(b) Compute the number of voice channels per cell if $N = 4$ and there are
125 total carriers across 25 MHz uplink.
(c) Compare with AMPS at $N = 7$, 30 kHz channels. What is the capacity
multiplier?

---

## Section E — UMTS (Ch 4) — 15 marks

### E1. Multiple choice [2]

UMTS FDD uses which multiple-access technique?

(a) TDMA (b) FDMA (c) **WCDMA** (d) OFDMA

### E2. Multiple choice [2]

The **chip rate** of UMTS FDD is:

(a) 1.2288 Mcps (b) **3.84 Mcps** (c) 5 Mcps (d) 20 Mcps

### E3. Short answer [3]

Explain the **Rake receiver**. Why is multipath a **diversity** in WCDMA, not
a problem (as in GSM)?

### E4. Short answer [3]

Describe **soft handover** in UMTS. What is the active set, and why is soft
handover a signature advantage of CDMA?

### E5. Derivation [5]

Compute the **pole capacity** for UMTS voice at 12.2 kbps (AMR), with:
- Chip rate $W = 3.84$ MHz
- $(E_b/N_0)_{\text{req}} = 5$ dB
- Inter-cell interference factor $i = 0.5$
- Activity factor $v = 0.6$

Then compute realistic capacity at 50% of pole.

---

## Section F — 4G/LTE/WiMAX (Ch 5) — 15 marks

### F1. Multiple choice [2]

LTE uses which multiple access in the **uplink**?

(a) OFDMA (b) **SC-FDMA** (c) CDMA (d) TDMA

### F2. Multiple choice [2]

LTE's subcarrier spacing is:

(a) 10.94 kHz (b) **15 kHz** (c) 30 kHz (d) 60 kHz

### F3. Short answer [3]

Explain why LTE uses **OFDMA** in the downlink but **SC-FDMA** in the uplink.
What is the PAPR trade-off?

### F4. Short answer [3]

Draw the **LTE EPC architecture** — eNodeB, MME, S-GW, P-GW, HSS. Explain the
role of each.

### F5. Derivation [5]

Compute the **peak LTE throughput** for:
- 20 MHz channel, 2×2 MIMO
- 64-QAM modulation, rate-3/4 coding
- 100 resource blocks per subframe
- Assume 20% reference-signal overhead

Then compare with the standard LTE Cat-4 peak of 150 Mbps.

---

## Section G — NGN/IoT (Ch 6) — 8 marks

### G1. Multiple choice [2]

**ZigBee** is based on which IEEE standard?

(a) 802.11 (b) 802.15.1 (c) **802.15.4** (d) 802.16

### G2. Multiple choice [2]

**LoRa** uses which modulation technique?

(a) OFDM (b) QPSK (c) **Chirp Spread Spectrum** (d) 8-PSK

### G3. Short answer [4]

Compare **LoRa**, **NB-IoT**, and **Sigfox** on frequency, data rate, range,
and battery life. For each, state one application where it's the best fit.

---

## Section H — ML for Communications (Ch 7) — 7 marks

### H1. Multiple choice [2]

**Federated learning** avoids:

(a) Training (b) **Centralizing raw data** (c) Model updates (d) Gradient computation

### H2. Short answer [3]

Explain the **autoencoder approach** to communication systems. What is the
critical requirement, and what does it discover for AWGN vs. non-linear channels?

### H3. Short answer [2]

State one **practical challenge** of ML for communications. Why is this challenge
fundamentally harder than in vision or NLP?

---

## Answer key

??? success "Click to reveal answers"

    ### Section A

    **A1.** (c) 18.7 dB — $(21)^2/6 \approx 73.5 \approx 18.7$ dB.

    **A2.** (c) 6–10 dB urban.

    **A3.** (b) MAC — HARQ is a MAC-layer function.

    **A4.** $\text{FSPL}_{\text{dB}} = 32.44 + 20\log_{10}(f_{\text{MHz}}) + 20\log_{10}(d_{\text{km}})$.
    At 900 MHz, 1 km: 91.5 dB. At 28 GHz, 1 km: 121.4 dB. Difference: 30 dB.
    The $20\log f$ term captures the fact that FSPL increases as $f^2$ — higher
    frequencies spread the same energy over a larger aperture for a fixed
    antenna gain.

    **A5.** *Coherence bandwidth:* the frequency range over which the channel
    response is approximately flat (highly correlated). $B_c \approx 1/(5\tau_{\text{rms}})$
    (50% correlation). *Coherence time:* the time over which the channel is
    approximately constant. $T_c \approx 0.423/f_D$. When $B_s \gg B_c$, the
    channel is **frequency-selective** — needs equalization (or OFDM).

    **A6.** For 6 first-tier interferers at distance $D$, and desired signal at
    distance $R$ (edge of cell), SIR = $R^{-n} / \sum_i D_i^{-n} \approx R^{-n}/(6 D^{-n})$ if all interferers are at approximately $D$. Then SIR = $(D/R)^n/6 = (3N)^{n/2}/6$.
    *Trade-off:* smaller $N$ increases capacity (more reuse) but decreases SIR
    (more interference). Design must choose $N$ such that the SIR meets the
    modulation/coding target.

    ### Section B

    **B1.** (b) Same BER as BPSK.

    **B2.** (b) 2 bps/Hz.

    **B3.** (c) Split the channel into flat subcarriers.

    **B4.** $C = B\log_2(1 + \text{SNR})$. For $B = 20$ MHz, SNR = 15 dB (linear
    31.62): $C = 20\times10^6 \times \log_2(32.62) \approx 20\times10^6 \times 5.03 \approx 100.6$ Mbps.

    **B5.** *Gray coding:* a mapping from bits to constellation symbols such
    that adjacent constellation points differ by exactly 1 bit. When a symbol
    decision error lands on an adjacent point (the dominant error type at high
    SNR), the bit error count is 1, not $\log_2 M$. This reduces the BER at
    the same SER by a factor of approximately $\log_2 M$.

    **B6.** Per code: $3.84$ Mcps / 16 = 240 ksym/s × 4 bits/sym (16-QAM) ×
    $0.75$ (rate-3/4) = 720 kbps. × 15 codes = **10.8 Mbps** (practical) or
    **14.4 Mbps** (rate-1 theoretical). Standard says 14.4 Mbps is the theoretical
    peak; realistic is ~10 Mbps.

    **B7.** *CP:* copies the last $T_{cp}$ seconds of the useful symbol to the
    front. *Why $T_{cp} > \tau_{\max}$:* to absorb the delay-spread tail of the
    previous symbol entirely within the CP → zero ISI after discarding the CP.
    *Cost:* throughput reduced by $\eta_{CP} = T_u/(T_u + T_{cp})$, typically
    ~7% for LTE normal CP.

    ### Section C

    **C1.** (b) 2.5 Gbps.

    **C2.** *Mostly wired:* the radio link from UE to base station is only
    100 m–1 km; the backhaul to the core is fiber over 10s to 1000s of km. Ratio
    is 100–10,000× more wired than wireless. *Bottleneck:* 5G sites need 5–25 Gbps
    backhaul (fiber), but only ~30% of global cell sites have fiber — most rely
    on microwave or slower links, so the radio can transmit more than the network
    can deliver.

    ### Section D

    **D1.** (b) TDMA.

    **D2.** (c) 270.833 kbps.

    **D3.** *Normal burst:* carries traffic and most control, 156.25 bits with
    training sequence for channel estimation. *Frequency correction burst:* all
    zeros, produces a pure tone for frequency tuning. *Access burst:* shorter
    (88 bits) with long guard, used on RACH for random access (unknown propagation
    delay).

    **D4.** *RPE-LTP:* (a) LPC analysis — 8 LPC coefficients from Yule-Walker on
    each 20 ms frame, quantized as LARs (36 bits). (b) LTP — long-term prediction
    removes pitch-period structure; lag (7 bits) + gain (2 bits) per subframe ×
    4 = 36 bits. (c) RPE — remaining residual downsampled to 13 samples per
    subframe with grid position (2 bits) and samples (39 bits) = 41 bits × 4 =
    164 bits. Total 236 bits per 20 ms; padded to 260; 260 × 50 = 13 kbps.

    **D5.**
    (a) 8 × 156.25 bits per 4.615 ms = 1250 bits / 4.615 ms = **270.833 kbps**.
    (b) 25 MHz / 0.2 MHz = 125 carriers. With $N = 4$: 125/4 ≈ **31 carriers per cell**. 8 voice channels per carrier → **248 voice channels per cell**.
    (c) AMPS: 25 MHz / 30 kHz ≈ 833 carriers; with $N = 7$: 833/7 ≈ **119 per cell**. Ratio = 248/119 ≈ **2.08×** — GSM has ~2× the voice capacity of AMPS.

    ### Section E

    **E1.** (c) WCDMA.

    **E2.** (b) 3.84 Mcps.

    **E3.** *Rake receiver:* multiple finger demodulators, each locked to one
    multipath delay; outputs are maximal-ratio combined. *Why diversity:* wideband
    CDMA's chip duration is much shorter than typical delay spreads, so multipath
    components appear as distinguishable copies rather than overlapping ISI. The
    Rake exploits this as **diversity** (3-path diversity ≈ 4.77 dB gain in
    Rayleigh fading), whereas in narrowband systems (like GSM) the same multipath
    causes ISI and requires an equalizer.

    **E4.** *Soft handover:* a UE is connected to 2 or more NodeBs simultaneously,
    combining signals. *Active set:* the set of cells currently connected. *Why
    signature advantage:* the UE keeps the old link while establishing the new —
    no break-before-make interruption. This is enabled by $N=1$ universal
    frequency reuse; the UE can receive/transmit on the same frequency from
    multiple cells. GSM (with $N>1$) requires hard handover between frequencies.

    **E5.** Pole capacity: $N_{\text{pole}} = 1 + W/(R \cdot (E_b/N_0)_{\text{req}} \cdot (1+i) \cdot v)$.
    - $W = 3.84$ MHz.
    - $R = 12.2$ kbps.
    - $(E_b/N_0)_{\text{req}} = 5$ dB = 3.16 linear.
    - $i = 0.5$.
    - $v = 0.6$ (activity factor).
    $N_{\text{pole}} = 1 + 3.84\times10^6 / (12.2\times10^3 \cdot 3.16 \cdot 1.5 \cdot 0.6) \approx 1 + 110 \approx 111$.
    Realistic capacity at 50% of pole: ~**55 voice users per cell**.

    ### Section F

    **F1.** (b) SC-FDMA.

    **F2.** (b) 15 kHz.

    **F3.** *DL OFDMA:* the eNodeB is mains-powered (no battery constraint) and
    benefits from OFDMA's flexibility for frequency-selective scheduling. *UL
    SC-FDMA:* the UE is battery-powered; OFDMA's high PAPR (10–12 dB) would require
    10+ dB PA backoff → inefficient → short battery + poor coverage. SC-FDMA's
    DFT-precoding reduces PAPR to 3–6 dB → UE PA operates near saturation → ~6 dB
    uplink power gain → ~2× cell radius.

    **F4.** *EPC architecture:* (i) **eNodeB** — base station, all radio functions
    (PHY, MAC, RLC, PDCP, RRC). (ii) **MME** — control-plane: NAS signalling,
    authentication, mobility, bearer setup. (iii) **S-GW** — user-plane anchor
    across handovers, charging. (iv) **P-GW** — gateway to external PDN, IP
    allocation, QoS enforcement. (v) **HSS** — subscription data + authentication
    vectors. Key interfaces: Uu (UE-eNodeB), S1-MME (eNodeB-MME), S1-U
    (eNodeB-S-GW), S5/S8 (S-GW-P-GW), S6a (MME-HSS), X2 (eNodeB-eNodeB).

    **F5.** 
    - Per RB per subframe: 12 subcarriers × 7 symbols × 2 slots = 168 REs. With 20% RS overhead: ~134 usable REs.
    - Per RE: 64-QAM (6 bits) × 3/4 = 4.5 bits. Per RB per subframe: 134 × 4.5 = 603 bits.
    - Per subframe: 100 RBs × 603 = 60,300 bits.
    - Per second (1000 subframes): 60.3 Mbps per stream.
    - 2×2 MIMO: 2 streams = **120.6 Mbps**.
    - Compare to standard Cat-4 150 Mbps: the standard assumes lower RS overhead and slightly more aggressive assumptions. 120 Mbps is a realistic practical peak.

    ### Section G

    **G1.** (c) 802.15.4.

    **G2.** (c) Chirp Spread Spectrum.

    **G3.** *LoRa:* 868/915 MHz unlicensed ISM; 0.3–37.5 kbps; 2–15 km; 10+ year
    battery. Best for: private enterprise IoT (agriculture, remote sensing).
    *NB-IoT:* Licensed LTE bands (700/800/900 MHz); 26–127 kbps; 1–10 km; 5–10
    year battery (PSM). Best for: operator-managed smart metering. *Sigfox:* 868/902
    MHz ISM; ~100 bps; 3–50 km; 10+ year battery. Best for: ultra-low-rate asset
    tracking (logistics, simple telemetry).

    ### Section H

    **H1.** (b) Centralizing raw data.

    **H2.** *Autoencoder:* encoder (transmitter) maps bits to channel symbols,
    a differentiable channel model, decoder (receiver) maps back to bits.
    Trained end-to-end to minimize BER/bit-error loss. *Critical requirement:*
    the channel must be differentiable for backpropagation. *What it discovers:*
    on AWGN, learns QPSK (matches classical optimum); on non-linear channel
    (e.g., PA distortion), learns a constellation that compensates for the
    non-linearity — beating classical QAM which was optimized for AWGN.

    **H3.** *Example challenge:* the **model-reality gap** — training on 3GPP
    TR 38.901 synthetic channels vs. deploying on real measured channels.
    *Why harder than vision/NLP:* the "data distribution" for communications is
    highly **site-specific and non-stationary** — a model trained on one channel
    (e.g., urban macro) may fail completely on another (e.g., indoor, high-speed
    train). Vision/NLP have relatively stable data distributions (natural images,
    language) that generalize much better.

---

## Grading rubric (for instructors)

| Band | Marks | Criteria |
|---|---|---|
| **A** | 90–100 | All questions correct or with trivial arithmetic slips; derivations rigorous; interpretation insightful |
| **B** | 75–89 | Most questions correct; occasional conceptual gaps; derivations mostly sound |
| **C** | 60–74 | Basic understanding demonstrated; some errors in derivations or interpretation |
| **F** | < 60 | Major conceptual gaps; significant derivations missing |

**Point allocations:** MCQs all-or-nothing; short answers partial credit per
correct step; derivations partial credit per correct line.

**Common error checks (and deductions):**

- **Wrong sign** in a formula (e.g., $-20\log$ instead of $+20\log$): −1 to −2.
- **Confusing **bps/Hz** with raw bit rate: −2.
- **Missing $N$ or $i$ in pole-capacity formula: −2.
- **Forgetting CP overhead** in OFDM calculation: −1 to −2.
- **Confusing **SC-FDMA** and **OFDMA** in uplink/downlink: −2.
- **Claiming **soft handover** is impossible in GSM** (hard handover only): −2.
- **Missing **MIMO doubling factor** in LTE peak calculation: −2.
- **Confusing **TDMA** and **CDMA** when stating GSM/UMTS multiple access: −3.