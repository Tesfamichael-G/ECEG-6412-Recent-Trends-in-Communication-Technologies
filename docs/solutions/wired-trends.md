# Solutions to Wired Technology Trends

[:octicons-arrow-left-24: Back to Wired Trends](../chapters/wired-trends.md)

---

## 1. PON comparison

| Standard | Total DL | Split 1:32 → per user | 20× headroom for 4K (25 Mbps)? |
|:---:|:---:|:---:|:---:|
| GPON | 2.5 Gbps | **78 Mbps** | 78/25 = 3.1× ✅ |
| XG-PON | 10 Gbps | **312 Mbps** | 12.5× ✅ |
| XGS-PON | 10 Gbps (symmetric) | 312 Mbps | 12.5× ✅ |
| NG-PON2 | 40 Gbps | 1.25 Gbps | 50× ✅ |

**All support 4K with 20× headroom for GPON's 78 Mbps case** (78/25 ≈ 3.1× — meets 20× only if you consider multi-stream). For strict 20× (500 Mbps), need XG-PON or higher.

---

## 2. DWDM capacity growth

**Initial:** 96 fibers × 64 wavelengths × 200 Gbps = **1.23 Pbps** total cable capacity.

**Upgrade to 400 Gbps per wavelength:** 96 × 64 × 400 = **2.46 Pbps**.

**One 5G call (100 Mbps)** uses $10^8 / 2.46\times10^{15} \approx 4 \times 10^{-8}$ (0.000004%) of the cable.

---

## 3. xDSL reach

**Plot data:** rate vs. distance is roughly $R \propto d^{-k}$ with $k \approx 1.5$.

| Rate | Distance |
|:---:|:---:|
| 100 Mbps | 500 m |
| 50 Mbps | 1 km |
| 25 Mbps | 1.5 km |

**2 km average loop:** max 25 Mbps (VDSL2). **Not sufficient** for 4K video or heavy data. **Need FTTC** (fiber to the cabinet, then G.fast over short copper) or **FTTH**.

---

## 4. Fiber vs. FWA economics

**Fiber cost:** 10 km trench × $60K/km = $600K; 300 ONTs × $200 = $60K; **$660K** → **$2,200/home**.

**FWA cost:** 1 BS × $100K + 300 CPE × $300 + $100K backhaul = **$290K** → **$967/home**.

**FWA wins** at 15 km² density (~20 homes/km²).

**Fiber becomes cheaper when:** $1.1M / N homes < $967 → N > **1,140 homes**. At 15 km², that's ~76 homes/km².

**Crossover: ~70–80 homes/km²** for this cost structure. Above that, fiber; below, FWA.

---

## 5. CPRI bandwidth

**LTE 20 MHz, 4×4 MIMO, 3 sectors:**
- Sample rate: 30.72 Msps.
- Bits/sample: 15 (I) + 15 (Q) = 30 bits.
- Per antenna stream: 30.72 × 30 = 921.6 Mbps.
- Per sector: 4 antennas × 921.6 = 3.69 Gbps.
- 3 sectors: **11.06 Gbps** CPRI.

**vs. user peak 150 Mbps per sector:** CPRI is 3.69 Gbps per sector = **24.6× the user data**.

---

## 6. eCPRI reduction

**5G NR 100 MHz, 64-antenna massive MIMO:**
- Sample rate: 122.88 Msps.
- Per antenna: 122.88 × 30 = 3.69 Gbps.
- 64 antennas: 236 Gbps CPRI.
- **eCPRI split II-D (10× reduction):** ~**24 Gbps**.

**Deployable with 100G Ethernet?** Yes — 24 Gbps fits easily in 100G.

**With split II (4×):** ~59 Gbps → still fits in 100G.

**With eCPRI + split options:** 25G Ethernet viable for most 5G C-RAN deployments.

---

## 7. Backhaul sizing

**Peak per site:** 30 Gbps.
**Average at 60%:** 18 Gbps.
**With 2× headroom:** **36 Gbps**.

**Fiber options:**
- 40G (4×10G) — marginal for peak.
- 100G — comfortable.
- 4×100G — overkill but future-proof.

**Microwave:**
- 4 × E-band (10 Gbps each) = 40 Gbps — viable but weather-sensitive.
- 4 × microwave (2 Gbps each) = 8 Gbps — insufficient.

**Fiber is clearly preferred** for capacity; microwave as backup or where fiber unavailable.

---

## 8. Timing — fiber delay

**200 km fiber:** delay = 200 × 5 μs = **1 ms one-way**.

**Round-trip delay (PTP):** 2 ms.

**Without PTP (only local oscillator at 10 ppm):** drift after 1 hour = 10 ppm × 3600 s = 36 ms — way off.

**With PTP:** < 1 μs — matches TDD requirement of ±1.5 μs.

**Conclusion:** PTP over fiber (with hardware timestamping at every switch) is essential for TDD synchronization.

---

## 9. GNSS loss and PTP backup

**Scenario:** Site loses GNSS for 2 hours.

**With rubidium (10⁻¹¹ stability):** drift after 2 hours = 10⁻¹¹ × 7200 s = **72 ns** — well within ±1.5 μs TDD requirement. **Acceptable.**

**With quartz (10⁻⁷ stability):** drift = 10⁻⁷ × 7200 = **720 μs** — way over. **Not acceptable for TDD.**

**Real-world:** operators use **rubidium at critical sites**, quartz at less critical ones, always backed by PTP from a neighbor.

---

## 10. Mobile vs. fixed cost

**User:** 20 GB/month mobile.
- **Mobile cost:** $5/GB × 20 GB = $100/month.
- **Fiber cost:** $0.005/GB × 20 GB = $0.10/month.

**Offload savings:** if 70% of traffic is offloaded to WiFi, mobile traffic drops from 20 GB to 6 GB — saving $70/month for the operator.

**Industry data:** 60–80% of smartphone data in urban areas is on WiFi. This saves operators **billions per year** — and is why WiFi offload is a strategic priority.

---

## 11. Carrier Ethernet for bank branches

**5 branches, private network:** need private point-to-multipoint connectivity with security.

**Best fit:** **E-LAN** (multipoint Ethernet) — all 5 branches in one broadcast domain, any-to-any connectivity, MEF-standardized QoS.

**Alternatives:**
- **E-Line** — need one point-to-point link per pair → 10 links. Overkill.
- **E-Tree** — for broadcast (cable TV); not suitable for banking.

**E-LAN with MEF 6.2 EPL** gives dedicated bandwidth, QoS, and SLA — matches a bank's reliability requirement.

---

## 12. SDN service deployment

**Goal:** deploy a new VPN service in a day (vs. a month).

**Required components:**
- **SDN controller** (e.g., Cisco Crosswork, Juniper Paragon) for path computation, service provisioning.
- **NFV infrastructure** (OpenStack/Kubernetes) hosting virtual routers and firewalls.
- **VNFs** (vRouter, vFirewall, vCPE) as cloud-native containers.
- **MANO** (e.g., ONAP, OSM) for orchestration.
- **OSS/BSS integration** for service order and billing.

**Workflow:**
1. Customer orders VPN via web portal (BSS).
2. OSS translates order → service intent → MANO → SDN controller.
3. SDN controller computes optimal path (Segment Routing), provisions the underlay.
4. NFV orchestrator spins up VNFs (routers, firewalls) at customer sites.
5. Configuration pushed via NETCONF/YANG.
6. Service active in **minutes to hours**, not a month.

**Traditional process:** weeks of manual config across multiple network teams, each touching their portion. SDN/NFV collapses this to a single automated workflow.