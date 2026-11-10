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

### Chapter 7 — Machine Learning for Communications

MSc in Communication Engineering · Year 1, Semester I

Dr. Tesfamichael Gebregziabher

---

## Outline

<div class="fragment">

**Part 1 — Why ML for communications**

- The ETI mission
- Where classical methods hit limits

</div>

<div class="fragment">

**Part 2 — ML fundamentals**

- Supervised, unsupervised, reinforcement
- The data problem

</div>

<div class="fragment">

**Part 3 — ML for the PHY**

- Channel estimation, decoding, autoencoders
- Channel modeling with generative AI

</div>

<div class="fragment">

**Part 4 — ML for the MAC**

- Scheduling, dynamic spectrum, beam management

</div>

<div class="fragment">

**Part 5 — Federated learning and practical challenges**

- Privacy-preserving ML
- What's deployed, what's not, what's next

</div>

---

## Learning outcomes

<div class="fragment">

**LO1 — State the ETI mission**

Foster ML for the PHY and MAC layers — across wireless, optical, satellite, molecular.

</div>

<div class="fragment">

**LO2 — Match ML paradigms to problems**

Supervised (estimation, decoding), unsupervised (sensing), reinforcement (scheduling).

</div>

<div class="fragment">

**LO3 — Evaluate ML for the PHY**

Where does it beat classical methods? When does it not?

</div>

<div class="fragment">

**LO4 — Evaluate ML for the MAC**

RL for scheduling, ML for spectrum, beam prediction.

</div>

<div class="fragment">

**LO5 — Explain federated learning**

Privacy-preserving training without centralizing raw data.

</div>

<div class="fragment">

**LO6 — Identify practical challenges**

Data scarcity, generalization, latency, interpretability, standardization.

</div>

---

## §7.1 — Why ML for communications?

<div class="fragment">

The **IEEE ComSoc Emerging Technology Initiative (ETI)** on **Machine Learning for Communications** was launched in 2019.

</div>

<div class="fragment">

**Mission:** foster research and innovation on ML for the **PHY** and **MAC** layers — across wireless, optical, satellite, and molecular communication systems.

</div>

<div class="fragment">

**The premise:** classical communication theory has reached practical limits in some areas, and ML can solve problems that are:

- **Too complex** for closed-form optimization
- **Too data-dependent** for analytic models
- **Too slow** for traditional algorithms under real-time constraints

</div>

---

## The classical foundation

<div class="fragment">

Classical communication systems are designed from **mathematical models** — each block has a **provably optimal** solution:

| Component | Classical solution |
|---|---|
| Channel estimation | MMSE (with known covariance) |
| Equalization | Viterbi, MMSE |
| Detection (MIMO) | ML, sphere decoding |
| Channel coding | LDPC, turbo, polar — near-Shannon |
| Scheduling | Proportional fair |
| Estimation | Kalman filter |

</div>

<div class="fragment">

**Why replace them with neural networks?**

</div>

---

## Where ML shines — three properties

<div class="fragment">

**1. Non-linear function approximation.**

Neural networks approximate any continuous function to arbitrary accuracy (universal approximation theorem).

Many communication problems (channel estimation, precoding, detection) are **non-linear** and lack closed-form optima — ML learns the mapping from data.

</div>

<div class="fragment">

**2. End-to-end optimization.**

Traditional systems are **independent blocks** (estimate → equalize → demodulate → decode). Each block optimizes its own metric.

ML lets you **jointly optimize the whole chain** for the end-to-end objective.

</div>

<div class="fragment">

**3. Data-driven modeling.**

When the environment is too complex for analytic modeling — mmWave channels, molecular propagation, non-linear hardware — ML learns from measurements.

</div>

---

## Where ML doesn't shine

<div class="fragment">

**ML is not a replacement for classical methods** — it's an additional tool.

</div>

<div class="fragment">

**ML loses to classical methods when:**

- The classical solution is **optimal** (matched filter, LDPC decoder)
- Data is **scarce** (new bands, new standards)
- **Interpretability and certification** are required (safety-critical — automotive, medical, aviation)
- **Generalization matters** (model trained on one channel may fail on another)
- Real-time latency is critical (URLLC at 1 ms)

</div>

<div class="fragment">

**The best systems combine ML and classical DSP** — ML for the complex, environment-specific parts; classical for the parts with optimal solutions.

</div>

---

## Checkpoint — When does ML NOT beat classical?

<div class="quiz" data-question="ml-limits">
  <p class="quiz-question">For which of these is the <strong>classical method already optimal</strong> (ML offers little benefit)?</p>
  <button class="quiz-option" data-answer="wrong">Channel estimation with unknown statistics</button>
  <button class="quiz-option" data-answer="wrong">MIMO detection in massive MIMO</button>
  <button class="quiz-option" data-answer="correct">Matched filter for a known signal in AWGN</button>
  <button class="quiz-option" data-answer="wrong">Channel modeling with site-specific geometry</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** The matched filter is **provably optimal** for maximizing SNR at a specific time — a Cauchy–Schwarz inequality that no learned filter can beat. ML's advantages appear where the optimum is unknown (unknown statistics, non-linear channels, high-complexity problems), not where classical theory already gives the best answer.

</div>

---

## §7.2 — ML fundamentals

<div class="fragment">

**Three paradigms:**

| Paradigm | Data | Communications use |
|---|---|---|
| **Supervised** | (input, label) pairs | Channel estimation, decoding, modulation classification |
| **Unsupervised** | input only | Spectrum sensing, anomaly detection |
| **Reinforcement** | reward signal | Scheduling, spectrum access, beam management |

</div>

<div class="fragment">

**Supervised learning:** learn $f_\theta$ from training set $\{(x_i, y_i)\}$.

$$
\boxed{\;\theta^* = \arg\min_\theta \frac{1}{N}\sum_{i=1}^N \mathcal L(f_\theta(x_i), y_i)\;}
$$

</div>

<div class="fragment">

**Reinforcement learning:** learn policy $\pi(a \mid s)$ from reward signal.

$$
\boxed{\;\pi^* = \arg\max_\pi \mathbb E\!\left[\sum_{t=0}^\infty \gamma^t r_t\right]\;}
$$

No labels — just reward.

</div>

---

## Deep learning for signals

<div class="fragment">

**CNN (Convolutional Neural Network)** — the dominant architecture for PHY:

- 1-D CNN over signal (time or frequency as "image")
- Convolutional layers learn local patterns
- Pooling reduces dimensionality
- Fully connected layers for classification/regression

</div>

<div class="fragment">

**RNN / LSTM** — for sequential data (channel estimation over time, scheduling).

**Transformers** — attention-based; increasingly used for channel estimation, decoding, end-to-end.

</div>

<div class="fragment">

**Autoencoders** — for unsupervised and self-supervised tasks, and for **end-to-end learning of communication systems** (see §7.3.3).

</div>

<div class="fragment">

**Unfolded networks** — iterative algorithms unrolled into a fixed-depth NN with trainable parameters (deep unfolding).

</div>

---

## The data problem

<div class="fragment">

Unlike vision and NLP, communications has a **data problem**:

**Where does training data come from?**

| Source | Pros | Cons |
|---|---|---|
| **Simulation** (3GPP TR 38.901, Sionna) | Unlimited, controllable | Model-reality gap |
| **Measurement** | Realistic | Expensive, limited, site-specific |
| **Synthetic augmentation** | Cheap | Doesn't cover all real cases |
| **Field data** | Truly representative | Privacy, collection cost |

</div>

<div class="fragment">

**The model-reality gap:** an ML model trained on 3GPP TR 38.901 synthetic channels may fail on real measured channels.

**This is the fundamental data challenge of communications ML** — much harder than in vision or NLP.

</div>

<div class="fragment">

**Solutions:** transfer learning, domain adaptation, online learning.

</div>

---

## §7.3 — ML for the PHY — channel estimation

<div class="fragment">

**The classical problem:** estimate channel $h$ from received pilots $y_p = h\, x_p + n$.

**Classical methods:**
- LS — no statistics, noisy at low SNR
- MMSE — optimal, needs covariance
- Compressed sensing — exploits sparsity

</div>

<div class="fragment">

**ML approach:** a CNN maps received pilots + context → channel estimate.

**Why might ML help?**

- Channel has structure (sparsity, correlation)
- MMSE needs the **covariance** — which must be estimated, and is wrong in new environments
- ML **learns** the structure from data, generalizes

</div>

<div class="fragment">

**Critical insight:** when the ML model is trained on the **same** channel it's evaluated on, it nearly matches MMSE — **without needing the covariance**.

When trained on a **different** channel (mismatch), it degrades.

</div>

---

## Channel estimation — the trade-off

<div class="fragment">

**Typical results (EPA channel, 10 dB SNR):**

| Method | NMSE (dB) |
|---|:---:|
| LS | −8 |
| MMSE (known covariance) | **−14** |
| ML (matched training) | **−13** |
| ML (mismatched training) | −10 |

</div>

<div class="fragment">

**The model-reality gap is real.**

When the ML model's implicit channel statistics match the deployment, it wins. When they don't, it loses.

</div>

<div class="fragment">

**Where ML wins in practice:** when covariance is **hard to estimate** (short windows, non-stationary channels, massive MIMO with many antennas).

**Where classical wins:** when statistics are known and stable.

</div>

---

## ML for channel decoding

<div class="fragment">

**The classical problem:** recover information bits from a received noisy codeword.

**Classical decoders:** Viterbi, BCJR, belief propagation (LDPC), SCL (polar) — **near-optimal**.

</div>

<div class="fragment">

**ML approach:** learn a decoder that maps noisy codewords → bits.

**Architecture:** RNN or transformer that iterates over the codeword.

</div>

<div class="fragment">

**Where ML helps:**
- **Latency** — a single feed-forward pass may be faster than iterative decoding
- **Finite-length performance** — ML can exploit short-code structure
- **Joint decoding** across multi-user / multi-antenna

</div>

<div class="fragment">

**Where classical wins:** LDPC/turbo/polar are already **within 0.5 dB of Shannon**. At practical block lengths, ML decoders don't reliably beat them.

The main opportunity is **latency**, not raw BER.

</div>

---

## Decoding — latency vs. accuracy

<div class="fragment">

**Example:** 5G NR LDPC decoder at rate 3/4, block 8448 bits, target 1 Gbps.

| Decoder | Latency | Energy (pJ/bit) | BER at 2 dB |
|---|:---:|:---:|:---:|
| Classical BP (15 iter) | 4.2 μs | 120 | 1.2e-6 |
| Neural LDPC (5 iter) | **1.1 μs** | 200 | 1.5e-6 |
| Neural LDPC (20 iter) | 4.3 μs | 800 | 1.1e-6 |

</div>

<div class="fragment">

**The trade-off:**
- Neural LDPC **4× lower latency** at similar BER
- But higher energy, and depends on fixed code structure
- ML decoders are deployed for **latency-critical** applications, not general decoding

</div>

---

## §7.3.3 — The autoencoder — the radical idea

<div class="fragment">

**Replace the entire PHY (TX + channel + RX) with an autoencoder** trained end-to-end.

**O'Shea–Hoydis formulation (2017):**

$$
\text{bits} \to \text{Encoder}_\theta \to \text{Channel} \to \text{Decoder}_\phi \to \text{bits}
$$

Train encoder + decoder **jointly** to minimize bit-error loss.

</div>

<div class="fragment">

**Why it's interesting:**

- **Joint optimization** — no separate design of TX and RX
- **Adapts to any (differentiable) channel**
- **Discovers new modulation schemes** — may not match BPSK/QPSK/QAM

</div>

<div class="fragment">

**The critical requirement:** the channel must be **differentiable** for backpropagation.

Works when channel is additive Gaussian or a known differentiable function. Fails when channel has hard decisions or unmodeled distributions.

</div>

---

## What the autoencoder discovers

<div class="fragment">

**AWGN channel (2 bits/symbol):**

The learned constellation has 4 points, roughly in a **square** — **it learns QPSK**.

BER matches theory within 0.1 dB. **The network discovers the classical optimal.**

</div>

<div class="fragment">

**Non-linear channel (PA saturation, 4 bits/symbol):**

The learned constellation is **not 16-QAM**. It's stretched and offset to compensate for the distortion.

BER improves **~5 dB** over classical 16-QAM — because the classical constellation was optimized for AWGN, not for the non-linear PA.

</div>

<div class="fragment">

**This is where ML genuinely beats classical.**

For the AWGN channel, classical is optimal — ML just recovers it. For non-linear or unmodeled channels, ML learns a better solution.

</div>

---

## Checkpoint — Autoencoder on AWGN

<div class="quiz" data-question="autoencoder">
  <p class="quiz-question">When trained on the <strong>AWGN channel</strong> at 2 bits/symbol, what does the autoencoder typically learn?</p>
  <button class="quiz-option" data-answer="wrong">A new constellation unlike any classical scheme</button>
  <button class="quiz-option" data-answer="correct">A QPSK-like constellation — the classical optimal</button>
  <button class="quiz-option" data-answer="wrong">16-QAM</button>
  <button class="quiz-option" data-answer="wrong">It fails to converge</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** For the AWGN channel, QPSK is the **optimal 2-bit/symbol modulation** — the constellation that minimizes BER for a given $E_b/N_0$. Gradient descent finds it naturally. **The autoencoder's value appears on non-linear channels** where classical optimal is unknown — there it learns constellations that beat classical QAM.

</div>

---

## ML for channel modeling — generative AI

<div class="fragment">

**The classical problem:** 3GPP TR 38.901 is geometric, site-specific, slow to simulate, hard to extend.

</div>

<div class="fragment">

**ML approach:** learn a **generative model** of the channel — sample realistic realizations from the same distribution as real channels.

</div>

<div class="fragment">

**Techniques:**

- **VAE (Variational Autoencoder)** — learns latent representation, samples from it
- **GAN (Generative Adversarial Network)** — generator vs. discriminator
- **Diffusion models** — similar to DALL-E / Stable Diffusion — sample by progressively denoising

</div>

<div class="fragment">

**Use:**
- Generate training data for receiver ML models
- Generate channels for coverage planning
- Augment measured data for rare scenarios

**3GPP Release 18** includes generative-AI channel models for specific scenarios (high-speed train, industrial).

</div>

---

## §7.4 — ML for the MAC — scheduling

<div class="fragment">

**The classical problem:** given UEs with channel $h_i(t)$ and queue $q_i(t)$, decide which UE to serve each TTI to maximize utility.

</div>

<div class="fragment">

**Classical algorithms:**

- **Round-robin** — fair, ignores channel
- **Max-throughput** — best channel, unfair
- **Proportional fair** — max $h_i(t)/\bar h_i$ — throughput + fairness

</div>

<div class="fragment">

**ML approach:** **reinforcement learning** to learn a scheduling policy.

- **State:** channel qualities, queue lengths, delays
- **Action:** which UE to serve
- **Reward:** throughput (+ fairness bonus)
- **Algorithm:** DQN, PPO, actor-critic

</div>

<div class="fragment">

**Advantage over classical:** handles **multiple objectives** (throughput + fairness + latency + energy) that classical heuristics struggle to balance.

</div>

---

## RL scheduling — worked example

<div class="fragment">

**Setup:** 10 UEs, Rayleigh fading, full-buffer traffic. Reward = sum throughput, $\gamma = 0.9$.

**Training:** 1 million TTI × 10 UEs.

</div>

<div class="fragment">

**Results:**

| Scheduler | Cell throughput | Jain's fairness |
|---|:---:|:---:|
| Round-robin | 22 Mbps | **0.98** |
| Proportional fair | 26 Mbps | 0.85 |
| **RL (learned)** | **27 Mbps** | 0.82 |

</div>

<div class="fragment">

**Interpretation.** RL achieves slightly higher throughput (+4%) than PF at slightly lower fairness. **Not a dramatic win** — PF is already near-optimal for this simple scenario.

</div>

<div class="fragment">

**RL wins more** with multiple objectives (throughput + delay), non-standard channel models, or bursty traffic. For simple scenarios, PF remains the default.

</div>

---

## Dynamic spectrum access

<div class="fragment">

**The problem:** licensed spectrum is often underutilized (15–85% idle). **Cognitive radio** lets unlicensed users access it when the primary user is absent.

</div>

<div class="fragment">

**Classical approach:** energy detection — measure energy in the band, threshold at occupancy. **Fails** under noise uncertainty, low SNR.

</div>

<div class="fragment">

**ML approach:** supervised classification of spectrum occupancy from IQ samples.

**Input:** $N$ IQ samples. **Output:** primary user present/absent, modulation type.

**Network:** 1-D CNN over IQ.

</div>

<div class="fragment">

**Why ML wins:** robust to noise uncertainty, detects weak primary users, generalizes across modulation types.

**Deployment:** CBRS (US) uses a centralized SAS database for primary detection — ML is a candidate for **incumbent detection** in future systems.

</div>

---

## Beam management in mmWave

<div class="fragment">

**The problem:** mmWave needs beam alignment. Exhaustive search over an $N \times N$ codebook is $O(N^2)$ — **slow**.

For 64 beams: 64 measurements × 1 ms = 64 ms to align.

</div>

<div class="fragment">

**ML approach:** **beam prediction** — predict the best beam from **fewer measurements** or from **context** (position, history, previous beams).

**Input:** a few "probe" beams + GPS + previous beams.
**Output:** predicted best beam, or predicted CQI for all beams.

**Network:** CNN or LSTM.

</div>

<div class="fragment">

**Result:**

| Method | Measurements | Best-beam accuracy | Latency |
|---|:---:|:---:|:---:|
| Exhaustive search | 64 | 100% | 64 ms |
| Classical hierarchical | 20 | 85% | 20 ms |
| **ML (CNN)** | **8** | **92%** | **8 ms** |

</div>

<div class="fragment">

**8× measurement reduction**, 8× faster alignment. Enables **high-mobility beam tracking** that classical search cannot support.

**5G-Advanced Release 18** standardizes AI/ML for beam management.

</div>

---

## Checkpoint — Beam management

<div class="quiz" data-question="beam-ml">
  <p class="quiz-question">What is the primary benefit of <strong>ML-based beam management</strong> in mmWave?</p>
  <button class="quiz-option" data-answer="wrong">Higher peak data rate per UE</button>
  <button class="quiz-option" data-answer="correct">Reduced measurement overhead — faster beam alignment for high-mobility UEs</button>
  <button class="quiz-option" data-answer="wrong">Better spectral efficiency per beam</button>
  <button class="quiz-option" data-answer="wrong">Eliminates the need for beamforming</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** Beam management's bottleneck is **measurement time** — exhaustive search over $N^2$ pairs is too slow for moving UEs. ML predicts the best beam from **fewer probes** + context, reducing measurement from 64 to 8 in the example. That 8× speedup makes beam tracking viable at highway speeds.

</div>

---

## §7.5 — Federated learning

<div class="fragment">

**The privacy problem:**

Classical ML trains on **centralized data** — but channel data, location, and usage data are **sensitive**.

Regulations (GDPR, CCPA) restrict moving personal data.

</div>

<div class="fragment">

**Federated learning (FL):** train a model **without centralizing data.**

**The FedAvg algorithm:**

1. Initialize a global model at the server
2. Broadcast to $N$ participating devices
3. Each device trains **locally** on its data
4. Send model **updates** (weights, not data) to the server
5. Server **aggregates** (weighted average):

$$
w_{t+1} = \sum_{k=1}^N \frac{n_k}{n}\, w_{t+1}^{(k)}
$$

6. Repeat

</div>

<div class="fragment">

**Privacy:** only model updates leave the device, not raw data. **Differential privacy** can be added for formal guarantees.

</div>

---

## FL — trade-offs and applications

<div class="fragment">

**FL applications in communications:**

- **Beam prediction** at mobile devices — learned locally, aggregated
- **Channel estimation** — models trained at UEs, aggregated at gNB
- **Anomaly detection** — distributed detection of rogue devices
- **Spectrum sensing** — collaborative sensing without IQ sharing

</div>

<div class="fragment">

**Challenges:**

- **Communication cost** — model updates are large; compression needed
- **Non-IID data** — different UEs see different channels; local models diverge
- **Stragglers** — slow/offline devices
- **Security** — malicious devices can poison the model

</div>

<div class="fragment">

**Example:** 100 UEs, channel data 10 GB centralized vs. **50 MB** of model updates — **200× less bandwidth**.

At 0.5 dB accuracy loss. **Privacy is the win** — many applications accept the loss.

</div>

---

## §7.6 — Practical challenges

<div class="fragment">

**Data:**
- Scarcity — real measurements are expensive
- Quality — labels require reference signals
- **Distribution shift** — training ≠ deployment

</div>

<div class="fragment">

**Generalization:**
- ML trained on one channel/band may **fail** on another
- Fundamentally different from vision/NLP (data distribution is site-specific and non-stationary)
- Solutions: domain adaptation, meta-learning, online learning

</div>

<div class="fragment">

**Latency and complexity:**
- Inference must fit the TTI (1 ms in LTE, 0.5 ms in 5G, 0.125 ms in URLLC)
- Model size must fit in the device
- Energy — inference costs power

</div>

<div class="fragment">

**Interpretability and safety:**
- Black-box models hard to certify
- Safety-critical applications need formal verification
- Hybrid models, physics-informed NNs, deep unfolding address this

</div>

---

## Standardization — what's actually deployed

<div class="fragment">

**3GPP Release 18 (5G-Advanced, 2024):**

- **AI/ML for NR air interface** as a study item
- **Beam management** standardized
- **CSI feedback** under study
- **Positioning** using ML
- **Network energy saving** deployed
- **Load balancing** deployed

</div>

<div class="fragment">

**O-RAN Alliance** — deployment platform:

- **RIC** (RAN Intelligent Controller)
- **xApps** — near-real-time apps
- **rApps** — non-real-time apps
- First production deployment of third-party ML in RAN

</div>

<div class="fragment">

**ITU-R IMT-2030 (6G)** — **AI-native air interface** as a major theme.

AI is a first-class component of the network — from PHY to network management.

</div>

---

## Checkpoint — Federated learning

<div class="quiz" data-question="fl-privacy">
  <p class="quiz-question">Why is <strong>federated learning</strong> considered privacy-preserving?</p>
  <button class="quiz-option" data-answer="wrong">It encrypts the raw data during transmission</button>
  <button class="quiz-option" data-answer="correct">Raw data never leaves the device — only model updates are sent</button>
  <button class="quiz-option" data-answer="wrong">It uses blockchain to verify training</button>
  <button class="quiz-option" data-answer="wrong">It obfuscates the model structure</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** Classical ML sends raw data to a server for training. Federated learning keeps **raw data on the device** and sends only **model updates** (gradients or weights). Model updates contain far less information about individual samples — and differential privacy can formalize the guarantee. This is a fundamental architectural advantage for regulated or privacy-sensitive data.

</div>

---

## §7.7 — Where ML is deployed today

<div class="fragment">

**Standardized and deployed:**

| Application | Standard | Status |
|---|---|---|
| Beam management (5G NR) | 3GPP Release 18 | Deployed in 5G-Advanced |
| Network energy saving | 3GPP Release 18 | Deployed |
| Load balancing | 3GPP Release 18 | Deployed |
| Anomaly detection | O-RAN | Deployed in cloud RAN |
| Traffic prediction | O-RAN | Deployed for capacity planning |

</div>

<div class="fragment">

**Commercial (proprietary):**

- **Nokia, Ericsson, Huawei, Samsung** — ML-based beam management, channel estimation in 5G gNB products
- **Qualcomm** — ML channel estimation in Snapdragon modems (studied, limited)
- **NVIDIA Sionna** — GPU-accelerated simulation for ML research

</div>

<div class="fragment">

**The gap between research and deployment is real.** Most papers show gains on simulation; most deployments use small, well-understood ML models for specific tasks.

</div>

---

## §7.8 — AI-native 6G

<div class="fragment">

**6G (ITU-R IMT-2030)** is described as **AI-native** — AI from the start, not bolted on.

</div>

<div class="fragment">

**Expected features:**

- **AI-driven PHY** — learned channel estimation, beam prediction, possibly entire learned PHY for some links
- **AI-defined RAN** — xApps, rApps, network automation
- **AI-orchestrated core** — self-optimizing, self-healing
- **AI for network management** — energy, congestion, slicing
- **Federated learning** across billions of devices

</div>

<div class="fragment">

**Research projects:**

- **Hexa-X** (EU 6G flagship) — AI/ML as one of six pillars
- **NGMN 6G** — operator-driven requirements
- **ITU-R IMT-2030** — the framework

</div>

<div class="fragment">

**The vision is ambitious — the challenge is delivering it with interpretability, safety, and standardization.**

</div>

---

## Chapter 7 — key takeaways

<div class="fragment">

**1.** **ML for communications** is driven by the need to solve problems too complex, too data-dependent, or too slow for classical methods. **IEEE ComSoc ETI** coordinates the research.

</div>

<div class="fragment">

**2.** Three paradigms: **supervised** (channel estimation, decoding), **unsupervised** (spectrum sensing), **reinforcement** (scheduling, beam management).

</div>

<div class="fragment">

**3.** ML for PHY:
- **Channel estimation** — matches MMSE without covariance, but degrades under model mismatch
- **Decoding** — offers latency improvements; classical LDPC/turbo remain near-optimal
- **Autoencoder** — discovers new constellations for non-linear channels
- **Channel modeling** — generative AI produces realistic training data

</div>

<div class="fragment">

**4.** ML for MAC:
- **Scheduling** — RL balances multiple objectives; small gain over PF in simple scenarios
- **Spectrum sensing** — ML beats energy detection under noise uncertainty
- **Beam management** — 8× measurement reduction

</div>

<div class="fragment">

**5.** **Federated learning** — privacy-preserving training without centralizing data. 200× less bandwidth, 0.5 dB accuracy loss.

</div>

<div class="fragment">

**6.** **Practical challenges:** data scarcity, generalization, latency, interpretability, standardization.

</div>

<div class="fragment">

**7.** **Standardization:** 3GPP Release 18 includes ML for beam management, energy, load balancing. O-RAN RIC provides deployment platform.

</div>

<div class="fragment">

**8.** **AI-native 6G** is the vision — ML across all layers.

</div>

---

## Course complete

<div class="fragment">

**ECEG-6412 — Recent Trends in Communication Technologies**

You now understand:

- The wireless propagation channel
- Modulation, coding, multiple access
- GSM, UMTS, 4G/LTE, 5G
- The wired infrastructure
- Emerging trends: IoT, LPWAN, ML for communications

</div>

<div class="fragment">

**The unifying theme:** every generation adds a new PHY technique and a new application class — driven by the same fundamental Shannon trade-off.

</div>

<div class="fragment">

**The future:** 6G, AI-native networks, THz communication, integrated sensing — the next decade.

</div>

<div class="fragment">

**Good luck with your final examination.**

</div>

---

<aside class="notes">
  <div style="font-size: 16px; line-height: 1.6;">

**Speaker notes for the whole lecture:**

- Slides 4–7 (ETI mission, where ML helps): ~6 min. Emphasize the **three properties** — non-linear approximation, end-to-end optimization, data-driven modeling. And the **three limits** — optimal classical solutions, data scarcity, interpretability.
- Slides 8–11 (ML fundamentals): ~5 min. Don't spend too long on the general ML basics — students have seen this in other courses. Focus on **why communications data is different** (model-reality gap).
- Slides 12–17 (channel estimation + decoding): ~10 min. Emphasize **where ML wins and where it doesn't** — matched-covariance MMSE is already near-optimal; ML's value is when statistics are unknown or channel is non-stationary.
- Slides 18–22 (autoencoder + channel modeling): the most conceptually interesting material. **The autoencoder learns QPSK for AWGN** — a beautiful result showing ML recovers classical optimal. **Where it wins is non-linear channels.**
- Slides 23–27 (MAC): scheduling (small gains over PF), spectrum sensing, beam management (big gains — 8× reduction).
- Slides 28–30 (federated learning): the privacy story. **200× less bandwidth** at 0.5 dB loss is a real-world trade-off.
- Slides 31–34 (challenges + deployment): **the gap between research and deployment** is important. Most papers show simulation gains; most production deployments are small, focused ML models.
- Slides 35–37 (AI-native 6G): the future. Keep it brief — it's aspirational.

**The final exam may test: three ML paradigms, when ML beats classical, autoencoder on AWGN, federated learning privacy, three 5G use cases (recap from Ch 6), and the ETI mission.**

**Course complete.** With this deck, ECEG-6412 has:

- 8 content chapters (Ch 1–7 + wired-trends)
- 7 slide decks (Ch 1–7)
- Exam bank (100 marks)
- Solutions for all 8 chapters
- Full syllabus, schedule, assessment, resources, feedback

The course site is ready to deploy.

  </div>
</aside>