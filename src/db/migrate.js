import {database, up, status }  from 'migrate-mongo'

export default async function() {
  try {
    const { db, client } = await database.connect();
    const migrated = await up(db, client);
    migrated.forEach(fileName => console.log('Migrated:', fileName));

    const migrationStatus = await status(db);
    migrationStatus.forEach(({ fileName, appliedAt }) => {
      console.log(fileName, ':', appliedAt)
    });

  } catch(error) {
    console.log('Migration error', error)
  }
};
