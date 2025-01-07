FROM confluentinc/cp-kafka:7.0.1

# Skopiowanie plików konfiguracyjnych
COPY server.properties /etc/kafka/server.properties
COPY zookeeper.properties /etc/kafka/zookeeper.properties
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Ustawienia środowiskowe
ENV KAFKA_BROKER_ID=1
ENV KAFKA_ZOOKEEPER_CONNECT=localhost:2181
ENV KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://0.0.0.0:9092
ENV KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
ENV KAFKA_LOG_DIRS=/var/lib/kafka

# Otwieranie portów
EXPOSE 2181 9092

# Czyszczenie katalogu logów
RUN rm -rf /var/lib/kafka/*

# Domyślne CMD uruchamiające Kafkę i Zookeepera
CMD ["/start.sh"]
