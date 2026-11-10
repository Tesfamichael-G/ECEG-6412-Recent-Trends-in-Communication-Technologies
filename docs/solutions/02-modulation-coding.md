# Solutions to Chapter 2 — Modulation and Coding

[:octicons-arrow-left-24: Back to Chapter 2](../chapters/02-modulation-coding.md)

---

## 1. BER curve for BPSK

For coherent BPSK, $P_b = Q(\sqrt{2 E_b/N_0})$.

| $E_b/N_0$ (dB) | Linear | $\sqrt{2\gamma}$ | $P_b$ |
|:---:|:---:|:---:|:---:|
| 0 | 1.0 | 1.414 | $Q(1.414) \approx 7.9 \times 10^{-2}$ |
| 4 | 2.51 | 2.24 | $Q(2.24) \approx 1.26 \times 10^{-2}$ |
| 8 | 6.31 | 3.55 | $Q(3.55) \approx 1.9 \times 10^{-4}$ |
| 12 | 15.85 | 5.63 | $Q(5.63) \approx 9.0 \times 10^{-9}$ |

**BER = $10^{-5}$** is reached at roughly **$E_b/N_0 \approx 9.6$ dB**.

---

## 2. QPSK vs. 16-QAM at BER = $10^{-4}$

**QPSK:** $P_b = Q(\sqrt{2\gamma})$. Set $= 10^{-4}$: $Q^{-1}(10^{-4}) \approx 3.72$; $\gamma = 3.72^2/2 = 6.92$ → **8.4 dB**.

**16-QAM:** $P_b \approx 0.75\, Q(\sqrt{0.8\gamma})$. Set $= 10^{-4}$: $Q^{-1}(10^{-4}/0.75) \approx 3.88$; $0.8\gamma = 3.88^2$; $\gamma = 18.8$ → **12.7 dB**.

**16-QAM needs ~4.3 dB more power.** In exchange: **2× data rate** (4 bits/sym vs. 2 bits/sym).

---

## 3. Gray coding

Standard 16-QAM Gray mapping (per the table in §2.4.5):

| (I, Q) | Binary |
|:---:|:---:|
| (−3,−3) | 0000 |
| (−1,−3) | 0001 |
| (+1,−3) | 0011 |
| (+3,−3) | 0010 |
| (−3,−1) | 0100 |
| ... | ... |

Each adjacent pair differs by 1 bit — verified by construction.

**BER benefit:** $P_b \approx P_s / \log_2 M = P_s / 4$ (versus $P_b = P_s$ without Gray coding).

**At the same SER**, Gray coding reduces **BER by ~6 dB** in power (or by ~4× in rate, since the same SER corresponds to the same BER only if the extra bits are also Gray-decoded).

---

## 4. OFDM parameters

**Target:** $B = 20$ MHz, 5 bps/Hz, 64-QAM.

**Subcarrier spacing:** 15 kHz (LTE standard).
**FFT size:** $N = B / \Delta f = 20\times10^6/15\times10^3 \approx 1333$; round up to 2048 (or use 1024 for a smaller channel).
**Useful symbol duration:** $T_u = 1/\Delta f = 66.67$ μs.
**CP length:** $\tau_{\text{rms}} = 500$ ns; use $T_{cp} \approx 5\tau_{\text{rms}} = 2.5$ μs → round to **4.7 μs** (LTE normal CP).

**CP overhead:** $T_{cp}/(T_u + T_{cp}) = 4.7/(66.67+4.7) \approx$ **6.6%**.

---

## 5. Raised cosine pulse

$p_{RC}(t) = \text{sinc}(t/T_s) \cdot \cos(\pi\beta t/T_s)/(1 - (2\beta t/T_s)^2)$.

**Bandwidths for $R_s = 1$ Msym/s:**
- $\beta = 0$: $B = 0.5$ MHz.
- $\beta = 0.22$: $B = 0.61$ MHz.
- $\beta = 0.5$: $B = 0.75$ MHz.
- $\beta = 1$: $B = 1$ MHz.

**Timing-error penalty:** With $\beta = 0$ (sinc), any timing offset causes ISI from sinc tails that don't decay — significant loss. With $\beta = 0.22$, the time-domain tails decay much faster — penalty is small. **This is why $\beta = 0.22$ is standard in LTE** — small excess bandwidth for robust timing.

---

## 6. 5G NR link budget — 3.5 GHz vs. 28 GHz

**3.5 GHz (sub-6):**
- FSPL at 200 m: 32.44 + 20log(3500) + 20log(0.2) = 32.44 + 70.88 − 13.98 = 89.34 dB.
- FSPL slope: use $n = 3$ (urban micro). At distance $d$ beyond 200 m: FSPL(d) = 89.34 + 30log(d/0.2).
- Received signal = $P_{\text{tx}} + G_{\text{bs}} + G_{\text{ue}} - \text{FSPL} = 23 + 15 + 0 - \text{FSPL} = 38 - \text{FSPL}$.
- Sensitivity −100 dBm → max FSPL = 138 dB → $d$ = 0.2 × $10^{(138-89.34)/30}$ ≈ 0.2 × 41.9 ≈ **8.4 km**. But this neglects interference — realistic range is 500 m – 2 km.

**28 GHz (mmWave):**
- FSPL at 100 m: 32.44 + 20log(28000) + 20log(0.1) = 32.44 + 88.94 − 20 = 101.38 dB.
- With $n = 3.5$ slope and beamforming gain +18 dB (64-element array): effective FSPL + beamforming = 101.38 − 18 = 83.38 dB.
- Max FSPL = 138 dB → $d$ = 0.1 × $10^{(138-101.38+18)/35}$ ≈ 0.1 × $10^{1.56}$ ≈ **0.36 km** = **360 m**.

**Interpretation:** mmWave's higher FSPL (21 dB higher than 3.5 GHz at same distance) is **partially compensated** by massive MIMO beamforming (+18 dB). Net penalty ~3 dB → range drops from ~1–2 km to ~300–400 m. This is why mmWave is dense small cells.

---

## 7. CDMA pole capacity (UMTS voice vs. data)

**Voice:** $G = 3.84\times10^6 / 12.2\times10^3 \approx 315$. $(E_b/N_0)_{\text{req}} = 5$ dB = 3.16. $i = 0.5$. Activity factor $v = 0.6$.

$N_{\text{pole}} = 1 + G/((E_b/N_0) \cdot (1+i) \cdot v) = 1 + 315/(3.16 \cdot 1.5 \cdot 0.6) \approx 1 + 110 \approx$ **111**.

**Data (384 kbps):** $G = 3.84\times10^6/384\times10^3 = 10$. $(E_b/N_0)_{\text{req}} = 2$ dB = 1.58. $v = 1$.

$N_{\text{pole}} = 1 + 10/(1.58 \cdot 1.5 \cdot 1) \approx 1 + 4.2 \approx$ **5.2**.

**Realistic (50% of pole):** voice ~55 users, data ~2.6 users.

---

## 8. (7,4) Hamming code — encode, error, decode

**Generator matrix (from Chapter 2 §2.8.2):**
$G = [I_4 | P]$ where $P$ = 4×3 parity matrix.

**Encode 1101:** Using $p_1 = u_1\oplus u_2\oplus u_4 = 1+1+1 = 1$, $p_2 = u_1\oplus u_3\oplus u_4 = 1+0+1 = 0$, $p_3 = u_2\oplus u_3\oplus u_4 = 1+0+1 = 0$.

**Codeword: 1101100.**

**Introduce error at position 3** (bit 0 → 1): received 1111100.

**Syndrome:** $H \cdot r^T$. With $H$ whose column 3 equals binary 3 (011), the syndrome is **011** = decimal 3 → error at position 3. **Correct** by flipping bit 3: → 1101100. ✓

---

## 9. Convolutional code — encode, Viterbi

**Rate 1/2, K=3, generators $G_1 = 111$, $G_2 = 101$.**

**Encoder table** (state = last 2 input bits):

| Input | State | $G_1$ out | $G_2$ out | New state |
|:---:|:---:|:---:|:---:|:---:|
| 1 | 00 | 1 | 1 | 10 |
| 0 | 10 | 1 | 0 | 01 |
| 1 | 01 | 0 | 1 | 10 |
| 1 | 10 | 0 | 0 | 11 |

**Encoded: 11 10 01 00** (8 bits from 4 input bits).

**Viterbi decoding** with one error: the trellis decoder finds the closest path in Hamming distance — the path corresponding to the original input, since it has distance 1 while other paths have distance ≥ 2.

---

## 10. Source + channel coding redundancy

**G.729 at 8 kbps + rate-1/2 FEC** = 16 kbps on air.

**vs. raw PCM G.711 at 64 kbps** with no FEC.

**Redundancy added by FEC:** 100% (16/8). **Total on-air savings:** 16/64 = 25% of G.711's bandwidth.

**Trade-off:** G.729 is a **parametric codec** (analysis-by-synthesis LPC) — loses waveform fidelity, sounds "synthetic" vs. G.711's toll quality. But 4× bandwidth saving is worth it for cellular. The rate-1/2 FEC protects against errors — effective at low SNR, but not miraculous.

---

## 11. Shannon gap — 5G NR

**Setup:** 100 MHz at 3.5 GHz, 4×4 MIMO, SNR = 15 dB.

**Shannon capacity** (per spatial stream, assuming i.i.d. MIMO): $C_s = 100\times10^6 \times \log_2(1+31.62) \approx 100\times10^6 \times 5.03 \approx 503$ Mbps. **4 streams → ~2 Gbps.** With MIMO's own factor (approximately 4× for 4×4 i.i.d.), total ~2 Gbps.

**Practical 5G NR peak with 4×4 MIMO, 100 MHz, 256-QAM, rate-3/4:**
- Per stream: 100 MHz × 8 bps/Hz (256-QAM × 3/4) = 800 Mbps.
- 4 streams: **3.2 Gbps** — well above Shannon at 15 dB! Because 256-QAM operating at 15 dB is unrealistic (requires ~30 dB).

**Realistic at SNR = 15 dB** — 64-QAM, rate-3/4:
- Per stream: 100 × 4.5 = 450 Mbps.
- 4 streams: 1.8 Gbps.
- **Shannon gap:** 2 Gbps (Shannon) vs. 1.8 Gbps (practical) = **~0.5 dB gap** — extremely efficient.

---

## 12. Fixed rate, different modulations

**Target 50 Mbps in 20 MHz** = 2.5 bps/Hz.

| Modulation | Coding | Required SNR (approx) | Notes |
|:---:|:---:|:---:|---|
| QPSK | 1/3 | ~5 dB | Robust, low spectral efficiency |
| 16-QAM | 1/2 | ~10 dB | Middle ground |
| 64-QAM | 3/4 | ~18 dB | High rate, needs good channel |

**Most power-efficient (lowest SNR):** QPSK + rate-1/3. **Most robust to channel errors:** also QPSK + rate-1/3.

**Why 64-QAM is used at all:** when the channel is good (close to base station), it delivers the same 2.5 bps/Hz with less spectrum — freeing bandwidth for others. **Adaptive modulation** switches between these based on channel conditions.