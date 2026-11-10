# Chapter 1 — Introduction

!!! abstract "Chapter at a glance"
    **Contact hours:** 3 lecture · **Home study:** 7 h · **Part I — Wireless system basics**
    
    **Coverage (syllabus):** introduction and historical background · overview of
    wireless networks and standards · layered view of cellular networks (physical
    layer, MAC sublayer, MAC-management sublayer) · the wireless and cellular
    environments · the wireless propagation channel · legacy systems (AMPS, TACS).

---

## Learning outcomes

By the end of this chapter you should be able to:

1. Trace the **evolution of wireless systems** from Marconi to 5G, identifying
   the key generation-defining technologies.
2. Map the **wireless standards landscape** — cellular, WLAN, WPAN, WMAN, satellite.
3. Describe the **layered view** of a cellular network (PHY, MAC, MAC-management)
   and the role of each layer.
4. Compute **link budgets** and **free-space path loss**.
5. Apply the **Okumura–Hata** and **COST-231** empirical models and understand
   their applicability ranges.
6. Model **log-normal shadowing** and compute **coverage probabilities**.
7. Describe **multipath fading** — Rayleigh, Rician, Nakagami — and compute
   **coherence bandwidth** and **coherence time**.
8. Explain **frequency reuse** and compute the **signal-to-interference ratio** for
   hexagonal cells with sectoring.
9. Describe the **legacy AMPS/TACS** systems and their limitations that motivated
   GSM.

---

## 1.1 Historical background

### 1.1.1 The birth of wireless

- **1864 — Maxwell's equations** predicted electromagnetic waves.
- **1887 — Hertz** demonstrated radio waves experimentally.
- **1895 — Marconi** transmitted the first wireless telegraph signal over 2 km.
- **1901 — Marconi** transatlantic transmission from Cornwall to Newfoundland.
- **1906 — Fessenden** first radio broadcast (AM voice).
- **1920s — Commercial AM radio** and the first mobile radio systems (police, taxi).
- **1947 — Bell Labs** proposed the **cellular concept** (frequency reuse in cells).

The cellular idea was revolutionary — it recognised that **frequency reuse over space** could multiply capacity far beyond the sum of individual channel bandwidths. But it needed two technologies that didn't exist yet:

- **Fast, reliable frequency-agile transceivers** — for handover between cells.
- **Compact, inexpensive microprocessors** — for control signalling and mobility management.

### 1.1.2 The cellular generations

| Generation | Era | Technology | Peak rate | Key innovation |
|:---:|:---:|---|:---:|---|
| **1G** | 1979–1995 | AMPS, TACS, NMT — **analog** FM, FDMA | ~2.4 kbps | Cellular frequency reuse, handover |
| **2G** | 1991–2005 | GSM, IS-95 — **digital** voice, TDMA/CDMA | 9.6–14.4 kbps | Digital voice, SMS, encryption |
| **2.5G** | 2000–2007 | GPRS, EDGE — **packet data** over GSM | 40–470 kbps | Packet data, always-on |
| **3G** | 2001–2012 | UMTS (WCDMA), cdma2000 — **mobile broadband** | 384 kbps–2 Mbps | Wideband CDMA, mobile internet |
| **3.5G/3.75G** | 2006–2015 | HSPA, HSPA+, LTE (early) — **enhanced data** | 7.2–42 Mbps | HSDPA, HSUPA, MIMO, higher-order modulation |
| **4G** | 2009–2020 | LTE, LTE-Advanced, WiMAX — **all-IP** | 100 Mbps–1 Gbps | OFDMA, MIMO, SON, all-IP core |
| **5G** | 2019–present | 5G NR (New Radio) — **massive broadband + URLLC + IoT** | 1–20 Gbps | Massive MIMO, mmWave, network slicing |
| **6G** | ~2030 (research) | — | 100 Gbps–1 Tbps | THz, AI-native, integrated sensing |

**Roughly one new generation every decade.** Each one adds: higher spectral efficiency, higher capacity, new services, and new physical-layer techniques.

### 1.1.3 The big shifts

- **Analog → digital (1G → 2G).** Digital brings encryption, error correction, SMS, and dramatic capacity gains.
- **Voice → data (2G → 3G).** The internet goes mobile.
- **Circuit → packet (2.5G → 3G/4G).** Always-on, IP-based, universal.
- **Homogeneous → heterogeneous (3G → 4G).** Macrocells, picocells, femtocells, WiFi — multi-RAT coordination.
- **Human-centric → everything-centric (4G → 5G).** mMTC for sensors, URLLC for control.

---

## 1.2 Overview of wireless networks and standards

The wireless landscape splits by **range** and **purpose**:

| Category | Range | Typical standard | Peak rate | Use |
|---|---|---|---|---|
| **WPAN** (personal) | 1–10 m | Bluetooth, ZigBee, UWB | 1–480 Mbps (UWB) | Headphones, sensors, wearables |
| **WLAN** (local) | 30–100 m | IEEE 802.11 (WiFi 4/5/6/7) | 100 Mbps–10 Gbps | Home, enterprise, hotspots |
| **WMAN** (metropolitan) | 1–50 km | IEEE 802.16 (WiMAX), 5G FWA | 70 Mbps–1 Gbps | Broadband access in underserved areas |
| **WWAN** (wide / cellular) | 1–30 km | 2G/3G/4G/5G | 100 kbps–20 Gbps | Mobile voice + data |
| **Satellite** | global | GEO, MEO (GPS, O3b), LEO (Starlink, OneWeb) | 1–200 Mbps | Coverage everywhere; backhaul |
| **LPWAN** (low-power) | 2–15 km | LoRa, Sigfox, NB-IoT | 0.1–250 kbps | IoT sensors, smart meters |

For this course, **WWAN (cellular) is the focus** — but the other categories appear in Chapter 6 (NGN).

**Standards bodies:**

- **3GPP** — cellular standards from GSM onward.
- **IEEE 802** — WLAN, WPAN, WMAN (802.11, 802.15, 802.16).
- **ITU** — global spectrum coordination; IMT-2000 (3G), IMT-Advanced (4G), IMT-2020 (5G).

**Spectrum bands (roughly):**

| Band | Range | 5G usage |
|---|---|---|
| Low | 600–900 MHz | Coverage, rural |
| Mid | 1.7–6 GHz | Capacity, urban (3.5 GHz is the "5G mid-band") |
| High (mmWave) | 24–100 GHz | Dense urban, FWA, short range |

---

## 1.3 Layered view of cellular networks

Modern cellular networks are described by the **3GPP protocol stack** — several layers, each serving a specific function. The key layers for this course:

### 1.3.1 Physical layer (PHY, Layer 1)

**What it does.** Transmits bits over the wireless channel — modulation, coding, multiple access, MIMO, power control, channel estimation.

**Key blocks (typical):**

- **Channel coding** — convolutional, turbo, LDPC (5G), polar codes (5G control).
- **Modulation** — QPSK, 16QAM, 64QAM, 256QAM (LTE-advanced, 5G).
- **Multiple access** — OFDMA downlink, SC-FDMA uplink (LTE), CP-OFDM (5G).
- **MIMO** — spatial multiplexing (multi-stream), beamforming, transmit diversity.
- **HARQ** — hybrid ARQ combining FEC + retransmission.
- **Synchronization and channel estimation** — pilots / reference signals.

**Visible in 3GPP specs as:** TS 25.2xx (UMTS PHY), TS 36.2xx (LTE PHY), TS 38.2xx (5G NR PHY).

### 1.3.2 MAC sublayer (Medium Access Control)

**What it does.** Schedules transmissions among users — decides who gets to transmit, when, and with what resources.

**Key functions:**

- **Scheduling** — dynamic per-TTI (transmission-time interval) assignment of time-frequency resources to users, based on channel quality (CQI feedback) and QoS requirements.
- **HARQ control** — manages retransmissions based on PHY-layer HARQ outcomes.
- **Random access** — contention-based initial access (RACH), for new connections or when no scheduled resource is available.
- **Multiplexing** — packs multiple logical channels into transport blocks.
- **Timing advance, power headroom reporting.**

**Visible as:** TS 25.321 (UMTS MAC), TS 36.321 (LTE MAC), TS 38.321 (5G MAC).

### 1.3.3 MAC-management sublayer

Sits between MAC and the upper layers — responsible for **radio resource control** and **mobility**.

**Key functions (in LTE this is the RRC layer):**

- **Connection management** — setup, reconfiguration, release of RRC connections.
- **Mobility management** — handover decisions, cell reselection.
- **Radio resource allocation** — configuring MAC and PHY parameters (e.g., HARQ, MIMO mode).
- **Paging** — reaching idle-mode UEs.
- **Broadcast** — system information delivery.
- **Security** — key management, encryption of signalling.

**Visible as:** TS 25.331 (UMTS RRC), TS 36.331 (LTE RRC), TS 38.331 (5G RRC).

### 1.3.4 Higher layers

- **PDCP** (Packet Data Convergence Protocol) — header compression, ciphering, integrity.
- **RLC** (Radio Link Control) — segmentation, ARQ, in-order delivery.
- **NAS** (Non-Access Stratum) — mobility management, session management, outside the radio access network.
- **IP and above** — the transport and application layers.

### 1.3.5 Control plane vs. user plane

Every protocol has two "planes":

| Plane | Carries | Example |
|---|---|---|
| **Control** | Signalling (RRC, NAS) | Connection setup, handover commands |
| **User** | Data (IP packets) | Voice, video, web traffic |

The two planes share the PHY (physical transmission) but have separate protocol stacks above it.

---

## 1.4 The wireless and cellular environments

### 1.4.1 Frequency reuse

The **cellular concept** — the founding idea of mobile telephony — is that the same frequency band can be reused in geographically separated cells, as long as they're far enough apart.

**Cluster size** $N$ — the number of cells in a repeating pattern. Common values: $N = 3, 4, 7, 9, 12$.

The **reuse distance** $D$ — the distance between cell centers using the same frequency — is

$$
\boxed{\;D = \sqrt{3N}\cdot R\;}
$$

where $R$ is the cell radius (distance from center to vertex in a hexagonal cell).

**Reuse factor:**

$$
\boxed{\;K = \frac{D}{R} = \sqrt{3N}\;}
$$

**Capacity** per unit area scales with $1/N$: smaller $N$ → more reuse → higher capacity, but also more interference from co-channel cells.

### 1.4.2 Co-channel interference and SIR

The **signal-to-interference ratio (SIR)** at a mobile determines voice/data quality. For a hexagonal grid, the worst case is when the mobile is at the edge of its cell — farthest from its own base station, closest to interfering base stations.

**For a tier-1 interferer scenario** (6 co-channel cells in the first tier), and path-loss exponent $n$:

$$
\boxed{\;\text{SIR} \approx \frac{(D/R)^n}{6} = \frac{(3N)^{n/2}}{6}\;}
$$

(approximation assuming all 6 interferers are at distance $D$; slightly conservative).

**In dB:**

$$
\text{SIR}_{\text{dB}} \approx 10\log_{10}\!\left(\frac{(3N)^{n/2}}{6}\right)
$$

**Example** — for $N = 7$ and $n = 4$:

$$
\text{SIR} \approx \frac{(21)^2}{6} = 73.5 \approx 18.7\ \text{dB}
$$

This is adequate for analog FM (typically needs ~18 dB), which is why AMPS used $N = 7$.

### 1.4.3 Sectoring

Divide each hexagonal cell into **sectors** — typically **3 sectors** (120°) or **6 sectors** (60°) — using directional antennas at the base station.

**Effect:** the number of co-channel interferers in the **first tier** is reduced from 6 (omni) to **2** (3-sector) or **1** (6-sector).

The SIR improves by a factor of $6/2 = 3$ (3-sector, ~4.77 dB) or $6/1 = 6$ (6-sector, ~7.78 dB).

Alternatively, sectoring lets you **reduce the cluster size** $N$ at the same SIR — from $N = 7$ (omni) to $N = 3$ or $N = 4$ (sectored) — and gain capacity.

**Trade-off:** sectoring requires more antennas per site (3 or 6 instead of 1), more sectors to hand over between, and slightly more frequent handovers.

### 1.4.4 Cell types and hierarchy

Modern networks use a **heterogeneous** cell hierarchy:

| Cell type | Radius | Transmit power | Use |
|---|---|---|---|
| **Macrocell** | 1–30 km | 20–40 W | Coverage |
| **Microcell** | 100–1000 m | 1–5 W | Capacity in dense areas |
| **Picocell** | 10–200 m | 0.1–1 W | Indoor, hotspots |
| **Femtocell** | 10–50 m | 10–100 mW | Home / small office |

Hierarchy lets the operator provide coverage (macro) and capacity (pico) at different cost points.

---

## 1.5 The wireless propagation channel

The wireless channel is the **biggest differentiator** between wired and wireless system design. Three concurrent effects:

1. **Large-scale path loss** — signal strength decreases with distance.
2. **Shadowing** — random variation due to obstructions (buildings, hills).
3. **Small-scale fading** — rapid amplitude/phase fluctuations due to multipath.

### 1.5.1 Free-space path loss

For an **isotropic** antenna in free space, the received power at distance $d$ (in metres) from a transmitter of power $P_t$:

$$
\boxed{\;P_r = P_t\, G_t\, G_r\, \left(\frac{\lambda}{4\pi d}\right)^2\;}
$$

In dB, with $d$ in km and $f$ in MHz (Friis form):

$$
\boxed{\;\text{FSPL}_{\text{dB}} = 32.44 + 20\log_{10}(f_{\text{MHz}}) + 20\log_{10}(d_{\text{km}})\;}
$$

This is the **path loss in free space** — the irreducible baseline; real channels are worse.

**Notable property:** FSPL increases with $f^2$ — **higher frequencies have higher path loss**. This is why mmWave (28 GHz+) has much shorter range than sub-1 GHz.

### Worked example 1.1 — FSPL at different frequencies

Compute the FSPL for $d = 1$ km at:

- **900 MHz (GSM):**
  $\text{FSPL} = 32.44 + 20\log(900) + 20\log(1) = 32.44 + 59.08 + 0 = 91.5$ dB.

- **2 GHz (UMTS):**
  $\text{FSPL} = 32.44 + 20\log(2000) + 0 = 32.44 + 66.02 = 98.5$ dB.

- **28 GHz (5G mmWave):**
  $\text{FSPL} = 32.44 + 20\log(28000) + 0 = 32.44 + 88.94 = 121.4$ dB.

**Interpretation.** Going from 2 GHz to 28 GHz costs **23 dB** of additional path loss at the same distance — a factor of ~200 in received power. This is why mmWave cells are small (typically 100–300 m in urban).

### 1.5.2 Empirical path-loss models

Free-space is optimistic. Real channels have additional loss from buildings, foliage, and terrain. The **Okumura–Hata** model fits measured data in urban areas:

**Okumura–Hata (urban, 150–1500 MHz):**

$$
\boxed{\;\text{PL}_{\text{dB}} = 69.55 + 26.16\log(f) - 13.82\log(h_b) - a(h_m) + (44.9 - 6.55\log(h_b))\log(d)\;}
$$

where:
- $f$ = frequency in MHz
- $h_b$ = base station antenna height in metres (typically 30–200 m)
- $h_m$ = mobile antenna height (1–10 m)
- $d$ = distance in km
- $a(h_m)$ = mobile antenna correction factor (environment-dependent)

**For a medium-small city** with $f = 900$ MHz, $h_b = 50$ m, $h_m = 1.5$ m, $d = 1$ km:

$$
a(h_m) = (1.1\log(900) - 0.7)h_m - (1.56\log(900) - 0.8) \approx 0.016
$$

$$
\text{PL} = 69.55 + 26.16\log(900) - 13.82\log(50) - 0.016 + (44.9 - 6.55\log(50))\log(1)
$$

The last term is 0 at $d = 1$ km. Computing:

- $26.16 \log(900) = 26.16 \times 2.954 = 77.28$
- $13.82 \log(50) = 13.82 \times 1.699 = 23.48$
- Sum: $69.55 + 77.28 - 23.48 - 0.016 = 123.33$ dB.

Compare with FSPL at 900 MHz, 1 km (91.5 dB): Okumura–Hata gives **~32 dB more loss** — a realistic urban environment is much worse than free space.

**COST-231** extends Okumura–Hata to 2 GHz:

$$
\text{PL} = 46.3 + 33.9\log(f) - 13.82\log(h_b) - a(h_m) + (44.9 - 6.55\log(h_b))\log(d) + C_M
$$

where $C_M = 3$ dB for dense urban, $0$ for medium cities. Use COST-231 for 1.5–2 GHz (UMTS).

### 1.5.3 Log-normal shadowing

Even at fixed distance, the received power varies randomly as the mobile moves — buildings, hills, foliage block the path differently.

**Log-normal shadowing** models this as a Gaussian random variable in dB:

$$
\boxed{\;P_r(d)\big|_{\text{dB}} = P_r(d)\big|_{\text{mean,dB}} + X_\sigma,\quad X_\sigma \sim \mathcal N(0, \sigma^2)\;}
$$

Typical $\sigma$:
- **Urban:** 6–10 dB
- **Suburban:** 4–8 dB
- **Rural:** 4–6 dB

**Coverage probability** — the fraction of locations at distance $d$ where received power exceeds a threshold $P_{\min}$:

$$
\boxed{\;\Pr\{P_r(d) \ge P_{\min}\} = Q\!\left(\frac{P_{\min} - \bar P_r(d)}{\sigma}\right)\;}
$$

where $\bar P_r(d)$ is the mean received power (from path-loss model) and $Q(\cdot)$ is the Gaussian tail function.

### Worked example 1.2 — coverage probability

A cell edge is at $d = 1$ km from the base station. Mean received power (from Okumura–Hata) is $\bar P_r = -95$ dBm. Shadowing std $\sigma = 8$ dB. Receiver sensitivity is $P_{\min} = -105$ dBm.

$$
\Pr\{\text{coverage}\} = Q\!\left(\frac{-105 - (-95)}{8}\right) = Q\!\left(\frac{-10}{8}\right) = Q(-1.25)
$$

$Q(-1.25) = 1 - Q(1.25) \approx 1 - 0.106 = 0.894$.

**~89% of locations** at cell edge have coverage — 11% are in shadow at any given instant (mobility averages this out).

### 1.5.4 Small-scale fading

Over **short distances** (a few wavelengths) and **short times** (milliseconds), the signal fluctuates rapidly. This is **multipath fading** — multiple reflected paths arrive with different phases and either constructively or destructively combine.

**Key channel parameters:**

**Delay spread** $\tau_{\max}$ — the difference between the arrival times of the first and last significant multipath component. Typically:
- **Indoor:** 20–300 ns
- **Urban:** 0.5–5 μs
- **Hilly terrain:** 10–30 μs

**RMS delay spread** $\tau_{\text{rms}}$ — the standard deviation of the power delay profile. Used for coherence bandwidth.

**Coherence bandwidth** $B_c$ — the range of frequencies over which the channel response is **approximately flat** (highly correlated):

$$
\boxed{\;B_c \approx \frac{1}{5\tau_{\text{rms}}}\ \text{(50\% correlation)}\quad\text{or}\quad B_c \approx \frac{1}{50\tau_{\text{rms}}}\ \text{(90\% correlation)}\;}
$$

If the signal bandwidth $B_s \gg B_c$, the channel is **frequency-selective** (needs equalization); if $B_s \ll B_c$, it's **flat**.

**Doppler spread** $f_D$ — caused by motion; the spread of frequencies around the carrier:

$$
\boxed{\;f_D = \frac{v f_c}{c}\;}
$$

where $v$ is the mobile speed, $f_c$ is the carrier frequency, and $c$ is the speed of light.

**Coherence time** $T_c$ — the time over which the channel is **approximately constant**:

$$
\boxed{\;T_c \approx \frac{1}{f_D} \approx \frac{0.423}{f_D}\ \text{(50\% correlation)}\;}
$$

If the symbol time $T_s \ll T_c$, the channel is **slow fading**; if $T_s \gg T_c$, it's **fast fading**.

### Worked example 1.3 — coherence bandwidth and time

**Urban channel:** $\tau_{\text{rms}} = 2\ \mu\text{s}$, $f_c = 2$ GHz, $v = 50$ km/h = 13.9 m/s.

**Coherence bandwidth** (50% correlation):
$$
B_c = \frac{1}{5 \times 2\,\mu\text{s}} = 100\ \text{kHz}
$$

UMTS uses $5$ MHz bandwidth — **much greater** than $B_c = 100$ kHz. So UMTS is **frequency-selective** → needs Rake receiver / equalization.

**Doppler spread:**
$$
f_D = \frac{13.9 \times 2 \times 10^9}{3 \times 10^8} = 92.7\ \text{Hz}
$$

**Coherence time:**
$$
T_c \approx \frac{0.423}{92.7} \approx 4.6\ \text{ms}
$$

UMTS symbol duration is $1/3.84\ \text{Mchip/s} \approx 0.26\ \mu\text{s}$ — **much less** than $T_c = 4.6$ ms. So the channel is **slow fading** relative to symbols → coherence between many symbols.

### 1.5.5 Fading distributions

Three models cover most scenarios:

**Rayleigh fading** — no line-of-sight; all paths are reflected. The envelope $r$ has PDF:

$$
\boxed{\;p(r) = \frac{r}{\sigma^2}\, e^{-r^2/(2\sigma^2)},\quad r \ge 0\;}
$$

Mean square $E[r^2] = 2\sigma^2$. Phase uniform on $[0, 2\pi)$.

**Rician fading** — one strong line-of-sight (LoS) plus scattered paths. Parameterized by the **Rician $K$ factor** = (LoS power) / (scattered power). $K = 0$ → Rayleigh; $K \to \infty$ → pure AWGN.

$$
\boxed{\;p(r) = \frac{r}{\sigma^2} \exp\!\left(-\frac{r^2 + A^2}{2\sigma^2}\right) I_0\!\left(\frac{A r}{\sigma^2}\right),\quad r \ge 0\;}
$$

where $A$ is the LoS amplitude, $K = A^2/(2\sigma^2)$.

**Nakagami-$m$** — general fading, parameterized by $m$:

$$
p(r) = \frac{2 m^m r^{2m-1}}{\Gamma(m)\Omega^m}\exp\!\left(-\frac{m r^2}{\Omega}\right)
$$

where $\Omega = E[r^2]$, $m \ge 0.5$. $m = 1$ → Rayleigh, $m \to \infty$ → AWGN, $m < 1$ → severe fading.

---

## 1.6 Legacy systems — AMPS and TACS

### 1.6.1 AMPS (Advanced Mobile Phone System)

Introduced by Bell Labs in **1983** in the US. The first widely deployed **analog cellular** system — the archetypal 1G.

| Parameter | Value |
|---|---|
| Frequency band | 824–849 MHz (uplink), 869–894 MHz (downlink) — **800 MHz** band |
| Duplexing | **FDD** — separate uplink/downlink, 45 MHz separation |
| Multiple access | **FDMA** — 30 kHz channels |
| Modulation | **FM** — frequency modulation |
| Channel bandwidth | 30 kHz |
| Number of voice channels | 832 (with 42 control channels) |
| Cell cluster size | typically **$N = 7$** |
| Voice coding | analog, companded |
| Handover | hard handover (break-before-make) |
| Security | none (analog, easy to eavesdrop) |

**Architecture (simplified):**

- **Mobile Station (MS)** — the handset.
- **Base Station (BS)** — transmits/receives in one cell.
- **Mobile Telephone Switching Office (MTSO)** — controls the base stations, handles call routing and handover.

**Why 30 kHz FM?** Voice quality required a channel bandwidth consistent with FM's 4 kHz baseband and ~12 dB SIR — hence 30 kHz after guard bands. FM's capture effect helped reject some interference, but the SIR requirement (~18 dB) was still high, forcing $N = 7$.

### 1.6.2 TACS (Total Access Communication System)

The European 1G system — first deployed in the UK in **1985**. Very similar to AMPS, with adjustments for European spectrum:

| Parameter | TACS | AMPS |
|---|---|---|
| Frequency band | 890–915 / 935–960 MHz | 824–849 / 869–894 MHz |
| Channel bandwidth | **25 kHz** | 30 kHz |
| Number of channels | **1000** | 832 |
| Modulation | FM | FM |
| Access | FDMA | FDMA |

**ETACS** (Extended TACS) added more channels for the UK market.

### 1.6.3 Limitations of 1G — the motivation for 2G

The limitations of AMPS and TACS were **exactly the design goals of GSM**:

| Limitation | Consequence | GSM's answer |
|---|---|---|
| **Analog voice** | Poor security; easy to eavesdrop | **Digital voice** + encryption (A5/1, A5/3) |
| **Low capacity** | Spectrum congestion | **TDMA** — 8 slots per 200 kHz carrier |
| **Poor data** | No data services beyond slow modem | **SMS**, **circuit-switched data**, then **GPRS/EDGE** |
| **Roaming** | Different systems in each country | **Global standard** — GSM deployed in 200+ countries |
| **Cost** | Handsets expensive | **SIM card** decoupling handset from subscription |
| **No paging beyond SMS-like services** | | Integrated |

**GSM** (Groupe Spécial Mobile, then Global System for Mobile Communications) was designed by ETSI beginning in 1982, first deployed in **1991** — Chapter 3 covers it in full.

---

## 1.7 Chapter summary

1. **Wireless has evolved roughly one generation per decade** — from analog FDMA (1G) to all-IP OFDMA + massive MIMO + mmWave (5G). Each generation introduces a generation-defining PHY technique and a generation-defining application.
2. **The standards landscape splits by range** — WPAN, WLAN, WMAN, WWAN, satellite, LPWAN. Cellular (WWAN) is this course's focus, but the others reappear in Ch 6.
3. **Cellular networks are layered:** PHY (bits over channel), MAC (scheduling, HARQ, random access), MAC-management / RRC (connection, mobility, resource allocation), and upper layers (PDCP, RLC, NAS, IP).
4. **Frequency reuse is the foundation of cellular capacity.** Cluster size $N$ determines reuse distance $D = \sqrt{3N} R$. Smaller $N$ → more capacity but more co-channel interference. **SIR $\approx (3N)^{n/2}/6$** for omni cells with $n$ the path-loss exponent.
5. **Sectoring** divides cells into 120° or 60° sectors. It reduces first-tier interferers from 6 to 2 (or 1) — improving SIR by 3× or 6×, or equivalently allowing smaller $N$.
6. **The wireless channel has three scales:** large-scale path loss (FSPL, Okumura–Hata, COST-231), shadowing (log-normal), small-scale fading (Rayleigh, Rician, Nakagami).
7. **Coherence bandwidth** $B_c \sim 1/(5\tau_{\text{rms}})$ and **coherence time** $T_c \sim 1/f_D$ define the time-frequency granularity of the channel. Signal bandwidth $\gg B_c$ → frequency-selective; symbol time $\gg T_c$ → fast fading.
8. **AMPS and TACS** are the archetypal 1G systems: analog FM, FDMA, $N = 7$. Their limitations (analog security, low capacity, no data) drove the design of GSM.

---

## 1.8 Quiz

### A. Multiple choice

1. The **cluster size** $N$ in a cellular system determines:
   (a) The number of users per cell (b) The reuse distance and co-channel interference
   (c) The transmit power (d) The modulation order

2. **FSPL** increases with frequency as:
   (a) $f$ (b) $f^2$ (in dB: $20\log f$) (c) $\sqrt f$ (d) $1/f$

3. For a hexagonal cellular system with $N = 7$ and $n = 4$, the omni-cell SIR is approximately:
   (a) 10 dB (b) 13 dB (c) 18.7 dB (d) 30 dB

4. **Log-normal shadowing** has typical standard deviation (urban):
   (a) 1 dB (b) 6–10 dB (c) 20 dB (d) 40 dB

5. Which layer of the 3GPP stack is responsible for **HARQ retransmissions**?
   (a) PHY (b) MAC (c) RRC (d) NAS

6. **Coherence bandwidth** is inversely proportional to:
   (a) Doppler spread (b) RMS delay spread (c) Path loss (d) Transmit power

7. **AMPS** uses which multiple-access scheme?
   (a) TDMA (b) FDMA (c) CDMA (d) OFDMA

8. The **channel bandwidth** of AMPS is:
   (a) 12.5 kHz (b) 25 kHz (c) 30 kHz (d) 200 kHz

9. **Sectoring** a cell into 3 sectors reduces first-tier co-channel interferers from 6 to:
   (a) 1 (b) 2 (c) 3 (d) 6

10. Which is **not** a channel effect at the small-scale (fast fading) level?
    (a) Multipath (b) Rayleigh distribution (c) Shadowing by buildings (d) Doppler spread

11. The **Rician $K$ factor** characterizes:
    (a) Shadowing depth (b) Path-loss exponent (c) LoS-to-scattered power ratio (d) Coherence bandwidth

12. Which generation introduced **all-IP core networks**?
    (a) 2G (b) 3G (c) 4G (d) 5G

### B. Fill in the blank

1. The path-loss exponent in free space is $n = $\_\_\_\_.
2. In a hexagonal cellular system, reuse distance $D = $\_\_\_\_ $\cdot R$.
3. The physical layer is often called Layer \_\_\_\_ in the 3GPP stack.
4. The **coherence bandwidth** at 50% correlation is approximately $B_c \approx 1/$\_\_\_\_ (in terms of RMS delay spread).
5. The Doppler spread formula is $f_D = v \cdot f_c / $\_\_\_\_.
6. AMPS operates in the \_\_\_\_ MHz band.
7. **Cluster size** is often chosen so that $\text{SIR}$ meets a target — for AMPS (analog FM), the target was approximately \_\_\_\_ dB.
8. GSM uses \_\_\_\_ slots per 200 kHz carrier.
9. The **channel bandwidth** of UMTS is \_\_\_\_ MHz.
10. In the \_\_\_\_-cell hierarchy, femtocells have the smallest coverage (typically 10–50 m).

### C. Define / explain

1. Explain the **cellular concept** and why frequency reuse multiplies capacity. What trade-off is introduced?
2. State the **free-space path-loss** formula (Friis, in dB). Compute the FSPL at 1 km for 900 MHz and 28 GHz — how much worse is mmWave?
3. Describe **log-normal shadowing**. State the coverage-probability formula and give a numerical example.
4. Define **delay spread**, **coherence bandwidth**, **Doppler spread**, and **coherence time**. Explain how each relates to the choice of **equalization** vs. **coding** vs. **interleaving**.
5. Distinguish **frequency-selective** and **flat** fading; **fast** and **slow** fading. Give an example of a system for each regime.
6. State the **SIR** approximation for omni-cellular hexagonal systems. Show that sectoring improves it by 3× (3-sector) or 6× (6-sector).
7. Describe the **three layers** (PHY, MAC, RRC) that make up the 3GPP radio access network. What are the key functions of each?
8. Describe the **AMPS** and **TACS** systems. Identify three limitations that motivated the development of GSM.

---

## 1.9 Answer key

??? success "A. Multiple choice"
    1. **(b)** — reuse distance and co-channel interference.
    2. **(b)** — $f^2$ → $20\log f$ in dB.
    3. **(c)** — $(21)^2/6 \approx 73.5 \approx 18.7$ dB.
    4. **(b)** — 6–10 dB urban.
    5. **(b)** — MAC handles HARQ.
    6. **(b)** — RMS delay spread.
    7. **(b)** — FDMA.
    8. **(c)** — 30 kHz.
    9. **(b)** — 2.
    10. **(c)** — shadowing is large-scale, not small-scale.
    11. **(c)** — LoS/scattered ratio.
    12. **(c)** — 4G (LTE/SAE).

??? success "B. Fill in the blank"
    1. 2 (free space; distance-squared attenuation)
    2. $\sqrt{3N}$
    3. 1
    4. $5\tau_{\text{rms}}$ (for 50% correlation)
    5. $c$ (speed of light)
    6. 800 (824–894)
    7. 18 (roughly)
    8. 8
    9. 5
    10. hetero (heterogeneous)

??? success "C. Define / explain — model answers"
    1. *Cellular concept:* divide the coverage area into cells (typically hexagons), each served by a base station. The same spectrum is reused in cells separated by a cluster distance, allowing far more simultaneous users than the total channel bandwidth would allow. *Trade-off:* reused frequencies cause **co-channel interference**. Reducing cluster size $N$ increases capacity but also interference — the design goal is to pick $N$ (and antenna patterns) so that SIR meets the target for the modulation/coding scheme.
    2. *FSPL formula:* $\text{FSPL}_{\text{dB}} = 32.44 + 20\log f_{\text{MHz}} + 20\log d_{\text{km}}$. At 900 MHz, 1 km: **91.5 dB**. At 28 GHz, 1 km: **121.4 dB**. Difference: **~30 dB** — mmWave signal at 1 km is 1000× weaker than sub-1 GHz at the same distance. This is why mmWave cells are 100–300 m in urban deployments.
    3. *Log-normal shadowing:* received power in dB fluctuates as a Gaussian random variable around the mean path-loss prediction: $P_r|_{dB} = \bar P_r(d) + X_\sigma$, $X_\sigma \sim \mathcal N(0, \sigma^2)$. Coverage probability = $\Pr\{P_r \ge P_{\min}\} = Q((P_{\min} - \bar P_r)/\sigma)$. *Example:* $\bar P_r = -95$ dBm, $P_{\min} = -105$ dBm, $\sigma = 8$ dB: $Q(-10/8) = Q(-1.25) \approx 0.89$ — about 89% coverage at that distance.
    4. *Delay spread:* range of multipath arrival times. *Coherence bandwidth:* $B_c \approx 1/(5\tau_{\text{rms}})$, the frequency range over which the channel is flat. If $B_s \gg B_c$, frequency-selective → needs **equalization** (or OFDM to convert to flat per subcarrier). *Doppler spread:* $f_D = v f_c / c$ — frequency smearing from motion. *Coherence time:* $T_c \approx 0.423/f_D$ — the time over which the channel is constant. If $T_s \ll T_c$, slow fading; else fast fading → needs **interleaving** to distribute errors across coherence blocks.
    5. *Frequency-selective vs. flat:* frequency-selective when $B_s \gg B_c$ (e.g., UMTS 5 MHz vs $B_c = 100$ kHz — frequency-selective, needs Rake). Flat when $B_s \ll B_c$ (e.g., narrowband voice). *Fast vs. slow:* fast when $T_s \gg T_c$ (rare in practice; high-speed rail at high frequency); slow when $T_s \ll T_c$ (typical). Slow fading is tracked by adaptive modulation; fast fading needs interleaving and coding.
    6. *SIR approximation:* $\text{SIR} \approx (3N)^{n/2}/6$ for 6 first-tier interferers. With 3-sector antennas, only 2 of the 6 interferers are received in any sector, so SIR improves by factor 3 (4.77 dB). With 6-sector (60°), only 1 interferer → 6× (7.78 dB).
    7. *PHY (L1):* modulation, coding, multiple access, MIMO, HARQ physical-layer processing, channel estimation, power control. *MAC (L2 lower):* scheduling (per-TTI resource assignment), HARQ control, random access, multiplexing logical channels. *RRC (L3, MAC-management):* connection setup/release, handover, mobility, paging, broadcast, security key management. Together they take IP packets from the core network and deliver them over the radio link, adapting to channel and mobility conditions.
    8. *AMPS:* 800 MHz, FDMA, 30 kHz FM channels, analog voice, $N = 7$. *TACS:* 900 MHz European equivalent, 25 kHz channels. *Limitations motivating GSM:* (i) **analog** → poor security, easy eavesdropping; (ii) **low capacity** — FDMA with $N=7$ couldn't meet demand; (iii) **no data services** beyond slow modem, no SMS-equivalent; (iv) **fragmented standards** across countries prevented roaming; (v) **expensive handsets** locked to subscription. GSM answered all five: digital encryption, TDMA (8 slots/carrier), SMS+GPRS/EDGE, global standard, SIM card.

---

## Further reading

- **T. S. Rappaport**, *Wireless Communications: Principles and Practice*, 2nd ed., Prentice Hall, 2002 — Ch 1 (overview), Ch 3 (path loss), Ch 4 (fading), Ch 9 (multiple access).
- **A. F. Molisch**, *Wireless Communications*, 2nd ed., Wiley, 2011 — Ch 4–5 (propagation, fading), Ch 19–20 (cellular systems).
- **D. Tse & P. Viswanath**, *Fundamentals of Wireless Communication*, Cambridge, 2005 — Ch 2 (channel models) — free PDF online.
- **M. Mouly & M.-B. Pautet**, *The GSM System for Mobile Communications*, Cell & Sys, 1992 — Ch 1–2 for the historical context and 1G systems.
- **H. Holma & A. Toskala**, *WCDMA for UMTS: HSPA Evolution and LTE*, 5th ed., Wiley, 2010 — Ch 1 (history).
- **3GPP TS 25.301** — UMTS radio interface protocol architecture (for the layering).
- **3GPP TS 36.300** — LTE overall description (for the LTE layering equivalent).

---

## Suggested tutorial problems

1. **Link budget.** Base station: 43 dBm transmit, 15 dBi antenna. Mobile: 0 dBi antenna, −110 dBm receiver sensitivity. Compute the maximum cell radius in free space at 900 MHz and at 2 GHz. Assume no additional losses.

2. **Frequency reuse.** For a hexagonal cellular system with $N = 7$ and $n = 4$ (path-loss exponent), compute the SIR. Repeat with $N = 3$ and $n = 4$. What is the capacity gain from $N = 7 \to N = 3$, and what is the SIR penalty?

3. **Sectoring.** Show that 3-sector (120°) coverage improves the SIR by ~4.77 dB. Then compute the minimum $N$ that achieves the same SIR as $N = 7$ without sectoring, using 3-sector antennas.

4. **Coverage with shadowing.** For a cell edge at $d = 2$ km, mean received power $\bar P_r = -100$ dBm, $\sigma = 6$ dB, and receiver sensitivity $P_{\min} = -108$ dBm, compute the coverage probability at the cell edge.

5. **Delay spread.** Given a power delay profile with significant components at delays $\{0, 0.5, 1, 2\}$ μs with relative powers $\{0, -3, -6, -12\}$ dB, compute the RMS delay spread and coherence bandwidth. Is a 5 MHz LTE signal flat or frequency-selective over this channel?

6. **Doppler and coherence time.** At $f_c = 3.5$ GHz, compute the coherence time for $v = 3$ km/h (pedestrian), $30$ km/h (urban driving), and $120$ km/h (highway). For each, decide if LTE (1 ms TTI) experiences slow or fast fading.

7. **Fading distributions.** Plot the PDF of Rayleigh fading with $\Omega = 1$. Then plot the Rician PDF with $K = 3, 10, 20$ dB on the same axes. Comment on the effect of increasing $K$.

8. **Legacy comparison.** For AMPS and TACS, compute the total number of voice channels in each system (given the spectrum allocations). Compare with GSM Phase 1 (8 slots/carrier, 200 kHz carrier) — what is the capacity multiplier?

9. **Generational comparison.** Draw a table comparing 1G through 5G on these axes: multiple access, modulation, peak rate, core network, key applications.

10. **Practical link budget — 4G vs. 5G.** Using the same transmit power and antenna gains, compute the range for LTE at 2 GHz and 5G NR at 28 GHz, assuming identical receiver sensitivity and free-space path loss up to 500 m then $n = 3.5$ beyond. How small must mmWave cells be to achieve the same coverage?