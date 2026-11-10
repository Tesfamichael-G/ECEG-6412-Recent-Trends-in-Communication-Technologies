# Chapter 7 — Machine Learning for Communications Emerging Technologies Initiative

!!! abstract "Chapter at a glance"
    **Contact hours:** 3 lecture · **Home study:** 7 h · **Part IV — Emerging technologies**
    
    **Coverage (syllabus):** the ETI (Emerging Technology Initiative) mission ·
    machine learning for the physical (PHY) and medium-access-control (MAC) layers ·
    applications across wireless, optical, satellite, and molecular communication.

---

## Learning outcomes

By the end of this chapter you should be able to:

1. State the **ETI mission** and the reason ML is being applied to communication
   systems — what conventional methods cannot do.
2. Describe the **three ML paradigms** (supervised, unsupervised, reinforcement)
   and match each to a communication problem.
3. Explain **ML for the PHY layer** — channel estimation, decoding, end-to-end
   autoencoder, channel modeling — and evaluate where ML beats classical DSP.
4. Explain **ML for the MAC layer** — scheduling, dynamic spectrum access, beam
   management — and where conventional algorithms remain superior.
5. Describe **federated learning** and its role in privacy-preserving distributed
   learning across mobile devices.
6. Identify the **practical challenges** — data quality, training cost, latency,
   interpretability, generalization, and standardization.
7. Summarise the **5G-Advanced / 6G AI-native** efforts in 3GPP, ITU, and industry
   (Release 18 NR_AI, O-RAN, AI-native air interface).
8. Implement a **small ML for communications experiment** in Python — channel
   estimation with a neural network — and compare with classical methods.

---

## 7.1 Why ML for communications?

### 7.1.1 The ETI mission

The **Machine Learning for Communications Emerging Technology Initiative** (ETI)
was launched by **IEEE ComSoc** in 2019 to foster research and innovation around
ML applications at the **physical (PHY)** and **medium-access-control (MAC)**
layers — across wireless, optical, satellite, and molecular communication systems.

**The ETI's premise:** classical communication theory has reached its practical
limits in many areas, and ML can solve problems that are:

- **Too complex** for closed-form optimization (e.g., non-linear precoding,
  massive MIMO with hardware impairments).
- **Too data-dependent** for analytic models (e.g., channel models with
  site-specific geometry, mmWave beam patterns).
- **Too slow** for traditional algorithms under real-time constraints (e.g.,
  MIMO detection in massive MIMO).

### 7.1.2 What the classical tools do

Classical communication systems are designed from **mathematical models**:

- **Channel model** — Ray-tracing, statistical models (Rayleigh, Rician),
  3GPP TR 38.901.
- **Receiver** — Matched filter, zero-forcing, MMSE, ML detection, Viterbi.
- **Scheduling** — Proportional fair, round-robin, max-throughput.
- **Estimation** — MMSE, Kalman filter, least squares.
- **Coding** — Turbo, LDPC, polar.

Each is **derived from first principles** and has **provable guarantees**. So why
replace them with neural networks?

### 7.1.3 Where ML shines

Three properties of ML make it attractive:

**1. Non-linear function approximation.** A neural network can approximate any
continuous function to arbitrary accuracy (universal approximation theorem). Many
communication problems (channel estimation, detection, precoding) are non-linear
and don't have closed-form optimal solutions — ML learns the function from data.

**2. End-to-end optimization.** Traditional systems are designed in **independent
blocks** (channel estimation → equalization → demodulation → decoding). Each
block optimizes its own local metric. ML lets you **jointly optimize the whole
chain** for the end-to-end objective (BER, throughput, latency) — potentially
outperforming modular architectures.

**3. Data-driven modeling.** When the environment is too complex for analytic
modeling (site-specific mmWave channels, molecular propagation, non-linear
hardware), ML learns from measured data.

### 7.1.4 Where ML doesn't shine

ML is **not a replacement for classical methods** — it's an additional tool. ML
loses to classical methods when:

- **The classical solution is optimal** (matched filter, Viterbi decoder on
  memoryless channels, LDPC decoder).
- **Data is scarce** (rural deployment, new bands, new standards).
- **Interpretability and certification are required** (safety-critical —
  automotive, medical, aviation).
- **Model generalization matters** (ML trained on one channel model may fail on
  another).
- **Real-time latency is critical** (5G URLLC at 1 ms).

The best systems **combine** ML and classical DSP — using ML to handle the
complex, environment-specific parts, and classical algorithms for the parts with
optimal solutions.

---

## 7.2 ML fundamentals

### 7.2.1 The three paradigms

| Paradigm | Data | Use in communications |
|---|---|---|
| **Supervised learning** | (input, label) pairs | Channel estimation, decoding, detection, modulation classification |
| **Unsupervised learning** | input only | Anomaly detection, spectrum sensing, channel clustering |
| **Reinforcement learning** | reward signal from environment | Scheduling, dynamic spectrum access, beam management |

**Supervised learning** is the workhorse of the ETI. The task is: given a
training set $\{(x_i, y_i)\}$, learn a function $f_\theta$ that maps inputs $x$
to labels $y$. The parameters $\theta$ are optimized to minimize a loss function:

$$
\boxed{\;\theta^* = \arg\min_\theta \frac{1}{N}\sum_{i=1}^N \mathcal L(f_\theta(x_i), y_i)\;}
$$

**Reinforcement learning (RL)** is used when the system interacts with an
environment and only receives a **reward signal** — no explicit labels. The agent
learns a policy $\pi(a \mid s)$ that maximizes expected cumulative reward:

$$
\boxed{\;\pi^* = \arg\max_\pi \mathbb E\!\left[\sum_{t=0}^\infty \gamma^t r_t\right]\;}
$$

where $\gamma \in [0,1)$ is the discount factor.

### 7.2.2 Deep learning for signals

**Convolutional neural networks (CNNs)** — the dominant architecture for PHY
applications. A 1-D CNN over a signal treats the time or frequency axis as a
1-D "image", with:
- **Convolutional layers** — learn local patterns (like filters).
- **Pooling layers** — reduce dimensionality.
- **Fully connected layers** — final classification/regression.

**Recurrent neural networks (RNNs) and LSTMs** — for sequential data (channel
estimation over time, scheduling decisions).

**Transformers** — attention-based; increasingly used for channel estimation,
decoding, and end-to-end systems.

**Autoencoders** — for unsupervised and self-supervised tasks, and for
**end-to-end learning of communication systems** (see §7.3.4).

### 7.2.3 Data for communications

Unlike vision or language, communications ML has a **data problem**:

**Where does training data come from?**

| Source | Pros | Cons |
|---|---|---|
| **Simulation** (e.g., MATLAB 5G Toolbox, NVIDIA Sionna) | Unlimited, controllable | Model-reality gap |
| **Measurement** (real channel sounding) | Realistic | Expensive, limited, site-specific |
| **Synthetic augmentation** | Cheap | Doesn't cover all real cases |
| **Field data** (from live networks) | Truly representative | Privacy, collection cost, rare events |

**The model-reality gap** is a fundamental issue: an ML model trained on 3GPP
TR 38.901 synthetic channels may not generalize to real measured channels. Real
deployments must use **transfer learning**, **domain adaptation**, or **online
learning**.

### Worked example 7.1 — estimating model complexity

**Scenario:** A CNN for channel estimation at the receiver has 100,000 parameters.
Each parameter stored as 32-bit float. The receiver has 16 MB of RAM for ML
inference. Can it fit?

**Parameter size:** $10^5 \times 4$ bytes = **400 KB** — fits easily.

**Inference cost:** A typical CNN with 100k parameters requires ~1 million
multiply-accumulate (MAC) operations per inference. At 1 GHz (mobile CPU), that's
~1 ms per inference — matches 1 ms LTE subframe, barely.

**Quantization:** Storing as int8 (1 byte) reduces to 100 KB. **Int8 inference**
on mobile NPUs achieves 10–100× speedup → ~10–100 μs per inference — well within
the latency budget.

**Reality check:** Modern ML-based receivers (e.g., for 5G NR channel estimation)
use **tiny models** (10k–100k parameters), often int8-quantized, running on
DSP/NPU hardware. **Large transformer models are impractical at the PHY** — they
work in simulation papers but don't deploy at scale.

---

## 7.3 ML for the physical layer

### 7.3.1 Channel estimation

**The classical problem.** Given received reference signals $y_p$ and known
transmitted pilots $x_p$, estimate the channel $h$ such that $y = h\, x + n$.

**Classical methods:**

- **Least squares (LS):** $\hat h = y_p / x_p$ — noisy at low SNR.
- **MMSE:** exploits channel statistics; optimal but needs the channel covariance.
- **Compressed sensing:** exploits sparsity in the delay-Doppler domain.

**ML approach:** learn a neural network that maps received pilots + context to
channel estimate.

**Why ML might help:**

- Channel has **structure** (sparsity in delay-Doppler, correlation across
  antennas, correlation across time).
- Classical MMSE requires knowing the **covariance** — which must be estimated,
  and is wrong in new environments.
- ML **learns** the channel structure from data, generalizes across variations.

**Typical architecture:** a **2-D CNN** that takes the pilot signal (in time-frequency)
as input and outputs the channel estimate at each RE.

**But:** the **classical MMSE** with **known** channel covariance is close to optimal.
ML's advantage is real when the covariance is **unknown** or the channel is
**non-stationary**.

### Worked example 7.2 — ML vs. MMSE channel estimation

**Scenario:** LTE downlink, EPA channel (Extended Pedestrian A), SNR = 10 dB,
pilot spacing 4 subcarriers.

| Method | NMSE (dB) | Notes |
|---|:---:|---|
| LS | -8 | Baseline — no statistics |
| MMSE (known covariance) | -14 | Optimal, but needs covariance |
| ML (trained on matched channel) | **-13** | Nearly optimal, no covariance needed |
| ML (trained on mismatched channel) | -10 | Degrades under model mismatch |

**Interpretation.** When the ML model is trained on the **same channel** it's
evaluated on, it nearly matches MMSE **without needing the covariance**. But
when evaluated on a **different** channel (mismatch), it degrades to -10 dB —
between LS and MMSE.

**This is the fundamental trade-off of ML channel estimation:** the ML model
**implicitly encodes** the channel statistics from training, so it works well
**if** the deployment channel matches the training channel. For heterogeneous
deployments (mixed indoor/outdoor, varying geometry), the benefit shrinks.

**Where ML wins in practice:** when channel statistics are **hard to estimate**
short-observation windows, non-stationary channels, massive MIMO with many
antennas to estimate.

### 7.3.2 Channel decoding

**The classical problem.** Given a received noisy codeword, recover the original
information bits.

**Classical decoders:**

- **Viterbi** (convolutional codes) — ML over the trellis.
- **BCJR** (turbo codes) — forward-backward over the trellis.
- **Belief propagation** (LDPC) — message passing over the Tanner graph.
- **SCL** (polar codes) — successive cancellation list.

These decoders are **near-optimal** for their codes (within 0.1–0.5 dB of
Shannon).

**ML approach:** learn a neural decoder that maps noisy codewords to information
bits.

**Why ML might help:**

- **Lower latency** — a single feed-forward pass may decode in **less time** than
  iterative decoding (multiple iterations).
- **Improved finite-length performance** — ML can learn to exploit structure in
  short codes.
- **Joint decoding** across multi-user / multi-antenna.

**Typical architecture:** a **recurrent neural network** or **transformer** that
iterates over the received codeword, learning the decoding map.

**But:** LDPC/turbo codes already achieve **within 0.5 dB of Shannon**, and ML
decoders have not consistently beaten them at practical block lengths. **The
biggest real-world opportunity is latency** — deep learning decoders can be
unrolled for lower-latency decoding.

### Worked example 7.3 — neural LDPC decoder latency

**Scenario:** 5G NR LDPC code, rate 3/4, block length 8448 bits. Target
throughput 1 Gbps.

| Decoder | Latency (μs) | Energy (pJ/bit) | BER at Eb/N0=2 dB |
|---|:---:|:---:|:---:|
| Classical belief propagation (15 iter) | 4.2 | 120 | 1.2e-6 |
| Neural LDPC (unrolled 5 iter) | **1.1** | 200 | 1.5e-6 |
| Neural LDPC (unrolled 20 iter) | 4.3 | 800 | 1.1e-6 |

**Interpretation.** The neural LDPC decoder with **5 unrolled iterations** achieves
similar BER at **4× lower latency**, at the cost of slightly higher energy.
Higher iteration counts (20) match classical BER but lose the latency advantage.

**The trade-off:** ML decoders win on latency, lose on energy, and depend on the
code structure being **known at training time**. For fixed 5G LDPC codes, the ML
approach can be deployed; for arbitrary codes, retraining is required.

### 7.3.3 End-to-end learning — the autoencoder

**The most radical idea** in ML for communications: replace the entire PHY
(transmitter + channel + receiver) with an **autoencoder** trained end-to-end.

**The O'Shea–Hoydis formulation (2017):**

- **Encoder** (transmitter): maps information bits $s$ to channel symbols $x$.
- **Channel** (differentiable): a stochastic layer modeling $y = h x + n$ or a
  more complex channel.
- **Decoder** (receiver): maps $y$ back to the information bits $\hat s$.

$$
\boxed{\;\text{bits} \to \text{Encoder}_\theta(x \mid s) \to \text{Channel}(y \mid x) \to \text{Decoder}_\phi(\hat s \mid y)\;}
$$

Train the encoder and decoder **jointly** to minimize the loss (e.g., cross-entropy
of bit errors).

**Why this is interesting:**

- **Joint optimization** of transmitter and receiver — no more separate design.
- **Adapts to any channel** — including non-linear (PA distortion), hardware
  impairments, unconventional channel models.
- **Discovers new modulation schemes** — the network learns a constellation
  optimized for the channel, which may not match BPSK/QPSK/QAM.

**What it discovers:**

- **AWGN channel:** learns QPSK (matches classical optimal).
- **Non-linear channel:** learns a constellation **unlike** QAM — a denser,
  irregular pattern optimized for the non-linear distortion.
- **Multi-user channel:** learns **joint precoding** patterns.

**The critical requirement:** the channel must be **differentiable** for
backpropagation. This is achievable when:

- The channel is additive Gaussian (the noise can be modeled as a stochastic layer).
- The channel is a known differentiable function of the input.

When the channel includes **non-differentiable** elements (hard decisions, random
fading with unmodeled distribution), **reinforcement learning** or **perturbation
methods** are needed.

### Worked example 7.4 — autoencoder for AWGN

**Scenario:** 2 bits per symbol, AWGN channel. Autoencoder with:

- Encoder: 4-layer fully-connected network, output = 2 real values per symbol.
- Channel: $y = x + n$, $n \sim \mathcal N(0, \sigma^2)$.
- Decoder: 4-layer network, output = 2 bits (soft decisions).
- Loss: cross-entropy between true bits and predicted bits.

**Result after training:**

- The learned constellation has **4 points**, roughly in a **square** (QPSK-like).
- BER vs. SNR **matches** the theoretical QPSK curve within 0.1 dB.
- The network **learned QPSK** as the optimal 2-bit modulation for AWGN.

**What it teaches us:** for the **AWGN channel**, ML discovers the classical
optimal solution. The value of the autoencoder approach is for channels where
the classical optimal is **unknown** (non-linear, hardware impaired, molecular).

### Worked example 7.5 — autoencoder for non-linear channel

**Scenario:** 4 bits per symbol, channel with **non-linear** PA (input back-off
= 4 dB), AWGN.

**Classical 16-QAM:** BER at Eb/N0 = 10 dB ≈ 10⁻².
**Autoencoder:** BER at Eb/N0 = 10 dB ≈ **3×10⁻³**.

**Why:** the autoencoder learns a constellation that **compensates for the PA
non-linearity** — spreading the points so that the distorted constellation is
still separable at the receiver.

**This is where ML genuinely beats classical** — the classical constellation
was optimized for AWGN, not for the non-linear PA. The ML approach optimizes
for the **actual** channel.

### 7.3.4 Channel modeling

**The classical problem.** Channel models are used to design receivers and to
evaluate system performance. The **3GPP TR 38.901** model is standard, but it's:

- **Geometric and site-specific** — trained on measurement campaigns, not on
  arbitrary scenarios.
- **Slow to simulate** — ray tracing requires computation of many propagation
  paths.
- **Not easily adaptable** — hard to extend to new bands, new geometries.

**ML approach:** learn a **generative model** of the channel that can **sample**
realizations from the same distribution as the real channel.

**Techniques:**

- **Variational autoencoders (VAEs)** — learn a latent representation of the
  channel and sample from it.
- **Generative adversarial networks (GANs)** — learn the distribution by pitting
  a generator against a discriminator.
- **Diffusion models** — emerging, similar to the ones behind DALL-E and Stable
  Diffusion — sample channels by progressively denoising random noise.

**Use:** generate synthetic training data for receiver ML models; generate
channels for coverage planning; augment measured data for rare scenarios.

**5G-Advanced / 3GPP:** **Release 18** includes channel models based on **generative
AI** for specific scenarios (e.g., high-speed train, industrial).

### 7.3.5 What ML can and can't do at the PHY

| PHY component | Classical status | ML opportunity |
|---|---|---|
| **Channel estimation** | MMSE near-optimal (with statistics) | Yes — unknown statistics, non-stationary, massive MIMO |
| **Decoding** | Near-Shannon already | Limited — mostly for latency |
| **Detection** | ML/MMSE (MIMO) | Yes for **massive MIMO** (K-best, sphere decoding exceed complexity limits) |
| **Equalization** | Viterbi, MMSE | Yes for **non-linear** channels |
| **Beam management** | Codebook, exhaustive search | Yes — beam prediction, reduced overhead |
| **Modulation** | Fixed (QAM, PSK) | Yes for **non-linear** channels, hardware impaired |
| **Channel coding** | Near-Shannon | Little |
| **Channel modeling** | Analytic (3GPP) | Yes — generative AI |

**The summary:** ML adds value where **classical methods hit complexity or
modeling limits** — channel estimation with unknown statistics, massive MIMO
detection, non-linear PA compensation, channel modeling. It does **not** replace
optimal classical components (matched filter, LDPC decoder, Viterbi on simple
channels).

---

## 7.4 ML for the MAC layer

The MAC layer is where **scheduling, resource allocation, and spectrum sharing**
happen — inherently **decision-making** problems where RL and optimization-based
ML have natural fits.

### 7.4.1 Scheduling

**The classical problem.** Given a set of UEs, each with a channel quality $h_i(t)$
and a queue $q_i(t)$, decide which UE to serve at each time slot $t$ to maximize
some utility (throughput, fairness, latency).

**Classical algorithms:**

- **Round-robin** — serves UEs in order; fair but ignores channel.
- **Max-throughput** — serves the UE with best channel; maximizes throughput but
  unfair.
- **Proportional fair** — serves UE with max $h_i(t)/\bar h_i$ (channel over
  average); balances throughput and fairness.

**ML approach:** **reinforcement learning** to learn a scheduling policy.

**Setup:**

- **State:** channel qualities $\{h_i(t)\}$, queue lengths $\{q_i(t)\}$, delays.
- **Action:** which UE to serve.
- **Reward:** throughput (or weighted sum of throughput and fairness).
- **Agent:** the scheduler (at the eNodeB or gNB).
- **Algorithm:** DQN, PPO, or actor-critic.

**Advantage over classical:**

- **Handles multiple objectives** — throughput, fairness, latency, energy —
  that classical algorithms struggle to balance.
- **Adapts to traffic patterns** — learns from data, doesn't need a static policy.
- **Non-stationary** — adapts to changing network conditions.

**Challenges:**

- **Real-time inference** — decisions must be made every TTI (1 ms in LTE, 0.5 ms
  in 5G). RL inference can be fast (small networks), but training takes time.
- **Safety** — a bad policy can degrade throughput or starve UEs.
- **Reward design** — choosing the right reward function is non-trivial (see
  §7.6).

### Worked example 7.6 — RL scheduler vs. proportional fair

**Scenario:** LTE eNodeB with 10 UEs, Rayleigh fading, traffic = full buffer
(saturated). Reward = sum throughput, discounted $\gamma = 0.9$.

**Training:** 1 million TTI steps × 10 UEs — 10⁷ decisions.

| Scheduler | Cell throughput | Jain's fairness index |
|---|:---:|:---:|
| Round-robin | 22 Mbps | **0.98** |
| Proportional fair | **26 Mbps** | 0.85 |
| RL (learned) | **27 Mbps** | 0.82 |

**Interpretation.** RL achieves **slightly higher throughput** than proportional
fair (27 vs. 26 Mbps), at slightly lower fairness. Not a dramatic win — because
proportional fair is already near-optimal for this simple scenario.

**Where RL wins more:** when there are multiple objectives (throughput + delay),
when channel model is non-standard, or when traffic is bursty.

### 7.4.2 Dynamic spectrum access

**The problem.** Spectrum is allocated statically (licensed bands). Many licensed
bands are underutilized (measured 15–85% idle). **Cognitive radio** lets
unlicensed users access the spectrum **when the licensed user is absent**.

**Classical approach:** **energy detection** — measure energy in a band; if above
threshold, consider it occupied. Fails under noise uncertainty, low SNR.

**ML approach:** **supervised classification** of spectrum occupancy from received
samples.

**Setup:**

- **Input:** $N$ IQ samples of a band.
- **Output:** classification — primary user present / absent; modulation type;
  signal type.
- **Network:** 1-D CNN over IQ samples.

**Challenges:**

- **Sensing time** — must be fast enough (milliseconds) to detect primary users.
- **Model generalization** — must work for unseen modulation types, unseen
  channels.

**Deployment:** **CBRS** (Citizens Broadband Radio Service) in the US uses
**SAS** (Spectrum Access System) — a centralized database, not ML yet. But
**incumbent detection** is a candidate for ML.

### 7.4.3 Beam management in mmWave

**The problem.** mmWave (28 GHz+) requires **beamforming** — the transmitter and
receiver must align their beams. In a mobile environment, the beam must be
continuously re-pointed. **Exhaustive beam search** (sweeping all beam pairs) is
slow — a 64×64 codebook requires 4,096 measurements.

**ML approach:** **beam prediction** — predict the best beam from **partial**
measurements or from **side information** (GPS, camera, previous beams).

**Setup:**

- **Input:** received signal from a few "probe" beams, plus context (position,
  time of day, historic data).
- **Output:** predicted best beam, or predicted channel quality for all beams.
- **Network:** CNN or LSTM.

**Advantage:**

- **Faster beam alignment** — 8× fewer measurements than exhaustive search.
- **Proactive** — can predict the next beam before the current one fails.

**5G-Advanced Release 18** includes **AI/ML for beam management** as a
standardization study — the first 3GPP ML feature in the air interface.

### Worked example 7.7 — beam prediction accuracy

**Scenario:** 64-beam mmWave codebook. Exhaustive search requires 64 beam
measurements. ML approach uses 8 probe beams + context.

| Method | Measurements | Best-beam accuracy | Latency |
|---|:---:|:---:|:---:|
| Exhaustive search | 64 | 100% (by definition) | 64 ms |
| Classical hierarchical | 20 | 85% | 20 ms |
| ML (CNN) | **8** | **92%** | **8 ms** |

**Interpretation.** ML reduces measurement from 64 to 8 — an **8× speedup** — at
**92% accuracy**. The 8% of cases where ML picks the second-best beam still work
(only ~3 dB less SNR), so the effective reliability is ~99.5%.

**This is genuinely useful** — 8 ms beam alignment is compatible with high-mobility
users (vehicular). 64 ms is not.

---

## 7.5 Federated learning

### 7.5.1 The privacy problem

Classical ML trains on **centralized data**: all training data is collected at
one server. In communications, this is problematic:

- **User privacy** — channel data, location data, usage data is sensitive.
- **Data volume** — collecting all data from all devices is expensive.
- **Regulations** — GDPR, CCPA restrict moving personal data.

### 7.5.2 Federated learning basics

**Federated learning (FL)** trains a model **without centralizing the data**:

1. **Initialize** a global model at the server.
2. **Broadcast** the model to $N$ participating devices.
3. **Train locally** on each device's data (a few epochs).
4. **Send** the model **updates** (gradients or weights) to the server — **not**
   the raw data.
5. **Aggregate** at the server — typically weighted average (**FedAvg**):

$$
\boxed{\;w_{t+1} = \sum_{k=1}^N \frac{n_k}{n}\, w_{t+1}^{(k)}\;}
$$

where $w_{t+1}^{(k)}$ is the model after local training on device $k$, $n_k$ is
the number of samples on device $k$, and $n = \sum n_k$.

6. **Repeat** from step 2.

**Why this is privacy-preserving:** only **model updates** leave the device,
not the raw data. Model updates contain far less information about individual
samples than the raw data. **Differential privacy** can be added to formalize
the guarantee.

### 7.5.3 FL in communications

**Applications:**

- **Beam prediction** at mobile devices — learned per-user from local mobility
  patterns, aggregated across users.
- **Channel estimation** across a deployment — models trained at UEs, aggregated
  at the gNB.
- **Anomaly detection** in IoT — distributed detection of rogue devices.
- **Spectrum sensing** — collaborative sensing without sharing raw IQ samples.

**Challenges:**

- **Communication cost** — model updates can be large (MBs for deep networks);
  sending every iteration is expensive over wireless.
- **Heterogeneous data** — different UEs see different channels, so local models
  diverge. FL must handle non-IID data.
- **Straggler problem** — some devices are slow, offline, or have limited power.
- **Security** — malicious devices can poison the model with corrupted updates.

**Recent advances:**

- **Compression** — send only the **top-k** or **quantized** model updates.
- **Asynchronous FL** — don't wait for all devices; aggregate as updates arrive.
- **Secure aggregation** — cryptographically combine updates so the server sees
  only the sum, not individual updates.

### Worked example 7.8 — FL vs. centralized channel estimation

**Scenario:** 100 UEs in a cell. Channel from a 3GPP TR 38.901 model.
Classical ML: centralize all 100 UEs' data (10 GB) and train one model.
Federated: each UE trains locally on 100 MB of data.

| Metric | Centralized | Federated |
|---|:---:|:---:|
| Data transferred to server | **10 GB** | **50 MB** (100 × 0.5 MB model updates) |
| Training time (wall clock) | 2 hours | 8 hours (many rounds) |
| Model accuracy (NMSE) | -18 dB | -17.5 dB |
| Privacy | ❌ (raw data on server) | ✅ (only model updates) |

**Interpretation.** FL uses **200× less bandwidth** at the cost of **0.5 dB**
accuracy and **4× more wall-clock time**. **Privacy is the win** — for many
applications, 0.5 dB accuracy loss is acceptable for avoiding data centralization.

---

## 7.6 Practical challenges and open problems

### 7.6.1 Data

- **Scarcity** — real channel measurements are expensive; simulation is unrealistic.
- **Quality** — labels (e.g., "true channel") require reference signals, which are
  noisy.
- **Distribution shift** — training distribution differs from deployment
  distribution (new band, new geometry, seasonal changes).

### 7.6.2 Generalization

A model trained on one channel/band/geometry may **fail** on another. This is
fundamentally different from vision or NLP, where the distribution is relatively
stationary. Solutions:

- **Domain adaptation** — fine-tune on target domain.
- **Meta-learning** — learn a model that adapts quickly.
- **Online learning** — continuously update from field data.
- **Robust training** — train on many diverse channels, accept lower peak
  performance for better generalization.

### 7.6.3 Latency and complexity

- **Inference** must fit in the TTI (1 ms for LTE, 0.5 ms for 5G, 0.125 ms for
  some URLLC scenarios).
- **Model size** must fit in the device (UEs have limited memory, DSPs not GPUs).
- **Energy** — inference costs power; important for battery-powered devices.

### 7.6.4 Interpretability

- **Black-box models** are hard to certify, debug, or trust.
- **Safety-critical** applications (autonomous driving, medical devices) require
  **formal verification** — hard for neural networks.
- **Explainable AI (XAI)** is an active research area.

### 7.6.5 Standardization

- **3GPP Release 18 (5G-Advanced, 2024)** — **AI/ML for NR air interface** as a
  study item; standardized **network energy saving** and **load balancing** with
  ML. Air-interface ML (e.g., CSI feedback, beam management) still under study.
- **O-RAN Alliance** — **RIC** (RAN Intelligent Controller) with **xApps** (for
  near-real-time) and **rApps** (for non-real-time) — first production deployment
  of ML for RAN.
- **ITU-R IMT-2030 (6G)** — AI-native air interface is a major theme.

### 7.6.6 Interpretability vs. performance trade-off

There's a tension: **classical models are interpretable** (you can prove they
are optimal), **ML models are not**. For safety-critical applications, this
matters — a catastrophic failure is unacceptable even if the average case is
better.

**Emerging approaches:**

- **Hybrid models** — combine classical DSP with ML corrections.
- **Physics-informed neural networks (PINNs)** — neural networks constrained by
  physical laws.
- **Model-based deep learning** — deep-unfolded iterative algorithms (e.g.,
  unfolding an LDPC decoder into a trainable neural network).

---

## 7.7 Where ML-for-communications is used today

### 7.7.1 Standardized (deployed)

| Application | Standard | Deployment |
|---|---|---|
| **Beam management** (5G NR) | 3GPP Release 18 | Pilots in 5G-Advanced networks |
| **CSI feedback** (5G NR) | 3GPP Release 18 | Under study; some vendors deploy |
| **Positioning** | 3GPP Release 18 | ML for fingerprinting |
| **Network energy saving** | 3GPP Release 18 | Deployed |
| **Load balancing** | 3GPP Release 18 | Deployed |
| **Anomaly detection** | O-RAN | Deployed in cloud RAN |
| **Traffic prediction** | O-RAN | Deployed for capacity planning |

### 7.7.2 Commercial (proprietary)

- **Nokia, Ericsson, Huawei, Samsung** — ML-based beam management, channel
  estimation in their 5G gNB products.
- **NVIDIA Sionna** — GPU-accelerated link-level simulation for ML research and
  vendor prototyping.
- **Qualcomm** — ML-based channel estimation in Snapdragon modems (under study,
  limited deployment).
- **Google** — ML for network optimization in Project Fi / Google Fi.

### 7.7.3 6G research

- **ITU-R IMT-2030** (2024) — AI-native air interface, ML across all layers.
- **Hexa-X** (EU 6G flagship) — AI/ML as one of six research pillars.
- **NGMN 6G** — ML as an enabler of network automation, energy efficiency, and
  new services.

---

## 7.8 Chapter summary

1. **ML for communications** is driven by the need to solve problems that are
   too complex, too data-dependent, or too slow for classical analytical methods.
   The **IEEE ComSoc ETI** (2019) is the coordinating initiative.
2. **Three ML paradigms:** supervised (channel estimation, decoding, modulation
   classification), unsupervised (spectrum sensing, anomaly detection),
   reinforcement (scheduling, spectrum access, beam management).
3. **ML for PHY:**
   - **Channel estimation** — ML can match MMSE without needing channel statistics,
     but degrades under channel mismatch.
   - **Decoding** — ML decoders offer latency improvements; classical
     LDPC/turbo remain near-optimal.
   - **End-to-end autoencoder** — joint optimization of TX+RX; discovers
     constellations optimized for the channel. Big gains for non-linear channels.
   - **Channel modeling** — generative AI (VAE, GAN, diffusion) generates
     realistic channels for training and simulation.
4. **ML for MAC:**
   - **Scheduling** — RL learns policies; small gains over proportional fair in
     simple scenarios, larger gains with multiple objectives.
   - **Dynamic spectrum access** — ML-based sensing beats energy detection under
     noise uncertainty.
   - **Beam management** — ML reduces measurement overhead by 8× in mmWave.
5. **Federated learning** — training without centralizing data. Privacy-preserving
   for user data; used for beam prediction, anomaly detection, channel estimation.
6. **Practical challenges:** data scarcity, generalization, latency, model size,
   interpretability, standardization.
7. **Standardization:** 3GPP Release 18 (5G-Advanced) includes ML features — beam
   management, CSI feedback, positioning, energy saving, load balancing. O-RAN
   RIC provides a deployment platform for third-party ML apps.
8. **Where ML is deployed:** beam management, CSI feedback, positioning, energy
   saving, load balancing in 5G-Advanced; anomaly detection and traffic
   prediction in O-RAN.
9. **6G vision** is **AI-native** — ML across all layers, from PHY to applications,
   integrated into the network from the start.

---

## 7.9 Quiz

### A. Multiple choice

1. The **ETI** (Emerging Technology Initiative) is sponsored by:
   (a) IEEE ComSoc (b) 3GPP (c) ITU (d) WiFi Alliance

2. Which ML paradigm is best suited to **scheduling** decisions?
   (a) Supervised (b) Unsupervised (c) **Reinforcement** (d) Semi-supervised

3. **End-to-end learning** of communication systems via autoencoders requires:
   (a) A differentiable channel model (b) Matched filtering
   (c) Complex baseband (d) High SNR

4. ML-based **channel estimation** gains the most over classical methods when:
   (a) Channel statistics are known (b) The SNR is high
   (c) **Channel statistics are unknown or non-stationary** (d) Pilot density is high

5. **Federated learning** avoids:
   (a) Training (b) **Centralizing raw data** (c) Model updates (d) Gradient computation

6. In the **federated averaging** algorithm, the server aggregates:
   (a) Raw gradients (b) **Model weights from local devices**
   (c) Data samples (d) Activations

7. **Beam management** with ML in mmWave reduces:
   (a) Beam quality (b) **Measurement overhead** (c) Cell coverage (d) Path loss

8. **Generative models** (VAE, GAN, diffusion) are used in communications for:
   (a) Channel decoding (b) **Channel modeling / generation**
   (c) Scheduling (d) Modulation

9. Which of these is a **standardized** ML feature in 3GPP Release 18?
   (a) Neural decoding (b) Autoencoder PHY (c) **Beam management** (d) CSI feedback (partially)
   (Answer: c)

10. **O-RAN** enables ML deployment via:
    (a) OpenRAN split (b) **RIC (RAN Intelligent Controller) with xApps and rApps**
    (c) Cloud RAN (d) Massive MIMO

11. The **model-reality gap** in ML-for-communications refers to:
    (a) Training vs. deployment distribution mismatch
    (b) Model complexity
    (c) Data privacy
    (d) Latency

12. **Model-based deep learning** (deep unfolding) combines:
    (a) Neural networks with physical laws / iterative algorithms
    (b) Supervised and unsupervised learning
    (c) Federated and centralized learning
    (d) Classical DSP only

### B. Fill in the blank

1. \_\_\_\_\_\_\_\_ learning is the paradigm that trains an agent from a reward signal without explicit labels.
2. The \_\_\_\_\_\_\_\_ is a generative model that pairs an encoder and decoder to learn an end-to-end communication system.
3. In federated learning, the server aggregates model \_\_\_\_\_\_\_\_, not raw data.
4. 3GPP Release 18 (5G-Advanced) includes \_\_\_\_\_\_\_\_ management as a standardized ML feature.
5. \_\_\_\_\_\_\_\_ (three letters) is the O-RAN function that hosts third-party ML applications.
6. A CNN architecture is often used for channel estimation because it learns \_\_\_\_\_\_\_\_ patterns.
7. **Deep unfolding** converts an iterative algorithm into a \_\_\_\_\_\_\_\_ neural network.
8. **Differential privacy** formalizes the \_\_\_\_\_\_\_\_ guarantees of federated learning.
9. \_\_\_\_\_\_\_\_ model mismatch is a fundamental challenge where ML trained on one channel may fail on another.
10. \_\_\_\_\_\_\_\_ (three letters) is a 6G design principle where AI is integrated throughout the network.

### C. Define / explain

1. State the **ETI mission** and explain why ML is being applied to communications.
   What problems does it address that classical methods cannot?
2. Describe the **three ML paradigms** (supervised, unsupervised, reinforcement)
   and give one communications application for each.
3. Explain ML-based **channel estimation**. When does it beat MMSE, and when
   doesn't it?
4. Describe the **autoencoder approach** to communication systems. What is the
   critical requirement, and what does it discover for AWGN vs. non-linear
   channels?
5. Explain how **generative AI** is used for channel modeling. What are the
   advantages over classical 3GPP models?
6. Compare **RL-based scheduling** with **proportional fair** scheduling. When
   does RL win, and when is it not worth the complexity?
7. Explain **federated learning**. Why does it preserve privacy, and what are
   the trade-offs vs. centralized training?
8. Describe **dynamic spectrum access** and ML-based spectrum sensing. Why is
   energy detection insufficient?
9. Explain **beam management** in mmWave and how ML reduces measurement overhead.
10. Summarize the **practical challenges** of ML-for-communications — data,
    generalization, latency, interpretability, standardization.
11. What is **model-based deep learning** (deep unfolding)? Give one example.
12. Discuss the **AI-native 6G** vision. How does it differ from 5G-Advanced's
    incremental AI features?

---

## 7.10 Answer key

??? success "A. Multiple choice"
    1. **(a)** — IEEE ComSoc.
    2. **(c)** — reinforcement.
    3. **(a)** — a differentiable channel model.
    4. **(c)** — unknown / non-stationary statistics.
    5. **(b)** — centralizing raw data.
    6. **(b)** — model weights.
    7. **(b)** — measurement overhead.
    8. **(b)** — channel modeling / generation.
    9. **(c)** — beam management (CSI feedback also partially studied).
    10. **(b)** — RIC with xApps/rApps.
    11. **(a)** — training vs. deployment mismatch.
    12. **(a)** — neural networks + physical laws / iterative algorithms.

??? success "B. Fill in the blank"
    1. Reinforcement.
    2. Autoencoder.
    3. weights.
    4. beam.
    5. RIC.
    6. local.
    7. trainable (or unrolled).
    8. privacy.
    9. Channel (or model).
    10. AI-native (or IMT-2030; NN-AI; but AI-native is the specific term).

??? success "C. Define / explain — model answers"
    1. *ETI mission:* foster research on ML for PHY and MAC layers across
       wireless, optical, satellite, and molecular communication. *Why ML:* 
       classical methods hit limits on complexity (massive MIMO detection),
       model-dependence (site-specific channels), latency (iterative decoding
       at URLLC), and non-linearities (hardware impairments, PA distortion) —
       ML learns these from data without closed-form models.
    2. *Supervised:* given (input, label) pairs, learn a mapping. Application:
       channel estimation (input = received pilots, label = true channel);
       modulation classification. *Unsupervised:* input only, learn structure.
       Application: spectrum sensing (classify occupied/free), anomaly detection.
       *Reinforcement:* learn from reward signal. Application: scheduling
       (reward = throughput), dynamic spectrum access (reward = throughput
       without interfering primary user).
    3. *ML channel estimation:* a CNN maps received pilots (+ context) to
       channel estimate. *Beats MMSE:* when the channel statistics (covariance)
       are unknown or non-stationary, or the channel has complex structure
       (massive MIMO, mmWave). *Doesn't beat:* when the covariance is well-known
       and stationary — MMSE is already near-optimal, and ML can only match it.
    4. *Autoencoder:* encoder (TX) → differentiable channel → decoder (RX), trained
       jointly. *Requirement:* differentiable channel model for backpropagation.
       *AWGN:* learns QPSK (matches classical optimal). *Non-linear channel:*
       learns a constellation that compensates for the distortion — beats
       classical QAM, which was optimized for AWGN.
    5. *Generative AI for channel modeling:* VAE, GAN, or diffusion models learn
       the distribution of channel realizations from measured or simulated data
       and can sample new realizations. *Advantages over 3GPP TR 38.901:*
       generative models can capture site-specific effects, non-stationary
       behaviour, and complex dependencies that the parametric 3GPP model
       doesn't; they can be adapted to new scenarios with less data.
    6. *RL scheduling:* state = channel qualities + queue lengths, action = which
       UE to serve, reward = weighted sum of throughput, fairness, latency.
       *Proportional fair:* serves UE with max h_i(t)/h̄_i. *RL wins:* when multiple
       objectives must be balanced, when traffic is bursty / non-stationary,
       when classical heuristics have been hand-tuned (RL can learn the
       optimal policy). *RL loses:* when proportional fair is already near-optimal,
       when interpretability is required, when training data is scarce.
    7. *Federated learning:* devices train locally on their data; only model
       updates (gradients or weights) are sent to the server; server aggregates.
       *Privacy:* raw data stays on the device. *Trade-offs:* more communication
       rounds (slower wall-clock), model divergence under non-IID data,
       stragglers (slow devices), harder to debug.
    8. *Dynamic spectrum access:* unlicensed users access licensed spectrum when
       primary user is absent. *Energy detection:* measures energy in a band;
       if above threshold, assume occupied. Fails under low SNR, noise
       uncertainty, and non-stationary noise. *ML:* classify occupied/free
       from IQ samples — robust to noise uncertainty, detects weak primary
       users, generalizes across modulation types.
    9. *Beam management:* mmWave requires beam alignment; exhaustive search over
       N×N beam pairs is O(N²). *ML:* predict the best beam from a few probe
       beams + context (position, history). Reduces measurement from 64 to 8
       (in the worked example) — an 8× speedup, enabling beam tracking at high
       mobility.
    10. *Challenges:* (i) data — real measurements are scarce/expensive;
        (ii) generalization — trained on one channel, deployed on another;
        (iii) latency — inference must fit TTI budget (0.5–1 ms);
        (iv) interpretability — black-box models hard to certify;
        (v) standardization — 3GPP/O-RAN processes are slow; few ML features
        standardized yet (Release 18 begins this).
    11. *Model-based deep learning / deep unfolding:* take an iterative algorithm
        (LDPC decoder, MIMO detector, channel estimator) and unroll it into a
        fixed-depth neural network where each layer is a trainable version of
        one iteration. Combines physical structure (interference cancellation,
        message passing) with learned parameters. Examples: unfolded LDPC
        decoder, unfolded Viterbi, unfolded approximate message passing (AMP).
    12. *AI-native 6G:* unlike 5G-Advanced (which bolts AI onto a conventionally
        designed system), 6G treats AI as a **first-class** component of the
        network architecture — AI-driven PHY, AI-defined RAN, AI-orchestrated
        core, AI for network management. Expected features: AI-based channel
        estimation, CSI compression, beam prediction, and possibly **entirely
        learned PHY** (autoencoder-style) for some links. Data-driven network
        automation at all layers.

---

## Further reading

**Foundational papers**

- **T. O'Shea & J. Hoydis**, "An Introduction to Deep Learning for the Physical
  Layer," *IEEE Trans. Cognitive Comm. and Networking*, 3(4), 2017 — the
  autoencoder paper; foundational for end-to-end learning.
- **T. O'Shea, J. Corgan & T. C. Clancy**, "Convolutional Radio Modulation
  Recognition Networks," *EANN* 2016 — the RadioML dataset; ML for modulation
  classification.
- **T. Wang, C.-K. Wen, H. Wang, F. Gao, T. Jiang & S. Jin**, "Deep Learning for
  Wireless Physical Layer: Opportunities and Challenges," *China Communications*,
  14(11), 2017 — a survey of the early ML-for-PHY landscape.

**ML for PHY**

- **N. Shlezinger, J. Whang, Y. C. Eldar & G. T. Li**, "Model-Based Deep Learning,"
  *Proc. IEEE*, 111(5), 2023 — deep unfolding and hybrid models.
- **H. Ye, L. Liang, G. Y. Li & B.-H. Juang**, "Deep Learning-Based End-to-End
  Wireless Communication Systems with Conditional GANs as Unknown Channels,"
  *IEEE Trans. Wireless Comm.*, 19(5), 2020.
- **N. Samuel, T. Diskin & A. Wiesel**, "Learning to Detect," *IEEE Trans. Signal
  Processing*, 67(10), 2019 — deep MIMO detection.
- **E. Nachmani, Y. Be'ery & D. Burshtein**, "Learning to Decode Linear Codes
  Using Deep Learning," *IEEE ITW* 2016 — neural decoders.

**ML for MAC**

- **N. C. Luong et al.**, "Applications of Deep Reinforcement Learning in
  Communications and Networking: A Survey," *IEEE Comm. Surveys & Tutorials*,
  21(4), 2019.
- **U. Challita, L. Dong & W. Saad**, "Proactive Resource Management for LTE in
  the Unlicensed Spectrum: A Deep Learning Perspective," *IEEE Trans. Wireless
  Comm.*, 17(7), 2018.
- **M. Polese et al.**, "Machine Learning at the Edge: A Data-Driven Architecture
  with Applications to 5G," *IEEE JSAC*, 39(8), 2021.

**Federated learning**

- **H. B. McMahan, E. Moore, D. Ramage, S. Hampson & B. A. y Arcas**,
  "Communication-Efficient Learning of Deep Networks from Decentralized Data,"
  *AISTATS* 2017 — the **FedAvg** paper.
- **P. Kairouz et al.**, "Advances and Open Problems in Federated Learning,"
  *Foundations and Trends in ML*, 14(1–2), 2021.

**Standards and vision**

- **3GPP TR 38.843** — *Study on Artificial Intelligence (AI)/Machine Learning
  (ML) for NR Air Interface* (Release 18).
- **3GPP TR 37.817** — *Study on enhancement for data collection for NR and
  EN-DC* (Release 17).
- **O-RAN Alliance WG2/WG3** — AI/ML workflow, RIC architecture.
- **ITU-R IMT-2030 framework** (2024) — the AI-native 6G vision.
- **5G-PPP / Hexa-X** — European 6G research projects.
- **NGMN 6G White Paper** — operator-driven 6G requirements.

**Books**

- **O. Simeone**, *Machine Learning for Engineers*, Cambridge University Press,
  2022 — the textbook treatment of ML for wireless; excellent reference.
- **P. V. Klaine, M. A. Imran et al.**, *Machine Learning for Wireless
  Communications*, Wiley, 2022.
- **M. Chen, D. Gündüz, K. Huang, W. Saad et al.**, *Machine Learning for
  Wireless Networks*, Springer (multiple volumes).

**Tools**

- **NVIDIA Sionna** — GPU-accelerated link-level simulator for ML-for-communications
  research: [nvlabs.github.io/sionna](https://nvlabs.github.io/sionna/).
- **5G Toolkit** (MATLAB) — reference PHY, useful for generating training data.
- **PyTorch, JAX, TensorFlow** — standard deep learning frameworks.
- **GNU Radio + ML blocks** — for SDR-based ML experiments.
- **DeepMIMO** — open dataset for ML in massive MIMO.
- **RadioML** — modulation classification dataset.

---

## Suggested tutorial problems

1. **Data generation.** Generate a synthetic Rayleigh fading channel dataset
   (10,000 samples) using 3GPP TR 38.901 EPA model. Train a small CNN for
   channel estimation and compare NMSE to LS and MMSE with known covariance.

2. **Autoencoder.** Implement a 2-bit autoencoder for the AWGN channel in
   PyTorch. Train on 100,000 random bits. Verify it converges to a QPSK-like
   constellation. Then train on a non-linear channel (clip the signal at 1.0)
   and observe the learned constellation.

3. **RL scheduling.** Implement a simplified RL scheduler (Q-learning or DQN)
   for a 10-UE LTE scenario with Rayleigh fading. Compare cell throughput and
   fairness with proportional fair and max-throughput.

4. **Federated learning.** Simulate 10 devices, each with a different channel
   distribution. Train a shared model via FedAvg. Compare NMSE with centralized
   training and per-device local models. What is the accuracy loss vs. privacy
   gain?

5. **Beam prediction.** Using a codebook of 32 beams, simulate a mobile moving
   through a cell. Train an LSTM to predict the best beam from the previous 3
   beams + position. Compare measurement overhead with exhaustive search.

6. **Channel modeling with GAN.** Train a small GAN to generate channel
   realizations from a 3GPP model. Compare the statistics of generated vs. real
   channels (PDP, RMS delay spread, Doppler).

7. **Deep unfolding.** Take a simple 3-iteration iterative soft-thresholding
   (ISTA) algorithm for sparse recovery (compressed sensing channel estimation)
   and unroll it into a 3-layer network. Train on channel data. Compare
   performance with plain ISTA and OMP.

8. **Modulation classification.** Build a CNN classifier for BPSK, QPSK, 16-QAM,
   64-QAM, GFSK, etc. (RadioML dataset). Train on clean signals, test on noisy
   — measure accuracy vs. SNR.

9. **DeepMIMO experiment.** Download DeepMIMO data for a massive MIMO scenario.
   Train a CNN for CSI compression / recovery. Compare with classical compressed
   sensing.

10. **Explainability.** Take a trained channel estimation CNN. Visualize the
    learned features — do they resemble classical filters? Use SHAP or
    attention maps to explain individual predictions. Does the network "look
    like" a classical estimator?

11. **Federated differential privacy.** Extend the FL experiment from problem 4
    with differential privacy: add Gaussian noise to model updates with a
    privacy budget $\epsilon$. Study the privacy-accuracy trade-off (vary $\epsilon$).

12. **Real SDR.** If you have USRP or similar SDR hardware: collect real
    over-the-air channel measurements, train an ML model on them, deploy it as
    a receiver, and measure BER vs. classical estimation. This closes the
    simulation-to-reality gap.

---

## Course complete — all seven chapters delivered

**ECEG-6412 course summary:**

| Ch | Title | File |
|:---:|---|---|
| 1 | Introduction | `docs/chapters/01-introduction.md` |
| 2 | Modulation and Coding for Wireless Systems | `docs/chapters/02-modulation-coding.md` |
| 3 | GSM | `docs/chapters/03-gsm.md` |
| 4 | UMTS | `docs/chapters/04-umts.md` |
| 5 | Advanced Broadband Wireless Access & Services | `docs/chapters/05-broadband-wireless.md` |
| 6 | Next Generation Networks | `docs/chapters/06-ngn.md` |
| 7 | Machine Learning for Communications | `docs/chapters/07-ml-communications.md` |

**The course follows the syllabus structure:**

- **Part I — Wireless system basics:** Chapters 1–2 (introduction, modulation and coding)
- **Part II — Wired technology trends:** brief coverage in the syllabus; can be an appendix
- **Part III — Wireless network trends:** Chapters 3–4 (GSM, UMTS)
- **Part IV — Emerging technologies:** Chapters 5–7 (4G/LTE/WiMAX, NGN/IoT, ML for communications)

**Each chapter follows the same template** as ECEG-6201 and the DSP courses:
- Chapter-at-a-glance (contact hours, syllabus coverage)
- Learning outcomes
- Numbered sections with **worked examples**
- **Computational implementations** in Python (and Java/C# where relevant)
- Chapter summary
- **Three-part quiz** (MCQ, fill-in, define/explain)
- **Answer key** (in `???` collapsibles)
- Further reading
- 10–12 tutorial problems

