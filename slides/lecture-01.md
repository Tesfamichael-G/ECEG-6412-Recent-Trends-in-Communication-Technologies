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

### Recent Trends in Communication Technologies

**Chapter 1 — Introduction**

MSc in Communication Engineering · Year 1, Semester I

---

## Outline

<div class="fragment">

**Part 1 — History and generations**

- From Marconi to 5G NR
- The four big shifts

</div>

<div class="fragment">

**Part 2 — Standards landscape**

- WPAN, WLAN, WMAN, WWAN, LPWAN, satellite
- Frequency bands

</div>

<div class="fragment">

**Part 3 — Layered view of cellular networks**

- PHY, MAC, MAC-management (RRC)

</div>

<div class="fragment">

**Part 4 — The wireless environment**

- Frequency reuse, sectoring
- Path loss, shadowing, fading

</div>

<div class="fragment">

**Part 5 — Legacy systems**

- AMPS, TACS — and why they drove GSM

</div>

---

## §1.1 — From Marconi to 5G

<div class="fragment">

**1864** — Maxwell's equations predict electromagnetic waves.

</div>

<div class="fragment">

**1887** — Hertz demonstrates radio waves experimentally.

</div>

<div class="fragment">

**1895** — Marconi's first wireless telegraph (2 km).

</div>

<div class="fragment">

**1901** — Marconi's transatlantic transmission.

</div>

<div class="fragment">

**1947** — Bell Labs proposes the **cellular concept** — frequency reuse across cells.

</div>

---

## The cellular idea — 1947, waiting for technology

<div class="fragment">

The **cellular concept** — reuse the same frequency in geographically separated cells — was blocked by two missing technologies:

</div>

<div class="fragment">

**1. Fast frequency-agile transceivers** — for handover between cells.

</div>

<div class="fragment">

**2. Compact, cheap microprocessors** — for control signalling, mobility management.

</div>

<div class="fragment">

**1983** — AMPS launches in the US. First commercial cellular.

</div>

<div class="fragment">

**1991** — GSM launches in Finland. First digital cellular.

</div>

---

## Seven generations in forty years

<!-- .slide: class="md" -->

| Gen | Era | Technology | Peak rate | Key innovation |
|:---:|:---:|---|:---:|---|
| **1G** | 1979–95 | AMPS, TACS, NMT — analog FM, FDMA | 2.4 kbps | Cellular reuse, handover |
| **2G** | 1991–05 | GSM, IS-95 — digital voice | 14.4 kbps | Digital voice, SMS, encryption |
| **2.5G** | 2000–07 | GPRS, EDGE | 470 kbps | Packet data |
| **3G** | 2001–12 | UMTS, cdma2000 (WCDMA) | 2 Mbps | Mobile internet |
| **3.5G** | 2006–15 | HSPA, HSPA+ | 42 Mbps | HSDPA, HSUPA, MIMO |
| **4G** | 2009–20 | LTE, LTE-A, WiMAX | 1 Gbps | OFDMA, all-IP core |
| **5G** | 2019+ | 5G NR | 20 Gbps | Massive MIMO, mmWave, URLLC |
| **6G** | ~2030 | Research | ~1 Tbps | THz, AI-native |

<div class="fragment">

**Roughly one new generation per decade** — each adds a new PHY technique and a new application class.

</div>

---

## The four big shifts

<div class="fragment">

**1. Analog → digital (1G → 2G)**

Encryption, error correction, SMS, dramatic capacity gains.

</div>

<div class="fragment">

**2. Voice → data (2G → 3G)**

The internet goes mobile.

</div>

<div class="fragment">

**3. Circuit → packet (2.5G → 4G)**

Always-on, IP-based, universal.

</div>

<div class="fragment">

**4. Human-centric → everything-centric (4G → 5G)**

mMTC for sensors, URLLC for control.

</div>

---

## §1.2 — The wireless standards landscape

<div class="fragment">

<!-- .slide: class="md" -->


| Category | Range | Standard | Peak rate | Use |
|---|---|---|---|---|
| **WPAN** | 1–10 m | Bluetooth, ZigBee, UWB | 0.1–1 Gbps | Headphones, sensors |
| **WLAN** | 30–100 m | WiFi 4/5/6/7 | 100 Mbps–30 Gbps | Home, enterprise |
| **WMAN** | 1–50 km | WiMAX, 5G FWA | 70 Mbps–1 Gbps | Fixed broadband |
| **WWAN** | 1–30 km | 4G LTE, 5G NR | 100 Mbps–20 Gbps | Mobile |
| **LPWAN** | 2–15 km | LoRa, NB-IoT, Sigfox | 0.1–127 kbps | IoT sensors |
| **Satellite** | global | GEO, LEO | 1–200 Mbps | Remote, backhaul |

</div>

<div class="fragment">

**This course focuses on WWAN (cellular).** WPAN and LPWAN return in Chapter 6.

</div>

---

## Frequency bands at a glance

<div class="fragment">

**Sub-1 GHz** — 600–900 MHz. Wide-area coverage. 2G, some 4G/5G.

</div>

<div class="fragment">

**Mid-band** — 1.7–6 GHz. The workhorse — capacity and coverage balanced. 3.5 GHz is "5G mid-band".

</div>

<div class="fragment">

**mmWave** — 24–100 GHz. Massive capacity but short range. 5G dense urban, FWA.

</div>

<div class="fragment">

**The physics:** higher frequency = more path loss (Chapter 5), but more bandwidth available.

</div>

---

## §1.3 — Layered view of a cellular network

<div class="fragment">

Cellular networks are organised in **layers**, each with a specific job.

</div>

<div class="fragment">

**Layer 1 — PHY (Physical Layer)**

Transmits bits over the wireless channel.

- Channel coding (turbo, LDPC, polar)
- Modulation (QPSK, 16-QAM, 64-QAM, 256-QAM)
- Multiple access (OFDMA, SC-FDMA)
- MIMO, beamforming
- HARQ physical-layer processing

</div>

<div class="fragment">

**Visible as:** 3GPP TS 38.2xx (5G NR PHY).

</div>

---

## Layer 2 — MAC (Medium Access Control)

<div class="fragment">

Schedules transmissions among users.

- **Scheduling** — which UE gets which time-frequency resources, per TTI
- **HARQ control** — manages retransmissions based on PHY outcomes
- **Random access** — contention-based access (RACH)
- **Multiplexing** — packs logical channels into transport blocks

</div>

<div class="fragment">

**Visible as:** 3GPP TS 38.321 (5G NR MAC).

</div>

<div class="fragment">

**The MAC is where scheduling meets the channel.**

</div>

---

## Layer 3 — MAC-management (RRC)

<div class="fragment">

Connection and mobility management.

- Connection setup, reconfiguration, release
- Handover decisions and cell reselection
- Radio resource allocation (MIMO mode, HARQ parameters)
- Paging, broadcast, security

</div>

<div class="fragment">

**Visible as:** 3GPP TS 38.331 (5G NR RRC).

</div>

<div class="fragment">

**Above RRC:** PDCP (header compression, ciphering), RLC (segmentation, ARQ), NAS (mobility and session management), IP.

</div>

---

## Checkpoint — Which layer does HARQ?

<div class="quiz" data-question="harq-layer">
  <p class="quiz-question">HARQ (hybrid ARQ) retransmissions are managed by which 3GPP layer?</p>
  <button class="quiz-option" data-answer="wrong">PHY — physical layer</button>
  <button class="quiz-option" data-answer="correct">MAC — medium access control</button>
  <button class="quiz-option" data-answer="wrong">RRC — radio resource control</button>
  <button class="quiz-option" data-answer="wrong">NAS — non-access stratum</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why it matters.** HARQ combines PHY-level forward error correction with MAC-level retransmission — the boundary between the two layers is where this works.

</div>

---

## §1.4 — Frequency reuse — the founding idea

<div class="fragment">

Every cellular system rests on one key idea:

**Reuse the same frequency band in geographically separated cells.**

</div>

<div class="fragment">

**Cluster size $N$** — how many cells form a repeating pattern.

Common values: $N = 3, 4, 7, 9, 12$.

</div>

<div class="fragment">

**Reuse distance:**

$$
D = \sqrt{3N}\cdot R
$$

where $R$ is the cell radius (centre to vertex of a hexagonal cell).

</div>

<div class="fragment">

**The trade-off:**

- **Smaller $N$** → more reuse → **higher capacity**.
- **Smaller $N$** → more co-channel interference → **lower SIR** (quality).

</div>

---

## Signal-to-interference ratio (SIR)

<div class="fragment">

For a hexagonal grid with $n$ the path-loss exponent, the worst-case SIR (mobile at cell edge, 6 first-tier interferers all at distance $D$):

$$
\boxed{\;\text{SIR} \approx \frac{(3N)^{n/2}}{6}\;}
$$

</div>

<div class="fragment">

**Worked example — $N = 7$, $n = 4$:**

$$
\text{SIR} = \frac{(21)^2}{6} = 73.5 \approx 18.7\ \text{dB}
$$

Good enough for analog FM voice — this is why AMPS used $N = 7$.

</div>

<div class="fragment">

**For digital systems with FEC**, $N = 3$ or $N = 4$ becomes viable — more capacity at the same quality.

</div>

---

## Sectoring — the other lever

<div class="fragment">

Replace **omni** antennas with **3-sector (120°)** or **6-sector (60°)** directional antennas.

</div>

<div class="fragment">

**Effect:** first-tier co-channel interferers drop from **6** to **2** (3-sector) or **1** (6-sector).

</div>

<div class="fragment">

**SIR improvement:**
- 3-sector: $10\log_{10}(6/2) = 4.77$ dB
- 6-sector: $10\log_{10}(6/1) = 7.78$ dB

</div>

<div class="fragment">

**Trade-off:** more antennas per site, more handovers between sectors.

</div>

---

## Checkpoint — Sectoring

<div class="quiz" data-question="sectoring">
  <p class="quiz-question">Deploying a cell as <strong>3 sectors (120°)</strong> instead of omnidirectional reduces first-tier co-channel interferers from 6 to how many?</p>
  <button class="quiz-option" data-answer="wrong">1</button>
  <button class="quiz-option" data-answer="correct">2</button>
  <button class="quiz-option" data-answer="wrong">3</button>
  <button class="quiz-option" data-answer="wrong">6</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Result:** SIR improves by $10\log_{10}(3) \approx 4.77$ dB — or equivalently, allows a smaller cluster size $N$.

</div>

---

## §1.5 — The wireless channel — three scales

<div class="fragment">

**Large-scale path loss** — signal strength drops with distance.

$$
\text{FSPL}_{\text{dB}} = 32.44 + 20\log f_{\text{MHz}} + 20\log d_{\text{km}}
$$

</div>

<div class="fragment">

**Shadowing** — random variation from buildings, hills, foliage. **Log-normal**, $\sigma = 6$–10 dB urban.

</div>

<div class="fragment">

**Small-scale fading** — rapid fluctuations over a few wavelengths. **Rayleigh, Rician, Nakagami**.

</div>

<div class="fragment">

**Three scales, three timescales.** Link budget, coverage planning, and adaptive modulation all operate on different scales.

</div>

---

## Path loss — why mmWave is different

<div class="fragment">

$$
\boxed{\;\text{FSPL}_{\text{dB}} = 32.44 + 20\log_{10}(f_{\text{MHz}}) + 20\log_{10}(d_{\text{km}})\;}
$$

</div>

<div class="fragment">

**Worked example** at $d = 1$ km:

<!-- .slide: class="md" -->

| Frequency | FSPL |
|:---:|:---:|
| 900 MHz (GSM) | 91.5 dB |
| 2 GHz (UMTS) | 98.5 dB |
| 28 GHz (5G mmWave) | 121.4 dB |

</div>

<div class="fragment">

**~30 dB difference** between 2 GHz and 28 GHz = **1000× more power** needed at mmWave.

</div>

<div class="fragment">

**Why mmWave cells are small** (100–300 m) — and why massive MIMO beamforming (+18 to +24 dB) is essential.

</div>

---

## Empirical models — beyond free space

<div class="fragment">

Free space is optimistic. Real urban channels are **much worse**.

</div>

<div class="fragment">

**Okumura–Hata (150–1500 MHz):**

$$
\text{PL} = 69.55 + 26.16\log f - 13.82\log h_b - a(h_m) + (44.9 - 6.55\log h_b)\log d
$$

</div>

<div class="fragment">

At 900 MHz, $h_b = 50$ m, $h_m = 1.5$ m, $d = 1$ km: **~123 dB** — versus FSPL's 91.5 dB. **~32 dB more loss.**

</div>

<div class="fragment">

**COST-231** extends Okumura–Hata to 2 GHz (UMTS era).

</div>

---

## Coverage with shadowing

<div class="fragment">

**Log-normal shadowing:** received power (dB) is Gaussian around the mean, with std $\sigma = 6$–10 dB urban.

</div>

<div class="fragment">

**Coverage probability** at distance $d$:

$$
\boxed{\;\Pr\{\text{coverage}\} = Q\!\left(\frac{P_{\min} - \bar P_r(d)}{\sigma}\right)\;}
$$

</div>

<div class="fragment">

**Worked example:** $\bar P_r = -95$ dBm, $P_{\min} = -105$ dBm, $\sigma = 8$ dB:

$$
Q\!\left(\frac{-10}{8}\right) = Q(-1.25) \approx 0.89
$$

**~89% of locations** have coverage. 11% in shadow at any instant.

</div>

---

## Small-scale fading — coherence

<div class="fragment">

**Delay spread** $\tau_{\text{rms}}$ — typical urban 1–3 μs.

</div>

<div class="fragment">

**Coherence bandwidth:**

$$
B_c \approx \frac{1}{5\tau_{\text{rms}}}
$$

If signal bandwidth $B_s \gg B_c$ → **frequency-selective** (needs equalization / OFDM).

</div>

<div class="fragment">

**Doppler spread:** $f_D = v f_c / c$.

**Coherence time:**

$$
T_c \approx \frac{0.423}{f_D}
$$

If $T_s \ll T_c$ → **slow fading**; else **fast fading** (needs interleaving).

</div>

<div class="fragment">

**Two coherence times, two design implications** — OFDM for frequency selectivity, interleaving for time selectivity.

</div>

---

## §1.6 — Legacy systems — AMPS and TACS

<div class="fragment">

**AMPS** (Advanced Mobile Phone System, 1983) — the archetypal 1G system.

</div>

<div class="fragment">

<!-- .slide: class="md" -->

| Parameter | AMPS | TACS |
|---|---|---|
| Frequency | 824–849 / 869–894 MHz | 890–915 / 935–960 MHz |
| Channel | **30 kHz** FM | **25 kHz** FM |
| Access | FDMA | FDMA |
| Channels | 832 | 1000 |
| Cluster size | $N = 7$ | $N = 7$ |
| Security | none | none |
| Handover | hard | hard |

</div>

<div class="fragment">

**TACS** — the European equivalent, deployed in the UK 1985.

</div>

---

## Why AMPS/TACS couldn't last

<div class="fragment">

**1. Analog voice** — no encryption, easy to eavesdrop.

</div>

<div class="fragment">

**2. Low capacity** — 30 kHz channels, $N = 7$ → few users.

</div>

<div class="fragment">

**3. No data services** — voice only.

</div>

<div class="fragment">

**4. Fragmented standards** — 5 incompatible systems in Europe.

</div>

<div class="fragment">

**5. Handsets tied to subscription** — no roaming, no SIM.

</div>

<div class="fragment">

**Each of these became a GSM design goal.** Digital voice, TDMA (8 slots/carrier), SMS, pan-European standard, SIM card.

</div>

---

## Chapter 1 — key takeaways

<div class="fragment">

**1.** Wireless has evolved roughly **one generation per decade** — analog FDMA to all-IP OFDMA + massive MIMO + mmWave.

</div>

<div class="fragment">

**2.** The **cellular concept** is frequency reuse. Cluster size $N$ balances capacity vs. interference.

</div>

<div class="fragment">

**3.** Cellular networks are **layered** — PHY (bits), MAC (scheduling), RRC (mobility) — each with a specific job.

</div>

<div class="fragment">

**4.** The wireless channel has **three scales** — path loss, shadowing, small-scale fading — each needing a different design tool.

</div>

<div class="fragment">

**5.** SIR $\approx (3N)^{n/2}/6$ — and **sectoring** buys you 4.77 or 7.78 dB for free.

</div>

<div class="fragment">

**6.** Legacy AMPS/TACS had **five key limitations** that drove the design of GSM (Chapter 3).

</div>

---

## Next — Chapter 2

**Modulation and Coding for Wireless Systems**

<div class="fragment">

- Analog and digital modulation (AM, FM, BPSK, QPSK, QAM, OFDM)
- Multiple access: TDMA, FDMA, CDMA, SDMA
- Error control coding: convolutional, turbo, LDPC
- Source coding: speech, audio, video

</div>

<div class="fragment">

**Every wireless standard from GSM to 5G NR is built from these primitives.**

</div>

---

<aside class="notes">
  <div style="font-size: 16px; line-height: 1.6;">

**Speaker notes for the whole lecture:**

- Slides 4–7 (history): spend ~5 min. Emphasize why the cellular concept (1947) needed to wait 30+ years for the microprocessor.
- Slides 8–12 (standards): a quick landscape. Don't memorise tables — just ensure students know WPAN vs. WLAN vs. WWAN.
- Slides 13–17 (layered view): the key lesson is separation of concerns. Emphasize PHY does per-bit transmission, MAC does per-user scheduling.
- Slides 18–22 (frequency reuse): the math matters. Have students compute SIR for a different N in class.
- Slides 23–26 (channel): three scales, three design tools. Introduce the coherence bandwidth/time without going deep — Chapter 2 and 4 do that.
- Slides 27–29 (legacy): the five limitations. Map each to a GSM solution — this sets up Chapter 3.

  </div>
</aside>