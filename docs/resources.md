# Resources — ECEG-6412

References depend on the selected topics. The list below is curated across all
seven chapters — a common shelf for the whole course.

---

## Core textbooks

### Wireless fundamentals

- **T. S. Rappaport**, *Wireless Communications: Principles and Practice*, 2nd ed., Prentice Hall, 2002 — the standard first text; Chapters 3–5 (propagation, modulation, equalization), Chapters 9–10 (multiple access, cellular).
- **A. F. Molisch**, *Wireless Communications*, 2nd ed., Wiley, 2011 — modern and comprehensive; excellent on the channel and on MIMO.
- **D. Tse & P. Viswanath**, *Fundamentals of Wireless Communication*, Cambridge, 2005 — the information-theoretic view; free PDF online.
- **S. Haykin & M. Moher**, *Modern Wireless Communications*, Prentice Hall, 2004 — good balance of theory and systems.

### Cellular systems

- **G. Heine & H. Sagkob**, *GPRS: Gateway to Third Generation Mobile Networks*, Artech, 2003 — GSM/GPRS/EDGE detail.
- **H. Holma & A. Toskala**, *WCDMA for UMTS: HSPA Evolution and LTE*, 5th ed., Wiley, 2010 — the definitive UMTS/HSPA reference.
- **H. Holma & A. Toskala**, *LTE for UMTS: Evolution to LTE-Advanced*, Wiley, 2011 — LTE companion volume.
- **S. Sesia, I. Toufik & M. Baker**, *LTE — The UMTS Long Term Evolution: From Theory to Practice*, 2nd ed., Wiley, 2011 — practical, engineering-focused LTE reference.
- **E. Dahlman, S. Parkvall & J. Sköld**, *5G NR: The Next Generation Wireless Access Technology*, 2nd ed., Academic Press, 2020 — the definitive 5G NR reference.
- **A. Osseiran, J. F. Monserrat & P. Marsch (eds.)**, *5G Mobile and Wireless Communications Technology*, Cambridge, 2016 — the METIS/5G-PPP view.

### Multiple access, modulation, coding

- **J. G. Proakis & M. Salehi**, *Digital Communications*, 5th ed., McGraw-Hill, 2007 — the classical digital-comms reference.
- **S. Benedetto & E. Biglieri**, *Principles of Digital Transmission*, Kluwer, 1999.
- **R. G. Gallager**, *Principles of Digital Communication*, Cambridge, 2008 — information-theoretic foundations.
- **T. Richardson & R. Urbanke**, *Modern Coding Theory*, Cambridge, 2008 — LDPC, turbo, modern FEC.

### Emerging topics

- **S. Haykin**, *Cognitive Radio*, Wiley, 2015 — for the "recent trends" perspective.
- **O. Simeone**, *Machine Learning for Engineers*, Cambridge, 2022 — the ML-for-communications reference.
- **T. O'Shea & J. Hoydis**, "An Introduction to Deep Learning for the Physical Layer", *IEEE TCCN*, 2017 — the foundational paper.
- **L. Dai et al.**, "Deep Learning for Wireless Physical Layer: Opportunities and Challenges", *China Communications*, 2017.
- **N. Shlezinger et al.**, "Model-Based Deep Learning: On the Intersection of Deep Learning and Optimization", *IEEE Signal Processing Magazine*, 2022.

---

## Standards (primary sources)

The 3GPP specifications are the authoritative source for GSM/UMTS/LTE/5G. Free
PDFs from [3gpp.org](https://www.3gpp.org/specifications).

| Series | Subject |
|---|---|
| 3GPP TS 25.xxx | UMTS (WCDMA) — architecture, PHY, RRC, protocols |
| 3GPP TS 36.xxx | LTE — architecture, PHY, MAC, RRC |
| 3GPP TS 38.xxx | 5G NR — architecture, PHY, MAC, RRC |
| 3GPP TS 23.xxx | System architecture across generations |
| 3GPP TS 24.xxx | Signalling protocols |
| ITU-T E.164 | Numbering plan |
| IEEE 802.11 | WLAN (WiFi) |
| IEEE 802.15.1 | Bluetooth |
| IEEE 802.15.4 | ZigBee / low-rate WPAN |
| IEEE 802.16 | WiMAX |

For GSM, a good book is more digestible than the specs:
- **M. Mouly & M.-B. Pautet**, *The GSM System for Mobile Communications*, Cell & Sys, 1992 — the classical, authoritative GSM reference (still the best pedagogical treatment; hard to find but free PDFs circulate).

---

## Free online materials

- **Tse & Viswanath**, *Fundamentals of Wireless Communication* — [web.stanford.edu/~dntse](https://web.stanford.edu/~dntse/) — free PDF.
- **MIT 6.450** — *Principles of Digital Communications I* (OCW) — the modulation and coding foundations.
- **Stanford EE359** — *Wireless Communications* (Andrea Goldsmith's course) — the closest match to Chapter 1.
- **3GPP** — [3gpp.org](https://www.3gpp.org/) — the specifications; also the "3GPP overview" tutorials.
- **ITU-R M.2412** — the IMT-2020 evaluation methodology (5G).
- **NIST 5G/6G resources** — for the emerging-trends perspective.
- **IEEE ComSoc ETI on ML for Communications** — the reference for Chapter 7; whitepapers on PHY/MAC ML applications.
- **Wireless channel datasets** — the NYU Wireless 5G channel measurements at 28, 38, 60, 73 GHz; useful for realistic channel modelling.

---

## Software

| Language | Libraries | Use |
|---|---|---|
| Python | `numpy`, `scipy`, `matplotlib` | Channel simulation, link budgets, plotting |
| Python | `scikit-dsp-comm` (sk_dsp_comm) | Modulation, demodulation, BER analysis |
| Python | `gnuradio` + `pybombs` | SDR prototyping (if hardware available) |
| Python | `sionna` (NVIDIA) | Link-level simulation, ML for PHY |
| Python | `commpy` | Channel coding (convolutional, turbo, LDPC) |
| MATLAB | Communications Toolbox, 5G Toolbox | Reference implementations |
| Java | no dedicated library — hand-code | Educational comparison |
| C# | no dedicated library — hand-code | Educational comparison |

Install Python essentials:

```bash
pip install numpy scipy matplotlib
pip install scikit-dsp-comm
pip install commpy
```

---

## Datasets

- **NYU Wireless channel measurements** — [wireless.engineering.nyu.edu](https://wireless.engineering.nyu.edu/) — real mmWave channel data.
- **COST 2100 channel model** — software package, [cost2100.eu](http://www.cost2100.eu/) — MIMO channel generator.
- **3GPP channel model (TR 38.901)** — the standard model for 5G simulation.
- **QuaDRiGa** — geometry-based stochastic channel model (used in 5G standardization).
- **DeepMIMO** — deep-learning-oriented channel dataset for ML research.

---

## Recommended first-week reading

Before the first lecture:

- **Rappaport Ch 1** — historical overview and the wireless landscape.
- **Rappaport §3.1–3.3** — the propagation channel basics.
- **Tse & Viswanath Ch 1** — the wireless channel from an information-theoretic viewpoint.