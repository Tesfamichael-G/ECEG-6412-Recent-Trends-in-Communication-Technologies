# Chapter 6 — Next Generation Networks (NGN)

!!! abstract "Chapter at a glance"
    **Contact hours:** 3 lecture · **Home study:** 7 h · **Part IV — Emerging technologies**
    
    **Coverage (syllabus):** overview of next generation networks · personal area
    networks (Bluetooth and ZigBee) · wireless data services (WiFi) · UWB ·
    5G mobile network technology and the Internet of Things (IoT).

---

## Learning outcomes

By the end of this chapter you should be able to:

1. Explain what **Next Generation Networks (NGN)** means and how the concept
   evolved from all-IP convergence to the IoT era.
2. Describe **Bluetooth** Classic and BLE — piconet topology, protocols, data
   rates, and power profiles — and choose between them for a given application.
3. Analyse **ZigBee** — mesh topology, IEEE 802.15.4 PHY/MAC, AODV routing, and
   why it dominates low-power sensor networks.
4. Compare the **WiFi standards** (802.11a/b/g/n/ac/ax/be) — rates, bands, MIMO,
   OFDMA — and select a WiFi generation for a given deployment.
5. Explain **UWB** — impulse radio, timing, ranging — and its role in
   high-precision positioning.
6. Describe **LPWAN** technologies (LoRa, NB-IoT, Sigfox) — range, data rate,
   battery life — and their role in IoT connectivity.
7. Explain **5G network architecture** — service-based core, network slicing, edge
   computing — and the three **5G use cases** (eMBB, URLLC, mMTC).
8. Compute **IoT device battery life**, **coverage range**, and **network capacity**
   for typical LPWAN/WiFi/BLE deployments.
9. Design a connectivity strategy — WPAN, WLAN, LPWAN, cellular — for a
   real-world IoT application based on range, power, and data requirements.

---

## 6.1 What is an NGN?

### 6.1.1 From convergence to everything-over-IP

The term **Next Generation Network** (NGN) was defined by the **ITU-T** in the
early 2000s as a **packet-based network** able to provide telecommunication
services — voice, data, video — over a **single IP infrastructure** with
guaranteed QoS.

The original NGN vision (2004 ITU-T Y.2001):

> *"A packet-based network able to provide telecommunication services and able
> to make use of multiple broadband, QoS-enabled transport technologies, in which
> service-related functions are independent from underlying transport-related
> technologies."*

**Key NGN principles:**

- **Packet-based** — everything rides on IP, not circuit switching.
- **Service / transport separation** — services are decoupled from the underlying
  network via open APIs.
- **QoS-enabled** — unlike the best-effort internet, NGN guarantees performance.
- **Any-access** — fixed, mobile, wireless — all converge to one network.
- **Multi-service** — voice, data, video, IoT over one infrastructure.

### 6.1.2 The stages of NGN evolution

**Stage 1 (2000–2010): All-IP convergence.**

- Replace PSTN circuit switching with IP-based voice (**VoIP**).
- Replace 2G/3G core networks with IP (R4 MSC Server + MGW → all-IP EPC in LTE).
- Example: BT's **21CN** project (UK), Verizon's **FiOS** (fiber to the home).
- Key technologies: SIP, MPLS, IP Multimedia Subsystem (IMS).

**Stage 2 (2010–2020): Fixed-mobile convergence (FMC).**

- Unify fixed and mobile access under one core (EPC → 5G SBA).
- Voice over WiFi (VoWiFi), LTE-WiFi aggregation (LWA).
- Example: T-Mobile's VoWiFi, AT&T's small-cell deployment.
- Key technologies: ANDSF, ePDG, 5G NSA/SA.

**Stage 3 (2020s): IoT convergence.**

- Billions of devices — sensors, actuators, cameras — all IP-connected.
- LPWAN (LoRa, NB-IoT, Sigfox) sits alongside WiFi and cellular for IoT.
- **5G** and beyond: network slicing, edge computing, massive machine-type
  communication.
- Key technologies: MQTT, CoAP, 5G core, edge computing, ML.

The **NGN concept broadened** from "voice over IP" to "everything over IP" —
the network becomes a platform for all digital services.

### 6.1.3 The NGN landscape in one picture

| Category | Standard | Range | Data rate | Power |
|---|---|---|:---:|:---:|
| **WPAN** (personal) | Bluetooth Classic | 10–100 m | 1–3 Mbps | Low |
| | Bluetooth LE | 10–100 m | 125 kbps–2 Mbps | Very low |
| | ZigBee | 10–100 m | 250 kbps | Very low |
| | UWB | 1–10 m | 100 Mbps–1 Gbps | Low |
| **WLAN** (local) | WiFi 4/5/6/7 | 30–100 m | 100 Mbps–30 Gbps | High |
| **WMAN** (metropolitan) | WiMAX, 5G FWA | 1–50 km | 100 Mbps–1 Gbps | High |
| **WWAN** (wide) | 4G LTE | 1–30 km | 100 Mbps–1 Gbps | High |
| | 5G NR | 100 m–10 km | 1–20 Gbps | High |
| **LPWAN** (IoT) | LoRa | 2–15 km | 0.3–37.5 kbps | Extremely low |
| | NB-IoT | 1–10 km | 26–127 kbps | Very low |
| | Sigfox | 3–50 km | 100 bps | Extremely low |
| **Satellite** | GEO, LEO | global | 1–200 Mbps | — |

Each row is a different trade-off between range, rate, and power. **The NGN is
about making all of them work together** — not replacing them.

---

## 6.2 Personal Area Networks — Bluetooth

### 6.2.1 Bluetooth Classic (BR/EDR) — the original

**Bluetooth Classic** (Basic Rate / Enhanced Data Rate, BR/EDR) was defined in
1994 by Ericsson and standardized as **IEEE 802.15.1** in 2002. Designed as a
**cable replacement** for short-range connections (headphones, mice, keyboards).

**Key parameters:**

| Parameter | Value |
|---|---|
| Frequency | **2.4 GHz ISM band** (2.400–2.4835 GHz) |
| Channel spacing | 1 MHz; **79 channels** (or 40 in low-energy variants) |
| Modulation | GFSK (Basic Rate), π/4-DQPSK, 8-DPSK (EDR) |
| Data rate | 1 Mbps (BR), 2–3 Mbps (EDR) |
| Range | Class 1: 100 m, Class 2: 10 m, Class 3: 1 m |
| Tx power | Class 1: 20 dBm, Class 2: 4 dBm, Class 3: 0 dBm |
| Topology | **Piconet** (1 master + up to 7 active slaves) |

**The piconet:**

- One **master** device controls the piconet — it defines the hopping sequence,
  the slot timing, and the channel access rules.
- Up to **7 active slaves** simultaneously; more can be in **parked** or
  **sniff** mode (low-power standby).
- Slots are **625 μs** long; master and slave alternate transmissions.
- **Frequency hopping** at 1600 hops/s (each slot on a different channel) —
  resist to interference and multi-path.

**Scatternets.** Multiple piconets can be interconnected by a device that belongs
to two or more piconets simultaneously. This is limited in practice (the shared
device is a bottleneck).

**Protocol stack** (simplified):

- **Radio → Baseband → LMP** (Link Manager Protocol) → **L2CAP** (Logical Link
  Control and Adaptation) → **RFCOMM** (serial port) or **A2DP** (audio).
- **SDP** (Service Discovery Protocol) — finds available services.
- **Profiles** — application-level standards (HSP for headset, HFP for handsfree,
  A2DP for audio, HID for input devices, OPP for file transfer).

**Why frequency hopping?** The 2.4 GHz ISM band is shared by WiFi, ZigBee,
microwaves, and Bluetooth itself. Hopping across 79 channels means a narrowband
interferer only affects 1/79 of slots — Bluetooth retransmits the failed slots
on different frequencies. Effective interference resistance without needing a
coordination protocol.

### 6.2.2 Bluetooth Low Energy (BLE) — the IoT version

**BLE** (Bluetooth Smart) was introduced in **Bluetooth 4.0 (2010)** as a
**fundamentally different radio** optimized for IoT sensors and wearables.

**Key design changes:**

| Aspect | Bluetooth Classic | BLE |
|---|---|---|
| Target use | Continuous data (audio, files) | Bursty sensor data |
| Channel count | 79 × 1 MHz | **40 × 2 MHz** (3 advertising + 37 data) |
| Connection setup | ~seconds | **~3 ms** |
| Peak current (TX) | 30–40 mA | **~10 mA** |
| Standby current | 100 μA – 1 mA | **< 1 μA** |
| Duty cycle | Continuous | **Bursty** (advertise → sleep) |
| Data rate (peak) | 2–3 Mbps (EDR) | 1 Mbps (BT 4.0), 2 Mbps (BT 5.0) |
| Range (BT 5.0) | 10–100 m | 10–400 m (with coded PHY) |

**The BLE advertising model.**

BLE devices don't need a connection. A **peripheral** broadcasts **advertisement
packets** on 3 advertising channels; a **central** scans for them, then either
reads the advertisement data (broadcast mode) or requests a connection.

**Advertising interval** — from **20 ms to 10.24 s**. Longer intervals = lower
power but higher latency.

**GATT (Generic Attribute Profile).**

BLE data is organized as **services** and **characteristics**:
- **Service** — a group of related characteristics (e.g., "Heart Rate Service").
- **Characteristic** — a single data value (e.g., "Heart Rate Measurement")
  with **properties** (read, write, notify).

Standard profiles (Heart Rate, Battery, Device Information) are defined by the
Bluetooth SIG; custom services are common for specific applications.

**Bluetooth versions:**

| Version | Year | Key additions |
|:---:|:---:|---|
| **4.0** | 2010 | BLE introduced |
| **4.1** | 2013 | IoT-friendly coexistence with LTE |
| **4.2** | 2014 | IPv6/6LoWPAN support, faster |
| **5.0** | 2016 | 2× speed (2 Mbps), 4× range (400 m), 8× advertising payload |
| **5.1** | 2019 | **Direction finding** (AoA/AoD) for indoor positioning |
| **5.2** | 2020 | **LE Audio** (LC3 codec, multi-stream) |
| **5.3** | 2021 | Periodic advertising, channel classification |
| **5.4** | 2023 | PAwR (periodic advertising with responses) |

### Worked example 6.1 — BLE battery life

**Scenario:** A temperature sensor sends one 10-byte reading every 10 s.
Advertising is not used (connection mode). Each transmission uses 2 ms at 10 mA;
the MCU consumes 5 μA in sleep. Battery: 1000 mAh coin cell.

**Energy per transmission:**

- Transmit: 2 ms × 10 mA = 20 μAh per transmission.
- Sleep between transmissions: (10 s − 2 ms) × 5 μA ≈ 50 μAh per interval.
- **Total per 10 s:** ~70 μAh × (10 s / 3600 s/h) ... let me redo:
  - 2 ms at 10 mA = 20 mA·ms = 0.00556 mAh per transmission.
  - 9998 ms at 5 μA = 0.0000139 mAh per interval.
  - Per 10 s interval: 0.00557 mAh.
- Per hour: 360 intervals × 0.00557 = 2.0 mAh/h.
- **Battery life:** 1000 mAh / 2.0 mA ≈ **500 hours ≈ 21 days**.

**Optimization:** Increase advertising interval to 30 s and use a lower TX power:

- Transmit: 2 ms × 5 mA = 0.00278 mAh per transmission.
- Per hour: 120 intervals × 0.00278 = 0.334 mAh/h.
- **Battery life:** 1000 / 0.334 ≈ **3000 hours ≈ 125 days** (~4 months).

**Realistic for IoT:** A properly tuned BLE sensor (event-driven, not periodic)
can last **1–3 years** on a coin cell. Longer life requires LPWAN (ZigBee, LoRa,
NB-IoT).

### 6.2.3 Bluetooth Classic vs. BLE — choosing

| Application | Recommended |
|---|---|
| Wireless headphones | Bluetooth Classic (A2DP) |
| Fitness tracker / smartwatch | BLE |
| Wireless mouse / keyboard | BLE (or Classic HID) |
| Continuous audio streaming | Bluetooth Classic (higher rate) |
| Hearing aids | BLE (LE Audio, BT 5.2) |
| Indoor location beacon | BLE (with 5.1 direction finding) |
| File transfer between phones | Bluetooth Classic |
| Medical sensor | BLE |

**Rule of thumb:** if the data is continuous and needs a high rate → Classic.
If it's bursty and power is critical → BLE.

---

## 6.3 Personal Area Networks — ZigBee

### 6.3.1 What is ZigBee?

**ZigBee** (IEEE 802.15.4) is a low-power, low-data-rate, **mesh-capable** WPAN
standard designed for **sensor networks** and **home automation**.

**Key parameters:**

| Parameter | Value |
|---|---|
| Frequency | 2.4 GHz (global, 16 channels), 868 MHz (EU), 915 MHz (US) |
| Modulation | OQPSK (2.4 GHz) or BPSK (sub-GHz) |
| Data rate | **250 kbps** (2.4 GHz), 40 kbps (915 MHz), 20 kbps (868 MHz) |
| Range | 10–100 m per hop (typical); extended via mesh |
| Topology | **Star, tree, or mesh** |
| Power (TX) | ~30 mA |
| Power (sleep) | < 1 μA |
| Network capacity | **65,000+ nodes** per network |

### 6.3.2 The ZigBee protocol stack

Built on IEEE 802.15.4 (PHY + MAC), ZigBee adds:

- **NWK (Network)** layer — mesh routing, address assignment, network formation.
- **APS (Application Support)** layer — endpoint multiplexing, binding.
- **ZDO (ZigBee Device Object)** — device discovery, service discovery.
- **Application profiles** — standardized profiles (Home Automation 1.2, Smart
  Energy, Light Link) and manufacturer-specific profiles.

**Device types:**

- **Coordinator** — forms the network, assigns addresses, maintains the network.
  Exactly one per network.
- **Router** — forwards traffic, participates in mesh. Typically mains-powered.
- **End Device** — leaves/actuators/sensors, sleeps most of the time. Typically
  battery-powered.

### 6.3.3 Mesh networking and AODV

ZigBee supports **mesh topologies** — any router can forward for any other. The
routing protocol is **AODV** (Ad hoc On-demand Distance Vector):

1. The source broadcasts a **Route Request (RREQ)** — "who has the destination?"
2. Intermediate routers forward the RREQ, adding their address.
3. The destination receives the RREQ and sends back a **Route Reply (RREP)** —
   tracing the reverse path.
4. Routers cache the route for future use.
5. **Route maintenance:** if a link breaks, an **RERR** (Route Error) propagates
   back; source initiates a new RREQ.

**Why AODV?** **On-demand** — no routing table is maintained proactively. For
sensor networks (mostly idle), this saves energy.

### Worked example 6.2 — ZigBee mesh coverage

**Scenario:** A factory wants to cover 500 m × 500 m with ZigBee sensors.
Each sensor has range 30 m. Floor has walls reducing effective range to 20 m.

**Single-hop coverage:** ~20 m.

**Mesh approach:** deploy routers every 15 m (overlap for reliability).

- Row spacing: 15 m; column spacing: 15 m.
- Number of routers: (500/15) × (500/15) ≈ 34 × 34 = **1,156 routers**.
- This is more than ZigBee can handle reliably (practical limit ~500 routers per network).

**Alternative: hierarchical (cluster tree).**

- Divide area into **4 clusters** of 250 × 250 m.
- Each cluster has 1 coordinator + ~100 routers + many end devices.
- **Alternative: reduce coverage requirement** — use fewer sensors, accept longer
  hops (multi-hop latency increases).

**The trade-off:** more hops = larger area but higher latency and lower throughput
(each hop halves bandwidth). For typical building automation, a **single-cell
10,000 m² deployment with 200-300 devices** is comfortable for ZigBee; larger
deployments need multiple networks or gateway bridges.

### 6.3.4 ZigBee vs. BLE

| Aspect | ZigBee | BLE |
|---|---|---|
| Topology | Mesh | Star (BLE Mesh is a newer standard) |
| Data rate | 250 kbps | 1–2 Mbps |
| Range per hop | 10–100 m | 10–100 m |
| Network size | 65,000+ | ~10–20 typical; higher with BLE Mesh |
| Power (idle) | < 1 μA | < 1 μA |
| Latency | 15–30 ms typical | 3 ms |
| Standard | IEEE 802.15.4 | Bluetooth SIG |
| Ecosystem | Smart home (Philips Hue, SmartThings) | Wearables, phones, broad |
| **Best for** | **Sensor networks** | **Phone-tethered IoT** |

**Rule of thumb:** ZigBee when the network has many devices and needs mesh
coverage; BLE when the device talks to a phone or the network is small.

---

## 6.4 WiFi — wireless local area networks

### 6.4.1 The 802.11 family

WiFi (IEEE 802.11) dominates **local wireless** — home, office, public hotspot.
Every WiFi generation has improved peak rate, spectral efficiency, and features:

| Standard | Year | Brand | Band | Channel width | Peak rate | Key feature |
|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **802.11** | 1997 | — | 2.4 GHz | 20 MHz | 2 Mbps | Original |
| **802.11b** | 1999 | — | 2.4 GHz | 20 MHz | 11 Mbps | DSSS, more range |
| **802.11a** | 1999 | — | 5 GHz | 20 MHz | 54 Mbps | OFDM |
| **802.11g** | 2003 | — | 2.4 GHz | 20 MHz | 54 Mbps | OFDM at 2.4 GHz |
| **802.11n** | 2009 | **WiFi 4** | 2.4/5 GHz | 40 MHz | 600 Mbps | MIMO, channel bonding |
| **802.11ac** | 2013 | **WiFi 5** | 5 GHz | 80/160 MHz | 6.9 Gbps | MU-MIMO DL, 256-QAM |
| **802.11ax** | 2019 | **WiFi 6** | 2.4/5 GHz | 160 MHz | 9.6 Gbps | **OFDMA**, MU-MIMO UL/DL, 1024-QAM, TWT |
| **802.11be** | 2024 | **WiFi 7** | 2.4/5/6 GHz | 320 MHz | 46 Gbps | 4096-QAM, Multi-Link (MLO), 16×16 MIMO |
| **802.11ay** | 2024 | — | 60 GHz | 2.16 GHz | 100 Gbps | mmWave, for VR/AR |

**The naming confusion.** IEEE uses numbers (802.11ac); the WiFi Alliance
introduced simpler names (**WiFi 4, 5, 6, 7**) starting in 2018 to avoid consumer
confusion. Both are used; the numbered names are unambiguous for generations,
so this course uses them.

### 6.4.2 Key PHY technologies

**OFDM and its evolution:**

- WiFi 4 (802.11n) — OFDM, 20/40 MHz channels, MIMO.
- WiFi 5 (802.11ac) — OFDM, 80/160 MHz, MU-MIMO downlink, 256-QAM.
- WiFi 6 (802.11ax) — **OFDMA**, MU-MIMO uplink + downlink, 1024-QAM, longer OFDM
  symbol (4× — reduces guard band overhead).
- WiFi 7 (802.11be) — 4096-QAM, 320 MHz channels, Multi-Link Operation (MLO —
  simultaneous transmission on multiple bands), 16×16 MIMO.

**OFDMA in WiFi 6** — the biggest change since WiFi 4. Instead of scheduling one
user per channel (all subcarriers), the AP allocates **resource units (RUs)**
to multiple users **simultaneously**. This is exactly what LTE/5G do, and it
massively improves efficiency in crowded environments (stadiums, airports, offices).

**MIMO scaling:**

| Generation | MIMO |
|---|---|
| WiFi 4 | 4×4 |
| WiFi 5 | 8×8 (with MU-MIMO DL) |
| WiFi 6 | 8×8 (with MU-MIMO DL+UL) |
| WiFi 7 | 16×16, plus Multi-Link |

### Worked example 6.3 — WiFi 6 capacity in a crowded office

**Scenario:** Office with 200 users, each with a phone and laptop (400 devices).
AP is WiFi 6, 5 GHz, 80 MHz channel, 4×4 MIMO.

**Per-AP theoretical peak:** ~2.4 Gbps (WiFi 6, 80 MHz, 4×4).

**Realistic per-AP throughput:** 40–60% of peak in dense environment → ~1.2 Gbps.

**Per-user throughput (ideal 400 evenly split):** 1.2 Gbps / 400 = 3 Mbps per
device. Too slow for video calls.

**With 8 APs deployed** (typical office): 8 × 1.2 Gbps = 9.6 Gbps total →
24 Mbps per device — acceptable for most uses.

**OFDMA advantage:** WiFi 5 would give ~1 Gbps per AP but with one user per
transmission (MU-MIMO limited to 4 DL streams). WiFi 6 OFDMA allows ~30 RUs
per 80 MHz channel → up to 30 simultaneous users per transmission → much better
at high density.

**The lesson:** WiFi 6's OFDMA is about **capacity in dense environments**, not
peak rate per user. Its biggest benefit is that a stadium or airport full of
people doesn't collapse the network.

### 6.4.3 WiFi bands and coexistence

| Band | Channels | Interference |
|---|---|---|
| **2.4 GHz** | 14 channels (varies by country), 20 MHz | Very congested (Bluetooth, ZigBee, microwave) |
| **5 GHz** | 25+ channels (varies), 20–160 MHz | Congested but more channels |
| **6 GHz** (WiFi 6E) | 59 channels of 20 MHz, or 14 of 160 MHz | **Empty** — reserved for WiFi |

**The 6 GHz band** (5.925–7.125 GHz) was allocated for WiFi 6E and WiFi 7 in
2020–2021. **No legacy devices** — every WiFi 6E device supports 6 GHz. Clean
spectrum means better performance, especially in dense environments.

### 6.4.4 WiFi security

| Standard | Year | Cipher | Status |
|:---:|:---:|---|---|
| **WEP** | 1997 | RC4 | **Broken** (crackable in minutes) |
| **WPA** | 2003 | TKIP | Deprecated |
| **WPA2** | 2004 | AES-CCMP | Good, still widely used |
| **WPA3** | 2018 | AES-GCMP, SAE | Current standard |

**WPA3 improvements:**

- **SAE (Simultaneous Authentication of Equals)** — replaces the WPA2 PSK
  handshake, resistant to offline dictionary attacks.
- **Forward secrecy** — captured traffic can't be decrypted even if the
  password is later compromised.
- **192-bit security mode** for enterprise/WPA3-Enterprise.

**Rule:** never deploy WEP or WPA. WPA2 is the minimum for compatibility; WPA3
is recommended for new deployments.

---

## 6.5 Ultra-Wideband (UWB)

### 6.5.1 What is UWB?

**Ultra-Wideband (UWB)** is a radio technology that transmits **very short
impulses** (< 1 ns) across a **very wide bandwidth** (> 500 MHz), at **very low
power spectral density**.

**FCC definition:** any signal with fractional bandwidth > 20% or absolute
bandwidth > 500 MHz, transmitting at power below −41.3 dBm/MHz.

**Key properties:**

| Property | Value |
|---|---|
| Frequency | 3.1–10.6 GHz |
| Bandwidth | > 500 MHz |
| Pulse duration | 0.1–1 ns |
| Range | 1–10 m (typical), up to 30 m |
| Data rate | 100 Mbps–1 Gbps (short range) |
| Power | 0.5 mW (very low) |
| Position accuracy | **~10 cm** |

### 6.5.2 Why UWB is different

**Traditional radio** (narrowband): transmission occupies a narrow slice of
spectrum around a carrier; the signal must be **modulated** onto that carrier
(AM, FM, PSK, QAM).

**UWB:** transmits **impulses** — extremely short pulses that inherently span
a wide bandwidth. No carrier in the traditional sense; the "carrier" is the
pulse repetition rate.

**Fourier transform intuition:** a pulse of duration $\tau$ has bandwidth
$\approx 1/\tau$. A 1 ns pulse = 1 GHz bandwidth. UWB exploits this directly.

**The advantage:** wide bandwidth → **fine time resolution** → excellent
**ranging** (position estimation). UWB can measure distances to cm precision
by measuring **time of flight**.

### 6.5.3 Two flavours of UWB

**1. Impulse Radio UWB (IR-UWB)** — the original approach.

- Transmit **Gaussian pulses** or **monocycle pulses**.
- Data rate limited by pulse repetition frequency (typically 100–1000 Mbps).
- Used in research and short-range radar.

**2. Multi-Band OFDM (MB-OFDM)** — a competitor (WiMedia Alliance).

- Divide the 3.1–10.6 GHz band into 14 sub-bands of 528 MHz.
- Use OFDM within each sub-band.
- Higher data rate (~1 Gbps), more complex.
- WiMedia dissolved around 2010; MB-OFDM is now rarely used.

**3. IEEE 802.15.4z (the current standard)** — supports both.

- **HRP (High Rate Pulse) UWB** — for high data rate.
- **LRP (Low Rate Pulse) UWB** — for low-power, precise ranging.
- Focus on **secure ranging** (STS — Scrambled Timestamp Sequence) to prevent
  relay attacks.

### 6.5.4 UWB applications

**High-precision indoor positioning.**

- **Apple AirTag, Samsung SmartTag+** — UWB provides cm-level direction and
  distance, much better than Bluetooth RSSI.
- **Smart home** — precise location of people and objects.
- **Warehouse logistics** — track items to cm.

**Secure car access.**

- Digital car keys use UWB ranging to verify the key is actually nearby
  (defeats relay attacks that fool Bluetooth/RSSI systems).
- Standardized by the **Car Connectivity Consortium** (CCC Digital Key 3.0).

**Industrial positioning.**

- Robots, tools, people in factories, mines, warehouses.
- **10 cm precision**, better than Bluetooth or WiFi for industrial use.

**Short-range high-rate data.**

- Wireless USB (defunct).
- VR/AR cable replacement (in some products).
- Wireless HDMI (few consumer products).

### Worked example 6.4 — UWB ranging precision

**UWB range resolution:** governed by the pulse bandwidth $B$:

$$
\boxed{\;\Delta d \approx \frac{c}{2B}\;}
$$

For $B = 1$ GHz: $\Delta d \approx 3 \times 10^8 / (2 \times 10^9) = \mathbf{15\ cm}$.

For $B = 500$ MHz: $\Delta d \approx \mathbf{30\ cm}$.

**Time-of-flight measurement:** at $d = 10$ m, the round-trip time is:

$$
t = \frac{2d}{c} = \frac{20}{3 \times 10^8} \approx 67\ \text{ns}.
$$

A **1 ns timing error** gives $c \cdot t/2 = 15$ cm distance error — hence
nanosecond-class timing is required for cm-level ranging. Modern UWB chips
achieve **< 100 ps** timing precision.

**The lesson:** UWB's ranging accuracy comes from the **short pulse** (wide
bandwidth). No narrowband technology can match this.

---

## 6.6 LPWAN — Low-Power Wide Area Networks

Between WiFi (short-range, high-rate) and cellular (long-range, high-rate,
power-hungry) there's a gap: **long-range, very low power, low data rate, battery-
powered**. That's **LPWAN** — the IoT connectivity solution.

### 6.6.1 The LPWAN landscape

| Technology | Frequency | Data rate | Range | Battery life | Standard |
|---|---|:---:|:---:|:---:|---|
| **LoRa** | Sub-GHz ISM (868/915 MHz) | 0.3–37.5 kbps | 2–15 km | 10+ years | LoRa Alliance (proprietary PHY) |
| **NB-IoT** | Licensed LTE (700/800/900 MHz) | 26–127 kbps | 1–10 km | 5–10 years | 3GPP (Release 13) |
| **Sigfox** | Sub-GHz ISM (868/902 MHz) | 100 bps | 3–50 km | 10+ years | Sigfox (proprietary) |
| **LTE-M** | Licensed LTE | 1 Mbps | 1–10 km | 5–10 years | 3GPP (eMTC) |
| **Weightless** | Sub-GHz ISM | 0.1–100 kbps | 2–5 km | 5+ years | Weightless SIG |

**Rule of thumb:** **LoRa** for unlicensed global deployment, **NB-IoT** for
licensed spectrum (tied to cellular operators), **Sigfox** for ultra-low
data rate, **LTE-M** for higher data rate than NB-IoT.

### 6.6.2 LoRa — the PHY and MAC

**LoRa** = Long Range. The physical layer is proprietary (Semtech); the MAC layer
(**LoRaWAN**) is open and managed by the LoRa Alliance.

**Chirp Spread Spectrum (CSS)** — the modulation technique.

- Each symbol is a **frequency chirp** (up-sweep or down-sweep).
- **Spreading factor (SF)** controls chirp rate: SF7–SF12.
- Higher SF = **longer range** (more spreading) but **lower data rate**.
- **SF12** gives ~-137 dBm sensitivity (very long range), at 250 bps.
- **SF7** gives ~-123 dBm, at ~5.5 kbps.

**The trade-off:**

| SF | Data rate | Sensitivity | Range (km) |
|:---:|:---:|:---:|:---:|
| 7 | 5.5 kbps | -123 dBm | 2 |
| 9 | 1.8 kbps | -129 dBm | 6 |
| 11 | 0.5 kbps | -134 dBm | 10 |
| 12 | 0.25 kbps | -137 dBm | 15 |

**LoRaWAN classes:**

- **Class A** (baseline) — bidirectional; uplink scheduled by the device, two
  short downlink windows after each uplink. Lowest power.
- **Class B** — beacon-synchronized; scheduled downlink receive windows. Moderate
  power, low downlink latency.
- **Class C** — continuous receive (except when transmitting). Highest power,
  lowest latency. For mains-powered devices.

**Network architecture:**

- **End devices** — sensors that transmit.
- **Gateways** — receive on multiple channels/SFs; forward to network server
  via IP (WiFi, Ethernet, cellular).
- **Network server** — de-duplicates, manages devices, routing.
- **Application server** — user applications.

**The key advantage:** LoRa is **license-free** (ISM bands) — anyone can deploy
a LoRaWAN network. Enterprises deploy private LoRa for building automation,
agriculture, industrial sensors. National LoRaWAN networks exist in many countries
(mobile operators, IoT providers).

### 6.6.3 NB-IoT — cellular for IoT

**NB-IoT** (Narrowband IoT) is the **3GPP** IoT standard (Release 13, 2016).

**Key parameters:**

| Parameter | Value |
|---|---|
| Bandwidth | **180 kHz** (single LTE resource block) |
| Frequency | Licensed LTE bands (in-band, guard-band, or standalone) |
| Data rate | 26 kbps UL, 127 kbps DL (multi-tone) |
| Latency | 1.6–10 s (longer than LTE) |
| Battery life | **~10 years** (with PSM/eDRX) |
| Range | ~10–15 km (with repetitions, +20 dB over LTE) |

**Key features:**

- **Coverage extension:** up to **20 dB** (100×) over LTE via **repetitions** —
  the same message sent 2048 times, combined at the base station. Range up to
  ~15 km.
- **Power Saving Mode (PSM):** the device sleeps for **up to 413 days**, waking
  only to send data. This is the key to 10-year battery life.
- **eDRX (extended Discontinuous Reception):** periodic listening, up to 2.9 hours
  between wake-ups.
- **Extended coverage** but at the cost of **latency** — messages take seconds
  to be delivered.

**Advantages over LoRa:**

- **Licensed spectrum** — no interference, guaranteed QoS.
- **Integrated with cellular** — the operator handles the network, no gateway
  needed.
- **Higher data rate** than LoRa (~100 kbps vs. ~5 kbps).
- **Global roaming** via the operator's network.

**Disadvantages:**

- **Needs cellular coverage** — rural areas without LTE coverage can't use NB-IoT.
- **Operator-controlled** — you pay per device, per month.
- **Higher device cost** than LoRa.

### Worked example 6.5 — IoT battery life for LoRa vs. NB-IoT

**Scenario:** A soil moisture sensor transmits 20 bytes every 30 minutes.

**LoRa (SF12, 250 bps):**

- Transmit time: 20 bytes × 8 bits / 250 bps = 0.64 s per transmission.
- Transmit current (typical): 40 mA.
- Per transmission: 0.64 s × 40 mA = 25.6 mA·s = 0.0071 mAh.
- Per day (48 transmissions): 48 × 0.0071 = 0.341 mAh/day.
- Sleep current: 1 μA × 24 h = 0.024 mAh/day.
- **Daily total:** ~0.365 mAh.
- **Battery (2000 mAh):** ~5,480 days = **~15 years** (theoretical).

**NB-IoT:**

- Transmit time: 20 bytes × 8 bits / 26 kbps = 0.006 s per transmission
  (but with repetitions for coverage, effectively ~1 s).
- Transmit current: 200 mA.
- Per transmission: 1 s × 200 mA = 0.056 mAh.
- Per day: 48 × 0.056 = 2.7 mAh/day.
- Sleep (PSM): 5 μA × 24 h = 0.12 mAh/day.
- **Daily total:** ~2.8 mAh/day.
- **Battery (5000 mAh, typical for NB-IoT devices):** ~1,800 days = **~5 years** (theoretical).

**Realistic:** LoRa ~7–10 years, NB-IoT ~3–5 years — battery life is limited
by sleep current and self-discharge, not by transmissions.

**The takeaway:** LoRa is more power-efficient for very low-rate, sparse data.
NB-IoT is worth the higher power for higher data rate and licensed spectrum.

---

## 6.7 5G and IoT — the converged vision

### 6.7.1 5G's three use cases

The ITU defined **IMT-2020** (5G) around three broad use cases:

**1. eMBB — enhanced Mobile Broadband.**

- Peak rate: **20 Gbps**.
- User-experienced rate: 100 Mbps–1 Gbps.
- Use: 4K/8K video, AR/VR, cloud gaming.
- Characteristics: high throughput, moderate latency (~4 ms).

**2. URLLC — Ultra-Reliable Low-Latency Communication.**

- Latency: **1 ms** (air interface).
- Reliability: 99.999% (five nines).
- Use: industrial automation, remote surgery, autonomous driving, smart grid.
- Characteristics: latency-critical, high reliability, moderate data rate.

**3. mMTC — massive Machine-Type Communication.**

- Density: **1 million devices per km²**.
- Battery: **10+ years**.
- Use: IoT sensors, smart city, agriculture, asset tracking.
- Characteristics: high density, low data rate, low power.

**The 5G triangle:** the three use cases pull in different directions. eMBB wants
high rate; URLLC wants low latency; mMTC wants high density and low power. **5G
NR is designed to serve all three**, often on the **same network** via **network
slicing**.

### 6.7.2 5G NR — the new radio

**5G NR (New Radio)** is the 3GPP air interface introduced in **Release 15**
(2018). It's a **new PHY**, not an evolution of LTE.

**Key PHY parameters:**

| Aspect | LTE | 5G NR |
|---|---|---|
| **Frequency** | < 6 GHz | **< 6 GHz (FR1) + mmWave 24–52 GHz (FR2)** |
| **Subcarrier spacing** | 15 kHz fixed | **15, 30, 60, 120, 240 kHz** (scalable) |
| **Channel bandwidth** | up to 20 MHz | **up to 100 MHz (FR1), 400 MHz (FR2)** |
| **MIMO** | up to 8×8 | **up to 64×64 (FR1), 256 antennas (FR2 massive MIMO)** |
| **Modulation** | up to 256-QAM | **up to 1024-QAM** |
| **Latency (user plane)** | ~10 ms | **~1 ms** |
| **Peak DL** | 3 Gbps (LTE-A Pro) | **20 Gbps** |
| **Spectral efficiency** | ~6 bps/Hz (LTE-A) | **~30 bps/Hz (5G)** |

**Scalable numerology** — the key 5G innovation. Unlike LTE's fixed 15 kHz
subcarrier spacing, 5G uses different subcarrier spacings for different scenarios:

- **15 kHz** — for wide-area coverage (like LTE).
- **30 kHz** — for urban (typical 5G).
- **60 kHz** — for low-latency (URLLC).
- **120/240 kHz** — for mmWave (high throughput).

Short subcarriers → longer symbols → **higher throughput**. Longer subcarriers →
shorter symbols → **lower latency**. Numerologies are chosen per application.

**Massive MIMO.** 5G deploys **64–256 antenna elements** at the base station:

- **Beamforming gain:** ~18 dB (64 elements) to 24 dB (256 elements).
- **Multi-user MIMO:** up to 16 UEs simultaneously.
- **3D beamforming:** both horizontal and vertical steering.

**mmWave.** FR2 (24–52 GHz) provides **400 MHz channels** — 8× wider than
sub-6 GHz. This is what enables 20 Gbps peak rate. But mmWave has:

- **High path loss** (Chapter 1 worked example 1.1: ~30 dB more than 2 GHz).
- **Blockage** (rain, hands, walls).
- **Short range** (100–300 m per cell).
- **Requires dense small-cell deployment.**

### 6.7.3 5G Core (5GC) — service-based architecture

The **5G core network** is a fundamental redesign from LTE's EPC. Instead of
**network elements** connected by **point-to-point interfaces**, 5GC uses
**network functions (NFs)** connected by **service-based interfaces (SBI)** —
essentially a microservices architecture.

**Key NFs:**

| Function | Role |
|---|---|
| **AMF** (Access & Mobility) | Registration, mobility, connection management (control plane) |
| **SMF** (Session Management) | PDU session setup, IP address, QoS (control plane) |
| **UPF** (User Plane Function) | Packet routing, QoS enforcement, anchor point |
| **AUSF** (Authentication) | 5G authentication |
| **UDM** (Unified Data Mgmt) | Subscriber data, authentication vectors (like HSS) |
| **PCF** (Policy Control) | QoS policy, charging rules |
| **NSSF** (Network Slicing Selection) | Selects the right network slice |
| **NRF** (NF Repository) | Service discovery (NFs find each other) |
| **NEF** (Network Exposure) | APIs for third parties to use 5G capabilities |
| **AF** (Application Function) | Application server (owns the QoS request) |

**Service-based interface (SBI):**

- All NFs communicate via **HTTP/2 + JSON** on the SBI.
- Any NF can expose services that others consume.
- NRF provides **service discovery** (like DNS for NFs).

**The advantage:** **flexible, cloud-native** — 5GC can run on containers in a
data center, orchestrated by Kubernetes, updated without touching the radio.

### 6.7.4 Network slicing

**Network slicing** is 5G's flagship feature — the ability to create **virtual,
isolated networks** on the same physical infrastructure, each with its own
resources, QoS, and topology.

**Each slice has:**

- Its own **QoS and KPIs** (latency, throughput, reliability).
- Its own **network functions** (or shared, isolated by slice).
- Its own **resource allocation** (spectrum, compute, backhaul).
- Its own **management and orchestration**.

**Example slices:**

- **eMBB slice** — high throughput, moderate latency, for consumer broadband.
- **URLLC slice** — 1 ms latency, 99.999% reliability, for industrial control.
- **mMTC slice** — massive device count, low power, for IoT sensors.
- **V2X slice** — vehicle-to-everything, low latency, high reliability.

**The NSSF** (Network Slice Selection Function) selects the right slice for
each UE based on subscription, requested service, and network policy.

**Why slicing matters:** before 5G, an operator had one network serving all
traffic. An industrial customer wanting guaranteed 1 ms latency competed with
consumers streaming video. Slicing lets the operator **sell dedicated capacity**
to an enterprise with strict QoS, without degrading the consumer network — a
new business model.

### 6.7.5 Edge computing and 5G

**Edge computing** — moving compute resources **close to the user**, at cell
towers or local data centers, instead of centralized cloud.

**Why 5G needs it:**

- **URLLC latency:** 1 ms air-interface latency is useless if the application
  server is 1,000 km away (adds 20–40 ms round-trip). **Multi-access edge
  computing (MEC)** puts the server at the base station or local edge.

**Use cases:**

- **AR/VR** — sub-20 ms end-to-end, must be local.
- **Industrial automation** — real-time control loops, local.
- **Autonomous vehicles** — safety-critical, local.
- **Cloud gaming** — low-latency, local rendering.

**5G + MEC** = network + compute at the edge = platform for real-time applications.

### 6.7.6 IoT connectivity in 5G

**mMTC in 5G** is delivered by three paths:

1. **NB-IoT and LTE-M** — the same LPWAN standards, **integrated into the 5G
   core** (they become 5G-connected devices via dual-mode radios).
2. **5G NR RedCap** (Reduced Capability) — a lighter 5G NR variant for IoT devices
   that need more than NB-IoT but not full 5G (wearables, cameras, sensors with
   moderate data rate).
3. **5G NR** for IoT — for the rare IoT use case that needs URLLC or eMBB.

**Network slicing** lets operators create a **dedicated mMTC slice** with
massive device density and low power, without impacting eMBB users.

**The 5G IoT ecosystem** combines:

- **Massive MIMO + beamforming** for wide coverage.
- **mmWave small cells** for dense IoT deployment.
- **Edge computing** for real-time processing.
- **NB-IoT / LTE-M / RedCap** for device-side connectivity.
- **Network slicing** for isolation and QoS.

### Worked example 6.6 — network slicing for smart factory

**Scenario:** A smart factory needs:

- 500 **industrial sensors** sending 100 bytes every 1 s. **mMTC slice.**
- 20 **AGVs** (automated guided vehicles) with 1 ms latency control loops. **URLLC slice.**
- 10 **HD cameras** streaming 4K video for quality inspection. **eMBB slice.**
- **AR glasses** for technicians, remote expert assistance. **eMBB + URLLC mix.**

**Without network slicing:** one shared network. Under congestion, AGV control
latency spikes → safety risk.

**With slicing:**

- **mMTC slice:** 500 sensors × 100 bytes/s = 50 kbps. Trivial. Reserve 1 MHz.
- **URLLC slice:** 20 AGVs × 100 kbps with 1 ms latency. Reserve dedicated RBs +
  UPF at factory edge. 5 MHz.
- **eMBB slice:** 10 cameras × 20 Mbps = 200 Mbps. 20 MHz + MU-MIMO.
- **AR/VR slice:** mix of eMBB + URLLC. 10 MHz.

**Total:** 36 MHz reserved, each slice isolated. AGV control latency guaranteed
< 1 ms even during video peak traffic. Business model: factory pays for QoS
guaranteed slices.

---

## 6.8 Choosing the right connectivity

For any given IoT application, choosing between WPAN / WLAN / LPWAN / cellular
depends on four variables:

| Parameter | WPAN | WLAN | LPWAN | Cellular |
|---|---|---|---|---|
| **Range** | 10–100 m | 30–100 m | 2–15 km | 1–30 km |
| **Data rate** | 0.1–3 Mbps | 100 Mbps–30 Gbps | 0.1–127 kbps | 100 Mbps–20 Gbps |
| **Power** | Very low | High | Very low | High (except NB-IoT) |
| **Cost** | Low | Moderate | Low | High (spectrum) |

**Decision flowchart:**

```
Start
  │
  ├─ Data rate > 1 Mbps?
  │   ├─ Yes → Local → WiFi
  │   │         → Mobile → 4G/5G
  │   └─ No → continue
  │
  ├─ Range > 100 m?
  │   ├─ Yes → Licensed spectrum?
  │   │         ├─ Yes → NB-IoT / LTE-M
  │   │         └─ No  → LoRa / Sigfox
  │   └─ No → continue
  │
  ├─ Battery-powered & low duty cycle?
  │   ├─ Yes → BLE / ZigBee / LoRa
  │   └─ No  → WiFi / Bluetooth Classic
  │
  └─ Latency-critical?
      ├─ Yes → Cellular (4G/5G)
      └─ No  → LPWAN
```

### Worked example 6.7 — choosing connectivity

**Application:** An agricultural sensor measuring soil moisture, sending 50 bytes
every hour, powered by a small solar panel with battery backup.

**Requirements:**
- Data rate: 50 bytes/hour = 0.11 bps. **Very low.**
- Range: field is 1 km wide; nearest road/power 5 km. **Long range.**
- Power: solar/battery — should last years. **Very low power.**
- Cost: **many devices** (100 sensors), so low per-device cost.

**Options:**

| Option | Fit |
|---|---|
| WiFi | ❌ Range too short (100 m) |
| Bluetooth | ❌ Range too short (100 m) |
| ZigBee | ❌ Range too short (100 m), no backhaul |
| LoRa | ✅ Range 10+ km, low power, low cost |
| NB-IoT | ✅ Range 10 km (if coverage), low power, needs cellular subscription |
| Sigfox | ✅ Range 30+ km, ultra-low power, ultra-low data rate |

**Best fit:** **LoRaWAN** — deploy a private LoRaWAN gateway at the farmhouse
(powered by solar), sensors use LoRa. No monthly cellular fees, cm-level position
(optional), 5+ year battery life on AA cells. **If cellular coverage is available
and reliable, NB-IoT** also works but with monthly subscription cost.

**Why not 5G mMTC?** Overkill — the data rate, latency, and density are far below
what 5G offers; the cost is 10× higher.

---

## 6.9 Chapter summary

1. **NGN** = packet-based, all-IP, multi-service network. It evolved from
   voice-over-IP convergence (2000s) to fixed-mobile convergence (2010s) to
   **IoT convergence** (2020s).
2. **Bluetooth Classic** — for continuous data (audio, files). Piconet topology,
   frequency hopping, 2–3 Mbps. **BLE** — for bursty sensor data; 40 channels,
   3 ms connection, < 1 μA sleep, up to 400 m range (BT 5.0).
3. **ZigBee (IEEE 802.15.4)** — mesh network for sensor networks. 250 kbps, AODV
   routing, 65,000+ nodes, < 1 μA sleep. Dominant in home and industrial
   automation.
4. **WiFi (802.11)** — the local wireless standard. WiFi 6 (802.11ax) brings
   **OFDMA** and MU-MIMO uplink for high-density environments. WiFi 7 (802.11be)
   adds 320 MHz channels, 4096-QAM, and Multi-Link Operation. The 6 GHz band
   provides clean spectrum for WiFi 6E/7.
5. **UWB** — impulse radio using very short pulses (sub-ns) across > 500 MHz
   bandwidth. Enables **~10 cm precision positioning**, used in AirTags, car
   keys, warehouse tracking.
6. **LPWAN** — low-power wide-area networks for IoT. **LoRa** (unlicensed,
   chirp spread spectrum, 2–15 km), **NB-IoT** (licensed, cellular, 10 km,
   10-year battery), **Sigfox** (ultra-low rate, very long range).
7. **5G NR** — new PHY with scalable numerology (15–240 kHz), massive MIMO
   (64–256 antennas), mmWave bands, 1 ms latency, 20 Gbps peak. **FR1** (Sub-6)
   and **FR2** (mmWave) serve different scenarios.
8. **5G Core (5GC)** — service-based architecture with microservices (AMF, SMF,
   UPF, etc.) communicating via HTTP/2. Cloud-native, orchestrated by Kubernetes.
9. **Network slicing** — virtual isolated networks on one physical infrastructure,
   each with its own QoS and topology. Enables URLLC/eMBB/mMTC coexistence and
   new business models.
10. **Edge computing (MEC)** — brings compute close to the user, essential for
    URLLC. 5G + MEC is the platform for real-time applications.
11. **IoT connectivity** — WPAN (BLE, ZigBee) for local, WLAN (WiFi) for local
    high-rate, LPWAN (LoRa, NB-IoT) for wide-area low-power, cellular (4G/5G)
    for high-rate with QoS. Choose based on range, rate, power, and cost.

---

## 6.10 Quiz

### A. Multiple choice

1. Bluetooth Classic operates in which band?
   (a) 900 MHz (b) 2.4 GHz ISM (c) 5 GHz (d) 60 GHz

2. The typical range of BLE (Class 2) is:
   (a) 1 m (b) 10 m (c) 100 m (d) 1 km

3. ZigBee is based on which IEEE standard?
   (a) 802.11 (b) 802.15.1 (c) 802.15.4 (d) 802.16

4. ZigBee's data rate is:
   (a) 10 kbps (b) 250 kbps (c) 1 Mbps (d) 54 Mbps

5. WiFi 6 (802.11ax) introduced:
   (a) OFDM (b) MIMO (c) **OFDMA** (d) mmWave

6. WiFi 6E operates in which new band?
   (a) 2.4 GHz (b) 5 GHz (c) **6 GHz** (d) 60 GHz

7. UWB's main advantage over other technologies is:
   (a) High data rate (b) Long range (c) **Precision positioning** (d) Low cost

8. LoRa uses which modulation technique?
   (a) OFDM (b) QPSK (c) **Chirp Spread Spectrum** (d) 8-PSK

9. NB-IoT's key feature for long battery life is:
   (a) High data rate (b) **PSM** (c) MIMO (d) OFDMA

10. 5G's three use cases are:
    (a) eMBB, URLLC, mMTC (b) LTE, WiFi, Bluetooth (c) AM, FM, PM (d) FDMA, TDMA, CDMA

11. 5G NR's **scalable numerology** allows:
    (a) Multiple bands (b) Different subcarrier spacings (c) Multiple MIMO orders (d) Coexistence with LTE

12. **Network slicing** enables:
    (a) Higher peak rate (b) Virtual isolated networks with distinct QoS (c) Lower latency (d) Higher density

### B. Fill in the blank

1. Bluetooth Classic's topology is a **\_\_\_\_**, with 1 master and up to 7 slaves.
2. BLE has **\_\_\_\_** channels of 2 MHz each.
3. ZigBee's routing protocol is **\_\_\_\_**.
4. WiFi 6 (802.11ax) uses **\_\_\_\_** for multi-user scheduling.
5. WiFi 6E operates in the **\_\_\_\_** GHz band.
6. UWB's pulse bandwidth must exceed **\_\_\_\_** MHz (FCC definition).
7. LoRa's **\_\_\_\_** parameter controls the range/data-rate trade-off.
8. NB-IoT provides up to **\_\_\_\_** dB coverage extension via repetitions.
9. 5G's **\_\_\_\_** (three letters) is the ultra-low-latency use case.
10. 5G Core (5GC) uses **\_\_\_\_** (three letters) for service discovery.

### C. Define / explain

1. What is an NGN? Describe its evolution through the three stages
   (all-IP, FMC, IoT).
2. Describe Bluetooth Classic vs. BLE. When would you use each?
3. Explain ZigBee's mesh topology and AODV routing. Why is mesh important for
   sensor networks?
4. Compare WiFi 5, WiFi 6, and WiFi 7. What are the main improvements?
5. Explain UWB's operating principle. Why does wide bandwidth give high precision?
6. Describe the three LPWAN technologies (LoRa, NB-IoT, Sigfox). When would you
   choose each?
7. Explain LoRa's **spreading factor** trade-off. Why does higher SF give longer
   range but lower data rate?
8. Describe the three 5G use cases (eMBB, URLLC, mMTC). Give one application for
   each.
9. Explain **5G NR's scalable numerology**. Why is it different from LTE's fixed
   15 kHz?
10. What is **network slicing**? How does it enable new business models?
11. How does **edge computing (MEC)** complement 5G? Which use cases need it most?
12. A smart city has 100,000 sensors deployed over 50 km². Choose the connectivity
    strategy — WPAN, WLAN, LPWAN, or cellular — and justify.

---

## 6.11 Answer key

??? success "A. Multiple choice"
    1. **(b)** — 2.4 GHz ISM.
    2. **(c)** — ~10 m (Class 2), up to 100 m in Class 1, up to 400 m in BT 5.0.
    3. **(c)** — 802.15.4.
    4. **(b)** — 250 kbps.
    5. **(c)** — OFDMA.
    6. **(c)** — 6 GHz.
    7. **(c)** — precision positioning.
    8. **(c)** — Chirp Spread Spectrum.
    9. **(b)** — PSM (Power Saving Mode).
    10. **(a)** — eMBB, URLLC, mMTC.
    11. **(b)** — different subcarrier spacings.
    12. **(b)** — virtual isolated networks with distinct QoS.

??? success "B. Fill in the blank"
    1. piconet.
    2. 40.
    3. AODV (Ad hoc On-demand Distance Vector).
    4. OFDMA (Orthogonal Frequency Division Multiple Access).
    5. 6 (5.925–7.125).
    6. 500.
    7. spreading factor (SF7–SF12).
    8. 20.
    9. URLLC.
    10. NRF.

??? success "C. Define / explain — model answers"
    1. *NGN:* a packet-based, all-IP network providing telecommunication
       services (voice, data, video) with QoS, decoupled from the underlying
       transport. *Three stages:* (i) all-IP convergence (2000s) — replacing
       PSTN with VoIP, circuit-switched cores with IP; (ii) fixed-mobile
       convergence (2010s) — unify fixed and mobile under one core, VoWiFi,
       LTE-WiFi; (iii) IoT convergence (2020s) — LPWAN, 5G mMTC, edge computing,
       network slicing.
    2. *Bluetooth Classic:* continuous data, piconet topology, 2–3 Mbps, higher
       power. *BLE:* bursty sensor data, 40 channels of 2 MHz, 3 ms connection,
       < 1 μA sleep, up to 400 m. *Use:* Classic for headphones, audio streaming,
       file transfer; BLE for wearables, fitness trackers, battery-powered
       sensors.
    3. *ZigBee mesh:* any router can forward traffic for any other. *AODV:*
       on-demand routing — source broadcasts Route Request (RREQ), destination
       replies with Route Reply (RREP), routers cache routes for future use.
       *Why mesh:* extends range beyond individual node range (multi-hop),
       improves reliability (redundant paths), and handles node failures
       gracefully. For sensor networks that can't afford fiber backhaul to every
       node, mesh is essential.
    4. *WiFi 5 (802.11ac):* 5 GHz, 80/160 MHz, MU-MIMO DL, 256-QAM. *WiFi 6
       (802.11ax):* adds OFDMA, MU-MIMO UL, 1024-QAM, TWT (Target Wake Time for
       IoT power), 4× longer OFDM symbol. Better at high density. *WiFi 7
       (802.11be):* 320 MHz channels, 4096-QAM, Multi-Link Operation (MLO —
       simultaneous transmission on 2.4, 5, 6 GHz), 16×16 MIMO.
    5. *UWB:* transmits very short pulses (sub-ns) which inherently span > 500
       MHz bandwidth. *High precision:* Fourier transform — pulse of duration τ
       has bandwidth ≈ 1/τ. Wide bandwidth gives **fine time resolution** (τ ~ ns),
       and time of flight directly gives distance: d = c·t/2. So cm-precision
       ranging is possible, unlike narrowband RSSI (which has ~1 m precision).
    6. *LoRa:* unlicensed ISM, Chirp Spread Spectrum, 2–15 km, 0.3–37.5 kbps,
       private or national network. Best for enterprise IoT, agriculture,
       building automation, remote sensing. *NB-IoT:* licensed LTE, 180 kHz
       bandwidth, 1–10 km, ~100 kbps, uses PSM for 10-year battery. Best for
       operator-managed IoT (smart meters, tracking). *Sigfox:* proprietary,
       ultra-low data rate (100 bps), very long range (up to 50 km), ultra-low
       power. Best for asset tracking, simple telemetry with very infrequent
       updates.
    7. *LoRa SF trade-off:* SF7–SF12 correspond to 2^7 to 2^12 chips per symbol.
       *Higher SF:* longer symbol time → more signal energy per bit → better
       sensitivity (−137 dBm for SF12) → longer range (up to 15 km). But: lower
       data rate (250 bps for SF12 vs. 5.5 kbps for SF7) → longer transmission
       time → higher energy per transmission. *Trade-off:* range vs. data rate
       vs. battery life.
    8. *eMBB:* enhanced Mobile Broadband — high rate (100 Mbps–1 Gbps user),
       for 4K/8K video, AR/VR, cloud gaming. *URLLC:* Ultra-Reliable Low-Latency
       Communication — 1 ms latency, 99.999% reliability, for industrial
       automation, remote surgery, autonomous driving. *mMTC:* massive
       Machine-Type Communication — 1M devices/km², low power, for IoT sensors,
       smart city, agriculture.
    9. *5G scalable numerology:* LTE uses fixed 15 kHz subcarrier spacing. 5G
       NR supports 15, 30, 60, 120, 240 kHz. *Why:* different scenarios need
       different trade-offs. Short subcarriers (15 kHz) → long symbol duration →
       robust for high Doppler / wide-area. Long subcarriers (120/240 kHz) → short
       symbol duration → low latency (for URLLC) but need higher SNR. Deployments
       choose numerology per scenario — 15 kHz for macro coverage, 30 kHz for
       urban 5G, 60/120 kHz for mmWave.
    10. *Network slicing:* ability to create multiple virtual isolated networks
        on the same physical infrastructure, each with its own QoS, topology,
        resources, and management. *New business models:* operator can sell
        dedicated URLLC slices to industrial customers with guaranteed latency,
        eMBB slices to consumers, mMTC slices for IoT — each priced for its SLA.
        Before slicing, all traffic shared one network; the industrial customer's
        1 ms latency was at the mercy of consumers streaming video. Slicing
        provides **QoS isolation** as a product.
    11. *MEC (Multi-access Edge Computing):* compute resources placed at cell
        towers / local data centers, close to the user. *Complements 5G:* 5G's
        1 ms air-interface latency is useless if the application server is 1000 km
        away (adds 20+ ms). MEC brings the server to the edge → full end-to-end
        latency in 5–10 ms. *Use cases:* AR/VR (sub-20 ms), industrial control
        loops (1 ms), autonomous vehicles (safety-critical), cloud gaming
        (low-latency rendering), real-time video analytics.
    12. *Smart city, 100,000 sensors over 50 km²:* 2,000 devices/km². LoRa or
        NB-IoT are the only viable options. WiFi covers 100 m per AP, would need
        5,000 APs and power for each — infeasible. Cellular works but 100,000
        subscriptions are expensive. *LoRaWAN:* 20 gateways cover 50 km²
        (2.5 km radius each with SF12), private network, low per-device cost,
        10-year battery. *NB-IoT:* if cellular coverage exists and 5–10 year
        battery acceptable, operator-managed is simpler. *Recommendation:* LoRa
        for maximum flexibility, NB-IoT for integration with city's cellular
        infrastructure.

---

## Further reading

- **Bluetooth:** Bluetooth SIG's *Core Specification 5.4* — free PDF from bluetooth.com. Also *Bluetooth Low Energy: The Developer's Handbook* by Robin Heydon (Prentice Hall, 2012).
- **ZigBee:** *ZigBee Wireless Networks and Transceivers* by Shahin Farahani (Newnes, 2008). The ZigBee Alliance specs at zigbeealliance.org.
- **WiFi:** *802.11ac: A Survival Guide* by Matthew Gast (O'Reilly, 2013) — excellent for WiFi 5. *802.11ax: A Survival Guide* by Kerry Gousheh (self-published, 2020) for WiFi 6. IEEE 802.11 working group documents at ieee802.org/11.
- **UWB:** *Ultra-Wideband Communications: Fundamentals and Applications* by Faranak Nekoogar (Prentice Hall, 2005). IEEE 802.15.4z for the current standard.
- **LPWAN:** *LPWAN Technologies for IoT and M2M Applications* by Bharat Chaudhari and Marco Zennaro (Academic Press, 2020). LoRa Alliance specs at lora-alliance.org.
- **5G:** *5G NR: The Next Generation Wireless Access Technology* by Dahlman, Parkvall & Sköld (Academic Press, 2020) — the definitive PHY reference. *5G Core Networks* by Rommer et al. (Academic Press, 2019) for the 5G core. *5G Mobile and Wireless Communications Technology* by Osseiran, Monserrat & Marsch (Cambridge, 2016) — the METIS/5G-PPP view.
- **IoT:** *Internet of Things: A Hands-On Approach* by Bahga and Madisetti (2014). *Designing the Internet of Things* by McEwen and Cassimally (Wiley, 2014).
- **3GPP specs:** TS 23.501 (5G system architecture), TS 38.300 (NR overall description), TS 23.888 (MTC), TS 36.300 (LTE).
- **ITU-T Y.2001** — the original NGN definition.
- **Standards bodies:** IEEE 802.11, 802.15.1 (Bluetooth), 802.15.4 (ZigBee), 802.15.4z (UWB), 3GPP.

---

## Suggested tutorial problems

1. **BLE battery life.** A BLE beacon transmits every 1 s at 10 mA for 1 ms. Sleep current 5 μA. Battery 250 mAh (CR2032). Compute battery life. Then recompute if advertising interval is 10 s. What's the trade-off?

2. **ZigBee routing.** Design a ZigBee mesh for a 200 m × 200 m factory. Nodes every 20 m, coverage 25 m. How many routers? How many hops from corner to corner? What's the approximate latency?

3. **WiFi deployment.** An airport terminal has 10,000 m², 5000 concurrent users. Design a WiFi 6E deployment. How many APs? What channel plan? What's per-user peak rate?

4. **UWB precision.** UWB with 1.5 GHz bandwidth. Compute range resolution. If timing error is 200 ps, what's the distance error? Is it enough for AirTag-style object finding?

5. **LoRa trade-off.** Sensor transmits 10 bytes. Compute airtime for SF7, SF10, SF12. Which SF maximizes battery life for a 1 km deployment?

6. **NB-IoT coverage.** NB-IoT with 20 dB coverage extension vs. LTE. LTE covers 2 km per cell. What's the NB-IoT range with the same path-loss model? Is this realistic?

7. **5G peak rate.** 5G NR in mmWave, 400 MHz bandwidth, 64-QAM, 8-layer MIMO, rate-3/4 coding. Compute peak rate. Then compute with 256-QAM (5G NR's maximum).

8. **Network slicing.** A hospital needs: 1000 IoT sensors, 50 video streams (20 Mbps each), 10 robotic surgery links (1 ms latency). Design three slices. Estimate resources for each.

9. **Edge computing latency.** An AR application needs 10 ms end-to-end. UE air interface = 1 ms, edge compute = 2 ms, application = 3 ms. Can you meet the budget? What if you use centralized cloud (20 ms network RTT)?

10. **Connectivity choice.** Compare LoRa, NB-IoT, and 5G RedCap for: (a) water meter reading, (b) warehouse asset tracking, (c) agricultural soil moisture, (d) vehicle telemetry. Justify each choice.

11. **WiFi 7 Multi-Link.** A WiFi 7 AP supports 2.4 GHz (40 MHz), 5 GHz (160 MHz), 6 GHz (320 MHz) MLO. Compute total peak rate assuming 4×4 MIMO, 4096-QAM. Is this 46 Gbps?

12. **5G vs. 4G for IoT.** For each of the three 5G use cases (eMBB, URLLC, mMTC), compare the 5G requirements vs. LTE capability. For each, estimate how much better 5G is (factor of improvement).

