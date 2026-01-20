# Monitoring Service
This repository provides the monitoring stack. It allows for the collection, visualization, and analysis of system, container, and database metrics.

## Features
- **Prometheus**: Metrics collection.
- **Grafana**: Metrics visualization in dashboards.
- **Node Exporter**: System metrics.
- **cAdvisor**: Docker container metrics.
- **Postgres Exporter**: PostgreSQL database metrics.
- **Custom Exporters**: Custom scripts for specific metrics.

## Getting Started
### Prerequisites
- Docker and Docker Compose installed.
- Backend `docker-compose.yml` running and connected to the same Docker network (`vudip-network`).
  
### Installation
1. Clone the repository
  ```
  git clone https://github.com/Talkgu/infra-vudip.git
  ```
2. Go to infra-vudip directory
  ```
  cd infra-vudip
  ```
4. Start the monitoring stack
  ```
  docker compose up -d
  ```
5. Check the containers
  ```
  docker compose ps
  ```
## Usage
### Prometheus
1. Access the Prometheus UI
  ```
  http://localhost:9090
  ```
2. Run the query `up` to check the status of all targets defined in `prometheus.yml`.
  ```
  up
  ```

### Grafana
1. Access the Grafana UI. Default login: `admin/admin`
  ```
  http://localhost:3001
  ```
2. Configure Prometheus as a data source
  ```
  Connections - Data sources - Add new data source - Prometheus - Connection: http://prometheus:9090
  ```
3. Import the dashboards located in the `dashboards/` directory (JSON files) to visualize metrics:
   ```
   Dashboards - New - Import - Upload dashboard JSON file
   ```

### Notes
- **Custom Exporters**: Scripts for application-specific metrics are located in the `exporters/` directory.  
- **Dashboards**: Predefined Grafana dashboards are located in the `dashboards/` directory.  
- **Persistence**: Volumes are configured to keep Prometheus data and Grafana dashboards after container restarts.
