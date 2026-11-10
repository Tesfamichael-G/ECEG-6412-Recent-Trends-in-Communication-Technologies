# Solutions to Chapter 1 — Introduction

[:octicons-arrow-left-24: Back to Chapter 1](../chapters/01-introduction.md)

---

## 1. Link budget

**Task:** Compute maximum cell radius for 900 MHz and 2 GHz links.

**Setup:**
- $P_{\text{tx}} = 43$ dBm.
- $G_{\text{tx}} = 15$ dBi, $G_{\text{rx}} = 0$ dBi.
- Sensitivity $= -110$ dBm.
- Receive signal = $P_{\text{tx}} + G_{\text{tx}} + G_{\text{rx}} - \text{FSPL}$.
- Set $= -110$ dBm → max FSPL = $43 + 15 + 0 - (-110) = 168$ dB.

**900 MHz:** FSPL $= 32.44 + 20\log(900) + 20\log(d_{\text{km}}) = 91.5 + 20\log d$.
Set $= 168$: $20\log d = 76.5 \Rightarrow d \approx 10^{3.825} \approx$ **6,700 km** — absurd because no path-loss model beyond free space is considered. Real limit is set by terrestrial propagation, not free space.

**2 GHz:** FSPL $= 32.44 + 20\log(2000) + 20\log d = 98.5 + 20\log d$.
Set $= 168$: $d \approx 10^{3.475} \approx$ **3,000 km**.

**Interpretation:** Free-space path loss alone allows transcontinental links — which is why the model is unrealistic. Real coverage is limited by **Okumura–Hata / COST-231** path loss (with the slope $> 20$ dB/decade) and shadowing.

---

## 2. Frequency reuse — SIR comparison

**$N=7$, $n=4$:** $\text{SIR} = (21)^2/6 = 73.5 = 18.66$ dB.

**$N=3$, $n=4$:** $\text{SIR} = (9)^2/6 = 13.5 = 11.30$ dB.

**Capacity gain $N=7 \to N=3$:** $\frac{7}{3} \approx 2.33×$ (more reuse).

**SIR penalty:** $18.66 - 11.30 =$ **7.36 dB less**. May not meet analog voice quality — but for digital systems with FEC (GSM, UMTS), 11 dB is acceptable.

---

## 3. Sectoring

**Omni vs. 3-sector:** first-tier interferers reduced from 6 (omni) to 2 (3-sector). SIR improvement = $10\log_{10}(6/2) =$ **4.77 dB**.

**Target: achieve the same SIR as $N=7$ omni (18.7 dB) with $N = 3$ 3-sector.**

With $N = 3$: SIR_omni = 11.3 dB. Sectoring adds 4.77 dB → 16.07 dB. Below 18.7 dB — need $N = 4$ (3-sector) to hit 18.7 dB:
- $N=4$ omni: $(12)^2/6 = 24 = 13.8$ dB. +4.77 = **18.57 dB**. Close enough to 18.7.
- **$N = 4$ with 3-sector** matches $N = 7$ omni SIR at $4/7$ the frequency plan → ~1.75× more capacity.

---

## 4. Shadowing coverage

**Setup:** $\bar P_r = -100$ dBm, $P_{\min} = -108$ dBm, $\sigma = 6$ dB.

$\Pr\{\text{coverage}\} = Q\!\left(\frac{-108 - (-100)}{6}\right) = Q\!\left(\frac{-8}{6}\right) = Q(-1.33)$.

$Q(-1.33) = 1 - Q(1.33) \approx 1 - 0.0918 =$ **0.908** = **~91%**.

---

## 5. Delay spread and coherence bandwidth

**PDP:** $\{0, 0.5, 1, 2\}$ μs with relative powers $\{0, -3, -6, -12\}$ dB.

**Linear powers:** $1, 0.501, 0.251, 0.063$.

**Total:** $P_{\text{tot}} = 1.815$.

**Mean delay:** $\bar\tau = (0\cdot1 + 0.5\cdot0.501 + 1\cdot0.251 + 2\cdot0.063)/1.815 = 0.527/1.815 \approx 0.29$ μs.

**RMS delay:** $\sigma_\tau^2 = \sum_i P_i(\tau_i - \bar\tau)^2/P_{\text{tot}}$.
- $1 \cdot (0.29)^2 = 0.0841$
- $0.501 \cdot (0.21)^2 = 0.0221$
- $0.251 \cdot (0.71)^2 = 0.1266$
- $0.063 \cdot (1.71)^2 = 0.1843$
- Sum = 0.4171 / 1.815 = 0.2298 → $\sigma_\tau \approx$ **0.48 μs**.

**Coherence bandwidth (50%):** $B_c = 1/(5\sigma_\tau) \approx$ **417 kHz**.

**LTE 5 MHz signal:** $B_s = 4.5$ MHz effective. $B_s/B_c \approx 10.8$ — strongly **frequency-selective**.

---

## 6. Doppler and coherence time

$f_D = v f_c / c$.

| $v$ | $f_D$ (3.5 GHz) | $T_c = 0.423/f_D$ | LTE 1 ms TTI regime |
|:---:|:---:|:---:|:---:|
| 3 km/h = 0.833 m/s | 9.7 Hz | 43.6 ms | Slow fading |
| 30 km/h = 8.33 m/s | 97 Hz | 4.4 ms | Slow fading |
| 120 km/h = 33.3 m/s | 389 Hz | 1.09 ms | Borderline; interleaving needed |

**LTE TTI = 1 ms.** At 120 km/h, $T_c \approx 1.09$ ms ≈ TTI. Slow fading at pedestrian speeds, **marginal** at highway speeds — requires fast AMC and HARQ.

---

## 7. Fading distributions

Rayleigh PDF: $p(r) = \frac{r}{\sigma^2}e^{-r^2/(2\sigma^2)}$. Peak at $r = \sigma$. $\Omega = 2\sigma^2$, so $\sigma = 1/\sqrt 2$ for unit $\Omega$.

Rician PDF adds the LoS component; as $K \to \infty$, distribution narrows around $A$. At $K = 3$ dB, still significant spread; at $K = 20$ dB, nearly deterministic.

**Observation:** higher $K$ means the channel is closer to AWGN, easier to decode. Rayleigh ($K \to 0$) is the worst case.

---

## 8. AMPS/TACS/GSM capacity

**AMPS:** 25 MHz uplink, 30 kHz channels = 833 channels; 42 reserved for control → ~791 voice; with $N = 7$ → ~113/cell.

**TACS:** 25 MHz, 25 kHz channels = 1000 channels; some control → ~988 voice; with $N = 7$ → ~141/cell.

**GSM Phase 1:** 25 MHz, 200 kHz = 125 carriers; with $N = 4$ → 31 carriers/cell; 8 slots each → **248 voice/cell**.

**Capacity multiplier GSM vs AMPS:** 248/113 ≈ **2.2×**.

---

## 9. Generational comparison

| Gen | Multiple access | Modulation | Peak rate | Core network | Applications |
|:---:|---|---|:---:|---|---|
| 1G | FDMA | FM (analog) | n/a | Circuit | Voice |
| 2G | TDMA | GMSK | 14.4 kbps | Circuit + HLR | Voice, SMS |
| 2.5G | TDMA | GMSK, 8-PSK (EDGE) | 470 kbps (EDGE) | + SGSN/GGSN | + packet data |
| 3G | WCDMA | QPSK, 16-QAM | 384 kbps (UMTS) | All-IP + CS/PS split | + mobile data |
| 3.5G | WCDMA | +64-QAM | 42 Mbps (HSPA+) | All-IP | + broadband |
| 4G | OFDMA/SC-FDMA | +256-QAM | 1 Gbps (LTE-A) | All-IP EPC | + video, VoLTE |
| 5G | CP-OFDM | +1024-QAM | 20 Gbps | SBA 5GC | + URLLC, mMTC, slicing |

---

## 10. 4G vs. 5G link budget

**Assumption:** Same TX power, antenna gains, sensitivity, FSPL until 500 m, then $n = 3.5$.

**LTE (2 GHz) at 1 km:** FSPL(500 m) + $35\log_{10}(1000/500)$ = $92 + 10.5 \approx$ **102.5 dB**.

**5G NR (28 GHz) at 1 km:** FSPL(500 m) + $35\log_{10}(2)$ = $120 + 10.5 \approx$ **130.5 dB**.

**Difference:** 28 dB. At same $P_{\text{tx}}$, 5G mmWave link has **28 dB more loss at 1 km**.

**To match coverage:** mmWave cells must be much smaller. If path-loss slope is 35 (beyond 500 m), the range $d$ at which 5G matches LTE coverage satisfies $35\log_{10}(d/0.5) = 10.5 - 28$ — this is negative, so no range matches. Instead, mmWave cells must be **~50–100 m** at the same TX power (dominated by FSPL even at 100 m).

**Practical:** mmWave cells are deployed at **100–300 m** with dense small-cell grids + massive MIMO beamforming (+18 dB) to recover coverage.