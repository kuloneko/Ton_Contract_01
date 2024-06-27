import { Cell } from '@ton/core';
import { hex } from '../build/main.compiled.json';
import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { MainContract } from '../wrappers/MainContract';
import { toNano } from '@ton/core';
import '@ton/test-utils';
import 'ton-crypto';
import { compile } from '@ton/blueprint';
import { send } from 'process';
import { TonClient } from '@ton/ton';

describe('main.fc contract tests', () => {
  let blockchain: Blockchain;
  let myContract: SandboxContract<MainContract>;
  let initWallet: SandboxContract<TreasuryContract>;
  let ownerWallet: SandboxContract<TreasuryContract>;
  let codeCell: Cell;

  beforeAll(async () => {
    codeCell = await compile('MainContract');
  });

  beforeEach(async () => {
    blockchain = await Blockchain.create();
    initWallet = await blockchain.treasury('initWallet');
    ownerWallet = await blockchain.treasury('ownerWallet');

    myContract = blockchain.openContract(
      await MainContract.createFromConfig(
        {
          number: 0,
          address: initWallet.address,
          owner_address: ownerWallet.address,
        },
        codeCell,
      ),
    );
  });

  it('successfully deposits funds', async () => {
    // test logic is coming
    const senderWallet = await blockchain.treasury('sender');
    var balanceRequest = await myContract.getBalance();
    expect(balanceRequest.number).toBe('0');
    const depositMessageResult = await myContract.sendDeposit(
      senderWallet.getSender(),
      toNano(10),
    );

    expect(depositMessageResult.transactions).toHaveTransaction({
      from: senderWallet.address,
      to: myContract.address,
      success: true,
    });

    var balanceRequest = await myContract.getBalance();
    console.log(balanceRequest.number);

    expect(balanceRequest.number).toBeGreaterThan(toNano('4.99'));
  });
  it('should return deposit funds as no command is sent', async () => {
    // test logic is coming
    const senderWallet = await blockchain.treasury('sender');

    const depositMessageResult = await myContract.sendNocodeDeposit(
      senderWallet.getSender(),
      toNano('5'),
    );

    expect(depositMessageResult.transactions).toHaveTransaction({
      from: myContract.address,
      to: senderWallet.address,
      success: true,
    });

    const balanceRequest = await myContract.getBalance();

    expect(balanceRequest.number).toBe(0);
  });
});
