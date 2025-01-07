#!/bin/bash

# Start Zookeeper
echo "Starting Zookeeper..."
zookeeper-server-start /etc/kafka/zookeeper.properties &

# Czekaj, aż Zookeeper się uruchomi
sleep 5

# Start Kafka
echo "Starting Kafka..."
kafka-server-start /etc/kafka/server.properties
