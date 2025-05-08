# 💇‍♂️ Aplikacja do zarządzania salonem fryzjerskim

Projekt inżynierski autorstwa Krzysztofa Dobosza. Aplikacja umożliwia zarządzanie rezerwacjami oraz usługami salonu fryzjerskiego, skierowana zarówno do klientów, jak i administratorów salonu.
## 🛠️ Technologie

- **Frontend:** Angular, Angular Material, TypeScript, HTML, SCSS
- **Backend:** Java, Spring Boot, Spring Data, Spring Security, Hibernate, Lombok
- **Baza danych:** PostgreSQL
- **Inne:** Apache Kafka, Eureka Discovery Server, JWT

## 📌 Główne funkcje

- Rejestracja i logowanie z obsługą tokenów JWT
- Rezerwacja usług fryzjerskich u konkretnych pracowników
- Przypomnienia i potwierdzenia wizyt za pomocą systemu powiadomień
- Zarządzanie użytkownikami, pracownikami, usługami i rezerwacjami przez panel administratora
- Automatyczne powiadomienia (Apache Kafka + e-mail)

## 🧱 Architektura systemu

System oparty na architekturze mikroserwisowej:

- **Frontend:** Angular + Angular Material (SPA)
- **Backend:** Java + Spring Boot (REST API, Spring Security, Hibernate, Lombok)
- **Baza danych:** PostgreSQL
- **Komunikacja:** Apache Kafka
- **Rejestr usług:** Eureka Server

## 🧑‍💼 Widoki użytkownika

- **Klient:** może rezerwować wizyty, zarządzać nimi, edytować profil
- **Administrator:** pełna kontrola nad użytkownikami, pracownikami, usługami i rezerwacjami


## 🖼️ Zrzuty ekranu

### 🔐 Logowanie
![Logowanie](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/strona_logowania.png)

### 📝 Rejestracja
![Rejestracja](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/strona_rejestracji.png)

### 💇‍♀️ Przegląd usług
![Usługi](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/strona_uslug.png)

### 📅 Rezerwacja usługi
![Rezerwacja](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/modal_rezerwacji_uslugi.png)

### 👤 Profil użytkownika
![Profil](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/profil_uzytkownika.png)

### 🧰 Panel administratora – zarządzanie ofertami
![Zarządzanie ofertami](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/zarzadzanie_ofertami.png)

### 🧾 Diagram bazy danych (ERD)
![Diagram ERD](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/diagram_erd.png)
