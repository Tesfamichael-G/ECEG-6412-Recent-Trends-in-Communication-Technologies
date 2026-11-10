# Solutions to Chapter 3 — GSM

[:octicons-arrow-left-24: Back to Chapter 3](../chapters/03-gsm.md)

---

## 1. TDMA bit rate

**Burst:** 156.25 bits in 577 μs.
**Burst rate per slot:** $156.25 / 577\times10^{-6} = 270,831$ bps ≈ **270.833 kbps** per slot per carrier.

Or equivalently: 8 slots × 156.25 bits per 4.615 ms frame = 1250 / 4.615×10^-3 = **270.833 kbps**.

---

## 2. Capacity per cell

**Setup:** 4 TRXs per cell, 8 slots each, 2% blocking.

**Channels:** 4 × 8 = **32 voice channels** per cell (minus control; use ~28 for voice).

**Erlang-B for 28 channels at 2% blocking:** ~**19 Erlangs**.

**Subscribers at 25 mErlang each:** $19/0.025 =$ **~760 subscribers**.

---

## 3. GSM 1800 carriers

**GSM 1800:** uplink 1710–1785 MHz = 75 MHz; spacing 200 kHz → 375 carriers. Guard bands reduce to ~**374 usable carriers**.

**GSM 900:** 25 MHz / 200 kHz = 125 carriers → 124 usable (1 guard).

**1800 has 3× the carriers of 900** — the trade-off is higher propagation loss at 1.8 GHz (~6 dB worse than 900 MHz).

---

## 4. GMSK spectrum

For $BT = 0.3$, the 99% power bandwidth is ~200 kHz (matching the channel). At $\pm 200$ kHz from carrier, the spectral mask is **−60 dBc** (well-rejected). The Gaussian filter trades:
- **Smaller $BT$** → narrower spectrum, more ISI.
- **Larger $BT$** → wider spectrum, less ISI.

$BT = 0.3$ is the sweet spot for GSM: fits the 200 kHz channel, ISI within Viterbi equalizer's correction capability.

---

## 5. Speech + channel coding rate

**Speech:** 260 bits per 20 ms (13 kbps).

**After Class 1a CRC** (50 bits + 3 = 53) + **Class 1b conv. code** (132 × 2 = 264) + **Class 2 uncoded** (78): **~395 bits per 20 ms**.

**On-air rate per speech user (only TCH frames):** ~19.75 kbps per user (TCH/F). Compare with carrier 270.833 kbps.

**Efficiency:** Speech codec 13 kbps from 64 kbps PCM = **~5:1** source compression. Plus channel coding doubles the bits → 26 kbps total. Divided by 8 users → 3.25 kbps per user at the carrier level. Very efficient.

---

## 6. Authentication failure

**Scenario:** Mobile returns SRES' ≠ SRES.

**Network action:** MSC/VLR rejects authentication. Call is dropped; mobile is not allowed to register (in roaming) or is denied the requested service.

**Vs. impersonation:** An impersonator without the SIM cannot produce the correct SRES — A3 is a cryptographic function requiring $K_i$. Without $K_i$ (stored only in SIM and AuC), SRES cannot be forged. **The attack** is only possible if $K_i$ is extracted from a physical SIM (COMP128 attack) — after which a cloned SIM can authenticate as the victim.

---

## 7. Handover timing

**Scenario:** Mobile crosses from cell A (1 km) to cell B (1 km) at 100 km/h = 27.8 m/s.

**Cell crossing time:** ~2 × 1 km / 27.8 m/s = **72 seconds** (from A center to B center).

**With 500 ms decision window + 150 ms handover execution:** Handover occurs at the point where the trigger condition has been met for 500 ms — usually ~1–2 dB before the true crossover. In time: **~1.5–2.5 s before the mid-point** — plenty of margin.

**At 500 km/h (high-speed train):** crossing time = 14 s. Handover still works, but 3–4 handovers per minute; ping-pong becomes a real risk (need larger hysteresis).

---

## 8. GPRS throughput

**Setup:** Multislot class 12 (4 DL, 4 UL), CS-3 (15.6 kbps/slot), 70% efficiency.

**DL:** 4 × 15.6 × 0.7 = **43.7 kbps**.
**UL:** 4 × 15.6 × 0.7 = **43.7 kbps**.

**vs. CSD:** 9.6 kbps → **4.5× improvement**.

In practice, real GPRS users see 20–40 kbps due to contention. Not enough for mobile internet — needed EDGE for that.

---

## 9. EDGE MCS comparison

**MCS-5:** 8-PSK, rate 0.37, gross 59.2 kbps → net **~22 kbps** per slot.
**MCS-9:** 8-PSK, rate 1.0, gross 59.2 kbps → net **~59 kbps** per slot.

**Required SNR:** MCS-5 works at ~10 dB; MCS-9 needs ~25 dB.

**Near cell edge:** use **MCS-5** (higher robustness, lower rate). At cell center: **MCS-9** (higher rate).

The **adaptive MCS** scheme is the key EDGE innovation — choose modulation+coding based on measured channel quality.

---

## 10. SMS segmentation

**200-character message** > 160-char SMS limit.

**With concatenated SMS (3GPP TS 23.040):** each segment carries 153 chars (140 bytes payload minus 7 bytes for UDH). 200/153 ≈ **2 segments**.

**Per-message overhead:** 7 bytes for concatenation UDH (User Data Header) — but only in concatenated messages. For a single SMS, overhead is ~10 bytes (TP-DA + TP-SCTS + TP-PID + TP-DCS + TP-UDL), and payload is 140 bytes → 160 chars of 7-bit ASCII.

---

## 11. Roaming trace

**Mobile attaches in Germany (MCC 262):**

1. **IMSI attach** to German MSC/VLR.
2. **VLR queries HLR** via `Update Location`.
3. **HLR authenticates** via AuC (generates 5 triplets).
4. **HLR updates** subscriber's current VLR = German VLR.
5. **HLR downloads** subscription data (QoS, roaming restrictions).
6. **VLR sends TMSI** to mobile — used for future paging.
7. **HLR deletes** old VLR entry (Ethiopian VLR) via Cancel Location.

**Entities:** Visited MSC/VLR (Germany) ↔ HLR (Ethiopia) ↔ AuC (Ethiopia) ↔ old VLR (Ethiopia).

**HLR change:** location info (new VLR address), possibly roaming restrictions.

---

## 12. GSM vs. UMTS

| Aspect | GSM | UMTS |
|---|---|---|
| **Chip rate** | 270.833 kbps | 3.84 Mcps |
| **Bandwidth** | 200 kHz | 5 MHz |
| **Multiple access** | TDMA | WCDMA |
| **Modulation** | GMSK | QPSK / 16-QAM / 64-QAM |
| **Handover** | Hard (break-before-make) | Soft + softer + hard |
| **Peak rate** | ~470 kbps (EDGE) | 42 Mbps (HSPA+) |
| **Security** | A3/A5/A8 | AKA + f8/f9 |

**Fundamental differences:** multiple access (TDMA vs. CDMA), chip rate (200 kbps vs. 3.84 Mcps), handover (hard vs. soft).

**Evolutionary differences:** modulation (GMSK vs. QAM), peak rate, security algorithms.

**Fundamental:** UMTS fundamentally changes the **air interface** (TDMA → CDMA); the rest is evolutionary.