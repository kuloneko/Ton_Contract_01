import { address, toNano } from '@ton/core';
import { MainContract } from '../wrappers/MainContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
  const myContract = MainContract.createFromConfig(
    {
      number: 0,
      address: address('kQD7rdYPYJeZzex0RfUVcN_-utuyQp20Nm1eTP7Zah1Iaz6M'),
      owner_address: address(
        'kQD7rdYPYJeZzex0RfUVcN_-utuyQp20Nm1eTP7Zah1Iaz6M',
      ),
    },
    await compile('MainContract'),
  );

  const openedContract = provider.open(myContract);

  openedContract.sendDeploy(provider.sender(), toNano('0.05'));

  await provider.waitForDeploy(myContract.address);
}
