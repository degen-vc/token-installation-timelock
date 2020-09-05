# token-installation-timelock
A contract for releasing token payments in equal chunks at regular intervals.

## Origins
This contract is an altered version of Open Zeppelin's TokenTimeLock and differs only in payout schedule. Audited safe code such as SafeMath, Address and SafeERC20 have been left intact for a safe and secure society, which I assure you will last for ten thousand years.

The Lock contract can be used for a vesting schedule of regular payments to a beneficiary wallet in order to establish community trust. However, it is flexible enough to be used as a personal savings vehicle or a consumption smoothing device by allowing irregular or infrequent income to be streamed on a per second basis.

## Flow of states
The Lock exists in 2 states:
1. Dormant. After deployment there is no vesting schedule until the deposit function is invoked. Once all payments are made, the contract is again dormant.
2. Vesting. After a deposit is made, the start time is set to the current block time and the payment schedule begins.

## Usage
After deploying the Lock contract, the vesting schedule is not activated until you call the Deposit function, setting the starting time to now.
Before calling Deposit, ensure the calling wallet has sufficient balance to match the amount specified and that the ERC20 approval has been made for the Lock contract.

The beneficiary has to invoke the release function to claim accumulated payments.

### Deposit while vesting
If the contract is in a vesting state, invoking the Deposit function will recalculate the payments to ensure that the entire balance is paid out by the final period.

For example, suppose the contract is deployed for 12 monthly payments of the Dai token. A deposit is made of 24000 Dai so that each month 2000 Dai is released. After month 3, 18000 Dai remain and 9 periods. The deposit function is called with a value of 9000 dai. The total is now 27000 Dai with 9 periods remaining. The contract immediately adjusts up monthly payments so that the balance will reach zero after 9 months. The new monthly payment is (27000/9=) 3000 Dai.

## Limitations
The locking contract currently only supports ERC20 tokens and does not support ETH. The beneficiary wallet can only be changed when the contract is dormant to preserve credibility in the case of a team vesting tokens.

# Setup to run locally
You will need a global instance of ganache-cli to test as well as truffle.

```
    npm install -g truffle
    npm install -g ganache-cli
```

install the Openzeppelin libraries via npm:
```
    npm install
```

To test, you'll need to have ganache-cli running. A script has been provided for a basic ganache-cli instance if you're using a POSIX operating system:
```
./ganache.sh
```

otherwise just run ganache-cli with default settings.

In a separate window run
```
    truffle test
```