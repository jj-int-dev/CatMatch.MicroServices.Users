import checkDatabaseHealthCommand from '../commands/checkDatabaseHealthCommand';

export async function checkSystemHealthAction(): Promise<void> {
  await checkDatabaseHealthCommand();
}
