FROM openjdk:11-jre-slim

# Ustawienie katalogu roboczego
WORKDIR /opt/kafka

# Instalacja zależności i pobranie Kafka z alternatywnego źródła
RUN apt-get update && apt-get install -y wget && \
    wget https://archive.apache.org/dist/kafka/3.5.1/kafka_2.13-3.5.1.tgz && \
    tar -xzf kafka_2.13-3.5.1.tgz --strip 1 && \
    rm kafka_2.13-3.5.1.tgz && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Dodanie konfiguracji Zookeepera
RUN echo "tickTime=2000\n\
initLimit=5\n\
syncLimit=2\n\
dataDir=/tmp/zookeeper\n\
clientPort=2181" > config/zookeeper.properties

# Dodanie konfiguracji Kafka
RUN echo "broker.id=1\n\
log.dirs=/tmp/kafka-logs\n\
zookeeper.connect=localhost:2181\n\
num.network.threads=3\n\
num.io.threads=8\n\
log.retention.hours=168\n\
log.segment.bytes=1073741824\n\
log.retention.check.interval.ms=300000\n\
num.partitions=1\n\
default.replication.factor=1\n\
offsets.topic.replication.factor=1" > config/server.properties

# Otworzenie portów
EXPOSE 9092 2181

# Komenda startowa
CMD ["sh", "-c", "\
echo 'Starting ZooKeeper...' && \
bin/zookeeper-server-start.sh config/zookeeper.properties & \
sleep 5 && \
echo 'Starting Kafka...' && \
bin/kafka-server-start.sh config/server.properties"]
