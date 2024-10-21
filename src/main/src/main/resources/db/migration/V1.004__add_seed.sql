-- Wstawienie danych do tabeli employee
INSERT INTO employee (firstname, lastname, phone_number)
VALUES
('Jan', 'Kowalski', '123-456-789'),
('Anna', 'Nowak', '987-654-321'),
('Marek', 'Wiśniewski', '555-123-456');

-- Wstawienie danych do tabeli offer
INSERT INTO offer (title, description)
VALUES
('Masaż relaksacyjny', 'Sesja masażu relaksacyjnego trwająca 60 minut'),
('Kurs pierwszej pomocy', 'Szkolenie z pierwszej pomocy przedmedycznej trwające 4 godziny'),
('Konsultacja fizjoterapeutyczna', 'Indywidualna konsultacja z fizjoterapeutą trwająca 30 minut');

-- Wstawienie danych do tabeli employee_offer
INSERT INTO employee_offer (employee_id, offer_id, price, time)
VALUES
(1, 1, 200.0, '60'),
(2, 2, 150.0, '40'),
(3, 3, 100.0, '30');
