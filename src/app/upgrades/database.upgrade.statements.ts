export class DatabaseUpgradeStatements {
    userUpgrades = [
        {
            toVersion: 1,
            statements: [
                `CREATE TABLE IF NOT EXISTS favorite_threads(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_ref TEXT NOT NULL,
                thread_ref TEXT NOT NULL
                );`,
                `CREATE TABLE IF NOT EXISTS favorite_articles(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_ref TEXT NOT NULL,
                article_ref TEXT NOT NULL
                );`
            ]
        }
    ]
}
