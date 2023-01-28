import chai, { expect } from 'chai';
import chaiSubset from 'chai-subset';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import {
  $,
  deployDummyUSDTether,
  EvmCheckpoint,
  EvmHelper,
  SignerWithAddress
} from '../../helpers';
import {
  DummyUSDTether, DummyUSDTether__factory
} from '../../lib/contracts';

chai.use(chaiSubset);

const MAX_FAUCET_TOKEN_TRANSFER = 1_000_000_000;

describe('DummyUSDTether', function () {
    let ownerSigner: SignerWithAddress;
    let secondCreator: SignerWithAddress;
    let account2: SignerWithAddress;
    let usdt: DummyUSDTether;
    let evm: EvmHelper;
    let checkpoint: EvmCheckpoint;
    const faucetMintAmount = BigNumber.from(10).pow(18) ;
    const faucetUserTransferAmount = BigNumber.from(1000);
    const transferUSDT_1000 = $(1000);
    const checkContractLockTime = BigNumber.from(86400);
    const newLockTime = BigNumber.from(60);
    const checkNewLockTime = BigNumber.from(3600);
    before(async () => {
      evm = new EvmHelper(ethers.provider);
      [
        ownerSigner,
        account2,
        secondCreator
      ] = await ethers.getSigners();
      // Deploy USDT Token
      usdt = await new DummyUSDTether__factory(ownerSigner).deploy();
      usdt = await deployDummyUSDTether(ownerSigner);
      checkpoint = await EvmCheckpoint.create();  

    });


    it("Initial Address LockTime Should Be 1day" , async () => {
      expect(await usdt.userAddressLockTime()).to.eq(checkContractLockTime);
    })
  
    it("Owner Address Should Have Admin Role" , async () => {
      expect(await usdt.isAdmin(ownerSigner.address)).to.be.true;
    })

    it("Owner Address Should Have User Role" , async () => {
      expect(await usdt.isUser(ownerSigner.address)).to.be.false;
    })

    it("Max Faucet Token Transfer should not exceed 1000USDT" , async () => {
      expect(await usdt.MAX_FAUCET_TOKEN_TRANSFER()).to.eq(MAX_FAUCET_TOKEN_TRANSFER);
    })

    it("Should grant account USER Role" , async () => {
      await usdt.addUser(account2.address);
      expect(await usdt.isUser(account2.address)).to.be.true;
    })
    it("Should grant another account ADMIN Role" , async () => {
      await usdt.addAdmin(account2.address);
      expect(await usdt.isAdmin(account2.address)).to.be.true;
    })
    it("Should Return ADMIN Role To Owner" , async () => {
      await usdt.addUser(ownerSigner.address);
      expect(await usdt.isUser(ownerSigner.address)).to.be.true;
    })
    it("Should Remove USER Role" , async () => {
      await usdt.removeUser(account2.address);
      expect(await usdt.isUser(ownerSigner.address)).to.be.false;
    })
    it("Should renounce owner ADMIN Role" , async () => {
      await usdt.renounceAdmin();
      expect(await usdt.isAdmin(ownerSigner.address)).to.be.false;
    })

    it("Should Mint Faucet Token Successfully" , async () => {
      await usdt.addUser(ownerSigner.address);
      await usdt.mint(account2.address,faucetMintAmount);
      expect(await usdt.balanceOf(account2.address)).to.eq(faucetMintAmount);

    });

    describe("Faucet Token Transfer", ()=>{   
      it("Should revert with amount amount <= 1000 " ,async() => {
      expect(usdt.transferFaucetToken(ownerSigner.address ,faucetUserTransferAmount)).to.be.revertedWith("amount <=1000");
      }) 

      it("Should revert with zero account provideed" ,async() => {
        let contractAddress =  usdt.address;
        expect(usdt.transferFaucetToken(contractAddress ,transferUSDT_1000)).to.be.revertedWith("zero account");
      })

      it("Should revert with time not elapsed " ,async() => {
        usdt.transferFaucetToken(account2.address ,transferUSDT_1000);
        expect(usdt.transferFaucetToken(account2.address,transferUSDT_1000)).to.be.revertedWith("time not elapsed ")
      })
      it("Should reset Account LockTime " ,async() => {
        await usdt.setLockTime(newLockTime);
        expect(await usdt.userAddressLockTime()).to.eq(checkNewLockTime);
      })

    })


  afterEach(async () => {
    await checkpoint.revertTo();
  });
});
