# token-installation-timelock
A contract for releasing token payments in equal chunks at regular intervals.

## Origins
This contract is an altered version of Open Zeppelin's TokenTimeLock and differs only in payout schedule. Audited safe code such as SafeMath, Address and SafeERC20 have been left intact for a safe and secure society, which I assure you will last for ten thousand years.

The Lock contract can be used for a vesting schedule of regular payments to a beneficiary wallet in order to establish community trust. However, it is flexible enough to be used as a personal savings vehicle or a consumption smoothing device by allowing irregular or infrequent income to be streamed on a per second basis.

## Flow of states
The Lock exists in 2 states:
1. Dormant. After deployment there is no vesting schedule until the deposit function is invoked. Once all payments are made, the contract is again dormant.
2. Vesting. After a deposit is made, the start time is set to the current block time and the payment schedule begins.

To initialize the timelock, we first have to set parameters. Calling the function initialize presents us with 
* token address, beneficiary address, duration type, duration multiple and periods *

The last 3 time parameters are discussed below.

Once initialized, all that is required to kick the contract into a vesting state is to call the deposit function with a desired quantity of tokens. Keep in mind that you will be required to ERC20.approve the Lock token address and that the amount variable is in base (wei) units. So if your token has 18 decimal places then sending 1 token requires inputting the number 1000000000000000000. 

## Usage
After deploying the Lock contract, the vesting schedule is not activated until you call the Deposit function, setting the starting time to now.
Before calling Deposit, ensure the calling wallet has sufficient balance to match the amount specified and that the ERC20 approval has been made for the Lock contract.

The beneficiary has to invoke the release function to claim accumulated payments.

### Time periods
One of the parameters on the initialization function is duration which takes a number as a key representing one of the following:
```
        second = 0,
        minute = 1,
        hour = 2,
        day = 3,
        week = 4,
        month = 5, //inaccurate, assumes 30 day month, subject to drift
        year = 6,
        quarter = 7,//13 weeks
        biannual = 8//26 weeks
```
In addition to the duration type, you can set a duration multiple. Eg. if the duration is set to 5 and the multiple to 3 then the duration between withdrawals is 3 weeks. 
If you set a duration to a number higher than 8 then the duration will be that number in seconds. For instance, if if I set the duration to 4000 then each period will be 4000 seconds long. 

Finally the periods parameter determines how many periods the payments will be split into. Eg
For duration = 2, duration multiple = 1 and periods = 3, there will be 3 payments spaced an hour apart each. 

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