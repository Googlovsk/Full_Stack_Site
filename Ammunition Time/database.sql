CREATE TABLE weapons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    info VARCHAR(255),
    price VARCHAR(255),
    dmgtype VARCHAR(255),
    weight VARCHAR(255),
    img VARCHAR(225)
);
CREATE TABLE armor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    info VARCHAR(255),
    price VARCHAR(255),
    weight VARCHAR(255),
    img VARCHAR(225)
);