const tables: string[] = [
    `CREATE TABLE IF NOT EXISTS drones(
        id INTEGER PRIMARY KEY,
        serial_number TEXT NOT NULL UNIQUE,
        model_id INTEGER,
        weight_limit REAL,
        battery_capacity INTEGER,
        state_id INTEGER
    )`,

    `CREATE TABLE IF NOT EXISTS medications(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        weight REAL NOT NULL,
        code,
        identifier TEXT NOT NULL UNIQUE,
        image TEXT
    )`,

    `CREATE TABLE IF NOT EXISTS models(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
    )`,

    `CREATE TABLE IF NOT EXISTS states(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
    )`,

    `CREATE TABLE IF NOT EXISTS trips(
        id INTEGER PRIMARY KEY,
        drone_id INTEGER NOT NULL,
        medication_id INTEGER NOT NULL,
        start_date INTEGER NOT NULL,
        end_date INTEGER
    )`,

    `CREATE TABLE IF NOT EXISTS dron_audits(
        id INTEGER PRIMARY KEY,
        drone_id INTEGER NOT NULL,
        battery_level INTEGER NOT NULL,
        date INTEGER NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS trip(
        id INTEGER PRIMARY KEY,
        drone_id INTEGER NOT NULL,
        medication_id INTEGER NOT NULL,
        active INTEGER
    )`
];

export const setup_data: string[] = [
    `INSERT INTO models(name) 
    VALUES
    ("Lightweight"),
    ("Middleweight"),
    ("Cruiserweight"),
    ("Heavyweight")
    `,
    `INSERT INTO states(name) 
    VALUES
    ("IDLE"),
    ("LOADING"),
    ("LOADED"),
    ("DELIVERING"),
    ("DELIVERED"),
    ("RETURNING")
    `
]

export default tables;