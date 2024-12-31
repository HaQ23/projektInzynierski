CREATE TABLE IF NOT EXISTS employee (
    id BIGSERIAL PRIMARY KEY,
    firstname varchar(24) NOT NULL,
    lastname varchar(24) NOT NULL,
    phone_number varchar(24) NOT NULL
);

CREATE TABLE IF NOT EXISTS employee_schedule (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT,
    date DATE,
    unavailable_from varchar(32),
    time INTEGER,
    CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES employee(id)
);

CREATE TABLE IF NOT EXISTS offer (
    id BIGSERIAL PRIMARY KEY,
    title varchar(100) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS employee_offer (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT,
    offer_id BIGINT,
    price FLOAT NOT NULL,
    time  varchar(32)  NOT NULL,
    CONSTRAINT fk_offer_id FOREIGN KEY (offer_id) REFERENCES offer(id),
    CONSTRAINT fk_2_employee_id FOREIGN KEY (employee_id) REFERENCES employee(id)
);
