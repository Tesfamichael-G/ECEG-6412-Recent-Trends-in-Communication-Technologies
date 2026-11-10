# Solutions to Chapter 6 — NGN

[:octicons-arrow-left-24: Back to Chapter 6](../chapters/06-ngn.md)

---

## 1. BLE battery life

**Setup:** Transmit 1 ms at 10 mA every 1 s. Sleep 5 μA. Battery 250 mAh (CR2032).

**Energy per second:** (1 ms × 10 mA) + (999 ms × 5 μA) = 0.01 mA·s + 0.005 mA·s = **0.015 mAs** ≈ 0.0000042 mAh.

**Per hour:** 3600 × 0.0000042 = **0.0151 mAh/h**.

**Battery life:** 250 / 0.0151 ≈ **16,500 hours ≈ 690 days ≈ 1.9 years**.

**At 10 s interval:** transmissions per hour = 360 (vs. 3600) → 0.00151 mAh/h → ~165,000 hours → **~19 years** (unrealistic — limited by self-discharge, ~1%/year). Realistic: **~10 years**.

**Trade-off:** longer interval → much longer battery, but slower update rate. Choose based on application's freshness requirement.

---

## 2. ZigBee mesh design

**Area:** 200 m × 200 m. Coverage per node: 25 m.
**Router spacing:** 20 m (with overlap) → grid of 11 × 11 = **121 routers**.
**Corner-to-corner hops:** 200 m / 20 m = **10 hops**.
**Latency per hop:** ~15–30 ms → 10 hops = **150–300 ms** end-to-end.

**Alternative:** cluster tree with 4 coordinators (one per quadrant of 100×100 m). Fewer hops, more centralization.

---

## 3. WiFi 6E deployment

**Area:** 10,000 m². Users: 5000.

**AP density:** WiFi 6E AP covers ~250 m² per AP in high-density (limited by interference, not coverage) → **~40 APs**.

**Channels:** 6 GHz has 14 × 160 MHz channels or 59 × 20 MHz. With 40 APs, use 80 MHz channels → 7 non-overlapping channels → 6 APs share each channel with careful placement (same channel, different sector).

**Per-user peak:** 40 APs × 2.4 Gbps (WiFi 6, 80 MHz, 4×4) = 96 Gbps total. / 5000 users = **19 Mbps per user** — enough for most usage.

---

## 4. UWB precision

**Bandwidth 1.5 GHz:** range resolution = $c/(2B) = 3\times10^8/(2 \times 1.5\times10^9) \approx$ **10 cm**.

**Timing error 200 ps:** distance error = $c \times \Delta t / 2 = 3\times10^8 \times 200\times10^{-12} / 2 \approx$ **3 cm**.

**For AirTag-style finding:** ±10 cm is more than enough to guide a user to a lost item — yes, UWB is overkill for this, but future applications (AR, precise automation) need it.

---

## 5. LoRa airtime

**Sensor:** 10 bytes payload. LoRa PHY overhead: preamble, header, CRC ~13 bytes total. So transmit ~23 bytes.

**Airtime** ≈ (payload bits) / (data rate):
- **SF7:** 23 × 8 / 5470 ≈ **34 ms**.
- **SF10:** 23 × 8 / 980 ≈ **188 ms**.
- **SF12:** 23 × 8 / 250 ≈ **736 ms**.

**For 1 km deployment:** SF7 suffices (sensitivity -123 dBm). Air time 34 ms is small → maximize battery.

**If 1 km is marginal:** use SF9 or SF10 for reliability, at 5× power cost.

---

## 6. NB-IoT coverage extension

**LTE cell radius:** 2 km (typical urban).
**NB-IoT coverage extension:** +20 dB.

**Using path-loss exponent 3.5:** $d_2/d_1 = 10^{20/(10\times3.5)} = 10^{0.571} \approx 3.7$.

**NB-IoT range:** ~**7.4 km** (vs. LTE's 2 km).

**Realistic:** with 20 dB extension + lower data rate (26 kbps) and repetitions, NB-IoT achieves **10–15 km** in rural areas — matches spec.

---

## 7. 5G peak rate

**Setup:** 400 MHz (mmWave), 64-QAM, 8-layer MIMO, rate-3/4.

- Spectral efficiency per layer: 6 bits/sym × 3/4 = 4.5 bps/Hz.
- Per layer: 400 × 4.5 = 1800 Mbps.
- 8 layers: **14.4 Gbps**.

**With 256-QAM (5G max):** 8 bps/sym × 3/4 = 6 bps/Hz × 400 × 8 = **19.2 Gbps** (matches "20 Gbps" peak spec).

---

## 8. Network slicing design

**Requirements:**
- 1000 IoT sensors (mMTC) — low rate, high density, low power.
- 50 video streams × 20 Mbps = 1 Gbps (eMBB).
- 10 robotic surgery links × 1 ms latency (URLLC).

**Slices:**

**mMTC:** 1000 sensors at 10 kbps avg = 10 Mbps aggregate. Low priority, no latency SLA. Reserve **~20 MHz** spectrum, small UPF at edge.

**eMBB:** 1 Gbps. High throughput, low priority for latency. Reserve **60 MHz** with MU-MIMO, dedicated eMBB UPF.

**URLLC:** 10 × 1 Mbps + 1 ms latency + 99.999% reliability. Reserve **~10 MHz** with pre-allocated RBs, dedicated local UPF at factory edge.

**Isolation:** each slice has its own control plane (AMF/SMF/PCF), user plane (UPF), and RAN resources (via slicing-aware scheduler). URLLC has highest priority.

---

## 9. Edge computing latency

**AR application: 10 ms end-to-end.**
- UE air interface: 1 ms
- Edge compute: 2 ms
- Application: 3 ms
- **Total edge:** 6 ms — **fits within 10 ms** ✓

**With centralized cloud:**
- Air interface: 1 ms
- Network to cloud: 20 ms
- Cloud compute: 2 ms
- Application: 3 ms
- **Total cloud:** 26 ms — **exceeds 10 ms** ✗

**Conclusion:** AR **requires edge computing**.

---

## 10. Connectivity choice

| Application | Best fit | Why |
|---|---|---|
| Water meter reading | **NB-IoT** or LoRa | 10–15 km range, low power, operator-managed (NB-IoT) or private (LoRa) |
| Warehouse asset tracking | **BLE** + WiFi/UWB | Indoor, precise location, smartphone integration; UWB for cm-precision |
| Agricultural soil moisture | **LoRa** | Long range (up to 15 km), low power (10-year battery), license-free |
| Vehicle telemetry | **5G RedCap** or **4G LTE** | Mobility, moderate data rate, ubiquitous coverage |

---

## 11. WiFi 7 MLO

**Setup:** 2.4 GHz (40 MHz) + 5 GHz (160 MHz) + 6 GHz (320 MHz) MLO. 4×4 MIMO. 4096-QAM.

**Max spectral efficiency:** 4096-QAM = 12 bits/sym, rate-5/6 coding → **10 bps/Hz**.

**Per-link throughput:**
- 2.4 GHz: 40 MHz × 10 = 400 Mbps.
- 5 GHz: 160 MHz × 10 = 1600 Mbps.
- 6 GHz: 320 MHz × 10 = 3200 Mbps.
- Sum single-stream: 5200 Mbps.
- 4×4 MIMO: ×4 = **20,800 Mbps = 20.8 Gbps**.

**With MLO aggregation:** combines all three bands → **~20.8 Gbps** (not 46 Gbps — the 46 Gbps figure assumes 320 MHz × 4096-QAM × 16 spatial streams, which is the theoretical max with all bands and 16×16 MIMO).

---

## 12. 5G vs. 4G per use case

| Use case | LTE | 5G | Improvement |
|---|---|---|---|
| **eMBB** | 150 Mbps (Cat-4), ~50 Mbps avg | 10–20 Gbps, ~500 Mbps avg | **10–30×** |
| **URLLC** | ~50 ms latency (not URLLC) | 1 ms latency, 99.999% | **50× latency** |
| **mMTC** | ~2000 devices/km² (LTE-M) | 1M devices/km² | **500×** |

**5G is 10–500× better** depending on the use case — and it's the **first** generation to natively support URLLC and mMTC, not just eMBB.