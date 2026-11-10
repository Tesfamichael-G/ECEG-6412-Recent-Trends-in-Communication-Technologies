# Chapter 5 — Advanced Broadband Wireless Access & Services

!!! abstract "Chapter at a glance"
    **Contact hours:** 3 lecture · **Home study:** 7 h · **Part IV — Emerging technologies**
    
    **Coverage (syllabus):** 4G technologies · 4G features and challenges · technology
    path · LTE and WiMAX · network architecture · capacity of WiMAX · radio and
    network components.

---

## Learning outcomes

By the end of this chapter you should be able to:

1. State the **IMT-Advanced requirements** for 4G and how LTE/LTE-Advanced and
   WiMAX meet them.
2. Explain **OFDMA** (downlink) and **SC-FDMA** (uplink) — the PHY foundation of
   LTE — and contrast with WCDMA.
3. Compute **LTE resource block capacity**, **peak throughput**, and **spectral
   efficiency** from modulation, coding, MIMO, and bandwidth parameters.
4. Describe **MIMO** — spatial multiplexing, transmit diversity, beamforming — and
   compute MIMO capacity gain.
5. Draw and describe the **4G all-IP architecture** (EPC) — eNodeB, MME, S-GW,
   P-GW, HSS — and identify the role of each.
6. Explain **LTE-Advanced** enhancements — carrier aggregation, higher-order MIMO,
   CoMP, relays — and their contribution to peak rates.
7. Describe **WiMAX** architecture and PHY, compute its capacity, and compare with
   LTE.
8. Explain **radio and network components** — remote radio heads, baseband units,
   C-RAN, distributed antenna systems — and their role in modern 4G/5G deployments.
9. Analyse **network capacity and design** — spectral efficiency, cell-edge
   performance, and the "capacity per MHz per km²" metric.

---

## 5.1 The 4G vision and requirements

### 5.1.1 What is 4G?

**4G** is the generation of mobile systems defined by the **ITU-R IMT-Advanced**
requirements (2008), intended to succeed IMT-2000 (3G) with a fundamental leap in
capability:

| Requirement | Value | Notes |
|---|---|---|
| **Peak downlink** | 1 Gbps (low mobility), 100 Mbps (high mobility) | Nominal for stationary and driving |
| **Peak uplink** | 500 Mbps (low mobility) | |
| **Spectral efficiency** | 15 bps/Hz DL, 6.75 bps/Hz UL | Peak, per cell |
| **Bandwidth** | Up to 100 MHz (aggregated) | Flexible |
| **Latency (user plane)** | < 10 ms | For interactive services |
| **Latency (control plane)** | < 100 ms | Idle → connected |
| **Mobility** | Up to 350 km/h | With acceptable quality |
| **All-IP** | Yes | No circuit switching |
| **Coexistence** | With 2G/3G | Via multi-mode UEs |

### 5.1.2 Technology path

Three standards competed and evolved to meet the 4G requirements:

| Standard | 3G predecessor | Developed by | First commercial |
|---|---|---|---|
| **LTE** (Long Term Evolution) | UMTS (WCDMA) | 3GPP | 2009 |
| **LTE-Advanced** | LTE | 3GPP | 2013 |
| **WiMAX** (Mobile WiMAX) | IEEE 802.16e | IEEE | 2006 |
| **WiMAX 2 (WirelessMAN-Advanced)** | IEEE 802.16m | IEEE | 2011 |

**Key evolution milestones:**

- **2004** — 3GPP starts LTE study (Release 8).
- **2006** — First Mobile WiMAX deployment (South Korea, "WiBro").
- **2008** — LTE Release 8 frozen; IMT-Advanced requirements published.
- **2009** — First commercial LTE network (TeliaSonera, Stockholm and Oslo).
- **2011** — LTE-Advanced (Release 10) frozen.
- **2013** — LTE-Advanced commercial (SK Telecom, 150 Mbps).
- **2018** — LTE dominates global mobile subscriptions.

**The market outcome:** LTE won globally. WiMAX, despite an early technical lead,
lost to LTE because of **ecosystem effects** — LTE benefited from the massive
global GSM/UMTS operator base, standardized evolution path, and dual-mode devices
that fell back to GSM/UMTS gracefully. WiMAX operators had to build networks from
scratch and had fewer devices.

By 2018, WiMAX was commercially dead; LTE carried ~70% of global mobile traffic.

### 5.1.3 4G challenges

The transition from 3G to 4G posed engineering challenges that shaped the design:

**1. Spectrum scarcity.** 3G's 5 MHz carrier couldn't deliver 100 Mbps. 4G needed
**20 MHz**, later **100+ MHz** via **carrier aggregation**.

**2. Flat architecture.** 3G's hierarchical RNC/BSC added latency. 4G removed
the RNC — the eNodeB talks directly to the core network. This flattens the
architecture and reduces round-trip latency from ~50 ms to ~10 ms.

**3. All-IP.** Circuit switching is gone — even voice is carried over IP
(VoLTE, Voice over LTE) with SIP signalling and dedicated QoS bearers.

**4. MIMO.** The only way to reach Gbps-class rates at reasonable SNR is **MIMO**
(multiple-input multiple-output) — 4×4 or 8×8 antenna arrays exploiting spatial
multiplexing.

**5. Flexible spectrum.** 4G must work in paired (FDD) and unpaired (TDD) spectrum,
with variable bandwidths (1.4, 3, 5, 10, 15, 20 MHz per carrier).

---

## 5.2 OFDMA and SC-FDMA — the new PHY

### 5.2.1 Why not WCDMA?

WCDMA (Chapter 4) works well for moderate data rates, but at 100 Mbps it hits
fundamental limits:

| Limitation | Consequence at high rate |
|---|---|
| **Spread signal** | The 5 MHz carrier can only support ~5 bps/Hz (Shannon); 100 Mbps needs >20 MHz |
| **Complex Rake receiver** | Becomes impractical at very high chip rates |
| **Self-interference** | At very high SNR, interference (not noise) dominates — difficult to overcome |
| **Slow channel estimation** | Rake combining requires fast adaptation; scaling is hard |

**OFDMA** replaces CDMA's time-domain spreading with **frequency-domain parallelism** —
essentially the "right tool" for high-rate broadband channels.

### 5.2.2 OFDMA (downlink)

**OFDMA = Orthogonal Frequency Division Multiple Access** — a **multi-user** version
of OFDM (Chapter 2).

**Key idea:** the total bandwidth is divided into **narrow subcarriers**, and each
subcarrier is allocated dynamically to whichever UE has the best channel at that
frequency.

**LTE resource grid:**

- **Subcarrier spacing:** $\Delta f = 15$ kHz (also 7.5 kHz for MBSFN; 3.75 kHz
  for NB-IoT).
- **Resource element (RE):** one subcarrier × one OFDM symbol.
- **Resource block (RB):** 12 subcarriers × 7 symbols (normal CP) = 84 REs, or
  12 × 6 = 72 REs (extended CP). **1 RB = 180 kHz × 0.5 ms slot.**

**Time-frequency structure:**

| Level | Duration | Contents |
|---|:---:|---|
| **OFDM symbol** | 71.4 μs (normal CP) | One QAM symbol per subcarrier |
| **Slot** | 0.5 ms (7 symbols) | 7 OFDM symbols |
| **Subframe** | 1 ms (2 slots) | 14 symbols |
| **Radio frame** | 10 ms (10 subframes) | 20 slots |
| **Superframe** | — | (In LTE-A carrier aggregation, multiple frames) |

**The scheduler** (in the eNodeB) allocates RBs every **1 ms** (per subframe) to
each UE. This is **dynamic, frequency-selective scheduling** — the scheduler picks
the best RBs for each UE each TTI (transmission-time interval).

**Frequency diversity:** by allocating non-adjacent RBs to a UE (frequency-selective
scheduling), the scheduler mitigates fading on specific subcarriers.

### 5.2.3 SC-FDMA (uplink)

**SC-FDMA = Single-Carrier FDMA** — used in the uplink because of a **PAPR problem**
with OFDMA.

**Why not OFDMA in the uplink?**

- UE battery power is limited — the PA must operate efficiently.
- **OFDMA's PAPR (10–12 dB)** would require the UE PA to back off 10+ dB → very
  inefficient → short battery life and limited uplink range.

**SC-FDMA** applies a **DFT precoding** step before IFFT:

$$
\boxed{\;\text{data} \to \text{DFT (size M)} \to \text{subcarrier mapping} \to \text{IFFT (size N)} \to \text{CP} \to \text{transmit}\;}
$$

The effect: the transmitted signal is effectively a **single-carrier signal** with
**PAPR ~3–6 dB** — much closer to a constant envelope, allowing the UE PA to
operate near saturation.

**Trade-offs:**

| Property | OFDMA | SC-FDMA |
|---|---|---|
| PAPR | 10–12 dB | **3–6 dB** |
| UE PA efficiency | Low | **High** |
| Frequency scheduling flexibility | **High** (any RB) | Moderate (must be contiguous RBs) |
| Receiver complexity (equalization) | Low | Higher (DFT-spread) |
| Spectral efficiency | High | Slightly lower |
| **Used in LTE** | **Downlink** | **Uplink** |
| **Used in 5G NR** | Downlink AND uplink (SA) | Optional uplink (coverage) |

### Worked example 5.1 — LTE resource block capacity

**Scenario:** LTE 20 MHz carrier, normal CP, 2×2 MIMO downlink, 64-QAM, rate-3/4
coding.

**Step 1 — RBs per subframe:**

- 20 MHz channel = **100 RBs** (each RB is 180 kHz; 100 × 180 = 18 MHz used of 20 MHz;
  2 MHz is guard band).
- Per subframe (1 ms): 100 RBs.

**Step 2 — REs per subframe:**

- 12 subcarriers × 7 symbols × 2 slots = **168 REs per RB per subframe**.
- But LTE reserves some REs for **reference signals** (pilots), **PDCCH** (control),
  and **PBCH** / **PSS** / **SSS** (sync). Typically **~30% overhead** for control.
- Usable REs for data: ~120 REs per RB per subframe (approximately 85% efficiency).

**Step 3 — Bits per subframe:**

- Per RE: 64-QAM = 6 bits/symbol; rate-3/4 coding → **4.5 bits per RE**.
- Per RB: 120 REs × 4.5 = **540 bits per RB**.
- Per subframe: 100 RBs × 540 = **54,000 bits per subframe**.

**Step 4 — Peak data rate:**

- 1 ms subframes → **1000 subframes per second**.
- Single-stream: 54,000 × 1000 = **54 Mbps**.
- With 2×2 MIMO (2 spatial streams): **108 Mbps**.

**Comparison with 3GPP LTE Cat-4 (150 Mbps):** The 108 Mbps estimate is close;
the standard quote of 150 Mbps assumes: 2×2 MIMO, 20 MHz, 64-QAM, rate-1 (before
coding), and slightly higher reference-signal efficiency. With rate-3/4 coding,
practical peak is ~110–130 Mbps.

### Worked example 5.2 — SC-FDMA vs OFDMA PAPR trade-off

**Scenario:** 10 MHz uplink channel. A UE with a 23 dBm PA and 30 dBm max power.

**With OFDMA:**

- PAPR of 10 dB → peak power 33 dBm.
- PA must back off to 20 dBm average → effective radiated power 20 dBm.
- Coverage limited: uplink cell radius at 20 dBm.

**With SC-FDMA:**

- PAPR of 4 dB → peak power 27 dBm.
- PA can operate at 26 dBm average → **+6 dB uplink power**.
- Coverage: **~2× the cell radius** (path-loss exponent 3.5: 6 dB ≈ 2× radius).

**Why LTE chose SC-FDMA for uplink:** 6 dB uplink gain is worth ~2× coverage — the
difference between a UE that works indoors and one that doesn't. Downlink uses
OFDMA because the eNodeB (not the UE) transmits, with no battery constraint.

---

## 5.3 MIMO — the spatial dimension

**MIMO** (Multiple-Input Multiple-Output) is the technology that makes gigabit
wireless feasible. By using multiple antennas at both transmitter and receiver,
MIMO enables:

- **Spatial multiplexing** — transmit independent data streams simultaneously.
- **Transmit diversity** — combine signals from multiple antennas for reliability.
- **Beamforming** — focus energy toward a specific UE.
- **Multi-user MIMO** — serve multiple UEs simultaneously on the same resource.

### 5.3.1 Spatial multiplexing

With $N_t$ transmit antennas and $N_r$ receive antennas, the channel is an
$N_r \times N_t$ matrix $H$. If the paths are sufficiently uncorrelated,
the capacity grows **linearly with $\min(N_t, N_r)$**:

$$
\boxed{\;C = B \log_2\det\!\left(I + \frac{\text{SNR}}{N_t}\, H H^\dagger\right)\;}
$$

For an i.i.d. Rayleigh channel, this simplifies at high SNR to:

$$
\boxed{\;C \approx \min(N_t, N_r) \cdot B \log_2(\text{SNR}) + \text{constant}\;}
$$

**2×2 MIMO at high SNR ≈ 2× the capacity of SISO.** This is the **spatial
multiplexing gain** — the single biggest reason LTE achieves 100+ Mbps per 20 MHz.

**Requirements:**

- **Rich scattering** — paths must be uncorrelated (typical urban environment).
- **Antenna spacing** ≥ λ/2 (or cross-polarized antennas).
- **Rank of the channel matrix** = min(N_t, N_r) (for full multiplexing).

**LTE MIMO configurations:**

| Configuration | Peak streams | Typical use |
|---|---|---|
| **1×1** (SISO) | 1 | Fallback |
| **2×2** (MIMO) | 2 | Standard LTE Cat-3/4 |
| **4×4** (MIMO) | 4 | LTE-Advanced Cat-6+ |
| **8×8** (MIMO) | 8 | LTE-Advanced Pro |

### 5.3.2 Transmit diversity

When the channel is rank-deficient (e.g., single dominant path, correlated antennas),
spatial multiplexing fails. **Transmit diversity** instead uses the multiple
antennas for **reliability** — sending the same information via orthogonal codes
so the receiver combines them.

**Alamouti scheme** (2×1 MIMO):

$$
\boxed{\;s_1 \to (x_1, x_2),\qquad s_2 \to (-x_2^*, x_1^*)\;}
$$

The two symbols are transmitted from the two antennas in two consecutive time
slots. The receiver combines them to achieve **2nd-order diversity** — a 3 dB
power gain in Rayleigh fading at the cost of half the spatial multiplexing rate.

**SFBC (Space-Frequency Block Coding)** — the LTE version of Alamouti, applied
over adjacent subcarriers instead of adjacent time slots.

**Use:** PDSCH (data channel) when spatial multiplexing isn't possible; PBCH (broadcast),
PDCCH (control), PSS/SSS (sync).

### 5.3.3 Beamforming

**Beamforming** uses multiple antennas at the transmitter to focus energy toward a
specific UE:

$$
\boxed{\;\mathbf{w} = \frac{\mathbf{h}^*}{\|\mathbf{h}\|},\quad y = \mathbf{h}^\top \mathbf{w}\, s = \|\mathbf{h}\|\, s\;.}
$$

**Gain:** $10\log_{10}(N_t)$ dB in SNR — for 8 antennas, 9 dB.

**Used for:**

- **Coverage extension** at cell edge.
- **Interference reduction** — the beam doesn't radiate toward other cells.
- **Multi-user MIMO** — separate beams to different UEs.

**LTE MIMO mode 7** (TM7) supports single-layer beamforming; **TM8** supports
dual-layer beamforming (for MU-MIMO); **5G massive MIMO** uses beamforming with
64–256 antennas.

### Worked example 5.3 — MIMO capacity gain

**Scenario:** SNR = 20 dB (linear 100), 20 MHz channel.

**SISO:**
$C = 20 \times 10^6 \times \log_2(101) \approx 133$ Mbps.

**2×2 MIMO** (i.i.d. Rayleigh, high SNR):
$C \approx 2 \times 133 = 266$ Mbps.

**4×4 MIMO** (i.i.d. Rayleigh, high SNR):
$C \approx 4 \times 133 = 532$ Mbps.

**8×8 MIMO:**
$C \approx 8 \times 133 = 1064$ Mbps.

**In practice:**

- **2×2 MIMO:** ~1.7× gain (not quite 2× due to correlation and pilot overhead).
- **4×4 MIMO:** ~3× gain in good conditions.
- **8×8 MIMO:** used only in LTE-A Pro and 5G NR, in dense urban / indoor.

The gain is not quite linear because:

- Reference signals (pilots) for channel estimation consume overhead, scaling
  with $N_t$.
- Antenna correlation reduces the channel rank.
- Higher-order modulation is harder to decode with more streams.

Still, MIMO is the workhorse of 4G/5G spectral efficiency.

### 5.3.4 Multi-user MIMO

Rather than serving one UE with multiple streams, **MU-MIMO** serves multiple UEs
simultaneously on the same time-frequency resource, using spatial separation:

- **eNodeB** has $N_t$ antennas.
- **Each UE** has 1–2 antennas.
- The eNodeB separates UEs by **precoding** — weighting each UE's signal so they
  don't interfere (zero-forcing or MMSE precoding).

**Gain:** For $K$ UEs served simultaneously, uplink capacity scales with $\min(N_t, K)$
— the same multiplexing gain, but shared across users.

**LTE TM8** supports downlink MU-MIMO (up to 4 UEs); **5G massive MIMO** supports
16+ UEs simultaneously.

---

## 5.4 LTE architecture — the Evolved Packet Core (EPC)

The LTE architecture reflects a **fundamental redesign** of the core network — the
EPC (Evolved Packet Core) — with **flat, all-IP** architecture.

### 5.4.1 Flat architecture

Compared with 3G (UMTS), LTE removes the RNC entirely:

| Aspect | UMTS | LTE |
|---|---|---|
| **Base station** | NodeB + RNC (two separate nodes) | **eNodeB** (single node handles PHY, MAC, RRC, and user-plane forwarding) |
| **Radio resource control** | RNC | **eNodeB** (was RNC) |
| **Handover control** | RNC | **eNodeB ↔ eNodeB via X2** |
| **Latency** | ~50 ms | **~10 ms** |
| **Interfaces** | Iu, Iub, Iur | **S1 (to core), X2 (between eNodeBs)** |

The **eNodeB** now performs RNC functions plus base station functions — a single
node covering PHY, MAC, RLC, PDCP, and RRC. This **flattening** dramatically
reduces latency and simplifies operations.

### 5.4.2 Network elements

**eNodeB (Evolved Node B)** — the 4G base station.

- All radio access functions: PHY, MAC, RLC, PDCP, RRC.
- **User-plane**: forwards IP packets between UE and S-GW.
- **Control-plane**: manages RRC signalling, radio bearer setup.
- **Inter-eNodeB handover** via the **X2** interface.
- Manages multiple cells (typically 3 sectors per site).

**MME (Mobility Management Entity)** — the core network control-plane node.

- **Signalling**: NAS (Non-Access Stratum) messages — attach, detach, tracking
  area updates, authentication.
- **Mobility**: tracks UE location at the tracking-area (TA) granularity.
- **Bearer management**: sets up and tears down EPS bearers.
- **Handover**: coordinates S1-based handovers between MMEs.
- **Security**: manages authentication with HSS via the S6a interface.

**S-GW (Serving Gateway)** — the user-plane anchor.

- **Anchors the user plane** for inter-eNodeB handovers — packets are forwarded
  through the S-GW during handover, so the UE's IP session stays alive.
- **Mobility within an MME pool**: the S-GW serving the UE stays constant as the
  UE moves between eNodeBs.
- **Charging data**: collects usage statistics.
- **Lawful interception**: provides intercept capability.

**P-GW (Packet Data Network Gateway)** — the gateway to external networks.

- **Allocates the UE's IP address** (IPv4, IPv6, or dual-stack).
- **Anchors** the UE's session to external PDNs (Internet, IMS, corporate).
- **QoS enforcement**: applies bearer-level policies (QCI, ARP).
- **Charging**: per-bearer traffic accounting.
- **Lawful interception**: same as S-GW.
- **Acts as the policy enforcement point** for PCRF (Policy and Charging Rules Function).

**HSS (Home Subscriber Server)** — the master subscriber database.

- **Subscription data** (APN, QoS profile, roaming restrictions).
- **Authentication vectors** (like GSM's HLR/AuC combined).
- **Location**: which MME is currently serving the UE.
- Interfaced by MME via **S6a**.

**PCRF (Policy and Charging Rules Function)** — policy server.

- **QoS policies** (bearer-level).
- **Charging rules** (online/offline).
- Interfaced by P-GW via **Gx**.

### 5.4.3 Interfaces

| Interface | Between | Purpose |
|---|---|---|
| **Uu** | UE ↔ eNodeB | Radio air interface |
| **S1-MME** | eNodeB ↔ MME | Control plane (S1 for control) |
| **S1-U** | eNodeB ↔ S-GW | User plane (S1 for user) |
| **X2** | eNodeB ↔ eNodeB | Inter-eNodeB handover and CoMP |
| **S5/S8** | S-GW ↔ P-GW | Within PLMN / between PLMNs |
| **S6a** | MME ↔ HSS | Subscription and authentication |
| **S11** | MME ↔ S-GW | Control-plane within EPC |
| **Gx** | P-GW ↔ PCRF | Policy and charging |
| **SGi** | P-GW ↔ PDN | External network gateway |

### 5.4.4 The EPS bearer

The **EPS bearer** is the basic unit of QoS in LTE. Each UE has one or more bearers:

- **Default bearer** — always present; established at UE attach; best-effort.
- **Dedicated bearer** — established on demand for specific traffic (e.g., VoLTE
  voice, video); has a specific **QCI** (QoS Class Identifier).

| QCI | Service | Priority | Delay budget |
|:---:|---|:---:|:---:|
| **1** | Conversational voice (VoLTE) | 2 | 100 ms |
| **2** | Conversational video | 4 | 150 ms |
| **5** | IMS signalling | 1 | 100 ms |
| **7** | Voice, video, gaming | 7 | 100 ms |
| **8** | TCP-based (web, email) | 8 | 300 ms |
| **9** | Best-effort | 9 | 300 ms |

Each QCI maps to specific QoS parameters — scheduling priority, target delay,
target error rate — which the eNodeB uses to prioritize over the air.

### Worked example 5.4 — LTE latency budget

**User-plane latency:**

| Component | Latency |
|---|:---:|
| UE processing (encoder + ciphering + modulation) | 2 ms |
| Frame alignment (waiting for next subframe) | 0.5 ms |
| Air interface (HARQ + decoding) | 4–8 ms |
| eNodeB processing | 1 ms |
| S1-U transport (eNodeB to S-GW) | 1–2 ms |
| S-GW processing | 0.5 ms |
| P-GW processing (if intranet) | 1 ms |
| **Total (one-way)** | **~10 ms** |

**Control-plane latency (idle → connected):**

- UE sends **RRC connection request** (random access preamble + message 3).
- eNodeB → MME **Initial UE Message**.
- MME **authentication** (via HSS, ~2 ms).
- **Bearer setup** (MME → S-GW → eNodeB).
- RRC reconfiguration to UE.
- Total: **~50–100 ms** for the first connection, **~10–20 ms** for subsequent.

**Comparison with 3G:** UMTS control-plane latency was ~200–500 ms. LTE's flat
architecture cuts this by 5×.

---

## 5.5 LTE physical layer details

### 5.5.1 Frame structure

**FDD (Frequency Division Duplex):** separate uplink and downlink frequencies.

- **Frame type 1:** 10 ms radio frame; 20 slots; 2 slots per subframe.
- Downlink and uplink frames are transmitted **simultaneously** on paired bands.

**TDD (Time Division Duplex):** shared frequency, alternated in time.

- **Frame type 2:** 10 ms radio frame; configurable uplink/downlink pattern.
- **Special subframe** for the downlink-to-uplink switch (contains DwPTS, GP, UpPTS).

**Configurations (TDD):** 7 UL/DL patterns, ranging from 1:9 (DL-heavy) to 5:3 (UL-heavy) to symmetric.

### 5.5.2 Downlink physical channels

| Channel | Purpose |
|---|---|
| **PDSCH** (Physical Downlink Shared CHannel) | Main data channel — user data + RRC signalling |
| **PDCCH** (Physical Downlink Control CHannel) | Scheduling grants, HARQ control, power control |
| **PHICH** (Physical HARQ Indicator CHannel) | HARQ ACK/NACK |
| **PCFICH** (Physical Control Format Indicator CHannel) | Size of PDCCH region |
| **PBCH** (Physical Broadcast CHannel) | System information (MIB — Master Info Block) |
| **PMCH** (Physical Multicast CHannel) | MBMS broadcast |
| **PSS** (Primary Synchronization Signal) | Cell search — 62 sequences |
| **SSS** (Secondary Synchronization Signal) | Cell group ID and frame timing |
| **CRS** (Cell Reference Signal) | Channel estimation for PDSCH (in LTE; suppressed in NR) |
| **CSI-RS** (Channel State Information RS) | CSI feedback reference signal |

### 5.5.3 Uplink physical channels

| Channel | Purpose |
|---|---|
| **PUSCH** (Physical Uplink Shared CHannel) | Main data channel |
| **PUCCH** (Physical Uplink Control CHannel) | UCI — HARQ ACK/NACK, CQI, scheduling requests |
| **PRACH** (Physical Random Access CHannel) | Random access preamble for initial access, scheduling requests, handover |

### 5.5.4 Link adaptation and HARQ

**Adaptive Modulation and Coding (AMC)** — the eNodeB chooses modulation and
coding rate based on **CQI** (Channel Quality Indicator) feedback:

| CQI | Modulation | Coding rate | Efficiency (bps/Hz) |
|:---:|:---:|:---:|:---:|
| 1 | QPSK | 0.076 | 0.15 |
| 4 | QPSK | 0.301 | 0.60 |
| 7 | 16-QAM | 0.490 | 1.96 |
| 10 | 64-QAM | 0.650 | 3.90 |
| 13 | 64-QAM | 0.820 | 4.92 |
| 15 | 64-QAM | 0.926 | 5.55 |

The UE measures CSI and reports the CQI it can decode at 10% BLER. The eNodeB
picks the modulation and coding accordingly.

**HARQ** — as in UMTS, but even faster:

- **Fast retransmission** — 8 ms round trip (1 ms subframe + 7 ms decode time).
- **Incremental redundancy** — retransmissions carry new parity bits (chase
  combining for the simplest case).
- **Up to 4 HARQ processes** in the downlink (parallel pipes) to keep the pipe
  full while retransmissions are pending.

### 5.5.5 Reference signals and channel estimation

**Downlink:** Cell-specific reference signals (CRS) are inserted every 6 subcarriers.
The UE estimates the channel response by comparing received CRS to known CRS
values.

**Uplink:** Demodulation reference signals (DM-RS) embedded in PUSCH; sounding
reference signals (SRS) for wideband channel sounding.

**The reference signals consume ~5–10% of resource elements** — a necessary
overhead for coherent detection.

---

## 5.6 LTE-Advanced (Release 10+)

Release 8 LTE met most IMT-Advanced requirements, but "true 4G" needed further
evolution to meet the 1 Gbps peak-rate target. **LTE-Advanced** (Release 10) added:

### 5.6.1 Carrier aggregation (CA)

Combine multiple LTE carriers into one logical channel:

$$
\boxed{\;B_{\text{total}} = \sum_{i=1}^{K} B_i,\quad K \le 5\ \text{component carriers}\;}
$$

**Options:**

- **Intra-band contiguous** — adjacent carriers in one band.
- **Intra-band non-contiguous** — separate carriers in same band.
- **Inter-band** — carriers in different bands (e.g., 800 MHz + 1800 MHz).

**Maximum:** 5 carriers of 20 MHz = **100 MHz total** → up to **3 Gbps** peak
(4×4 MIMO, 100 MHz, 64-QAM).

**Deployment impact:** allows operators with fragmented spectrum (common in most
markets) to offer wider "virtual" channels.

### 5.6.2 Enhanced MIMO

- **Downlink:** 8×8 MIMO (8 layers) → 8× peak rate.
- **Uplink:** 4×4 MIMO.

**Peak rate with 8×8 MIMO + 20 MHz (no CA):** 8 × 150 Mbps ≈ 1.2 Gbps.

**With CA + 8×8 MIMO:** 5 carriers × 8 streams × 150 Mbps = **6 Gbps**.

### 5.6.3 Coordinated Multipoint (CoMP)

Multiple eNodeBs **coordinate** to serve a UE at the cell edge:

- **Joint transmission (JT)** — multiple eNodeBs transmit the same data to the
  UE, which combines them. Requires tight timing sync and CSI sharing.
- **Dynamic point selection (DPS)** — the UE is served by the best eNodeB at
  any given moment (fast switching).
- **Coordinated scheduling/beamforming (CS/CB)** — eNodeBs coordinate their
  beams to reduce interference.

**Benefit:** cell-edge throughput improves by **~30–50%** — significant because
cell edge is where users experience the worst performance.

**Challenge:** requires **X2 interface** backhaul with **sub-1 ms latency** and
high bandwidth — expensive to deploy. CoMP is deployed in limited form in
real networks.

### 5.6.4 Relay nodes

Small low-power base stations that **forward** data from a macro eNodeB to UEs:

- **Decode-and-forward** relay — receives, decodes, re-encodes, transmits.
- **Amplify-and-forward** relay — simple analog amplification (lower latency, more noise).

**Benefit:** extend coverage to areas with weak macro coverage (rural, indoor)
without full backhaul (relay uses the same spectrum for the backhaul, not fiber).

### 5.6.5 Peak rates table

| Release | Downlink peak | Uplink peak | Key features |
|:---:|:---:|:---:|---|
| **8 (LTE)** | 150 Mbps | 75 Mbps | 20 MHz, 2×2 MIMO, 64-QAM |
| **10 (LTE-A)** | 1 Gbps | 500 Mbps | 100 MHz (5×CA), 8×8 MIMO |
| **12 (LTE-A Pro)** | 3 Gbps | 1.5 Gbps | Enhanced CA, 256-QAM DL |
| **13** | 3.9 Gbps | 1.5 Gbps | 32-carrier CA (unlicensed) |
| **14** | 4.5 Gbps | 2.2 Gbps | eLAA, feLAA |

**The path from Release 8 to Release 14** shows how 4G kept evolving — 30× the
peak rate over 8 years.

### Worked example 5.5 — LTE-A carrier aggregation peak rate

**Scenario:** 5 carriers of 20 MHz each, intra-band contiguous. 4×4 MIMO on each
carrier. 64-QAM, rate-3/4 coding.

**Per carrier, per stream:**
~100 Mbps (from Worked example 5.1, without MIMO's doubling).

**4 streams per carrier:**
400 Mbps per carrier.

**5 carriers:**
5 × 400 = **2 Gbps** peak.

**With 64-QAM (6 bits/symbol) and 8×8 MIMO (8 streams):**
5 × 8 × 100 = **4 Gbps** — matching the Release 10 specification of ~3 Gbps
(the difference is due to control overhead and reference signals).

**In practice:** commercial LTE-A networks achieve 300–600 Mbps peak (with 60 MHz
of aggregated spectrum), and 100–200 Mbps average in dense urban.

---

## 5.7 WiMAX

**WiMAX** (Worldwide Interoperability for Microwave Access) is the IEEE 802.16
family of standards for wireless metropolitan area networks. It was the "other"
4G standard — technically comparable to LTE, commercially eclipsed by it.

### 5.7.1 IEEE 802.16 family

| Standard | Year | Purpose |
|:---:|:---:|---|
| **802.16** | 2001 | Fixed wireless (line-of-sight, 10–66 GHz) |
| **802.16a** | 2003 | Fixed wireless, 2–11 GHz (NLOS) |
| **802.16d** | 2004 | Fixed WiMAX (OFDM, 256 FFT) |
| **802.16e** | 2005 | **Mobile WiMAX** (OFDMA, 2048 FFT, scalable) |
| **802.16m** | 2011 | **WiMAX 2** (WirelessMAN-Advanced, ITU-R IMT-Advanced) |

**Mobile WiMAX (802.16e)** was the commercially relevant version — deployed in
Korea (WiBro), USA (Sprint/Clearwire), Russia (Yota), Pakistan, and a few others.

### 5.7.2 Mobile WiMAX physical layer

**OFDMA-based** — very similar to LTE:

| Parameter | WiMAX (802.16e) | LTE (Release 8) |
|---|---|---|
| **Multiple access (DL/UL)** | OFDMA / OFDMA | OFDMA / **SC-FDMA** |
| **Subcarrier spacing** | 10.94 kHz (fixed) | 15 kHz |
| **FFT size** | 128, 512, 1024, 2048 | 128, 256, 512, 1024, 2048 |
| **Channel bandwidth** | 1.25, 5, 10, 20 MHz | 1.4, 3, 5, 10, 15, 20 MHz |
| **Frame duration** | 5 ms | 10 ms |
| **Cyclic prefix** | 1/4, 1/8, 1/16, 1/32 | Normal (4.7 μs), extended (16.67 μs) |
| **MIMO** | 2×2 (baseline), 4×4 (later) | 2×2, 4×4, 8×8 |
| **Modulation** | QPSK, 16-QAM, 64-QAM | QPSK, 16-QAM, 64-QAM |
| **Duplex** | TDD (FDD optional) | FDD or TDD |

**Key difference:** WiMAX uses **OFDMA in the uplink too** (rather than LTE's
SC-FDMA). This gives WiMAX better frequency-scheduling flexibility but **worse
PAPR** — a UE power-efficiency penalty.

**Another key difference:** WiMAX's **TDD-first** design (FDD was optional) versus
LTE's **FDD-first** design. TDD gives better uplink/downlink flexibility for
data-heavy traffic but requires global time synchronization.

### 5.7.3 WiMAX architecture

**ASN (Access Service Network)** — the radio access network.

- **BS (Base Station)** — the WiMAX base station.
- **ASN-GW (ASN Gateway)** — controls one or more BSs, analogous to LTE's MME
  + S-GW combined.

**CSN (Connectivity Service Network)** — the core network.

- **HA (Home Agent)** — Mobile IP home agent (for mobility).
- **AAA** — Authentication, Authorization, Accounting (RADIUS/Diameter).
- **DHCP** — IP address allocation.
- **PCRF** — policy control (in WiMAX 2).

**Key architectural difference from LTE:** WiMAX has **two core network nodes**
(BS + ASN-GW), vs. LTE's **three** (eNodeB + MME + S-GW/P-GW). LTE is flatter.

### 5.7.4 WiMAX capacity

WiMAX 802.16e peak rate (20 MHz, 2×2 MIMO, 64-QAM):

- **Downlink:** ~75 Mbps (TDD, 3:1 DL/UL ratio).
- **Uplink:** ~25 Mbps.

**With 802.16m (WiMAX 2)**, 4×4 MIMO, and 100 MHz (via aggregation):

- **Downlink:** ~1 Gbps peak.

**In practice,** Mobile WiMAX deployments achieved:

- **Peak:** 20–40 Mbps DL per sector in well-deployed networks.
- **Average:** 3–10 Mbps DL per user in loaded conditions.
- **Cell capacity:** ~30–50 Mbps per sector (comparable to early LTE).

### Worked example 5.6 — WiMAX capacity per MHz per km²

**Scenario:** WiMAX 802.16e, TDD, 20 MHz channel, 3:1 DL/UL ratio, 2×2 MIMO.
Sector throughput (DL) = 30 Mbps. Site has 3 sectors → 90 Mbps per site.

**Cell area:** With 2 km radius (typical suburban), each hexagonal cell has
area ≈ $2.598 \times R^2$ = 10.4 km². But 3 sites cover 3 cells, so per-cell
area ≈ 10.4 km².

**Capacity per site per MHz per km²:**

$$
\frac{90\ \text{Mbps}}{20\ \text{MHz} \times 10.4\ \text{km}^2} \approx 0.43\ \text{bps/Hz/km}^2
$$

**Comparison with early LTE:** LTE at 20 MHz, 2×2 MIMO, 3-sector, 2 km cells
achieved ~150 Mbps per site → **0.72 bps/Hz/km²** — roughly **1.7× WiMAX**.
LTE's better uplink (SC-FDMA) and higher MIMO order are the main reasons.

---

## 5.8 WiMAX vs. LTE — the 4G battle

| Aspect | WiMAX (802.16e/m) | LTE (Release 8/10) |
|---|---|---|
| **PHY** | OFDMA (DL + UL) | OFDMA (DL) + SC-FDMA (UL) |
| **Duplex** | TDD first, FDD optional | FDD first, TDD optional |
| **Peak rate** | ~75 Mbps (Rel 1), ~1 Gbps (Rel 2) | 150 Mbps (Rel 8), 1 Gbps (Rel 10) |
| **Latency** | ~30 ms | ~10 ms |
| **MIMO** | 2×2 baseline, 4×4 later | 2×2 to 8×8 |
| **Mobility** | 60–120 km/h | Up to 350 km/h |
| **Ecosystem** | Small (backed by Intel, Samsung, Clearwire) | **Massive** (backed by 3GPP, 200+ operators) |
| **Spectrum** | 2.5 GHz (mostly), 3.5 GHz, unlicensed | 700/800/1800/2100/2600 MHz (legacy 2G/3G spectrum) |
| **Backward compatibility** | None — requires new spectrum | Dual-mode with 2G/3G → seamless fallback |
| **Commercial deployment** | Limited (Korea, US, Russia, Pakistan) | Global (every continent) |
| **Timeline** | 2006–2011 deployment | 2009–present |
| **Market outcome** | **Commercially dead** (~2015) | **Global 4G standard** |

### 5.8.1 Why WiMAX lost

**WiMAX lost for reasons outside the technical specs:**

1. **Ecosystem.** LTE inherited the global GSM/UMTS operator base — 200+ operators
   worldwide, each with existing spectrum and customers. WiMAX operators had to
   build networks and customer bases from scratch.

2. **Backward compatibility.** LTE devices are dual-mode with 2G/3G → users can
   drop out of coverage gracefully. WiMAX devices only work on WiMAX.

3. **Standards process.** 3GPP has a clear, predictable release cycle (new release
   every 12–18 months) with broad industry participation. IEEE 802.16 was less
   cohesive and slower to iterate.

4. **Device ecosystem.** Qualcomm, Apple, Samsung, etc. built LTE chipsets —
   not WiMAX. By 2013, LTE handsets were everywhere; WiMAX handsets were scarce.

5. **Intel's exit.** Intel (the driving force behind WiMAX) shut down its WiMAX
   division in 2010 and pivoted to LTE — a fatal blow.

6. **The TDD vs. FDD issue.** WiMAX was TDD-first; most operators owned FDD spectrum
   (from 2G/3G). Using WiMAX meant not using their existing spectrum.

**Technically**, WiMAX was comparable to or in some ways slightly ahead of LTE
(especially early — WiMAX supported 4×4 MIMO before LTE did). **Commercially**,
it lost decisively to the much larger LTE ecosystem.

### 5.8.2 Legacy of WiMAX

Even though WiMAX lost as a cellular standard, its technology influenced:

- **LTE and 5G NR PHY** — WiMAX proved OFDMA + MIMO at scale, which LTE adopted.
- **WiFi (802.11)** — WiMAX's OFDMA influenced WiFi 4/5/6/7 (802.11n/ac/ax/be).
- **Fixed wireless access (FWA)** — WiMAX lives on as a niche FWA technology;
  5G FWA (using mmWave) is essentially its spiritual successor.

---

## 5.9 Radio and network components

Modern 4G/5G networks use advanced radio and network infrastructure that goes
beyond the "macro base station" model. Understanding these components is essential
for network design.

### 5.9.1 Antenna systems

**MIMO antenna arrays:**

- **Co-located MIMO** — multiple antennas at one site, closely spaced.
- **Distributed MIMO** — antennas spread across cells, coordinated (used in CoMP).

**Active Antenna Systems (AAS):**

- Traditional: passive antennas + remote radio unit (RRU) + feeder cable.
- **AAS:** each antenna element has its own RF chain — enables **massive MIMO**
  (64–256 elements) and **3D beamforming** (both horizontal and vertical).

**Massive MIMO** (precursor to 5G):

- 64+ antennas at the base station.
- **Beamforming gain:** up to 10 log₁₀(64) = 18 dB per beam.
- **Multi-user MIMO:** serves multiple UEs simultaneously.
- **Used in 4G LTE-A Pro and 5G NR.**

### 5.9.2 Remote Radio Head (RRH) and Baseband Unit (BBU)

Traditional base station: RF and baseband in one box at the tower → heavy, hard
to maintain, and the feeder cable (coax) wastes power.

**Modern split:**

- **RRH (Remote Radio Head)** — RF and antenna at the tower top. Small, light,
  power-efficient.
- **BBU (Baseband Unit)** — baseband processing at the bottom of the tower or
  in a centralized location.
- **CPRI/OBSAI interface** — fiber carrying digitized I/Q samples between RRH
  and BBU.

**Advantages:**

- **Higher power efficiency** — no coax feeder losses.
- **Easier installation** — lighter tower-top equipment.
- **Fiber transport** — the BBU can be far away (up to 20 km with CPRI).

### 5.9.3 Cloud RAN (C-RAN)

**C-RAN** centralizes BBUs from many cell sites into a **BBU hotel**:

- RRHs at the cell sites (tower tops).
- **Dark fiber** from each RRH to the centralized BBU pool.
- **BBU pool** — many BBUs co-located in one facility.

**Advantages:**

- **Statistical multiplexing** — 100 BBUs can serve 300 cell sites, because each
  site's traffic varies throughout the day.
- **Easier upgrades** — swap BBU pool hardware without visiting cell sites.
- **CoMP-ready** — coordinated transmission is trivial when BBUs are co-located.
- **Power savings** — centralize cooling and power supply.

**Disadvantages:**

- **Fiber dependency** — every cell site needs dark fiber (a significant cost).
- **Latency** — CPRI latency must be < 100 μs for tight coordination.
- **Single point of failure** — if the BBU pool fails, all cells go down (mitigated
  by redundancy).

**Adoption:** Used in dense urban and 5G deployments; limited in rural areas
where fiber is expensive.

### 5.9.4 Small cells

**Small cells** are low-power base stations for capacity and coverage in specific
areas:

| Type | Power | Coverage | Use |
|---|:---:|:---:|---|
| **Femtocell** | 10–100 mW | 10–50 m | Home/small office |
| **Picocell** | 100–500 mW | 50–200 m | Enterprise, hotspot |
| **Microcell** | 1–5 W | 200–1000 m | Dense urban |
| **Macrocell** | 20–40 W | 1–30 km | Wide-area coverage |

**Heterogeneous network (HetNet)** — mixing cell types to optimize coverage and
capacity.

### 5.9.5 Backhaul

**Backhaul** connects cell sites to the core network. Options:

| Technology | Capacity | Typical distance | Use |
|---|:---:|:---:|---|
| **Fiber** | 1–100 Gbps | up to 80 km | Preferred; where available |
| **Microwave** | 100 Mbps–1 Gbps | 1–30 km (LOS) | Rural, difficult-to-reach sites |
| **E-band (70/80 GHz)** | 1–10 Gbps | 1–3 km | Dense urban |
| **Free-space optical** | 1–10 Gbps | 1–2 km | Line-of-sight only |
| **Satellite** | 10–100 Mbps | Global | Remote sites |
| **DSL** | 10–100 Mbps | 1–5 km | Small cells (limited) |

**Backhaul is the hidden bottleneck** — a 4G site with 3 sectors × 300 Mbps
peak needs **~1–3 Gbps** of backhaul at peak. Fiber or microwave capacity often
lags the radio capacity by 5–10 years, causing congestion at the cell.

**5G target:** 10–20 Gbps per site → nearly all 5G sites need fiber.

---

## 5.10 Network capacity and design

### 5.10.1 Spectral efficiency

**Peak spectral efficiency** (bps/Hz) is the theoretical maximum:

| System | Peak DL spectral efficiency | Peak UL |
|---|:---:|:---:|
| **UMTS R99** | 0.4 bps/Hz | 0.4 bps/Hz |
| **HSPA+ (R11)** | 8.4 bps/Hz | 2.3 bps/Hz |
| **LTE (Release 8)** | 7.5 bps/Hz (2×2) | 3.75 bps/Hz (1×2) |
| **LTE-Advanced (Release 10)** | 15 bps/Hz (8×8) | 6.75 bps/Hz (4×4) |
| **LTE-A Pro (Release 13)** | 25 bps/Hz (massive MIMO) | 9.6 bps/Hz |
| **5G NR (Sub-6)** | 30 bps/Hz | 15 bps/Hz |
| **5G NR (mmWave)** | 60+ bps/Hz | 30 bps/Hz |

**Peak is achievable only in ideal conditions** — highest SNR, best MIMO rank,
no interference. **Average spectral efficiency** in real networks is ~30–50% of
peak.

### 5.10.2 Cell-edge performance

**The cell-edge user** is the one who experiences the worst signal — typically
at the cell boundary, with interference from neighboring cells at full strength.

**Metrics:**

- **5th percentile throughput** — the throughput achieved by the slowest 5% of users.
- **Cell-edge spectral efficiency** — bps/Hz at the 5th percentile.

| System | Average spectral efficiency | Cell-edge spectral efficiency |
|---|:---:|:---:|
| **UMTS R99** | 0.5 bps/Hz/cell | 0.03 bps/Hz/cell |
| **HSPA+** | 2 bps/Hz/cell | 0.15 bps/Hz/cell |
| **LTE (2×2)** | 3 bps/Hz/cell | 0.1 bps/Hz/cell |
| **LTE-A (8×8 + CoMP)** | 6 bps/Hz/cell | 0.2 bps/Hz/cell |
| **5G NR (massive MIMO)** | 15 bps/Hz/cell | 0.3 bps/Hz/cell |

**Cell-edge is 10–100× worse than average** — this is the fundamental challenge
of cellular design. CoMP, beamforming, and small cells all target cell-edge
improvement.

### Worked example 5.7 — capacity per km² for LTE

**Scenario:** LTE Release 8, 20 MHz, 3-sector macro site, average spectral
efficiency 2.5 bps/Hz/cell (average load).

**Cell throughput:** 2.5 bps/Hz × 20 MHz = **50 Mbps per cell**.
**Per 3-sector site:** 150 Mbps.

**Site coverage area:** In suburban deployment with 2 km cell radius:

- Cell area ≈ $2.598 R^2$ = 10.4 km² per cell.
- 3 sectors per site = 3 cells.
- Site coverage = 3 × 10.4 = 31.2 km².

**Capacity per km²:** 150 Mbps / 31.2 km² ≈ **4.8 Mbps/km²**.

**With LTE-Advanced (8×8 MIMO, CA, ~2× spectral efficiency):**
~10 Mbps/km².

**With 5G NR (mmWave, dense small cells, ~10× spectral efficiency):**
50–100 Mbps/km² in dense urban — the reason 5G is being deployed mainly in
dense areas.

### 5.10.3 Traffic density and capacity planning

**Traffic density** (Gbps/km²) is the key design metric in modern networks:

| Scenario | Traffic density | Cell density needed |
|---|:---:|:---:|
| Rural | 0.01–0.1 Gbps/km² | Macro cells (10–30 km) |
| Suburban | 0.1–1 Gbps/km² | Macro cells (1–3 km) |
| Urban | 1–10 Gbps/km² | Macro + microcells (500 m) |
| Dense urban | 10–50 Gbps/km² | Microcells + picocells (200–500 m) |
| Ultra-dense | 50–300 Gbps/km² | Small cells + DAS (50–200 m) |

**Network densification** — deploying more cells per km² — is the main way to
increase capacity. But each cell needs backhaul, power, and site costs → the
**cost per Gbps** grows nonlinearly as cell size shrinks.

**5G mmWave** enables very dense deployment (10+ cells/km²) at high cost —
viable only in stadiums, airports, and dense commercial areas.

---

## 5.11 Chapter summary

1. **4G** was defined by IMT-Advanced requirements: 1 Gbps peak downlink, 100 Mbps
   high-mobility, all-IP, low latency. LTE and WiMAX both met these — LTE won
   the market for ecosystem reasons.
2. **OFDMA** (downlink) and **SC-FDMA** (uplink) replace WCDMA — OFDMA for flexibility
   and MIMO compatibility, SC-FDMA for UE power efficiency.
3. **LTE resource blocks** are 12 subcarriers × 7 symbols × 2 slots; 100 RBs in
   20 MHz; each RB 180 kHz wide, 0.5 ms long. Subcarrier spacing is 15 kHz.
4. **MIMO** provides spatial multiplexing (linear capacity growth with
   $\min(N_t, N_r)$), transmit diversity (reliability), and beamforming (coverage).
   This is the workhorse behind 100+ Mbps per 20 MHz.
5. **The EPC (Evolved Packet Core)** is flat, all-IP: eNodeB → S-GW → P-GW →
   Internet, with MME and HSS for control. Latency < 10 ms vs. 50 ms in UMTS.
6. **The eNodeB** combines RNC + NodeB functions; **X2** interface enables
   inter-eNodeB handover without going through the core.
7. **LTE-Advanced** adds carrier aggregation (up to 5 carriers, 100 MHz), higher-order
   MIMO (8×8), CoMP, and relays — pushing peak to 3 Gbps.
8. **WiMAX** was technically comparable to LTE but lost commercially because of
   ecosystem, backward compatibility, and market dynamics. Its technology
   influenced LTE, WiFi, and 5G NR.
9. **Radio and network components** — RRH, BBU, C-RAN, small cells, massive MIMO —
   are what make modern 4G/5G deployments possible. Backhaul is often the
   hidden bottleneck.
10. **Network capacity** depends on spectral efficiency, cell-edge performance,
    and cell density. Cell-edge is 10–100× worse than average — that's the
    fundamental cellular challenge.
11. **Peak spectral efficiency** grew from 0.4 bps/Hz (UMTS) to 60+ bps/Hz
    (5G mmWave). **Average** grew from ~0.5 to ~15 bps/Hz/cell — still 10× below
    peak, and cell-edge 10–100× below average.

---

## 5.12 Quiz

### A. Multiple choice

1. IMT-Advanced (4G) requirements include peak downlink of:
   (a) 100 Mbps (b) 500 Mbps (c) 1 Gbps (d) 10 Gbps

2. LTE uses which multiple access in the **uplink**?
   (a) OFDMA (b) SC-FDMA (c) CDMA (d) TDMA

3. LTE's **subcarrier spacing** is:
   (a) 10.94 kHz (b) 15 kHz (c) 30 kHz (d) 60 kHz

4. An LTE **resource block** consists of:
   (a) 12 subcarriers × 7 symbols (b) 15 subcarriers × 6 symbols
   (c) 24 subcarriers × 12 symbols (d) 100 subcarriers

5. **SC-FDMA** reduces PAPR by approximately:
   (a) 1 dB (b) 3 dB (c) 6 dB (d) 10 dB

6. **Massive MIMO** refers to:
   (a) 2×2 MIMO (b) 4×4 MIMO (c) 8×8 MIMO (d) 64+ antennas at the BS

7. The **EPC** node that anchors user-plane handovers is:
   (a) eNodeB (b) MME (c) S-GW (d) P-GW

8. The **flat architecture** of LTE compared with UMTS eliminates:
   (a) MSC (b) BSC/RNC (c) HLR (d) BTS

9. **Carrier aggregation** in LTE-Advanced supports:
   (a) 1 carrier (b) up to 3 (c) up to 5 (d) up to 32

10. **WiMAX** was standardized by:
    (a) 3GPP (b) IEEE 802.16 (c) ITU-T (d) ETSI

11. **CoMP** (Coordinated Multipoint) primarily improves:
    (a) Peak rate (b) Cell-edge throughput (c) Latency (d) Battery life

12. LTE-A Pro (Release 13) peak downlink rate is:
    (a) 150 Mbps (b) 1 Gbps (c) 3 Gbps (d) 10 Gbps

### B. Fill in the blank

1. LTE downlink uses \_\_\_\_ for multiple access; uplink uses \_\_\_\_.
2. An LTE resource block occupies \_\_\_\_ kHz of bandwidth and \_\_\_\_ ms of time.
3. LTE subcarrier spacing is \_\_\_\_ kHz.
4. The EPC's \_\_\_\_ handles control-plane signalling including NAS messages.
5. The EPC's \_\_\_\_ anchors the user plane across handovers.
6. The \_\_\_\_ allocates IP addresses and connects to external PDNs.
7. LTE's **X2** interface connects \_\_\_\_ to \_\_\_\_.
8. LTE-Advanced supports \_\_\_\_ carriers aggregation, each up to 20 MHz, total 100 MHz.
9. WiMAX uses OFDMA in both uplink and downlink, unlike LTE which uses \_\_\_\_ in uplink.
10. Massive MIMO (64+ antennas) can provide beamforming gain up to \_\_\_\_ dB.

### C. Define / explain

1. State the **IMT-Advanced requirements** and explain how LTE-Advanced and WiMAX
   each meet them.
2. Explain why LTE uses **OFDMA in the downlink but SC-FDMA in the uplink**.
   What is the PAPR trade-off?
3. Describe the **LTE resource block** — bandwidth, time, subcarrier count, symbol
   count. How many RBs are there in 20 MHz?
4. Compare **spatial multiplexing, transmit diversity, and beamforming** for MIMO.
   When is each used?
5. Draw the **LTE EPC architecture** — eNodeB, MME, S-GW, P-GW, HSS. Explain the
   role of each and the interfaces between them.
6. Explain why LTE's **flat architecture** matters — how does removing the RNC
   reduce latency?
7. Describe **LTE-Advanced** enhancements: carrier aggregation, higher-order MIMO,
   CoMP, relays. What peak rate does each enable?
8. Describe the **WiMAX architecture** (ASN, CSN). Compare with LTE's EPC. Why
   did WiMAX lose the 4G battle despite being technically competitive?
9. Explain **C-RAN** and its advantages. What are the deployment challenges?
10. Compute **spectral efficiency per cell** and **per km²** for LTE and LTE-A.
    Why is cell-edge throughput so much worse than average?
11. Compare **LTE vs. LTE-A vs. 5G NR** on spectral efficiency, peak rate, latency,
    and MIMO configuration.
12. A network operator has 60 MHz of spectrum (3 × 20 MHz carriers) and needs to
    support 100 Mbps peak downlink. Can LTE-Advanced with 2×2 MIMO achieve this?
    With 4×4 MIMO? With 8×8 MIMO? Show calculations.

---

## 5.13 Answer key

??? success "A. Multiple choice"
    1. **(c)** — 1 Gbps peak.
    2. **(b)** — SC-FDMA.
    3. **(b)** — 15 kHz.
    4. **(a)** — 12 subcarriers × 7 symbols (per slot; 14 per subframe).
    5. **(c)** — ~6 dB.
    6. **(d)** — 64+ antennas at the BS.
    7. **(c)** — S-GW.
    8. **(b)** — BSC/RNC.
    9. **(c)** — up to 5.
    10. **(b)** — IEEE 802.16.
    11. **(b)** — cell-edge throughput.
    12. **(c)** — 3 Gbps.

??? success "B. Fill in the blank"
    1. OFDMA; SC-FDMA.
    2. 180; 0.5.
    3. 15.
    4. MME.
    5. S-GW.
    6. P-GW.
    7. eNodeB; eNodeB.
    8. 5.
    9. SC-FDMA.
    10. ~18 dB (10 log 64).

??? success "C. Define / explain — model answers"
    1. *IMT-Advanced requirements:* 1 Gbps peak DL (low mobility), 100 Mbps (high
       mobility), 500 Mbps peak UL, 15 bps/Hz peak spectral efficiency, < 10 ms
       user-plane latency, all-IP, mobility up to 350 km/h. *LTE-A meets them via*
       carrier aggregation (100 MHz), 8×8 MIMO, CoMP, and relays → 3 Gbps peak,
       > 15 bps/Hz. *WiMAX 802.16m meets them via* 100 MHz aggregation, 4×4 MIMO,
       and advanced relaying → 1 Gbps peak. Both standards meet the requirements
       technically; LTE won commercially.
    2. *Downlink OFDMA:* the eNodeB has abundant power (mains-powered, no battery)
       and flexible frequency-scheduling needs → OFDMA's higher PAPR (10–12 dB) is
       acceptable, and its spectral flexibility is valuable. *Uplink SC-FDMA:*
       the UE is battery-powered — OFDMA's PAPR would require 10 dB PA backoff →
       inefficient → short battery + poor coverage. SC-FDMA's DFT-precoding
       reduces PAPR to 3–6 dB → the UE PA operates near saturation → +6 dB uplink
       power → ~2× cell radius. *Trade-off:* slightly lower spectral efficiency
       in the uplink (must allocate contiguous RBs), but coverage and battery
       life win.
    3. *LTE resource block:* 12 subcarriers × 180 kHz bandwidth × 7 symbols × 0.5 ms
       slot (normal CP). Time-frequency unit = 84 resource elements (REs). *In 20 MHz:*
       100 RBs (20 MHz / 180 kHz ≈ 111, but guard band leaves 100 usable). *Per
       subframe (1 ms):* 100 RBs × 168 REs = 16,800 REs total, minus reference
       signals and control → ~100 RBs worth of data.
    4. *Spatial multiplexing:* multiple independent streams → linear capacity growth.
       Used when channel is high-rank (rich scattering, good SNR). *Transmit diversity:*
       same data duplicated across antennas with orthogonal codes (Alamouti/SFBC) →
       3 dB gain in Rayleigh fading at half the rate. Used for control channels, cell
       edge, and low-SNR UEs. *Beamforming:* focus energy toward a specific UE → 10 log(N_t)
       dB gain. Used for coverage extension, interference reduction, and MU-MIMO.
    5. *LTE EPC architecture:* (a) eNodeB — base station, all radio functions +
       RRC. (b) MME — control plane, NAS, authentication, mobility, bearer management.
       (c) S-GW — user-plane anchor for handovers, charging. (d) P-GW — gateway to
       external PDN, IP allocation, QoS. (e) HSS — subscription database + authentication.
       Interfaces: Uu (UE-eNodeB), S1-MME (eNodeB-MME), S1-U (eNodeB-S-GW), S5/S8
       (S-GW-P-GW), S6a (MME-HSS), S11 (MME-S-GW), X2 (eNodeB-eNodeB).
    6. *Flat architecture:* UMTS has NodeB → RNC → SGSN/MSC — three levels of
       signalling, each adding latency. LTE collapses NodeB+RNC into eNodeB and
       uses direct S1 to the core → two levels. *Result:* user-plane RTT drops
       from ~50 ms to ~10 ms; control-plane (idle→connected) from ~500 ms to
       ~50–100 ms. This was critical for interactive services (gaming, VoLTE,
       industrial IoT) that were impossible on 3G.
    7. *LTE-A enhancements:* (a) **Carrier aggregation** — up to 5 carriers × 20 MHz
       = 100 MHz → 5× rate → up to 1 Gbps with 2×2 MIMO. (b) **Higher-order MIMO** —
       8×8 DL → 8× rate → up to 3 Gbps with CA. (c) **CoMP** — coordinated
       transmission from multiple eNodeBs improves cell-edge throughput 30–50%.
       (d) **Relays** — decode-and-forward or amplify-and-forward relays extend
       coverage to remote areas without new fiber backhaul.
    8. *WiMAX architecture:* (a) ASN — BS + ASN-GW. (b) CSN — HA (mobile IP),
       AAA, DHCP. Compare to LTE: WiMAX has 2 nodes (BS+ASN-GW) where LTE has 3
       (eNodeB+MME+S/P-GW) — LTE is flatter. *Why WiMAX lost:* (i) ecosystem —
       LTE had 200+ operator backing, WiMAX had ~30; (ii) backward compatibility —
       LTE dual-mode with 2G/3G, WiMAX not; (iii) Intel's exit (2010) was fatal;
       (iv) TDD-first design didn't match most operators' FDD spectrum; (v) slower
       standards iteration.
    9. *C-RAN:* centralizes BBUs from many cell sites into a BBU pool; RRHs at
       cell sites; fiber (CPRI) carries digitized samples. *Advantages:* statistical
       multiplexing of BBU processing, easier upgrades, CoMP-ready, power savings.
       *Challenges:* fiber everywhere (huge cost), CPRI latency budget (< 100 μs),
       single point of failure at the BBU pool (needs redundancy), and the recent
       trend toward distributed/virtualized RAN (O-RAN) has shifted industry views.
    10. *Spectral efficiency per cell:* LTE ~3 bps/Hz/cell average (DL, 2×2 MIMO,
        20 MHz). LTE-A ~6 bps/Hz/cell with 8×8 + CoMP. *Per km²:* LTE 50 Mbps/cell
        ÷ 10 km² cell ≈ 5 Mbps/km². LTE-A 100 Mbps/cell ÷ 10 km² = 10 Mbps/km².
        *Cell-edge is worse because:* at the cell boundary, the serving signal is
        weakest (max path loss) while interfering signals from adjacent cells are
        strongest (min path loss from neighbors) → SIR is worst. This yields
        10–100× worse throughput. CoMP, beamforming, and small cells target this.
    11. *LTE vs. LTE-A vs. 5G NR:* (a) LTE — 150 Mbps peak, 2×2 MIMO, 20 MHz,
        ~10 ms latency, ~3 bps/Hz/cell average. (b) LTE-A — 3 Gbps peak, 8×8 MIMO,
        100 MHz CA, ~10 ms latency, ~6 bps/Hz/cell average. (c) 5G NR — 20 Gbps
        peak (mmWave), 64–256 antenna massive MIMO, 400 MHz per carrier (mmWave),
        ~1 ms latency, ~15 bps/Hz/cell average (Sub-6), 30 bps/Hz/cell (mmWave).
    12. *Calculation:* (a) **2×2 MIMO:** per carrier ~150 Mbps peak × 3 carriers
        = 450 Mbps — well exceeds 100 Mbps target. (b) **4×4 MIMO:** ~300 Mbps per
        carrier × 3 = 900 Mbps. (c) **8×8 MIMO:** ~600 Mbps per carrier × 3 = 1.8
        Gbps. *Answer:* even 2×2 MIMO with 3× CA achieves 450 Mbps — easily
        satisfies 100 Mbps target. For a high-traffic cell, 4×4 MIMO gives 900
        Mbps peak with room for multiple users at once.

---

## Further reading

- **S. Sesia, I. Toufik & M. Baker**, *LTE — The UMTS Long Term Evolution: From Theory to Practice*, 2nd ed., Wiley, 2011 — the practical engineering reference; covers PHY, MAC, RRC, EPC in detail.
- **E. Dahlman, S. Parkvall & J. Sköld**, *4G: LTE/LTE-Advanced for Mobile Broadband*, 2nd ed., Academic Press, 2013 — the standard 4G textbook.
- **E. Dahlman, S. Parkvall & J. Sköld**, *5G NR: The Next Generation Wireless Access Technology*, 2nd ed., Academic Press, 2020 — the natural successor.
- **H. Holma & A. Toskala**, *LTE for UMTS: Evolution to LTE-Advanced*, Wiley, 2011 — from the HSPA authors.
- **C. Cox**, *An Introduction to LTE: LTE, LTE-Advanced, SAE, VoLTE and 4G Mobile Communications*, 2nd ed., Wiley, 2014 — accessible introduction.
- **A. Ghosh, J. Zhang, J. G. Andrews & R. Muhamed**, *Fundamentals of LTE*, Prentice Hall, 2010 — well-written fundamentals.
- **J. G. Andrews, A. Ghosh & R. Muhamed**, *Fundamentals of WiMAX*, Prentice Hall, 2007 — the WiMAX reference.
- **L. Nuaymi**, *WiMAX: Technology for Broadband Wireless Access*, Wiley, 2007 — WiMAX architecture and PHY.
- **T. S. Rappaport**, *Wireless Communications: Principles and Practice*, 2nd ed., Prentice Hall, 2002 — Ch 11 for MIMO basics.
- **A. Goldsmith**, *Wireless Communications*, Cambridge, 2005 — Ch 10 for MIMO capacity.
- **D. Tse & P. Viswanath**, *Fundamentals of Wireless Communication*, Cambridge, 2005 — Ch 7 for MIMO theory (free PDF online).
- **3GPP TS 36.xxx series** — LTE specifications:
  - TS 36.300 — Overall description.
  - TS 36.211 — Physical channels and modulation.
  - TS 36.212 — Multiplexing and channel coding.
  - TS 36.213 — Physical layer procedures.
  - TS 36.300 — E-UTRAN overall.
  - TS 23.401 — GPRS enhancements for E-UTRAN access (EPC).
  - TS 36.913 — Requirements for further advancements (LTE-Advanced).
- **IEEE 802.16e-2005** and **802.16m-2011** — WiMAX specifications.
- **NGMN Alliance** — operator-driven 5G requirements (precursor to 5G NR).

---

## Suggested tutorial problems

1. **IMT-Advanced check.** For each requirement (peak DL, peak UL, spectral efficiency, latency), compute whether LTE-Advanced (Release 10) meets it. Show calculations and cite the standard's claims.

2. **Resource block count.** Verify that 20 MHz LTE has 100 RBs. Show the arithmetic: 20 MHz / 180 kHz = 111.11. Where do the 11 missing RBs go?

3. **Peak throughput.** Compute peak LTE throughput for: (a) 10 MHz, 2×2 MIMO, 64-QAM, rate-3/4; (b) 20 MHz, 4×4 MIMO, 64-QAM, rate-3/4; (c) 60 MHz (3×CA), 4×4 MIMO, 64-QAM, rate-3/4.

4. **SC-FDMA vs OFDMA.** For a UE with 23 dBm PA and maximum PAPR limits: OFDMA allows 14 dBm average TX (10 dB backoff); SC-FDMA allows 19 dBm (4 dB backoff). Compute the cell radius for each, using path-loss exponent 3.5 and equal receiver sensitivity. Which is preferred and why?

5. **MIMO modes.** A UE is at 10 dB SNR with rich scattering — which MIMO mode should the eNodeB choose? At 0 dB SNR with one dominant path — which mode? Justify.

6. **EPC latency.** Trace the path of a packet from a UE to a Google server. List each network element and its contribution to latency. Total one-way and RTT.

7. **Carrier aggregation.** Design an LTE-A configuration for an operator with spectrum at 800 MHz (10 MHz), 1800 MHz (20 MHz), and 2600 MHz (20 MHz). How many component carriers? What peak downlink rate with 4×4 MIMO? Note any deployment challenges (inter-band CA, antenna sharing).

8. **WiMAX capacity.** For WiMAX 802.16e, 10 MHz TDD (3:1 DL/UL), 2×2 MIMO: compute peak DL and UL. Then compute the site capacity (3-sector) assuming 50% of peak average.

9. **Cell-edge improvement.** A cell has average throughput 50 Mbps, cell-edge (5th percentile) 2 Mbps. CoMP provides a 3 dB SIR improvement at cell edge, translating to a 2× throughput improvement. Compute the new cell-edge throughput. What is the % of users below 1 Mbps before and after?

10. **Massive MIMO gain.** A 64-antenna massive MIMO system beams to 8 UEs simultaneously. Compute the per-user SNR gain vs. a single antenna (10 log(64/8) = 9 dB per user). Compute the total capacity gain vs. 2×2 MIMO.

11. **Backhaul.** A 4G LTE site has 3 sectors, each 20 MHz, 4×4 MIMO. Peak per sector is 600 Mbps. What fiber backhaul capacity does the site need at peak? At 60% average load?

12. **5G vs 4G.** Compare 5G NR (Sub-6, 100 MHz, massive MIMO) with LTE-A (20 MHz × 3, 4×4 MIMO) on: peak rate, average rate, latency, and capacity per km². What are the main reasons for 5G's advantage?

