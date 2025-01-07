FROM openjdk:11-jre-slim

# Ustaw zmienne środowiskowe
ENV ZOOKEEPER_PORT=2181
ENV KAFKA_PORT=9092
ENV ZOOKEEPER_DATA_DIR=/tmp/zookeeper
ENV KAFKA_LOG_DIR=/tmp/kafka-logs
ENV KAFKA_BROKER_ID=1
ENV ZOOKEEPER_TICK_TIME=2000
ENV ZOOKEEPER_INIT_LIMIT=10
ENV ZOOKEEPER_SYNC_LIMIT=5

# Instalacja Kafki i Zookeepera
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://archive.apache.org/dist/kafka/3.5.1/kafka_2.13-3.5.1.tgz && \
    tar -xzf kafka_2.13-3.5.1.tgz && \
    mv kafka_2.13-3.5.1 /opt/kafka && \
    rm kafka_2.13-3.5.1.tgz

# Utwórz katalogi dla Zookeepera
RUN mkdir -p ${ZOOKEEPER_DATA_DIR}

# Konfiguracja Zookeepera
RUN echo "tickTime=${ZOOKEEPER_TICK_TIME}\n\
dataDir=${ZOOKEEPER_DATA_DIR}\n\
clientPort=${ZOOKEEPER_PORT}\n\
initLimit=${ZOOKEEPER_INIT_LIMIT}\n\
syncLimit=${ZOOKEEPER_SYNC_LIMIT}" > /opt/kafka/config/zookeeper.properties

# Konfiguracja Kafki
RUN echo "broker.id=${KAFKA_BROKER_ID}\n\
log.dirs=${KAFKA_LOG_DIR}\n\
zookeeper.connect=localhost:${ZOOKEEPER_PORT}\n\
listeners=PLAINTEXT://0.0.0.0:${KAFKA_PORT}\n\
num.network.threads=3\n\
num.io.threads=8\n\
log.retention.hours=168\n\
log.segment.bytes=1073741824\n\
log.retention.check.interval.ms=300000" > /opt/kafka/config/server.properties

# Otwórz porty
EXPOSE ${ZOOKEEPER_PORT} ${KAFKA_PORT}

# CMD dla uruchomienia obu procesów
CMD bash -c "/opt/kafka/bin/zookeeper-server-start.sh /opt/kafka/config/zookeeper.properties & \
             sleep 5 && \
             /opt/kafka/bin/kafka-server-start.sh /opt/kafka/config/server.properties"
