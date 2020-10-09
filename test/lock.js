const async = require('./helpers/async.js')
const expectThrow = require('./helpers/expectThrow').handle
const bigNumber = require('bignumber.js')
const test = async.test
const setup = async.setup
const time = require('./helpers/time')
const lock = artifacts.require('Lock')
const mockToken = artifacts.require('MockToken')
const hundredMillion = '100000000000000000000000000'

contract('lock1', accounts => {
    var lockInstance, mockTokenInstance

    setup(async () => {
        lockInstance = await lock.deployed()
        mockTokenInstance = await mockToken.deployed()
    })

    test('Attempting to initialize while initialized fails', async () => {
        await lockInstance.initialize(mockTokenInstance.address, accounts[2], 10, 1, 2);
        try {
            await lockInstance.initialize(mockTokenInstance.address, accounts[3], 10, 1, 4);
        } catch (exception) {
            assert.fail('initializing multiple times before deposit should fail.')
        }
        await mockTokenInstance.approve(lockInstance.address, hundredMillion)
        await lockInstance.deposit(hundredMillion)
        await expectThrow(lockInstance.initialize(mockTokenInstance.address, accounts[5], 12, 1, 4), 'cannot initialize during active vesting schedule')
    })
})

contract('lock2', accounts => {
    var lockInstance, mockTokenInstance

    setup(async () => {
        lockInstance = await lock.deployed()
        mockTokenInstance = await mockToken.deployed()
    })

    test('initializing and depositing releases regular payments until zero', async () => {
        const beneficiary = accounts[6]
        await lockInstance.initialize(mockTokenInstance.address, beneficiary, 1, 3, 5); //3 minute intervals 5 times
        await mockTokenInstance.approve(lockInstance.address, hundredMillion)
        await lockInstance.deposit('20000') //should break that into 4000 every 3 minutes
        const balanceAfterDeposit = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balanceAfterDeposit.toString(), "0", balanceAfterDeposit.toString())
        await lockInstance.release()
        const balanceAfterFirstRelease = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balanceAfterFirstRelease.toString(), "0")

        await time.advanceTimeAndBlock(150)
        await lockInstance.release()
        const balanceAfterAlmost3Minutes = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balanceAfterAlmost3Minutes.toString(), '0')
        await time.advanceTimeAndBlock(31)
        await lockInstance.release()
        const balanceAfterFirstWithdrawal = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balanceAfterFirstWithdrawal.toString(), '4000')

        await time.advanceTimeAndBlock(360)
        await lockInstance.release()
        const balanceAfterTwoEpochs = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balanceAfterTwoEpochs.toString(), '12000')

        await time.advanceTimeAndBlock(360)
        await lockInstance.release()
        const balanceAtEnd = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balanceAtEnd.toString(), '20000')

        await time.advanceTimeAndBlock(360)
        await lockInstance.release()
        const twoMoreForGoodMeasure = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(twoMoreForGoodMeasure.toString(), '20000')

        //this shouldn't fail
        await lockInstance.initialize(mockTokenInstance.address, beneficiary, 1, 3, 10); //3 minute intervals 5 times

    })
})

contract('lock3', accounts => {
    var lockInstance, mockTokenInstance

    setup(async () => {
        lockInstance = await lock.deployed()
        mockTokenInstance = await mockToken.deployed()
    })

    //will 200 years suffice, Shatterling?
    test("depositing after zero should reset schedule", async () => {
        const beneficiary = accounts[5]
        await mockTokenInstance.approve(lockInstance.address, hundredMillion)
        await lockInstance.initialize(mockTokenInstance.address, beneficiary, 6, 10, 50); //decade intervals 50 times
        await lockInstance.deposit('100000')
        const year = 60 * 60 * 24 * 7 * 52
        const fiveHundredYears = year * 500
        await time.advanceTimeAndBlock(fiveHundredYears)
        await lockInstance.release()
        const balance = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balance.toString(), '100000')

        await lockInstance.deposit('100')
        const tenYears = year * 10
        await time.advanceTimeAndBlock(tenYears)
        await lockInstance.release()
        const balanceAfterReset = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balanceAfterReset.toString(), '100002')
    })

})

contract('lock4', accounts => {
    var lockInstance, mockTokenInstance

    setup(async () => {
        lockInstance = await lock.deployed()
        mockTokenInstance = await mockToken.deployed()
    })

    test('depositing inceases next payment but leaves duration unchanged', async () => {
        const beneficiary = accounts[6]
        await lockInstance.initialize(mockTokenInstance.address, beneficiary, 1, 3, 5); //3 minute intervals 5 times
        await mockTokenInstance.approve(lockInstance.address, hundredMillion)
        await lockInstance.deposit('20000') //should break that into 4000 every 3 minutes
        await time.advanceTimeAndBlock(180)
        await lockInstance.release()
        const balanceAfterFirstWithdrawal = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balanceAfterFirstWithdrawal.toString(), '4000')

        await lockInstance.deposit('8000') // now 24000 with 4 periods remaining => 6000 per period
        await time.advanceTimeAndBlock(180)
        await lockInstance.release()
        const balanceAfterRebasing = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balanceAfterRebasing.toString(), '10000')//4000 + 6000
    })
})

contract('lock4', accounts => {
    var lockInstance, mockTokenInstance

    setup(async () => {
        lockInstance = await lock.deployed()
        mockTokenInstance = await mockToken.deployed()
    })

    test('test quarterly for good measure', async () => {
        const beneficiary = accounts[6]
        await lockInstance.initialize(mockTokenInstance.address, beneficiary, 7, 1, 6); //6 yearly quarters
        await mockTokenInstance.approve(lockInstance.address, hundredMillion)
        await lockInstance.deposit('144808909149053') //should break that into 24134818191508 every 3 months
        const quarter = 60 * 60 * 24 * 7 * 13

        await time.advanceTimeAndBlock(quarter)
        await lockInstance.release()
        let balance = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balance.toString(), '24134818191508')

        await time.advanceTimeAndBlock(quarter)
        await lockInstance.release()
        balance = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balance.toString(), '48269636383016')

        await time.advanceTimeAndBlock(quarter)
        await lockInstance.release()
        balance = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balance.toString(), '72404454574524')

        await time.advanceTimeAndBlock(quarter)
        await lockInstance.release()
        balance = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balance.toString(), '96539272766032')

        await time.advanceTimeAndBlock(quarter)
        await lockInstance.release()
        const balanceAfterOneQuarter = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balanceAfterOneQuarter.toString(), '120674090957540')

        await time.advanceTimeAndBlock(quarter)
        await lockInstance.release()
        balance = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balance.toString(), '144808909149048')
    })
})

contract('lock5', accounts => {
    var lockInstance, mockTokenInstance

    setup(async () => {
        lockInstance = await lock.deployed()
        mockTokenInstance = await mockToken.deployed()
    })

    test('changing beneficiary during vesting should fail', async () => {
        let beneficiary = accounts[6]
        await lockInstance.initialize(mockTokenInstance.address, beneficiary, 7, 1, 6); //6 yearly quarters
        await mockTokenInstance.approve(lockInstance.address, hundredMillion)
        await lockInstance.changeBeneficiary(accounts[4])
        beneficiary = await lockInstance.beneficiary.call()
        assert.equal(beneficiary,accounts[4])
        await lockInstance.deposit('144808909149053') //should break that into 24134818191508 every 3 months
        await expectThrow(lockInstance.changeBeneficiary(accounts[5]),'TokenTimelock: cannot change beneficiary while token balance positive')
        beneficiary = await lockInstance.beneficiary.call()
        assert.equal(beneficiary,accounts[4])
        const quarter = 60 * 60 * 24 * 7 * 13*7

        await time.advanceTimeAndBlock(quarter)
        await lockInstance.release()
        let balance = await mockTokenInstance.balanceOf(beneficiary)
        assert.equal(balance.toString(), '144808909149048')

        await lockInstance.changeBeneficiary(accounts[5])

        beneficiary = await lockInstance.beneficiary.call()
        assert.equal(beneficiary,accounts[5])
    })
})