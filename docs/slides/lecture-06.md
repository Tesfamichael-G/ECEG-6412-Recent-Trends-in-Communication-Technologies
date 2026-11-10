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

### Chapter 6 — Next Generation Networks (NGN)

MSc in Communication Engineering · Year 1, Semester I

Dr. Tesfamichael Gebregziabher

---

## Outline

<div class="fragment">

**Part 1 — What is an NGN?**

- From all-IP convergence to IoT
- The connectivity landscape

</div>

<div class="fragment">

**Part 2 — Short-range wireless (WPAN)**

- Bluetooth Classic and BLE
- ZigBee mesh for sensors
- UWB for precision ranging

</div>

<div class="fragment">

**Part 3 — Local wireless (WLAN)**

- WiFi 4/5/6/7 — the OFDMA evolution
- 6 GHz band, security

</div>

<div class="fragment">

**Part 4 — Long-range low-power (LPWAN)**

- LoRa, NB-IoT, Sigfox
- Battery life and range

</div>

<div class="fragment">

**Part 5 — 5G and IoT**

- The three use cases
- 5G NR PHY, 5G Core, network slicing, MEC

</div>

---

## Learning outcomes

<div class="fragment">

**LO1 — Explain what an NGN is**

Packet-based, all-IP, multi-service. Evolution from voice convergence to IoT.

</div>

<div class="fragment">

**LO2 — Compare WPAN technologies**

Bluetooth Classic vs. BLE vs. ZigBee — data rate, power, topology.

</div>

<div class="fragment">

**LO3 — Select WiFi generations**

WiFi 4/5/6/7 — the OFDMA step change, 6 GHz band.

</div>

<div class="fragment">

**LO4 — Explain UWB and LPWAN**

UWB's cm-precision; LoRa vs. NB-IoT vs. Sigfox.

</div>

<div class="fragment">

**LO5 — Describe 5G and IoT convergence**

eMBB, URLLC, mMTC; 5GC; network slicing; MEC.

</div>

<div class="fragment">

**LO6 — Choose the right connectivity**

For any IoT application — by range, rate, power, cost.

</div>

---

## §6.1 — What is an NGN?

<div class="fragment">

**NGN (Next Generation Network)** — the ITU-T definition (2004):

*A packet-based network able to provide telecommunication services using multiple broadband, QoS-enabled transport technologies, in which service functions are independent of transport technologies.*

</div>

<div class="fragment">

**Key principles:**

- Packet-based (all IP, no circuit switching)
- Service / transport separation
- QoS-enabled
- Any-access (fixed + mobile + wireless)
- Multi-service (voice, data, video, IoT)

</div>

<div class="fragment">

**The NGN concept broadened over 20 years** — from "voice over IP" to "everything over IP."

</div>

---

## The three stages of NGN evolution

<div class="fragment">

**Stage 1 (2000–2010) — All-IP convergence**

- Replace PSTN with VoIP
- Replace 2G/3G circuit cores with IP
- IMS for voice services

</div>

<div class="fragment">

**Stage 2 (2010–2020) — Fixed-mobile convergence (FMC)**

- Unified core for fixed and mobile (EPC)
- VoWiFi, LTE-WiFi aggregation
- 5G NSA/SA

</div>

<div class="fragment">

**Stage 3 (2020s) — IoT convergence**

- Billions of devices
- LPWAN + WiFi + 5G + edge computing
- Network slicing, MEC, ML for network management

</div>

<div class="fragment">

**Each stage adds a new connectivity class** — NGN is about making them all work together.

</div>

---

## The connectivity landscape

| Category | Range | Standard | Peak rate | Power |
|---|---|---|:---:|:---:|
| **WPAN** | 10–100 m | Bluetooth, ZigBee, UWB | 0.1–1 Gbps | Very low |
| **WLAN** | 30–100 m | WiFi 4/5/6/7 | 100 Mbps–30 Gbps | High |
| **WMAN** | 1–50 km | WiMAX, 5G FWA | 70 Mbps–1 Gbps | High |
| **WWAN** | 1–30 km | 4G LTE, 5G NR | 100 Mbps–20 Gbps | High |
| **LPWAN** | 2–15 km | LoRa, NB-IoT, Sigfox | 0.1–127 kbps | Extremely low |
| **Satellite** | global | GEO, LEO | 1–200 Mbps | — |

<div class="fragment">

**Each row is a different trade-off** between range, rate, and power. **No single technology wins everywhere.**

</div>

---

## §6.2 — Bluetooth Classic (BR/EDR)

<div class="fragment">

**Bluetooth Classic** — designed as a **cable replacement** for audio, peripherals, files.

</div>

<div class="fragment">

**Key parameters:**

| Parameter | Value |
|---|---|
| Frequency | **2.4 GHz ISM** |
| Channel spacing | 1 MHz, **79 channels** |
| Modulation | GFSK (BR), π/4-DQPSK, 8-DPSK (EDR) |
| Data rate | 1–3 Mbps |
| Range | Class 1: 100 m, Class 2: 10 m |
| Topology | **Piconet** (1 master + 7 slaves) |

</div>

<div class="fragment">

**The piconet:** master controls hopping sequence, slot timing, and access. Up to **7 active slaves**, more can be **parked**.

</div>

<div class="fragment">

**Frequency hopping: 1600 hops/s.** Resist interference from WiFi, ZigBee, microwaves — a narrowband interferer affects only 1/79 of slots.

</div>

---

## BLE — the IoT version

<div class="fragment">

**BLE (Bluetooth Smart)** — introduced in Bluetooth 4.0 (2010), fundamentally different radio optimized for IoT.

</div>

<div class="fragment">

| Aspect | Bluetooth Classic | BLE |
|---|---|---|
| Target use | Continuous data | Bursty sensor data |
| Channels | 79 × 1 MHz | **40 × 2 MHz** |
| Connection setup | ~seconds | **~3 ms** |
| Peak TX current | 30–40 mA | **~10 mA** |
| Standby | 100 μA–1 mA | **< 1 μA** |
| Data rate | 1–3 Mbps | 1–2 Mbps (BT 5.0) |
| Range | 10–100 m | 10–400 m (BT 5.0) |

</div>

<div class="fragment">

**BLE advertising:** peripherals broadcast advertisement packets; centrals scan or connect. **Advertising interval** from 20 ms to 10.24 s.

Lower interval = less power but higher latency.

</div>

---

## BLE battery life

<div class="fragment">

**Scenario:** Temperature sensor sends 10-byte reading every 10 s. TX 2 ms at 10 mA. Sleep 5 μA.

**Per transmission:** 2 ms × 10 mA = 0.00556 mAh.

**Per interval (10 s):** ~0.00557 mAh.

**Per hour:** 360 × 0.00557 = 2.0 mAh/h.

**Battery (1000 mAh coin cell):** ~500 hours ≈ **21 days**.

</div>

<div class="fragment">

**Optimization — 30 s interval + 5 mA TX:**

Per hour: 120 × 0.00278 = 0.334 mAh/h → **~3000 hours ≈ 125 days** (~4 months).

</div>

<div class="fragment">

**Realistic for IoT:** with event-driven (not periodic) transmission, **1–3 years** on a coin cell.

Longer life requires LPWAN (ZigBee, LoRa, NB-IoT).

</div>

---

## Checkpoint — Bluetooth Classic vs. BLE

<div class="quiz" data-question="ble-choice">
  <p class="quiz-question">Which application is best served by <strong>Bluetooth Classic</strong> (not BLE)?</p>
  <button class="quiz-option" data-answer="correct">Wireless headphones streaming audio continuously</button>
  <button class="quiz-option" data-answer="wrong">A temperature sensor sending 10 bytes every minute</button>
  <button class="quiz-option" data-answer="wrong">A fitness tracker syncing step counts to a phone</button>
  <button class="quiz-option" data-answer="wrong">A smart watch heart-rate monitor</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**The rule.** Continuous high-rate data (audio, file transfer) → **Classic**. Bursty, power-critical (sensors, wearables) → **BLE**. Classic provides ~2 Mbps continuous; BLE provides connection in 3 ms with < 1 μA standby.

</div>

---

## §6.3 — ZigBee — the mesh sensor network

<div class="fragment">

**ZigBee** (IEEE 802.15.4) — low-power, low-data-rate, **mesh-capable** WPAN designed for sensor networks.

</div>

<div class="fragment">

**Key parameters:**

| Parameter | Value |
|---|---|
| Frequency | 2.4 GHz (16 channels), 868/915 MHz |
| Modulation | OQPSK |
| Data rate | **250 kbps** (2.4 GHz) |
| Range | 10–100 m per hop |
| Topology | **Star, tree, or mesh** |
| Network capacity | **65,000+ nodes** |
| Sleep current | < 1 μA |

</div>

<div class="fragment">

**Three device types:**
- **Coordinator** — forms the network (exactly one)
- **Router** — forwards traffic, participates in mesh
- **End Device** — sensor/actuator; sleeps most of the time

</div>

---

## ZigBee mesh and AODV routing

<div class="fragment">

**Mesh topology:** any router can forward for any other. Extends range beyond individual node coverage.

</div>

<div class="fragment">

**AODV (Ad hoc On-demand Distance Vector):**

**1.** Source broadcasts **Route Request (RREQ)** — "who has the destination?"

**2.** Intermediate routers forward RREQ, adding their address.

**3.** Destination sends **Route Reply (RREP)** tracing the reverse path.

**4.** Routers cache the route for future use.

**5.** **Route Error (RERR)** propagates back if a link breaks; source sends new RREQ.

</div>

<div class="fragment">

**On-demand** — no proactive routing table. Saves energy for mostly-idle sensor networks.

</div>

---

## ZigBee vs. BLE

| Aspect | ZigBee | BLE |
|---|---|---|
| Topology | **Mesh** | Star (BLE Mesh is newer) |
| Data rate | 250 kbps | 1–2 Mbps |
| Range per hop | 10–100 m | 10–100 m |
| Network size | 65,000+ | ~10–20 typical |
| Sleep current | < 1 μA | < 1 μA |
| Latency | 15–30 ms | 3 ms |
| **Best for** | **Sensor networks** | **Phone-tethered IoT** |

<div class="fragment">

**Rule of thumb:** ZigBee when many devices need mesh coverage; BLE when the device talks to a phone or the network is small.

</div>

---

## §6.4 — WiFi — the local wireless standard

<div class="fragment">

WiFi (IEEE 802.11) dominates local wireless — home, office, public hotspot.

</div>

<div class="fragment">

**The naming:** IEEE uses 802.11ac; WiFi Alliance introduced **WiFi 4, 5, 6, 7** for consumers.

</div>

<div class="fragment">

| Standard | Year | Brand | Band | Peak |
|:---:|:---:|:---:|:---:|:---:|
| 802.11n | 2009 | **WiFi 4** | 2.4/5 | 600 Mbps |
| 802.11ac | 2013 | **WiFi 5** | 5 | 6.9 Gbps |
| 802.11ax | 2019 | **WiFi 6** | 2.4/5 | 9.6 Gbps |
| 802.11be | 2024 | **WiFi 7** | 2.4/5/6 | 46 Gbps |

</div>

---

## WiFi 6 — the OFDMA step change

<div class="fragment">

**WiFi 6** (802.11ax) — the biggest change since WiFi 4:

**OFDMA** — the AP allocates **resource units (RUs)** to multiple users simultaneously.

</div>

<div class="fragment">

**WiFi 5 vs. WiFi 6:**

- **WiFi 5:** one user per transmission (MU-MIMO limited to 4 DL streams)
- **WiFi 6:** ~30 RUs per 80 MHz channel → **30 simultaneous users** per transmission

</div>

<div class="fragment">

**Why it matters:** WiFi 6's benefit is **capacity in dense environments**, not peak rate per user. A stadium or airport full of people no longer collapses the network.

</div>

<div class="fragment">

**WiFi 6 also adds:** MU-MIMO uplink, 1024-QAM, TWT (Target Wake Time for IoT power saving), 4× longer OFDM symbol (fewer guard bands).

</div>

---

## WiFi 6E and WiFi 7

<div class="fragment">

**WiFi 6E** — WiFi 6 extended to the **6 GHz band** (5.925–7.125 GHz).

- **59 × 20 MHz channels**, or 14 × 160 MHz.
- **No legacy devices** — every WiFi 6E device supports 6 GHz.
- Clean spectrum → much better performance in dense environments.

</div>

<div class="fragment">

**WiFi 7** (802.11be) — the next leap:

- **320 MHz channels** (in 6 GHz)
- **4096-QAM** (12 bits/symbol)
- **Multi-Link Operation (MLO)** — simultaneous transmission on 2.4 + 5 + 6 GHz
- **16×16 MIMO**

</div>

<div class="fragment">

**Peak:** ~46 Gbps theoretical.

**Practical:** MLO aggregation across bands reaches ~20 Gbps — enough for 8K VR, heavy AR.

</div>

---

## Checkpoint — WiFi 6's key innovation

<div class="quiz" data-question="wifi6">
  <p class="quiz-question">What is WiFi 6's (802.11ax) <strong>key PHY innovation</strong> for dense environments?</p>
  <button class="quiz-option" data-answer="wrong">Higher-order QAM (1024-QAM)</button>
  <button class="quiz-option" data-answer="correct">OFDMA — multiple users served simultaneously via resource units</button>
  <button class="quiz-option" data-answer="wrong">New 6 GHz band</button>
  <button class="quiz-option" data-answer="wrong">Wider 160 MHz channels</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** WiFi 5 and earlier served **one user per transmission** (OFDM, even with MU-MIMO limited to 4 streams). WiFi 6's OFDMA splits a channel into **resource units** — each serving a different user simultaneously. This doesn't increase peak rate per user, but it **multiplies capacity** in crowded scenarios.

</div>

---

## §6.5 — UWB — precision positioning

<div class="fragment">

**Ultra-Wideband (UWB)** — transmits **very short pulses** (< 1 ns) across a **wide bandwidth** (> 500 MHz), at very low power.

</div>

<div class="fragment">

**FCC definition:** fractional bandwidth > 20% or absolute bandwidth > 500 MHz, at power below −41.3 dBm/MHz.

</div>

<div class="fragment">

**Why wide bandwidth matters:** a pulse of duration $\tau$ has bandwidth $\approx 1/\tau$. A 1 ns pulse = **1 GHz bandwidth**.

Fourier transform gives the physics for free.

</div>

<div class="fragment">

**Key property — precise ranging:**

$$
\boxed{\;\Delta d \approx \frac{c}{2B}\;}
$$

For $B = 1$ GHz: $\Delta d \approx$ **15 cm**.

For $B = 500$ MHz: **30 cm**.

</div>

<div class="fragment">

**Timing precision** — a 100 ps timing error → 1.5 cm distance error. Modern UWB chips achieve < 100 ps.

</div>

---

## UWB applications

<div class="fragment">

**High-precision indoor positioning:**

- **Apple AirTag, Samsung SmartTag+** — cm-level direction and distance, far better than Bluetooth RSSI (~1 m precision).
- **Smart home** — precise location of people and objects.
- **Warehouse logistics** — track items to cm.

</div>

<div class="fragment">

**Secure car access:**

- Digital car keys use UWB ranging to verify the key is actually nearby.
- **Defeats relay attacks** — Bluetooth RSSI can be fooled by a remote relay; UWB's time-of-flight cannot.

</div>

<div class="fragment">

**Industrial positioning:**

- Robots, tools, people in factories, mines, warehouses.
- 10 cm precision — better than any narrowband system.

</div>

<div class="fragment">

**Standard:** IEEE 802.15.4z — supports **HRP** (high rate) and **LRP** (low rate) UWB, with **secure ranging** (STS — scrambled timestamp sequence).

</div>

---

## §6.6 — LPWAN — long-range, low-power IoT

<div class="fragment">

**The gap:** between WiFi (short-range, high-rate) and cellular (long-range, high-rate, power-hungry) there's an unfilled niche:

**Long-range, very low power, low data rate, battery-powered.**

That's **LPWAN** — Low-Power Wide-Area Network.

</div>

<div class="fragment">

**Three main technologies:**

| Tech | Frequency | Rate | Range | Battery |
|---|---|:---:|:---:|:---:|
| **LoRa** | Sub-GHz ISM | 0.3–37.5 kbps | 2–15 km | 10+ yr |
| **NB-IoT** | Licensed LTE | 26–127 kbps | 1–10 km | 5–10 yr |
| **Sigfox** | Sub-GHz ISM | 100 bps | 3–50 km | 10+ yr |

</div>

---

## LoRa — chirp spread spectrum

<div class="fragment">

**LoRa** = Long Range. PHY is proprietary (Semtech); **LoRaWAN** MAC is open.

</div>

<div class="fragment">

**Chirp Spread Spectrum (CSS)** — each symbol is a **frequency chirp**.

**Spreading factor (SF7–SF12)** controls chirp rate:

- **Higher SF = longer range but lower data rate**
- SF12: 250 bps, −137 dBm sensitivity, 15 km
- SF7: 5.5 kbps, −123 dBm sensitivity, 2 km

</div>

<div class="fragment">

**The trade-off in one table:**

| SF | Data rate | Sensitivity | Range |
|:---:|:---:|:---:|:---:|
| 7 | 5.5 kbps | −123 dBm | 2 km |
| 9 | 1.8 kbps | −129 dBm | 6 km |
| 11 | 0.5 kbps | −134 dBm | 10 km |
| 12 | 0.25 kbps | −137 dBm | 15 km |

</div>

<div class="fragment">

**LoRaWAN network:** end devices → gateways → network server → application server.

**License-free** — anyone can deploy a private LoRaWAN network.

</div>

---

## NB-IoT — cellular for IoT

<div class="fragment">

**NB-IoT** — the 3GPP IoT standard (Release 13, 2016).

**180 kHz bandwidth** (a single LTE resource block) in licensed spectrum.

</div>

<div class="fragment">

**Key features:**

- **Data rate:** 26 kbps UL, 127 kbps DL
- **Coverage extension:** **+20 dB** over LTE via repetitions (range ~10–15 km)
- **Power Saving Mode (PSM):** device sleeps up to **413 days**
- **eDRX:** extended DRX, up to 2.9 hours between wake-ups
- **Battery:** 5–10 years

</div>

<div class="fragment">

**Advantages over LoRa:**

- **Licensed spectrum** — no interference, guaranteed QoS
- **Operator-managed** — no gateways to deploy
- **Higher data rate** (~100 kbps vs. ~5 kbps)
- **Global roaming** via operator's network

</div>

<div class="fragment">

**Disadvantages:** needs cellular coverage; monthly fee; higher device cost.

</div>

---

## Checkpoint — LoRa vs. NB-IoT

<div class="quiz" data-question="lora-nbiot">
  <p class="quiz-question">A municipality wants to deploy <strong>100,000 water meters</strong> in a city with good cellular coverage. Which LPWAN technology is the simpler choice?</p>
  <button class="quiz-option" data-answer="wrong">LoRa — needs custom gateways</button>
  <button class="quiz-option" data-answer="correct">NB-IoT — uses existing cellular infrastructure, licensed spectrum, operator manages it</button>
  <button class="quiz-option" data-answer="wrong">Sigfox — very long range</button>
  <button class="quiz-option" data-answer="wrong">WiFi — better in urban areas</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** LoRa is more power-efficient and license-free, but requires deploying gateways (capital + maintenance) and running a private network. **NB-IoT** rides on the operator's existing LTE infrastructure — no gateways, no private network operation, licensed spectrum (no interference), and centralized management. For a city-wide meter rollout, this is far simpler.

</div>

---

## §6.7 — 5G and IoT — the converged vision

<div class="fragment">

**5G's three use cases (ITU-R IMT-2020):**

**eMBB** — enhanced Mobile Broadband
- Peak: 20 Gbps; user rate: 100 Mbps–1 Gbps
- 4K/8K video, AR/VR, cloud gaming

</div>

<div class="fragment">

**URLLC** — Ultra-Reliable Low-Latency Communication
- Latency: **1 ms**; reliability: **99.999%**
- Industrial automation, remote surgery, autonomous driving

</div>

<div class="fragment">

**mMTC** — massive Machine-Type Communication
- Density: **1M devices/km²**; battery 10+ years
- IoT sensors, smart city, agriculture

</div>

<div class="fragment">

**The three pull in different directions.** 5G NR and the 5G Core are designed to **serve all three on the same network** — via network slicing.

</div>

---

## 5G NR — the new radio

<div class="fragment">

**5G NR (New Radio)** — new PHY introduced in 3GPP Release 15 (2018).

</div>

<div class="fragment">

| Aspect | LTE | **5G NR** |
|---|---|---|
| Frequency | < 6 GHz | **< 6 GHz (FR1) + mmWave 24–52 GHz (FR2)** |
| Subcarrier spacing | 15 kHz fixed | **15, 30, 60, 120, 240 kHz** (scalable) |
| Channel bandwidth | up to 20 MHz | up to **100 MHz (FR1), 400 MHz (FR2)** |
| MIMO | up to 8×8 | **up to 256 antennas** (massive MIMO) |
| Modulation | up to 256-QAM | up to **1024-QAM** |
| Peak DL | 3 Gbps | **20 Gbps** |

</div>

<div class="fragment">

**Scalable numerology** — the key 5G innovation. Different subcarrier spacings for different scenarios:

- 15 kHz — wide-area coverage
- 30 kHz — urban 5G
- 60/120 kHz — low-latency, mmWave

</div>

---

## Massive MIMO and mmWave

<div class="fragment">

**Massive MIMO:** 64–256 antenna elements at the base station.

- Beamforming gain: **18–24 dB**
- Multi-user MIMO: up to 16 UEs simultaneously
- **3D beamforming:** both horizontal and vertical steering

</div>

<div class="fragment">

**mmWave (FR2):** 400 MHz channels → 8× wider than Sub-6 → enables 20 Gbps peak.

But mmWave has trade-offs:

- **High path loss** (~30 dB more than 2 GHz at 1 km — Chapter 1)
- **Blockage** (rain, hands, walls)
- **Short range** (100–300 m)
- Requires **dense small cells**

</div>

<div class="fragment">

**The combined effect:** massive MIMO beamforming (+18 dB) offsets most of mmWave's path loss penalty. Net: mmWave cells are **dense** but **high-capacity** — the right tool for stadiums, airports, dense urban.

</div>

---

## 5G Core — service-based architecture

<div class="fragment">

**5G Core (5GC)** — fundamental redesign from LTE's EPC.

**Instead of network elements with point-to-point interfaces**, 5GC uses **Network Functions (NFs)** connected by **Service-Based Interfaces (SBI)** — essentially **microservices**.

</div>

<div class="fragment">

**Key NFs:**

| Function | Role |
|---|---|
| **AMF** | Access & Mobility (registration, handover) |
| **SMF** | Session Management (PDU sessions) |
| **UPF** | User Plane Function (packet forwarding) |
| **AUSF** | Authentication |
| **UDM** | Subscriber data (like HSS) |
| **PCF** | Policy & charging |
| **NSSF** | Network Slice Selection |
| **NRF** | NF Repository (service discovery) |

</div>

<div class="fragment">

**Cloud-native:** 5GC runs on **containers** in a data center, orchestrated by **Kubernetes**. Updated without touching the radio.

</div>

---

## Network slicing

<div class="fragment">

**Network slicing** — 5G's flagship feature.

**Virtual, isolated networks** on the same physical infrastructure, each with its own QoS, resources, and topology.

</div>

<div class="fragment">

**Each slice has:**

- Its own **QoS/KPIs** (latency, throughput, reliability)
- Its own **network functions** (or shared, isolated by slice)
- Its own **resource allocation** (spectrum, compute, backhaul)
- Its own **management**

</div>

<div class="fragment">

**Example slices:**

- **eMBB slice** — high throughput, moderate latency
- **URLLC slice** — 1 ms latency, 99.999% reliability
- **mMTC slice** — massive device count, low power

</div>

<div class="fragment">

**New business model:** before slicing, all traffic shared one network. An industrial customer wanting 1 ms latency was at the mercy of consumers streaming video. **Slicing lets the operator sell dedicated capacity** — a new product.

</div>

---

## Checkpoint — Network slicing

<div class="quiz" data-question="nss">
  <p class="quiz-question">What does <strong>network slicing</strong> allow a 5G operator to do?</p>
  <button class="quiz-option" data-answer="wrong">Increase peak data rate beyond 20 Gbps</button>
  <button class="quiz-option" data-answer="correct">Sell dedicated virtual networks with guaranteed QoS (latency, reliability) on shared infrastructure</button>
  <button class="quiz-option" data-answer="wrong">Eliminate the need for base stations</button>
  <button class="quiz-option" data-answer="wrong">Reuse LTE spectrum for 5G</button>
  <p class="quiz-feedback"></p>
</div>

<div class="fragment">

**Why.** Before slicing, all traffic competed on one network. Slicing creates **isolated virtual networks** on shared physical infrastructure — each with its own QoS, resources, and management. The operator can sell a **URLLC slice** to a factory with 1 ms guaranteed latency, while consumers on the eMBB slice stream video. **Two products, one infrastructure.**

</div>

---

## Edge computing — 5G's partner

<div class="fragment">

**MEC (Multi-access Edge Computing)** — compute resources at cell towers or local data centers, close to the user.

</div>

<div class="fragment">

**Why 5G needs it:** 5G's 1 ms air-interface latency is **useless** if the application server is 1000 km away (adds 20+ ms network round-trip).

**MEC** puts the server **at the edge** → full end-to-end latency in 5–10 ms.

</div>

<div class="fragment">

**Use cases:**

- **AR/VR** — sub-20 ms end-to-end
- **Industrial control** — 1 ms loops
- **Autonomous vehicles** — safety-critical, local
- **Cloud gaming** — low-latency rendering

</div>

<div class="fragment">

**5G + MEC = a new platform** — network + compute at the edge, for real-time applications.

</div>

---

## §6.8 — Choosing the right connectivity

<div class="fragment">

For any IoT application, four parameters determine the choice:

| Parameter | Options |
|---|---|
| **Range** | 10 m (WPAN) → 100 m (WLAN) → 15 km (LPWAN) → global (satellite) |
| **Data rate** | 0.1 kbps (Sigfox) → 30 Gbps (WiFi 7) |
| **Power** | < 1 μA (BLE sleep) → 40 W (macro base station) |
| **Cost** | $1 module (BLE) → $100 module (5G mmWave) |

</div>

<div class="fragment">

**Decision flowchart:**

1. **High data rate (> 1 Mbps)?** → WiFi (local) or 4G/5G (mobile)
2. **Range > 100 m?** → Licensed? NB-IoT : LoRa
3. **Battery-powered & low duty cycle?** → BLE / ZigBee / LoRa
4. **Latency-critical?** → Cellular (4G/5G)

</div>

---

## Worked example — agricultural sensors

<div class="fragment">

**Application:** Soil moisture sensor. 50 bytes/hour. Field 1 km wide. Solar/battery powered. 100 devices.

</div>

<div class="fragment">

**Requirements:**

- Data rate: 50 bytes/hour = **0.11 bps** (very low)
- Range: **1+ km**
- Power: **solar/battery — years**
- Cost: **many devices — must be cheap**

</div>

<div class="fragment">

**Options:**

- WiFi → ❌ 100 m range
- Bluetooth → ❌ 100 m range
- ZigBee → ❌ range too short, needs backhaul
- **LoRa** → ✅ 10+ km range, low power, low cost
- **NB-IoT** → ✅ 10 km range, low power, needs subscription
- Sigfox → ✅ 30+ km, ultra-low rate, ultra-low power

</div>

<div class="fragment">

**Best fit:** **LoRaWAN** — private gateway at the farmhouse (solar-powered), 100 sensors use LoRa. No subscription fees. 5+ year battery life on AA cells.

**Alternative:** NB-IoT if cellular coverage is reliable and a monthly subscription is acceptable.

</div>

---

## Chapter 6 — key takeaways

<div class="fragment">

**1.** **NGN** = packet-based, all-IP, multi-service. Evolved from voice convergence (2000s) to IoT convergence (2020s).

</div>

<div class="fragment">

**2.** **Bluetooth Classic** for continuous data (audio); **BLE** for bursty sensor data. 3 ms connection, < 1 μA sleep.

</div>

<div class="fragment">

**3.** **ZigBee** — mesh, AODV routing, 65,000+ nodes. Dominant in home and industrial automation.

</div>

<div class="fragment">

**4.** **WiFi 6** brings **OFDMA** — the biggest change since WiFi 4. Improves capacity in dense environments, not peak rate.

</div>

<div class="fragment">

**5.** **UWB** — impulse radio, ~10 cm positioning. Used in AirTags, car keys, warehouse tracking.

</div>

<div class="fragment">

**6.** **LPWAN** — LoRa (unlicensed), NB-IoT (licensed), Sigfox (ultra-low-rate). IoT connectivity for years of battery life.

</div>

<div class="fragment">

**7.** **5G NR** — scalable numerology, massive MIMO, mmWave. Three use cases: eMBB, URLLC, mMTC.

</div>

<div class="fragment">

**8.** **5G Core + network slicing + MEC** — cloud-native, service-based, sells dedicated QoS — the platform for enterprise IoT.

</div>

---

## Next — Chapter 7

**Machine Learning for Communications**

<div class="fragment">

- The ETI (Emerging Technology Initiative) mission
- ML for the PHY: channel estimation, decoding, autoencoders
- ML for the MAC: scheduling, spectrum access, beam management
- Federated learning across devices
- AI-native 6G vision

</div>

<div class="fragment">

**The emerging frontier — how ML is reshaping every layer of the network.**

</div>

---

<aside class="notes">
  <div style="font-size: 16px; line-height: 1.6;">

**Speaker notes for the whole lecture:**

- Slides 4–7 (NGN definition, three stages, landscape): ~6 min. Emphasize the **broadening scope** — NGN went from "voice over IP" to "everything over IP."
- Slides 8–14 (Bluetooth Classic, BLE, battery life): ~8 min. The Classic vs. BLE distinction is critical — audio needs Classic, sensors need BLE.
- Slides 15–17 (ZigBee): ~5 min. Mesh + AODV routing is the key concept. Emphasize **on-demand** routing for power saving.
- Slides 18–22 (WiFi): ~6 min. **WiFi 6's OFDMA** is the biggest change. Don't dwell on peak rate (9.6 Gbps sounds impressive but the real benefit is capacity).
- Slides 23–25 (UWB): ~3 min. Emphasize the **physics** — wide bandwidth → fine time resolution → cm precision.
- Slides 26–29 (LPWAN): ~6 min. LoRa vs. NB-IoT vs. Sigfox — the trade-off table is the essential content.
- Slides 30–36 (5G/IoT): ~10 min. The three use cases (eMBB, URLLC, mMTC) and **network slicing** are the key concepts. **MEC** completes the story — 5G latency without edge compute is useless.
- Slides 37–39 (choosing connectivity): practical. Use the worked example to show students how to reason about the choice.

**The exam will test: BLE vs. Classic, ZigBee mesh vs. BLE star, WiFi 6 OFDMA, LPWAN comparison, 5G three use cases, network slicing.**

  </div>
</aside>