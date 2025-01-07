FROM confluentinc/cp-kafka:7.0.1

# Zmienne środowiskowe dla Zookeepera i Kafki
ENV ZOOKEEPER_CLIENT_PORT=2181
ENV ZOOKEEPER_TICK_TIME=2000
ENV KAFKA_BROKER_ID=1
ENV KAFKA_ZOOKEEPER_CONNECT=localhost:2181
ENV KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://0.0.0.0:9092
ENV KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
ENV KAFKA_LOG_DIRS=/tmp/kafka-logs

# Otwórz porty dla Zookeepera i Kafki
EXPOSE 2181 9092

# Domyślne CMD uruchamiające Zookeepera i Kafkę
CMD bash -c "\
    zookeeper-server-start /etc/kafka/zookeeper.properties & \
    sleep 5 && \
    kafka-server-start /etc/kafka/server.properties"
