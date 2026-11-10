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

### Chapter 2 — Modulation and Coding for Wireless Systems

MSc in Communication Engineering · Year 1, Semester I

Dr. Tesfamichael Gebregziabher

---

## Outline

<div class="fragment">

**Part 1 — Analogue to digital**

- Why analogue is dead
- The IQ representation

</div>

<div class="fragment">

**Part 2 — Linear modulation**

- BPSK → QPSK → M-PSK → M-QAM
- BER, spectral efficiency, Gray coding

</div>

<div class="fragment">

**Part 3 — OFDM**

- Subcarrier spacing, cyclic prefix, PAPR
- Why 4G/5G chose it

</div>

<div class="fragment">

**Part 4 — Multiple access**

- FDMA, TDMA, CDMA, SDMA
- Comparison and combination

</div>

<div class="fragment">

**Part 5 — Coding**

- Convolutional, turbo, LDPC
- Source coding: speech, audio, video

</div>

---

## Learning outcomes

<div class="fragment">

**LO1 — Compare analog vs digital modulation**

Security, error control, data rate — why digital wins across the board.

</div>

<div class="fragment">

**LO2 — Analyze digital modulation schemes**

IQ plane, constellation, bits/symbol, BER, spectral efficiency.

</div>

<div class="fragment">

**LO3 — Analyze OFDM**

Subcarrier spacing, CP overhead, PAPR, spectral efficiency.

</div>

<div class="fragment">

**LO4 — Compare multiple-access techniques**

FDMA, TDMA, CDMA, SDMA — dimensions, interference, handover, reuse.

</div>

<div class="fragment">

**LO5 — Explain error-control and source coding**

Convolutional (~5 dB gain), turbo/LDPC (~8 dB), PCM → AMR-WB.

</div>

---

## §2.1 — Why modulation matters

<div class="fragment">

Every wireless link must transmit information **reliably** over a channel that is:

</div>

<div class="fragment">

**Noisy** — thermal noise, interference.

</div>

<div class="fragment">

**Fading** — multipath, shadowing.

</div>

<div class="fragment">

**Bandwidth-limited** — the spectrum is allocated, not infinite.

</div>

<div class="fragment">

**Modulation** maps bits to waveforms that fit the channel. **Coding** protects them from errors.

</div>

---

## The three-way trade-off

<div class="fragment">

Every design decision in this chapter balances three objectives:

</div>

<div class="fragment">

**Power efficiency** — how much $E_b/N_0$ do you need for a target BER?

</div>

<div class="fragment">

**Spectral efficiency** — how many bits/second/Hz do you get?

</div>

<div class="fragment">

**Complexity** — computational cost, latency, hardware.

</div>

<div class="fragment">

**You cannot optimise all three simultaneously.** This is the recurring theme.

</div>

---

## §2.2 — Analogue modulation — why it's dead

<div class="fragment">

**AM:** $s(t) = A_c[1 + m(t)]\cos(2\pi f_c t)$

Simple, cheap, but vulnerable to noise.

</div>

<div class="fragment">

**FM:** $s(t) = A_c\cos\!\left(2\pi f_c t + 2\pi k_f \int m\right)$

Constant envelope, capture effect, but wide bandwidth.

</div>

<div class="fragment">

**AMPS used FM** because the capture effect reduces co-channel interference — critical without coding.

</div>

<div class="fragment">

**But FM fails for modern services:**
- No encryption
- No error correction
- No data services
- Poor spectral efficiency

</div>

---

## §2.3 — The IQ plane — digital modulation's language

<div class="fragment">

Every bandpass signal can be written:

$$
\boxed{\;s(t) = I(t)\cos(2\pi f_c t) - Q(t)\sin(2\pi f_c t)\;}
$$

where $I(t), Q(t)$ are the **in-phase** and **quadrature** components.

</div>

<div class="fragment">

Equivalently, in **complex baseband:**

$$
\tilde s(t) = I(t) + j\,Q(t)
$$

</div>

<div class="fragment">

**Constellation diagram** — the set of points $\{I_k + j Q_k\}$ representing each symbol.

</div>

<div class="fragment">

**Bits per symbol:** $b = \log_2 M$, where $M$ is the constellation size.

**Symbol rate:** $R_s$. **Bit rate:** $R_b = b R_s$.

</div>

---

## Key SNR parameter — $E_b/N_0$

<div class="fragment">

**Energy per bit** vs. **noise power spectral density.**

$$
\boxed{\;\frac{E_b}{N_0} = \frac{E_s}{b\,N_0}\;}
$$

where $E_s$ is symbol energy, $b$ is bits per symbol.

</div>

<div class="fragment">

**Why normalize by $b$?** So all modulation schemes compare on the same power-per-bit basis.

</div>

<div class="fragment">

**Two systems with the same $E_b/N_0$** consume the same energy per bit — the one with lower BER is more **power-efficient**.

</div>

---

## §2.4 — BPSK — the workhorse of low SNR

<div class="fragment">

**Binary Phase Shift Keying.** Two symbols, opposite phase:

$$
s_1(t) = \sqrt{E_b}\cos(2\pi f_c t), \qquad s_2(t) = -\sqrt{E_b}\cos(2\pi f_c t)
$$

</div>

<div class="fragment">

**Constellation:** two points at $\pm\sqrt{E_b}$ on the I-axis.

</div>

<div class="fragment">

| Property | Value |
|---|---|
| Bits/symbol | 1 |
| Spectral efficiency | 1 bps/Hz |
| BER (coherent) | $Q(\sqrt{2E_b/N_0})$ |

</div>

<div class="fragment">

**Used for:** very low SNR (deep fade, satellite uplink, 5G coverage scenarios).

</div>

---

## QPSK — same BER, twice the throughput

<div class="fragment">

**Four symbols at 90° phase increments.**

**Constellation:** four points on the unit circle at $\pm 45°, \pm 135°$.

</div>

<div class="fragment">

| Property | BPSK | **QPSK** |
|---|---|---|
| Bits/symbol | 1 | **2** |
| Spectral efficiency | 1 bps/Hz | **2 bps/Hz** |
| BER | $Q(\sqrt{2\gamma})$ | **$Q(\sqrt{2\gamma})$** |

</div>

<div class="fragment">

**Same BER, twice the spectral efficiency.** QPSK dominates BPSK everywhere SNR is sufficient.

</div>

<div class="fragment">

**Used in:** every 3G/4G/5G control channel, WCDMA, DVB, 802.11.

</div>

---

## M-QAM — trading power for spectral efficiency

<div class="fragment">

**M-ary QAM** arranges $M = 2^b$ symbols on a 2-D grid.

Normalized average energy: $E_s = \frac{2(M-1)}{3} E_0$.

</div>

<div class="fragment">

| Modulation | Bits/symbol | Spectral eff. | $E_b/N_0$ penalty vs. QPSK (at BER=$10^{-5}$) |
|:---:|:---:|:---:|:---:|
| QPSK | 2 | 2 bps/Hz | 0 |
| 16-QAM | 4 | 4 | ~4 dB |
| 64-QAM | 6 | 6 | ~8 dB |
| 256-QAM | 8 | 8 | ~12 dB |

</div>

<div class="fragment">

**The 3 dB-per-bit rule:** each extra bit/symbol costs ~3 dB in $E_b/N_0$ at the same BER.

</div>

<div class="fragment">

**Trade-off:** 256-QAM needs >25 dB SNR — excellent for cell centre, useless at cell edge.

</div>

---

## Checkpoint — QPSK vs. 16-QAM

<div class="quiz" data-question="qpsk-16qam">
  <p class="quiz-question">At the same $E_b/N_0$, which modulation gives <strong>lower BER</strong>?</p>
  <button class="quiz-option" data-answer="correct">QPSK</button>
  <button class="quiz-option" data-answer="wrong">16-QAM</button>
  <button class="quiz-option" data-answer="wrong">They are equal</button>
  <button class="quiz-option" data-answer="wrong">Depends on noise distribution</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** QPSK has 2 bits/symbol; 16-QAM has 4. At the same energy per bit, 16-QAM packs twice the bits into the same 2-D space — the constellation points are closer, so any noise is more likely to cause a symbol error.

</div>

---

## §2.5 — Gray coding — reducing BER for free

<div class="fragment">

**Problem:** adjacent constellation points are the most likely error locations.

</div>

<div class="fragment">

**Without Gray coding:** a symbol error may corrupt $\log_2 M$ bits.

</div>

<div class="fragment">

**With Gray coding:** adjacent points differ by exactly **1 bit** — a symbol error corrupts exactly **1 bit**.

</div>

<div class="fragment">

**Result:**

$$
P_b \approx \frac{P_s}{\log_2 M}
$$

BER reduced by factor $\log_2 M$ at the same SER.

</div>

<div class="fragment">

**Standard everywhere** — BPSK through 1024-QAM. Costs nothing; pure benefit.

</div>

---

## §2.6 — Pulse shaping and spectral efficiency

<div class="fragment">

The **symbol waveform** $p(t)$ determines the occupied bandwidth.

</div>

<div class="fragment">

**Ideal Nyquist (sinc):** $p(t) = \text{sinc}(t/T_s)$ — bandwidth $R_s/2$, but unrealisable (infinite tails).

</div>

<div class="fragment">

**Practical: raised cosine.** Roll-off factor $\beta \in [0,1]$.

Occupied bandwidth:
$$
\boxed{\;B = \frac{R_s}{2}(1 + \beta)\;}
$$

</div>

<div class="fragment">

**Spectral efficiency** (bits/second/Hz):

$$
\boxed{\;\eta = \frac{2b}{1 + \beta}\;}
$$

</div>

<div class="fragment">

**LTE uses $\beta = 0.22$** — 22% excess bandwidth for good time localisation.

</div>

---

## Checkpoint — spectral efficiency

<div class="quiz" data-question="spec-eff">
  <p class="quiz-question">For 64-QAM ($b = 6$) with raised-cosine roll-off $\beta = 0.22$, what is the spectral efficiency?</p>
  <button class="quiz-option" data-answer="wrong">6 bps/Hz</button>
  <button class="quiz-option" data-answer="correct">~9.8 bps/Hz</button>
  <button class="quiz-option" data-answer="wrong">12 bps/Hz</button>
  <button class="quiz-option" data-answer="wrong">3 bps/Hz</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Compute:** $\eta = \frac{2 \times 6}{1 + 0.22} = \frac{12}{1.22} \approx 9.84$ bps/Hz. LTE's 20 MHz carrier, 64-QAM, rate-3/4 coding reaches ~90 Mbps.

</div>

---

## §2.7 — Shannon capacity — the fundamental limit

<div class="fragment">

Every wireless design is ultimately constrained by:

$$
\boxed{\;C = B \log_2\!\left(1 + \frac{S}{N}\right)\;}
$$

</div>

<div class="fragment">

**Spectral efficiency bound:**

$$
\eta = \log_2(1 + \text{SNR})
$$

</div>

<div class="fragment">

**The Shannon gap.** Modern systems (5G NR with LDPC) achieve **within 1 dB of Shannon** at moderate spectral efficiency — via powerful FEC and high-order modulation.

</div>

<div class="fragment">

**We've essentially hit the theoretical limit.** Further gains come from more spectrum, more antennas, or more cells — not from better modulation.

</div>

---

## §2.8 — OFDM — the PHY of 4G and 5G

<div class="fragment">

**OFDM = Orthogonal Frequency Division Multiplexing.**

The wideband channel is split into $N$ **narrow subcarriers**, each flat.

</div>

<div class="fragment">

**Why?** A 20 MHz channel with urban delay spread has $B_s \gg B_c$ — frequency-selective. OFDM converts a single frequency-selective channel into $N$ flat subchannels.

</div>

<div class="fragment">

**Generating the signal** via **IFFT:**

$$
s[n] = \frac{1}{N}\sum_{k=0}^{N-1} X_k\, e^{j2\pi kn/N}
$$

</div>

<div class="fragment">

**Recovery at the receiver** via **FFT.** Efficient, cheap, standard.

</div>

---

## The cyclic prefix (CP)

<div class="fragment">

Before transmission, **prepend a copy of the last $T_{cp}$ seconds** of the symbol.

</div>

<div class="fragment">

**Purpose:** absorb the **delay spread** of the channel, so the previous symbol's tail doesn't overlap the current symbol.

</div>

<div class="fragment">

**Requirement:** $T_{cp} > \tau_{\max}$.

</div>

<div class="fragment">

**Cost:** redundant information — CP consumes $\frac{T_{cp}}{T_u + T_{cp}}$ of the symbol duration.

**LTE normal CP:** ~7% overhead.

</div>

---

## OFDM spectral efficiency

<div class="fragment">

For $N_u$ useful subcarriers, $b$ bits per subcarrier, useful symbol $T_u$, CP $T_{cp}$:

$$
\boxed{\;\eta = b \cdot \frac{N_u}{N_{FFT}} \cdot \frac{T_u}{T_u + T_{cp}}\;}
$$

</div>

<div class="fragment">

**LTE 20 MHz, 64-QAM example:**

$b = 6$, $N_u/N_{FFT} \approx 0.586$, $T_u/(T_u+T_{cp}) \approx 0.934$

$\eta \approx 6 \times 0.586 \times 0.934 \approx 3.28$ bps/Hz

</div>

<div class="fragment">

**Why so much less than 6 bps/Hz?** Guard bands (~40%), CP (~7%), and reference signals consume the rest.

</div>

<div class="fragment">

**Peak LTE 20 MHz single-stream:** ~66 Mbps theoretical, ~150 Mbps with 2×2 MIMO — matches Cat-4.

</div>

---

## PAPR — the price of OFDM

<div class="fragment">

**Problem:** OFDM signal is the sum of many independent subcarriers. Occasionally they align in phase → very high peak.

**PAPR** = peak power / average power.

Worst case: $10\log_{10}(N)$ dB. For $N = 2048$: **~33 dB**.

</div>

<div class="fragment">

**Consequence:** power amplifier must back off → low efficiency → less coverage or more cost.

</div>

<div class="fragment">

**Solutions used in 4G/5G:**
- **SC-FDMA / DFT-s-OFDM** (uplink) — reduces PAPR by ~3 dB
- **Clipping and filtering** — mild distortion
- **Digital predistortion** — compensates PA non-linearity

</div>

---

## §2.9 — Multiple access — sharing the spectrum

<div class="fragment">

Four techniques dominate:

| Technique | Dimension | Key idea |
|---|---|---|
| **FDMA** | Frequency | Each user gets a slice of spectrum |
| **TDMA** | Time | Each user gets a time slot |
| **CDMA** | Code | Each user gets a spreading code |
| **SDMA** | Space | Each user separated by direction |

</div>

<div class="fragment">

**Modern systems combine them:** 4G/5G use **OFDMA** (frequency + time) plus **MIMO** (space).

</div>

---

## FDMA — the simplest

<div class="fragment">

Divide bandwidth $B$ into $N_c$ channels of width $B_c$:

$$
N_c = \frac{B}{B_c + B_g}
$$

where $B_g$ is the guard band.

</div>

<div class="fragment">

**Used in:** AMPS, TACS. **No synchronization** needed between users.

</div>

<div class="fragment">

**Disadvantages:** rigid allocation, poor spectral efficiency (guard bands), no flexibility for data bursts.

</div>

---

## TDMA — time-sliced sharing

<div class="fragment">

Users share one frequency but transmit in **different time slots.**

Users per cell = total slots divided by reuse factor $N$.

</div>

<div class="fragment">

**Used in:** GSM (8 slots per 200 kHz carrier), IS-136.

</div>

<div class="fragment">

**Advantages:** better than FDMA (no intra-user guard bands), flexible slot allocation, easier adaptive modulation.

</div>

<div class="fragment">

**Disadvantages:** requires precise time synchronization; peak power per user is high (short duty cycle).

</div>

<div class="fragment">

**GSM example:** 8 slots × 200 kHz carriers → **~2× capacity vs. AMPS** at the same spectrum.

</div>

---

## CDMA — spreading codes

<div class="fragment">

All users share **the full bandwidth**, distinguished by spreading codes.

**Processing gain:**

$$
\boxed{\;G = \frac{R_c}{R_s}\;}
$$

where $R_c$ is chip rate (bandwidth) and $R_s$ is data rate.

</div>

<div class="fragment">

**Orthogonal codes:**
- **Walsh–Hadamard** — orthogonal (downlink)
- **Gold codes** — pseudo-random (uplink)

</div>

<div class="fragment">

**Advantages:**
- $N=1$ frequency reuse everywhere
- **Soft handover** (multiple base stations simultaneously)
- Graceful degradation
- Security (signal looks like noise)

</div>

<div class="fragment">

**Disadvantages:**
- **Near-far problem** — strong user overwhelms weak
- Needs fast, precise power control

</div>

---

## Checkpoint — soft handover

<div class="quiz" data-question="soft-ho">
  <p class="quiz-question"><strong>Soft handover</strong> — being connected to multiple base stations simultaneously — is a signature feature of which multiple-access technology?</p>
  <button class="quiz-option" data-answer="wrong">FDMA</button>
  <button class="quiz-option" data-answer="wrong">TDMA</button>
  <button class="quiz-option" data-answer="correct">CDMA</button>
  <button class="quiz-option" data-answer="wrong">SDMA</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** CDMA's $N=1$ frequency reuse means every cell uses the same spectrum. A UE can receive/transmit from multiple cells on the same frequency — combining signals. TDMA/FDMA require different frequencies or time slots per cell, forcing hard handover.

</div>

---

## SDMA — the spatial dimension

<div class="fragment">

Users separated by their **spatial signature** — their location.

</div>

<div class="fragment">

**Implemented via:**
- **Sectorisation** — 3 or 6 sectors per cell
- **Beamforming** — narrow beam toward each UE
- **MU-MIMO** — multiple independent streams on the same resource

</div>

<div class="fragment">

**Used in:** every modern base station (as sectorisation), 4G/5G with massive MIMO.

</div>

<div class="fragment">

**Multiplies capacity** without consuming frequency, time, or code — but requires multiple antennas and complex precoding.

</div>

---

## Multiple access — comparison

| Feature | FDMA | TDMA | CDMA | SDMA |
|---|---|---|---|---|
| Dimension | Frequency | Time | Code | Space |
| Sync required | No | **Yes** | No (UL) / Yes (DL) | Yes |
| Handover | Hard | Hard | **Soft** | Hard |
| Reuse factor | $N>1$ | $N>1$ | **$N=1$** | $N=1$ |
| Used in | AMPS | GSM | UMTS | 4G/5G |

<div class="fragment">

**Modern systems use ALL FOUR:**

- **LTE downlink:** OFDMA (frequency + time), MIMO (space)
- **LTE uplink:** SC-FDMA, MIMO
- **5G NR:** CP-OFDM, massive MIMO (SDMA), no CDMA

</div>

---

## §2.10 — Error-control coding

<div class="fragment">

**The problem:** noise and fading cause bit errors. **Coding** adds redundancy so errors can be detected and corrected — improving reliability without extra transmit power (at the cost of bandwidth).

</div>

<div class="fragment">

**Key parameters:**

- **Rate:** $R_c = k/n$ — $k$ information bits per $n$ transmitted bits
- **Coding gain:** how much **less $E_b/N_0$** needed for the same BER

</div>

<div class="fragment">

**Shannon's promise:** near-arbitrary reliability at any rate below capacity, with long codes and maximum-likelihood decoding.

**The engineering:** build codes that approach this with reasonable complexity.

</div>

---

## Codes that make 4G/5G work

<div class="fragment">

| Code | Coding gain at BER=$10^{-5}$ | Used in |
|---|:---:|---|
| **Convolutional** (K=7, R=1/2) | ~5 dB | GSM, UMTS control |
| **Turbo** | ~8 dB | UMTS/HSPA, LTE data |
| **LDPC** | **~8.5 dB** | **5G data**, WiFi 6, DVB-S2 |

</div>

<div class="fragment">

**The takeaway:** coding gains from **5 dB → 8.5 dB** are the single biggest reason modern systems achieve >5 bps/Hz — where uncoded QPSK tops out at 2.

</div>

<div class="fragment">

**Without modern FEC, 4G/5G as we know them would not exist.**

</div>

---

## §2.11 — Source coding — compressing the signal

<div class="fragment">

**Source coding** removes **redundancy** in the signal — the input to the channel coder.

**Channel coding** adds **structured redundancy** to protect against errors.

</div>

<div class="fragment">

**Speech coding:**

| Codec | Technique | Rate | Quality |
|---|---|:---:|:---:|
| **G.711** | PCM | 64 kbps | Toll |
| **G.729** | CS-ACELP | 8 kbps | Toll |
| **AMR-NB** | ACELP | 4.75–12.2 kbps | Mobile |
| **AMR-WB** | ACELP wideband | 6.6–23.85 kbps | HD voice |

</div>

<div class="fragment">

**8× compression** from G.711 to G.729 — safe because the vocal tract has only ~10–20 degrees of freedom.

</div>

<div class="fragment">

**Audio:** MP3, AAC, Opus. **Video:** H.264, HEVC, AV1.

</div>

---

## The source-channel coding trade-off

<div class="fragment">

**Source coding** removes redundancy.

**Channel coding** adds structured redundancy.

</div>

<div class="fragment">

**Shannon says:** separating them is **optimal** for point-to-point links. (Joint source-channel coding helps for multiuser or delay-critical scenarios.)

</div>

<div class="fragment">

**In practice:** most systems separate them for simplicity.

</div>

<div class="fragment">

**Rule of thumb for wireless:**

1. Compress the source as much as quality allows
2. Protect the compressed stream with strong FEC
3. **Don't compress and then leave unprotected** — a single uncorrected bit error can destroy a whole frame

</div>

---

## Checkpoint — source vs. channel coding

<div class="quiz" data-question="src-chan">
  <p class="quiz-question">Which pair correctly describes the roles of source and channel coding?</p>
  <button class="quiz-option" data-answer="correct">Source coding removes redundancy; channel coding adds structured redundancy</button>
  <button class="quiz-option" data-answer="wrong">Both remove redundancy</button>
  <button class="quiz-option" data-answer="wrong">Both add redundancy</button>
  <button class="quiz-option" data-answer="wrong">Source coding adds redundancy; channel coding removes it</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**The two are complementary, not competing.** Source coding makes the data smaller; channel coding makes it robust. Together they allow a 64 kbps voice signal to be transmitted reliably at 8–12 kbps over a fading channel.

</div>

---

## Chapter 2 — key takeaways

<div class="fragment">

**1.** **Digital modulation** operates in the IQ plane. Key metrics: bits/symbol $b$, spectral efficiency, power efficiency ($E_b/N_0$).

</div>

<div class="fragment">

**2.** **QPSK** gives 2× throughput over BPSK at the same BER. **M-QAM** trades power for spectral efficiency at ~3 dB per bit.

</div>

<div class="fragment">

**3.** **Gray coding** reduces BER by a factor of $\log_2 M$ at the same SER. Free improvement.

</div>

<div class="fragment">

**4.** **OFDM** turns a frequency-selective channel into $N$ flat subchannels via IFFT/FFT + cyclic prefix. The PHY of 4G and 5G.

</div>

<div class="fragment">

**5.** **Multiple access:** FDMA (frequency), TDMA (time), CDMA (code), SDMA (space). **Modern systems combine all four.**

</div>

<div class="fragment">

**6.** **Modern FEC** (turbo, LDPC) provides ~8 dB coding gain — bringing practical systems within 1 dB of Shannon capacity.

</div>

---

## Next — Chapter 3

**GSM — the digital cellular revolution**

<div class="fragment">

- Architecture: MS, BSS, NSS, OSS
- Physical layer: TDMA frames, 8 slots per carrier
- GMSK modulation
- Logical and physical channels
- RPE-LTP speech coding
- 2.5G evolution: GPRS, EDGE

</div>

<div class="fragment">

**GSM's TDMA architecture is the direct application of Chapter 2's modulation and coding principles.**

</div>

---

<aside class="notes">
  <div style="font-size: 16px; line-height: 1.6;">

**Speaker notes for the whole lecture:**

- Slides 4–7 (analogue vs. digital, IQ plane): spend ~5 min. Emphasize that IQ is *the* language of digital modulation — every scheme from BPSK to 1024-QAM lives in the IQ plane.
- Slides 8–11 (BPSK, QPSK, QAM): the key result is **QPSK's 2× spectral efficiency at the same BER as BPSK**. Have students verify the formula.
- Slides 12–14 (Gray coding, pulse shaping, spectral efficiency): Gray coding is a "free" improvement — emphasize that every real system uses it.
- Slides 15–16 (Shannon): the fundamental limit. Show that LTE-A and 5G NR are within 1 dB — reaching the wall.
- Slides 17–21 (OFDM): the biggest PHY change since GSM. Emphasize CP, subcarrier orthogonality, and PAPR's cost.
- Slides 22–26 (multiple access): the four techniques and how modern systems combine them.
- Slides 27–31 (coding): the ~8 dB coding gain from LDPC is what enables 4G/5G's high spectral efficiency.

**Chapter 2 is the analytical core of the course.** Every subsequent chapter — GSM, UMTS, 4G, 5G — is a specific application of these fundamentals.

  </div>
</aside>