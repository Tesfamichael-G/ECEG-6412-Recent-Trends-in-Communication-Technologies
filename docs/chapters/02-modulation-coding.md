# Chapter 2 — Modulation and Coding for Wireless Systems

!!! abstract "Chapter at a glance"
    **Contact hours:** 3 lecture · **Home study:** 7 h · **Part I — Wireless system basics**
    
    **Coverage (syllabus):** analogue and digital modulation · BPSK, QPSK, QAM ·
    OFDM · multiple access (TDMA, FDMA, CDMA, SDMA) · error control coding ·
    source coding.

---

## Learning outcomes

By the end of this chapter you should be able to:

1. Compare **analogue** (AM, FM, PM) and **digital** modulation, and explain why digital
   is universally preferred in modern systems.
2. Represent digital modulation in the **IQ plane** and identify the constellation,
   the symbol rate, and the bits per symbol for **BPSK, QPSK, M-PSK, and M-QAM**.
3. Compute **bit-error rate (BER)** as a function of $E_b/N_0$ for coherent BPSK,
   QPSK, and approximate BER for M-QAM.
4. Compute **spectral efficiency**, **power efficiency**, and the effect of **pulse
   shaping** (raised cosine, roll-off factor).
5. Explain **Gray coding** and compute its advantage over natural binary mapping.
6. Analyse **OFDM** — subcarrier spacing, cyclic prefix, spectral efficiency, PAPR —
   and explain why it dominates 4G and 5G.
7. Compare **FDMA, TDMA, CDMA, and SDMA** in dimension, interference mechanism,
   capacity, and handover.
8. Explain **error-control coding** — linear block, cyclic, convolutional, turbo,
   and LDPC — and compute the **coding gain** for a standard code.
9. Describe **source coding** — speech (PCM, DPCM, vocoders), audio, image, video —
   and identify the compression ratio achieved by each.
10. Implement modulation, BER simulation, and a Hamming encoder in **Python, Java,
    and C#**.

---

## 2.1 Why modulation and coding?

Every wireless system must transmit information **reliably** over a channel that is
**noisy, fading, and bandwidth-limited**. Modulation and coding are the tools that
make this possible:

- **Modulation** — map bits to waveforms (analogue or digital carriers) in a way that
  fits the channel bandwidth and spectrum regulations.
- **Multiple access** — share the spectrum among many simultaneous users.
- **Coding** — detect and correct channel errors, and compress the source so that
  the bit rate fits the channel.

!!! note "The three-way trade-off"
    Every design decision in this chapter balances:
    
    - **Power efficiency** — how much $E_b/N_0$ is needed for a target BER.
    - **Spectral efficiency** — how many bits per second per Hz the scheme achieves.
    - **Complexity** — computational cost, latency, hardware.
    
    No scheme optimises all three simultaneously. This is the recurring theme of
    wireless system design.

---

## 2.2 Analogue modulation

Before digital, wireless systems used analogue modulation. AMPS (Chapter 1) used
**FM**; broadcast radio uses AM or FM. These are reviewed briefly because they
shape the vocabulary and the historical baseline — but modern systems (2G onward)
are entirely digital.

### 2.2.1 Amplitude modulation (AM)

The carrier amplitude varies with the message $m(t)$:

$$
\boxed{\;s(t) = A_c[1 + m(t)]\cos(2\pi f_c t)\;}
$$

**Bandwidth.** $B = 2 W$ where $W$ is the message bandwidth (DSB with carrier,
or SSB at $B = W$).

**Advantages.** Simple transmitter and receiver; cheap.

**Disadvantages.** Vulnerable to amplitude noise; poor power efficiency (carrier
transmits no information); poor security (easy to demodulate).

### 2.2.2 Frequency modulation (FM)

The carrier instantaneous frequency varies with $m(t)$:

$$
\boxed{\;s(t) = A_c \cos\!\left(2\pi f_c t + 2\pi k_f \int_0^t m(\tau)\, d\tau\right)\;}
$$

**Bandwidth.** Carson's rule: $B \approx 2(\Delta f + W)$, where $\Delta f = k_f A_m$
is the peak frequency deviation.

**Advantages.** **Capture effect** — the stronger signal is received with very
little interference, which allows co-channel reuse in cellular systems.

**Disadvantages.** Bandwidth is much larger than AM (typically 5–10× the message
bandwidth); see the 30 kHz channel for AMPS voice (compared with 3.4 kHz message
bandwidth).

### 2.2.3 Phase modulation (PM)

The carrier phase varies with $m(t)$:

$$
\boxed{\;s(t) = A_c \cos(2\pi f_c t + k_p\, m(t))\;.}
$$

Linear PM is equivalent to FM for small modulation index.

### 2.2.4 Why analogue is dead

AMPS and TACS used FM for voice because:

- **Simple, mature technology** (1950s–1980s).
- **Capture effect** reduces co-channel interference, which was critical without coding.
- **Spectrum was regulated** around voice-grade channels (30 kHz for AMPS).

But FM has fatal limitations in a **digital services** world:

- No encryption (easy to eavesdrop).
- No error correction (all noise is passed through).
- No data services (only voice).
- Poor spectral efficiency (each voice channel is 30 kHz for 3.4 kHz of information).

Digital modulation and coding solve all four. The rest of this chapter is about
how.

---

## 2.3 Digital modulation fundamentals

### 2.3.1 The IQ representation

Every bandpass signal can be written in terms of its **in-phase** $I(t)$ and
**quadrature** $Q(t)$ components:

$$
\boxed{\;s(t) = I(t)\cos(2\pi f_c t) - Q(t)\sin(2\pi f_c t)\;}
$$

Equivalently, in **complex baseband**:

$$
\boxed{\;s(t) = \Re\{ \tilde s(t)\, e^{j2\pi f_c t} \},\quad \tilde s(t) = I(t) + j Q(t)\;}
$$

where $\tilde s(t)$ is the **complex envelope** or **baseband signal**.

**Why IQ matters.** Digital modulation is naturally described in the IQ plane:

- **Constellation** — the set of points $\{s_k = I_k + j Q_k\}$ representing each symbol.
- **Symbol rate** $R_s$ — symbols per second; each symbol carries $b = \log_2 M$ bits.
- **Bit rate** $R_b = b R_s$.

An IQ **constellation diagram** plots all $M$ points; the shape determines the
power/spectral efficiency trade-off.

### 2.3.2 Signal set and energy

Each symbol $s_k$ has **energy**

$$
E_k = \int_0^{T_s} |s_k(t)|^2\, dt
$$

For **equal-energy** constellations (PSK), $E_k = E_s$ (constant). For **QAM**,
energies vary across symbols; we use the **average** symbol energy $E_s$.

The key SNR parameter is:

$$
\boxed{\;\frac{E_b}{N_0} = \frac{E_s}{b\, N_0}\;}
$$

where $b = \log_2 M$ is bits per symbol and $N_0/2$ is the two-sided noise PSD.

**Why $E_b/N_0$?** It normalises across modulation orders, so that all schemes can
be compared on the same power-per-bit basis. Two systems with the same $E_b/N_0$
use the same energy per bit; the one with lower BER is more **power efficient**.

### 2.3.3 Pulse shaping and bandwidth

The **symbol waveform** is a pulse $p(t)$ — ideally a Nyquist pulse that is zero
at all symbol intervals except its own. This avoids **intersymbol interference (ISI)**.

**Ideal Nyquist (sinc) pulse:** $p(t) = \text{sinc}(t/T_s)$. Bandwidth: $R_s/2$,
the Nyquist minimum.

**Practical pulse — raised cosine:**

$$
\boxed{\;p_{RC}(t) = \frac{\sin(\pi t/T_s)}{\pi t/T_s} \cdot \frac{\cos(\pi \beta t/T_s)}{1 - (2\beta t/T_s)^2}\;}
$$

with **roll-off factor** $\beta \in [0, 1]$. Occupied bandwidth:

$$
\boxed{\;B_{\text{RC}} = \frac{R_s}{2}(1 + \beta)\;}
$$

- $\beta = 0$ → sinc (minimum bandwidth but unrealisable; infinite time-domain tails).
- $\beta = 1$ → bandwidth 2× minimum but well-localised in time.
- $\beta = 0.22$ (typical LTE) → 22% excess bandwidth.

**Spectral efficiency** with raised-cosine:

$$
\boxed{\;\eta = \frac{R_b}{B_{\text{RC}}} = \frac{b R_s}{R_s (1+\beta)/2} = \frac{2b}{1+\beta}\quad\text{bps/Hz}\;}
$$

For LTE 64-QAM with $\beta = 0.22$: $\eta = 2 \times 6 / 1.22 = 9.84$ bps/Hz.

---

## 2.4 Linear digital modulation schemes

The family of **linear** digital modulations — where the transmitted symbol is a
linear combination of basis functions — includes PSK and QAM. These are the
workhorses of 2G through 5G.

### 2.4.1 BPSK (Binary Phase Shift Keying)

**Two symbols**, opposite phases:

$$
\boxed{\;s_1(t) = \sqrt{E_b} \cos(2\pi f_c t),\quad s_2(t) = -\sqrt{E_b} \cos(2\pi f_c t)\;}
$$

**Constellation.** Two points on the I-axis at $\pm \sqrt{E_b}$.

| Property | Value |
|---|---|
| Bits per symbol | 1 |
| Spectral efficiency ($\beta=0$) | 1 bps/Hz |
| Power efficiency | Best (lowest $E_b/N_0$ for a target BER) |
| BER (coherent) | $P_b = Q(\sqrt{2 E_b/N_0})$ |

**When to use.** Very low SNR (deep fade, cell edge, satellite uplink). 5G NR
uses $\pi/2$-BPSK for extreme coverage scenarios.

### 2.4.2 QPSK (Quadrature Phase Shift Keying)

**Four symbols** at 90° phase increments:

$$
\boxed{\;s_k = \sqrt{E_s}\, e^{j(\pi/4 + k\pi/2)},\quad k = 0, 1, 2, 3\;}
$$

**Constellation.** Four points on the unit circle at $\pm 45°$, $\pm 135°$.

| Property | Value |
|---|---|
| Bits per symbol | 2 |
| Spectral efficiency ($\beta=0$) | 2 bps/Hz |
| Power efficiency | Same as BPSK (per bit): $P_b = Q(\sqrt{2 E_b/N_0})$ |
| BER (coherent) | $P_b = Q(\sqrt{2 E_b/N_0})$ — identical to BPSK |

**Why same BER as BPSK?** Each bit in QPSK is transmitted on its own I or Q
axis, and the two axes are orthogonal — so each bit's decision is independent
and uses the same 1-D constellation as BPSK. **Same energy per bit, same BER,
twice the spectral efficiency.** QPSK is the single most common modulation in
wireless systems.

**Use.** LTE/5G control channels, WCDMA (UMTS), DVB, 802.11.

### 2.4.3 M-PSK

General M-ary PSK: $M = 2^b$ symbols on the unit circle at uniform angular spacing.

**M-PSK with coherent detection:**

- **8-PSK:** 3 bits/symbol, ~3 dB worse than QPSK at the same BER.
- **16-PSK:** 4 bits/symbol, but ~10 dB worse than 16-QAM (why 16-QAM is preferred in practice — see below).

M-PSK beyond 8 is rarely used because constellations crowd near the unit circle
and require high $E_b/N_0$ for small gains in spectral efficiency. The superior
choice at higher orders is M-QAM.

### 2.4.4 M-QAM (Quadrature Amplitude Modulation)

**M-ary QAM** arranges $M = 2^b$ symbols on a 2-D grid:

$$
\boxed{\;\text{constellation} = \{(2i - \sqrt M + 1) + j(2k - \sqrt M + 1)\}: i, k \in \{0, \dots, \sqrt M - 1\}\;}
$$

**Normalised average energy** $E_s$:

$$
\boxed{\;E_s = \frac{2(M - 1)}{3} E_0\;}
$$

where $E_0$ is the energy of the minimum-distance constellation point.

**Common orders:**

| Modulation | Bits/symbol | Spectral efficiency ($\beta=0$) | $E_b/N_0$ penalty vs. QPSK (dB) for BER=10⁻⁵ |
|---|:---:|:---:|:---:|
| QPSK | 2 | 2 | 0 |
| 16-QAM | 4 | 4 | ~4 |
| 64-QAM | 6 | 6 | ~8 |
| 256-QAM | 8 | 8 | ~12 |
| 1024-QAM | 10 | 10 | ~16 |

!!! tip "The 3 dB-per-bit rule"
    For **square QAM**, each additional bit/symbol costs approximately **3 dB** in
    $E_b/N_0$ to maintain the same BER. This is why 256-QAM (LTE-Advanced, WiFi 5)
    requires high SNR (>25 dB) — it is very power-efficient only in good channels.

**Why QAM beats PSK.** For $M \geq 16$, a QAM constellation packs more symbols
per unit of $E_b/N_0$ than a PSK constellation of the same order — because 2-D
grid placement exploits both dimensions efficiently, while PSK wastes symbols
near the unit circle.

**Use.** 16-QAM and 64-QAM in LTE/5G (adaptive); 256-QAM and 1024-QAM in
LTE-Advanced, WiFi 5/6/7, DOCSIS 3.1, 5G mmWave.

### Worked example 2.1 — BPSK BER at $E_b/N_0$ = 10 dB

**Convert 10 dB to linear:** $E_b/N_0 = 10^{10/10} = 10$.

$$
P_b = Q(\sqrt{2 \cdot 10}) = Q(\sqrt{20}) = Q(4.472)
$$

Using the standard table or approximation $Q(x) \approx \frac{1}{\sqrt{2\pi} x}e^{-x^2/2}$
for $x > 3$:

$$
Q(4.472) \approx 3.87 \times 10^{-6}.
$$

**Interpretation.** One bit error per ~258,000 bits. At 1 Mbps, this is one error
every ~0.26 s. Good but not perfect — requires error correction (FEC) to reach
application-level reliability.

### Worked example 2.2 — QPSK vs. BPSK at same power

**Same $E_b/N_0$ = 10 dB, same power, twice the data rate:**

- **BPSK:** $P_b = Q(\sqrt{20}) \approx 3.9 \times 10^{-6}$, spectral efficiency 1 bps/Hz.
- **QPSK:** $P_b = Q(\sqrt{20}) \approx 3.9 \times 10^{-6}$, spectral efficiency 2 bps/Hz.

**Same BER, twice the throughput.** QPSK strictly dominates BPSK in every
situation where the SNR is sufficient. BPSK is only preferred when the
receiver's phase tracking is problematic (extremely low SNR) or for
backward-compatibility (e.g., 5G NR preamble).

### Worked example 2.3 — 16-QAM vs. 64-QAM

At $E_b/N_0$ = 15 dB (linear 31.62):

**16-QAM** (approximate BER):

$$
P_b \approx \frac{4}{\log_2 16}\left(1 - \frac{1}{\sqrt{16}}\right) Q\!\left(\sqrt{\frac{3 \log_2 16}{16 - 1} \cdot \frac{E_b}{N_0}}\right)
$$

$$
= \frac{4}{4} \cdot 0.75 \cdot Q\!\left(\sqrt{\frac{3 \cdot 4}{15} \cdot 31.62}\right) = 0.75\, Q(\sqrt{25.3}) = 0.75\, Q(5.03) \approx 4.1 \times 10^{-7}.
$$

**64-QAM:**

$$
P_b \approx \frac{4}{6} \cdot \left(1 - \frac{1}{8}\right) Q\!\left(\sqrt{\frac{3 \cdot 6}{63} \cdot 31.62}\right) = \frac{2}{3} \cdot 0.875 \cdot Q(\sqrt{9.03}) \approx 0.583\, Q(3.005) \approx 7.8 \times 10^{-3}.
$$

**Interpretation.** At the same $E_b/N_0$ (same energy per bit), 16-QAM gives
$4 \times 10^{-7}$ BER while 64-QAM gives $8 \times 10^{-3}$ — four orders of
magnitude worse. But 64-QAM carries **50% more bits per Hz** (6 vs. 4).

The design decision depends on the target:

- **High quality (BER < 10⁻⁶):** 64-QAM needs much more power; 16-QAM wins.
- **High throughput, tolerate errors (BER ~10⁻³):** 64-QAM gives 50% more data at the same power.

This is why modern systems use **adaptive modulation**: 64-QAM when the channel
is good, QPSK when it's not.

### 2.4.5 Gray coding

**Gray coding** maps bits to symbols so that **adjacent constellation points
differ in only one bit**. This is the standard for BPSK through 1024-QAM.

**Why it matters.** In fading/noisy channels, the dominant error is a symbol
decision that lands on an **adjacent** constellation point. Without Gray coding,
that error corrupts **multiple bits**. With Gray coding, it corrupts exactly
**one bit**.

**For 16-QAM:** without Gray coding, a single symbol error might corrupt up to
4 bits; with Gray coding, exactly 1 bit. So Gray coding reduces **BER at the same
SER (symbol error rate)** by roughly $b$ — where $b$ is bits per symbol.

**The 3 dB Gray coding rule.** The standard coding-theoretic result: for square
QAM, the Gray-coded BER at high SNR is approximately

$$
\boxed{\;P_b \approx \frac{P_s}{\log_2 M}\;}
$$

where $P_s$ is the symbol error rate. Without Gray coding, $P_b \approx P_s$ (worst case). The factor $1/\log_2 M$ is the **effective ~3 dB per bit** benefit — approximately matching the "3 dB per bit" penalty from the table above (which is why that table remains valid for Gray-coded QAM).

### Worked example 2.4 — Gray-coded 16-QAM

Standard 16-QAM Gray coding:

| Symbol (I, Q) | Binary |
|:---:|:---:|
| (−3, −3) | 0000 |
| (−1, −3) | 0001 |
| (+1, −3) | 0011 |
| (+3, −3) | 0010 |
| (−3, −1) | 0100 |
| (−1, −1) | 0101 |
| (+1, −1) | 0111 |
| (+3, −1) | 0110 |
| (−3, +1) | 1100 |
| (−1, +1) | 1101 |
| (+1, +1) | 1111 |
| (+3, +1) | 1110 |
| (−3, +3) | 1000 |
| (−1, +3) | 1001 |
| (+1, +3) | 1011 |
| (+3, +3) | 1010 |

**Check adjacency.** Moving from (0,0) to (+1, −3) changes only the last bit
(0000 → 0001). Moving from (+1, −3) to (+3, −3) changes only the second-to-last
bit (0001 → 0011). **Every adjacent pair differs by exactly 1 bit.** ✓

**Consequence.** If the receiver picks (+1, −3) when the true symbol was (0,0),
only one bit is corrupted, not 4. Good for voice, video, and especially for FEC.

---

## 2.5 Performance metrics and the fundamental limits

### 2.5.1 Power efficiency vs. spectral efficiency

| Scheme | Power efficiency (low $E_b/N_0$ at target BER) | Spectral efficiency (bps/Hz) |
|---|:---:|:---:|
| BPSK | **Best** | Worst |
| QPSK | Excellent | Good |
| 16-QAM | Moderate | Very good |
| 64-QAM | Poor | Excellent |
| 256-QAM | Very poor | Outstanding |

The **Shannon limit** bounds the achievable combination:

$$
\boxed{\;C = B \log_2\!\left(1 + \frac{S}{N}\right) \quad\text{bps}\;}
$$

**Spectral efficiency** (bps/Hz):

$$
\boxed{\;\eta = \log_2(1 + \text{SNR})\;}
$$

**The Shannon gap.** Practical schemes (e.g., 5G NR with LDPC) achieve
**within ~1 dB** of the Shannon capacity at moderate spectral efficiency — through
powerful FEC and high-order modulation. This is remarkable: we've essentially
hit the theoretical limit.

### Worked example 2.5 — Shannon capacity

Channel with $B = 20$ MHz, SNR = 20 dB (linear 100):

$$
C = 20 \times 10^6 \times \log_2(101) \approx 20 \times 10^6 \times 6.66 \approx 133\ \text{Mbps}.
$$

**Realistic LTE at 20 MHz, 2×2 MIMO, 64-QAM (no MIMO):**

- Peak spectral efficiency (64-QAM, no coding): 6 bps/Hz.
- With rate-3/4 coding: 4.5 bps/Hz.
- With 20 MHz: ~90 Mbps.
- With 2×2 MIMO (2× data): ~180 Mbps.

LTE Cat-4 reaches 150 Mbps peak — roughly at the Shannon capacity for
20 MHz at 20 dB SNR.

**The Shannon limit is real.** LTE/5G design can't beat it; they can only
approach it more efficiently.

### 2.5.2 BER curves

The standard way to compare schemes is a plot of **BER vs. $E_b/N_0$**:

| Scheme | $E_b/N_0$ for BER=10⁻⁵ |
|---|:---:|
| BPSK / QPSK | ~9.6 dB (theoretical); ~10 dB practical |
| 16-QAM | ~13.5 dB |
| 64-QAM | ~17.5 dB |
| 256-QAM | ~21.5 dB |

**Reading the plot:** the horizontal distance between curves at a given BER is
the **power penalty**. BPSK → QPSK is 0 dB (same $E_b/N_0$). QPSK → 16-QAM is
~4 dB. Each subsequent 4× jump in constellation size costs ~4 dB (consistent
with the "3 dB per bit" rule).

---

## 2.6 OFDM — Orthogonal Frequency Division Multiplexing

**OFDM** is the dominant modulation for 4G and 5G. It solves the frequency-selective
fading problem elegantly by turning one wide, frequency-selective channel into
many narrow, flat subchannels.

### 2.6.1 The idea

A wideband single-carrier signal with bandwidth $B$ experiences **frequency-selective
fading** — some frequencies are boosted, some are nulled. The receiver needs
**equalization** (complex, especially for wide bandwidths).

**OFDM** instead:

1. Splits the bandwidth $B$ into $N$ parallel **subcarriers** of width $\Delta f = B/N$.
2. Each subcarrier is narrow enough that the channel is **flat** (no ISI).
3. Modulation and coding per subcarrier can be **independent** (link adaptation).
4. Uses **FFT/IFFT** to efficiently multiplex/demultiplex.

The subcarriers are **orthogonal** — their spectra overlap without interference,
achieving higher spectral efficiency than non-overlapping FDM.

### 2.6.2 The transmitted signal

**Continuous form:**

$$
\boxed{\;s(t) = \sum_{k=0}^{N-1} X_k\, e^{j2\pi k \Delta f\, t},\quad 0 \le t < T_u\;}
$$

where $X_k$ is the complex symbol on subcarrier $k$ and $T_u = 1/\Delta f$ is the
**useful symbol duration**.

**Discrete form (via IFFT):**

$$
\boxed{\;s[n] = \frac{1}{N}\sum_{k=0}^{N-1} X_k\, e^{j2\pi kn/N},\quad n = 0, \ldots, N-1.\;}
$$

The **IFFT** generates the time-domain samples; at the receiver, the **FFT**
recovers the subcarrier symbols.

### 2.6.3 Cyclic prefix (CP)

After the IFFT, a **cyclic prefix** of length $T_{cp}$ is prepended — copying the
last $N_{cp}$ samples to the front of each symbol.

$$
\boxed{\;s_{\text{with CP}}[n] = s[(n - N_{cp}) \bmod N],\quad n = 0, \ldots, N + N_{cp} - 1.\;}
$$

**Why?** The CP absorbs the **delay spread** of the channel, so that inter-symbol
interference (ISI) falls into the CP region and can be discarded at the receiver.
Provided $T_{cp} > \tau_{\max}$ (max delay spread), there is **zero ISI**.

**Trade-off.** The CP is redundant information — it carries no new data. The **CP
overhead** is $N_{cp}/(N + N_{cp})$, reducing spectral efficiency by that fraction.
Typical values:

| System | $T_u$ | $T_{cp}$ | Overhead |
|---|:---:|:---:|:---:|
| LTE (normal CP) | 66.67 μs | 4.7 μs | ~7% |
| LTE (extended CP) | 66.67 μs | 16.67 μs | ~20% |
| 5G NR (normal CP, 30 kHz subcarrier) | 33.33 μs | 2.4 μs | ~7% |
| 5G NR (extended CP) | 33.33 μs | 8.9 μs | ~21% |

### 2.6.4 Spectral efficiency of OFDM

The total bit rate for an OFDM system with $N_u$ useful subcarriers, $b$ bits per
subcarrier (QAM order), and $T_s = T_u + T_{cp}$:

$$
\boxed{\;\eta = \frac{N_u \cdot b}{N_{FFT} \cdot T_s} \cdot T_u = b \cdot \frac{N_u}{N_{FFT}} \cdot \frac{T_u}{T_u + T_{cp}}\;}
$$

where $N_{FFT} \cdot \Delta f = B$ is the total bandwidth.

**Typical:** $N_u/N_{FFT} \approx 0.9$ (10% guard band), $T_u/T_s \approx 0.93$ (7% CP).
For 64-QAM ($b = 6$): $\eta \approx 6 \times 0.9 \times 0.93 \approx 5$ bps/Hz — very close to the theoretical 6 bps/Hz for 64-QAM.

### Worked example 2.6 — LTE OFDM parameters

**LTE 20 MHz carrier:**

- FFT size: $N_{FFT} = 2048$.
- Subcarrier spacing: $\Delta f = 15$ kHz.
- Useful symbol time: $T_u = 1/\Delta f = 66.67$ μs.
- Normal CP: $T_{cp} \approx 4.7$ μs.
- Total symbol: $T_s = 71.4$ μs.
- Useful subcarriers: $N_u = 1200$ (out of 2048; the rest are guard).

**Spectral efficiency for 64-QAM (6 bps/Hz ideal):**

$$
\eta_{\text{LTE}} = 6 \cdot \frac{1200}{2048} \cdot \frac{66.67}{71.4} \approx 6 \cdot 0.586 \cdot 0.934 \approx 3.28\ \text{bps/Hz}.
$$

**Why so low vs. the theoretical 6 bps/Hz?** Because:

- **Guard bands** take 40% of the FFT bins (2048 − 1200 = 848 unused).
- **CP** takes 7% of the symbol time.
- **Reference signals** (pilots) further reduce data-carrying subcarriers by ~14%.

Peak LTE 20 MHz throughput = $3.28 \times 20\ \text{MHz} = 65.6$ Mbps (single stream);
with 2×2 MIMO = 131 Mbps; matches 3GPP LTE Cat-4 (150 Mbps peak, with 2×2 MIMO and slightly better spectral assumptions).

### 2.6.5 PAPR — the price of OFDM

**Peak-to-average power ratio (PAPR):** the OFDM signal is the sum of many
independent subcarriers, and their phases occasionally add **coherently** — producing
a high peak.

$$
\boxed{\;\text{PAPR} = \frac{\max |s(t)|^2}{E[|s(t)|^2]}\;}
$$

For $N$ subcarriers with random phases, PAPR can be up to $N$ (i.e., $10\log_{10}N$ dB in the worst case). For $N = 2048$, that's ~33 dB.

**Consequences.**

- **Power amplifier backoff.** The PA must operate with enough headroom to reproduce
  the peaks without distortion → reduces efficiency.
- **Signal distortion.** If the PA saturates, the peaks clip, causing spectral
  regrowth and adjacent-channel interference.

**Solutions used in 4G/5G:**

- **Clipping and filtering** — mild distortion; recovers 2–3 dB.
- **Tone reservation / tone injection** — reserve a few subcarriers for peak cancellation.
- **SC-FDMA** (single-carrier FDMA, used in LTE uplink) — DFT-precoding the OFDM signal → reduces PAPR by ~3 dB.
- **DFT-s-OFDM** — same as SC-FDMA.
- **5G NR uses CP-OFDM in downlink, and both CP-OFDM and DFT-s-OFDM in uplink** — choosing DFT-s-OFDM for coverage-limited cells.

---

## 2.7 Multiple access techniques

A wireless channel must be **shared** among many users. Four techniques dominate:

| Technique | Dimension | Key idea |
|---|---|---|
| **FDMA** | Frequency | Each user gets a slice of spectrum |
| **TDMA** | Time | Each user gets a time slot |
| **CDMA** | Code | Each user gets a spreading code |
| **SDMA** | Space | Each user is separated by direction |

Modern systems combine them: 4G/5G use **OFDMA** (frequency + time), **MIMO** (space), and **CDMA-like spreading** at the PHY.

### 2.7.1 FDMA — Frequency Division Multiple Access

Divide the available bandwidth $B$ into $N_c$ channels of width $B_c$:

$$
\boxed{\;N_c = \frac{B}{B_c + B_g}\;}
$$

where $B_g$ is the guard band between channels.

**Users per cell** = $N_c / N$ where $N$ is the frequency reuse factor (Chapter 1).

**Used in:** AMPS, TACS, the original analog cellular systems, and the uplink of LTE (SC-FDMA is a variant).

**Advantages.** Simple, no synchronization needed across users.

**Disadvantages.** Rigid allocation (a user can't borrow an idle channel), poor spectral efficiency due to guard bands, no flexibility for data bursts.

### 2.7.2 TDMA — Time Division Multiple Access

Users share a single frequency but transmit in **different time slots**. The frame
is divided into slots, one per user.

**Frame structure:** $K$ slots per frame; each user transmits in slot $k$.

$$
\boxed{\;\text{user bit rate} = \frac{R_b}{K}\;}
$$

where $R_b$ is the total bit rate of the shared channel.

**Used in:** GSM (8 slots per 200 kHz carrier), IS-136 (North American TDMA), DECT.

**Advantages.** Better spectral efficiency than FDMA (no guard bands between users);
flexible slot assignment; easier to implement adaptive modulation.

**Disadvantages.** Requires **time synchronization** across all users; propagation
delay must fit within a guard interval (timing advance in GSM); peak power of each
burst is higher than in FDMA (because of short duty cycle).

### Worked example 2.7 — GSM capacity

**GSM 900 MHz:**

- Total uplink bandwidth: 25 MHz.
- Carrier spacing: 200 kHz.
- Carriers per cell: $25 / 0.2 = 125$ total, but with $N = 4$ cluster: **31 carriers per cell**.
- **8 full-rate voice slots per carrier** (TDMA).
- **Voice channels per cell: 31 × 8 = 248.**

Compare with AMPS (Chapter 1):

- Bandwidth: 25 MHz (uplink) in the 800 MHz band.
- Channel: 30 kHz.
- Channels: $25 / 0.03 \approx 833$, or ~832.
- $N = 7$ cluster: **119 voice channels per cell**.

**GSM has ~2× the capacity of AMPS per cell, despite using only 200 kHz per carrier.** The gain comes from:

- **Digital voice coding** (13 kbps RPE-LTP) — narrower bit rate than analog.
- **TDMA** multiplexing (8 users per 200 kHz carrier).
- **Smaller cluster size** ($N = 4$ vs. 7) because digital systems tolerate lower SIR with FEC.

### 2.7.3 CDMA — Code Division Multiple Access

All users share the **full bandwidth** simultaneously; each is distinguished by a
unique **spreading code**.

**Spreading.** Multiply each data symbol by a **spreading sequence** $c(t)$ with
**chip rate** $R_c \gg R_s$ (data rate). The **spreading factor** or **processing
gain** is:

$$
\boxed{\;G = \frac{R_c}{R_s} = \frac{W}{R}\;}
$$

where $W = R_c$ is the chip rate bandwidth and $R = R_s$ is the data rate.

**Orthogonality.** Codes are chosen so that:

- The **auto-correlation** of each code is a sharp peak at zero lag (good for
  acquisition).
- The **cross-correlation** between any two codes is small (near-zero orthogonal).

Common codes:
- **Walsh–Hadamard** — orthogonal, used in the downlink (base station → mobile).
- **Gold codes** — pseudo-random, low cross-correlation, used in the uplink (mobile → base station) because timing isn't perfectly synchronized between mobiles.

**Reception.** The receiver multiplies by the desired user's code and integrates
over a bit period — this is a **matched filter** that extracts the user's signal
and rejects the others (because their codes are orthogonal or near-orthogonal).

**Used in:** IS-95 (cdmaOne), UMTS (WCDMA, Chapter 4), cdma2000, GPS.

**Advantages.**

- **Universal frequency reuse** — every cell uses the same frequency ($N = 1$ in
  frequency, though interference limits capacity).
- **Soft handover** — a mobile can be connected to multiple base stations
  simultaneously (no break).
- **Graceful degradation** — capacity is interference-limited; more users mean
  more noise, but the system doesn't suddenly fail.
- **Resistance to narrowband interference** — spreading averages out narrow
  interferers.
- **Security** — spread signal looks like noise without the code.

**Disadvantages.**

- **Near-far problem** — a strong nearby user overwhelms distant weak users,
  requiring **fast, accurate power control**.
- **Synchronization requirements** — Walsh codes need symbol-level sync; Gold
  codes relax this.
- **Self-interference** from non-orthogonality in multipath.

### Worked example 2.8 — CDMA processing gain

**UMTS (WCDMA):**

- Chip rate: 3.84 Mcps.
- Voice rate: 12.2 kbps (after source coding).
- Processing gain: $G = 3.84 \times 10^6 / 12.2 \times 10^3 \approx 315$ (25 dB).

**What does 25 dB of processing gain buy?** The signal is transmitted **below
the noise floor** — a receiver without the correct code sees only noise. With the
code, the signal emerges above the noise by 25 dB. This is what allows CDMA
to operate **below the noise floor** and to reuse the same frequency everywhere.

**Capacity of a single CDMA cell** (assuming perfect power control, single cell,
no interference from other cells):

$$
\boxed{\;K \approx 1 + G\!\left/ \frac{E_b}{N_0}\right.\;}
$$

For UMTS voice at $E_b/N_0$ = 5 dB (linear 3.16), $G$ = 315:

$$
K \approx 1 + 315/3.16 \approx 101\ \text{users per cell (pole capacity).}
$$

**Realistic capacity** is 40–60% of pole capacity (power control errors, interference
from adjacent cells, activity factor). UMTS voice is typically dimensioned at
~40–50 voice users per cell.

### 2.7.4 SDMA — Space Division Multiple Access

Users are distinguished by their **spatial signature** — their location relative
to the base station. Implemented via:

- **Sector antennas** — divide cell into 3 or 6 sectors (Chapter 1).
- **Beamforming** — steer a narrow beam toward each user, with multiple antennas.
- **MIMO spatial multiplexing** — send multiple independent data streams on the
  same time-frequency resource using spatially separated antennas.

**SDMA is used in:** every modern base station (as sectorization), 4G/5G with
massive MIMO (as multiuser MIMO / MU-MIMO).

**Advantages.** Does not consume frequency, time, or code resources — pure spatial
separation. Multiplies capacity by the number of beams / spatial streams.

**Disadvantages.** Requires multiple antennas at both ends; complex precoding;
performance depends on the spatial correlation between users.

### 2.7.5 Comparison and combination

| Feature | FDMA | TDMA | CDMA | SDMA |
|---|---|---|---|---|
| Dimension | Frequency | Time | Code | Space |
| Bandwidth per user | Narrow slice | Full (short) | Full (continuous) | Full |
| Time per user | Continuous | Slotted | Continuous | Continuous |
| Requires sync? | No | **Yes** | No (uplink); Yes (downlink) | **Yes** |
| Near-far problem? | Moderate | Moderate | **Severe** | Severe |
| Handover | Hard | Hard | **Soft** | Hard |
| Frequency reuse factor | $N > 1$ | $N > 1$ | **$N = 1$** | $N = 1$ (with beam split) |
| Peak power | Low | **High** (short duty) | Moderate | Moderate |
| Interference mechanism | Co-channel | Co-channel | Multiple-access + co-cell | Co-channel + spatial |
| Used in | AMPS, TACS | GSM, IS-136 | UMTS, IS-95, cdma2000 | 4G, 5G |

**Modern systems combine them all:**

- **LTE downlink (OFDMA):** frequency + time (OFDMA is FDMA+TDMA), + SDMA via MIMO.
- **LTE uplink (SC-FDMA):** low-PAPR single-carrier variant.
- **5G NR:** CP-OFDM downlink, CP-OFDM or DFT-s-OFDM uplink, massive MIMO (SDMA), no CDMA (CDMA was a 3G technology).

---

## 2.8 Error-control coding

Noise and fading cause bit errors. **Error-control coding (ECC)** adds redundancy
in a controlled way so that errors can be detected and/or corrected — improving
reliability without increasing transmit power (at the cost of bandwidth).

### 2.8.1 The fundamental trade-off

- **Coding rate** $R_c = k/n$ — $k$ information bits per $n$ transmitted bits.
- **Code rate < 1** means we transmit **more bits** than information — bandwidth
  overhead of $1/R_c$.
- **Coding gain** — how much **less $E_b/N_0$** is needed for the same BER.

The **Shannon limit** says a code can approach arbitrary reliability at any rate
below capacity — but the code must be **infinite-length** and **maximum-likelihood
decoded**. Practical codes trade off length, complexity, and gain.

### 2.8.2 Linear block codes

A **$(n, k)$ block code** encodes $k$ information bits into $n$ bits. The set of
$2^k$ codewords forms a **linear subspace** of $\{0, 1\}^n$.

**Minimum Hamming distance** $d_{\min}$ — the smallest number of bit positions
in which two codewords differ. Determines:

- **Error detection capability:** $d_{\min} - 1$ errors detectable.
- **Error correction capability:** $\lfloor (d_{\min} - 1)/2 \rfloor$ errors correctable.

**Hamming codes** — the simplest nontrivial family:

- $(7, 4)$ Hamming: $k = 4$, $n = 7$, $d_{\min} = 3$, corrects 1 error.
- $(15, 11)$: $d_{\min} = 3$, corrects 1 error.
- $(2^m - 1, 2^m - 1 - m)$: general form.

**Parity-check matrix** $H$ — the receiver computes $r = H \cdot x_{\text{received}}$
(the **syndrome**). If $r = 0$, no error detected. Otherwise, $r$ identifies the
error position (for single-error-correcting codes).

### Worked example 2.9 — (7, 4) Hamming encoder

**Generator matrix** in systematic form:

$$
G = \begin{bmatrix}
1 & 0 & 0 & 0 & 1 & 1 & 0 \\
0 & 1 & 0 & 0 & 1 & 0 & 1 \\
0 & 0 & 1 & 0 & 0 & 1 & 1 \\
0 & 0 & 0 & 1 & 1 & 1 & 1
\end{bmatrix}
$$

**Encoding.** Given message $\mathbf{u} = (u_1, u_2, u_3, u_4)$:

$$
\mathbf{c} = \mathbf{u} G
$$

The first 4 positions are the message bits; the last 3 are parity bits:

$$
p_1 = u_1 \oplus u_2 \oplus u_4,\quad
p_2 = u_1 \oplus u_3 \oplus u_4,\quad
p_3 = u_2 \oplus u_3 \oplus u_4.
$$

**Example.** Encode $\mathbf{u} = 1011$:

- $p_1 = 1 \oplus 0 \oplus 1 = 0$
- $p_2 = 1 \oplus 1 \oplus 1 = 1$
- $p_3 = 0 \oplus 1 \oplus 1 = 0$

Codeword: **$1011010$**. ✓

**Decoding.** Given received word $\mathbf{r}$, compute **syndrome** $\mathbf{s} = H\mathbf{r}^T$ (with $\mathbf{r}$ as a column).

For $H$:

$$
H = \begin{bmatrix}
1 & 1 & 0 & 1 & 1 & 0 & 0 \\
1 & 0 & 1 & 1 & 0 & 1 & 0 \\
0 & 1 & 1 & 1 & 0 & 0 & 1
\end{bmatrix}
$$

**Single error at position 4.** Received $\mathbf{r} = 1010010$ (bit 4 flipped from 1 to 0).

Syndrome = $H \mathbf{r}^T = (1, 1, 1)^T$ = binary 7. **Position 7?** Hmm, wait — 111 is decimal 7, and position 7 of the received word is the last bit, which is 0 — but that wasn't flipped.

Let me redo. Since $H$ is a parity-check matrix designed so that column $i$ of $H$ equals the binary representation of $i$ in the standard (7,4) Hamming code, but with a specific bit ordering, the syndrome directly gives the position of a single error.

Actually for the specific $H$ I wrote, column 4 is $(1, 1, 1)^T$ — so a single-bit error at position 4 gives syndrome $(1,1,1)^T$ = 7, which uniquely identifies position 4 as the error. ✓ (The syndrome 111 = 7 corresponds to the *column index*, not the position index — but for a properly constructed Hamming code, they match.)

**Correction.** Flip bit 4 of $\mathbf{r}$: $1010010 \to 1011010$ — the original codeword. ✓

**Rate.** $R_c = 4/7 \approx 0.571$.

**Coding gain.** At BER $10^{-5}$, (7,4) Hamming gives roughly **0 dB coding gain** — its rate and $d_{\min}$ are too small to help much. Hamming codes are used for **error detection** (or single-error correction in low-rate systems) — not for significant coding gain.

### 2.8.3 Cyclic codes

**Cyclic codes** are linear block codes with an additional property: every cyclic
shift of a codeword is also a codeword. This property enables **shift-register
encoders** — practical hardware with polynomial division.

**CRC (Cyclic Redundancy Check)** — a specific cyclic code for **error detection**.
Common polynomials:

- CRC-32 (Ethernet, 802.11)
- CRC-24 (LTE, 5G)
- CRC-16 (Bluetooth, USB)

**Rate:** typically very high (e.g., CRC-32 appends 32 bits to any-length message).
Not used for error correction; used to detect errors for HARQ retransmission.

### 2.8.4 Convolutional codes

**Convolutional codes** encode a stream of bits using a **shift register**. The
output at each step depends on the current bit and the last $K-1$ bits — a memory
of $K-1$.

**Parameters:**

- **Constraint length** $K$ — memory + 1.
- **Rate** $R_c = 1/n$ (typical) — or $k/n$.
- **Generator polynomials** — define the feedback connections.

**Used in:** GSM (K=5, R=1/2), UMTS (K=9, R=1/3), LTE (K=7, R=1/3 for control channels).

**Free distance** $d_{\text{free}}$ — the minimum Hamming distance between any two
codewords; determines the asymptotic coding gain. For $K=7$, $R=1/2$ standard code:
$d_{\text{free}} = 10$.

**Viterbi decoding** — maximum-likelihood decoding via dynamic programming over
$2^{K-1}$ states. Complexity $O(2^{K-1})$ per bit; prohibitive for large $K$,
which is why $K$ is typically $\le 9$.

**Coding gain.** For $K=7$, $R=1/2$, at BER $10^{-5}$: ~5 dB coding gain over uncoded QPSK.

### Worked example 2.10 — Rate 1/2, K=3 convolutional code

**Generator polynomials:** $G_1 = 1 + D + D^2$, $G_2 = 1 + D^2$ (in octal: 7 and 5).

**Encoder state:** 2 bits (memory $K-1 = 2$).

**Example encoding.** Input stream: 1 0 1 1 0.

| Time | Input | State | Output | New State |
|:---:|:---:|:---:|:---:|:---:|
| 1 | 1 | 00 | 11 | 10 |
| 2 | 0 | 10 | 10 | 01 |
| 3 | 1 | 01 | 00 | 10 |
| 4 | 1 | 10 | 01 | 11 |
| 5 | 0 | 11 | 01 | 01 |

Encoded stream: **11 10 00 01 01** (10 output bits from 5 input bits, at rate 1/2). ✓

**Trellis representation** — a diagram of states and transitions across time. Viterbi
decoding walks this trellis and keeps the best path to each state.

### 2.8.5 Turbo and LDPC codes

**Turbo codes** (1993, Berrou et al.) — parallel concatenation of two convolutional
codes with an interleaver. **Iterative decoding** between the two constituent
decoders achieves near-Shannon-limit performance.

- **Coding gain:** within **0.5 dB of Shannon limit** at BER 10⁻⁵ (for large blocks).
- **Used in:** UMTS/HSPA (3G), LTE (data channels in 4G — though LDPC replaced them in 5G).

**LDPC (Low-Density Parity-Check) codes** (Gallager, 1960; rediscovered 1996).

- **Sparse parity-check matrix** — decoding uses message passing on a bipartite graph.
- **Coding gain:** within **0.1 dB of Shannon limit** for large blocks.
- **Used in:** 5G NR (data channel), WiFi 6, DVB-S2, 10G Ethernet.

**Why 5G chose LDPC over turbo:**

- Lower error floor (better at high SNR).
- Better decoding throughput in hardware (parallelizable).
- Patent-free implementation more feasible.

| Feature | Convolutional | Turbo | LDPC |
|---|---|---|---|
| Coding gain (BER=10⁻⁵) | ~5 dB | ~8 dB | ~8.5 dB |
| Complexity | Low | High | High |
| Latency | Low | Moderate | High (block-based) |
| Used in | GSM, UMTS control | UMTS/HSPA, LTE | 5G data |

**The takeaway.** Coding gains from **5 dB (convolutional) to 8.5 dB (LDPC)** are
the single biggest reason mobile systems can achieve >5 bps/Hz spectral efficiency
where uncoded QPSK tops out at 2. Without modern FEC, 4G/5G as we know them
would not exist.

---

## 2.9 Source coding

**Source coding** compresses the raw information to a lower bit rate — the input
to the channel coder. It complements error-control coding: source coding removes
**redundancy** in the signal, error-control coding adds **redundancy** to protect
against channel errors.

### 2.9.1 Speech coding

**PCM (Pulse Code Modulation)** — the baseline: sample at 8 kHz, quantize to 8 or
16 bits, encode linearly.

- **G.711:** 8 kHz, 8-bit μ-law/A-law → **64 kbps**. Used in the public switched
  telephone network since the 1970s.
- **Quality:** toll-quality voice.

**Compression ratios from source coding:**

| Codec | Technique | Rate | Quality (MOS) |
|---|---|:---:|:---:|
| **G.711** (PCM) | Waveform | 64 kbps | 4.3 |
| **G.726** (ADPCM) | Adaptive DPCM | 32 kbps | 4.0 |
| **G.729** (CS-ACELP) | Hybrid (LPC + excitation) | 8 kbps | 4.0 |
| **AMR-NB** | ACELP | 4.75–12.2 kbps | 3.5–4.2 |
| **AMR-WB** | ACELP, wideband | 6.6–23.85 kbps | 4.0–4.5 |
| **Opus** | CELP + LPC | 6–510 kbps | 4.5+ |
| **LPC-10** | LPC-only parametric | 2.4 kbps | 2.5 |

**The compression chain.** Raw voice at 64 kbps → 8 kbps (G.729) is **8× compression**.
The 55 kbps saved is the total redundancy in the signal at toll quality — plausible
because the vocal tract has only ~10–20 degrees of freedom and the ear is
insensitive to phase.

**Speech coding in the wireless stack.**

- **GSM:** RPE-LTP at 13 kbps (a form of LPC).
- **UMTS:** AMR-NB variable rate (4.75–12.2 kbps), adapting to channel conditions.
- **VoLTE:** AMR-WB at 12.65 kbps typical — HD voice quality.
- **5G:** EVS (Enhanced Voice Services) at 5.9–128 kbps.

### 2.9.2 Audio coding

For music and high-fidelity audio:

- **MP3:** 128–320 kbps (lossy, perceptual).
- **AAC:** 96–320 kbps (better than MP3 at the same rate).
- **Opus:** 6–510 kbps (used in WebRTC, YouTube).
- **FLAC / ALAC:** lossless, ~50% compression.

Compression relies on **psychoacoustic masking** — parts of the audio signal that
the ear cannot perceive are removed.

### 2.9.3 Image and video coding

- **JPEG:** 10:1 to 50:1 compression typical. DCT-based (ECEG-6423 Chapter 2).
- **JPEG 2000:** ~2× better than JPEG at high ratios. Wavelet-based.
- **H.264 / AVC:** the standard for video since 2003. 1080p at 2–10 Mbps.
- **H.265 / HEVC:** ~40% better than H.264. 4K at 15–25 Mbps.
- **AV1:** royalty-free alternative to HEVC, comparable compression.

For wireless video, 4G/5G use H.264 or HEVC — the compression ratios matter
enormously because the video bit rate dominates the link.

### 2.9.4 The source-channel coding trade-off

**Source coding** removes redundancy; **channel coding** adds structured redundancy.

There is a **joint source-channel coding** theorem (Shannon): no loss in separating
them for point-to-point links. For multiuser or delay-sensitive systems, joint
coding can help — but most practical systems separate them for simplicity.

---

## 2.10 Chapter summary

1. **Analogue modulation** (AM, FM, PM) was the basis of 1G but is obsolete for modern
   systems — no encryption, no error control, no data.
2. **Digital modulation** operates in the IQ plane. Key metrics: **bits per symbol**
   $b$, **symbol rate** $R_s$, **spectral efficiency** (bps/Hz), and **power
   efficiency** ($E_b/N_0$).
3. **BPSK and QPSK** are the workhorses of low-SNR systems. QPSK gives 2× throughput
   at the same BER and $E_b/N_0$.
4. **M-QAM** improves spectral efficiency at the cost of power efficiency — roughly
   **3 dB per bit** for square QAM.
5. **Gray coding** maps bits so adjacent constellation points differ in one bit — reduces
   BER at the same SER by a factor of $b$.
6. **Pulse shaping** (raised cosine with roll-off $\beta$) determines occupied
   bandwidth: $B = (R_s/2)(1+\beta)$. Spectrally efficient pulses trade off
   time-localisation vs. bandwidth.
7. **OFDM** turns a frequency-selective channel into $N$ flat subchannels via
   IFFT/FFT and **cyclic prefix**. It dominates 4G and 5G, at the cost of PAPR.
8. **Multiple access:** FDMA (frequency), TDMA (time), CDMA (code), SDMA (space).
   CDMA gives soft handover and $N=1$ frequency reuse but needs power control.
   Modern systems combine OFDMA (frequency + time) with MIMO (space).
9. **Error-control coding** adds structured redundancy: convolutional (~5 dB gain),
   turbo and LDPC (~8 dB gain) bring practical systems within a dB of Shannon.
   **5G uses LDPC for data and polar codes for control.**
10. **Source coding** removes redundancy: G.711 at 64 kbps for toll quality,
    G.729 at 8 kbps, AMR-WB at ~12 kbps for HD voice. Audio uses MP3/AAC/Opus;
    video uses H.264/HEVC/AV1.
11. **The fundamental trade-off** — power, bandwidth, complexity — is bounded by
    Shannon's capacity $C = B \log_2(1 + \text{SNR})$. Modern systems approach
    this limit via high-order QAM, powerful FEC, and MIMO.

---

## 2.11 Quiz

### A. Multiple choice

1. Compared with BPSK at the same $E_b/N_0$, QPSK gives:
   (a) Half the BER (b) The same BER (c) Twice the BER (d) Cannot be compared

2. For a target BER, doubling the modulation order (e.g., 16-QAM → 64-QAM) typically
   costs:
   (a) 0 dB (b) 3 dB (c) 10 dB (d) 20 dB

3. **Gray coding** ensures that adjacent constellation points:
   (a) Have the same energy (b) Differ by exactly 1 bit
   (c) Are orthogonal (d) Have different power

4. **OFDM** handles frequency-selective fading by:
   (a) Equalization (b) Spreading in code (c) Splitting into flat subchannels
   (d) Using higher power

5. The **cyclic prefix** in OFDM:
   (a) Increases PAPR (b) Reduces PAPR (c) Prevents ISI by absorbing delay spread
   (d) Improves spectral efficiency

6. **CDMA** capacity is limited primarily by:
   (a) Bandwidth (b) Interference (c) Synchronization (d) Antenna count

7. **Processing gain** in CDMA is:
   (a) Chip rate × data rate (b) Chip rate / data rate
   (c) Data rate / chip rate (d) Chip rate + data rate

8. **Soft handover** — a mobile connected to multiple base stations simultaneously —
   is characteristic of:
   (a) FDMA (b) TDMA (c) CDMA (d) SDMA

9. The **(7,4) Hamming code**:
   (a) Corrects up to 3 errors (b) Corrects 1 error
   (c) Detects but doesn't correct (d) Is not a linear code

10. **LDPC** codes in 5G achieve:
    (a) 1 dB gain over uncoded (b) 3 dB gain (c) ~8 dB gain (d) No gain

11. **Source coding** ________ redundancy while **channel coding** ________:
    (a) Adds, removes (b) Removes, adds (c) Removes, removes (d) Adds, adds

12. Shannon capacity for $B = 10$ MHz and SNR = 10 dB is approximately:
    (a) 10 Mbps (b) 34 Mbps (c) 100 Mbps (d) 1 Gbps

### B. Fill in the blank

1. For coherent BPSK at $E_b/N_0 = 8$ dB, the BER is approximately \_\_\_\_ (use $Q(\sqrt{2 \cdot 10^{0.8}})$).
2. The spectral efficiency of QPSK with a raised-cosine roll-off $\beta = 0$ is \_\_\_\_ bps/Hz.
3. The peak-to-average power ratio of an OFDM signal with $N$ subcarriers is up to \_\_\_\_ dB.
4. The LTE subcarrier spacing is \_\_\_\_ kHz.
5. In GSM, the processing gain is achieved by TDMA multiplexing — 8 slots per carrier, resulting in a \_\_\_\_-fold capacity increase per carrier.
6. The Walsh–Hadamard codes used in CDMA are \_\_\_\_ (orthogonal / pseudo-random).
7. In the (7,4) Hamming code, $d_{\min} = $ \_\_\_\_.
8. In convolutional codes, the constraint length $K$ is the memory plus \_\_\_\_.
9. The Viterbi decoder complexity is $O(2^{K-1})$, which limits $K$ to about \_\_\_\_ in practice.
10. **LDPC** codes are used in 5G for \_\_\_\_ (data/control), while **polar codes** are used for \_\_\_\_.

### C. Define / explain

1. Compare **analogue** and **digital** modulation on security, error control, data
   services, and spectral efficiency. Why is analogue obsolete?
2. Represent **BPSK, QPSK, 16-QAM** in the IQ plane. State the number of bits per
   symbol, spectral efficiency (ideal pulse shaping), and approximate BER vs. $E_b/N_0$
   for each.
3. State the **Shannon capacity** formula. Compute the capacity for a 20 MHz channel
   at SNR = 15 dB. How does this compare with LTE Cat-4 (150 Mbps)?
4. Explain **OFDM** as a "frequency-domain" solution to frequency-selective fading.
   Derive the subcarrier spacing $\Delta f = 1/T_u$ from the orthogonality condition.
5. What is the **cyclic prefix** in OFDM? Why is $T_{cp} > \tau_{\max}$ required?
   What is the cost of a CP?
6. Describe the **four multiple-access techniques** (FDMA, TDMA, CDMA, SDMA).
   Compare them in dimension, interference mechanism, handover style, and reuse
   factor.
7. Explain the **near-far problem** in CDMA. Why is power control critical?
8. State the **processing gain** in CDMA. How does it allow operation below the
   noise floor?
9. Describe **convolutional codes** — constraint length, rate, trellis, Viterbi
   decoding. Compute the free distance and coding gain for a standard K=7 code.
10. Compare **turbo** and **LDPC** codes. Which is used in 5G? Why?
11. Compare **speech source coding** (G.711, G.729, AMR-WB). What quality/rate
    trade-offs do they represent?
12. A wireless link operates at SNR = 20 dB with bandwidth 10 MHz. Using Shannon,
    what is the maximum bit rate? If the actual system achieves 30 Mbps, what is
    the Shannon gap?

---

## 2.12 Answer key

??? success "A. Multiple choice"
    1. **(b)** — same BER (per bit).
    2. **(b)** — ~3 dB per doubling (each extra bit/symbol).
    3. **(b)** — differ by exactly 1 bit.
    4. **(c)** — split into flat subchannels.
    5. **(c)** — absorbs delay spread, prevents ISI.
    6. **(b)** — interference-limited (self + co-cell).
    7. **(b)** — chip rate / data rate.
    8. **(c)** — CDMA.
    9. **(b)** — corrects 1 error.
    10. **(c)** — ~8 dB gain.
    11. **(b)** — removes redundancy, adds structured redundancy.
    12. **(b)** — $10^7 \cdot \log_2(11) \approx 3.46 \times 10^7 \approx 34.6$ Mbps.

??? success "B. Fill in the blank"
    1. ~$2 \times 10^{-3}$ (compute: $Q(\sqrt{12.6}) = Q(3.55) \approx 1.9 \times 10^{-4}$; the exact value depends on the target; the "8 dB" case gives ~$1.5 \times 10^{-4}$)
    2. 2
    3. $10\log_{10} N$ (worst case) — ~33 dB for $N = 2048$
    4. 15
    5. 8
    6. Orthogonal
    7. 3
    8. 1 (i.e., $K$ = memory + 1)
    9. 9 (constraint length)
    10. Data; control

??? success "C. Define / explain — model answers"
    1. *Analogue (AM/FM/PM):* continuous modulation, no encryption, no error control,
       voice-only, poor spectral efficiency (30 kHz per 3.4 kHz voice). *Digital
       (BPSK/QPSK/QAM/OFDM):* discrete modulation, encrypted (A5/1, KASUMI), error-controlled
       via FEC, supports voice + data + video, high spectral efficiency (up to 8 bps/Hz
       for 256-QAM). *Why analogue is obsolete:* modern requirements (security, data
       services, capacity) cannot be met by any analogue system. Even analogue voice
       is more efficiently transmitted digitally.
    2. *BPSK:* 2 points at $\pm\sqrt{E_b}$ on I-axis; 1 bit/symbol; spectral efficiency
       1 bps/Hz; $P_b = Q(\sqrt{2E_b/N_0})$. *QPSK:* 4 points at 90° on unit circle;
       2 bits/symbol; spectral efficiency 2 bps/Hz; $P_b = Q(\sqrt{2E_b/N_0})$ (same as BPSK).
       *16-QAM:* 16 points in a 4×4 grid; 4 bits/symbol; spectral efficiency 4 bps/Hz;
       $P_b \approx (3/4)Q(\sqrt{4E_b/(15 N_0)})$ — about 4 dB worse than QPSK at same BER.
    3. *Shannon:* $C = B\log_2(1+\text{SNR})$ bps. For $B=20$ MHz, SNR = 15 dB (linear 31.62):
       $C = 20 \times 10^6 \times \log_2(32.62) \approx 20 \times 10^6 \times 5.03 \approx 100.6$ Mbps.
       LTE Cat-4 at 150 Mbps uses 20 MHz with 2×2 MIMO — the single-stream limit is
       ~100 Mbps (matches Shannon), MIMO doubles it. LTE is essentially at Shannon.
    4. *OFDM as frequency-domain solution:* a wide channel with $\tau_{\text{rms}}$ has
       coherence bandwidth $B_c \sim 1/(5\tau_{\text{rms}})$. If $B \gg B_c$, the channel
       is frequency-selective. OFDM splits $B$ into $N$ subcarriers of width $\Delta f = B/N$.
       Choosing $N$ large enough that $\Delta f \ll B_c$ makes each subcarrier flat. *Derivation
       of $\Delta f = 1/T_u$:* subcarrier $k$ is $e^{j2\pi k\Delta f t}$; orthogonality requires
       $\int_0^{T_u} e^{j2\pi(k-l)\Delta f t} dt = T_u \delta_{kl}$, which holds iff $\Delta f \cdot T_u = 1$.
    5. *Cyclic prefix:* copy the last $T_{cp}$ seconds of the useful symbol to the front.
       $T_{cp} > \tau_{\max}$ means the delay-spread tail of the previous symbol fits
       entirely within the CP — the receiver discards the CP, leaving only the useful
       symbol, with zero ISI. *Cost:* CP is redundant, so spectral efficiency is reduced
       by $\eta_{CP} = T_u/(T_u + T_{cp})$; for LTE normal CP (~4.7 μs of 71.4 μs), ~7%.
    6. *FDMA:* frequency slice per user; co-channel interference; hard handover; reuse
       factor $N>1$. *TDMA:* time slot per user; co-channel interference; hard handover;
       $N>1$; requires synchronization. *CDMA:* spreading code per user; multiple-access
       interference + co-cell; **soft handover**; reuse factor $N=1$. *SDMA:* spatial
       separation via sectorization or beamforming; spatial + co-channel interference;
       hard handover (usually); $N=1$ with sectoring.
    7. *Near-far:* in CDMA, all users share one frequency. The base station receives
       all simultaneously; a strong user near the BS creates large interference for a
       distant user, whose signal is buried. Without power control, the near user
       dominates. *Why power control is critical:* all users must arrive at the BS with
       approximately equal power for the orthogonality of their codes to be effective.
       UMTS uses fast closed-loop power control (1500 Hz updates) to achieve this.
    8. *Processing gain:* $G = R_c / R_s = W/R$, the ratio of chip rate (spreading bandwidth)
       to data rate. *Below noise floor:* the data signal is spread over $W$ Hz, so its
       PSD is $E_b/W$. When $E_b/N_0 < 1$ (0 dB), the signal power is below the noise
       PSD — invisible to a non-code receiver. The receiver correlates with the correct
       code, coherently integrating over $T = 1/R_s$, giving SNR gain of $G$ (10 log G dB).
       So even below-noise signals are recoverable.
    9. *Convolutional codes:* rate $1/n$, constraint length $K$ — the output at each
       step depends on the current bit and the previous $K-1$. *Trellis:* states are
       the last $K-1$ bits (2^{K-1} states); transitions determined by input bit.
       *Viterbi decoding:* dynamic programming over the trellis, keeping the best path
       to each state; complexity $O(2^{K-1})$ per bit. *Free distance:* minimum Hamming
       distance between any two codeword paths; for K=7, R=1/2, $d_{\text{free}} = 10$
       — gives ~5 dB coding gain at BER 10⁻⁵.
    10. *Turbo:* parallel concatenation of two convolutional encoders with an
        interleaver; iterative decoding between the two decoders; near-Shannon (~0.5 dB
        gap) but high latency. Used in UMTS/HSPA, LTE. *LDPC:* sparse parity-check
        matrix; message-passing decoding on bipartite graph; near-Shannon (~0.1 dB gap),
        better error floor, higher throughput in hardware. *5G choice:* **LDPC for data**,
        **polar codes for control**. LDPC chosen for its combination of excellent
        performance, parallelisability, and hardware efficiency at the very high
        throughputs 5G requires.
    11. *G.711:* 64 kbps, μ-law companding, no compression (just quantization) — toll
        quality, the PSTN standard since 1972. *G.729:* 8 kbps, CS-ACELP (analysis-by-synthesis
        LPC) — 8:1 compression, toll-quality, used in VoIP and early 3G. *AMR-WB:* 6.6–23.85
        kbps, ACELP with wideband (16 kHz) sampling — HD voice quality, used in VoLTE,
        4G, 5G. The trade-off is rate vs. quality; each step doubles or quadruples the
        codec complexity but halves the bit rate.
    12. *Shannon:* $C = 10^7 \cdot \log_2(101) \approx 66.6$ Mbps. Achieved rate 30 Mbps
        is 45% of Shannon — a **Shannon gap of ~3.5 dB** in SNR terms (need to halve
        the SNR to hit 30 Mbps with ideal coding). Typical 4G/5G systems achieve 60–80%
        of Shannon capacity in real deployments.

---

## Further reading

- **J. G. Proakis & M. Salehi**, *Digital Communications*, 5th ed., McGraw-Hill, 2007 — the classical reference; Chapters 3–5 (digital modulation, detection), 8 (fading channels), 7 (channel coding).
- **A. Goldsmith**, *Wireless Communications*, Cambridge, 2005 — the best single-volume treatment; Chapters 5–6 (modulation, capacity), 8 (fading), 4 (multiple access).
- **T. S. Rappaport**, *Wireless Communications: Principles and Practice*, 2nd ed., Prentice Hall, 2002 — Chapters 4–6 (modulation, equalization), 9 (multiple access).
- **D. Tse & P. Viswanath**, *Fundamentals of Wireless Communication*, Cambridge, 2005 — the information-theoretic view; Chapters 2 (channel), 4 (capacity), 5 (multiple access).
- **S. Lin & D. J. Costello**, *Error Control Coding*, 2nd ed., Prentice Hall, 2004 — the standard ECC textbook.
- **T. Richardson & R. Urbanke**, *Modern Coding Theory*, Cambridge, 2008 — the LDPC/turbo reference.
- **H. Schulze & C. Lüders**, *Theory and Applications of OFDM and CDMA*, Wiley, 2005 — the OFDM/CDMA comparison reference.
- **R. Prasad**, *OFDM for Wireless Communications Systems*, Artech House, 2004.
- **H. Holma & A. Toskala**, *WCDMA for UMTS* and *LTE for UMTS*, Wiley — for CDMA and OFDMA in real systems.
- **3GPP TS 38.211** — 5G NR physical channels and modulation (the definitive reference for 5G PHY).
- **3GPP TS 36.211** — LTE physical channels and modulation.
- **3GPP TS 25.211** — UMTS physical channels and modulation.

---

## Suggested tutorial problems

1. **BPSK BER.** Compute the BER for coherent BPSK at $E_b/N_0 = 0, 4, 8, 12$ dB. Plot the curve and mark the point where BER = 10⁻⁵.

2. **QPSK vs. 16-QAM.** For a target BER of 10⁻⁴, find the required $E_b/N_0$ for QPSK and 16-QAM (use the approximate formula). How much more power does 16-QAM need? How much more data does it deliver?

3. **Gray coding.** Draw the 16-QAM Gray-coded constellation. Verify that every adjacent pair differs by 1 bit. Then draw the natural (binary) constellation. Compare BER at the same SER — how much benefit does Gray coding provide?

4. **OFDM parameters.** Design an OFDM system with $B = 20$ MHz, target spectral efficiency 5 bps/Hz (with 64-QAM). Compute subcarrier spacing, FFT size, useful symbol duration, CP length (assuming $\tau_{\text{rms}} = 500$ ns), and CP overhead.

5. **Raised cosine.** Plot the raised-cosine pulse for $\beta \in \{0, 0.22, 0.5, 1\}$. Compute the bandwidth for each with $R_s = 1$ Msym/s. What is the BER degradation for $\beta = 0$ (sinc pulse) vs. $\beta = 0.22$ in a real system with timing error?

6. **Link budget.** A 5G NR link operates with 23 dBm transmit power, 15 dBi base station antenna, 0 dBi mobile antenna, −100 dBm receiver sensitivity. Carrier 3.5 GHz, bandwidth 100 MHz, path-loss exponent 3.5 beyond 200 m. Compute the range. Then repeat for 28 GHz (path loss exponent 3.5, but higher FSPL).

7. **CDMA capacity.** For UMTS, compute the single-cell pole capacity for voice at $E_b/N_0 = 5$ dB and for data at $E_b/N_0 = 2$ dB. Compare with the realistic capacity (50% of pole).

8. **Hamming code.** Build the (7,4) Hamming code generator matrix in systematic form. Encode the message 1101. Introduce a single error at position 3. Decode and correct.

9. **Convolutional code.** Build the trellis for a rate-1/2, K=3 convolutional code with generators $G_1 = 111$, $G_2 = 101$ (in binary). Encode the sequence 1011. Decode with Viterbi, assuming the received sequence has one error.

10. **Source-channel joint.** A voice channel at 8 kHz sampling. Raw PCM at 16 bits → 128 kbps. After G.729 source coding → 8 kbps. Add rate-1/2 FEC → 16 kbps on the air. What is the "end-to-end" redundancy added by source + channel coding? What is the trade-off vs. using G.711 (64 kbps) directly with no FEC?

11. **Shannon for 5G.** A 5G NR system uses 100 MHz at 3.5 GHz, 4×4 MIMO, 256-QAM, rate-3/4 LDPC. Compute the theoretical Shannon capacity at SNR = 15 dB. Then compute the actual throughput (256-QAM × rate × MIMO × bandwidth with CP overhead). What is the Shannon gap?

12. **Modulation and coding trade-off.** For a fixed target throughput of 50 Mbps in 20 MHz, compare three options: QPSK with rate-1/3 convolutional code, 16-QAM with rate-1/2 turbo code, and 64-QAM with rate-3/4 LDPC code. Compute the required SNR for each. Which is the most power-efficient? Which is the most robust to channel errors?