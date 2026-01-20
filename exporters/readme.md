# Exporters (Custom Scripts)
This directory contains **Bash scripts** that generate custom metrics in `.prom` format to be consumed by **Prometheus**.  

## Purpose
- Centralize scripts that produce custom metrics.

## How it works
1. Each `.sh` script is executed periodically (e.g., via `cron` or `systemd`) or manually.
2. The script generates a `.prom` file inside the `metrics/` subdirectory.
3. Prometheus reads these files using the **textfile collector** (Node Exporter).
4. The metrics become available for queries and dashboards in Grafana.
