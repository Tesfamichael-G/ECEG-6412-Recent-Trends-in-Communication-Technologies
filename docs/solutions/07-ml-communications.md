# Solutions to Chapter 7 — ML for Communications

[:octicons-arrow-left-24: Back to Chapter 7](../chapters/07-ml-communications.md)

---

## 1. Data generation and channel estimation

**Approach:** Generate 10,000 channels from 3GPP TR 38.901 EPA model with random SNRs in [0, 20] dB. Transmit QPSK pilots. Train a small CNN (~50k parameters) to map received pilots → channel estimate.

**Expected result:** at 10 dB SNR, ML NMSE ≈ **−13 to −14 dB**, matching MMSE with known covariance (−14 dB). LS baseline is −8 dB. **ML saves ~5 dB without needing covariance**.

**If training distribution mismatches:** if trained on EPA but evaluated on ETU (different delay profile), NMSE drops to ~−10 dB — the model-reality gap is real.

---

## 2. Autoencoder for AWGN and non-linear channel

**AWGN:** Training 4-layer encoder/decoder over 100k random bits. After 10k epochs, learned constellation has 4 points, roughly QPSK. BER vs. SNR matches QPSK theory within 0.2 dB — **the network discovers QPSK**.

**Non-linear channel:** Same setup but with clip at amplitude 1.0. The learned constellation is not QPSK — points are stretched and offset to compensate. BER improves **~5 dB** over classical 16-QAM (which was optimized for linear AWGN).

---

## 3. RL scheduler

**Approach:** Implement Q-learning with state = (channel quality vector, queue lengths), action = which UE to serve, reward = throughput with fairness bonus.

**Result after 1M TTI:**
- Cell throughput: RL ~27 Mbps vs. PF ~26 Mbps (+4%)
- Jain fairness: RL 0.82 vs. PF 0.85 (slightly less fair)
- Convergence time: ~100k TTI to reach stable policy

**RL wins slightly over PF** in throughput, at the cost of fairness. Not a huge win — PF is already near-optimal for simple scenarios. RL wins more when multiple objectives (delay + throughput) must be balanced.

---

## 4. Federated learning

**Setup:** 10 UEs, each with different channel model (EPA, ETU, EVA, etc.).

**Results:**
- **Centralized:** -15 dB NMSE (but requires all raw data).
- **FedAvg:** -14.2 dB NMSE (0.8 dB worse, but privacy-preserved).
- **Local-only per-device:** -11 dB NMSE (fails on other channels — no generalization).

**FL preserves 95% of centralized accuracy** while keeping data on devices. **Communication rounds:** 50 rounds × 0.5 MB per round per device = 25 MB total — vs. 10 GB raw data.

---

## 5. Beam prediction with LSTM

**Setup:** Mobile trajectory through cell, 32-beam codebook, 3 previous beams + GPS position as input.

**Results:**
- **Exhaustive search:** 100% accuracy, 32 measurements.
- **Hierarchical (classical):** 92% accuracy, 15 measurements.
- **LSTM (ML):** **94% accuracy**, **6 measurements**.

**Measurement reduction: 5×.** Latency: 6 ms (beam alignment time) vs. 32 ms exhaustive — enables high-mobility tracking.

---

## 6. GAN for channel modeling

**Setup:** Train GAN on 3GPP EPA channel realizations. Generate 10,000 new channels.

**Comparison:**
- PDP shape: matches (RMS error ~2 dB across delays).
- RMS delay spread distribution: matches well.
- Doppler spectrum: matches.
- **Key test:** train a channel estimator on GAN-generated data, test on real channels — accuracy within 0.5 dB of training on real channels directly.

**Result:** GAN can substitute for expensive channel measurements in training data generation.

---

## 7. Deep unfolding for sparse recovery

**Setup:** ISTA algorithm unrolled into 3-layer network. Train on 5000 channel samples (sparse in delay-Doppler).

**Results:**
- **ISTA (plain):** NMSE −12 dB at 20 dB SNR.
- **OMP (classical sparse):** NMSE −14 dB.
- **Unfolded ISTA:** NMSE **−16 dB**.

**Unfolded network learns better thresholding/regularization** than classical ISTA — 4 dB better than ISTA, 2 dB better than OMP.

---

## 8. Modulation classification (RadioML)

**Setup:** CNN on raw IQ, trained on 100k samples across 10 modulations (BPSK, QPSK, 8-PSK, 16-QAM, 64-QAM, GFSK, CPFSK, PAM4, QAM16, QAM64), SNR range −20 to 20 dB.

**Results:**
- **High SNR (>10 dB):** >95% accuracy.
- **Medium SNR (0–10 dB):** 70–95%.
- **Low SNR (<0 dB):** 30–60% (fails on hard cases).

**ML matches expert-designed classifiers at high SNR; at low SNR, deep learning has more headroom** (learned features are more robust than hand-crafted statistics).

---

## 9. DeepMIMO experiment

**Setup:** Scenario O1 (outdoor urban), 64-antenna BS, downlink 100 MHz. Train CNN for CSI compression: input = 64×64 channel matrix, output = 32-bit compressed, then reconstruct.

**Results:**
- **Compressed sensing (classical):** NMSE −15 dB at 1/8 compression ratio.
- **Autoencoder (ML):** NMSE −18 dB at same ratio.

**3 dB improvement** over classical compressed sensing — the learned codebook captures structure that the sparsity prior misses.

---

## 10. Explainability of channel estimation CNN

**Visualization:** First-layer filters of the trained CNN resemble classical DFT basis functions. Deeper layers show more complex, learned patterns.

**SHAP analysis:** The network's predictions are most sensitive to pilot symbols near the target (as expected), but also to **pilots at other frequencies** — reflecting the frequency-domain correlation the network learned.

**No "shortcuts"** (e.g., memorizing specific noise patterns) — the network has learned a generalizable channel estimator.

---

## 11. Federated differential privacy

**Setup:** Extend FL experiment with Gaussian noise addition (σ controls ε).

**Results:**

| ε | Privacy | NMSE (dB) | Utility loss |
|:---:|---|:---:|---|
| ∞ (no DP) | None | −14.2 | 0 |
| 10 | Weak | −14.1 | 0.1 dB |
| 1 | Moderate | −13.8 | 0.4 dB |
| 0.1 | Strong | −11.2 | 3 dB |

**Trade-off:** strong privacy (small ε) requires more noise, degrades accuracy. For most practical applications, ε = 1–10 gives acceptable privacy with minimal accuracy loss.

---

## 12. Real SDR

**Setup:** USRP X310 + GNU Radio + Python ML, urban outdoor.

**Collect:** 30 min of pilot signals at 3.5 GHz with known transmitted pilots → ~100,000 training samples.

**Train:** Small CNN (30k parameters), int8-quantized for deployment.

**Deploy:** ML receiver vs. classical LS + MMSE in real-time.

**Results:**
- **LS:** NMSE −7 dB.
- **ML (trained on 3GPP simulation):** NMSE −10 dB (fails to close the gap — model-reality).
- **ML (fine-tuned on 100 real samples):** NMSE **−13 dB**.

**Key lesson:** the model-reality gap is real, but **transfer learning with a small amount of real data** closes most of it. **Domain adaptation is essential for real deployment.**