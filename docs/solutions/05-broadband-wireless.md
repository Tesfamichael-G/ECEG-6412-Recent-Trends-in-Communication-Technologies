# Solutions to Chapter 5 — 4G/LTE/WiMAX

[:octicons-arrow-left-24: Back to Chapter 5](../chapters/05-broadband-wireless.md)

---

## 1. IMT-Advanced check for LTE-A

| Requirement | Target | LTE-A (R10) | Meets? |
|---|---|:---:|:---:|
| Peak DL (low mobility) | 1 Gbps | 3 Gbps | ✅ |
| Peak DL (high mobility) | 100 Mbps | ≥ 100 Mbps | ✅ |
| Peak UL | 500 Mbps | 1.5 Gbps | ✅ |
| Spectral efficiency (peak) | 15 bps/Hz | 30 bps/Hz (8×8) | ✅ |
| Latency (user plane) | < 10 ms | ~10 ms | ✅ |
| Latency (control) | < 100 ms | ~50 ms | ✅ |
| Mobility | 350 km/h | 350 km/h | ✅ |
| All-IP | Required | ✅ | ✅ |

LTE-A **meets or exceeds all IMT-Advanced requirements**.

---

## 2. RB count for 20 MHz

20 MHz / 180 kHz = 111.1 RBs. LTE spec allocates **100 RBs** (18 MHz) with 2 MHz reserved for guard bands.

**Where the 11 RBs go:** guard band on both edges (~10% of bandwidth), plus a small DC subcarrier gap.

---

## 3. Peak throughput computations

**(a) 10 MHz, 2×2 MIMO, 64-QAM, rate-3/4:**
- RBs: 50 per subframe.
- REs per RB (after 20% RS overhead): ~134.
- Per RE: 6 × 3/4 = 4.5 bits.
- Per subframe per stream: 50 × 134 × 4.5 = 30,150 bits.
- Per second: 30.15 Mbps.
- 2 streams: **60.3 Mbps**.

**(b) 20 MHz, 4×4 MIMO, 64-QAM, rate-3/4:**
- Per stream: 60.3 Mbps (same as 20 MHz single stream).
- 4 streams: **241 Mbps**.

**(c) 60 MHz (3×CA), 4×4 MIMO:**
- 3 × 241 = **723 Mbps**.

---

## 4. SC-FDMA vs. OFDMA PAPR

**UE with 23 dBm PA:**
- **OFDMA:** PAPR 10 dB → PA must back off to 13 dBm average.
- **SC-FDMA:** PAPR 4 dB → PA can operate at 19 dBm average.

**Uplink power gain:** 6 dB.

**Cell radius with slope $n = 3.5$:**
- OFDMA radius: $R_1$.
- SC-FDMA radius: $R_2$ where $10 \log_{10}(R_2/R_1) \times 3.5 = 6$ → $R_2/R_1 \approx 10^{6/35} \approx$ **1.48×**.

**SC-FDMA gives ~1.5× cell radius.** This is why LTE chose it for uplink — UE coverage is the bottleneck, and 6 dB uplink gain is worth 50% more coverage.

---

## 5. MIMO modes for given channel

**10 dB SNR, rich scattering:** high-rank channel → **spatial multiplexing** (2 or 4 streams). The SNR is sufficient for the multi-stream detection.

**0 dB SNR, one dominant path:** rank-1 channel → **transmit diversity** (Alamouti/SFBC) — sends the same data via orthogonal codes to gain 3 dB diversity. Spatial multiplexing would fail (multi-stream detection needs high SNR).

The eNodeB uses CQI/RI (rank indicator) feedback to select the mode.

---

## 6. EPC latency budget

| Component | Latency |
|---|:---:|
| UE processing | 2 ms |
| Frame alignment (subframe) | 0.5 ms |
| Air interface (HARQ + decoding) | 4–8 ms |
| eNodeB processing | 1 ms |
| S1-U transport | 1–2 ms |
| S-GW processing | 0.5 ms |
| P-GW processing | 1 ms |
| **Total one-way** | **~10 ms** |
| **Round-trip (RTT)** | **~20 ms** |

For a Google server over the internet: add ~10–50 ms (public internet). **Total RTT ~30–70 ms** — much better than UMTS's ~100–200 ms.

---

## 7. Carrier aggregation design

**Available:** 10 MHz @ 800, 20 MHz @ 1800, 20 MHz @ 2600.

**CA configuration:** **3 component carriers** (inter-band CA): 1×10 + 1×20 + 1×20 = **50 MHz total**.

**Peak DL with 4×4 MIMO:**
- 50 MHz × 4 streams × ~7.2 bps/Hz (64-QAM rate 3/4, ideal) = **~1.44 Gbps**.

**Deployment challenges:**
- **Inter-band CA requires multiple transceivers** — power amplifier, antenna per band.
- **Timing/phase synchronization** across bands — critical for carrier aggregation.
- **Cross-carrier scheduling** — the primary carrier schedules the secondary carriers.

---

## 8. WiMAX capacity

**Setup:** 10 MHz TDD (3:1 DL/UL), 2×2 MIMO.

**Per 10 MHz, 2×2:** ~30 Mbps DL peak (assuming 64-QAM rate-3/4).
**3:1 TDD pattern:** DL gets 75% of frame → 30 × 0.75 = **~22.5 Mbps per sector**.

**Site (3-sector):** 22.5 × 3 = **67.5 Mbps DL peak**.
**Average at 50%:** ~**34 Mbps per site**.

---

## 9. Cell-edge improvement with CoMP

**Before CoMP:** average 50 Mbps, edge (5%) 2 Mbps.
**CoMP improves edge SIR by 3 dB** → 2× throughput at cell edge (in interference-limited regime).

**After CoMP:** edge ~4 Mbps.

**% of users below 1 Mbps:** In a typical Rayleigh fading cell, the CDF rises steeply. Before: maybe 1% below 1 Mbps. After: effectively 0% (they're now above 2 Mbps).

**Realistic:** CoMP improves edge throughput 30–50%, moving the 5th-percentile user from 2 Mbps to 3 Mbps in a 5 dB SIR improvement scenario (not full 2× due to other limits).

---

## 10. Massive MIMO gain

**Setup:** 64 antennas at BS, 8 UEs. Beamforming per user = 64/8 = 8 antennas per beam.

**Beamforming gain:** $10\log_{10}(8)$ = **9 dB per user** (assuming independent beams).

**MU-MIMO multiplexing gain:** 8 UEs served simultaneously vs. 2×2 MIMO (2 UEs) = **4× capacity**.

**Total capacity vs. 2×2 MIMO:** 4× from multiplexing + 3 dB (2×) from per-user SNR = **~8×** (very rough — actual depends on channel).

---

## 11. Backhaul sizing

**Peak per sector:** 600 Mbps. 3 sectors: **1.8 Gbps per site peak**.

**Average at 60%:** 1.08 Gbps.

**Fiber backhaul:** provision **~2 Gbps** (2× headroom) — a 10G or 25G fiber is more than enough.

**Microwave:** 4 × E-band at 1 Gbps each = 4 Gbps aggregate — also viable but weather-sensitive.

---

## 12. 5G vs. 4G comparison

| Aspect | LTE-A | 5G NR (Sub-6) | Factor |
|---|---|---|---|
| **Peak DL** | 3 Gbps | 10–20 Gbps | ~4–7× |
| **Avg DL per user** | 50–100 Mbps | 100–500 Mbps | 2–5× |
| **Latency** | ~10 ms | ~1–4 ms | 3–10× |
| **Capacity/km²** | ~10 Mbps/km² | ~100 Mbps/km² | 10× |
| **Massive MIMO** | 8×8 | 64–256 | 8–32× |

**Reasons for 5G's advantage:**
- **Wider bandwidth** (100 MHz vs. 20–100 MHz).
- **Massive MIMO** (64–256 antennas vs. 8).
- **Scalable numerology** (15–240 kHz).
- **mmWave** (400 MHz channels, 10× spectrum).
- **Small-cell densification**.