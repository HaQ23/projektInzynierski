FROM confluentinc/cp-kafka:7.0.1

# Ustaw zmienne środowiskowe dla Zookeepera i Kafki
ENV ZOOKEEPER_CLIENT_PORT=2181
ENV ZOOKEEPER_TICK_TIME=2000
ENV KAFKA_BROKER_ID=1
ENV KAFKA_ZOOKEEPER_CONNECT=localhost:2181
ENV KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://0.0.0.0:9092
ENV KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
ENV KAFKA_LOG_DIRS=/tmp/kafka-logs

# Utwórz pliki konfiguracyjne Zookeepera i Kafki
RUN mkdir -p /etc/kafka

# Konfiguracja Zookeepera
RUN echo "dataDir=/tmp/zookeeper\n\
clientPort=${ZOOKEEPER_CLIENT_PORT}\n\
maxClientCnxns=0\n\
tickTime=${ZOOKEEPER_TICK_TIME}\n\
initLimit=10\n\
syncLimit=5" > /etc/kafka/zookeeper.properties

# Konfiguracja Kafki
RUN echo "broker.id=${KAFKA_BROKER_ID}\n\
log.dirs=${KAFKA_LOG_DIRS}\n\
zookeeper.connect=${KAFKA_ZOOKEEPER_CONNECT}\n\
listeners=${KAFKA_ADVERTISED_LISTENERS}\n\
num.network.threads=3\n\
num.io.threads=8\n\
log.retention.hours=168\n\
log.segment.bytes=1073741824\n\
log.retention.check.interval.ms=300000" > /etc/kafka/server.properties

# Skrypt startowy
RUN echo "#!/bin/bash\n\
echo 'Starting Zookeeper...'\n\
zookeeper-server-start /etc/kafka/zookeeper.properties &\n\
sleep 5\n\
echo 'Starting Kafka...'\n\
kafka-server-start /etc/kafka/server.properties" > /start.sh

# Nadanie uprawnień do skryptu
RUN chmod +x /start.sh

# Otwórz porty Zookeepera i Kafki
EXPOSE 2181 9092

# Domyślny CMD
CMD ["/start.sh"]
