#!/bin/bash

OUTPUT="$(dirname "$0")/metrics/docker_metrics.prom"
NOW=$(date +%s)

# Limpiamos el archivo anterior
: > "$OUTPUT"
echo "#Docker Metrics Export" >> "$OUTPUT"

# ================================
# IMÁGENES
# ================================
ACTIVE_IMAGE_IDS=$(docker ps --format '{{.Image}}' | xargs -n1 docker image inspect --format '{{.ID}}' | sort | uniq)

docker images --format "{{.Repository}}:{{.Tag}} {{.ID}}" | while read IMAGE ID; do
    SIZE_BYTES=$(docker image inspect "$ID" --format '{{.Size}}' 2>/dev/null)
    if echo "$ACTIVE_IMAGE_IDS" | grep -q "$ID"; then
        echo "docker_image_size_active{name=\"$IMAGE\"} $SIZE_BYTES" >> "$OUTPUT"
    else
        echo "docker_image_size_inactive{name=\"$IMAGE\"} $SIZE_BYTES" >> "$OUTPUT"
    fi
done

TOTAL_IMAGES=$(docker images -q | wc -l)
ACTIVE_IMAGES=$(echo "$ACTIVE_IMAGE_IDS" | wc -l)
INACTIVE_IMAGES=$((TOTAL_IMAGES - ACTIVE_IMAGES))

echo "docker_images_total $TOTAL_IMAGES" >> "$OUTPUT"
echo "docker_images_active $ACTIVE_IMAGES" >> "$OUTPUT"
echo "docker_images_inactive $INACTIVE_IMAGES" >> "$OUTPUT"

# ================================
# CACHE
# ================================
CACHE_SIZE=$(docker system df | grep "Build Cache" | awk '{print $5}')
CACHE_BYTES=$(echo $CACHE_SIZE | awk '
/KB$/ {sub("KB",""); print $1*1024}
 /MB$/ {sub("MB",""); print $1*1024*1024}
 /GB$/ {sub("GB",""); print $1*1024*1024*1024}
')
echo "docker_cache_size_total $CACHE_BYTES" >> "$OUTPUT"

# ================================
# CONTENEDORES
# ================================
TOTAL_CONTAINERS=$(docker ps -a -q | wc -l)
ACTIVE_CONTAINERS=$(docker ps -q | wc -l)
EXITED_CONTAINERS=$(docker ps -f status=exited -q | wc -l)

echo "docker_containers_total $TOTAL_CONTAINERS" >> "$OUTPUT"
echo "docker_containers_active $ACTIVE_CONTAINERS" >> "$OUTPUT"
echo "docker_containers_exited $EXITED_CONTAINERS" >> "$OUTPUT"

# ================================
# UPTIME & FINISHED
# ================================
# Contenedores activos
for c in $(docker ps -q); do
    NAME=$(docker inspect --format '{{.Name}}' $c | sed 's/\///')
    START=$(docker inspect --format '{{.State.StartedAt}}' $c | cut -d. -f1 | sed 's/Z$//')
    START_EPOCH=$(date -d "$START" +%s 2>/dev/null)
    NOW=$(date +%s)

    if [ -n "$START_EPOCH" ]; then
        UPTIME=$((NOW - START_EPOCH))
        echo "docker_container_uptime_seconds{name=\"$NAME\"} $UPTIME" >> "$OUTPUT"
    else
        echo "docker_container_uptime_seconds{name=\"$NAME\"} 0" >> "$OUTPUT"
    fi
done

# Contenedores detenidos
for c in $(docker ps -f status=exited -q); do
    NAME=$(docker inspect --format '{{.Name}}' $c | sed 's/\///')
    RAW_FINISH=$(docker inspect --format '{{.State.FinishedAt}}' $c)

    if [ "$RAW_FINISH" = "0001-01-01T00:00:00Z" ]; then
        STOPPED_FOR=0
    else
        FINISH_EPOCH=$(date -u -d "$(echo "$RAW_FINISH" | cut -d. -f1 | sed 's/Z$//')" +%s 2>/dev/null)
        NOW=$(date +%s)
        STOPPED_FOR=$((NOW - FINISH_EPOCH))
    fi

    echo "docker_container_stopped_for_seconds{name=\"$NAME\"} $STOPPED_FOR" >> "$OUTPUT"
done
