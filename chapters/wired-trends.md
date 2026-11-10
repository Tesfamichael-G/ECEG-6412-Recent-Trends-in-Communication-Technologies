# Wired Technology Trends (Part II)

!!! abstract "Chapter at a glance"
    **Contact hours:** 3 lecture · **Home study:** 7 h · **Part II — Wired technology trends**
    
    **Coverage (syllabus):** wired technologies for **access loop** · **core network** ·
    **distribution networks**.

---

## Learning outcomes

By the end of this chapter you should be able to:

1. Explain why **wired infrastructure is the invisible foundation** of every
   wireless network — and quantify how much of mobile traffic rides on fiber.
2. Compare **access-loop technologies** — PON, xDSL, DOCSIS, Ethernet — in
   capacity, distance, and deployment cost.
3. Compute **PON capacity and split-ratio limits** for GPON, XG-PON, XGS-PON,
   and NG-PON2.
4. Describe **core-network evolution** — from TDM/SDH to DWDM + IP/MPLS — and
   compute DWDM capacity per fiber.
5. Explain **distribution networks** — metro Ethernet, carrier Ethernet services,
   ring vs. mesh topologies — and the MEF service definitions.
6. Trace **mobile backhaul** — why fiber is preferred, when microwave is used,
   and what the capacity and latency requirements are for 4G/5G.
7. Compute **CPRI/eCPRI bandwidth** for C-RAN and describe timing requirements
   (SyncE, IEEE 1588 PTP).
8. Analyse the **cost per bit** of wired vs. wireless access and explain why
   wired wins for fixed, wireless wins for mobile.

---

## 1. The invisible foundation of wireless

### 1.1 Every wireless call is mostly wired

A 5G "wireless" connection is **10–1000× more wired than wireless** by distance:

```
UE ──[radio]── gNB ──[fiber]── aggregation ──[fiber]── core ──[fiber]── internet
     100 m       10 km          100 km           1000+ km
```

The **radio link** is the last 100 m–1 km. Everything else is fiber or copper.
This is true of:

- **4G/5G mobile** — the gNB's backhaul is fiber (or microwave for rural).
- **WiFi** — the AP's uplink is Ethernet or fiber.
- **Fixed broadband** — FTTH, xDSL, DOCSIS all terminate in fiber.

**The premise of this chapter:** understanding wireless networks without
understanding their wired infrastructure is like understanding a city's traffic
by looking only at the parking lots. The wired network sets the **capacity,
latency, and cost envelope** within which wireless operates.

### 1.2 The three tiers of wired infrastructure

| Tier | Function | Typical technology | Distance |
|---|---|---|---|
| **Access loop** | Connects individual subscribers (homes, businesses, cell sites) to the operator's first aggregation point | PON, xDSL, DOCSIS, Ethernet | 100 m – 20 km |
| **Distribution / metro** | Aggregates access traffic across a city into a few core points | Carrier Ethernet, IP/MPLS, DWDM | 5 – 100 km |
| **Core** | Transports traffic between cities, countries, continents | DWDM, IP/MPLS, OTN | 100 – 10,000 km |

Each tier has its **own economics and technology**, and each has evolved
dramatically over the last 20 years.

### 1.3 Why "wired" still matters in a wireless course

Three reasons:

1. **Mobile backhaul is the bottleneck.** A 5G gNB produces 10–20 Gbps peak
   traffic; the fiber backhaul must carry it. Backhaul often lags radio capacity
   by 3–5 years — the network can transmit faster than it can deliver.

2. **Fixed-mobile convergence (FMC).** 5G and WiFi integrate deeply — traffic
   from a WiFi network may be handed to 5G core; voice calls over WiFi (VoWiFi)
   use the same IMS as VoLTE. The wired backhaul is what makes convergence
   possible.

3. **The economics of data.** Wired transmission costs **~$0.001/GB**; wireless
   costs **~$1–10/GB**. The 1000× difference explains why operators push traffic
   to WiFi and fiber wherever possible — the wireless radio is used only for the
   last hop.

---

## 2. Access loop — connecting the subscriber

### 2.1 The access loop problem

The **access loop** (also called the **last mile** or **local loop**) connects
each subscriber to the operator's first aggregation point. Historically this was
**copper twisted pair** (telephone line), then **coaxial cable** (TV), and is
increasingly **fiber**.

The design constraints are severe:

- **Each subscriber needs a dedicated wire** — the access loop is inherently
  point-to-point or point-to-multipoint.
- **Distance is limited** by signal attenuation (copper: ~1 km for high rates,
  fiber: 20+ km).
- **Cost per subscriber is dominated by trenching/cabling** — installing a new
  wire costs **$500–2000 per home**.

The access loop is the **most expensive part of the network** in capex — often
40–60% of total deployment cost.

### 2.2 Copper access — xDSL

**xDSL** (Digital Subscriber Line) reuses the existing telephone twisted-pair
copper for data, alongside voice (or replacing it).

**Technology evolution:**

| Standard | Year | Downstream | Upstream | Distance |
|:---:|:---:|:---:|:---:|:---:|
| **ADSL** | 1999 | 8 Mbps | 1 Mbps | 3–5 km |
| **ADSL2+** | 2003 | 24 Mbps | 3.5 Mbps | 1.5–3 km |
| **VDSL** | 2001 | 52 Mbps | 16 Mbps | 1–1.5 km |
| **VDSL2** | 2006 | 100 Mbps | 100 Mbps | 500 m – 1 km |
| **VDSL2 Vectoring** | 2010s | 100–300 Mbps | 100 Mbps | up to 1 km |
| **G.fast** | 2014 | 500 Mbps–1 Gbps | 500 Mbps | 100–250 m |
| **G.mgfast** | 2018 | up to 10 Gbps | up to 10 Gbps | < 100 m |

**Key idea:** xDSL trades **distance for rate** — the further from the exchange,
the lower the achievable speed. Higher-rate variants use **wider bandwidth**,
which attenuates more on copper — hence shorter reach.

**DSL from the curb/neighborhood.** To extend high rates (VDSL, G.fast) to
subscribers, operators deploy **DSLAMs** (DSL Access Multiplexers) close to homes —
in cabinets, basements, or street-side — connected to the exchange by fiber
(**FTTC** — fiber to the cabinet). The copper is then short (< 300 m), allowing
high rates.

**Vectoring.** Crosstalk between adjacent DSL lines limits rate. **Vectoring**
coordinates multiple lines at the DSLAM to cancel crosstalk — recovers most of
the rate that crosstalk would otherwise eat. It's the last big copper innovation
before fiber.

**Why copper still matters:** in some markets (especially rural and developing
countries), the existing copper is too valuable to replace. xDSL operators
squeeze 100–300 Mbps out of VDSL2 vectoring or G.fast — enough for most consumer
needs — for a fraction of FTTH's capex.

### 2.3 Coaxial cable — DOCSIS

**Cable TV** networks use coaxial cable or **HFC** (Hybrid Fiber-Coax) —
fiber to a neighborhood node, then coax to homes. Data is carried by **DOCSIS**
(Data Over Cable Service Interface Specification).

| Standard | Year | Downstream | Upstream | Notes |
|:---:|:---:|:---:|:---:|---|
| **DOCSIS 1.0** | 1997 | 40 Mbps | 10 Mbps | First widespread cable modem |
| **DOCSIS 2.0** | 2001 | 40 Mbps | 30 Mbps | Improved upstream |
| **DOCSIS 3.0** | 2006 | 1 Gbps | 200 Mbps | **Channel bonding** (multiple 6 MHz channels) |
| **DOCSIS 3.1** | 2013 | 10 Gbps | 1–2 Gbps | **OFDM**, 4096-QAM, 192 MHz channels |
| **DOCSIS 4.0** | 2019 | 10 Gbps | 6 Gbps | **Full duplex** (simultaneous DL/UL on same spectrum) |

**Channel bonding** (DOCSIS 3.0+): aggregate multiple 6 MHz (or 8 MHz) channels
into one logical "pipe" — 32+ channels downstream gives >1 Gbps.

**DOCSIS 3.1's OFDM:** replaces single-carrier QAM with OFDM, allowing flexible
channel widths, higher-order modulation (4096-QAM), and better spectral efficiency.

**HFC architecture:**

- **CMTS** (Cable Modem Termination System) at the headend — the DOCSIS endpoint.
- **Fiber node** in each neighborhood — converts fiber to coax.
- **Coax** from node to home — covers 500–2000 homes per node.

Cable operators upgraded from **all-coax** (1990s) to **HFC** (2000s) — the
fiber backbones allow huge data rates to each node, shared among 500–2000 homes.

**The sharing issue.** Coax is a **shared medium** — all homes on a node compete
for the same spectrum. In peak hours, this causes congestion. Fiber (PON) and
xDSL are more dedicated (PON is shared at the splitter but has more headroom).

### 2.4 Fiber access — PON

**PON (Passive Optical Network)** is the dominant FTTH technology — passive
splitters replace active electronics in the field, massively reducing cost and
maintenance.

**PON architecture:**

```
OLT ──[fiber]── splitter 1:32 ──[fiber]── ONU (home)
```

- **OLT** (Optical Line Terminal) at the operator's exchange.
- **Splitter** — passive optical device (no power) that splits one fiber into
  16–128 subscriber fibers.
- **ONU** (Optical Network Unit) at the subscriber (or **ONT**, Optical Network
  Terminal, in the home).

**Downstream and upstream use different wavelengths** (WDM):
- **Downstream:** 1490 nm (typical).
- **Upstream:** 1310 nm (typical).
- A third wavelength (1550 nm) often carries video overlay.

**PON generations:**

| Standard | Year | Downstream | Upstream | Split ratio | Reach |
|:---:|:---:|:---:|:---:|:---:|:---:|
| **BPON** | 1998 | 155 Mbps | 155 Mbps | 1:32 | 20 km |
| **GPON** | 2003 | 2.5 Gbps | 1.25 Gbps | 1:128 | 20 km |
| **XG-PON** | 2010 | 10 Gbps | 2.5 Gbps | 1:128 | 20 km |
| **XGS-PON** | 2016 | 10 Gbps | 10 Gbps | 1:128 | 20 km |
| **NG-PON2** | 2015 | 40 Gbps | 40 Gbps | 1:64 | 40 km |
| **50G PON** | 2021+ | 50 Gbps | 25–50 Gbps | 1:32 | 20 km |

**Key insight:** PON is **shared** — a 1:32 GPON splitter means **32 subscribers
share 2.5 Gbps downstream**. Per-user peak is **~80 Mbps**, but if only 1 user is
active, that user can get the full 2.5 Gbps. In practice, **statistical multiplexing**
gives ~100 Mbps typical per user, enough for most residential needs.

### Worked example 2.1 — GPON capacity per user

**Scenario:** A GPON with 1:32 split, 2.5 Gbps downstream, 32 subscribers.
Busy-hour utilization: 60% of subscribers active concurrently, each demanding
peak rate.

**Worst case** (all 32 active simultaneously):
Per-user rate = 2.5 Gbps / 32 = **78 Mbps**.

**Realistic** (60% active, statistical multiplexing):
Per-user rate = 2.5 Gbps / 19 = **131 Mbps**.

**What about XGS-PON?**
10 Gbps / 32 = **312 Mbps** per user (worst case); 10 Gbps / 19 = **526 Mbps**
(realistic).

**For a 4K video stream** (~25 Mbps) + two HD streams (~5 Mbps each) + general
web use (~10 Mbps): ~50 Mbps peak. GPON comfortably handles it, XGS-PON has
ample headroom.

### 2.5 Fiber to the Home — architectures

Three deployment models:

**FTTH (Fiber to the Home)** — fiber all the way to the subscriber's ONT.
2.5–10 Gbps per home.

**FTTB (Fiber to the Building)** — fiber to a building, copper (VDSL, G.fast)
or Ethernet to individual apartments. Cheaper for dense buildings, slightly
lower per-apartment rates.

**FTTC / FTTdp (Fiber to the Cabinet/Distribution Point)** — fiber to a street
cabinet, copper (VDSL2, G.fast) for the last 100–500 m. Much cheaper than full
FTTH, at the cost of copper-dependent rates (100–500 Mbps).

**Deployment economics:**

| Architecture | Capex per home | Peak rate | Time to deploy |
|---|:---:|:---:|---|
| FTTC (VDSL2) | $200–500 | 100 Mbps | Fast (reuses copper) |
| FTTB | $500–1000 | 500 Mbps | Moderate |
| FTTH | $1000–2500 | 1–10 Gbps | Slow (needs trenching) |

**Most operators deploy a mix** — FTTH in new builds and dense urban, FTTC in
older areas, upgrading to FTTH when copper needs replacing.

### 2.6 Fixed wireless access (FWA) — the wired alternative

**FWA** connects homes using **wireless** instead of fiber:
- **5G FWA** at 3.5 GHz or 28 GHz — 100 Mbps–1 Gbps per home, 1–5 km range.
- **mmWave FWA** — up to 1 Gbps per home, 200–500 m range, requires LOS.
- **WiMAX** (legacy) — mostly succeeded by 5G FWA.

**When FWA wins:**
- **Rural areas** where trenching fiber costs $2000+/home.
- **Rapid deployment** — a base station serves 200 homes in weeks vs. months for
  fiber.
- **Temporary or mobile needs** — construction sites, events.

**When fiber wins:**
- **Dense urban** — fiber is cheaper per home at high density, and has more
  capacity.
- **Long-term** — fiber has 40+ year life, FWA needs periodic radio upgrades.

**The trend:** operators deploy **fiber where economics justify, FWA elsewhere** —
often 5G FWA for the last 20% of homes that fiber can't reach.

---

## 3. Core network — the optical backbone

### 3.1 The core network problem

**Core networks** transport traffic between cities, countries, and continents.
The fundamental constraint is: **terabits per second over thousands of km**,
with **sub-10-ms latency** and **99.999% reliability**.

Two technologies dominate:

- **DWDM** (Dense Wavelength Division Multiplexing) — optical transport.
- **IP/MPLS** — packet routing.

The modern core is a **layered** stack:

| Layer | Technology | Function |
|---|---|---|
| **L0 — Fiber** | Single-mode fiber | Physical medium |
| **L1 — DWDM** | 80+ wavelengths × 100–400 Gbps | Optical transport |
| **L2 — OTN** | Optical Transport Network | Wavelength management, FEC |
| **L3 — IP/MPLS** | Label-switched packets | Routing, traffic engineering |

### 3.2 DWDM — the capacity multiplier

**DWDM** transmits **multiple wavelengths** on one fiber simultaneously — each
wavelength carries an independent signal.

**Key parameters:**

- **Wavelength spacing:** 50 GHz or 100 GHz (ITU-T G.694.1 grid).
- **Band:** C-band (1530–1565 nm, ~35 nm wide → ~80 channels at 50 GHz).
- **Per-wavelength rate:** 100–400 Gbps (with advanced modulation and coherent detection).
- **Total per fiber:** 80 × 100 Gbps = **8 Tbps**, up to 80 × 400 Gbps = **32 Tbps**.

**Newer bands:**

- **L-band** (1565–1625 nm) — doubles the spectrum; **C+L** DWDM reaches 64 Tbps.
- **Extended C+L** (Super-C, Super-L) — pushes to 100+ Tbps.

**Coherent detection** is the key enabling technology — coherent optical receivers
recover both amplitude and phase, allowing higher-order modulation (16-QAM,
64-QAM on a single wavelength). Combined with DSP for **electronic dispersion
compensation** and **forward error correction**, coherent DWDM achieves
100–400 Gbps per wavelength.

### Worked example 3.1 — DWDM capacity

**Scenario:** A 100 GHz DWDM system on the C-band (1530–1565 nm, 35 nm ≈ 4.4 THz).

**Number of 100 GHz channels:** 4.4 THz / 100 GHz ≈ **44 channels**.

**Per-wavelength rate:** 200 Gbps (coherent, 16-QAM).

**Total fiber capacity:** 44 × 200 Gbps = **8.8 Tbps**.

**With 400 Gbps per channel (coherent 64-QAM):** 44 × 400 = **17.6 Tbps**.

**With 50 GHz spacing (Super-C band):** ~80 channels → 80 × 400 Gbps = **32 Tbps**.

**Perspective:** A single modern fiber pair carries the **entire traffic of a
mid-sized country**. A transatlantic cable with 8 fiber pairs = **100–250 Tbps**
— enough for tens of millions of simultaneous 4K video streams.

### 3.3 OTN — Optical Transport Network

**OTN** (ITU-T G.709) provides:
- **Framing and multiplexing** of client signals (Ethernet, SDH/SONET, Fibre Channel).
- **Forward error correction** (FEC) — extends reach and reduces errors.
- **Operations, administration, maintenance (OAM)** — monitoring, protection switching.
- **Tandem connection monitoring** — end-to-end performance monitoring across
  operators.

**Common OTN rates:**

| Container | Rate | Client |
|---|---|---|
| **OTU1** | 2.7 Gbps | Gigabit Ethernet, STM-16 |
| **OTU2** | 10.7 Gbps | 10 Gigabit Ethernet |
| **OTU3** | 43 Gbps | 40G Ethernet |
| **OTU4** | 111.8 Gbps | 100G Ethernet |
| **OTUCn** | n × 100 Gbps | FlexE, 400G |

**The role of OTN** is similar to SDH (its predecessor) — it "wraps" client
traffic with error correction, monitoring, and protection. In a modern core,
OTN handles 100G/400G wavelength management under IP/MPLS.

### 3.4 IP/MPLS — the packet core

**IP/MPLS** carries the actual traffic — it's the L3 layer that routers process.

**MPLS** (Multiprotocol Label Switching) adds:
- **Label switching** — fast forwarding based on labels instead of IP lookups.
- **Traffic engineering** — explicit routes for specific traffic (avoiding
  congested links).
- **VPNs** — L2VPN and L3VPN isolate customer traffic on shared infrastructure.
- **Fast reroute** — sub-50 ms protection against link failures.

**How MPLS works:**

1. **Ingress router** classifies packets and adds a label (e.g., "traffic class
   gold, go via path A").
2. **Core routers** forward based on the label — no IP lookup, no BGP table.
3. **Egress router** removes the label and forwards the packet.

**Modern evolution — Segment Routing (SR):**

- **SR-MPLS** — labels encode a **path** as a list of segments (no per-flow
  state).
- **SRv6** — encodes paths as IPv6 addresses with **segment lists**. No MPLS
  needed.
- **Advantages:** simpler operations, traffic engineering without RSVP-TE,
  better SDN compatibility.

**The trend:** IP/MPLS is moving from "router-centric" to **SDN-controlled** —
a centralized controller (e.g., Cisco Crosswork, Juniper Paragon, Nokia NSP)
computes optimal paths and pushes segment lists to routers.

### 3.5 SDN and NFV

**SDN (Software-Defined Networking)** — decouple the **control plane** from the
**data plane**.

- **Data plane:** forwarding (hardware switches, routers).
- **Control plane:** routing decisions (centralized controller).
- **Northbound API** (to applications) — REST, gRPC.
- **Southbound API** (to devices) — OpenFlow, NETCONF, gNMI, P4Runtime.

**Advantages:** centralized visibility, programmability, rapid deployment of new
services.

**NFV (Network Function Virtualization)** — move network functions from dedicated
hardware to **virtual machines or containers** running on commodity servers.

- **VNFs** (Virtual Network Functions) — router, firewall, NAT, EPC, IMS as software.
- **MANO** (Management and Orchestration) — deployment, scaling, lifecycle.

**Combined SDN + NFV:** the network becomes a **software platform** — providers
deploy new services in minutes, scale to handle traffic spikes, and update
without hardware replacement.

**Where SDN/NFV are used:**

- **5G core** — service-based architecture, cloud-native (see Chapter 6).
- **Data center networks** — spine-leaf architecture, SDN controllers.
- **Wide-area networks (SD-WAN)** — enterprise WAN over any transport.
- **Access networks** — virtual OLTs, disaggregated RAN (O-RAN).

### 3.6 Submarine cables — connecting continents

**99% of international data** travels through **submarine cables** — not
satellites. ~450 cables globally, ~1.4 million km total length.

**Modern submarine cables:**

- **8–24 fiber pairs** per cable.
- **Each fiber pair** carries 100+ Tbps (coherent DWDM).
- **Total per cable** = ~1–20 Tbps (older) to **~100–250 Tbps** (newer, e.g.,
  Google's Dunant, Facebook's 2Africa).
- **Repeaters** every 40–80 km — optical amplifiers that boost the signal.
- **Latency:** ≈ 5 μs per km of fiber (speed of light in glass).

**The "latency race":** for financial trading, a new cable that's 10% shorter
is worth billions — because it shaves milliseconds off the London–New York
round-trip. The **Hibernia Express** (2015) was built specifically to be the
lowest-latency transatlantic route.

**Submarine cable economics:**

- **Capex:** $100M–500M per cable (multi-year project).
- **Capacity:** 100+ Tbps per cable.
- **Cost per bit:** **<$0.0001/GB** — the cheapest transport in the network.
- **Lifespan:** 25 years (but capacity upgrades every 5 years as coherent optics improve).

---

## 4. Distribution networks — metro and aggregation

### 4.1 The distribution tier

Between the access loop and the core, there's the **distribution** (or **metro**)
network — aggregating traffic from many access nodes into a few core nodes.

**Typical structure:**

```
Access (thousands of homes) → Aggregation (10–100 nodes) → Core (2–10 nodes)
```

**Technologies:**

- **Metro Ethernet** — Ethernet-based aggregation, standard in urban areas.
- **IP/MPLS** — for traffic that needs VPN, QoS, or traffic engineering.
- **DWDM** — for very high capacity between metro nodes.
- **OTN** — for transport-grade reliability.

### 4.2 Carrier Ethernet

**Carrier Ethernet** adapts Ethernet (designed for LANs) to operator requirements:

- **Reliability:** 50 ms protection switching (like SDH).
- **Scalability:** VLAN stacking (QinQ), 4K–16M service instances.
- **QoS:** 8 traffic classes with strict priority.
- **OAM:** IEEE 802.1ag (Connectivity Fault Management), Y.1731 (performance
  monitoring).

**MEF service definitions:**

| Service | Type | Use case |
|---|---|---|
| **E-Line** (EPL, EVPL) | Point-to-point | Business leased line, mobile backhaul |
| **E-LAN** (EP-LAN, EVP-LAN) | Multipoint (any-to-any) | Enterprise VPN, metro Ethernet |
| **E-Tree** (EP-Tree, EVP-Tree) | Rooted multipoint | Cable TV, video distribution |

- **EPL/EP-LAN** — dedicated (dedicated bandwidth per customer).
- **EVPL/EVP-LAN** — virtual (shared bandwidth with SLA).

**The MEF (Metro Ethernet Forum)** standardized these services — the framework
that lets an operator offer "Ethernet as a service" with the SLA guarantees of
traditional leased lines.

### 4.3 Ring vs. mesh topologies

**Ring topology** — nodes connected in a closed loop; traffic protection via
a **backup path** (half the capacity reserved for protection).

- **Advantages:** simple, sub-50 ms protection, predictable.
- **Disadvantages:** half the capacity lost to protection.
- **Used in:** legacy SDH/SONET, some modern metro Ethernet.

**Mesh topology** — nodes connected in a partial mesh (multiple paths).

- **Advantages:** full capacity available, better failure recovery with multiple
  paths, more flexible.
- **Disadvantages:** more complex routing, more fiber.
- **Used in:** modern IP/MPLS metro, leaf-spine data centers.

**The trend:** ring → mesh as SDN makes mesh routing tractable.

### 4.4 Aggregation for mobile

**Mobile aggregation** (from gNBs to core) uses the same wired infrastructure as
fixed broadband:

- **Fiber** — preferred; carries high capacity with low latency.
- **Metro Ethernet** — connects gNBs to the aggregation switch.
- **IP/MPLS** — routes traffic to the mobile core (EPC or 5GC).

**Latency requirements** (for 5G):

- **eMBB:** < 10 ms to core (satisfied by metro fiber).
- **URLLC:** < 1 ms to core (requires edge computing — MEC — see Chapter 6).
- **Sync:** ±1.5 μs for TDD (via GPS, SyncE, or IEEE 1588 PTP).

---

## 5. Mobile backhaul — the critical link

### 5.1 The backhaul challenge

**Mobile backhaul** connects cell sites to the core network. It is often the
**bottleneck** in mobile networks — radio capacity grows faster than backhaul.

**The capacity gap:**

| Generation | Typical backhaul requirement per site |
|---|---|
| 2G (GSM) | 2–10 Mbps (T1/E1 lines) |
| 3G (UMTS) | 50–100 Mbps |
| 4G (LTE) | **500 Mbps–2 Gbps** |
| 4G (LTE-A, 3-sector, CA) | **2–6 Gbps** |
| 5G (sub-6, mid-band) | **5–10 Gbps** |
| 5G (mmWave, dense) | **10–25 Gbps** |

**Each generation asks for 5–10× more backhaul** — often ahead of what operators
can deploy.

### 5.2 Backhaul technologies

| Technology | Capacity | Distance | Latency | Cost per Mbps |
|---|:---:|:---:|:---:|---|
| **Fiber** | 1–100+ Gbps | 40–80 km | ~5 μs/km | **Lowest** |
| **Microwave (6–42 GHz)** | 100 Mbps–3 Gbps | 1–30 km (LOS) | ~3 μs/km + processing | Moderate |
| **E-band (70/80 GHz)** | 1–10 Gbps | 1–3 km (LOS) | low | Moderate |
| **Satellite (GEO)** | 10–50 Mbps | global | **250–600 ms** | High |
| **Satellite (LEO)** | 50–200 Mbps | global | **30–60 ms** | Moderate–High |
| **DSL (copper)** | 5–100 Mbps | 1–5 km | Low | Moderate |

**Fiber is preferred** when available: highest capacity, lowest latency, lowest
cost-per-bit. But **only ~20–30% of cell sites worldwide have fiber** — the rest
use microwave or other wireless backhaul.

**Microwave** dominates rural backhaul — deployed in 30–60 days vs. months for
fiber trenching, cheaper for low-to-moderate capacity. Modern microwave (E-band,
70–80 GHz) carries 1–10 Gbps — enough for 4G and much of 5G.

**Satellite** is the last resort for remote sites (mountains, deserts, offshore).
**LEO** (Starlink, OneWeb) is changing this — sub-60 ms latency, 100+ Mbps,
competitive with rural microwave.

### Worked example 5.1 — backhaul sizing for a 5G site

**Scenario:** A 5G gNB, 3 sectors, 100 MHz per sector (sub-6), 64T64R massive
MIMO, peak 10 Gbps per sector.

**Peak per site:** 3 × 10 = **30 Gbps**.

**Busy-hour average:** 40% of peak = **12 Gbps**.

**Fiber backhaul:** Deploy **100G or 4×10G fiber** — overkill at current traffic
but ready for growth.

**Alternative — E-band microwave:** 4 × E-band links at 10 Gbps each = 40 Gbps
aggregate. Higher cost, weather-dependent, requires LOS.

**Alternative — DSL for a small cell:** Small cells (5G mmWave, 100–500 Mbps peak)
can be backhauled by G.fast DSL (500 Mbps) — viable for dense urban deployment
where fiber trenching is expensive.

**Rule of thumb:** provision **1.5× the busy-hour average** to allow for burst
traffic and future growth. For our 5G site: **~20 Gbps backhaul** as the initial
deployment target.

### 5.3 C-RAN backhaul — CPRI and eCPRI

**C-RAN** (Chapter 5, §5.9.3) splits the base station into:

- **RRH** (Remote Radio Head) — at the tower, RF + antennas.
- **BBU** (Baseband Unit) — centralized in a BBU pool.

The **fronthaul** between BBU and RRH carries **digitized I/Q samples** — much
higher bandwidth than the user data.

**CPRI (Common Public Radio Interface)** — the original fronthaul standard.

**CPRI bandwidth:**

$$
\boxed{\;R_{\text{CPRI}} = f_s \cdot N_{\text{bits}} \cdot 2 \cdot N_{\text{antennas}} \cdot \text{overhead}\;}
$$

For LTE 20 MHz:
- **I/Q sample rate:** 30.72 Msps (2× 15.36 Msps for oversampling).
- **Bits per sample:** 15 (typical).
- **I/Q components:** 2.
- **CPRI line rate per antenna stream:** 30.72 × 15 × 2 = 921.6 Mbps (plus overhead — CPRI options include 1.22, 2.43, 4.92, 9.83, 10.1, 24.3 Gbps).

**For a 3-sector, 4-antenna (MIMO) LTE site:**
3 sectors × 2 antennas × 921.6 Mbps ≈ **5.5 Gbps per site** (using CPRI option 7 at 9.83 Gbps line rate — with overhead and padding).

**For 5G NR 100 MHz, 64T64R massive MIMO:**
- **Sample rate:** 122.88 Msps.
- **Total I/Q streams:** 64 antennas (each with its own I/Q).
- **CPRI bandwidth:** ~50–100 Gbps **per sector** — way beyond what CPRI was designed for.

**eCPRI** (enhanced CPRI) is the 5G evolution: it splits the PHY between RRH
and BBU more flexibly — some PHY processing stays at the RRH, reducing fronthaul
to ~10–25 Gbps for 100 MHz massive MIMO.

**Even eCPRI is high** — this is why full C-RAN is deployed **only in dense
urban** (with short fiber runs to RRHs) and not in rural areas (where fronthaul
would be prohibitive).

### Worked example 5.2 — CPRI vs. user data

**Scenario:** An LTE eNodeB with 3 sectors, 2×2 MIMO, 20 MHz, peak user data
150 Mbps.

**User data:** 150 Mbps.
**CPRI bandwidth:** ~5.5 Gbps.

**Ratio:** CPRI carries **37× more bits** than the actual user data — because
it carries raw I/Q samples, not compressed data. This is the "**fronthaul tax**"
of C-RAN.

**eCPRI** partially corrects this by splitting at a different point:
- **Option split II** (within PHY, after FFT) — ~2–4× reduction.
- **Option split II-D** (after resource element mapping) — up to 10× reduction.
- **Option split I-D** (higher-PHY function in RRH) — up to 20× reduction.

**Trade-off:** more processing at the RRH (which has less compute and less
cooling than a BBU pool) vs. lower fronthaul bandwidth.

### 5.4 Timing and synchronization

Mobile networks require **precise timing** — especially **TDD** systems where
uplink and downlink share the same frequency and must align at cell edges.

**Requirements:**

- **FDD LTE:** ±50 ppb (parts per billion) — frequency only.
- **TDD LTE:** ±1.5 μs absolute time — much stricter.
- **TDD 5G NR:** ±1.5 μs absolute time, and ±130 ns for some features
  (e.g., carrier aggregation, CoMP).

**Where timing comes from:**

| Source | Accuracy | Cost |
|---|:---:|---|
| **GPS/GNSS receiver** | < 100 ns | Low (but antenna installation, vulnerability) |
| **IEEE 1588 PTP** (Precision Time Protocol) | < 1 μs (over fiber) | Moderate |
| **SyncE** (Synchronous Ethernet) | < 10 ppb frequency | Low (uses existing Ethernet) |

**GNSS is the primary source** at most cell sites — a GPS antenna on the tower
provides time-of-day and frequency reference. **But GNSS is vulnerable** to
jamming and spoofing — this is why many networks also use **1588 PTP** over
fiber as a backup.

**The trend:** with 5G's tighter timing requirements and increasing GNSS
vulnerability, operators are deploying **IEEE 1588 PTP + SyncE** as the primary
timing for new sites — GNSS becomes the backup.

---

## 6. The wired-wireless economics

### 6.1 Cost per bit — the thousandfold difference

| Access technology | Cost per GB |
|---|:---:|
| **Fiber (FTTH)** | ~$0.001–0.01 |
| **Cable (DOCSIS 3.1)** | ~$0.01–0.05 |
| **xDSL (VDSL2)** | ~$0.02–0.10 |
| **Fixed wireless (5G FWA)** | ~$0.10–0.50 |
| **Mobile 4G/5G** | **~$1–10** |

**The economic implication:** operators want to offload as much traffic as
possible to **wireless LAN** (WiFi) and **fiber**, keeping the expensive mobile
radio for mobility-only traffic.

**This drives:**

- **WiFi offload** — 60–80% of smartphone data in urban areas is on WiFi, not
  cellular.
- **Fixed-mobile convergence** — single core serving both fixed and mobile traffic.
- **Femtocells and small cells** — cell at home = high-quality wireless at
  low cost.

### 6.2 The "capacity vs. coverage" trade-off

Wired and wireless have **opposite economics**:

- **Wired:** high capex per home ($500–2000) but unlimited capacity and long
  life. Excellent economics at high density.
- **Wireless:** lower capex per home ($50–500) but limited capacity and short
  spectrum/life. Excellent economics at low density.

**The crossover** is around **~10–20 homes/km²**:

- **Above** — fiber is cheaper per home.
- **Below** — wireless (FWA, satellite) is cheaper per home.

This is why **rural broadband** is a worldwide problem — many rural areas are
below the crossover density, so private fiber deployment doesn't pay back.

### Worked example 6.1 — fiber vs. FWA deployment

**Scenario:** A village with 200 homes spread over 20 km².

**Fiber deployment:**
- Trench: ~15 km of new fiber routes.
- Cost per km: $30,000–$80,000 (rural trenching is expensive).
- Total trench cost: 15 × $50,000 = **$750,000**.
- Equipment per home (ONT): $200 × 200 = $40,000.
- **Total:** $790,000 → **$3,950 per home**.

**FWA deployment:**
- 2 base stations (for coverage): $80,000 each = $160,000.
- CPE per home: $300 × 200 = $60,000.
- Backhaul (fiber to each base station): $100,000.
- **Total:** $320,000 → **$1,600 per home**.

**FWA wins** at this density. Above ~1000 homes in the same 20 km², fiber
economies kick in — the trench cost is amortized over more homes.

### 6.3 Where the industry is heading

**Fiber everywhere it's economic:**

- **FTTH** in dense urban and new builds.
- **FTTC** + G.fast in older areas (upgrade path to FTTH).
- **FWA** for rural, where trenching is prohibitive.

**Convergence of fixed and mobile:**

- **5G core** (5GC) supports **fixed wireless access** (FWA) via the same
  infrastructure as mobile — operators can serve homes with 5G.
- **WiFi 6/7** provides gigabit-class speeds in homes, backhauled by fiber.
- **Single IP network** for all services.

**Software-defined everything:**

- **SDN** for core/transport.
- **NFV** for network functions.
- **Cloud-native 5G core**.
- **O-RAN** for disaggregated radio.

**The wired network becomes invisible infrastructure** — a cloud-like platform
delivering connectivity for any wireless service.

---

## 7. Chapter summary

1. **Every wireless call is mostly wired** — the radio link is the last 100 m–1 km;
   everything else is fiber. The wired infrastructure sets the capacity, latency,
   and cost envelope for wireless.
2. **Access loop** — the last-mile connection. **xDSL** (ADSL, VDSL2, G.fast) reuses
   copper; **DOCSIS** uses coax; **PON** (GPON 2.5 Gbps, XGS-PON 10 Gbps) is fiber
   to the home. **FWA** (5G at 3.5/28 GHz) is the wireless alternative for rural
   deployment.
3. **PON** — passive splitters (1:32, 1:128) share bandwidth. GPON gives ~80 Mbps
   per user worst-case; XGS-PON gives ~300 Mbps; both have headroom for typical
   consumer needs.
4. **Core network** — DWDM optical backbone, 100–400 Gbps per wavelength, 80+
   wavelengths per fiber → **8–32 Tbps per fiber pair**. OTN provides framing,
   FEC, and monitoring. IP/MPLS and Segment Routing route packets.
5. **SDN and NFV** — the trend from hardware-centric to software-defined networks.
   Centralized controllers, virtualized network functions, orchestrated by MANO.
   Foundation of 5G core and O-RAN.
6. **Distribution (metro) networks** — Carrier Ethernet (E-Line, E-LAN, E-Tree),
   ring or mesh topologies, aggregating access traffic into the core.
7. **Mobile backhaul** — fiber is preferred (highest capacity, lowest latency,
   lowest cost-per-bit). **~70% of global cell sites use wireless backhaul** (mostly
   microwave) because fiber isn't available. 5G sites need 5–25 Gbps — challenging
   for many sites.
8. **CPRI/eCPRI** — C-RAN fronthaul carries I/Q samples at ~5–100 Gbps per site
   (37× the user data). eCPRI reduces this via different PHY splits.
9. **Timing** — 5G TDD needs ±1.5 μs absolute time. GNSS is primary; IEEE 1588 PTP
   over fiber is backup. SyncE provides frequency synchronization.
10. **Cost per bit** — wired is 100–1000× cheaper than wireless. This drives
    WiFi offload, FMC, and the push toward fiber + FWA deployment strategies.

---

## 8. Quiz

### A. Multiple choice

1. **PON** uses which type of splitter?
   (a) Active electronic (b) Passive optical (c) Amplified (d) Coherent

2. GPON downstream capacity is:
   (a) 155 Mbps (b) 2.5 Gbps (c) 10 Gbps (d) 40 Gbps

3. **DOCSIS 3.1** uses which modulation?
   (a) QPSK (b) 256-QAM (c) **OFDM** (d) GMSK

4. **DWDM** multiplexes:
   (a) Time slots (b) Packets (c) **Optical wavelengths** (d) Codes

5. A typical DWDM system carries:
   (a) 1 wavelength (b) 8 wavelengths (c) **80+ wavelengths** (d) 4 wavelengths

6. **OTN** provides:
   (a) Packet routing (b) Framing, FEC, monitoring (c) Optical amplification (d) Spectrum allocation

7. **MPLS** forwards based on:
   (a) IP address (b) MAC address (c) **Label** (d) Port

8. **Carrier Ethernet E-Line** service is:
   (a) Point-to-point (b) Multipoint (c) Rooted multipoint (d) Broadcast

9. **Fiber backhaul** is preferred for 5G because:
   (a) It's cheapest (b) It has the highest capacity and lowest latency
   (c) It's easiest to install (d) It requires no power

10. **CPRI** carries:
    (a) User data (b) **Digitized I/Q samples** (c) Control signalling (d) Timing only

11. **IEEE 1588 PTP** provides:
    (a) Frequency only (b) **Time-of-day with sub-microsecond accuracy**
    (c) Power over Ethernet (d) Encryption

12. The cost per bit is **lowest** for:
    (a) Mobile 4G/5G (b) Fixed wireless (c) **Fiber (FTTH)** (d) Satellite

### B. Fill in the blank

1. **PON** stands for Passive **\_\_\_\_ Network**.
2. **GPON** provides \_\_\_\_ Gbps downstream and \_\_\_\_ Gbps upstream.
3. **XGS-PON** provides \_\_\_\_ Gbps symmetric capacity.
4. **DWDM** uses the **\_\_\_\_** band (1530–1565 nm) for most deployments.
5. **MPLS** stands for **\_\_\_\_** Label Switching.
6. **SDN** decouples the control plane from the **\_\_\_\_** plane.
7. **Fronthaul** in C-RAN carries **\_\_\_\_** samples from RRH to BBU.
8. **CPRI** line rates are \_\_\_\_, \_\_\_\_, \_\_\_\_, \_\_\_\_ Gbps (typical options).
9. TDD networks require **\_\_\_\_** microsecond absolute timing accuracy.
10. **\_\_\_\_** (three letters) is the protocol used for packet-based timing distribution.

### C. Define / explain

1. Explain why every wireless call is "mostly wired." Use a 5G call as an example
   and quantify the distances involved.
2. Compare **xDSL, DOCSIS, and PON** on capacity, distance, sharing, and cost.
   Which is best for rural, urban, and new-build deployment?
3. Describe **PON architecture** — OLT, splitter, ONU. Why is the passive splitter
   important for cost?
4. Explain **DWDM** and compute the total fiber capacity for 80 channels at 200 Gbps.
5. Describe the **layered core network** — fiber, DWDM, OTN, IP/MPLS. What is the
   role of each layer?
6. Explain **SDN and NFV**. What problems do they solve, and how are they used in
   5G?
7. Compare **ring and mesh** metro topologies. Which is used today and why?
8. Describe **mobile backhaul** options. Why do most cell sites worldwide use
   wireless backhaul instead of fiber?
9. Explain **C-RAN** and **CPRI**. Why is the fronthaul bandwidth so much larger
   than user data?
10. Explain **IEEE 1588 PTP** and why timing is critical for TDD.
11. Discuss the **cost-per-bit** difference between wired and wireless. How does
    this shape operator strategy?
12. A rural area has 500 homes spread over 30 km². Compare fiber vs. 5G FWA
    deployment economics. At what density does fiber become cheaper?

---

## 9. Answer key

??? success "A. Multiple choice"
    1. **(b)** — passive optical.
    2. **(b)** — 2.5 Gbps.
    3. **(c)** — OFDM.
    4. **(c)** — optical wavelengths.
    5. **(c)** — 80+ wavelengths.
    6. **(b)** — framing, FEC, monitoring.
    7. **(c)** — label.
    8. **(a)** — point-to-point.
    9. **(b)** — highest capacity and lowest latency.
    10. **(b)** — digitized I/Q samples.
    11. **(b)** — time-of-day with sub-microsecond accuracy.
    12. **(c)** — fiber (FTTH).

??? success "B. Fill in the blank"
    1. Optical.
    2. 2.5; 1.25.
    3. 10.
    4. C.
    5. Multiprotocol.
    6. data.
    7. I/Q (or digitized I/Q, or baseband).
    8. 1.22; 2.43; 4.92; 9.83 (also 10.1, 24.3, 48.5).
    9. 1.5.
    10. PTP.

??? success "C. Define / explain — model answers"
    1. *Mostly wired:* A 5G UE transmits to a gNB over a 100 m–1 km radio link. The
       gNB's backhaul is fiber (typically 5–100 km to the aggregation point). From
       aggregation to the mobile core is fiber (10–500 km). From the core to the
       internet is fiber (hundreds to thousands of km). Ratio of wired to wireless
       distance: 100–10,000×. The radio link is the "last hop" — the rest is fiber.
    2. *xDSL:* 100 Mbps (VDSL2 vectoring) to 1 Gbps (G.fast); 100 m–3 km; dedicated
       per line; low cost (reuses copper); good for existing copper. *DOCSIS:*
       1 Gbps (3.0) to 10 Gbps (3.1); coax 500 m–2 km; shared among 500–2000 homes
       per node; low cost where coax exists; good for cable operators. *PON:* 2.5
       Gbps (GPON) to 10 Gbps (XGS-PON) or 40 Gbps (NG-PON2); 20 km reach; shared
       among 32–128 subscribers per splitter; moderate cost (fiber); best for new
       builds and dense areas. *Best for:* rural → FWA or xDSL; urban → PON;
       new build → PON.
    3. *PON architecture:* OLT at the exchange → passive splitter → ONU at the
       subscriber. The splitter is a **passive optical device** — no power, no
       electronics, no maintenance. This is critical because it puts no active
       equipment in the field — no cabinet, no batteries, no cooling. Only the OLT
       (at the exchange) and the ONU (at the home) need power. This is what makes
       FTTH affordable.
    4. *DWDM:* WDM multiplexes multiple wavelengths on one fiber. DWDM uses 50/100
       GHz spacing → 40–80+ channels. Each channel carries 100–400 Gbps with
       coherent optics. Total: 80 × 200 Gbps = **16 Tbps** per fiber pair. That's
       enough for the entire traffic of a mid-sized country.
    5. *Layered core network:* (a) **Fiber** — physical medium, single-mode for
       long-haul. (b) **DWDM** — multiplexes wavelengths, provides huge capacity.
       (c) **OTN** — wraps client signals with FEC, monitoring, protection,
       multiplexing. (d) **IP/MPLS** — packet routing, VPN, traffic engineering,
       QoS. Each layer provides a distinct function and abstraction.
    6. *SDN:* decouples control plane (centralized controller) from data plane
       (forwarding hardware). Enables centralized optimization, programmability,
       fast deployment. *NFV:* virtualizes network functions (routers, firewalls,
       EPC) onto commodity servers. Enables flexible scaling, fast deployment,
       lower capex. *5G use:* 5G core is cloud-native, service-based, with NFV
       and SDN providing the deployment platform. Network functions (AMF, SMF,
       UPF) are virtualized, run in cloud/edge data centers, orchestrated by
       Kubernetes. This is what enables network slicing, MEC, and rapid service
       deployment.
    7. *Ring:* nodes connected in a loop, protection via a backup path (half
       capacity reserved). Simple, sub-50 ms protection, but wastes half the
       capacity on protection. *Mesh:* multiple paths between nodes; full capacity
       available; more flexible. Used in modern IP/MPLS metro with SDN — the
       controller computes optimal paths and handles failure recovery. *Trend:*
       ring → mesh as SDN makes mesh routing tractable.
    8. *Backhaul options:* fiber (highest capacity, lowest latency), microwave
       (1–3 Gbps, needs LOS, weather-dependent), E-band (1–10 Gbps, short range),
       satellite (10–200 Mbps, high latency for GEO, moderate for LEO), DSL (small
       cells). *Why mostly wireless:* fiber is expensive to deploy (trenching
       costs $30K–80K per km in rural areas); global fiber coverage is only 20–30%
       of cell sites; microwave deploys in 30–60 days; many rural sites are below
       the economic threshold for fiber.
    9. *C-RAN:* centralizes BBUs in a pool; RRHs at the tower; fronthaul between
       them. *CPRI:* carries **digitized I/Q samples**, not user data. For LTE 20
       MHz, CPRI carries ~5.5 Gbps per site — 37× the user data (150 Mbps peak).
       *Why the tax:* the RRH doesn't process the signal — it just converts
       between RF and digital. All processing happens at the BBU pool. The digitized
       RF samples have huge dynamic range and oversampling — 15-bit I/Q at 30.72
       Msps per antenna × many antennas. This gives C-RAN flexibility (all baseband
       processing centralized) but requires expensive fiber fronthaul. eCPRI
       reduces this by splitting PHY functions between RRH and BBU.
    10. *IEEE 1588 PTP:* distributes precise time (not just frequency) over Ethernet.
        Master/slave protocol with hardware timestamping in network switches. Accuracy
        < 1 μs over fiber; better with careful engineering. *Why critical:* TDD
        systems use the same frequency for uplink and downlink; if cells are not
        time-synchronized, uplink transmissions from one cell interfere with
        downlink transmissions in neighboring cells. FDD doesn't have this problem.
        TDD also needs timing for carrier aggregation, CoMP, and other features.
        ±1.5 μs is the requirement — GNSS provides this at most sites; PTP is the
        backup.
    11. *Cost per bit:* wired ~$0.001–0.01/GB, wireless ~$1–10/GB. 100–1000×
        difference. *Impact:* (i) operators push traffic to WiFi (60–80% of
        smartphone data in urban areas is on WiFi); (ii) fixed-mobile convergence —
        unified core for both; (iii) femtocells — cellular at home, cheaper than
        macro; (iv) 5G FWA vs. FTTH — choose based on density; (v) pricing models
        — mobile data is priced to discourage heavy use, fiber is unlimited.
    12. *500 homes, 30 km²:* density ~17 homes/km². *Fiber cost:* 20 km of trench
        at $50K/km = $1M; ONTs $200 × 500 = $100K; total ~$1.1M → **$2,200/home**.
        *5G FWA cost:* 2 base stations at $100K = $200K; CPE $300 × 500 = $150K;
        backhaul $150K; total ~$500K → **$1,000/home**. *FWA wins* at this density.
        *Break-even:* at ~1000 homes in the same 30 km² (~33 homes/km²), fiber
        cost per home drops to ~$1200 (trench amortized) — approaching FWA. Above
        ~1500 homes, fiber is clearly cheaper and higher-capacity. Below ~20
        homes/km², both are uneconomical — satellite or government subsidy needed.

---

## Further reading

- **J. Bourne**, *Fundamentals of DSL Technology*, Auerbach, 2005 — xDSL reference.
- **CableLabs**, *DOCSIS 3.1 specification* — free from cablelabs.com.
- **ITU-T G.984** (GPON), **G.987** (XG-PON), **G.9807** (XGS-PON), **G.989** (NG-PON2) — the PON standards.
- **R. Ramaswami, K. Sivarajan & G. Sasaki**, *Optical Networks: A Practical Perspective*, 3rd ed., Morgan Kaufmann, 2009 — the DWDM/optical networking reference.
- **ITU-T G.709** — OTN standard.
- **B. Davie & Y. Rekhter**, *MPLS: Technology and Applications*, Morgan Kaufmann, 2000 — the MPLS reference (older but foundational).
- **C. Filsfils et al.**, *Segment Routing*, 2 volumes, 2018 — the modern successor to MPLS-TE.
- **MEF** — Metro Ethernet Forum specifications at mef.net.
- **CPRI Cooperation** — CPRI specification at cpri.info.
- **3GPP TS 36.104**, **TS 38.104** — 5G NR base station radio transmission and reception (includes backhaul requirements).
- **O-RAN Alliance** — open RAN specifications at o-ran.org.
- **N. McKeown et al.**, "OpenFlow: Enabling Innovation in Campus Networks", *ACM SIGCOMM CCR*, 2008 — the SDN foundational paper.
- **ETSI NFV ISG** — NFV specifications at etsi.org.
- **TeleGeography** — submarine cable maps and data at submarinecablemap.com.

---

## Suggested tutorial problems

1. **PON comparison.** For GPON, XG-PON, XGS-PON, and NG-PON2, compute the per-user worst-case downstream rate for a 1:32 split. Tabulate. Which generation supports 4K video (25 Mbps) with 20× headroom?

2. **DWDM capacity growth.** A 96-fiber-pair submarine cable with 200 Gbps per wavelength and 64 wavelengths per fiber. Compute total cable capacity. If each wavelength upgrades to 400 Gbps (same 64 wavelengths), what's the new capacity? What fraction of it does one 5G call (say, 100 Mbps) use?

3. **xDSL reach.** A VDSL2 line at 100 Mbps has a maximum reach of 500 m. At 50 Mbps, reach is 1 km. At 25 Mbps, 1.5 km. Plot rate vs. distance. If a suburb has 2 km average loop length, what technology is needed?

4. **Fiber vs. FWA economics.** A village with 300 homes over 15 km². Compute fiber cost (10 km trench at $60K/km, $200/ONT) and FWA cost (1 base station $100K, $300/CPE, $100K backhaul). Which is cheaper? At what home density does fiber become cheaper?

5. **CPRI bandwidth.** For LTE 20 MHz, 4×4 MIMO, 3 sectors, compute CPRI bandwidth (assuming 15-bit I/Q at 30.72 Msps). Compare with user peak rate of 150 Mbps per sector.

6. **eCPRI reduction.** If eCPRI split II-D reduces CPRI bandwidth by 10×, what's the new bandwidth for a 5G NR 100 MHz, 64-antenna massive MIMO site? Is this deployable with 100G Ethernet?

7. **Backhaul sizing.** A 5G site with 3 sectors at 10 Gbps peak each. Provision backhaul for 60% busy-hour utilization, plus 2× headroom for growth. What backhaul capacity is needed? Compare with fiber (100G) vs. microwave (4 × E-band at 10 Gbps).

8. **Timing.** A network with 200 km of fiber between GNSS-disciplined master clock and slave gNB. Fiber delays ~5 μs/km. If PTP is not used and the slave relies only on a local oscillator with 10 ppm accuracy, how far off will the slave be after 1 hour? What's the correct slave accuracy after 1 hour with no holdover drift requirement?

9. **Timing backup.** A 5G site loses GNSS for 2 hours due to a storm. If the site has a **rubidium** oscillator (10⁻¹¹ stability) and uses PTP from a neighbor site, what happens? If it has only a **quartz** oscillator (10⁻⁷), what's the phase drift after 1 hour? Is it acceptable for TDD?

10. **Cost of mobile vs. fixed.** A user consumes 20 GB/month on mobile. Cost: $5/GB (mobile pricing) = $100/month. On fiber: $0.005/GB = $0.10/month. What's the incentive for the operator to offer WiFi offload? If 70% of traffic can be offloaded, what's the cost saving?

11. **Carrier Ethernet services.** A bank needs to connect 5 branches with a private network. Which MEF service (E-Line, E-LAN, E-Tree) fits best? Justify.

12. **SDN controller.** A service provider wants to deploy a new VPN service in a day instead of a month. What SDN and NFV components are needed? What is the workflow?

