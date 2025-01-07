FROM confluentinc/cp-kafka:7.0.1

# Ustaw zmienne środowiskowe dla Zookeepera
ENV ZOOKEEPER_CLIENT_PORT=2181
ENV ZOOKEEPER_TICK_TIME=2000

# Ustaw zmienne środowiskowe dla Kafki
ENV KAFKA_BROKER_ID=1
ENV KAFKA_ZOOKEEPER_CONNECT=localhost:2181
ENV KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://0.0.0.0:9092
ENV KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
ENV KAFKA_LOG_DIRS=/tmp/kafka-logs

# Otwórz porty dla Zookeepera i Kafki
EXPOSE 2181 9092

# Skopiuj skrypt startowy
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Domyślny CMD uruchamiający Zookeepera i Kafkę
CMD ["/start.sh"]
