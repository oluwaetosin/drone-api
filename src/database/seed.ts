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

    `CREATE TABLE IF NOT EXISTS drone_medications(
        id INTEGER PRIMARY KEY,
        drone_id INTEGER NOT NULL,
        medication_id INTEGER NOT NULL,
        active INTEGER NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS drone_audits(
        id INTEGER PRIMARY KEY,
        drone_id INTEGER NOT NULL,
        battery_level INTEGER NOT NULL,
        date INTEGER NOT NULL
    )`,

    
];

export const tableNames: string[] = [
    "drones",
    "medications",
    "models",
    "states",
    "drone_medications",
    "drone_audits"
]

export const setup_data: string[] = [
    `INSERT OR IGNORE INTO models(name) 
    VALUES
    ("Lightweight"),
    ("Middleweight"),
    ("Cruiserweight"),
    ("Heavyweight")
    `,
    `INSERT OR IGNORE INTO states(name) 
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